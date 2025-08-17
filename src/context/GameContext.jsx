import React, { createContext, useContext, useState, useEffect } from 'react';
import { trackSectionUnlock, trackPortfolioCompletion, trackUserInteraction } from '../config/firebase';

const GameContext = createContext();

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};

export const GameProvider = ({ children }) => {
  const [gameState, setGameState] = useState({
    hero: { unlocked: true, completed: false },
    about: { unlocked: true, completed: false },
    technologies: { unlocked: true, completed: false },
    experience: { unlocked: false, completed: false },
    projects: { unlocked: false, completed: false },
    contact: { unlocked: false, completed: false }
  });

  const [userChoices, setUserChoices] = useState({
    selectedTechnologies: [],
    experienceAnswer: '',
    selectedProject: ''
  });

  const [isSkipped, setIsSkipped] = useState(false);

  // Calculate progress percentage
  const progress = Math.round(
    (Object.values(gameState).filter(section => section.unlocked).length / 6) * 100
  );

  // Check if all sections are unlocked
  const allUnlocked = Object.values(gameState).every(section => section.unlocked);

  // Unlock sections based on user choices
  const unlockSection = async (sectionName) => {
    setGameState(prev => ({
      ...prev,
      [sectionName]: { ...prev[sectionName], unlocked: true }
    }));
    
    // Track section unlock in analytics
    await trackSectionUnlock(sectionName);
  };

  // Complete sections
  const completeSection = (sectionName) => {
    setGameState(prev => ({
      ...prev,
      [sectionName]: { ...prev[sectionName], completed: true }
    }));
  };

  // Handle technology selection
  const handleTechnologySelection = async (technologies) => {
    setUserChoices(prev => ({ ...prev, selectedTechnologies: technologies }));
    
    // Track user interaction
    await trackUserInteraction('technology_selection', { technologies });
    
    if (technologies.length >= 2) {
      await unlockSection('experience');
      completeSection('technologies');
    }
  };

  // Handle experience answer
  const handleExperienceAnswer = async (answer) => {
    setUserChoices(prev => ({ ...prev, experienceAnswer: answer }));
    
    // Track user interaction
    await trackUserInteraction('experience_answer', { answer });
    
    await unlockSection('projects');
    completeSection('experience');
  };

  // Handle project selection
  const handleProjectSelection = async (project) => {
    setUserChoices(prev => ({ ...prev, selectedProject: project }));
    
    // Track user interaction
    await trackUserInteraction('project_selection', { project });
    
    await unlockSection('contact');
    completeSection('projects');
  };

  // Skip all sections
  const skipGame = async () => {
    setIsSkipped(true);
    setGameState(prev => {
      const newState = {};
      Object.keys(prev).forEach(key => {
        newState[key] = { unlocked: true, completed: true };
      });
      return newState;
    });
    
    // Track skip action
    await trackUserInteraction('game_skipped', { timestamp: new Date().toISOString() });
  };

  // Track portfolio completion when all sections are unlocked
  useEffect(() => {
    if (allUnlocked && !isSkipped) {
      trackPortfolioCompletion(userChoices);
    }
  }, [allUnlocked, isSkipped, userChoices]);

  const value = {
    gameState,
    userChoices,
    progress,
    allUnlocked,
    isSkipped,
    unlockSection,
    completeSection,
    handleTechnologySelection,
    handleExperienceAnswer,
    handleProjectSelection,
    skipGame
  };

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
};
