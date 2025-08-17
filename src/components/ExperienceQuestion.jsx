import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useGame } from '../context/GameContext';
import { FaLightbulb, FaRocket, FaCode, FaUsers, FaGlobe } from 'react-icons/fa';

const ExperienceQuestion = () => {
  const { handleExperienceAnswer, userChoices } = useGame();
  const [selectedAnswer, setSelectedAnswer] = useState(userChoices.experienceAnswer);
  const [isAnswered, setIsAnswered] = useState(!!userChoices.experienceAnswer);

  const questions = [
    {
      id: 'innovation',
      question: "What excites you most about technology?",
      options: [
        { id: 'innovation', text: 'Building innovative solutions', icon: FaLightbulb, color: 'from-yellow-500 to-orange-500' },
        { id: 'impact', text: 'Creating positive impact', icon: FaRocket, color: 'from-blue-500 to-cyan-500' },
        { id: 'learning', text: 'Continuous learning', icon: FaCode, color: 'from-green-500 to-emerald-500' },
        { id: 'collaboration', text: 'Team collaboration', icon: FaUsers, color: 'from-purple-500 to-pink-500' },
        { id: 'global', text: 'Global connectivity', icon: FaGlobe, color: 'from-indigo-500 to-purple-500' }
      ]
    }
  ];

  const handleAnswerSelect = (answerId) => {
    setSelectedAnswer(answerId);
    setIsAnswered(true);
    handleExperienceAnswer(answerId);
  };

  const getSelectedOption = () => {
    return questions[0].options.find(opt => opt.id === selectedAnswer);
  };

  return (
    <div className="py-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-6"
      >
        <h3 className="text-lg font-semibold text-neutral-200 mb-2">
          Quick question to unlock Projects section
        </h3>
        <p className="text-neutral-400 text-sm max-w-lg mx-auto">
          Answer this to continue exploring
        </p>
      </motion.div>

      <div className="max-w-3xl mx-auto">
        {questions.map((q, qIndex) => (
          <motion.div
            key={q.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: qIndex * 0.1 }}
            className="mb-6"
          >
            <h4 className="text-lg font-medium text-neutral-300 mb-4 text-center">
              {q.question}
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
              {q.options.map((option, index) => (
                <motion.div
                  key={option.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleAnswerSelect(option.id)}
                  className={`
                    cursor-pointer p-3 rounded-lg border transition-all duration-300
                    ${selectedAnswer === option.id 
                      ? 'border-cyan-400 bg-cyan-400/10 shadow-md' 
                      : 'border-neutral-700 hover:border-neutral-600 bg-neutral-800/30 hover:bg-neutral-800/50'
                    }
                  `}
                >
                  <div className="text-center">
                    <div className={`
                      w-10 h-10 mx-auto mb-2 rounded-full bg-gradient-to-br ${option.color} 
                      flex items-center justify-center text-white text-lg
                    `}>
                      <option.icon />
                    </div>
                    <h5 className="text-xs font-medium text-neutral-200 leading-tight">{option.text}</h5>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}

        {/* Compact Answer Display */}
        {isAnswered && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-400/20 to-purple-500/20 border border-cyan-400/30">
              <div className={`
                w-8 h-8 rounded-full bg-gradient-to-br ${getSelectedOption()?.color} 
                flex items-center justify-center text-white text-sm
              `}>
                {getSelectedOption()?.icon && React.createElement(getSelectedOption().icon)}
              </div>
              <div className="text-left">
                <p className="text-cyan-400 text-xs font-medium">Your choice:</p>
                <p className="text-neutral-200 text-sm">{getSelectedOption()?.text}</p>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-2 text-green-400 text-xs font-medium"
            >
              🎉 Projects section unlocked!
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ExperienceQuestion;
