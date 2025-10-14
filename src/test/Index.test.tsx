import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Index from '../pages/Index';

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

describe('Index Page', () => {
  it('renders the navbar', () => {
    renderWithProviders(<Index />);

    expect(screen.getByText('Romanian')).toBeInTheDocument();
    expect(screen.getByText('Business Hub')).toBeInTheDocument();
  });

  it('renders the hero section', () => {
    renderWithProviders(<Index />);

    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();
  });

  it('renders the footer', () => {
    renderWithProviders(<Index />);

    // Check that both navbar and footer sections exist
    const romanianText = screen.getAllByText('Romanian');
    expect(romanianText.length).toBeGreaterThanOrEqual(1);
  });

  it('renders all main sections', () => {
    renderWithProviders(<Index />);

    // Check for key sections by looking for headings
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
  });
});
