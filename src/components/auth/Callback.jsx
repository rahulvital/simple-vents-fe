import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../../utils/supabase';

const Callback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleOAuthRedirect = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        console.error('OAuth Error:', error.message);
      } else {
        navigate('/');
      }
    };

    handleOAuthRedirect();
  }, [navigate]);

  return <div>Loading...</div>;
};

export default Callback;
