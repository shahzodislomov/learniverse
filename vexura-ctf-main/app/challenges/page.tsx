'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Filter, Search } from 'lucide-react'
import ChallengeCard from '@/components/ChallengeCard'
import ChallengeModal from '@/components/ChallengeModal'
import LoadingSkeleton from '@/components/LoadingSkeleton'
import type { IChallenge } from '@/models/Challenge'

const categories = ['All', 'Web', 'Crypto', 'Forensics', 'OSINT', 'Reverse', 'Misc']
const difficulties = ['All', 'Easy', 'Medium', 'Hard']

export default function ChallengesPage() {
  const [challenges, setChallenges] = useState<(IChallenge & { isSolved?: boolean })[]>([])
  const [filteredChallenges, setFilteredChallenges] = useState<
    (IChallenge & { isSolved?: boolean })[]
  >([])
  const [selectedChallenge, setSelectedChallenge] = useState<
    (IChallenge & { isSolved?: boolean }) | null
  >(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedDifficulty, setSelectedDifficulty] = useState('All')

  const fetchChallenges = useCallback(async () => {
    try {
      setIsLoading(true)
      const res = await fetch('/api/challenges')
      const data = await res.json()
      if (res.ok) {
        setChallenges(data.challenges)
      }
    } catch (error) {
      console.error('Error fetching challenges:', error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const filterChallenges = useCallback(() => {
    let filtered = [...challenges]

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (challenge) =>
          challenge.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          challenge.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Category filter
    if (selectedCategory !== 'All') {
      filtered = filtered.filter((challenge) => challenge.category === selectedCategory)
    }

    // Difficulty filter
    if (selectedDifficulty !== 'All') {
      filtered = filtered.filter((challenge) => challenge.difficulty === selectedDifficulty)
    }

    setFilteredChallenges(filtered)
  }, [challenges, searchQuery, selectedCategory, selectedDifficulty])

  useEffect(() => {
    fetchChallenges()
  }, [fetchChallenges])

  useEffect(() => {
    filterChallenges()
  }, [filterChallenges])

  const handleChallengeClick = (challenge: IChallenge & { isSolved?: boolean }) => {
    setSelectedChallenge(challenge)
    setIsModalOpen(true)
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
    setSelectedChallenge(null)
  }

  const handleSuccess = () => {
    fetchChallenges() // Refresh challenges to update solved status
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-hacker-green mb-4 text-glow-green font-mono">
            Challenges
          </h1>
          <p className="text-gray-400 text-lg">
            Test your skills and earn points by solving cybersecurity challenges
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-lg p-6 mb-8 border border-hacker-green/20"
        >
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-hacker-green w-5 h-5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search challenges..."
                className="w-full pl-10 pr-4 py-2 bg-hacker-dark border border-hacker-green/30 rounded focus:outline-none focus:border-hacker-green focus:shadow-glow-green-sm text-white"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center space-x-2 overflow-x-auto">
              <Filter className="text-hacker-cyan w-5 h-5 flex-shrink-0" />
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded text-sm font-semibold whitespace-nowrap transition-all ${selectedCategory === category
                    ? 'bg-hacker-green/20 text-hacker-green border border-hacker-green'
                    : 'bg-hacker-dark text-gray-300 border border-hacker-gray-light hover:border-hacker-green/50'
                    }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Difficulty Filter */}
            <div className="flex items-center space-x-2 overflow-x-auto">
              {difficulties.map((difficulty) => (
                <button
                  key={difficulty}
                  onClick={() => setSelectedDifficulty(difficulty)}
                  className={`px-4 py-2 rounded text-sm font-semibold whitespace-nowrap transition-all ${selectedDifficulty === difficulty
                    ? 'bg-hacker-green/20 text-hacker-green border border-hacker-green'
                    : 'bg-hacker-dark text-gray-300 border border-hacker-gray-light hover:border-hacker-green/50'
                    }`}
                >
                  {difficulty}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <LoadingSkeleton key={i} />
            ))}
          </div>
        ) : filteredChallenges.length === 0 ? (
          <div className="text-center py-12 glass rounded-lg border border-hacker-green/20">
            <p className="text-gray-400 text-lg">No challenges found matching your filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredChallenges.map((challenge, index) => (
              <motion.div
                key={challenge._id.toString()}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <ChallengeCard
                  challenge={challenge}
                  onClick={() => handleChallengeClick(challenge)}
                />
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Challenge Modal */}
      <ChallengeModal
        challenge={selectedChallenge}
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSuccess={handleSuccess}
      />
    </div>
  )
}

