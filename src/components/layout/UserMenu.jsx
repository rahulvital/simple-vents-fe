import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../../utils/supabase";
import { LucideLogOut, LucideUser } from "lucide-react";

const UserMenu = ({ user }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSignOut = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) throw error;
      
      navigate("/");
    } catch (error) {
      console.error("Sign-out error:", error);
      setError('Sign-out failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center space-x-4">
      <div className="flex items-center">
        {user?.user_metadata?.avatar_url ? (
          <img
            src={user.user_metadata.avatar_url}
            alt={`${user.user_metadata.full_name}'s profile`}
            className="w-8 h-8 rounded-full border-2 border-gray-300"
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
            <LucideUser className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </div>
        )}
        <span className="ml-2 text-sm font-medium">
          {user.user_metadata.full_name || user.email}
        </span>
      </div>
      <button
        onClick={handleSignOut}
        disabled={isLoading}
        className="text-red-500 hover:text-red-700"
      >
        <LucideLogOut className="w-5 h-5" />
      </button>
    </div>
  );
};

export default UserMenu;