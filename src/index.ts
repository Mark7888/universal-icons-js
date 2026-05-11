export type {
  IconConfig,
  IconEntry,
  ImageFormat,
  PresetName,
  PresetConfig,
  ReactNativeAndroidOptions,
  ReactNativeIosOptions,
  ReactNativeWindowsOptions,
  ReactNativeMacosOptions,
  ViteOptions,
  ElectronViteOptions,
  PwaOptions,
  WebOptions,
} from "./types.js";
export { generate, resolveEntries } from "./generator.js";
export { loadConfig } from "./config-loader.js";

// Re-export all preset factory functions for programmatic use.
export * as presets from "./presets/index.js";
