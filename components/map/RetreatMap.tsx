'use client';

import { useEffect, useRef } from 'react';
import type { Map as LeafletMap, Marker } from 'leaflet';
import { Retreat } from '@/types';

interface RetreatMapProps {
  retreats: Retreat[];
  selectedId: string | null;
  onSelect: (retreat: Retreat) => void;
  height?: string;
}

export default function RetreatMap({ retreats, selectedId, onSelect, height = '100%' }: RetreatMapProps) {
  const mapRef = useRef<LeafletMap | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const markersRef = useRef<Map<string, Marker>>(new Map());
  // Keep a stable ref to the handler so we can remove it on cleanup
  const selectHandlerRef = useRef<((e: Event) => void) | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (mapRef.current) return;

    // Register the custom-event handler at the outer effect level so it can be cleaned up
    const handleRetreatSelect = (e: Event) => {
      const retreatId = (e as CustomEvent<string>).detail;
      const retreat = retreats.find((r) => r.id === retreatId);
      if (retreat) onSelect(retreat);
    };
    selectHandlerRef.current = handleRetreatSelect;
    window.addEventListener('retreat-select', handleRetreatSelect);

    // Dynamically import Leaflet to avoid SSR issues
    import('leaflet').then((L) => {
      if (!containerRef.current || mapRef.current) return;

      // Fix default icon paths
      delete (L.Icon.Default.prototype as { _getIconUrl?: unknown })._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      });

      const map = L.map(containerRef.current, {
        center: [9.7489, -83.7534],
        zoom: 7,
        scrollWheelZoom: true,
      });

      mapRef.current = map;

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 18,
      }).addTo(map);

      retreats.forEach((retreat) => {
        const isAvailable = retreat.available;

        const markerHtml = `
          <div style="
            background: ${isAvailable ? '#16a34a' : '#9ca3af'};
            width: 32px;
            height: 32px;
            border-radius: 50% 50% 50% 0;
            transform: rotate(-45deg);
            border: 3px solid white;
            box-shadow: 0 2px 8px rgba(0,0,0,0.3);
            cursor: pointer;
            transition: transform 0.2s, box-shadow 0.2s;
          "></div>`;

        const icon = L.divIcon({
          html: markerHtml,
          className: '',
          iconSize: [32, 32],
          iconAnchor: [16, 32],
          popupAnchor: [0, -36],
        });

        const popupContent = `
          <div style="min-width:220px; max-width:260px; font-family:sans-serif;">
            <img src="${retreat.images[0]}" alt="${retreat.name}"
              style="width:100%; height:120px; object-fit:cover; border-radius:6px 6px 0 0; margin:-10px -10px 8px -10px; width:calc(100% + 20px);" />
            <h3 style="margin:0 0 4px; font-size:15px; font-weight:700; color:#111;">${retreat.name}</h3>
            <p style="margin:0 0 4px; font-size:12px; color:#6b7280;">📍 ${retreat.location}</p>
            <p style="margin:0 0 8px; font-size:12px; color:#374151; line-height:1.4;">${retreat.shortDescription}</p>
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
              <span style="font-size:14px; font-weight:700; color:#16a34a;">€${retreat.price}<span style="font-weight:400; font-size:11px; color:#6b7280;"> / Nacht</span></span>
              <span style="font-size:11px; color:#f59e0b;">⭐ ${retreat.rating} (${retreat.reviewCount})</span>
            </div>
            <button
              onclick="window.dispatchEvent(new CustomEvent('retreat-select', {detail: '${retreat.id}'}))"
              style="
                width:100%; padding:8px; background:${isAvailable ? '#16a34a' : '#9ca3af'};
                color:white; border:none; border-radius:6px; font-size:13px; font-weight:600;
                cursor:${isAvailable ? 'pointer' : 'not-allowed'};
              "
            >${isAvailable ? 'Details & Buchung' : 'Nicht verfügbar'}</button>
          </div>`;

        const marker = L.marker([retreat.lat, retreat.lng], { icon })
          .bindPopup(popupContent, { maxWidth: 280 })
          .addTo(map);

        marker.on('click', () => {
          onSelect(retreat);
        });

        markersRef.current.set(retreat.id, marker);
      });
    });

    return () => {
      if (selectHandlerRef.current) {
        window.removeEventListener('retreat-select', selectHandlerRef.current);
        selectHandlerRef.current = null;
      }
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Pan to selected retreat
  useEffect(() => {
    if (!mapRef.current || !selectedId) return;
    const retreat = retreats.find((r) => r.id === selectedId);
    if (!retreat) return;
    mapRef.current.flyTo([retreat.lat, retreat.lng], 11, { duration: 1 });
    const marker = markersRef.current.get(selectedId);
    if (marker) marker.openPopup();
  }, [selectedId, retreats]);

  return (
    <div ref={containerRef} style={{ height, width: '100%' }} />
  );
}
