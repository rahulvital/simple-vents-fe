import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '../../../utils/supabase';
import { addToGoogleCalendar } from '../../../utils/calendar';
import { LogIn, InfoIcon, Check, Calendar, MapPin } from 'lucide-react';

const EventCard = ({ event, user, onLogin }) => {
  const [isRegistered, setIsRegistered] = useState(false);
  const [spotsLeft, setSpotsLeft] = useState(event.spotsLeft);
  const [addedToCalendar, setAddedToCalendar] = useState(false);

  const filledButtonClass =
    "flex-1 bg-blue-600 text-white py-2 rounded flex items-center justify-center space-x-2 hover:bg-blue-700 transition-colors";
  const outlinedButtonClass =
    "flex-1 border border-blue-600 text-blue-600 py-2 rounded flex items-center justify-center space-x-2 hover:bg-blue-50 transition-colors";
  const disabledButtonClass =
    "flex-1 bg-gray-300 text-gray-500 py-2 rounded flex items-center justify-center space-x-2 cursor-not-allowed";

  useEffect(() => {
    const checkRegistration = async () => {
      if (!user) return;
      const { data } = await supabase
        .from('registrations')
        .select('id')
        .eq('event_id', event.id)
        .eq('user_id', user.id);
      setIsRegistered(data && data.length > 0);
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
      await addToGoogleCalendar(event);
      setAddedToCalendar(true);
    } catch (error) {
      console.error('Calendar integration error:', error);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-xl overflow-hidden flex flex-col h-full">
      <Link to={`/events/${event.id}`}>
        <div className="h-48 overflow-hidden">
          <img
            src={
              event.img
                ? event.img
                : 'https://img.freepik.com/free-photo/enjoyment-activities-festivities-movies-pastime_53876-21362.jpg'
            }
            alt={event.img ? event.title : `${event.title} Image by rawpixel.com on Freepik`}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
        <div className="p-4">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">{event.title}</h3>
        </div>
      </Link>

      <div className="px-4 pb-4 flex-grow">
        <div className="grid gap-3 mb-4 text-gray-600">
          <div className="flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-blue-500" />
            <span>{new Date(event.date).toLocaleString()}</span>
          </div>
          <div className="flex items-center space-x-2">
            <MapPin className="w-5 h-5 text-green-500" />
            <span>{event.location}</span>
          </div>
          <div className="flex items-center space-x-2 text-purple-500">
            <span>🎟️ {spotsLeft} spots remaining</span>
          </div>
        </div>
      </div>

      <div className="p-4 pt-0">
        {user ? (
          <div className="flex space-x-2">
            {!isRegistered ? (
              <button
                onClick={handleRegistration}
                disabled={spotsLeft <= 0}
                className={spotsLeft <= 0 ? disabledButtonClass : filledButtonClass}
              >
                <span>{spotsLeft <= 0 ? 'Sold Out' : 'Register Now'}</span>
              </button>
            ) : (
              <>
                <button onClick={handleUnregister} className={filledButtonClass}>
                  <span>Unregister</span>
                </button>
                <button 
                  onClick={handleAddToCalendar} 
                  disabled={addedToCalendar}
                  className={addedToCalendar ? disabledButtonClass : filledButtonClass}
                >
                  {addedToCalendar ? (
                    <>
                      <Check size={20} />
                      <span>Added to Calendar</span>
                    </>
                  ) : (
                    <span>Add to Google Calendar</span>
                  )}
                </button>
              </>
            )}
            <Link to={`/events/${event.id}`} className={outlinedButtonClass}>
              <InfoIcon size={20} />
              <span>Details</span>
            </Link>
          </div>
        ) : (
          <div className="flex space-x-2">
            <button onClick={onLogin} className={filledButtonClass}>
              <LogIn size={20} />
              <span>Login</span>
            </button>
            <Link to={`/events/${event.id}`} className={outlinedButtonClass}>
              <InfoIcon size={20} />
              <span>Details</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventCard;