import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import HeroSection from '../components/HeroSection';

describe('HeroSection Component', () => {
  it('renders hero section with main heading', () => {
    render(<HeroSection />);

    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading.textContent).toContain('Romanian');
  });

  it('renders call-to-action elements', () => {
    render(<HeroSection />);

    const searchButton = screen.getByRole('button', { name: /Search/i });
    expect(searchButton).toBeInTheDocument();
  });

  it('displays hero description text', () => {
    render(<HeroSection />);

    const description = screen.getByText(/Discover/i);
    expect(description).toBeInTheDocument();
  });
});
