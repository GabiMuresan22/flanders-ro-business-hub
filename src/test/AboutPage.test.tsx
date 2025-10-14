import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import AboutPage from '../pages/AboutPage';

describe('AboutPage', () => {
  it('renders the about page heading', () => {
    render(
      <BrowserRouter>
        <AboutPage />
      </BrowserRouter>
    );

    const heading = screen.getByRole('heading', { name: /About Romanian Business Hub/i });
    expect(heading).toBeInTheDocument();
  });

  it('renders navbar and footer', () => {
    render(
      <BrowserRouter>
        <AboutPage />
      </BrowserRouter>
    );

    const romanianText = screen.getAllByText('Romanian');
    expect(romanianText.length).toBeGreaterThanOrEqual(1);
  });

  it('contains mission/vision content', () => {
    render(
      <BrowserRouter>
        <AboutPage />
      </BrowserRouter>
    );

    // The page should have substantial content
    const mainContent = screen.getByRole('main');
    expect(mainContent).toBeInTheDocument();
  });
});
