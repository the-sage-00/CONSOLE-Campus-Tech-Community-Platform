import React from 'react';
import { Zap, Target, BarChart3 } from 'lucide-react';

const UserProfileModal = ({ user, onClose }) => {
  const baseUser = user?.user ? user.user : user;
  const mergedPlatforms = {
    ...(baseUser?.platforms || {}),
    ...(user?.platforms || {}),
    ...(user?.user?.platforms || {})
  };
  const mergedPlatformVerification = {
    ...(baseUser?.platformVerification || {}),
    ...(user?.platformVerification || {}),
    ...(user?.user?.platformVerification || {})
  };

  const displayUser = {
    ...baseUser,
    ...user,
    name: user?.name || baseUser?.name,
    email: user?.email || baseUser?.email,
    platforms: mergedPlatforms,
    platformVerification: mergedPlatformVerification
  };

  const platforms = [
    {
      key: 'codeforces',
      name: 'Codeforces',
      color: 'text-[#FF3C5F]',
      bgColor: 'bg-[#FF3C5F]/20',
      borderColor: 'border-[#FF3C5F]',
      icon: <Zap className="w-4 h-4" />
    },
    {
      key: 'leetcode',
      name: 'LeetCode',
      color: 'text-[#FF7A30]',
      bgColor: 'bg-[#FF7A30]/20',
      borderColor: 'border-[#FF7A30]',
      icon: <Target className="w-4 h-4" />
    },

  ];

  const getPlatformData = (platformKey) => {
    const directData = displayUser.platforms?.[platformKey];
    const verificationData = displayUser.platformVerification?.[platformKey];
    const verificationPlatformData = verificationData?.platformData || verificationData;

    if (directData && verificationPlatformData) {
      return { ...verificationPlatformData, ...directData };
    }

    return directData || verificationPlatformData || null;
  };

  const getLeetCodeContestRating = () => {
    const platformData = getPlatformData('leetcode') || {};
    if (platformData.contestRating) return platformData.contestRating;
    if (platformData.rating) return platformData.rating;

    const contestStats = displayUser.platformVerification?.leetcode?.contestStats;
    if (!contestStats) return null;

    if (contestStats.currentRating) return contestStats.currentRating;
    if (contestStats.contestRating) return contestStats.contestRating;
    if (contestStats.rating) return contestStats.rating;

    const recentContests = contestStats.recentContests || [];
    const recentWithRating = recentContests.find(
      (contest) => contest.participated && (contest.rating || contest.newRating || contest.contestRating)
    ) || recentContests[0];

    if (!recentWithRating) return null;

    return recentWithRating.rating ?? recentWithRating.newRating ?? recentWithRating.contestRating ?? null;
  };

  const formatNumber = (value) => {
    if (value === null || value === undefined) return 'N/A';
    if (typeof value !== 'number') return value;
    if (Number.isNaN(value)) return 'N/A';
    return Math.round(value).toLocaleString();
  };

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center z-50 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-gradient-to-b from-gray-900 to-black border border-gray-700/50 rounded-2xl w-full max-w-2xl max-h-[90vh] shadow-2xl flex flex-col"
        style={{
          boxShadow: '0 0 40px rgba(255, 60, 95, 0.15), 0 0 20px rgba(255, 194, 45, 0.1)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header (fixed height, does NOT scroll) */}
        <header className="flex-shrink-0 px-4 sm:px-8 pt-6 sm:pt-8 pb-4 sm:pb-6 bg-gradient-to-r from-[#FF3C5F]/20 to-[#FFC22D]/20 border-b border-gray-700/30 rounded-t-2xl">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3 min-w-0">
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-r from-[#FF3C5F] to-[#FFC22D] flex items-center justify-center text-white text-xl sm:text-2xl font-bold flex-shrink-0">
                {(displayUser.name || 'U').charAt(0).toUpperCase()}
              </div>
              <div className="min-w-0">
                <h2 className="truncate text-lg sm:text-2xl font-bold text-white">{displayUser.name || 'Unknown User'}</h2>
                <p className="truncate text-xs sm:text-sm text-gray-400">{displayUser.email || 'No email'}</p>
              </div>
            </div>

            <button
              onClick={onClose}
              aria-label="Close"
              className="ml-4 text-gray-400 hover:text-white bg-black/30 hover:bg-black/50 rounded-full p-1.5 sm:p-2 transition-all duration-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </header>

        {/* Scrollable main content (THIS will grow and scroll) */}
        <main className="flex-1 min-h-0 overflow-y-auto px-4 sm:px-8 py-4 sm:py-6 space-y-5 text-xs sm:text-sm">
          {/* Platform Details */}
          <section className="space-y-5 sm:space-y-6">
            <h3 className="text-base sm:text-lg font-bold text-white border-b border-gray-700 pb-2 flex items-center">
              <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-[#FFC22D]" />
              Platform Details
            </h3>

            {/* Example platform card: ensure w-full + min-w-0 and content uses break-words/truncate */}
            {platforms.map((platform) => {
              const data = getPlatformData(platform.key) || {};
              const contestStats = displayUser.platformVerification?.leetcode?.contestStats;
              const contestRating = platform.key === 'leetcode' ? getLeetCodeContestRating() : null;
              const hasContestData = contestStats?.recentContests?.length > 0 || (contestRating != null && contestRating > 0);
              const hasData =
                platform.key === 'leetcode'
                  ? (Object.keys(data).length > 0 && (data.totalSolved || data.easySolved || data.mediumSolved || data.hardSolved)) || hasContestData
                  : Object.keys(data).length > 0;

              return (
                <div key={platform.key} className={`w-full min-w-0 ${platform.bgColor} rounded-xl p-4 border ${platform.borderColor} border-opacity-50 shadow-lg`}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3 min-w-0">
                      <span className="text-xl flex-shrink-0">{platform.icon}</span>
                      <h4 className={`text-base font-bold ${platform.color} truncate`}>{platform.name}</h4>
                    </div>
                    <div className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${hasData ? 'bg-green-900/50 text-green-300 border border-green-600' : 'bg-gray-700/50 text-gray-400 border border-gray-600'}`}>
                      {hasData ? 'Active' : 'Inactive'}
                    </div>
                  </div>

                  {hasData ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {/* Primary Metric */}
                      {platform.key === 'codeforces' && (
                        <div className="w-full min-w-0 bg-black/30 rounded-lg p-3">
                          <div className="text-white text-lg font-bold truncate">
                            {formatNumber(data.rating)}
                          </div>
                          <div className="text-gray-400 text-xs">Current Rating</div>
                        </div>
                      )}

                      {platform.key === 'leetcode' && (
                        <div className="w-full min-w-0 bg-black/30 rounded-lg p-3">
                          <div className="text-white text-lg font-bold truncate">
                            {contestRating != null && contestRating > 0 ? formatNumber(contestRating) : 'N/A'}
                          </div>
                          <div className="text-gray-400 text-xs">Contest Rating</div>
                        </div>
                      )}

                      {/* Codeforces: Rating & Max Rating */}
                      {platform.key === 'codeforces' && (
                        <div className="w-full min-w-0 bg-black/30 rounded-lg p-3">
                          <div className="text-white text-lg font-bold truncate">
                            {data.maxRating || 'N/A'}
                          </div>
                          <div className="text-gray-400 text-xs">Max Rating</div>
                        </div>
                      )}

                      {/* LeetCode: E/M/H Solved */}
                      {platform.key === 'leetcode' && (
                        <div className="bg-black/30 rounded-lg p-3">
                          <div className="text-white text-base font-semibold">
                            E:{data.easySolved || 0} M:{data.mediumSolved || 0} H:{data.hardSolved || 0}
                          </div>
                          <div className="text-gray-400 text-xs">Problems Solved</div>
                        </div>)}
                      {platform.key === 'leetcode' && (
                        <div className="w-full min-w-0 bg-black/30 rounded-lg p-3">
                          <div className="text-white text-lg font-bold truncate">
                            {data.totalSolved || 0}
                          </div>
                          <div className="text-gray-400 text-xs">Total Solved</div>
                        </div>
                      )}

                      {/* LeetCode Contest History */}
                      {platform.key === 'leetcode' && contestStats?.recentContests?.length > 0 && (
                        <div className="col-span-full bg-black/30 rounded-lg p-3">
                          <h5 className="text-white text-sm font-semibold mb-2">Recent Contests ({contestStats.totalContests || 0} Total)</h5>
                          <div className="overflow-x-auto">
                            <table className="min-w-full text-xs text-gray-300">
                              <thead>
                                <tr className="text-left text-gray-400">
                                  <th className="py-1 pr-2">Contest</th>
                                  <th className="py-1 px-2">Participated</th>
                                  <th className="py-1 px-2">Rating</th>
                                  <th className="py-1 pl-2">Rank</th>
                                </tr>
                              </thead>
                              <tbody>
                                {contestStats.recentContests.map((contest, idx) => (
                                  <tr key={idx} className="border-t border-gray-700/50">
                                    <td className="py-1 pr-2 truncate max-w-[100px]" title={contest.contestName}>{contest.contestName}</td>
                                    <td className="py-1 px-2">
                                      {contest.participated ? (
                                        <span className="text-green-400">✔</span>
                                      ) : (
                                        <span className="text-red-400">✖</span>
                                      )}
                                    </td>
                                    <td className="py-1 px-2">{contest.participated ? (contest.rating || 'N/A') : '-'}</td>
                                    <td className="py-1 pl-2">{contest.participated ? (contest.rank || 'N/A') : '-'}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}
                      {/* Handle */}
                      {data.handle && (
                        <div className="w-full min-w-0 bg-black/30 rounded-lg p-3">
                          <div className="text-white text-base font-semibold truncate">@{data.handle}</div>
                          <div className="text-gray-400 text-xs">Handle</div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <div className="text-gray-500 text-lg mb-2 flex items-center justify-center">
                        <BarChart3 className="w-5 h-5 mr-2" />
                        No data available
                      </div>
                      <div className="text-gray-600 text-sm">Profile not found or not connected</div>
                    </div>
                  )}
                </div>
              );
            })}
          </section>
        </main>

      </div>
    </div>

  );
};

export default UserProfileModal;