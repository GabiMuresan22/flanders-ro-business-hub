
import { Business, BusinessCategory } from './types';

export const bakeries: Business[] = [
  {
    id: "b010",
    name: "Pretzel King",
    category: BusinessCategory.BAKERY,
    description: "Specialty pretzel bakery offering traditional German-style pretzels with Romanian twists. Fresh baked daily with a variety of toppings and fillings. Perfect for a quick snack or catering events.",
    address: "Noordstraat 28",
    city: "Roeselare",
    phone: "+32 470 95 67 89",
    email: "info@pretzelking.be",
    website: "https://www.pretzelking.be",
    imageUrl: "/images/bakery.jpg",
    featured: true,
    openingHours: {
      monday: "07:00 - 18:00",
      tuesday: "07:00 - 18:00",
      wednesday: "07:00 - 18:00",
      thursday: "07:00 - 18:00",
      friday: "07:00 - 19:00",
      saturday: "08:00 - 17:00",
      sunday: "09:00 - 15:00"
    }
  },
  {
    id: "b002",
    name: "Brutăria Carpați",
    category: BusinessCategory.BAKERY,
    description: "Romanian bakery offering covrigi, plăcinte, and other traditional pastries. Fresh bread baked daily.",
    address: "Stationsplein 5",
    city: "Ostend",
    phone: "+32 470 23 45 67",
    email: "contact@brutariacarpati.be",
    imageUrl: "/images/bakery.jpg",
    featured: true,
    openingHours: {
      monday: "07:00 - 19:00",
      tuesday: "07:00 - 19:00",
      wednesday: "07:00 - 19:00",
      thursday: "07:00 - 19:00",
      friday: "07:00 - 19:00",
      saturday: "08:00 - 18:00",
      sunday: "08:00 - 14:00"
    }
  }
];
