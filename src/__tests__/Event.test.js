// src/__tests__/Event.test.js
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event'; // Make sure to import userEvent for simulating user interactions
import Event from '../components/Event';
import { getEvents } from '../api';

describe('<Event /> component', () => {
  let event, EventComponent;
  
  beforeAll(async () => {
    const allEvents = await getEvents(); // Fetches mock event data
    event = allEvents[0]; // Selects the first event for testing
    EventComponent = render(<Event event={event} />); // Renders the Event component for the selected event
  });

  // Tests for displaying event information
  test('shows the event title', () => {
    expect(EventComponent.queryByText(event.summary)).toBeInTheDocument();
  });

  test('shows the event start time', () => {
    // Assuming 'event.created' is the start time; adjust if necessary
    expect(EventComponent.queryByText(new Date(event.created).toLocaleString())).toBeInTheDocument();
  });

  test('shows the event location', () => {
    expect(EventComponent.queryByText(event.location)).toBeInTheDocument();
  });

  // Tests for show/hide event details functionality
  describe('Event details show/hide', () => {
    let user;

    beforeEach(() => {
      user = userEvent.setup(); // Sets up userEvent for each test
    });

    test('Event details are shown when show details button is clicked', async () => {
      const showDetailsButton = EventComponent.queryByText('Show Details'); // Adjust based on your actual button text
      await user.click(showDetailsButton);
      const detailElement = EventComponent.queryByText('Event Details Here'); // Placeholder for actual detail text
      expect(detailElement).toBeInTheDocument();
    });

    test('Event details are hidden when hide details button is clicked', async () => {
      const hideDetailsButton = EventComponent.queryByText('Hide Details'); // Adjust based on your actual button text
      await user.click(hideDetailsButton);
      const detailElement = EventComponent.queryByText('Event Details Here'); // Placeholder for actual detail text
      expect(detailElement).not.toBeInTheDocument();
    });
  });
  
});

