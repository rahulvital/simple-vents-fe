import React, { useState, useEffect } from 'react';
import { supabase } from '../../../utils/supabase';
import UserMenu from '../layout/UserMenu';
import { useNavigate } from 'react-router-dom';

const Auth = ({ isDarkMode }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); 

  useEffect(() => {
    let isMounted = true;

    const handleAuthStateChange = async (event, session) => {
      if (session?.user) {
        try {
          const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', session.user.id)
            .single();

          console.log(profile, "<<<<< profile");

          if (!profileError) {
            const userData = {
              ...session.user,
              role: profile?.role || 'user',
            };

            if (isMounted) {
              setUser(userData);
              await supabase.auth.updateUser({
                data: { role: userData.role },
              });
            }
          }
        } catch (error) {
          console.error('Error handling auth state:', error.message);
          if (isMounted) setError(error.message);
        }
      } else {
        console.log('No session found');
        if (isMounted) setUser(null);
      }
      if (isMounted) setLoading(false);
    };

    const getSession = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) {
        console.error('Error getting session:', error.message);
        if (isMounted) setError(error.message);
      }
      await handleAuthStateChange('INITIAL', session);
    };

    getSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(handleAuthStateChange);

    return () => {
      isMounted = false;
      subscription?.unsubscribe();
    };
  }, []);

  const signInWithGoogle = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      });
      if (error) throw error;
    } catch (error) {
      console.error('Google sign-in error:', error.message);
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
    return <UserMenu user={user} role={user.role} />;
  }

  return (
    <div className="flex flex-col items-center space-y-4">
      <button
        onClick={signInWithGoogle}
        className={`flex items-center px-3 py-3 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border ${
          isDarkMode 
            ? 'bg-gray-800 text-white hover:bg-blue-800 border-customBlue' 
            : 'bg-white text-gray-800 hover:bg-gray-50 border-gray-300'
        }`}
      >
        <img
          src="https://lh3.googleusercontent.com/COxitqgJr1sJnIDe8-jiKhxDx1FrYbtRHKJ9z_hELisAlapwE9LUPh6fcXIfb5vwpbMl4xl9H9TRFPc5NOO8Sb3VSgIBrfRYvW6cUA"
          alt="Google"
          className="w-4 h-4"
        />
      </button>
      <button
        onClick={() => navigate(-1)}
        className="mt-4 text-sm text-gray-600 hover:underline"
      >
        Go Back
      </button>
    </div>
  );
};

export default Auth;
