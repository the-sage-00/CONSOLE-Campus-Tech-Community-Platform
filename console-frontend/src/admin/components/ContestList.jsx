import React, { useState, useEffect } from 'react';
import { adminAPI } from '../api';

const ContestList = () => {
  const [contests, setContests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchContests();
  }, []);

  const fetchContests = async () => {
    try {
      const response = await adminAPI.getContests();
      setContests(response.contests);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
        <p className="text-gray-400">Loading contests...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
        <p className="text-red-400">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg">
      <div className="px-4 sm:px-6 py-4 border-b border-gray-700">
        <h2 className="text-lg sm:text-xl font-bold text-white">Recent Contests</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-gray-700">
            <tr>
              <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Contest Name</th>
              <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Date</th>
              <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Participants</th>
            </tr>
          </thead>
          <tbody className="bg-gray-800 divide-y divide-gray-700">
            {contests.map((contest) => (
              <tr key={contest._id} className="hover:bg-gray-700">
                <td className="px-4 sm:px-6 py-4 text-sm font-medium text-white">{contest.name}</td>
                <td className="px-4 sm:px-6 py-4 text-sm text-gray-300">{formatDate(contest.date)}</td>
                <td className="px-4 sm:px-6 py-4 text-sm text-gray-300">{contest.participants.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ContestList;
