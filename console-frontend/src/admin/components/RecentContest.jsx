import React, { useEffect, useState } from 'react';
import { adminAPI } from '../api';

const RecentContest = () => {
  const [recent, setRecent] = useState(null);
  const [nonParticipants, setNonParticipants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        const [recentRes, nonPartRes] = await Promise.all([
          adminAPI.getRecentContest().catch(() => null),
          adminAPI.getNonParticipants().catch(() => null)
        ]);
        if (recentRes) setRecent(recentRes);
        if (nonPartRes) setNonParticipants(nonPartRes.nonParticipants || []);
      } catch (e) {
        setError(e.message || 'Failed to load recent contest');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
      <p className="text-gray-400">Loading recent contest...</p>
    </div>
  );

  if (error) return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
      <p className="text-red-400">{error}</p>
    </div>
  );

  if (!recent) return null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
      <div className="bg-gray-800 border border-gray-700 rounded-lg">
        <div className="px-4 sm:px-6 py-4 border-b border-gray-700">
          <h2 className="text-lg sm:text-xl font-bold text-white">Most Recent Contest</h2>
          <p className="text-sm text-gray-400 mt-1">{recent.contestName}</p>
        </div>
        <div className="max-h-80 overflow-y-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-gray-700">
              <tr>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Name</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Branch</th>
              </tr>
            </thead>
            <tbody className="bg-gray-800 divide-y divide-gray-700">
              {(recent.participants || []).map((p, idx) => (
                <tr key={`${p.name}-${idx}`} className="hover:bg-gray-700">
                  <td className="px-4 sm:px-6 py-3 text-sm text-white">{p.name}</td>
                  <td className="px-4 sm:px-6 py-3 text-sm text-gray-300">{p.branch || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-gray-800 border border-gray-700 rounded-lg">
        <div className="px-4 sm:px-6 py-4 border-b border-gray-700">
          <h2 className="text-lg sm:text-xl font-bold text-white">Did Not Participate</h2>
          <p className="text-sm text-gray-400 mt-1">Latest contest: {recent.contestName}</p>
        </div>
        <div className="max-h-80 overflow-y-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-gray-700">
              <tr>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Name</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Email</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">LC Handle</th>
              </tr>
            </thead>
            <tbody className="bg-gray-800 divide-y divide-gray-700">
              {nonParticipants.map((u, idx) => (
                <tr key={`${u.email}-${idx}`} className="hover:bg-gray-700">
                  <td className="px-4 sm:px-6 py-3 text-sm text-white">{u.name}</td>
                  <td className="px-4 sm:px-6 py-3 text-sm text-gray-300">{u.email}</td>
                  <td className="px-4 sm:px-6 py-3 text-sm text-gray-300">{u.leetcodeHandle || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RecentContest;


