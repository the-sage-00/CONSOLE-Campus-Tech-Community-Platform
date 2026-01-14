import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminAPI } from '../api.js';
import { API_ENDPOINTS, apiFetch } from '../../utils/api';
import ContestList from '../components/ContestList';
import RecentContest from '../components/RecentContest';
import { logger } from '../../utils/logger';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const [error, setError] = useState('');
  const [syncing, setSyncing] = useState(false);
  const [syncingCodeforces, setSyncingCodeforces] = useState(false);
  const leetcodeSyncIntervalRef = useRef(null);
  const codeforcesSyncIntervalRef = useRef(null);
  const isSyncingLeetCodeRef = useRef(false);
  const isSyncingCodeforcesRef = useRef(false);

  const handleSyncContests = async () => {
    if (syncing) return;
    
    if (!confirm('Sync LeetCode contests? This will fetch data for all verified users and may take 30-60 seconds.')) {
      return;
    }
    
    setSyncing(true);
    setError('');
    
    try {
      const adminToken = localStorage.getItem('adminToken');
      if (!adminToken) {
        setError('Admin not authenticated. Please log in.');
        navigate('/admin/login');
        return;
      }
      
      const response = await apiFetch(`${API_ENDPOINTS.CONTEST}/sync/leetcode`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${adminToken}`,
          'Content-Type': 'application/json',
        },
      });
      
      const message = `
✅ Sync Complete!

Contest: ${response.finalizedContest || 'None'}
Weekend: ${response.weekendTracked || 'N/A'}
Participants: ${response.participants || 0}
${response.errors && response.errors.length > 0 ? `\nErrors: ${response.errors.length}` : ''}
      `.trim();
      
      alert(message);
      // Update last sync time to prevent auto-sync from triggering immediately
      localStorage.setItem('lastLeetcodeSyncTime', Date.now().toString());
      fetchStats();
    } catch (err) {
      logger.error('Error syncing contests:', err);
      alert(`❌ Sync Failed\n\n${err.message || 'Unknown error'}`);
      setError(err.message || 'Failed to sync contests.');
    } finally {
      setSyncing(false);
    }
  };

  const handleSyncCodeforcesContests = async () => {
    if (syncingCodeforces) return;
    
    if (!confirm('Sync Codeforces contests? This will fetch data for all verified Codeforces users and may take 30-60 seconds.')) {
      return;
    }
    
    setSyncingCodeforces(true);
    setError('');
    
    try {
      const adminToken = localStorage.getItem('adminToken');
      if (!adminToken) {
        setError('Admin not authenticated. Please log in.');
        navigate('/admin/login');
        return;
      }
      
      const response = await apiFetch(`${API_ENDPOINTS.CONTEST}/sync/codeforces`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${adminToken}`,
          'Content-Type': 'application/json',
        },
      });
      
      const message = `
✅ Codeforces Sync Complete!

Contest: ${response.finalizedContest || 'None'}
Contest ID: ${response.contestId || 'N/A'}
Contest Date: ${response.contestDate ? new Date(response.contestDate).toLocaleDateString() : 'N/A'}
Participants: ${response.participants || 0}
Total Users Checked: ${response.totalUsersChecked || 0}
${response.errors && response.errors.length > 0 ? `\nErrors: ${response.errors.length}` : ''}
      `.trim();
      
      alert(message);
      // Update last sync time to prevent auto-sync from triggering immediately
      localStorage.setItem('lastCodeforcesSyncTime', Date.now().toString());
      fetchStats();
    } catch (err) {
      logger.error('Error syncing Codeforces contests:', err);
      alert(`❌ Codeforces Sync Failed\n\n${err.message || 'Unknown error'}`);
      setError(err.message || 'Failed to sync Codeforces contests.');
    } finally {
      setSyncingCodeforces(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (isAuthChecked) {
      fetchStats();
      setupAutoSync();
    }
    
    // Cleanup intervals on unmount
    return () => {
      if (leetcodeSyncIntervalRef.current) {
        clearInterval(leetcodeSyncIntervalRef.current);
        leetcodeSyncIntervalRef.current = null;
      }
      if (codeforcesSyncIntervalRef.current) {
        clearInterval(codeforcesSyncIntervalRef.current);
        codeforcesSyncIntervalRef.current = null;
      }
    };
  }, [isAuthChecked]);

  const setupAutoSync = () => {
    const LAST_LEETCODE_SYNC_KEY = 'lastLeetcodeSyncTime';
    const LAST_CODEFORCES_SYNC_KEY = 'lastCodeforcesSyncTime';
    const SYNC_INTERVAL = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
    
    const checkAndSyncLeetCode = async () => {
      const lastSync = localStorage.getItem(LAST_LEETCODE_SYNC_KEY);
      const now = Date.now();
      
      // If no last sync time or 24 hours have passed, sync
      if (!lastSync || (now - parseInt(lastSync)) >= SYNC_INTERVAL) {
        if (isSyncingLeetCodeRef.current) return; // Don't sync if already syncing
        
        try {
          isSyncingLeetCodeRef.current = true;
          setSyncing(true);
          const adminToken = localStorage.getItem('adminToken');
          if (!adminToken) {
            logger.error('Admin not authenticated for auto-sync');
            return;
          }
          
          const response = await apiFetch(`${API_ENDPOINTS.CONTEST}/sync/leetcode`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${adminToken}`,
              'Content-Type': 'application/json',
            },
          });
          
          localStorage.setItem(LAST_LEETCODE_SYNC_KEY, now.toString());
          fetchStats(); // Refresh stats after sync
        } catch (error) {
          logger.error('LeetCode auto-sync failed:', error);
          // If token expired, stop the interval
          if (error.isTokenExpired || (error.message && error.message.includes('Token expired'))) {
            if (leetcodeSyncIntervalRef.current) {
              clearInterval(leetcodeSyncIntervalRef.current);
              leetcodeSyncIntervalRef.current = null;
            }
          }
        } finally {
          isSyncingLeetCodeRef.current = false;
          setSyncing(false);
        }
      }
    };
    
    const checkAndSyncCodeforces = async () => {
      const lastSync = localStorage.getItem(LAST_CODEFORCES_SYNC_KEY);
      const now = Date.now();
      
      // If no last sync time or 24 hours have passed, sync
      if (!lastSync || (now - parseInt(lastSync)) >= SYNC_INTERVAL) {
        if (isSyncingCodeforcesRef.current) return; // Don't sync if already syncing
        
        try {
          isSyncingCodeforcesRef.current = true;
          setSyncingCodeforces(true);
          const adminToken = localStorage.getItem('adminToken');
          if (!adminToken) {
            logger.error('Admin not authenticated for auto-sync');
            return;
          }
          
          const response = await apiFetch(`${API_ENDPOINTS.CONTEST}/sync/codeforces`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${adminToken}`,
              'Content-Type': 'application/json',
            },
          });
          
          localStorage.setItem(LAST_CODEFORCES_SYNC_KEY, now.toString());
          fetchStats(); // Refresh stats after sync
        } catch (error) {
          logger.error('Codeforces auto-sync failed:', error);
          // If token expired, stop the interval
          if (error.isTokenExpired || (error.message && error.message.includes('Token expired'))) {
            if (codeforcesSyncIntervalRef.current) {
              clearInterval(codeforcesSyncIntervalRef.current);
              codeforcesSyncIntervalRef.current = null;
            }
          }
        } finally {
          isSyncingCodeforcesRef.current = false;
          setSyncingCodeforces(false);
        }
      }
    };
    
    // Check immediately on mount
    checkAndSyncLeetCode();
    checkAndSyncCodeforces();
    
    // Set up intervals to check every hour
    leetcodeSyncIntervalRef.current = setInterval(checkAndSyncLeetCode, 60 * 60 * 1000); // Check every hour
    codeforcesSyncIntervalRef.current = setInterval(checkAndSyncCodeforces, 60 * 60 * 1000); // Check every hour
  };

  const checkAuth = () => {
    const adminToken = localStorage.getItem('adminToken');
    if (!adminToken) {
      navigate('/admin/login');
      return;
    }
    setIsAuthChecked(true);
  };

  const fetchStats = async () => {
    try {
      const response = await adminAPI.getStats();
      setStats(response.data);
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

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminEmail');
    navigate('/admin/login');
  };

  if (!isAuthChecked || isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-2 border-blue-500 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-400">Loading dashboard...</p>
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
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-4 gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white">Admin Dashboard</h1>
              <p className="text-gray-400 text-sm mt-1">
                {localStorage.getItem('adminEmail')}
              </p>
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              <button
                onClick={() => navigate('/')}
                className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors text-sm"
              >
                View Site
              </button>
              <button
                onClick={() => navigate('/admin/users')}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
              >
                Manage Users
              </button>
              <button
                onClick={() => navigate('/admin/participation-stats')}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
              >
                Participation Stats
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
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 sm:p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-400">Total Users</p>
              <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
              </svg>
            </div>
            <p className="text-2xl sm:text-3xl font-bold text-white">{stats?.totalUsers || 0}</p>
          </div>

          <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 sm:p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-400">Verified Users</p>
              <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-2xl sm:text-3xl font-bold text-white">{stats?.verifiedUsers || 0}</p>
          </div>

          <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 sm:p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-400">LeetCode Users</p>
              <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <p className="text-2xl sm:text-3xl font-bold text-white">{stats?.leetcodeUsers || 0}</p>
          </div>

          <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 sm:p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-400">Codeforces Users</p>
              <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <p className="text-2xl sm:text-3xl font-bold text-white">{stats?.codeforcesUsers || 0}</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 mb-6 sm:mb-8">
          <h2 className="text-xl font-bold text-white mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <button
              onClick={() => navigate('/admin/users')}
              className="p-4 bg-gray-700 hover:bg-gray-600 border border-gray-600 rounded-lg text-left transition-colors"
            >
              <div className="flex items-start">
                <svg className="w-6 h-6 text-blue-400 mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
                <div>
                  <h3 className="font-semibold text-white mb-1">Manage Users</h3>
                  <p className="text-sm text-gray-400">View, verify, and manage all registered users</p>
                </div>
              </div>
            </button>

            <button
              onClick={() => navigate('/admin/participation-stats')}
              className="p-4 bg-gray-700 hover:bg-gray-600 border border-gray-600 rounded-lg text-left transition-colors"
            >
              <div className="flex items-start">
                <svg className="w-6 h-6 text-green-400 mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <div>
                  <h3 className="font-semibold text-white mb-1">Participation Stats</h3>
                  <p className="text-sm text-gray-400">View contest participation statistics and export data</p>
                </div>
              </div>
            </button>

            <button
              onClick={handleSyncContests}
              disabled={syncing || syncingCodeforces}
              className={`p-4 bg-gray-700 hover:bg-gray-600 border border-gray-600 rounded-lg text-left transition-colors ${
                syncing || syncingCodeforces ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              <div className="flex items-start">
                <svg className={`w-6 h-6 text-purple-400 mr-3 mt-1 ${syncing ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <div>
                  <h3 className="font-semibold text-white mb-1">
                    {syncing ? 'Syncing...' : 'Sync LeetCode'}
                  </h3>
                  <p className="text-sm text-gray-400">
                    {syncing ? 'Fetching data from LeetCode API' : 'Fetch latest LeetCode weekend contest data'}
                  </p>
                </div>
              </div>
            </button>

            <button
              onClick={handleSyncCodeforcesContests}
              disabled={syncing || syncingCodeforces}
              className={`p-4 bg-gray-700 hover:bg-gray-600 border border-gray-600 rounded-lg text-left transition-colors ${
                syncing || syncingCodeforces ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              <div className="flex items-start">
                <svg className={`w-6 h-6 text-cyan-400 mr-3 mt-1 ${syncingCodeforces ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <div>
                  <h3 className="font-semibold text-white mb-1">
                    {syncingCodeforces ? 'Syncing...' : 'Sync Codeforces'}
                  </h3>
                  <p className="text-sm text-gray-400">
                    {syncingCodeforces ? 'Fetching data from Codeforces API' : 'Fetch latest Codeforces contest data'}
                  </p>
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Contest Info */}
        <RecentContest />
      </main>
    </div>
  );
};

export default AdminDashboard;
