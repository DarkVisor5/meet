import { loadFeature, defineFeature } from 'jest-cucumber';
import React from 'react';
import { render, fireEvent, screen, cleanup, waitFor } from '@testing-library/react';
import App from '../App';
import '@testing-library/jest-dom/extend-expect';
import { getEvents } from '../api';

jest.mock('../api');

const feature = loadFeature('./src/features/showHideAnEventsDetails.feature');

beforeEach(() => {
  jest.resetAllMocks();
  cleanup();
  getEvents.mockResolvedValue([
    { id: 1, summary: 'Learn JavaScript', location: 'London, UK', start: { dateTime: '2020-05-19T16:00:00+02:00' }, description: 'JS Event' },
    { id: 2, summary: 'React is Fun', location: 'Berlin, Germany', start: { dateTime: '2020-05-20T14:00:00+02:00' }, description: 'React Event' }
  ]);
});

defineFeature(feature, test => {
  test('An event element is collapsed by default', ({ given, when, then }) => {
    given('the user has not interacted with any event', async () => {
      render(<App />);
      await waitFor(() => {
        return screen.findAllByTestId('event-item').then(eventItems => {
          expect(eventItems.length).toBeGreaterThan(0);
        });
      });
    });

    when('they view the list of events', () => {
      // Viewing is handled in 'given', no action needed here
    });

    then("each event's details are hidden", () => {
      const detailsButtons = screen.getAllByText('Show details');
      expect(detailsButtons.length).toBeGreaterThan(0);
      detailsButtons.forEach(btn => expect(btn.textContent).toBe('Show details'));
    });
  });

  test('User can expand an event to see its details', ({ given, when, then }) => {
    given('the user views the list of events', async () => {
      render(<App />);
      await screen.findAllByTestId('event-item'); // Make sure events are rendered
    });
  
    when('the user clicks on "show details" for an event', async () => {
      const showDetailsButtons = await screen.findAllByTestId('details-button');
      fireEvent.click(showDetailsButtons[0]);
      await screen.findByText('Hide details'); // Ensure the detail is visible
    });
  
    then("the event's details are displayed", async () => {
      const eventDetails = await screen.findByTestId('event-details');
      expect(eventDetails).toBeVisible();
    });
  });

  test('User can collapse an event to hide its details', ({ given, when, then }) => {
    given("an event's details are displayed", async () => {
      render(<App />);
      const showDetailsButtons = await screen.findAllByTestId('details-button');
      fireEvent.click(showDetailsButtons[0]);
      await screen.findByText('Hide details');
    });
  
    when('the user clicks on "hide details" for the event', async () => {
      const hideDetailsButtons = await screen.findAllByTestId('details-button');
      fireEvent.click(hideDetailsButtons[0]);
      await waitFor(() => {
        expect(screen.queryByText('Hide details')).not.toBeInTheDocument();
      });
    });
  
    then("the event's details are hidden", () => {
      const eventDetails = screen.queryByTestId('event-details');
      expect(eventDetails).not.toBeInTheDocument(); // This is more appropriate if the details are removed from the DOM
    });
  });
  
});
