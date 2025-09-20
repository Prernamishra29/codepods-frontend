interface PodCardProps {
  pod: {
    name: string
    description: string
    skills: string[]
    members: number
  }
}

export default function PodCard({ pod }: PodCardProps) {
  return (
    <div className="bg-gray-800 p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow">
      <h3 className="font-bold text-lg text-white">{pod.name}</h3>
      <p className="text-gray-400 mt-1">{pod.description}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {pod.skills.map((skill) => (
          <span
            key={skill}
            className="bg-indigo-500 px-2 py-1 rounded-full text-sm font-medium"
          >
            {skill}
          </span>
        ))}
      </div>
      <div className="mt-3 text-gray-400 text-sm">{pod.members} members</div>
    </div>
  )
}
