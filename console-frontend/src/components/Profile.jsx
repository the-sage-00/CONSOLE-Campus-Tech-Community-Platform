import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SidebarNavbar from './SidebarNavbar';
import { apiFetch, API_ENDPOINTS } from '../utils/api';
import { useAuth } from '../context/AuthProvider';
import PlatformVerificationModal from './PlatformVerificationModal';
import { logger } from '../utils/logger';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

const Profile = () => {
  const navigate = useNavigate();
  const { user: authUser, logout, getToken } = useAuth();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [platformHandles, setPlatformHandles] = useState({
    leetcode: '',
    codeforces: ''
  });
  const [verificationModal, setVerificationModal] = useState({
    show: false,
    platform: '',
    data: null
  });

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const token = getToken();
      if (!token) {
        logout();
        navigate('/login');
        return;
      }

      const data = await apiFetch(API_ENDPOINTS.PROFILE, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      setUser(data.data);

      // Set platform handles from user data
      if (data.data.platformVerification) {
        setPlatformHandles({
          leetcode: data.data.platformVerification.leetcode?.handle || '',
          codeforces: data.data.platformVerification.codeforces?.handle || ''
        });
      }
    } catch (error) {
      logger.error('Error fetching profile:', error);
      if (error.message.includes('401')) {
        logout();
        navigate('/login');
      } else {
        setMessage({ type: 'error', text: 'Failed to load profile' });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handlePlatformSubmit = async (platform) => {
    const handle = platformHandles[platform];
    if (!handle) {
      setMessage({ type: 'error', text: 'Please enter a valid username' });
      return;
    }

    try {
      setMessage({ type: 'info', text: `Fetching ${platform} profile data...` });
      const token = getToken();

      if (!token) {
        logout();
        navigate('/login');
        return;
      }

      // Submit the handle and fetch platform data
      const data = await apiFetch(API_ENDPOINTS.SUBMIT_PLATFORM, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ platform, handle })
      });

      setVerificationModal({
        show: true,
        platform,
        data: data.data
      });
      setMessage({ type: 'success', text: `${platform} profile data fetched successfully! Verification code generated.` });
    } catch (error) {
      logger.error('Error submitting platform:', error);
      if (error.message.includes('401')) {
        logout();
        navigate('/login');
      } else {
        setMessage({ type: 'error', text: error.message || 'Failed to submit platform handle' });
      }
    }
  };

  const handlePlatformVerify = async (platform) => {
    try {
      setMessage({ type: 'info', text: `Verifying ${platform} profile...` });

      const token = getToken();
      if (!token) {
        logout();
        navigate('/login');
        return;
      }

      const data = await apiFetch(API_ENDPOINTS.VERIFY_PLATFORM, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ platform })
      });

      setMessage({ type: 'success', text: data.message });
      setVerificationModal({ show: false, platform: '', data: null });
      fetchUserProfile(); // Refresh profile data
    } catch (error) {
      logger.error('Error verifying platform:', error);

      if (error.message.includes('401')) {
        logout();
        navigate('/login');
      } else if (error.message.includes('Could not verify')) {
        setMessage({
          type: 'error',
          text: `❌ Verification failed! Please make sure you have added the verification code "${verificationModal.data?.verificationCode}" to your ${platform} profile and try again.`
        });
      } else if (error.message.includes('expired')) {
        setMessage({
          type: 'error',
          text: `❌ Verification code has expired. Please submit your handle again to get a new code.`
        });
      } else {
        setMessage({
          type: 'error',
          text: error.message || 'Verification failed. Please try again.'
        });
      }
    }
  };

  const handleRefreshPlatform = async (platform) => {
    try {
      setMessage({ type: 'info', text: `Refreshing ${platform} data...` });

      const token = getToken();
      if (!token) {
        logout();
        navigate('/login');
        return;
      }

      const data = await apiFetch(API_ENDPOINTS.REFRESH_PLATFORM, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ platform })
      });

      setMessage({ type: 'success', text: `${platform} data refreshed successfully!` });
      fetchUserProfile(); // Refresh profile data
    } catch (error) {
      logger.error('Error refreshing platform:', error);
      if (error.message.includes('401')) {
        logout();
        navigate('/login');
      } else {
        setMessage({ type: 'error', text: error.message || 'Failed to refresh platform data' });
      }
    }
  };

  const handleDeletePlatform = async (platform) => {
    // Show confirmation dialog
    const confirmed = window.confirm(
      `Are you sure you want to delete your ${platform} handle? This will remove your ${platform} data from the leaderboard and your profile. This action cannot be undone.`
    );

    if (!confirmed) {
      return;
    }

    try {
      setMessage({ type: 'info', text: `Deleting ${platform} handle...` });

      const token = getToken();
      if (!token) {
        logout();
        navigate('/login');
        return;
      }

      const data = await apiFetch(API_ENDPOINTS.DELETE_PLATFORM, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ platform })
      });

      setMessage({ type: 'success', text: data.message });
      fetchUserProfile(); // Refresh profile data
    } catch (error) {
      logger.error('Error deleting platform:', error);
      if (error.message.includes('401')) {
        logout();
        navigate('/login');
      } else {
        setMessage({ type: 'error', text: error.message || 'Failed to delete platform handle' });
      }
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white">
        <SidebarNavbar />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#FF3C5F] mx-auto mb-4"></div>
            <p className="text-gray-400">Loading profile...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-black text-white">
        <SidebarNavbar />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <p className="text-red-400 mb-4">Failed to load profile</p>
            <button
              onClick={() => navigate('/login')}
              className="px-6 py-2 bg-gradient-to-r from-[#FF3C5F] to-[#FFC22D] text-white rounded-lg hover:from-[#FF3C5F]/90 hover:to-[#FFC22D]/90 transition-all"
            >
              Go to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  const lcData = user.platformVerification?.leetcode?.platformData;
  const cfData = user.platformVerification?.codeforces?.platformData;
  const lcTotal = (lcData?.easySolved || 0) + (lcData?.mediumSolved || 0) + (lcData?.hardSolved || 0);
  const cfRating = cfData?.rating || user.platforms?.codeforces?.rating || 0;
  const totalScore = user.totalScore || 0;
  const lcVerified = user.platformVerification?.leetcode?.isVerified;
  const cfVerified = user.platformVerification?.codeforces?.isVerified;

  const achievements = [
    { id: 'lc-beginner', label: 'Problem Solver', desc: 'Solved your first LeetCode problem', earned: lcVerified && lcTotal > 0, icon: '⭐' },
    { id: 'lc-century', label: 'Century Club', desc: 'Solved 100+ LeetCode problems', earned: lcVerified && lcTotal >= 100, icon: '💯' },
    { id: 'lc-hard', label: 'Hard Hitter', desc: 'Solved 10+ hard problems', earned: lcVerified && (lcData?.hardSolved || 0) >= 10, icon: '🔥' },
    { id: 'cf-rated', label: 'Rising Star', desc: 'Achieved a Codeforces rating', earned: cfVerified && cfRating > 0, icon: '🌟' },
    { id: 'cf-expert', label: 'Codeforces Expert', desc: 'Rating above 1600', earned: cfVerified && cfRating >= 1600, icon: '💠' },
    { id: 'both-platforms', label: 'Double Threat', desc: 'Verified both platforms', earned: lcVerified && cfVerified, icon: '🏆' },
    { id: 'member', label: 'Community Member', desc: 'Joined the platform', earned: true, icon: '🎓' },
    { id: 'lc-all-rounder', label: 'All Rounder', desc: 'Solved problems in all difficulties', earned: lcVerified && (lcData?.easySolved || 0) > 0 && (lcData?.mediumSolved || 0) > 0 && (lcData?.hardSolved || 0) > 0, icon: '💎' },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <SidebarNavbar />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto">

          {/* Flash Message */}
          {message.text && (
            <div
              className={`mb-6 p-4 rounded-lg text-sm sm:text-base ${message.type === "success"
                  ? "bg-green-900/80 border border-green-700 text-green-300"
                  : message.type === "error"
                    ? "bg-red-900/80 border border-red-700 text-red-300"
                    : "bg-blue-900/80 border border-blue-700 text-blue-300"
                }`}
            >
              {message.text}
            </div>
          )}

          {/* Profile Hero Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative overflow-hidden rounded-2xl mb-8 bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 border border-gray-800 p-8"
          >
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[#FF3C5F]/10 to-[#FFC22D]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <div className="relative group">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#FF3C5F] to-[#FFC22D] blur-md opacity-75 group-hover:opacity-100 transition-opacity" />
                {user.profilePicture ? (
                  <img
                    src={user.profilePicture}
                    alt={user.name}
                    className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-2 border-gray-900"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                ) : null}
                <div
                  className={`relative w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br from-[#FF3C5F] to-[#FFC22D] flex items-center justify-center text-4xl font-bold text-white ${user.profilePicture ? 'hidden' : ''}`}
                >
                  {user.name?.charAt(0)?.toUpperCase() || '?'}
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-[#FF3C5F] to-[#FFC22D] bg-clip-text text-transparent">
                      {user.name}
                    </h1>
                    <p className="text-gray-400 mt-1">{user.email}</p>
                    <div className="flex flex-wrap items-center gap-3 mt-3">
                      {user.branch && (
                        <span className="inline-flex items-center gap-1 text-xs px-3 py-1 rounded-full bg-gray-800 text-gray-300 border border-gray-700">
                          {user.branch}
                        </span>
                      )}
                      {user.admissionYear && (
                        <span className="inline-flex items-center gap-1 text-xs px-3 py-1 rounded-full bg-gray-800 text-gray-300 border border-gray-700">
                          {user.admissionYear} Batch
                        </span>
                      )}
                      {user.rollNo && (
                        <span className="inline-flex items-center gap-1 text-xs px-3 py-1 rounded-full bg-gray-800 text-gray-300 border border-gray-700 font-mono">
                          {user.rollNo}
                        </span>
                      )}
                      <span className={`inline-flex items-center gap-1 text-xs px-3 py-1 rounded-full ${user.isEmailVerified ? 'bg-green-900/60 text-green-300 border border-green-700' : 'bg-red-900/60 text-red-300 border border-red-700'}`}>
                        {user.isEmailVerified ? 'Verified' : 'Unverified'}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 bg-red-600/80 hover:bg-red-600 text-white rounded-lg transition-all text-sm self-start sm:self-auto border border-red-500/30"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Quick Stats Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8"
          >
            <div className="bg-gray-900/60 border border-gray-800 rounded-xl p-4 hover:border-[#FF3C5F]/30 transition-colors">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-[#FF3C5F]/10">
                  <svg className="w-4 h-4 text-[#FF3C5F]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">Total Score</span>
              </div>
              <p className="text-2xl font-bold text-white">{totalScore}</p>
            </div>
            <div className="bg-gray-900/60 border border-gray-800 rounded-xl p-4 hover:border-[#FFC22D]/30 transition-colors">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-[#FFC22D]/10">
                  <svg className="w-4 h-4 text-[#FFC22D]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">LC Solved</span>
              </div>
              <p className="text-2xl font-bold text-white">{lcTotal}</p>
            </div>
            <div className="bg-gray-900/60 border border-gray-800 rounded-xl p-4 hover:border-blue-500/30 transition-colors">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-blue-500/10">
                  <svg className="w-4 h-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                </div>
                <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">CF Rating</span>
              </div>
              <p className="text-2xl font-bold text-white">{cfRating || 'N/A'}</p>
            </div>
            <div className="bg-gray-900/60 border border-gray-800 rounded-xl p-4 hover:border-green-500/30 transition-colors">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-green-500/10">
                  <svg className="w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">LC Ranking</span>
              </div>
              <p className="text-2xl font-bold text-white">{lcData?.ranking ? `#${lcData.ranking.toLocaleString()}` : 'N/A'}</p>
            </div>
          </motion.div>

          {/* Charts Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8"
          >
            {/* LeetCode Difficulty Pie Chart */}
            <div className="bg-gray-900/40 border border-gray-800 rounded-xl p-6">
              <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">LeetCode Difficulty Breakdown</h3>
              {user.platformVerification?.leetcode?.isVerified && lcData ? (
                <div className="flex items-center justify-center">
                  <ResponsiveContainer width="100%" height={220}>
                    <PieChart>
                      <Pie
                        data={[
                          { name: 'Easy', value: lcData.easySolved || 0, color: '#4ade80' },
                          { name: 'Medium', value: lcData.mediumSolved || 0, color: '#facc15' },
                          { name: 'Hard', value: lcData.hardSolved || 0, color: '#f87171' },
                        ]}
                        cx="50%"
                        cy="50%"
                        innerRadius={55}
                        outerRadius={90}
                        paddingAngle={3}
                        dataKey="value"
                      >
                        {[
                          { color: '#4ade80' },
                          { color: '#facc15' },
                          { color: '#f87171' },
                        ].map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#1f2937',
                          border: '1px solid #374151',
                          borderRadius: '8px',
                          color: '#f3f4f6',
                          fontSize: '13px',
                        }}
                        formatter={(value, name) => [`${value} solved`, name]}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="flex flex-col gap-2 ml-2">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-green-400" />
                      <span className="text-xs text-gray-400">Easy <span className="text-white font-medium">{lcData.easySolved || 0}</span></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-yellow-400" />
                      <span className="text-xs text-gray-400">Medium <span className="text-white font-medium">{lcData.mediumSolved || 0}</span></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-400" />
                      <span className="text-xs text-gray-400">Hard <span className="text-white font-medium">{lcData.hardSolved || 0}</span></span>
                    </div>
                    <div className="border-t border-gray-700 pt-2 mt-1">
                      <span className="text-xs text-gray-400">Total <span className="text-white font-bold">{lcTotal}</span></span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-[220px] text-gray-500 text-sm">
                  {user.platformVerification?.leetcode?.handle ? 'Verify your LeetCode handle to see stats' : 'Connect LeetCode to see breakdown'}
                </div>
              )}
            </div>

            {/* Codeforces Rating Progress */}
            <div className="bg-gray-900/40 border border-gray-800 rounded-xl p-6">
              <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">Codeforces Progress</h3>
              {user.platformVerification?.codeforces?.isVerified && cfData ? (
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs text-gray-400">Rating Progress</span>
                      <span className="text-xs text-gray-400">{cfData.rating || 0} / {cfData.maxRating || 0}</span>
                    </div>
                    <div className="w-full h-3 bg-gray-800 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500"
                        style={{ width: `${cfData.maxRating ? Math.min((cfData.rating / cfData.maxRating) * 100, 100) : 0}%` }}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-800/50 rounded-lg p-3 text-center">
                      <div className="text-lg font-bold text-blue-400">{cfData.rating || 'Unrated'}</div>
                      <div className="text-xs text-gray-500 mt-0.5">Current Rating</div>
                    </div>
                    <div className="bg-gray-800/50 rounded-lg p-3 text-center">
                      <div className="text-lg font-bold text-purple-400">{cfData.maxRating || 0}</div>
                      <div className="text-xs text-gray-500 mt-0.5">Peak Rating</div>
                    </div>
                    <div className="bg-gray-800/50 rounded-lg p-3 text-center">
                      <div className="text-lg font-bold text-indigo-400 capitalize">{cfData.rank || 'Unrated'}</div>
                      <div className="text-xs text-gray-500 mt-0.5">Rank</div>
                    </div>
                    <div className="bg-gray-800/50 rounded-lg p-3 text-center">
                      <div className="text-lg font-bold text-teal-400">{cfData.totalSolved || 0}</div>
                      <div className="text-xs text-gray-500 mt-0.5">Problems Solved</div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-[220px] text-gray-500 text-sm">
                  {user.platformVerification?.codeforces?.handle ? 'Verify your Codeforces handle to see stats' : 'Connect Codeforces to see progress'}
                </div>
              )}
            </div>
          </motion.div>

          {/* Platform Connections */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-6 mb-8"
          >
            <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-[#FF3C5F] to-[#FFC22D] bg-clip-text text-transparent">
              Platform Connections
            </h2>

            {/* LeetCode */}
            <div className="bg-gray-900/40 border border-gray-800 rounded-xl overflow-hidden hover:border-gray-700 transition-colors">
              <div className="flex items-center justify-between px-6 py-4 bg-gray-900/80 border-b border-gray-800">
                <div className="flex items-center gap-3">
                  <img src="/LeetCode_Logo.png" alt="LeetCode" className="w-7 h-7" />
                  <div>
                    <h3 className="font-semibold">LeetCode</h3>
                    {user.platformVerification?.leetcode?.isVerified && (
                      <p className="text-xs text-gray-400">@{user.platformVerification.leetcode.handle}</p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {user.platformVerification?.leetcode?.isVerified ? (
                    <span className="text-xs px-3 py-1 rounded-full bg-green-900/60 text-green-300 border border-green-700">Verified</span>
                  ) : user.platformVerification?.leetcode?.handle ? (
                    <span className="text-xs px-3 py-1 rounded-full bg-yellow-900/60 text-yellow-300 border border-yellow-700">Pending</span>
                  ) : (
                    <span className="text-xs px-3 py-1 rounded-full bg-gray-800 text-gray-400 border border-gray-700">Not Connected</span>
                  )}
                </div>
              </div>

              <div className="p-6">
                {user.platformVerification?.leetcode?.isVerified ? (
                  <div className="space-y-5">
                    {lcData && (
                      <div className="grid grid-cols-3 gap-4">
                        <div className="text-center p-3 rounded-lg bg-green-500/5 border border-green-500/10">
                          <div className="text-xl font-bold text-green-400">{lcData.easySolved || 0}</div>
                          <div className="text-xs text-gray-400 mt-1">Easy</div>
                        </div>
                        <div className="text-center p-3 rounded-lg bg-yellow-500/5 border border-yellow-500/10">
                          <div className="text-xl font-bold text-yellow-400">{lcData.mediumSolved || 0}</div>
                          <div className="text-xs text-gray-400 mt-1">Medium</div>
                        </div>
                        <div className="text-center p-3 rounded-lg bg-red-500/5 border border-red-500/10">
                          <div className="text-xl font-bold text-red-400">{lcData.hardSolved || 0}</div>
                          <div className="text-xs text-gray-400 mt-1">Hard</div>
                        </div>
                      </div>
                    )}
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => handleRefreshPlatform("leetcode")}
                        className="px-4 py-2 text-sm bg-blue-600/80 hover:bg-blue-600 rounded-lg transition-colors"
                      >
                        Refresh Data
                      </button>
                      <button
                        onClick={() => handleDeletePlatform("leetcode")}
                        className="px-4 py-2 text-sm bg-red-600/80 hover:bg-red-600 rounded-lg transition-colors"
                      >
                        Delete Handle
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col sm:flex-row gap-3">
                    <input
                      type="text"
                      placeholder="Enter LeetCode username"
                      value={platformHandles.leetcode}
                      onChange={(e) =>
                        setPlatformHandles((prev) => ({
                          ...prev,
                          leetcode: e.target.value,
                        }))
                      }
                      className="flex-1 px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FF3C5F] focus:border-transparent text-sm"
                    />
                    <button
                      onClick={() => handlePlatformSubmit("leetcode")}
                      className="px-6 py-2.5 bg-gradient-to-r from-[#FF3C5F] to-[#FFC22D] text-white rounded-lg font-medium text-sm hover:opacity-90 transition-opacity"
                    >
                      Connect
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Codeforces */}
            <div className="bg-gray-900/40 border border-gray-800 rounded-xl overflow-hidden hover:border-gray-700 transition-colors">
              <div className="flex items-center justify-between px-6 py-4 bg-gray-900/80 border-b border-gray-800">
                <div className="flex items-center gap-3">
                  <img src="/codeforces_logo.png" alt="Codeforces" className="w-7 h-7" />
                  <div>
                    <h3 className="font-semibold">Codeforces</h3>
                    {user.platformVerification?.codeforces?.isVerified && (
                      <p className="text-xs text-gray-400">@{user.platformVerification.codeforces.handle}</p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {user.platformVerification?.codeforces?.isVerified ? (
                    <span className="text-xs px-3 py-1 rounded-full bg-green-900/60 text-green-300 border border-green-700">Verified</span>
                  ) : user.platformVerification?.codeforces?.handle ? (
                    <span className="text-xs px-3 py-1 rounded-full bg-yellow-900/60 text-yellow-300 border border-yellow-700">Pending</span>
                  ) : (
                    <span className="text-xs px-3 py-1 rounded-full bg-gray-800 text-gray-400 border border-gray-700">Not Connected</span>
                  )}
                </div>
              </div>

              <div className="p-6">
                {user.platformVerification?.codeforces?.isVerified ? (
                  <div className="space-y-5">
                    {cfData && (
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        <div className="text-center p-3 rounded-lg bg-blue-500/5 border border-blue-500/10">
                          <div className="text-lg font-bold text-blue-400">{cfData.rating || 'Unrated'}</div>
                          <div className="text-xs text-gray-400 mt-1">Rating</div>
                        </div>
                        <div className="text-center p-3 rounded-lg bg-purple-500/5 border border-purple-500/10">
                          <div className="text-lg font-bold text-purple-400">{cfData.maxRating || 0}</div>
                          <div className="text-xs text-gray-400 mt-1">Max Rating</div>
                        </div>
                        <div className="text-center p-3 rounded-lg bg-indigo-500/5 border border-indigo-500/10">
                          <div className="text-lg font-bold text-indigo-400">{cfData.rank || 'Unrated'}</div>
                          <div className="text-xs text-gray-400 mt-1">Rank</div>
                        </div>
                        <div className="text-center p-3 rounded-lg bg-teal-500/5 border border-teal-500/10">
                          <div className="text-lg font-bold text-teal-400">{cfData.totalSolved || 0}</div>
                          <div className="text-xs text-gray-400 mt-1">Solved</div>
                        </div>
                      </div>
                    )}
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => handleRefreshPlatform("codeforces")}
                        className="px-4 py-2 text-sm bg-blue-600/80 hover:bg-blue-600 rounded-lg transition-colors"
                      >
                        Refresh Data
                      </button>
                      <button
                        onClick={() => handleDeletePlatform("codeforces")}
                        className="px-4 py-2 text-sm bg-red-600/80 hover:bg-red-600 rounded-lg transition-colors"
                      >
                        Delete Handle
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col sm:flex-row gap-3">
                    <input
                      type="text"
                      placeholder="Enter Codeforces username"
                      value={platformHandles.codeforces}
                      onChange={(e) =>
                        setPlatformHandles((prev) => ({
                          ...prev,
                          codeforces: e.target.value,
                        }))
                      }
                      className="flex-1 px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FF3C5F] focus:border-transparent text-sm"
                    />
                    <button
                      onClick={() => handlePlatformSubmit("codeforces")}
                      className="px-6 py-2.5 bg-gradient-to-r from-[#FF3C5F] to-[#FFC22D] text-white rounded-lg font-medium text-sm hover:opacity-90 transition-opacity"
                    >
                      Connect
                    </button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Achievements / Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="bg-gray-900/40 border border-gray-800 rounded-xl p-6 mb-8"
          >
            <h3 className="text-lg font-semibold mb-1 text-gray-300">Achievements</h3>
            <p className="text-xs text-gray-500 mb-5">Badges earned based on your activity</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {achievements.map((badge) => (
                <div
                  key={badge.id}
                  className={`relative p-3 rounded-xl border text-center transition-all ${
                    badge.earned
                      ? 'bg-gray-800/60 border-gray-700 hover:border-[#FFC22D]/40 hover:bg-gray-800'
                      : 'bg-gray-900/40 border-gray-800/50 opacity-40'
                  }`}
                >
                  <div className={`text-2xl mb-1 ${badge.earned ? '' : 'grayscale'}`}>{badge.icon}</div>
                  <div className={`text-xs font-semibold ${badge.earned ? 'text-gray-200' : 'text-gray-500'}`}>{badge.label}</div>
                  <div className="text-[10px] text-gray-500 mt-0.5 leading-tight">{badge.desc}</div>
                  {!badge.earned && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-900/60 rounded-xl">
                      <span className="text-xs text-gray-500">Locked</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Account Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-gray-900/40 border border-gray-800 rounded-xl p-6"
          >
            <h3 className="text-lg font-semibold mb-4 text-gray-300">Account Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
              <div className="p-3 rounded-lg bg-gray-800/40">
                <span className="text-gray-500 block text-xs uppercase tracking-wider mb-1">Member Since</span>
                <span className="text-gray-200 font-medium">{new Date(user.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </div>
              <div className="p-3 rounded-lg bg-gray-800/40">
                <span className="text-gray-500 block text-xs uppercase tracking-wider mb-1">Last Updated</span>
                <span className="text-gray-200 font-medium">{new Date(user.updatedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </div>
              <div className="p-3 rounded-lg bg-gray-800/40 sm:col-span-2 lg:col-span-1">
                <span className="text-gray-500 block text-xs uppercase tracking-wider mb-1">User ID</span>
                <span className="text-gray-200 font-mono text-xs">{user._id}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Verification Modal */}
      {verificationModal.show && (
        <PlatformVerificationModal
          platform={verificationModal.platform}
          data={verificationModal.data}
          onVerify={() => handlePlatformVerify(verificationModal.platform)}
          onClose={() =>
            setVerificationModal({ show: false, platform: "", data: null })
          }
        />
      )}
    </div>
  );
}
export default Profile;
