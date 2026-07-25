import React, { useState, useEffect } from 'react';
import { Medal, BarChart3, Rocket, Users, ChevronLeft, ChevronRight } from 'lucide-react';
import UserProfileModal from './UserProfileModal';
import { useNavigate } from 'react-router-dom';
import { API_ENDPOINTS } from '../utils/api';
import { logger } from '../utils/logger';

const UnifiedLeaderboard = ({ users: propUsers, platform: propPlatform, loading: propLoading }) => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Number of items per page
  const [totalUsers, setTotalUsers] = useState(0); // Total number of users from backend
  const [searchTerm, setSearchTerm] = useState(''); // New state for search term
  const [leaderboardType, setLeaderboardType] = useState('all'); // 'all', 'codeforces', 'leetcode'

  // Use propPlatform if provided, otherwise use leaderboardType
  const activePlatform = propPlatform || leaderboardType;

  const platforms = [
    { key: 'all', name: 'All', color: 'text-gray-300', bgColor: 'bg-gray-700/20', borderColor: 'border-gray-600' },
    { key: 'codeforces', name: 'Codeforces', color: 'text-[#FF3C5F]', bgColor: 'bg-[#FF3C5F]/20', borderColor: 'border-[#FF3C5F]' },
    { key: 'leetcode', name: 'LeetCode', color: 'text-[#FF7A30]', bgColor: 'bg-[#FF7A30]/20', borderColor: 'border-[#FF7A30]' }
  ];

  // If users are provided as props, use them; otherwise fetch
  useEffect(() => {
    if (propUsers) {
      // Use provided users - processing happens in processAndSortUsers
      setUsers(propUsers);
      setTotalUsers(propUsers.length);
      setLoading(false);
      setCurrentPage(1); // Reset to first page when users change
    } else {
      // Fetch data if not provided
      setCurrentPage(1);
      fetchData();
    }
  }, [propUsers, propPlatform]); // Depend on propUsers and propPlatform

  useEffect(() => {
    // Reset to first page when leaderboardType or search term changes
    if (!propUsers) {
      setCurrentPage(1);
      fetchData();
    }
  }, [leaderboardType, searchTerm]); // Refetch data when leaderboardType or search term changes

  useEffect(() => {
    if (!propUsers) {
      fetchData();
    }
  }, [currentPage]); // Refetch data when page changes

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch data with pagination and search parameters for general leaderboard
      const url = new URL(`${API_ENDPOINTS.LEADERBOARD}`);
      url.searchParams.append('platform', leaderboardType === 'all' ? 'all' : leaderboardType);
      url.searchParams.append('limit', itemsPerPage);
      url.searchParams.append('page', currentPage);
      if (searchTerm) {
        url.searchParams.append('search', searchTerm);
      }

      const response = await fetch(url.toString());

      if (response.ok) {
        const responseData = await response.json();

        const fetchedUsers = responseData.users || [];
        const fetchedTotalCount = responseData.totalCount || 0;

        setUsers(fetchedUsers);
        setTotalUsers(fetchedTotalCount);
      } else {
        const errorData = await response.json().catch(() => ({}));
        logger.error('API Error:', errorData);
        setError(`Failed to fetch leaderboard data: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      logger.error('Network Error:', error);
      setError('Network error: Unable to connect to the server. Please check if the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  // Helper functions to get data from user object
  const getLeetCodeTotalQuestions = (user) => {
    const leetcodeData = user.platforms?.leetcode || user.platformVerification?.leetcode?.platformData;
    if (!leetcodeData) return 0;
    const easy = leetcodeData.easySolved || 0;
    const medium = leetcodeData.mediumSolved || 0;
    const hard = leetcodeData.hardSolved || 0;
    return easy + medium + hard;
  };

  const getCodeForcesRating = (user) => {
    const cfData = user.platforms?.codeforces || user.platformVerification?.codeforces?.platformData;
    return cfData?.rating || 0;
  };

  const getLeetCodeContestRating = (user) => {
    const recentContests = user.platformVerification?.leetcode?.contestStats?.recentContests || [];
    if (recentContests.length === 0) return 0;
    // Get the most recent contest rating (first one in array as it's newest first)
    const latestContest = recentContests.find(c => c.participated && c.rating) || recentContests[0];
    return latestContest?.rating || 0;
  };

  // Process and sort users based on active platform
  const processAndSortUsers = (usersList) => {
    let processedUsers = usersList.map(user => {
      const leetcodeQuestions = getLeetCodeTotalQuestions(user);
      const cfRating = getCodeForcesRating(user);
      const lcContestRating = getLeetCodeContestRating(user);

      // Infer platform verification:
      // - If explicit isVerified flag exists, respect it.
      // - If flag is missing but there is non-empty platform data, treat as verified
      const rawLcVerified = user.platformVerification?.leetcode?.isVerified;
      const rawCfVerified = user.platformVerification?.codeforces?.isVerified;

      const lcPlatformData = user.platforms?.leetcode || user.platformVerification?.leetcode?.platformData;
      const cfPlatformData = user.platforms?.codeforces || user.platformVerification?.codeforces?.platformData;

      const hasLeetCodeData = lcPlatformData && Object.keys(lcPlatformData).length > 0;
      const hasCodeforcesData = cfPlatformData && Object.keys(cfPlatformData).length > 0;

      const hasLeetCodeVerified =
        rawLcVerified === true || (rawLcVerified === undefined && hasLeetCodeData);
      const hasCodeforcesVerified =
        rawCfVerified === true || (rawCfVerified === undefined && hasCodeforcesData);

      // Total questions is only LeetCode problems
      const totalQuestions = leetcodeQuestions;

      return {
        ...user,
        _leetcodeQuestions: leetcodeQuestions,
        _totalQuestions: totalQuestions,
        _cfRating: cfRating,
        _lcContestRating: lcContestRating,
        _hasLeetCodeVerified: hasLeetCodeVerified,
        _hasCodeforcesVerified: hasCodeforcesVerified
      };
    });

    // Filter users based on active platform
    if (activePlatform === 'total-questions') {
      // Only show users with (effectively) VERIFIED LeetCode and at least one problem solved
      processedUsers = processedUsers.filter(
        user => user._hasLeetCodeVerified && user._leetcodeQuestions > 0
      );
      // Sort by LeetCode questions (descending)
      processedUsers.sort((a, b) => b._leetcodeQuestions - a._leetcodeQuestions);
    } else if (activePlatform === 'codeforces') {
      // Only show users with (effectively) VERIFIED Codeforces
      processedUsers = processedUsers.filter(
        user => user._hasCodeforcesVerified
      );
      // Sort by CodeForces rating (descending)
      processedUsers.sort((a, b) => b._cfRating - a._cfRating);
    } else if (activePlatform === 'leetcode') {
      // Only show users with (effectively) VERIFIED LeetCode
      processedUsers = processedUsers.filter(
        user => user._hasLeetCodeVerified
      );
      // Sort by LeetCode contest rating (descending)
      processedUsers.sort((a, b) => b._lcContestRating - a._lcContestRating);
    }

    return processedUsers;
  };

  // Use propUsers if provided, otherwise use state users
  const usersToDisplay = propUsers
    ? processAndSortUsers(propUsers)
    : processAndSortUsers(users);

  // Use propLoading if provided
  const isLoading = propLoading !== undefined ? propLoading : loading;

  const handleViewProfile = (user) => {
    setSelectedUser(user);
    setShowProfileModal(true);
  };

  const getRankIcon = (rank) => {
    if (rank === 1) return <Medal className="w-5 h-5 text-yellow-400" />;
    if (rank === 2) return <Medal className="w-5 h-5 text-gray-300" />;
    if (rank === 3) return <Medal className="w-5 h-5 text-orange-400" />;
    return <BarChart3 className="w-5 h-5 text-gray-400" />;
  };

  const getRatingColor = (rating) => {
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

  const getPlatformBadge = (platformKey, platformData) => {
    const platformInfo = platforms.find(p => p.key === platformKey);
    if (!platformInfo) return null;

    const getRatingDisplay = () => {
      if (!platformData || Object.keys(platformData).length === 0) {
        return "No data";
      }

      // For Codeforces, show actual rating
      if (platformKey === 'codeforces' && platformData.rating) {
        return `Rating: ${platformData.rating}`;
      }

      // For LeetCode, show calculated rating and problems
      if (platformKey === 'leetcode') {
        if (platformData.easySolved || platformData.mediumSolved || platformData.hardSolved) {
          const easySolved = platformData.easySolved || 0;
          const mediumSolved = platformData.mediumSolved || 0;
          const hardSolved = platformData.hardSolved || 0;
          return `E:${easySolved} M:${mediumSolved} H:${hardSolved}`;
        }
        if (platformData.totalSolved) return `Solved: ${platformData.totalSolved}`;
      }

      // Fallbacks
      if (platformData.ranking) return `Rank: ${platformData.ranking.toLocaleString()}`;

      if (platformData.problemsSolved) return `Solved: ${platformData.problemsSolved}`;
      return 'N/A';
    };

    const hasData = platformData && Object.keys(platformData).length > 0 &&
      (platformData.ranking || platformData.totalSolved || platformData.problemsSolved || platformData.rating);

    const badgeClass = hasData
      ? `${platformInfo.bgColor} ${platformInfo.borderColor} border`
      : 'bg-gray-700/50 border-gray-600 border';

    return (
      <div key={platformKey} className={`inline-flex items-center px-3 py-2 rounded-lg text-sm font-medium mr-3 mb-2 ${badgeClass} backdrop-blur-sm`}>
        <span className={`mr-2 ${platformInfo.color} font-bold`}>{platformInfo.name}:</span>
        <span className="text-white font-semibold">{getRatingDisplay()}</span>
      </div>
    );
  };

  const totalPages = propUsers ? Math.ceil(usersToDisplay.length / itemsPerPage) : Math.ceil(totalUsers / itemsPerPage);

  // Get paginated users
  const paginatedUsers = propUsers
    ? usersToDisplay.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
    : usersToDisplay;

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#FF3C5F] mx-auto mb-4"></div>
          <p className="text-gray-300 text-lg font-semibold">Loading leaderboard data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <div className="text-red-400 text-2xl mb-4">❌ {error}</div>
        <button
          onClick={fetchData}
          className="px-8 py-4 bg-gradient-to-r from-[#FF3C5F] to-[#FFC22D] text-white rounded-xl hover:from-[#FF3C5F]/80 hover:to-[#FFC22D]/80 transition-all transform hover:scale-105 font-semibold"
        >
          🔄 Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Leaderboard Type Tabs - Only show if not using propPlatform */}
      {!propPlatform && (
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {platforms.map((p) => (
            <button
              key={p.key}
              onClick={() => setLeaderboardType(p.key)}
              className={`px-8 py-3.5 rounded-2xl text-base font-bold transition-all duration-300 transform hover:scale-105 backdrop-blur-sm
                ${leaderboardType === p.key
                  ? `${p.bgColor} ${p.color} border-2 ${p.borderColor} shadow-lg shadow-${p.key === 'all' ? 'gray' : p.key === 'codeforces' ? '[#FF3C5F]' : p.key === 'leetcode' ? '[#FF7A30]' : '[#4CAF50]'}/30`
                  : 'bg-gray-800/30 text-gray-400 hover:bg-gray-700/50 border-2 border-transparent'}`}
            >
              {p.name}
            </button>
          ))}
        </div>
      )}


      {/* Leaderboard List */}
      <div className="relative bg-black/40 backdrop-blur-xl rounded-3xl border-2 border-gray-700/50 p-8 shadow-2xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#FF3C5F]/5 via-transparent to-[#FFC22D]/5 pointer-events-none" />
        {paginatedUsers.length === 0 ? (
          <div className="text-center py-16 min-h-[500px] flex flex-col items-center justify-center">
            <div className="text-gray-400 text-2xl mb-6 flex items-center justify-center">
              <BarChart3 className="w-8 h-8 mr-2" />
              No Users Found
            </div>
            <p className="text-gray-500 mb-6">
              {activePlatform === 'total-questions' && 'No users with LeetCode problems solved found.'}
              {activePlatform === 'codeforces' && 'No users with CodeForces rating found.'}
              {activePlatform === 'leetcode' && 'No users with LeetCode contest rating found.'}
              {!activePlatform && 'No verified users with platform data found.'}
            </p>
            <button
              onClick={() => navigate('/login')}
              className="px-8 py-3 bg-gradient-to-r from-[#FF3C5F] to-[#FFC22D] text-white rounded-xl hover:from-[#FF3C5F]/80 hover:to-[#FFC22D]/80 transition-all transform hover:scale-105 font-semibold flex items-center mx-auto"
            >
              <Rocket className="w-4 h-4 mr-2" />
              Sign In to Join
            </button>
          </div>
        ) : (
          <div className="relative overflow-x-auto min-h-[500px]">
            {/* Table header */}
            <table className="w-full min-w-full divide-y divide-gray-700/50">
              <thead className="bg-gray-900/50 sticky top-0 z-10">
                <tr className="text-left text-xs md:text-sm font-black text-gray-300 uppercase tracking-wider">
                  <th className="px-4 py-5 w-[10%]">Rank</th>
                  <th className="px-4 py-5 w-[25%]">Participant</th>
                  {activePlatform === 'total-questions' && (
                    <th className="hidden md:table-cell px-4 py-5 w-[15%]">LeetCode Questions</th>
                  )}
                  {activePlatform === 'codeforces' && (
                    <th className="hidden md:table-cell px-4 py-5 w-[15%]">CodeForces Rating</th>
                  )}
                  {activePlatform === 'leetcode' && (
                    <th className="hidden md:table-cell px-4 py-5 w-[15%]">LeetCode Contest Rating</th>
                  )}
                  <th className="px-4 py-5 w-[20%] text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/50">
                {paginatedUsers.map((user, index) => {
                  // Determine background color for top 3
                  let rowClassName = "hover:bg-gradient-to-r hover:from-gray-800/30 hover:to-transparent transition-all duration-200 cursor-pointer";
                  if (index === 0) rowClassName += " bg-gradient-to-r from-yellow-900/30 to-transparent border-l-4 border-yellow-400 shadow-lg";
                  else if (index === 1) rowClassName += " bg-gradient-to-r from-gray-700/30 to-transparent border-l-4 border-gray-300 shadow-lg";
                  else if (index === 2) rowClassName += " bg-gradient-to-r from-orange-900/30 to-transparent border-l-4 border-orange-400 shadow-lg";

                  const rank = index + 1 + (currentPage - 1) * itemsPerPage;

                  return (
                    <tr key={user._id || index} className={rowClassName}>
                      {/* Rank column with medal for top 3 */}
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <span className="mr-2">{getRankIcon(rank)}</span>
                          <span className="text-white font-semibold text-sm sm:text-base">#{rank}</span>
                        </div>
                      </td>

                      {/* Name & profile icon */}
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-3">
                          <div className="flex-grow min-w-0">
                            <div className="text-white font-semibold truncate text-sm sm:text-base">
                              {user.name || 'Unknown User'}
                            </div>
                            {/* Rating/Questions display below name - only shown on mobile */}
                            <div className="md:hidden flex space-x-3 mt-1">
                              {activePlatform === 'total-questions' && (
                                <span className="text-xs text-gray-400">
                                  Questions: <span className="text-[#FF7A30] font-bold">{user._leetcodeQuestions || 0}</span>
                                </span>
                              )}
                              {activePlatform === 'codeforces' && (
                                <span className="text-xs text-gray-400">
                                  Rating: <span className={getRatingColor(user._cfRating)}>{user._cfRating || 'N/A'}</span>
                                </span>
                              )}
                              {activePlatform === 'leetcode' && (
                                <span className="text-xs text-gray-400">
                                  Rating: <span className={getRatingColor(user._lcContestRating)}>{user._lcContestRating || 'N/A'}</span>
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Total Questions View - Only shown on desktop */}
                      {activePlatform === 'total-questions' && (
                        <td className="hidden md:table-cell px-4 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="font-bold text-[#FF7A30] text-base md:text-lg">
                              {user._leetcodeQuestions || 0}
                            </div>
                          </div>
                        </td>
                      )}

                      {/* CodeForces View - Only shown on desktop */}
                      {activePlatform === 'codeforces' && (
                        <td className="hidden md:table-cell px-4 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className={`font-bold ${getRatingColor(user._cfRating)} text-base md:text-lg`}>
                              {user._cfRating > 0 ? Math.round(user._cfRating).toLocaleString() : 'N/A'}
                            </div>
                          </div>
                        </td>
                      )}

                      {/* LeetCode View - Only shown on desktop */}
                      {activePlatform === 'leetcode' && (
                        <td className="hidden md:table-cell px-4 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className={`font-bold ${getRatingColor(user._lcContestRating)} text-base md:text-lg`}>
                              {user._lcContestRating > 0 ? Math.round(user._lcContestRating).toLocaleString() : 'N/A'}
                            </div>
                          </div>
                        </td>
                      )}

                      {/* View details button */}
                      <td className="px-4 py-4 whitespace-nowrap text-right">
                        <button
                          onClick={() => handleViewProfile(user)}
                          className="px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl bg-gradient-to-r from-[#FF3C5F] to-[#FFC22D] text-white font-bold text-xs sm:text-sm hover:from-[#FF3C5F] hover:to-[#FF2A4F] transition-all shadow-lg hover:shadow-xl hover:shadow-[#FF3C5F]/50 transform hover:scale-105"
                        >
                          View Profile
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center space-x-6 mt-10">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="p-3 rounded-xl bg-gradient-to-r from-gray-800 to-gray-700 text-gray-300 hover:from-gray-700 hover:to-gray-600 disabled:opacity-30 disabled:cursor-not-allowed transition-all hover:scale-110 shadow-lg border border-gray-600/50"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <div className="flex items-center space-x-3">
                  <span className="text-gray-400 text-base font-semibold">Page</span>
                  <span className="px-5 py-2 bg-gradient-to-r from-[#FF3C5F] to-[#FFC22D] text-white font-black text-lg rounded-xl shadow-lg">
                    {currentPage}
                  </span>
                  <span className="text-gray-400 text-base font-semibold">of {totalPages}</span>
                </div>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="p-3 rounded-xl bg-gradient-to-r from-gray-800 to-gray-700 text-gray-300 hover:from-gray-700 hover:to-gray-600 disabled:opacity-30 disabled:cursor-not-allowed transition-all hover:scale-110 shadow-lg border border-gray-600/50"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
            )}
          </div>
        )}
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
    </div>
  );
};

export default UnifiedLeaderboard;
