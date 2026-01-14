import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminAPI } from '../api.js';
import { apiFetch, API_ENDPOINTS } from '../../utils/api';
import { logger } from '../../utils/logger';

const UserManagement = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const [error, setError] = useState('');
  const [refreshingUsers, setRefreshingUsers] = useState(new Set());
  const [deletingUsers, setDeletingUsers] = useState(new Set());
  const [isRefreshingAll, setIsRefreshingAll] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showContestHistory, setShowContestHistory] = useState(false);
  const [contestHistory, setContestHistory] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const refreshIntervalRef = useRef(null);

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (isAuthChecked) {
      fetchUsers();
      setupAutoRefresh();
    }
    
    // Cleanup interval on unmount
    return () => {
      if (refreshIntervalRef.current) {
        clearInterval(refreshIntervalRef.current);
        refreshIntervalRef.current = null;
      }
    };
  }, [isAuthChecked]);

  const setupAutoRefresh = () => {
    const LAST_REFRESH_KEY = 'lastUserRefreshTime';
    const REFRESH_INTERVAL = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
    
    const checkAndRefresh = async () => {
      const lastRefresh = localStorage.getItem(LAST_REFRESH_KEY);
      const now = Date.now();
      
      // If no last refresh time or 24 hours have passed, refresh
      if (!lastRefresh || (now - parseInt(lastRefresh)) >= REFRESH_INTERVAL) {
        try {
          await adminAPI.refreshAllUsers();
          await fetchUsers();
          localStorage.setItem(LAST_REFRESH_KEY, now.toString());
        } catch (error) {
          logger.error('Auto-refresh failed:', error);
          // If token expired, stop the interval
          if (error.isTokenExpired) {
            if (refreshIntervalRef.current) {
              clearInterval(refreshIntervalRef.current);
              refreshIntervalRef.current = null;
            }
          }
        }
      }
    };
    
    // Check immediately on mount
    checkAndRefresh();
    
    // Set up interval to check every hour
    refreshIntervalRef.current = setInterval(checkAndRefresh, 60 * 60 * 1000); // Check every hour
  };

  const checkAuth = () => {
    const adminToken = localStorage.getItem('adminToken');
    if (!adminToken) {
      navigate('/admin/login');
      return;
    }
    setIsAuthChecked(true);
  };

  const fetchUsers = async () => {
    try {
      const response = await adminAPI.getUsers();
      setUsers(response.data);
    } catch (error) {
      if (error.isTokenExpired) {
        // Clear token and redirect to login
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminEmail');
        navigate('/admin/login');
        return;
      }
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefreshUser = async (userId) => {
    setRefreshingUsers(prev => new Set(prev).add(userId));
    
    try {
      await adminAPI.refreshUser(userId);
      await fetchUsers();
      alert('User data refreshed successfully!');
    } catch (error) {
      logger.error('Failed to refresh user:', error);
      alert('Failed to refresh user data: ' + error.message);
    } finally {
      setRefreshingUsers(prev => {
        const newSet = new Set(prev);
        newSet.delete(userId);
        return newSet;
      });
    }
  };

  const handleDeleteUser = async (userId, userName) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete user "${userName}"? This action cannot be undone and will permanently remove the user and all their data from the database.`
    );

    if (!confirmed) {
      return;
    }

    setDeletingUsers(prev => new Set(prev).add(userId));
    
    try {
      await adminAPI.deleteUser(userId);
      await fetchUsers();
      alert(`User "${userName}" has been deleted successfully.`);
    } catch (error) {
      logger.error('Failed to delete user:', error);
      alert('Failed to delete user: ' + error.message);
    } finally {
      setDeletingUsers(prev => {
        const newSet = new Set(prev);
        newSet.delete(userId);
        return newSet;
      });
    }
  };

  const handleRefreshAll = async () => {
    setIsRefreshingAll(true);
    
    try {
      await adminAPI.refreshAllUsers();
      await fetchUsers();
      // Update last refresh time to prevent auto-refresh from triggering immediately
      localStorage.setItem('lastUserRefreshTime', Date.now().toString());
      alert('All user data has been refreshed successfully!');
    } catch (error) {
      logger.error('Failed to refresh all users:', error);
      alert('Some users failed to refresh. Please check the console for details.');
    } finally {
      setIsRefreshingAll(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminEmail');
    navigate('/admin/login');
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  const handleViewContestHistory = async (user) => {
    setSelectedUser(user);
    try {
      const response = await adminAPI.getUserContestHistory(user._id);
      setContestHistory(response.contestHistory || []);
      setShowContestHistory(true);
    } catch (error) {
      logger.error('Error fetching contest history:', error);
      alert('Failed to fetch contest history: ' + error.message);
    }
  };

  const filteredUsers = users.filter(user => 
    user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.leetcodeHandle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.codeforcesHandle?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!isAuthChecked || isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-2 border-blue-500 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-400">Loading users...</p>
        </div>
      </div>
    );
  }

  if (error) {
    const handleRetry = () => {
      // Check if error is token expiration
      if (error.includes('Token expired') || error.includes('login again')) {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminEmail');
        navigate('/admin/login');
      } else {
        window.location.reload();
      }
    };

    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4">
        <div className="text-center">
          <p className="text-red-400 mb-4">{error}</p>
          <button
            onClick={handleRetry}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Contest History Modal */}
      {showContestHistory && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-lg p-6 max-w-4xl w-full max-h-[80vh] overflow-y-auto border border-gray-700">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-white">
                Contest History: {selectedUser.name}
              </h2>
              <button 
                onClick={() => setShowContestHistory(false)}
                className="text-gray-400 hover:text-white p-1"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {contestHistory.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-700">
                  <thead className="bg-gray-700">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase">Contest Name</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase">Date</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase">Ranking</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase">Rating</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase">Score</th>
                    </tr>
                  </thead>
                  <tbody className="bg-gray-800 divide-y divide-gray-700">
                    {contestHistory.map((contest, index) => (
                      <tr key={index} className="hover:bg-gray-700">
                        <td className="px-4 py-3 text-sm text-white">{contest.contestName}</td>
                        <td className="px-4 py-3 text-sm text-gray-300">{formatDate(contest.contestDate)}</td>
                        <td className="px-4 py-3 text-sm text-gray-300">{contest.ranking}</td>
                        <td className="px-4 py-3 text-sm text-yellow-400">{contest.rating}</td>
                        <td className="px-4 py-3 text-sm text-blue-400">{contest.score}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-400">
                No contest history available for this user.
              </div>
            )}
          </div>
        </div>
      )}
      
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-4 gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white">User Management</h1>
              <p className="text-gray-400 text-sm mt-1">Manage all registered users and their platform data</p>
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              <button
                onClick={() => navigate('/admin/dashboard')}
                className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors text-sm"
              >
                Dashboard
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Search and Actions Bar */}
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
            <div className="flex-1 w-full sm:w-auto">
              <input
                type="text"
                placeholder="Search by name, email, or handle..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              onClick={handleRefreshAll}
              disabled={isRefreshingAll}
              className={`px-4 py-2 rounded-lg transition-colors text-sm whitespace-nowrap ${
                isRefreshingAll
                  ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {isRefreshingAll ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Refreshing All...
                </span>
              ) : (
                'Refresh All Users'
              )}
            </button>
          </div>
          <p className="text-sm text-gray-400 mt-4">
            Showing {filteredUsers.length} of {users.length} users
          </p>
        </div>

        {/* Users List */}
        <div className="space-y-4">
          {filteredUsers.length === 0 ? (
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-8 text-center">
              <p className="text-gray-400">No users found</p>
            </div>
          ) : (
            filteredUsers.map((user) => (
              <div key={user._id} className="bg-gray-800 border border-gray-700 rounded-lg p-4 sm:p-6">
                <div className="flex flex-col lg:flex-row gap-4">
                  {/* User Info Section */}
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-1">{user.name}</h3>
                        <p className="text-sm text-gray-400 mb-2">{user.email}</p>
                        <p className="text-xs text-gray-500">Joined: {formatDate(user.createdAt)}</p>
                      </div>
                      <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full h-fit ${
                        user.isEmailVerified
                          ? 'bg-green-900 text-green-300'
                          : 'bg-red-900 text-red-300'
                      }`}>
                        {user.isEmailVerified ? 'Email Verified' : 'Email Unverified'}
                      </span>
                    </div>

                    {/* Platforms Section */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                      {/* LeetCode */}
                      <div className="bg-gray-700 rounded-lg p-3">
                        <p className="text-xs text-gray-400 mb-2">LeetCode</p>
                        {user.leetcodeHandle !== 'Not connected' ? (
                          <div>
                            <p className="text-sm font-medium text-white mb-1">@{user.leetcodeHandle}</p>
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full mb-2 ${
                              user.leetcodeVerified
                                ? 'bg-green-900 text-green-300'
                                : 'bg-yellow-900 text-yellow-300'
                            }`}>
                              {user.leetcodeVerified ? 'Verified' : 'Pending'}
                            </span>
                            {user.leetcodeData && (
                              <p className="text-xs text-gray-400 mt-1">
                                Solved: {user.leetcodeData.totalSolved || 0}
                              </p>
                            )}
                          </div>
                        ) : (
                          <p className="text-sm text-gray-500">Not connected</p>
                        )}
                      </div>

                      {/* Codeforces */}
                      <div className="bg-gray-700 rounded-lg p-3">
                        <p className="text-xs text-gray-400 mb-2">Codeforces</p>
                        {user.codeforcesHandle !== 'Not connected' ? (
                          <div>
                            <p className="text-sm font-medium text-white mb-1">@{user.codeforcesHandle}</p>
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full mb-2 ${
                              user.codeforcesVerified
                                ? 'bg-green-900 text-green-300'
                                : 'bg-yellow-900 text-yellow-300'
                            }`}>
                              {user.codeforcesVerified ? 'Verified' : 'Pending'}
                            </span>
                            {user.codeforcesData && (
                              <p className="text-xs text-gray-400 mt-1">
                                Rating: {user.codeforcesData.rating || 'Unrated'}
                              </p>
                            )}
                          </div>
                        ) : (
                          <p className="text-sm text-gray-500">Not connected</p>
                        )}
                      </div>
                    </div>

                    {/* Contest Participation */}
                    {user.leetcodeHandle !== 'Not connected' && user.leetcodeVerified && (
                      <div className="bg-gray-700 rounded-lg p-3 mb-4">
                        <p className="text-xs text-gray-400 mb-2">Contest Participation</p>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                          <div>
                            <p className="text-gray-400">Total Contests</p>
                            <p className="text-white font-medium">{user.contestParticipation?.totalContests || 0}</p>
                          </div>
                          <div>
                            <p className="text-gray-400">Rating</p>
                            <p className="text-yellow-400 font-medium">{user.contestParticipation?.currentRating || 0}</p>
                          </div>
                          <div>
                            <p className="text-gray-400">Ranking</p>
                            <p className="text-blue-400 font-medium">{user.contestParticipation?.currentRanking || 0}</p>
                          </div>
                          <div>
                            <p className="text-gray-400">Last Contest</p>
                            <span className={`inline-flex px-2 py-1 text-xs rounded-full ${
                              user.contestParticipation?.lastContestParticipated
                                ? 'bg-green-900 text-green-300'
                                : 'bg-red-900 text-red-300'
                            }`}>
                              {user.contestParticipation?.lastContestParticipated ? 'Participated' : 'Missed'}
                            </span>
                          </div>
                        </div>
                        {user.contestParticipation?.lastContestName && (
                          <p className="text-xs text-gray-400 mt-2">
                            Latest: {user.contestParticipation.lastContestName}
                          </p>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Actions Section */}
                  <div className="flex flex-col sm:flex-row lg:flex-col gap-2 lg:min-w-[140px]">
                    <button
                      onClick={() => handleRefreshUser(user._id)}
                      disabled={refreshingUsers.has(user._id)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        refreshingUsers.has(user._id)
                          ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                          : 'bg-blue-600 text-white hover:bg-blue-700'
                      }`}
                    >
                      {refreshingUsers.has(user._id) ? (
                        <span className="flex items-center justify-center">
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Refreshing...
                        </span>
                      ) : (
                        'Refresh'
                      )}
                    </button>
                    
                    {user.leetcodeVerified && (
                      <button
                        onClick={() => handleViewContestHistory(user)}
                        className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium"
                      >
                        View History
                      </button>
                    )}
                    
                    <button
                      onClick={() => handleDeleteUser(user._id, user.name)}
                      disabled={deletingUsers.has(user._id)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        deletingUsers.has(user._id)
                          ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                          : 'bg-red-600 text-white hover:bg-red-700'
                      }`}
                    >
                      {deletingUsers.has(user._id) ? (
                        <span className="flex items-center justify-center">
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Deleting...
                        </span>
                      ) : (
                        'Delete'
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default UserManagement;