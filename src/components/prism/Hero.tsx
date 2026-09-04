import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Eyebrow, Mono, PrismButton } from "./primitives";

const STAGES = [
  { key: "contact", label: "Contact" },
  { key: "amount", label: "Amount" },
  { key: "authorize", label: "Auth" },
  { key: "sent", label: "Sent" },
] as const;

function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
}

// One stage index drives the entire card. Auto-advances until the user interacts, then holds.
function useSendFlow(interval = 2100) {
  const [i, setI] = useState(0);
  const paused = useRef(false);
  useEffect(() => {
    if (prefersReducedMotion() || paused.current) return;
    const t = setInterval(() => setI((v) => (v + 1) % STAGES.length), interval);
    return () => clearInterval(t);
  }, [interval, i]);
  const select = (n: number) => {
    paused.current = true;
    setI(n);
  };
  return { i, select };
}

function FaceIdIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M4 8V6.5A2.5 2.5 0 0 1 6.5 4H8" />
      <path d="M16 4h1.5A2.5 2.5 0 0 1 20 6.5V8" />
      <path d="M20 16v1.5a2.5 2.5 0 0 1-2.5 2.5H16" />
      <path d="M8 20H6.5A2.5 2.5 0 0 1 4 17.5V16" />
      <path d="M9 10v1.5" />
      <path d="M15 10v1.5" />
      <path d="M12 10v3l-1 1" />
      <path d="M9.5 15.2c1.4 1 3.6 1 5 0" />
    </svg>
  );
}
function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function ProductFragment() {
  const { i, select } = useSendFlow();
  const [authPhase, setAuthPhase] = useState<"face" | "sending">("face");
  useEffect(() => {
    if (STAGES[i]!.key !== "authorize") {
      setAuthPhase("face");
      return;
    }
    if (prefersReducedMotion()) {
      setAuthPhase("face");
      return;
    }
    setAuthPhase("face");
    const t = setTimeout(() => setAuthPhase("sending"), 950);
    return () => clearTimeout(t);
  }, [i]);

  const funded = i >= 1;
  const amount = funded ? "$20.00" : "$0.00";

  return (
    <div className="app-card relative w-full max-w-[400px] shadow-[0_30px_90px_-20px_rgba(3,18,17,.55)]">
      {/* header */}
      <div className="flex items-center justify-between px-6 pt-5">
        <Mono className="text-muted-foreground">Send</Mono>
        <Mono className="text-muted-foreground/70">Prism</Mono>
      </div>

      {/* identity */}
      <div className="flex items-center gap-4 px-6 pt-5">
        <div className="relative shrink-0">
          <div className="grid size-14 place-items-center rounded-full bg-mint-pale ring-2 ring-jade">
            <span className="text-[17px] font-semibold text-jade-strong">TK</span>
          </div>
          <span className="absolute -bottom-0.5 -right-0.5 grid size-5 place-items-center rounded-full bg-jade ring-2 ring-paper">
            <CheckIcon className="size-2.5 text-jade-foreground" />
          </span>
        </div>
        <div className="min-w-0">
          <p className="truncate text-[17px] font-medium text-ink">Tobi Kanisuru</p>
          <Mono className="text-muted-foreground">@tobi · On Prism</Mono>
        </div>
      </div>

      {/* amount */}
      <div className="px-6 pt-6">
        <Mono className="text-muted-foreground">Amount</Mono>
        <p
          className={cn(
            "display mt-2 text-[52px] leading-none tabular-nums transition-colors duration-300 sm:text-[56px]",
            funded ? "text-ink" : "text-line",
          )}
        >
          {amount}
        </p>
        <div
          className={cn(
            "mt-3 flex items-center gap-2 overflow-hidden transition-all duration-300",
            funded ? "max-h-8 opacity-100" : "max-h-0 opacity-0",
          )}
        >
          <span aria-hidden="true" className="size-1.5 rounded-full bg-jade" />
          <span className="text-[14px] text-muted-foreground">Dinner</span>
        </div>
      </div>

      {/* status */}
      <div className="px-6 pb-5 pt-6">
        <StatusRow stageKey={STAGES[i]!.key} authPhase={authPhase} />
      </div>

      {/* segmented state control */}
      <div className="border-t border-line px-6 py-5">
        <div className="relative flex rounded-full bg-muted p-1">
          <span
            aria-hidden="true"
            className="absolute bottom-1 top-1 rounded-full bg-paper shadow-[0_1px_3px_rgba(5,24,22,.14)] transition-[left] duration-300 ease-[cubic-bezier(0.22,0.61,0.36,1)]"
            style={{ width: "calc((100% - 0.5rem) / 4)", left: `calc(0.25rem + ${i} * ((100% - 0.5rem) / 4))` }}
          />
          {STAGES.map((s, idx) => (
            <button
              key={s.key}
              type="button"
              onClick={() => select(idx)}
              aria-pressed={idx === i}
              className={cn(
                "relative z-10 flex-1 py-2 font-mono text-[10px] uppercase tracking-[0.1em] transition-colors duration-200",
                idx === i ? "text-ink" : "text-muted-foreground hover:text-foreground",
              )}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function StatusRow({
  stageKey,
  authPhase,
}: {
  stageKey: (typeof STAGES)[number]["key"];
  authPhase: "face" | "sending";
}) {
  if (stageKey === "sent") {
    return (
      <div className="flex items-center justify-between rounded-[16px] bg-jade px-4 py-3 text-jade-foreground">
        <span className="flex items-center gap-2 text-[14px] font-medium">
          <CheckIcon className="size-4" /> Sent
        </span>
        <Mono className="text-jade-foreground/70">$20.00 → Tobi</Mono>
      </div>
    );
  }
  if (stageKey === "authorize") {
    return (
      <div className="flex items-center gap-3 rounded-[16px] bg-mint-pale px-4 py-3 text-jade-strong">
        {authPhase === "face" ? (
          <>
            <FaceIdIcon className="size-5" />
            <span className="text-[14px] font-medium">Face ID</span>
          </>
        ) : (
          <>
            <span
              aria-hidden="true"
              className="size-4 animate-spin rounded-full border-2 border-jade/30 border-t-jade"
            />
            <span className="text-[14px] font-medium">Sending…</span>
          </>
        )}
      </div>
    );
  }
  if (stageKey === "amount") {
    return (
      <div className="flex items-center gap-2 rounded-[16px] border border-line px-4 py-3 text-jade-strong">
        <span aria-hidden="true" className="size-1.5 rounded-full bg-jade" />
        <span className="text-[14px] font-medium">Ready to send</span>
      </div>
    );
  }
  return (
    <div className="rounded-[16px] bg-muted px-4 py-3 text-[14px] text-muted-foreground">
      Choose an amount to continue
    </div>
  );
}

export function Hero() {
  return (
    <section id="top" className="deep relative overflow-hidden">
      <div className="shell flex min-h-[100svh] flex-col justify-center pb-20 pt-28 md:pt-32">
        <Eyebrow className="anim-fade-up">001 / Human payments / Monad</Eyebrow>
        <div className="mt-8 grid items-center gap-12 md:mt-10 md:grid-cols-[1.15fr_0.85fr] md:gap-8 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] lg:gap-16">
          <div>
            <h1 className="display text-[54px] leading-[0.9] sm:text-[76px] md:text-[62px] lg:text-[104px] xl:text-[128px]">
              <span className="clip-line">
                <span className="clip-line-inner text-[#F3F8F5]" style={{ animationDelay: "60ms" }}>
                  Pay people.
                </span>
              </span>
              <span className="clip-line">
                <span className="clip-line-inner text-[#D8ECE3]" style={{ animationDelay: "180ms" }}>
                  Not wallets.
                </span>
              </span>
            </h1>
            <p
              className="anim-fade-up mt-8 max-w-[42ch] text-[17px] leading-relaxed text-surface-dark-foreground/75 md:text-[19px]"
              style={{ animationDelay: "320ms" }}
            >
              Send and request dollars through the people already in your life. Prism keeps wallet infrastructure
              underneath.
            </p>
            <div className="anim-fade-up mt-8 flex flex-wrap gap-3" style={{ animationDelay: "400ms" }}>
              <PrismButton href="#get" variant="accent">
                Get Prism ↗
              </PrismButton>
              <PrismButton href="#product" variant="ghostDark">
                See how it works
              </PrismButton>
            </div>
          </div>
          <div className="anim-fade-up flex justify-start md:justify-end" style={{ animationDelay: "460ms" }}>
            <ProductFragment />
          </div>
        </div>
      </div>
    </section>
  );
}

export function ProofStrip() {
  const facts = ["Contact-native", "Zero wallet-address UX", "Zero-MON user experience", "Settled on Monad"];
  return (
    <div className="deep">
      <div className="shell grid grid-cols-2 border-t border-white/12 md:grid-cols-4">
        {facts.map((f, idx) => (
          <div
            key={f}
            className={cn(
              "px-1 py-6 md:px-5 md:py-7",
              idx % 2 === 1 && "border-l border-white/12",
              idx >= 2 && "md:border-l md:border-white/12",
              idx < 2 && "border-b border-white/12 md:border-b-0",
              idx === 2 && "border-l-0 md:border-l",
            )}
          >
            <Mono className="text-surface-dark-foreground/65">{f}</Mono>
          </div>
        ))}
      </div>
    </div>
  );
}
