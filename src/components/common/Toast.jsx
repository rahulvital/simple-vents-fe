import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, AlertCircle, X } from 'lucide-react';

const Toast = () => {
  const [notifications, setNotifications] = useState([]);
  
  useEffect(() => {
    const handleNotification = (event) => {
      const { type, message } = event.detail;
      
      const id = Date.now();
      
      setNotifications(prev => [...prev, { id, type, message }]);
      
      setTimeout(() => {
        setNotifications(prev => prev.filter(notification => notification.id !== id));
      }, 3000);
    };
    
    window.addEventListener('notification', handleNotification);
    
    return () => {
      window.removeEventListener('notification', handleNotification);
    };
  }, []);
  
  const closeNotification = (id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };
  
  if (notifications.length === 0) return null;
  
  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
      {notifications.map(({ id, type, message }) => {
        let bgColor, icon;
        switch (type) {
          case 'success':
            bgColor = 'bg-green-500';
            icon = <CheckCircle size={20} />;
            break;
          case 'error':
            bgColor = 'bg-red-500';
            icon = <XCircle size={20} />;
            break;
          case 'warning':
            bgColor = 'bg-yellow-500';
            icon = <AlertCircle size={20} />;
            break;
          case 'info':
          default:
            bgColor = 'bg-blue-500';
            icon = <AlertCircle size={20} />;
        }
        
        return (
          <div 
            key={id}
            className={`flex items-center p-3 rounded-md shadow-md min-w-64 max-w-md animate-slideIn ${bgColor} text-white`}
          >
            <div className="mr-2">
              {icon}
            </div>
            <p className="flex-1">{message}</p>
            <button 
              onClick={() => closeNotification(id)} 
              className="ml-2 text-white hover:text-gray-200"
              aria-label="Close notification"
            >
              <X size={18} />
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default Toast;