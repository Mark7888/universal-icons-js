import type { IconEntry, ElectronViteOptions } from "../types.js";

/**
 * electron-vite application icons.
 *
 * Covers Windows (ICO), Linux (PNG), and macOS (PNG used as source for ICNS
 * in your build tool config) in the `resources/` directory conventionally
 * used by electron-vite projects.
 *
 * @param options - Optional configuration. Pass `{ resourcesDir }` to override
 *                  the default resources directory (`"resources"`).
 * @see https://electron-vite.org/guide/assets
 */
export function electronVite(options?: ElectronViteOptions): IconEntry[] {
  const base = options?.resourcesDir ?? "resources";
  return [
    // Windows – ICO embedded with the largest practical size
    { target: `${base}/icon.ico`, format: "ico", widthPx: 256, heightPx: 256 },
    // Linux – PNG
    { target: `${base}/icon.png`, format: "png", widthPx: 512, heightPx: 512 },
    { target: `${base}/icons/16x16.png`, format: "png", widthPx: 16, heightPx: 16 },
    { target: `${base}/icons/32x32.png`, format: "png", widthPx: 32, heightPx: 32 },
    { target: `${base}/icons/48x48.png`, format: "png", widthPx: 48, heightPx: 48 },
    { target: `${base}/icons/64x64.png`, format: "png", widthPx: 64, heightPx: 64 },
    { target: `${base}/icons/128x128.png`, format: "png", widthPx: 128, heightPx: 128 },
    { target: `${base}/icons/256x256.png`, format: "png", widthPx: 256, heightPx: 256 },
    { target: `${base}/icons/512x512.png`, format: "png", widthPx: 512, heightPx: 512 },
    // macOS – high-res PNG (used as input to icns generation by electron-builder)
    { target: `${base}/icon-mac.png`, format: "png", widthPx: 1024, heightPx: 1024 },
  ];
}

