'use client';

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FaHome, FaUsers, FaPlusCircle, FaAward, FaUser, FaSignOutAlt } from 'react-icons/fa'
import AuthService from '@/app/services/Auth'

export default function Sidebar() {
  const router = useRouter();
  
  const navItems = [
    { name: 'Dashboard', icon: <FaHome />, href: '/dashboard' },
    { name: 'My Pods', icon: <FaUsers />, href: '/dashboard' },
    { name: 'Create Pod', icon: <FaPlusCircle />, href: '/dashboard' },
    { name: 'Rewards', icon: <FaAward />, href: '/rewards' },
    { name: 'Profile', icon: <FaUser />, href: '/profile' },
  ]

  const handleLogout = () => {
    console.log('🚪 Logout button clicked from Sidebar');
    AuthService.logout();
    console.log('✅ Auth data cleared, redirecting to homepage...');
    router.push('/');
    // Force page reload to ensure clean state
    setTimeout(() => {
      window.location.href = '/';
    }, 100);
  };

  return (
    <aside className="w-64 bg-gray-900 min-h-screen p-6 hidden md:flex flex-col justify-between">
      <div>
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
      </div>
      
      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="flex items-center gap-3 p-3 rounded-lg hover:bg-red-600 bg-red-500/10 border border-red-500 text-red-500 hover:text-white transition mt-6"
      >
        <FaSignOutAlt /> <span>Logout</span>
      </button>
    </aside>
  )
}
