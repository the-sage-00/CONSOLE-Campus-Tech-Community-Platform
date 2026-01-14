import { logger } from './logger';
// Utility to clear invalid JWT tokens
export const clearInvalidToken = () => {
  try {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    logger.info('✅ Invalid tokens cleared from localStorage');
    return true;
  } catch (error) {
    logger.error('❌ Error clearing tokens:', error);
    return false;
  }
};

// Check if token exists and is valid
export const checkTokenValidity = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    return { valid: false, reason: 'No token found' };
  }
  
  // Basic JWT token format check
  const parts = token.split('.');
  if (parts.length !== 3) {
    return { valid: false, reason: 'Invalid token format' };
  }
  
  return { valid: true, token };
};

// Force logout and redirect
export const forceLogout = (navigate) => {
  clearInvalidToken();
  if (navigate) {
    navigate('/login');
  } else {
    window.location.href = '/login';
  }
}; 