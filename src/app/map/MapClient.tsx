'use client';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import { Retreat, RetreatCategory } from '@/types';
import { MapPin, Star, Calendar, ArrowRight, X } from 'lucide-react';
import Link from 'next/link';

const RetreatMap = dynamic(() => import('@/components/map/RetreatMap'), { ssr: false });

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

export default function MapClient({ retreats }: { retreats: Retreat[] }) {
  const [selected, setSelected] = useState<Retreat | null>(null);
  const [category, setCategory] = useState<RetreatCategory | 'all'>('all');

  const filtered = category === 'all' ? retreats : retreats.filter((r) => r.category === category);

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Header */}
      <div className="bg-green-700 text-white py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-extrabold mb-1">Interactive Retreat Map</h1>
          <p className="text-green-200">Click any pin to explore retreats across Costa Rica</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Category filters */}
        <div className="flex flex-wrap gap-2 mb-5">
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Map */}
          <div className="lg:col-span-2">
            <RetreatMap
              retreats={filtered}
              selectedId={selected?.id}
              onSelect={setSelected}
              height="calc(100vh - 280px)"
            />
          </div>

          {/* Sidebar */}
          <div className="space-y-3 max-h-[calc(100vh-280px)] overflow-y-auto pr-1">
            {selected && (
              <div className="bg-white rounded-2xl shadow-lg border border-green-200 overflow-hidden relative">
                <button
                  onClick={() => setSelected(null)}
                  className="absolute top-3 right-3 z-10 bg-white/80 rounded-full p-1 hover:bg-white"
                >
                  <X size={16} />
                </button>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={selected.images[0]} alt={selected.name} className="w-full h-44 object-cover" />
                <div className="p-4">
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs font-semibold capitalize">{selected.category}</span>
                    <span className="flex items-center gap-0.5 text-xs text-yellow-600"><Star size={11} fill="currentColor" />{selected.rating}</span>
                  </div>
                  <h3 className="font-bold text-gray-900 text-lg mb-1">{selected.name}</h3>
                  <p className="flex items-center gap-1 text-sm text-gray-500 mb-2"><MapPin size={13} className="text-green-600" />{selected.location}</p>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-3">{selected.shortDescription}</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold text-gray-900">${selected.price}</span>
                      <span className="text-gray-500 text-sm">/night</span>
                    </div>
                    <Link
                      href={`/book?retreatId=${selected.id}`}
                      className="flex items-center gap-1.5 px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-bold rounded-xl transition-colors"
                    >
                      <Calendar size={14} /> Book
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {/* Retreat list */}
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide px-1">
              {filtered.length} Retreat{filtered.length !== 1 ? 's' : ''}
            </p>
            {filtered.map((retreat) => (
              <button
                key={retreat.id}
                onClick={() => setSelected(retreat)}
                className={`w-full text-left bg-white rounded-xl shadow-sm border transition-all p-3 flex gap-3 hover:shadow-md ${selected?.id === retreat.id ? 'border-green-500 ring-2 ring-green-200' : 'border-gray-100'}`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={retreat.images[0]} alt={retreat.name} className="w-16 h-16 rounded-lg object-cover shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 text-sm truncate">{retreat.name}</p>
                  <p className="text-gray-500 text-xs flex items-center gap-1 mt-0.5"><MapPin size={10} />{retreat.location}</p>
                  <div className="flex items-center justify-between mt-1">
                    <span className="font-bold text-gray-900 text-sm">${retreat.price}<span className="text-gray-400 text-xs">/night</span></span>
                    <ArrowRight size={14} className="text-green-600" />
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
