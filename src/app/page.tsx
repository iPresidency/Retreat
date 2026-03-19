import type { Metadata } from 'next';
import Link from 'next/link';
import { RETREATS } from '@/lib/retreats-data';
import RetreatCard from '@/components/ui/RetreatCard';
import { ArrowRight, MapPin, Shield, Star, Calendar, Compass } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Faire Retreat Booking | Best Costa Rica Retreats & Tours',
  description: 'Book the best retreats, yoga, surf, wellness, tours, shuttles, bike rentals, and more in Costa Rica. Interactive map. Instant booking. Pura Vida!',
};

const FEATURES = [
  { icon: MapPin, title: 'Interactive Map', desc: 'Explore all retreats on a live map of Costa Rica. Click any pin for details, photos, and instant booking.' },
  { icon: Calendar, title: 'Instant Booking', desc: 'Book your retreat, add tours, shuttles, and bike rentals — all in one seamless checkout.' },
  { icon: Compass, title: 'Curated Experiences', desc: 'Hand-picked retreats across yoga, surf, wellness, adventure, jungle, and eco categories.' },
  { icon: Shield, title: 'Safe & Secure', desc: 'Encrypted payments, free 48h cancellation, and 24/7 customer support for total peace of mind.' },
  { icon: Star, title: 'Verified Reviews', desc: 'Read authentic reviews from real guests. Only verified bookers can leave ratings.' },
];

const CATEGORIES = [
  { label: 'Yoga', emoji: '🧘', value: 'yoga' },
  { label: 'Surf', emoji: '🏄', value: 'surf' },
  { label: 'Wellness', emoji: '💆', value: 'wellness' },
  { label: 'Adventure', emoji: '🧗', value: 'adventure' },
  { label: 'Meditation', emoji: '🕉️', value: 'meditation' },
  { label: 'Jungle', emoji: '🌴', value: 'jungle' },
  { label: 'Beach', emoji: '🏖️', value: 'beach' },
  { label: 'Eco', emoji: '🌿', value: 'eco' },
];

const STATS = [
  { value: '12+', label: 'Retreat Partners' },
  { value: '15+', label: 'Tour Options' },
  { value: '4.8★', label: 'Average Rating' },
  { value: '2,000+', label: 'Happy Guests' },
];

export default function HomePage() {
  const featured = RETREATS.slice(0, 6);

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920"
          alt="Costa Rica nature"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />

        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto pt-20">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-4 py-2 text-sm mb-6">
            <span className="animate-pulse w-2 h-2 bg-green-400 rounded-full" />
            <span>🌿 Pura Vida — Costa Rica&apos;s #1 Retreat Booking Platform</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6 drop-shadow-xl">
            Find Your Perfect<br />
            <span className="text-green-400">Costa Rica</span> Retreat
          </h1>

          <p className="text-xl md:text-2xl text-gray-200 mb-10 max-w-2xl mx-auto leading-relaxed">
            Yoga, surf, wellness, adventure & eco retreats across Costa Rica.
            Interactive map · Instant booking · Tours, shuttles & more.
          </p>

          {/* Quick search */}
          <div className="bg-white rounded-2xl shadow-2xl p-3 flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto mb-8">
            <input
              type="text"
              placeholder="Where in Costa Rica? (e.g. Nosara, La Fortuna…)"
              className="flex-1 px-4 py-3 rounded-xl text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <Link
              href="/retreats"
              className="flex items-center justify-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl transition-colors whitespace-nowrap"
            >
              <Compass size={18} />
              Search Retreats
            </Link>
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.value}
                href={`/retreats?category=${cat.value}`}
                className="flex items-center gap-1.5 bg-white/15 backdrop-blur-sm hover:bg-white/25 border border-white/30 rounded-full px-4 py-1.5 text-sm font-medium transition-all"
              >
                <span>{cat.emoji}</span>
                {cat.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Scroll arrow */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
          <div className="w-8 h-8 rounded-full border-2 border-white/60 flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="bg-green-700 py-12">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-white">
          {STATS.map((s) => (
            <div key={s.label}>
              <p className="text-4xl font-extrabold">{s.value}</p>
              <p className="text-green-200 text-sm mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Featured Retreats ── */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-3">Featured Retreats</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Hand-picked retreats from Guanacaste to the Osa Peninsula. Find your perfect Pura Vida escape.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featured.map((retreat) => (
              <RetreatCard key={retreat.id} retreat={retreat} />
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/retreats"
              className="inline-flex items-center gap-2 px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-2xl text-lg transition-colors"
            >
              View All {RETREATS.length} Retreats <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Interactive Map CTA ── */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gradient-to-br from-green-700 to-green-900 rounded-3xl overflow-hidden shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-2 items-center">
              <div className="p-10 md:p-14 text-white">
                <h2 className="text-4xl font-extrabold mb-4">Explore on the<br />Interactive Map</h2>
                <p className="text-green-200 text-lg mb-8">
                  Click any pin on our live Costa Rica map to see photos, amenities, prices, and book instantly — all in one place.
                </p>
                <Link
                  href="/map"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white text-green-800 font-bold rounded-2xl text-lg hover:bg-green-50 transition-colors"
                >
                  <MapPin size={20} />
                  Open Map
                </Link>
              </div>
              <div className="hidden md:block">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1448375240586-882707db888b?w=800"
                  alt="Costa Rica map"
                  className="h-80 w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-3">Why Faire Retreat Booking?</h2>
            <p className="text-gray-600 text-lg">The world&apos;s best platform for Costa Rica travel. Everything you need, in one place.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-white rounded-2xl p-7 shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                  <Icon size={24} className="text-green-700" />
                </div>
                <h3 className="font-bold text-gray-900 text-lg mb-2">{title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Categories ── */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-3">Browse by Category</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.value}
                href={`/retreats?category=${cat.value}`}
                className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg border border-gray-100 hover:border-green-300 transition-all text-center"
              >
                <div className="text-4xl mb-3">{cat.emoji}</div>
                <p className="font-semibold text-gray-900 group-hover:text-green-700 transition-colors">{cat.label}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {RETREATS.filter((r) => r.category === cat.value).length} retreats
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Register ── */}
      <section className="py-20 px-4 bg-orange-500">
        <div className="max-w-3xl mx-auto text-center text-white">
          <h2 className="text-4xl font-extrabold mb-4">Ready for Pura Vida?</h2>
          <p className="text-orange-100 text-xl mb-8">Register free and unlock the full interactive map, booking dashboard, and exclusive member deals.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/register" className="px-8 py-4 bg-white text-orange-600 font-bold rounded-2xl text-lg hover:bg-orange-50 transition-colors">
              Create Free Account
            </Link>
            <Link href="/retreats" className="px-8 py-4 bg-orange-600 text-white font-bold rounded-2xl text-lg hover:bg-orange-700 border-2 border-orange-300 transition-colors">
              Browse Retreats
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
