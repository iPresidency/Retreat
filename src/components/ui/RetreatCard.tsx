import { Retreat } from '@/types';
import Link from 'next/link';
import { MapPin, Star, Clock, Users, ArrowRight } from 'lucide-react';

const CATEGORY_COLORS: Record<string, string> = {
  yoga: 'bg-purple-100 text-purple-700',
  wellness: 'bg-blue-100 text-blue-700',
  adventure: 'bg-orange-100 text-orange-700',
  meditation: 'bg-indigo-100 text-indigo-700',
  surf: 'bg-cyan-100 text-cyan-700',
  jungle: 'bg-green-100 text-green-700',
  beach: 'bg-yellow-100 text-yellow-700',
  eco: 'bg-emerald-100 text-emerald-700',
};

export default function RetreatCard({ retreat }: { retreat: Retreat }) {
  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col">
      {/* Image */}
      <div className="relative overflow-hidden h-52">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={retreat.images[0]}
          alt={retreat.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3">
          <span className={`px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${CATEGORY_COLORS[retreat.category] ?? 'bg-gray-100 text-gray-700'}`}>
            {retreat.category}
          </span>
        </div>
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-2.5 py-1 flex items-center gap-1">
          <Star size={12} className="text-yellow-500 fill-yellow-500" />
          <span className="text-xs font-bold text-gray-800">{retreat.rating}</span>
          <span className="text-xs text-gray-500">({retreat.reviewCount})</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-bold text-gray-900 text-lg leading-snug mb-1 group-hover:text-green-700 transition-colors">
          {retreat.name}
        </h3>
        <div className="flex items-center gap-1.5 text-gray-500 text-sm mb-3">
          <MapPin size={13} className="text-green-600 shrink-0" />
          <span>{retreat.location}</span>
        </div>
        <p className="text-gray-600 text-sm leading-relaxed flex-1 mb-4">{retreat.shortDescription}</p>

        {/* Meta row */}
        <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
          <span className="flex items-center gap-1"><Clock size={12} />{retreat.duration}</span>
          <span className="flex items-center gap-1"><Users size={12} />Max {retreat.maxGuests}</span>
        </div>

        {/* Amenities */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {retreat.amenities.slice(0, 3).map((a) => (
            <span key={a} className="px-2 py-0.5 bg-green-50 text-green-700 rounded-full text-xs">{a}</span>
          ))}
          {retreat.amenities.length > 3 && (
            <span className="px-2 py-0.5 bg-gray-50 text-gray-500 rounded-full text-xs">+{retreat.amenities.length - 3} more</span>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div>
            <span className="text-2xl font-bold text-gray-900">${retreat.price}</span>
            <span className="text-gray-500 text-sm"> /{retreat.priceUnit.replace(/^per\s*/i, '') || 'night'}</span>
          </div>
          <Link
            href={`/book?retreatId=${retreat.id}`}
            className="flex items-center gap-1.5 px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold rounded-xl transition-colors"
          >
            Book <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}
