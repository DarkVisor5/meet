import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NumberOfEvents from '../components/NumberOfEvents';

describe('<NumberOfEvents /> component', () => {
  let NumberOfEventsComponent, user;
  beforeEach(() => {
    NumberOfEventsComponent = render(<NumberOfEvents />);
    user = userEvent.setup();
  });

  test('contains an input with the role of textbox', () => {
    expect(NumberOfEventsComponent.queryByRole('textbox')).toBeInTheDocument();
  });

  test('has a default value of 32', () => {
    expect(NumberOfEventsComponent.queryByRole('textbox').value).toBe('32');
  });

  test('changes value when user types in it', async () => {
    const input = NumberOfEventsComponent.queryByRole('textbox');
    await user.type(input, '{selectall}{backspace}10');
    expect(input.value).toBe('10');
  });
});
