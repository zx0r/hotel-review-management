# AGENTS.md — Sujet Marina Hotel Da Nang By Haviland (Review Hub)

This document defines the architectural blueprints, design guidelines, and engineering standards for the **Hotel Review Hub** of **Sujet Marina Hotel Da Nang By Haviland**, deployed on Vercel and optimized for high-conversion guest feedback acquisition via QR code interactions.

---

## 1. Project Overview & Metadata

* **Project Name**: Hotel Review Management Hub (`hotel-review-management`)
* **Hotel Name**: Sujet Marina Hotel Da Nang By Haviland
* **Location / Google Maps**: [https://maps.app.goo.gl/sbSmvLxYWoSuvKKG9](https://maps.app.goo.gl/sbSmvLxYWoSuvKKG9)
* **Official Domain**: [https://havilandhouse.com/sujet-marina-da-nang-hotel-by-haviland-smd](https://havilandhouse.com/sujet-marina-da-nang-hotel-by-haviland-smd)
* **Reviews Hub Domain**: [https://havilandhouse-reviews.vercel.app](https://havilandhouse-reviews.vercel.app)
* **Tags**: `Hotel Review Management`, `Guest Feedback & Review Management`, `Hotel Reputation Management`, `Guest Feedback Platform`, `Hotel Review Hub`

---

## 2. Technology Stack & Environment

Built with a high-performance modern web architecture utilizing **Bun** as the runtime/package manager and **Next.js 16 App Router**.

* **Core Framework**: `next@16.3.4` (React Server Components & App Router)
* **UI Library & Runtime**: `react@19.3.0`, `react-dom@19.3.0`
* **Styling & CSS Engine**: `@tailwindcss/postcss@4.3.3`, `tailwindcss@4.3.3`, `tw-animate-css@1.4.0`
* **Design System / Primitives**: `shadcn@4.21.0`, `radix-ui@1.6.7`, `class-variance-authority@0.7.1`, `cn@0.2.6`
* **Icons**: `lucide-react@1.44.0`
* **Language / Compiler**: `typescript@7.0.2`, `babel-plugin-react-compiler@1.0.0`
* **Linting**: `eslint@9.39.5`, `eslint-config-next@16.3.4`

---

## 3. UI/UX Design System & Principles

To avoid looking like a generic SaaS dashboard, the interface adopts a **Boutique Luxury Hospitality** visual language.

### Design Tokens & Aesthetics

* **Palette**: Monolithic luxury—deep obsidian/navy dark modes paired with warm sand, brushed champagne accents, and crisp frosted glass (`backdrop-blur-md`).
* **Typography**: Clean geometric sans-serif hierarchy emphasizing high readability on mobile viewports.
* **Layout Structure**: Single-column, thumb-friendly mobile-first layout. Generous spacing (`gap-6`, `p-6`) with smooth entry animations using `tw-animate-css`.
* **The "Zero Friction" Rule**: The landing experience must load in under 1 second. The primary review buttons must sit above the fold, featuring high-contrast interactive states and official brand motifs.

---

## 4. Architecture & Code Organization

Designed to scale cleanly to multiple hotel properties down the line while remaining completely serverless and static-export friendly for Vercel.

### Directory Structure Blueprint

```text
src/
├── app/
│   ├── layout.tsx         # Root layout with metadata, fonts, and analytics provider
│   ├── page.tsx           # Dynamic mobile-first review hub landing page
│   ├── globals.css        # Tailwind v4 configuration and custom utility classes
│   └── manifest.ts        # PWA web app manifest for QR code caching
├── components/
│   ├── ui/                # shadcn/ui base primitives (Button, Card, Skeleton, etc.)
│   ├── ReviewCard.tsx     # Reusable platform button with icon and click metrics
│   ├── HeroSection.tsx    # Hotel photography, branding, and welcome greeting
│   └── RatingBanner.tsx   # Social proof and 5-star visual indicator
├── config/
│   └── hotels.ts          # Strongly typed multi-hotel configuration registry
└── lib/
    └── analytics.ts       # Modular event tracking abstraction (Google Analytics / Vercel Web Analytics)

```

### Core Architectural Rules

1. **Centralized Configuration**: All external review URLs, hotel names, imagery assets, and property metadata **must** reside inside typed configuration modules (`src/config/hotels.ts`), completely decoupled from UI components.
2. **Multi-Property Readiness**: Components must accept property context or look up configuration keys dynamically via route parameters or domain matching to support future properties under Haviland House.
3. **External Link Safety**: All platform review buttons must use secure external redirects (`target="_blank"`, `rel="noopener noreferrer"`) ensuring context is preserved while dropping users directly into native app flows or browser portals.

---

## 5. AGENTS / Developer Workflow Instructions

When interacting with or generating code for this repository:

* **Package Management**: Always utilize `bun` (`bun add`, `bun run dev`, `bun pm ls`) for package operations.
* **Styling convention**: Leverage Tailwind v4 utility syntax alongside `shadcn` composition patterns. Avoid hardcoded hex colors where theme variables can be used.
* **Performance First**: Ensure server-side rendering defaults are maintained where possible, minimizing client-side JS bundle overhead for mobile guests scanning physical QR tags.
