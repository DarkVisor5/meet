import { render, fireEvent } from '@testing-library/react';
import NumberOfEvents from '../components/NumberOfEvents';

describe('<NumberOfEvents /> component', () => {
  let NumberOfEventsComponent;
  let mockOnNumberOfEventsChange;
  let mockSetErrorText;

  beforeEach(() => {
    mockOnNumberOfEventsChange = jest.fn();
    mockSetErrorText = jest.fn();
    NumberOfEventsComponent = render(<NumberOfEvents onNumberOfEventsChange={mockOnNumberOfEventsChange} setErrorText={mockSetErrorText} />);
  });

  test('renders number of events input', () => {
    expect(NumberOfEventsComponent.getByLabelText('Number of Events:')).toBeInTheDocument();
  });

  test('default number is 32', () => {
    expect(NumberOfEventsComponent.getByLabelText('Number of Events:').value).toBe('32');
  });

  test('number of events changes when user inputs a valid number', () => {
    const input = NumberOfEventsComponent.getByLabelText('Number of Events:');
    fireEvent.change(input, { target: { value: '10' } });
    expect(input.value).toBe('10');
    expect(mockOnNumberOfEventsChange).toHaveBeenCalledWith(10);
    expect(mockSetErrorText).toHaveBeenCalledWith('');
  });

  test('displays an error when user inputs an invalid number', () => {
    const input = NumberOfEventsComponent.getByLabelText('Number of Events:');
    fireEvent.change(input, { target: { value: '-1' } });
    expect(input.value).toBe('');  // Verifica che il campo sia vuoto se l'input è invalido
    expect(mockSetErrorText).toHaveBeenCalledWith('Please enter a positive number.');
    expect(mockOnNumberOfEventsChange).not.toHaveBeenCalled();
  });
  
  test('number of events changes when user inputs a valid number', () => {
    const input = NumberOfEventsComponent.getByLabelText('Number of Events:');
    fireEvent.change(input, { target: { value: '10' } });
    expect(input.value).toBe('10');
    expect(mockOnNumberOfEventsChange).toHaveBeenCalledWith(10);
    expect(mockSetErrorText).toHaveBeenCalledWith('');
  });
    
});

