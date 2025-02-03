import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LucideGithub, LucideLinkedin, LucideSend } from 'lucide-react';

const Contact = () => {
  const [formStatus, setFormStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    setFormStatus('Sending...');

    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: new FormData(form),
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setFormStatus('Message sent successfully!');
        form.reset();
      } else {
        setFormStatus('Oops! There was a problem sending your message.');
      }
    } catch (error) {
      setFormStatus('Oops! There was a problem sending your message.');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <h2 className="text-4xl font-bold mb-6 text-center">Connect with me</h2>
      <div className="p-6 rounded-xl bg-gray-100 dark:bg-gray-800">
        <div className="flex justify-center items-center mb-8 space-x-4">
          <a href="https://github.com/rahulvital" className="text-gray-600 hover:text-customPurple dark:text-gray-300 dark:hover:text-white transition-colors duration-300">
            <LucideGithub size={32} />
          </a>
          <a href="https://www.linkedin.com/in/rahul-v-16a61694/" className="text-gray-600 hover:text-customPurple dark:text-gray-300 dark:hover:text-white transition-colors duration-300">
            <LucideLinkedin size={32} />
          </a>
        </div>
        <form
          onSubmit={handleSubmit}
          action="https://formspree.io/f/mrbggbbo"
          method="POST"
          className="space-y-4"
        >
          <div>
            <label htmlFor="name" className="block mb-1">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="w-full px-3 py-2 text-gray-800 bg-white rounded dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div>
            <label htmlFor="email" className="block mb-1">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full px-3 py-2 text-gray-800 bg-white rounded dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div>
            <label htmlFor="message" className="block mb-1">Message</label>
            <textarea
              id="message"
              name="message"
              required
              rows="4"
              className="w-full px-3 py-2 text-gray-800 bg-white rounded dark:bg-gray-700 dark:text-white"
            ></textarea>
          </div>
          <div className="flex items-center space-x-4">
            <button type="submit" className="bg-customDark2 text-white px-6 py-2 rounded hover:bg-white hover:text-black transition-colors duration-300 flex items-center">
              Send Message
              <LucideSend size={18} className="ml-2" />
            </button>
            {formStatus && (
              <p className="text-sm font-semibold">{formStatus}</p>
            )}
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default Contact;