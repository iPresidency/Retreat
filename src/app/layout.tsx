import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: {
    default: 'Faire Retreat Booking | Costa Rica Retreats, Tours & More',
    template: '%s | Faire Retreat Booking',
  },
  description:
    'Discover and book the best retreats, tours, bike rentals, shuttles, restaurants, hotels, and more in Costa Rica. Your all-in-one booking platform for the perfect Pura Vida holiday.',
  keywords: [
    'Costa Rica retreats',
    'yoga retreat Costa Rica',
    'wellness retreat',
    'surf retreat Costa Rica',
    'Costa Rica tours',
    'booking Costa Rica',
    'eco retreat',
    'faire retreat booking',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://faire-retreat.cr',
    siteName: 'Faire Retreat Booking',
    title: 'Faire Retreat Booking | Costa Rica Retreats, Tours & More',
    description: 'Book Costa Rica retreats, tours, rentals, and more. Interactive map. Secure booking. Pura Vida!',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200',
        width: 1200,
        height: 630,
        alt: 'Costa Rica Retreat Booking',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Faire Retreat Booking',
    description: "The world's best booking platform for Costa Rica retreats & experiences.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
