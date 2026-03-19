'use client';

import { useState } from 'react';
import { Retreat } from '@/types';
import { Calendar, Users, Euro } from 'lucide-react';

interface BookingFormProps {
  retreat: Retreat;
  onSuccess: () => void;
}

const MS_PER_DAY = 86_400_000;

function formatDate(date: Date): string {
  return date.toISOString().split('T')[0];
}

function parseDateLocal(str: string): Date {
  const [y, m, d] = str.split('-').map(Number);
  return new Date(y, m - 1, d);
}

function diffDays(checkIn: string, checkOut: string): number {
  const a = parseDateLocal(checkIn);
  const b = parseDateLocal(checkOut);
  return Math.max(0, Math.round((b.getTime() - a.getTime()) / MS_PER_DAY));
}

export default function BookingForm({ retreat, onSuccess }: BookingFormProps) {
  const today = formatDate(new Date());
  const tomorrow = formatDate(new Date(Date.now() + MS_PER_DAY));

  const [checkIn, setCheckIn] = useState(today);
  const [checkOut, setCheckOut] = useState(tomorrow);
  const [guests, setGuests] = useState(1);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const nights = diffDays(checkIn, checkOut);
  const total = nights * retreat.price * guests;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (nights < 1) {
      setError('Das Abreisedatum muss nach dem Anreisedatum liegen.');
      return;
    }
    if (!name.trim() || !email.trim()) {
      setError('Bitte füllen Sie alle Pflichtfelder aus.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          retreatId: retreat.id,
          retreatName: retreat.name,
          location: retreat.location,
          checkIn,
          checkOut,
          guests,
          totalPrice: total,
          name: name.trim(),
          email: email.trim(),
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? 'Fehler bei der Buchung');
      }
      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unbekannter Fehler');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="font-bold text-gray-900 text-lg">{retreat.name} buchen</h3>

      {/* Date fields */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            <Calendar className="inline w-3.5 h-3.5 mr-1" />
            Anreise
          </label>
          <input
            type="date"
            value={checkIn}
            min={today}
            onChange={(e) => setCheckIn(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            <Calendar className="inline w-3.5 h-3.5 mr-1" />
            Abreise
          </label>
          <input
            type="date"
            value={checkOut}
            min={checkIn || today}
            onChange={(e) => setCheckOut(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>
      </div>

      {/* Guests */}
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">
          <Users className="inline w-3.5 h-3.5 mr-1" />
          Gäste (max. {retreat.maxGuests})
        </label>
        <select
          value={guests}
          onChange={(e) => setGuests(Number(e.target.value))}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          {Array.from({ length: retreat.maxGuests }, (_, i) => i + 1).map((n) => (
            <option key={n} value={n}>
              {n} {n === 1 ? 'Gast' : 'Gäste'}
            </option>
          ))}
        </select>
      </div>

      {/* Personal details */}
      <div className="space-y-3">
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Vollständiger Name *</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Max Mustermann"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">E-Mail-Adresse *</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="max@beispiel.de"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>
      </div>

      {/* Price summary */}
      <div className="bg-gray-50 rounded-xl p-3 space-y-1.5 text-sm">
        <div className="flex justify-between text-gray-600">
          <span>€{retreat.price} × {nights} {nights === 1 ? 'Nacht' : 'Nächte'} × {guests} {guests === 1 ? 'Gast' : 'Gäste'}</span>
        </div>
        <div className="flex justify-between font-bold text-gray-900 border-t pt-1.5">
          <span className="flex items-center gap-1">
            <Euro className="w-4 h-4" />
            Gesamtpreis
          </span>
          <span>€{total.toLocaleString('de-DE')}</span>
        </div>
      </div>

      {error && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading || nights < 1}
        className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-semibold py-3 rounded-xl transition-colors shadow-sm text-sm"
      >
        {loading ? 'Wird gebucht…' : 'Buchung abschicken'}
      </button>
    </form>
  );
}
