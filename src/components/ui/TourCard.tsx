import { Tour } from '@/types';
import Link from 'next/link';
import { MapPin, Clock, Users, ArrowRight } from 'lucide-react';

const CATEGORY_ICONS: Record<string, string> = {
  bike_rental: '🚲',
  shuttle: '🚌',
  taxi: '🚕',
  restaurant: '🍽️',
  hotel: '🏨',
  airbnb: '🏡',
  tour: '🗺️',
  surf: '🏄',
  kayak: '🛶',
  zip_line: '🪂',
  waterfall: '💧',
  wildlife: '🦁',
  cooking: '👨‍🍳',
};

const CATEGORY_LABELS: Record<string, string> = {
  bike_rental: 'Bike Rental',
  shuttle: 'Shuttle',
  taxi: 'Taxi',
  restaurant: 'Restaurant',
  hotel: 'Hotel',
  airbnb: 'AirBnB',
  tour: 'Guided Tour',
  surf: 'Surf',
  kayak: 'Kayak',
  zip_line: 'Zip-line',
  waterfall: 'Waterfall',
  wildlife: 'Wildlife',
  cooking: 'Cooking',
};

export default function TourCard({ tour }: { tour: Tour }) {
  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col">
      <div className="relative overflow-hidden h-44">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={tour.image}
          alt={tour.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm rounded-full px-2.5 py-1 flex items-center gap-1.5">
          <span>{CATEGORY_ICONS[tour.category] ?? '🎯'}</span>
          <span className="text-xs font-semibold text-gray-800">{CATEGORY_LABELS[tour.category] ?? tour.category}</span>
        </div>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-bold text-gray-900 text-base leading-snug mb-2 group-hover:text-green-700 transition-colors">
          {tour.name}
        </h3>
        <div className="flex items-center gap-1.5 text-gray-500 text-xs mb-3">
          <MapPin size={12} className="text-green-600 shrink-0" />
          <span>{tour.location}</span>
        </div>
        <p className="text-gray-600 text-sm leading-relaxed flex-1 mb-4 line-clamp-3">{tour.description}</p>

        <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
          <span className="flex items-center gap-1"><Clock size={12} />{tour.duration}</span>
          <span className="flex items-center gap-1"><Users size={12} />Max {tour.maxParticipants}</span>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div>
            {tour.price === 0 ? (
              <span className="text-lg font-bold text-green-600">Free</span>
            ) : (
              <>
                <span className="text-xl font-bold text-gray-900">${tour.price}</span>
                <span className="text-gray-500 text-xs"> /{tour.priceUnit.replace(/^per\s*/i, '') || 'person'}</span>
              </>
            )}
          </div>
          <Link
            href={`/book?tourId=${tour.id}`}
            className="flex items-center gap-1.5 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold rounded-xl transition-colors"
          >
            Add <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}
