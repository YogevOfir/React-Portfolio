import React from 'react';
import { motion } from 'framer-motion';
import { useGame } from '../context/GameContext';
import { FaRocket, FaLock, FaUnlock } from 'react-icons/fa';

const ProgressBar = () => {
  const { progress, allUnlocked, skipGame, isSkipped, gameState } = useGame();

  const sections = [
    { name: 'Hero', key: 'hero' },
    { name: 'About', key: 'about' },
    { name: 'Tech', key: 'technologies' },
    { name: 'Exp & Edu', key: 'experience' },
    { name: 'Projects', key: 'projects' },
    { name: 'Contact', key: 'contact' }
  ];

  return (
    <div className="fixed left-4 top-4 z-40 w-48 bg-neutral-900/60 backdrop-blur-sm border border-neutral-700 rounded-lg shadow-lg">
      <div className="p-4">
        {/* Compact Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <FaRocket className="text-cyan-400 text-sm" />
            <span className="text-xs font-medium text-neutral-300">Progress</span>
          </div>
          <div className="text-lg font-bold text-cyan-400">{progress}%</div>
        </div>

        {/* Compact Progress Bar */}
        <div className="mb-3">
          <div className="w-full bg-neutral-800 rounded-full h-1.5">
            <motion.div
              className="bg-gradient-to-r from-cyan-400 to-purple-500 h-1.5 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          </div>
        </div>

        {/* Compact Section Indicators */}
        <div className="space-y-1.5">
          {sections.map((section, index) => {
            const isUnlocked = gameState[section.key]?.unlocked;
            const isCompleted = gameState[section.key]?.completed;
            
            return (
              <motion.div
                key={section.key}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`
                  flex items-center gap-2 text-xs transition-all duration-200
                  ${isUnlocked ? 'text-neutral-200' : 'text-neutral-500'}
                `}
              >
                <div className={`
                  w-3 h-3 rounded-full flex items-center justify-center
                  ${isUnlocked 
                    ? 'bg-green-500' 
                    : 'bg-neutral-600'
                  }
                `}>
                  {isUnlocked ? <FaUnlock className="text-white text-xs" /> : <FaLock className="text-neutral-400 text-xs" />}
                </div>
                <span className={`
                  ${isCompleted ? 'font-medium' : ''}
                `}>
                  {section.name}
                </span>
              </motion.div>
            );
          })}
        </div>

        {/* Compact Skip Button */}
        {!isSkipped && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={skipGame}
            className="w-full mt-3 px-2 py-1.5 text-xs bg-neutral-700/50 hover:bg-neutral-600/50 text-neutral-400 rounded transition-colors duration-200"
          >
            Skip Game
          </motion.button>
        )}

        {/* Compact Congratulations */}
        {allUnlocked && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-3 p-2 bg-green-500/20 border border-green-400/30 rounded text-center"
          >
            <div className="flex items-center justify-center gap-1 text-green-400 text-xs">
              <FaRocket className="text-xs" />
              <span>All unlocked! 🎉</span>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ProgressBar;
