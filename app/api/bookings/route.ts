import { NextRequest, NextResponse } from 'next/server';
import { addBooking, getBookings } from '@/lib/store';
import { Booking } from '@/types';

export async function GET() {
  return NextResponse.json(getBookings());
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { retreatId, retreatName, location, checkIn, checkOut, guests, totalPrice, name, email } =
      body;

    if (!retreatId || !checkIn || !checkOut || !guests || !name || !email) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const booking: Booking = {
      id: crypto.randomUUID(),
      retreatId,
      retreatName,
      location,
      checkIn,
      checkOut,
      guests: Number(guests),
      totalPrice: Number(totalPrice),
      status: 'confirmed',
      name,
      email,
      createdAt: new Date().toISOString(),
    };

    addBooking(booking);
    return NextResponse.json(booking, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }
}
