import React from 'react';
import { motion } from 'framer-motion';
import { GitBranch, Globe, Mail, Download, ArrowDown } from 'lucide-react';

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut" as const
      }
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-900/20 via-transparent to-secondary-900/20" />
      
      {/* Animated background elements */}
      <motion.div
        animate={{
          y: [0, -20, 0],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute top-20 left-20 w-72 h-72 bg-primary-500/20 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          y: [0, 20, 0],
          rotate: [0, -180, -360],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute bottom-20 right-20 w-96 h-96 bg-secondary-500/20 rounded-full blur-3xl"
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center"
        >
          {/* Greeting */}
          <motion.h1
            variants={itemVariants}
            className="text-lg md:text-xl text-primary-400 font-medium mb-4"
          >
            Hello, I'm
          </motion.h1>

          {/* Name */}
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-7xl font-bold mb-4"
          >
            <span className="gradient-text">Karthik K S</span>
          </motion.h2>

          {/* Title */}
          <motion.h3
            variants={itemVariants}
            className="text-2xl md:text-4xl text-gray-300 mb-6"
          >
            Full Stack Developer
          </motion.h3>

          {/* Tagline */}
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-gray-400 mb-8 max-w-2xl mx-auto"
          >
            Crafting beautiful, responsive web experiences with modern technologies
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <button className="btn-primary">
              View Projects
            </button>
            <button className="btn-secondary">
              Contact Me
            </button>
          </motion.div>

          {/* Social Links */}
          <motion.div
            variants={itemVariants}
            className="flex justify-center gap-6 mb-12"
          >
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-primary-400 transition-colors"
            >
              <GitBranch size={24} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-primary-400 transition-colors"
            >
              <Globe size={24} />
            </a>
            <a
              href="mailto:john.doe@example.com"
              className="text-gray-400 hover:text-primary-400 transition-colors"
            >
              <Mail size={24} />
            </a>
          </motion.div>

          {/* Resume Download */}
          <motion.div
            variants={itemVariants}
            className="flex justify-center mb-16"
          >
            <button className="flex items-center gap-2 text-gray-400 hover:text-primary-400 transition-colors">
              <Download size={20} />
              <span>Download Resume</span>
            </button>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            animate={{
              y: [0, 10, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <ArrowDown className="text-gray-400" size={24} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
