'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface CreatePodModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreatePod?: (podData: {
    name: string;
    description: string;
    githubRepo?: string;
    podType: 'Project' | 'Learning' | 'Research';
  }) => void;
}

export default function CreatePodModal({ isOpen, onClose, onCreatePod }: CreatePodModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    githubRepo: '',
    podType: 'Project' as 'Project' | 'Learning' | 'Research',
  });
  const [errors, setErrors] = useState({
    name: '',
  });

  const validateForm = () => {
    const newErrors = { name: '' };
    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = 'Pod Name is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    if (onCreatePod) {
      onCreatePod({
        name: formData.name,
        description: formData.description,
        githubRepo: formData.githubRepo || undefined,
        podType: formData.podType,
      });
    }

    // Reset form
    setFormData({
      name: '',
      description: '',
      githubRepo: '',
      podType: 'Project',
    });
    setErrors({ name: '' });
    onClose();
  };

  const handleClose = () => {
    setFormData({
      name: '',
      description: '',
      githubRepo: '',
      podType: 'Project',
    });
    setErrors({ name: '' });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Blurred background overlay */}
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={handleClose}
          />
          
          {/* Modal */}
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4 pointer-events-none">
            <motion.div
              className="bg-gray-900 rounded-2xl shadow-2xl w-full max-w-2xl pointer-events-auto"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-5 border-b border-gray-800">
                <h2 className="text-2xl font-bold text-white">Create New Pod</h2>
                <button
                  onClick={handleClose}
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="p-5 space-y-4">
                {/* Pod Name and Pod Type in a row */}
                <div className="grid grid-cols-2 gap-4">
                  {/* Pod Name */}
                  <div>
                    <label htmlFor="podName" className="block text-sm font-medium text-gray-300 mb-2">
                      Pod Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      id="podName"
                      type="text"
                      value={formData.name}
                      onChange={(e) => {
                        setFormData({ ...formData, name: e.target.value });
                        if (errors.name) setErrors({ ...errors, name: '' });
                      }}
                      placeholder="Enter pod name"
                      className={`w-full px-4 py-2.5 rounded-lg bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-colors ${
                        errors.name
                          ? 'focus:ring-red-500 border border-red-500'
                          : 'focus:ring-indigo-500 border border-gray-700'
                      }`}
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-400">{errors.name}</p>
                    )}
                  </div>

                  {/* Pod Type */}
                  <div>
                    <label htmlFor="podType" className="block text-sm font-medium text-gray-300 mb-2">
                      Pod Type
                    </label>
                    <select
                      id="podType"
                      value={formData.podType}
                      onChange={(e) => setFormData({ ...formData, podType: e.target.value as 'Project' | 'Learning' | 'Research' })}
                      className="w-full px-4 py-2.5 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 border border-gray-700 transition-colors"
                    >
                      <option value="Project">Project</option>
                      <option value="Learning">Learning</option>
                      <option value="Research">Research</option>
                    </select>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">
                    Description
                  </label>
                  <textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Describe your pod..."
                    rows={3}
                    className="w-full px-4 py-2.5 rounded-lg bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 border border-gray-700 transition-colors resize-none"
                  />
                </div>

                {/* GitHub Repository Link */}
                <div>
                  <label htmlFor="githubRepo" className="block text-sm font-medium text-gray-300 mb-2">
                    GitHub Repository Link <span className="text-gray-500 text-xs">(optional)</span>
                  </label>
                  <input
                    id="githubRepo"
                    type="url"
                    value={formData.githubRepo}
                    onChange={(e) => setFormData({ ...formData, githubRepo: e.target.value })}
                    placeholder="https://github.com/username/repo"
                    className="w-full px-4 py-2.5 rounded-lg bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 border border-gray-700 transition-colors"
                  />
                </div>

                {/* Buttons */}
                <div className="flex gap-3 pt-3">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="flex-1 px-4 py-2.5 rounded-lg bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2.5 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors font-medium"
                  >
                    Create Pod
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
