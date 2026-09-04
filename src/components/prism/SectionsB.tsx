import { useState } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Eyebrow, Mono, PrismButton, Reveal, Section } from "./primitives";
import { DEMO_PROOF, type PrismProof } from "./proof";

function AlertIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 3 4 6v5c0 4.5 3.2 7.6 8 9 4.8-1.4 8-4.5 8-9V6l-8-3Z" />
      <path d="M12 9v4" />
      <path d="M12 15.5h.01" />
    </svg>
  );
}

/* =========================================================== 06 · SECURITY */
const CHAIN = [
  { tag: "Input", label: "Phone / @handle" },
  { tag: "Lookup", label: "Reachability" },
  { tag: "Identity", label: "Prism" },
  { tag: "Authority", label: "Mera passkey" },
  { tag: "Settlement", label: "AUSD / Monad" },
];
const STATEMENTS: Array<[string, string]> = [
  ["Phone", "Discovery only."],
  ["Passkey", "Financial authority."],
  ["Monad", "Settlement truth."],
];
export function AuthoritySection() {
  const [reviewed, setReviewed] = useState(false);
  return (
    <Section id="security" className="deep">
      <div className="shell">
        <Eyebrow>06 / Security</Eyebrow>
        <Reveal>
          <h2 className="display mt-6 text-[38px] sm:text-[54px] lg:text-[72px]">
            <span className="text-surface-dark-muted">Your phone finds you.</span>
            <br />
            Your passkey proves you.
          </h2>
        </Reveal>

        {/* resolution → authority → settlement */}
        <Reveal className="mt-14 grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr_auto_1fr] lg:items-stretch">
          {CHAIN.flatMap((c, i) => {
            const node = (
              <div key={c.label} className="border border-white/12 px-4 py-5 text-center lg:text-left">
                <Mono className="text-surface-dark-muted">
                  {String(i + 1).padStart(2, "0")} · {c.tag}
                </Mono>
                <p className="display mt-2 text-[16px] leading-tight">{c.label}</p>
              </div>
            );
            if (i === CHAIN.length - 1) return [node];
            const conn = (
              <div key={`c${i}`} aria-hidden="true" className="flex items-center justify-center py-2 lg:px-2 lg:py-0">
                <span className="block h-6 w-px bg-mint/40 lg:h-px lg:w-6" />
              </div>
            );
            return [node, conn];
          })}
        </Reveal>

        {/* three properties */}
        <div className="mt-12 grid gap-8 border-t border-white/12 pt-8 sm:grid-cols-3">
          {STATEMENTS.map(([k, v]) => (
            <div key={k}>
              <Mono className="text-jade">{k}</Mono>
              <p className="mt-2 text-[17px] md:text-[19px]">{v}</p>
            </div>
          ))}
        </div>

        {/* identity-change safety */}
        <div className="app-card mt-14 max-w-[520px] px-7 py-7">
          <div className="flex items-center gap-3">
            <span className="app-chip size-9 rounded-[11px]">
              <AlertIcon className="size-5" />
            </span>
            <Mono className="text-jade-strong">Identity check</Mono>
          </div>
          <p className="display mt-4 text-[24px] leading-tight text-ink md:text-[28px]">
            Tobi’s payment identity changed.
          </p>
          <p className="mt-2 text-[15px] text-muted-foreground">Review before sending.</p>
          {reviewed ? (
            <p className="mt-6 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-jade-strong">
              Reviewed ✓
            </p>
          ) : (
            <button
              type="button"
              onClick={() => setReviewed(true)}
              className="mt-6 inline-flex h-11 items-center rounded-full bg-primary px-6 font-mono text-[11px] uppercase tracking-[0.14em] text-primary-foreground transition-colors duration-200 hover:bg-jade hover:text-jade-foreground"
            >
              Review
            </button>
          )}
        </div>
      </div>
    </Section>
  );
}

/* ===================================================== 07 · INFRASTRUCTURE */
type Infra = { name: string; sentence: string; meta: string; status: "Integration target" | "Testnet" | "Demo data" };
const INFRA: Infra[] = [
  {
    name: "Mera",
    sentence: "Passkey-derived account authority.",
    meta: "Account authority · passkey-derived",
    status: "Integration target",
  },
  { name: "Agora / AUSD", sentence: "Dollar-denominated payment asset.", meta: "Asset · AUSD", status: "Testnet" },
  { name: "Monad", sentence: "Settlement.", meta: "Settlement · Monad", status: "Testnet" },
  {
    name: "Alchemy",
    sentence: "Live chain access and transaction infrastructure.",
    meta: "RPC · chain access",
    status: "Integration target",
  },
  { name: "Envio", sentence: "Indexed history and proof.", meta: "Indexer · product history", status: "Demo data" },
];
function StatusPill({ kind }: { kind: Infra["status"] }) {
  const strong = kind === "Demo data";
  return (
    <span
      className={cn("inline-flex items-center gap-1.5 border px-2.5 py-1", strong ? "border-jade/45" : "border-line")}
    >
      <span className={cn("size-1.5 rounded-full", strong ? "bg-jade" : "bg-line")} />
      <span
        className={cn(
          "font-mono text-[10px] uppercase tracking-[0.12em]",
          strong ? "text-jade-strong" : "text-muted-foreground",
        )}
      >
        {kind}
      </span>
    </span>
  );
}

function ProofPanel({ proof }: { proof: PrismProof }) {
  const [open, setOpen] = useState(false);
  const demo = proof.environment === "demo";
  const rows: Array<[string, string]> = [
    ["Network", proof.network],
    ["Asset", proof.asset],
    ["Account", demo ? `${proof.account ?? "0x…"} · demo until live` : (proof.account ?? "n/a")],
    ["MON balance", proof.monBalance ?? "0"],
    ["Payment", proof.amount ?? "n/a"],
    ["Status", `${proof.status ?? "n/a"}${demo ? " · demo" : ""}`],
    ["Request ID", proof.requestId ?? "n/a"],
    ["Tx hash", demo ? `${proof.txHash ?? "0x…"} · demo` : (proof.txHash ?? "n/a")],
    ["Indexed", proof.providers.envio ? (demo ? "Envio · demo" : "Envio") : "n/a"],
    ["RPC", proof.providers.alchemy ? "Alchemy" : "n/a"],
  ];
  return (
    <div className="mt-14 border border-line">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors duration-200 hover:bg-muted"
      >
        <span className="flex items-center gap-3">
          <Mono className="text-foreground">Proof surface</Mono>
          {demo ? (
            <span className="inline-flex items-center gap-1.5 border border-jade/45 px-2 py-0.5">
              <span className="size-1.5 rounded-full bg-jade" />
              <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-jade-strong">Demo data</span>
            </span>
          ) : null}
        </span>
        <Mono className="text-muted-foreground">{open ? "Close −" : "Expand +"}</Mono>
      </button>
      {open ? (
        <div className="border-t border-line">
          {demo ? (
            <div className="border-b border-line bg-mint-pale px-5 py-3">
              <Mono className="text-jade-strong">Demo data, not a live chain record</Mono>
            </div>
          ) : null}
          <dl className="grid font-mono text-[12px] sm:grid-cols-2">
            {rows.map(([k, v]) => (
              <div key={k} className="flex items-baseline justify-between gap-4 border-b border-line px-5 py-3">
                <dt className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">{k}</dt>
                <dd className="truncate text-right text-ink">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      ) : null}
    </div>
  );
}

export function MonadSection() {
  return (
    <Section id="proof" className="border-t border-line">
      <div className="shell">
        <Eyebrow>07 / Infrastructure</Eyebrow>
        <Reveal>
          <h2 className="display mt-6 max-w-[16ch] text-[38px] sm:text-[54px] lg:text-[68px]">What runs underneath.</h2>
        </Reveal>
        <div className="mt-14 border-t border-line">
          {INFRA.map((b, i) => (
            <Reveal
              key={b.name}
              className="grid gap-3 border-b border-line py-8 md:grid-cols-[auto_minmax(0,1fr)_auto] md:items-baseline md:gap-10"
            >
              <Mono className="text-muted-foreground">{String(i + 1).padStart(2, "0")}</Mono>
              <div>
                <h3 className="display text-[24px] md:text-[30px]">{b.name}</h3>
                <p className="mt-2 max-w-[44ch] text-[15px] leading-relaxed text-muted-foreground">{b.sentence}</p>
              </div>
              <div className="flex items-center gap-4 md:flex-col md:items-end md:gap-2">
                <Mono className="text-muted-foreground">{b.meta}</Mono>
                <StatusPill kind={b.status} />
              </div>
            </Reveal>
          ))}
        </div>
        <p className="mt-8 max-w-[60ch] text-[14px] leading-relaxed text-muted-foreground">
          Integrations are targets or run against test data. Evidence is labelled per row and in the proof surface
          below. Nothing here is a live mainnet claim.
        </p>
        <ProofPanel proof={DEMO_PROOF} />
      </div>
    </Section>
  );
}

/* ============================================================== CTA · FOOT */
export function FinalCta() {
  return (
    <section id="get" className="deep flex min-h-[92svh] flex-col justify-center py-24">
      <div className="shell">
        <Reveal>
          <h2 className="display text-[16vw] leading-[0.9] text-[#F3F8F5] sm:text-[13vw] lg:text-[120px] xl:text-[150px]">
            Find them.
            <br />
            Pay them.
            <br />
            Done.
          </h2>
        </Reveal>
        <div className="mt-12">
          <PrismButton href="/#top" variant="accent">
            Get Prism ↗
          </PrismButton>
        </div>
      </div>
    </section>
  );
}
type FooterLink = { label: string; to?: string; soon?: boolean };
const FOOTER_LINKS: FooterLink[] = [
  { label: "Product", to: "/#product" },
  { label: "Security", to: "/#security" },
  { label: "Proof", to: "/#proof" },
  { label: "Developers", to: "/developers" },
  { label: "Docs", to: "/docs" },
  { label: "Whitepaper", to: "/whitepaper" },
  { label: "GitHub", to: "https://github.com/cybort360/prism-web" },
];
const footerLinkClass =
  "font-mono text-[11px] uppercase tracking-[0.14em] text-surface-dark-foreground/70 transition-colors duration-200 hover:text-surface-dark-foreground";
export function Footer() {
  return (
    <footer id="about" className="deep border-t border-white/10">
      <div className="shell grid gap-8 py-12 md:grid-cols-[minmax(0,1fr)_auto] md:py-16">
        <div>
          <Mono className="text-surface-dark-muted">Prism / Monad / 2026</Mono>
          <p className="mt-3 max-w-[36ch] text-[14px] leading-relaxed text-surface-dark-foreground/70">
            An iPhone-first payments product. Pay people, not wallets.
          </p>
        </div>
        <nav aria-label="Footer" className="flex flex-wrap gap-x-8 gap-y-3 md:justify-end">
          {FOOTER_LINKS.map(({ label, to, soon }) =>
            soon ? (
              <span
                key={label}
                aria-disabled="true"
                className="flex cursor-default items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-surface-dark-foreground/35"
              >
                {label}
                <span className="border border-white/15 px-1 py-0.5 text-[9px] tracking-[0.1em] text-surface-dark-foreground/50">
                  Soon
                </span>
              </span>
            ) : to!.startsWith("http") ? (
              <a key={label} href={to} target="_blank" rel="noopener noreferrer" className={footerLinkClass}>
                {label} ↗
              </a>
            ) : (
              <Link key={label} to={to!} className={footerLinkClass}>
                {label}
              </Link>
            ),
          )}
        </nav>
      </div>
    </footer>
  );
}
