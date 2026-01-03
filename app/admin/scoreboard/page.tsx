'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { RefreshCw, Trash2, Calculator, AlertTriangle, Loader2 } from 'lucide-react'
import toast from 'react-hot-toast'

export default function AdminScoreboardPage() {
  const [isLoading, setIsLoading] = useState(false)

  const handleRecalculate = async () => {
    if (!confirm('Recalculate scores for all users? This may take a moment.')) return

    setIsLoading(true)
    try {
      const res = await fetch('/api/admin/scoreboard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'recalculate' }),
      })

      const data = await res.json()

      if (res.ok) {
        toast.success(data.message || 'Scores recalculated successfully')
      } else {
        toast.error(data.error || 'Failed to recalculate scores')
      }
    } catch (error) {
      toast.error('Error recalculating scores')
    } finally {
      setIsLoading(false)
    }
  }

  const handleRemoveDuplicates = async () => {
    if (
      !confirm(
        'Remove duplicate solves? This will keep only the first submission for each user-challenge pair.'
      )
    )
      return

    setIsLoading(true)
    try {
      const res = await fetch('/api/admin/scoreboard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'remove-duplicates' }),
      })

      const data = await res.json()

      if (res.ok) {
        toast.success(data.message || 'Duplicate solves removed')
      } else {
        toast.error(data.error || 'Failed to remove duplicates')
      }
    } catch (error) {
      toast.error('Error removing duplicates')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSoftReset = async () => {
    if (
      !confirm(
        '⚠️ WARNING: This will reset the entire scoreboard!\n\nAll solves, scores, and challenge statistics will be cleared. This action cannot be undone.\n\nAre you absolutely sure?'
      )
    )
      return

    if (!confirm('This is your last chance. Proceed with scoreboard reset?')) return

    setIsLoading(true)
    try {
      const res = await fetch('/api/admin/scoreboard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'soft-reset' }),
      })

      const data = await res.json()

      if (res.ok) {
        toast.success(data.message || 'Scoreboard reset completed')
      } else {
        toast.error(data.error || 'Failed to reset scoreboard')
      }
    } catch (error) {
      toast.error('Error resetting scoreboard')
    } finally {
      setIsLoading(false)
    }
  }

  const actions = [
    {
      title: 'Recalculate Scores',
      description: 'Recalculate total points for all users based on their solved challenges',
      icon: Calculator,
      color: 'text-hacker-green',
      bgColor: 'bg-hacker-green/20',
      borderColor: 'border-hacker-green',
      onClick: handleRecalculate,
    },
    {
      title: 'Remove Duplicate Solves',
      description: 'Clean up duplicate submissions, keeping only the first solve for each challenge',
      icon: RefreshCw,
      color: 'text-hacker-cyan',
      bgColor: 'bg-hacker-cyan/20',
      borderColor: 'border-hacker-cyan',
      onClick: handleRemoveDuplicates,
    },
    {
      title: 'Soft Reset Scoreboard',
      description:
        '⚠️ Reset all scores, solves, and statistics. Users and challenges remain intact. This cannot be undone!',
      icon: Trash2,
      color: 'text-red-400',
      bgColor: 'bg-red-500/20',
      borderColor: 'border-red-500',
      onClick: handleSoftReset,
      warning: true,
    },
  ]

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-hacker-green mb-2 text-glow-green font-mono">
            Scoreboard Control
          </h1>
          <p className="text-gray-400">Manage scoreboard data and statistics</p>
        </div>

        <div className="space-y-6">
          {actions.map((action, index) => {
            const Icon = action.icon
            return (
              <motion.div
                key={action.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`glass rounded-lg p-6 border ${action.borderColor}/30 hover:${action.borderColor}/50 transition-all`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`${action.bgColor} p-3 rounded-lg`}>
                      <Icon className={`w-6 h-6 ${action.color}`} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-hacker-green flex items-center space-x-2">
                        <span>{action.title}</span>
                        {action.warning && (
                          <AlertTriangle className="w-5 h-5 text-red-400" />
                        )}
                      </h3>
                      <p className="text-gray-400 mt-1">{action.description}</p>
                    </div>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={action.onClick}
                  disabled={isLoading}
                  className={`w-full px-6 py-3 ${action.bgColor} ${action.color} border ${action.borderColor} rounded hover:${action.bgColor.replace('/20', '/30')} transition-all font-semibold flex items-center justify-center space-x-2 disabled:opacity-50`}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <Icon className="w-5 h-5" />
                      <span>Execute</span>
                    </>
                  )}
                </motion.button>
              </motion.div>
            )
          })}
        </div>

        <div className="mt-8 glass rounded-lg p-6 border border-yellow-500/30">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-yellow-400 font-bold mb-2">Important Notes</h3>
              <ul className="text-gray-400 text-sm space-y-1 list-disc list-inside">
                <li>Recalculate Scores: Safe operation, can be run multiple times</li>
                <li>Remove Duplicates: Safe operation, removes redundant data</li>
                <li>
                  Soft Reset: <strong className="text-red-400">DESTRUCTIVE</strong> - Clears all
                  solve history and scores
                </li>
                <li>All operations are logged and cannot be undone</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

