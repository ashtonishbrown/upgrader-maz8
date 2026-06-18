# Design Sync Notes

## Repo shape

Plain JavaScript React (no TypeScript) — `componentSrcMap` must enumerate all component src paths explicitly because the converter cannot discover them from `.d.ts` exports. `dtsPropsFor` provides manual prop bodies for every component.

## Build

- Library build: `npm run build:lib` → `vite.lib.config.js` → `dist/index.js` + `dist/index.css`
- `assetsInlineLimit: 999999999` inlines the `mazda2_nobg.png` (367KB PNG → ~490KB base64 in the bundle). Acceptable for a DS preview context.
- CSS is not co-located with components — it's in `src/styles/`. The lib entry (`src/index.js`) imports `src/styles/index.css` to trigger Vite to flatten all three CSS files into `dist/index.css`.
- `cssEntry: "dist/index.css"` — the flattened output, not the @import-only stub.

## Provider

`LanguageToggle` depends on `LanguageProvider` context (`useLang()` crashes without it). Global `cfg.provider.component = "LanguageProvider"` wraps all previews — harmless for other components.

## Font

Rubik loads from Google Fonts via `@import url(...)` in `src/styles/index.css`. Validator reports `[FONT_REMOTE]` (informational, expected).

## Render check

Playwright not installed — render check skipped per user choice. Cards were reviewed visually in a local serve at http://127.0.0.1:52818/.review.html.

## Known render warns

_(none — render check not run)_

## Re-sync risks

- **Inlined PNG** — if `mazda2_nobg.png` changes or a new car image is added, re-run `npm run build:lib` and rebuild. The image is baked into `_ds_bundle.js` as base64.
- **Manual prop definitions** — `dtsPropsFor` entries in config were written by hand from reading source. If a component's props change, update `dtsPropsFor` and rebuild.
- **`componentSrcMap`** — if a new component is added to `src/components/`, add it to `componentSrcMap` AND `src/index.js` AND write a preview in `.design-sync/previews/`.
- **CSS class vocabulary in conventions.md** — verified against `dist/index.css` at sync time. If CSS class names change, re-verify the conventions header.
- **LanguageProvider exclusion** — `componentSrcMap: { "LanguageProvider": null }` keeps it out of the component list. If the export is renamed in `i18n.jsx`, update both this entry and `cfg.provider.component`.
