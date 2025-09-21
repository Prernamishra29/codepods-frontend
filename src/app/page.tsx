'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import Button from '../app/components/ui/Button'
import Card from '../app/components/ui/Card'
import PodCard from '../app/components/ui/PodCard'

export default function Landing() {
  const pods = [
    { id: 1, name: 'AI Chatbot', description: 'Build a modular chatbot', skills: ['AI','React'], members: 6, joined: false },
    { id: 2, name: 'E-Commerce UI', description: 'Modern front-end', skills: ['React','Tailwind'], members: 4, joined: true }
  ]

  const handleJoinPod = (name: string) => {
    alert(`Joined pod: ${name}`)
  }

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      
      {/* Header */}
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg shadow-lg">CP</div>
          <div>
            <div className="text-xl font-bold">CodePods</div>
            <div className="text-sm text-gray-400">Collaborate. Build. Learn.</div>
          </div>
        </div>
        <div className="flex gap-3">
          <Link href="/login" className="px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 transition">Log in</Link>
          <Link href="/signup"><Button size="lg">Create Account</Button></Link>
        </div>
      </header>

      {/* Hero */}
      <main className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <section className="space-y-6">
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
            Collaborate. Build. Learn. Together.
          </h1>
          <p className="text-gray-300 max-w-xl text-lg">
            Join pods, swap skills, and build real projects with other developers. Earn Skill-Credits and showcase verified proof-of-skill in your portfolio.
          </p>

          <div className="flex gap-4">
            <Link href="/dashboard">
              <Button size="lg" className="hover:scale-105 transition-transform">Join a Pod</Button>
            </Link>
            <Link href="/dashboard">
              <Button variant="ghost" size="lg" className="hover:scale-105 transition-transform">Create a Pod</Button>
            </Link>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
            {['AI-Powered Swap Advisor', 'Proof-of-Skill Portfolio', 'Skill-Credits System', 'Group Pods for collaboration'].map((feat, i) => (
              <motion.div
                key={i}
                className="p-4 rounded-xl bg-white/5 hover:bg-white/10 transition cursor-pointer shadow-md"
                whileHover={{ scale: 1.05 }}
              >
                {feat}
              </motion.div>
            ))}
          </div>
        </section>

        {/* Featured Pods */}
        <section className="space-y-6">
          <div className="text-sm text-gray-400 mb-2">Featured Pods</div>
          <div className="space-y-4">
            {pods.map((p) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02 }}
                className="bg-white/5 p-4 rounded-xl hover:bg-white/10 transition cursor-pointer shadow-lg"
              >
                <PodCard pod={p} onJoin={() => handleJoinPod(p.name)} />
                <div className="mt-2 flex flex-wrap gap-2">
                  {p.skills.map((s) => (
                    <span key={s} className="px-2 py-1 text-xs bg-indigo-600 rounded-full">{s}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
