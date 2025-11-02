'use client';
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from './Button';

interface RoadmapModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (description: string) => void;
  loading: boolean;
}

export default function RoadmapModal({ isOpen, onClose, onSubmit, loading }: RoadmapModalProps) {
  const [desc, setDesc] = useState("");

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-gray-900 p-8 rounded-2xl w-full max-w-md shadow-2xl relative"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
        >
          <h3 className="text-xl font-bold mb-2 text-white">Describe Your Project</h3>
          <textarea
            className="w-full h-28 bg-gray-800 text-white rounded-lg p-2 focus:outline-none resize-none"
            value={desc}
            onChange={e => setDesc(e.target.value)}
            placeholder="Enter a brief project description..."
            disabled={loading}
          />
          <div className="mt-4 flex gap-2 justify-end">
            <Button variant="ghost" onClick={onClose} disabled={loading}>Cancel</Button>
            <Button onClick={() => onSubmit(desc)} disabled={loading || !desc.trim()}>
              {loading ? "Generating..." : "Generate"}
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
