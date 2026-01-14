import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SidebarNavbar from './SidebarNavbar';
import { apiFetch, API_ENDPOINTS } from '../utils/api';
import { useAuth } from '../context/AuthProvider';
import PlatformVerificationModal from './PlatformVerificationModal';
import { logger } from '../utils/logger';

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

  return (
    <div className="min-h-screen bg-black text-white">
      <SidebarNavbar />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="bg-black border border-gray-800 rounded-xl p-6 sm:p-8 shadow-2xl mb-8">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6">
              <div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 bg-gradient-to-r from-[#FF3C5F] to-[#FFC22D] bg-clip-text text-transparent">
                  Profile
                </h1>
                <p className="text-gray-400 text-sm sm:text-base">
                  Manage your account and platform connections
                </p>
              </div>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors self-start sm:self-auto"
              >
                Logout
              </button>
            </div>

            {/* Flash Message */}
            {message.text && (
              <div
                className={`mb-6 p-4 rounded-lg text-sm sm:text-base ${message.type === "success"
                    ? "bg-green-900 border border-green-700 text-green-300"
                    : message.type === "error"
                      ? "bg-red-900 border border-red-700 text-red-300"
                      : "bg-blue-900 border border-blue-700 text-blue-300"
                  }`}
              >
                {message.text}
              </div>
            )}

            {/* User Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Personal Info */}
              <div className="bg-gray-900 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
                <div className="space-y-3">
                  <div>
                    <label className="text-xs sm:text-sm text-gray-400">Name</label>
                    <p className="text-sm sm:text-base font-medium">{user.name}</p>
                  </div>
                  <div>
                    <label className="text-xs sm:text-sm text-gray-400">Email</label>
                    <p className="text-sm sm:text-base font-medium">{user.email}</p>
                  </div>
                  <div>
                    <label className="text-xs sm:text-sm text-gray-400">Branch</label>
                    <p className="text-sm sm:text-base font-medium">
                      {user.branch || "Not specified"}
                    </p>
                  </div>
                  <div>
                    <label className="text-xs sm:text-sm text-gray-400">Email Verification</label>
                    <p
                      className={`text-sm sm:text-base font-medium ${user.isEmailVerified ? "text-green-400" : "text-red-400"
                        }`}
                    >
                      {user.isEmailVerified ? "✓" : "✗"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Account Status */}
              <div className="bg-gray-900 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Account Status</h3>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm text-gray-400">Account Created</label>
                    <p className="font-medium">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-400">Last Updated</label>
                    <p className="font-medium">
                      {new Date(user.updatedAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-400">User ID</label>
                    <p className="font-mono text-sm">{user._id}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Platform Connections */}
          <div className="bg-black border border-gray-800 rounded-xl p-6 sm:p-8 shadow-2xl space-y-10">
            <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-[#FF3C5F] to-[#FFC22D] bg-clip-text text-transparent">
              Platform Connections
            </h2>

            {/* LeetCode */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <img src="/LeetCode_Logo.png" alt="LeetCode" className="w-8 h-8" />
                  <h3 className="text-lg font-semibold">LeetCode</h3>
                </div>
                <div>
                  {user.platformVerification?.leetcode?.isVerified ? (
                    <span className="text-green-400 text-xl">✓</span>
                  ) : (
                    <span className="text-red-400 text-xl">✗</span>
                  )}
                </div>
              </div>

              <div className="bg-gray-900 rounded-lg p-6">
                {user.platformVerification?.leetcode?.isVerified ? (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Username:</span>
                      <span className="font-medium">
                        @{user.platformVerification.leetcode.handle}
                      </span>
                    </div>
                    {user.platformVerification.leetcode.platformData && (
                      <div className="grid grid-cols-3 gap-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-green-400">
                            {user.platformVerification.leetcode.platformData.easySolved || 0}
                          </div>
                          <div className="text-sm text-gray-400">Easy</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-yellow-400">
                            {user.platformVerification.leetcode.platformData.mediumSolved || 0}
                          </div>
                          <div className="text-sm text-gray-400">Medium</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-red-400">
                            {user.platformVerification.leetcode.platformData.hardSolved || 0}
                          </div>
                          <div className="text-sm text-gray-400">Hard</div>
                        </div>
                      </div>
                    )}
                    <div className="flex flex-col sm:flex-row gap-2">
                      <button
                        onClick={() => handleRefreshPlatform("leetcode")}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg"
                      >
                        Refresh Data
                      </button>
                      <button
                        onClick={() => handleDeletePlatform("leetcode")}
                        className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg"
                      >
                        Delete Handle
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col sm:flex-row gap-2">
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
                      className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FF3C5F]"
                    />
                    <button
                      onClick={() => handlePlatformSubmit("leetcode")}
                      className="px-6 py-2 bg-gradient-to-r from-[#FF3C5F] to-[#FFC22D] rounded-lg"
                    >
                      Connect
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Codeforces */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <img src="/codeforces_logo.png" alt="Codeforces" className="w-8 h-8" />
                  <h3 className="text-lg font-semibold">Codeforces</h3>
                </div>
                <div>
                  {user.platformVerification?.codeforces?.isVerified ? (
                    <span className="text-green-400 text-xl">✓</span>
                  ) : (
                    <span className="text-red-400 text-xl">✗</span>
                  )}
                </div>
              </div>

              <div className="bg-gray-900 rounded-lg p-6">
                {user.platformVerification?.codeforces?.isVerified ? (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Username:</span>
                      <span className="font-medium">
                        @{user.platformVerification.codeforces.handle}
                      </span>
                    </div>
                    {user.platformVerification.codeforces.platformData && (
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-blue-400">
                            {user.platformVerification.codeforces.platformData.rating ||
                              "Unrated"}
                          </div>
                          <div className="text-sm text-gray-400">Rating</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-purple-400">
                            {user.platformVerification.codeforces.platformData.contribution || 0}
                          </div>
                          <div className="text-sm text-gray-400">Contribution</div>
                        </div>
                      </div>
                    )}
                    <div className="flex flex-col sm:flex-row gap-2">
                      <button
                        onClick={() => handleRefreshPlatform("codeforces")}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg"
                      >
                        Refresh Data
                      </button>
                      <button
                        onClick={() => handleDeletePlatform("codeforces")}
                        className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg"
                      >
                        Delete Handle
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col sm:flex-row gap-2">
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
                      className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FF3C5F]"
                    />
                    <button
                      onClick={() => handlePlatformSubmit("codeforces")}
                      className="px-6 py-2 bg-gradient-to-r from-[#FF3C5F] to-[#FFC22D] rounded-lg"
                    >
                      Connect
                    </button>
                  </div>
                )}
              </div>
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
