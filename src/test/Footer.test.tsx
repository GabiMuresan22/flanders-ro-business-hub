import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Footer from '../components/Footer';

describe('Footer Component', () => {
  it('renders footer sections', () => {
    render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    );

    expect(screen.getByText('Romanian Business Hub')).toBeInTheDocument();
  });

  it('renders quick links', () => {
    render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    );

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Categories')).toBeInTheDocument();
    expect(screen.getByText('About Us')).toBeInTheDocument();
  });

  it('renders copyright text', () => {
    render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    );

    const currentYear = new Date().getFullYear();
    expect(screen.getByText(new RegExp(currentYear.toString()))).toBeInTheDocument();
  });
});
