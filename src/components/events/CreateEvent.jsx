import { useState } from 'react';
import { supabase } from '../../../utils/supabase';
import { showSuccess, showError } from '../common/Notification';
import { Calendar, MapPin, User, Clock, Users, Image } from 'lucide-react';

const CreateEvent = ({ userId, onEventCreated }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
    capacity: 0,
    img: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const { error } = await supabase
        .from('events')
        .insert({
          title: formData.title,
          description: formData.description,
          date: new Date(formData.date).toISOString(),
          location: formData.location,
          capacity: parseInt(formData.capacity),
          img: formData.img,
          user_id: userId
        });

      if (error) throw error;
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        date: '',
        location: '',
        capacity: 0,
        img: ''
      });
      
      showSuccess('Event created successfully');
      if (onEventCreated) onEventCreated();
    } catch (error) {
      console.error('Error creating event:', error);
      showError('Failed to create event');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
      <h2 className="text-2xl font-bold mb-4">Create New Event</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 flex items-center">
              <span className="mr-2 text-gray-700 dark:text-gray-300">Event Title</span>
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
              placeholder="Enter event title"
            />
          </div>
          <div>
            <label className="block mb-1 flex items-center">
              <MapPin className="w-4 h-4 mr-2 text-green-500" />
              <span className="text-gray-700 dark:text-gray-300">Location</span>
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
              placeholder="Event location"
            />
          </div>
        </div>

        <div>
          <label className="block mb-1 flex items-center">
            <span className="text-gray-700 dark:text-gray-300">Description</span>
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            rows="4"
            required
            placeholder="Describe your event"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 flex items-center">
              <Calendar className="w-4 h-4 mr-2 text-blue-500" />
              <span className="text-gray-700 dark:text-gray-300">Date and Time</span>
            </label>
            <input
              type="datetime-local"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            />
          </div>
          <div>
            <label className="block mb-1 flex items-center">
              <Users className="w-4 h-4 mr-2 text-purple-500" />
              <span className="text-gray-700 dark:text-gray-300">Capacity</span>
            </label>
            <input
              type="number"
              name="capacity"
              value={formData.capacity}
              onChange={handleChange}
              min="1"
              className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
              placeholder="Maximum number of attendees"
            />
          </div>
        </div>

        <div>
          <label className="block mb-1 flex items-center">
            <Image className="w-4 h-4 mr-2 text-pink-500" />
            <span className="text-gray-700 dark:text-gray-300">Image URL (Optional)</span>
          </label>
          <input
            type="url"
            name="img"
            value={formData.img}
            onChange={handleChange}
            className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder="Add an image URL for your event"
          />
        </div>

        <div className="flex space-x-4 pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`flex-1 bg-blue-600 text-white py-2 rounded flex items-center justify-center space-x-2 hover:bg-blue-700 transition-colors ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isSubmitting ? 'Creating...' : 'Create Event'}
          </button>
          <button
            type="button"
            onClick={() => {
              setFormData({
                title: '',
                description: '',
                date: '',
                location: '',
                capacity: 0,
                img: ''
              });
            }}
            className="flex-1 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-2 rounded flex items-center justify-center space-x-2 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            Reset Form
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateEvent;