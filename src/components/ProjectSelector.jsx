import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useGame } from '../context/GameContext';
import { FaHeart, FaStar, FaEye, FaCode, FaRocket } from 'react-icons/fa';

const ProjectSelector = () => {
  const { handleProjectSelection, userChoices } = useGame();
  const [selectedProject, setSelectedProject] = useState(userChoices.selectedProject);
  const [isSelected, setIsSelected] = useState(!!userChoices.selectedProject);

  const projects = [
    {
      id: 'portfolio',
      name: 'Interactive Portfolio',
      description: 'This gamified portfolio website with smooth animations and interactive elements',
      icon: FaRocket,
      color: 'from-purple-500 to-pink-500',
      features: ['React', 'Framer Motion', 'Gamification']
    },
    {
      id: 'drone',
      name: 'Drone Segmentation',
      description: 'AI-powered drone image analysis and object detection system',
      icon: FaEye,
      color: 'from-blue-500 to-cyan-500',
      features: ['Python', 'OpenCV', 'Machine Learning']
    },
    {
      id: 'notes',
      name: 'Smart Notes App',
      description: 'Full-stack note-taking application with real-time collaboration',
      icon: FaCode,
      color: 'from-green-500 to-emerald-500',
      features: ['Node.js', 'React', 'MongoDB']
    },
    {
      id: 'tech',
      name: 'TechNaim Platform',
      description: 'Innovative technology platform for modern businesses',
      icon: FaStar,
      color: 'from-orange-500 to-red-500',
      features: ['Full-Stack', 'Cloud', 'Scalable']
    }
  ];

  const handleProjectClick = (projectId) => {
    setSelectedProject(projectId);
    setIsSelected(true);
    handleProjectSelection(projectId);
  };

  const getSelectedProject = () => {
    return projects.find(p => p.id === selectedProject);
  };

  return (
    <div className="py-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-6"
      >
        <h3 className="text-lg font-semibold text-neutral-200 mb-2">
          Select your favorite project to unlock Contact section
        </h3>
        <p className="text-neutral-400 text-sm max-w-lg mx-auto">
          Choose what interests you most to get in touch
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={() => handleProjectClick(project.id)}
            className={`
              relative cursor-pointer p-4 rounded-lg border transition-all duration-300
              ${selectedProject === project.id 
                ? 'border-cyan-400 bg-cyan-400/10 shadow-md' 
                : 'border-neutral-700 hover:border-neutral-600 bg-neutral-800/30 hover:bg-neutral-800/50'
              }
            `}
          >
            {/* Selection Indicator */}
            {selectedProject === project.id && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute -top-2 -right-2 w-6 h-6 bg-cyan-400 rounded-full flex items-center justify-center"
              >
                <FaHeart className="text-white text-xs" />
              </motion.div>
            )}

            <div className="flex items-start gap-3">
              {/* Project Icon */}
              <div className={`
                w-12 h-12 rounded-full bg-gradient-to-br ${project.color} 
                flex items-center justify-center text-white text-xl flex-shrink-0
              `}>
                {project.icon && React.createElement(project.icon)}
              </div>

              {/* Project Content */}
              <div className="flex-1">
                <h4 className="text-lg font-semibold text-neutral-200 mb-1">
                  {project.name}
                </h4>
                <p className="text-neutral-400 text-xs mb-2 leading-relaxed">
                  {project.description}
                </p>
                
                {/* Features */}
                <div className="flex flex-wrap gap-1">
                  {project.features.map((feature, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 text-xs bg-neutral-700 text-neutral-300 rounded-full"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Compact Selection Display */}
      {isSelected && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mt-4"
        >
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-400/20 to-purple-500/20 border border-cyan-400/30">
            <div className={`
              w-10 h-10 rounded-full bg-gradient-to-br ${getSelectedProject()?.color} 
              flex items-center justify-center text-white text-lg
            `}>
              {getSelectedProject()?.icon && React.createElement(getSelectedProject().icon)}
            </div>
            <div className="text-left">
              <p className="text-cyan-400 text-xs font-medium">Your favorite:</p>
              <p className="text-neutral-200 text-sm font-medium">{getSelectedProject()?.name}</p>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-2 text-green-400 text-xs font-medium"
          >
            🎯 Contact section unlocked! Let's connect!
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default ProjectSelector;
