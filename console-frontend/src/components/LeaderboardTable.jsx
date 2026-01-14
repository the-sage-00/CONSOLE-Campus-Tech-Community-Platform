import React, { useState, useEffect } from 'react';
import { Medal } from 'lucide-react';
import { API_ENDPOINTS } from '../utils/api';

const LeaderboardTable = ({ reloadTrigger, platform = "cf" }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_ENDPOINTS.BASE_URL}/${platform}`);
      if (!res.ok) throw new Error("Failed to fetch data");
      
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [reloadTrigger, platform]);

  const getColor = (rank) => {
    if (!rank) return "text-gray-400";
    const r = rank.toLowerCase();
    
    if (platform === "cf") {
      if (r.includes("legendary grandmaster")) return "text-pink-400";
      if (r.includes("grandmaster")) return "text-red-400";
      if (r.includes("international master")) return "text-blue-400";
      if (r.includes("master")) return "text-blue-300";
      if (r.includes("candidate master")) return "text-blue-400";
      if (r.includes("expert")) return "text-blue-300";
      if (r.includes("specialist")) return "text-cyan-400";
      if (r.includes("pupil")) return "text-green-400";
      if (r.includes("newbie")) return "text-gray-400";
    } else if (platform === "lc") {
      // LeetCode color scheme
      if (r.includes("rank")) {
        const rankNum = parseInt(r.match(/\d+/)?.[0] || "0");
        if (rankNum <= 100) return "text-red-400";
        if (rankNum <= 500) return "text-blue-400";
        if (rankNum <= 1000) return "text-blue-400";
        if (rankNum <= 5000) return "text-blue-400";
        if (rankNum <= 10000) return "text-green-400";
        return "text-gray-400";
      }
    }
    
    return "text-gray-300";
  };

  const getPlatformTitle = () => {
    if (platform === "cf") return "Codeforces Leaderboard";
    if (platform === "lc") return "LeetCode Leaderboard";
    return "Leaderboard";
  };

  const getPlatformColor = () => {
    if (platform === "cf") return "purple";
    if (platform === "lc") return "blue";
    return "gray";
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="text-center py-20">
        <div className="text-red-400 text-lg mb-4">Error: {error}</div>
        <button 
          onClick={fetchData}
          className="bg-blue-500 text-gray-900 px-4 py-2 rounded-lg hover:bg-blue-400 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto bg-gray-800 rounded-xl shadow-xl border border-gray-700 overflow-hidden">
      <div className="bg-gradient-to-r from-gray-700 to-gray-800 px-6 py-4 border-b border-gray-700">
        <h2 className={`text-2xl font-bold text-center text-${getPlatformColor()}-400`}>
          {getPlatformTitle()}
        </h2>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-700 text-white">
            <tr>
              <th className="px-6 py-4 font-semibold">#</th>
              <th className="px-6 py-4 font-semibold">Handle</th>
              <th className="px-6 py-4 font-semibold">
                {platform === "cf" ? "Rating" : 
                 platform === "lc" ? "Rank" : "Rating"}
              </th>
              <th className="px-6 py-4 font-semibold">
                {platform === "cf" ? "Rank" : 
                 platform === "lc" ? "Problems Solved" : "Rank"}
              </th>
              {platform === "lc" && (
                <>
                  <th className="px-6 py-4 font-semibold">Easy</th>
                  <th className="px-6 py-4 font-semibold">Medium</th>
                  <th className="px-6 py-4 font-semibold">Hard</th>
                </>
              )}

              <th className="px-6 py-4 font-semibold">Last Updated</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr 
                key={user._id || user.handle} 
                className={`border-b border-gray-700 hover:bg-gray-700 transition-colors ${
                  index < 3 ? 'bg-gradient-to-r from-gray-700 to-gray-800' : ''
                }`}
              >
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <span className="mr-3">
                      {index === 0 ? <Medal className="w-6 h-6 text-yellow-400" /> : 
                       index === 1 ? <Medal className="w-6 h-6 text-gray-300" /> : 
                       index === 2 ? <Medal className="w-6 h-6 text-orange-400" /> : 
                       <Medal className="w-6 h-6 text-gray-400" />}
                    </span>
                    <span className="font-bold text-white">{index + 1}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="font-semibold text-white">{user.handle}</div>
                  {user.name && <div className="text-sm text-gray-400">{user.name}</div>}
                </td>
                <td className="px-6 py-4">
                  <span className={`text-lg font-bold ${getColor(user.rank)}`}>
                    {platform === "cf" ? (user.rating || "Unrated") :
                     platform === "lc" ? (user.ranking ? `#${user.ranking}` : "Unranked") :
                     (user.rating || "Unrated")}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-gray-300">
                    {platform === "cf" ? (user.rank || "Unranked") :
                     platform === "lc" ? (user.totalSolved || "0") :
                     (user.rank || "Unranked")}
                  </span>
                </td>
                {platform === "lc" && (
                  <>
                    <td className="px-6 py-4 text-green-400">{user.easySolved || "0"}</td>
                    <td className="px-6 py-4 text-blue-400">{user.mediumSolved || "0"}</td>
                    <td className="px-6 py-4 text-red-400">{user.hardSolved || "0"}</td>
                  </>
                )}

                <td className="px-6 py-4 text-sm text-gray-400">
                  {user.lastUpdated ? new Date(user.lastUpdated).toLocaleDateString() : "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {users.length === 0 && (
        <div className="p-12 text-center text-gray-400">
          <p className="text-xl mb-2">No users found</p>
          <p className="text-sm">Add some users to see the leaderboard!</p>
        </div>
      )}
    </div>
  );
};

export default LeaderboardTable;
