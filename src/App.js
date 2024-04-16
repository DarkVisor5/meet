import CitySearch from './components/CitySearch';
import EventList from './components/EventList';
import NumberOfEvents from './components/NumberOfEvents';
import { useEffect, useState } from 'react';
import { extractLocations, getEvents } from './api';

import './App.css';

const App = () => {
  const [allLocations, setAllLocations] = useState([]);
  const [currentNOE, setCurrentNOE] = useState(32);
  const [events, setEvents] = useState([]);
  const [currentCity, setCurrentCity] = useState("See all cities");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allEvents = await getEvents();
        if (!Array.isArray(allEvents)) throw new Error("allEvents is not an array");
        const filteredEvents = currentCity === "See all cities" ?
          allEvents :
          allEvents.filter(event => event.location === currentCity);
        setEvents(filteredEvents.slice(0, currentNOE));
        setAllLocations(extractLocations(allEvents));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
  }, [currentCity, currentNOE]);

  return (
    <div className="App">
      <CitySearch allLocations={allLocations} setCurrentCity={setCurrentCity} />
      <NumberOfEvents onNumberOfEventsChange={setCurrentNOE} />
      <EventList events={events} />
    </div>
  );
}

export default App;





