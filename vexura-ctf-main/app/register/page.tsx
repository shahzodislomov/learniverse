'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Terminal, Loader2 } from 'lucide-react'
import toast from 'react-hot-toast'

export default function RegisterPage() {
  const router = useRouter()

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match')
      return
    }

    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters')
      return
    }

    setIsLoading(true)

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
        }),
      })

      const data = await res.json()

      if (res.ok) {
        toast.success('Registration successful!')
        // Dispatch event to update navbar
        window.dispatchEvent(new Event('auth-changed'))
        router.push('/challenges')
        router.refresh()
      } else {
        toast.error(data.error || 'Registration failed')
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-strong rounded-lg p-8 w-full max-w-md border border-hacker-green/50 shadow-glow-green"
      >
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.2 }}
          >
            <Terminal className="w-12 h-12 text-hacker-green mx-auto mb-4" />
          </motion.div>
          <h1 className="text-3xl font-bold text-hacker-green mb-2 text-glow-green font-mono">Register</h1>
          <p className="text-gray-400">Create your account to start hacking</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-hacker-cyan mb-2 font-semibold">Username</label>
            <input
              type="text"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              required
              minLength={3}
              maxLength={20}
              className="w-full px-4 py-3 bg-hacker-dark border border-hacker-green/30 rounded focus:outline-none focus:border-hacker-green focus:shadow-glow-green-sm text-white"
              placeholder="hacker123"
            />
          </div>

          <div>
            <label className="block text-hacker-cyan mb-2 font-semibold">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              className="w-full px-4 py-3 bg-hacker-dark border border-hacker-green/30 rounded focus:outline-none focus:border-hacker-green focus:shadow-glow-green-sm text-white"
              placeholder="hacker@example.com"
            />
          </div>

          <div>
            <label className="block text-hacker-cyan mb-2 font-semibold">Password</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
              minLength={6}
              className="w-full px-4 py-3 bg-hacker-dark border border-hacker-green/30 rounded focus:outline-none focus:border-hacker-green focus:shadow-glow-green-sm text-white"
              placeholder="••••••••"
            />
          </div>

          <div>
            <label className="block text-hacker-cyan mb-2 font-semibold">Confirm Password</label>
            <input
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              required
              minLength={6}
              className="w-full px-4 py-3 bg-hacker-dark border border-hacker-green/30 rounded focus:outline-none focus:border-hacker-green focus:shadow-glow-green-sm text-white"
              placeholder="••••••••"
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isLoading}
            className="w-full px-6 py-3 bg-hacker-green/20 text-hacker-green border border-hacker-green rounded hover:bg-hacker-green/30 transition-all font-semibold flex items-center justify-center space-x-2 disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Registering...</span>
              </>
            ) : (
              <span>Register</span>
            )}
          </motion.button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-400">
            Already have an account?{' '}
            <Link href="/login" className="text-hacker-cyan hover:text-hacker-green transition-colors">
              Login here
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  )
}

