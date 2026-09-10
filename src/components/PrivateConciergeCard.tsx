'use client';

import React from 'react';
import { Phone, Mail, Clock } from 'lucide-react';
import type { HotelPrivateFeedback } from '@/config/hotels';
import { trackReviewHubEvent } from '@/lib/analytics';
import { useLanguage } from '@/lib/LanguageContext';

interface PrivateConciergeCardProps {
  feedback: HotelPrivateFeedback;
  hotelId: string;
}

export function PrivateConciergeCard({ feedback, hotelId }: PrivateConciergeCardProps) {
  const { t } = useLanguage();
  if (!feedback.enabled) return null;

  const handlePhoneClick = () => {
    trackReviewHubEvent('concierge_call_click', { hotelId });
  };

  const handleEmailClick = () => {
    trackReviewHubEvent('concierge_email_click', { hotelId });
  };

  return (
    <section aria-label="Direct Concierge Support" className="w-full">
      <div className="w-full bg-white rounded-[28px] sm:rounded-[36px] p-6 sm:p-7 shadow-[0px_4px_24px_0px_rgba(20,20,19,0.03)] text-left relative overflow-hidden border border-neutral-100">
        {/* Eyebrow label with Signal Orange Dot */}
        <div className="flex items-center gap-2 mb-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#EA580C] animate-pulse" />
          <span className="text-[11px] font-bold tracking-[0.04em] uppercase text-neutral-500">
            {t.concierge.tag}
          </span>
        </div>

        <h3 className="text-base sm:text-lg font-semibold tracking-tight text-neutral-900 mb-1.5">
          {t.concierge.title}
        </h3>

        <p className="text-xs text-neutral-600 leading-relaxed mb-4">
          {t.concierge.description}
        </p>

        {/* Action Buttons: 20px Ink Pill and Outlined Pill */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
          <a
            href={`tel:${feedback.conciergePhone.replace(/\s+/g, '')}`}
            onClick={handlePhoneClick}
            className="inline-flex items-center justify-center gap-2 bg-neutral-900 text-white hover:bg-neutral-800 px-5 py-2.5 rounded-[20px] text-xs font-medium tracking-tight transition-all active:scale-[0.98]"
          >
            <Phone className="w-3.5 h-3.5 text-[#F97316]" />
            <span>{t.concierge.callBtn}</span>
          </a>

          <a
            href={`mailto:${feedback.conciergeEmail}?subject=Guest%20Assistance%20Request`}
            onClick={handleEmailClick}
            className="inline-flex items-center justify-center gap-2 bg-white border border-neutral-200 hover:bg-neutral-50 text-neutral-900 px-5 py-2.5 rounded-[20px] text-xs font-medium tracking-tight transition-all active:scale-[0.98]"
          >
            <Mail className="w-3.5 h-3.5 text-neutral-500" />
            <span>{t.concierge.emailBtn}</span>
          </a>
        </div>

        {/* Working Hours Footnote */}
        <div className="flex items-center gap-1.5 mt-3 text-[11px] text-neutral-500">
          <Clock className="w-3 h-3 text-[#EA580C]" />
          <span>{t.concierge.hours}</span>
        </div>
      </div>
    </section>
  );
}
