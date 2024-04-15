import { loadFeature, defineFeature } from 'jest-cucumber';
import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import App from '../App';
import '@testing-library/jest-dom/extend-expect';

const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');

defineFeature(feature, (test) => {
  beforeEach(() => {
    // Directly render the App component here without assigning it to a variable
    render(<App />);
  });

  test('By default, 32 events are shown', ({ given, when, then }) => {
    given('the user has not specified a number of events', () => {
      // Setup or mock to ensure 32 events are loaded by default
      // This step might involve mocking an API or adjusting the initial state
    });

    when('the user views the list of events', async () => {
      // Optionally ensure the view is rendered if not handled in `given`
    });

    then('32 events are shown on the page', async () => {
      // Use screen to query for events and validate the count
      await waitFor(() => {
        expect(screen.getAllByTestId('event-item').length).toBe(32);
      });
    });
  });

  test('User can change the number of events they want to see', ({ given, when, then }) => {
    given('the list of events is displayed', () => {
      // Assumed to be handled by beforeEach
    });

    when('the user specifies a number of events to view', async () => {
      fireEvent.change(screen.getByRole('textbox', { name: /number of events:/i }), { target: { value: '10' } });
      await waitFor(() => {
        const input = screen.getByRole('textbox', { name: /number of events:/i });
        expect(input.value).toBe('10');  // Confirm that input value reflects the change
      });
    });

    then('that specific number of events is displayed on the page', async () => {
      await waitFor(() => {
        const eventItems = screen.queryAllByTestId('event-item');
        expect(eventItems).toHaveLength(10);  // Assert the expected number of events after state updates
      });
    });
  });
});


