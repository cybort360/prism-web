# Prism Website V2 — Notes

## Why V2

V1 was a beige/black editorial exercise with a mineral blue/violet accent. It read as
disconnected from the mobile app and used none of Prism's jade/mint/teal identity. V2 keeps the
editorial structure (asymmetry, whitespace, grid tension, hard rules, clipped type) but rebuilds
the material system to match the app: deep teal grounds, off-white product cards, jade active
states, mint surfaces, F5.6 display type.

If the site ever looks like "beige V1 with green buttons," the redesign has failed.

## Key decisions

- **Deep teal is the website's editorial voice.** The mobile app is entirely light; the site
  uses deep teal (`.deep`) for the hero, cross-border, send-before-signup, security, and the
  closing CTA, with light off-white content between. Product cards embedded on teal are light —
  they are the bridge that makes the site read as the same company as the app.
- **Two-tone jade.** Bright `#3FB69A` for rings/dots/fills/focus; deep `#1B7A64` for accent
  text on light (legibility). Text on jade fills is deepest teal.
- **Selected/active states use a mint-pale wash + jade dot**, mirroring the app's lists.
- **Nav is `position: fixed`** so deep teal fills under it. Its dark/light treatment is decided
  by scanning `.deep` elements under the nav line (~72px) — any new deep section must carry the
  `.deep` class to get correct nav behaviour.
- **Final Metropolis architecture.** Phone/@handle → Prism resolution → Mera passkey → AUSD →
  Monad, with Alchemy (RPC) and Envio (indexing). The old Secure Enclave → PrismAccount story is
  retired everywhere in public copy.
- **Naming.** The recipient in the hero/People flows is **Tobi Kanisuru** (`@tobi`); cross-border
  recipient is **Sherggs** (UK). The account holder is **Octane** (`@octane`).
- **Dollars only.** Amounts are shown in USD (`$20.00`, `$15.00`). Country identity (Nigeria
  `+234`, UK `+44`) appears only in the cross-border section; no ₦/NGN/Naira anywhere.

## Copy rules

Banned: revolutionary, seamless, future of finance, web3-native, next generation. Copy is short,
dry, and verifiable. No blockchain jargon in product UI; chain terms are confined to proof
metadata and the Infrastructure section.

## Evidence handling

Nothing is presented as live. The proof surface is driven by a typed `PrismProof`
(`src/components/prism/proof.ts`) defaulting to `DEMO_PROOF` (`environment: "demo"`), which shows
a prominent **DEMO DATA** banner. Infrastructure providers are each labelled `Integration
target` / `Testnet` / `Demo data`. Mainnet claims require verified live evidence and a real
`PrismProof`.

## Accessibility

- One `h1`, one `h2` per section, `h3` for infrastructure blocks; logical DOM order.
- All interactive demos are real `<button>`s / `<a>`s — keyboard operable, visible jade focus
  ring, `aria-expanded` on disclosures, `aria-pressed` on selectors, labelled nav regions.
- `prefers-reduced-motion` honoured throughout.
- Contrast: `--muted-foreground` and `--jade-strong` were nudged darker to clear WCAG AA for
  small text (see DESIGN_SYSTEM.md). Status is never color-only.

## Responsive

Verified with no horizontal overflow at 390 / 430 / 768 / 1024 / 1280 / 1440 / 1728px. The
security resolution chain goes horizontal only at `lg` (stacks vertically below); `.shell` caps
at 1600px from 1728px up so ultrawide does not stretch.

## Known limitations

- **F5.6 binaries are absent** (not redistributable). `@font-face` points at
  `public/fonts/f56.woff2|woff`, which 404 until licensed files are dropped in; the site falls
  back to Space Grotesk. This is the one intentional failed request.
- **Developers is now a real route** (`/developers`, react-router) — quickstart, capabilities,
  a labelled access/status panel, and an access CTA. `/docs` and `/whitepaper` are long-form
  content pages sharing `dockit.tsx` (layout + prose/code/table primitives). Footer links: Product,
  Security, Proof, Developers, Docs, Whitepaper are internal; "GitHub" opens
  `https://github.com/cybort360/prism-web` in a new tab. Section links use `/#id` so they work from any
  route (a small `ScrollManager` handles hash targets and top-on-route-change). No footer
  placeholders remain.
- Display headings are uppercase via `.display`; the app uses mixed case. Left uppercase as the
  editorial treatment — revisit if brand prefers mixed case.

## Tooling

- Prettier is configured (`.prettierrc.json`, `.prettierignore`); `npm run lint` checks and
  `npm run format` writes. No ESLint (not required for this codebase).
- `npm run build` (`tsc -b && vite build`) is the CI gate.
