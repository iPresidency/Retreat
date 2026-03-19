'use client';
import { useEffect, useRef } from 'react';
import { Retreat } from '@/types';

interface Props {
  retreats: Retreat[];
  selectedId?: string;
  onSelect?: (retreat: Retreat) => void;
  height?: string;
}

export default function RetreatMap({ retreats, selectedId, onSelect, height = '600px' }: Props) {
  const mapRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mapInstanceRef = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const markersRef = useRef<any[]>([]);

  useEffect(() => {
    if (typeof window === 'undefined' || !mapRef.current) return;
    if (mapInstanceRef.current) return; // already initialised

    // Dynamically import leaflet to avoid SSR issues
    import('leaflet').then((L) => {
      // Fix default icon paths for webpack
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      });

      const map = L.map(mapRef.current!, {
        center: [9.7489, -83.7534], // Costa Rica centre
        zoom: 8,
        zoomControl: true,
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 18,
      }).addTo(map);

      mapInstanceRef.current = map;

      // Add markers
      retreats.forEach((retreat) => {
        const greenIcon = L.divIcon({
          className: '',
          html: `<div style="
            background: #16a34a;
            border: 3px solid white;
            border-radius: 50% 50% 50% 0;
            transform: rotate(-45deg);
            width: 28px; height: 28px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.3);
            display: flex; align-items: center; justify-content: center;
          "></div>`,
          iconSize: [28, 28],
          iconAnchor: [14, 28],
          popupAnchor: [0, -28],
        });

        const marker = L.marker([retreat.lat, retreat.lng], { icon: greenIcon })
          .addTo(map)
          .bindPopup(`
            <div style="width:220px; font-family:system-ui">
              <img src="${retreat.images[0]}" style="width:100%;height:120px;object-fit:cover;border-radius:8px 8px 0 0" alt="${retreat.name}" />
              <div style="padding:10px">
                <h3 style="font-weight:700;font-size:14px;margin:0 0 4px">${retreat.name}</h3>
                <p style="color:#6b7280;font-size:12px;margin:0 0 8px">📍 ${retreat.location}</p>
                <p style="font-size:12px;margin:0 0 8px;color:#374151">${retreat.shortDescription}</p>
                <div style="display:flex;align-items:center;justify-content:space-between">
                  <span style="font-weight:700;font-size:16px">$${retreat.price}<span style="font-size:11px;color:#6b7280">/night</span></span>
                  <a href="/book?retreatId=${retreat.id}" style="background:#16a34a;color:white;padding:4px 12px;border-radius:8px;font-size:12px;font-weight:600;text-decoration:none">Book Now</a>
                </div>
              </div>
            </div>
          `, { maxWidth: 240 });

        marker.on('click', () => {
          if (onSelect) onSelect(retreat);
        });

        markersRef.current.push({ id: retreat.id, marker });
      });
    });

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
        markersRef.current = [];
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Highlight selected marker
  useEffect(() => {
    if (!selectedId || !mapInstanceRef.current) return;
    const found = markersRef.current.find((m) => m.id === selectedId);
    if (found) {
      found.marker.openPopup();
      mapInstanceRef.current.setView(found.marker.getLatLng(), 12, { animate: true });
    }
  }, [selectedId]);

  return (
    <div className="relative w-full rounded-2xl overflow-hidden shadow-lg border border-gray-200" style={{ height }}>
      <div ref={mapRef} className="w-full h-full" />
      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-xl shadow-md px-3 py-2 z-[400]">
        <p className="text-xs font-semibold text-gray-700 mb-1.5">🌿 Faire Retreat Map</p>
        <div className="flex items-center gap-1.5 text-xs text-gray-600">
          <div className="w-3 h-3 rounded-full bg-green-600 border-2 border-white shadow-sm" />
          <span>Retreat location – click to explore</span>
        </div>
      </div>
    </div>
  );
}
