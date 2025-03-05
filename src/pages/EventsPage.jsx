import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { supabase } from '../../utils/supabase';
import { Calendar, MapPin, User } from 'lucide-react';
import { addToGoogleCalendar } from '../../utils/calendar';

const EventsPage = ({ user }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Registration-related state
  const [isRegistered, setIsRegistered] = useState(false);
  const [spotsLeft, setSpotsLeft] = useState(0);
  const [addedToCalendar, setAddedToCalendar] = useState(false);

  // Reusable button styles
  const filledButtonClass =
    "flex-1 bg-blue-600 text-white py-2 rounded flex items-center justify-center space-x-2 hover:bg-blue-700 transition-colors";
  const outlinedButtonClass =
    "flex-1 border border-blue-600 text-blue-600 py-2 rounded flex items-center justify-center space-x-2 hover:bg-blue-50 transition-colors";

  useEffect(() => {
    const fetchEvent = async () => {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching event:', error);
      } else {
        setEvent(data);
        // Assume either a spotsLeft field exists or fall back to capacity.
        setSpotsLeft(data.spotsLeft || data.capacity);
      }
      setLoading(false);
    };

    fetchEvent();
  }, [id]);

  // Check registration status once event and user are loaded.
  useEffect(() => {
    if (user && event) {
      const checkRegistration = async () => {
        const { data } = await supabase
          .from('registrations')
          .select('id')
          .eq('event_id', event.id)
          .eq('user_id', user.id);
        setIsRegistered(data && data.length > 0);
      };

      checkRegistration();
    }
  }, [user, event]);

  const handleRegistration = async () => {
    if (!user) return;
    try {
      const { error } = await supabase
        .from('registrations')
        .insert({
          event_id: event.id,
          user_id: user.id,
        });
      if (error) throw error;
      setIsRegistered(true);
      setSpotsLeft((prev) => prev - 1);
    } catch (error) {
      console.error('Registration failed:', error.message);
    }
  };

  const handleUnregister = async () => {
    if (!user) return;
    try {
      const { error } = await supabase
        .from('registrations')
        .delete()
        .eq('event_id', event.id)
        .eq('user_id', user.id);
      if (error) throw error;
      setIsRegistered(false);
      setSpotsLeft((prev) => prev + 1);
    } catch (error) {
      console.error('Error removing registration:', error.message);
    }
  };

  const handleAddToCalendar = async () => {
    if (!isRegistered) return;
    try {
      addToGoogleCalendar(event);
    } catch (error) {
      console.error('Calendar integration error:', error);
    } finally {
      setAddedToCalendar(true);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-pulse text-xl text-gray-500">
          Loading event details...
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500">
        No event found with id: {id}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="bg-white shadow-lg rounded-xl overflow-hidden">
        {event.img && (
          <div className="h-96 overflow-hidden">
            <img
              src={event.img}
              alt={event.title}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
        )}
        
        <div className="p-6">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">{event.title}</h1>
          
          <div className="grid md:grid-cols-3 gap-4 mb-6 text-gray-600">
            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-blue-500" />
              <span>{new Date(event.date).toLocaleString()}</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="w-5 h-5 text-green-500" />
              <span>{event.location}</span>
            </div>
            {user && (
              <div className="flex items-center space-x-2">
                <User className="w-5 h-5 text-purple-500" />
                <span>Organized by {user.name || 'Anonymous'}</span>
              </div>
            )}
          </div>

          <div className="prose max-w-none mb-6">
            <p className="text-gray-700 leading-relaxed">{event.description}</p>
          </div>

          {/* Registration and Calendar Buttons */}
          <div className="flex space-x-2 mb-6">
            {user ? (
              <>
                {!isRegistered ? (
                  <button
                    onClick={handleRegistration}
                    disabled={spotsLeft <= 0}
                    className={filledButtonClass}
                  >
                    <span>Register Now</span>
                  </button>
                ) : (
                  <>
                    <button onClick={handleUnregister} className={filledButtonClass}>
                      <span>Unregister</span>
                    </button>
                    <button onClick={handleAddToCalendar} className={filledButtonClass}>
                      <span>Add to Google Calendar</span>
                    </button>
                  </>
                )}
              </>
            ) : (
              <button
                onClick={() => navigate('/login')}
                className={filledButtonClass}
              >
                <span>Login to Register</span>
              </button>
            )}
          </div>
          
          {/* Optional: Additional details or actions can be added here */}
        </div>
      </div>
    </div>
  );
};

export default EventsPage;
