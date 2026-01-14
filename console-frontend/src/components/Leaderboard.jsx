import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trophy, Medal, Star, Users, Target, AlertTriangle } from 'lucide-react';
import SplitText from './ui/text/SplitText';
import SidebarNavbar from './SidebarNavbar.jsx';
import { logger } from '../utils/logger';

const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('codeforces');
  const navigate = useNavigate();

  useEffect(() => {
    fetchLeaderboardData();
  }, []);

  const fetchLeaderboardData = async () => {
    try {
      setLoading(true);
      const response = await fetch('http:///api/leaderboard');
      if (!response.ok) {
        throw new Error('Failed to fetch leaderboard data');
      }
      const data = await response.json();
      setLeaderboardData(data);
    } catch (err) {
      setError(err.message);
      logger.error('Error fetching leaderboard:', err);
    } finally {
      setLoading(false);
    }
  };

  const getRankColor = (rank) => {
    if (rank === 1) return 'text-yellow-400';
    if (rank === 2) return 'text-gray-300';
    if (rank === 3) return 'text-orange-400';
    return 'text-gray-400';
  };

  const getRankBadge = (rank) => {
    if (rank === 1) return <Medal className="w-6 h-6 text-yellow-400" />;
    if (rank === 2) return <Medal className="w-6 h-6 text-gray-300" />;
    if (rank === 3) return <Medal className="w-6 h-6 text-orange-400" />;
    return `#${rank}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white">
        <SidebarNavbar />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-orange-400 mx-auto mb-4"></div>
            <p className="text-gray-400">Loading leaderboard...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black text-white">
        <SidebarNavbar />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="text-red-400 text-6xl mb-4">
              <AlertTriangle className="w-16 h-16 mx-auto" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Error Loading Leaderboard</h2>
            <p className="text-gray-400 mb-4">{error}</p>
            <button
              onClick={fetchLeaderboardData}
              className="bg-gradient-to-r from-orange-400 to-yellow-500 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-orange-500/25 transition-all duration-300"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <SidebarNavbar />
      
      {/* Header */}
      <div className="pt-20 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              <SplitText
                as="span"
                text="Competitive Programming"
                splitType="chars"
                delay={60}
                duration={0.55}
                ease="power3.out"
                from={{ opacity: 0, y: 28 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.12}
                rootMargin="-80px"
                textAlign="center"
                gradient="bg-gradient-to-r from-orange-400 to-yellow-500 bg-clip-text text-transparent"
              />
              <br />
              <SplitText
                as="span"
                text="Leaderboard"
                splitType="chars"
                delay={60}
                duration={0.55}
                ease="power3.out"
                from={{ opacity: 0, y: 28 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.12}
                rootMargin="-80px"
                textAlign="center"
                className="text-white"
              />
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Track your progress across multiple platforms and compete with the best programmers
            </p>
          </div>
        </div>
      </div>

      {/* Platform Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="flex justify-center space-x-4">
          <button
            onClick={() => setActiveTab('codeforces')}
            className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center space-x-2 ${
              activeTab === 'codeforces'
                ? 'bg-gradient-to-r from-orange-400 to-yellow-500 text-white shadow-lg'
                : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 hover:text-white border border-gray-600/50'
            }`}
          >
            <Trophy className="w-5 h-5" />
            <span>Codeforces</span>
          </button>
          <button
            onClick={() => setActiveTab('leetcode')}
            className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center space-x-2 ${
              activeTab === 'leetcode'
                ? 'bg-gradient-to-r from-orange-400 to-yellow-500 text-white shadow-lg'
                : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 hover:text-white border border-gray-600/50'
            }`}
          >
            <Target className="w-5 h-5" />
            <span>LeetCode</span>
          </button>
        </div>
      </div>

      {/* Leaderboard Table */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-black/60 backdrop-blur-sm rounded-2xl border border-gray-800/50 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-900/50 border-b border-gray-800/50">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Rank</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">User</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Rating</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Problems Solved</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Contribution</th>
                </tr>
              </thead>
              <tbody>
                {leaderboardData
                  .filter(user => user.platform === activeTab)
                  .slice(0, 50)
                  .map((user, index) => (
                    <tr
                      key={user._id}
                      className="border-b border-gray-800/30 hover:bg-gray-800/20 transition-colors duration-200"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <span className={`text-lg font-bold ${getRankColor(index + 1)}`}>
                            {getRankBadge(index + 1)}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-orange-400 to-yellow-500 rounded-full flex items-center justify-center">
                            <span className="text-white font-bold text-sm">
                              {user.username.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div>
                            <div className="font-semibold text-white">{user.username}</div>
                            <div className="text-sm text-gray-400">{user.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-orange-400 font-semibold">{user.rating}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-yellow-400 font-semibold">{user.problemsSolved}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-gray-300">{user.contribution}</span>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 mb-8">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-black/60 backdrop-blur-sm rounded-xl p-6 border border-gray-800/50 text-center">
            <div className="text-3xl mb-2 flex justify-center">
              <Users className="w-8 h-8 text-orange-400" />
            </div>
            <div className="text-2xl font-bold text-orange-400 mb-1">1,247</div>
            <div className="text-gray-400">Active Users</div>
          </div>
          <div className="bg-black/60 backdrop-blur-sm rounded-xl p-6 border border-gray-800/50 text-center">
            <div className="text-3xl mb-2 flex justify-center">
              <Trophy className="w-8 h-8 text-yellow-400" />
            </div>
            <div className="text-2xl font-bold text-yellow-400 mb-1">892</div>
            <div className="text-gray-400">Problems Solved</div>
          </div>
          <div className="bg-black/60 backdrop-blur-sm rounded-xl p-6 border border-gray-800/50 text-center">
            <div className="text-3xl mb-2 flex justify-center">
              <Star className="w-8 h-8 text-orange-400" />
            </div>
            <div className="text-2xl font-bold text-orange-400 mb-1">634</div>
            <div className="text-gray-400">Average Rating</div>
          </div>
        </div>
      </div>

      {/* CTA kept as registration only; removed any add-user flows */}
    </div>
  );
};

export default Leaderboard; 