# Analytics & Conversion Telemetry Pipeline

[[MOP|Back to Master Operating Plan]] | [[system-design|System Design]] | [[review-conversion-playbook|Conversion Playbook]]

---

## 1. Overview & Objectives

In a hospitality review hub, real-time attribution and scan-to-click metrics are critical. Hotel operators must know:
1. **Which physical touchpoint drove the scan** (e.g., room nightstand vs. checkout folio vs. restaurant bill vs. WiFi card).
2. **Which review platform guests selected** (Google vs. Tripadvisor vs. Booking vs. Agoda).
3. **Scan-to-action conversion rate** (Drop-off between landing page views and external button clicks).

---

## 2. Pluggable Analytics Abstraction Layer

To avoid tight coupling to any single analytics vendor (Google Analytics 4, Vercel Web Analytics, PostHog, or custom hotel webhook), the hub uses a typed event dispatcher at `src/lib/analytics.ts`.

### Telemetry Interface

```typescript
export type ReviewHubEventType =
  | 'qr_scan_landing'
  | 'platform_click'
  | 'direct_website_click'
  | 'private_feedback_click'
  | 'social_share';

export interface AnalyticsPayload {
  hotelId: string;
  platformId?: string;
  touchpoint?: string; // e.g. "nightstand", "checkout", "wifi_card", "concierge"
  roomNumber?: string;
  source?: string;
  campaign?: string;
  url?: string;
  timestamp: string;
}

export interface AnalyticsAdapter {
  trackEvent: (eventName: ReviewHubEventType, payload: AnalyticsPayload) => void;
}
```

---

## 3. Robust Dispatch Strategy (Beacon + Fallback)

External link clicks can trigger immediate browser navigation. If analytics requests use standard `fetch`, they risk cancellation by the browser when the new tab or app launches.

### Non-blocking Safe Beacon Implementation

```typescript
export function dispatchAnalyticsEvent(
  eventName: ReviewHubEventType,
  payload: Omit<AnalyticsPayload, 'timestamp'>
) {
  const fullPayload: AnalyticsPayload = {
    ...payload,
    timestamp: new Date().toISOString(),
  };

  // 1. Console debugging in development
  if (process.env.NODE_ENV === 'development') {
    console.info(`[Analytics Telemetry] ${eventName}:`, fullPayload);
  }

  // 2. Google Analytics (gtag) dispatch
  if (typeof window !== 'undefined' && typeof (window as any).gtag === 'function') {
    (window as any).gtag('event', eventName, fullPayload);
  }

  // 3. Vercel Web Analytics dispatch
  if (typeof window !== 'undefined' && typeof (window as any).va === 'function') {
    (window as any).va('event', { name: eventName, data: fullPayload });
  }

  // 4. Navigator sendBeacon fallback for persistent ingestion
  const telemetryEndpoint = process.env.NEXT_PUBLIC_TELEMETRY_ENDPOINT;
  if (telemetryEndpoint && typeof navigator !== 'undefined' && navigator.sendBeacon) {
    const blob = new Blob([JSON.stringify({ event: eventName, ...fullPayload })], {
      type: 'application/json',
    });
    navigator.sendBeacon(telemetryEndpoint, blob);
  }
}
```

---

## 4. UTM & Touchpoint Parameter Convention

When generating physical QR codes for Sujet Marina Hotel Da Nang, each print location receives dedicated query parameters:

| Placement | QR URL Pattern | Purpose |
| :--- | :--- | :--- |
| **Checkout Desk Folio** | `https://havilandhouse-reviews.vercel.app/?src=qr&touchpoint=checkout` | Measures immediate post-stay checkout conversion |
| **In-Room Nightstand** | `https://havilandhouse-reviews.vercel.app/?src=qr&touchpoint=nightstand&room=204` | Measures evening/morning relaxed in-room feedback |
| **WiFi Access Card** | `https://havilandhouse-reviews.vercel.app/?src=qr&touchpoint=wifi_card` | Captures guests connecting to network on arrival |
| **Restaurant Bill Presenter** | `https://havilandhouse-reviews.vercel.app/?src=qr&touchpoint=restaurant` | Measures F&B / Dining guest sentiment |
| **Concierge NFC Card** | `https://havilandhouse-reviews.vercel.app/?src=nfc&touchpoint=concierge` | Tracks front desk / concierge assisted reviews |

---

## 5. Architectural Safeguards

- **Zero Blocking**: Telemetry calls must never delay or prevent the guest's browser from opening the external review URL.
- **Privacy First (GDPR / FTC Compliant)**: No PII (Personally Identifiable Information) is logged without explicit guest consent. Only device category, touchpoint tag, and platform selection are recorded.

---
Related: [[system-design]] | [[review-conversion-playbook]] | [[catalog|Anti-Patterns Catalog]]
