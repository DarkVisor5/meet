import React, { useEffect, useState } from 'react';
import CitySearch from './components/CitySearch';
import EventList from './components/EventList';
import NumberOfEvents from './components/NumberOfEvents';
import { extractLocations, getEvents } from './api';
import { InfoAlert, ErrorAlert, WarningAlert } from './components/Alert';


import './App.css';

const App = () => {
  const [allLocations, setAllLocations] = useState([]);
  const [currentNOE, setCurrentNOE] = useState(32); // Default number of events
  const [events, setEvents] = useState([]);
  const [currentCity, setCurrentCity] = useState("See all cities");
  const [infoAlert, setInfoAlert] = useState("");
  const [errorText, setErrorText] = useState("");
  const [warningAlert, setWarningAlert] = useState('');


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
  
    if (!navigator.onLine) {
      setWarningAlert('You are offline. The data has been loaded from cache and may not be up to date.');
    } else {
      setWarningAlert('');
    }
  
    fetchData();
  }, [currentCity, currentNOE]); // Dependency array includes currentNOE and currentCity to re-fetch when they change
  

  return (
    <div className="App">
    <div className="alerts-container">
      {infoAlert && <InfoAlert text={infoAlert} />}
      {errorText && <ErrorAlert text={errorText} />}
      {warningAlert && <WarningAlert text={warningAlert} />}
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







