'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Shield, Home, Puzzle, Users, Trophy, LogOut, Menu, X } from 'lucide-react'
import toast from 'react-hot-toast'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const checkAdminAccess = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/dashboard')
      if (res.ok) {
        setIsAuthenticated(true)
      } else if (res.status === 403) {
        toast.error('Admin access required')
        router.push('/403')
      } else if (res.status === 401) {
        router.push('/login')
      } else {
        router.push('/403')
      }
    } catch (error) {
      router.push('/login')
    } finally {
      setIsLoading(false)
    }
  }, [router])

  useEffect(() => {
    checkAdminAccess()
  }, [checkAdminAccess])

  const handleLogout = async () => {
    try {
      const res = await fetch('/api/auth/logout', { method: 'POST' })
      if (res.ok) {
        toast.success('Logged out')
        router.push('/')
      }
    } catch (error) {
      toast.error('Logout failed')
    }
  }

  const navLinks = [
    { href: '/admin', label: 'Dashboard', icon: Home },
    { href: '/admin/challenges', label: 'Challenges', icon: Puzzle },
    { href: '/admin/users', label: 'Users', icon: Users },
    { href: '/admin/scoreboard', label: 'Scoreboard', icon: Trophy },
  ]

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-hacker-dark">
        <div className="text-hacker-green animate-pulse">Loading...</div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-hacker-dark">
      {/* Admin Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-strong border-b border-hacker-green/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/admin" className="flex items-center space-x-2 group">
              <Shield className="w-6 h-6 text-hacker-green group-hover:text-hacker-cyan transition-colors" />
              <span className="text-xl font-bold text-glow-green group-hover:text-glow-cyan transition-all font-mono">
                Admin Panel
              </span>
            </Link>

            <div className="hidden md:flex items-center space-x-6">
              {navLinks.map((link) => {
                const Icon = link.icon
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="flex items-center space-x-1 px-3 py-2 rounded text-gray-300 hover:text-hacker-cyan transition-all"
                  >
                    <Icon className="w-4 h-4" />
                    <span>{link.label}</span>
                  </Link>
                )
              })}
              <button
                onClick={handleLogout}
                className="flex items-center space-x-1 px-3 py-2 rounded text-gray-300 hover:text-red-400 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>

            <button
              className="md:hidden text-hacker-green"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-strong border-t border-hacker-green/30"
          >
            <div className="px-4 py-4 space-y-2">
              {navLinks.map((link) => {
                const Icon = link.icon
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center space-x-2 px-3 py-2 rounded text-gray-300"
                  >
                    <Icon className="w-4 h-4" />
                    <span>{link.label}</span>
                  </Link>
                )
              })}
              <button
                onClick={() => {
                  handleLogout()
                  setMobileMenuOpen(false)
                }}
                className="flex items-center space-x-2 px-3 py-2 rounded text-gray-300 w-full text-left"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </motion.div>
        )}
      </nav>

      <main className="pt-16">{children}</main>
    </div>
  )
}

