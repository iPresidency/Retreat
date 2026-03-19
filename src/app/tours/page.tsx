import type { Metadata } from 'next';
import { TOURS } from '@/lib/tours-data';
import ToursClient from './ToursClient';

export const metadata: Metadata = {
  title: 'Tours & Extras in Costa Rica',
  description: 'Add tours, bike rentals, shuttle service, taxi transfers, restaurant reservations, hotels and AirBnB to your Costa Rica itinerary.',
};

export default function ToursPage() {
  return <ToursClient tours={TOURS} />;
}
