'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import PodCard from '../components/ui/PodCard'
import Button from '../components/ui/Button'
import Avatar from '../components/ui/Avatar'
import AuthService from '../services/Auth'
import { User, Bell, Trophy, Star, Plus, X, Search, Settings, LogOut, Mail, Edit3, ChevronDown } from 'lucide-react'

// Define TypeScript interfaces
interface Pod {
  id: number;
  name: string;
  description: string;
  skills: string[];
  members: number;
  joined: boolean;
}

interface Badge {
  id: number;
  name: string;
  icon: React.ReactNode;
  earned: boolean;
}

interface PodCardProps {
  pod: Pod;
  onJoin: (id: number) => void;
}

export default function Dashboard() {
  const router = useRouter();
  
  // User data state
  const [userName, setUserName] = useState('User');
  const [userEmail, setUserEmail] = useState('');

  // State for user skills
  const [skillsTeach, setSkillsTeach] = useState<string[]>(['React', 'Node.js'])
  const [skillsLearn, setSkillsLearn] = useState<string[]>(['AI', 'DevOps'])
  const [newSkillTeach, setNewSkillTeach] = useState('')
  const [newSkillLearn, setNewSkillLearn] = useState('')
  const [showSkillInputTeach, setShowSkillInputTeach] = useState(false)
  const [showSkillInputLearn, setShowSkillInputLearn] = useState(false)
  
  // State for pods with filtering and search
  const [pods, setPods] = useState<Pod[]>([
    { id: 1, name: 'AI Chatbot', description: 'Build a GPT-powered chatbot', skills: ['AI','React'], members: 5, joined: true },
    { id: 2, name: 'E-Commerce UI', description: 'Modern frontend for shopping app', skills: ['Tailwind','React'], members: 4, joined: false },
    { id: 3, name: 'DevOps Tools', description: 'CI/CD pipelines for projects', skills: ['DevOps','Docker'], members: 3, joined: false },
    { id: 4, name: 'Mobile App Dev', description: 'Cross-platform app with React Native', skills: ['React Native','JavaScript'], members: 6, joined: true },
    { id: 5, name: 'Data Visualization', description: 'Beautiful charts and graphs', skills: ['D3.js','React'], members: 3, joined: false },
  ])
  
  const [filteredPods, setFilteredPods] = useState<Pod[]>(pods)
  const [searchQuery, setSearchQuery] = useState('')
  const [activeFilter, setActiveFilter] = useState('all') // 'all', 'joined', 'available'
  
  // State for badges
  const [badges, setBadges] = useState<Badge[]>([
    { id: 1, name: 'Frontend Mentor', icon: <Star className="w-5 h-5 text-yellow-400" />, earned: true },
    { id: 2, name: 'AI Explorer', icon: <Trophy className="w-5 h-5 text-purple-400" />, earned: true },
    { id: 3, name: 'Skill Swapper', icon: <User className="w-5 h-5 text-blue-400" />, earned: true },
    { id: 4, name: 'Pod Leader', icon: <Trophy className="w-5 h-5 text-green-400" />, earned: false },
    { id: 5, name: 'Code Guru', icon: <Star className="w-5 h-5 text-red-400" />, earned: false },
  ])
  
  // State for mobile menu and user menu
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('pods') // For mobile view
  
  // Ref for user menu to handle click outside
  const userMenuRef = useRef<HTMLDivElement>(null)
  
  // Filter pods based on search and filter
  useEffect(() => {
    let result = pods
    
    // Apply filter
    if (activeFilter === 'joined') {
      result = result.filter(pod => pod.joined)
    } else if (activeFilter === 'available') {
      result = result.filter(pod => !pod.joined)
    }
    
    // Apply search
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(pod => 
        pod.name.toLowerCase().includes(query) || 
        pod.description.toLowerCase().includes(query) ||
        pod.skills.some(skill => skill.toLowerCase().includes(query))
      )
    }
    
    setFilteredPods(result)
  }, [pods, searchQuery, activeFilter])
  
  // Handle joining/leaving pods
  const toggleJoinPod = (id: number) => {
    // Check if user is authenticated with GitHub
    if (!AuthService.isGitHubAuthenticated()) {
      const confirmAuth = confirm('You need to authenticate with GitHub to join pods. Continue with GitHub?');
      if (confirmAuth) {
        console.log('🔐 GitHub authentication required for joining pod');
        AuthService.loginWithGitHub();
      }
      return;
    }

    setPods(pods.map(pod => 
      pod.id === id ? { ...pod, joined: !pod.joined } : pod
    ))
  }
  
  // Handle adding new skills
  const addSkillTeach = () => {
    if (newSkillTeach.trim() && !skillsTeach.includes(newSkillTeach)) {
      setSkillsTeach([...skillsTeach, newSkillTeach.trim()])
      setNewSkillTeach('')
    }
    setShowSkillInputTeach(false)
  }
  
  const addSkillLearn = () => {
    if (newSkillLearn.trim() && !skillsLearn.includes(newSkillLearn)) {
      setSkillsLearn([...skillsLearn, newSkillLearn.trim()])
      setNewSkillLearn('')
    }
    setShowSkillInputLearn(false)
  }
  
  // Handle removing skills
  const removeSkillTeach = (skillToRemove: string) => {
    setSkillsTeach(skillsTeach.filter(skill => skill !== skillToRemove))
  }
  
  const removeSkillLearn = (skillToRemove: string) => {
    setSkillsLearn(skillsLearn.filter(skill => skill !== skillToRemove))
  }

  // Load user data
  useEffect(() => {
    const updateUserData = () => {
      const user = AuthService.getCurrentUser();
      if (user) {
        setUserName(user.name || 'User');
        setUserEmail(user.email || '');
      }
    };

    // Initial load
    updateUserData();

    // Listen for user data updates
    window.addEventListener('userDataUpdated', updateUserData);

    return () => {
      window.removeEventListener('userDataUpdated', updateUserData);
    };
  }, []);

  // Handle logout
  const handleLogout = () => {
    console.log('🚪 Logout button clicked from Dashboard');
    setUserMenuOpen(false); // Close dropdown
    AuthService.logout();
    console.log('✅ Auth data cleared, redirecting to homepage...');
    router.push('/');
    // Force page reload to ensure clean state
    setTimeout(() => {
      window.location.href = '/';
    }, 100);
  };

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuOpen && userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [userMenuOpen])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white p-4 md:p-6">
      {/* Topbar */}
      <header className="flex items-center justify-between mb-6 md:mb-8">
        <div className="flex items-center">
          <button 
            className="lg:hidden mr-3"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <div className="space-y-1.5">
              <div className="w-6 h-0.5 bg-white"></div>
              <div className="w-6 h-0.5 bg-white"></div>
              <div className="w-6 h-0.5 bg-white"></div>
            </div>
          </button>
          <h1 className="text-xl md:text-2xl font-bold">🚀 CodePods</h1>
        </div>
        <div className="flex items-center gap-3 md:gap-4">
          <div className="relative hidden md:block">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2. 5" />
            <input 
              type="text" 
              placeholder="Search pods..." 
              className="bg-gray-800 rounded-full pl-10 pr-4 py-2 text-sm w-40 lg:w-56 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Bell className="w-5 h-5 md:w-6 md:h-6 text-gray-400 hover:text-white cursor-pointer" />
          
          {/* User Menu */}
          <div className="relative user-menu" ref={userMenuRef}>
            <button 
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
              onClick={() => setUserMenuOpen(!userMenuOpen)}
            >
              <Avatar name={userName} size={40} />
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </button>
            
            <AnimatePresence>
              {userMenuOpen && (
                <motion.div 
                  className="absolute right-0 top-12 bg-gray-800 rounded-lg shadow-lg py-2 w-48 z-50"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="px-4 py-2 border-b border-gray-700">
                    <p className="font-medium truncate">{userName}</p>
                    <p className="text-sm text-gray-400 truncate">{userEmail || 'No email'}</p>
                  </div>
                  
                  <button className="w-full text-left px-4 py-2 hover:bg-gray-700 flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>Profile</span>
                  </button>
                  
                  <button className="w-full text-left px-4 py-2 hover:bg-gray-700 flex items-center gap-2">
                    <Settings className="w-4 h-4" />
                    <span>Settings</span>
                  </button>
                  
                  <button className="w-full text-left px-4 py-2 hover:bg-gray-700 flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    <span>Messages</span>
                  </button>
                  
                  <div className="border-t border-gray-700 my-1"></div>
                  
                  <button 
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-gray-700 text-red-400 flex items-center gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </header>

      {/* Mobile Search */}
      <div className="md:hidden mb-4">
        <div className="relative">
          <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
          <input 
            type="text" 
            placeholder="Search pods..." 
            className="bg-gray-800 rounded-full pl-10 pr-4 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            className="fixed inset-0 bg-gray-900 z-50 lg:hidden"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
          >
            <div className="p-5">
              <div className="flex justify-between items-center mb-8">
                <h1 className="text-xl font-bold">🚀 CodePods</h1>
                <button onClick={() => setMobileMenuOpen(false)}>
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <nav className="space-y-6">
                <button 
                  className={`flex items-center gap-3 text-lg ${activeSection === 'pods' ? 'text-indigo-400' : ''}`}
                  onClick={() => { setActiveSection('pods'); setMobileMenuOpen(false); }}
                >
                  <User className="w-5 h-5" />
                  <span>My Pods</span>
                </button>
                
                <button 
                  className={`flex items-center gap-3 text-lg ${activeSection === 'skills' ? 'text-indigo-400' : ''}`}
                  onClick={() => { setActiveSection('skills'); setMobileMenuOpen(false); }}
                >
                  <Settings className="w-5 h-5" />
                  <span>Skills</span>
                </button>
                
                <button 
                  className={`flex items-center gap-3 text-lg ${activeSection === 'badges' ? 'text-indigo-400' : ''}`}
                  onClick={() => { setActiveSection('badges'); setMobileMenuOpen(false); }}
                >
                  <Trophy className="w-5 h-5" />
                  <span>Badges</span>
                </button>
                
                <button 
                  onClick={handleLogout}
                  className="flex items-center gap-3 text-lg text-red-400 mt-10"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Logout</span>
                </button>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 md:gap-6">
        {/* Pods Section */}
        <motion.section
          className="col-span-2 bg-white/5 p-4 md:p-5 rounded-2xl shadow-lg"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-3">
            <h2 className="text-xl font-semibold">🔥 Active Pods</h2>
            
            <div className="flex gap-2">
              <button 
                className={`px-3 py-1 rounded-full text-sm ${activeFilter === 'all' ? 'bg-indigo-600' : 'bg-gray-700'}`}
                onClick={() => setActiveFilter('all')}
              >
                All
              </button>
              <button 
                className={`px-3 py-1 rounded-full text-sm ${activeFilter === 'joined' ? 'bg-indigo-600' : 'bg-gray-700'}`}
                onClick={() => setActiveFilter('joined')}
              >
                Joined
              </button>
              <button 
                className={`px-3 py-1 rounded-full text-sm ${activeFilter === 'available' ? 'bg-indigo-600' : 'bg-gray-700'}`}
                onClick={() => setActiveFilter('available')}
              >
                Available
              </button>
            </div>
          </div>
          
          {filteredPods.length > 0 ? (
            <div className="space-y-3">
              {filteredPods.map((pod) => (
                <PodCard 
                  key={pod.id} 
                  pod={pod} 
                  onJoin={() => toggleJoinPod(pod.id)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-400">
              <p>No pods found matching your criteria.</p>
            </div>
          )}
        </motion.section>

        {/* Right Sidebar */}
        <div className="space-y-5 md:space-y-6">
          {/* Skill Swap */}
          <motion.section
            className="bg-white/5 p-4 md:p-5 rounded-2xl shadow-lg"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-lg font-semibold mb-3">🔄 Skill Swap</h2>
            
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <p className="text-sm text-gray-400">I can Teach:</p>
                <button 
                  className="text-indigo-400 text-sm flex items-center"
                  onClick={() => setShowSkillInputTeach(true)}
                >
                  <Plus className="w-4 h-4 mr-1" /> Add
                </button>
              </div>
              
              {showSkillInputTeach ? (
                <div className="flex gap-2 mb-2">
                  <input 
                    type="text" 
                    className="flex-1 bg-gray-800 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Add skill..."
                    value={newSkillTeach}
                    onChange={(e) => setNewSkillTeach(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && addSkillTeach()}
                    autoFocus
                  />
                  <button 
                    className="bg-indigo-600 px-3 rounded-md text-sm"
                    onClick={addSkillTeach}
                  >
                    Add
                  </button>
                  <button 
                    className="bg-gray-700 px-3 rounded-md text-sm"
                    onClick={() => setShowSkillInputTeach(false)}
                  >
                    Cancel
                  </button>
                </div>
              ) : null}
              
              <div className="flex gap-2 flex-wrap">
                {skillsTeach.map((skill) => (
                  <span key={skill} className="px-3 py-1 rounded-full bg-indigo-600 text-sm flex items-center">
                    {skill}
                    <button 
                      className="ml-1.5 text-xs"
                      onClick={() => removeSkillTeach(skill)}
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <p className="text-sm text-gray-400">I want to Learn:</p>
                <button 
                  className="text-purple-400 text-sm flex items-center"
                  onClick={() => setShowSkillInputLearn(true)}
                >
                  <Plus className="w-4 h-4 mr-1" /> Add
                </button>
              </div>
              
              {showSkillInputLearn ? (
                <div className="flex gap-2 mb-2">
                  <input 
                    type="text" 
                    className="flex-1 bg-gray-800 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Add skill..."
                    value={newSkillLearn}
                    onChange={(e) => setNewSkillLearn(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && addSkillLearn()}
                    autoFocus
                  />
                  <button 
                    className="bg-purple-600 px-3 rounded-md text-sm"
                    onClick={addSkillLearn}
                  >
                    Add
                  </button>
                  <button 
                    className="bg-gray-700 px-3 rounded-md text-sm"
                    onClick={() => setShowSkillInputLearn(false)}
                  >
                    Cancel
                  </button>
                </div>
              ) : null}
              
              <div className="flex gap-2 flex-wrap">
                {skillsLearn.map((skill) => (
                  <span key={skill} className="px-3 py-1 rounded-full bg-purple-600 text-sm flex items-center">
                    {skill}
                    <button 
                      className="ml-1.5 text-xs"
                      onClick={() => removeSkillLearn(skill)}
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </motion.section>

          {/* Badges */}
          <motion.section
            className="bg-white/5 p-4 md:p-5 rounded-2xl shadow-lg"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-lg font-semibold mb-3">🏆 Badges</h2>
            <div className="grid grid-cols-2 gap-3">
              {badges.map((b) => (
                <div 
                  key={b.id} 
                  className={`flex flex-col items-center justify-center p-3 rounded-xl ${b.earned ? 'bg-indigo-900/30' : 'bg-gray-800/30 opacity-50'}`}
                >
                  <div className="mb-1.5">{b.icon}</div>
                  <span className="text-xs text-center">{b.name}</span>
                  {!b.earned && <span className="text-[10px] text-gray-400 mt-1">Locked</span>}
                </div>
              ))}
            </div>
          </motion.section>

          {/* AI Suggestion */}
          <motion.section
            className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4 md:p-5 rounded-2xl shadow-lg"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-lg font-bold mb-2">🤖 AI Suggestion</h2>
            <p className="text-sm text-white/90 mb-3">
              Based on your skills, we suggest you join the <span className="font-semibold">AI Chatbot Pod</span> as a <span className="font-semibold">Frontend Developer</span>.
            </p>
            <Button className="w-full">Join Pod</Button>
          </motion.section>
        </div>
      </div>
    </div>
  )
}