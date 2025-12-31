'use client'

import { useState, useEffect, useCallback } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  User,
  Trophy,
  Award,
  CheckCircle2,
  TrendingUp,
  Shield,
  Droplet,
  Crown,
} from 'lucide-react'
import Link from 'next/link'

interface UserProfile {
  id: string
  username: string
  role: string
  totalPoints: number
  solvedCount: number
  rank: number
  createdAt: string
  isTop10: boolean
  firstBloodCount: number
}

interface SolvedChallenge {
  id: string
  title: string
  category: string
  difficulty: string
  points: number
  solveOrder: number
  firstBlood: boolean
  solvedAt: string
}

export default function PublicUserProfile() {
  const params = useParams()
  const router = useRouter()
  const username = params.username as string

  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [solvedChallenges, setSolvedChallenges] = useState<SolvedChallenge[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchProfile = useCallback(async () => {
    try {
      setIsLoading(true)
      const res = await fetch(`/api/users/${username}`)
      if (res.ok) {
        const data = await res.json()
        setProfile(data.user)
        setSolvedChallenges(data.solvedChallenges || [])
      } else if (res.status === 404) {
        router.push('/')
      }
    } catch (error) {
      console.error('Error fetching profile:', error)
    } finally {
      setIsLoading(false)
    }
  }, [username, router])

  useEffect(() => {
    fetchProfile()
  }, [fetchProfile])

  const difficultyColors: Record<string, string> = {
    easy: 'text-green-400',
    medium: 'text-yellow-400',
    hard: 'text-red-400',
  }

  const categoryColors: Record<string, string> = {
    web: 'bg-blue-500/20 text-blue-400',
    crypto: 'bg-purple-500/20 text-purple-400',
    forensics: 'bg-orange-500/20 text-orange-400',
    pwn: 'bg-red-500/20 text-red-400',
    osint: 'bg-cyan-500/20 text-cyan-400',
    rev: 'bg-pink-500/20 text-pink-400',
    misc: 'bg-gray-500/20 text-gray-400',
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-hacker-green">Loading profile...</div>
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-400 mb-4">User not found</p>
          <Link href="/" className="text-hacker-green hover:text-hacker-cyan">
            Go Home
          </Link>
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
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <h1 className="text-4xl font-bold text-hacker-green text-glow-green font-mono">
                  {profile.username}
                </h1>
                {profile.role === 'admin' && (
                  <span className="px-3 py-1 rounded bg-hacker-green/20 text-hacker-green border border-hacker-green flex items-center space-x-1 text-sm">
                    <Shield className="w-4 h-4" />
                    <span>Admin</span>
                  </span>
                )}
                {profile.isTop10 && (
                  <motion.span
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="px-3 py-1 rounded bg-yellow-500/20 text-yellow-400 border border-yellow-400 flex items-center space-x-1 text-sm"
                  >
                    <Crown className="w-4 h-4" />
                    <span>Top 10</span>
                  </motion.span>
                )}
              </div>
              <p className="text-gray-400">Member since {new Date(profile.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass rounded-lg p-6 border border-hacker-green/20"
          >
            <div className="flex items-center space-x-3 mb-2">
              <Trophy className="w-8 h-8 text-hacker-green" />
              <div>
                <p className="text-gray-400 text-sm">Global Rank</p>
                <p className="text-3xl font-bold text-hacker-green">#{profile.rank}</p>
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
              <TrendingUp className="w-8 h-8 text-hacker-cyan" />
              <div>
                <p className="text-gray-400 text-sm">Total Points</p>
                <p className="text-3xl font-bold text-hacker-cyan">{profile.totalPoints}</p>
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
              <CheckCircle2 className="w-8 h-8 text-green-400" />
              <div>
                <p className="text-gray-400 text-sm">Solved</p>
                <p className="text-3xl font-bold text-green-400">{profile.solvedCount}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="glass rounded-lg p-6 border border-hacker-green/20"
          >
            <div className="flex items-center space-x-3 mb-2">
              <Droplet className="w-8 h-8 text-red-400" />
              <div>
                <p className="text-gray-400 text-sm">First Bloods</p>
                <p className="text-3xl font-bold text-red-400">{profile.firstBloodCount}</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Solved Challenges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="glass rounded-lg p-6 border border-hacker-green/20"
        >
          <h2 className="text-2xl font-bold text-hacker-green mb-6 flex items-center space-x-2">
            <Award className="w-6 h-6" />
            <span>Solved Challenges</span>
          </h2>
          {solvedChallenges.length === 0 ? (
            <div className="text-center py-12">
              <CheckCircle2 className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400 text-lg">No challenges solved yet.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {solvedChallenges.map((challenge, index) => (
                <motion.div
                  key={challenge.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center justify-between p-4 bg-hacker-dark rounded border border-hacker-green/10 hover:border-hacker-green/30 transition-all"
                >
                  <div className="flex items-center space-x-4 flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-hacker-cyan font-bold text-lg w-8">
                        #{challenge.solveOrder || index + 1}
                      </span>
                      {challenge.firstBlood && (
                        <motion.span
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ repeat: Infinity, duration: 1.5 }}
                          className="px-2 py-1 rounded bg-red-500/20 text-red-400 border border-red-400 flex items-center space-x-1 text-xs font-semibold"
                        >
                          <Droplet className="w-3 h-3" />
                          <span>First Blood</span>
                        </motion.span>
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-hacker-green font-bold">{challenge.title}</h3>
                      <div className="flex items-center space-x-3 mt-1">
                        <span
                          className={`px-2 py-1 rounded text-xs font-semibold ${
                            categoryColors[challenge.category] || categoryColors.misc
                          }`}
                        >
                          {challenge.category}
                        </span>
                        <span
                          className={`text-xs font-semibold ${difficultyColors[challenge.difficulty] || difficultyColors.easy}`}
                        >
                          {challenge.difficulty}
                        </span>
                        <span className="text-hacker-cyan text-xs">
                          {challenge.points} pts
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-400 text-xs">
                      {challenge.solvedAt
                        ? new Date(challenge.solvedAt).toLocaleDateString()
                        : 'N/A'}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}

