import fs from "fs";
import path from "path";
import sharp from "sharp";
import toIco from "to-ico";
import type {
  IconConfig,
  IconEntry,
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
import {
  reactNativeAndroid,
  reactNativeIos,
  reactNativeMacos,
  reactNativeWindows,
  vite,
  electronVite,
  pwa,
  web,
} from "./presets/index.js";

/** Map of preset name → factory function. */
const PRESET_FACTORIES: {
  "react-native-android": (opts?: ReactNativeAndroidOptions) => IconEntry[];
  "react-native-ios": (opts?: ReactNativeIosOptions) => IconEntry[];
  "react-native-macos": (opts?: ReactNativeMacosOptions) => IconEntry[];
  "react-native-windows": (opts?: ReactNativeWindowsOptions) => IconEntry[];
  vite: (opts?: ViteOptions) => IconEntry[];
  "electron-vite": (opts?: ElectronViteOptions) => IconEntry[];
  pwa: (opts?: PwaOptions) => IconEntry[];
  web: (opts?: WebOptions) => IconEntry[];
} = {
  "react-native-android": reactNativeAndroid,
  "react-native-ios": reactNativeIos,
  "react-native-macos": reactNativeMacos,
  "react-native-windows": reactNativeWindows,
  vite,
  "electron-vite": electronVite,
  pwa,
  web,
};

/**
 * Resolves all presets and manual entries from the config into a single flat
 * list of {@link IconEntry} items, deduplicating by output `target`.
 */
export function resolveEntries(config: IconConfig): IconEntry[] {
  const entries: IconEntry[] = [];
  const seen = new Set<string>();

  const add = (entry: IconEntry) => {
    if (!seen.has(entry.target)) {
      seen.add(entry.target);
      entries.push(entry);
    }
  };

  for (const preset of config.presets ?? []) {
    const name: PresetName =
      typeof preset === "string" ? preset : preset.name;

    const factory = PRESET_FACTORIES[name];
    if (!factory) {
      throw new Error(`Unknown preset: "${name}"`);
    }

    // Destructure `name` out so only the actual options are passed to the factory.
    const opts =
      typeof preset === "string"
        ? undefined
        : (({ name: _n, ...rest }: PresetConfig) => rest)(preset);

    for (const entry of (factory as (opts?: object) => IconEntry[])(opts)) {
      add(entry);
    }
  }

  for (const entry of config.manualList ?? []) {
    add(entry);
  }

  return entries;
}


/**
 * Generates a single icon file from the source image.
 *
 * @param sourcePath - Absolute path to the source image.
 * @param entry      - The {@link IconEntry} describing output dimensions and location.
 * @param basePath   - Directory used to resolve relative `entry.target` paths.
 */
async function generateEntry(
  sourcePath: string,
  entry: IconEntry,
  basePath: string,
): Promise<void> {
  const targetPath = path.isAbsolute(entry.target)
    ? entry.target
    : path.resolve(basePath, entry.target);

  fs.mkdirSync(path.dirname(targetPath), { recursive: true });

  const resized = sharp(sourcePath).resize(entry.widthPx, entry.heightPx, {
    fit: "contain",
    background: { r: 0, g: 0, b: 0, alpha: 0 },
  });

  if (entry.format === "ico") {
    // Build PNG buffers for all standard ICO sizes up to the requested size,
    // then pack them into a single ICO file.
    const icoSizes = [16, 24, 32, 48, 64, 128, 256].filter(
      (s) => s <= entry.widthPx,
    );
    if (icoSizes.length === 0) icoSizes.push(entry.widthPx);

    const pngBuffers = await Promise.all(
      icoSizes.map((s) =>
        sharp(sourcePath)
          .resize(s, s, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
          .png()
          .toBuffer(),
      ),
    );

    const icoBuffer = await toIco(pngBuffers);
    fs.writeFileSync(targetPath, icoBuffer);
    return;
  }

  switch (entry.format) {
    case "png":
      await resized.png().toFile(targetPath);
      break;
    case "jpg":
    case "jpeg":
      await resized.jpeg({ quality: 90 }).toFile(targetPath);
      break;
    case "webp":
      await resized.webp({ quality: 90 }).toFile(targetPath);
      break;
    default: {
      const _exhaustive: never = entry.format;
      throw new Error(`Unsupported format: "${_exhaustive}"`);
    }
  }
}

/**
 * Runs the full icon generation pipeline.
 *
 * Resolves the source path, expands presets + manual list, and writes every
 * output file.  Progress is logged to `stdout`.
 *
 * @param config   - The {@link IconConfig} object.
 * @param basePath - Directory used to resolve the `source` and `target` paths.
 *                   Defaults to `process.cwd()`.
 */
export async function generate(
  config: IconConfig,
  basePath: string = process.cwd(),
): Promise<void> {
  const sourcePath = path.isAbsolute(config.source)
    ? config.source
    : path.resolve(basePath, config.source);

  if (!fs.existsSync(sourcePath)) {
    throw new Error(`Source image not found: "${sourcePath}"`);
  }

  const entries = resolveEntries(config);

  if (entries.length === 0) {
    console.warn("⚠️  No icon entries to generate. Add presets or manualList to your config.");
    return;
  }

  console.log(`🎨 Generating ${entries.length} icon(s) from "${config.source}" …`);

  let done = 0;
  for (const entry of entries) {
    await generateEntry(sourcePath, entry, basePath);
    done++;
    process.stdout.write(`   [${done}/${entries.length}] ${entry.target}\n`);
  }

  console.log(`✅ Done — ${done} icon(s) written.`);
}
