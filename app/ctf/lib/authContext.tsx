'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface AuthContextType {
  isAuthenticated: boolean
  username: string | null
  role: string | null
  checkAuth: () => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [username, setUsername] = useState<string | null>(null)
  const [role, setRole] = useState<string | null>(null)

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
        setUsername(null)
        setRole(null)
      }
    } catch (error) {
      setIsAuthenticated(false)
      setUsername(null)
      setRole(null)
    }
  }

  const logout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
      setIsAuthenticated(false)
      setUsername(null)
      setRole(null)
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  useEffect(() => {
    checkAuth()

    // Listen for auth events
    const handleAuthChange = () => {
      checkAuth()
    }

    window.addEventListener('auth-changed', handleAuthChange)
    return () => window.removeEventListener('auth-changed', handleAuthChange)
  }, [])

  return (
    <AuthContext.Provider value={{ isAuthenticated, username, role, checkAuth, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

