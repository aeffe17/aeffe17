import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('renders the main heading', () => {
    render(<App />);
    expect(screen.getByText(/Trova la tua casa dei sogni/i)).toBeInTheDocument();
  });

  it('renders the properties section', () => {
    render(<App />);
    expect(screen.getByText(/Proprietà in Evidenza/i)).toBeInTheDocument();
  });

  it('renders the footer', () => {
    render(<App />);
    expect(screen.getByText(/EasyRealEstate Garda Lake. Tutti i diritti riservati./i)).toBeInTheDocument();
  });
});
