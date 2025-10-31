'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { FaBell, FaSignOutAlt } from 'react-icons/fa';
import Avatar from './Avatar';
import AuthService from '@/app/services/Auth';

export default function Topbar() {
  const router = useRouter();
  const [userName, setUserName] = useState('User');
  const [userEmail, setUserEmail] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Update user data from localStorage
    const updateUserData = () => {
      const user = AuthService.getCurrentUser();
      if (user) {
        setUserName(user.name || 'User');
        setUserEmail(user.email || '');
      }
    };

    // Initial load
    updateUserData();

    // Listen for storage changes (when user logs in from another tab or component)
    window.addEventListener('storage', updateUserData);
    
    // Custom event for same-tab updates
    window.addEventListener('userDataUpdated', updateUserData);

    return () => {
      window.removeEventListener('storage', updateUserData);
      window.removeEventListener('userDataUpdated', updateUserData);
    };
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    }
    
    if (showDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showDropdown]);

  const handleLogout = () => {
    console.log('🚪 Logout button clicked');
    setShowDropdown(false); // Close dropdown first
    AuthService.logout();
    console.log('✅ Auth data cleared, redirecting to homepage...');
    router.push('/');
    // Force page reload to ensure clean state
    setTimeout(() => {
      window.location.href = '/';
    }, 100);
  };

  return (
    <div className="flex justify-between items-center bg-gray-900 p-4 shadow-md">
      <div className="text-xl font-bold text-white">Dashboard</div>
      <div className="flex items-center gap-4">
        <FaBell className="text-gray-300 text-lg cursor-pointer hover:text-white transition" />
        
        {/* User Menu */}
        <div className="relative" ref={dropdownRef}>
          <div 
            onClick={() => setShowDropdown(!showDropdown)}
            className="cursor-pointer"
          >
            <Avatar name={userName} />
          </div>
          
          {/* Dropdown Menu */}
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-56 bg-gray-800 rounded-lg shadow-lg border border-gray-700 z-10">
              <div className="p-3 border-b border-gray-700">
                <p className="text-white font-semibold truncate">{userName}</p>
                <p className="text-gray-400 text-sm truncate">
                  {userEmail || 'No email'}
                </p>
              </div>
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2 p-3 text-red-500 hover:bg-red-500/10 transition rounded-b-lg"
              >
                <FaSignOutAlt /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
