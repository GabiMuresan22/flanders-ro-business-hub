import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import NotFound from '../pages/NotFound';

describe('NotFound Page', () => {
  it('renders 404 message', () => {
    render(
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>
    );

    const heading = screen.getByRole('heading', { name: /404/i });
    expect(heading).toBeInTheDocument();
  });

  it('renders a link to go back home', () => {
    render(
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>
    );

    const homeLink = screen.getByRole('link', { name: /Return to Home/i });
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute('href', '/');
  });

  it('contains helpful error message', () => {
    render(
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>
    );

    expect(screen.getByText(/Oops! Page not found/i)).toBeInTheDocument();
  });
});
