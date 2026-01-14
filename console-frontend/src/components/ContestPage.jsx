import React, { useState, useEffect } from 'react';
import { Medal, BarChart3, Users, Calendar, Trophy, TrendingUp, Code, Clock, ExternalLink, Zap } from 'lucide-react';
import UserProfileModal from './UserProfileModal';
import SidebarNavbar from './SidebarNavbar';
import ScrollToTop from './ui/ScrollToTop';
import LandingFooter from './Footer';
import SplitText from './ui/text/SplitText';
import { API_ENDPOINTS } from '../utils/api';
import { logger } from '../utils/logger';
import ContestParticipationDropdown from './ContestParticipationDropdown';

const ContestPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [recentContestInfo, setRecentContestInfo] = useState(null);
  const [totalUsers, setTotalUsers] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [platform, setPlatform] = useState('leetcode'); // 'leetcode' or 'codeforces'
  const [upcomingContests, setUpcomingContests] = useState([]);
  const [loadingUpcoming, setLoadingUpcoming] = useState(true);

  const fetchCodeforcesProblemsSolved = async (contestId, participantsList) => {
    try {
      if (!contestId || !Array.isArray(participantsList) || participantsList.length === 0) {
        return participantsList;
      }

      const handles = Array.from(
        new Set(
          participantsList
            .map((participant) => participant.handle?.trim())
            .filter((handle) => !!handle)
        )
      );

      if (handles.length === 0) {
        return participantsList;
      }

      const chunkSize = 25;
      const solvedMap = new Map();

      for (let i = 0; i < handles.length; i += chunkSize) {
        const chunk = handles.slice(i, i + chunkSize);
        const url = `https://codeforces.com/api/contest.standings?contestId=${contestId}&handles=${chunk.join(';')}&showUnofficial=false`;

        const response = await fetch(url, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
          }
        });

        if (!response.ok) {
          logger.warn('Failed to fetch Codeforces standings:', response.status, response.statusText);
          continue;
        }

        const data = await response.json();

        if (data.status !== 'OK' || !data.result?.rows) {
          logger.warn('Unexpected Codeforces standings response:', data);
          continue;
        }

        data.result.rows.forEach((row) => {
          const partyHandles = row.party?.members?.map((member) => member.handle).filter(Boolean) || [];
          const solvedCount = (row.problemResults || []).reduce(
            (count, problem) => count + (problem.points && problem.points > 0 ? 1 : 0),
            0
          );

          partyHandles.forEach((handle) => {
            solvedMap.set(handle.toLowerCase(), solvedCount);
          });
        });
      }

      if (solvedMap.size === 0) {
        return participantsList;
      }

      return participantsList.map((participant) => {
        const solved = participant.handle ? solvedMap.get(participant.handle.toLowerCase()) : undefined;
        if (solved === undefined) return participant;
        return { ...participant, problemsSolved: solved };
      });
    } catch (error) {
      logger.error('Error fetching Codeforces problems solved:', error);
      return participantsList;
    }
  };

  useEffect(() => {
    setIsVisible(true);
    fetchContestData();
    fetchUpcomingContests();
  }, [platform]);

  const fetchUpcomingContests = async () => {
    try {
      setLoadingUpcoming(true);
      const response = await fetch('https://competeapi.vercel.app/contests/upcoming/');
      
      if (!response.ok) {
        throw new Error('Failed to fetch upcoming contests');
      }

      const data = await response.json();

      // Handle different response formats
      let contestsArray = [];
      if (Array.isArray(data)) {
        contestsArray = data;
      } else if (data.contests && Array.isArray(data.contests)) {
        contestsArray = data.contests;
      } else if (data.results && Array.isArray(data.results)) {
        contestsArray = data.results;
      } else {
        contestsArray = [];
      }

      // Filter for LeetCode and Codeforces only
      const filteredContests = contestsArray
        .filter(contest => {
          const platformName = (contest.platform || contest.site || contest.platform_name || '').toLowerCase();
          return platformName.includes('leetcode') || platformName.includes('codeforces');
        })
        .map(contest => {
          // Normalize platform name
          let normalizedPlatform = 'codeforces';
          const platformName = (contest.platform || contest.site || contest.platform_name || '').toLowerCase();
          if (platformName.includes('leetcode')) {
            normalizedPlatform = 'leetcode';
          }

          // Handle different date formats
          const startTime = contest.start_time || contest.startTime || contest.start || contest.start_time_iso || null;
          const endTime = contest.end_time || contest.endTime || contest.end || contest.end_time_iso || null;
          
          // Handle duration (could be in seconds or ISO format)
          let duration = null;
          if (contest.duration) {
            if (typeof contest.duration === 'number') {
              duration = contest.duration; // Already in seconds
            } else if (typeof contest.duration === 'string') {
              // Try to parse ISO duration or convert to seconds
              duration = contest.duration;
            }
          }

          return {
            name: contest.name || contest.title || contest.contest_name || 'Unknown Contest',
            url: contest.url || contest.link || contest.contest_url || '#',
            startTime: startTime,
            endTime: endTime,
            duration: duration,
            platform: normalizedPlatform,
            contestId: contest.contest_id || contest.id || contest.contestId || null
          };
        })
        .filter(contest => {
          // Only include contests that haven't started yet
          if (contest.startTime) {
            try {
              const startDate = new Date(contest.startTime);
              if (isNaN(startDate.getTime())) return false; // Invalid date
              return startDate > new Date();
            } catch (e) {
              return false; // Invalid date format
            }
          }
          return true;
        })
        .sort((a, b) => {
          // Sort by start time (earliest first)
          try {
            const dateA = a.startTime ? new Date(a.startTime) : new Date(9999999999999); // Far future if no date
            const dateB = b.startTime ? new Date(b.startTime) : new Date(9999999999999);
            if (isNaN(dateA.getTime()) || isNaN(dateB.getTime())) return 0;
            return dateA - dateB;
          } catch (e) {
            return 0;
          }
        })
        .slice(0, 10); // Limit to 10 upcoming contests

      setUpcomingContests(filteredContests);
    } catch (error) {
      logger.error('Error fetching upcoming contests:', error);
      setUpcomingContests([]);
    } finally {
      setLoadingUpcoming(false);
    }
  };

  const fetchContestData = async () => {
    try {
      setLoading(true);
      setError(null);
      const url = `${API_ENDPOINTS.CONTEST}/recent?platform=${platform}`;

      const response = await fetch(url);
      if (response.ok) {
        const responseData = await response.json();
        
        setRecentContestInfo(responseData);
        
        // For contest view, users are the participants of the recent contest
        // The API returns participants array with user populated
        const participants = responseData.participants || [];
        
        // Map participants to user format for display
        const mappedUsers = participants.map((p, index) => ({
          _id: p.userId || p.user?._id,
          name: p.name || p.user?.name || 'Unknown',
          branch: p.branch || p.user?.branch || 'N/A',
          handle: p.handle || (platform === 'leetcode' 
            ? p.user?.platformVerification?.leetcode?.handle 
            : p.user?.platformVerification?.codeforces?.handle) || 'N/A',
          // Contest-specific fields
          rating: p.rating,
          ranking: p.ranking,
          problemsSolved: p.problemsSolved || 0,
          oldRating: p.oldRating || 0,
          newRating: p.newRating || 0,
          // For profile modal
          user: p.user || p,
          platforms: p.user?.platforms || p.platforms || {},
          platformVerification: p.user?.platformVerification || p.platformVerification || {}
        }));
        
        // Sort by ranking (ascending - lower rank is better)
        mappedUsers.sort((a, b) => {
          if (a.ranking === 'N/A' || a.ranking === null) return 1;
          if (b.ranking === 'N/A' || b.ranking === null) return -1;
          return a.ranking - b.ranking;
        });

        let finalUsers = mappedUsers;
        if (platform === 'codeforces' && responseData.contestId) {
          finalUsers = await fetchCodeforcesProblemsSolved(responseData.contestId, mappedUsers);
        }

        setUsers(finalUsers);
        setTotalUsers(finalUsers.length);
      } else {
        const errorData = await response.json().catch(() => ({}));
        logger.error('Contest API error:', errorData);
        setError(`Failed to fetch recent contest data: ${response.status}`);
      }
    } catch (error) {
      logger.error('Network Error:', error);
      setError('Network error: Unable to connect to the server.');
    } finally {
      setLoading(false);
    }
  };

  const handleViewProfile = (participant) => {
    const baseUser = participant?.user || participant || {};
    const mergedUser = {
      ...baseUser,
      ...participant,
      name: participant?.name || baseUser?.name,
      email: participant?.email || baseUser?.email,
      platforms: {
        ...(baseUser?.platforms || {}),
        ...(participant?.platforms || {})
      },
      platformVerification: {
        ...(baseUser?.platformVerification || {}),
        ...(participant?.platformVerification || {})
      }
    };

    setSelectedUser(mergedUser);
    setShowProfileModal(true);
  };

  const getRankIcon = (rank) => {
    if (rank === 1) return <Medal className="w-5 h-5 text-yellow-400" />;
    if (rank === 2) return <Medal className="w-5 h-5 text-gray-300" />;
    if (rank === 3) return <Medal className="w-5 h-5 text-orange-400" />;
    return <BarChart3 className="w-5 h-5 text-gray-400" />;
  };

  const getScoreColor = (rating) => {
    // Match Codeforces color scheme
    if (rating >= 3000) return 'text-red-600'; // Legendary Grandmaster
    if (rating >= 2600) return 'text-red-500'; // International Grandmaster
    if (rating >= 2400) return 'text-red-400'; // Grandmaster
    if (rating >= 2300) return 'text-orange-400'; // International Master
    if (rating >= 2100) return 'text-orange-300'; // Master
    if (rating >= 1900) return 'text-purple-400'; // Candidate Master
    if (rating >= 1600) return 'text-blue-400'; // Expert
    if (rating >= 1400) return 'text-cyan-400'; // Specialist
    if (rating >= 1200) return 'text-green-400'; // Pupil
    if (rating >= 500) return 'text-gray-400'; // Newbie
    return 'text-gray-300';
  };

  const formatDuration = (duration) => {
    if (!duration) return 'N/A';
    
    // If duration is a number, assume it's in seconds
    if (typeof duration === 'number') {
      const hours = Math.floor(duration / 3600);
      const minutes = Math.floor((duration % 3600) / 60);
      if (hours > 0) {
        return `${hours}h ${minutes}m`;
      }
      return `${minutes}m`;
    }
    
    // If duration is a string, try to parse it
    if (typeof duration === 'string') {
      // Check if it's ISO 8601 duration format (e.g., "PT2H30M")
      if (duration.startsWith('PT')) {
        const hoursMatch = duration.match(/(\d+)H/);
        const minutesMatch = duration.match(/(\d+)M/);
        const hours = hoursMatch ? parseInt(hoursMatch[1]) : 0;
        const minutes = minutesMatch ? parseInt(minutesMatch[1]) : 0;
        if (hours > 0) {
          return `${hours}h ${minutes}m`;
        }
        return `${minutes}m`;
      }
      
      // Try to parse as number string
      const numDuration = parseFloat(duration);
      if (!isNaN(numDuration)) {
        const hours = Math.floor(numDuration / 3600);
        const minutes = Math.floor((numDuration % 3600) / 60);
        if (hours > 0) {
          return `${hours}h ${minutes}m`;
        }
        return `${minutes}m`;
      }
    }
    
    return duration; // Return as-is if can't parse
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Simple Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900"></div>
      <div className={`absolute inset-0 ${
        platform === 'leetcode'
          ? 'bg-[radial-gradient(circle_at_50%_50%,rgba(76,175,80,0.1),transparent_50%)]'
          : 'bg-[radial-gradient(circle_at_50%_50%,rgba(60,92,255,0.1),transparent_50%)]'
      }`}></div>

      <SidebarNavbar />
      <ScrollToTop />

      {/* Welcome Hero Section */}
      <div className={`pt-20 pb-16 relative transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            {/* Title with SplitText */}
            <div className="relative mb-8">
              <h1 className="text-4xl md:text-7xl font-black leading-tight relative">
                <SplitText
                  as="span"
                  text="CONTEST"
                  splitType="chars"
                  delay={200}
                  duration={0.55}
                  ease="power3.out"
                  from={{ opacity: 0, y: 28 }}
                  to={{ opacity: 1, y: 0 }}
                  threshold={0.12}
                  rootMargin="-80px"
                  textAlign="center"
                  gradient="bg-gradient-to-r from-[#4CAF50] via-[#2196F3] to-[#9C27B0] bg-clip-text text-transparent"
                />
                <br />
                <SplitText
                  as="span"
                  text="Leaderboard"
                  splitType="chars"
                  delay={300}
                  duration={0.55}
                  ease="power3.out"
                  from={{ opacity: 0, y: 28 }}
                  to={{ opacity: 1, y: 0 }}
                  threshold={0.12}
                  rootMargin="-80px"
                  textAlign="center"
                  className="text-white"
                />
              </h1>
            </div>

            {/* Subtitle */}
            <div className="relative">
              <p className="text-2xl text-gray-300 max-w-4xl mx-auto mb-10 leading-relaxed">
                Track your performance in{' '}
                <span className="text-[#4CAF50] font-bold hover:text-[#2196F3] transition-all duration-300 cursor-pointer">
                  Competitive Programming Contests
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <ContestParticipationDropdown />
      </div>

      {/* Upcoming Contests Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="bg-black/60 backdrop-blur-md rounded-3xl border border-gray-800/50 shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-gray-900/80 to-gray-800/80 p-4 md:p-6 border-b border-gray-700/50">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center space-x-2 md:space-x-3">
                <Zap className={`w-6 h-6 md:w-8 md:h-8 ${
                  platform === 'leetcode' ? 'text-[#4CAF50]' : 'text-[#3C5CFF]'
                }`} />
                <h2 className="text-xl md:text-2xl lg:text-3xl font-black text-white">
                  Upcoming Contests
                </h2>
              </div>
              <span className="text-gray-400 text-xs md:text-sm font-medium">
                {upcomingContests.length} contests
              </span>
            </div>
          </div>

          <div className="p-4 md:p-6">
            {loadingUpcoming ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4CAF50]"></div>
              </div>
            ) : upcomingContests.length === 0 ? (
              <div className="text-center py-12">
                <Calendar className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400 text-lg">No upcoming contests found</p>
              </div>
            ) : (
              <div className="space-y-3">
                {upcomingContests.map((contest, index) => {
                  const startDate = contest.startTime ? new Date(contest.startTime) : null;
                  const endDate = contest.endTime ? new Date(contest.endTime) : null;
                  const isLeetCode = contest.platform === 'leetcode';
                  
                  // Calculate time until contest
                  const timeUntil = startDate ? startDate - new Date() : null;
                  const daysUntil = timeUntil ? Math.floor(timeUntil / (1000 * 60 * 60 * 24)) : null;
                  const hoursUntil = timeUntil ? Math.floor((timeUntil % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)) : null;
                  const minutesUntil = timeUntil ? Math.floor((timeUntil % (1000 * 60 * 60)) / (1000 * 60)) : null;
                  
                  // Calculate duration from start and end time if available
                  let durationDisplay = 'N/A';
                  if (startDate && endDate) {
                    const durationMs = endDate - startDate;
                    const durationHours = Math.floor(durationMs / (1000 * 60 * 60));
                    const durationMinutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));
                    if (durationHours > 0) {
                      durationDisplay = `${durationHours}h ${durationMinutes}m`;
                    } else {
                      durationDisplay = `${durationMinutes}m`;
                    }
                  } else if (contest.duration) {
                    // LeetCode provides duration in minutes, Codeforces in seconds
                    if (isLeetCode && typeof contest.duration === 'number' && contest.duration < 1000) {
                      // LeetCode format: minutes (e.g., 90 = 1hrs 30 mins)
                      const hours = Math.floor(contest.duration / 60);
                      const minutes = contest.duration % 60;
                      if (hours > 0) {
                        durationDisplay = `${hours}hrs ${minutes}mins`;
                      } else {
                        durationDisplay = `${minutes}mins`;
                      }
                    } else {
                      // Codeforces format: seconds, or use formatDuration
                      durationDisplay = formatDuration(contest.duration);
                    }
                  }
                  
                  return (
                    <div
                      key={index}
                      className={`group relative bg-gradient-to-r backdrop-blur-xl rounded-xl p-3 md:p-4 border-2 transition-all duration-300 hover:shadow-xl overflow-hidden ${
                        isLeetCode
                          ? 'from-[#4CAF50]/10 to-[#2196F3]/10 border-[#4CAF50]/30 hover:border-[#4CAF50]'
                          : 'from-[#3C5CFF]/10 to-[#3CFFB7]/10 border-[#3C5CFF]/30 hover:border-[#3C5CFF]'
                      }`}
                    >
                      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 md:gap-0">
                        {/* Left side: Contest info */}
                        <div className="flex items-center space-x-2 md:space-x-4 flex-1 min-w-0 w-full md:w-auto">
                          {/* Platform Logo - Enlarged, no text */}
                          <div className={`flex items-center justify-center px-2 py-1.5 md:px-3 md:py-2 rounded-lg flex-shrink-0 ${
                            isLeetCode
                              ? 'bg-[#4CAF50]/30'
                              : 'bg-[#3C5CFF]/30'
                          }`}>
                            {isLeetCode ? (
                              <img src="/LeetCode_Logo.png" className="w-6 h-6 md:w-8 md:h-8" alt="leetcode" />
                            ) : (
                              <img src="/codeforces_logo.png" className="w-6 h-6 md:w-8 md:h-8" alt="codeforces" />
                            )}
                          </div>

                          {/* Contest Name */}
                          <div className="flex-1 min-w-0">
                            <h3 className="text-sm md:text-base font-bold text-white truncate group-hover:text-gray-200 transition-all duration-300">
                              {contest.name}
                            </h3>
                          </div>

                          {/* Date and Time - Desktop only */}
                          {startDate && (
                            <div className="hidden md:flex items-center space-x-2 text-sm text-gray-300 flex-shrink-0">
                              <Calendar className={`w-4 h-4 ${
                                isLeetCode ? 'text-[#4CAF50]' : 'text-[#3C5CFF]'
                              }`} />
                              <span>
                                {startDate.toLocaleDateString('en-US', { 
                                  month: 'short', 
                                  day: 'numeric',
                                  year: 'numeric'
                                })}
                              </span>
                              <span className="text-gray-500">
                                {startDate.toLocaleTimeString('en-US', { 
                                  hour: '2-digit', 
                                  minute: '2-digit' 
                                })}
                              </span>
                            </div>
                          )}

                          {/* Time Until - Desktop only */}
                          {daysUntil !== null && daysUntil >= 0 && (
                            <div className="hidden md:flex items-center space-x-1 text-xs text-gray-400 flex-shrink-0">
                              <Clock className="w-3 h-3" />
                              <span>
                                {daysUntil > 0 
                                  ? `${daysUntil}d ${hoursUntil}h` 
                                  : hoursUntil > 0 
                                    ? `${hoursUntil}h ${minutesUntil}m`
                                    : minutesUntil > 0
                                      ? `${minutesUntil}m`
                                      : 'Soon'}
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Right side: View button */}
                        <div className="flex-shrink-0 w-full md:w-auto flex justify-end md:ml-4">
                          <a
                            href={contest.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`inline-flex items-center space-x-2 px-3 py-1.5 md:px-4 md:py-2 rounded-lg text-xs md:text-sm font-bold transition-all transform hover:scale-105 ${
                              isLeetCode
                                ? 'bg-gradient-to-r from-[#4CAF50] to-[#2196F3] text-white hover:shadow-lg hover:shadow-[#4CAF50]/50'
                                : 'bg-gradient-to-r from-[#3C5CFF] to-[#3CFFB7] text-white hover:shadow-lg hover:shadow-[#3C5CFF]/50'
                            }`}
                          >
                            <span>View</span>
                            <ExternalLink className="w-3 h-3 md:w-4 md:h-4" />
                          </a>
                        </div>
                      </div>

                      {/* Mobile: Date and Time Until below */}
                      <div className="md:hidden flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mt-3 pt-3 border-t border-gray-700/50">
                        {startDate && (
                          <div className="flex items-center space-x-2 text-xs text-gray-300">
                            <Calendar className={`w-3 h-3 ${
                              isLeetCode ? 'text-[#4CAF50]' : 'text-[#3C5CFF]'
                            }`} />
                            <span>
                              {startDate.toLocaleDateString('en-US', { 
                                month: 'short', 
                                day: 'numeric',
                                year: 'numeric'
                              })}
                            </span>
                            <span className="text-gray-500">
                              {startDate.toLocaleTimeString('en-US', { 
                                hour: '2-digit', 
                                minute: '2-digit' 
                              })}
                            </span>
                          </div>
                        )}
                        {/* Time Until - Mobile */}
                        {daysUntil !== null && daysUntil >= 0 && (
                          <div className="flex items-center space-x-1 text-xs text-gray-400">
                            <Clock className="w-3 h-3" />
                            <span>
                              {daysUntil > 0 
                                ? `${daysUntil}d ${hoursUntil}h` 
                                : hoursUntil > 0 
                                  ? `${hoursUntil}h ${minutesUntil}m`
                                  : minutesUntil > 0
                                    ? `${minutesUntil}m`
                                    : 'Soon'}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Platform Toggle - Moved below Upcoming Contests */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="flex justify-center gap-2 md:gap-4">
          <button
            onClick={() => setPlatform('leetcode')}
            className={`px-4 py-2.5 md:px-8 md:py-4 rounded-xl md:rounded-2xl font-black text-sm md:text-lg transition-all duration-500 transform hover:scale-105 ${
              platform === 'leetcode'
                ? 'bg-gradient-to-r from-[#FF7A30] to-[#FFC22D] text-white shadow-2xl scale-105'
                : 'bg-gray-900/60 text-gray-300 hover:bg-gray-800/80 border border-gray-700 hover:border-gray-600'
            }`}
          >
            <div className="flex items-center space-x-2 md:space-x-3">
              <img src="/LeetCode_Logo.png" className="w-5 h-5 md:w-6 md:h-6" alt="leetcode logo" />
              <span>LeetCode</span>
            </div>
          </button>
          <button
            onClick={() => setPlatform('codeforces')}
            className={`px-4 py-2.5 md:px-8 md:py-4 rounded-xl md:rounded-2xl font-black text-sm md:text-lg transition-all duration-500 transform hover:scale-105 ${
              platform === 'codeforces'
                ? 'bg-gradient-to-r from-[#3C5CFF] to-[#3CFFB7] text-white shadow-2xl scale-105'
                : 'bg-gray-900/60 text-gray-300 hover:bg-gray-800/80 border border-gray-700 hover:border-gray-600'
            }`}
          >
            <div className="flex items-center space-x-2 md:space-x-3">
              <img src="/codeforces_logo.png" className="w-5 h-5 md:w-6 md:h-6" alt="codeforces logo" />
              <span>Codeforces</span>
            </div>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className={`group bg-black/60 backdrop-blur-md rounded-3xl border border-gray-800/50 shadow-2xl overflow-hidden transition-all duration-500 ${
          platform === 'leetcode' ? 'hover:border-[#4CAF50]/30' : 'hover:border-[#3C5CFF]/30'
        }`}>
          {/* Content Header */}
          <div className="bg-gradient-to-r from-gray-900/80 to-gray-800/80 p-2 md:px-10 md:py-8 border-b border-gray-700/50">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-black rounded-2xl flex items-center justify-center transition-all duration-500 shadow-lg">
                  {platform === 'leetcode' ? (
                    <img src="/LeetCode_Logo.png" className="w-10 h-10" alt="leetcode logo" />
                  ) : (
                    <img src="/codeforces_logo.png" className="w-10 h-10" alt="codeforces logo" />
                  )}
                </div>

                <div>
                  <h2 className="md:text-3xl font-black text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#4CAF50] group-hover:to-[#2196F3] transition-all duration-500">
                    {platform === 'leetcode' ? 'LeetCode Contest Rankings' : 'Codeforces Contest Rankings'}
                  </h2>
                  <p className="text-gray-400 text-sm md:text-lg group-hover:text-gray-300 transition-all duration-300 font-medium">
                    {platform === 'leetcode' ? 'Latest weekly contest performance' : 'Latest contest performance'}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3 text-gray-400">
                <div className="relative">
                  <TrendingUp className={`w-6 h-6 group-hover:scale-110 transition-all duration-300 ${
                    platform === 'leetcode' ? 'group-hover:text-[#4CAF50]' : 'group-hover:text-[#3C5CFF]'
                  }`} />
                  <div className={`absolute -top-1 -right-1 w-2 h-2 rounded-full ${
                    platform === 'leetcode' ? 'bg-green-400' : 'bg-blue-400'
                  }`}></div>
                </div>
                <span className="text-sm md:text-lg font-semibold group-hover:text-white transition-all duration-300">Live Updates</span>
              </div>
            </div>
          </div>

          {/* Contest Info Card */}
          <div className="p-6">
            {loading ? (
              <div className="flex justify-center items-center py-20">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#4CAF50] mx-auto mb-4"></div>
                  <p className="text-gray-300 text-lg font-semibold">Loading contest data...</p>
                </div>
              </div>
            ) : error ? (
              <div className="text-center py-20">
                <div className="text-red-400 text-2xl mb-4">❌ {error}</div>
                <button
                  onClick={fetchContestData}
                  className="px-8 py-4 bg-gradient-to-r from-[#4CAF50] to-[#2196F3] text-white rounded-xl hover:from-[#4CAF50]/80 hover:to-[#2196F3]/80 transition-all transform hover:scale-105 font-semibold"
                >
                  🔄 Try Again
                </button>
              </div>
            ) : (
              <>
                {/* Contest Information */}
                <div className={`relative backdrop-blur-xl rounded-3xl p-4 md:p-8 border-2 mb-10 text-center shadow-2xl overflow-hidden ${
                  platform === 'leetcode' 
                    ? 'bg-gradient-to-r from-[#4CAF50]/20 via-[#2196F3]/20 to-[#9C27B0]/20 border-[#4CAF50]/40'
                    : 'bg-gradient-to-r from-[#3C5CFF]/20 via-[#3CFFB7]/20 to-[#9C27B0]/20 border-[#3C5CFF]/40'
                }`}>
                  <div className={`absolute inset-0 pointer-events-none ${
                    platform === 'leetcode'
                      ? 'bg-[radial-gradient(circle_at_center,rgba(76,175,80,0.1),transparent_70%)]'
                      : 'bg-[radial-gradient(circle_at_center,rgba(60,92,255,0.1),transparent_70%)]'
                  }`} />
                  {recentContestInfo && recentContestInfo.contestName ? (
                    <div className="relative">
                      <div className="flex flex-col md:flex-row items-center justify-center mb-4 space-y-2 md:space-y-0">
                        <Medal className={`w-8 h-8 md:w-10 md:h-10 mr-2 md:mr-3 ${
                          platform === 'leetcode' ? 'text-[#4CAF50]' : 'text-[#3C5CFF]'
                        }`} />
                        <h3 className={`text-xl md:text-3xl font-black text-transparent bg-clip-text ${
                          platform === 'leetcode'
                            ? 'bg-gradient-to-r from-[#4CAF50] to-[#2196F3]'
                            : 'bg-gradient-to-r from-[#3C5CFF] to-[#3CFFB7]'
                        }`}>
                          {recentContestInfo.contestName}
                        </h3>
                      </div>
                      <div className="flex flex-col md:flex-row items-center justify-center space-y-3 md:space-y-0 md:space-x-8 mt-4">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 md:w-5 md:h-5 text-gray-400 mr-2" />
                          <span className="text-gray-400 text-xs md:text-sm font-semibold mr-2">Date:</span>
                          <span className="text-white text-sm md:text-base font-bold">
                            {recentContestInfo.date ? new Date(recentContestInfo.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : 'N/A'}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <Users className="w-4 h-4 md:w-5 md:h-5 text-gray-400 mr-2" />
                          <span className="text-gray-400 text-xs md:text-sm font-semibold mr-2">Participants:</span>
                          <span className={`text-lg md:text-xl font-black ${
                            platform === 'leetcode' ? 'text-[#4CAF50]' : 'text-[#3C5CFF]'
                          }`}>{totalUsers}</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="relative">
                      <div className="flex items-center justify-center mb-3">
                        <BarChart3 className="w-8 h-8 text-orange-400 mr-2" />
                        <h3 className="text-2xl font-black text-orange-400">
                          No Contest Data Available
                        </h3>
                      </div>
                      <p className="text-gray-400 text-sm max-w-md mx-auto">
                        {recentContestInfo?.message || `No finalized ${platform} contest available yet. Please sync contests from the admin panel to see results.`}
                      </p>
                    </div>
                  )}
                </div>

                {/* Leaderboard Table */}
                <div className="relative bg-black/40 backdrop-blur-xl rounded-3xl border-2 border-gray-700/50 p-8 shadow-2xl overflow-hidden">
                  <div className={`absolute inset-0 pointer-events-none ${
                    platform === 'leetcode'
                      ? 'bg-gradient-to-br from-[#4CAF50]/5 via-transparent to-[#2196F3]/5'
                      : 'bg-gradient-to-br from-[#3C5CFF]/5 via-transparent to-[#3CFFB7]/5'
                  }`} />
                  {users.length === 0 ? (
                    <div className="text-center py-16">
                      <div className="text-gray-400 text-2xl mb-6 flex items-center justify-center">
                        <BarChart3 className="w-8 h-8 mr-2" />
                        No Contest Participants
                      </div>
                      <p className="text-gray-500 mb-6">
                        No campus users participated in the latest contest. Contests are synced every Friday.
                      </p>
                    </div>
                  ) : (
                    <div className="relative overflow-x-auto">
                      {/* Table header */}
                      <table className="w-full min-w-full divide-y divide-gray-700/50">
                        <thead className="bg-gray-900/50 sticky top-0 z-10">
                          <tr className="text-left text-xs md:text-sm font-black text-gray-300 uppercase tracking-wider">
                            <th className="px-4 py-5 w-[10%]">Rank</th>
                            <th className="px-4 py-5 w-[25%]">Participant</th>
                            <th className="hidden md:table-cell px-4 py-5 w-[15%]">{platform === 'codeforces' ? 'Problems Solved' : 'Rating'}</th>
                            <th className="hidden md:table-cell px-4 py-5 w-[15%]">Ranking</th>
                            {platform === 'codeforces' && (
                              <th className="hidden md:table-cell px-4 py-5 w-[15%]">Rating Change</th>
                            )}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-800/50">
                          {users.map((user, index) => {
                            const contestRating = user.rating || 'N/A';
                            const contestRanking = user.ranking || 'N/A';
                            const problemsSolved = user.problemsSolved || 0;
                            const oldRating = user.oldRating || 0;
                            const newRating = user.newRating || 0;
                            const ratingChange = newRating - oldRating;

                            // Determine background color for top 3
                            let rowClassName = "hover:bg-gradient-to-r hover:from-gray-800/30 hover:to-transparent transition-all duration-200 cursor-pointer";
                            if (index === 0) rowClassName += " bg-gradient-to-r from-yellow-900/30 to-transparent border-l-4 border-yellow-400 shadow-lg";
                            else if (index === 1) rowClassName += " bg-gradient-to-r from-gray-700/30 to-transparent border-l-4 border-gray-300 shadow-lg";
                            else if (index === 2) rowClassName += " bg-gradient-to-r from-orange-900/30 to-transparent border-l-4 border-orange-400 shadow-lg";

                            return (
                              <tr key={user._id || index} className={rowClassName}>
                                {/* Rank column with medal for top 3 */}
                                <td className="px-4 py-4 whitespace-nowrap">
                                  <div className="flex items-center">
                                    <span className="mr-2">{getRankIcon(index + 1)}</span>
                                    <span className="text-white font-semibold text-sm sm:text-base">#{index + 1}</span>
                                  </div>
                                </td>

                                {/* Name & profile icon */}
                                <td className="px-4 py-4 whitespace-nowrap">
                                  <div className="flex items-center space-x-3">
                                    <div className="flex-grow min-w-0">
                                      <div className="text-white font-semibold truncate text-sm sm:text-base">
                                        {user.name || 'Unknown User'}
                                      </div>
                                      {/* Mobile-responsive display - only shown on mobile */}
                                      <div className="md:hidden flex flex-wrap gap-2 mt-1">
                                        {platform === 'codeforces' ? (
                                          <>
                                            <span className="text-xs text-gray-400">
                                              Solved: <span className="text-white font-bold">{problemsSolved}</span>
                                            </span>
                                            <span className="text-xs text-gray-400">
                                              Rank: <span className="text-white font-bold">{contestRanking}</span>
                                            </span>
                                            <span className={`text-xs ${
                                              ratingChange > 0 ? 'text-green-400' : ratingChange < 0 ? 'text-red-400' : 'text-gray-400'
                                            }`}>
                                              {ratingChange > 0 ? '+' : ''}{ratingChange}
                                            </span>
                                          </>
                                        ) : (
                                          <>
                                            <span className="text-xs text-gray-400">
                                              Rating: <span className={getScoreColor(contestRating)}>{contestRating}</span>
                                            </span>
                                            <span className="text-xs text-gray-400">
                                              Rank: <span className="text-white font-bold">{contestRanking}</span>
                                            </span>
                                          </>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </td>

                                {/* Contest Rating / Problems Solved - Only shown on desktop */}
                                <td className="hidden md:table-cell px-4 py-4 whitespace-nowrap">
                                  <div className="flex items-center">
                                    {platform === 'codeforces' ? (
                                      <div className="flex items-center space-x-2">
                                        <Code className="w-4 h-4 text-[#3C5CFF]" />
                                        <div className="font-semibold text-white text-sm md:text-base">
                                          {problemsSolved}
                                        </div>
                                      </div>
                                    ) : (
                                      <div className={`font-semibold ${getScoreColor(contestRating)} text-sm md:text-base`}>
                                        {contestRating}
                                      </div>
                                    )}
                                  </div>
                                </td>

                                {/* Contest Ranking - Only shown on desktop */}
                                <td className="hidden md:table-cell px-4 py-4 whitespace-nowrap">
                                  <div className="flex items-center">
                                    <div className="font-semibold text-gray-300 text-sm md:text-base">
                                      {contestRanking}
                                    </div>
                                  </div>
                                </td>

                                {/* Rating Change (Codeforces only) - Only shown on desktop */}
                                {platform === 'codeforces' && (
                                  <td className="hidden md:table-cell px-4 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                      <div className={`font-semibold text-sm md:text-base ${
                                        ratingChange > 0 ? 'text-green-400' : ratingChange < 0 ? 'text-red-400' : 'text-gray-400'
                                      }`}>
                                        {ratingChange > 0 ? '+' : ''}{ratingChange}
                                      </div>
                                      <span className="text-gray-500 text-xs ml-2">
                                        ({oldRating} → {newRating})
                                      </span>
                                    </div>
                                  </td>
                                )}

                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* User Profile Modal */}
      {showProfileModal && selectedUser && (
        <UserProfileModal
          user={selectedUser}
          onClose={() => {
            setShowProfileModal(false);
            setSelectedUser(null);
          }}
        />
      )}

      <LandingFooter />
    </div>
  );
};

export default ContestPage;

