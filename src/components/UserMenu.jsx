import React from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../utils/supabase";
import { LucideLogOut, LucideUser } from "lucide-react";

const UserMenu = ({ user }) => {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.log(error)
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
            src={
              user.user_metadata.avatar_url
                ? user.user_metadata.avatar_url
                : "https://www.canva.com/design/DAGds4G_7NM/YY-9OqM6vmLG0qED63B-Rw/view?embed"
            }
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
        className="flex items-center px-3 py-2 text-sm font-medium text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
      >
        <LucideLogOut className="w-4 h-4 mr-2" />
        Sign Out
      </button>
    </div>
  );
};

export default UserMenu;

/* 
<div style="position: relative; width: 100%; height: 0; padding-top: 100.0000%;
 padding-bottom: 0; box-shadow: 0 2px 8px 0 rgba(63,69,81,0.16); margin-top: 1.6em; margin-bottom: 0.9em; overflow: hidden;
 border-radius: 8px; will-change: transform;">
  <iframe loading="lazy" style="position: absolute; width: 100%; height: 100%; top: 0; left: 0; border: none; padding: 0;margin: 0;"
    src="https://www.canva.com/design/DAGds4G_7NM/YY-9OqM6vmLG0qED63B-Rw/view?embed" allowfullscreen="allowfullscreen" allow="fullscreen">
  </iframe>
</div>
<a href="https:&#x2F;&#x2F;www.canva.com&#x2F;design&#x2F;DAGds4G_7NM&#x2F;YY-9OqM6vmLG0qED63B-Rw&#x2F;view?utm_content=DAGds4G_7NM&amp;utm_campaign=designshare&amp;utm_medium=embeds&amp;utm_source=link" target="_blank" rel="noopener">Vents</a> by rahulalexander123 */
