import Link from 'next/link';
import { MapPin, Mail, Phone, Instagram, Facebook, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-3xl">🌿</span>
              <div>
                <p className="font-bold text-white text-xl">Faire Retreat</p>
                <p className="text-xs text-green-400 tracking-widest uppercase">Booking Platform</p>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-gray-400">
              The world&apos;s best booking platform for retreats, tours, and experiences in Costa Rica. Pura Vida!
            </p>
            <div className="flex gap-3 mt-4">
              <a href="#" aria-label="Instagram" className="p-2 rounded-full bg-gray-800 hover:bg-green-700 transition-colors"><Instagram size={16} /></a>
              <a href="#" aria-label="Facebook" className="p-2 rounded-full bg-gray-800 hover:bg-green-700 transition-colors"><Facebook size={16} /></a>
              <a href="#" aria-label="Twitter/X" className="p-2 rounded-full bg-gray-800 hover:bg-green-700 transition-colors"><Twitter size={16} /></a>
            </div>
          </div>

          {/* Explore */}
          <div>
            <h3 className="font-semibold text-white mb-4">Explore</h3>
            <ul className="space-y-2 text-sm">
              {[
                ['All Retreats', '/retreats'],
                ['Interactive Map', '/map'],
                ['Tours & Extras', '/tours'],
                ['Yoga Retreats', '/retreats?category=yoga'],
                ['Surf Retreats', '/retreats?category=surf'],
                ['Wellness Retreats', '/retreats?category=wellness'],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="hover:text-green-400 transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Add-ons */}
          <div>
            <h3 className="font-semibold text-white mb-4">Add-ons & Services</h3>
            <ul className="space-y-2 text-sm">
              {[
                ['Bike Rentals', '/tours?category=bike_rental'],
                ['Shuttle Service', '/tours?category=shuttle'],
                ['Taxi Transfers', '/tours?category=taxi'],
                ['Restaurants', '/tours?category=restaurant'],
                ['Hotels', '/tours?category=hotel'],
                ['AirBnB Rentals', '/tours?category=airbnb'],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="hover:text-green-400 transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-white mb-4">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin size={15} className="mt-0.5 text-green-400 shrink-0" />
                <span>San José, Costa Rica<br />(Serving all of Costa Rica)</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={15} className="text-green-400 shrink-0" />
                <a href="mailto:info@faire-retreat.cr" className="hover:text-green-400 transition-colors">info@faire-retreat.cr</a>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={15} className="text-green-400 shrink-0" />
                <a href="tel:+50622222222" className="hover:text-green-400 transition-colors">+506 2222-2222</a>
              </li>
            </ul>
          </div>
        </div>

        <hr className="border-gray-800 my-8" />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} Faire Retreat Booking. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-green-400">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-green-400">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
