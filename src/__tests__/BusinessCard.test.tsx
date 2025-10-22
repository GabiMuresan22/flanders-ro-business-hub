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
      address: 'Main St 1',
      city: 'Bruges',
      phone: '123456789',
      email: 'test@bakery.com',
      website: 'https://bakery.com',
      imageUrl: '',
      featured: false,
      openingHours: {
        monday: '8-18',
        tuesday: '8-18',
        wednesday: '8-18',
        thursday: '8-18',
        friday: '8-18',
        saturday: '8-18',
        sunday: 'Closed',
      },
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
