import type { IconEntry } from "../types.js";

/**
 * Generic web project icons.
 *
 * A broad set of PNG icons and an ICO favicon suitable for any website.
 *
 * @see https://web.dev/articles/add-manifest
 */
export const web: IconEntry[] = [
  // Favicons
  { target: "public/favicon-16x16.png", format: "png", widthPx: 16, heightPx: 16 },
  { target: "public/favicon-32x32.png", format: "png", widthPx: 32, heightPx: 32 },
  { target: "public/favicon.ico", format: "ico", widthPx: 48, heightPx: 48 },
  // Apple Touch Icon
  { target: "public/apple-touch-icon.png", format: "png", widthPx: 180, heightPx: 180 },
  // Android Chrome
  { target: "public/android-chrome-192x192.png", format: "png", widthPx: 192, heightPx: 192 },
  { target: "public/android-chrome-512x512.png", format: "png", widthPx: 512, heightPx: 512 },
  // Microsoft tile
  { target: "public/mstile-150x150.png", format: "png", widthPx: 150, heightPx: 150 },
  // Open Graph / social sharing
  { target: "public/og-image.png", format: "png", widthPx: 1200, heightPx: 630 },
];
