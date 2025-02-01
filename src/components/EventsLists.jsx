import { useEffect, useState } from "react";
import { supabase } from "../../utils/supabase";

const EventsLists = ({ isDarkMode, user }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getEvents();
  }, [isDarkMode]);

  const getEvents = async () => {
    try {
      setLoading(true);
      setError(null);

      // Check if the user is authenticated
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();

      if (sessionError || !session) {
        throw new Error('You must be logged in to view events.');
      } else {
        console.log('User authenticated:', session);
        console.log('User role:', session.user.role);
      }

      // Fetch events from the `events` table
      const { data: events, error } = await supabase
        .from('events')
        .select('*');

      if (error) {
        throw error;
      }

      console.log('Events fetched successfully:', events);
      setEvents(events || []);
    } catch (error) {
      console.error('Error fetching events:', error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center p-4">Loading events...</div>;
  }

  if (error) {
    return <div className="text-red-600 text-center p-4">Error: {error}</div>;
  }

  return (
    <div className={`p-4 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
      <h1 className="text-2xl font-bold mb-4">Events</h1>
      {events.length === 0 ? (
        <p>No events found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {events.map((event) => (
            <div key={event.id} className={`p-4 rounded-lg shadow-md ${isDarkMode ? "bg-gray-800" : "bg-white"}`}>
              <h2 className="text-xl font-bold mb-2">{event.title}</h2>
              <p className="text-sm text-gray-500 mb-2">
                {new Date(event.created_at).toLocaleDateString()}
              </p>
              <p className="text-lg">{event.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EventsLists;