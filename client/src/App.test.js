import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import Header from './components/header/header';

describe('Header', () => {
  it("Must display a title", ()=>{
    render(<Header />);
    expect(screen.getByText(/Discover all the games/i)).toBeInTheDocument();
  })
});
