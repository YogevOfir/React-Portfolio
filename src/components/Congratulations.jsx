import React from 'react';
import { motion } from 'framer-motion';
import { useGame } from '../context/GameContext';
import { FaRocket, FaStar, FaHeart, FaEnvelope } from 'react-icons/fa';

const Congratulations = () => {
  const { allUnlocked, userChoices } = useGame();

  if (!allUnlocked) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="mb-8"
    >
      <div className="max-w-2xl mx-auto">
        {/* Compact Celebration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center p-4 bg-gradient-to-r from-cyan-400/10 to-purple-500/10 border border-cyan-400/20 rounded-lg"
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <FaStar className="text-yellow-400 text-lg" />
            <span className="text-lg font-medium text-neutral-200">Thank you for your cooperation!</span>
            <FaStar className="text-yellow-400 text-lg" />
          </div>
          
          <p className="text-sm text-neutral-400 mb-3">
          You helped me know what to specialize in. Ready to connect?
          </p>

          {/* Compact User Journey Summary */}
          <div className="grid grid-cols-3 gap-3 text-xs">
            <div className="p-2 bg-neutral-800/30 rounded border border-neutral-700">
              <div className="text-cyan-400 mb-1">Technologies</div>
              <div className="text-neutral-300">{userChoices.selectedTechnologies.length} selected</div>
            </div>
            
            <div className="p-2 bg-neutral-800/30 rounded border border-neutral-700">
              <div className="text-green-400 mb-1">Interest</div>
              <div className="text-neutral-300 text-xs">
                {userChoices.experienceAnswer === 'innovation' && 'Innovation'}
                {userChoices.experienceAnswer === 'impact' && 'Impact'}
                {userChoices.experienceAnswer === 'learning' && 'Learning'}
                {userChoices.experienceAnswer === 'collaboration' && 'Collaboration'}
                {userChoices.experienceAnswer === 'global' && 'Global'}
              </div>
            </div>
            
            <div className="p-2 bg-neutral-800/30 rounded border border-neutral-700">
              <div className="text-purple-400 mb-1">Project</div>
              <div className="text-neutral-300 text-xs">
                {userChoices.selectedProject === 'portfolio' && 'Portfolio'}
                {userChoices.selectedProject === 'drone' && 'Drone'}
                {userChoices.selectedProject === 'notes' && 'Notes'}
                {userChoices.selectedProject === 'tech' && 'TechNaim'}
              </div>
            </div>
          </div>

          {/* Subtle Call to Action */}
          <div className="mt-3 flex items-center justify-center gap-2 text-cyan-400 text-xs">
            <FaEnvelope />
            <span>Scroll down to get in touch</span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Congratulations;
