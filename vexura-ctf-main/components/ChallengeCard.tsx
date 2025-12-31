'use client'

import { motion } from 'framer-motion'
import { CheckCircle2, Circle, Lock } from 'lucide-react'
import type { IChallenge } from '@/models/Challenge'

interface ChallengeCardProps {
  challenge: IChallenge & { isSolved?: boolean }
  onClick: () => void
}

const difficultyColors: Record<string, string> = {
  easy: 'text-green-400',
  medium: 'text-yellow-400',
  hard: 'text-red-400',
  // Backward compatibility
  Easy: 'text-green-400',
  Medium: 'text-yellow-400',
  Hard: 'text-red-400',
}

const difficultyGlow: Record<string, string> = {
  easy: 'shadow-glow-green-sm',
  medium: 'shadow-[0_0_10px_rgba(255,193,7,0.5)]',
  hard: 'shadow-[0_0_10px_rgba(239,68,68,0.5)]',
  // Backward compatibility
  Easy: 'shadow-glow-green-sm',
  Medium: 'shadow-[0_0_10px_rgba(255,193,7,0.5)]',
  Hard: 'shadow-[0_0_10px_rgba(239,68,68,0.5)]',
}

export default function ChallengeCard({ challenge, onClick }: ChallengeCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02, y: -5 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`glass rounded-lg p-6 cursor-pointer border transition-all group ${challenge.isSolved
        ? 'border-hacker-green/50 bg-hacker-green/5'
        : 'border-hacker-gray-light hover:border-hacker-green/50 hover:shadow-glow-green-sm'
        } ${difficultyGlow[challenge.difficulty]}`}
    >
      <div className="flex items-start justify-between mb-4 overflow-hidden">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <h3 className="text-xl font-bold text-hacker-green group-hover:text-glow-green transition-all">{challenge.title}</h3>
            {challenge.isSolved && (
              <CheckCircle2 className="w-5 h-5 text-hacker-green animate-pulse" />
            )}
          </div>
          <p className="text-gray-400 text-sm mb-3 line-clamp-2 ">{challenge.description}</p>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <span
            className={`px-3 py-1 rounded text-xs font-semibold ${difficultyColors[challenge.difficulty] || difficultyColors.easy
              }`}
          >
            {typeof challenge.difficulty === 'string'
              ? challenge.difficulty.charAt(0).toUpperCase() + challenge.difficulty.slice(1)
              : challenge.difficulty}
          </span>
          <span className="text-hacker-cyan text-sm font-mono">
            {challenge.category}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-hacker-green font-bold text-lg">{challenge.points}</span>
          <span className="text-gray-500 text-sm">pts</span>
        </div>
      </div>
    </motion.div>
  )
}

