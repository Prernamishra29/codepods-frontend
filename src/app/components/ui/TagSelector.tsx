'use client'

import { useState } from 'react'

const skills = ['React', 'Node.js', 'AI', 'Python', 'Tailwind', 'Java', 'Kotlin']

export default function TagSelector() {
  const [selected, setSelected] = useState<string[]>([])

  const toggleSkill = (skill: string) => {
    setSelected(prev =>
      prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
    )
  }

  return (
    <div>
      <label className="text-gray-300 mb-2 block">Select your skills</label>
      <div className="flex flex-wrap gap-2">
        {skills.map(skill => (
          <button
            key={skill}
            type="button"
            onClick={() => toggleSkill(skill)}
            className={`px-3 py-1 rounded-full border transition ${
              selected.includes(skill)
                ? 'bg-indigo-500 text-white border-indigo-500'
                : 'bg-gray-700 text-gray-300 border-gray-600'
            }`}
          >
            {skill}
          </button>
        ))}
      </div>
    </div>
  )
}
