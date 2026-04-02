import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Home as HomeIcon, Building, ShieldAlert, Heart, Activity } from 'lucide-react';

const questions = [
  {
    title: "Where will your new friend live?",
    options: [
      { id: 'house', label: 'House with Yard', icon: <HomeIcon size={32} /> },
      { id: 'apartment', label: 'Apartment/Condo', icon: <Building size={32} /> },
    ]
  },
  {
    title: "What's your energy level?",
    options: [
      { id: 'potato', label: 'Couch Potato', icon: <Heart size={32} /> },
      { id: 'marathon', label: 'Marathon Runner', icon: <Activity size={32} /> },
    ]
  },
  {
    title: "Any pet allergies in the family?",
    options: [
      { id: 'yes', label: 'Yes, need hypoallergenic', icon: <ShieldAlert size={32} /> },
      { id: 'no', label: 'Nope, bring on the fur!', icon: <Sparkles size={32} /> },
    ]
  }
];

const OnboardingQuiz = ({ onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const navigate = useNavigate();

  const handleSelect = (optionId) => {
    setAnswers({ ...answers, [currentStep]: optionId });
    
    if (currentStep < questions.length - 1) {
      setTimeout(() => setCurrentStep(prev => prev + 1), 400);
    } else {
      // Finished Quiz
      localStorage.setItem('quizCompleted', 'true');
      setTimeout(() => {
        onClose();
        navigate('/adoption?curated=true');
      }, 800);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-gray-900/40 backdrop-blur-md p-4">
      <motion.div 
        layoutId="quiz-container"
        className="bg-white dark:bg-slate-900 rounded-[40px] shadow-2xl overflow-hidden max-w-lg w-full relative"
      >
        {/* Progress Bar */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gray-100 dark:bg-slate-800">
          <motion.div 
            className="h-full bg-primary-coral"
            initial={{ width: '0%' }}
            animate={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>

        <div className="p-10 pt-12 text-center">
          <div className="inline-flex items-center justify-center p-3 text-primary-coral bg-primary-coral/10 rounded-2xl mb-6">
            <Sparkles size={28} />
          </div>
          
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-8">
                {questions[currentStep].title}
              </h2>
              
              <div className="grid grid-cols-2 gap-4">
                {questions[currentStep].options.map((option) => {
                  const isSelected = answers[currentStep] === option.id;
                  return (
                    <motion.button
                      key={option.id}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleSelect(option.id)}
                      className={`flex flex-col items-center justify-center p-6 gap-4 rounded-3xl border-2 transition-all ${
                        isSelected 
                          ? 'border-primary-coral bg-primary-coral/5 text-primary-coral' 
                          : 'border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-800 text-gray-500 hover:border-primary-coral/30 hover:bg-gray-50 dark:hover:bg-slate-700/50'
                      }`}
                    >
                      <div className={isSelected ? 'text-primary-coral' : 'text-gray-400 dark:text-gray-500'}>
                        {option.icon}
                      </div>
                      <span className={`font-bold ${isSelected ? 'text-primary-coral' : 'text-gray-700 dark:text-gray-300'}`}>
                        {option.label}
                      </span>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          </AnimatePresence>

          <button 
            onClick={onClose}
            className="mt-10 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 font-bold tracking-wide transition-colors"
          >
            Skip Quiz
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default OnboardingQuiz;
