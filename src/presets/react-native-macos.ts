import type { IconEntry } from "../types.js";

/**
 * React Native macOS app icons.
 *
 * Sizes required by macOS / Xcode AppIcon asset catalogue.
 *
 * @see https://developer.apple.com/design/human-interface-guidelines/app-icons#macOS
 */
export const reactNativeMacos: IconEntry[] = [
  { target: "macos/AppIcon/icon_16x16.png", format: "png", widthPx: 16, heightPx: 16 },
  { target: "macos/AppIcon/icon_16x16@2x.png", format: "png", widthPx: 32, heightPx: 32 },
  { target: "macos/AppIcon/icon_32x32.png", format: "png", widthPx: 32, heightPx: 32 },
  { target: "macos/AppIcon/icon_32x32@2x.png", format: "png", widthPx: 64, heightPx: 64 },
  { target: "macos/AppIcon/icon_128x128.png", format: "png", widthPx: 128, heightPx: 128 },
  { target: "macos/AppIcon/icon_128x128@2x.png", format: "png", widthPx: 256, heightPx: 256 },
  { target: "macos/AppIcon/icon_256x256.png", format: "png", widthPx: 256, heightPx: 256 },
  { target: "macos/AppIcon/icon_256x256@2x.png", format: "png", widthPx: 512, heightPx: 512 },
  { target: "macos/AppIcon/icon_512x512.png", format: "png", widthPx: 512, heightPx: 512 },
  { target: "macos/AppIcon/icon_512x512@2x.png", format: "png", widthPx: 1024, heightPx: 1024 },
];
