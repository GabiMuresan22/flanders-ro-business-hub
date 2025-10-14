import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ContactPage from '../pages/ContactPage';

describe('ContactPage', () => {
  it('renders the contact page heading', () => {
    render(
      <BrowserRouter>
        <ContactPage />
      </BrowserRouter>
    );

    const heading = screen.getByRole('heading', { level: 1, name: /Contact Us/i });
    expect(heading).toBeInTheDocument();
  });

  it('renders contact form fields', () => {
    render(
      <BrowserRouter>
        <ContactPage />
      </BrowserRouter>
    );

    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Subject/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Message/i)).toBeInTheDocument();
  });

  it('renders submit button', () => {
    render(
      <BrowserRouter>
        <ContactPage />
      </BrowserRouter>
    );

    const submitButton = screen.getByRole('button', { name: /Send Message/i });
    expect(submitButton).toBeInTheDocument();
  });

  it('displays contact information', () => {
    render(
      <BrowserRouter>
        <ContactPage />
      </BrowserRouter>
    );

    // Check for email
    const contactInfo = screen.getByText(/contact@ro-businesshub.be/i);
    expect(contactInfo).toBeInTheDocument();
  });
});
