# 🌿 Faire Retreat Booking

> The world's best booking platform for Costa Rica retreats, tours, and travel experiences.

[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/iPresidency/Retreat)

---

## ✨ Features

- 🗺️ **Interactive Map** — Explore all retreats on a live OpenStreetMap with clickable pins, photos, and instant booking
- 🧘 **12+ Curated Retreats** — Yoga, surf, wellness, adventure, meditation, jungle, beach & eco retreats across Costa Rica
- 🚲 **Tours & Extras** — Bike rentals, shuttle service, taxi, restaurants, hotels, AirBnBs, zip-lines, kayak tours, cooking classes
- 📅 **Booking with Calendar** — Date picker, guest selector, add-ons, and full price breakdown
- 👤 **User Auth** — Register, login, and JWT-based session (httpOnly cookie)
- 📊 **Dashboard** — View all bookings, upcoming trips, and spending summary
- 🔍 **Search & Filter** — Filter retreats by category, region, price, and keyword
- 🔒 **Security** — Secure HTTP headers (CSP, X-Frame-Options), bcrypt passwords, httpOnly JWT cookies
- 📱 **Fully Responsive** — Mobile-first design with Tailwind CSS
- 🚀 **SEO Optimised** — Metadata, OpenGraph, Twitter cards

## 🗂️ Tech Stack

| Layer       | Tech                            |
|-------------|----------------------------------|
| Framework   | Next.js 14 (App Router)          |
| Language    | TypeScript                       |
| Styling     | Tailwind CSS                     |
| Map         | Leaflet + React-Leaflet v4       |
| Calendar    | React DatePicker                 |
| Auth        | jose (JWT) + bcryptjs            |
| Icons       | Lucide React                     |

## 🚀 Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
src/
├── app/                   # Next.js App Router pages
│   ├── page.tsx           # Home page
│   ├── retreats/          # All retreats listing
│   ├── map/               # Interactive map
│   ├── tours/             # Tours & extras
│   ├── book/              # Booking page
│   ├── dashboard/         # User dashboard
│   ├── auth/              # Register & login
│   └── api/               # API routes
├── components/            # Reusable components
│   ├── layout/            # Navbar, Footer
│   ├── map/               # Leaflet map
│   ├── ui/                # Cards
│   └── booking/           # Booking form
├── lib/                   # Data, auth utils, store
└── types/                 # TypeScript types
```

## 🔐 Environment Variables

Create `.env.local` for production secrets:

```env
JWT_SECRET=your-super-secret-jwt-key-change-in-production
```

## 📸 Pages

- `/` — Home with hero, featured retreats, categories
- `/retreats` — Full retreat listing with filters
- `/map` — Interactive Costa Rica map
- `/tours` — Tours, rentals, transfers & more
- `/book?retreatId=r1` — Booking page
- `/dashboard` — User dashboard
- `/auth/register` — Create account
- `/auth/login` — Log in

---

*Pura Vida! 🌴*
