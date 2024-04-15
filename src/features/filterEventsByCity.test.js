import { loadFeature, defineFeature } from 'jest-cucumber';
import { render, waitFor, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { getEvents } from '../api';

const feature = loadFeature('./src/features/filterEventsByCity.feature');

defineFeature(feature, (test) => {
  let AppComponent;

  beforeEach(() => {
    AppComponent = render(<App />);
  });

  test('When user hasn’t searched for a city, show upcoming events from all cities.', ({ given, when, then }) => {
    given('user hasn’t searched for any city', () => {
      // No action required as this is the default state
    });

    when('the user opens the app', () => {
      // App is already opened in beforeEach
    });

    then('the user should see the list of all upcoming events.', async () => {
      await waitFor(() => {
        expect(screen.getAllByRole('listitem').length).toBe(32); // Assuming 32 events are loaded by default
      });
    });
  });

  test('User should see a list of suggestions when they search for a city.', ({ given, when, then }) => {
    given('the main page is open', () => {
      // App is already opened in beforeEach
    });

    when('user starts typing in the city textbox', async () => {
      const user = userEvent.setup();
      const citySearchInput = screen.getByPlaceholderText('Search for a city');
      await user.type(citySearchInput, 'Berlin');
    });

    then('the user should receive a list of cities (suggestions) that match what they’ve typed', async () => {
      await waitFor(() => {
        const suggestions = screen.getAllByRole('listitem');
        expect(suggestions.length).toBeGreaterThan(0); // Assuming suggestions appear
      });
    });
  });

  test('User can select a city from the suggested list.', ({ given, and, when, then }) => {
    let selectedCity;

    given('user was typing “Berlin” in the city textbox', async () => {
      const user = userEvent.setup();
      const citySearchInput = screen.getByPlaceholderText('Search for a city');
      await user.type(citySearchInput, 'Berlin');
    });

    and('the list of suggested cities is showing', () => {
      expect(screen.getAllByRole('listitem').length).toBeGreaterThan(0); // Verifying that suggestions are visible
    });

    when('the user selects a city (e.g., “Berlin, Germany”) from the list', async () => {
        const user = userEvent.setup();
        // Directly target the suggestion item using data-testid attribute
        const berlinGermanySuggestion = screen.getByTestId('suggestion-Berlin-Germany');
        await user.click(berlinGermanySuggestion);
      });
      

    then('their city should be changed to that city (i.e., “Berlin, Germany”)', () => {
      const citySearchInput = screen.getByPlaceholderText('Search for a city');
      expect(citySearchInput.value).toBe('Berlin, Germany'); // Verifying the input value has changed
    });

    and('the user should receive a list of upcoming events in that city', async () => {
      await waitFor(async () => {
        const events = screen.getAllByTestId('event-item');
        const allEvents = await getEvents();
        const berlinEvents = allEvents.filter(event => event.location.includes('Berlin'));
        expect(events.length).toBe(berlinEvents.length); // Assuming events are filtered by the selected city
      });
    });
  });
});



