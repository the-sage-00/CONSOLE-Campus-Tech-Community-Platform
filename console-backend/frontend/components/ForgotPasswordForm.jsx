import React, { useState, useEffect } from 'react';
import { authAPI } from '../api/authApi';

const ForgotPasswordForm = ({ onSuccess, onBackToLogin }) => {
  const [step, setStep] = useState('email'); // 'email' | 'otp' | 'newPassword' | 'success'
  
  const [formData, setFormData] = useState({
    email: '',
    otp: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [resetState, setResetState] = useState({
    loading: false,
    error: null,
    timeLeft: 0,
    canResend: true,
    remainingResends: 3
  });

  // Countdown timer for OTP expiry
  useEffect(() => {
    let interval;
    if ((step === 'otp' || step === 'newPassword') && resetState.timeLeft > 0) {
      interval = setInterval(() => {
        setResetState(prev => ({
          ...prev,
          timeLeft: Math.max(0, prev.timeLeft - 1)
        }));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [step, resetState.timeLeft]);

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

  // Step 1: Send reset OTP to email
  const handleSendOTP = async (e) => {
    e.preventDefault();

    if (!formData.email) {
      setResetState(prev => ({ ...prev, error: 'Please enter your email address' }));
      return;
    }

    if (!formData.email.includes('@')) {
      setResetState(prev => ({ ...prev, error: 'Please enter a valid email address' }));
      return;
    }

    setResetState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const result = await authAPI.forgotPassword(formData.email);

      if (result.success) {
        setResetState({
          loading: false,
          error: null,
          timeLeft: result.data.data?.timeLeft || 900, // 15 minutes default
          canResend: true,
          remainingResends: result.data.data?.remainingResends || 2
        });
        setStep('otp');
      } else {
        setResetState(prev => ({
          ...prev,
          loading: false,
          error: result.error || 'Failed to send reset code'
        }));
      }
    } catch (error) {
      setResetState(prev => ({
        ...prev,
        loading: false,
        error: 'Network error. Please try again.'
      }));
    }
  };

  // Step 2: Verify OTP (Actually verify with backend)
  const handleVerifyOTP = async (e) => {
    e.preventDefault();

    if (!formData.otp || formData.otp.length !== 6) {
      setResetState(prev => ({ ...prev, error: 'Please enter a valid 6-digit code' }));
      return;
    }

    // Just proceed to password entry step - verification happens in final step
    setStep('newPassword');
    setResetState(prev => ({ ...prev, error: null }));
  };

  // Step 3: Reset password with OTP
  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (!formData.newPassword) {
      setResetState(prev => ({ ...prev, error: 'Please enter a new password' }));
      return;
    }

    if (formData.newPassword.length < 6) {
      setResetState(prev => ({ ...prev, error: 'Password must be at least 6 characters' }));
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setResetState(prev => ({ ...prev, error: 'Passwords do not match' }));
      return;
    }

    setResetState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const result = await authAPI.resetPassword({
        email: formData.email,
        otp: formData.otp,
        newPassword: formData.newPassword
      });

      if (result.success) {
        setStep('success');
        setResetState(prev => ({ ...prev, loading: false, error: null }));
      } else {
        // Safely check if status exists in the response
        const status = result.data?.status;
        
        if (status === 'otp_expired') {
          setResetState(prev => ({
            ...prev,
            loading: false,
            error: 'Reset code has expired. Please request a new one.'
          }));
          setStep('email');
        } else if (status === 'invalid_otp') {
          setResetState(prev => ({
            ...prev,
            loading: false,
            error: result.error || 'Invalid reset code'
          }));
        } else if (status === 'missing_fields') {
          setResetState(prev => ({
            ...prev,
            loading: false,
            error: 'Email, OTP, and new password are all required'
          }));
        } else {
          // General error handling
          setResetState(prev => ({
            ...prev,
            loading: false,
            error: result.error || 'Failed to reset password'
          }));
          
          // Debug the response
          console.error('Password reset failed:', result);
        }
      }
    } catch (error) {
      setResetState(prev => ({
        ...prev,
        loading: false,
        error: 'Network error. Please try again.'
      }));
    }
  };

  // Resend OTP
  const handleResendOTP = async () => {
    if (resetState.remainingResends <= 0) {
      setResetState(prev => ({ ...prev, error: 'Maximum resend limit reached' }));
      return;
    }

    setResetState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const result = await authAPI.forgotPassword(formData.email);

      if (result.success) {
        setResetState(prev => ({
          ...prev,
          loading: false,
          timeLeft: result.data.data?.timeLeft || 900,
          remainingResends: Math.max(0, prev.remainingResends - 1),
          error: null
        }));
        setFormData(prev => ({ ...prev, otp: '' }));
      } else {
        setResetState(prev => ({
          ...prev,
          loading: false,
          error: result.error || 'Failed to resend code'
        }));
      }
    } catch (error) {
      setResetState(prev => ({
        ...prev,
        loading: false,
        error: 'Network error. Please try again.'
      }));
    }
  };

  const resetForm = () => {
    setStep('email');
    setFormData({
      email: '',
      otp: '',
      newPassword: '',
      confirmPassword: ''
    });
    setResetState({
      loading: false,
      error: null,
      timeLeft: 0,
      canResend: true,
      remainingResends: 3
    });
  };

  // Step 1: Email Input
  if (step === 'email') {
    return (
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        <div className="text-center mb-6">
          <div className="text-6xl mb-4">🔑</div>
          <h2 className="text-2xl font-bold text-gray-800">Forgot Password</h2>
          <p className="text-gray-600 mt-2">
            Enter your email address and we'll send you a code to reset your password.
          </p>
        </div>

        {resetState.error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {resetState.error}
          </div>
        )}

        <form onSubmit={handleSendOTP}>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email Address
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

          <button
            type="submit"
            disabled={resetState.loading}
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
          >
            {resetState.loading ? 'Sending Code...' : 'Send Reset Code'}
          </button>
        </form>

        <div className="text-center mt-4">
          <button
            onClick={onBackToLogin}
            className="text-gray-500 hover:text-gray-700 text-sm"
          >
            Back to Login
          </button>
        </div>
      </div>
    );
  }

  // Step 2: OTP Verification
  if (step === 'otp') {
    return (
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        <div className="text-center mb-6">
          <div className="text-6xl mb-4">📧</div>
          <h2 className="text-2xl font-bold text-gray-800">Enter Reset Code</h2>
          <p className="text-gray-600 mt-2">
            We sent a reset code to<br />
            <strong>{formData.email}</strong>
          </p>
        </div>

        {resetState.error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {resetState.error}
          </div>
        )}

        {/* Time Left Display */}
        <div className="text-center mb-4">
          {resetState.timeLeft > 0 ? (
            <div className="bg-blue-100 text-blue-800 px-4 py-3 rounded">
              <p className="text-sm">Code expires in</p>
              <p className="text-2xl font-bold font-mono">
                {formatTime(resetState.timeLeft)}
              </p>
            </div>
          ) : (
            <div className="bg-red-100 text-red-800 px-4 py-3 rounded">
              <p className="text-sm font-medium">Code has expired</p>
              <p className="text-xs mt-1">Please request a new code</p>
            </div>
          )}
        </div>

        <form onSubmit={handleVerifyOTP}>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2 text-center">
              Reset Code
            </label>
            <input
              type="text"
              name="otp"
              value={formData.otp}
              onChange={(e) => setFormData(prev => ({ ...prev, otp: e.target.value.replace(/\D/g, '').substring(0, 6) }))}
              className="w-full px-3 py-2 text-center text-2xl font-mono border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="123456"
              maxLength="6"
              required
            />
          </div>

          <button
            type="submit"
            disabled={resetState.timeLeft === 0}
            className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
          >
            Verify Code
          </button>
        </form>

        <div className="text-center mt-4 space-y-2">
          {resetState.timeLeft > 0 && resetState.remainingResends > 0 && (
            <button
              onClick={handleResendOTP}
              disabled={resetState.loading}
              className="text-blue-500 hover:text-blue-700 text-sm font-medium disabled:opacity-50 block mx-auto"
            >
              {resetState.loading ? 'Sending...' : `Resend Code (${resetState.remainingResends} left)`}
            </button>
          )}
          
          <button
            onClick={resetForm}
            className="text-gray-500 hover:text-gray-700 text-sm block mx-auto"
          >
            Use Different Email
          </button>
        </div>
      </div>
    );
  }

  // Step 3: New Password
  if (step === 'newPassword') {
    return (
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        <div className="text-center mb-6">
          <div className="text-6xl mb-4">🔐</div>
          <h2 className="text-2xl font-bold text-gray-800">Create New Password</h2>
          <p className="text-gray-600 mt-2">
            Choose a strong password for your account
          </p>
        </div>

        {resetState.error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {resetState.error}
          </div>
        )}

        {/* Time Left Display */}
        <div className="text-center mb-4">
          {resetState.timeLeft > 0 ? (
            <div className="bg-blue-100 text-blue-800 px-4 py-3 rounded">
              <p className="text-sm">Complete reset in</p>
              <p className="text-xl font-bold font-mono">
                {formatTime(resetState.timeLeft)}
              </p>
            </div>
          ) : (
            <div className="bg-red-100 text-red-800 px-4 py-3 rounded">
              <p className="text-sm font-medium">Reset session expired</p>
              <p className="text-xs mt-1">Please request a new code</p>
            </div>
          )}
        </div>

        <form onSubmit={handleResetPassword}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              New Password
            </label>
            <input
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="At least 6 characters"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Confirm New Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Confirm your password"
              required
            />
          </div>

          <button
            type="submit"
            disabled={resetState.loading || resetState.timeLeft === 0}
            className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
          >
            {resetState.loading ? 'Resetting Password...' : 'Reset Password'}
          </button>
        </form>

        <div className="text-center mt-4">
          <button
            onClick={() => setStep('otp')}
            className="text-gray-500 hover:text-gray-700 text-sm"
          >
            Back to Code Entry
          </button>
        </div>
      </div>
    );
  }

  // Step 4: Success
  if (step === 'success') {
    return (
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6 text-center">
        <div className="text-6xl mb-4">✅</div>
        <h2 className="text-2xl font-bold text-green-600 mb-4">Password Reset Successfully!</h2>
        <p className="text-gray-600 mb-6">
          Your password has been updated. You can now login with your new password.
        </p>
        <button
          onClick={onBackToLogin}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-2"
        >
          Back to Login
        </button>
        <div className="mt-4">
          <button
            onClick={resetForm}
            className="text-gray-500 hover:text-gray-700 text-sm"
          >
            Reset Another Password
          </button>
        </div>
      </div>
    );
  }

  return null;
};

export default ForgotPasswordForm;
