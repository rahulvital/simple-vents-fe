import React from "react";
import { motion } from "framer-motion";
import Auth from "../components/auth/Auth";
import StarryBackground from "../components/common/StarryBackground";

const LoginPage = ({ isDarkMode }) => {
  return (
    <>
      <StarryBackground isDarkMode={isDarkMode} />
      {!isDarkMode && (
        <img
          src="/branch-left.svg"
          alt="Left Branch"
          className="absolute top-20 left-0 h-64 w-auto opacity-50 hidden md:block"
        />
      )}
      {!isDarkMode && (
        <img
          src="/branch-right.svg"
          alt="Right Branch"
          className="absolute top-40 right-0 h-64 w-auto opacity-50 hidden md:block"
        />
      )}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-20 relative top-10">
        <div className="max-w-md mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`p-8 rounded-xl ${
              isDarkMode
                ? "bg-customBlue shadow-lg"
                : "bg-gradient-to-r from-customDark to-customDark2 text-white shadow-lg"
            } relative z-10`}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-center">
              Welcome to Vents!
            </h2>
            <div className="flex justify-center mb-6">
              <img
                src="https://images.pexels.com/photos/30434990/pexels-photo-30434990/free-photo-of-portrait-of-a-fluffy-dog-against-blue-sky.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
                alt="Event 1"
                className="w-32 h-32 sm:w-48 sm:h-48 object-cover rounded-full border-4 border-white shadow-md"
              />
            </div>
            <p className="text-lg leading-relaxed text-center mb-6">
              Sign in below to get venting!
            </p>
            <div className="flex justify-center">
              <Auth isDarkMode={isDarkMode} />
            </div>
          </motion.div>
        </div>
      </div>
      <img
        src={isDarkMode ? "/snow-left.svg" : "/hill-left.svg"}
        alt="Left hill"
        className="absolute bottom-0 left-0 h-100 w-auto z-0"
      />
      <img
        src={isDarkMode ? "/snow-right.svg" : "/hill-right.svg"}
        alt="Right hill"
        className="absolute bottom-0 right-0 h-100 w-auto z-0"
      />
    </>
  );
};

export default LoginPage;