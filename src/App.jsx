import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { supabase } from '../utils/supabase';
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import StaffDashboard from './pages/StaffDashboard';
import ContactPage from './pages/ContactPage';
import StarryBackground from './components/common/StarryBackground';
import CreateEvent from './components/events/CreateEvent';

const App = () => {
  const [user, setUser] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null);
        console.log('Auth state changed, user:', session?.user);
      }
    );
    return () => authListener?.subscription?.unsubscribe();
  }, []);

  return (
    <Router>
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
          <div className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<HomePage user={user} />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/profile" element={<ProfilePage user={user} />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/staff" element={<StaffDashboard user={user} />} />
              <Route path="/create-event" element={<CreateEvent user={user} />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
};

export default App;
