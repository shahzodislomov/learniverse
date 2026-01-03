'use client'

import { motion } from 'framer-motion'
import { Trophy, Medal, Award, Loader2, Droplet } from 'lucide-react'
import { useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { useAuth } from '@/hooks/useAuth'

export default function ScoreboardPage() {
  const { user } = useAuth()
  const scoreboard = useQuery(api.ctfChallenges.getScoreboard, {})

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Trophy className="w-6 h-6 text-yellow-400" />
    if (rank === 2) return <Medal className="w-6 h-6 text-gray-300" />
    if (rank === 3) return <Award className="w-6 h-6 text-amber-600" />
    return null
  }

  const getRankColor = (rank: number) => {
    if (rank === 1) return 'text-yellow-400 border-yellow-400/50'
    if (rank === 2) return 'text-gray-300 border-gray-300/50'
    if (rank === 3) return 'text-amber-600 border-amber-600/50'
    return 'text-gray-400 border-hacker-gray-light'
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-center"
        >
          <Trophy className="w-16 h-16 text-hacker-green mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold text-hacker-green mb-4 text-glow-green font-mono">
            Scoreboard
          </h1>
          <p className="text-gray-400 text-lg">Top hackers and their achievements</p>
        </motion.div>

        {/* Scoreboard Table */}
        {scoreboard === undefined ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-12 h-12 animate-spin text-hacker-green" />
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass rounded-lg border border-hacker-green/20 overflow-hidden"
          >
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-hacker-gray-light/50 border-b border-hacker-green/20">
                  <tr>
                    <th className="px-6 py-4 text-left text-hacker-cyan font-semibold">Rank</th>
                    <th className="px-6 py-4 text-left text-hacker-cyan font-semibold">Username</th>
                    <th className="px-6 py-4 text-right text-hacker-cyan font-semibold">Points</th>
                    <th className="px-6 py-4 text-right text-hacker-cyan font-semibold">
                      Solved
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {scoreboard && scoreboard.map((entry, index) => {
                    const isCurrentUser = user && entry.email === user.email
                    return (
                      <motion.tr
                        key={entry.email}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className={`border-b border-hacker-green/10 hover:bg-hacker-green/5 transition-all hover:shadow-glow-green-sm ${
                          index < 3 ? 'bg-hacker-green/5 border-l-4 border-l-hacker-green' : ''
                        } ${isCurrentUser ? 'bg-hacker-green/10' : ''}`}
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-2">
                            <span
                              className={`font-bold text-lg ${getRankColor(entry.rank)}`}
                            >
                              #{entry.rank}
                            </span>
                            {getRankIcon(entry.rank)}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div>
                            <span className="text-hacker-green font-semibold text-lg">
                              {entry.nickname || entry.email.split('@')[0]}
                            </span>
                            {entry.firstBloods > 0 && (
                              <div className="flex items-center gap-1 mt-1">
                                <Droplet className="w-3 h-3 text-red-400" />
                                <span className="text-xs text-red-400">
                                  {entry.firstBloods} first blood{entry.firstBloods !== 1 ? 's' : ''}
                                </span>
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <span className="text-hacker-cyan font-bold text-lg">
                            {entry.totalPoints}
                          </span>
                          <span className="text-gray-500 text-sm ml-1">pts</span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <span className="text-gray-300">{entry.solvedChallenges}</span>
                          <span className="text-gray-500 text-sm ml-1">challenges</span>
                        </td>
                      </motion.tr>
                    )
                  })}
                </tbody>
              </table>
            </div>

            {scoreboard && scoreboard.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-400 text-lg">No users on the scoreboard yet.</p>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  )
}

