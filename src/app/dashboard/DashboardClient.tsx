'use client';
import { useEffect, useState } from 'react';
import { Booking, User } from '@/types';
import Link from 'next/link';
import { Calendar, MapPin, Users, CheckCircle, Clock, XCircle, Compass, Plus } from 'lucide-react';
import { format } from 'date-fns';

const STATUS_CONFIG = {
  confirmed: { label: 'Confirmed', icon: CheckCircle, color: 'text-green-600 bg-green-50' },
  pending: { label: 'Pending', icon: Clock, color: 'text-yellow-600 bg-yellow-50' },
  cancelled: { label: 'Cancelled', icon: XCircle, color: 'text-red-600 bg-red-50' },
};

export default function DashboardClient() {
  const [user, setUser] = useState<User | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [redirecting, setRedirecting] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('faire_user');
    if (!stored) {
      setRedirecting(true);
      window.location.href = '/auth/login';
      return;
    }
    setUser(JSON.parse(stored));

    fetch('/api/bookings')
      .then((r) => r.json())
      .then((data) => setBookings(data.bookings ?? []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (redirecting) return null;

  const upcoming = bookings.filter((b) => b.status !== 'cancelled');
  const totalSpent = upcoming.reduce((s, b) => s + b.totalPrice, 0);

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-6xl mx-auto px-4 py-10">
        {/* Header */}
        <div className="bg-gradient-to-br from-green-700 to-green-900 rounded-3xl text-white p-8 mb-8 shadow-lg">
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <p className="text-green-300 text-sm font-medium mb-1">Welcome back 👋</p>
              <h1 className="text-3xl font-extrabold mb-1">{user?.name ?? 'Traveller'}</h1>
              <p className="text-green-200 text-sm">{user?.email}</p>
            </div>
            <Link
              href="/retreats"
              className="flex items-center gap-2 bg-white text-green-800 font-semibold px-5 py-2.5 rounded-xl hover:bg-green-50 transition-colors text-sm"
            >
              <Plus size={16} /> Book New Retreat
            </Link>
          </div>

          {/* Quick stats */}
          <div className="grid grid-cols-3 gap-4 mt-8">
            {[
              { label: 'Total Bookings', value: bookings.length },
              { label: 'Upcoming', value: upcoming.length },
              { label: 'Total Spent', value: `$${totalSpent.toFixed(0)}` },
            ].map((stat) => (
              <div key={stat.label} className="bg-white/10 rounded-2xl p-4 text-center">
                <p className="text-2xl font-extrabold">{stat.value}</p>
                <p className="text-green-200 text-xs mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bookings */}
        <h2 className="text-2xl font-bold text-gray-900 mb-5">Your Bookings</h2>

        {loading ? (
          <div className="text-center py-16">
            <div className="w-10 h-10 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <p className="text-gray-500">Loading your bookings…</p>
          </div>
        ) : bookings.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-16 text-center">
            <div className="text-6xl mb-4">🏝️</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">No bookings yet</h3>
            <p className="text-gray-500 mb-6">Start exploring Costa Rica retreats and book your perfect escape.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/retreats" className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-colors">
                <Compass size={18} /> Browse Retreats
              </Link>
              <Link href="/map" className="flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-colors">
                <MapPin size={18} /> View Map
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {bookings.map((booking) => {
              const statusConf = STATUS_CONFIG[booking.status];
              const StatusIcon = statusConf.icon;
              return (
                <div key={booking.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                  <div className="flex items-start justify-between flex-wrap gap-3">
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg">{booking.retreatName ?? booking.tourName ?? 'Booking'}</h3>
                      <div className="flex items-center gap-1.5 text-gray-500 text-sm mt-1">
                        <MapPin size={13} className="text-green-600" />
                        {booking.location ?? 'Costa Rica'}
                      </div>
                    </div>
                    <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${statusConf.color}`}>
                      <StatusIcon size={13} />
                      {statusConf.label}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-5 pt-5 border-t border-gray-100 text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Calendar size={15} className="text-green-600" />
                      <div>
                        <p className="font-medium text-gray-800">
                          {format(new Date(booking.checkIn), 'MMM d')} – {format(new Date(booking.checkOut), 'MMM d, yyyy')}
                        </p>
                        <p className="text-xs text-gray-400">Check-in – Check-out</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Users size={15} className="text-green-600" />
                      <div>
                        <p className="font-medium text-gray-800">{booking.guests} guest{booking.guests > 1 ? 's' : ''}</p>
                        <p className="text-xs text-gray-400">Guests</p>
                      </div>
                    </div>
                    <div>
                      <p className="font-bold text-xl text-gray-900">${booking.totalPrice.toFixed(2)}</p>
                      <p className="text-xs text-gray-400">Total paid</p>
                    </div>
                  </div>

                  {booking.addons && booking.addons.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      <span className="text-xs text-gray-500">Add-ons:</span>
                      {booking.addons.map((id) => (
                        <span key={id} className="px-2 py-0.5 bg-orange-50 text-orange-700 rounded-full text-xs">{id}</span>
                      ))}
                    </div>
                  )}

                  <p className="text-xs text-gray-400 mt-3">
                    Booking ID: {booking.id} · {format(new Date(booking.createdAt), 'MMM d, yyyy')}
                  </p>
                </div>
              );
            })}
          </div>
        )}

        {/* Explore more */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { href: '/retreats', emoji: '🧘', title: 'All Retreats', desc: 'Browse all Costa Rica retreats' },
            { href: '/map', emoji: '🗺️', title: 'Interactive Map', desc: 'Explore on the live map' },
            { href: '/tours', emoji: '🚲', title: 'Tours & Extras', desc: 'Add experiences to your trip' },
          ].map((item) => (
            <Link key={item.href} href={item.href} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md hover:border-green-200 transition-all group text-center">
              <div className="text-3xl mb-2">{item.emoji}</div>
              <p className="font-semibold text-gray-900 group-hover:text-green-700 transition-colors">{item.title}</p>
              <p className="text-sm text-gray-500 mt-1">{item.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
