import React from "react";
import { motion } from "framer-motion";
import EventsLists from "./EventsLists";

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
    <div >
      <h2 className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-10 text-center" tabIndex="-1" >
        Welcome to My Events
      </h2>
    </div>
      <div className={`container mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-20`}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-6 rounded-xl bg-gray-100 dark:bg-gray-800 shadow-md">
            <p className="text-xl font-bold mb-4">Event 1</p>
            <img
              src="https://images.pexels.com/photos/30434990/pexels-photo-30434990/free-photo-of-portrait-of-a-fluffy-dog-against-blue-sky.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
              alt="Event 1"
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <p className="text-lg leading-relaxed">
              This is an event description. It's a short summary of the event.
            </p>
          </div>
          <div className="p-6 rounded-xl bg-gray-100 dark:bg-gray-800 shadow-md">
            <p className="text-xl font-bold mb-4">Event 2</p>
            <img
              src="https://images.pexels.com/photos/30434990/pexels-photo-30434990/free-photo-of-portrait-of-a-fluffy-dog-against-blue-sky.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
              alt="Event 2"
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <p className="text-lg leading-relaxed">
              Another event description. Learn more about this upcoming event.
            </p>
          </div>
          <div className="p-6 rounded-xl bg-gray-100 dark:bg-gray-800 shadow-md">
            <p className="text-xl font-bold mb-4">Event 3</p>
            <img
              src="https://images.pexels.com/photos/30434990/pexels-photo-30434990/free-photo-of-portrait-of-a-fluffy-dog-against-blue-sky.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
              alt="Event 3"
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <p className="text-lg leading-relaxed">
              Here's another event description. Stay tuned for more details!
            </p>
          </div>
        </div>
        <EventsLists isDarkMode={isDarkMode} user={user} />
      </div>
    </motion.div>
  );
};

export default Home;
