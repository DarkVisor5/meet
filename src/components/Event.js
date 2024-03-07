import React, { useState } from 'react';

const Event = ({ event }) => {
    const [showDetails, setShowDetails] = useState(false);

    const handleShowHideDetails = () => {
        setShowDetails(!showDetails);
    };

    // Convert the dateTime string to a Date object and format it
    const formattedDateTime = new Date(event.start.dateTime).toLocaleString();

    return (
        <li>
            <h2>{event.summary}</h2> {/* Display event title */}
            <button onClick={handleShowHideDetails}>
                {showDetails ? 'Hide Details' : 'Show Details'}
            </button>
            {showDetails && (
                <div>
                    <p>Start Time: {formattedDateTime}</p>
                    <p>Location: {event.location}</p>
                </div>
            )}
        </li>
    );
}

export default Event;

