import type { IconEntry } from "../types.js";

/**
 * electron-vite application icons.
 *
 * Covers Windows (ICO), Linux (PNG), and macOS (PNG used as source for ICNS
 * in your build tool config) in the `resources/` directory conventionally
 * used by electron-vite projects.
 *
 * @see https://electron-vite.org/guide/assets
 */
export const electronVite: IconEntry[] = [
  // Windows – ICO embedded with the largest practical size
  { target: "resources/icon.ico", format: "ico", widthPx: 256, heightPx: 256 },
  // Linux – PNG
  { target: "resources/icon.png", format: "png", widthPx: 512, heightPx: 512 },
  { target: "resources/icons/16x16.png", format: "png", widthPx: 16, heightPx: 16 },
  { target: "resources/icons/32x32.png", format: "png", widthPx: 32, heightPx: 32 },
  { target: "resources/icons/48x48.png", format: "png", widthPx: 48, heightPx: 48 },
  { target: "resources/icons/64x64.png", format: "png", widthPx: 64, heightPx: 64 },
  { target: "resources/icons/128x128.png", format: "png", widthPx: 128, heightPx: 128 },
  { target: "resources/icons/256x256.png", format: "png", widthPx: 256, heightPx: 256 },
  { target: "resources/icons/512x512.png", format: "png", widthPx: 512, heightPx: 512 },
  // macOS – high-res PNG (used as input to icns generation by electron-builder)
  { target: "resources/icon-mac.png", format: "png", widthPx: 1024, heightPx: 1024 },
];
