import { describe, it, expect } from "vitest";
import {
  reactNativeAndroid,
  reactNativeIos,
  reactNativeMacos,
  reactNativeWindows,
  vite,
  electronVite,
  pwa,
  web,
} from "../src/presets/index.js";
import type { IconEntry } from "../src/types.js";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function assertValidEntries(entries: IconEntry[], label: string): void {
  expect(entries.length, `${label}: should have at least one entry`).toBeGreaterThan(0);

  for (const entry of entries) {
    expect(entry.target, `${label}: target must be a non-empty string`).toBeTruthy();
    expect(entry.widthPx, `${label}: widthPx must be > 0`).toBeGreaterThan(0);
    expect(entry.heightPx, `${label}: heightPx must be > 0`).toBeGreaterThan(0);
    expect(
      ["png", "jpg", "jpeg", "webp", "ico"],
      `${label}: format "${entry.format}" must be valid`,
    ).toContain(entry.format);
  }
}

function assertNoDuplicateTargets(entries: IconEntry[], label: string): void {
  const targets = entries.map((e) => e.target);
  const unique = new Set(targets);
  expect(
    unique.size,
    `${label}: preset must not have duplicate target paths`,
  ).toBe(targets.length);
}

// ---------------------------------------------------------------------------
// Individual preset shape tests
// ---------------------------------------------------------------------------

describe("react-native-android preset", () => {
  it("has valid entries with no duplicate targets", () => {
    assertValidEntries(reactNativeAndroid, "react-native-android");
    assertNoDuplicateTargets(reactNativeAndroid, "react-native-android");
  });

  it("includes all required mipmap densities", () => {
    const targets = reactNativeAndroid.map((e) => e.target);
    for (const density of ["mipmap-mdpi", "mipmap-hdpi", "mipmap-xhdpi", "mipmap-xxhdpi", "mipmap-xxxhdpi"]) {
      expect(targets.some((t) => t.includes(density))).toBe(true);
    }
  });

  it("includes round icon variants", () => {
    expect(reactNativeAndroid.some((e) => e.target.includes("round"))).toBe(true);
  });

  it("includes a Play Store 512×512 icon", () => {
    expect(
      reactNativeAndroid.some((e) => e.widthPx === 512 && e.heightPx === 512),
    ).toBe(true);
  });
});

describe("react-native-ios preset", () => {
  it("has valid entries with no duplicate targets", () => {
    assertValidEntries(reactNativeIos, "react-native-ios");
    assertNoDuplicateTargets(reactNativeIos, "react-native-ios");
  });

  it("includes the 1024×1024 App Store icon", () => {
    expect(
      reactNativeIos.some((e) => e.widthPx === 1024 && e.heightPx === 1024),
    ).toBe(true);
  });
});

describe("react-native-macos preset", () => {
  it("has valid entries with no duplicate targets", () => {
    assertValidEntries(reactNativeMacos, "react-native-macos");
    assertNoDuplicateTargets(reactNativeMacos, "react-native-macos");
  });

  it("includes 16×16 and 1024×1024 sizes", () => {
    const sizes = reactNativeMacos.map((e) => e.widthPx);
    expect(sizes).toContain(16);
    expect(sizes).toContain(1024);
  });
});

describe("react-native-windows preset", () => {
  it("has valid entries with no duplicate targets", () => {
    assertValidEntries(reactNativeWindows, "react-native-windows");
    assertNoDuplicateTargets(reactNativeWindows, "react-native-windows");
  });

  it("includes StoreLogo entries", () => {
    expect(reactNativeWindows.some((e) => e.target.includes("StoreLogo"))).toBe(true);
  });
});

describe("vite preset", () => {
  it("has valid entries with no duplicate targets", () => {
    assertValidEntries(vite, "vite");
    assertNoDuplicateTargets(vite, "vite");
  });

  it("includes a favicon.ico entry", () => {
    expect(vite.some((e) => e.format === "ico")).toBe(true);
  });

  it("includes an apple-touch-icon at 180×180", () => {
    expect(
      vite.some((e) => e.target.includes("apple-touch-icon") && e.widthPx === 180),
    ).toBe(true);
  });
});

describe("electron-vite preset", () => {
  it("has valid entries with no duplicate targets", () => {
    assertValidEntries(electronVite, "electron-vite");
    assertNoDuplicateTargets(electronVite, "electron-vite");
  });

  it("includes an ICO entry for Windows", () => {
    expect(electronVite.some((e) => e.format === "ico")).toBe(true);
  });

  it("includes a 1024×1024 PNG for macOS", () => {
    expect(
      electronVite.some((e) => e.widthPx === 1024 && e.format === "png"),
    ).toBe(true);
  });
});

describe("pwa preset", () => {
  it("has valid entries with no duplicate targets", () => {
    assertValidEntries(pwa, "pwa");
    assertNoDuplicateTargets(pwa, "pwa");
  });

  it("includes 192×192 and 512×512 entries required by Web App Manifest", () => {
    const sizes = pwa.map((e) => e.widthPx);
    expect(sizes).toContain(192);
    expect(sizes).toContain(512);
  });
});

describe("web preset", () => {
  it("has valid entries with no duplicate targets", () => {
    assertValidEntries(web, "web");
    assertNoDuplicateTargets(web, "web");
  });

  it("includes an ICO entry for favicon", () => {
    expect(web.some((e) => e.format === "ico")).toBe(true);
  });

  it("includes an OG image at 1200×630", () => {
    expect(
      web.some((e) => e.widthPx === 1200 && e.heightPx === 630),
    ).toBe(true);
  });
});
