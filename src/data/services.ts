
import { Business, BusinessCategory } from './types';

export const services: Business[] = [
  {
    id: "b003",
    name: "Auto Service Dacia",
    category: BusinessCategory.CAR_SERVICE,
    description: "Full-service auto repair shop specializing in European and Romanian cars. Certified mechanics with over 15 years of experience.",
    address: "Industrieweg 45",
    city: "Roeselare",
    phone: "+32 470 34 56 78",
    email: "service@autodacia.be",
    website: "https://www.autodacia.be",
    imageUrl: "/images/car-service.jpg",
    featured: false,
    openingHours: {
      monday: "08:00 - 18:00",
      tuesday: "08:00 - 18:00",
      wednesday: "08:00 - 18:00",
      thursday: "08:00 - 18:00",
      friday: "08:00 - 18:00",
      saturday: "09:00 - 14:00",
      sunday: "Closed"
    }
  },
  {
    id: "b004",
    name: "Magazin Românesc",
    category: BusinessCategory.GROCERY,
    description: "Grocery store with Romanian food products, drinks, and daily essentials. Weekly deliveries from Romania.",
    address: "Gentsestraat 120",
    city: "Kortrijk",
    phone: "+32 470 45 67 89",
    email: "info@magazinromanesc.be",
    imageUrl: "/images/grocery.jpg",
    featured: true,
    openingHours: {
      monday: "10:00 - 20:00",
      tuesday: "10:00 - 20:00",
      wednesday: "10:00 - 20:00",
      thursday: "10:00 - 20:00",
      friday: "10:00 - 21:00",
      saturday: "09:00 - 21:00",
      sunday: "10:00 - 18:00"
    }
  },
  {
    id: "b005",
    name: "Transilvania Transport",
    category: BusinessCategory.TRANSPORT,
    description: "Regular transport services between Romania and Belgium. Passenger transport and package delivery.",
    address: "Stationslaan 22",
    city: "Bruges",
    phone: "+32 470 56 78 90",
    email: "rezervari@transilvaniatransport.be",
    website: "https://www.transilvaniatransport.be",
    imageUrl: "/images/transport.jpg",
    featured: false,
    openingHours: {
      monday: "09:00 - 17:00",
      tuesday: "09:00 - 17:00",
      wednesday: "09:00 - 17:00",
      thursday: "09:00 - 17:00",
      friday: "09:00 - 17:00",
      saturday: "10:00 - 14:00",
      sunday: "Closed"
    }
  },
  {
    id: "b006",
    name: "Beauty Salon Elena",
    category: BusinessCategory.BEAUTY,
    description: "Full-service beauty salon offering haircuts, styling, manicure, pedicure, and makeup services by Romanian professionals.",
    address: "Zuidstraat 8",
    city: "Ypres",
    phone: "+32 470 67 89 01",
    email: "appointments@beautyelena.be",
    imageUrl: "/images/beauty-salon.jpg",
    featured: false,
    openingHours: {
      monday: "Closed",
      tuesday: "09:00 - 18:00",
      wednesday: "09:00 - 18:00",
      thursday: "09:00 - 18:00",
      friday: "09:00 - 20:00",
      saturday: "09:00 - 17:00",
      sunday: "Closed"
    }
  },
  {
    id: "b007",
    name: "Construct România",
    category: BusinessCategory.CONSTRUCTION,
    description: "Construction company offering renovation, interior design, and general contracting services. Specialized in residential projects.",
    address: "Industriepark 34",
    city: "Kortrijk",
    phone: "+32 470 78 90 12",
    email: "office@constructromania.be",
    website: "https://www.constructromania.be",
    imageUrl: "/images/construction.jpg",
    featured: false,
    openingHours: {
      monday: "08:00 - 17:00",
      tuesday: "08:00 - 17:00",
      wednesday: "08:00 - 17:00",
      thursday: "08:00 - 17:00",
      friday: "08:00 - 17:00",
      saturday: "By appointment",
      sunday: "Closed"
    }
  },
  {
    id: "b008",
    name: "Transilvania Tours",
    category: BusinessCategory.OTHER,
    description: "Travel agency specializing in trips to Romania and Romanian cultural tours throughout Europe.",
    address: "Grote Markt 10",
    city: "Ostend",
    phone: "+32 470 89 01 23",
    email: "info@transilvaniatours.be",
    website: "https://www.transilvaniatours.be",
    imageUrl: "/images/travel-agency.jpg",
    featured: false,
    openingHours: {
      monday: "09:00 - 17:00",
      tuesday: "09:00 - 17:00",
      wednesday: "09:00 - 17:00",
      thursday: "09:00 - 17:00",
      friday: "09:00 - 17:00",
      saturday: "10:00 - 13:00",
      sunday: "Closed"
    }
  }
];
