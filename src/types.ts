/**
 * Supported output image formats.
 */
export type ImageFormat = "png" | "jpg" | "jpeg" | "webp" | "ico";

/**
 * A single icon output entry describing what to generate and where to save it.
 */
export interface IconEntry {
  /** Relative or absolute path to the output file. */
  target: string;
  /** Output image format. */
  format: ImageFormat;
  /** Output width in pixels. */
  widthPx: number;
  /** Output height in pixels. */
  heightPx: number;
}

/**
 * Built-in preset identifiers.
 */
export type PresetName =
  | "react-native-android"
  | "react-native-ios"
  | "react-native-windows"
  | "react-native-macos"
  | "vite"
  | "electron-vite"
  | "pwa"
  | "web";

// ---------------------------------------------------------------------------
// Per-preset option types
// ---------------------------------------------------------------------------

/** Options for the {@link PresetName | "react-native-android"} preset. */
export interface ReactNativeAndroidOptions {
  /**
   * Root directory of the Android project, relative to `iconConfig.ts`.
   * @default "android"
   */
  outputDir?: string;
}

/** Options for the {@link PresetName | "react-native-ios"} preset. */
export interface ReactNativeIosOptions {
  /**
   * Root directory of the iOS project, relative to `iconConfig.ts`.
   * @default "ios"
   */
  outputDir?: string;
}

/** Options for the {@link PresetName | "react-native-windows"} preset. */
export interface ReactNativeWindowsOptions {
  /**
   * Root directory of the Windows project, relative to `iconConfig.ts`.
   * @default "windows"
   */
  outputDir?: string;
}

/** Options for the {@link PresetName | "react-native-macos"} preset. */
export interface ReactNativeMacosOptions {
  /**
   * Root directory of the macOS project, relative to `iconConfig.ts`.
   * @default "macos"
   */
  outputDir?: string;
}

/** Options for the {@link PresetName | "vite"} preset. */
export interface ViteOptions {
  /**
   * Public assets directory, relative to `iconConfig.ts`.
   * @default "public"
   */
  publicDir?: string;
}

/** Options for the {@link PresetName | "electron-vite"} preset. */
export interface ElectronViteOptions {
  /**
   * Resources directory, relative to `iconConfig.ts`.
   * @default "resources"
   */
  resourcesDir?: string;
}

/** Options for the {@link PresetName | "pwa"} preset. */
export interface PwaOptions {
  /**
   * Output directory for PWA icons, relative to `iconConfig.ts`.
   * @default "public/pwa"
   */
  outputDir?: string;
}

/** Options for the {@link PresetName | "web"} preset. */
export interface WebOptions {
  /**
   * Public assets directory, relative to `iconConfig.ts`.
   * @default "public"
   */
  publicDir?: string;
}

/**
 * A type-safe preset configuration object.
 *
 * Use this in the `presets` array instead of a bare string when you need to
 * override the default output paths for a preset.
 *
 * @example
 * ```ts
 * presets: [
 *   // plain string → uses all defaults
 *   "vite",
 *   // object → custom Android project location
 *   { name: "react-native-android", outputDir: "./apps/mobile/android" },
 * ]
 * ```
 */
export type PresetConfig =
  | ({ name: "react-native-android" } & ReactNativeAndroidOptions)
  | ({ name: "react-native-ios" } & ReactNativeIosOptions)
  | ({ name: "react-native-windows" } & ReactNativeWindowsOptions)
  | ({ name: "react-native-macos" } & ReactNativeMacosOptions)
  | ({ name: "vite" } & ViteOptions)
  | ({ name: "electron-vite" } & ElectronViteOptions)
  | ({ name: "pwa" } & PwaOptions)
  | ({ name: "web" } & WebOptions);

/**
 * The icon generation configuration.
 *
 * Place this in `iconConfig.ts` (or `iconConfig.js`) at the root of your project.
 *
 * @example
 * ```ts
 * import type { IconConfig } from "universal-icons-js";
 *
 * const iconConfig: IconConfig = {
 *   source: "./icon.svg",
 *   presets: [
 *     "vite",
 *     { name: "react-native-android", outputDir: "./apps/mobile/android" },
 *   ],
 *   manualList: [
 *     { target: "./dist/icon-512.png", format: "png", widthPx: 512, heightPx: 512 },
 *   ],
 * };
 *
 * export default iconConfig;
 * ```
 */
export interface IconConfig {
  /**
   * Path to the source image (SVG, PNG, JPG, or WebP).
   * Relative paths are resolved from the directory containing the config file.
   */
  source: string;
  /**
   * Built-in presets to expand before merging with `manualList`.
   *
   * Each item can be either:
   * - A plain {@link PresetName} string — uses all default output paths.
   * - A {@link PresetConfig} object — allows overriding the default paths for
   *   that specific preset (e.g. a custom Android project directory).
   */
  presets?: Array<PresetName | PresetConfig>;
  /**
   * Explicit list of icon entries to generate.
   * These are merged with any entries coming from `presets`.
   */
  manualList?: IconEntry[];
}

