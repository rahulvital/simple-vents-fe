import React from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../../utils/supabase";
import { LucideLogOut, LucideUser } from "lucide-react";

const UserMenu = ({ user }) => {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Sign-out error:', error.message);
        throw error;
      }
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error.message);
    }
  };

  return (
    <div className="flex items-center space-x-4">
      <div className="flex items-center">
        {user?.user_metadata?.avatar_url ? (
          <img
            src={user.user_metadata.avatar_url}
            alt="Profile"
            className="w-8 h-8 rounded-full"
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
            <LucideUser className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </div>
        )}
        <span className="ml-2 text-sm font-medium">
          {user?.user_metadata?.full_name || user?.email}
        </span>
      </div>
      <button
        onClick={handleSignOut}
        className="flex items-center px-3 py-2 text-sm font-medium text-white hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
        alt="Sign Out"
      >
        <LucideLogOut className="w-5 h-5 mr-2" />
      </button>
    </div>
  );
};

export default UserMenu;
