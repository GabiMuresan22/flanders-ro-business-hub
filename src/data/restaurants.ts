
import { Business, BusinessCategory } from './types';

export const restaurants: Business[] = [
  {
    id: "b001",
    name: "Bucătăria Românească",
    category: BusinessCategory.RESTAURANT,
    description: "Authentic Romanian restaurant offering traditional dishes from all regions of Romania. Family-friendly atmosphere with weekend live music.",
    address: "Marktstraat 15",
    city: "Bruges",
    phone: "+32 470 12 34 56",
    email: "info@bucatariaromaneasca.be",
    website: "https://www.bucatariaromaneasca.be",
    imageUrl: "/images/restaurant.jpg",
    featured: true,
    openingHours: {
      monday: "12:00 - 22:00",
      tuesday: "12:00 - 22:00",
      wednesday: "12:00 - 22:00",
      thursday: "12:00 - 22:00",
      friday: "12:00 - 23:00",
      saturday: "12:00 - 23:00",
      sunday: "12:00 - 21:00"
    }
  },
  {
    id: "b009",
    name: "Nonna Lucrezia",
    category: BusinessCategory.RESTAURANT,
    description: "Cozy Italian restaurant with authentic Romanian influences, offering homemade pasta, traditional dishes, and a warm family atmosphere. Perfect for romantic dinners and family gatherings.",
    address: "Dorpsstraat 45",
    city: "Izegem",
    phone: "+32 470 90 12 34",
    email: "info@nonnalucrezia.be",
    website: "https://www.nonnalucrezia.be",
    imageUrl: "/images/restaurant.jpg",
    featured: true,
    openingHours: {
      monday: "Closed",
      tuesday: "17:00 - 22:00",
      wednesday: "17:00 - 22:00",
      thursday: "17:00 - 22:00",
      friday: "17:00 - 23:00",
      saturday: "12:00 - 23:00",
      sunday: "12:00 - 21:00"
    }
  }
];
