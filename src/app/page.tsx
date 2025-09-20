import Link from 'next/link'
import Button from '../app/components/ui/Button'
import Card from '../app/components/ui/Card'
import PodCard from '../app/components/ui/PodCard'

export default function Landing() {
  const pods = [
    { name: 'AI Chatbot', description: 'Build a modular chatbot', skills: ['AI','React'], members: 6 },
    { name: 'E-Commerce UI', description: 'Modern front-end', skills: ['React','Tailwind'], members: 4 }
  ]

  return (
    <div className="min-h-screen p-8">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold">CP</div>
          <div>
            <div className="text-xl font-bold">CodePods</div>
            <div className="text-sm text-gray-400">Collaborate. Build. Learn.</div>
          </div>
        </div>
        <div className="flex gap-3">
          <Link href="/login" className="px-4 py-2 rounded-xl bg-white/5">Log in</Link>
          <Link href="/signup"><Button>Create Account</Button></Link>
        </div>
      </header>

      <main className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <section>
          <h1 className="text-5xl font-extrabold leading-tight">Collaborate. Build. Learn. Together.</h1>
          <p className="mt-4 text-gray-300 max-w-xl">Join pods, swap skills, and build real projects with other developers. Earn Skill-Credits and showcase verified proof-of-skill in your portfolio.</p>

          <div className="mt-6 flex gap-3">
            <Link href="/dashboard"><Button size="lg">Join a Pod</Button></Link>
            <Link href="/dashboard"><Button variant="ghost" size="lg">Create a Pod</Button></Link>
          </div>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Card>AI-Powered Swap Advisor</Card>
            <Card>Proof-of-Skill Portfolio</Card>
            <Card>Skill-Credits System</Card>
            <Card>Group Pods for collaboration</Card>
          </div>
        </section>

        <section className="space-y-4">
          <div className="text-sm text-gray-400">Featured Pods</div>
          {pods.map(p => <PodCard key={p.name} pod={p} />)}
        </section>
      </main>
    </div>
  )
}
