# System Architecture & Registry Blueprint

[[MOP|Back to Master Operating Plan]] | [[luxury-design-system|Design System]] | [[analytics-pipeline|Analytics]] | [[nextjs16-react19|Next.js 16 Stack]]

---

## 1. Architectural Mission & Core Principles

The **Hotel Review Hub** is engineered as a high-density, sub-second latency, zero-friction mobile entry portal for luxury hotel properties under **Haviland House**. When a guest scans a physical QR code (in-room nightstand, check-out folio, or concierge counter), the system must deliver instantaneous visual confirmation, social proof, and one-tap routing to the guest's preferred review platform.

### Architectural Tenets
1. **Decoupled Data Architecture**: All hotel properties, review destinations, social proof ratings, branding assets, and UTM schemas are isolated in a typed configuration registry (`src/config/hotels.ts`). UI components remain 100% agnostic of specific hotel data.
2. **Multi-Property Scalability (Multi-Tenant Ready)**: The data model supports arbitrary numbers of hotels across cities (Da Nang, Hoi An, Hue, etc.) selectable via dynamic slug routing, subdomain mapping, or query parameter overrides with graceful fallback to the flagship property (`sujet-marina`).
3. **Zero Hydration Waterfalls (RSC-First)**: Static shell, typography, hero imagery, and layout metadata render purely on the server via React Server Components (RSC). Only the active click-tracking and rating-interaction micro-primitives contain `'use client'`.
4. **Resilient Offline & PWA Caching**: Progressive Web App manifest (`src/app/manifest.ts`) and cache headers ensure instant rendering even over spotty resort Wi-Fi or roaming cellular connections.

---

## 2. Multi-Property Configuration Registry Schema

The central contract resides at `src/config/hotels.ts`. It provides strict TypeScript typings for platforms, social proof stats, contact fallbacks, and visual theming.

```typescript
export type ReviewPlatformId = 'google' | 'booking' | 'agoda' | 'tripadvisor';

export interface ReviewPlatformLink {
  id: ReviewPlatformId;
  name: string;
  badgeLabel?: string;
  ratingScore?: string; // e.g. "4.9 / 5.0" or "9.2 / 10"
  totalReviews?: string; // e.g. "1,240+ reviews"
  directReviewUrl: string;
  accentColor: string;
  textColor: string;
  iconName: string;
  isPrimary?: boolean;
}

export interface HotelSocialProof {
  overallRating: number; // e.g. 4.9
  maxRating: number; // 5
  reviewCount: number; // e.g. 850
  starCount: number; // 5
  headline: string; // e.g. "Rated Excellent by Travelers"
  subheadline: string; // e.g. "Based on verified guest reviews across all platforms"
}

export interface HotelPrivateFeedback {
  enabled: boolean;
  conciergePhone: string;
  conciergeEmail: string;
  managerContactUrl?: string;
}

export interface HotelConfig {
  id: string;
  slug: string;
  name: string;
  subname: string;
  tagline: string;
  location: {
    city: string;
    country: string;
    address: string;
    googleMapsUrl: string;
    placeId?: string;
  };
  branding: {
    officialWebsiteUrl: string;
    logoUrl?: string;
    heroImageUrl: string;
    heroImageAlt: string;
    accentColor: string;
  };
  socialProof: HotelSocialProof;
  platforms: ReviewPlatformLink[];
  privateFeedback: HotelPrivateFeedback;
}

export type HotelRegistry = Record<string, HotelConfig>;
```

---

## 3. Flagship Property Configuration (`sujet-marina`)

```typescript
export const HOTELS: HotelRegistry = {
  'sujet-marina': {
    id: 'sujet-marina',
    slug: 'sujet-marina',
    name: 'Sujet Marina Hotel Da Nang',
    subname: 'By Haviland',
    tagline: 'Boutique Luxury Hospitality on Da Nang Coastline',
    location: {
      city: 'Da Nang',
      country: 'Vietnam',
      address: 'Da Nang, Vietnam',
      googleMapsUrl: 'https://maps.app.goo.gl/sbSmvLxYWoSuvKKG9',
      placeId: 'ChIJsbSmvLxYWoSuvKKG9', // Standardized Place ID
    },
    branding: {
      officialWebsiteUrl: 'https://havilandhouse.com/sujet-marina-da-nang-hotel-by-haviland-smd',
      heroImageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=85',
      heroImageAlt: 'Sujet Marina Hotel Da Nang Luxury Suites and Pool',
      accentColor: '#D4AF37', // Brushed Champagne Gold
    },
    socialProof: {
      overallRating: 4.9,
      maxRating: 5,
      reviewCount: 420,
      starCount: 5,
      headline: 'How was your stay with us?',
      subheadline: 'Your feedback inspires our hospitality. Tap below to share your experience on your preferred platform.',
    },
    platforms: [
      {
        id: 'google',
        name: 'Google Reviews',
        badgeLabel: 'Most Popular',
        ratingScore: '4.9 ★',
        totalReviews: '420+ reviews',
        directReviewUrl: 'https://maps.app.goo.gl/sbSmvLxYWoSuvKKG9',
        accentColor: '#4285F4',
        textColor: '#FFFFFF',
        iconName: 'google',
        isPrimary: true,
      },
      {
        id: 'tripadvisor',
        name: 'Tripadvisor',
        badgeLabel: 'Travelers’ Choice',
        ratingScore: '5.0 ★',
        totalReviews: '180+ reviews',
        directReviewUrl: 'https://www.tripadvisor.com/',
        accentColor: '#34E0A1',
        textColor: '#000000',
        iconName: 'tripadvisor',
      },
      {
        id: 'booking',
        name: 'Booking.com',
        badgeLabel: 'Superb',
        ratingScore: '9.3 / 10',
        totalReviews: '350+ reviews',
        directReviewUrl: 'https://www.booking.com/',
        accentColor: '#003580',
        textColor: '#FFFFFF',
        iconName: 'booking',
      },
      {
        id: 'agoda',
        name: 'Agoda',
        badgeLabel: 'Top Choice',
        ratingScore: '9.2 / 10',
        totalReviews: '290+ reviews',
        directReviewUrl: 'https://www.agoda.com/',
        accentColor: '#5392F9',
        textColor: '#FFFFFF',
        iconName: 'agoda',
      },
    ],
    privateFeedback: {
      enabled: true,
      conciergePhone: '+84 236 3888 999',
      conciergeEmail: 'concierge@havilandhouse.com',
    },
  },
};
```

---

## 4. Multi-Tenant Lookup Strategy

To support multi-property growth without code changes:
1. **Default Route (`/`)**: Evaluates `process.env.NEXT_PUBLIC_DEFAULT_HOTEL_ID ?? 'sujet-marina'`.
2. **Dynamic Slug Route (`/[hotelSlug]`)**: Statically generates routes at build time using `generateStaticParams()` for all keys in `HOTELS`.
3. **Subdomain / Query Param Detection**: Middleware or Page level lookup allows `?property=sujet-marina` or custom DNS routing.

---

## 5. Security & Link Safety Guidelines

* **Tabnabbing Prevention**: All external review links **must** enforce `rel="noopener noreferrer"` and `target="_blank"`.
* **Deep Linking**: Review links target direct write-a-review flows (`writereview?placeid=...` or verified universal app links) allowing mobile OS intent handlers to transition smoothly into native apps (Google Maps, Booking.com app, Tripadvisor app).

---
Related: [[analytics-pipeline]] | [[luxury-design-system]] | [[catalog|Anti-Patterns Catalog]]
