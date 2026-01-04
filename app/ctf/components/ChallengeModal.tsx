'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, CheckCircle2, XCircle, Loader2, Users, Droplet } from 'lucide-react'
import { useToast } from "../../../hooks/use-toast"
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useMutation, useQuery } from 'convex/react'
// import { api } from '@/convex/_generated/api'
// import { Id } from '@/convex/_generated/dataModel'
import { api } from '../../../convex/_generated/api'
import { Id } from '../../../convex/_generated/dataModel'

interface ChallengeModalProps {
  challenge: any
  isOpen: boolean
  onClose: () => void
  onSuccess?: () => void
  userEmail?: string
}

export default function ChallengeModal({
  challenge,
  isOpen,
  onClose,
  onSuccess,
  userEmail,
}: ChallengeModalProps) {
  const router = useRouter()
  const [flag, setFlag] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [shake, setShake] = useState(false)
  const [success, setSuccess] = useState(false)
  const [firstBloodData, setFirstBloodData] = useState<{
    firstBlood: boolean
    points: number
    bonusPoints: number
  } | null>(null)
  const { toast } = useToast()

  const submitFlag = useMutation(api.ctfChallenges.submitFlag)
  const solvers = useQuery(
    api.ctfChallenges.getChallengeSolvers,
    challenge ? { challengeId: challenge._id as Id<"ctfChallenges"> } : "skip"
  )

  if (!challenge) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!flag.trim()) {
      toast({
        title: 'Please enter a flag',
        variant: 'destructive',
      })
      return
    }

    if (!userEmail) {
      toast({
        title: 'Please log in to submit flags',
        variant: 'destructive',
      })
      router.push('/auth/login')
      return
    }

    setIsSubmitting(true)
    try {
      const result = await submitFlag({
        challengeId: challenge._id,
        userEmail: userEmail,
        flag: flag.trim(),
      })

      if (result.success) {
        setSuccess(true)
        setFirstBloodData({
          firstBlood: result.firstBlood,
          points: result.points,
          bonusPoints: result.bonusPoints,
        })
        if (result.firstBlood) {
          toast({
            title: `🩸 First Blood! You earned ${result.points} points!`,
            variant: 'default',
          })
        } else {
          toast({
            title: `Correct! You earned ${result.points} points!`,
            variant: 'default',
          })
        }
        // Call onSuccess callback if provided
        if (onSuccess) {
          onSuccess()
        }
        setTimeout(() => {
          handleClose()
        }, 2000)
      } else {
        setShake(true)
        toast({
          title: 'Incorrect flag',
          variant: 'destructive',
        })
        setTimeout(() => setShake(false), 500)
      }
    } catch (error: any) {
      toast({
        title: error.message || 'Failed to submit flag',
        variant: 'destructive',
      })
      setShake(true)
      setTimeout(() => setShake(false), 500)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    setFlag('')
    setShake(false)
    setSuccess(false)
    setIsSubmitting(false)
    onClose()
  }

  const difficultyColors: Record<string, string> = {
    easy: 'text-green-400',
    medium: 'text-yellow-400',
    hard: 'text-red-400',
    Easy: 'text-green-400',
    Medium: 'text-yellow-400',
    Hard: 'text-red-400',
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="glass-strong rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-hacker-green/50 shadow-glow-green">
              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-hacker-green mb-2">
                      {challenge.title}
                    </h2>
                    <div className="flex items-center space-x-4">
                      <span
                        className={`px-3 py-1 rounded text-sm font-semibold ${
                          difficultyColors[challenge.difficulty] || difficultyColors.easy
                        }`}
                      >
                        {typeof challenge.difficulty === 'string'
                          ? challenge.difficulty.charAt(0).toUpperCase() + challenge.difficulty.slice(1)
                          : challenge.difficulty}
                      </span>
                      <span className="text-hacker-cyan text-sm font-mono">
                        {challenge.category}
                      </span>
                      <span className="text-hacker-green font-bold">
                        {challenge.points} pts
                      </span>
                      {challenge.isSolved && (
                        <span className="text-hacker-green text-sm flex items-center space-x-1">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Solved</span>
                        </span>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={handleClose}
                    className="text-gray-400 hover:text-hacker-green transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Description */}
                <div className="mb-6">
                  <h3 className="text-hacker-cyan mb-2 font-semibold">Description</h3>
                  <div className="glass rounded p-4 border border-hacker-green/20">
                    <p className="text-gray-300 whitespace-pre-wrap">{challenge.description}</p>
                  </div>
                </div>

                {/* Flag Submission */}
                {!challenge.isSolved && !success && (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-hacker-cyan mb-2 font-semibold">
                        Enter Flag
                      </label>
                      <motion.input
                        animate={shake ? { x: [-10, 10, -10, 10, 0] } : {}}
                        transition={{ duration: 0.5 }}
                        type="text"
                        value={flag}
                        onChange={(e) => setFlag(e.target.value)}
                        placeholder="WEN{...}"
                        className="w-full px-4 py-3 bg-hacker-dark border border-hacker-green/30 rounded focus:outline-none focus:border-hacker-green focus:shadow-glow-green-sm text-hacker-green font-mono text-black"
                        disabled={isSubmitting}
                      />
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full px-6 py-3 bg-hacker-green/20 text-hacker-green border border-hacker-green rounded hover:bg-hacker-green/30 transition-all font-semibold flex items-center justify-center space-x-2 disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          <span>Submitting...</span>
                        </>
                      ) : (
                        <span>Submit Flag</span>
                      )}
                    </motion.button>
                  </form>
                )}

                {/* Success Animation */}
                {success && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="flex flex-col items-center justify-center py-8"
                  >
                    {firstBloodData?.firstBlood && (
                      <motion.div
                        animate={{ scale: [1, 1.2, 1], rotate: [0, 360] }}
                        transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
                        className="mb-4"
                      >
                        <div className="px-4 py-2 rounded bg-red-500/20 text-red-400 border border-red-400 flex items-center space-x-2 text-lg font-bold">
                          <Droplet className="w-6 h-6" />
                          <span>FIRST BLOOD!</span>
                        </div>
                      </motion.div>
                    )}
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 1 }}
                    >
                      <CheckCircle2 className="w-20 h-20 text-hacker-green" />
                    </motion.div>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-hacker-green text-xl font-bold mt-4 text-glow-green"
                    >
                      Flag Correct! +{firstBloodData?.points || challenge.points} points
                      {firstBloodData?.bonusPoints ? (
                        <span className="text-red-400 ml-2">
                          (+{firstBloodData.bonusPoints} bonus)
                        </span>
                      ) : null}
                    </motion.p>
                  </motion.div>
                )}

                {/* Solvers List */}
                {!success && (
                  <div className="mt-6">
                    <h3 className="text-hacker-cyan mb-3 font-semibold flex items-center space-x-2">
                      <Users className="w-5 h-5" />
                      <span>Solvers ({solvers?.length})</span>
                    </h3>
                    {solvers === undefined ? (
                      <div className="text-center py-4 text-gray-400">
                        <Loader2 className="w-5 h-5 animate-spin mx-auto" />
                      </div>
                    ) : solvers.length === 0 ? (
                      <div className="text-center py-4 text-gray-500 text-sm">
                        No solvers yet. Be the first!
                      </div>
                    ) : (
                      <div className="space-y-2 max-h-48 overflow-y-auto">
                        {solvers.map((solver, index) => (
                          <motion.div
                            key={solver.userEmail}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="flex items-center justify-between p-3 bg-hacker-dark rounded border border-hacker-green/10 hover:border-hacker-green/30 transition-all"
                          >
                            <div className="flex items-center space-x-3">
                              <span className="text-hacker-cyan font-bold w-8">
                                #{solver.solveOrder}
                              </span>
                              {solver.firstBlood && (
                                <motion.span
                                  animate={{ scale: [1, 1.1, 1] }}
                                  transition={{ repeat: Infinity, duration: 1.5 }}
                                  className="px-2 py-1 rounded bg-red-500/20 text-red-400 border border-red-400 flex items-center space-x-1 text-xs font-semibold"
                                >
                                  <Droplet className="w-3 h-3" />
                                  <span>FB</span>
                                </motion.span>
                              )}
                              <span className="text-hacker-green font-semibold">
                                {solver.userEmail.split('@')[0]}
                              </span>
                            </div>
                            <span className="text-gray-500 text-xs">
                              {new Date(solver.solvedAt).toLocaleDateString()}
                            </span>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

