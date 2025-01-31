import React, { useState, useEffect } from 'react';
import { supabase } from '../../utils/supabase';
import UserMenu from './UserMenu';

const Auth = ({isDarkMode }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const { data: { user }, error } = await supabase.auth.getUser();
        
        if (error && !error.message.includes('Auth session missing')) {
          throw error;
        }
        
        setUser(user);
        setError(null);
      } catch (error) {
        console.error('Error checking user:', error.message);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
      setError(null);
    });

    checkUser();

    return () => {
      authListener?.unsubscribe?.();
    };
  }, []);

  const signInWithGoogle = async () => {
    try {
      setError(null);
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      if (error) throw error;
    } catch (error) {
      console.error('Error signing in with Google:', error.message);
      setError(error.message);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center p-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-white"></div>
      </div>
    );
  }

  if (error && !error.includes('Auth session missing')) {
    return (
      <div className="text-red-600 dark:text-red-400 text-center p-4">
        {error}
      </div>
    );
  }

  if (user) {
    return <UserMenu user={user} />;
  }

  return (
    <div className="flex flex-col items-center space-y-4">
      <button
        onClick={signInWithGoogle}
        className={`flex items-center px-3 py-3 bg-gray-800 text-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-800 bg-gray-800 ${isDarkMode ? 'hover:bg-blue-800 hover:border-customBlue': ' hover:bg-red-300 hover:border-red-300'}`}
      >
        <img
          src="https://lh3.googleusercontent.com/COxitqgJr1sJnIDe8-jiKhxDx1FrYbtRHKJ9z_hELisAlapwE9LUPh6fcXIfb5vwpbMl4xl9H9TRFPc5NOO8Sb3VSgIBrfRYvW6cUA"
          alt="Google"
          className="w-4 h-4"
        />
      </button>
    </div>
  );
};

export default Auth;