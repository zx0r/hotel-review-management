import React from 'react';
import { Star, ShieldCheck } from 'lucide-react';

interface RatingBannerProps {
  overallRating: number;
  maxRating?: number;
  reviewCount?: number;
  starCount?: number;
  customText?: string;
}

export function RatingBanner({
  overallRating = 4.9,
  maxRating = 5.0,
  reviewCount = 83,
  starCount = 5,
  customText,
}: RatingBannerProps) {
  return (
    <section aria-label="Guest Rating and Social Proof" className="w-full px-4 sm:px-6 mb-8 flex justify-center">
      <div className="w-full max-w-xl bg-[oklch(0.988_0.003_85)] border border-[oklch(0.922_0_0)] rounded-[40px] p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-[0px_8px_30px_0px_rgba(20,20,19,0.04)]">
        {/* Rating Score & 5-Star Cluster */}
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-white border border-[oklch(0.922_0_0)] shadow-sm flex flex-col items-center justify-center shrink-0">
            <span className="text-xl font-bold tracking-tight text-[oklch(0.145_0_0)] leading-none">
              {overallRating.toFixed(1)}
            </span>
            <span className="text-[10px] text-[oklch(0.556_0_0)] font-medium mt-0.5">
              / {maxRating.toFixed(1)}
            </span>
          </div>

          <div className="flex flex-col text-left">
            <div className="flex items-center gap-1 text-[oklch(0.75_0.16_75)] mb-1">
              {[...Array(starCount)].map((_, i) => (
                <Star
                  key={i}
                  className="w-4 h-4 fill-[oklch(0.75_0.16_75)] stroke-[oklch(0.75_0.16_75)]"
                />
              ))}
            </div>
            <p className="text-xs font-medium text-[oklch(0.145_0_0)]">
              Exceptional Guest Satisfaction
            </p>
          </div>
        </div>

        {/* Verified Badge Pill */}
        <div className="inline-flex items-center gap-1.5 bg-white border border-[oklch(0.922_0_0)] px-3.5 py-1.5 rounded-full text-xs font-medium text-[oklch(0.556_0_0)] shadow-xs shrink-0">
          <ShieldCheck className="w-3.5 h-3.5 text-[oklch(0.56_0.19_38)]" />
          <span>{customText || `${overallRating.toFixed(1)} ★ Rated on Google Maps`}</span>
        </div>
      </div>
    </section>
  );
}
