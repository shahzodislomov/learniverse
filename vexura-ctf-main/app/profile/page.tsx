'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { User, Trophy, CheckCircle2, Calendar } from 'lucide-react'
import type { IChallenge } from '@/models/Challenge'

interface UserProfile {
  username: string
  email: string
  totalPoints: number
  solvedChallenges: IChallenge[]
  solvedCount: number
  createdAt: string
}

export default function ProfilePage() {
  const router = useRouter()
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const fetchProfile = useCallback(async () => {
    try {
      const res = await fetch('/api/user/profile')
      if (res.ok) {
        const data = await res.json()
        setProfile(data.user)
      } else if (res.status === 401) {
        router.push('/login')
      }
    } catch (error) {
      console.error('Error fetching profile:', error)
    } finally {
      setIsLoading(false)
    }
  }, [router])

  useEffect(() => {
    fetchProfile()
  }, [fetchProfile])

  const getTotalChallenges = () => {
    // This would ideally come from an API endpoint
    // For now, we'll estimate based on solved challenges
    return Math.max(profile?.solvedCount || 0, 10)
  }

  const progressPercentage =
    profile && getTotalChallenges() > 0
      ? (profile.solvedCount / getTotalChallenges()) * 100
      : 0

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-hacker-green">Loading...</div>
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-400 mb-4">Failed to load profile</p>
          <button
            onClick={() => router.push('/login')}
            className="px-6 py-3 bg-hacker-green/20 text-hacker-green border border-hacker-green rounded hover:bg-hacker-green/30 transition-all"
          >
            Login
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-20 h-20 rounded-full bg-hacker-green/20 border border-hacker-green flex items-center justify-center">
              <User className="w-10 h-10 text-hacker-green" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-hacker-green mb-2 text-glow-green font-mono">{profile.username}</h1>
              <p className="text-gray-400">{profile.email}</p>
            </div>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass rounded-lg p-6 border border-hacker-green/20"
          >
            <div className="flex items-center space-x-3 mb-2">
              <Trophy className="w-8 h-8 text-hacker-green" />
              <div>
                <p className="text-gray-400 text-sm">Total Points</p>
                <p className="text-3xl font-bold text-hacker-green">{profile.totalPoints}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass rounded-lg p-6 border border-hacker-green/20"
          >
            <div className="flex items-center space-x-3 mb-2">
              <CheckCircle2 className="w-8 h-8 text-hacker-cyan" />
              <div>
                <p className="text-gray-400 text-sm">Solved Challenges</p>
                <p className="text-3xl font-bold text-hacker-cyan">{profile.solvedCount}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass rounded-lg p-6 border border-hacker-green/20"
          >
            <div className="flex items-center space-x-3 mb-2">
              <Calendar className="w-8 h-8 text-hacker-green" />
              <div>
                <p className="text-gray-400 text-sm">Member Since</p>
                <p className="text-lg font-bold text-hacker-green">
                  {new Date(profile.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass rounded-lg p-6 border border-hacker-green/20 mb-8"
        >
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-bold text-hacker-cyan">Progress</h2>
            <span className="text-hacker-green font-semibold">
              {profile.solvedCount} / {getTotalChallenges()}
            </span>
          </div>
            <div className="w-full bg-hacker-dark rounded-full h-4 overflow-hidden border border-hacker-green/20 relative">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ duration: 1, delay: 0.5 }}
                className="h-full bg-gradient-to-r from-hacker-green via-hacker-cyan to-hacker-green shadow-glow-green-sm relative overflow-hidden"
              >
                <motion.div
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                />
              </motion.div>
            </div>
        </motion.div>

        {/* Solved Challenges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="glass rounded-lg p-6 border border-hacker-green/20"
        >
          <h2 className="text-2xl font-bold text-hacker-green mb-6">Solved Challenges</h2>
          {profile.solvedChallenges.length === 0 ? (
            <div className="text-center py-12">
              <CheckCircle2 className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400 text-lg">No challenges solved yet.</p>
              <p className="text-gray-500 mt-2">Start solving challenges to see them here!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {profile.solvedChallenges.map((challenge, index) => {
                const difficultyColors: Record<string, string> = {
                  easy: 'text-green-400',
                  medium: 'text-yellow-400',
                  hard: 'text-red-400',
                }
                return (
                  <motion.div
                    key={challenge._id.toString()}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="glass rounded p-4 border border-hacker-green/20 hover:border-hacker-green/50 transition-all"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-bold text-hacker-green">{challenge.title}</h3>
                      <CheckCircle2 className="w-5 h-5 text-hacker-green flex-shrink-0" />
                    </div>
                    <div className="flex items-center space-x-3 text-sm">
                      <span className={difficultyColors[challenge.difficulty]}>
                        {challenge.difficulty}
                      </span>
                      <span className="text-hacker-cyan">{challenge.category}</span>
                      <span className="text-hacker-green font-semibold">{challenge.points} pts</span>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}

