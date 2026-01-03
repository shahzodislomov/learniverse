"use client";

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Terminal, Trophy, Shield, Zap, ArrowRight } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.h1
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, type: "spring" }}
              className="text-6xl md:text-8xl font-bold mb-6 text-glow-green font-mono"
            >
              w3nac0de CTF
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="text-2xl md:text-3xl text-hacker-cyan mb-8 font-mono"
            >
              &gt; Capture The Flag Platform
            </motion.p>
            <p className="text-lg text-gray-300 mb-12 max-w-2xl mx-auto">
              Test your cybersecurity skills with real-world challenges. Hack, solve, and climb the
              leaderboard.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/challenges">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-hacker-green/20 text-hacker-green border border-hacker-green rounded hover:bg-hacker-green/30 transition-all font-semibold text-lg flex items-center space-x-2 shadow-glow-green-sm"
                >
                  <Terminal className="w-5 h-5" />
                  <span>Start Hacking</span>
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
              <Link href="/scoreboard">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 glass border border-hacker-cyan/30 text-hacker-cyan rounded hover:border-hacker-cyan transition-all font-semibold text-lg flex items-center space-x-2"
                >
                  <Trophy className="w-5 h-5" />
                  <span>View Scoreboard</span>
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-hacker-green">
            Challenge Categories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Shield, title: 'Web Security', desc: 'Exploit web vulnerabilities' },
              { icon: Zap, title: 'Cryptography', desc: 'Decrypt and decode secrets' },
              { icon: Terminal, title: 'Forensics', desc: 'Analyze digital evidence' },
              { icon: Shield, title: 'OSINT', desc: 'Open source intelligence gathering' },
              { icon: Zap, title: 'Reverse Engineering', desc: 'Dissect binaries and code' },
              { icon: Terminal, title: 'Miscellaneous', desc: 'Various security challenges' },
            ].map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="glass rounded-lg p-6 border border-hacker-green/20 hover:border-hacker-green/50 transition-all group hover:shadow-glow-green-sm"
                >
                  <Icon className="w-10 h-10 text-hacker-green mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="text-xl font-bold text-hacker-cyan mb-2 group-hover:text-hacker-green transition-colors">{feature.title}</h3>
                  <p className="text-gray-400 group-hover:text-gray-300 transition-colors">{feature.desc}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center glass rounded-lg p-12 border border-hacker-green/30">
          <h2 className="text-4xl font-bold mb-6 text-hacker-green">Ready to Hack?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Join the community and start solving challenges today.
          </p>
          <Link href="/register">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-hacker-green/20 text-hacker-green border border-hacker-green rounded hover:bg-hacker-green/30 transition-all font-semibold text-lg shadow-glow-green-sm"
            >
              Get Started
            </motion.button>
          </Link>
        </div>
      </section>
    </div>
  )
}

