/**
 * Simple in-memory store – replaces a database for this demo.
 * In production, replace with PostgreSQL / MongoDB.
 */
import { User, Booking } from '@/types';
import bcrypt from 'bcryptjs';

interface StoredUser extends User {
  passwordHash: string;
}

// Module-level singletons
declare global {
  // eslint-disable-next-line no-var
  var __users: StoredUser[] | undefined;
  // eslint-disable-next-line no-var
  var __bookings: Booking[] | undefined;
}

if (!global.__users) global.__users = [];
if (!global.__bookings) global.__bookings = [];

const users = global.__users;
const bookings = global.__bookings;

// ── Users ─────────────────────────────────────────────────────────────────────

export async function createUser(
  name: string,
  email: string,
  password: string
): Promise<User | null> {
  if (users.find((u) => u.email === email)) return null;
  const passwordHash = await bcrypt.hash(password, 10);
  const user: StoredUser = {
    id: `u_${Date.now()}`,
    name,
    email,
    passwordHash,
    createdAt: new Date().toISOString(),
  };
  users.push(user);
  return { id: user.id, name: user.name, email: user.email, createdAt: user.createdAt };
}

export async function findUserByEmail(email: string, password: string): Promise<User | null> {
  const user = users.find((u) => u.email === email);
  if (!user) return null;
  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) return null;
  return { id: user.id, name: user.name, email: user.email, createdAt: user.createdAt };
}

export function getUserById(id: string): User | null {
  const u = users.find((u) => u.id === id);
  return u ? { id: u.id, name: u.name, email: u.email, createdAt: u.createdAt } : null;
}

// ── Bookings ──────────────────────────────────────────────────────────────────

export function createBooking(data: Omit<Booking, 'id' | 'createdAt'>): Booking {
  const booking: Booking = {
    ...data,
    id: `b_${Date.now()}`,
    createdAt: new Date().toISOString(),
  };
  bookings.push(booking);
  return booking;
}

export function getBookingsByUser(userId: string): Booking[] {
  return bookings.filter((b) => b.userId === userId);
}
