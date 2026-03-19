import { Booking } from '@/types';

// In-memory store for bookings (resets on server restart)
const bookings: Booking[] = [];

export function getBookings(): Booking[] {
  return [...bookings];
}

export function addBooking(booking: Booking): Booking {
  bookings.push(booking);
  return booking;
}
