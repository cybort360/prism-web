# Prism — Website V2

Marketing site for **Prism**, an iPhone-first payments product: pay people through the
contacts, handles and payment links you already have, while Monad settles underneath. The
site is a single-page React app whose visual and material language matches the Prism mobile
app (deep teal grounds, off-white product cards, jade active states, F5.6 display type).

## What Prism is

- Send and request **dollars** (AUSD) through people, not wallet addresses.
- People are identified by phone number, `@handle`, payment QR, or payment link.
- A **Mera passkey** holds financial authority; **Monad** settles; **Alchemy** provides
  chain access; **Envio** indexes history and proof.
- The website never asks a visitor to think about wallets, gas, or chains.

## Tech

- React 19 + TypeScript, built with Vite 8.
- Tailwind CSS v4 (CSS-first `@theme`, no `tailwind.config.js`).
- `react-router-dom` for a two-route split: `/` (marketing) and `/developers`.
- No UI framework, no animation library — motion is CSS transitions + React state.
- No runtime images: all UI is text, CSS, and inline SVG.

## Development

```bash
npm install
npm run dev        # Vite dev server, http://localhost:5173
```

## Build & checks

```bash
npm run build      # tsc -b && vite build  → dist/
npm run preview    # serve the production build
npm run lint       # prettier --check .
npm run format     # prettier --write .
```

`npm run build` is the gate: it type-checks with `tsc` and produces `dist/`.

## Architecture (final Metropolis / sponsor-native)

```
Phone / @handle
      ↓  Prism resolution
Mera passkey account        ← financial authority (passkey-bound)
      ↓
AUSD                        ← dollar-denominated payment asset (Agora)
      ↓
Monad                       ← settlement
```

- **Alchemy** — live chain access / RPC.
- **Envio** — indexed product history and proof.

The old "Secure Enclave → PrismAccount / your device proves you" story is retired and must
not reappear in public copy.

## Sections

| #    | Section                    | Ground    | Demonstrates                                               |
| ---- | -------------------------- | --------- | ---------------------------------------------------------- |
| Hero | Pay people.                | deep teal | Live send sequence (Contact → Amount → Face ID → Sent)     |
| 01   | People                     | light     | Contact list → live send card                              |
| 02   | Reachability               | pale mint | Phone / handle / QR / link resolving to one identity       |
| 03   | Cross-border               | deep teal | Octane (NG) → Sherggs (UK), AUSD over Monad, no fake FX    |
| 04   | Send before signup         | deep teal | Escrow → claim lifecycle → refund window                   |
| 05   | Request                    | light     | Incoming request state machine (Pay → Authorize → Settled) |
| 06   | Security                   | deep teal | Resolution chain, passkey authority, identity-change check |
| 07   | Infrastructure             | light     | Five providers + collapsible proof surface                 |
| CTA  | Find them. Pay them. Done. | deep teal | Closing call to action + footer                            |

Components live in `src/components/prism/`:
`Nav.tsx`, `Hero.tsx`, `SectionsA.tsx` (01–05), `SectionsB.tsx` (06–07 + CTA + footer),
`primitives.tsx` (shared building blocks), `proof.ts` (typed proof model),
`Developers.tsx` (the `/developers` page).

### Routes

- `/` — the marketing home (hero + sections 01–07 + CTA).
- `/developers` — a dedicated developer page: quickstart, build-on-Prism capabilities, a
  labelled access/status panel, and an access CTA.
- `/docs` — the full product documentation (`Docs.tsx`): 34 sections grouped into a sticky,
  labelled table of contents (Getting started · Product · Protocol · Developers · Security ·
  Proof · Metropolis · Resources), with mono code/diagram blocks and tables. The Resources group
  also links out to the whitepaper and the GitHub repo.
- `/whitepaper` — the Prism v1 whitepaper (`Whitepaper.tsx`): abstract + 31 sections.

`/docs` and `/whitepaper` share a long-form layout kit in `dockit.tsx` (`DocLayout`,
`DocSection`, and prose/code/list/table primitives).

`public/_redirects` provides SPA history fallback for static hosts (e.g. Netlify). On other
hosts, add an equivalent rewrite of all paths to `/index.html`. `vite dev` and `vite preview`
handle the fallback automatically.

## Evidence-mode handling

The proof surface renders a typed `PrismProof` (`src/components/prism/proof.ts`); it does not
hard-code values into markup. The environment field controls how evidence is labelled:

- `environment: "demo"` → a prominent **DEMO DATA** banner and per-field `· demo` suffixes.
- `environment: "testnet"` → values shown as testnet.
- `environment: "mainnet"` → only after verified live evidence.

To wire live data, pass a real `PrismProof` to `ProofPanel` instead of `DEMO_PROOF`. No markup
changes are required. Provider integrations that are not deployed are labelled per row in
section 07 (`Integration target` / `Testnet` / `Demo data`) — the site makes no false live claims.

## Fonts

**F5.6** is the display face. Its binaries are **not** included (not redistributable). The
`@font-face` hook expects `public/fonts/f56.woff2` and `f56.woff`; until those licensed files
are added, the site falls back to Space Grotesk / Inter Tight / system sans. Body text uses
Inter; mono metadata uses IBM Plex Mono / Roboto Mono.

## Brand assets

- `public/prism-mark.png` is the transparent 1024px Prism mark master.
- `public/favicon.ico` and the PNG favicon sizes support browsers and pinned shortcuts.
- `public/apple-touch-icon.png` and `public/site.webmanifest` support mobile home screens.
- `public/og.png` is the 1200 × 630 social preview used by Open Graph and X cards.

## Documentation

- [`DESIGN_SYSTEM.md`](./DESIGN_SYSTEM.md) — exact tokens, type scale, utilities, motion.
- [`WEBSITE_V2_NOTES.md`](./WEBSITE_V2_NOTES.md) — V1→V2 rationale, decisions, known limits.
