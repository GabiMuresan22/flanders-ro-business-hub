
import { Business, BusinessCategory } from './types';
import { restaurants } from './restaurants';
import { bakeries } from './bakeries';
import { services } from './services';

export { Business, BusinessCategory } from './types';

export const businesses: Business[] = [
  ...restaurants,
  ...bakeries,
  ...services
];
