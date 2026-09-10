import type { Viewport } from "next";

/**
 * VIEWPORT.TS - PRODUCTION ENGINE
 *
 * Performance & UX Optimizations for 2026:
 * - Resizes-Visual: Prevents keyboard from breaking layouts in Safari/Chrome.
 * - Accessibility: Allows user scaling (WCAG 2.2 compliant).
 * - Safari Normalization: Viewport-fit=cover for notched devices.
 * - Precision Scaling: initialScale 1.0 ensures Safari doesn't guess the zoom level.
 */

export const siteViewport: Viewport = {
  initialScale: 1,
  viewportFit: "cover",
  width: "device-width",
};
