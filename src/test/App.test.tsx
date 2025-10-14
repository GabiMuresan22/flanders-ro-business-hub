import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Index from '../pages/Index';
import AboutPage from '../pages/AboutPage';
import ContactPage from '../pages/ContactPage';
import FAQPage from '../pages/FAQPage';
import AddBusinessPage from '../pages/AddBusinessPage';
import CategoriesListPage from '../pages/CategoriesListPage';
import NotFound from '../pages/NotFound';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        {component}
      </BrowserRouter>
    </QueryClientProvider>
  );
};

describe('App Routing', () => {
  it('renders home page components', () => {
    renderWithProviders(<Index />);

    // Should render the home page content
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
  });

  it('renders about page components', () => {
    renderWithProviders(<AboutPage />);

    expect(screen.getByRole('heading', { name: /About Romanian Business Hub/i })).toBeInTheDocument();
  });

  it('renders contact page components', () => {
    renderWithProviders(<ContactPage />);

    expect(screen.getByRole('heading', { level: 1, name: /Contact Us/i })).toBeInTheDocument();
  });

  it('renders FAQ page components', () => {
    renderWithProviders(<FAQPage />);

    expect(screen.getByRole('heading', { name: /Frequently Asked Questions/i })).toBeInTheDocument();
  });

  it('renders add business page components', () => {
    renderWithProviders(<AddBusinessPage />);

    expect(screen.getByRole('heading', { name: /Add Your Business/i })).toBeInTheDocument();
  });

  it('renders categories page components', () => {
    renderWithProviders(<CategoriesListPage />);

    expect(screen.getByRole('heading', { name: /Browse Business Categories/i })).toBeInTheDocument();
  });

  it('renders 404 page components', () => {
    renderWithProviders(<NotFound />);

    expect(screen.getByRole('heading', { name: /404/i })).toBeInTheDocument();
  });
});
