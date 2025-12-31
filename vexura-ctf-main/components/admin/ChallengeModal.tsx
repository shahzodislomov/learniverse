'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Loader2 } from 'lucide-react'
import toast from 'react-hot-toast'

interface Challenge {
  id?: string
  title: string
  description: string
  flag: string
  difficulty: 'easy' | 'medium' | 'hard'
  points: number
  category: 'web' | 'crypto' | 'forensics' | 'pwn' | 'osint' | 'rev' | 'misc'
  isActive: boolean
}

interface ChallengeModalProps {
  challenge: Challenge | null
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}

export default function ChallengeModal({
  challenge,
  isOpen,
  onClose,
  onSuccess,
}: ChallengeModalProps) {
  const [formData, setFormData] = useState<Challenge>({
    title: '',
    description: '',
    flag: '',
    difficulty: 'easy',
    points: 100,
    category: 'web',
    isActive: true,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (challenge) {
      setFormData(challenge)
    } else {
      setFormData({
        title: '',
        description: '',
        flag: '',
        difficulty: 'easy',
        points: 100,
        category: 'web',
        isActive: true,
      })
    }
  }, [challenge, isOpen])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const url = challenge?.id
        ? `/api/admin/challenges/${challenge.id}`
        : '/api/admin/challenges'
      const method = challenge?.id ? 'PUT' : 'POST'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      if (res.ok) {
        toast.success(challenge?.id ? 'Challenge updated!' : 'Challenge created!')
        onSuccess()
        handleClose()
      } else {
        toast.error(data.error || 'Operation failed')
      }
    } catch (error) {
      toast.error('An error occurred')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    setFormData({
      title: '',
      description: '',
      flag: '',
      difficulty: 'easy',
      points: 100,
      category: 'web',
      isActive: true,
    })
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="glass-strong rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-hacker-green/50 shadow-glow-green">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-hacker-green">
                    {challenge?.id ? 'Edit Challenge' : 'Create Challenge'}
                  </h2>
                  <button
                    onClick={handleClose}
                    className="text-gray-400 hover:text-hacker-green transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-hacker-cyan mb-2 font-semibold">Title</label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      required
                      className="w-full px-4 py-2 bg-hacker-dark border border-hacker-green/30 rounded focus:outline-none focus:border-hacker-green focus:shadow-glow-green-sm text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-hacker-cyan mb-2 font-semibold">
                      Description (Markdown supported)
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      required
                      rows={6}
                      className="w-full px-4 py-2 bg-hacker-dark border border-hacker-green/30 rounded focus:outline-none focus:border-hacker-green focus:shadow-glow-green-sm text-white font-mono text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-hacker-cyan mb-2 font-semibold">Flag</label>
                    <input
                      type="text"
                      value={formData.flag}
                      onChange={(e) => setFormData({ ...formData, flag: e.target.value })}
                      required
                      className="w-full px-4 py-2 bg-hacker-dark border border-hacker-green/30 rounded focus:outline-none focus:border-hacker-green focus:shadow-glow-green-sm text-white font-mono"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-hacker-cyan mb-2 font-semibold">Difficulty</label>
                      <select
                        value={formData.difficulty}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            difficulty: e.target.value as 'easy' | 'medium' | 'hard',
                          })
                        }
                        className="w-full px-4 py-2 bg-hacker-dark border border-hacker-green/30 rounded focus:outline-none focus:border-hacker-green focus:shadow-glow-green-sm text-white"
                      >
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-hacker-cyan mb-2 font-semibold">Points</label>
                      <input
                        type="number"
                        value={formData.points}
                        onChange={(e) =>
                          setFormData({ ...formData, points: parseInt(e.target.value, 10) })
                        }
                        required
                        min="0"
                        className="w-full px-4 py-2 bg-hacker-dark border border-hacker-green/30 rounded focus:outline-none focus:border-hacker-green focus:shadow-glow-green-sm text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-hacker-cyan mb-2 font-semibold">Category</label>
                    <select
                      value={formData.category}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          category: e.target.value as Challenge['category'],
                        })
                      }
                      className="w-full px-4 py-2 bg-hacker-dark border border-hacker-green/30 rounded focus:outline-none focus:border-hacker-green focus:shadow-glow-green-sm text-white"
                    >
                      <option value="web">Web</option>
                      <option value="crypto">Crypto</option>
                      <option value="forensics">Forensics</option>
                      <option value="pwn">Pwn</option>
                      <option value="osint">OSINT</option>
                      <option value="rev">Reverse</option>
                      <option value="misc">Misc</option>
                    </select>
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="isActive"
                      checked={formData.isActive}
                      onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                      className="w-4 h-4 text-hacker-green bg-hacker-dark border-hacker-green rounded focus:ring-hacker-green"
                    />
                    <label htmlFor="isActive" className="text-gray-300">
                      Active (visible to users)
                    </label>
                  </div>

                  <div className="flex space-x-4 pt-4">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 px-6 py-3 bg-hacker-green/20 text-hacker-green border border-hacker-green rounded hover:bg-hacker-green/30 transition-all font-semibold flex items-center justify-center space-x-2 disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          <span>Saving...</span>
                        </>
                      ) : (
                        <span>{challenge?.id ? 'Update' : 'Create'}</span>
                      )}
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="button"
                      onClick={handleClose}
                      className="px-6 py-3 glass border border-hacker-gray-light rounded hover:border-hacker-green/50 transition-all"
                    >
                      Cancel
                    </motion.button>
                  </div>
                </form>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

