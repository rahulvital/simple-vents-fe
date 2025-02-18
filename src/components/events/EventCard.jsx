import { useEffect, useState } from 'react';
import { supabase } from '../../../utils/supabase';
import { addToGoogleCalendar } from '../../../utils/calendar';

const EventCard = ({ event, user }) => {
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
        .eq('user_id', user.id)
      if (data) {
        setIsRegistered(true);
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

  const handleAddToCalendar = async () => {
    if (!isRegistered) return;
    try {
      addToGoogleCalendar(event);
    } catch (error) {
      console.error('Calendar integration error:', error);
    } finally {
      setAddedToCalendar(true);
    }
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <img 
        src={event.img ? event.img : 'https://img.freepik.com/free-photo/enjoyment-activities-festivities-movies-pastime_53876-21362.jpg?t=st=1739840245~exp=1739843845~hmac=d28d474b2fc5d88df5aeb924deaeed693db70ccf1a3a7250e1b1020c246bd30a&w=900'} 
        alt={event.img ? event.title : event.title + 'Image by rawpixel.com on Freepik'} 
        className="w-full h-48 object-cover rounded-lg mb-4"
      />
      <h3 className="text-xl font-bold mb-2 text-white">{event.title}</h3>
      <div className="space-y-2 mb-4">
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
          <button
            onClick={handleRegistration}
            disabled={isRegistered || spotsLeft <= 0}
            className="w-full bg-blue-600 text-white py-2 rounded disabled:opacity-50"
          >
            {isRegistered ? 'Registered' : 'Register Now'}
          </button>
          {isRegistered && (
            <button
              onClick={handleAddToCalendar}
              className="w-full border border-blue-600 text-blue-600 py-2 rounded"
            >
              Add to Google Calendar
            </button>
          )}
        </div>
      ) : (
        <p className="text-center text-gray-500">
          Please login to register
        </p>
      )}
    </div>
  );
};

export default EventCard; 