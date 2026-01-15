import { logger } from './logger.js';

// Check if we're in production
const isProduction = import.meta.env.PROD || import.meta.env.MODE === 'production';

// Custom fetch function to handle browser extension conflicts
export const apiFetch = async (url, options = {}) => {
  const defaultOptions = {
    mode: 'cors',
    credentials: 'omit',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const fetchOptions = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, fetchOptions);

    // Check if response is ok
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));

      // Handle token expiration (401)
      if (response.status === 401) {
        const error = new Error(errorData.error || errorData.message || 'Token expired. Please login again.');
        error.isTokenExpired = true;
        throw error;
      }

      // Handle forbidden (403) - usually email restriction, don't log as error
      if (response.status === 403) {
        const error = new Error(errorData.message || errorData.error || 'Access denied');
        error.isForbidden = true;
        throw error;
      }

      // Sanitize error message for production
      const errorMessage = errorData.error || errorData.message || 'Request failed';
      throw new Error(errorMessage);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    // Only log unexpected errors (not 403 or expected auth errors)
    if (!error.isForbidden && !isProduction) {
      logger.error('API request failed:', error.message);
    }

    // Handle specific error types
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      throw new Error('Network error. Please check your connection.');
    }

    // Re-throw the error
    throw error;
  }
};

// API endpoints
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Debug logging for API configuration (only in development or first load)
if (import.meta.env.DEV || !window.__API_CONFIG_LOGGED__) {
  console.log('🔧 API Configuration:');
  console.log('  VITE_API_URL:', import.meta.env.VITE_API_URL);
  console.log('  API_BASE_URL:', API_BASE_URL);
  console.log('  MODE:', import.meta.env.MODE);
  console.log('  PROD:', import.meta.env.PROD);
  window.__API_CONFIG_LOGGED__ = true;
}

export const API_ENDPOINTS = {
  BASE_URL: API_BASE_URL,

  // Auth - Google OAuth only
  AUTH_CALLBACK: `${API_BASE_URL}/auth/callback`,

  // Profile
  PROFILE: `${API_BASE_URL}/auth/profile`,
  UPDATE_PROFILE: `${API_BASE_URL}/auth/profile`,

  // Platform verification (LeetCode/Codeforces)
  SUBMIT_PLATFORM: `${API_BASE_URL}/auth/platform/submit`,
  VERIFY_PLATFORM: `${API_BASE_URL}/auth/platform/verify`,
  REFRESH_PLATFORM: `${API_BASE_URL}/auth/platform/refresh`,
  DELETE_PLATFORM: `${API_BASE_URL}/auth/platform/delete`,

  // Admin
  ADMIN_BASE_URL: import.meta.env.VITE_ADMIN_API_URL || 'http://localhost:5000/api/admin',

  // Features
  LEADERBOARD: `${API_BASE_URL}/leaderboard`,
  CONTEST: `${API_BASE_URL}/contest`,
};