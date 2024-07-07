import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test("renders search's input and clear's button", () => {
  render(<App />);
  const searchInput = screen.getByLabelText('Find character by name');
  const clearButton = screen.getByText(/clear/i);
  expect(searchInput).toBeInTheDocument();
  expect(clearButton).toBeInTheDocument();
});
