// showHideAnEventsDetails.test.js
import { loadFeature, defineFeature } from 'jest-cucumber';
import React from 'react';
import { render, fireEvent, screen, cleanup } from '@testing-library/react';
import App from '../App';
import '@testing-library/jest-dom/extend-expect';
import { getEvents } from '../api';

jest.mock('../api');

const feature = loadFeature('./src/features/showHideAnEventsDetails.feature');

getEvents.mockResolvedValue([
  { id: 1, summary: 'Learn JavaScript', location: 'London, UK', start: { dateTime: '2020-05-19T16:00:00+02:00' } },
  { id: 2, summary: 'React is Fun', location: 'Berlin, Germany', start: { dateTime: '2020-05-20T14:00:00+02:00' } }
]);

defineFeature(feature, test => {
  beforeEach(() => {
    jest.resetAllMocks();
    cleanup();
  });

  test('An event element is collapsed by default', ({ given, when, then }) => {
    given('the user has not interacted with any event', async () => {
      render(<App />);
      const eventItems = await screen.findAllByTestId('event-item');
      expect(eventItems.length).toBeGreaterThan(0);
    });

    when('they view the list of events', () => {
      // Viewing is handled in 'given', no action needed here
    });

    then("each event's details are hidden", async () => {
      const detailsButtons = await screen.findAllByText('Show details');
      expect(detailsButtons.length).toBeGreaterThan(0);
      detailsButtons.forEach(btn => expect(btn.textContent).toBe('Show details'));
    });
  });

  test('User can expand an event to see its details', ({ given, when, then }) => {
    given('the user views the list of events', async () => {
      render(<App />);
      const eventItems = await screen.findAllByTestId('event-item');
      expect(eventItems.length).toBeGreaterThan(0);
    });

    when('the user clicks on "show details" for an event', async () => {
      const showDetailsButton = await screen.findByTestId('details-button');
      fireEvent.click(showDetailsButton);
      const hideDetails = await screen.findByText('Hide details');
      expect(hideDetails).toBeInTheDocument();
    });

    then("the event's details are displayed", async () => {
      const eventDetails = await screen.findByTestId('event-details');
      expect(eventDetails).toBeVisible();
    });
  });

  test('User can collapse an event to hide its details', ({ given, when, then }) => {
    given("an event's details are displayed", async () => {
      render(<App />);
      const showDetailsButton = await screen.findByTestId('details-button');
      fireEvent.click(showDetailsButton);
      await screen.findByText('Hide details');
    });

    when('the user clicks on "hide details" for the event', async () => {
      const hideDetailsButton = await screen.findByText('Hide details');
      fireEvent.click(hideDetailsButton);
      await screen.findByText('Show details');
    });

    then("the event's details are hidden", async () => {
      expect(screen.queryByTestId('event-details')).not.toBeVisible();
    });
  });
});


