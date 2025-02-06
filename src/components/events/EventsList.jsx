import { useEffect, useState } from 'react';
import EventCard from './EventCard';
import { supabase } from '../../../utils/supabase';

const EventsList = ({ user }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('events')
          .select(`
            *,
            registrations (
              id
            )
          `)
          .order('date', { ascending: true });

        if (error) {
          console.error('Detailed fetch error:', error);
          setError(error.message || 'Failed to fetch events');
          return;
        }

        if (!isMounted) return;

        const availableEvents = data.map(event => ({
          ...event,
          spotsLeft: event.capacity - event.registrations.length
        }));

        setEvents(availableEvents);
        setError(null);
      } catch (error) {
        console.error('Unexpected events fetch error:', error);
        setError('An unexpected error occurred while fetching events');
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchEvents();

    return () => {
      isMounted = false;
    };
  }, [user]); 

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900 dark:border-white"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center p-8">
        {error}
        <button 
          onClick={() => window.location.reload()} 
          className="ml-2 underline text-sm"
        >
          Retry
        </button>
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="text-center text-gray-600 dark:text-gray-400 p-8">
        No events available at the moment.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map(event => (
        <EventCard 
          key={event.id}
          event={event}
          user={user}
        />
      ))}
    </div>
  );
};

export default EventsList;