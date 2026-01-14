import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import SidebarNavbar from './SidebarNavbar';
import { apiFetch, API_ENDPOINTS } from '../utils/api';
import { logger } from '../utils/logger';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState('email'); // 'email', 'otp', 'newPassword'
  const [formData, setFormData] = useState({
    email: '',
    otp: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [resendTimer, setResendTimer] = useState(0);

  // Timer countdown for resend OTP
  React.useEffect(() => {
    let interval = null;
    if (resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer(timer => timer - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [resendTimer]);

  const validateEmail = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const allowedDomain = 'mnit.ac.in';
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    } else {
      const emailDomain = formData.email.toLowerCase().split('@')[1];
      if (emailDomain !== allowedDomain) {
        newErrors.email = `Only College email addresses are allowed`;
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateOTP = () => {
    const newErrors = {};
    
    if (!formData.otp) {
      newErrors.otp = 'OTP is required';
    } else if (formData.otp.length !== 6) {
      newErrors.otp = 'OTP must be 6 digits';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateNewPassword = () => {
    const newErrors = {};
    
    if (!formData.newPassword) {
      newErrors.newPassword = 'New password is required';
    } else if (formData.newPassword.length < 6) {
      newErrors.newPassword = 'Password must be at least 6 characters';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateEmail()) {
      return;
    }

    setIsLoading(true);
    setMessage({ type: '', text: '' });

    try {
      await apiFetch(API_ENDPOINTS.FORGOT_PASSWORD, {
        method: 'POST',
        body: JSON.stringify({
          email: formData.email.toLowerCase()
        }),
      });

      setMessage({
        type: 'success',
        text: 'Password reset OTP has been sent to your email. Please check your inbox.'
      });
      
      setStep('otp');
      setResendTimer(300); // 5 minutes
    } catch (error) {
      logger.error('Forgot password error:', error);
      setMessage({
        type: 'error',
        text: error.message || 'Failed to send password reset email. Please try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleOTPSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateOTP()) {
      return;
    }

    // Instead of verifying with the backend, just move to the password step
    // The actual verification will happen when submitting the new password
    setMessage({
      type: 'success',
      text: 'Please enter your new password.'
    });
    
    setStep('newPassword');
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateNewPassword()) {
      return;
    }

    setIsLoading(true);
    setMessage({ type: '', text: '' });

    try {
      await apiFetch(API_ENDPOINTS.RESET_PASSWORD, {
        method: 'POST',
        body: JSON.stringify({
          email: formData.email.toLowerCase(),
          otp: formData.otp,
          newPassword: formData.newPassword,
          step: 'reset'
        }),
      });

      setMessage({
        type: 'success',
        text: 'Password reset successful! Redirecting to login page...'
      });
      
      // Redirect to login after 3 seconds
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (error) {
      logger.error('Password reset error:', error);
      setMessage({
        type: 'error',
        text: error.message || 'Failed to reset password. Please try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setIsLoading(true);
    setMessage({ type: '', text: '' });

    try {
      await apiFetch(API_ENDPOINTS.FORGOT_PASSWORD, {
        method: 'POST',
        body: JSON.stringify({
          email: formData.email.toLowerCase()
        }),
      });

      setMessage({
        type: 'success',
        text: 'New OTP has been sent to your email.'
      });
      
      setResendTimer(300); // Reset timer to 5 minutes
    } catch (error) {
      logger.error('Resend OTP error:', error);
      setMessage({
        type: 'error',
        text: error.message || 'Failed to resend OTP. Please try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const renderEmailStep = () => (
    <form onSubmit={handleEmailSubmit} className="space-y-6">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
          Email Address
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          autoComplete="email"
          className={`w-full px-4 py-3 bg-gray-900 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
            errors.email 
              ? 'border-red-500 focus:ring-red-500' 
              : 'border-gray-700 focus:ring-[#FF3C5F]'
          }`}
          placeholder="Enter your email address"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-400">{errors.email}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className={`w-full py-3 px-4 rounded-lg font-semibold transition-all transform ${
          isLoading
            ? 'bg-gray-600 cursor-not-allowed'
            : 'bg-gradient-to-r from-[#FF3C5F] to-[#FFC22D] hover:from-[#FF3C5F]/90 hover:to-[#FFC22D]/90 hover:scale-105'
        } text-white shadow-lg`}
      >
        {isLoading ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Sending...
          </span>
        ) : (
          'Send Reset Code'
        )}
      </button>
    </form>
  );

  const renderOTPStep = () => (
    <form onSubmit={handleOTPSubmit} className="space-y-6">
      <div>
        <label htmlFor="otp" className="block text-sm font-medium text-gray-300 mb-2">
          Enter 6-digit OTP
        </label>
        <input
          type="text"
          id="otp"
          name="otp"
          value={formData.otp}
          onChange={handleInputChange}
          maxLength="6"
          className={`w-full px-4 py-3 bg-gray-900 border rounded-lg focus:outline-none focus:ring-2 transition-colors text-center text-lg tracking-wider ${
            errors.otp 
              ? 'border-red-500 focus:ring-red-500' 
              : 'border-gray-700 focus:ring-[#FF3C5F]'
          }`}
          placeholder="123456"
        />
        {errors.otp && (
          <p className="mt-1 text-sm text-red-400">{errors.otp}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className={`w-full py-3 px-4 rounded-lg font-semibold transition-all transform ${
          isLoading
            ? 'bg-gray-600 cursor-not-allowed'
            : 'bg-gradient-to-r from-[#FF3C5F] to-[#FFC22D] hover:from-[#FF3C5F]/90 hover:to-[#FFC22D]/90 hover:scale-105'
        } text-white shadow-lg`}
      >
        {isLoading ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Verifying...
          </span>
        ) : (
          'Verify Code'
        )}
      </button>

      <div className="text-center">
        {resendTimer > 0 ? (
          <p className="text-gray-400 text-sm">
            Resend code in {formatTime(resendTimer)}
          </p>
        ) : (
          <button
            type="button"
            onClick={handleResendOTP}
            disabled={isLoading}
            className="text-[#FF3C5F] hover:text-[#FFC22D] font-medium transition-colors text-sm"
          >
            Resend Code
          </button>
        )}
      </div>
    </form>
  );

  const renderPasswordStep = () => (
    <form onSubmit={handlePasswordSubmit} className="space-y-6">
      <div>
        <label htmlFor="newPassword" className="block text-sm font-medium text-gray-300 mb-2">
          New Password
        </label>
        <input
          type="password"
          id="newPassword"
          name="newPassword"
          value={formData.newPassword}
          onChange={handleInputChange}
          autoComplete="new-password"
          className={`w-full px-4 py-3 bg-gray-900 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
            errors.newPassword 
              ? 'border-red-500 focus:ring-red-500' 
              : 'border-gray-700 focus:ring-[#FF3C5F]'
          }`}
          placeholder="Enter your new password"
        />
        {errors.newPassword && (
          <p className="mt-1 text-sm text-red-400">{errors.newPassword}</p>
        )}
      </div>

      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-2">
          Confirm New Password
        </label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleInputChange}
          autoComplete="new-password"
          className={`w-full px-4 py-3 bg-gray-900 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
            errors.confirmPassword 
              ? 'border-red-500 focus:ring-red-500' 
              : 'border-gray-700 focus:ring-[#FF3C5F]'
          }`}
          placeholder="Confirm your new password"
        />
        {errors.confirmPassword && (
          <p className="mt-1 text-sm text-red-400">{errors.confirmPassword}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className={`w-full py-3 px-4 rounded-lg font-semibold transition-all transform ${
          isLoading
            ? 'bg-gray-600 cursor-not-allowed'
            : 'bg-gradient-to-r from-[#FF3C5F] to-[#FFC22D] hover:from-[#FF3C5F]/90 hover:to-[#FFC22D]/90 hover:scale-105'
        } text-white shadow-lg`}
      >
        {isLoading ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Resetting...
          </span>
        ) : (
          'Reset Password'
        )}
      </button>
    </form>
  );

  const getStepTitle = () => {
    switch (step) {
      case 'email':
        return 'Reset Password';
      case 'otp':
        return 'Enter Verification Code';
      case 'newPassword':
        return 'Create New Password';
      default:
        return 'Reset Password';
    }
  };

  const getStepDescription = () => {
    switch (step) {
      case 'email':
        return 'Enter your email address and we\'ll send you a verification code to reset your password.';
      case 'otp':
        return `We've sent a 6-digit code to ${formData.email}. Enter it below to continue.`;
      case 'newPassword':
        return 'Please enter your new password. Make sure it\'s secure and easy for you to remember.';
      default:
        return '';
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <SidebarNavbar />
      
      <div className="container mx-auto px-4 py-16 pt-16">
        <div className="max-w-md mx-auto">
          <div className="bg-black border border-gray-800 rounded-xl p-8 shadow-2xl">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-[#FF3C5F] to-[#FFC22D] bg-clip-text text-transparent">
                {getStepTitle()}
              </h1>
              <p className="text-gray-400">
                {getStepDescription()}
              </p>
            </div>

            {/* Progress indicator */}
            <div className="flex items-center justify-center mb-8">
              <div className="flex items-center space-x-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                  step === 'email' 
                    ? 'bg-gradient-to-r from-[#FF3C5F] to-[#FFC22D] text-white' 
                    : 'bg-green-500 text-white'
                }`}>
                  1
                </div>
                <div className={`w-8 h-1 ${
                  step === 'otp' || step === 'newPassword' 
                    ? 'bg-gradient-to-r from-[#FF3C5F] to-[#FFC22D]' 
                    : 'bg-gray-600'
                }`}></div>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                  step === 'otp' 
                    ? 'bg-gradient-to-r from-[#FF3C5F] to-[#FFC22D] text-white' 
                    : step === 'newPassword' 
                    ? 'bg-green-500 text-white' 
                    : 'bg-gray-600 text-gray-400'
                }`}>
                  2
                </div>
                <div className={`w-8 h-1 ${
                  step === 'newPassword' 
                    ? 'bg-gradient-to-r from-[#FF3C5F] to-[#FFC22D]' 
                    : 'bg-gray-600'
                }`}></div>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                  step === 'newPassword' 
                    ? 'bg-gradient-to-r from-[#FF3C5F] to-[#FFC22D] text-white' 
                    : 'bg-gray-600 text-gray-400'
                }`}>
                  3
                </div>
              </div>
            </div>

            {message.text && (
              <div className={`mb-6 p-4 rounded-lg ${
                message.type === 'success' 
                  ? 'bg-green-900 border border-green-700 text-green-300' 
                  : 'bg-red-900 border border-red-700 text-red-300'
              }`}>
                {message.text}
              </div>
            )}

            {step === 'email' && renderEmailStep()}
            {step === 'otp' && renderOTPStep()}
            {step === 'newPassword' && renderPasswordStep()}

            <div className="mt-8 text-center">
              <p className="text-gray-400">
                Remember your password?{' '}
                <Link 
                  to="/login" 
                  className="text-[#FF3C5F] hover:text-[#FFC22D] font-medium transition-colors"
                >
                  Back to Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
