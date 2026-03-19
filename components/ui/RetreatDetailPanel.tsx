'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Retreat } from '@/types';
import { X, MapPin, Star, Users, Clock, CheckCircle, Mail, Globe } from 'lucide-react';
import BookingForm from '@/components/booking/BookingForm';

interface RetreatDetailPanelProps {
  retreat: Retreat;
  onClose: () => void;
}

export default function RetreatDetailPanel({ retreat, onClose }: RetreatDetailPanelProps) {
  const [showBooking, setShowBooking] = useState(false);
  const [bookingDone, setBookingDone] = useState(false);

  const categoryLabels: Record<string, string> = {
    yoga: 'Yoga',
    wellness: 'Wellness',
    adventure: 'Abenteuer',
    meditation: 'Meditation',
    surf: 'Surfen',
    jungle: 'Dschungel',
    beach: 'Strand',
    eco: 'Öko',
  };

  return (
    <div className="flex flex-col h-full overflow-hidden bg-white">
      {/* Header image */}
      <div className="relative flex-shrink-0 h-48">
        <Image
          src={retreat.images[0]}
          alt={retreat.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 384px"
          priority
        />
        <button
          onClick={onClose}
          className="absolute top-3 right-3 bg-white/90 hover:bg-white rounded-full p-1.5 shadow-md transition-colors"
          aria-label="Schließen"
        >
          <X className="w-5 h-5 text-gray-700" />
        </button>
        <span className="absolute top-3 left-3 bg-green-600 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
          {categoryLabels[retreat.category] ?? retreat.category}
        </span>
        {!retreat.available && (
          <span className="absolute bottom-3 left-3 bg-gray-800/80 text-white text-xs font-medium px-2.5 py-1 rounded-full">
            Nicht verfügbar
          </span>
        )}
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {bookingDone ? (
          <div className="text-center py-8 space-y-3">
            <CheckCircle className="w-12 h-12 text-green-500 mx-auto" />
            <h3 className="text-xl font-bold text-gray-900">Buchung bestätigt!</h3>
            <p className="text-gray-600 text-sm">
              Ihre Buchung für <strong>{retreat.name}</strong> wurde erfolgreich übermittelt.
              Eine Bestätigung erhalten Sie per E-Mail.
            </p>
            <button
              onClick={() => { setBookingDone(false); setShowBooking(false); }}
              className="mt-4 text-sm text-green-600 underline underline-offset-2"
            >
              Weitere Buchung
            </button>
          </div>
        ) : showBooking ? (
          <>
            <button
              onClick={() => setShowBooking(false)}
              className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-800 transition-colors"
            >
              ← Zurück zu Details
            </button>
            <BookingForm
              retreat={retreat}
              onSuccess={() => setBookingDone(true)}
            />
          </>
        ) : (
          <>
            {/* Title & meta */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 leading-tight">{retreat.name}</h2>
              <div className="flex flex-wrap gap-3 mt-2 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-green-600" />
                  {retreat.location}
                </span>
                <span className="flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  {retreat.rating} ({retreat.reviewCount} Bewertungen)
                </span>
              </div>
              <div className="flex flex-wrap gap-3 mt-1.5 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {retreat.duration}
                </span>
                <span className="flex items-center gap-1">
                  <Users className="w-3.5 h-3.5" />
                  Bis zu {retreat.maxGuests} Gäste
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="bg-green-50 border border-green-200 rounded-xl p-3 flex items-center justify-between">
              <div>
                <p className="text-xs text-green-700 font-medium uppercase tracking-wide">Preis ab</p>
                <p className="text-2xl font-bold text-green-700">
                  €{retreat.price}
                  <span className="text-sm font-normal text-green-600"> / Nacht</span>
                </p>
              </div>
              {retreat.available ? (
                <button
                  onClick={() => setShowBooking(true)}
                  className="bg-green-600 hover:bg-green-700 text-white font-semibold text-sm px-4 py-2.5 rounded-lg transition-colors shadow-sm"
                >
                  Jetzt buchen
                </button>
              ) : (
                <span className="text-sm text-gray-500 font-medium">Ausgebucht</span>
              )}
            </div>

            {/* Description */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-1.5">Beschreibung</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{retreat.description}</p>
            </div>

            {/* Highlights */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Highlights</h3>
              <ul className="grid grid-cols-1 gap-1.5">
                {retreat.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    {h}
                  </li>
                ))}
              </ul>
            </div>

            {/* Amenities */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Ausstattung</h3>
              <div className="flex flex-wrap gap-2">
                {retreat.amenities.map((a, i) => (
                  <span
                    key={i}
                    className="bg-gray-100 text-gray-700 text-xs px-2.5 py-1 rounded-full"
                  >
                    {a}
                  </span>
                ))}
              </div>
            </div>

            {/* Second image */}
            {retreat.images[1] && (
              <div>
                <div className="relative w-full h-36 rounded-xl overflow-hidden">
                  <Image
                    src={retreat.images[1]}
                    alt={`${retreat.name} – weitere Ansicht`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 384px"
                  />
                </div>
              </div>
            )}

            {/* Contact */}
            <div className="border-t pt-3 space-y-1.5 text-sm text-gray-600">
              <a href={`mailto:${retreat.contactEmail}`} className="flex items-center gap-2 hover:text-green-700 transition-colors">
                <Mail className="w-4 h-4 flex-shrink-0" />
                {retreat.contactEmail}
              </a>
              {retreat.website && (
                <a href={retreat.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-green-700 transition-colors">
                  <Globe className="w-4 h-4 flex-shrink-0" />
                  Website besuchen
                </a>
              )}
            </div>

            {/* Book CTA at bottom */}
            {retreat.available && (
              <button
                onClick={() => setShowBooking(true)}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl transition-colors shadow-sm"
              >
                Buchung starten
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}
