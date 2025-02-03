import { useState } from 'react';
import CreateEvent from '../components/events/CreateEvent';
import {useUserRole} from '../hooks/useUserRole';
const StaffDashboard = ({ user }) => {
  const [staffEvents, setStaffEvents] = useState([]);

  const { role, loading } = useUserRole(user);

  if (loading) return <div>Loading permissions...</div>;
  if (role !== 'staff') return <div>Staff access required</div>;

  if (!user?.user_metadata?.is_staff) {
    return <div className="text-center py-8">Staff access required</div>;
  }

  return (
    <div className="space-y-8">
      <CreateEvent userId={user.id} />
      
      <h2 className="text-2xl font-bold">Your Events</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {staffEvents.map(event => (
          <div key={event.id} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h3 className="text-xl font-bold mb-2">{event.title}</h3>
            <p className="text-gray-600 dark:text-gray-300">{event.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StaffDashboard;