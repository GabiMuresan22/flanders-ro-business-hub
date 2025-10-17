
export interface Business {
  id: string;
  name: string;
  category: BusinessCategory;
  description: string;
  address: string;
  city: string;
  phone: string;
  email: string;
  website?: string;
  imageUrl: string;
  featured: boolean;
  openingHours: {
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    sunday: string;
  };
}

export enum BusinessCategory {
  RESTAURANT = "Restaurant",
  BAKERY = "Bakery",
  GROCERY = "Grocery",
  CAR_SERVICE = "Car Service",
  BEAUTY = "Beauty Salon",
  CONSTRUCTION = "Construction",
  TRANSPORT = "Transport",
  OTHER = "Other Services"
}
