import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useGame } from '../context/GameContext';
import { FaCheck, FaCode, FaDatabase, FaMobile, FaCloud, FaShieldAlt, FaBrain } from 'react-icons/fa';

const TechnologySelector = () => {
  const { handleTechnologySelection, userChoices } = useGame();
  const [selectedTechs, setSelectedTechs] = useState(userChoices.selectedTechnologies);

  const technologies = [
    { id: 'frontend', name: 'Frontend', icon: FaCode, color: 'from-blue-500 to-cyan-500' },
    { id: 'backend', name: 'Backend', icon: FaDatabase, color: 'from-green-500 to-emerald-500' },
    { id: 'mobile', name: 'Mobile', icon: FaMobile, color: 'from-purple-500 to-pink-500' },
    { id: 'cloud', name: 'Cloud', icon: FaCloud, color: 'from-orange-500 to-red-500' },
    { id: 'security', name: 'Security', icon: FaShieldAlt, color: 'from-red-500 to-pink-500' },
    { id: 'ai', name: 'AI/ML', icon: FaBrain, color: 'from-indigo-500 to-purple-500' }
  ];

  const handleTechClick = (techId) => {
    let newSelection;
    if (selectedTechs.includes(techId)) {
      newSelection = selectedTechs.filter(id => id !== techId);
    } else {
      newSelection = [...selectedTechs, techId];
    }
    
    setSelectedTechs(newSelection);
    handleTechnologySelection(newSelection);
  };

  const isSelected = (techId) => selectedTechs.includes(techId);
  const canProceed = selectedTechs.length >= 2;

  return (
    <div className="py-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-6"
      >
        <h3 className="text-lg font-semibold text-neutral-200 mb-2">
          Select 2+ technologies to unlock Experience section
        </h3>
        <p className="text-neutral-400 text-sm max-w-lg mx-auto">
          Choose what interests you most to continue exploring
        </p>
      </motion.div>

      <div className="grid grid-cols-3 md:grid-cols-6 gap-3 max-w-2xl mx-auto">
        {technologies.map((tech, index) => (
          <motion.div
            key={tech.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleTechClick(tech.id)}
            className={`
              relative cursor-pointer p-3 rounded-lg border transition-all duration-300
              ${isSelected(tech.id) 
                ? 'border-cyan-400 bg-cyan-400/10 shadow-md' 
                : 'border-neutral-700 hover:border-neutral-600 bg-neutral-800/30 hover:bg-neutral-800/50'
              }
            `}
          >
            {/* Selection Indicator */}
            {isSelected(tech.id) && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute -top-1 -right-1 w-4 h-4 bg-cyan-400 rounded-full flex items-center justify-center"
              >
                <FaCheck className="text-white text-xs" />
              </motion.div>
            )}

            {/* Tech Icon */}
            <div className="text-center">
              <div className={`
                w-10 h-10 mx-auto mb-2 rounded-full bg-gradient-to-br ${tech.color} 
                flex items-center justify-center text-white text-lg
              `}>
                <tech.icon />
              </div>
              <h4 className="text-xs font-medium text-neutral-200">{tech.name}</h4>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Compact Progress Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center mt-4"
      >
        <div className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-neutral-800/50 border border-neutral-700">
          <span className="text-xs text-neutral-400">
            {selectedTechs.length}/2 selected
          </span>
          <div className="w-16 h-1.5 bg-neutral-700 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-cyan-400 to-purple-500"
              initial={{ width: 0 }}
              animate={{ width: `${Math.min((selectedTechs.length / 2) * 100, 100)}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {canProceed && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-2 text-green-400 text-xs font-medium"
          >
            ✨ Experience section unlocked!
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default TechnologySelector;
