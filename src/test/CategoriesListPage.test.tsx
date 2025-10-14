import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import CategoriesListPage from '../pages/CategoriesListPage';

describe('CategoriesListPage', () => {
  it('renders the categories page heading', () => {
    render(
      <BrowserRouter>
        <CategoriesListPage />
      </BrowserRouter>
    );

    const heading = screen.getByRole('heading', { name: /Browse Business Categories/i });
    expect(heading).toBeInTheDocument();
  });

  it('renders navbar and footer', () => {
    render(
      <BrowserRouter>
        <CategoriesListPage />
      </BrowserRouter>
    );

    const romanianText = screen.getAllByText('Romanian');
    expect(romanianText.length).toBeGreaterThanOrEqual(1);
  });

  it('displays category cards', () => {
    render(
      <BrowserRouter>
        <CategoriesListPage />
      </BrowserRouter>
    );

    // Check that there are multiple links (category cards)
    const links = screen.getAllByRole('link');
    expect(links.length).toBeGreaterThan(5); // Should have nav links + category cards
  });
});
