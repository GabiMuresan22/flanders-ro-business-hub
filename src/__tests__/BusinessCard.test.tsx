import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import BusinessCard from '../components/BusinessCard';
import { MemoryRouter } from 'react-router-dom';
import { BusinessCategory } from '../data/types';

describe('BusinessCard', () => {
  it('renders business name and category', () => {
    const business = {
      id: '1',
      business_name: 'Test Bakery',
      category: BusinessCategory.BAKERY,
      description: 'A great bakery.',
      city: 'Bruges',
      phone: '123456789',
      website: 'https://bakery.com',
    };
    render(
      <MemoryRouter>
        <BusinessCard business={business} />
      </MemoryRouter>
    );
    expect(screen.getByText('Test Bakery')).toBeInTheDocument();
    expect(screen.getByText('Bakery')).toBeInTheDocument();
  });
});
