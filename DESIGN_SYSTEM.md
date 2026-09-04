# Prism Website V2 — Design System

All tokens live in `src/styles.css` under `@theme` and `:root`. Tailwind v4 maps each
`--color-*` entry to utilities (`bg-jade`, `text-jade-strong`, `border-line`, …). This file is
the source of truth for exact values.

## Color — brand tokens

| Token                  | Value     | Role                                                 |
| ---------------------- | --------- | ---------------------------------------------------- |
| `--prism-deep`         | `#0B2624` | Deep teal (mid tone of the deep ground gradient)     |
| `--prism-deepest`      | `#071B1A` | Deepest teal (base of deep sections, theme-color)    |
| `--prism-jade`         | `#3FB69A` | Bright jade — rings, dots, fills, focus              |
| `--prism-jade-pressed` | `#1B7A64` | Deep jade — accent **text** on light + pressed fills |
| `--prism-mint`         | `#DDF2EA` | Mint — icon chips                                    |
| `--prism-mint-pale`    | `#EDF8F4` | Pale mint — selected/active washes                   |
| `--canvas`             | `#F7F8F5` | Off-white page background                            |
| `--paper`              | `#FCFCFA` | Card surface                                         |
| `--ink`                | `#111615` | Primary text                                         |
| `--hairline`           | `#D9DFDB` | Hairline rules / borders                             |

> **Contrast note:** `--prism-jade-pressed` was darkened from the original brand `#238A75` to
> `#1B7A64`, and `--muted-foreground` from `#747C78` to `#636A66`, so small text clears WCAG
> AA (4.5:1) on light and mint-pale. Both remain visually near-identical to the originals.

## Color — semantic mapping

| Token                       | Resolves to            | Notes                             |
| --------------------------- | ---------------------- | --------------------------------- |
| `--background`              | `--canvas`             | `body`                            |
| `--foreground`              | `--ink`                | body text                         |
| `--muted`                   | `#ECEFEB`              | neutral surface fill (hover/rest) |
| `--muted-foreground`        | `#636A66`              | muted / secondary text            |
| `--line`                    | `--hairline`           | default border color              |
| `--surface-dark`            | `--prism-deepest`      | deep section base                 |
| `--surface-dark-2`          | `--prism-deep`         | deep section mid tone             |
| `--surface-dark-foreground` | `#E9F4EF`              | warm mint-white text on teal      |
| `--surface-dark-muted`      | `#8FB3AA`              | muted mint text on teal           |
| `--jade`                    | `--prism-jade`         | bright jade                       |
| `--jade-strong`             | `--prism-jade-pressed` | deep jade accent text / pressed   |
| `--jade-foreground`         | `--prism-deepest`      | text on jade fills                |
| `--mint` / `--mint-pale`    | brand mints            | chips / washes                    |
| `--primary`                 | `--ink`                | solid buttons                     |
| `--primary-foreground`      | `--paper`              | solid button text                 |

Approximate distribution: **~65% off-white · ~25% deep teal · ~10% jade/mint.** Accent is used
with discipline; the site is not a green page.

## Typography

| Stack            | Value                                                           | Used for                          |
| ---------------- | --------------------------------------------------------------- | --------------------------------- |
| `--font-display` | `"F5.6", "Space Grotesk", "Inter Tight", system-ui, sans-serif` | wordmark, hero, headings, amounts |
| `--font-sans`    | `"Inter", "Inter Tight", system-ui, sans-serif`                 | body, buttons, product UI         |
| `--font-mono`    | `"IBM Plex Mono", "Roboto Mono", ui-monospace, monospace`       | eyebrows, metadata, receipts      |

- `.display` utility: display stack, weight 700, `line-height: .9`, `letter-spacing: -.035em`,
  `text-transform: uppercase`.
- Hero display scale: 54 → 76 → 104 → 128px (`sm`/`lg`/`xl`); final CTA up to 150px.
- `.mono-label` (Eyebrow): 11px, `letter-spacing: .14em`, uppercase, muted.

## Radius

- Editorial containers: `0–6px` (Tailwind `--radius-*` are all `2–4px`).
- Mobile-product surfaces (`.app-card`): **22px**. Inner status pills: 16–18px.

## Utilities (custom, in `styles.css`)

| Utility                           | Effect                                                                        |
| --------------------------------- | ----------------------------------------------------------------------------- |
| `.shell`                          | Max-width container (1440px; 1600px ≥1728px), responsive inline padding       |
| `.display`                        | F5.6 display type treatment                                                   |
| `.mono-label`                     | Mono eyebrow/label                                                            |
| `.deep`                           | Deep teal ground + subtle top-left radial glow (no blobs, no crypto gradient) |
| `.app-card`                       | `--paper` bg, 22px radius, shadow `0 18px 60px rgba(5,24,22,.08)`             |
| `.app-chip`                       | Mint icon chip, 12px radius, jade-strong icon                                 |
| `.clip-line` / `.clip-line-inner` | Masked headline reveal                                                        |
| `.anim-fade-up` / `.reveal`       | Scroll-in fade/translate                                                      |

Deep sections auto-recolor eyebrows via `.deep .mono-label { color: var(--surface-dark-muted) }`.

## Elevation & rules

- Restrained shadows only on product surfaces (`.app-card`; hero card uses a deeper
  `0 30px 90px -20px rgba(3,18,17,.55)` to lift off teal).
- Editorial structure uses **hard 1px rules** (`--line` on light, `white/12` on deep).

## Motion

- Transitions 180–350ms; easing `--ease-mech: cubic-bezier(0.22,0.61,0.36,1)`.
- Allowed: masked headline reveals, product-state transitions, amount changes, receipt
  expansion, scroll fade-ins.
- Forbidden: floating blobs, particles, infinite bounce, 3D crypto objects, scroll-jacking.
- `prefers-reduced-motion: reduce` disables reveals, freezes animations, and makes every JS
  demo jump straight to its end state.

## Focus & status

- `:focus-visible` → 2px `--jade` outline, 3px offset (visible on every interactive element).
- Status is never conveyed by color alone — every state carries a text label alongside any dot
  or fill (`On Prism`, `Verified`, `Settled`, `Paid`, `DEMO DATA`, …).
