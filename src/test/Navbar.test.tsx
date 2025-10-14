import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from '../components/Navbar';

describe('Navbar Component', () => {
  it('renders the main navigation links', () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Categories')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('FAQ')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
  });

  it('renders the logo/brand', () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );

    // The brand text is split into separate elements
    expect(screen.getByText('Romanian')).toBeInTheDocument();
    expect(screen.getByText('Business Hub')).toBeInTheDocument();
  });

  it('renders search input', () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );

    const searchInput = screen.getByPlaceholderText(/Search businesses/i);
    expect(searchInput).toBeInTheDocument();
  });
});
