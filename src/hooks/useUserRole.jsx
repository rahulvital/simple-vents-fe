import { useEffect, useState } from 'react';
import { supabase } from '../../utils/supabase';

const useUserRole = (user) => {
  const [role, setRole] = useState('user');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRole = async () => {
      if (!user) {
        setLoading(false);
        return;
      }
      
      const { data, error } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

      if (!error && data) setRole(data.role);
      setLoading(false);
    };

    fetchRole();
  }, [user]);

  return { role, loading };
};

export default useUserRole;