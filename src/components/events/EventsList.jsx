import { useEffect, useState } from 'react';
import EventCard from './EventCard';
import { supabase } from '../../../utils/supabase';

const EventsList = ({ user }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const { data, error } = await supabase
          .from('events')
          .select('*')
          .order('date', { ascending: true });

        if (error) throw error;

        const availableEvents = data.map(event => ({
          ...event,
          spotsLeft: event.capacity - (event.registrations?.[0]?.count || 0)
        }));

        setEvents(availableEvents);
      } catch (error) {
        console.error('Error fetching events:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) return <div className="text-center">Loading events...</div>;

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
