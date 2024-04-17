import React, { useEffect, useState } from 'react';
import CitySearch from './components/CitySearch';
import EventList from './components/EventList';
import NumberOfEvents from './components/NumberOfEvents';
import { extractLocations, getEvents } from './api';
import { InfoAlert, ErrorAlert } from './components/Alert'; // Assuming ErrorAlert is implemented

import './App.css';

const App = () => {
  const [allLocations, setAllLocations] = useState([]);
  const [currentNOE, setCurrentNOE] = useState(32); // Default number of events
  const [events, setEvents] = useState([]);
  const [currentCity, setCurrentCity] = useState("See all cities");
  const [infoAlert, setInfoAlert] = useState("");
  const [errorText, setErrorText] = useState(""); // State for error messages

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allEvents = await getEvents();
        if (!Array.isArray(allEvents)) throw new Error("Error fetching events");
        
        const filteredEvents = currentCity === "See all cities" ?
          allEvents.slice(0, currentNOE) :
          allEvents.filter(event => event.location === currentCity).slice(0, currentNOE);

        setEvents(filteredEvents);
        setAllLocations(extractLocations(allEvents));
      } catch (error) {
        console.error("Error fetching data:", error);
        setInfoAlert('Failed to load events. Please try again.');
      }
    };
  
    fetchData();
  }, [currentCity, currentNOE]); // Dependency array includes currentNOE to re-fetch when it changes

  return (
    <div className="App">
        <div className="alerts-container">
          {infoAlert && <InfoAlert text={infoAlert} />}
          {errorText && <ErrorAlert text={errorText} />}
        </div>
        <CitySearch 
          allLocations={allLocations} 
          setCurrentCity={setCurrentCity} 
          setInfoAlert={setInfoAlert} />
        <NumberOfEvents onNumberOfEventsChange={setCurrentNOE} setErrorText={setErrorText} />
        <EventList events={events} />
    </div>
  );
}

export default App;







