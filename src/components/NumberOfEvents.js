import React, { useState } from 'react';

const NumberOfEvents = ({ onNumberOfEventsChange }) => {
    const [numberOfEvents, setNumberOfEvents] = useState(32); // Default value

    const handleInputChange = (event) => {
        const value = parseInt(event.target.value, 10);
        setNumberOfEvents(value);
        onNumberOfEventsChange(value);
    };

    return (
        <div>
            <label htmlFor="numberOfEvents">Number of Events:</label>
            <input
                type="number"
                id="numberOfEvents"
                value={numberOfEvents}
                onChange={handleInputChange}
            />
        </div>
    );
};

export default NumberOfEvents;
