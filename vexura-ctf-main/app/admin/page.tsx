'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Users, Puzzle, Trophy, Activity, TrendingUp, Clock } from 'lucide-react'
import LoadingSkeleton from '@/components/LoadingSkeleton'

interface DashboardStats {
  totalUsers: number
  totalChallenges: number
  activeChallenges: number
  totalSolves: number
  solveRate: number
}

interface RecentActivity {
  solves: Array<{
    id: string
    username: string
    challenge: string
    submittedAt: string
  }>
  users: Array<{
    id: string
    username: string
    email: string
    points: number
    joinedAt: string
  }>
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [activity, setActivity] = useState<RecentActivity | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchDashboard()
  }, [])

  const fetchDashboard = async () => {
    try {
      const res = await fetch('/api/admin/dashboard')
      if (res.ok) {
        const data = await res.json()
        setStats(data.stats)
        setActivity(data.recentActivity)
      }
    } catch (error) {
      console.error('Error fetching dashboard:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const statCards = [
    {
      title: 'Total Users',
      value: stats?.totalUsers || 0,
      icon: Users,
      color: 'text-hacker-green',
    },
    {
      title: 'Total Challenges',
      value: stats?.totalChallenges || 0,
      icon: Puzzle,
      color: 'text-hacker-cyan',
    },
    {
      title: 'Active Challenges',
      value: stats?.activeChallenges || 0,
      icon: Activity,
      color: 'text-yellow-400',
    },
    {
      title: 'Total Solves',
      value: stats?.totalSolves || 0,
      icon: Trophy,
      color: 'text-green-400',
    },
  ]

  if (isLoading) {
    return (
      <div className="min-h-screen py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[...Array(4)].map((_, i) => (
              <LoadingSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-hacker-green mb-2 text-glow-green font-mono">
            Admin Dashboard
          </h1>
          <p className="text-gray-400">Overview of your CTF platform</p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((stat, index) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
                className="glass rounded-lg p-6 border border-hacker-green/20 hover:border-hacker-green/50 transition-all"
              >
                <div className="flex items-center justify-between mb-4">
                  <Icon className={`w-8 h-8 ${stat.color}`} />
                  <TrendingUp className="w-5 h-5 text-gray-500" />
                </div>
                <h3 className="text-gray-400 text-sm mb-1">{stat.title}</h3>
                <p className="text-3xl font-bold text-hacker-green">{stat.value}</p>
              </motion.div>
            )
          })}
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Solves */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass rounded-lg p-6 border border-hacker-green/20"
          >
            <h2 className="text-2xl font-bold text-hacker-cyan mb-4 flex items-center space-x-2">
              <Clock className="w-6 h-6" />
              <span>Recent Solves</span>
            </h2>
            <div className="space-y-3">
              {activity?.solves.length ? (
                activity.solves.map((solve) => (
                  <div
                    key={solve.id}
                    className="flex items-center justify-between p-3 bg-hacker-dark rounded border border-hacker-green/10"
                  >
                    <div>
                      <p className="text-hacker-green font-semibold">{solve.username}</p>
                      <p className="text-gray-400 text-sm">{solve.challenge}</p>
                    </div>
                    <span className="text-gray-500 text-xs">
                      {new Date(solve.submittedAt).toLocaleDateString()}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center py-4">No recent solves</p>
              )}
            </div>
          </motion.div>

          {/* Recent Users */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass rounded-lg p-6 border border-hacker-green/20"
          >
            <h2 className="text-2xl font-bold text-hacker-cyan mb-4 flex items-center space-x-2">
              <Users className="w-6 h-6" />
              <span>Recent Users</span>
            </h2>
            <div className="space-y-3">
              {activity?.users.length ? (
                activity.users.map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center justify-between p-3 bg-hacker-dark rounded border border-hacker-green/10"
                  >
                    <div>
                      <p className="text-hacker-green font-semibold">{user.username}</p>
                      <p className="text-gray-400 text-sm">{user.email}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-hacker-cyan font-bold">{user.points} pts</p>
                      <p className="text-gray-500 text-xs">
                        {new Date(user.joinedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center py-4">No recent users</p>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

