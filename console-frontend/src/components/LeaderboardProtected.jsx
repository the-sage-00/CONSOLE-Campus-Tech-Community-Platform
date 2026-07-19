import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthProvider'

const LeaderboardProtected = ({ children }) => {
  const { user, isLoading, isAuthenticated } = useAuth()

  // Show loading spinner while auth state is being determined
  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#FF3C5F] mx-auto mb-4"></div>
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    )
  }

  // Gate 1: Must be logged in
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />
  }

  // Gate 2 removed: Users can view the leaderboard without platform verification.
  // They simply won't appear on the leaderboard until they verify a platform.

  return children
}

export default LeaderboardProtected