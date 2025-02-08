import React from 'react';
import { motion } from 'framer-motion';
import EventsList from '../components/events/EventsList'
const Home = ({ isDarkMode, user }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      role="region"
      aria-label="Home section"
      aria-live="polite"
    >
      <div className={`container mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-20`}>
        <h2 className={`text-3xl sm:text-4xl font-bold mb-6 sm:mb-10 text-center ${isDarkMode ? 'text-white' : 'text-black'}`} tabIndex="-1">
          <span className='dark:text-white'>e</span><span className='text-customDark dark:text-blue-500'>Vents</span><span className='dark:text-white'>near you!</span>
        </h2>
        <EventsList user={user} />
      </div>
    </motion.div>
  );
};

export default Home;