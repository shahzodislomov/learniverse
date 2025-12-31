'use client'

import { motion } from 'framer-motion'
import { Shield, Home, AlertTriangle } from 'lucide-react'
import Link from 'next/link'

export default function ForbiddenPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center"
      >
        <motion.div
          animate={{ rotate: [0, 10, -10, 10, 0] }}
          transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
        >
          <Shield className="w-24 h-24 text-red-400 mx-auto mb-6" />
        </motion.div>
        <h1 className="text-6xl font-bold text-red-400 mb-4 text-glow-cyan font-mono">403</h1>
        <h2 className="text-3xl font-bold text-hacker-green mb-4">Access Forbidden</h2>
        <p className="text-gray-400 mb-8 text-lg">
          You don&apos;t have permission to access this resource.
        </p>
        <div className="flex items-center justify-center space-x-4">
          <Link href="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-hacker-green/20 text-hacker-green border border-hacker-green rounded hover:bg-hacker-green/30 transition-all font-semibold flex items-center space-x-2"
            >
              <Home className="w-5 h-5" />
              <span>Go Home</span>
            </motion.button>
          </Link>
        </div>
      </motion.div>
    </div>
  )
}

