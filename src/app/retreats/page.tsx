import type { Metadata } from 'next';
import { Suspense } from 'react';
import { RETREATS } from '@/lib/retreats-data';
import RetreatsClient from './RetreatsClient';

export const metadata: Metadata = {
  title: 'All Costa Rica Retreats',
  description: 'Browse and book all retreats in Costa Rica — yoga, surf, wellness, adventure, eco and more. Filter by region, price, and category.',
};

export default function RetreatsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen pt-20 flex items-center justify-center"><div className="w-10 h-10 border-4 border-green-600 border-t-transparent rounded-full animate-spin" /></div>}>
      <RetreatsClient retreats={RETREATS} />
    </Suspense>
  );
}
