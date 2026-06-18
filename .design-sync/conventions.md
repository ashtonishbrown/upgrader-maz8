# Mazda Upgrader Design System

Dark-canvas-first React component library for a Mazda upgrade booking flow. Components are styled immediately — no setup needed except for LanguageToggle (see below).

## Wrapping and setup

All components work standalone **except LanguageToggle**, which reads from `LanguageProvider` context. Wrap any tree containing LanguageToggle:

```jsx
import { LanguageProvider, LanguageToggle } from 'mazda-upgrader';

<LanguageProvider>
  <LanguageToggle />
</LanguageProvider>
```

Without it `useLang()` returns null and LanguageToggle crashes. All other components (Button, TextInput, ProgressBar, SelectionCard, StepLayout, CarStage) need no wrapper.

## Styling idiom

This DS uses **BEM-style CSS classes**. Do not use Tailwind or arbitrary inline styles for DS-controlled elements — use the vocabulary below. Inline styles are fine for layout glue between components (gap, width, margin).

**Typography** — apply these to your own headings and body text:

| Class | Size / Weight |
|---|---|
| `.t-heading-lg` | 30px / 500 |
| `.t-heading-md` | 24px / 500 |
| `.t-heading-sm` | 20px / 600 |
| `.t-body-ui` | 16px / 500 |
| `.t-caption` | 14px / 400 |
| `.t-price` | Monaco mono — prices and numbers |

**Surface cards** (dark canvas):
- `.card-dark` — ink-deep background, violet border, xxl radius, xl padding
- `.card-light` — white background, cloud border, shadow, xl radius

**Badges and chips**:
- `.badge-popular` — lime uppercase pill (Most Popular)
- `.badge-soon` — violet rounded pill (Coming Soon)
- `.chip-lime` — inline lime highlight for keyword emphasis

**Design tokens** — reference via `var(--*)` in your own CSS:
- Colors: `--color-primary` (near-black), `--color-accent-lime` (#c2ef4e), `--color-accent-violet`, `--color-soul-red` (#C41230), `--color-whatsapp` (#25d366)
- Spacing: `--space-xs` 4px → `--space-xxl` 32px (base unit 8px)
- Radius: `--rounded-sm` 6px → `--rounded-full` 9999px
- Font: `--font-ui` (Rubik, system-ui), `--font-mono` (Monaco, Menlo)

## Where the truth lives

All styles are in `_ds_bundle.css` (imported by `styles.css`). Read it for the complete class vocabulary before styling. Per-component props are in each component's `.d.ts`.

## Idiomatic example

```jsx
import { StepLayout, Button, SelectionCard } from 'mazda-upgrader';

// Typical dark-canvas selection step
<StepLayout canvas="dark" progress={0.4} onBack={handleBack}>
  <h2 className="t-heading-md">Which Mazda do you drive?</h2>
  <p className="t-caption" style={{ color: 'var(--color-on-dark-muted)' }}>
    Tap your model.
  </p>
  <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
    <SelectionCard selected onClick={() => handleSelect('cx5')}>CX-5</SelectionCard>
    <SelectionCard onClick={() => handleSelect('mazda3')}>Mazda 3</SelectionCard>
  </div>
  <Button variant="primary" full>Continue</Button>
</StepLayout>
```
