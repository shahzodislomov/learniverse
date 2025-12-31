'use client'

import { motion } from 'framer-motion'
import { Shield, AlertTriangle, Mail, MessageCircle, Info } from 'lucide-react'

export default function RulesPage() {
  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-center"
        >
          <Shield className="w-16 h-16 text-hacker-green mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold text-hacker-green mb-4 text-glow-green font-mono">
            Platform Rules
          </h1>
          <p className="text-gray-400 text-lg">Guidelines for fair and ethical competition</p>
        </motion.div>

        {/* Platform Rules */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass rounded-lg p-8 border border-hacker-green/20 mb-6"
        >
          <h2 className="text-2xl font-bold text-hacker-cyan mb-6 flex items-center space-x-2">
            <AlertTriangle className="w-6 h-6" />
            <span>Platform Rules</span>
          </h2>
          <div className="space-y-4">
            {[
              {
                rule: 'No DDoS or traffic flooding',
                description: 'Do not attempt to overwhelm platform services with excessive requests or traffic.',
              },
              {
                rule: 'No brute forcing platform services',
                description: 'Automated brute force attacks against platform infrastructure are strictly prohibited.',
              },
              {
                rule: 'No platform exploitation or infrastructure attacks',
                description: 'Do not attempt to exploit vulnerabilities in the CTF platform itself. Only target challenge environments.',
              },
              {
                rule: 'No flag sharing',
                description: 'Do not share flags with other participants. Each user must solve challenges independently.',
              },
              {
                rule: 'No cheating or automation',
                description: 'Use of automated tools, scripts, or unfair advantages to solve challenges is not allowed.',
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="flex items-start space-x-3 p-4 bg-hacker-dark rounded border border-red-500/20"
              >
                <span className="text-red-400 font-bold text-xl">❌</span>
                <div>
                  <h3 className="text-hacker-green font-semibold mb-1">{item.rule}</h3>
                  <p className="text-gray-400 text-sm">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Additional Notes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="glass rounded-lg p-8 border border-hacker-green/20 mb-6"
        >
          <h2 className="text-2xl font-bold text-hacker-cyan mb-6 flex items-center space-x-2">
            <Info className="w-6 h-6" />
            <span>Additional Notes</span>
          </h2>
          <div className="space-y-3 text-gray-300">
            <p>
              <span className="text-hacker-green font-semibold">• Challenges are unlimited:</span>{' '}
              There are no time limits or expiration dates. Take your time to solve challenges
              properly.
            </p>
            <p>
              <span className="text-hacker-green font-semibold">• Admin decisions are final:</span>{' '}
              All decisions regarding rule violations, scoring, and platform management are made by
              administrators and are final.
            </p>
            <p>
              <span className="text-hacker-green font-semibold">• Fair play:</span> Respect other
              participants and maintain a positive competitive environment.
            </p>
          </div>
        </motion.div>

        {/* Contact Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="glass rounded-lg p-8 border border-hacker-green/20"
        >
          <h2 className="text-2xl font-bold text-hacker-cyan mb-6 flex items-center space-x-2">
            <MessageCircle className="w-6 h-6" />
            <span>Reporting & Suggestions</span>
          </h2>
          <p className="text-gray-400 mb-4">
            For suggestions, bug reports, or to report rule violations:
          </p>
          <div className="space-y-3">
            <motion.a
              href="https://t.me/v3xura"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              className="flex items-center space-x-3 p-4 bg-hacker-dark rounded border border-hacker-green/20 hover:border-hacker-green/50 transition-all group"
            >
              <MessageCircle className="w-5 h-5 text-hacker-cyan group-hover:text-hacker-green transition-colors" />
              <div>
                <p className="text-hacker-green font-semibold">Telegram</p>
                <p className="text-gray-400 text-sm">@v3xura</p>
              </div>
            </motion.a>
            <motion.a
              href="mailto:abdullohkurbonov2008@gmail.com"
              whileHover={{ scale: 1.02 }}
              className="flex items-center space-x-3 p-4 bg-hacker-dark rounded border border-hacker-green/20 hover:border-hacker-green/50 transition-all group"
            >
              <Mail className="w-5 h-5 text-hacker-cyan group-hover:text-hacker-green transition-colors" />
              <div>
                <p className="text-hacker-green font-semibold">Email</p>
                <p className="text-gray-400 text-sm">abdullohkurbonov2008@gmail.com</p>
              </div>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

