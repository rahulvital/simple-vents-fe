import { useEffect, useState } from 'react';
import CreateEvent from '../components/events/CreateEvent';
import useUserRole from '../hooks/useUserRole';
import { supabase } from '../../utils/supabase';

const StaffDashboard = ({ user }) => {
  const [staffEvents, setStaffEvents] = useState([]);
  const [error, setError] = useState(null);
  const { role, loading } = useUserRole(user);

  useEffect(() => {
    if (!loading && role === 'staff') {
      fetchUserEvents();
    }
  }, [loading, role]);

  const fetchUserEvents = async () => {
    try {
      const { data: events, error } = await supabase
        .from('events')
        .select('id, user_id, title, description, capacity, date, img, registrations')
        .eq('user_id', user.id)
        .order('date', { ascending: true });
      if (error) {
        console.error('Detailed fetch error:', error);
        setError(error.message || 'Failed to fetch your events');
        return;
      }

      const yourStaffEvents = events.map(event => ({
        ...event,
        spotsLeft: event.capacity - (event.registrations?.length || 0)
      }));

      setStaffEvents(yourStaffEvents);
    } catch (error) {
      console.error('Unexpected events fetch error:', error);
      setError('An unexpected error occurred while fetching events');
    }
  };

  return (
    <div className="space-y-8">
      {loading && <div>Loading permissions...</div>}
      {!loading && role !== 'staff' && (
        <div className="text-center py-8">Staff access required</div>
      )}
      {!loading && role === 'staff' && (
        <>
          <CreateEvent userId={user.id} />
          <h2 className="text-2xl font-bold">Your Events</h2>
          {error && <p className="text-red-500 dark:text-red-400">{error}</p>}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {staffEvents.map(event => (
              <div key={event.id} className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
                {event.img && (
                  <img 
                    src={event.img} 
                    alt={event.title} 
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-4">
                  <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{event.description}</p>
                  <p className="text-gray-500 dark:text-gray-400">
                    Spots left: {event.spotsLeft} / {event.capacity}
                  </p>
                  {event.registrations && event.registrations.length > 0 && (
                    <div className="mt-2">
                      <strong>Registrations:</strong>
                      <ul className="list-disc list-inside">
                        {event.registrations.map((regUserId, index) => (
                          <li key={index}>{regUserId}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default StaffDashboard;
