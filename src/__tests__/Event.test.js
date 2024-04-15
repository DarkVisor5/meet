import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Event from '../components/Event';

describe('<Event /> component', () => {
  let event;

  beforeEach(() => {
    event = {
      summary: 'Learn JavaScript',
      location: 'London, UK',
      start: { dateTime: '2020-05-19T16:00:00+02:00' },
      description: 'Event details here...'
    };
  });

  test('renders event with correct data', () => {
    render(<Event event={event} />);
    const titleElements = screen.getAllByText('Learn JavaScript');
    expect(titleElements.length).toBe(1);  // Ensure only one element with this text
    expect(screen.getByText('London, UK')).toBeInTheDocument();
    expect(screen.getByText('Tue, 19 May 2020 14:00:00 GMT')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Show details'));
    expect(screen.getByText('Event details here...')).toBeInTheDocument();
  });

  test("by default, event's details section should be hidden", () => {
    render(<Event event={event} />);
    expect(screen.queryByTestId('event-details')).not.toBeInTheDocument();
  });

  test("shows and hides details correctly", async () => {
    render(<Event event={event} />);
    const user = userEvent.setup();
    await user.click(screen.getByText('Show details'));
    expect(screen.getByTestId('event-details')).toBeInTheDocument();
    expect(screen.getByText('Hide details')).toBeInTheDocument();

    await user.click(screen.getByText('Hide details'));
    expect(screen.queryByTestId('event-details')).not.toBeInTheDocument();
    expect(screen.getByText('Show details')).toBeInTheDocument();
  });
});
