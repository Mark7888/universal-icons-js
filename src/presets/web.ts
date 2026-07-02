import type { IconEntry, WebOptions } from "../types.js";

/**
 * Generic web project icons.
 *
 * A broad set of PNG icons and an ICO favicon suitable for any website.
 *
 * @param options - Optional configuration. Pass `{ publicDir }` to override
 *                  the default public assets directory (`"public"`).
 * @see https://web.dev/articles/add-manifest
 */
export function web(options?: WebOptions): IconEntry[] {
  const base = options?.publicDir ?? "public";
  return [
    // Favicons
    { target: `${base}/favicon-16x16.png`, format: "png", widthPx: 16, heightPx: 16 },
    { target: `${base}/favicon-32x32.png`, format: "png", widthPx: 32, heightPx: 32 },
    { target: `${base}/favicon.ico`, format: "ico", widthPx: 48, heightPx: 48 },
    // Apple Touch Icon
    { target: `${base}/apple-touch-icon.png`, format: "png", widthPx: 180, heightPx: 180 },
    // Android Chrome
    { target: `${base}/android-chrome-192x192.png`, format: "png", widthPx: 192, heightPx: 192 },
    { target: `${base}/android-chrome-512x512.png`, format: "png", widthPx: 512, heightPx: 512 },
    // Microsoft tile
    { target: `${base}/mstile-150x150.png`, format: "png", widthPx: 150, heightPx: 150 },
    // Open Graph / social sharing
    { target: `${base}/og-image.png`, format: "png", widthPx: 1200, heightPx: 630 },
  ];
}

