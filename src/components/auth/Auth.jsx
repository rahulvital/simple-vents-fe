import React, { useState, useEffect } from 'react';
import { supabase } from '../../../utils/supabase';
import UserMenu from '../layout/UserMenu';
import { getBaseUrl } from '../../../utils/urlConfig';

const Auth = ({ isDarkMode }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          console.error('Session retrieval error:', sessionError);
          setError(sessionError.message);
          setLoading(false);
          return;
        }

        if (session?.user) {
          const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', session.user.id)
            .single();

          if (profileError && profileError.code !== 'PGRST116') {
            console.error('Profile fetch error:', profileError);
            setError(profileError.message);
          }

          if (profileError?.code === 'PGRST116') {
            const { error: insertError } = await supabase
              .from('profiles')
              .insert({
                id: session.user.id,
                role: 'user',
                email: session.user.email
              });

            if (insertError) {
              console.error('Profile creation error:', insertError);
            }
          }

          setUser({
            ...session.user,
            role: profile?.role || 'user'
          });
        }
      } catch (catchError) {
        console.error('Unexpected authentication error:', catchError);
        setError(catchError.message);
      } finally {
        setLoading(false);
      }
    };

    checkSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        setUser(session.user);
      } else {
        localStorage.clear();
        setUser(null);
      }
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signInWithGoogle = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${getBaseUrl()}/auth/callback`,
          scopes: 'https://www.googleapis.com/auth/calendar',
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      });
      
      if (error) {
        console.error('Google sign-in error:', error);
        setError(error.message);
        setLoading(false);
      }
    } catch (error) {
      console.error('Unexpected sign-in error:', error);
      setError('Sign-in failed');
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center p-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-white"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-600 dark:text-red-400 text-center p-4">
        {error}
        <button 
          onClick={() => {
            setError(null);
            setLoading(true);
          }} 
          className="ml-2 text-sm underline"
        >
          Retry
        </button>
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
        disabled={loading}
        className={`flex items-center px-3 py-3 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border ${
          isDarkMode 
            ? 'bg-gray-800 text-white hover:bg-blue-800 border-customBlue' 
            : 'bg-white text-gray-800 hover:bg-gray-50 border-gray-300'
        } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <img
          src="https://lh3.googleusercontent.com/COxitqgJr1sJnIDe8-jiKhxDx1FrYbtRHKJ9z_hELisAlapwE9LUPh6fcXIfb5vwpbMl4xl9H9TRFPc5NOO8Sb3VSgIBrfRYvW6cUA"
          alt="Google"
          className="w-4 h-4"
        />
        <span className="ml-2">Sign in with Google</span>
      </button>
    </div>
  );
};

export default Auth;