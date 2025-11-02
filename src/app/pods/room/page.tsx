'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, Github, Users, Edit3, UserPlus, LogOut,
  Sparkles, CheckCircle2, Circle, ExternalLink, Star,
  Clock, PlayCircle, CheckCircle
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import Button from '@/app/components/ui/Button';
import Avatar from '@/app/components/ui/Avatar';
import RoadmapModal from '@/app/components/ui/RoadmapModal';
import { fetchAIRoadmap } from '@/app/services/roadmapAI';

interface Task {
  id: string;
  title: string;
  status: 'pending' | 'in-progress' | 'done';
  subtasks?: {
    total: number;
    completed: number;
  };
}

interface Member {
  id: string;
  name: string;
  role: string;
  githubUrl: string;
  isAdmin: boolean;
  tasks: Task[];
}

interface RoadmapPhase {
  id: string;
  title: string;
  weekRange: string;
  tasks: string[];
  completed: number;
  total: number;
}

interface PodData {
  id: string;
  name: string;
  description: string;
  members: Member[];
  progress: number;
  repo: {
    name: string;
    commits: number;
    stars: number;
  } | null;
}

export default function PodRoomPage() {
  const router = useRouter();
  const [isGeneratingTasks, setIsGeneratingTasks] = useState(false);
  const [showGenerateTasks, setShowGenerateTasks] = useState(false);
  const [tasksGenerated, setTasksGenerated] = useState(false);
  const [roadmapPhases, setRoadmapPhases] = useState<RoadmapPhase[]>([]);
  const [podData, setPodData] = useState<PodData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [roadmapModalOpen, setRoadmapModalOpen] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);

  useEffect(() => {
    const fetchPodData = async () => {
      await new Promise(resolve => setTimeout(resolve, 500));

      setPodData({
        id: '1',
        name: 'AI Chatbot Project',
        description: 'Build a GPT-powered chatbot with modern UI and advanced features',
        members: [
          { id: '1', name: 'John Doe', role: 'Full Stack Developer', githubUrl: 'https://github.com/johndoe', isAdmin: true, tasks: [] },
          { id: '2', name: 'Jane Smith', role: 'UI/UX Designer', githubUrl: 'https://github.com/janesmith', isAdmin: false, tasks: [] },
          { id: '3', name: 'Mike Johnson', role: 'Backend Engineer', githubUrl: 'https://github.com/mikejohnson', isAdmin: false, tasks: [] },
          { id: '4', name: 'Sarah Wilson', role: 'Frontend Developer', githubUrl: 'https://github.com/sarahwilson', isAdmin: false, tasks: [] }
        ],
        progress: 0,
        repo: {
          name: 'ai-chatbot-project',
          commits: 142,
          stars: 23
        }
      });

      setIsLoading(false);
    };

    fetchPodData();
  }, []);

  const handleAiRoadmap = async (description: string) => {
    setModalLoading(true);
    try {
      const aiJsonString = await fetchAIRoadmap(description);
      const aiPhases: RoadmapPhase[] = JSON.parse(aiJsonString);

      setRoadmapPhases(aiPhases);
      if (podData) setPodData({ ...podData, progress: 10 });
      setShowGenerateTasks(true);
      setRoadmapModalOpen(false);
    } catch (error) {
      console.error("Failed to generate AI roadmap:", error);
      setRoadmapModalOpen(false);
    } finally {
      setModalLoading(false);
    }
  };

  const generateTasks = async () => {
    setIsGeneratingTasks(true);

    await new Promise(resolve => setTimeout(resolve, 2000));

    if (podData) {
      const updatedMembers: Member[] = [
        {
          ...podData.members[0],
          tasks: [
            { id: '1', title: 'Set up project architecture', status: 'pending' },
            { id: '2', title: 'Implement authentication system', status: 'pending' },
            { id: '3', title: 'Design database schema', status: 'pending' },
          ]
        },
        {
          ...podData.members[1],
          tasks: [
            { id: '4', title: 'Design chat interface mockups', status: 'pending' },
            { id: '5', title: 'Create component library', status: 'pending' },
            { id: '6', title: 'User flow documentation', status: 'pending' },
          ]
        },
        {
          ...podData.members[2],
          tasks: [
            { id: '7', title: 'API endpoint development', status: 'pending' },
            { id: '8', title: 'Database optimization', status: 'pending' },
            { id: '9', title: 'Write API documentation', status: 'pending' },
          ]
        },
        {
          ...podData.members[3],
          tasks: [
            { id: '10', title: 'Implement responsive layout', status: 'pending' },
            { id: '11', title: 'Integrate chat components', status: 'pending' },
          ]
        },
      ];

      setPodData({
        ...podData,
        members: updatedMembers,
        progress: 25
      });
      setTasksGenerated(true);
    }

    setIsGeneratingTasks(false);
  };

  if (isLoading || !podData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading pod data...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white p-4 md:p-6 lg:p-8">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mb-8"
      >
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>

        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">{podData.name}</h1>
            <p className="text-gray-400">Your collaborative project workspace</p>
          </div>
        
          <div className="flex flex-wrap gap-2">
            <Button variant="ghost" className="flex items-center gap-2">
              <Edit3 className="w-4 h-4" />
              Edit Pod
            </Button>
            <Button className="flex items-center gap-2">
              <UserPlus className="w-4 h-4" />
              Invite Members
            </Button>
            <Button variant="ghost" className="flex items-center gap-2 text-red-400 hover:text-red-300">
              <LogOut className="w-4 h-4" />
              Leave Pod
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* AI Roadmap Generator Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/10"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-indigo-500/20 rounded-lg">
                  <Sparkles className="w-5 h-5 text-indigo-400" />
                </div>
                <h2 className="text-xl font-semibold">Generate Project Roadmap with AI</h2>
              </div>
            </div>

            {!Array.isArray(roadmapPhases) || roadmapPhases.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-400 mb-4">Let AI create a comprehensive roadmap for your project</p>
                <Button onClick={() => setRoadmapModalOpen(true)} disabled={modalLoading} className="flex items-center gap-2 mx-auto">
                  {modalLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      Generate Roadmap
                    </>
                  )}
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <AnimatePresence>
                  {roadmapPhases.map((phase, index) => (
                    <motion.div
                      key={phase.id || index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50 hover:border-indigo-500/50 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-semibold text-lg mb-1">{phase.title}</h3>
                          <p className="text-sm text-gray-400">{phase.weekRange}</p>
                        </div>
                        <span className="text-xs text-indigo-400 bg-indigo-500/20 px-2 py-1 rounded-full">{phase.completed || 0}/{phase.total || phase.tasks.length} tasks</span>
                      </div>
                      <div className="space-y-2">
                        {phase.tasks && phase.tasks.map((task: string, taskIndex: number) => (
                          <div key={taskIndex} className="flex items-center gap-2 text-sm">
                            {taskIndex < (phase.completed || 0) ? (
                              <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0" />
                            ) : (
                              <Circle className="w-4 h-4 text-gray-500 flex-shrink-0" />
                            )}
                            <span className={taskIndex < (phase.completed || 0) ? "text-gray-400 line-through" : "text-gray-300"}>{task}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </motion.div>

          {/* Team Overview Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/10"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-500/20 rounded-lg">
                  <Users className="w-5 h-5 text-purple-400" />
                </div>
                <h2 className="text-xl font-semibold">Team Members & Their Tasks 👥</h2>
              </div>
              {showGenerateTasks && !tasksGenerated && (
                <Button onClick={generateTasks} disabled={isGeneratingTasks} className="flex items-center gap-2">
                  {isGeneratingTasks ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Generating Tasks...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      Generate Tasks
                    </>
                  )}
                </Button>
              )}
            </div>
            {!tasksGenerated && !showGenerateTasks && (
              <div className="mb-4 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                <p className="text-xs text-yellow-400">💡 Generate roadmap first, then generate tasks to see all team members with assigned tasks.</p>
              </div>
            )}
            {showGenerateTasks && !tasksGenerated && (
              <div className="mb-4 p-3 bg-indigo-500/10 border border-indigo-500/30 rounded-lg">
                <p className="text-xs text-indigo-400">✨ Roadmap generated! Click "Generate Tasks" to assign tasks to team members.</p>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {(tasksGenerated ? podData.members : [podData.members[0]]).map((member, index) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50 hover:border-indigo-500/50 transition-all duration-200 cursor-pointer"
                >
                  <div className="flex items-start gap-3 mb-4">
                    <div className="relative">
                      <Avatar name={member.name} size={48} />
                      {member.isAdmin && (
                        <div className="absolute -top-1 -right-1 bg-yellow-500 rounded-full p-1 shadow-lg">
                          <Star className="w-3 h-3 text-white fill-white" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-sm truncate">{member.name}</h3>
                        {member.isAdmin && (
                          <span className="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-0.5 rounded-full">Admin</span>
                        )}
                      </div>
                      <p className="text-xs text-gray-400 truncate">{member.role}</p>
                      <a href={member.githubUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-indigo-400 hover:text-indigo-300 transition-colors mt-1">
                        <Github className="w-3 h-3" />
                        <span className="text-xs">GitHub</span>
                      </a>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-2">Tasks ({member.tasks.length})</h4>
                    {member.tasks.slice(0, 3).map((task) => {
                      const getStatusConfig = () => {
                        switch (task.status) {
                          case 'done':
                            return { icon: CheckCircle, color: 'text-green-400', bgColor: 'bg-green-500/20', dotColor: 'bg-green-400', label: 'Done' };
                          case 'in-progress':
                            return { icon: PlayCircle, color: 'text-yellow-400', bgColor: 'bg-yellow-500/20', dotColor: 'bg-yellow-400', label: 'In Progress' };
                          default:
                            return { icon: Clock, color: 'text-gray-400', bgColor: 'bg-gray-500/20', dotColor: 'bg-gray-400', label: 'Pending' };
                        }
                      };

                      const statusConfig = getStatusConfig();
                      return (
                        <motion.div key={task.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.2 }} className="bg-gray-900/50 rounded-lg p-2.5 border border-gray-700/30 hover:border-gray-600/50 transition-colors">
                          <div className="flex items-start gap-2">
                            <div className={`w-2 h-2 rounded-full ${statusConfig.dotColor} mt-1.5 flex-shrink-0`}></div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <p className={`text-xs font-medium ${task.status === 'done' ? 'line-through text-gray-500' : 'text-gray-300'}`}>{task.title}</p>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className={`text-xs px-2 py-0.5 rounded-full ${statusConfig.bgColor} ${statusConfig.color}`}>{statusConfig.label}</span>
                                {task.status === 'in-progress' && task.subtasks && (
                                  <div className="flex-1 max-w-20">
                                    <div className="h-1.5 bg-gray-700 rounded-full overflow-hidden">
                                      <motion.div initial={{ width: 0 }} animate={{ width: `${(task.subtasks.completed / task.subtasks.total) * 100}%` }} transition={{ duration: 0.5 }} className="h-full bg-yellow-400 rounded-full"></motion.div>
                                    </div>
                                    <span className="text-xs text-gray-500 mt-0.5">{task.subtasks.completed}/{task.subtasks.total}</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                    {member.tasks.length === 0 && <p className="text-xs text-gray-500 text-center py-2">No tasks assigned</p>}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Progress Tracker */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, delay: 0.2 }} className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/10">
            <h2 className="text-xl font-semibold mb-4">Project Progress</h2>
            <div className="flex flex-col items-center justify-center py-6">
              <div className="relative w-32 h-32 mb-4">
                <svg className="transform -rotate-90 w-32 h-32" viewBox="0 0 128 128">
                  <circle cx="64" cy="64" r="56" stroke="currentColor" strokeWidth="8" fill="none" className="text-gray-700"></circle>
                  <circle cx="64" cy="64" r="56" stroke="currentColor" strokeWidth="8" fill="none" strokeDasharray={`${2 * Math.PI * 56}`} strokeDashoffset={`${2 * Math.PI * 56 * (1 - podData.progress / 100)}`} className="text-indigo-500 transition-all duration-500" strokeLinecap="round"></circle>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold text-indigo-400">{podData.progress}%</span>
                </div>
              </div>
              <div className="w-full">
                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${podData.progress}%` }} transition={{ duration: 0.8, ease: 'easeOut' }} className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"></motion.div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Members Section */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, delay: 0.3 }} className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/10">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Members</h2>
              <span className="text-sm text-gray-400">{podData.members.length}</span>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              {podData.members.map((member) => (
                <motion.div key={member.id} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3 }} className="flex flex-col items-center p-3 bg-gray-800/50 rounded-xl hover:bg-gray-800/70 transition-colors">
                  <div className="relative mb-2">
                    <Avatar name={member.name} size={56} />
                    {member.isAdmin && <div className="absolute -top-1 -right-1 bg-yellow-500 rounded-full p-1 shadow-lg"><Star className="w-3 h-3 text-white fill-white" /></div>}
                  </div>
                  <h3 className="font-medium text-sm text-center mb-1">{member.name}</h3>
                  <p className="text-xs text-gray-400 text-center mb-2">{member.role}</p>
                  <a href={member.githubUrl} target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-indigo-300 transition-colors">
                    <Github className="w-4 h-4" />
                  </a>
                </motion.div>
              ))}
            </div>
            <Button className="w-full flex items-center justify-center gap-2">
              <UserPlus className="w-4 h-4" /> Invite Members
            </Button>
          </motion.div>
        </div>
      </div>

      <RoadmapModal isOpen={roadmapModalOpen} onClose={() => setRoadmapModalOpen(false)} onSubmit={handleAiRoadmap} loading={modalLoading} />
    </div>
  );
}
