import Card from './Card'
import { FaRobot } from 'react-icons/fa'

export default function AIRoadmap() {
  const milestones = [
    'Define project scope',
    'Set up frontend structure',
    'Integrate AI APIs',
    'Connect database',
    'Deploy to production'
  ]

  return (
    <Card className="space-y-3">
      <div className="flex items-center gap-2 text-indigo-400 font-bold">
        <FaRobot /> AI Roadmap Generator
      </div>
      <ul className="list-decimal list-inside text-gray-300">
        {milestones.map(m => (
          <li key={m}>{m}</li>
        ))}
      </ul>
    </Card>
  )
}
