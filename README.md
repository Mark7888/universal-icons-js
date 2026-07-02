# universal-icons-js

> **One source image → every icon your project needs.**

`universal-icons-js` is a TypeScript-first CLI tool and Node.js library that
takes a single SVG (or PNG / JPG) and generates all the icon sizes and formats
required by React Native (Android, iOS, Windows, macOS), Vite, Electron, PWA,
and general web projects — in one command.

---

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Quick start](#quick-start)
- [Configuration](#configuration)
  - [Presets](#presets)
  - [Manual list](#manual-list)
  - [Combining presets and manual list](#combining-presets-and-manual-list)
- [Running the generator](#running-the-generator)
- [Programmatic usage](#programmatic-usage)
- [Available presets](#available-presets)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- 🖼  **SVG, PNG, JPG, WebP** source images supported (via [sharp](https://sharp.pixelplumbing.com/))
- ⚡  **Presets** for the most common platforms — zero config required
- 🔧  **Manual list** for any custom size or format you need
- 📦  **ICO output** for classic favicon support
- 💎  **Full TypeScript** — your config file is type-safe
- 🚀  Simple CLI: `npx universal-icons-js` or `npm run icons`

---

## Installation

```bash
npm install --save-dev universal-icons-js
# or
yarn add -D universal-icons-js
# or
pnpm add -D universal-icons-js
```

---

## Quick start

### 1 · Add the script to `package.json`

```json
{
  "scripts": {
    "icons": "universal-icons"
  }
}
```

### 2 · Create `iconConfig.ts` in your project root

```ts
import type { IconConfig } from "universal-icons-js";

const iconConfig: IconConfig = {
  // Path to your source image (SVG recommended for lossless scaling)
  source: "./icon.svg",

  // Built-in presets — use a plain string for defaults, or an object to
  // customise the output directory for that preset.
  presets: [
    "vite",
    "pwa",
    { name: "react-native-android", outputDir: "./android" },
    { name: "react-native-ios",     outputDir: "./ios" },
  ],

  // Optional: add any extra sizes you need on top of the presets
  manualList: [
    {
      target: "./src/assets/splash.png",
      format: "png",
      widthPx: 1242,
      heightPx: 2688,
    },
  ],
};

export default iconConfig;
```

### 3 · Generate

```bash
npm run icons
```

All icon files will be written to the paths specified by the preset(s) and/or
your manual list, relative to the directory containing `iconConfig.ts`.

---

## Configuration

### Presets

The `presets` array accepts one or more built-in presets. Each item can be
either a **plain string** (uses default output paths) or a **config object**
that lets you override the default directory for that preset.

#### Using default paths

```ts
const iconConfig: IconConfig = {
  source: "./icon.svg",
  presets: ["react-native-android", "pwa"],
};
```

#### Overriding default paths

Each preset exposes its own typed options. Pass a `{ name, ...options }`
object to customise where files are written:

```ts
const iconConfig: IconConfig = {
  source: "./icon.svg",
  presets: [
    // Default: writes to android/
    "react-native-android",

    // Custom: Android project lives in a monorepo sub-folder
    { name: "react-native-android", outputDir: "./apps/mobile/android" },

    // Custom: iOS project in a different directory
    { name: "react-native-ios", outputDir: "./apps/mobile/ios" },

    // Custom: Vite app's public folder
    { name: "vite", publicDir: "./apps/web/public" },

    // Custom: PWA icons inside a specific assets folder
    { name: "pwa", outputDir: "./apps/web/src/assets/pwa" },

    // Custom: Electron resources folder
    { name: "electron-vite", resourcesDir: "./apps/desktop/resources" },
  ],
};
```

**Per-preset option keys:**

| Preset | Option | Default |
|--------|--------|---------|
| `react-native-android` | `outputDir` | `"android"` |
| `react-native-ios` | `outputDir` | `"ios"` |
| `react-native-windows` | `outputDir` | `"windows"` |
| `react-native-macos` | `outputDir` | `"macos"` |
| `vite` | `publicDir` | `"public"` |
| `electron-vite` | `resourcesDir` | `"resources"` |
| `pwa` | `outputDir` | `"public/pwa"` |
| `web` | `publicDir` | `"public"` |

### Manual list

Use `manualList` when you need sizes or output paths that no preset covers.

```ts
const iconConfig: IconConfig = {
  source: "./icon.svg",
  manualList: [
    { target: "./dist/icon-192.png", format: "png", widthPx: 192, heightPx: 192 },
    { target: "./dist/icon-512.png", format: "png", widthPx: 512, heightPx: 512 },
    { target: "./public/favicon.ico", format: "ico", widthPx: 48,  heightPx: 48  },
  ],
};
```

**Supported formats:** `png` · `jpg` / `jpeg` · `webp` · `ico`

### Combining presets and manual list

Entries from `presets` are resolved first; entries from `manualList` are
appended afterwards. If the same `target` path appears in both, the duplicate
is silently ignored (preset entry wins).

```ts
const iconConfig: IconConfig = {
  source: "./icon.svg",
  presets: ["vite"],
  manualList: [
    // This adds a non-standard 96×96 icon on top of the Vite preset.
    { target: "./public/icon-96.png", format: "png", widthPx: 96, heightPx: 96 },
  ],
};
```

---

## Running the generator

### Via npm script (recommended)

```bash
npm run icons
```

### Via `npx` without installing

```bash
npx universal-icons-js
```

### Custom config path

```bash
npx universal-icons-js --config ./configs/my-icons.ts
```

---

## Programmatic usage

You can call the generator directly from your own scripts:

```ts
import { generate } from "universal-icons-js";

await generate(
  {
    source: "./icon.svg",
    presets: ["pwa"],
    manualList: [
      { target: "./out/icon-256.png", format: "png", widthPx: 256, heightPx: 256 },
    ],
  },
  // Optional: base directory for resolving relative paths (defaults to cwd)
  __dirname,
);
```

You can also import individual presets for inspection or composition:

```ts
import { presets } from "universal-icons-js";

console.log(presets.pwa);               // IconEntry[]
console.log(presets.reactNativeAndroid);
```

---

## Available presets

| Preset identifier        | Platform / use-case                                       |
| ------------------------ | --------------------------------------------------------- |
| `react-native-android`   | Android launcher icons (mdpi → xxxhdpi) + Play Store icon |
| `react-native-ios`       | iOS / iPadOS app icon set + App Store 1024×1024           |
| `react-native-windows`   | Windows UWP tile & store logo assets                      |
| `react-native-macos`     | macOS `.xcassets` AppIcon set (16 → 1024 px)              |
| `vite`                   | Vite web project favicons, touch icon, OG image           |
| `electron-vite`          | Electron app icons for Windows (ICO), Linux & macOS (PNG) |
| `pwa`                    | Progressive Web App manifest icons (72 → 512 px)          |
| `web`                    | Generic website favicon, touch icon, OG image             |

---

## Contributing

Contributions are welcome! Please read our
[Contributing Guide](./CONTRIBUTING.md) to learn how to add new presets or
improve the project.

---

## License

[MIT](./LICENSE) © Mark Licsauer
