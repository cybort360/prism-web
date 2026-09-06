import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Mono } from "./primitives";

// Shared building blocks for long-form doc pages (/docs, /whitepaper).
export type TocItem = { id?: string; href?: string; n?: string; title: string };
export type TocGroup = { label?: string; items: TocItem[] };

export function P({ children }: { children: ReactNode }) {
  return <p className="mt-4 max-w-[70ch] text-[15px] leading-relaxed text-muted-foreground">{children}</p>;
}
export function Lead({ children }: { children: ReactNode }) {
  return <p className="mt-4 max-w-[62ch] text-[17px] leading-relaxed text-ink md:text-[19px]">{children}</p>;
}
export function Pre({ children }: { children: string }) {
  return (
    <pre className="mt-5 overflow-x-auto rounded-[12px] border border-line bg-paper px-5 py-4 font-mono text-[12.5px] leading-[1.65] text-ink">
      <code>{children}</code>
    </pre>
  );
}
export function Ul({ items }: { items: ReactNode[] }) {
  return (
    <ul className="mt-4 max-w-[70ch] space-y-1.5 text-[15px] leading-relaxed text-muted-foreground">
      {items.map((it, i) => (
        <li key={i} className="flex gap-2.5">
          <span aria-hidden="true" className="mt-2 size-1 shrink-0 rounded-full bg-jade" />
          <span>{it}</span>
        </li>
      ))}
    </ul>
  );
}
export function KV({ rows, head }: { rows: Array<[ReactNode, ReactNode]>; head?: [string, string] }) {
  return (
    <div className="mt-5 overflow-x-auto">
      <table className="w-full min-w-[420px] border-collapse text-left">
        {head ? (
          <thead>
            <tr className="border-b border-line">
              {head.map((h) => (
                <th
                  key={h}
                  className="py-2 pr-6 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
        ) : null}
        <tbody>
          {rows.map(([a, b], i) => (
            <tr key={i} className="border-b border-line/70 last:border-b-0">
              <td className="py-2.5 pr-6 align-top text-[14px] text-ink">{a}</td>
              <td className="py-2.5 align-top text-[14px] text-muted-foreground">{b}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export function Faq({ q, children }: { q: string; children: ReactNode }) {
  return (
    <div className="mt-8 first:mt-6">
      <h3 className="text-[17px] font-medium text-ink">{q}</h3>
      <div className="mt-2 max-w-[70ch] text-[15px] leading-relaxed text-muted-foreground">{children}</div>
    </div>
  );
}
export function DocSection({ id, n, title, children }: { id: string; n: string; title: string; children: ReactNode }) {
  return (
    <section id={id} className="scroll-mt-28 border-t border-line pt-12 first:border-t-0 first:pt-0 [&+section]:mt-14">
      <Mono className="text-jade-strong">{n}</Mono>
      <h2 className="display mt-3 text-[26px] md:text-[34px]">{title}</h2>
      {children}
    </section>
  );
}

function TocLink({ item }: { item: TocItem }) {
  const cls = "group flex gap-2.5 py-0.5 text-[13px] text-muted-foreground transition-colors hover:text-ink";
  const inner = (
    <>
      <span className="w-5 shrink-0 font-mono text-[11px] text-jade-strong">{item.n ?? ""}</span>
      <span className="group-hover:underline">{item.title}</span>
    </>
  );
  if (item.href?.startsWith("http")) {
    return (
      <a href={item.href} target="_blank" rel="noopener noreferrer" className={cls}>
        <span className="w-5 shrink-0 font-mono text-[11px] text-jade-strong">{item.n ?? ""}</span>
        <span className="group-hover:underline">{item.title} ↗</span>
      </a>
    );
  }
  if (item.href) {
    return (
      <Link to={item.href} className={cls}>
        {inner}
      </Link>
    );
  }
  return (
    <a href={`#${item.id}`} className={cls}>
      {inner}
    </a>
  );
}

export function DocLayout({ groups, hero, children }: { groups: TocGroup[]; hero: ReactNode; children: ReactNode }) {
  return (
    <main>
      <section className="deep relative overflow-hidden">
        <div className="shell pb-16 pt-32 md:pb-20 md:pt-36">{hero}</div>
      </section>
      <div className="shell grid gap-12 border-t border-line py-16 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-16 lg:py-20">
        <aside className="lg:sticky lg:top-24 lg:h-[calc(100svh-8rem)] lg:self-start lg:overflow-y-auto">
          <Mono className="text-muted-foreground">On this page</Mono>
          <nav aria-label="Contents" className="mt-4 flex flex-col gap-5">
            {groups.map((g, gi) => (
              <div key={gi} className="flex flex-col gap-1.5">
                {g.label ? <p className="mono-label pl-5 text-muted-foreground">{g.label}</p> : null}
                {g.items.map((item) => (
                  <TocLink key={item.title} item={item} />
                ))}
              </div>
            ))}
          </nav>
        </aside>
        <div className="min-w-0">{children}</div>
      </div>
    </main>
  );
}
