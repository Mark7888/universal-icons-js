import type { IconEntry, ReactNativeWindowsOptions } from "../types.js";

/**
 * React Native Windows app icons.
 *
 * Sizes based on the Windows UWP visual asset guidelines.
 *
 * @param options - Optional configuration. Pass `{ outputDir }` to override
 *                  the default Windows project root (`"windows"`).
 * @see https://docs.microsoft.com/en-us/windows/apps/design/style/iconography/app-icon-design
 */
export function reactNativeWindows(options?: ReactNativeWindowsOptions): IconEntry[] {
  const base = options?.outputDir ?? "windows";
  return [
    // Square tile
    { target: `${base}/AppIcons/Square44x44Logo.png`, format: "png", widthPx: 44, heightPx: 44 },
    { target: `${base}/AppIcons/Square44x44Logo.scale-125.png`, format: "png", widthPx: 55, heightPx: 55 },
    { target: `${base}/AppIcons/Square44x44Logo.scale-150.png`, format: "png", widthPx: 66, heightPx: 66 },
    { target: `${base}/AppIcons/Square44x44Logo.scale-200.png`, format: "png", widthPx: 88, heightPx: 88 },
    { target: `${base}/AppIcons/Square44x44Logo.scale-400.png`, format: "png", widthPx: 176, heightPx: 176 },
    // Medium tile
    { target: `${base}/AppIcons/Square150x150Logo.png`, format: "png", widthPx: 150, heightPx: 150 },
    { target: `${base}/AppIcons/Square150x150Logo.scale-125.png`, format: "png", widthPx: 188, heightPx: 188 },
    { target: `${base}/AppIcons/Square150x150Logo.scale-150.png`, format: "png", widthPx: 225, heightPx: 225 },
    { target: `${base}/AppIcons/Square150x150Logo.scale-200.png`, format: "png", widthPx: 300, heightPx: 300 },
    { target: `${base}/AppIcons/Square150x150Logo.scale-400.png`, format: "png", widthPx: 600, heightPx: 600 },
    // Wide tile
    { target: `${base}/AppIcons/Wide310x150Logo.png`, format: "png", widthPx: 310, heightPx: 150 },
    { target: `${base}/AppIcons/Wide310x150Logo.scale-125.png`, format: "png", widthPx: 388, heightPx: 188 },
    { target: `${base}/AppIcons/Wide310x150Logo.scale-150.png`, format: "png", widthPx: 465, heightPx: 225 },
    { target: `${base}/AppIcons/Wide310x150Logo.scale-200.png`, format: "png", widthPx: 620, heightPx: 300 },
    // Large tile
    { target: `${base}/AppIcons/Square310x310Logo.png`, format: "png", widthPx: 310, heightPx: 310 },
    // Store logo
    { target: `${base}/AppIcons/StoreLogo.png`, format: "png", widthPx: 50, heightPx: 50 },
    { target: `${base}/AppIcons/StoreLogo.scale-125.png`, format: "png", widthPx: 63, heightPx: 63 },
    { target: `${base}/AppIcons/StoreLogo.scale-150.png`, format: "png", widthPx: 75, heightPx: 75 },
    { target: `${base}/AppIcons/StoreLogo.scale-200.png`, format: "png", widthPx: 100, heightPx: 100 },
    { target: `${base}/AppIcons/StoreLogo.scale-400.png`, format: "png", widthPx: 200, heightPx: 200 },
  ];
}

