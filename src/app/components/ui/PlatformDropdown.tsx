'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { FaChevronDown, FaBook, FaUsers, FaTrophy, FaCode, FaGraduationCap } from 'react-icons/fa';

export default function PlatformDropdown() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const platformItems = [
    { name: 'Courses', icon: <FaBook />, href: '/courses', description: 'Browse learning courses' },
    { name: 'Pods', icon: <FaUsers />, href: '/dashboard', description: 'Join collaboration pods' },
    { name: 'Rewards', icon: <FaTrophy />, href: '/rewards', description: 'View your achievements' },
    { name: 'Projects', icon: <FaCode />, href: '/projects', description: 'Explore projects' },
    { name: 'Learning Path', icon: <FaGraduationCap />, href: '/learning-path', description: 'Your learning journey' },
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleNavigate = (href: string) => {
    setIsOpen(false);
    router.push(href);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition text-white font-medium"
      >
        <span>Platform</span>
        <FaChevronDown className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-64 bg-gray-800 rounded-lg shadow-lg border border-gray-700 z-50 overflow-hidden">
          {platformItems.map((item, index) => (
            <button
              key={index}
              onClick={() => handleNavigate(item.href)}
              className="w-full flex items-start gap-3 p-4 hover:bg-gray-700 transition text-left border-b border-gray-700 last:border-b-0"
            >
              <div className="text-indigo-400 text-xl mt-1">
                {item.icon}
              </div>
              <div className="flex-1">
                <div className="text-white font-semibold">{item.name}</div>
                <div className="text-gray-400 text-sm">{item.description}</div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}


