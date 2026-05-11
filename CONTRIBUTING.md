# Contributing to universal-icons-js

Thank you for your interest in contributing! This guide explains how to set up
the project locally, add a new preset, and open a pull request.

---

## Table of Contents

- [Prerequisites](#prerequisites)
- [Fork & clone](#fork--clone)
- [Install dependencies](#install-dependencies)
- [Project structure](#project-structure)
- [Adding a new preset](#adding-a-new-preset)
- [Running tests](#running-tests)
- [Linting & type-checking](#linting--type-checking)
- [Opening a pull request](#opening-a-pull-request)
- [Setting up npm publishing (maintainers)](#setting-up-npm-publishing-maintainers)

---

## Prerequisites

- **Node.js ≥ 18** (LTS recommended)
- **npm ≥ 9**
- A GitHub account

---

## Fork & clone

1. Click **Fork** on the top-right of the [repository page](https://github.com/Mark7888/universal-icons-js).
2. Clone your fork locally:

   ```bash
   git clone https://github.com/<your-username>/universal-icons-js.git
   cd universal-icons-js
   ```

3. Add the upstream remote so you can pull in future changes:

   ```bash
   git remote add upstream https://github.com/Mark7888/universal-icons-js.git
   ```

---

## Install dependencies

```bash
npm install
```

---

## Project structure

```
src/
  types.ts          — Public TypeScript types (IconConfig, IconEntry, …)
  generator.ts      — Core image generation logic (uses sharp)
  config-loader.ts  — Loads iconConfig.ts at runtime (uses jiti)
  cli.ts            — CLI entry point
  index.ts          — Public library exports
  presets/
    index.ts        — Re-exports all presets
    react-native-android.ts
    react-native-ios.ts
    react-native-windows.ts
    react-native-macos.ts
    vite.ts
    electron-vite.ts
    pwa.ts
    web.ts
tests/
  generator.test.ts — Tests for the core generator
  presets.test.ts   — Tests for preset shape and completeness
```

---

## Adding a new preset

Follow these steps to add a new platform preset:

### 1 · Create the preset file

Create `src/presets/<your-preset-name>.ts`.  
The file must export a named constant of type `IconEntry[]`:

```ts
// src/presets/my-platform.ts
import type { IconEntry } from "../types.js";

export const myPlatform: IconEntry[] = [
  { target: "path/to/icon-48.png", format: "png", widthPx: 48, heightPx: 48 },
  { target: "path/to/icon-96.png", format: "png", widthPx: 96, heightPx: 96 },
  // … add all required sizes
];
```

**Guidelines:**

- Use `png` for all raster icons unless the platform specifically requires
  another format.
- Use `ico` only for Windows / favicon targets.
- Output paths should match the convention expected by the target platform's
  build tooling.
- Include a JSDoc comment with a link to the official icon size reference.

### 2 · Register the preset

Open `src/presets/index.ts` and add an export:

```ts
export { myPlatform } from "./my-platform.js";
```

### 3 · Add the preset name to the union type

Open `src/types.ts` and add your identifier to the `PresetName` union:

```ts
export type PresetName =
  | "react-native-android"
  | "react-native-ios"
  // …
  | "my-platform";   // ← add here
```

### 4 · Register the preset in the generator map

Open `src/generator.ts`.  
Import your preset and add it to `PRESET_MAP`:

```ts
import { myPlatform } from "./presets/index.js";

const PRESET_MAP: Record<PresetName, IconEntry[]> = {
  // …
  "my-platform": myPlatform,
};
```

### 5 · Write tests

Add a `describe` block for your preset in `tests/presets.test.ts` following
the existing pattern.  At minimum, test:

- All entries are valid (non-empty target, positive dimensions, known format).
- No duplicate `target` paths.
- Any platform-specific size or file name requirements.

### 6 · Update the README

Add a row to the **Available presets** table in `README.md`.

---

## Running tests

```bash
npm test
```

Watch mode:

```bash
npm run test:watch
```

---

## Linting & type-checking

```bash
npm run lint        # ESLint
npm run typecheck   # tsc --noEmit
```

---

## Opening a pull request

1. Create a feature branch from `main`:

   ```bash
   git checkout -b feat/my-platform-preset
   ```

2. Make your changes and commit with a descriptive message:

   ```bash
   git commit -m "feat: add my-platform preset"
   ```

3. Push to your fork:

   ```bash
   git push origin feat/my-platform-preset
   ```

4. Open a pull request against `main` on the upstream repository.

5. Make sure the CI checks (ESLint, tsc, tests) all pass — they run
   automatically on every push and pull request.

---

## Setting up npm publishing (maintainers)

The release workflow (`.github/workflows/release.yml`) publishes to npm
automatically when a version tag (e.g. `v1.2.3`) is pushed.

To enable it:

1. **Generate an npm access token**

   - Go to [npmjs.com → Access Tokens](https://www.npmjs.com/settings/tokens).
   - Click **Generate New Token → Granular Access Token** (or *Automation*
     token for a simpler setup).
   - Grant **Read and Write** access to the `universal-icons-js` package.
   - Copy the token.

2. **Add the token as a GitHub secret**

   - Open the repository on GitHub → **Settings → Secrets and variables →
     Actions**.
   - Click **New repository secret**.
   - Name: `NPM_TOKEN`
   - Value: paste the token you copied above.
   - Click **Add secret**.

3. **Create and push a version tag**

   ```bash
   npm version patch   # or minor / major
   git push --follow-tags
   ```

   The release workflow will run, build the package, create a GitHub Release
   with auto-generated release notes, and publish to npm.

> **Tip:** The workflow uses `--provenance` which links the published package
> to this repository, making supply-chain provenance verifiable on npmjs.com.
