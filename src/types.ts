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
 *   presets: ["react-native-android", "vite"],
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
   * Built-in preset names to expand before merging with `manualList`.
   * Each preset contributes a set of {@link IconEntry} items for that platform.
   */
  presets?: PresetName[];
  /**
   * Explicit list of icon entries to generate.
   * These are merged with any entries coming from `presets`.
   */
  manualList?: IconEntry[];
}
