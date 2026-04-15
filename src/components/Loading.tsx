import React from 'react';
import { motion } from 'framer-motion';

const Loading = () => {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        {/* Logo/Name */}
        <motion.h1
          animate={{
            background: [
              "linear-gradient(to right, #3b82f6, #8b5cf6)",
              "linear-gradient(to right, #8b5cf6, #3b82f6)",
              "linear-gradient(to right, #3b82f6, #8b5cf6)"
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent mb-8"
        >
          Portfolio
        </motion.h1>

        {/* Loading Animation */}
        <div className="flex justify-center gap-2 mb-8">
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              animate={{
                y: [0, -20, 0],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: index * 0.2
              }}
              className="w-4 h-4 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full"
            />
          ))}
        </div>

        {/* Loading Text */}
        <motion.p
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-gray-400 text-lg"
        >
          Loading amazing content...
        </motion.p>
      </motion.div>
    </div>
  );
};

export default Loading;
