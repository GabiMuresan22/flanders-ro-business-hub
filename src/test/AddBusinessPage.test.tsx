import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import AddBusinessPage from '../pages/AddBusinessPage';

describe('AddBusinessPage', () => {
  it('renders the add business page heading', () => {
    render(
      <BrowserRouter>
        <AddBusinessPage />
      </BrowserRouter>
    );

    const heading = screen.getByRole('heading', { name: /Add Your Business/i });
    expect(heading).toBeInTheDocument();
  });

  it('renders business form fields', () => {
    render(
      <BrowserRouter>
        <AddBusinessPage />
      </BrowserRouter>
    );

    expect(screen.getByLabelText(/Business Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Owner Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Phone/i)).toBeInTheDocument();
  });

  it('renders category selector', () => {
    render(
      <BrowserRouter>
        <AddBusinessPage />
      </BrowserRouter>
    );

    expect(screen.getByLabelText(/Category/i)).toBeInTheDocument();
  });

  it('renders submit button', () => {
    render(
      <BrowserRouter>
        <AddBusinessPage />
      </BrowserRouter>
    );

    const submitButton = screen.getByRole('button', { name: /Submit Business/i });
    expect(submitButton).toBeInTheDocument();
  });

  it('renders terms and conditions checkbox', () => {
    render(
      <BrowserRouter>
        <AddBusinessPage />
      </BrowserRouter>
    );

    const termsCheckbox = screen.getByRole('checkbox');
    expect(termsCheckbox).toBeInTheDocument();
  });
});
