import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export function useInView<T extends HTMLElement>(threshold = 0.2) {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries)
          if (e.isIntersecting) {
            setVisible(true);
            io.disconnect();
          }
      },
      { threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return { ref, visible };
}

export function Reveal({
  children,
  className,
  delay = 0,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "li" | "section" | "p" | "span";
}) {
  const { ref, visible } = useInView<HTMLDivElement>(0.15);
  return (
    <Tag
      ref={ref as never}
      data-visible={visible}
      style={{ transitionDelay: `${delay}ms` }}
      className={cn("reveal", className)}
    >
      {children}
    </Tag>
  );
}

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cn("mono-label", className)}>{children}</p>;
}
export function Mono({ children, className }: { children: ReactNode; className?: string }) {
  return <span className={cn("font-mono text-[11px] tracking-[0.14em] uppercase", className)}>{children}</span>;
}
export function Section({ id, children, className }: { id?: string; children: ReactNode; className?: string }) {
  return (
    <section id={id} className={cn("py-24 md:py-32 lg:py-[9.5rem]", className)}>
      {children}
    </section>
  );
}

type ButtonProps = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "solid" | "accent" | "ghost" | "ghostDark" | "quiet";
  size?: "sm" | "md";
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  "aria-pressed"?: boolean;
};
export function PrismButton({
  children,
  href,
  onClick,
  variant = "solid",
  size = "md",
  className,
  type = "button",
  disabled,
  ...rest
}: ButtonProps) {
  const base =
    "press-feedback inline-flex items-center justify-center gap-2 rounded-[2px] font-mono text-[11px] uppercase tracking-[0.14em] disabled:pointer-events-none disabled:opacity-40";
  const sizes = size === "sm" ? "h-9 px-4" : "h-12 px-6";
  const variants = {
    solid: "bg-primary text-primary-foreground hover:bg-jade hover:text-jade-foreground",
    accent: "bg-jade text-jade-foreground hover:bg-jade-strong",
    ghost: "border border-line text-foreground hover:border-foreground hover:bg-muted",
    ghostDark: "border border-white/25 text-surface-dark-foreground hover:border-white/50 hover:bg-white/10",
    quiet: "text-muted-foreground hover:text-foreground",
  }[variant];
  const classes = cn(base, sizes, variants, className);
  if (href)
    return (
      <a href={href} className={classes} {...rest}>
        {children}
      </a>
    );
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes} {...rest}>
      {children}
    </button>
  );
}
