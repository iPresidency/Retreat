import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import { createBooking, getBookingsByUser } from '@/lib/store';

async function getUser(req: NextRequest) {
  const token = req.cookies.get('auth_token')?.value;
  if (!token) return null;
  return verifyToken(token);
}

export async function GET(req: NextRequest) {
  const user = await getUser(req);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const bookings = getBookingsByUser(user.sub as string);
  return NextResponse.json({ bookings });
}

export async function POST(req: NextRequest) {
  const user = await getUser(req);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await req.json();
    const { retreatId, tourId, checkIn, checkOut, guests, totalPrice, addons, retreatName, tourName, location } = body;

    if (!checkIn || !checkOut || !guests) {
      return NextResponse.json({ error: 'Missing required booking fields.' }, { status: 400 });
    }

    const booking = createBooking({
      userId: user.sub as string,
      retreatId,
      tourId,
      checkIn,
      checkOut,
      guests: Number(guests),
      totalPrice: Number(totalPrice),
      status: 'confirmed',
      addons: addons ?? [],
      retreatName,
      tourName,
      location,
    });

    return NextResponse.json({ booking }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
