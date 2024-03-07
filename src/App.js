import React, { useState, useEffect } from 'react';
import CitySearch from './components/CitySearch';
import EventList from './components/EventList';
import NumberOfEvents from './components/NumberOfEvents'; // Make sure to import NumberOfEvents
import { getEvents } from './api';
import './App.css';

const App = () => {
  const [events, setEvents] = useState([]);
  const [numberOfEvents, setNumberOfEvents] = useState(32); // Add state to manage the number of events

  useEffect(() => {
    getEvents().then(events => setEvents(events.slice(0, numberOfEvents))); // Limit the number of events based on numberOfEvents state
  }, [numberOfEvents]); // Rerun effect if numberOfEvents changes

  const handleNumberOfEventsChange = (number) => {
    setNumberOfEvents(number);
  };

  return (
    <div className="App">
      <CitySearch />
      <NumberOfEvents onNumberOfEventsChange={handleNumberOfEventsChange} numberOfEvents={numberOfEvents} />
      <EventList events={events} /> {/* Pass events as a prop */}
    </div>
  );
}

export default App;
