import React, { useState, useEffect } from 'react';

const Event = ({ event }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <li className="event" data-testid="event-item">
      <h2>{event.summary}</h2>
      <p>{event.location}</p>
      <p>{event.start ? new Date(event.start.dateTime).toUTCString() : 'Date not available'}</p>
      {showDetails && (
        <div className="details" data-testid="event-details">
          {event.description}
        </div>
      )}
      <button
        className="details-btn"
        onClick={() => setShowDetails(!showDetails)}
        data-testid="details-button"
      >
        {showDetails ? "Hide details" : "Show details"}
      </button>
    </li>
  );
};

export default Event;


