import type { IconEntry } from "../types.js";

/**
 * Vite web project favicon/icon assets.
 *
 * Generates the standard set of browser icons that belong in the `public/`
 * folder of a Vite application.
 *
 * @see https://vitejs.dev/guide/assets.html
 */
export const vite: IconEntry[] = [
  // Classic favicon sizes
  { target: "public/favicon-16x16.png", format: "png", widthPx: 16, heightPx: 16 },
  { target: "public/favicon-32x32.png", format: "png", widthPx: 32, heightPx: 32 },
  { target: "public/favicon-48x48.png", format: "png", widthPx: 48, heightPx: 48 },
  // Multi-size ICO bundling 16, 32, and 48 px representations
  { target: "public/favicon.ico", format: "ico", widthPx: 48, heightPx: 48 },
  // Apple Touch Icon
  { target: "public/apple-touch-icon.png", format: "png", widthPx: 180, heightPx: 180 },
  // Android Chrome
  { target: "public/android-chrome-192x192.png", format: "png", widthPx: 192, heightPx: 192 },
  { target: "public/android-chrome-512x512.png", format: "png", widthPx: 512, heightPx: 512 },
  // Open Graph / social sharing
  { target: "public/og-image.png", format: "png", widthPx: 1200, heightPx: 630 },
];
