import React from 'react';
import { motion } from 'framer-motion';

const Skeleton = ({ className }) => {
  return (
    <div className={`relative bg-gray-100 dark:bg-gray-800 rounded-2xl overflow-hidden flex items-center justify-center ${className}`}>
      <motion.div
        animate={{ 
          y: [-10, 10, -10],
          rotate: [0, 10, -10, 0] 
        }}
        transition={{ 
          y: { repeat: Infinity, duration: 1, ease: "easeInOut" },
          rotate: { repeat: Infinity, duration: 2, ease: "easeInOut" }
        }}
        className="text-4xl opacity-20 filter grayscale"
      >
        🦴
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 dark:via-white/5 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]" />
    </div>
  );
};

export default Skeleton;
