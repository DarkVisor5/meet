import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('<App /> component', () => {
  test('renders list of events', () => {
    const { getByTestId } = render(<App />);
    expect(getByTestId('event-list')).toBeInTheDocument();
  });

  test('render CitySearch', () => {
    const { getByPlaceholderText } = render(<App />);
    expect(getByPlaceholderText('Search for a city')).toBeInTheDocument();
  });

  test('render NumberOfEvents', () => {
    const { getByLabelText } = render(<App />);
    expect(getByLabelText('Number of Events:')).toBeInTheDocument();
  });
});

describe('<App /> integration', () => {
  let user;

  beforeEach(() => {
    user = userEvent.setup();
  });

  test('renders a list of events matching the city selected by the user', async () => {
    const { getByTestId, getByText, findAllByTestId } = render(<App />);
    const citySearchInput = getByTestId('city-search-textbox');

    await user.type(citySearchInput, 'Berlin');
    await user.keyboard('{Enter}'); // Simulate pressing Enter to select the city

    // Specifically target the Berlin, Germany suggestion by using getByText with precise query
    const berlinSuggestionItem = getByText('Berlin, Germany', { selector: '[data-testid="suggestion-Berlin-Germany"]' });
    await user.click(berlinSuggestionItem);

    await waitFor(async () => {
      const eventItems = await findAllByTestId('event-item');
      expect(eventItems.length).toBeGreaterThan(0); // Ensure some events are displayed
      // Optional: Check if events are indeed from Berlin
      eventItems.forEach(item => {
        expect(item.textContent).toContain('Berlin, Germany');
      });
    });
  });

  test('displays default number of events', async () => {
    const { findAllByTestId } = render(<App />);
    const eventItems = await findAllByTestId('event-item');
    expect(eventItems).toHaveLength(32); // Expecting the default number of events
  });

  test('updates the number of events rendered when user changes the input', async () => {
    const { findByLabelText, findAllByTestId } = render(<App />);
    
    // Simulate user changing the number of events
    const numberOfEventsInput = await findByLabelText('Number of Events:');
    await user.clear(numberOfEventsInput);
    await user.type(numberOfEventsInput, '10'); // User changes to 10

    await waitFor(async () => {
      const eventItems = await findAllByTestId('event-item');
      expect(eventItems).toHaveLength(10); // Now expecting exactly 10 items
    });
  });
});

