import React, { useState, useEffect } from 'react';
import UnifiedLeaderboard from './UnifiedLeaderboard';
import SidebarNavbar from './SidebarNavbar';
import ScrollToTop from './ui/ScrollToTop';
import { useNavigate } from 'react-router-dom';
import { Trophy, Zap, Target, Users, Star, Award, TrendingUp, Activity, Crown, Medal, Heart, Sparkles, ArrowRight, Globe, Code, GitBranch } from 'lucide-react';
import SplitText from './ui/text/SplitText';
import LandingFooter from './Footer';
import { API_ENDPOINTS, apiFetch } from '../utils/api';
import { logger } from '../utils/logger';
import LeaderboardParticipationDropdown from './LeaderboardParticipationDropdown';

// Simplified Glitch Effect Component
const GlitchText = ({ text, className = "" }) => {
  return (
    <span className={`${className} relative group`}>
      <span className="relative z-10">{text}</span>
      <span className="absolute inset-0 text-[#FF3C5F] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        {text}
      </span>
    </span>
  );
};

// Simplified Particle Effect Component
const ParticleEffect = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-gradient-to-r from-[#FF3C5F] to-[#FFC22D] rounded-full animate-pulse"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 2}s`,
            animationDuration: `${2 + Math.random() * 2}s`
          }}
        />
      ))}
    </div>
  );
};

const LeaderboardPage = () => {
  const [activeView, setActiveView] = useState('leetcode');
  const [isVisible, setIsVisible] = useState(false);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const [selectedYear, setSelectedYear] = useState(null); // null = All Years, '2025' = First Year, '2024' = Second Year, '2023' = Third Year

  const navigate = useNavigate();

  useEffect(() => {
    setIsVisible(true);
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeView]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      // Decide which platform data backend should filter by
      // - total-questions view should use LeetCode-verified users
      // - codeforces view uses Codeforces-verified users
      // - leetcode view uses LeetCode-verified users
      const backendPlatform =
        activeView === 'codeforces'
          ? 'codeforces'
          : 'leetcode';

      // Fetch users with high limit to get accurate stats,
      // but let backend enforce platform verification
      const url = `${API_ENDPOINTS.LEADERBOARD}?platform=${backendPlatform}&limit=1000&page=1`;
      
      const data = await apiFetch(url);
      
      // API returns { users: [...], totalCount: number }
      const fetchedUsers = data.users || (Array.isArray(data) ? data : []);
      const fetchedTotalCount = data.totalCount || fetchedUsers.length;
      
      setUsers(fetchedUsers);
      setTotalCount(fetchedTotalCount);
    } catch (e) {
      logger.error('Error fetching leaderboard:', e);
      setUsers([]);
      setTotalCount(0);
    } finally {
      setLoading(false);
    }
  };

  // Extract year from email (first 4 digits)
  const extractYearFromEmail = (email) => {
    if (!email) return null;
    // Email format: 2025ucp1566@mnit.ac.in
    // Extract first 4 digits
    const match = email.match(/^(\d{4})/);
    return match ? match[1] : null;
  };

  // Filter users based on selected year
  const filteredUsers = selectedYear
    ? users.filter(user => {
        const userYear = extractYearFromEmail(user.email);
        return userYear === selectedYear;
      })
    : users;

  // Calculate stats using the filtered user data
  const totalUsers = filteredUsers.length;
  
  // Count users with verified platforms - check if platform data exists
  const codeforcesUsers = filteredUsers.filter(
    u => u.platforms?.codeforces && (
      u.platforms.codeforces.rating !== undefined || 
      u.platforms.codeforces.rating !== null ||
      Object.keys(u.platforms.codeforces).length > 0
    )
  ).length;
  
  const leetcodeUsers = filteredUsers.filter(
    u => u.platforms?.leetcode && (
      u.platforms.leetcode.easySolved !== undefined ||
      u.platforms.leetcode.mediumSolved !== undefined ||
      u.platforms.leetcode.hardSolved !== undefined ||
      Object.keys(u.platforms.leetcode).length > 0
    )
  ).length;

  const stats = [
    {
      label: 'Total Users',
      value: totalUsers,
      icon: <Users className="w-7 h-7" />,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/20',
    },
    {
      label: 'Codeforces Users',
      value: codeforcesUsers,
      icon: <Activity className="w-7 h-7" />,
      color: 'text-green-400',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/20',
    },
    {
      label: 'LeetCode Users',
      value: leetcodeUsers,
      icon: <Crown className="w-7 h-7" />,
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-500/10',
      borderColor: 'border-yellow-500/20',
  ];

  // Year filter options
  const yearFilters = [
    { key: null, label: 'All Years', year: null },
    { key: '2025', label: 'First Year', year: '2025' },
    { key: '2024', label: 'Second Year', year: '2024' },
    { key: '2023', label: 'Third Year', year: '2023' },
  ];
  
  const features = [
    { icon: <Globe className="w-5 h-5" />, text: 'Multi-platform tracking' },
    { icon: <Code className="w-5 h-5" />, text: 'Real-time updates' },
    { icon: <GitBranch className="w-5 h-5" />, text: 'Performance analytics' },
    { icon: <Sparkles className="w-5 h-5" />, text: 'Achievement system' }
  ];

  const platforms = [
    {
      key: 'leetcode',
      name: 'LeetCode',
      icon: <img src="/LeetCode_Logo.png" className="w-7 h-7" alt="leetcode logo" />,
      color: 'from-[#FF7A30] to-[#FFC22D]',
      gradient: 'from-[#FF7A30] to-[#FFC22D]',
      description: 'Contest ratings'
    },
    {
      key: 'codeforces',
      name: 'Codeforces',
      icon: <img src="/codeforces_logo.png" className="w-7 h-7" alt="codeforces logo" />,
      color: 'from-[#3C5CFF] to-[#3CFFB7]',
      gradient: 'from-[#3C5CFF] to-[#3CFFB7]',
      description: 'Contest rankings'
    },
    {
      key: 'total-questions',
      name: 'Total Questions',
      icon: <Trophy className="w-7 h-7" />,
      color: 'from-[#FF3C5F] to-[#FFC22D]',
      gradient: 'from-[#FF3C5F] to-[#FFC22D]',
      description: 'LeetCode problems solved'
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Simple Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,60,95,0.1),transparent_50%)]"></div>

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
                  text="Competitive"
                  splitType="chars"
                  delay={60}
                  duration={0.55}
                  ease="power3.out"
                  from={{ opacity: 0, y: 28 }}
                  to={{ opacity: 1, y: 0 }}
                  threshold={0.12}
                  rootMargin="-80px"
                  textAlign="center"
                  gradient="bg-gradient-to-r from-[#FF3C5F] via-[#FF7A30] to-[#FFC22D] bg-clip-text text-transparent"
                />
                <br />
                <SplitText
                  as="span"
                  text="Programming"
                  splitType="chars"
                  delay={200}
                  duration={0.55}
                  ease="power3.out"
                  from={{ opacity: 0, y: 28 }}
                  to={{ opacity: 1, y: 0 }}
                  threshold={0.12}
                  rootMargin="-80px"
                  textAlign="center"
                  gradient="bg-gradient-to-r from-[#FF3C5F] via-[#FF7A30] to-[#FFC22D] bg-clip-text text-transparent"
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
                Track your progress across{' '}
                <span className="text-[#FF3C5F] font-bold hover:text-[#FF7A30] transition-all duration-300 cursor-pointer">
                  Codeforces
                </span>{' '}
                and{' '}
                <span className="text-[#FF7A30] font-bold hover:text-[#FFC22D] transition-all duration-300 cursor-pointer">
                  LeetCode
                </span>
              </p>
            </div>

            {/* Features Row */}
            <div className="flex flex-wrap justify-center gap-6 mb-10">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-2 text-gray-400 group hover:text-white transition-all duration-300 transform hover:scale-105"
                >
                  <div className="group-hover:scale-110 group-hover:text-[#FF3C5F] transition-all duration-300">
                    {feature.icon}
                  </div>
                  <span className="text-sm font-medium group-hover:font-bold transition-all duration-300">{feature.text}</span>
                </div>
              ))}
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-12 max-w-5xl mx-auto">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className={`group bg-black/60 backdrop-blur-md rounded-2xl p-6 border ${stat.borderColor} hover:border-[#FF3C5F]/50 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-[#FF3C5F]/20 relative overflow-hidden`}
                >
                  {/* Background gradient on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${stat.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>

                  <div className="relative z-10">
                    <div className="flex items-center justify-center mb-4">
                      <div className={`${stat.color} group-hover:scale-110 transition-all duration-300`}>
                        {stat.icon}
                      </div>
                    </div>
                    <div className="text-3xl font-black text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#FF3C5F] group-hover:to-[#FFC22D] transition-all duration-500">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-400 group-hover:text-gray-300 transition-all duration-300 font-medium">
                      {stat.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Call to Action */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-8 mb-12 relative">
              <button
                onClick={() => navigate('/profile')}
                className="group relative px-10 py-5 bg-gradient-to-r from-[#FF3C5F] to-[#FFC22D] hover:from-[#FF2A4F] hover:to-[#FFB21D] text-white font-black text-xl rounded-2xl transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-[#FF3C5F]/30 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#FFC22D] to-[#FF3C5F] opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                <div className="relative flex items-center">
                  <Zap className="w-6 h-6 mr-3 group-hover:animate-pulse" />
                  Your Profile
                  <ArrowRight className="w-5 h-5 ml-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-500" />
                </div>
              </button>
              <div className="flex items-center space-x-3 text-gray-400 group hover:text-white transition-all duration-300">
                <div className="relative">
                  <Medal className="w-6 h-6 group-hover:scale-110 group-hover:text-yellow-400 transition-all duration-300" />
                  <Sparkles className="absolute -top-1 -right-1 w-3 h-3 text-yellow-400 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                </div>
                <span className="text-lg font-semibold group-hover:font-bold transition-all duration-300">Top performers recognized</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Platform Navigation */}
      <div className="  max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="bg-black/60 backdrop-blur-md rounded-3xl p-4 border border-gray-800/50 shadow-2xl">
          <div className=" w-full text-center flex flex-wrap justify-center gap-3 ">
            {platforms.map((platform, index) => (
              <button
                key={platform.key}
                onClick={() => setActiveView(platform.key)}
                className={`group relative w-full md:max-w-sm px-10 md:px-4  py-6 rounded-2xl font-black text-lg transition-all duration-500 transform hover:scale-105 overflow-hidden ${activeView === platform.key
                    ? `bg-gradient-to-r ${platform.color} text-white shadow-2xl scale-105`
                    : 'bg-gray-900/60 text-gray-300 hover:bg-gray-800/80 border border-gray-700 hover:border-gray-600'
                  }`}
              >
                {/* Hover background effect */}
                {activeView !== platform.key && (
                  <div className={`absolute inset-0 bg-gradient-to-r ${platform.gradient} opacity-0 group-hover:opacity-20 transition-all duration-500`}></div>
                )}

                <div className="relative flex items-center space-x-4">
                  <div className={`${activeView === platform.key ? 'text-white' : 'text-gray-400'} group-hover:text-white group-hover:scale-110 transition-all duration-300`}>
                    {platform.icon}
                  </div>
                  <div className="text-left">
                    <div className="font-black text-xl">{platform.name}</div>
                    <div className="text-sm opacity-75 group-hover:opacity-100 transition-all duration-300 font-medium">
                      {platform.description}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Year Filter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="bg-black/60 backdrop-blur-md rounded-3xl p-4 border border-gray-800/50 shadow-2xl">
          <div className="flex flex-wrap justify-center gap-3">
            {yearFilters.map((filter) => (
              <button
                key={filter.key}
                onClick={() => setSelectedYear(filter.year)}
                className={`group relative px-6 py-3 rounded-xl font-bold text-sm md:text-base transition-all duration-500 transform hover:scale-105 overflow-hidden ${
                  selectedYear === filter.year
                    ? 'bg-gradient-to-r from-[#FF3C5F] to-[#FFC22D] text-white shadow-2xl scale-105'
                    : 'bg-gray-900/60 text-gray-300 hover:bg-gray-800/80 border border-gray-700 hover:border-gray-600'
                }`}
              >
                {/* Hover background effect */}
                {selectedYear !== filter.year && (
                  <div className="absolute inset-0 bg-gradient-to-r from-[#FF3C5F] to-[#FFC22D] opacity-0 group-hover:opacity-20 transition-all duration-500"></div>
                )}
                <div className="relative z-10">
                  {filter.label}
                  {filter.year && (
                    <span className="ml-2 text-xs opacity-75">({filter.year})</span>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <LeaderboardParticipationDropdown />
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="group bg-black/60 backdrop-blur-md rounded-3xl border border-gray-800/50 shadow-2xl overflow-hidden hover:border-[#FF3C5F]/30 transition-all duration-500">
          {/* Content Header */}
          <div className="bg-gradient-to-r from-gray-900/80 to-gray-800/80 p-2 md:px-10 md: py-8 border-b border-gray-700/50">
            <div className=" flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <div className=" w-12 h-12 md:w-16 md:h-16 bg-black rounded-2xl flex items-center justify-center transition-all duration-500 shadow-lg">
                  {activeView === 'total-questions' && <Trophy className="w-8 h-8 text-white" />}
                  {activeView === 'codeforces' && <img src="/codeforces_logo.png" className='w-12 h-12   bg-black rounded-md' alt="codeforces logo" />}
                  {activeView === 'leetcode' && <img src="/LeetCode_Logo.png" className='w-12 h-12' alt="leetcode logo" />}
                </div>

                <div>
                  <h2 className=" md:text-3xl font-black text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#FF3C5F] group-hover:to-[#FFC22D] transition-all duration-500">
                    {activeView === 'total-questions' && 'LeetCode Questions Leaderboard'}
                    {activeView === 'codeforces' && 'Codeforces Leaderboard'}
                    {activeView === 'leetcode' && 'LeetCode Leaderboard'}
                  </h2>
                  <p className="text-gray-400 text-sm md:text-lg group-hover:text-gray-300 transition-all duration-300 font-medium">
                    {activeView === 'total-questions' && 'Ranked by LeetCode problems solved'}
                    {activeView === 'codeforces' && 'Ranked by Codeforces rating'}
                    {activeView === 'leetcode' && 'Ranked by LeetCode contest rating'}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3 text-gray-400">
                <div className="relative">
                  <TrendingUp className="w-6 h-6 group-hover:text-[#FF3C5F] group-hover:scale-110 transition-all duration-300" />
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full"></div>
                </div>
                <span className="text-sm md:text-lg font-semibold group-hover:text-white transition-all duration-300">Live Updates</span>
              </div>
            </div>
          </div>

          {/* Leaderboard Content */}
          <div className="p-6">
            <div className="h-[600px] overflow-y-auto">
              <UnifiedLeaderboard platform={activeView === 'total-questions' ? 'total-questions' : activeView} users={filteredUsers} loading={loading} />
            </div>
          </div>
        </div>
      </div>

      <LandingFooter />
    </div>
  );
};

export default LeaderboardPage;