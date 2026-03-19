'use client';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { addDays, differenceInDays, format } from 'date-fns';
import { Calendar, Users, CheckCircle, Loader2 } from 'lucide-react';
import { Retreat } from '@/types';
import { TOURS } from '@/lib/tours-data';

interface Props {
  retreat: Retreat;
}

export default function BookingForm({ retreat }: Props) {
  const [checkIn, setCheckIn] = useState<Date | null>(addDays(new Date(), 7));
  const [checkOut, setCheckOut] = useState<Date | null>(addDays(new Date(), 10));
  const [guests, setGuests] = useState(2);
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const nights = checkIn && checkOut ? Math.max(1, differenceInDays(checkOut, checkIn)) : 3;
  const addonTotal = selectedAddons.reduce((sum, id) => {
    const tour = TOURS.find((t) => t.id === id);
    return sum + (tour?.price ?? 0);
  }, 0);
  const total = retreat.price * nights * guests + addonTotal;

  const toggleAddon = (id: string) => {
    setSelectedAddons((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkIn || !checkOut) {
      setError('Please select check-in and check-out dates.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          retreatId: retreat.id,
          retreatName: retreat.name,
          location: retreat.location,
          checkIn: format(checkIn, 'yyyy-MM-dd'),
          checkOut: format(checkOut, 'yyyy-MM-dd'),
          guests,
          totalPrice: total,
          addons: selectedAddons,
        }),
      });
      if (res.status === 401) {
        window.location.href = `/auth/login?next=/book?retreatId=${retreat.id}`;
        return;
      }
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? 'Booking failed');
      }
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="text-center py-10 px-6">
        <CheckCircle size={56} className="text-green-600 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Booking Confirmed! 🎉</h3>
        <p className="text-gray-600 mb-2">Your retreat at <strong>{retreat.name}</strong> is booked.</p>
        <p className="text-gray-500 text-sm mb-6">
          {checkIn && format(checkIn, 'MMM d')} – {checkOut && format(checkOut, 'MMM d, yyyy')} · {guests} guest{guests > 1 ? 's' : ''}<br />
          Total: <strong>${total.toFixed(2)}</strong>
        </p>
        <a href="/dashboard" className="px-6 py-3 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-colors">
          View Dashboard
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Dates */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            <span className="flex items-center gap-1.5"><Calendar size={13} />Check-in</span>
          </label>
          <DatePicker
            selected={checkIn}
            onChange={(d: Date | null) => setCheckIn(d)}
            selectsStart
            startDate={checkIn ?? undefined}
            endDate={checkOut ?? undefined}
            minDate={new Date()}
            dateFormat="MMM d, yyyy"
            placeholderText="Select date"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            <span className="flex items-center gap-1.5"><Calendar size={13} />Check-out</span>
          </label>
          <DatePicker
            selected={checkOut}
            onChange={(d: Date | null) => setCheckOut(d)}
            selectsEnd
            startDate={checkIn ?? undefined}
            endDate={checkOut ?? undefined}
            minDate={checkIn ? addDays(checkIn, 1) : new Date()}
            dateFormat="MMM d, yyyy"
            placeholderText="Select date"
          />
        </div>
      </div>

      {/* Guests */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          <span className="flex items-center gap-1.5"><Users size={13} />Guests</span>
        </label>
        <select
          value={guests}
          onChange={(e) => setGuests(Number(e.target.value))}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200"
        >
          {Array.from({ length: Math.min(retreat.maxGuests, 10) }, (_, i) => i + 1).map((n) => (
            <option key={n} value={n}>{n} guest{n > 1 ? 's' : ''}</option>
          ))}
        </select>
      </div>

      {/* Add-ons */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Add Tours & Extras</label>
        <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
          {TOURS.filter((t) => ['shuttle', 'bike_rental', 'surf', 'tour', 'zip_line', 'kayak'].includes(t.category)).slice(0, 8).map((tour) => (
            <label key={tour.id} className={`flex items-center gap-3 p-2.5 rounded-lg border cursor-pointer transition-colors ${selectedAddons.includes(tour.id) ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-green-300'}`}>
              <input
                type="checkbox"
                className="accent-green-600"
                checked={selectedAddons.includes(tour.id)}
                onChange={() => toggleAddon(tour.id)}
              />
              <span className="flex-1 text-sm text-gray-700">{tour.name}</span>
              <span className="text-sm font-semibold text-gray-900">
                {tour.price === 0 ? 'Free' : `+$${tour.price}`}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Price breakdown */}
      <div className="bg-gray-50 rounded-xl p-4 space-y-2 text-sm">
        <div className="flex justify-between text-gray-600">
          <span>${retreat.price} × {nights} night{nights > 1 ? 's' : ''} × {guests} guest{guests > 1 ? 's' : ''}</span>
          <span>${(retreat.price * nights * guests).toFixed(2)}</span>
        </div>
        {addonTotal > 0 && (
          <div className="flex justify-between text-gray-600">
            <span>Add-ons</span>
            <span>+${addonTotal.toFixed(2)}</span>
          </div>
        )}
        <hr className="border-gray-200" />
        <div className="flex justify-between font-bold text-gray-900">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>

      {error && (
        <p className="text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2">{error}</p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full flex items-center justify-center gap-2 py-3 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-bold rounded-xl transition-colors text-base"
      >
        {loading ? <><Loader2 size={18} className="animate-spin" />Processing...</> : '🌿 Confirm Booking'}
      </button>
      <p className="text-center text-xs text-gray-400">Secure booking · Free cancellation 48h before check-in</p>
    </form>
  );
}
