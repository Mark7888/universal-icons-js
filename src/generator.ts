import fs from "fs";
import path from "path";
import sharp from "sharp";
import toIco from "to-ico";
import type { IconConfig, IconEntry, PresetName } from "./types.js";
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

/** Map of preset name → list of icon entries. */
const PRESET_MAP: Record<PresetName, IconEntry[]> = {
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

  for (const presetName of config.presets ?? []) {
    const preset = PRESET_MAP[presetName];
    if (!preset) {
      throw new Error(`Unknown preset: "${presetName}"`);
    }
    for (const entry of preset) {
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
