import React from 'react';
import { Phone, MapPin } from 'lucide-react';
import type { HotelConfig } from '@/config/hotels';
import { HavilandHouseLogo } from './BrandIcons';

interface FloatingNavProps {
  hotel: HotelConfig;
}

export function FloatingNav({ hotel }: FloatingNavProps) {
  return (
    <header className="sticky top-4 sm:top-6 z-50 w-full px-4 sm:px-6 flex justify-center">
      <nav
        aria-label="Hotel Navigation"
        className="w-full max-w-xl bg-white/95 backdrop-blur-md rounded-full px-5 py-3 flex items-center justify-between shadow-[0px_4px_24px_0px_rgba(20,20,19,0.04)]"
      >
        {/* Left: Official Haviland House Logo & Hotel Moniker */}
        <a
          href={hotel.branding.officialWebsiteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2.5 group focus:outline-none"
        >
          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform overflow-hidden shadow-xs">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo-haviland-house.png"
              alt={hotel.brandGroup}
              className="w-full h-full object-contain p-0.5"
            />
          </div>
          <div className="flex flex-col text-left">
            <span className="text-[11px] font-bold tracking-[0.04em] uppercase text-[oklch(0.145_0_0)] leading-none">
              {hotel.brandGroup}
            </span>
            <span className="text-[10px] text-[oklch(0.45_0_0)] leading-tight mt-0.5 font-normal">
              {hotel.name}
            </span>
          </div>
        </a>

        {/* Right: Concierge & Map Pill Actions */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <a
            href={`tel:${hotel.privateFeedback.conciergePhone.replace(/\s+/g, '')}`}
            className="inline-flex items-center gap-1 text-[11px] font-medium text-[oklch(0.145_0_0)] bg-[oklch(0.96_0.005_75)] hover:bg-[oklch(0.92_0.008_75)] px-3 py-1.5 rounded-full transition-colors"
          >
            <Phone className="w-3 h-3 text-[oklch(0.56_0.19_38)]" />
            <span className="hidden xs:inline">Concierge</span>
          </a>
          <a
            href={hotel.location.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[11px] font-medium bg-[oklch(0.145_0_0)] text-[oklch(0.955_0.008_75)] hover:bg-[oklch(0.205_0_0)] px-3.5 py-1.5 rounded-full transition-transform active:scale-95"
          >
            <MapPin className="w-3 h-3 text-[oklch(0.68_0.17_48)]" />
            <span>Map</span>
          </a>
        </div>
      </nav>
    </header>
  );
}
