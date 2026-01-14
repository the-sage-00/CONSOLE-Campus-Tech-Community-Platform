import React, { useState, useMemo } from 'react';
import { BarChart3, Users, CheckCircle, TrendingUp, Flame, Trophy, Medal, Activity, Target } from 'lucide-react';

const LeaderboardAnalytics = ({ users, stats }) => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('all');
  const [selectedMetric, setSelectedMetric] = useState('totalScore');

  // Calculate analytics data
  const calculateAnalytics = () => {
    if (!users || users.length === 0) return null;

    const totalUsers = users.length;
    const activeUsers = users.filter(user => user.status === 'active').length;
    
    // Score distribution
    const scoreRanges = {
      'Elite (5000+)': users.filter(u => (u.totalScore || 0) >= 5000).length,
      'Expert (3000-4999)': users.filter(u => (u.totalScore || 0) >= 3000 && (u.totalScore || 0) < 5000).length,
      'Advanced (1000-2999)': users.filter(u => (u.totalScore || 0) >= 1000 && (u.totalScore || 0) < 3000).length,
      'Intermediate (500-999)': users.filter(u => (u.totalScore || 0) >= 500 && (u.totalScore || 0) < 1000).length,
      'Beginner (0-499)': users.filter(u => (u.totalScore || 0) < 500).length,
    };

    // Platform usage
    const platformUsage = {
      codeforces: users.filter(u => u.platforms?.codeforces?.handle).length,
      leetcode: users.filter(u => u.platforms?.leetcode?.handle).length,
    };

    // Average scores by platform
    const avgScores = {
      codeforces: users
        .filter(u => u.platforms?.codeforces?.rating)
        .reduce((sum, u) => sum + (u.platforms.codeforces.rating || 0), 0) / 
        users.filter(u => u.platforms?.codeforces?.rating).length || 0,
      leetcode: users
        .filter(u => u.platforms?.leetcode?.ranking)
        .reduce((sum, u) => sum + (u.platforms.leetcode.ranking || 0), 0) / 
        users.filter(u => u.platforms?.leetcode?.ranking).length || 0,
    };

    // Top performers
    const topPerformers = users
      .sort((a, b) => (b.totalScore || 0) - (a.totalScore || 0))
      .slice(0, 10);

    // Recent activity (last 7 days)
    const recentActivity = users.filter(user => {
      const lastUpdate = new Date(user.lastUpdated);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return lastUpdate > weekAgo;
    }).length;

    return {
      totalUsers,
      activeUsers,
      scoreRanges,
      platformUsage,
      avgScores,
      topPerformers,
      recentActivity,
      averageTotalScore: users.reduce((sum, u) => sum + (u.totalScore || 0), 0) / totalUsers
    };
  };

  const analytics = calculateAnalytics();

  if (!analytics) {
    return (
      <div className="text-center py-12 text-gray-400">
        <p className="text-lg">No data available for analytics</p>
      </div>
    );
  }

  const getScoreColor = (score) => {
    if (score >= 5000) return 'text-yellow-400';
    if (score >= 3000) return 'text-blue-400';
    if (score >= 1000) return 'text-green-400';
    if (score >= 500) return 'text-purple-400';
    return 'text-gray-400';
  };

  const getProgressColor = (percentage) => {
    if (percentage >= 80) return 'bg-green-500';
    if (percentage >= 60) return 'bg-blue-500';
    if (percentage >= 40) return 'bg-yellow-500';
    if (percentage >= 20) return 'bg-orange-500';
    return 'bg-red-500';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2 flex items-center">
            <BarChart3 className="w-8 h-8 mr-3" />
            Analytics Dashboard
          </h2>
          <p className="text-gray-400">Comprehensive insights into the competitive programming community</p>
        </div>
        
        <div className="flex gap-3">
          <select
            value={selectedTimeframe}
            onChange={(e) => setSelectedTimeframe(e.target.value)}
            className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Time</option>
            <option value="week">Last Week</option>
            <option value="month">Last Month</option>
            <option value="quarter">Last Quarter</option>
          </select>
          
          <select
            value={selectedMetric}
            onChange={(e) => setSelectedMetric(e.target.value)}
            className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="totalScore">Total Score</option>
            <option value="platformUsage">Platform Usage</option>
            <option value="activity">Activity</option>
          </select>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 border border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-200 text-sm font-medium">Total Users</p>
              <p className="text-3xl font-bold text-white">{analytics.totalUsers}</p>
            </div>
            <div className="text-4xl">
              <Users className="w-10 h-10" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-xl p-6 border border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-200 text-sm font-medium">Active Users</p>
              <p className="text-3xl font-bold text-white">{analytics.activeUsers}</p>
            </div>
            <div className="text-4xl">
              <CheckCircle className="w-10 h-10" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl p-6 border border-purple-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-200 text-sm font-medium">Avg Total Score</p>
              <p className="text-3xl font-bold text-white">{Math.round(analytics.averageTotalScore)}</p>
            </div>
            <div className="text-4xl">
              <TrendingUp className="w-10 h-10" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-orange-600 to-orange-700 rounded-xl p-6 border border-orange-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-200 text-sm font-medium">Recent Activity</p>
              <p className="text-3xl font-bold text-white">{analytics.recentActivity}</p>
            </div>
            <div className="text-4xl">
              <Flame className="w-10 h-10" />
            </div>
          </div>
        </div>
      </div>

      {/* Score Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center">
            <Trophy className="w-6 h-6 mr-2" />
            Score Distribution
          </h3>
          <div className="space-y-4">
            {Object.entries(analytics.scoreRanges).map(([range, count]) => {
              const percentage = (count / analytics.totalUsers) * 100;
              return (
                <div key={range} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300 text-sm">{range}</span>
                    <span className="text-white font-medium">{count} users</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-500 ${getProgressColor(percentage)}`}
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Platform Usage */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-xl font-bold text-white mb-4">🌐 Platform Usage</h3>
          <div className="space-y-4">
            {Object.entries(analytics.platformUsage).map(([platform, count]) => {
              const percentage = (count / analytics.totalUsers) * 100;
              const colors = {
                codeforces: 'from-purple-500 to-purple-600',
                leetcode: 'from-blue-500 to-blue-600'
              };
              const icons = {
                codeforces: '🟣',
                leetcode: '🔵'
              };
              
              return (
                <div key={platform} className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{icons[platform]}</span>
                    <span className="text-white font-medium capitalize">{platform}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-white font-bold">{count}</div>
                    <div className="text-gray-400 text-sm">{percentage.toFixed(1)}%</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Top Performers */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center">
          <Medal className="w-6 h-6 mr-2" />
          Top 10 Performers
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {analytics.topPerformers.map((user, index) => (
            <div key={user.email} className="bg-gray-700 rounded-lg p-4 border border-gray-600 hover:border-blue-500 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">
                    {index === 0 ? <Medal className="w-6 h-6 text-yellow-400" /> : 
                     index === 1 ? <Medal className="w-6 h-6 text-gray-300" /> : 
                     index === 2 ? <Medal className="w-6 h-6 text-orange-400" /> : 
                     <Trophy className="w-6 h-6 text-orange-500" />}
                  </span>
                  <span className="text-white font-bold">#{index + 1}</span>
                </div>
                <span className={`text-lg font-bold ${getScoreColor(user.totalScore)}`}>
                  {user.totalScore?.toLocaleString() || '0'}
                </span>
              </div>
              <div className="space-y-1">
                <div className="text-white font-medium">{user.name}</div>
                <div className="text-gray-400 text-sm">{user.email}</div>
                <div className="text-blue-400 text-sm capitalize">
                  Best: {user.bestPlatform || 'None'}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Platform Averages */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center">
          <BarChart3 className="w-6 h-6 mr-2" />
          Platform Averages
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-lg p-4 text-center">
            <div className="text-3xl mb-2">🟣</div>
            <div className="text-white font-bold text-2xl">
              {Math.round(analytics.avgScores.codeforces)}
            </div>
            <div className="text-purple-200 text-sm">Avg Codeforces Rating</div>
          </div>
          
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-4 text-center">
            <div className="text-3xl mb-2">🔵</div>
            <div className="text-white font-bold text-2xl">
              {Math.round(analytics.avgScores.leetcode).toLocaleString()}
            </div>
            <div className="text-blue-200 text-sm">Avg LeetCode Ranking</div>
          </div>
          

        </div>
      </div>

      {/* Insights */}
      <div className="bg-gradient-to-r from-gray-700 to-gray-800 rounded-xl p-6 border border-gray-600">
        <h3 className="text-xl font-bold text-white mb-4">💡 Key Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <TrendingUp className="w-6 h-6" />
              <div>
                <div className="text-white font-medium">Growth Trend</div>
                <div className="text-gray-400 text-sm">
                  {analytics.recentActivity > analytics.totalUsers * 0.3 
                    ? 'High activity in the last week' 
                    : 'Steady growth pattern'}
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Target className="w-6 h-6" />
              <div>
                <div className="text-white font-medium">Most Popular Platform</div>
                <div className="text-gray-400 text-sm">
                  {Object.entries(analytics.platformUsage).reduce((a, b) => a[1] > b[1] ? a : b)[0].charAt(0).toUpperCase() + 
                   Object.entries(analytics.platformUsage).reduce((a, b) => a[1] > b[1] ? a : b)[0].slice(1)}
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <Trophy className="w-6 h-6" />
              <div>
                <div className="text-white font-medium">Elite Performers</div>
                <div className="text-gray-400 text-sm">
                  {analytics.scoreRanges['Elite (5000+)']} users with 5000+ score
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <span className="text-2xl">⚡</span>
              <div>
                <div className="text-white font-medium">Engagement Rate</div>
                <div className="text-gray-400 text-sm">
                  {((analytics.activeUsers / analytics.totalUsers) * 100).toFixed(1)}% active users
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardAnalytics;