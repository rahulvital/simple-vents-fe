import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '../../../utils/supabase';
import { addToGoogleCalendar } from '../../../utils/calendar';
import { LogIn, InfoIcon } from 'lucide-react';

const EventCard = ({ event, user, onLogin }) => {
  const [isRegistered, setIsRegistered] = useState(false);
  const [spotsLeft, setSpotsLeft] = useState(event.spotsLeft);
  const [addedToCalendar, setAddedToCalendar] = useState(false);

  useEffect(() => {
    const checkRegistration = async () => {
      if (!user) return;
      const { data, error } = await supabase
        .from('registrations')
        .select('id')
        .eq('event_id', event.id)
        .eq('user_id', user.id);
      if (data && data.length > 0) {
        setIsRegistered(true);
      } else {
        setIsRegistered(false);
      }
    };

    checkRegistration();
  }, [user, event.id]);

  const handleRegistration = async () => {
    if (!user) return;
    try {
      const { error } = await supabase
        .from('registrations')
        .insert({
          event_id: event.id,
          user_id: user.id
        });

      if (error) throw error;

      setIsRegistered(true);
      setSpotsLeft(prev => prev - 1);
    } catch (error) {
      console.error('Registration failed:', error.message);
    }
  };

  const handleUnregister = async () => {
    if (!user) return;
    try {
      console.log('Removing registration');
      const { error } = await supabase
        .from('registrations')
        .delete()
        .eq('event_id', event.id)
        .eq('user_id', user.id);

      if (error) throw error;

      setIsRegistered(false);
      setSpotsLeft(prev => prev + 1);
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

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 flex flex-col h-full">
      {/* Wrap image and title in a Link */}
      <Link to={`/events/${event.id}`}>
        <img 
          src={event.img ? event.img : 'https://img.freepik.com/free-photo/enjoyment-activities-festivities-movies-pastime_53876-21362.jpg'} 
          alt={event.img ? event.title : event.title + ' Image by rawpixel.com on Freepik'} 
          className="w-full h-48 object-cover rounded-lg mb-4"
        />
        <h3 className="text-xl font-bold mb-2 dark:text-white">{event.title}</h3>
      </Link>
      
      <div className="space-y-2 mb-4 flex-grow">
        <p className="text-gray-600 dark:text-gray-300">
          📅 {new Date(event.date).toLocaleDateString()}
        </p>
        <p className="text-gray-600 dark:text-gray-300">
          📍 {event.location}
        </p>
        <p className="text-gray-600 dark:text-gray-300">
          🎟️ {spotsLeft} spots remaining
        </p>
      </div>
      
      {user ? (
        <div className="space-y-2">
          {!isRegistered ? (
            <button
              onClick={handleRegistration}
              disabled={spotsLeft <= 0}
              className="w-full bg-blue-600 text-white py-2 rounded disabled:opacity-50 flex items-center justify-center space-x-2 hover:bg-blue-700 transition-colors"
            >
              <span>Register Now</span>
            </button>
          ) : (
            <>
              <button
                onClick={handleUnregister}
                className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition-colors"
              >
                Unregister
              </button>
              <button
                onClick={handleAddToCalendar}
                className="w-full border border-blue-600 text-blue-600 py-2 rounded hover:bg-blue-50 transition-colors flex items-center justify-center space-x-2"
              >
                <span>Add to Google Calendar</span>
              </button>
            </>
          )}
        </div>
      ) : (
        <div className="flex space-x-2">
          <button
            onClick={onLogin}
            className="flex-1 bg-blue-600 text-white py-2 rounded flex items-center justify-center space-x-2 hover:bg-blue-700 transition-colors"
          >
            <LogIn size={20} />
            <span>Login</span>
          </button>
          <Link 
            to={`/events/${event.id}`} 
            className="flex-1 border border-blue-600 text-blue-600 py-2 rounded flex items-center justify-center space-x-2 hover:bg-blue-50 transition-colors"
          >
            <InfoIcon size={20} />
            <span>Details</span>
          </Link>
        </div>
      )}
    </div>
  );
};

export default EventCard;