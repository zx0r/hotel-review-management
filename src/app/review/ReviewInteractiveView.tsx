'use client';

import React, { useState } from 'react';
import {
  Star,
  ArrowUpRight,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Phone,
  Mail,
  Clock,
  HeartHandshake,
} from 'lucide-react';
import type { HotelConfig } from '@/config/hotels';
import type { LiveReviewSummary } from '@/lib/types/reviews';
import { useLanguage } from '@/lib/LanguageContext';
import {
  GoogleLogo,
  TripAdvisorLogo,
  BookingLogo,
  AgodaLogo,
} from '@/components/BrandIcons';
import { trackReviewHubEvent } from '@/lib/analytics';

interface ReviewInteractiveViewProps {
  hotel: HotelConfig;
  liveReviews: LiveReviewSummary;
}

function PlatformIcon({ id }: { id: string }) {
  switch (id) {
    case 'google':
      return <GoogleLogo className="size-7 sm:size-8" />;
    case 'tripadvisor':
      return <TripAdvisorLogo className="size-7 sm:size-8" />;
    case 'booking':
      return <BookingLogo className="size-7 sm:size-8" />;
    case 'agoda':
      return <AgodaLogo className="size-7 sm:size-8" />;
    default:
      return null;
  }
}

export function ReviewInteractiveView({
  hotel,
  liveReviews,
}: ReviewInteractiveViewProps) {
  const { t } = useLanguage();
  const [selectedStars, setSelectedStars] = useState<number>(5);
  const [hoveredStars, setHoveredStars] = useState<number | null>(null);

  const activeStars = hoveredStars ?? selectedStars;

  const handleStarClick = (rating: number) => {
    setSelectedStars(rating);
    trackReviewHubEvent('star_rating_select', {
      hotelId: hotel.id,
      rating,
    });
  };

  const handlePlatformClick = (platformId: string) => {
    trackReviewHubEvent('platform_click', {
      hotelId: hotel.id,
      platformId,
      preSelectedRating: selectedStars,
      source: 'review_page_interactive',
    });
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4 sm:px-6 py-6 sm:py-10 flex flex-col items-center">
      {/* Hotel Identity Eyebrow */}
      <div className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white/80 backdrop-blur-md px-3.5 py-1 text-xs font-semibold text-neutral-700 shadow-xs mb-4">
        <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
        <span>{hotel.name}</span>
      </div>

      {/* Hero Headings */}
      <div className="text-center max-w-lg mb-6">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-neutral-900 leading-tight">
          {t.hero.title}
        </h1>
        <p className="text-xs sm:text-sm text-neutral-600 font-normal leading-relaxed mt-2">
          {t.hero.subtitle}
        </p>
      </div>

      {/* Interactive 5-Star Rating Selector */}
      <div className="w-full bg-white rounded-3xl p-6 sm:p-7 border border-neutral-200/80 shadow-[0_4px_24px_rgba(20,20,19,0.03)] mb-6 text-center">
        <div className="flex items-center justify-center gap-1.5 text-xs font-bold uppercase tracking-wider text-neutral-500 mb-3">
          <Sparkles className="size-3.5 text-amber-500" />
          <span>{selectedStars === 5 ? 'Exceptional Stay' : selectedStars >= 4 ? 'Great Experience' : 'Your Rating'}</span>
        </div>

        {/* Stars */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 py-2">
          {[1, 2, 3, 4, 5].map((star) => {
            const isFilled = star <= activeStars;
            return (
              <button
                key={star}
                type="button"
                onClick={() => handleStarClick(star)}
                onMouseEnter={() => setHoveredStars(star)}
                onMouseLeave={() => setHoveredStars(null)}
                aria-label={`Rate ${star} star`}
                className="group p-1 sm:p-2 transition-transform active:scale-90 hover:scale-110 cursor-pointer focus:outline-none"
              >
                <Star
                  className={`size-8 sm:size-10 transition-colors duration-200 ${
                    isFilled
                      ? 'fill-amber-400 text-amber-400 drop-shadow-[0_2px_8px_rgba(251,191,36,0.45)]'
                      : 'fill-transparent text-neutral-300 group-hover:text-neutral-400'
                  }`}
                />
              </button>
            );
          })}
        </div>

        <p className="text-xs text-neutral-500 font-medium mt-3">
          {selectedStars === 5
            ? '★★★★★ 5.0 / 5.0 — Highly Recommended'
            : selectedStars === 4
              ? '★★★★☆ 4.0 / 5.0 — Very Good'
              : 'Tap a star to set your overall rating'}
        </p>
      </div>

      {/* Low Rating In-House Concierge Routing (If <= 3 stars) */}
      {selectedStars <= 3 && (
        <div className="w-full bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-transparent border border-amber-300 rounded-3xl p-6 sm:p-7 shadow-xs mb-6 text-left">
          <div className="flex items-center gap-2 text-amber-800 font-bold text-sm mb-1.5">
            <HeartHandshake className="size-5 text-amber-600 shrink-0" />
            <span>{t.concierge.title}</span>
          </div>
          <p className="text-xs text-neutral-700 leading-relaxed mb-4">
            {t.concierge.description}
          </p>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
            <a
              href={`tel:${hotel.privateFeedback.conciergePhone.replace(/\s+/g, '')}`}
              className="inline-flex items-center justify-center gap-2 bg-neutral-900 text-white hover:bg-neutral-800 px-4 py-2.5 rounded-full text-xs font-semibold transition-all active:scale-95"
            >
              <Phone className="size-3.5 text-amber-400" />
              <span>{t.concierge.callBtn}</span>
            </a>
            <a
              href={`mailto:${hotel.privateFeedback.conciergeEmail}?subject=Immediate%20Guest%20Assistance`}
              className="inline-flex items-center justify-center gap-2 bg-white border border-neutral-300 hover:bg-neutral-50 text-neutral-900 px-4 py-2.5 rounded-full text-xs font-semibold transition-all active:scale-95"
            >
              <Mail className="size-3.5 text-neutral-500" />
              <span>{t.concierge.emailBtn}</span>
            </a>
          </div>
        </div>
      )}

      {/* Platform Selection Section */}
      <section className="w-full flex flex-col gap-3.5 mb-8">
        <div className="flex items-center justify-between px-1">
          <span className="text-[11px] font-bold tracking-wider uppercase text-neutral-500">
            {t.hero.sectionLabel}
          </span>
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60">
            <ShieldCheck className="size-3 text-emerald-600" />
            <span>Verified Official</span>
          </span>
        </div>

        {liveReviews.platforms.map((platform) => {
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
              onClick={() => handlePlatformClick(platform.id)}
              className="group relative w-full bg-white hover:bg-neutral-50/90 rounded-2xl sm:rounded-3xl p-4 sm:p-5 flex items-center justify-between gap-4 border border-neutral-200/80 shadow-[0_4px_16px_rgba(20,20,19,0.02)] hover:shadow-[0_8px_28px_rgba(20,20,19,0.06)] active:scale-[0.985] transition-all duration-200"
            >
              {/* Left Details */}
              <div className="flex items-center gap-3.5 sm:gap-4 min-w-0">
                <div className="size-12 sm:size-13 rounded-2xl bg-neutral-100 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform p-1.5 border border-neutral-200/60 overflow-hidden">
                  <PlatformIcon id={platform.id} />
                </div>

                <div className="flex flex-col text-left min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm sm:text-base font-semibold tracking-tight text-neutral-900 truncate">
                      {platform.name}
                    </span>
                    {platform.isPrimary && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-800 bg-amber-100/90 px-2 py-0.5 rounded-full">
                        <CheckCircle2 className="size-3 text-amber-600" />
                        <span>{t.hero.recommended}</span>
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

              {/* Action Button Pill */}
              <div className="shrink-0 flex items-center">
                <div className="h-9 sm:h-10 px-4 sm:px-5 rounded-full text-xs font-semibold tracking-tight inline-flex items-center gap-1.5 transition-all bg-neutral-100 text-neutral-900 group-hover:bg-neutral-900 group-hover:text-white">
                  <span>{t.hero.reviewAction}</span>
                  <ArrowUpRight className="size-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            </a>
          );
        })}
      </section>

      {/* 24/7 Concierge Bottom Support Card */}
      <div className="w-full bg-white rounded-3xl p-6 border border-neutral-200/80 shadow-xs text-left">
        <div className="flex items-center gap-2 mb-2">
          <span className="size-2 rounded-full bg-orange-500 animate-pulse" />
          <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-500">
            {t.concierge.tag}
          </span>
        </div>
        <h3 className="text-base font-semibold tracking-tight text-neutral-900">
          {t.concierge.title}
        </h3>
        <p className="text-xs text-neutral-600 mt-1 leading-relaxed">
          {t.concierge.description}
        </p>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 mt-4">
          <a
            href={`tel:${hotel.privateFeedback.conciergePhone.replace(/\s+/g, '')}`}
            className="inline-flex items-center justify-center gap-2 bg-neutral-900 text-white hover:bg-neutral-800 px-4 py-2 rounded-full text-xs font-medium transition-all"
          >
            <Phone className="size-3.5 text-amber-400" />
            <span>{t.concierge.callBtn}</span>
          </a>
          <a
            href={`mailto:${hotel.privateFeedback.conciergeEmail}`}
            className="inline-flex items-center justify-center gap-2 bg-white border border-neutral-300 hover:bg-neutral-50 text-neutral-900 px-4 py-2 rounded-full text-xs font-medium transition-all"
          >
            <Mail className="size-3.5 text-neutral-500" />
            <span>{t.concierge.emailBtn}</span>
          </a>
        </div>
        <div className="flex items-center gap-1.5 mt-3 text-[11px] text-neutral-500">
          <Clock className="size-3 text-orange-500" />
          <span>{t.concierge.hours}</span>
        </div>
      </div>
    </div>
  );
}
