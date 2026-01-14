import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthProvider'
import { apiFetch, API_ENDPOINTS } from '../utils/api'
import { logger } from '../utils/logger';

const LeaderboardProtected = ({ children }) => {
  const { user, isLoading, isAuthenticated, getToken } = useAuth()
  const [redirect, setRedirect] = useState(false)
  const [isCheckingProfile, setIsCheckingProfile] = useState(false)
  const [userProfile, setUserProfile] = useState(null)

  // Use userProfile if available, otherwise fall back to user
  const currentUser = userProfile || user

  // Only allow if Codeforces or LeetCode verification is true
  const hasCodeforcesVerified = currentUser?.platformVerification?.codeforces?.isVerified === true
  const hasLeetCodeVerified = currentUser?.platformVerification?.leetcode?.isVerified === true

  // Fetch user profile if platformVerification is missing or incomplete
  useEffect(() => {
    const fetchUserProfile = async () => {
      // Only fetch if user is authenticated and we need to check verification status
      if (isAuthenticated() && user && !isLoading) {
        const hasCodeforces = user?.platformVerification?.codeforces?.isVerified !== undefined
        const hasLeetCode = user?.platformVerification?.leetcode?.isVerified !== undefined
        
        // Fetch profile if verification status is missing (undefined) for both platforms
        if (!hasCodeforces && !hasLeetCode) {
          try {
            setIsCheckingProfile(true)
            const token = getToken()
            if (token) {
              const data = await apiFetch(API_ENDPOINTS.PROFILE, {
                headers: {
                  'Authorization': `Bearer ${token}`
                }
              })
              if (data && data.data) {
                setUserProfile(data.data)
                // Update localStorage with fresh user data
                localStorage.setItem('user', JSON.stringify(data.data))
              }
            }
          } catch (error) {
            logger.error('Error fetching user profile:', error)
          } finally {
            setIsCheckingProfile(false)
          }
        } else {
          // If user already has platformVerification data, use it
          setUserProfile(user)
        }
      }
    }

    if (!isLoading && isAuthenticated()) {
      fetchUserProfile()
    }
  }, [isLoading, user, isAuthenticated, getToken])

  // Set up redirect timer if verification is missing
  useEffect(() => {
    if (!hasCodeforcesVerified && !hasLeetCodeVerified && !isCheckingProfile && !isLoading) {
      const timer = setTimeout(() => setRedirect(true), 2000)
      return () => clearTimeout(timer)
    } else {
      setRedirect(false)
    }
  }, [hasCodeforcesVerified, hasLeetCodeVerified, isCheckingProfile, isLoading])

  // Early returns AFTER all hooks are called
  if (isLoading || isCheckingProfile) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#FF3C5F] mx-auto mb-4"></div>
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />
  }
  
  if (!hasCodeforcesVerified && !hasLeetCodeVerified) {
    if (redirect) {
      return <Navigate to="/profile" replace />
    }

    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Codeforces OR Leetcode Verification Required</h2>
          <p className="text-gray-400 mb-2">
            You must verify your Codeforces OR Leetcode account to access the leaderboard.
          </p>
          <a href="/profile" className="text-[#FF3C5F] underline font-semibold">Go to Profile</a>
        </div>
      </div>
    )
  }

  return children
}

export default LeaderboardProtected