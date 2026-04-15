import React from 'react';
import { motion } from 'framer-motion';
import { 
  Code, 
  Cpu, 
  Globe, 
  Layout, 
  Server, 
  Terminal, 
  GitBranch, 
  Database,
  Palette,
  FileCode
} from 'lucide-react';

const Skills = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const
      }
    }
  };

  const skillsData = {
    frontend: [
      { name: 'React', icon: Code, level: 90, color: 'text-cyan-400' },
      { name: 'JavaScript', icon: Cpu, level: 85, color: 'text-yellow-400' },
      { name: 'TypeScript', icon: FileCode, level: 80, color: 'text-blue-400' },
      { name: 'HTML5', icon: Globe, level: 95, color: 'text-orange-400' },
      { name: 'CSS3', icon: Layout, level: 90, color: 'text-blue-500' },
      { name: 'Tailwind CSS', icon: Palette, level: 85, color: 'text-teal-400' },
    ],
    backend: [
      { name: 'Node.js', icon: Server, level: 85, color: 'text-green-400' },
      { name: 'Python', icon: Terminal, level: 75, color: 'text-blue-400' },
      { name: 'Express.js', icon: Server, level: 80, color: 'text-gray-400' },
      { name: 'MongoDB', icon: Database, level: 70, color: 'text-green-500' },
      { name: 'PostgreSQL', icon: Database, level: 65, color: 'text-blue-600' },
      { name: 'REST APIs', icon: Server, level: 90, color: 'text-purple-400' },
    ],
    tools: [
      { name: 'Git', icon: GitBranch, level: 85, color: 'text-red-400' },
      { name: 'GitHub', icon: GitBranch, level: 90, color: 'text-gray-400' },
      { name: 'VS Code', icon: FileCode, level: 95, color: 'text-blue-400' },
      { name: 'Figma', icon: Palette, level: 70, color: 'text-purple-400' },
      { name: 'Docker', icon: Server, level: 60, color: 'text-blue-500' },
      { name: 'AWS', icon: Server, level: 65, color: 'text-orange-400' },
    ]
  };

  const SkillCard = ({ skill, index }: { skill: any; index: number }) => (
    <motion.div
      variants={itemVariants}
      whileHover={{ scale: 1.05, y: -5 }}
      transition={{ duration: 0.3 }}
      className="glass-card p-6 group"
    >
      <div className="flex items-center mb-4">
        <div className={`p-3 rounded-lg bg-white/10 group-hover:bg-white/20 transition-colors duration-300`}>
          <skill.icon className={`${skill.color}`} size={24} />
        </div>
        <div className="ml-4 flex-1">
          <h4 className="text-white font-semibold">{skill.name}</h4>
          <div className="text-sm text-gray-400">{skill.level}%</div>
        </div>
      </div>
      
      {/* Progress Bar */}
      <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          transition={{ duration: 1, delay: index * 0.1, ease: "easeOut" as const }}
          className="h-full bg-gradient-to-r from-primary-400 to-secondary-400 rounded-full"
        />
      </div>
    </motion.div>
  );

  return (
    <section id="skills" className="py-20 px-6 bg-gradient-to-b from-transparent to-white/5">
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
              <span className="gradient-text">Technical Skills</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary-400 to-secondary-400 mx-auto rounded-full" />
            <p className="text-gray-400 mt-6 max-w-2xl mx-auto">
              A comprehensive overview of my technical expertise and proficiency levels
            </p>
          </motion.div>

          {/* Skills Categories */}
          <div className="space-y-12">
            {Object.entries(skillsData).map(([category, skills], categoryIndex) => (
              <motion.div
                key={category}
                variants={itemVariants}
                className="space-y-6"
              >
                <h3 className="text-2xl font-bold text-white capitalize mb-6">
                  {category === 'frontend' ? 'Frontend Development' : 
                   category === 'backend' ? 'Backend Development' : 
                   'Tools & Technologies'}
                </h3>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {skills.map((skill, skillIndex) => (
                    <SkillCard 
                      key={skill.name} 
                      skill={skill} 
                      index={categoryIndex * 10 + skillIndex}
                    />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Additional Info */}
          <motion.div
            variants={itemVariants}
            className="mt-16 text-center"
          >
            <div className="glass-card p-8 rounded-2xl max-w-3xl mx-auto">
              <h3 className="text-xl font-bold gradient-text mb-4">
                Always Learning
              </h3>
              <p className="text-gray-300">
                I'm continuously expanding my skill set and staying updated with the latest 
                technologies. Currently exploring advanced React patterns, cloud architecture, 
                and machine learning fundamentals.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
