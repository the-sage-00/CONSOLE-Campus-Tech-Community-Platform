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

  const earnedCount = achievements.filter(b => b.earned).length;

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top_right,_#ff3c5f08_0%,_transparent_50%),radial-gradient(ellipse_at_bottom_left,_#ffc22d05_0%,_transparent_50%)] pointer-events-none" />
      <SidebarNavbar />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-6xl mx-auto relative">

          {/* Flash Message */}
          {message.text && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mb-6 p-4 rounded-xl text-sm sm:text-base backdrop-blur-sm ${
                message.type === "success"
                  ? "bg-green-950/60 border border-green-800/50 text-green-300 shadow-lg shadow-green-900/20"
                  : message.type === "error"
                    ? "bg-red-950/60 border border-red-800/50 text-red-300 shadow-lg shadow-red-900/20"
                    : "bg-blue-950/60 border border-blue-800/50 text-blue-300 shadow-lg shadow-blue-900/20"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className={`w-2 h-2 rounded-full shrink-0 ${
                  message.type === "success" ? "bg-green-400" : message.type === "error" ? "bg-red-400" : "bg-blue-400"
                }`} />
                {message.text}
              </div>
            </motion.div>
          )}

          {/* Two Column Layout */}
          <div className="flex flex-col lg:flex-row gap-8">

            {/* ===== LEFT COLUMN — Profile Info ===== */}
            <div className="w-full lg:w-80 shrink-0 space-y-6">

              {/* Profile Card */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="relative overflow-hidden rounded-2xl bg-[#0d0d14] border border-[#ffffff08]"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-[#ff3c5f10] to-transparent opacity-50" />
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-[#FF3C5F]/15 to-transparent rounded-full blur-3xl" />
                <div className="relative z-10 p-6 sm:p-8 text-center">
                  <div className="relative inline-block mb-5">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#FF3C5F] to-[#FFC22D] blur-xl opacity-60 animate-pulse" />
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#FF3C5F] to-[#FFC22D] blur-sm" />
                    {user.profilePicture ? (
                      <img
                        src={user.profilePicture}
                        alt={user.name}
                        className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover border-[3px] border-[#ffffff15] shadow-2xl mx-auto"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          const parent = e.target.parentElement;
                          const fallback = parent.querySelector('.avatar-fallback');
                          if (fallback) fallback.classList.remove('hidden');
                        }}
                      />
                    ) : null}
                    <div className={`avatar-fallback absolute inset-0 w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-[#FF3C5F] to-[#FFC22D] flex items-center justify-center text-4xl sm:text-5xl font-bold text-white shadow-2xl mx-auto ${user.profilePicture ? 'hidden' : ''}`}>
                      {user.name?.charAt(0)?.toUpperCase() || '?'}
                    </div>
                  </div>

                  <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-[#FF3C5F] via-[#FF8C5F] to-[#FFC22D] bg-clip-text text-transparent">
                    {user.name}
                  </h1>
                  <p className="text-gray-500 text-sm mt-2 flex items-center justify-center gap-2">
                    <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    {user.email}
                  </p>

                  <div className="flex flex-wrap justify-center gap-2 mt-4">
                    {user.branch && (
                      <span className="inline-flex items-center gap-1.5 text-[11px] px-3 py-1 rounded-full bg-white/[0.04] text-gray-400 border border-white/[0.06]">
                        <svg className="w-3 h-3 text-[#FFC22D]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                        {user.branch}
                      </span>
                    )}
                    {user.admissionYear && (
                      <span className="inline-flex items-center gap-1.5 text-[11px] px-3 py-1 rounded-full bg-white/[0.04] text-gray-400 border border-white/[0.06]">
                        <svg className="w-3 h-3 text-[#FF3C5F]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {user.admissionYear} Batch
                      </span>
                    )}
                    {user.rollNo && (
                      <span className="inline-flex items-center gap-1.5 text-[11px] px-3 py-1 rounded-full bg-white/[0.04] text-gray-400 border border-white/[0.06] font-mono">
                        <svg className="w-3 h-3 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.657 0 3-1.343 3-3m-3 3a2 2 0 002 2h1" />
                        </svg>
                        {user.rollNo}
                      </span>
                    )}
                    <span className={`inline-flex items-center gap-1.5 text-[11px] px-3 py-1 rounded-full ${
                      user.isEmailVerified
                        ? 'bg-emerald-950/40 text-emerald-300 border border-emerald-800/40'
                        : 'bg-red-950/40 text-red-300 border border-red-800/40'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${user.isEmailVerified ? 'bg-emerald-400' : 'bg-red-400'}`} />
                      {user.isEmailVerified ? 'Verified' : 'Unverified'}
                    </span>
                  </div>

                  <div className="mt-6 pt-6 border-t border-white/[0.06] space-y-3">
                    {[
                      { label: 'Member Since', value: new Date(user.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }), icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
                      { label: 'Last Updated', value: new Date(user.updatedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }), icon: 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15' },
                      { label: 'User ID', value: user._id, icon: 'M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0', mono: true },
                    ].map(({ label, value, icon, mono }) => (
                      <div key={label} className="text-left p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                        <div className="flex items-center gap-2 mb-1">
                          <svg className="w-3 h-3 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d={icon} />
                          </svg>
                          <span className="text-[10px] text-gray-600 uppercase tracking-wider">{label}</span>
                        </div>
                        <span className={`text-xs text-gray-200 ${mono ? 'font-mono break-all' : 'font-medium'}`}>{value}</span>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={handleLogout}
                    className="mt-6 w-full px-4 py-2.5 text-sm text-red-400 bg-red-950/30 border border-red-900/40 rounded-xl hover:bg-red-950/50 hover:border-red-700/50 transition-all flex items-center justify-center gap-2"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Logout
                  </button>
                </div>
              </motion.div>

              {/* Achievements (in left column) */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
                className="relative overflow-hidden rounded-2xl bg-[#0d0d14] border border-[#ffffff08] p-5"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Achievements</h3>
                  <span className="text-[10px] text-gray-600">{earnedCount}/{achievements.length}</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {achievements.map((badge) => (
                    <div
                      key={badge.id}
                      className={`relative p-2.5 rounded-lg border text-center transition-all duration-300 ${
                        badge.earned
                          ? 'bg-gradient-to-br from-[#ffc22d08] to-transparent border-[#ffc22d20]'
                          : 'bg-white/[0.02] border-white/[0.04] opacity-30'
                      }`}
                    >
                      <div className={`text-lg mb-0.5 ${badge.earned ? '' : 'grayscale'}`}>{badge.icon}</div>
                      <div className={`text-[10px] font-semibold ${badge.earned ? 'text-gray-300' : 'text-gray-600'}`}>{badge.label}</div>
                      {!badge.earned && (
                        <div className="absolute inset-0 flex items-center justify-center bg-[#0a0a0f]/60 rounded-lg backdrop-blur-[1px]">
                          <svg className="w-3 h-3 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                          </svg>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* ===== RIGHT COLUMN — Stats & Content ===== */}
            <div className="flex-1 min-w-0 space-y-6">

              {/* Quick Stats Cards */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                className="grid grid-cols-2 xl:grid-cols-3 gap-3"
              >
                {[
                  { label: 'LC Solved', value: lcTotal, color: '#FFC22D', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
                  { label: 'CF Rating', value: cfRating || 'N/A', color: '#60a5fa', icon: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z' },
                  { label: 'LC Ranking', value: lcData?.ranking ? `#${lcData.ranking.toLocaleString()}` : 'N/A', color: '#4ade80', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="group relative overflow-hidden rounded-xl bg-[#0d0d14] border border-[#ffffff08] hover:border-[#ffffff15] transition-all duration-300 p-4"
                  >
                    <div className="relative z-10">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 rounded-lg" style={{ backgroundColor: `${stat.color}10` }}>
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke={stat.color} strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d={stat.icon} />
                          </svg>
                        </div>
                        <span className="text-[11px] text-gray-500 font-medium uppercase tracking-widest">{stat.label}</span>
                      </div>
                      <p className="text-2xl sm:text-3xl font-bold tracking-tight" style={{ color: stat.color }}>
                        {stat.value}
                      </p>
                    </div>
                  </div>
                ))}
              </motion.div>

              {/* Charts */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                {/* LC Chart */}
                <div className="relative overflow-hidden rounded-xl bg-[#0d0d14] border border-[#ffffff08] p-5">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#FFC22D]/5 to-transparent rounded-bl-full" />
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 rounded-lg bg-[#FFC22D]/10">
                        <svg className="w-4 h-4 text-[#FFC22D]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                      </div>
                      <h3 className="text-sm font-semibold text-gray-300">LeetCode Breakdown</h3>
                    </div>
                    {lcVerified && lcData ? (
                      <div className="flex items-center justify-center">
                        <ResponsiveContainer width="100%" height={200}>
                          <PieChart>
                            <Pie data={[
                              { name: 'Easy', value: lcData.easySolved || 0 },
                              { name: 'Medium', value: lcData.mediumSolved || 0 },
                              { name: 'Hard', value: lcData.hardSolved || 0 },
                            ]} cx="50%" cy="50%" innerRadius={48} outerRadius={80} paddingAngle={4} dataKey="value">
                              {['#4ade80', '#facc15', '#f87171'].map((c, i) => (
                                <Cell key={i} fill={c} />
                              ))}
                            </Pie>
                            <Tooltip contentStyle={{ background: '#111', border: '1px solid #222', borderRadius: '10px', color: '#e5e7eb', fontSize: '12px' }}
                              formatter={(v, n) => [`${v} solved`, n]} />
                          </PieChart>
                        </ResponsiveContainer>
                        <div className="flex flex-col gap-2 ml-1">
                          {[
                            { label: 'Easy', value: lcData.easySolved || 0, color: 'bg-green-400' },
                            { label: 'Medium', value: lcData.mediumSolved || 0, color: 'bg-yellow-400' },
                            { label: 'Hard', value: lcData.hardSolved || 0, color: 'bg-red-400' },
                          ].map(({ label, value, color }) => (
                            <div key={label} className="flex items-center gap-2.5">
                              <div className={`w-2.5 h-2.5 rounded-full ${color}`} />
                              <span className="text-xs text-gray-500">{label}</span>
                              <span className="text-xs font-semibold text-gray-200 ml-auto">{value}</span>
                            </div>
                          ))}
                          <div className="border-t border-white/[0.06] pt-2 mt-1">
                            <span className="text-xs text-gray-500">Total <span className="text-sm font-bold text-white">{lcTotal}</span></span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center h-[200px]">
                        <div className="text-center">
                          <div className="text-3xl mb-2 opacity-30">📊</div>
                          <p className="text-xs text-gray-600">{lcVerified ? 'Verify to see stats' : 'Connect LeetCode'}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* CF Chart */}
                <div className="relative overflow-hidden rounded-xl bg-[#0d0d14] border border-[#ffffff08] p-5">
                  <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-blue-500/5 to-transparent rounded-br-full" />
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 rounded-lg bg-blue-500/10">
                        <svg className="w-4 h-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                        </svg>
                      </div>
                      <h3 className="text-sm font-semibold text-gray-300">Codeforces Progress</h3>
                    </div>
                    {cfVerified && cfData ? (
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-xs text-gray-500">Rating</span>
                            <span className="text-xs text-gray-400 font-mono">{cfData.rating || 0} / {cfData.maxRating || 0}</span>
                          </div>
                          <div className="w-full h-2.5 bg-white/[0.04] rounded-full overflow-hidden">
                            <div className="h-full rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-700"
                              style={{ width: `${cfData.maxRating ? Math.min((cfData.rating / cfData.maxRating) * 100, 100) : 0}%` }} />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          {[
                            { label: 'Rating', value: cfData.rating || 'Unrated', color: 'text-blue-400' },
                            { label: 'Peak', value: cfData.maxRating || 0, color: 'text-purple-400' },
                            { label: 'Rank', value: cfData.rank || 'Unrated', color: 'text-indigo-400 capitalize' },
                            { label: 'Solved', value: cfData.totalSolved || 0, color: 'text-teal-400' },
                          ].map(({ label, value, color }) => (
                            <div key={label} className="bg-white/[0.02] border border-white/[0.04] rounded-lg p-3 text-center hover:bg-white/[0.04] transition-colors">
                              <div className={`text-base sm:text-lg font-bold ${color}`}>{value}</div>
                              <div className="text-[11px] text-gray-600 mt-0.5">{label}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center h-[200px]">
                        <div className="text-center">
                          <div className="text-3xl mb-2 opacity-30">⚡</div>
                          <p className="text-xs text-gray-600">{cfVerified ? 'Verify to see stats' : 'Connect Codeforces'}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>

              {/* Platform Connections */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                className="space-y-4"
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Platform Connections</h2>
                  <div className="text-xs text-gray-600">
                    {lcVerified && cfVerified ? '2/2' : lcVerified || cfVerified ? '1/2' : '0/2'}
                  </div>
                </div>

                {/* LeetCode */}
                <div className={`relative overflow-hidden rounded-xl border transition-all duration-300 ${
                  lcVerified ? 'bg-[#0d0d14] border-[#ffc22d20]' : 'bg-[#0d0d14] border-[#ffffff08]'
                }`}>
                  {lcVerified && <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#FFC22D] to-[#FFC22D]/30" />}
                  <div className={`flex items-center justify-between px-5 py-3.5 border-b ${lcVerified ? 'border-[#ffc22d10]' : 'border-white/[0.04]'}`}>
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${lcVerified ? 'bg-[#FFC22D]/10' : 'bg-white/[0.03]'}`}>
                        <img src="/LeetCode_Logo.png" alt="LeetCode" className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-sm">LeetCode</h3>
                        {lcVerified && <p className="text-xs text-gray-500">@{user.platformVerification.leetcode.handle}</p>}
                      </div>
                    </div>
                    <span className={`inline-flex items-center gap-1.5 text-[11px] px-3 py-1 rounded-full ${
                      lcVerified
                        ? 'bg-emerald-950/40 text-emerald-300 border border-emerald-800/40'
                        : user.platformVerification?.leetcode?.handle
                          ? 'bg-yellow-950/40 text-yellow-300 border border-yellow-800/40'
                          : 'bg-white/[0.03] text-gray-500 border border-white/[0.06]'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        lcVerified ? 'bg-emerald-400' : user.platformVerification?.leetcode?.handle ? 'bg-yellow-400' : 'bg-gray-600'
                      }`} />
                      {lcVerified ? 'Verified' : user.platformVerification?.leetcode?.handle ? 'Pending' : 'Not Connected'}
                    </span>
                  </div>
                  <div className="p-5">
                    {lcVerified ? (
                      <div className="space-y-4">
                        {lcData && (
                          <div className="grid grid-cols-3 gap-3">
                            {[
                              { label: 'Easy', value: lcData.easySolved || 0, color: 'text-green-400', bg: 'bg-green-500/5' },
                              { label: 'Medium', value: lcData.mediumSolved || 0, color: 'text-yellow-400', bg: 'bg-yellow-500/5' },
                              { label: 'Hard', value: lcData.hardSolved || 0, color: 'text-red-400', bg: 'bg-red-500/5' },
                            ].map(({ label, value, color, bg }) => (
                              <div key={label} className={`text-center p-3 rounded-lg ${bg} border border-white/[0.04]`}>
                                <div className={`text-lg font-bold ${color}`}>{value}</div>
                                <div className="text-[11px] text-gray-500 mt-0.5">{label}</div>
                              </div>
                            ))}
                          </div>
                        )}
                        <div className="flex gap-2">
                          <button onClick={() => handleRefreshPlatform("leetcode")}
                            className="px-3.5 py-2 text-xs bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-lg hover:bg-blue-500/20 transition-all flex items-center gap-1.5">
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                            Refresh
                          </button>
                          <button onClick={() => handleDeletePlatform("leetcode")}
                            className="px-3.5 py-2 text-xs bg-red-500/10 text-red-400 border border-red-500/20 rounded-lg hover:bg-red-500/20 transition-all flex items-center gap-1.5">
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            Delete
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col sm:flex-row gap-3">
                        <input type="text" placeholder="Enter LeetCode username"
                          value={platformHandles.leetcode}
                          onChange={(e) => setPlatformHandles(p => ({ ...p, leetcode: e.target.value }))}
                          className="flex-1 px-4 py-2.5 bg-white/[0.03] border border-white/[0.08] rounded-lg text-white placeholder-gray-600 text-sm focus:outline-none focus:border-[#FF3C5F]/40 focus:ring-1 focus:ring-[#FF3C5F]/20 transition-all" />
                        <button onClick={() => handlePlatformSubmit("leetcode")}
                          className="px-6 py-2.5 bg-gradient-to-r from-[#FF3C5F] to-[#FFC22D] text-white rounded-lg font-medium text-sm hover:opacity-90 transition-all shadow-lg shadow-[#FF3C5F]/10">
                          Connect
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Codeforces */}
                <div className={`relative overflow-hidden rounded-xl border transition-all duration-300 ${
                  cfVerified ? 'bg-[#0d0d14] border-[#60a5fa20]' : 'bg-[#0d0d14] border-[#ffffff08]'
                }`}>
                  {cfVerified && <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-blue-400 to-blue-400/30" />}
                  <div className={`flex items-center justify-between px-5 py-3.5 border-b ${cfVerified ? 'border-[#60a5fa10]' : 'border-white/[0.04]'}`}>
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${cfVerified ? 'bg-blue-500/10' : 'bg-white/[0.03]'}`}>
                        <img src="/codeforces_logo.png" alt="Codeforces" className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-sm">Codeforces</h3>
                        {cfVerified && <p className="text-xs text-gray-500">@{user.platformVerification.codeforces.handle}</p>}
                      </div>
                    </div>
                    <span className={`inline-flex items-center gap-1.5 text-[11px] px-3 py-1 rounded-full ${
                      cfVerified
                        ? 'bg-emerald-950/40 text-emerald-300 border border-emerald-800/40'
                        : user.platformVerification?.codeforces?.handle
                          ? 'bg-yellow-950/40 text-yellow-300 border border-yellow-800/40'
                          : 'bg-white/[0.03] text-gray-500 border border-white/[0.06]'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        cfVerified ? 'bg-emerald-400' : user.platformVerification?.codeforces?.handle ? 'bg-yellow-400' : 'bg-gray-600'
                      }`} />
                      {cfVerified ? 'Verified' : user.platformVerification?.codeforces?.handle ? 'Pending' : 'Not Connected'}
                    </span>
                  </div>
                  <div className="p-5">
                    {cfVerified ? (
                      <div className="space-y-4">
                        {cfData && (
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                            {[
                              { label: 'Rating', value: cfData.rating || 'Unrated', color: 'text-blue-400', bg: 'bg-blue-500/5' },
                              { label: 'Max Rating', value: cfData.maxRating || 0, color: 'text-purple-400', bg: 'bg-purple-500/5' },
                              { label: 'Rank', value: cfData.rank || 'Unrated', color: 'text-indigo-400 capitalize', bg: 'bg-indigo-500/5' },
                              { label: 'Solved', value: cfData.totalSolved || 0, color: 'text-teal-400', bg: 'bg-teal-500/5' },
                            ].map(({ label, value, color, bg }) => (
                              <div key={label} className={`text-center p-3 rounded-lg ${bg} border border-white/[0.04]`}>
                                <div className={`text-sm sm:text-base font-bold ${color}`}>{value}</div>
                                <div className="text-[11px] text-gray-500 mt-0.5">{label}</div>
                              </div>
                            ))}
                          </div>
                        )}
                        <div className="flex gap-2">
                          <button onClick={() => handleRefreshPlatform("codeforces")}
                            className="px-3.5 py-2 text-xs bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-lg hover:bg-blue-500/20 transition-all flex items-center gap-1.5">
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                            Refresh
                          </button>
                          <button onClick={() => handleDeletePlatform("codeforces")}
                            className="px-3.5 py-2 text-xs bg-red-500/10 text-red-400 border border-red-500/20 rounded-lg hover:bg-red-500/20 transition-all flex items-center gap-1.5">
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            Delete
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col sm:flex-row gap-3">
                        <input type="text" placeholder="Enter Codeforces username"
                          value={platformHandles.codeforces}
                          onChange={(e) => setPlatformHandles(p => ({ ...p, codeforces: e.target.value }))}
                          className="flex-1 px-4 py-2.5 bg-white/[0.03] border border-white/[0.08] rounded-lg text-white placeholder-gray-600 text-sm focus:outline-none focus:border-[#FF3C5F]/40 focus:ring-1 focus:ring-[#FF3C5F]/20 transition-all" />
                        <button onClick={() => handlePlatformSubmit("codeforces")}
                          className="px-6 py-2.5 bg-gradient-to-r from-[#FF3C5F] to-[#FFC22D] text-white rounded-lg font-medium text-sm hover:opacity-90 transition-all shadow-lg shadow-[#FF3C5F]/10">
                          Connect
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>

            </div>
          </div>
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
