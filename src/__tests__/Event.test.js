import { render, fireEvent } from '@testing-library/react';
import Event from '../components/Event';

// Example mock event data
const mockEvent = {
    summary: 'Sample Event',
    start: { dateTime: '2020-05-19T16:00:00+02:00' },
    location: 'Sample Location'
};

describe('<Event /> component', () => {
    test('renders event summary', () => {
        const { getByText } = render(<Event event={mockEvent} />);
        expect(getByText(mockEvent.summary)).toBeInTheDocument();
    });

    test('renders event start time', () => {
        const { getByText } = render(<Event event={mockEvent} />);
        const eventDate = new Date(mockEvent.start.dateTime);
        const formattedDateTime = eventDate.toLocaleString(); // Adjust this based on how you format dates in your component
        expect(getByText(`Start Time: ${formattedDateTime}`)).toBeInTheDocument();
    });

    test('renders event location', () => {
        const { getByText } = render(<Event event={mockEvent} />);
        expect(getByText(`Location: ${mockEvent.location}`)).toBeInTheDocument();
    });
    
    test('renders show details button', () => {
        const { getByText } = render(<Event event={mockEvent} />);
        expect(getByText('Show Details')).toBeInTheDocument();
    });

    test('shows details when "Show Details" button is clicked', () => {
        const { getByText } = render(<Event event={mockEvent} />);
        fireEvent.click(getByText('Show Details'));
        const eventDate = new Date(mockEvent.start.dateTime);
        const formattedDateTime = eventDate.toLocaleString();
        expect(getByText(`Start Time: ${formattedDateTime}`)).toBeInTheDocument();
        expect(getByText(`Location: ${mockEvent.location}`)).toBeInTheDocument();
    });
    
    
    test('hides details when "Hide Details" button is clicked', () => {
        const { getByText, queryByText } = render(<Event event={mockEvent} />);
        
        fireEvent.click(getByText('Show Details'));
        fireEvent.click(getByText('Hide Details'));
        
        expect(queryByText(`Start Time: ${mockEvent.start.dateTime}`)).not.toBeInTheDocument();
        expect(queryByText(`Location: ${mockEvent.location}`)).not.toBeInTheDocument();
    });
});
