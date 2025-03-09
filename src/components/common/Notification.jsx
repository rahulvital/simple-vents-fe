export const showNotification = (type, message) => {
    const customEvent = new CustomEvent('notification', { 
      detail: { type, message } 
    });
    window.dispatchEvent(customEvent);
  };
  
  export const showSuccess = (message) => {
    showNotification('success', message);
  };
  
  export const showError = (message) => {
    showNotification('error', message);
  };
  
  export const showWarning = (message) => {
    showNotification('warning', message);
  };
  
  export const showInfo = (message) => {
    showNotification('info', message);
  };