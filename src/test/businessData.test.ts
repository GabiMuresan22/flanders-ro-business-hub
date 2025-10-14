import { describe, it, expect } from 'vitest';
import { businesses, BusinessCategory } from '../data/businessData';

describe('Business Data', () => {
  it('contains business entries', () => {
    expect(businesses).toBeDefined();
    expect(businesses.length).toBeGreaterThan(0);
  });

  it('all businesses have required fields', () => {
    businesses.forEach(business => {
      expect(business.id).toBeDefined();
      expect(business.name).toBeDefined();
      expect(business.category).toBeDefined();
      expect(business.description).toBeDefined();
      expect(business.address).toBeDefined();
      expect(business.city).toBeDefined();
      expect(business.phone).toBeDefined();
      expect(business.email).toBeDefined();
      expect(business.imageUrl).toBeDefined();
      expect(typeof business.featured).toBe('boolean');
    });
  });

  it('all businesses have opening hours', () => {
    businesses.forEach(business => {
      expect(business.openingHours).toBeDefined();
      expect(business.openingHours.monday).toBeDefined();
      expect(business.openingHours.tuesday).toBeDefined();
      expect(business.openingHours.wednesday).toBeDefined();
      expect(business.openingHours.thursday).toBeDefined();
      expect(business.openingHours.friday).toBeDefined();
      expect(business.openingHours.saturday).toBeDefined();
      expect(business.openingHours.sunday).toBeDefined();
    });
  });

  it('all business IDs are unique', () => {
    const ids = businesses.map(b => b.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  it('all businesses have valid categories', () => {
    const validCategories = Object.values(BusinessCategory);
    businesses.forEach(business => {
      expect(validCategories).toContain(business.category);
    });
  });

  it('has featured businesses', () => {
    const featuredBusinesses = businesses.filter(b => b.featured);
    expect(featuredBusinesses.length).toBeGreaterThan(0);
  });

  it('email addresses are in valid format', () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    businesses.forEach(business => {
      expect(emailRegex.test(business.email)).toBe(true);
    });
  });
});
