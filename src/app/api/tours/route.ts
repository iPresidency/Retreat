import { NextResponse } from 'next/server';
import { TOURS } from '@/lib/tours-data';

export async function GET() {
  return NextResponse.json({ tours: TOURS });
}
