import { render } from '@testing-library/react';
import EventList from '../components/EventList';
import { getEvents } from '../api';

describe('<EventList /> component', () => {
    let EventListComponent;
    let allEvents;

    beforeEach(async () => {
        allEvents = await getEvents();
        EventListComponent = render(<EventList events={allEvents} />);
        })

    test('has an element with "list" role', () => {
        expect(EventListComponent.queryByRole('list')).toBeInTheDocument();
        });

    test('renders correct number of events', async () => {
        const allEvents = await getEvents(); 
        EventListComponent.rerender(<EventList events={allEvents} />);
    expect(EventListComponent.getAllByRole("listitem")).toHaveLength(allEvents.length);
        });
        
    test('all events are collapsed by default', () => {
        const showDetailsButtons = EventListComponent.queryAllByText('Show Details');
        expect(showDetailsButtons.length).toBe(allEvents.length);
        showDetailsButtons.forEach(button => {
            expect(button).toBeInTheDocument();
        });
    });
    
});