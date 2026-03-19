'use client';
import { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { Retreat, RetreatCategory } from '@/types';
import RetreatCard from '@/components/ui/RetreatCard';
import { Search, SlidersHorizontal, MapPin } from 'lucide-react';
import Link from 'next/link';

const CATEGORIES: { value: RetreatCategory | 'all'; label: string; emoji: string }[] = [
  { value: 'all', label: 'All', emoji: '🌿' },
  { value: 'yoga', label: 'Yoga', emoji: '🧘' },
  { value: 'surf', label: 'Surf', emoji: '🏄' },
  { value: 'wellness', label: 'Wellness', emoji: '💆' },
  { value: 'adventure', label: 'Adventure', emoji: '🧗' },
  { value: 'meditation', label: 'Meditation', emoji: '🕉️' },
  { value: 'jungle', label: 'Jungle', emoji: '🌴' },
  { value: 'beach', label: 'Beach', emoji: '🏖️' },
  { value: 'eco', label: 'Eco', emoji: '♻️' },
];

const REGIONS = ['All Regions', 'Guanacaste', 'Puntarenas', 'Alajuela', 'Heredia', 'Limón', 'Osa Peninsula'];

const SORT_OPTIONS = [
  { value: 'rating', label: 'Top Rated' },
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
  { value: 'reviews', label: 'Most Reviewed' },
];

export default function RetreatsClient({ retreats }: { retreats: Retreat[] }) {
  const searchParams = useSearchParams();
  const initCategory = (searchParams.get('category') as RetreatCategory) ?? 'all';

  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<RetreatCategory | 'all'>(initCategory);
  const [region, setRegion] = useState('All Regions');
  const [maxPrice, setMaxPrice] = useState(600);
  const [sort, setSort] = useState('rating');

  const filtered = useMemo(() => {
    let list = retreats.filter((r) => {
      const matchSearch = !search || r.name.toLowerCase().includes(search.toLowerCase()) ||
        r.location.toLowerCase().includes(search.toLowerCase()) ||
        r.description.toLowerCase().includes(search.toLowerCase());
      const matchCat = category === 'all' || r.category === category;
      const matchRegion = region === 'All Regions' || r.region === region;
      const matchPrice = r.price <= maxPrice;
      return matchSearch && matchCat && matchRegion && matchPrice;
    });
    list = [...list].sort((a, b) => {
      if (sort === 'rating') return b.rating - a.rating;
      if (sort === 'price_asc') return a.price - b.price;
      if (sort === 'price_desc') return b.price - a.price;
      if (sort === 'reviews') return b.reviewCount - a.reviewCount;
      return 0;
    });
    return list;
  }, [retreats, search, category, region, maxPrice, sort]);

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Header */}
      <div className="bg-green-700 text-white py-14 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-3">All Costa Rica Retreats</h1>
          <p className="text-green-200 text-lg max-w-2xl mx-auto mb-6">
            Discover {retreats.length} curated retreats across Costa Rica. Filter by category, region and budget.
          </p>
          <Link href="/map" className="inline-flex items-center gap-2 bg-white text-green-700 font-semibold px-6 py-3 rounded-xl hover:bg-green-50 transition-colors">
            <MapPin size={18} /> View on Map
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Filters bar */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-8 space-y-4">
          {/* Search + Sort */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name, location, or keyword…"
                className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
              />
            </div>
            <div className="flex items-center gap-2">
              <SlidersHorizontal size={16} className="text-gray-500" />
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-green-500"
              >
                {SORT_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setCategory(cat.value as RetreatCategory | 'all')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all border ${category === cat.value ? 'bg-green-600 text-white border-green-600' : 'bg-white text-gray-600 border-gray-200 hover:border-green-400'}`}
              >
                <span>{cat.emoji}</span>{cat.label}
              </button>
            ))}
          </div>

          {/* Region + Price */}
          <div className="flex flex-col sm:flex-row gap-4 items-end">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Region</label>
              <select
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className="px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-green-500"
              >
                {REGIONS.map((r) => <option key={r}>{r}</option>)}
              </select>
            </div>
            <div className="flex-1 min-w-48">
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Max Price: <strong>${maxPrice}/night</strong>
              </label>
              <input
                type="range"
                min={50}
                max={600}
                step={10}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-green-600"
              />
            </div>
          </div>
        </div>

        {/* Results count */}
        <p className="text-sm text-gray-500 mb-6">
          Showing <strong>{filtered.length}</strong> retreat{filtered.length !== 1 ? 's' : ''}
        </p>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">🔍</div>
            <p className="text-xl font-semibold text-gray-700 mb-2">No retreats found</p>
            <p className="text-gray-500">Try adjusting your filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((retreat) => (
              <RetreatCard key={retreat.id} retreat={retreat} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
