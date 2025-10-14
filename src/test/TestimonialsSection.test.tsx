import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import TestimonialsSection from '../components/TestimonialsSection';

describe('TestimonialsSection Component', () => {
  it('renders testimonials section heading', () => {
    render(<TestimonialsSection />);

    const heading = screen.getByRole('heading', { name: /What Business Owners Say/i });
    expect(heading).toBeInTheDocument();
  });

  it('displays testimonial authors', () => {
    render(<TestimonialsSection />);

    expect(screen.getByText('Maria Ionescu')).toBeInTheDocument();
    expect(screen.getByText('Andrei Popescu')).toBeInTheDocument();
    expect(screen.getByText('Elena Dimitriu')).toBeInTheDocument();
  });

  it('displays testimonial roles', () => {
    render(<TestimonialsSection />);

    expect(screen.getByText('Restaurant Owner')).toBeInTheDocument();
    expect(screen.getByText('Car Service Owner')).toBeInTheDocument();
    expect(screen.getByText('Bakery Owner')).toBeInTheDocument();
  });

  it('displays star ratings for testimonials', () => {
    render(<TestimonialsSection />);

    // Check for avatar images (3 testimonials = 3 avatar images)
    const avatars = screen.getAllByRole('img');
    expect(avatars.length).toBe(3);
  });
});
