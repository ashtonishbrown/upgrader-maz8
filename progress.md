# Mazda Upgrader — Project Progress

## What this is

Single-page React lead funnel for a Mazda infotainment retrofit business in Malaysia. Qualifies the customer, checks vehicle compatibility, generates a price quote, captures contact details, and routes to WhatsApp.

---

## Accomplished

### Architecture
- React + Vite (JS, no TypeScript)
- `useReducer` state machine — ADVANCE / BACK / SET / EDIT / RESET
- Progressive scroll-reveal layout: completed steps collapse to a summary line, new step animates in below
- No UI library — pure CSS from design tokens
- No i18n library — custom `i18n.jsx` with `useT()` hook and `withChips()` for lime keyword chips
- All business logic in `config.js` — components never hardcode values

### Flow (11 steps, fully wired)

```
entry → services → model → generation → verdict
  ├─ incompatible → contact → success
  ├─ future only  → contact → success
  └─ compatible
       └─ package (wired) → usb → summary → contact → appointment* → success
       └─ package (wireless)    → summary → contact → appointment* → success

* appointment only when: compatible + supported location + wants CarPlay/AA
```

Pricing (package/usb/summary) comes before contact — deliberate UX choice so the customer sees their quote before filling in details.

### Files built

| File | Status |
|------|--------|
| `src/config.js` | Done — SERVICES, VEHICLES, PRICING, STATES, all helper fns |
| `src/i18n.jsx` | Done — EN/BM/ZH; BM+ZH are AI drafts, need native review |
| `src/App.jsx` | Done — state machine, scroll-reveal renderer, back button, lead save |
| `src/styles/tokens.css` | Done |
| `src/styles/global.css` | Done |
| `src/styles/components.css` | Done |
| `src/components/CarStage.jsx` | Done — sticky spinning car + SVG progress ring |
| `src/components/LanguageToggle.jsx` | Done — fixed top-right, persisted to localStorage |
| `src/components/Button.jsx` | Done |
| `src/steps/ServiceInterest.jsx` | Done — multi-select, Coming Soon badges |
| `src/steps/VehicleModel.jsx` | Done — 6 models, auto-advance |
| `src/steps/VehicleGeneration.jsx` | Done — gen cards with photo slot + SVG fallback |
| `src/steps/PackageSelect.jsx` | Done — Wired RM899 / Wireless RM1199, auto-advance |
| `src/steps/UsbConfig.jsx` | Done — wired only; photo slot + SVG fallback |
| `src/steps/PriceSummary.jsx` | Done — line-item card, total in mono |
| `src/steps/ContactDetails.jsx` | Done — name/WhatsApp/email/state; MY phone validation; PDPA |
| `src/steps/AppointmentDetails.jsx` | Done — chip groups, skip link |
| `src/steps/SuccessState.jsx` | Done — 4 variants, WhatsApp CTA, quote recap |
| `src/config.test.js` | Done — pricing unit tests passing |
| `ASSET_PROMPTS.md` | Done — image gen prompts for all 19 placeholder photos |

### UI decisions locked in
- Language: EN / BM / 中文 toggle (top-right, localStorage)
- Back button on every active step (not entry, not success)
- Pricing before contact
- Appointment step skippable ("Skip for now" link)
- Supported locations: KL, Putrajaya, Selangor, Negeri Sembilan

---

## Current state

Codebase is feature-complete. Dev server runs (`npm run dev` in `mazda-upgrader/`). No photos wired yet — all images show SVG fallbacks. No git commits yet (repo init'd, no history).

---

## Next steps (in priority order)

### Blockers before launch

| # | Task | Detail |
|---|------|--------|
| 1 | **Replace WhatsApp number** | `src/config.js` line 1 — `WHATSAPP_NUMBER = '60XXXXXXXXX'` |
| 2 | **Wire a lead delivery sink** | Currently leads only go to `localStorage`. Pick one: Formspree (simplest), Google Sheet via Apps Script, or email. |
| 3 | **Deploy** | Netlify / Vercel / Cloudflare Pages — drag `dist/` or connect repo. Run `npm run build` first. |

### Assets (can do in parallel)

| # | Task | Detail |
|---|------|--------|
| 4 | **Generate / source photos** | 19 PNGs total — see `ASSET_PROMPTS.md` for prompts. Drop into `public/cars/top/`, `public/cars/side/`, `public/usb/`. |
| 5 | **Wire car stage top-views** | One-line change in `src/components/CarStage.jsx` to load `/cars/top/<model>.png` — tell me when photos are ready. |
| 6 | **Wire generation + USB photos** | Set `photo:` fields in `src/config.js` for each gen and USB option — they render automatically. |

### Polish

| # | Task | Detail |
|---|------|--------|
| 7 | **BM / 中文 native review** | All keys in `src/i18n.jsx` bm/zh sections flagged as AI drafts. |
| 8 | **Summary edit-links** | `EDIT` action is wired in the reducer but no UI — clicking a completed step summary could reopen it. |
| 9 | **First git commit** | Repo is init'd but has zero commits. `git add -A && git commit -m "..."` |
| 10 | **OG / meta tags** | `index.html` needs title, description, og:image for link previews. |

---

## Photo count summary

| Group | Count | Folder |
|-------|-------|--------|
| Car stage top-down (spins with ring) | 7 | `public/cars/top/` |
| Generation side cards | 10 | `public/cars/side/` |
| USB product shots | 2 | `public/usb/` |
| **Total** | **19** | |

Full prompts in `ASSET_PROMPTS.md`.
