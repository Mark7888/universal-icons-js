import type { IconEntry } from "../types.js";

/**
 * Progressive Web App (PWA) icons.
 *
 * Generates the full range of icon sizes recommended by the PWA spec and used
 * by `vite-plugin-pwa`, Workbox, and similar tooling.
 *
 * @see https://web.dev/articles/add-manifest#icons
 */
export const pwa: IconEntry[] = [
  { target: "public/pwa/icon-72x72.png", format: "png", widthPx: 72, heightPx: 72 },
  { target: "public/pwa/icon-96x96.png", format: "png", widthPx: 96, heightPx: 96 },
  { target: "public/pwa/icon-128x128.png", format: "png", widthPx: 128, heightPx: 128 },
  { target: "public/pwa/icon-144x144.png", format: "png", widthPx: 144, heightPx: 144 },
  { target: "public/pwa/icon-152x152.png", format: "png", widthPx: 152, heightPx: 152 },
  { target: "public/pwa/icon-192x192.png", format: "png", widthPx: 192, heightPx: 192 },
  { target: "public/pwa/icon-384x384.png", format: "png", widthPx: 384, heightPx: 384 },
  { target: "public/pwa/icon-512x512.png", format: "png", widthPx: 512, heightPx: 512 },
  // Maskable icon (safe-zone padding provided by the source image itself)
  { target: "public/pwa/icon-maskable-192x192.png", format: "png", widthPx: 192, heightPx: 192 },
  { target: "public/pwa/icon-maskable-512x512.png", format: "png", widthPx: 512, heightPx: 512 },
];
