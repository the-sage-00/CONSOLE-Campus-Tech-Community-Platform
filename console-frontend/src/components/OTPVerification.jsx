import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Header from './Header';
import { apiFetch, API_ENDPOINTS } from '../utils/api';
import { logger } from '../utils/logger';

const OTPVerification = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [pendingVerification, setPendingVerification] = useState(null);
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes in seconds

  useEffect(() => {
    // Get pending verification from localStorage
    const stored = localStorage.getItem('pendingVerification');
    if (stored) {
      setPendingVerification(JSON.parse(stored));
    } else {
      // If no pending verification, redirect to register
      navigate('/register');
    }
  }, [navigate]);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleOTPChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 6);
    setOtp(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (otp.length !== 6) {
      setMessage({
        type: 'error',
        text: 'Please enter a 6-digit verification code'
      });
      return;
    }

    if (!pendingVerification) {
      setMessage({
        type: 'error',
        text: 'No pending verification found. Please register again.'
      });
      return;
    }

    setIsLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const data = await apiFetch(API_ENDPOINTS.VERIFY_EMAIL, {
        method: 'POST',
        body: JSON.stringify({
          email: pendingVerification.email,
          otp: otp
        }),
      });

      setMessage({
        type: 'success',
        text: data.message
      });
      
      // Clear pending verification
      localStorage.removeItem('pendingVerification');
      
      // Redirect to login after 3 seconds
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (error) {
      logger.error('OTP verification error:', error);
      setMessage({
        type: 'error',
        text: error.message || 'Verification failed. Please try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    if (!pendingVerification) return;

    setIsLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const data = await apiFetch(API_ENDPOINTS.RESEND_VERIFICATION, {
        method: 'POST',
        body: JSON.stringify({
          email: pendingVerification.email
        }),
      });

      setMessage({
        type: 'success',
        text: data.message
      });
      
      // Reset timer
      setTimeLeft(120);
    } catch (error) {
      logger.error('Resend OTP error:', error);
      setMessage({
        type: 'error',
        text: error.message || 'Failed to resend verification code. Please try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!pendingVerification) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      
      <div className="container mx-auto px-4 py-16 pt-24">
        <div className="max-w-md mx-auto">
          <div className="bg-black border border-gray-800 rounded-xl p-8 shadow-2xl">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-[#FF3C5F] to-[#FFC22D] bg-clip-text text-transparent">
                Verify Your Email
              </h1>
              <p className="text-gray-400">
                We've sent a verification code to {pendingVerification.email}
              </p>
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

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="otp" className="block text-sm font-medium text-gray-300 mb-2">
                  Verification Code
                </label>
                <input
                  type="text"
                  id="otp"
                  value={otp}
                  onChange={handleOTPChange}
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors text-center text-2xl font-mono tracking-widest"
                  placeholder="000000"
                  maxLength={6}
                  autoComplete="one-time-code"
                />
                <p className="mt-2 text-sm text-gray-400">
                  Enter the 6-digit code sent to your email
                </p>
              </div>

              {timeLeft > 0 && (
                <div className="text-center">
                  <p className="text-sm text-gray-400">
                    Time remaining: <span className="text-blue-400 font-mono">{formatTime(timeLeft)}</span>
                  </p>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading || otp.length !== 6 || timeLeft === 0}
                className={`w-full py-3 px-4 rounded-lg font-semibold transition-all transform ${
                  isLoading || otp.length !== 6 || timeLeft === 0
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
                  'Verify Email'
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-400 mb-4">
                Didn't receive the code?
              </p>
              <button
                onClick={handleResendOTP}
                disabled={isLoading || timeLeft > 0}
                className={`text-[#FF3C5F] hover:text-[#FFC22D] font-medium transition-colors ${
                  isLoading || timeLeft > 0 ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {timeLeft > 0 ? `Resend in ${formatTime(timeLeft)}` : 'Resend Code'}
              </button>
            </div>

            <div className="mt-8 text-center">
              <p className="text-gray-400">
                Already have an account?{' '}
                <Link 
                  to="/login" 
                  className="text-[#FF3C5F] hover:text-[#FFC22D] font-medium transition-colors"
                >
                  Sign In
                </Link>
              </p>
            </div>

            <div className="mt-6 p-4 bg-gray-900 rounded-lg">
              <h3 className="text-sm font-medium text-gray-300 mb-2">Need help?</h3>
              <ul className="text-xs text-gray-400 space-y-1">
                <li>• Check your spam/junk folder</li>
                <li>• Make sure the email address is correct</li>
                <li>• Wait a few minutes for the email to arrive</li>
                <li>• Contact support if you continue having issues</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OTPVerification;