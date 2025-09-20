'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { User, Bell, Trophy, Star } from 'lucide-react'
import PodCard from '../components/ui/PodCard'
import Button from '../components/ui/Button'

export default function Dashboard() {
  const [pods] = useState([
    { name: 'AI Chatbot', description: 'Modular chatbot using LLMs', skills: ['AI', 'React'], members: 6 },
    { name: 'E-Commerce UI', description: 'Modern frontend with Tailwind', skills: ['React', 'Tailwind'], members: 4 },
    { name: 'Game Dev', description: 'Multiplayer web game', skills: ['WebSockets', 'Phaser'], members: 5 },
  ])

  const stats = [
    { label: 'Pods Joined', value: 3 },
    { label: 'Skill-Credits', value: 120 },
    { label: 'Achievements', value: 8 },
    { label: 'Active Streak', value: '12 days' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white p-8">
      {/* Topbar */}
      <header className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">🚀 Dashboard</h1>
        <div className="flex items-center gap-4">
          <motion.div whileHover={{ scale: 1.2 }}>
            <Bell className="w-6 h-6 cursor-pointer text-gray-300 hover:text-white" />
          </motion.div>
          <motion.div whileHover={{ scale: 1.2 }}>
            <User className="w-8 h-8 cursor-pointer text-gray-300 hover:text-white" />
          </motion.div>
        </div>
      </header>

      {/* Stats Section */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="rounded-2xl bg-white/10 p-6 text-center backdrop-blur-xl border border-white/10 shadow-lg"
          >
            <div className="text-3xl font-extrabold">{s.value}</div>
            <div className="mt-1 text-sm text-gray-400">{s.label}</div>
          </motion.div>
        ))}
      </section>

      {/* Pods Section */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Your Pods</h2>
          <Button size="sm">+ New Pod</Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pods.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.15 }}
            >
              <PodCard pod={p} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Achievements Section */}
      <section className="mt-16">
        <h2 className="text-2xl font-bold mb-6">🏆 Achievements</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {['Hackathon Hero', 'Bug Hunter', 'Pod Leader', 'Skill Master'].map((ach, i) => (
            <motion.div
              key={ach}
              whileHover={{ scale: 1.05, rotate: 2 }}
              className="rounded-xl bg-gradient-to-br from-purple-600 to-indigo-600 p-6 flex flex-col items-center justify-center shadow-lg"
            >
              {i % 2 === 0 ? <Trophy className="w-10 h-10 mb-3" /> : <Star className="w-10 h-10 mb-3" />}
              <div className="font-medium">{ach}</div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  )
}
