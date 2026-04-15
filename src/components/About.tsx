import React from 'react';
import { motion } from 'framer-motion';
import { Code, Lightbulb, Users, Target } from 'lucide-react';

const About = () => {
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
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut" as const
      }
    }
  };

  const strengths = [
    {
      icon: <Code className="text-primary-400" size={32} />,
      title: "Problem Solving",
      description: "Analytical approach to complex challenges with efficient solutions"
    },
    {
      icon: <Lightbulb className="text-primary-400" size={32} />,
      title: "UI Design",
      description: "Creating intuitive and visually appealing user interfaces"
    },
    {
      icon: <Users className="text-primary-400" size={32} />,
      title: "Team Collaboration",
      description: "Excellent communication and teamwork in agile environments"
    },
    {
      icon: <Target className="text-primary-400" size={32} />,
      title: "Goal Oriented",
      description: "Focused on delivering high-quality results on time"
    }
  ];

  return (
    <section id="about" className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {/* Section Title */}
          <motion.div
            variants={itemVariants}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="gradient-text">About Me</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary-400 to-secondary-400 mx-auto rounded-full" />
          </motion.div>

          {/* About Content */}
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <motion.div
              variants={itemVariants}
              className="space-y-6"
            >
              <p className="text-lg text-gray-300 leading-relaxed">
                I'm a passionate Full Stack Developer with over 3 years of experience in building 
                scalable web applications. I specialize in React, Node.js, and modern web technologies 
                that help businesses create exceptional digital experiences.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                My journey in web development started with a curiosity about how things work on the 
                internet, and has evolved into a career focused on creating solutions that make a 
                real impact. I believe in writing clean, maintainable code and staying up-to-date 
                with the latest industry trends.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                When I'm not coding, you'll find me exploring new technologies, contributing to 
                open-source projects, or sharing knowledge through technical writing and mentoring.
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="glass-card p-8 rounded-2xl"
            >
              <h3 className="text-2xl font-bold mb-6 gradient-text">Quick Facts</h3>
              <div className="space-y-4">
                <div className="flex justify-between py-2 border-b border-gray-700">
                  <span className="text-gray-400">Experience</span>
                  <span className="text-white font-medium">3+ Years</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-700">
                  <span className="text-gray-400">Projects Completed</span>
                  <span className="text-white font-medium">25+</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-700">
                  <span className="text-gray-400">Happy Clients</span>
                  <span className="text-white font-medium">15+</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-400">Technologies</span>
                  <span className="text-white font-medium">10+</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Strengths Grid */}
          <motion.div
            variants={itemVariants}
            className="mb-16"
          >
            <h3 className="text-2xl font-bold text-center mb-12 gradient-text">
              Core Strengths
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {strengths.map((strength, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -5, scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                  className="glass-card p-6 text-center group"
                >
                  <div className="flex justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    {strength.icon}
                  </div>
                  <h4 className="text-xl font-semibold mb-2 text-white">
                    {strength.title}
                  </h4>
                  <p className="text-gray-400 text-sm">
                    {strength.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
