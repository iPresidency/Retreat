import type { Metadata } from 'next';
import MapClient from './MapClient';
import { RETREATS } from '@/lib/retreats-data';

export const metadata: Metadata = {
  title: 'Interactive Retreat Map – Costa Rica',
  description: 'Explore all Costa Rica retreats on an interactive map. Click any pin to view details, photos, amenities, and book instantly.',
};

export default function MapPage() {
  return <MapClient retreats={RETREATS} />;
}
