import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { supabase } from '../utils/supabase';
import Callback from './components/Callback';
import Home from './components/Home';
import Profile from './components/Profile';
import Header from './components/Header'; 
import Sidebar from './components/Sidebar'; 
import LoginPage from './components/LoginPage';
import StarryBackground from './components/StarryBackground';
import Contact from './components/Contact';
import EventsLists from './components/EventsLists';

const App = () => {
  const [user, setUser] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (!error || error.message.includes('Auth session missing')) {
        setUser(user);
      }
  
      const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
        setUser(session?.user ?? null);
      });
  
      return () => {
        authListener?.subscription?.unsubscribe();
      };
    };
  
    getUser();
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Router basename="/simple-vents-fe" >
      {location.pathname === '/' && !user && <StarryBackground isDarkMode={isDarkMode} />}
      <div className={`min-h-screen ${isDarkMode ? 'dark text-white' : 'text-gray-900'}`}>
        <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} isDarkMode={isDarkMode} />
        <StarryBackground isDarkMode={isDarkMode} user={user} />
        <main className={`transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`} id="main-content">
          <div className={`container mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-20`}>
            <Routes>
              <Route path="/" element={user ? <Home user={user}/> : <LoginPage isDarkMode={isDarkMode} />} />
              <Route path="/auth/callback" element={<Callback />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
};

export default App;