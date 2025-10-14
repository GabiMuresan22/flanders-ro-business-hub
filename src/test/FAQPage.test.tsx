import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import FAQPage from '../pages/FAQPage';

describe('FAQPage', () => {
  it('renders the FAQ page heading', () => {
    render(
      <BrowserRouter>
        <FAQPage />
      </BrowserRouter>
    );

    const heading = screen.getByRole('heading', { name: /Frequently Asked Questions/i });
    expect(heading).toBeInTheDocument();
  });

  it('renders navbar and footer', () => {
    render(
      <BrowserRouter>
        <FAQPage />
      </BrowserRouter>
    );

    const romanianText = screen.getAllByText('Romanian');
    expect(romanianText.length).toBeGreaterThanOrEqual(1);
  });

  it('contains FAQ content', () => {
    render(
      <BrowserRouter>
        <FAQPage />
      </BrowserRouter>
    );

    // Check for accordion content
    expect(screen.getByText(/What is the Romanian Business Hub/i)).toBeInTheDocument();
  });
});
