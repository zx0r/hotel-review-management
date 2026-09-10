'use client';

import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import type { HotelConfig } from '@/config/hotels';
import type { LiveHotelReviewData } from '@/lib/reviews-fetcher';
import { useLanguage } from '@/lib/LanguageContext';
import {
  GoogleLogo,
  TripAdvisorLogo,
  BookingLogo,
  AgodaLogo,
  TripComLogo,
  HostelworldLogo,
  HotelsComLogo,
} from '@/components/BrandIcons';
import { PrivateConciergeCard } from '@/components/PrivateConciergeCard';

interface ReviewHubClientViewProps {
  hotel: HotelConfig;
  liveReviews: LiveHotelReviewData;
}

function PlatformIcon({ id }: { id: string }) {
  switch (id) {
    case 'google':
      return <GoogleLogo className="w-8 h-8 sm:w-9 sm:h-9" />;
    case 'tripadvisor':
      return <TripAdvisorLogo className="w-8 h-8 sm:w-9 sm:h-9" />;
    case 'booking':
      return <BookingLogo className="w-8 h-8 sm:w-9 sm:h-9" />;
    case 'agoda':
      return <AgodaLogo className="w-8 h-8 sm:w-9 sm:h-9" />;
    case 'tripcom':
      return <TripComLogo className="w-8 h-8 sm:w-9 sm:h-9" />;
    case 'hostelworld':
      return <HostelworldLogo className="w-8 h-8 sm:w-9 sm:h-9" />;
    case 'hotelscom':
      return <HotelsComLogo className="w-8 h-8 sm:w-9 sm:h-9" />;
    default:
      return null;
  }
}

export function ReviewHubClientView({
  hotel,
  liveReviews,
}: ReviewHubClientViewProps) {
  const { t } = useLanguage();

  return (
    <main className="flex-1 w-full max-w-xl mx-auto px-4 sm:px-6 pt-6 pb-12 flex flex-col items-center">
      {/* Luxury Hero Section */}
      <section className="relative w-full flex flex-col items-center text-center pt-2 pb-5 mb-2">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-neutral-900 leading-tight mb-2.5">
          {t.hero.title}
        </h1>
        <p className="text-xs sm:text-sm text-neutral-600 font-normal leading-relaxed max-w-md">
          {t.hero.subtitle}
        </p>
      </section>

      {/* Review Platform Cards */}
      <section
        aria-label="Review Platforms"
        className="w-full flex flex-col gap-3 mb-6"
      >
        <div className="flex items-center justify-between px-1 mb-0.5">
          <span className="text-[11px] font-bold tracking-[0.04em] uppercase text-neutral-500">
            {t.hero.sectionLabel}
          </span>
          <span className="text-[11px] text-neutral-500 font-medium">
            {t.hero.directBadge}
          </span>
        </div>

        {liveReviews.platforms.map((platform) => {
          // Format review count with localized word
          const reviewCountNum = String(platform.totalReviews || '').replace(/[^0-9]/g, '');
          const localizedCountText = reviewCountNum
            ? `${reviewCountNum} ${t.hero.reviewsCount}`
            : platform.totalReviewsFormatted;

          return (
            <a
              key={platform.id}
              href={platform.directReviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative w-full bg-white hover:bg-neutral-50/80 rounded-[26px] sm:rounded-[30px] p-4 sm:p-4.5 flex items-center justify-between gap-4 shadow-[0px_4px_20px_0px_rgba(20,20,19,0.03)] hover:shadow-[0px_10px_32px_0px_rgba(20,20,19,0.07)] active:scale-[0.985] transition-all duration-300 border border-neutral-100"
            >
              {/* Platform Info */}
              <div className="flex items-center gap-3.5 sm:gap-4 min-w-0">
                <div className="w-12 h-12 sm:w-13 sm:h-13 rounded-full bg-neutral-100 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform p-1 overflow-hidden">
                  <PlatformIcon id={platform.id} />
                </div>

                <div className="flex flex-col text-left min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm sm:text-base font-semibold tracking-tight text-neutral-900 truncate">
                      {platform.name}
                    </span>
                    {platform.isPrimary && (
                      <span className="text-[10px] font-semibold tracking-wide text-neutral-600 bg-neutral-100 px-2.5 py-0.5 rounded-full">
                        {t.hero.recommended}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-neutral-500 font-normal mt-0.5">
                    <span className="text-neutral-900 font-semibold">
                      {platform.ratingFormatted}
                    </span>
                    <span>•</span>
                    <span className="truncate">{localizedCountText}</span>
                  </div>
                </div>
              </div>

              {/* Action Pill: Clean Ink Pill */}
              <div className="shrink-0 flex items-center">
                <div className="h-9 sm:h-9.5 px-3.5 sm:px-4.5 rounded-[18px] text-xs font-semibold tracking-tight inline-flex items-center gap-1.5 transition-all bg-neutral-100 text-neutral-900 group-hover:bg-neutral-900 group-hover:text-white">
                  <span>{t.hero.reviewAction}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            </a>
          );
        })}
      </section>

      {/* Private In-House Concierge Assistance */}
      <div className="w-full">
        <PrivateConciergeCard
          feedback={hotel.privateFeedback}
          hotelId={hotel.id}
        />
      </div>
    </main>
  );
}
