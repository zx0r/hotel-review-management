# Next.js 16 App Router & React 19 Architecture

[[MOP|Back to Master Operating Plan]] | [[system-design|System Design]] | [[tailwind-v4-shadcn|Tailwind v4 & shadcn]]

---

## 1. Stack Foundation & Compiler Optimizations

The project is built on the latest bleeding-edge React ecosystem:
- **Next.js 16.3.4** (App Router, Server Components default, static streaming)
- **React 19.3.0 & React DOM 19.3.0** (New React 19 architecture, asset loading, Actions)
- **Babel Plugin React Compiler 1.0.0** (`babel-plugin-react-compiler` for automatic memoization without manual `useMemo`/`useCallback` boilerplate)
- **Bun 1.3.14** (High-speed package management and script execution)

---

## 2. Server Components (RSC) vs Client Component Boundaries

```text
src/app/page.tsx (RSC - Server Component)
│
├── HeroSection.tsx (RSC - Server-rendered hotel imagery, branding, title)
├── RatingBanner.tsx (RSC / Client micro-interactive star display)
├── PlatformList.tsx (RSC container)
│   └── ReviewCard.tsx ('use client' - Click telemetry dispatch & ripple effects)
├── PrivateFeedbackCard.tsx (RSC - Direct concierge phone/email fallbacks)
└── Footer.tsx (RSC - Haviland House official brand links)
```

### Boundary Rules
1. **Root & Layouts are RSC**: `layout.tsx` and `page.tsx` never contain `'use client'`. They query the typed configuration in `src/config/hotels.ts` synchronously without client runtime cost.
2. **Micro-Client Leaves**: Only `ReviewCard.tsx` contains `'use client'` to listen for `onClick`, dispatch the `platform_click` telemetry event, and provide tactile spring feedback.

---

## 3. Metadata & SEO Blueprint (`src/app/layout.tsx`)

Next.js 16 metadata configuration ensures rich social preview cards when shared via WhatsApp, Zalo, iMessage, or Telegram:

```typescript
import type { Metadata, Viewport } from 'next';

export const viewport: Viewport = {
  themeColor: '#0A0D14',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export const metadata: Metadata = {
  title: 'Sujet Marina Hotel Da Nang | Guest Review Hub',
  description: 'Share your authentic experience at Sujet Marina Hotel Da Nang By Haviland on Google, Booking.com, Agoda, or Tripadvisor.',
  metadataBase: new URL('https://havilandhouse-reviews.vercel.app'),
  openGraph: {
    title: 'Sujet Marina Hotel Da Nang — How Was Your Stay?',
    description: 'Leave a verified guest review on Google, Tripadvisor, Booking.com, or Agoda.',
    url: 'https://havilandhouse-reviews.vercel.app',
    siteName: 'Haviland House Reviews',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=85',
        width: 1200,
        height: 630,
        alt: 'Sujet Marina Hotel Da Nang By Haviland',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};
```

---

## 4. Vercel Deployment & Edge Caching

- **Serverless & Static Friendly**: Static page generation ensures zero cold-start delay when accessed from Vercel Edge CDN nodes.
- **Cache-Control**: Static assets in `/public` and Next.js bundled scripts are served with immutable long-term caching headers (`max-age=31536000, immutable`).

---
Related: [[system-design]] | [[tailwind-v4-shadcn]] | [[catalog|Anti-Patterns Catalog]]
