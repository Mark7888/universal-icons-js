#!/usr/bin/env node
import { loadConfig } from "./config-loader.js";
import { generate } from "./generator.js";

async function main() {
  // Support an optional --config <path> argument.
  const args = process.argv.slice(2);
  let configPath: string | undefined;

  for (let i = 0; i < args.length; i++) {
    if ((args[i] === "--config" || args[i] === "-c") && args[i + 1]) {
      configPath = args[i + 1];
      i++;
    }
  }

  try {
    const { config, configDir } = await loadConfig(configPath);
    await generate(config, configDir);
  } catch (err) {
    console.error("❌", err instanceof Error ? err.message : String(err));
    process.exit(1);
  }
}

main();
