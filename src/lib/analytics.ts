export type ReviewHubEventType =
  | 'qr_scan_landing'
  | 'platform_click'
  | 'direct_website_click'
  | 'concierge_call_click'
  | 'concierge_email_click'
  | 'star_rating_select'
  | 'concierge_message_click'
  | 'floating_widget_contact_click'
  | 'floating_widget_zalo_click'
  | 'floating_widget_phone_click'
  | 'floating_widget_toggle';

export interface AnalyticsPayload {
  hotelId?: string;
  platformId?: string;
  touchpoint?: string;
  roomNumber?: string;
  source?: string;
  timestamp?: string;
  preSelectedRating?: number;
  number?: string;
  [key: string]: any;
}

export function trackReviewHubEvent(
  eventName: ReviewHubEventType,
  payload: AnalyticsPayload
) {
  const data = {
    ...payload,
    timestamp: new Date().toISOString(),
  };

  if (process.env.NODE_ENV === 'development') {
    console.info(`[Review Hub Telemetry] ${eventName}`, data);
  }

  // Google Analytics 4 integration
  if (typeof window !== 'undefined' && typeof (window as any).gtag === 'function') {
    (window as any).gtag('event', eventName, data);
  }

  // Vercel Web Analytics integration
  if (typeof window !== 'undefined' && typeof (window as any).va === 'function') {
    (window as any).va('event', { name: eventName, data });
  }

  // Non-blocking Beacon API fallback
  const endpoint = process.env.NEXT_PUBLIC_TELEMETRY_ENDPOINT;
  if (endpoint && typeof navigator !== 'undefined' && navigator.sendBeacon) {
    try {
      const blob = new Blob([JSON.stringify({ event: eventName, ...data })], {
        type: 'application/json',
      });
      navigator.sendBeacon(endpoint, blob);
    } catch {
      // Ignore beacon failures silently to never block UI
    }
  }
}
