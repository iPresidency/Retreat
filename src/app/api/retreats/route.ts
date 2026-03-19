import { NextResponse } from 'next/server';
import { RETREATS } from '@/lib/retreats-data';

export async function GET() {
  return NextResponse.json({ retreats: RETREATS });
}
