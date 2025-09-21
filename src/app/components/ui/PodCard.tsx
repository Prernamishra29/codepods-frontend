// src/components/ui/PodCard.tsx
"use client";

import React from "react"

interface Pod {
  id: number
  name: string
  description: string
  skills: string[]
  members: number
  joined: boolean
}

interface PodCardProps {
  pod: Pod
  onJoin: (id: number) => void   // <-- ADD THIS
}

const PodCard: React.FC<PodCardProps> = ({ pod, onJoin }) => {
  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-bold">{pod.name}</h3>
      <p className="text-sm text-gray-400 mb-2">{pod.description}</p>
      <div className="flex gap-2 mb-3">
        {pod.skills.map((s, i) => (
          <span key={i} className="px-2 py-1 bg-indigo-600 rounded text-xs">
            {s}
          </span>
        ))}
      </div>
      <button
        onClick={() => onJoin(pod.id)}
        className={`px-3 py-1 rounded-md text-sm ${
          pod.joined ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"
        }`}
      >
        {pod.joined ? "Leave Pod" : "Join Pod"}
      </button>
    </div>
  )
}

export default PodCard
