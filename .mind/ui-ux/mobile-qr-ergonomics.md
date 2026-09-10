# Mobile-First Ergonomics & QR Scan Optimization

[[MOP|Back to Master Operating Plan]] | [[luxury-design-system|Design System]] | [[review-conversion-playbook|Conversion Playbook]]

---

## 1. The QR Mobile Persona & Zero-Friction Rules

When a hotel guest scans a physical QR code with their mobile phone:
- They are often standing at the front desk, packing in their room, or leaving the lobby.
- They have limited patience (under 5 seconds before abandoning).
- Their network may switch between resort Wi-Fi and mobile 4G/5G data.
- They expect a responsive, lightweight page that loads **under 1 second** without signups, cookies popups, or intrusive popovers.

---

## 2. Thumb-Zone Ergonomics & Viewport Sizing

```text
+-----------------------------------+
| [Hero Photo & Hotel Logo]         |  <-- Visual Orientation (Top 25%)
+-----------------------------------+
| "How was your stay?"              |
| ★★★★★ 4.9 (420+ Reviews)          |  <-- Social Proof & Prompt (Center-Top)
+-----------------------------------+
| [ Google Reviews        → ]       |  <-- PRIMARY THUMB ZONE
| [ Tripadvisor           → ]       |  <-- Natural reach of right/left thumb
| [ Booking.com           → ]       |  <-- Touch Target > 56px height
| [ Agoda                 → ]       |  <-- Generous spacing (gap-3.5)
+-----------------------------------+
| Private Concierge & Footer Link   |  <-- Secondary / Issue Escalation
+-----------------------------------+
```

### Ergonomic Targets
1. **Touch Target Dimensions**: Minimum `min-h-[56px]`, full width with `px-5`, `py-4`.
2. **Above the Fold Guarantee**: The Primary Review Button (Google) must be immediately visible without requiring scrolling on standard mobile screens (iPhone SE / iPhone 13 mini up to iPhone 16 Pro Max and standard Android devices).
3. **Safe Inset Margins**: Use `env(safe-area-inset-bottom)` and `pb-8` to prevent overlap with native iOS Home Bar and Android navigation gestures.

---

## 3. Web Vitals & Sub-Second Speed Budget

To guarantee **< 1.0s Largest Contentful Paint (LCP)** on mobile 4G:
- **Zero Heavy Bundles**: No third-party marketing scripts loaded synchronously in the critical path.
- **Image Optimization**: Hero image uses Next.js `<Image priority sizes="(max-width: 640px) 100vw, 480px" />` with WebP/AVIF format and blur placeholder.
- **Font Optimization**: Self-hosted or Google font optimized with `display: 'swap'` and `subsets: ['latin']` to eliminate FOIT (Flash of Invisible Text).
- **Static Pre-rendering**: Page is statically pre-rendered (SSG/ISR) on Vercel CDN Edge so TTFB (Time to First Byte) is < 80ms globally.

---

## 4. PWA Web App Manifest (`src/app/manifest.ts`)

Next.js 16 App Router provides native dynamic manifest generation:

```typescript
import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Sujet Marina Hotel Da Nang | Review Hub',
    short_name: 'Sujet Marina Reviews',
    description: 'Share your guest review for Sujet Marina Hotel Da Nang By Haviland.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0A0D14',
    theme_color: '#0A0D14',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  };
}
```

---
Related: [[luxury-design-system]] | [[nextjs16-react19]] | [[review-conversion-playbook]]
