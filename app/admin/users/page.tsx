'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Search, Shield, Ban, Unlock, Key, Eye } from 'lucide-react'
import toast from 'react-hot-toast'

interface User {
  id: string
  username: string
  email: string
  role: 'user' | 'admin'
  totalPoints: number
  isBanned: boolean
  solvedCount: number
  createdAt: string
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [filteredUsers, setFilteredUsers] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [showUserDetails, setShowUserDetails] = useState(false)

  const fetchUsers = useCallback(async () => {
    try {
      setIsLoading(true)
      const res = await fetch('/api/admin/users')
      if (res.ok) {
        const data = await res.json()
        setUsers(data.users)
      } else {
        toast.error('Failed to fetch users')
      }
    } catch (error) {
      toast.error('Error loading users')
    } finally {
      setIsLoading(false)
    }
  }, [])

  const filterUsers = useCallback(() => {
    if (!searchQuery) {
      setFilteredUsers(users)
      return
    }

    const filtered = users.filter(
      (user) =>
        user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
    )
    setFilteredUsers(filtered)
  }, [users, searchQuery])

  useEffect(() => {
    fetchUsers()
  }, [fetchUsers])

  useEffect(() => {
    filterUsers()
  }, [filterUsers])

  const handleToggleRole = async (user: User) => {
    if (!confirm(`Change ${user.username}'s role to ${user.role === 'admin' ? 'user' : 'admin'}?`))
      return

    try {
      const res = await fetch(`/api/admin/users/${user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: user.role === 'admin' ? 'user' : 'admin' }),
      })

      if (res.ok) {
        toast.success(`Role updated`)
        fetchUsers()
      } else {
        const data = await res.json()
        toast.error(data.error || 'Failed to update role')
      }
    } catch (error) {
      toast.error('Error updating role')
    }
  }

  const handleToggleBan = async (user: User) => {
    if (!confirm(`${user.isBanned ? 'Unban' : 'Ban'} ${user.username}?`)) return

    try {
      const res = await fetch(`/api/admin/users/${user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isBanned: !user.isBanned }),
      })

      if (res.ok) {
        toast.success(`User ${user.isBanned ? 'unbanned' : 'banned'}`)
        fetchUsers()
      } else {
        const data = await res.json()
        toast.error(data.error || 'Failed to update ban status')
      }
    } catch (error) {
      toast.error('Error updating ban status')
    }
  }

  const handleResetPassword = async (userId: string) => {
    const newPassword = prompt('Enter new password (min 6 characters):')
    if (!newPassword || newPassword.length < 6) {
      toast.error('Password must be at least 6 characters')
      return
    }

    if (!confirm('Reset password for this user?')) return

    try {
      const res = await fetch(`/api/admin/users/${userId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newPassword }),
      })

      if (res.ok) {
        toast.success('Password reset successfully')
      } else {
        const data = await res.json()
        toast.error(data.error || 'Failed to reset password')
      }
    } catch (error) {
      toast.error('Error resetting password')
    }
  }

  const handleViewDetails = async (user: User) => {
    try {
      const res = await fetch(`/api/admin/users/${user.id}`)
      if (res.ok) {
        const data = await res.json()
        setSelectedUser({ ...user, ...data.user })
        setShowUserDetails(true)
      }
    } catch (error) {
      toast.error('Error loading user details')
    }
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-hacker-green mb-2 text-glow-green font-mono">
            User Management
          </h1>
          <p className="text-gray-400">Manage users, roles, and permissions</p>
        </div>

        {/* Search */}
        <div className="mb-6 glass rounded-lg p-4 border border-hacker-green/20">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-hacker-green w-5 h-5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search users by username or email..."
              className="w-full pl-10 pr-4 py-2 bg-hacker-dark border border-hacker-green/30 rounded focus:outline-none focus:border-hacker-green focus:shadow-glow-green-sm text-white"
            />
          </div>
        </div>

        {/* Users Table */}
        {isLoading ? (
          <div className="glass rounded-lg p-8 border border-hacker-green/20">
            <div className="animate-pulse text-hacker-green">Loading users...</div>
          </div>
        ) : (
          <div className="glass rounded-lg border border-hacker-green/20 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-hacker-gray-light/50 border-b border-hacker-green/20">
                  <tr>
                    <th className="px-6 py-4 text-left text-hacker-cyan font-semibold">Username</th>
                    <th className="px-6 py-4 text-left text-hacker-cyan font-semibold">Email</th>
                    <th className="px-6 py-4 text-left text-hacker-cyan font-semibold">Role</th>
                    <th className="px-6 py-4 text-left text-hacker-cyan font-semibold">Points</th>
                    <th className="px-6 py-4 text-left text-hacker-cyan font-semibold">Solves</th>
                    <th className="px-6 py-4 text-left text-hacker-cyan font-semibold">Status</th>
                    <th className="px-6 py-4 text-left text-hacker-cyan font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user, index) => (
                    <motion.tr
                      key={user.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="border-b border-hacker-green/10 hover:bg-hacker-green/5 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <span className="text-hacker-green font-semibold">{user.username}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-gray-300">{user.email}</span>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleToggleRole(user)}
                          className={`px-3 py-1 rounded text-xs font-semibold flex items-center space-x-1 ${
                            user.role === 'admin'
                              ? 'bg-hacker-green/20 text-hacker-green'
                              : 'bg-gray-500/20 text-gray-400'
                          }`}
                        >
                          <Shield className="w-3 h-3" />
                          <span>{user.role}</span>
                        </button>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-hacker-cyan font-bold">{user.totalPoints}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-gray-300">{user.solvedCount}</span>
                      </td>
                      <td className="px-6 py-4">
                        {user.isBanned ? (
                          <span className="px-3 py-1 rounded text-xs font-semibold bg-red-500/20 text-red-400">
                            Banned
                          </span>
                        ) : (
                          <span className="px-3 py-1 rounded text-xs font-semibold bg-green-500/20 text-green-400">
                            Active
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleViewDetails(user)}
                            className="text-hacker-cyan hover:text-hacker-green transition-colors"
                            title="View Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleToggleBan(user)}
                            className={user.isBanned ? 'text-green-400' : 'text-red-400'}
                            title={user.isBanned ? 'Unban' : 'Ban'}
                          >
                            {user.isBanned ? (
                              <Unlock className="w-4 h-4" />
                            ) : (
                              <Ban className="w-4 h-4" />
                            )}
                          </button>
                          <button
                            onClick={() => handleResetPassword(user.id)}
                            className="text-yellow-400 hover:text-yellow-300 transition-colors"
                            title="Reset Password"
                          >
                            <Key className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
              {filteredUsers.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-400">No users found</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

