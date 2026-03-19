'use client';
import { useSearchParams } from 'next/navigation';
import { RETREATS } from '@/lib/retreats-data';
import { TOURS } from '@/lib/tours-data';
import BookingForm from '@/components/booking/BookingForm';
import TourCard from '@/components/ui/TourCard';
import { MapPin, Star, Clock, Users, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function BookingClient() {
  const searchParams = useSearchParams();
  const retreatId = searchParams.get('retreatId');
  const tourId = searchParams.get('tourId');

  const retreat = retreatId ? RETREATS.find((r) => r.id === retreatId) : undefined;
  const tour = tourId ? TOURS.find((t) => t.id === tourId) : undefined;

  if (!retreat && !tour) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="text-5xl mb-4">🔍</div>
          <p className="text-xl font-semibold text-gray-700 mb-4">No retreat or tour selected</p>
          <Link href="/retreats" className="px-6 py-3 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-colors">
            Browse Retreats
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <Link href={retreat ? '/retreats' : '/tours'} className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-green-700 mb-6">
          <ArrowLeft size={16} /> Back to {retreat ? 'Retreats' : 'Tours'}
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Left – Details */}
          <div>
            {retreat && (
              <>
                <div className="rounded-2xl overflow-hidden mb-6 shadow-lg">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={retreat.images[0]} alt={retreat.name} className="w-full h-72 object-cover" />
                </div>
                <h1 className="text-3xl font-extrabold text-gray-900 mb-2">{retreat.name}</h1>
                <div className="flex flex-wrap items-center gap-3 mb-4 text-sm text-gray-600">
                  <span className="flex items-center gap-1"><MapPin size={14} className="text-green-600" />{retreat.location}</span>
                  <span className="flex items-center gap-1"><Star size={14} className="text-yellow-500 fill-yellow-500" />{retreat.rating} ({retreat.reviewCount} reviews)</span>
                  <span className="flex items-center gap-1"><Clock size={14} />{retreat.duration}</span>
                  <span className="flex items-center gap-1"><Users size={14} />Max {retreat.maxGuests} guests</span>
                </div>
                <p className="text-gray-700 leading-relaxed mb-6">{retreat.description}</p>

                {/* Amenities */}
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-2">Amenities</h3>
                  <div className="flex flex-wrap gap-2">
                    {retreat.amenities.map((a) => (
                      <span key={a} className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm border border-green-100">{a}</span>
                    ))}
                  </div>
                </div>

                {/* Highlights */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Highlights</h3>
                  <ul className="space-y-1.5">
                    {retreat.highlights.map((h) => (
                      <li key={h} className="flex items-center gap-2 text-sm text-gray-700">
                        <span className="text-green-500">✓</span>{h}
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}

            {tour && !retreat && (
              <div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={tour.image} alt={tour.name} className="w-full h-64 object-cover rounded-2xl shadow-lg mb-6" />
                <h1 className="text-3xl font-extrabold text-gray-900 mb-3">{tour.name}</h1>
                <p className="text-gray-700 leading-relaxed mb-4">{tour.description}</p>
                <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                  <span className="flex items-center gap-1"><MapPin size={14} />{tour.location}</span>
                  <span className="flex items-center gap-1"><Clock size={14} />{tour.duration}</span>
                  <span className="flex items-center gap-1"><Users size={14} />Max {tour.maxParticipants}</span>
                </div>
                <p className="mt-4">
                  <strong className="text-2xl">${tour.price}</strong>
                  <span className="text-gray-500 text-sm"> {tour.priceUnit}</span>
                </p>
              </div>
            )}
          </div>

          {/* Right – Booking form */}
          <div>
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-7 sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-1">
                {retreat ? `Book ${retreat.name}` : `Add: ${tour?.name}`}
              </h2>
              <p className="text-gray-500 text-sm mb-6">
                {retreat ? `From $${retreat.price}/night` : `$${tour?.price} ${tour?.priceUnit}`}
              </p>
              {retreat && <BookingForm retreat={retreat} />}
              {tour && !retreat && (
                <div className="text-center py-8">
                  <p className="text-gray-600 mb-4">Add this experience to a retreat booking, or book it standalone.</p>
                  <Link href={`/retreats`} className="px-6 py-3 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-colors">
                    Browse Retreats
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Suggested Tours */}
        {retreat && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Popular Add-ons</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {TOURS.slice(0, 3).map((t) => <TourCard key={t.id} tour={t} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
