import { useState } from 'react';
import { supabase } from '../../../utils/supabase';
import { addToGoogleCalendar } from '../../../utils/calendar';

const EventCard = ({ event, user }) => {
  const [isRegistered, setIsRegistered] = useState(false);
  const [spotsLeft, setSpotsLeft] = useState(event.spotsLeft);

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
    await addToGoogleCalendar(event);
  };

  const addToGoogleCalendar = () => {
    console.log("register?????")
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <img 
        src={event.img} 
        alt={event.title} 
        className="w-full h-48 object-cover rounded-lg mb-4"
      />
      <h3 className="text-xl font-bold mb-2">{event.title}</h3>
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