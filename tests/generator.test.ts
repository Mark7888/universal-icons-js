import { describe, it, expect, beforeAll, afterAll } from "vitest";
import fs from "fs";
import path from "path";
import os from "os";
import sharp from "sharp";
import { generate, resolveEntries } from "../src/generator.js";
import type { IconConfig } from "../src/types.js";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Creates a temporary directory and returns its path. */
function mkTmpDir(): string {
  return fs.mkdtempSync(path.join(os.tmpdir(), "universal-icons-test-"));
}

/** Creates a minimal 64×64 SVG file in `dir` and returns its path. */
function createSvgSource(dir: string): string {
  const svgPath = path.join(dir, "icon.svg");
  fs.writeFileSync(
    svgPath,
    `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64">
  <circle cx="32" cy="32" r="32" fill="#4f46e5"/>
</svg>`,
  );
  return svgPath;
}

/** Creates a minimal 64×64 PNG file in `dir` using sharp and returns its path. */
async function createPngSource(dir: string): Promise<string> {
  const pngPath = path.join(dir, "icon.png");
  await sharp({
    create: { width: 64, height: 64, channels: 4, background: { r: 79, g: 70, b: 229, alpha: 1 } },
  })
    .png()
    .toFile(pngPath);
  return pngPath;
}

/** Removes a directory tree. */
function rmDir(dir: string): void {
  fs.rmSync(dir, { recursive: true, force: true });
}

// ---------------------------------------------------------------------------
// resolveEntries
// ---------------------------------------------------------------------------

describe("resolveEntries", () => {
  it("returns an empty array when config has no presets and no manualList", () => {
    const config: IconConfig = { source: "./icon.svg" };
    expect(resolveEntries(config)).toEqual([]);
  });

  it("expands a preset string into its entries", () => {
    const config: IconConfig = { source: "./icon.svg", presets: ["pwa"] };
    const entries = resolveEntries(config);
    expect(entries.length).toBeGreaterThan(0);
    expect(entries.every((e) => e.format === "png")).toBe(true);
  });

  it("expands a PresetConfig object using default paths", () => {
    const config: IconConfig = {
      source: "./icon.svg",
      presets: [{ name: "pwa" }],
    };
    const entries = resolveEntries(config);
    expect(entries.length).toBeGreaterThan(0);
    expect(entries.every((e) => e.target.startsWith("public/pwa/"))).toBe(true);
  });

  it("uses custom outputDir from a PresetConfig object", () => {
    const config: IconConfig = {
      source: "./icon.svg",
      presets: [{ name: "pwa", outputDir: "assets/pwa-icons" }],
    };
    const entries = resolveEntries(config);
    expect(entries.every((e) => e.target.startsWith("assets/pwa-icons/"))).toBe(true);
  });

  it("uses custom publicDir for vite preset via PresetConfig", () => {
    const config: IconConfig = {
      source: "./icon.svg",
      presets: [{ name: "vite", publicDir: "static" }],
    };
    const entries = resolveEntries(config);
    expect(entries.every((e) => e.target.startsWith("static/"))).toBe(true);
  });

  it("uses custom resourcesDir for electron-vite preset via PresetConfig", () => {
    const config: IconConfig = {
      source: "./icon.svg",
      presets: [{ name: "electron-vite", resourcesDir: "build/res" }],
    };
    const entries = resolveEntries(config);
    expect(entries.every((e) => e.target.startsWith("build/res/"))).toBe(true);
  });

  it("includes manual entries", () => {
    const config: IconConfig = {
      source: "./icon.svg",
      manualList: [
        { target: "./out/icon-192.png", format: "png", widthPx: 192, heightPx: 192 },
      ],
    };
    const entries = resolveEntries(config);
    expect(entries).toHaveLength(1);
    expect(entries[0].widthPx).toBe(192);
  });

  it("merges presets and manualList without duplicates", () => {
    const config: IconConfig = {
      source: "./icon.svg",
      presets: ["pwa"],
      manualList: [
        // Same target as one of the PWA entries – should be deduplicated.
        { target: "public/pwa/icon-192x192.png", format: "png", widthPx: 192, heightPx: 192 },
        { target: "./out/extra-256.png", format: "png", widthPx: 256, heightPx: 256 },
      ],
    };
    const entries = resolveEntries(config);
    const targets = entries.map((e) => e.target);
    // No duplicate targets.
    expect(new Set(targets).size).toBe(targets.length);
    // Extra entry from manualList is included.
    expect(targets).toContain("./out/extra-256.png");
  });

  it("throws on an unknown preset name", () => {
    const config = {
      source: "./icon.svg",
      presets: ["nonexistent-preset"],
    } as unknown as IconConfig;
    expect(() => resolveEntries(config)).toThrowError(/Unknown preset/);
  });
});

// ---------------------------------------------------------------------------
// generate — PNG output
// ---------------------------------------------------------------------------

describe("generate – PNG output", () => {
  let tmpDir: string;
  let svgSource: string;

  beforeAll(() => {
    tmpDir = mkTmpDir();
    svgSource = createSvgSource(tmpDir);
  });

  afterAll(() => {
    rmDir(tmpDir);
  });

  it("generates a PNG icon at the requested size", async () => {
    const outPath = path.join(tmpDir, "out", "icon-96.png");
    const config: IconConfig = {
      source: svgSource,
      manualList: [{ target: outPath, format: "png", widthPx: 96, heightPx: 96 }],
    };

    await generate(config, tmpDir);

    expect(fs.existsSync(outPath)).toBe(true);

    const meta = await sharp(outPath).metadata();
    expect(meta.width).toBe(96);
    expect(meta.height).toBe(96);
    expect(meta.format).toBe("png");
  });

  it("creates intermediate directories automatically", async () => {
    const outPath = path.join(tmpDir, "deep", "nested", "dir", "icon.png");
    const config: IconConfig = {
      source: svgSource,
      manualList: [{ target: outPath, format: "png", widthPx: 32, heightPx: 32 }],
    };

    await generate(config, tmpDir);

    expect(fs.existsSync(outPath)).toBe(true);
  });

  it("generates JPEG output when format is jpg", async () => {
    const outPath = path.join(tmpDir, "icon.jpg");
    const config: IconConfig = {
      source: svgSource,
      manualList: [{ target: outPath, format: "jpg", widthPx: 64, heightPx: 64 }],
    };

    await generate(config, tmpDir);

    const meta = await sharp(outPath).metadata();
    expect(meta.format).toBe("jpeg");
  });

  it("generates WebP output", async () => {
    const outPath = path.join(tmpDir, "icon.webp");
    const config: IconConfig = {
      source: svgSource,
      manualList: [{ target: outPath, format: "webp", widthPx: 64, heightPx: 64 }],
    };

    await generate(config, tmpDir);

    const meta = await sharp(outPath).metadata();
    expect(meta.format).toBe("webp");
  });

  it("generates ICO output", async () => {
    const outPath = path.join(tmpDir, "favicon.ico");
    const config: IconConfig = {
      source: svgSource,
      manualList: [{ target: outPath, format: "ico", widthPx: 48, heightPx: 48 }],
    };

    await generate(config, tmpDir);

    expect(fs.existsSync(outPath)).toBe(true);
    // ICO files start with the 4-byte signature: 00 00 01 00
    const buf = fs.readFileSync(outPath);
    expect(buf[0]).toBe(0x00);
    expect(buf[1]).toBe(0x00);
    expect(buf[2]).toBe(0x01);
    expect(buf[3]).toBe(0x00);
  });
});

// ---------------------------------------------------------------------------
// generate — PNG source
// ---------------------------------------------------------------------------

describe("generate – PNG source image", () => {
  let tmpDir: string;
  let pngSource: string;

  beforeAll(async () => {
    tmpDir = mkTmpDir();
    pngSource = await createPngSource(tmpDir);
  });

  afterAll(() => {
    rmDir(tmpDir);
  });

  it("generates a PNG icon from a PNG source", async () => {
    const outPath = path.join(tmpDir, "out-32.png");
    const config: IconConfig = {
      source: pngSource,
      manualList: [{ target: outPath, format: "png", widthPx: 32, heightPx: 32 }],
    };

    await generate(config, tmpDir);

    const meta = await sharp(outPath).metadata();
    expect(meta.width).toBe(32);
    expect(meta.height).toBe(32);
  });
});

// ---------------------------------------------------------------------------
// generate — error handling
// ---------------------------------------------------------------------------

describe("generate – error handling", () => {
  it("throws when the source image does not exist", async () => {
    const config: IconConfig = {
      source: "/nonexistent/path/icon.svg",
      manualList: [{ target: "/tmp/out.png", format: "png", widthPx: 32, heightPx: 32 }],
    };

    await expect(generate(config)).rejects.toThrowError(/Source image not found/);
  });

  it("warns and returns without error when the entry list is empty", async () => {
    const tmpDir = mkTmpDir();
    const svgSource = createSvgSource(tmpDir);

    const config: IconConfig = { source: svgSource };
    await expect(generate(config, tmpDir)).resolves.not.toThrow();

    rmDir(tmpDir);
  });
});

// ---------------------------------------------------------------------------
// generate — preset expansion
// ---------------------------------------------------------------------------

describe("generate – preset expansion", () => {
  let tmpDir: string;
  let svgSource: string;

  beforeAll(() => {
    tmpDir = mkTmpDir();
    svgSource = createSvgSource(tmpDir);
  });

  afterAll(() => {
    rmDir(tmpDir);
  });

  it("generates all PWA icons from the pwa preset", async () => {
    const config: IconConfig = {
      source: svgSource,
      presets: ["pwa"],
    };

    await generate(config, tmpDir);

    const pwaDir = path.join(tmpDir, "public", "pwa");
    expect(fs.existsSync(pwaDir)).toBe(true);

    const files = fs.readdirSync(pwaDir);
    expect(files.length).toBeGreaterThan(0);
  });
});
