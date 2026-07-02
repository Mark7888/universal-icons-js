import type { IconEntry, ViteOptions } from "../types.js";

/**
 * Vite web project favicon/icon assets.
 *
 * Generates the standard set of browser icons that belong in the `public/`
 * folder of a Vite application.
 *
 * @param options - Optional configuration. Pass `{ publicDir }` to override
 *                  the default public assets directory (`"public"`).
 * @see https://vitejs.dev/guide/assets.html
 */
export function vite(options?: ViteOptions): IconEntry[] {
  const base = options?.publicDir ?? "public";
  return [
    // Classic favicon sizes
    { target: `${base}/favicon-16x16.png`, format: "png", widthPx: 16, heightPx: 16 },
    { target: `${base}/favicon-32x32.png`, format: "png", widthPx: 32, heightPx: 32 },
    { target: `${base}/favicon-48x48.png`, format: "png", widthPx: 48, heightPx: 48 },
    // Multi-size ICO bundling 16, 32, and 48 px representations
    { target: `${base}/favicon.ico`, format: "ico", widthPx: 48, heightPx: 48 },
    // Apple Touch Icon
    { target: `${base}/apple-touch-icon.png`, format: "png", widthPx: 180, heightPx: 180 },
    // Android Chrome
    { target: `${base}/android-chrome-192x192.png`, format: "png", widthPx: 192, heightPx: 192 },
    { target: `${base}/android-chrome-512x512.png`, format: "png", widthPx: 512, heightPx: 512 },
    // Open Graph / social sharing
    { target: `${base}/og-image.png`, format: "png", widthPx: 1200, heightPx: 630 },
  ];
}

