'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Filter, Search, Loader2 } from 'lucide-react'
import ChallengeCard from '../components/ChallengeCard'
import ChallengeModal from '../components/ChallengeModal'
// import { useAuth } from '@/hooks/useAuth'
import { useAuth } from '../../../hooks/useAuth'
import { useQuery } from 'convex/react'
import { api } from '../../../convex/_generated/api'

const categories = ['All', 'Web', 'Crypto', 'Forensics', 'OSINT', 'Reverse', 'Misc']
const difficulties = ['All', 'Easy', 'Medium', 'Hard']

export default function ChallengesPage() {
  const { user } = useAuth()
  const [selectedChallenge, setSelectedChallenge] = useState<any>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedDifficulty, setSelectedDifficulty] = useState('All')

  const challenges = useQuery(
    api.ctfChallenges.getAllChallenges,
    user ? { userEmail: user.email } : {}
  )

  const filteredChallenges = useMemo(() => {
    if (!challenges) return []
    
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

    return filtered
  }, [challenges, searchQuery, selectedCategory, selectedDifficulty])

  const handleChallengeClick = (challenge: any) => {
    setSelectedChallenge(challenge)
    setIsModalOpen(true)
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
    setSelectedChallenge(null)
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
                className="w-full pl-10 pr-4 py-2 bg-black border border-hacker-green/30 rounded focus:outline-none focus:border-hacker-green focus:shadow-glow-green-sm text-white transition"
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
        {challenges === undefined ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-hacker-green" />
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
        userEmail={user?.email}
      />
    </div>
  )
}

