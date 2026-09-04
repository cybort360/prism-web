import { cn } from "@/lib/utils";
import { Eyebrow, Mono, PrismButton, Reveal, Section } from "./primitives";

/* ---------------------------------------------------------------- shared */
type Status = "Integration target" | "Testnet" | "Demo data" | "Planned";
function StatusPill({ kind }: { kind: Status }) {
  const strong = kind === "Demo data" || kind === "Testnet";
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

/* ----------------------------------------------------------------- data */
// Illustrative preview API — not a published SDK. Comment lines render muted.
const QUICKSTART: Array<{ code: string; comment?: boolean }> = [
  { code: 'import { prism } from "@prism/sdk"; // preview — not yet published', comment: false },
  { code: "", comment: true },
  { code: "// resolve a person by handle, phone, or payment link", comment: true },
  { code: 'const to = await prism.resolve("@tobi");', comment: false },
  { code: "", comment: true },
  { code: "// send dollars — Prism handles authority and settlement", comment: true },
  { code: "await prism.pay({", comment: false },
  { code: "  to,", comment: false },
  { code: '  amount: "20.00", // AUSD', comment: false },
  { code: '  memo: "Dinner",', comment: false },
  { code: "});", comment: false },
  { code: "// → settles on Monad, indexed by Envio", comment: true },
];

const CAPABILITIES: Array<{ name: string; body: string; meta: string }> = [
  { name: "Resolve", body: "Turn a handle, phone number, or payment link into an account.", meta: "Identity" },
  { name: "Pay & request", body: "Move dollars (AUSD) between people in either direction.", meta: "Payments" },
  { name: "Authorize", body: "Approve with a Mera passkey. No seed phrases, no addresses.", meta: "Mera" },
  { name: "History", body: "Read indexed payment history and verifiable receipts.", meta: "Envio" },
  {
    name: "Chain access",
    body: "Drop to raw chain reads and transactions when you need them.",
    meta: "Alchemy · Monad RPC",
  },
];

const ACCESS: Array<{ label: string; value: string; status: Status }> = [
  { label: "Network", value: "Monad", status: "Testnet" },
  { label: "Asset", value: "AUSD", status: "Testnet" },
  { label: "SDK", value: "@prism/sdk", status: "Integration target" },
  { label: "REST / RPC", value: "via Alchemy", status: "Integration target" },
  { label: "Indexer", value: "Envio", status: "Demo data" },
  { label: "Docs", value: "prism.app/docs", status: "Planned" },
];

/* ----------------------------------------------------------------- page */
export function DevelopersPage() {
  return (
    <main>
      {/* hero */}
      <section className="deep relative overflow-hidden">
        <div className="shell pb-20 pt-28 md:pb-24 md:pt-32">
          <Eyebrow className="anim-fade-up">Developers</Eyebrow>
          <h1 className="display mt-6 max-w-[16ch] text-[44px] leading-[0.92] sm:text-[68px] lg:text-[92px]">
            Build on Prism.
          </h1>
          <p className="anim-fade-up mt-8 max-w-[52ch] text-[17px] leading-relaxed text-surface-dark-foreground/75 md:text-[19px]">
            Move dollars between people without making anyone handle a wallet address. Prism resolves identity, a Mera
            passkey holds authority, and Monad settles underneath.
          </p>
          <div className="anim-fade-up mt-8 flex flex-wrap gap-3">
            <PrismButton href="mailto:developers@prism.app?subject=Prism%20developer%20access" variant="accent">
              Request developer access ↗
            </PrismButton>
            <PrismButton href="/#proof" variant="ghostDark">
              Read the architecture
            </PrismButton>
          </div>
        </div>
      </section>

      {/* quickstart */}
      <Section id="quickstart" className="border-t border-line">
        <div className="shell">
          <Eyebrow>01 / Quickstart</Eyebrow>
          <Reveal>
            <h2 className="display mt-6 max-w-[18ch] text-[32px] sm:text-[44px] lg:text-[56px]">
              Resolve a person. Send dollars.
            </h2>
          </Reveal>
          <Reveal className="mt-12 overflow-hidden rounded-[14px] border border-line bg-paper">
            <div className="flex items-center justify-between border-b border-line px-5 py-3">
              <Mono className="text-muted-foreground">prism.ts</Mono>
              <span className="inline-flex items-center gap-1.5 border border-line px-2.5 py-1">
                <span className="size-1.5 rounded-full bg-line" />
                <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">Preview</span>
              </span>
            </div>
            <pre className="overflow-x-auto px-5 py-5 font-mono text-[12.5px] leading-[1.7] md:text-[13px]">
              <code>
                {QUICKSTART.map((l, i) => (
                  <span key={i} className={cn("block", l.comment ? "text-muted-foreground" : "text-ink")}>
                    {l.code || " "}
                  </span>
                ))}
              </code>
            </pre>
          </Reveal>
          <p className="mt-4 max-w-[60ch] text-[14px] leading-relaxed text-muted-foreground">
            Illustrative API. The SDK is an integration target — not yet published. No live keys are required or issued
            on this page.
          </p>
        </div>
      </Section>

      {/* capabilities */}
      <Section id="capabilities" className="border-t border-line">
        <div className="shell">
          <Eyebrow>02 / What you can build</Eyebrow>
          <Reveal>
            <h2 className="display mt-6 max-w-[16ch] text-[32px] sm:text-[44px] lg:text-[56px]">
              People in. Dollars out. No addresses.
            </h2>
          </Reveal>
          <div className="mt-12 border-t border-line">
            {CAPABILITIES.map((c, i) => (
              <Reveal
                key={c.name}
                className="grid gap-3 border-b border-line py-7 md:grid-cols-[auto_minmax(0,1fr)_auto] md:items-baseline md:gap-10"
              >
                <Mono className="text-muted-foreground">{String(i + 1).padStart(2, "0")}</Mono>
                <div>
                  <h3 className="display text-[22px] md:text-[26px]">{c.name}</h3>
                  <p className="mt-2 max-w-[46ch] text-[15px] leading-relaxed text-muted-foreground">{c.body}</p>
                </div>
                <Mono className="text-muted-foreground md:text-right">{c.meta}</Mono>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* access / status */}
      <Section id="access" className="border-t border-line">
        <div className="shell">
          <Eyebrow>03 / Access</Eyebrow>
          <Reveal>
            <h2 className="display mt-6 max-w-[18ch] text-[32px] sm:text-[44px] lg:text-[56px]">
              What is live, and what is not.
            </h2>
          </Reveal>
          <Reveal className="mt-12 border border-line">
            <dl className="grid sm:grid-cols-2">
              {ACCESS.map(({ label, value, status }, i) => (
                <div
                  key={label}
                  className={cn(
                    "flex items-center justify-between gap-4 border-line px-5 py-4",
                    i < ACCESS.length - 1 && "border-b",
                    i % 2 === 0 && "sm:border-r",
                  )}
                >
                  <div className="min-w-0">
                    <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">{label}</dt>
                    <dd className="mt-1 truncate font-mono text-[13px] text-ink">{value}</dd>
                  </div>
                  <StatusPill kind={status} />
                </div>
              ))}
            </dl>
          </Reveal>
          <p className="mt-4 max-w-[60ch] text-[14px] leading-relaxed text-muted-foreground">
            Nothing here is a live mainnet claim. Testnet and demo evidence are labelled as such; production access
            opens once integrations are verified.
          </p>
        </div>
      </Section>

      {/* waitlist / contact */}
      <section id="dev-get" className="deep flex min-h-[70svh] flex-col justify-center py-24">
        <div className="shell">
          <Reveal>
            <h2 className="display text-[13vw] leading-[0.9] text-[#F3F8F5] sm:text-[64px] lg:text-[96px]">
              Want in early?
            </h2>
          </Reveal>
          <p className="mt-8 max-w-[46ch] text-[17px] leading-relaxed text-surface-dark-foreground/75 md:text-[19px]">
            Developer access is invite-based during the build. Tell us what you want to ship and we will get you keys.
          </p>
          <div className="mt-10">
            <PrismButton href="mailto:developers@prism.app?subject=Prism%20developer%20access" variant="accent">
              Request developer access ↗
            </PrismButton>
          </div>
        </div>
      </section>
    </main>
  );
}
