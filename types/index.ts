export type RetreatCategory =
  | 'yoga'
  | 'wellness'
  | 'adventure'
  | 'meditation'
  | 'surf'
  | 'jungle'
  | 'beach'
  | 'eco';

export interface Retreat {
  id: string;
  name: string;
  description: string;
  shortDescription: string;
  location: string;
  region: string;
  lat: number;
  lng: number;
  price: number;
  priceUnit: string;
  images: string[];
  amenities: string[];
  rating: number;
  reviewCount: number;
  category: RetreatCategory;
  duration: string;
  maxGuests: number;
  available: boolean;
  highlights: string[];
  contactEmail: string;
  website?: string;
}

export interface Booking {
  id: string;
  retreatId: string;
  retreatName: string;
  location: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  name: string;
  email: string;
  createdAt: string;
}
