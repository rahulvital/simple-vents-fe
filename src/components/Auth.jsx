import React, { useState, useEffect } from 'react';
import { supabase } from '../../utils/supabase';
import UserMenu from './UserMenu';

const Auth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check current user
    const checkUser = async () => {
      try {
        const { data: { user }, error } = await supabase.auth.getUser();
        
        // Don't treat missing session as an error
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

    // Set up auth state listener
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
      setError(null);
    });

    checkUser();

    // Cleanup
    return () => {
      authListener?.subscription?.unsubscribe();
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

  // Only show actual errors, not the missing session message
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

  // Show sign-in button when not logged in
  return (
    <div className="flex flex-col items-center space-y-4">
      <button
        onClick={signInWithGoogle}
        className="flex items-center px-6 py-3 bg-white text-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-300"
      >
        <img
          src="/api/placeholder/20/20"
          alt="Google"
          className="w-5 h-5 mr-3"
        />
        Sign in with Google
      </button>
    </div>
  );
};

export default Auth;