import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { adminAPI } from "../api.js";

const ParticipationStats = () => {
  const navigate = useNavigate();
  const [statsData, setStatsData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all"); // 'all', 'participated', 'not-participated'

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (isAuthChecked) {
      fetchStats();
    }
  }, [isAuthChecked]);

  const checkAuth = () => {
    const adminToken = localStorage.getItem("adminToken");
    if (!adminToken) {
      navigate("/admin/login");
      return;
    }
    setIsAuthChecked(true);
  };

  const fetchStats = async () => {
    try {
      const response = await adminAPI.getParticipationStats();
      setStatsData(response.data);
    } catch (error) {
      if (error.isTokenExpired) {
        // Clear token and redirect to login
        localStorage.removeItem("adminToken");
        localStorage.removeItem("adminEmail");
        navigate("/admin/login");
        return;
      }
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminEmail");
    navigate("/admin/login");
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Render contest cell with consistent format
  const renderContestCell = (contest) => {
    return (
      <td className="px-4 py-4">
        <div className="text-xs">
          <p className="text-white font-medium">
            {contest?.contestName || "N/A"}
          </p>
          <p className="text-gray-400">
            {formatDate(contest?.date)}
          </p>
          {contest?.participated ? (
            <span className="inline-flex px-1 py-0.5 text-xs rounded bg-green-900 text-green-300">
              ✓
            </span>
          ) : (
            <span className="inline-flex px-1 py-0.5 text-xs rounded bg-red-900 text-red-300">
              ✗
            </span>
          )}
        </div>
      </td>
    );
  };

  // Filter users based on selection
  const getFilteredUsers = () => {
    if (!statsData) return [];

    if (filter === "participated") {
      // Filter users who participated in at least one of the last 3 contests
      return statsData.users.filter((user) => 
        user.contestHistory?.some(contest => contest.participated === true)
      );
    } else if (filter === "not-participated") {
      // Filter users who didn't participate in any of the last 3 contests
      return statsData.users.filter((user) => 
        !user.contestHistory?.some(contest => contest.participated === true)
      );
    }
    return statsData.users;
  };

  // CSV Export functionality
  const exportToCSV = () => {
    if (!statsData) return;

    const filteredUsers = getFilteredUsers();

    // Create CSV headers
    const headers = [
      "Name",
      "Email",
      "Branch",
      "Total Contests Participated",
      "Contest 1 Status",
      "Contest 2 Status",
      "Contest 3 Status",
    ];

    // Create CSV rows
    const rows = filteredUsers.map((user) => [
      user.name,
      user.email,
      user.branch || "N/A",
      user.totalContestsParticipated,
      user.contestHistory[0]?.participated ? "Yes" : "No",
      user.contestHistory[1]?.participated ? "Yes" : "No",
      user.contestHistory[2]?.participated ? "Yes" : "No",
    ]);

    // Convert to CSV format
    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.map((cell) => `"${cell}"`).join(",")),
    ].join("\n");

    // Create and download file
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `contest-participation-${new Date().toISOString().split("T")[0]}.csv`
    );
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isAuthChecked || isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-2 border-blue-500 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-400">Loading participation statistics...</p>
        </div>
      </div>
    );
  }

  if (error) {
    const handleRetry = () => {
      // Check if error is token expiration
      if (error.includes("Token expired") || error.includes("login again")) {
        localStorage.removeItem("adminToken");
        localStorage.removeItem("adminEmail");
        navigate("/admin/login");
      } else {
        window.location.reload();
      }
    };

    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4">
        <div className="text-center">
          <p className="text-red-400 mb-4">{error}</p>
          <button
            onClick={handleRetry}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const filteredUsers = getFilteredUsers();

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-4 gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white">
                Contest Participation Statistics
              </h1>
              <p className="text-gray-400 text-sm mt-1">
                {localStorage.getItem("adminEmail")}
              </p>
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              <button
                onClick={() => navigate("/admin/dashboard")}
                className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors text-sm"
              >
                Dashboard
              </button>
              <button
                onClick={() => navigate("/admin/users")}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
              >
                Manage Users
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Summary Stats */}
        {statsData && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 sm:p-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-gray-400">Total Users</p>
                <svg
                  className="w-6 h-6 text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                  />
                </svg>
              </div>
              <p className="text-2xl sm:text-3xl font-bold text-white">
                {statsData.summary.totalUsers || 0}
              </p>
            </div>

            <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 sm:p-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-gray-400">Participants</p>
                <svg
                  className="w-6 h-6 text-green-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <p className="text-2xl sm:text-3xl font-bold text-white">
                {statsData.summary.participants || 0}
              </p>
            </div>

            <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 sm:p-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-gray-400">Non-Participants</p>
                <svg
                  className="w-6 h-6 text-red-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <p className="text-2xl sm:text-3xl font-bold text-white">
                {statsData.summary.nonParticipants || 0}
              </p>
            </div>

            <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 sm:p-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-gray-400">Latest Contest</p>
                <svg
                  className="w-6 h-6 text-yellow-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <p className="text-sm font-medium text-white">
                {statsData.summary.latestContestName || "N/A"}
              </p>
            </div>
          </div>
        )}

        {/* Filters and Export */}
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
            <div className="flex gap-3">
              <button
                onClick={() => setFilter("all")}
                className={`px-4 py-2 rounded-lg transition-colors text-sm ${
                  filter === "all"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                }`}
              >
                All Users
              </button>
              <button
                onClick={() => setFilter("participated")}
                className={`px-4 py-2 rounded-lg transition-colors text-sm ${
                  filter === "participated"
                    ? "bg-green-600 text-white"
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                }`}
              >
                Participated
              </button>
              <button
                onClick={() => setFilter("not-participated")}
                className={`px-4 py-2 rounded-lg transition-colors text-sm ${
                  filter === "not-participated"
                    ? "bg-red-600 text-white"
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                }`}
              >
                Not Participated
              </button>
            </div>
            <button
              onClick={exportToCSV}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium flex items-center gap-2"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
              Export to CSV
            </button>
          </div>
          <p className="text-sm text-gray-400 mt-4">
            Showing {filteredUsers.length} of {statsData?.users.length || 0}{" "}
            users
          </p>
        </div>

        {/* Users Table */}
        <div className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-700">
              <thead className="bg-gray-700">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Branch
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Total Contests
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Contest 1
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Contest 2
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Contest 3
                  </th>
                </tr>
              </thead>
              <tbody className="bg-gray-800 divide-y divide-gray-700">
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td
                      colSpan="6"
                      className="px-4 py-8 text-center text-gray-400"
                    >
                      No users found
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((user, index) => (
                    <tr key={index} className="hover:bg-gray-700">
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div>
                          <p className="text-sm font-medium text-white">
                            {user.name}
                          </p>
                          <p className="text-xs text-gray-400">
                            @{user.leetcodeHandle}
                          </p>
                          <p className="text-xs text-gray-500">{user.email}</p>
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <p className="text-sm text-gray-300">
                          {user.branch || "N/A"}
                        </p>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <p className="text-sm text-blue-400 font-medium">
                          {user.totalContestsParticipated}
                        </p>
                      </td>
                      {/* Contest 1 */}
                      {renderContestCell(user.contestHistory[0])}
                      {/* Contest 2 */}
                      {renderContestCell(user.contestHistory[1])}
                      {/* Contest 3 */}
                      {renderContestCell(user.contestHistory[2])}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ParticipationStats;
