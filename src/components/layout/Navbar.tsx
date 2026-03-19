'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, MapPin, Calendar, User, Home, Compass, Bike } from 'lucide-react';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState<{ name: string } | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem('faire_user');
    if (stored) {
      try { setUser(JSON.parse(stored)); } catch { /* ignore */ }
    }
  }, []);

  const handleLogout = async () => {
    await fetch('/api/auth/login', { method: 'DELETE' });
    localStorage.removeItem('faire_user');
    setUser(null);
    window.location.href = '/';
  };

  const nav = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/retreats', label: 'Retreats', icon: Compass },
    { href: '/map', label: 'Map', icon: MapPin },
    { href: '/tours', label: 'Tours & Extras', icon: Bike },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md' : 'bg-white/90 backdrop-blur-md'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">🌿</span>
            <div>
              <span className="font-bold text-green-700 text-lg leading-none">Faire Retreat</span>
              <span className="block text-[10px] text-green-500 font-medium tracking-widest uppercase">Costa Rica</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {nav.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors"
              >
                <Icon size={15} />
                {label}
              </Link>
            ))}
          </div>

          {/* Auth */}
          <div className="hidden md:flex items-center gap-2">
            {user ? (
              <>
                <Link href="/dashboard" className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-green-50 hover:text-green-700">
                  <User size={15} />
                  {user.name}
                </Link>
                <button onClick={handleLogout} className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/auth/login" className="px-4 py-2 text-sm font-medium text-green-700 border border-green-600 rounded-lg hover:bg-green-50 transition-colors">
                  Login
                </Link>
                <Link href="/auth/register" className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors">
                  Register
                </Link>
              </>
            )}
            <Link href="/retreats" className="flex items-center gap-1.5 px-4 py-2 text-sm font-bold text-white bg-orange-500 rounded-lg hover:bg-orange-600 transition-colors">
              <Calendar size={15} />
              Book Now
            </Link>
          </div>

          {/* Mobile toggle */}
          <button className="md:hidden p-2 rounded-lg hover:bg-gray-100" onClick={() => setOpen(!open)}>
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
          <div className="px-4 py-3 space-y-1">
            {nav.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-green-50 hover:text-green-700"
              >
                <Icon size={16} />
                {label}
              </Link>
            ))}
            <hr className="my-2" />
            {user ? (
              <>
                <Link href="/dashboard" onClick={() => setOpen(false)} className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-green-50">
                  <User size={16} /> Dashboard
                </Link>
                <button onClick={handleLogout} className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/auth/login" onClick={() => setOpen(false)} className="block px-3 py-2.5 rounded-lg text-sm font-medium text-green-700 hover:bg-green-50">Login</Link>
                <Link href="/auth/register" onClick={() => setOpen(false)} className="block px-3 py-2.5 rounded-lg text-sm font-medium text-white bg-green-600 text-center">Register</Link>
              </>
            )}
            <Link href="/retreats" onClick={() => setOpen(false)} className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg text-sm font-bold text-white bg-orange-500">
              <Calendar size={16} /> Book Now
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
