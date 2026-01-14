import React, { useState } from 'react';
import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';
import ForgotPasswordForm from './ForgotPasswordForm';

const AuthSystem = ({ onAuthSuccess }) => {
  const [currentView, setCurrentView] = useState('login'); // 'login' | 'register' | 'forgotPassword'

  const handleAuthSuccess = (user) => {
    console.log('Auth successful:', user);
    onAuthSuccess && onAuthSuccess(user);
  };

  const renderAuthForm = () => {
    switch (currentView) {
      case 'register':
        return (
          <RegisterForm
            onSuccess={handleAuthSuccess}
            onSwitchToLogin={() => setCurrentView('login')}
          />
        );

      case 'forgotPassword':
        return (
          <ForgotPasswordForm
            onSuccess={handleAuthSuccess}
            onBackToLogin={() => setCurrentView('login')}
          />
        );

      case 'login':
      default:
        return (
          <LoginForm
            onSuccess={handleAuthSuccess}
            onSwitchToRegister={() => setCurrentView('register')}
            onSwitchToForgotPassword={() => setCurrentView('forgotPassword')}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">🏆</h1>
          <h2 className="text-2xl font-bold text-gray-900">Console</h2>
          <p className="text-gray-600 mt-2">Track your competitive programming progress</p>
        </div>

        {/* Auth Form */}
        <div className="mt-8">
          {renderAuthForm()}
        </div>

        {/* System Status (optional) */}
        <div className="text-center mt-8">
          <div className="text-xs text-gray-500 space-y-1">
            <p>✅ 5-minute email verification</p>
            <p>🔄 Auto-cleanup of expired accounts</p>
            <p>🔑 Forgot password with OTP</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Demo component to show how to use the auth system
const AuthDemo = () => {
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
    console.log('User logged in:', userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    setUser(null);
  };

  if (user) {
    return (
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-green-600">Welcome! 🎉</h1>
            <p className="text-gray-600">You're now logged in</p>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h3 className="text-lg font-semibold mb-3">Your Profile:</h3>
            <div className="space-y-2">
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Branch:</strong> {user.branch}</p>
              <p><strong>Verified:</strong> {user.isEmailVerified ? '✅ Yes' : '❌ No'}</p>
            </div>
          </div>

          <div className="text-center space-y-4">
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Logout
            </button>
          </div>

          <div className="mt-8 text-center">
            <h3 className="text-lg font-semibold mb-4">What's Next?</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800">Add Platform Profiles</h4>
                <p className="text-blue-600 text-sm mt-1">Link your LeetCode and Codeforces accounts</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-semibold text-green-800">Join Leaderboard</h4>
                <p className="text-green-600 text-sm mt-1">Start competing with other users</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <AuthSystem onAuthSuccess={handleLogin} />;
};

export { AuthSystem, AuthDemo };
export default AuthSystem;
