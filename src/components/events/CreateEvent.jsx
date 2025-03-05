import { useState } from 'react';
import { supabase } from '../../../utils/supabase';
import { useNavigate } from 'react-router-dom';
import { Calendar, MapPin, Info } from 'lucide-react';

const CreateEvent = ({ user, onEventCreated }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    date: '',
    time: '',
    capacity: 100,
    img: '',
    registrations: []
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const filledButtonClass =
    "flex-1 bg-blue-600 text-white py-2 rounded flex items-center justify-center space-x-2 hover:bg-blue-700 transition-colors";
  const outlinedButtonClass =
    "flex-1 border border-blue-600 text-blue-600 py-2 rounded flex items-center justify-center space-x-2 hover:bg-blue-50 transition-colors dark:border-blue-500 dark:text-blue-500 dark:hover:bg-blue-950";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const eventDate = new Date(`${formData.date}T${formData.time}`);
      
      if (eventDate <= new Date()) {
        setError('Event date and time must be in the future.');
        setLoading(false);
        return;
      }

      const { data, error: supabaseError } = await supabase
        .from('events')
        .insert([{
          title: formData.title,
          description: formData.description,
          location: formData.location,
          date: eventDate.toISOString(),
          capacity: formData.capacity,
          img: formData.img,
          user_id: user.id,
          registrations: []
        }])
        .select();

      if (supabaseError) throw supabaseError;        
      navigate(`/staff`);
    } catch (err) {
      console.error('Error creating event:', err);
      setError(err.message || 'Failed to create event');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl overflow-hidden">
        <div className="p-6">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-6">Create New Event</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Event Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
                placeholder="Enter event title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                rows="4"
                required
                placeholder="Describe your event"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-green-500" />
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  required
                  placeholder="Event location"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                  <Calendar className="w-5 h-5 mr-2 text-blue-500" />
                  Date
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Time</label>
                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Capacity</label>
                <input
                  type="number"
                  name="capacity"
                  value={formData.capacity}
                  onChange={handleChange}
                  min="1"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Image URL</label>
              <input
                type="url"
                name="img"
                value={formData.img}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="Optional: Add an event image URL"
              />
            </div>

            {error && (
              <div className="bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 p-3 rounded-lg flex items-center space-x-2">
                <Info className="w-5 h-5" />
                <span>{error}</span>
              </div>
            )}

            <div className="flex space-x-2">
              <button
                type="submit"
                disabled={loading}
                className={`${filledButtonClass} ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {loading ? 'Creating Event...' : 'Create Event'}
              </button>
              <button
                type="button"
                onClick={() => navigate('/staff')}
                className={outlinedButtonClass}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateEvent;