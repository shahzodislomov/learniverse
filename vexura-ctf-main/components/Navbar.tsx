'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Terminal, Trophy, User, LogOut, Menu, X, Shield } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'

export default function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [username, setUsername] = useState('')
  const [role, setRole] = useState<string | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    checkAuth()

    // Listen for auth state changes
    const handleAuthChange = () => {
      checkAuth()
    }

    window.addEventListener('auth-changed', handleAuthChange)
    return () => window.removeEventListener('auth-changed', handleAuthChange)
  }, [])

  const checkAuth = async () => {
    try {
      const res = await fetch('/api/user/profile')
      if (res.ok) {
        const data = await res.json()
        setIsAuthenticated(true)
        setUsername(data.user.username)
        setRole(data.user.role || 'user')
      } else {
        setIsAuthenticated(false)
        setUsername('')
        setRole(null)
      }
    } catch (error) {
      setIsAuthenticated(false)
      setUsername('')
      setRole(null)
    }
  }

  const handleLogout = async () => {
    try {
      const res = await fetch('/api/auth/logout', { method: 'POST' })
      if (res.ok) {
        setIsAuthenticated(false)
        setUsername('')
        setRole(null)
        toast.success('Logged out successfully')
        // Dispatch event to update all components
        window.dispatchEvent(new Event('auth-changed'))
        router.push('/')
      }
    } catch (error) {
      toast.error('Logout failed')
    }
  }

  const navLinks = [
    { href: '/', label: 'Home', icon: Terminal },
    { href: '/challenges', label: 'Challenges', icon: Terminal },
    { href: '/scoreboard', label: 'Scoreboard', icon: Trophy },
    { href: '/rules', label: 'Rules', icon: Shield },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-strong border-b border-hacker-green/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <Terminal className="w-6 h-6 text-hacker-green group-hover:text-hacker-cyan transition-colors" />
            </motion.div>
            <span className="text-xl font-bold text-glow-green group-hover:text-glow-cyan transition-all font-mono">
              CTFVexura
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => {
              const Icon = link.icon
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center space-x-1 px-3 py-2 rounded transition-all ${
                    isActive
                      ? 'text-hacker-green border-glow-green-sm'
                      : 'text-gray-300 hover:text-hacker-cyan'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{link.label}</span>
                </Link>
              )
            })}

            {isAuthenticated ? (
              <>
                {role === 'admin' && (
                  <Link
                    href="/admin"
                    className="flex items-center space-x-1 px-3 py-2 rounded text-gray-300 hover:text-hacker-cyan transition-all"
                  >
                    <Shield className="w-4 h-4" />
                    <span>Admin</span>
                  </Link>
                )}
                <Link
                  href="/profile"
                  className={`flex items-center space-x-1 px-3 py-2 rounded transition-all ${
                    pathname === '/profile'
                      ? 'text-hacker-green'
                      : 'text-gray-300 hover:text-hacker-cyan'
                  }`}
                >
                  <User className="w-4 h-4" />
                  <span>{username}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 px-3 py-2 rounded text-gray-300 hover:text-red-400 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="px-4 py-2 rounded text-gray-300 hover:text-hacker-cyan transition-colors"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="px-4 py-2 rounded bg-hacker-green/20 text-hacker-green border border-hacker-green hover:bg-hacker-green/30 transition-all"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-hacker-green"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
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
                const isActive = pathname === link.href
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center space-x-2 px-3 py-2 rounded ${
                      isActive ? 'text-hacker-green' : 'text-gray-300'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{link.label}</span>
                  </Link>
                )
              })}
              {isAuthenticated ? (
                <>
                  {role === 'admin' && (
                    <Link
                      href="/admin"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center space-x-2 px-3 py-2 rounded text-gray-300"
                    >
                      <Shield className="w-4 h-4" />
                      <span>Admin</span>
                    </Link>
                  )}
                  <Link
                    href="/profile"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center space-x-2 px-3 py-2 rounded text-gray-300"
                  >
                    <User className="w-4 h-4" />
                    <span>{username}</span>
                  </Link>
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
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-3 py-2 rounded text-gray-300"
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-3 py-2 rounded bg-hacker-green/20 text-hacker-green border border-hacker-green"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

