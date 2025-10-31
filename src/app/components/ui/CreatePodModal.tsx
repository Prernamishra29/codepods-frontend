'use client';

import { useState } from 'react';
import { FaGithub, FaTimes } from 'react-icons/fa';
import AuthService from '@/app/services/Auth';
import Button from './Button';

interface CreatePodModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreatePod?: (podData: any) => void;
}

export default function CreatePodModal({ isOpen, onClose, onCreatePod }: CreatePodModalProps) {
  const [podData, setPodData] = useState({
    name: '',
    description: '',
    skills: [] as string[],
  });
  const [newSkill, setNewSkill] = useState('');
  const isGitHubAuth = AuthService.isGitHubAuthenticated();

  if (!isOpen) return null;

  const handleGitHubAuth = () => {
    console.log('🔐 GitHub authentication required for creating pod');
    AuthService.loginWithGitHub();
  };

  const handleAddSkill = () => {
    if (newSkill.trim() && !podData.skills.includes(newSkill.trim())) {
      setPodData({ ...podData, skills: [...podData.skills, newSkill.trim()] });
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skill: string) => {
    setPodData({ ...podData, skills: podData.skills.filter(s => s !== skill) });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isGitHubAuth) {
      alert('Please authenticate with GitHub first');
      return;
    }

    if (onCreatePod) {
      onCreatePod(podData);
    }
    
    // Reset form
    setPodData({ name: '', description: '', skills: [] });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-xl shadow-lg w-full max-w-md relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <FaTimes className="w-5 h-5" />
        </button>

        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4 text-white">Create New Pod</h2>

          {!isGitHubAuth ? (
            <div className="space-y-4">
              <div className="bg-yellow-500/10 border border-yellow-500 text-yellow-500 p-4 rounded-lg">
                <p className="font-semibold mb-2">🔐 GitHub Authentication Required</p>
                <p className="text-sm">
                  To create a pod, you need to authenticate with GitHub. This helps us verify your identity and connect with your repositories.
                </p>
              </div>

              <button
                onClick={handleGitHubAuth}
                className="w-full flex items-center justify-center gap-3 p-3 rounded bg-gray-700 hover:bg-gray-600 transition text-white font-medium"
              >
                <FaGithub className="text-xl" />
                Authenticate with GitHub
              </button>

              <button
                onClick={onClose}
                className="w-full p-3 text-gray-400 hover:text-white transition"
              >
                Cancel
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Pod Name</label>
                <input
                  type="text"
                  value={podData.name}
                  onChange={(e) => setPodData({ ...podData, name: e.target.value })}
                  placeholder="Enter pod name"
                  required
                  className="w-full p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">Description</label>
                <textarea
                  value={podData.description}
                  onChange={(e) => setPodData({ ...podData, description: e.target.value })}
                  placeholder="Describe your pod"
                  required
                  rows={3}
                  className="w-full p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">Skills Required</label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSkill())}
                    placeholder="Add a skill"
                    className="flex-1 p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <button
                    type="button"
                    onClick={handleAddSkill}
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded text-white transition"
                  >
                    Add
                  </button>
                </div>
                
                {podData.skills.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {podData.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 bg-indigo-600 rounded-full text-sm flex items-center gap-2"
                      >
                        {skill}
                        <button
                          type="button"
                          onClick={() => handleRemoveSkill(skill)}
                          className="hover:text-red-400"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex gap-3 pt-4">
                <Button type="submit" className="flex-1">
                  Create Pod
                </Button>
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 p-3 bg-gray-700 hover:bg-gray-600 rounded text-white transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}


