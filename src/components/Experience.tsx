import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Award, BookOpen } from 'lucide-react';

const Experience = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { x: -50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const
      }
    }
  };

  const experiences = [
    {
      type: 'work',
      title: 'Senior Full Stack Developer',
      company: 'Tech Innovations Inc.',
      location: 'San Francisco, CA',
      period: 'Jan 2023 - Present',
      description: [
        'Led development of microservices architecture serving 1M+ users',
        'Implemented CI/CD pipelines reducing deployment time by 60%',
        'Mentored team of 5 junior developers',
        'Optimized database queries improving performance by 40%'
      ],
      icon: <Award className="text-primary-400" size={24} />
    },
    {
      type: 'work',
      title: 'Full Stack Developer',
      company: 'Digital Solutions Ltd.',
      location: 'New York, NY',
      period: 'Jun 2021 - Dec 2022',
      description: [
        'Developed and maintained 10+ React applications',
        'Collaborated with UX team to implement responsive designs',
        'Integrated third-party APIs and payment gateways',
        'Participated in agile development processes'
      ],
      icon: <Award className="text-primary-400" size={24} />
    },
    {
      type: 'education',
      title: 'Bachelor of Science in Computer Science',
      company: 'University of Technology',
      location: 'Boston, MA',
      period: 'Sep 2017 - May 2021',
      description: [
        'GPA: 3.8/4.0',
        'Relevant coursework: Data Structures, Algorithms, Web Development',
        'Dean\'s List for 6 semesters',
        'President of Computer Science Club'
      ],
      icon: <BookOpen className="text-secondary-400" size={24} />
    },
    {
      type: 'education',
      title: 'Full Stack Web Development Bootcamp',
      company: 'Coding Academy',
      location: 'Online',
      period: 'Jan 2021 - Apr 2021',
      description: [
        'Intensive 16-week program covering MERN stack',
        'Built 5 full-stack applications',
        'Learned modern development practices and tools',
        'Received certificate of excellence'
      ],
      icon: <BookOpen className="text-secondary-400" size={24} />
    }
  ];

  const TimelineItem = ({ item, index }: { item: any; index: number }) => (
    <motion.div
      variants={itemVariants}
      className={`flex items-start mb-12 ${
        index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
      }`}
    >
      {/* Content */}
      <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:pr-8 md:text-right' : 'md:pl-8'}`}>
        <motion.div
          whileHover={{ scale: 1.02, y: -5 }}
          transition={{ duration: 0.3 }}
          className="glass-card p-6"
        >
          <div className="flex items-center gap-3 mb-3 md:justify-end">
            {item.icon}
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              item.type === 'work' 
                ? 'bg-primary-500/20 text-primary-400' 
                : 'bg-secondary-500/20 text-secondary-400'
            }`}>
              {item.type === 'work' ? 'Work' : 'Education'}
            </span>
          </div>
          
          <h3 className="text-xl font-bold text-white mb-2">
            {item.title}
          </h3>
          
          <h4 className="text-lg text-primary-400 mb-3">
            {item.company}
          </h4>
          
          <div className="flex items-center gap-4 text-gray-400 text-sm mb-4 md:justify-end">
            <div className="flex items-center gap-1">
              <Calendar size={16} />
              <span>{item.period}</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin size={16} />
              <span>{item.location}</span>
            </div>
          </div>
          
          <ul className="space-y-2">
            {item.description.map((desc: string, descIndex: number) => (
              <li key={descIndex} className="text-gray-300 text-sm flex items-start">
                <span className="text-primary-400 mr-2">•</span>
                {desc}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* Timeline Dot */}
      <div className="relative flex items-center justify-center w-12 h-12 mx-4 md:mx-0">
        <div className="absolute w-1 h-full bg-gradient-to-b from-primary-500 to-secondary-500" />
        <div className="relative w-12 h-12 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center z-10">
          <div className="w-4 h-4 bg-gray-900 rounded-full" />
        </div>
      </div>

      {/* Empty space for alternating layout */}
      <div className="md:w-1/2" />
    </motion.div>
  );

  return (
    <section id="experience" className="py-20 px-6 bg-gradient-to-b from-transparent to-white/5">
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
              <span className="gradient-text">Experience & Education</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary-400 to-secondary-400 mx-auto rounded-full" />
            <p className="text-gray-400 mt-6 max-w-2xl mx-auto">
              My professional journey and academic background
            </p>
          </motion.div>

          {/* Timeline */}
          <div className="relative">
            {experiences.map((item, index) => (
              <TimelineItem key={index} item={item} index={index} />
            ))}
          </div>

          {/* Call to Action */}
          <motion.div
            variants={itemVariants}
            className="text-center mt-16"
          >
            <div className="glass-card p-8 rounded-2xl max-w-3xl mx-auto">
              <h3 className="text-2xl font-bold gradient-text mb-4">
                Open to Opportunities
              </h3>
              <p className="text-gray-300 mb-6">
                I'm always interested in hearing about new opportunities and exciting projects. 
                Whether you have a question or just want to say hi, feel free to reach out!
              </p>
              <button className="btn-primary">
                Get In Touch
              </button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
