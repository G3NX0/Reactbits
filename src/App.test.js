import { render, screen } from '@testing-library/react';
import App from './App';

test('renders ReactBits heading', () => {
  render(<App />);
  const heading = screen.getByText(/ReactBits by Azzam/i);
  expect(heading).toBeInTheDocument();
});
