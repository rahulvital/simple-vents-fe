import { useEffect, useState } from 'react';
import CreateEvent from '../components/events/CreateEvent';
import EditEventModal from '../components/events/EditEventModal';
import useUserRole from '../hooks/useUserRole';
import { supabase } from '../../utils/supabase';
import { Trash2, Edit } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const StaffDashboard = ({ user }) => {
  const [staffEvents, setStaffEvents] = useState([]);
  const [error, setError] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { role, loading } = useUserRole(user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && role === 'staff') {
      fetchUserEvents();
    }
  }, [loading, role]);

  const fetchUserEvents = async () => {
    try {
      const { data: events, error } = await supabase
        .from('events')
        .select('id, user_id, title, description, capacity, date, location, img, registrations')
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

  const handleDeleteEvent = async (eventId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this event? This action cannot be undone.');
    
    if (!confirmDelete) return;

    try {
      const { error: registrationError } = await supabase
        .from('registrations')
        .delete()
        .eq('event_id', eventId);

      if (registrationError) throw registrationError;

      const { error } = await supabase
        .from('events')
        .delete()
        .eq('id', eventId);

      if (error) throw error;

      fetchUserEvents();
    } catch (error) {
      console.error('Error deleting event:', error);
      alert('Failed to delete event');
    }
  };

  const handleEditEvent = (event) => {
    setSelectedEvent(event);
    setIsEditModalOpen(true);
  };

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  return (
    <div className="space-y-8">
      {loading && (
        <div className="flex justify-center items-center min-h-screen text-xl text-gray-500 dark:text-gray-400 animate-pulse">
          Loading permissions...
        </div>
      )}
      
      {!loading && role !== 'staff' && (
        <div className="flex flex-col items-center justify-center h-[70vh] text-center space-y-4">
          <h1 className="text-3xl font-semibold text-gray-800 dark:text-gray-200">
            Access Restricted
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            You do not have the necessary permissions to view this page.
          </p>
          <button
            onClick={handleLoginRedirect}
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Login to Continue
          </button>
        </div>
      )}
      
      {!loading && role === 'staff' && (
        <>
          <CreateEvent userId={user.id} onEventCreated={fetchUserEvents} />
          <h2 className="text-2xl font-bold">Your Events</h2>
          {error && <p className="text-red-500 dark:text-red-400">{error}</p>}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {staffEvents.map(event => (
              <div key={event.id} className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden relative">
                <div className="absolute top-2 right-2 flex space-x-2">
                  <button 
                    onClick={() => handleEditEvent(event)}
                    className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition-colors"
                  >
                    <Edit size={20} />
                  </button>
                  <button 
                    onClick={() => handleDeleteEvent(event.id)}
                    className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
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
                  <div className="flex justify-between items-center mt-2">
                    <p className="text-gray-500 dark:text-gray-400">
                      Spots left: {event.spotsLeft} / {event.capacity}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {new Date(event.date).toLocaleString()}
                    </p>
                  </div>
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

          <EditEventModal 
            event={selectedEvent}
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            onUpdate={fetchUserEvents}
          />
        </>
      )}
    </div>
  );
};

export default StaffDashboard;
