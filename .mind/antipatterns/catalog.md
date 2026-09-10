# Hospitality Review Hub: Anti-Patterns & Architecture Pitfalls

[[MOP|Back to Master Operating Plan]] | [[system-design|System Design]] | [[luxury-design-system|Design System]]

---

## 1. Architectural & Code Anti-Patterns

### Anti-Pattern 1: Hardcoding Review URLs in UI Components
- **The Mistake**: Writing `href="https://maps.app.goo.gl/..."` directly inside JSX button elements.
- **Why It Fails**: When URLs change, UTM tags are updated, or new properties (e.g. Hoi An branch) are added, engineers must refactor and redeploy UI components.
- **Remediation**: Isolate all URLs, badges, and platform metadata in `src/config/hotels.ts` with strict TypeScript schemas.

### Anti-Pattern 2: Unnecessary Client Hydration Overhead
- **The Mistake**: Adding `'use client'` to `app/layout.tsx` or `app/page.tsx` for state or effects.
- **Why It Fails**: Blows up the client JS bundle, blocks initial mobile painting on slow resort networks, and increases First Contentful Paint (FCP).
- **Remediation**: Default to React Server Components (RSC). Only isolate interactive elements (the click telemetry dispatcher and tactile button feedback) in micro-client leaf components.

### Anti-Pattern 3: Blocking Navigation with Async Telemetry
- **The Mistake**: `await fetch('/api/analytics', { ... })` before redirecting the guest.
- **Why It Fails**: If network latency spikes, the user experiences a laggy freeze upon tapping the review button, or if navigation cancels the request, telemetry data is lost.
- **Remediation**: Use non-blocking `navigator.sendBeacon` or fire-and-forget telemetry while allowing native `target="_blank"` anchor navigation.

---

## 2. UI/UX Anti-Patterns

### Anti-Pattern 4: The "Generic SaaS Dashboard" Aesthetic
- **The Mistake**: Building a page with standard light-gray grids, complex navigation headers, metric pills, and cold tech gradients.
- **Why It Fails**: Ruins the boutique luxury immersion of Haviland House and feels impersonal or like a corporate survey.
- **Remediation**: Monolithic luxury palette (obsidian, brushed champagne gold, warm sand, frosted glass, high-end architectural photography, generous spacing).

### Anti-Pattern 5: Aggressive Popups & Signup Demands
- **The Mistake**: Triggering email subscription modals, cookie consent walls, or app-download banners on QR landing.
- **Why It Fails**: Increases bounce rate to >60%. Guests immediately close the tab.
- **Remediation**: Zero-friction landing. The prompt and primary review buttons sit prominently above the fold with zero barriers.

---

## 3. Business & Regulatory Anti-Patterns

### Anti-Pattern 6: Review Gating ("Did you enjoy your stay? Yes -> Google, No -> Form")
- **The Mistake**: Filtering dissatisfied guests away from public platforms.
- **Why It Fails**: Direct violation of **FTC 16 CFR Part 465** ($51,744 fine per violation) and Google Business Profile Review Guidelines (leads to profile suspension).
- **Remediation**: Unconditional access to all public review platforms for all guests, accompanied by a polite private concierge contact option for in-stay assistance.

---
Related: [[system-design]] | [[luxury-design-system]] | [[review-conversion-playbook]]
