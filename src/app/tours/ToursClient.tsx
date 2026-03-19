'use client';
import { useState, useMemo } from 'react';
import { Tour, TourCategory } from '@/types';
import TourCard from '@/components/ui/TourCard';
import { Search } from 'lucide-react';

const CATEGORIES: { value: TourCategory | 'all'; label: string; emoji: string }[] = [
  { value: 'all', label: 'All', emoji: '✨' },
  { value: 'bike_rental', label: 'Bike Rental', emoji: '🚲' },
  { value: 'shuttle', label: 'Shuttle', emoji: '🚌' },
  { value: 'taxi', label: 'Taxi', emoji: '🚕' },
  { value: 'restaurant', label: 'Restaurant', emoji: '🍽️' },
  { value: 'hotel', label: 'Hotel', emoji: '🏨' },
  { value: 'airbnb', label: 'AirBnB', emoji: '🏡' },
  { value: 'tour', label: 'Tours', emoji: '🗺️' },
  { value: 'surf', label: 'Surf', emoji: '🏄' },
  { value: 'kayak', label: 'Kayak', emoji: '🛶' },
  { value: 'zip_line', label: 'Zip-line', emoji: '🪂' },
  { value: 'waterfall', label: 'Waterfall', emoji: '💧' },
  { value: 'wildlife', label: 'Wildlife', emoji: '🦁' },
  { value: 'cooking', label: 'Cooking', emoji: '👨‍🍳' },
];

export default function ToursClient({ tours }: { tours: Tour[] }) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<TourCategory | 'all'>('all');

  const filtered = useMemo(() => {
    return tours.filter((t) => {
      const matchSearch = !search || t.name.toLowerCase().includes(search.toLowerCase()) ||
        t.description.toLowerCase().includes(search.toLowerCase()) ||
        t.location.toLowerCase().includes(search.toLowerCase());
      const matchCat = category === 'all' || t.category === category;
      return matchSearch && matchCat;
    });
  }, [tours, search, category]);

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Header */}
      <div className="bg-orange-500 text-white py-14 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-3">Tours & Extras</h1>
          <p className="text-orange-100 text-lg max-w-2xl mx-auto">
            Add the perfect experiences to your Costa Rica trip: bike rentals, shuttles, wildlife tours, cooking classes, and much more.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-8 space-y-4">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search tours, transfers, rentals…"
              className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setCategory(cat.value as TourCategory | 'all')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all border ${category === cat.value ? 'bg-orange-500 text-white border-orange-500' : 'bg-white text-gray-600 border-gray-200 hover:border-orange-400'}`}
              >
                <span>{cat.emoji}</span>{cat.label}
              </button>
            ))}
          </div>
        </div>

        <p className="text-sm text-gray-500 mb-6">Showing <strong>{filtered.length}</strong> option{filtered.length !== 1 ? 's' : ''}</p>

        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">🔍</div>
            <p className="text-xl font-semibold text-gray-700 mb-2">No results found</p>
            <p className="text-gray-500">Try adjusting your filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((tour) => (
              <TourCard key={tour.id} tour={tour} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
