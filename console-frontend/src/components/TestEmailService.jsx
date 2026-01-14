import React, { useState } from 'react';
import { apiFetch, API_ENDPOINTS } from '../utils/api';
import { logger } from '../utils/logger';

const TestEmailService = () => {
  const [email, setEmail] = useState('mygroot143@gmail.com'); // Pre-filled with user's email
  const [name, setName] = useState('Test User');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [userId, setUserId] = useState('');
  const [otp, setOtp] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    
    if (!email || !name) {
      setMessage({
        type: 'error',
        text: 'Please enter both name and email'
      });
      return;
    }

    setIsLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const data = await apiFetch(API_ENDPOINTS.REGISTER, {
        method: 'POST',
        body: JSON.stringify({
          name: name.trim(),
          email: email.toLowerCase(),
          password: 'password123', // Simple password for testing
          branch: 'Computer Science Engineering'
        }),
      });

      setMessage({
        type: 'success',
        text: data.message
      });
      
      setUserId(data.data.userId);
    } catch (error) {
      logger.error('Registration error:', error);
      setMessage({
        type: 'error',
        text: error.message || 'Registration failed. Please try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    
    if (!userId || !otp) {
      setMessage({
        type: 'error',
        text: 'Please enter the OTP and ensure you have registered'
      });
      return;
    }

    setIsLoading(true);

    try {
      const data = await apiFetch(API_ENDPOINTS.VERIFY_EMAIL, {
        method: 'POST',
        body: JSON.stringify({
          userId: userId,
          otp: otp
        }),
      });

      setMessage({
        type: 'success',
        text: data.message
      });
    } catch (error) {
      logger.error('Verification error:', error);
      setMessage({
        type: 'error',
        text: error.message || 'Verification failed. Please try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-md mx-auto bg-gray-900 p-8 rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-[#FF3C5F] to-[#FFC22D] bg-clip-text text-transparent">
          Email Service Test
        </h1>
        
        <div className="mb-6 p-4 rounded-lg bg-blue-900 text-blue-300">
          <p className="font-medium">✅ Email service is now configured and working!</p>
          <p className="text-sm mt-2">The system will send a verification email to the address you provide. You should receive it within a few minutes.</p>
        </div>
        
        {message.text && (
          <div className={`mb-6 p-4 rounded-lg ${message.type === 'success' ? 'bg-green-900 text-green-300' : 'bg-red-900 text-red-300'}`}>
            {message.text}
          </div>
        )}
        
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-300">Step 1: Register</h2>
          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF3C5F]"
                placeholder="Enter your name"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF3C5F]"
                placeholder="Enter your email"
              />
            </div>
            
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2 px-4 bg-gradient-to-r from-[#FF3C5F] to-[#FFC22D] rounded-lg font-medium text-white hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {isLoading ? 'Registering...' : 'Register & Send OTP'}
            </button>
          </form>
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-4 text-gray-300">Step 2: Verify OTP</h2>
          <form onSubmit={handleVerify} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">User ID</label>
              <input
                type="text"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF3C5F]"
                placeholder="User ID from registration"
                readOnly={!!userId}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">OTP Code</label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF3C5F]"
                placeholder="Enter 6-digit OTP"
                maxLength={6}
              />
            </div>
            
            <button
              type="submit"
              disabled={isLoading || !userId}
              className="w-full py-2 px-4 bg-gradient-to-r from-[#FF3C5F] to-[#FFC22D] rounded-lg font-medium text-white hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {isLoading ? 'Verifying...' : 'Verify OTP'}
            </button>
          </form>
        </div>
        
        <div className="mt-8 text-sm text-gray-500">
          <p>Note: This is a test component to verify the email service functionality.</p>
          <p className="mt-2">Check the server logs to see the actual OTP generated.</p>
        </div>
      </div>
    </div>
  );
};

export default TestEmailService;