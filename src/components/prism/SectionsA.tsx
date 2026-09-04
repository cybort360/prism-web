import { useState } from "react";
import { cn } from "@/lib/utils";
import { Eyebrow, Mono, Reveal, Section } from "./primitives";

/* ------------------------------------------------------------------ shared */
function prm() {
  return typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
}
const run = (steps: Array<() => void>, gap = 620) => {
  if (prm()) {
    steps.forEach((s) => s());
    return;
  }
  steps.forEach((s, k) => setTimeout(s, gap * (k + 1)));
};

function Avatar({ initials, ring, className }: { initials: string; ring?: boolean; className?: string }) {
  return (
    <div
      className={cn(
        "grid shrink-0 place-items-center rounded-full bg-mint-pale font-semibold text-jade-strong",
        ring && "ring-2 ring-jade",
        className,
      )}
    >
      <span>{initials}</span>
    </div>
  );
}

type IconProps = { className?: string };
const Ic = {
  search: (p: IconProps) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      className={p.className}
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3-3" />
    </svg>
  ),
  phone: (p: IconProps) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={p.className}
      aria-hidden="true"
    >
      <path d="M5 4h3l1.6 4-2 1.4a11 11 0 0 0 5 5L19 16l4 1.5V19a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" />
    </svg>
  ),
  at: (p: IconProps) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      className={p.className}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M16 12v1.5a2.5 2.5 0 0 0 5 0V12a9 9 0 1 0-3.8 7.3" />
    </svg>
  ),
  qr: (p: IconProps) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={p.className}
      aria-hidden="true"
    >
      <rect x="4" y="4" width="6" height="6" rx="1" />
      <rect x="14" y="4" width="6" height="6" rx="1" />
      <rect x="4" y="14" width="6" height="6" rx="1" />
      <path d="M14 14h3v3M20 14v6M17 20h3" />
    </svg>
  ),
  link: (p: IconProps) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={p.className}
      aria-hidden="true"
    >
      <path d="M9.5 14.5 14.5 9.5" />
      <path d="M13 7l1-1a3.9 3.9 0 0 1 5.5 5.5l-2 2" />
      <path d="M11 17l-1 1A3.9 3.9 0 0 1 4.5 12.5l2-2" />
    </svg>
  ),
  check: (p: IconProps) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={p.className}
      aria-hidden="true"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  ),
  arrow: (p: IconProps) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={p.className}
      aria-hidden="true"
    >
      <path d="M5 12h13M13 6l6 6-6 6" />
    </svg>
  ),
  spin: (p: IconProps) => (
    <span
      aria-hidden="true"
      className={cn("inline-block animate-spin rounded-full border-2 border-jade/30 border-t-jade", p.className)}
    />
  ),
};

/* ============================================================= 01 · PEOPLE */
type Contact = { name: string; handle?: string; sub?: string; onPrism: boolean; initials: string };
const CONTACTS: Contact[] = [
  { name: "Tobi Kanisuru", handle: "@tobi", onPrism: true, initials: "TK" },
  { name: "Jayson Okafor", handle: "@jayson", onPrism: true, initials: "JO" },
  { name: "Mum", onPrism: true, initials: "M" },
  { name: "David Okonkwo", sub: "+234 805 ••• ••87", onPrism: false, initials: "DO" },
  { name: "Sarah Eze", handle: "@sarah", onPrism: true, initials: "SE" },
];

function PeopleSendCard({ sel, sent, onConfirm }: { sel: Contact; sent: boolean; onConfirm: () => void }) {
  const first = sel.name.split(" ")[0];
  const held = !sel.onPrism;
  return (
    <div className="app-card overflow-hidden">
      <div className="flex items-center justify-between px-6 pt-5">
        <Mono className="text-muted-foreground">Send</Mono>
        <Mono className="text-muted-foreground/70">Prism</Mono>
      </div>
      <div className="flex items-center gap-4 px-6 pt-5">
        <Avatar initials={sel.initials} ring={sel.onPrism} className="size-12 text-[15px]" />
        <div className="min-w-0">
          <p className="truncate text-[16px] font-medium text-ink">{sel.name}</p>
          <Mono className="text-muted-foreground">
            {sel.handle ?? sel.sub}
            {sel.onPrism ? " · On Prism" : " · Not on Prism"}
          </Mono>
        </div>
      </div>
      <div className="px-6 pt-6">
        <Mono className="text-muted-foreground">Amount</Mono>
        <p className="display mt-2 text-[48px] leading-none tabular-nums text-ink">$20.00</p>
        <div className="mt-2 flex items-center gap-2">
          <span aria-hidden="true" className="size-1.5 rounded-full bg-jade" />
          <span className="text-[14px] text-muted-foreground">Dinner</span>
        </div>
      </div>
      <div className="px-6 pb-6 pt-6">
        {sent ? (
          <div className="flex items-center justify-between rounded-[16px] bg-jade px-4 py-3 text-jade-foreground">
            <span className="flex items-center gap-2 text-[14px] font-medium">
              <Ic.check className="size-4" />
              {held ? "Locked" : "Sent"}
            </span>
            <Mono className="text-jade-foreground/70">{held ? `Awaiting ${first}` : `$20.00 → ${first}`}</Mono>
          </div>
        ) : (
          <button
            type="button"
            onClick={onConfirm}
            className="w-full rounded-[16px] bg-primary py-3.5 font-mono text-[11px] uppercase tracking-[0.14em] text-primary-foreground transition-colors duration-200 hover:bg-jade hover:text-jade-foreground"
          >
            Confirm
          </button>
        )}
      </div>
    </div>
  );
}

export function PeopleSection() {
  const [sel, setSel] = useState<Contact>(CONTACTS[0]!);
  const [sent, setSent] = useState(false);
  const pick = (c: Contact) => {
    setSel(c);
    setSent(false);
  };
  return (
    <Section id="product" className="border-t border-line">
      <div className="shell">
        <Eyebrow>01 / People</Eyebrow>
        <Reveal>
          <h2 className="display mt-6 max-w-[15ch] text-[38px] sm:text-[54px] lg:text-[76px]">
            Your contacts are already your payment network.
          </h2>
        </Reveal>
        <div className="mt-14 grid gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-14">
          <div className="app-card overflow-hidden">
            <div className="px-5 pt-5">
              <div className="flex items-center gap-3 rounded-full bg-muted px-4 py-3 text-muted-foreground">
                <Ic.search className="size-4" />
                <span className="text-[14px]">Search contacts or @handle</span>
              </div>
              <div className="relative mt-4 flex rounded-full bg-muted p-1">
                <span
                  aria-hidden="true"
                  className="absolute bottom-1 left-1 top-1 w-[calc(50%-0.25rem)] rounded-full bg-paper shadow-[0_1px_3px_rgba(5,24,22,.14)]"
                />
                <span className="relative z-10 flex-1 py-2 text-center font-mono text-[11px] uppercase tracking-[0.1em] text-ink">
                  Contacts
                </span>
                <span className="relative z-10 flex-1 py-2 text-center font-mono text-[11px] uppercase tracking-[0.1em] text-muted-foreground">
                  Prism
                </span>
              </div>
            </div>
            <ul className="mt-2 pb-2">
              {CONTACTS.map((c, idx) => {
                const active = sel.name === c.name;
                return (
                  <li key={c.name}>
                    <button
                      type="button"
                      onClick={() => pick(c)}
                      aria-pressed={active}
                      className={cn(
                        "flex w-full items-center gap-4 px-5 py-3.5 text-left transition-colors duration-200",
                        active ? "bg-mint-pale" : "hover:bg-muted",
                      )}
                    >
                      <Avatar initials={c.initials} ring={c.onPrism} className="size-11 text-[14px]" />
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-[16px] font-medium text-ink">{c.name}</span>
                        <span className="mt-0.5 block truncate font-mono text-[11px] tracking-[0.06em] text-muted-foreground">
                          {c.handle ?? c.sub ?? " "}
                        </span>
                      </span>
                      <span
                        className={cn(
                          "shrink-0 font-mono text-[10px] uppercase tracking-[0.12em]",
                          c.onPrism ? "text-jade-strong" : "text-muted-foreground",
                        )}
                      >
                        {c.onPrism ? "On Prism" : "Not on Prism"}
                      </span>
                    </button>
                    {idx < CONTACTS.length - 1 ? <div className="ml-[4.75rem] mr-5 h-px bg-line" /> : null}
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="lg:pt-4">
            <PeopleSendCard sel={sel} sent={sent} onConfirm={() => setSent(true)} />
            <p className="mt-6 max-w-[42ch] text-[15px] leading-relaxed text-muted-foreground">
              Select a person. Prism resolves them to an account, so you never touch an address.
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ======================================================= 02 · REACHABILITY */
const REACH = [
  { icon: Ic.phone, label: "Phone", value: "+234 803 ••• ••67", status: "Verified" },
  { icon: Ic.at, label: "@handle", value: "@octane", status: "Public" },
  { icon: Ic.qr, label: "Payment QR", value: "Show QR", status: "" },
  { icon: Ic.link, label: "Payment link", value: "prism.app/octane", status: "" },
];
export function ReachabilitySection() {
  return (
    <Section id="reachability" className="border-t border-line bg-mint-pale">
      <div className="shell">
        <Eyebrow>02 / Reachability</Eyebrow>
        <Reveal>
          <h2 className="display mt-6 text-[38px] sm:text-[54px] lg:text-[72px]">
            One person.
            <br />
            More than one way
            <br />
            to find them.
          </h2>
        </Reveal>
        <div className="mt-14 grid items-center gap-6 lg:grid-cols-[minmax(0,1fr)_140px_auto]">
          <Reveal className="app-card overflow-hidden">
            {REACH.map((r, idx) => (
              <div key={r.label}>
                <div className="flex items-center gap-4 px-5 py-4">
                  <span className="app-chip size-11 rounded-[13px]">
                    <r.icon className="size-5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <Mono className="text-muted-foreground">{r.label}</Mono>
                    <p className="mt-0.5 truncate text-[15px] text-ink">{r.value}</p>
                  </div>
                  {r.status ? (
                    <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.12em] text-jade-strong">
                      {r.status}
                    </span>
                  ) : (
                    <Ic.arrow className="size-4 shrink-0 text-muted-foreground" />
                  )}
                </div>
                {idx < REACH.length - 1 ? <div className="ml-[4.75rem] mr-5 h-px bg-line" /> : null}
              </div>
            ))}
          </Reveal>

          {/* desktop convergence rail */}
          <div aria-hidden="true" className="relative hidden h-full min-h-[220px] self-stretch lg:block">
            {[18, 39, 61, 82].map((t) => (
              <span key={t} className="absolute left-0 h-px w-1/2 bg-jade/45" style={{ top: `${t}%` }} />
            ))}
            <span className="absolute left-1/2 top-[18%] h-[64%] w-px bg-jade/45" />
            <span className="absolute left-1/2 top-1/2 h-px w-1/2 bg-jade" />
            <span className="absolute right-0 top-1/2 -translate-y-1/2 text-jade">
              <Ic.arrow className="size-5" />
            </span>
          </div>
          {/* mobile connector */}
          <div aria-hidden="true" className="mx-auto flex h-10 w-px items-center justify-center bg-jade/45 lg:hidden" />

          <div className="justify-self-center lg:justify-self-start">
            <div className="app-card px-9 py-7 text-center">
              <Mono className="text-muted-foreground">Resolves to</Mono>
              <p className="display mt-2 text-[40px] text-ink lg:text-[46px]">Octane</p>
              <Mono className="mt-2 text-jade-strong">Prism identity</Mono>
            </div>
          </div>
        </div>
        <p className="mt-12 max-w-[54ch] text-[17px] leading-relaxed text-ink md:text-[19px]">
          Your phone helps people find you. It never becomes the key to your money.
        </p>
      </div>
    </Section>
  );
}

/* ======================================================= 03 · CROSS-BORDER */
function BorderAccount({
  initials,
  name,
  country,
  phone,
  caption,
  amount,
  muted,
}: {
  initials: string;
  name: string;
  country: string;
  phone: string;
  caption: string;
  amount: string;
  muted?: boolean;
}) {
  return (
    <div className="app-card px-6 py-6">
      <div className="flex items-center gap-3">
        <Avatar initials={initials} ring className="size-12 text-[15px]" />
        <div className="min-w-0">
          <p className="truncate text-[16px] font-medium text-ink">{name}</p>
          <Mono className="text-muted-foreground">
            {country} · {phone}
          </Mono>
        </div>
      </div>
      <div className="mt-5 border-t border-line pt-4">
        <Mono className="text-muted-foreground">{caption}</Mono>
        <p
          className={cn(
            "display mt-1 text-[34px] leading-none tabular-nums transition-colors duration-300 sm:text-[38px]",
            muted ? "text-line" : "text-ink",
          )}
        >
          {amount}
        </p>
      </div>
    </div>
  );
}
export function CrossBorderSection() {
  const [phase, setPhase] = useState<"idle" | "sending" | "settled">("idle");
  const send = () => {
    if (phase === "settled") {
      setPhase("idle");
      return;
    }
    if (prm()) {
      setPhase("settled");
      return;
    }
    setPhase("sending");
    setTimeout(() => setPhase("settled"), 780);
  };
  const active = phase !== "idle";
  return (
    <Section id="cross-border" className="deep">
      <div className="shell">
        <Eyebrow>03 / Cross-border</Eyebrow>
        <Reveal>
          <h2 className="display mt-6 text-[38px] sm:text-[54px] lg:text-[72px]">
            People cross borders.
            <br />
            Payments should too.
          </h2>
        </Reveal>
        <Reveal className="mt-14 grid items-center gap-5 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]">
          <BorderAccount
            initials="OC"
            name="Octane"
            country="Nigeria"
            phone="+234 ••• ••34"
            caption="Sends"
            amount="$20.00"
          />
          <div className="flex flex-col items-center gap-2 py-2 lg:py-0">
            <Mono
              className={cn("transition-colors duration-300", active ? "text-jade" : "text-surface-dark-foreground/70")}
            >
              {phase === "sending" ? "Sending…" : phase === "settled" ? "Settled" : "$20.00"}
            </Mono>
            <div
              className={cn(
                "h-12 w-px transition-colors duration-500 lg:h-px lg:w-full lg:min-w-[90px]",
                active ? "bg-jade" : "bg-white/25",
              )}
            />
            <span className="rounded-full bg-white/10 px-2.5 py-1">
              <Mono className="text-surface-dark-foreground/70">AUSD · Monad</Mono>
            </span>
          </div>
          <BorderAccount
            initials="SH"
            name="Sherggs"
            country="United Kingdom"
            phone="+44 ••• ••71"
            caption="Receives"
            amount={phase === "settled" ? "$20.00" : "$0.00"}
            muted={phase !== "settled"}
          />
        </Reveal>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <button
            type="button"
            onClick={send}
            className="inline-flex h-11 items-center rounded-full bg-jade px-6 font-mono text-[11px] uppercase tracking-[0.14em] text-jade-foreground transition-colors duration-200 hover:bg-jade-strong"
          >
            {phase === "settled" ? "Reset" : "Send across border"}
          </button>
          <p className="max-w-[52ch] text-[15px] leading-relaxed text-surface-dark-foreground/75">
            Prism moves AUSD between human-addressed accounts across borders without making either person handle a
            wallet address.
          </p>
        </div>
        <div className="mt-10 flex flex-wrap gap-x-8 gap-y-2 border-t border-white/12 pt-5">
          <Mono className="text-surface-dark-foreground/55">Sender · $0-equiv / 0 MON</Mono>
          <Mono className="text-surface-dark-foreground/55">AUSD payment</Mono>
          <Mono className="text-surface-dark-foreground/55">Monad settlement</Mono>
        </div>
      </div>
    </Section>
  );
}

/* ================================================= 04 · SEND BEFORE SIGNUP */
const CLAIM_STEPS = [
  { label: "Not on Prism", meta: "David · +234 805 ••• ••87" },
  { label: "$20.00 locked", meta: "Escrowed · pending claim" },
  { label: "David joins", meta: "Installs Prism, verifies phone" },
  { label: "Verified", meta: "Mera passkey authority created" },
  { label: "Claimed", meta: "Settled on Monad" },
];
export function ClaimSection() {
  const [i, setI] = useState(0);
  const claiming = i > 0 && i < 4;
  const claim = () => {
    if (i >= 4) {
      setI(0);
      return;
    }
    run([() => setI(2), () => setI(3), () => setI(4)]);
  };
  return (
    <Section id="claim" className="deep">
      <div className="shell">
        <Eyebrow>04 / Send before signup</Eyebrow>
        <Reveal>
          <h2 className="display mt-6 text-[38px] sm:text-[54px] lg:text-[72px]">
            David doesn’t
            <br />
            have Prism.
            <br />
            Send anyway.
          </h2>
        </Reveal>
        <div className="mt-14 grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-16">
          {/* lifecycle */}
          <div>
            <ol className="border-t border-white/12">
              {CLAIM_STEPS.map((s, idx) => {
                const done = idx <= i;
                return (
                  <li key={s.label} className="border-b border-white/12">
                    <button
                      type="button"
                      onClick={() => setI(idx)}
                      aria-current={idx === i}
                      className={cn(
                        "flex w-full items-center gap-4 py-4 text-left transition-opacity duration-200",
                        done ? "opacity-100" : "opacity-45 hover:opacity-75",
                      )}
                    >
                      <span
                        className={cn(
                          "grid size-7 shrink-0 place-items-center rounded-full text-[11px] font-semibold",
                          idx <= i
                            ? "bg-jade text-jade-foreground"
                            : "border border-white/25 text-surface-dark-foreground/70",
                        )}
                      >
                        {idx < i ? "✓" : idx + 1}
                      </span>
                      <span className="min-w-0">
                        <span className="block truncate text-[17px] md:text-[19px]">{s.label}</span>
                        <Mono className="text-surface-dark-foreground/50">{s.meta}</Mono>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>
            <div className="mt-4 flex items-center justify-between border border-white/12 px-5 py-4">
              <Mono className="text-surface-dark-foreground/55">7 days · unclaimed</Mono>
              <Mono className="text-jade">Refund available</Mono>
            </div>
          </div>
          {/* claim card */}
          <div className="lg:pl-4">
            <div className="app-card px-7 py-8">
              <Mono className="text-muted-foreground">You have money waiting</Mono>
              <p className="display mt-3 text-[64px] leading-none tabular-nums text-ink sm:text-[76px]">$20.00</p>
              <p className="mt-3 text-[15px] text-muted-foreground">
                from <span className="text-ink">Octane</span> · Dinner
              </p>
              <div className="mt-8">
                {i >= 4 ? (
                  <div className="flex items-center justify-between rounded-[18px] bg-jade px-5 py-4 text-jade-foreground">
                    <span className="flex items-center gap-2 text-[15px] font-medium">
                      <Ic.check className="size-5" /> Claimed
                    </span>
                    <Mono className="text-jade-foreground/70">$20.00 · Settled</Mono>
                  </div>
                ) : claiming ? (
                  <div className="flex items-center gap-3 rounded-[18px] bg-mint-pale px-5 py-4 text-jade-strong">
                    <Ic.spin className="size-5" />
                    <span className="text-[15px] font-medium">
                      {i === 2 ? "David is joining…" : "Verifying passkey…"}
                    </span>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={claim}
                    className="w-full rounded-[18px] bg-primary py-4 font-mono text-[12px] uppercase tracking-[0.14em] text-primary-foreground transition-colors duration-200 hover:bg-jade hover:text-jade-foreground"
                  >
                    Claim
                  </button>
                )}
              </div>
              {i >= 4 ? (
                <button
                  type="button"
                  onClick={() => setI(0)}
                  className="mt-4 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:text-ink"
                >
                  Replay
                </button>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ============================================================ 05 · REQUEST */
type ReqState = "OPEN" | "PAID" | "DECLINED" | "CANCELLED" | "EXPIRED";
const REQ_STATES: ReqState[] = ["OPEN", "PAID", "DECLINED", "CANCELLED", "EXPIRED"];
export function RequestSection() {
  const [state, setState] = useState<ReqState>("OPEN");
  const [phase, setPhase] = useState<"idle" | "authorize" | "settling">("idle");
  const pay = () => {
    if (prm()) {
      setState("PAID");
      return;
    }
    setPhase("authorize");
    setTimeout(() => setPhase("settling"), 640);
    setTimeout(() => {
      setPhase("idle");
      setState("PAID");
    }, 1320);
  };
  const reset = (s: ReqState) => {
    setPhase("idle");
    setState(s);
  };
  const busy = phase !== "idle";
  return (
    <Section id="request" className="border-t border-line">
      <div className="shell">
        <Eyebrow>05 / Request</Eyebrow>
        <Reveal>
          <h2 className="display mt-6 text-[38px] sm:text-[54px] lg:text-[72px]">
            Money moves
            <br />
            both ways.
          </h2>
        </Reveal>
        <div className="mt-14 grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-16">
          {/* request card */}
          <div className="app-card overflow-hidden">
            <div className="flex items-center justify-between px-6 pt-5">
              <Mono className="text-muted-foreground">Incoming request</Mono>
              <Mono className="text-muted-foreground/70">Prism</Mono>
            </div>
            <div className="flex items-center gap-4 px-6 pt-5">
              <Avatar initials="JO" ring className="size-12 text-[15px]" />
              <div className="min-w-0">
                <p className="truncate text-[16px] font-medium text-ink">Jayson Okafor</p>
                <Mono className="text-muted-foreground">requested for lunch</Mono>
              </div>
            </div>
            <div className="px-6 pt-6">
              <Mono className="text-muted-foreground">Amount</Mono>
              <p className="display mt-2 text-[52px] leading-none tabular-nums text-ink">$15.00</p>
            </div>
            <div className="px-6 pb-6 pt-6">
              {state === "OPEN" && !busy && (
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => reset("DECLINED")}
                    className="flex-1 rounded-[16px] border border-line py-3.5 font-mono text-[11px] uppercase tracking-[0.14em] text-ink transition-colors duration-200 hover:bg-muted"
                  >
                    Decline
                  </button>
                  <button
                    type="button"
                    onClick={pay}
                    className="flex-1 rounded-[16px] bg-primary py-3.5 font-mono text-[11px] uppercase tracking-[0.14em] text-primary-foreground transition-colors duration-200 hover:bg-jade hover:text-jade-foreground"
                  >
                    Pay $15.00
                  </button>
                </div>
              )}
              {busy && (
                <div className="flex items-center gap-3 rounded-[16px] bg-mint-pale px-4 py-3.5 text-jade-strong">
                  <Ic.spin className="size-5" />
                  <span className="text-[14px] font-medium">
                    {phase === "authorize" ? "Face ID · Authorize" : "Settling on Monad…"}
                  </span>
                </div>
              )}
              {state !== "OPEN" && !busy && (
                <div
                  className={cn(
                    "flex items-center justify-between rounded-[16px] px-4 py-3.5",
                    state === "PAID" ? "bg-jade text-jade-foreground" : "bg-muted text-muted-foreground",
                  )}
                >
                  <span className="flex items-center gap-2 text-[14px] font-medium">
                    {state === "PAID" ? <Ic.check className="size-4" /> : null}
                    {state === "PAID" ? "Paid" : state.charAt(0) + state.slice(1).toLowerCase()}
                  </span>
                  <Mono className={state === "PAID" ? "text-jade-foreground/70" : "text-muted-foreground"}>
                    {state === "PAID" ? "$15.00 → Jayson" : "Request closed"}
                  </Mono>
                </div>
              )}
            </div>
          </div>
          {/* state machine */}
          <div className="lg:pt-4">
            <p className="max-w-[40ch] text-[17px] leading-relaxed text-muted-foreground md:text-[19px]">
              A request is a state machine, not a message. Every request resolves, one way or another.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-2 sm:grid-cols-3">
              {REQ_STATES.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => reset(s)}
                  aria-pressed={state === s && !busy}
                  className={cn(
                    "rounded-[10px] px-4 py-4 text-left font-mono text-[11px] uppercase tracking-[0.12em] transition-colors duration-200",
                    state === s && !busy
                      ? "bg-primary text-primary-foreground"
                      : "border border-line text-muted-foreground hover:bg-muted hover:text-ink",
                  )}
                >
                  {s}
                </button>
              ))}
              <button
                type="button"
                onClick={() => reset("OPEN")}
                className="rounded-[10px] px-4 py-4 text-left font-mono text-[11px] uppercase tracking-[0.12em] text-jade-strong transition-colors duration-200 hover:bg-mint-pale"
              >
                Reset ↺
              </button>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
