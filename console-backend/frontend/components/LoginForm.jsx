import React, { useState, useEffect } from 'react';
import { authAPI } from '../api/authApi';

const LoginForm = ({ onSuccess, onSwitchToRegister, onSwitchToForgotPassword }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [loginState, setLoginState] = useState({
    loading: false,
    error: null,
    needsVerification: false,
    pendingData: null,
    timeLeft: 0
  });

  const [otp, setOtp] = useState('');
  const [showVerification, setShowVerification] = useState(false);

  // Countdown timer for OTP expiry (when user needs verification)
  useEffect(() => {
    let interval;
    if (showVerification && loginState.timeLeft > 0) {
      interval = setInterval(() => {
        setLoginState(prev => ({
          ...prev,
          timeLeft: Math.max(0, prev.timeLeft - 1)
        }));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [showVerification, loginState.timeLeft]);

  // Format time for display
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setLoginState(prev => ({ ...prev, error: 'Please enter both email and password' }));
      return;
    }

    setLoginState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const result = await authAPI.login(formData);

      if (result.success) {
        // Login successful
        const { token, user } = result.data.data;
        localStorage.setItem('auth_token', token);
        onSuccess && onSuccess(user);
      } else {
        // Check if user needs verification
        if (result.data.status === 'needs_verification') {
          setLoginState({
            loading: false,
            error: null,
            needsVerification: true,
            pendingData: result.data.data,
            timeLeft: result.data.data.timeLeft
          });
          setShowVerification(true);
        } else {
          setLoginState(prev => ({
            ...prev,
            loading: false,
            error: result.error || 'Login failed'
          }));
        }
      }
    } catch (error) {
      setLoginState(prev => ({
        ...prev,
        loading: false,
        error: 'Network error. Please try again.'
      }));
    }
  };

  const handleVerifyFromLogin = async (e) => {
    e.preventDefault();

    if (!otp || otp.length !== 6) {
      setLoginState(prev => ({ ...prev, error: 'Please enter a valid 6-digit code' }));
      return;
    }

    setLoginState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const result = await authAPI.verifyEmail({
        email: formData.email,
        otp: otp
      });

      if (result.success) {
        // Verification successful - auto login
        const { token, user } = result.data.data;
        localStorage.setItem('auth_token', token);
        onSuccess && onSuccess(user);
      } else {
        if (result.data.status === 'otp_expired') {
          setLoginState(prev => ({
            ...prev,
            loading: false,
            error: 'Verification code expired. Please register again.'
          }));
          setShowVerification(false);
        } else {
          setLoginState(prev => ({
            ...prev,
            loading: false,
            error: result.error || 'Verification failed'
          }));
        }
      }
    } catch (error) {
      setLoginState(prev => ({
        ...prev,
        loading: false,
        error: 'Network error. Please try again.'
      }));
    }
  };

  const handleResendFromLogin = async () => {
    setLoginState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const result = await authAPI.resendVerification(formData.email);

      if (result.success) {
        setLoginState(prev => ({
          ...prev,
          loading: false,
          timeLeft: result.data.data.timeLeft,
          error: null
        }));
        setOtp('');
      } else {
        setLoginState(prev => ({
          ...prev,
          loading: false,
          error: result.error || 'Failed to resend code'
        }));
      }
    } catch (error) {
      setLoginState(prev => ({
        ...prev,
        loading: false,
        error: 'Network error. Please try again.'
      }));
    }
  };

  const goBackToLogin = () => {
    setShowVerification(false);
    setLoginState({
      loading: false,
      error: null,
      needsVerification: false,
      pendingData: null,
      timeLeft: 0
    });
    setOtp('');
  };

  // Show verification form if user needs to verify email
  if (showVerification && loginState.needsVerification) {
    return (
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        <div className="text-center mb-6">
          <div className="text-6xl mb-4">📧</div>
          <h2 className="text-2xl font-bold text-gray-800">Verify Your Email</h2>
          <p className="text-gray-600 mt-2">
            Your account exists but needs verification.<br />
            Please check your email for the verification code.
          </p>
          <p className="text-sm text-gray-500 mt-2">
            <strong>{formData.email}</strong>
          </p>
        </div>

        {loginState.error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {loginState.error}
          </div>
        )}

        {/* Time Left Display */}
        <div className="text-center mb-4">
          {loginState.timeLeft > 0 ? (
            <div className="bg-blue-100 text-blue-800 px-4 py-3 rounded">
              <p className="text-sm">Code expires in</p>
              <p className="text-2xl font-bold font-mono">
                {formatTime(loginState.timeLeft)}
              </p>
            </div>
          ) : (
            <div className="bg-red-100 text-red-800 px-4 py-3 rounded">
              <p className="text-sm font-medium">Code has expired</p>
              <p className="text-xs mt-1">Please register again</p>
            </div>
          )}
        </div>

        <form onSubmit={handleVerifyFromLogin}>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2 text-center">
              Enter Verification Code
            </label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').substring(0, 6))}
              className="w-full px-3 py-2 text-center text-2xl font-mono border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="123456"
              maxLength="6"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loginState.loading || loginState.timeLeft === 0}
            className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50 mb-4"
          >
            {loginState.loading ? 'Verifying...' : 'Verify & Login'}
          </button>
        </form>

        <div className="text-center space-y-2">
          {loginState.timeLeft > 0 && loginState.pendingData?.canResend && (
            <button
              onClick={handleResendFromLogin}
              disabled={loginState.loading}
              className="text-blue-500 hover:text-blue-700 text-sm font-medium disabled:opacity-50 block mx-auto"
            >
              {loginState.loading ? 'Sending...' : 'Resend Code'}
            </button>
          )}
          
          <button
            onClick={goBackToLogin}
            className="text-gray-500 hover:text-gray-700 text-sm block mx-auto"
          >
            Back to Login
          </button>
        </div>
      </div>
    );
  }

  // Regular login form
  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

      {loginState.error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {loginState.error}
        </div>
      )}

      <form onSubmit={handleLogin}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="your.email@example.com"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Your password"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loginState.loading}
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
        >
          {loginState.loading ? 'Signing In...' : 'Sign In'}
        </button>
      </form>

      <div className="text-center mt-4 space-y-2">
        <button
          onClick={onSwitchToForgotPassword}
          className="text-blue-500 hover:text-blue-700 text-sm font-medium block mx-auto"
        >
          Forgot Password?
        </button>
        
        <div>
          <span className="text-gray-600 text-sm">Don't have an account? </span>
          <button
            onClick={onSwitchToRegister}
            className="text-blue-500 hover:text-blue-700 font-medium text-sm"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
