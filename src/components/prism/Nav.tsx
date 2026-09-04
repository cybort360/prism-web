import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { PrismButton } from "./primitives";

const LINKS = [
  { label: "Product", to: "/#product" },
  { label: "Security", to: "/#security" },
  { label: "Proof", to: "/#proof" },
  { label: "Developers", to: "/developers" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [overHero, setOverHero] = useState(true);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const NAV_LINE = 72; // treatment is decided by whatever sits just below the nav
    const scan = () => {
      setScrolled(window.scrollY > 12);
      let onDark = false;
      document.querySelectorAll(".deep").forEach((el) => {
        const r = (el as HTMLElement).getBoundingClientRect();
        if (r.top <= NAV_LINE && r.bottom > NAV_LINE) onDark = true;
      });
      setOverHero(onDark);
    };
    scan();
    const raf = requestAnimationFrame(scan); // recompute once the new route paints
    window.addEventListener("scroll", scan, { passive: true });
    window.addEventListener("resize", scan, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", scan);
      window.removeEventListener("resize", scan);
    };
  }, [pathname]);

  useEffect(() => setOpen(false), [pathname]);

  const dark = overHero && !open;
  const link = dark
    ? "text-surface-dark-foreground/70 hover:text-surface-dark-foreground"
    : "text-muted-foreground hover:text-foreground";
  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 backdrop-blur-[2px] transition-colors duration-300",
        dark
          ? scrolled
            ? "bg-surface-dark/95 border-b border-white/10"
            : "bg-transparent border-b border-transparent"
          : cn("bg-background/92", scrolled ? "border-b border-line" : "border-b border-transparent"),
      )}
    >
      <div className="shell grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 py-4 md:py-5">
        <Link
          to="/"
          className={cn(
            "display min-w-0 truncate text-xl tracking-[-0.02em] transition-colors duration-300 md:text-2xl",
            dark ? "text-surface-dark-foreground" : "text-foreground",
          )}
        >
          Prism
        </Link>
        <div className="flex items-center gap-6 md:gap-10">
          <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
            {LINKS.map((l) => (
              <Link
                key={l.label}
                to={l.to}
                className={cn("font-mono text-[11px] tracking-[0.14em] uppercase transition-colors duration-200", link)}
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <span className="hidden sm:block">
            <PrismButton href="/#get" size="sm" variant="accent">
              Get Prism ↗
            </PrismButton>
          </span>
          <button
            type="button"
            aria-expanded={open}
            aria-label="Toggle navigation"
            onClick={() => setOpen((v) => !v)}
            className={cn(
              "font-mono text-[11px] tracking-[0.14em] uppercase transition-colors duration-200 md:hidden",
              dark ? "text-surface-dark-foreground" : "text-foreground",
            )}
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </div>
      {open ? (
        <nav aria-label="Mobile" className="border-t border-line bg-background md:hidden">
          <ul className="shell flex flex-col py-2">
            {[...LINKS, { label: "Get Prism ↗", to: "/#get" }].map((l) => (
              <li key={l.label} className="border-b border-line last:border-b-0">
                <Link
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className="block py-3 font-mono text-[11px] tracking-[0.14em] uppercase"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
