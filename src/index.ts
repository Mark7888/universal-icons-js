export type { IconConfig, IconEntry, ImageFormat, PresetName } from "./types.js";
export { generate, resolveEntries } from "./generator.js";
export { loadConfig } from "./config-loader.js";

// Re-export all presets for programmatic use.
export * as presets from "./presets/index.js";
