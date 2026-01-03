'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Plus, Edit, Trash2, Eye, EyeOff, Search } from 'lucide-react'
import toast from 'react-hot-toast'
import ChallengeModal from '../../ctf/components/ChallengeModal'
import type { Category, Difficulty } from '../../ctf/models/Challenge'

interface Challenge {
  id: string
  title: string
  description: string
  flag: string
  difficulty: Difficulty
  points: number
  category: Category
  isActive: boolean
  solvedCount: number
  createdAt: string
}

export default function AdminChallengesPage() {
  const [challenges, setChallenges] = useState<Challenge[]>([])
  const [filteredChallenges, setFilteredChallenges] = useState<Challenge[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [showFlags, setShowFlags] = useState(false)

  const fetchChallenges = useCallback(async () => {
    try {
      setIsLoading(true)
      const res = await fetch('/api/admin/challenges')
      if (res.ok) {
        const data = await res.json()
        setChallenges(data.challenges)
      } else {
        toast.error('Failed to fetch challenges')
      }
    } catch (error) {
      toast.error('Error loading challenges')
    } finally {
      setIsLoading(false)
    }
  }, [])

  const filterChallenges = useCallback(() => {
    if (!searchQuery) {
      setFilteredChallenges(challenges)
      return
    }

    const filtered = challenges.filter(
      (challenge) =>
        challenge.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        challenge.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        challenge.category.toLowerCase().includes(searchQuery.toLowerCase())
    )
    setFilteredChallenges(filtered)
  }, [challenges, searchQuery])

  useEffect(() => {
    fetchChallenges()
  }, [fetchChallenges])

  useEffect(() => {
    filterChallenges()
  }, [filterChallenges])

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this challenge?')) return

    try {
      const res = await fetch(`/api/admin/challenges/${id}`, { method: 'DELETE' })
      const data = await res.json()

      if (res.ok) {
        toast.success('Challenge deleted')
        fetchChallenges()
      } else {
        toast.error(data.error || 'Failed to delete challenge')
      }
    } catch (error) {
      toast.error('Error deleting challenge')
    }
  }

  const handleToggleActive = async (challenge: Challenge) => {
    try {
      const res = await fetch(`/api/admin/challenges/${challenge.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !challenge.isActive }),
      })

      if (res.ok) {
        toast.success(`Challenge ${!challenge.isActive ? 'activated' : 'deactivated'}`)
        fetchChallenges()
      } else {
        toast.error('Failed to update challenge')
      }
    } catch (error) {
      toast.error('Error updating challenge')
    }
  }

  const difficultyColors = {
    easy: 'text-green-400',
    medium: 'text-yellow-400',
    hard: 'text-red-400',
  }

  const categoryColors = {
    web: 'bg-blue-500/20 text-blue-400',
    crypto: 'bg-purple-500/20 text-purple-400',
    forensics: 'bg-orange-500/20 text-orange-400',
    pwn: 'bg-red-500/20 text-red-400',
    osint: 'bg-cyan-500/20 text-cyan-400',
    rev: 'bg-pink-500/20 text-pink-400',
    misc: 'bg-gray-500/20 text-gray-400',
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-hacker-green mb-2 text-glow-green font-mono">
              Challenge Management
            </h1>
            <p className="text-gray-400">Create, edit, and manage CTF challenges</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setSelectedChallenge(null)
              setIsModalOpen(true)
            }}
            className="px-6 py-3 bg-hacker-green/20 text-hacker-green border border-hacker-green rounded hover:bg-hacker-green/30 transition-all font-semibold flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>Create Challenge</span>
          </motion.button>
        </div>

        {/* Search */}
        <div className="mb-6 glass rounded-lg p-4 border border-hacker-green/20">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-hacker-green w-5 h-5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search challenges..."
              className="w-full pl-10 pr-4 py-2 bg-hacker-dark border border-hacker-green/30 rounded focus:outline-none focus:border-hacker-green focus:shadow-glow-green-sm text-white"
            />
          </div>
        </div>

        {/* Challenges Table */}
        {isLoading ? (
          <div className="glass rounded-lg p-8 border border-hacker-green/20">
            <div className="animate-pulse text-hacker-green">Loading challenges...</div>
          </div>
        ) : (
          <div className="glass rounded-lg border border-hacker-green/20 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-hacker-gray-light/50 border-b border-hacker-green/20">
                  <tr>
                    <th className="px-6 py-4 text-left text-hacker-cyan font-semibold">Title</th>
                    <th className="px-6 py-4 text-left text-hacker-cyan font-semibold">
                      Category
                    </th>
                    <th className="px-6 py-4 text-left text-hacker-cyan font-semibold">
                      Difficulty
                    </th>
                    <th className="px-6 py-4 text-left text-hacker-cyan font-semibold">Points</th>
                    <th className="px-6 py-4 text-left text-hacker-cyan font-semibold">Solves</th>
                    <th className="px-6 py-4 text-left text-hacker-cyan font-semibold">Flag</th>
                    <th className="px-6 py-4 text-left text-hacker-cyan font-semibold">Status</th>
                    <th className="px-6 py-4 text-left text-hacker-cyan font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredChallenges.map((challenge, index) => (
                    <motion.tr
                      key={challenge.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="border-b border-hacker-green/10 hover:bg-hacker-green/5 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <span className="text-hacker-green font-semibold">{challenge.title}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-2 py-1 rounded text-xs font-semibold ${
                            categoryColors[challenge.category as keyof typeof categoryColors] ||
                            categoryColors.misc
                          }`}
                        >
                          {challenge.category}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`font-semibold ${difficultyColors[challenge.difficulty]}`}
                        >
                          {challenge.difficulty}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-hacker-cyan font-bold">{challenge.points}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-gray-300">{challenge.solvedCount}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <code className="text-xs text-gray-400 font-mono">
                            {showFlags ? challenge.flag : '••••••••'}
                          </code>
                          <button
                            onClick={() => setShowFlags(!showFlags)}
                            className="text-hacker-green hover:text-hacker-cyan transition-colors"
                          >
                            {showFlags ? (
                              <EyeOff className="w-4 h-4" />
                            ) : (
                              <Eye className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleToggleActive(challenge)}
                          className={`px-3 py-1 rounded text-xs font-semibold ${
                            challenge.isActive
                              ? 'bg-green-500/20 text-green-400'
                              : 'bg-red-500/20 text-red-400'
                          }`}
                        >
                          {challenge.isActive ? 'Active' : 'Inactive'}
                        </button>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => {
                              setSelectedChallenge(challenge)
                              setIsModalOpen(true)
                            }}
                            className="text-hacker-cyan hover:text-hacker-green transition-colors"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(challenge.id)}
                            className="text-red-400 hover:text-red-300 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
              {filteredChallenges.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-400">No challenges found</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <ChallengeModal
        challenge={selectedChallenge}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setSelectedChallenge(null)
        }}
        onSuccess={fetchChallenges}
      />
    </div>
  )
}

