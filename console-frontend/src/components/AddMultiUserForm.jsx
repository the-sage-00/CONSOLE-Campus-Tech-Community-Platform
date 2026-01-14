import React, { useState } from 'react';
import { API_ENDPOINTS } from '../utils/api';

const AddMultiUserForm = ({ onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    codeforces: "",
    leetcode: ""
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
      setFormData(prev => ({
        ...prev,
      [name]: value
      }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setMessage("❌ Please enter a valid email address");
      setLoading(false);
      return;
    }

    try {
      const platforms = {};
      if (formData.codeforces) platforms.codeforces = { handle: formData.codeforces };
      if (formData.leetcode) platforms.leetcode = { handle: formData.leetcode };

      const response = await fetch(`${API_ENDPOINTS.LEADERBOARD}/user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          platforms: platforms
        }),
      });

      if (response.ok) {
        const result = await response.json();
        setMessage(`✅ ${formData.name} added successfully!`);
        
        if (result.platformFetch) {
          if (result.platformFetch.success.length > 0) {
            setMessage(prev => prev + '\n' + result.platformFetch.success.join('\n'));
          }
          if (result.platformFetch.errors.length > 0) {
            setMessage(prev => prev + '\n⚠️ ' + result.platformFetch.errors.join('\n'));
          }
        }
        
        setFormData({
          name: "",
          email: "",
          codeforces: "",
          leetcode: ""
        });
        onAdd();
        setTimeout(() => {
          setMessage("");
          onClose();
        }, 3000);
      } else {
        const errorData = await response.json();
        setMessage(`❌ ${errorData.error || 'Failed to add user'}`);
        if (errorData.details) {
          setMessage(prev => prev + '\n' + errorData.details.join('\n'));
        }
      }
    } catch (error) {
      setMessage("❌ Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-black/90 backdrop-blur-md rounded-3xl shadow-2xl border border-gray-700/50 w-full max-w-lg transform transition-all">
          {/* Header */}
        <div className="bg-gradient-to-r from-gray-900/80 to-gray-800/80 px-8 py-6 rounded-t-3xl border-b border-gray-700/50">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                🚀 Join the Competition
            </h2>
              <p className="text-gray-400 mt-1">Add your profile to the leaderboard</p>
            </div>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-red-400 text-3xl font-bold transition-colors duration-200 hover:scale-110"
            >
              ×
            </button>
          </div>
          </div>

        {/* Form */}
        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Info */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-200 mb-3">
                  👤 Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-4 bg-gray-900/50 border border-gray-600 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-lg"
                  placeholder="Enter your full name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-bold text-gray-200 mb-3">
                  📧 Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-4 bg-gray-900/50 border border-gray-600 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-lg"
                  placeholder="Enter your email address"
                />
              </div>
            </div>

            {/* Platform Handles */}
            <div className="space-y-4">
              <label className="block text-sm font-bold text-gray-200 mb-4">
                🏆 Platform Handles (Optional)
              </label>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-purple-400 mb-2">
                    💜 Codeforces Handle
                  </label>
                  <input
                    type="text"
                    name="codeforces"
                    value={formData.codeforces}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                    placeholder="e.g., tourist, Petr"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-yellow-400 mb-2">
                    🟡 LeetCode Username
                  </label>
                  <input
                    type="text"
                    name="leetcode"
                    value={formData.leetcode}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200"
                    placeholder="e.g., sujalmaurya25"
                  />
                </div>


              </div>
            </div>

            {/* Message Display */}
            {message && (
              <div className={`p-4 rounded-xl text-sm whitespace-pre-line font-medium ${
                message.includes('✅') ? 'bg-green-900/30 text-green-300 border border-green-600/50' : 
                message.includes('⚠️') ? 'bg-yellow-900/30 text-yellow-300 border border-yellow-600/50' :
                'bg-red-900/30 text-red-300 border border-red-600/50'
              }`}>
                {message}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-4 pt-6">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 px-6 py-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold text-lg rounded-xl transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-blue-500/25 disabled:opacity-50 disabled:transform-none"
              >
                {loading ? '🚀 Adding...' : '🚀 Join Competition'}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-4 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-xl transition-all duration-200"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddMultiUserForm;
