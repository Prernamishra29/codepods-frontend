'use client';

import Card from '../components/ui/Card'
import PodCard from '../components/ui/PodCard'

export default function Profile() {
  const skills = ['React', 'Tailwind', 'AI', 'Node.js']

  const pods = [
    {
      id: 1,
      name: 'AI Chatbot',
      description: 'Build a modular chatbot',
      skills: ['AI', 'React'],
      members: 6,
      joined: true,
    },
  ]

  // Add a dummy join handler (you can later expand this)
  const handleJoin = (podId: number) => {
    console.log(`Joining pod with ID: ${podId}`)
  }

  return (
    <div className="p-8 space-y-6">
      <Card>
        <h2 className="text-xl font-bold">Prerna Mishra</h2>
        <p className="text-gray-400 mt-1">
          Fullstack Developer | AI Enthusiast
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {skills.map((skill) => (
            <span
              key={skill}
              className="bg-indigo-500 px-2 py-1 rounded-full text-sm"
            >
              {skill}
            </span>
          ))}
        </div>
      </Card>

      <div>
        <h3 className="text-lg font-bold mb-2">Pods Contributed</h3>
        {pods.map((p) => (
          <PodCard key={p.id} pod={p} onJoin={handleJoin} />
        ))}
      </div>
    </div>
  )
}
