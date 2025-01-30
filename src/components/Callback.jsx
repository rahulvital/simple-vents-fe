import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../utils/supabase';

const Callback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Supabase automatically handles OAuth callback
    const handleOAuthRedirect = async () => {
      const { data, error } = await supabase.auth.getSession();
      
      if (error) {
        console.error('OAuth Error:', error.message);
      } else {
        console.log('User authenticated:', data);
        navigate('/'); // Redirect after successful login
      }
    };

    handleOAuthRedirect();
  }, [navigate]);

  return <div>Loading...</div>;
};

export default Callback;
