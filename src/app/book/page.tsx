import type { Metadata } from 'next';
import { Suspense } from 'react';
import BookingClient from './BookingClient';

export const metadata: Metadata = {
  title: 'Book Your Retreat',
  description: 'Complete your Costa Rica retreat booking. Select dates, guests, and add optional tours and extras.',
};

export default function BookPage() {
  return (
    <Suspense fallback={<div className="min-h-screen pt-20 flex items-center justify-center"><div className="w-10 h-10 border-4 border-green-600 border-t-transparent rounded-full animate-spin" /></div>}>
      <BookingClient />
    </Suspense>
  );
}
