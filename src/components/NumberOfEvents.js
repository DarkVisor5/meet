import React, { useState } from 'react';

const NumberOfEvents = ({ onNumberOfEventsChange, setErrorText }) => {
  const [number, setNumber] = useState('32');  // Imposta il numero di eventi come stringa

  const handleInputChanged = (event) => {
    const value = event.target.value;
    if (isNaN(value) || parseInt(value, 10) <= 0) {
      setErrorText('Please enter a positive number.');
      setNumber(''); // Clear the number if it's invalid
    } else {
      setErrorText(''); // Clear any existing error message
      setNumber(value); // Update the number state
      onNumberOfEventsChange(parseInt(value, 10)); // Notify App component about the change
    }
  };
  

  return (
    <div id="number-of-events">
      <label htmlFor="number-of-events-input">Number of Events:</label>
      <input
        type="text"
        id="number-of-events-input"
        className="number-of-events-input"
        value={number}
        onChange={handleInputChanged}
      />
    </div>
  );
};

export default NumberOfEvents;




