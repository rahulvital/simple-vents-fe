import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { supabase } from '../utils/supabase';
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import StaffDashboard from './pages/StaffDashboard';
import StarryBackground from './components/common/StarryBackground';
import CreateEvent from './components/events/CreateEvent';
import Callback from './components/auth/Callback';
import './App.css';
import EventsPage from './pages/EventsPage';

const App = () => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      setToken(session?.provider_token);
    });
    return () => authListener?.subscription?.unsubscribe();
  }, []);

  useEffect(() => {
    if (token) {
      localStorage.setItem('google_provider_token', token);
    }
  }, [token]);

  return (
    <Router basename='/simple-vents-fe'>
      <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
        <StarryBackground isDarkMode={isDarkMode} />
        <Header
          user={user}
          isDarkMode={isDarkMode}
          toggleDarkMode={() => setIsDarkMode(!isDarkMode)}
          toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        />
        <Sidebar
          isOpen={isSidebarOpen}
          toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          isStaff={user?.user_metadata?.is_staff}
        />
        <main className={`pt-16 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
          <div className="container mx-auto px-4">
            <Routes>
              <Route path="/" element={<HomePage user={user} />} />
              <Route path="/login" element={<LoginPage isDarkMode={isDarkMode} />} />
              <Route path="/staff" element={<StaffDashboard user={user} />} />
              <Route path="/create-event" element={<CreateEvent user={user} />} />
              <Route path="/auth/callback" element={<Callback />} />
              <Route path="/events/:id" element={<EventsPage user={user} />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
};

export default App;
