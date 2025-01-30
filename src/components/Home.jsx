import React from 'react';
import { motion } from 'framer-motion';

const Home = ({isDarkMode}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      role="region"
      aria-label="About me section"
      aria-live="polite"
    >
      <h2 className="text-4xl font-bold mb-10 mt-8 text-center" tabIndex="-1">My Events</h2>
      <div className="p-6 rounded-xl bg-gray-100 dark:bg-gray-800">
        <p className="text-xl leading-relaxed mb-4">
          <span className='font-bold'>EVENT</span>
        </p>
      </div> 
      <figure>
        <img 
          src='https://images.pexels.com/photos/30434990/pexels-photo-30434990/free-photo-of-portrait-of-a-fluffy-dog-against-blue-sky.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load' 
          alt='Stock photo for now' 
          className="w-full max-w-md mx-auto my-4 rounded-lg shadow-lg" 
        />
      </figure>
      <div className="p-6 rounded-xl bg-gray-100 dark:bg-gray-800">
        <p className="text-xl leading-relaxed mb-4">
        <span className='font-bold'>EVENT</span>
        </p>
      </div>
      <figure>
        <img 
          src='https://images.pexels.com/photos/30434990/pexels-photo-30434990/free-photo-of-portrait-of-a-fluffy-dog-against-blue-sky.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load' 
          alt='Stock photo for now' 
          className="w-full max-w-md mx-auto my-4 rounded-lg shadow-lg" 
        />
      </figure>
      <div className="p-6 rounded-xl bg-gray-100 dark:bg-gray-800">
        <p className="text-xl leading-relaxed mb-4">
        <span className='font-bold'>EVENT</span>
        </p>
      </div>
    </motion.div>
  );
};

export default Home;