import Link from "next/link";
import Image from "next/image";
import { MapPin, Star, Calendar } from "lucide-react";
import { RETREATS } from "@/lib/retreats-data";

export default function Home() {
  const featuredRetreats = RETREATS.filter((r) => r.available).slice(0, 3);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Hero */}
      <section
        className="relative flex flex-col items-center justify-center text-center px-6 py-28 bg-cover bg-center"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.55)), url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&auto=format&fit=crop')",
        }}
      >
        <p className="text-green-300 text-sm font-semibold uppercase tracking-widest mb-3">Costa Rica</p>
        <h1 className="text-white text-4xl md:text-6xl font-bold leading-tight max-w-3xl">
          Finde dein perfektes Retreat
        </h1>
        <p className="text-gray-200 mt-4 text-lg max-w-xl leading-relaxed">
          Entdecke 12+ einzigartige Retreats auf unserer interaktiven Karte –{" "}
          von Yoga am Strand bis Abenteuer im Dschungel.
        </p>
        <Link
          href="/map"
          className="mt-8 inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold text-base px-8 py-3.5 rounded-full transition-colors shadow-lg"
        >
          <MapPin className="w-5 h-5" />
          Karte öffnen
        </Link>
      </section>

      {/* Stats */}
      <section className="bg-green-600 text-white py-8 px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-3 gap-4 text-center">
          {[
            { value: "12+", label: "Retreats" },
            { value: "8", label: "Kategorien" },
            { value: "4.8★", label: "Ø Bewertung" },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="text-2xl md:text-3xl font-bold">{stat.value}</p>
              <p className="text-green-100 text-sm mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured retreats */}
      <section className="py-16 px-6 max-w-5xl mx-auto w-full">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Empfohlene Retreats</h2>
        <p className="text-gray-500 mb-8">Klicke auf ein Retreat für Details und Buchung</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredRetreats.map((retreat) => (
            <Link
              key={retreat.id}
              href="/map"
              className="group rounded-2xl overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow bg-white"
            >
              <div className="relative overflow-hidden">
                <div className="relative h-44 overflow-hidden">
                  <Image
                    src={retreat.images[0]}
                    alt={retreat.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <span className="absolute top-3 left-3 bg-green-600 text-white text-xs font-semibold px-2 py-0.5 rounded-full capitalize">
                  {retreat.category}
                </span>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 text-base mb-1 line-clamp-1">{retreat.name}</h3>
                <p className="flex items-center gap-1 text-xs text-gray-500 mb-2">
                  <MapPin className="w-3 h-3" />
                  {retreat.location}
                </p>
                <p className="text-xs text-gray-600 line-clamp-2 mb-3">{retreat.shortDescription}</p>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-bold text-green-700">
                    €{retreat.price}
                    <span className="text-xs font-normal text-gray-500"> / Nacht</span>
                  </span>
                  <span className="flex items-center gap-1 text-amber-500 text-xs">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    {retreat.rating}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link
            href="/map"
            className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-3 rounded-full transition-colors"
          >
            <Calendar className="w-4 h-4" />
            Alle Retreats auf der Karte anzeigen
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-gray-100 py-6 text-center text-xs text-gray-400">
        © {new Date().getFullYear()} Retreat Costa Rica · Alle Rechte vorbehalten
      </footer>
    </div>
  );
}
