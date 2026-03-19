'use client';
import { useState } from 'react';
import Link from 'next/link';
import { User, Mail, Lock, Eye, EyeOff, Loader2 } from 'lucide-react';

export default function RegisterForm() {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (form.password !== form.confirm) { setError('Passwords do not match.'); return; }
    if (form.password.length < 8) { setError('Password must be at least 8 characters.'); return; }
    setLoading(true);
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: form.name, email: form.email, password: form.password }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error ?? 'Registration failed'); return; }
      localStorage.setItem('faire_user', JSON.stringify(data.user));
      window.location.href = '/dashboard';
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8">
      <div className="text-center mb-8">
        <span className="text-5xl">🌿</span>
        <h1 className="text-2xl font-extrabold text-gray-900 mt-3">Create Your Account</h1>
        <p className="text-gray-500 text-sm mt-1">Join thousands of happy Pura Vida travellers</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name</label>
          <div className="relative">
            <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Maria Garcia"
              className="w-full pl-9 pr-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address</label>
          <div className="relative">
            <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="maria@example.com"
              className="w-full pl-9 pr-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
          <div className="relative">
            <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type={showPwd ? 'text' : 'password'}
              required
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              placeholder="Min. 8 characters"
              className="w-full pl-9 pr-10 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
            />
            <button type="button" onClick={() => setShowPwd(!showPwd)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
              {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Confirm Password</label>
          <div className="relative">
            <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type={showPwd ? 'text' : 'password'}
              required
              value={form.confirm}
              onChange={(e) => setForm({ ...form, confirm: e.target.value })}
              placeholder="Repeat password"
              className="w-full pl-9 pr-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
            />
          </div>
        </div>

        {error && (
          <p className="text-sm text-red-600 bg-red-50 rounded-xl px-3 py-2">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 py-3 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-bold rounded-xl transition-colors"
        >
          {loading ? <><Loader2 size={18} className="animate-spin" />Creating Account…</> : 'Create Account 🌿'}
        </button>

        <p className="text-center text-sm text-gray-500">
          Already have an account?{' '}
          <Link href="/auth/login" className="text-green-600 font-semibold hover:underline">Log in</Link>
        </p>
      </form>
    </div>
  );
}
