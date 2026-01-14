import React, { useState, useEffect } from 'react';
import { authAPI } from '../api/authApi';

const RegisterForm = ({ onSuccess, onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    branch: ''
  });

  const [registrationState, setRegistrationState] = useState({
    step: 'form', // 'form' | 'pending' | 'verifying' | 'success'
    loading: false,
    error: null,
    pendingData: null,
    timeLeft: 0,
    canResend: true
  });

  const [otp, setOtp] = useState('');

  // Countdown timer for OTP expiry
  useEffect(() => {
    let interval;
    if (registrationState.step === 'pending' && registrationState.timeLeft > 0) {
      interval = setInterval(() => {
        setRegistrationState(prev => ({
          ...prev,
          timeLeft: Math.max(0, prev.timeLeft - 1)
        }));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [registrationState.step, registrationState.timeLeft]);

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

  const validateForm = () => {
    if (!formData.name || !formData.email || !formData.password || !formData.branch) {
      return 'All fields are required';
    }
    
    if (formData.password.length < 6) {
      return 'Password must be at least 6 characters';
    }
    
    if (formData.password !== formData.confirmPassword) {
      return 'Passwords do not match';
    }
    
    if (!formData.email.includes('@')) {
      return 'Please enter a valid email address';
    }
    
    return null;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    
    const validationError = validateForm();
    if (validationError) {
      setRegistrationState(prev => ({ ...prev, error: validationError }));
      return;
    }

    setRegistrationState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const result = await authAPI.register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        branch: formData.branch
      });

      if (result.success) {
        // Registration initiated successfully
        setRegistrationState({
          step: 'pending',
          loading: false,
          error: null,
          pendingData: result.data.data,
          timeLeft: result.data.data.timeLeft,
          canResend: result.data.data.canResend
        });
      } else {
        // Handle different error cases
        if (result.data.status === 'registration_pending') {
          // User already has pending registration
          setRegistrationState({
            step: 'pending',
            loading: false,
            error: null,
            pendingData: result.data.data,
            timeLeft: result.data.data.timeLeft,
            canResend: result.data.data.canResend
          });
        } else {
          setRegistrationState(prev => ({ 
            ...prev, 
            loading: false, 
            error: result.error || 'Registration failed' 
          }));
        }
      }
    } catch (error) {
      setRegistrationState(prev => ({ 
        ...prev, 
        loading: false, 
        error: 'Network error. Please try again.' 
      }));
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    
    if (!otp || otp.length !== 6) {
      setRegistrationState(prev => ({ ...prev, error: 'Please enter a valid 6-digit code' }));
      return;
    }

    setRegistrationState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const result = await authAPI.verifyEmail({
        email: formData.email,
        otp: otp
      });

      if (result.success) {
        setRegistrationState({
          step: 'success',
          loading: false,
          error: null,
          pendingData: null,
          timeLeft: 0,
          canResend: false
        });
        
        // Auto-login user and call success callback
        if (result.data.data.token) {
          localStorage.setItem('auth_token', result.data.data.token);
          onSuccess && onSuccess(result.data.data.user);
        }
      } else {
        if (result.data.status === 'otp_expired') {
          setRegistrationState(prev => ({ 
            ...prev, 
            loading: false, 
            error: 'Verification code expired. Please register again.',
            step: 'form'
          }));
        } else {
          setRegistrationState(prev => ({ 
            ...prev, 
            loading: false, 
            error: result.error || 'Verification failed' 
          }));
        }
      }
    } catch (error) {
      setRegistrationState(prev => ({ 
        ...prev, 
        loading: false, 
        error: 'Network error. Please try again.' 
      }));
    }
  };

  const handleResendOTP = async () => {
    setRegistrationState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const result = await authAPI.resendVerification(formData.email);

      if (result.success) {
        setRegistrationState(prev => ({
          ...prev,
          loading: false,
          timeLeft: result.data.data.timeLeft,
          canResend: result.data.data.remainingResends > 0,
          error: null
        }));
        setOtp(''); // Clear OTP field
      } else {
        setRegistrationState(prev => ({ 
          ...prev, 
          loading: false, 
          error: result.error || 'Failed to resend code' 
        }));
      }
    } catch (error) {
      setRegistrationState(prev => ({ 
        ...prev, 
        loading: false, 
        error: 'Network error. Please try again.' 
      }));
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      branch: ''
    });
    setRegistrationState({
      step: 'form',
      loading: false,
      error: null,
      pendingData: null,
      timeLeft: 0,
      canResend: true
    });
    setOtp('');
  };

  // Registration Form
  if (registrationState.step === 'form') {
    return (
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-center mb-6">Create Account</h2>
        
        {registrationState.error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {registrationState.error}
          </div>
        )}

        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Your full name"
              required
            />
          </div>

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

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Branch
            </label>
            <select
              name="branch"
              value={formData.branch}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select your branch</option>
              <option value="CSE">Computer Science</option>
              <option value="AIDE">Artificial Intelligence and Data Engineering</option>
              <option value="ECE">Electronics and Communication Engineering</option>
              <option value="ME">Mechanical Engineering</option>
              <option value="CE">Civil Engineering</option>
              <option value="CHE">Chemical Engineering</option>
              <option value="EE">Electrical Engineering</option>
              <option value="META">Metallurgical and Materials Engineering</option>
              <option value="ARCHI">Architecture</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="At least 6 characters"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Confirm your password"
              required
            />
          </div>

          <button
            type="submit"
            disabled={registrationState.loading}
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
          >
            {registrationState.loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <div className="text-center mt-4">
          <span className="text-gray-600">Already have an account? </span>
          <button
            onClick={onSwitchToLogin}
            className="text-blue-500 hover:text-blue-700 font-medium"
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  // Verification Step
  if (registrationState.step === 'pending') {
    return (
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        <div className="text-center mb-6">
          <div className="text-6xl mb-4">📧</div>
          <h2 className="text-2xl font-bold text-gray-800">Verify Your Email</h2>
          <p className="text-gray-600 mt-2">
            We sent a verification code to<br />
            <strong>{formData.email}</strong>
          </p>
        </div>

        {registrationState.error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {registrationState.error}
          </div>
        )}

        {/* Time Left Display */}
        <div className="text-center mb-4">
          {registrationState.timeLeft > 0 ? (
            <div className="bg-blue-100 text-blue-800 px-4 py-3 rounded">
              <p className="text-sm">Code expires in</p>
              <p className="text-2xl font-bold font-mono">
                {formatTime(registrationState.timeLeft)}
              </p>
            </div>
          ) : (
            <div className="bg-red-100 text-red-800 px-4 py-3 rounded">
              <p className="text-sm font-medium">Code has expired</p>
              <p className="text-xs mt-1">Please register again</p>
            </div>
          )}
        </div>

        <form onSubmit={handleVerify}>
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
            disabled={registrationState.loading || registrationState.timeLeft === 0}
            className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
          >
            {registrationState.loading ? 'Verifying...' : 'Verify Email'}
          </button>
        </form>

        <div className="mt-4 text-center">
          {registrationState.timeLeft > 0 && registrationState.canResend && (
            <button
              onClick={handleResendOTP}
              disabled={registrationState.loading}
              className="text-blue-500 hover:text-blue-700 text-sm font-medium disabled:opacity-50"
            >
              {registrationState.loading ? 'Sending...' : 'Resend Code'}
            </button>
          )}
          
          <div className="mt-2">
            <button
              onClick={resetForm}
              className="text-gray-500 hover:text-gray-700 text-sm"
            >
              Start Over
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Success Step
  if (registrationState.step === 'success') {
    return (
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6 text-center">
        <div className="text-6xl mb-4">🎉</div>
        <h2 className="text-2xl font-bold text-green-600 mb-4">Welcome!</h2>
        <p className="text-gray-600 mb-6">
          Your email has been verified successfully. You're now logged in and ready to start!
        </p>
        <button
          onClick={() => window.location.reload()}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Continue to Dashboard
        </button>
      </div>
    );
  }

  return null;
};

export default RegisterForm;
