import type { IconEntry } from "../types.js";

/**
 * React Native Android launcher icons.
 *
 * Outputs:
 * - `mipmap-mdpi`    48 × 48
 * - `mipmap-hdpi`    72 × 72
 * - `mipmap-xhdpi`   96 × 96
 * - `mipmap-xxhdpi`  144 × 144
 * - `mipmap-xxxhdpi` 192 × 192
 *
 * Both standard and round variants are included, plus a Play Store
 * high-resolution icon (512 × 512).
 *
 * @see https://developer.android.com/training/multiscreen/screendensities
 */
export const reactNativeAndroid: IconEntry[] = [
  // Standard launcher icons
  {
    target: "android/app/src/main/res/mipmap-mdpi/ic_launcher.png",
    format: "png",
    widthPx: 48,
    heightPx: 48,
  },
  {
    target: "android/app/src/main/res/mipmap-hdpi/ic_launcher.png",
    format: "png",
    widthPx: 72,
    heightPx: 72,
  },
  {
    target: "android/app/src/main/res/mipmap-xhdpi/ic_launcher.png",
    format: "png",
    widthPx: 96,
    heightPx: 96,
  },
  {
    target: "android/app/src/main/res/mipmap-xxhdpi/ic_launcher.png",
    format: "png",
    widthPx: 144,
    heightPx: 144,
  },
  {
    target: "android/app/src/main/res/mipmap-xxxhdpi/ic_launcher.png",
    format: "png",
    widthPx: 192,
    heightPx: 192,
  },
  // Round launcher icons (Android 7.1+)
  {
    target: "android/app/src/main/res/mipmap-mdpi/ic_launcher_round.png",
    format: "png",
    widthPx: 48,
    heightPx: 48,
  },
  {
    target: "android/app/src/main/res/mipmap-hdpi/ic_launcher_round.png",
    format: "png",
    widthPx: 72,
    heightPx: 72,
  },
  {
    target: "android/app/src/main/res/mipmap-xhdpi/ic_launcher_round.png",
    format: "png",
    widthPx: 96,
    heightPx: 96,
  },
  {
    target: "android/app/src/main/res/mipmap-xxhdpi/ic_launcher_round.png",
    format: "png",
    widthPx: 144,
    heightPx: 144,
  },
  {
    target: "android/app/src/main/res/mipmap-xxxhdpi/ic_launcher_round.png",
    format: "png",
    widthPx: 192,
    heightPx: 192,
  },
  // Play Store high-res icon
  {
    target: "android/app/src/main/res/playstore-icon.png",
    format: "png",
    widthPx: 512,
    heightPx: 512,
  },
];
