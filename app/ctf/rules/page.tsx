"use client";

import { motion } from "framer-motion";
import { Shield, Flag, Users, Trophy, AlertTriangle, CheckCircle } from "lucide-react";

export default function RulesPage() {
  const rules = [
    {
      icon: Flag,
      title: "Flag Format",
      description: "All flags follow the format: WEN{flag_content_here}",
      color: "text-hacker-green",
    },
    {
      icon: Users,
      title: "Fair Play",
      description: "Each user must solve challenges individually. Team collaboration is not allowed.",
      color: "text-hacker-cyan",
    },
    {
      icon: Shield,
      title: "No Attacks",
      description: "Do not attack the CTF infrastructure or other players. Focus on solving challenges only.",
      color: "text-yellow-400",
    },
    {
      icon: Trophy,
      title: "First Blood Bonus",
      description: "The first person to solve a challenge receives 10% bonus points!",
      color: "text-red-400",
    },
    {
      icon: AlertTriangle,
      title: "No Brute Force",
      description: "Automated flag submission attempts are prohibited and will result in disqualification.",
      color: "text-orange-400",
    },
    {
      icon: CheckCircle,
      title: "Respect Others",
      description: "Do not share flags or solutions publicly. Help others learn without giving away answers.",
      color: "text-hacker-green",
    },
  ];

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-hacker-green mb-4 text-glow-green font-mono">
            CTF Rules
          </h1>
          <p className="text-gray-400 text-lg">
            Please read and follow these rules to ensure a fair and enjoyable experience for everyone.
          </p>
        </motion.div>

        {/* Rules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {rules.map((rule, index) => {
            const Icon = rule.icon;
            return (
              <motion.div
                key={rule.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass rounded-lg p-6 border border-hacker-green/20 hover:border-hacker-green/50 transition-all group"
              >
                <div className={`flex items-center space-x-3 mb-3`}>
                  <Icon className={`w-6 h-6 ${rule.color}`} />
                  <h3 className="text-xl font-bold text-hacker-cyan">{rule.title}</h3>
                </div>
                <p className="text-gray-400">{rule.description}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Scoring Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="glass rounded-lg p-8 border border-hacker-green/30 mb-8"
        >
          <h2 className="text-2xl font-bold text-hacker-green mb-4 flex items-center space-x-2">
            <Trophy className="w-6 h-6" />
            <span>Scoring System</span>
          </h2>
          <div className="space-y-4 text-gray-300">
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-hacker-green mt-1 flex-shrink-0" />
              <div>
                <strong className="text-hacker-cyan">Easy Challenges:</strong> 100-200 points
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-yellow-400 mt-1 flex-shrink-0" />
              <div>
                <strong className="text-hacker-cyan">Medium Challenges:</strong> 250-400 points
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-red-400 mt-1 flex-shrink-0" />
              <div>
                <strong className="text-hacker-cyan">Hard Challenges:</strong> 500-800 points
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Trophy className="w-5 h-5 text-red-400 mt-1 flex-shrink-0 animate-pulse" />
              <div>
                <strong className="text-red-400">First Blood Bonus:</strong> +50% points for the first solver
              </div>
            </div>
          </div>
        </motion.div>

        {/* Code of Conduct */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="glass rounded-lg p-8 border border-hacker-green/30"
        >
          <h2 className="text-2xl font-bold text-hacker-green mb-4 flex items-center space-x-2">
            <Shield className="w-6 h-6" />
            <span>Code of Conduct</span>
          </h2>
          <div className="space-y-3 text-gray-300">
            <p>
              We are committed to providing a welcoming and inclusive environment for all participants.
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Be respectful and professional in all communications</li>
              <li>Report any technical issues or rule violations to administrators</li>
              <li>Share knowledge and help others learn (without revealing solutions)</li>
              <li>Violations may result in point deductions or disqualification</li>
            </ul>
          </div>
        </motion.div>

        {/* Contact */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-12"
        >
          <p className="text-gray-500 text-sm">
            Questions about the rules? Contact the CTF administrators for clarification.
          </p>
        </motion.div>
      </div>
    </div>
  );
}