'use client';

import { useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { Retreat, RetreatCategory } from '@/types';
import { RETREATS } from '@/lib/retreats-data';
import RetreatDetailPanel from '@/components/ui/RetreatDetailPanel';
import { Search, SlidersHorizontal, X, MapPin } from 'lucide-react';

// Dynamically import map to avoid SSR issues
const RetreatMap = dynamic(() => import('@/components/map/RetreatMap'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full bg-gray-100 text-gray-500 text-sm">
      Karte wird geladen…
    </div>
  ),
});

const CATEGORY_OPTIONS: { value: RetreatCategory | 'all'; label: string }[] = [
  { value: 'all', label: 'Alle' },
  { value: 'yoga', label: 'Yoga' },
  { value: 'wellness', label: 'Wellness' },
  { value: 'adventure', label: 'Abenteuer' },
  { value: 'meditation', label: 'Meditation' },
  { value: 'surf', label: 'Surfen' },
  { value: 'jungle', label: 'Dschungel' },
  { value: 'beach', label: 'Strand' },
  { value: 'eco', label: 'Öko' },
];

export default function MapPage() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedRetreat, setSelectedRetreat] = useState<Retreat | null>(null);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<RetreatCategory | 'all'>('all');
  const [maxPrice, setMaxPrice] = useState(300);
  const [showFilters, setShowFilters] = useState(false);
  const [panelOpen, setPanelOpen] = useState(false);

  // Derive filtered retreats from state with useMemo
  const filtered = useMemo(() => {
    let result = RETREATS;
    if (category !== 'all') result = result.filter((r) => r.category === category);
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      result = result.filter(
        (r) =>
          r.name.toLowerCase().includes(q) ||
          r.location.toLowerCase().includes(q) ||
          r.region.toLowerCase().includes(q) ||
          r.shortDescription.toLowerCase().includes(q),
      );
    }
    result = result.filter((r) => r.price <= maxPrice);
    return result;
  }, [category, search, maxPrice]);

  const handleSelect = (retreat: Retreat) => {
    setSelectedId(retreat.id);
    setSelectedRetreat(retreat);
    setPanelOpen(true);
  };

  const handleClose = () => {
    setPanelOpen(false);
    setSelectedRetreat(null);
    setSelectedId(null);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Top bar */}
      <header className="flex-shrink-0 bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-3 shadow-sm z-10">
        <div className="flex items-center gap-2 mr-2">
          <MapPin className="w-6 h-6 text-green-600" />
          <span className="font-bold text-gray-900 text-lg leading-none">Retreat Karte</span>
          <span className="hidden sm:inline text-gray-400 text-sm">· Costa Rica</span>
        </div>

        {/* Search */}
        <div className="flex-1 relative max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Suchen…"
            className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Filter toggle */}
        <button
          onClick={() => setShowFilters((v) => !v)}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-lg border text-sm font-medium transition-colors ${
            showFilters
              ? 'bg-green-600 text-white border-green-600'
              : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
          }`}
        >
          <SlidersHorizontal className="w-4 h-4" />
          <span className="hidden sm:inline">Filter</span>
        </button>

        {/* Results count */}
        <span className="text-sm text-gray-500 hidden md:inline">
          {filtered.length} {filtered.length === 1 ? 'Retreat' : 'Retreats'}
        </span>
      </header>

      {/* Filter bar */}
      {showFilters && (
        <div className="flex-shrink-0 bg-white border-b border-gray-200 px-4 py-3 flex flex-wrap gap-4 items-center">
          {/* Category */}
          <div className="flex flex-wrap gap-1.5">
            {CATEGORY_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setCategory(opt.value as RetreatCategory | 'all')}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                  category === opt.value
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>

          {/* Price slider */}
          <div className="flex items-center gap-2 text-sm text-gray-700 ml-auto">
            <span className="whitespace-nowrap">Max. €{maxPrice}/Nacht</span>
            <input
              type="range"
              min={50}
              max={300}
              step={10}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-28 accent-green-600"
            />
          </div>
        </div>
      )}

      {/* Main area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Map */}
        <div className={`relative flex-1 transition-all duration-300 ${panelOpen ? 'hidden md:block' : ''}`}>
          <RetreatMap
            retreats={filtered}
            selectedId={selectedId}
            onSelect={handleSelect}
            height="100%"
          />

          {/* Legend */}
          <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-xl shadow-md p-3 text-xs text-gray-600 space-y-1.5 z-[400]">
            <p className="font-semibold text-gray-800 text-xs uppercase tracking-wide mb-1">Legende</p>
            <div className="flex items-center gap-2">
              <span className="inline-block w-3 h-3 rounded-full bg-green-600"></span>
              Verfügbar
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-block w-3 h-3 rounded-full bg-gray-400"></span>
              Nicht verfügbar
            </div>
          </div>
        </div>

        {/* Detail panel */}
        {panelOpen && selectedRetreat && (
          <div className="w-full md:w-96 flex-shrink-0 border-l border-gray-200 overflow-hidden flex flex-col">
            {/* Mobile back button */}
            <div className="md:hidden flex items-center gap-2 px-4 py-2 bg-gray-50 border-b border-gray-200">
              <button
                onClick={handleClose}
                className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                <X className="w-4 h-4" />
                Zurück zur Karte
              </button>
            </div>
            <RetreatDetailPanel retreat={selectedRetreat} onClose={handleClose} />
          </div>
        )}
      </div>
    </div>
  );
}
