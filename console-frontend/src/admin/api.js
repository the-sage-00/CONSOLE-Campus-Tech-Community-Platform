// Admin API endpoints
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const ADMIN_API_ENDPOINTS = {
  LOGIN: `${API_BASE_URL}/admin/login`,
  STATS: `${API_BASE_URL}/admin/stats`,
  USERS: `${API_BASE_URL}/admin/users`,
  REFRESH_USER: (userId) => `${API_BASE_URL}/admin/users/${userId}/refresh`,
  REFRESH_ALL_USERS: `${API_BASE_URL}/admin/users/refresh-all`,
  DELETE_USER: (userId) => `${API_BASE_URL}/admin/users/${userId}`,
  USER_CONTEST_HISTORY: (userId) => `${API_BASE_URL}/contest/user/${userId}/history`,
  PARTICIPATION_STATS: `${API_BASE_URL}/admin/participation-stats`
};

// Helper function to get token
const getToken = () => localStorage.getItem('adminToken');

// Admin API functions
export const adminAPI = {
  // Login
  login: async (email, password) => {
    const response = await fetch(ADMIN_API_ENDPOINTS.LOGIN, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Login failed');
    }

    return response.json();
  },

  // Get dashboard stats
  getStats: async () => {
    const response = await fetch(ADMIN_API_ENDPOINTS.STATS, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`,
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
        const error = new Error('Token expired. Please login again.');
        error.isTokenExpired = true;
        throw error;
      }
      const error = await response.json();
      throw new Error(error.error || 'Failed to fetch stats');
    }

    return response.json();
  },
  
  // Alias for getStats to match new naming convention
  getDashboardStats: async () => {
    return adminAPI.getStats();
  },

  // Get all users
  getUsers: async () => {
    const response = await fetch(ADMIN_API_ENDPOINTS.USERS, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`,
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
        const error = new Error('Token expired. Please login again.');
        error.isTokenExpired = true;
        throw error;
      }
      const error = await response.json();
      throw new Error(error.error || 'Failed to fetch users');
    }

    return response.json();
  },

  // Get all contests
  getContests: async () => {
    const response = await fetch(`${API_BASE_URL}/contest`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to fetch contests');
    }

    return response.json();
  },

  // Get most recent contest summary
  getRecentContest: async () => {
    const response = await fetch(`${API_BASE_URL}/contest/recent`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to fetch recent contest');
    }

    return response.json();
  },

  // Get non-participants for latest contest (admin route)
  getNonParticipants: async () => {
    const adminBase = import.meta.env.VITE_ADMIN_API_URL || `${API_BASE_URL}/admin`;
    const response = await fetch(`${adminBase}/nonParticipants`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to fetch non-participants');
    }

    return response.json();
  },

  // Refresh user data
  refreshUser: async (userId) => {
    const response = await fetch(ADMIN_API_ENDPOINTS.REFRESH_USER(userId), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to refresh user data');
    }

    return response.json();
  },

  // Refresh all users data
  refreshAllUsers: async () => {
    const response = await fetch(ADMIN_API_ENDPOINTS.REFRESH_ALL_USERS, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`,
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
        const error = new Error('Token expired. Please login again.');
        error.isTokenExpired = true;
        throw error;
      }
      const error = await response.json();
      throw new Error(error.error || 'Failed to refresh all users data');
    }

    return response.json();
  },

  // Delete user
  deleteUser: async (userId) => {
    const response = await fetch(ADMIN_API_ENDPOINTS.DELETE_USER(userId), {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to delete user');
    }

    return response.json();
  },
  
  // Get user contest history
  getUserContestHistory: async (userId) => {
    const response = await fetch(ADMIN_API_ENDPOINTS.USER_CONTEST_HISTORY(userId), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to fetch user contest history');
    }

    return response.json();
  },

  // Get detailed participation statistics
  getParticipationStats: async () => {
    const response = await fetch(ADMIN_API_ENDPOINTS.PARTICIPATION_STATS, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`,
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
        const error = new Error('Token expired. Please login again.');
        error.isTokenExpired = true;
        throw error;
      }
      const error = await response.json();
      throw new Error(error.error || 'Failed to fetch participation statistics');
    }

    return response.json();
  }
};
