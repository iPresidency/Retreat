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

export type RetreatCategory =
  | 'yoga'
  | 'wellness'
  | 'adventure'
  | 'meditation'
  | 'surf'
  | 'jungle'
  | 'beach'
  | 'eco';

export interface Tour {
  id: string;
  name: string;
  description: string;
  category: TourCategory;
  price: number;
  priceUnit: string;
  duration: string;
  location: string;
  image: string;
  available: boolean;
  maxParticipants: number;
}

export type TourCategory =
  | 'bike_rental'
  | 'shuttle'
  | 'taxi'
  | 'restaurant'
  | 'hotel'
  | 'airbnb'
  | 'tour'
  | 'surf'
  | 'kayak'
  | 'zip_line'
  | 'waterfall'
  | 'wildlife'
  | 'cooking';

export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

export interface Booking {
  id: string;
  userId: string;
  retreatId?: string;
  tourId?: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  totalPrice: number;
  status: BookingStatus;
  addons: string[];
  createdAt: string;
  retreatName?: string;
  tourName?: string;
  location?: string;
}

export type BookingStatus = 'pending' | 'confirmed' | 'cancelled';
