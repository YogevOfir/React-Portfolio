import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../context/GameContext';
import { FaLock, FaUnlock, FaCheckCircle } from 'react-icons/fa';

const SectionWrapper = ({ 
  sectionKey, 
  children, 
  className = "", 
  showLockOverlay = true 
}) => {
  const { gameState } = useGame();
  const section = gameState[sectionKey];
  const isUnlocked = section?.unlocked;
  const isCompleted = section?.completed;

  if (!showLockOverlay || isUnlocked) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className={className}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`relative ${className}`}
    >
      {/* Lock Overlay */}
      <div className="absolute inset-0 bg-neutral-950/90 backdrop-blur-sm rounded-lg z-10 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center p-8"
        >
          <div className="mb-4">
            <FaLock className="text-6xl text-neutral-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-neutral-300 mb-2">
              Section Locked
            </h3>
            <p className="text-neutral-400 max-w-md">
              {sectionKey === 'experience' && 
                "Select at least 2 technologies that interest you to unlock this section."}
              {sectionKey === 'projects' && 
                "Answer a quick question in the Experience section to unlock this section."}
              {sectionKey === 'contact' && 
                "Select your favorite project to unlock the contact section."}
            </p>
          </div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex items-center justify-center gap-2 text-neutral-500"
          >
            <FaLock className="text-sm" />
            <span className="text-sm">Complete previous sections to unlock</span>
          </motion.div>
        </motion.div>
      </div>

      {/* Blurred Content Behind */}
      <div className="filter blur-sm pointer-events-none">
        {children}
      </div>
    </motion.div>
  );
};

export default SectionWrapper;
