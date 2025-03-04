import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { supabase } from '../../utils/supabase';
import { Calendar, MapPin, User } from 'lucide-react';

const EventsPage = ({ user }) => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

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
      }
      setLoading(false);
    };

    fetchEvent();
  }, [id]);

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

          <div className="prose max-w-none">
            <p className="text-gray-700 leading-relaxed">{event.description}</p>
          </div>

          {/* Optional: Add a subtle bottom border */}
          <div className="border-t mt-6 pt-4 text-center">
            <button 
              className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors"
              onClick={() => {/* Add event registration or more details logic */}}
            >
              More Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventsPage;