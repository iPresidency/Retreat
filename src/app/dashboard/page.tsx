import type { Metadata } from 'next';
import DashboardClient from './DashboardClient';

export const metadata: Metadata = {
  title: 'My Dashboard',
  description: 'Manage your retreat bookings, view upcoming trips, and explore new experiences.',
};

export default function DashboardPage() {
  return <DashboardClient />;
}
