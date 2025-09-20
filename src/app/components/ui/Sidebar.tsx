import Link from 'next/link'
import { FaHome, FaUsers, FaPlusCircle, FaAward, FaUser } from 'react-icons/fa'

export default function Sidebar() {
  const navItems = [
    { name: 'Dashboard', icon: <FaHome />, href: '/dashboard' },
    { name: 'My Pods', icon: <FaUsers />, href: '/dashboard' },
    { name: 'Create Pod', icon: <FaPlusCircle />, href: '/dashboard' },
    { name: 'Rewards', icon: <FaAward />, href: '/rewards' },
    { name: 'Profile', icon: <FaUser />, href: '/profile' },
  ]

  return (
    <aside className="w-64 bg-gray-900 min-h-screen p-6 hidden md:flex flex-col gap-6">
      <div className="text-2xl font-bold text-indigo-500 mb-8">CodePods</div>
      <nav className="flex flex-col gap-3">
        {navItems.map(item => (
          <Link
            key={item.name}
            href={item.href}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition"
          >
            {item.icon} <span>{item.name}</span>
          </Link>
        ))}
      </nav>
    </aside>
  )
}
