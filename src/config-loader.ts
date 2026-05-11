import fs from "fs";
import path from "path";
import { createJiti } from "jiti";
import type { IconConfig } from "./types.js";

/** File names searched in order when no explicit path is provided. */
const CONFIG_FILES = [
  "iconConfig.ts",
  "iconConfig.js",
  "iconConfig.mjs",
  "iconConfig.cjs",
];

/**
 * Loads an {@link IconConfig} from a TypeScript or JavaScript file.
 *
 * The file must export the config as the **default** export.  The path can be
 * absolute, relative to `cwd`, or omitted (in which case `iconConfig.ts` /
 * `iconConfig.js` … are searched in the current working directory).
 *
 * @param configPath - Optional explicit path to the config file.
 * @returns The loaded {@link IconConfig} and the directory containing the file.
 */
export async function loadConfig(
  configPath?: string,
): Promise<{ config: IconConfig; configDir: string }> {
  let resolvedPath: string;

  if (configPath) {
    resolvedPath = path.isAbsolute(configPath)
      ? configPath
      : path.resolve(process.cwd(), configPath);
  } else {
    const found = CONFIG_FILES.map((f) =>
      path.resolve(process.cwd(), f),
    ).find((f) => fs.existsSync(f));

    if (!found) {
      throw new Error(
        `Could not find a config file. Searched for: ${CONFIG_FILES.join(", ")}.\n` +
          `Create an "iconConfig.ts" file in your project root.`,
      );
    }
    resolvedPath = found;
  }

  if (!fs.existsSync(resolvedPath)) {
    throw new Error(`Config file not found: "${resolvedPath}"`);
  }

  // Use jiti to support TypeScript config files without requiring a
  // separate compilation step.
  const jiti = createJiti(__filename, { cache: false });
  const mod = await jiti.import(resolvedPath);

  const config =
    (mod as { default?: IconConfig }).default ??
    (mod as IconConfig | undefined);

  if (!config || typeof config !== "object" || typeof (config as IconConfig).source !== "string") {
    throw new Error(
      `Invalid config in "${resolvedPath}". ` +
        `The file must export an object with at least a "source" field as the default export.`,
    );
  }

  return { config: config as IconConfig, configDir: path.dirname(resolvedPath) };
}
