# Tailwind CSS v4, shadcn/ui & Primitive Engineering

[[MOP|Back to Master Operating Plan]] | [[luxury-design-system|Design System]] | [[nextjs16-react19|Next.js 16 Stack]]

---

## 1. Tailwind CSS v4 Engine Configuration

Tailwind CSS v4 replaces `tailwind.config.js` with pure CSS configuration via `@import "tailwindcss";` and `@theme` blocks inside `src/app/globals.css`.

### Theme Token Architecture in v4

```css
@import "tailwindcss";
@plugin "tw-animate-css";

@theme {
  --font-sans: var(--font-sans), system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  --font-serif: var(--font-serif), Georgia, Cambria, "Times New Roman", Times, serif;

  /* Boutique Luxury Color Tokens */
  --color-obsidian-950: #07090E;
  --color-obsidian-900: #0A0D14;
  --color-obsidian-800: #111625;
  --color-obsidian-700: #1B2136;
  
  --color-champagne-500: #D4AF37;
  --color-champagne-400: #E5C158;
  --color-champagne-300: #F3E5AB;
  
  --color-sand-50: #FAF8F5;
  --color-sand-100: #F3EFEA;
  --color-sand-200: #E6DFD5;
  --color-sand-400: #A3A8B8;
  --color-sand-600: #6B7280;

  /* Platform Official Brand Accents */
  --color-platform-google: #4285F4;
  --color-platform-tripadvisor: #34E0A1;
  --color-platform-booking: #003580;
  --color-platform-agoda: #5392F9;
}
```

---

## 2. shadcn/ui & Radix UI Integration

We leverage `@radix-ui/react-slot` and `class-variance-authority` (cva) for atomic, accessible UI primitives:
- `Button` component with customized boutique variants (`luxury-primary`, `luxury-glass`, `luxury-outline`).
- Custom `ReviewCard` primitive built with glassmorphism, responsive hover states, and Radix slot composition.

---

## 3. Custom Glassmorphism & Specular Utility Classes

In `src/app/globals.css`, custom utilities provide tactile depth:

```css
@layer utilities {
  .glass-card {
    background: rgba(17, 22, 37, 0.75);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border: 1px solid rgba(212, 175, 55, 0.18);
    box-shadow: 0 10px 30px -5px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.03);
  }

  .glass-card-hover {
    transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .glass-card-hover:hover {
    transform: translateY(-2px);
    border-color: rgba(212, 175, 55, 0.4);
    box-shadow: 0 16px 36px -4px rgba(0, 0, 0, 0.6), 0 0 20px rgba(212, 175, 55, 0.15);
  }

  .text-gradient-gold {
    background: linear-gradient(135deg, #FFF1D0 0%, #D4AF37 50%, #AA820A 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
}
```

---

## 4. Lucide Icons & Official Brand SVGs

While `lucide-react` provides UI icons (e.g. `Star`, `ExternalLink`, `MessageSquare`, `Phone`, `ShieldCheck`), platform logos (Google, Tripadvisor, Booking.com, Agoda) are rendered using optimized, high-fidelity inline SVGs to maintain crisp geometry and accurate brand vector paths on Retina displays.

---
Related: [[luxury-design-system]] | [[nextjs16-react19]] | [[system-design]]
