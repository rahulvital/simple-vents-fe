export const addToGoogleCalendar = async (event) => {
    const eventDetails = {
      'summary': event.title,
      'location': event.location,
      'description': event.description,
      'start': { 
        'dateTime': event.date,
        'timeZone': 'Europe/London',
       },
      'end': { 
        'dateTime': event.end_date || event.date },
        'timeZone': 'Europe/London',
    };
  
    try {
      const response = await fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('google_provider_token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(eventDetails)
      });
      return await response.json();
    } catch (error) {
      console.error('Calendar integration error:', error);
    } 
    finally {
      alert('Event added to Google Calendar!');
    }
  };