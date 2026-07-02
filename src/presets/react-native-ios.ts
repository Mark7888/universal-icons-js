import type { IconEntry, ReactNativeIosOptions } from "../types.js";

/**
 * React Native iOS app icons.
 *
 * All sizes required by Xcode's AppIcon asset catalogue and the App Store.
 *
 * @param options - Optional configuration. Pass `{ outputDir }` to override
 *                  the default iOS project root (`"ios"`).
 * @see https://developer.apple.com/design/human-interface-guidelines/app-icons
 */
export function reactNativeIos(options?: ReactNativeIosOptions): IconEntry[] {
  const base = options?.outputDir ?? "ios";
  return [
    // iPhone Notification (iOS 7–)
    { target: `${base}/AppIcon/notification-20@2x.png`, format: "png", widthPx: 40, heightPx: 40 },
    { target: `${base}/AppIcon/notification-20@3x.png`, format: "png", widthPx: 60, heightPx: 60 },
    // iPhone Settings
    { target: `${base}/AppIcon/settings-29@1x.png`, format: "png", widthPx: 29, heightPx: 29 },
    { target: `${base}/AppIcon/settings-29@2x.png`, format: "png", widthPx: 58, heightPx: 58 },
    { target: `${base}/AppIcon/settings-29@3x.png`, format: "png", widthPx: 87, heightPx: 87 },
    // iPhone Spotlight
    { target: `${base}/AppIcon/spotlight-40@2x.png`, format: "png", widthPx: 80, heightPx: 80 },
    { target: `${base}/AppIcon/spotlight-40@3x.png`, format: "png", widthPx: 120, heightPx: 120 },
    // iPhone App
    { target: `${base}/AppIcon/app-60@2x.png`, format: "png", widthPx: 120, heightPx: 120 },
    { target: `${base}/AppIcon/app-60@3x.png`, format: "png", widthPx: 180, heightPx: 180 },
    // iPad Notification
    { target: `${base}/AppIcon/ipad-notification-20@1x.png`, format: "png", widthPx: 20, heightPx: 20 },
    { target: `${base}/AppIcon/ipad-notification-20@2x.png`, format: "png", widthPx: 40, heightPx: 40 },
    // iPad Settings
    { target: `${base}/AppIcon/ipad-settings-29@1x.png`, format: "png", widthPx: 29, heightPx: 29 },
    { target: `${base}/AppIcon/ipad-settings-29@2x.png`, format: "png", widthPx: 58, heightPx: 58 },
    // iPad Spotlight
    { target: `${base}/AppIcon/ipad-spotlight-40@1x.png`, format: "png", widthPx: 40, heightPx: 40 },
    { target: `${base}/AppIcon/ipad-spotlight-40@2x.png`, format: "png", widthPx: 80, heightPx: 80 },
    // iPad App
    { target: `${base}/AppIcon/ipad-app-76@1x.png`, format: "png", widthPx: 76, heightPx: 76 },
    { target: `${base}/AppIcon/ipad-app-76@2x.png`, format: "png", widthPx: 152, heightPx: 152 },
    // iPad Pro App
    { target: `${base}/AppIcon/ipad-pro-83.5@2x.png`, format: "png", widthPx: 167, heightPx: 167 },
    // App Store
    { target: `${base}/AppIcon/app-store-1024.png`, format: "png", widthPx: 1024, heightPx: 1024 },
  ];
}

