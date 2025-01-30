import React from 'react';
import { motion } from 'framer-motion';
import northcoders from '../assets/northcoders-logo.png';
import recipebox from '../assets/recipe-box-icon.png';
import { LucideGithub } from 'lucide-react';

const Projects = ({ events }) => {
    const projectData = [
        {
            title: "NC News",
            description: "NC News is a dynamic news platform created as a solo project. It allows users to interact with articles by creating, deleting, and filtering them by topic. The platform's backend is powered by PostgresSQL, while a responsive React-based frontend ensures an engaging user experience. This project emphasises real-time data interaction and streamlined content management.",
            project_url: "https://github.com/rahulvital/fe-nc-news.git",
            color: "text-pink-500",
            logo: northcoders,
            alt: "Northcoders project logo"
        },
        {
            title: "RecipeBox",
            description: "RecipeBox is a mobile application designed for compiling recipes from social media platforms like TikTok and Instagram. Built using React Native, Expo, and Firebase, it provides a seamless user interface for adding and organizing recipes, including manual input options. Key features include personalized user collections and responsive builds for Android and iOS with easy navigation and interaction.",
            project_url: "https://github.com/bitbybit-nc/RecipeBox.git",
            color: "text-orange-500",
            logo: recipebox,
            alt: "RecipeBox project logo"
        }
    ];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            aria-live="polite"
            aria-atomic="true"
        >
            <h2 className="text-4xl font-bold mb-8 text-center" tabIndex="-1">My Projects</h2>
            <div 
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
              role="list"
              aria-label="Projects list"
            >
                {projectData.map((project) => (
                    <motion.article
                        key={project.title}
                        className="p-6 text-center rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white dark:bg-gray-800 relative"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        role="listitem"
                        aria-live="polite"
                    >
                        <div>
                            <h3 className={`text-2xl font-bold mb-3 ${project.color}`} tabIndex="-1">{project.title}</h3>
                            <img 
                              className='rounded-lg shadow-sm mx-auto my-4' 
                              src={project.logo} 
                              alt={project.alt} 
                              width={100} 
                              height={100}
                            />
                        </div>
                        <p className="mb-4">{project.description}</p>
                        <div className='absolute bottom-4 left-4 flex items-center'>
                            <a 
                              href={project.project_url} 
                              className="text-blue-500 hover:text-blue-600 transition-colors duration-300 ml-2"
                              aria-label={`View ${project.title} source code on GitHub (opens in new tab)`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <LucideGithub size={24} aria-hidden="true" />
                            </a>
                        </div>
                    </motion.article>
                ))}
            </div>
        </motion.div>
    );
};

export default Projects;