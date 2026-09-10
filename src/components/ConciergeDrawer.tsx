'use client';

import React, { useState } from 'react';
import { Phone, Mail, Clock, MessageSquareHeart, X, Sparkles } from 'lucide-react';
import type { HotelPrivateFeedback } from '@/config/hotels';
import { trackReviewHubEvent } from '@/lib/analytics';

interface ConciergeDrawerProps {
  feedback: HotelPrivateFeedback;
  hotelId: string;
}

export function ConciergeDrawer({ feedback, hotelId }: ConciergeDrawerProps) {
  const [isOpen, setIsOpen] = useState(false);

  if (!feedback.enabled) return null;

  const handlePhoneClick = () => {
    trackReviewHubEvent('concierge_call_click', { hotelId });
  };

  const handleEmailClick = () => {
    trackReviewHubEvent('concierge_email_click', { hotelId });
  };

  return (
    <>
      {/* Concierge Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[oklch(0.922_0_0)] shadow-xs hover:border-[oklch(0.708_0_0)] text-xs font-semibold text-[oklch(0.145_0_0)] active:scale-95 transition-all"
        aria-label="Need immediate hotel assistance?"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-[oklch(0.56_0.19_38)] animate-pulse" />
        <span>Concierge</span>
      </button>

      {/* Modal / Drawer Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/40 backdrop-blur-sm transition-opacity">
          {/* Backdrop click area */}
          <div
            className="absolute inset-0"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />

          {/* Card Modal Container */}
          <div className="relative z-10 w-full max-w-md bg-white rounded-t-[32px] sm:rounded-[32px] p-6 shadow-2xl border border-[oklch(0.922_0_0)] text-left flex flex-col gap-4 animate-in slide-in-from-bottom-6 duration-300">
            {/* Header with Close */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[oklch(0.955_0.008_75)] flex items-center justify-center">
                  <MessageSquareHeart className="w-4 h-4 text-[oklch(0.56_0.19_38)]" />
                </div>
                <span className="text-xs font-bold tracking-[0.06em] uppercase text-[oklch(0.556_0_0)]">
                  In-House Guest Care
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full bg-[oklch(0.97_0_0)] hover:bg-[oklch(0.922_0_0)] flex items-center justify-center text-[oklch(0.556_0_0)] active:scale-90 transition-transform"
                aria-label="Close concierge modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Title & Copy */}
            <div>
              <h3 className="text-lg font-bold tracking-tight text-[oklch(0.145_0_0)] mb-1.5">
                {feedback.title}
              </h3>
              <p className="text-xs text-[oklch(0.556_0_0)] leading-relaxed">
                {feedback.description}
              </p>
            </div>

            {/* Direct Instant Action Buttons */}
            <div className="flex flex-col gap-2.5 pt-1">
              <a
                href={`tel:${feedback.conciergePhone.replace(/\s+/g, '')}`}
                onClick={handlePhoneClick}
                className="w-full flex items-center justify-center gap-2 bg-[oklch(0.145_0_0)] text-white hover:bg-[oklch(0.205_0_0)] py-3 rounded-full text-xs font-semibold tracking-tight transition-transform active:scale-[0.98]"
              >
                <Phone className="w-3.5 h-3.5 text-[oklch(0.68_0.17_48)]" />
                <span>Call Hotline ({feedback.conciergePhone})</span>
              </a>

              <a
                href={`mailto:${feedback.conciergeEmail}?subject=Guest%20Assistance%20Request%20-%20Room%20Support`}
                onClick={handleEmailClick}
                className="w-full flex items-center justify-center gap-2 bg-[oklch(0.97_0_0)] border border-[oklch(0.922_0_0)] hover:bg-[oklch(0.922_0_0)] text-[oklch(0.145_0_0)] py-3 rounded-full text-xs font-semibold tracking-tight transition-transform active:scale-[0.98]"
              >
                <Mail className="w-3.5 h-3.5 text-[oklch(0.556_0_0)]" />
                <span>Email Management: {feedback.conciergeEmail}</span>
              </a>
            </div>

            {/* Working Hours Badge */}
            <div className="flex items-center justify-center gap-1.5 text-[11px] text-[oklch(0.556_0_0)] pt-1 border-t border-[oklch(0.95_0_0)]">
              <Clock className="w-3 h-3 text-[oklch(0.56_0.19_38)]" />
              <span>{feedback.workingHours}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
