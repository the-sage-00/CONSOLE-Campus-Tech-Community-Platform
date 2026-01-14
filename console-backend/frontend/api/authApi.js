// API Base Configuration
const API_BASE = 'http://localhost:5000/api/auth';

// Helper function for API calls
const apiCall = async (endpoint, options = {}) => {
  const url = `${API_BASE}${endpoint}`;
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    const data = await response.json();
    
    return {
      success: response.ok,
      status: response.status,
      data: data,
      error: !response.ok ? data.error || 'Request failed' : null
    };
  } catch (error) {
    return {
      success: false,
      status: 0,
      data: null,
      error: error.message || 'Network error'
    };
  }
};

// Authentication API Functions
export const authAPI = {
  // Register a new user
  register: async (userData) => {
    return apiCall('/register', {
      method: 'POST',
      body: JSON.stringify(userData)
    });
  },

  // Login user
  login: async (credentials) => {
    return apiCall('/login', {
      method: 'POST',
      body: JSON.stringify(credentials)
    });
  },

  // Verify email with OTP
  verifyEmail: async (verificationData) => {
    return apiCall('/verify-email', {
      method: 'POST',
      body: JSON.stringify(verificationData)
    });
  },

  // Resend verification email
  resendVerification: async (email) => {
    return apiCall('/resend-verification', {
      method: 'POST',
      body: JSON.stringify({ email })
    });
  },

  // Forgot password
  forgotPassword: async (email) => {
    return apiCall('/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email })
    });
  },

  // Reset password with OTP
  resetPassword: async (resetData) => {
    console.log('🔄 Sending password reset request:', resetData);
    const result = await apiCall('/reset-password', {
      method: 'POST',
      body: JSON.stringify(resetData)
    });
    console.log('📥 Password reset response:', result);
    return result;
  },

  // Get pending status
  getPendingStatus: async (email) => {
    return apiCall(`/pending-status?email=${encodeURIComponent(email)}`, {
      method: 'GET'
    });
  },

  // Get system stats (for admin)
  getStats: async () => {
    return apiCall('/stats', {
      method: 'GET'
    });
  },

  // Get user profile (requires auth token)
  getProfile: async (token) => {
    return apiCall('/profile', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  }
};

// Auth state management helpers
export const authUtils = {
  // Save token to localStorage
  saveToken: (token) => {
    localStorage.setItem('auth_token', token);
  },

  // Get token from localStorage
  getToken: () => {
    return localStorage.getItem('auth_token');
  },

  // Remove token
  removeToken: () => {
    localStorage.removeItem('auth_token');
  },

  // Check if user is logged in
  isLoggedIn: () => {
    const token = authUtils.getToken();
    if (!token) return false;
    
    try {
      // Basic token expiry check (JWT tokens have exp field)
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp > Date.now() / 1000;
    } catch {
      return false;
    }
  }
};
