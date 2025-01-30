import React from 'react';
import { supabase } from '../../utils/supabase'; // Import the supabase client

const Login = ({ setUser }) => {
  // Handle OAuth login
  const handleLogin = async (provider) => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider, // This will be either 'google' or 'github' depending on the button clicked
        options: {
          redirectTo: 'http://localhost:3000/auth/callback', // Replace with your actual redirect URL
        },
      });

      if (error) throw error;
      if (data.url) {
        window.location.href = data.url; // Redirect to the OAuth provider's login page
      }
    } catch (error) {
      console.error('Error during OAuth login:', error.message);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <button onClick={() => handleLogin('google')}>Login with Google</button>
      <button onClick={() => handleLogin('github')}>Login with GitHub</button>
    </div>
  );
};

export default Login;
