# Luxury Hospitality Design System & Aesthetic Principles

[[MOP|Back to Master Operating Plan]] | [[mobile-qr-ergonomics|Mobile Ergonomics]] | [[tailwind-v4-shadcn|Tailwind v4 & shadcn]]

---

## 1. Aesthetic Mandate: Anti-SaaS Boutique Luxury

The biggest design failure for hospitality platforms is looking like a generic B2B SaaS dashboard (cold gray cards, electric purple gradients, dense tables, data-dense metric chips). 

**Sujet Marina Hotel Da Nang By Haviland** demands a **Monolithic Boutique Luxury** visual identity:
- **Atmosphere**: Warm, welcoming, tactile, and whisper-quiet sophistication.
- **Sensory cues**: Deep obsidian/slate foundations, warm sand undertones, brushed champagne gold borders, frosted glass translucency, and rich architectural photography.
- **Hierarchy**: High visual restraint—focused entirely on welcoming the guest, highlighting 5-star social proof, and rendering prominent, high-contrast platform review cards.

---

## 2. Design Tokens & Color Palette

### The Boutique Palette

| Token Name | Value (Tailwind / OKLCH) | Semantic Usage |
| :--- | :--- | :--- |
| `--color-obsidian` | `#0A0D14` / `oklch(0.12 0.02 260)` | Primary dark canvas background |
| `--color-slate-surface` | `#111625` / `oklch(0.16 0.025 260)` | Card base surfaces, elevated containers |
| `--color-champagne` | `#D4AF37` / `oklch(0.76 0.14 85)` | Primary luxury accent, stars, active highlights |
| `--color-champagne-light` | `#F3E5AB` / `oklch(0.92 0.06 88)` | Subtle badge highlights, specular rims |
| `--color-sand` | `#F7F5F0` / `oklch(0.97 0.01 90)` | Primary high-contrast text on dark backgrounds |
| `--color-sand-muted` | `#A3A8B8` / `oklch(0.72 0.02 260)` | Secondary descriptions, subheadlines, review counts |
| `--color-gold-border` | `rgba(212, 175, 55, 0.22)` | Subtle frosted glass border outline |

---

## 3. Typography & Hierarchy

- **Header / Brand Display**: Clean, elegant geometric sans-serif or refined transitional serif (`Plus Jakarta Sans` / `Playfair Display` / `Inter`).
- **Scale Hierarchy**:
  - **Hotel Brand Title**: `text-xs tracking-[0.25em] uppercase text-champagne font-semibold`
  - **Main Headline**: `text-2xl sm:text-3xl font-bold tracking-tight text-sand` ("How was your stay?")
  - **Subheadline / Greeting**: `text-sm sm:text-base text-sand-muted leading-relaxed`
  - **Social Proof Score**: `text-3xl font-extrabold text-sand` with `text-champagne` 5-star cluster
  - **Platform CTA Button**: `text-base font-semibold text-white` with `text-xs text-sand-muted` metadata

---

## 4. Platform Brand Badging & Tactile Elevation

Each platform review card must honor the official brand motif while seamlessly integrating into the luxury dark container:

1. **Google Reviews**:
   - Icon: Multi-color Google G / Official Google Logo
   - Accent: Google Royal Blue badge / subtle glow `#4285F4`
   - Label: *"Rated 4.9 ★ by 420+ guests on Google Maps"*
2. **Tripadvisor**:
   - Icon: Official Tripadvisor Owls / Green accent `#34E0A1`
   - Label: *"Travelers’ Choice Award — 5.0 ★"*
3. **Booking.com**:
   - Icon: Booking.com Deep Navy / Bright White monogram `#003580`
   - Label: *"Superb 9.3 / 10 Verified Guest Score"*
4. **Agoda**:
   - Icon: Agoda Five-Color dots / vibrant cyan-blue `#5392F9`
   - Label: *"Top Rated Resort Stay — 9.2 / 10"*

---

## 5. Micro-Interactions & Motion Choreography

- **Page Entry**: Staggered fade-in-up animation (`tw-animate-css` / CSS keyframes) with 80ms interval between hero, social proof banner, and platform buttons.
- **Card Hover & Active States**:
  - Hover: Subtle +2px Y-translation, gold border opacity transition from `0.2` to `0.5`, subtle frosted gold ambient glow `shadow-[0_12px_32px_rgba(212,175,55,0.12)]`.
  - Active / Tap: `scale-[0.98]` tactile spring physics for instant tactile feedback on touchscreens.
- **Star Shimmer**: Subtle ambient shimmer on the 5-star rating cluster.

---
Related: [[mobile-qr-ergonomics]] | [[tailwind-v4-shadcn]] | [[catalog|Anti-Patterns Catalog]]
