import React, { createContext, useContext, useState, useEffect } from 'react';

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
  const unlockSection = (sectionName) => {
    setGameState(prev => ({
      ...prev,
      [sectionName]: { ...prev[sectionName], unlocked: true }
    }));
  };

  // Complete sections
  const completeSection = (sectionName) => {
    setGameState(prev => ({
      ...prev,
      [sectionName]: { ...prev[sectionName], completed: true }
    }));
  };

  // Handle technology selection
  const handleTechnologySelection = (technologies) => {
    setUserChoices(prev => ({ ...prev, selectedTechnologies: technologies }));
    if (technologies.length >= 2) {
      unlockSection('experience');
      completeSection('technologies');
    }
  };

  // Handle experience answer
  const handleExperienceAnswer = (answer) => {
    setUserChoices(prev => ({ ...prev, experienceAnswer: answer }));
    unlockSection('projects');
    completeSection('experience');
  };

  // Handle project selection
  const handleProjectSelection = (project) => {
    setUserChoices(prev => ({ ...prev, selectedProject: project }));
    unlockSection('contact');
    completeSection('projects');
  };

  // Skip all sections
  const skipGame = () => {
    setIsSkipped(true);
    setGameState(prev => {
      const newState = {};
      Object.keys(prev).forEach(key => {
        newState[key] = { unlocked: true, completed: true };
      });
      return newState;
    });
  };

  // Firebase integration functions (placeholder for now)
  const saveUserChoice = async (section, choice) => {
    try {
      // TODO: Implement Firebase save
      console.log(`Saving ${section}:`, choice);
      // await firebase.firestore().collection('userChoices').add({
      //   section,
      //   choice,
      //   timestamp: new Date(),
      //   sessionId: sessionStorage.getItem('sessionId')
      // });
    } catch (error) {
      console.error('Error saving user choice:', error);
    }
  };

  // Save choices when they change
  useEffect(() => {
    if (userChoices.selectedTechnologies.length > 0) {
      saveUserChoice('technologies', userChoices.selectedTechnologies);
    }
  }, [userChoices.selectedTechnologies]);

  useEffect(() => {
    if (userChoices.experienceAnswer) {
      saveUserChoice('experience', userChoices.experienceAnswer);
    }
  }, [userChoices.experienceAnswer]);

  useEffect(() => {
    if (userChoices.selectedProject) {
      saveUserChoice('projects', userChoices.selectedProject);
    }
  }, [userChoices.selectedProject]);

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
    skipGame,
    saveUserChoice
  };

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
};
