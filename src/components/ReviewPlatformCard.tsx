'use client';

import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import type { PlatformReviewData } from '@/lib/types/reviews';
import { trackReviewHubEvent } from '@/lib/analytics';
import { GoogleLogo, TripAdvisorLogo, BookingLogo, AgodaLogo } from './BrandIcons';

interface ReviewPlatformCardProps {
  platform: PlatformReviewData;
  hotelId: string;
}

function PlatformLogoComponent({ id }: { id: string }) {
  switch (id) {
    case 'google':
      return <GoogleLogo className="w-6 h-6" />;
    case 'tripadvisor':
      return <TripAdvisorLogo className="w-7 h-7" />;
    case 'booking':
      return <BookingLogo className="w-7 h-7" />;
    case 'agoda':
      return <AgodaLogo className="w-8 h-8" />;
    default:
      return null;
  }
}

export function ReviewPlatformCard({ platform, hotelId }: ReviewPlatformCardProps) {
  const handleClick = () => {
    trackReviewHubEvent('platform_click', {
      hotelId,
      platformId: platform.id,
      source: 'web_qr_landing',
    });
  };

  return (
    <a
      href={platform.directReviewUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className={`group relative w-full bg-[oklch(0.988_0.003_85)] hover:bg-white border transition-all duration-300 rounded-[32px] p-4 sm:p-5 flex items-center justify-between gap-4 shadow-[0px_4px_20px_0px_rgba(20,20,19,0.03)] hover:shadow-[0px_12px_32px_0px_rgba(20,20,19,0.08)] active:scale-[0.99] focus:outline-none focus-visible:ring-2 focus-visible:ring-[oklch(0.145_0_0)] ${
        platform.isPrimary
          ? 'border-[oklch(0.145_0_0)] ring-1 ring-[oklch(0.145_0_0)]/10'
          : 'border-[oklch(0.922_0_0)] hover:border-[oklch(0.708_0_0)]'
      }`}
    >
      {/* Left Column: Official Platform Brand Logo + Information */}
      <div className="flex items-center gap-3.5 min-w-0">
        <div className="w-12 h-12 rounded-full bg-white border border-[oklch(0.922_0_0)] shadow-xs flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform overflow-hidden p-1">
          <PlatformLogoComponent id={platform.id} />
        </div>

        <div className="flex flex-col text-left min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-base font-medium tracking-[-0.02em] text-[oklch(0.145_0_0)] truncate">
              {platform.name}
            </h3>
            {platform.badgeLabel && (
              <span className="text-[10px] font-bold tracking-[0.04em] uppercase px-2 py-0.5 rounded-full bg-[oklch(0.955_0.008_75)] text-[oklch(0.556_0_0)]">
                {platform.badgeLabel}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-xs font-bold text-[oklch(0.145_0_0)]">
              {platform.ratingFormatted}
            </span>
            <span className="text-[11px] text-[oklch(0.556_0_0)]">
              • {platform.totalReviewsFormatted}
            </span>
          </div>
        </div>
      </div>

      {/* Right Column: Ink Pill Action */}
      <div className="shrink-0 flex items-center">
        <div
          className={`h-10 px-4 rounded-[20px] text-xs font-medium tracking-tight inline-flex items-center gap-1.5 transition-all duration-200 ${
            platform.isPrimary
              ? 'bg-[oklch(0.145_0_0)] text-[oklch(0.955_0.008_75)] group-hover:bg-[oklch(0.205_0_0)]'
              : 'bg-white border border-[oklch(0.145_0_0)] text-[oklch(0.145_0_0)] group-hover:bg-[oklch(0.145_0_0)] group-hover:text-[oklch(0.955_0.008_75)]'
          }`}
        >
          <span>Review</span>
          <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </div>
    </a>
  );
}
