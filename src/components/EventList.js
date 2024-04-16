import Event from "./Event";

const EventList = ({ events }) => {
  return (
    <ul id="event-list">
      {events && events.length > 0 ?
        events.map(event => <Event key={event.id} event={event} />) :
        <p>No events found.</p>}
    </ul>
  );
}


export default EventList;