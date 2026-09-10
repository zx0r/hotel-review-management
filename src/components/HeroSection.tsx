import React from 'react';
import Image from 'next/image';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import type { HotelConfig } from '@/config/hotels';

interface HeroSectionProps {
  hotel: HotelConfig;
}

export function HeroSection({ hotel }: HeroSectionProps) {
  return (
    <section className="relative w-full pt-8 pb-10 px-4 sm:px-6 flex flex-col items-center text-center overflow-hidden">
      {/* Ghost Watermark Headline Layer */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none select-none text-[80px] sm:text-[120px] md:text-[150px] font-bold tracking-[-0.03em] text-[oklch(0.91_0.01_80)] opacity-70 whitespace-nowrap z-0"
      >
        {hotel.branding.watermarkText}
      </div>

      <div className="relative z-10 max-w-xl flex flex-col items-center">
        {/* Eyebrow with Signal Orange Dot */}
        <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full bg-white/70 border border-[oklch(0.922_0_0)] shadow-sm">
          <span className="w-2 h-2 rounded-full bg-[oklch(0.56_0.19_38)] animate-pulse" />
          <span className="text-[12px] font-bold tracking-[0.04em] uppercase text-[oklch(0.145_0_0)]">
            {hotel.name}
          </span>
        </div>

        {/* H1 Main Headline */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-[-0.02em] text-[oklch(0.145_0_0)] leading-[1.08] mb-3">
          {hotel.socialProof.headline}
        </h1>

        {/* Subheadline Body Text */}
        <p className="text-sm sm:text-base text-[oklch(0.556_0_0)] font-normal leading-relaxed max-w-md mb-8">
          {hotel.socialProof.subheadline}
        </p>

        {/* Circular Portrait with Satellite Micro-CTA */}
        <div className="relative mb-8 group">
          {/* Decorative Orbital Arc Line (SVG) */}
          <svg
            aria-hidden="true"
            className="absolute -top-6 -left-12 w-80 h-80 pointer-events-none stroke-[oklch(0.68_0.17_48)]/40 fill-none z-0"
            viewBox="0 0 300 300"
          >
            <circle
              cx="150"
              cy="150"
              r="135"
              strokeDasharray="4 6"
              strokeWidth="1.2"
            />
          </svg>

          {/* Perfect Circular Image Mask */}
          <div className="relative z-10 w-56 h-56 sm:w-64 sm:h-64 rounded-full overflow-hidden border-4 border-white shadow-[0px_24px_48px_0px_rgba(0,0,0,0.08)] bg-[oklch(0.922_0_0)]">
            <Image
              src={hotel.branding.heroImageUrl}
              alt={hotel.branding.heroImageAlt}
              fill
              priority
              sizes="(max-width: 640px) 224px, 256px"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>

          {/* Attached White Satellite Micro-CTA */}
          <a
            href="#review-platforms"
            aria-label="Scroll directly to review platforms"
            className="absolute bottom-1 right-1 z-20 w-14 h-14 rounded-full bg-white text-[oklch(0.145_0_0)] border border-[oklch(0.922_0_0)] shadow-[0px_8px_20px_rgba(0,0,0,0.12)] flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 group/sat"
          >
            <ArrowDown className="w-5 h-5 text-[oklch(0.145_0_0)] group-hover/sat:translate-y-0.5 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
}
