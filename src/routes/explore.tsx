import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { CATEGORIES, EMOJIS, type CategoryId } from "@/lib/emoji-data";
import { EmojiCard } from "@/components/EmojiCard";

type Search = { cat?: CategoryId; q?: string };

export const Route = createFileRoute("/explore")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    cat: (s.cat as CategoryId) || undefined,
    q: (s.q as string) || undefined,
  }),
  head: () => ({
    meta: [
      { title: "Emoji Explorer — Emoji Hub" },
      { name: "description", content: "Search and filter the emoji wall. Find the one that feels right." },
      { property: "og:title", content: "Emoji Explorer — Emoji Hub" },
      { property: "og:description", content: "Search, filter and collect emojis on the sticker wall." },
    ],
  }),
  component: Explore,
});

const FILTERS: { id: CategoryId; char: string; label: string }[] = [
  { id: "feelings", char: "😀", label: "FEELINGS" },
  { id: "animals", char: "🐸", label: "ANIMALS" },
  { id: "food", char: "🍕", label: "FOOD" },
  { id: "love", char: "❤️", label: "LOVE" },
  { id: "travel", char: "🚀", label: "TRAVEL" },
  { id: "symbols", char: "✨", label: "MAGIC" },
  { id: "chaos", char: "💀", label: "CHAOS" },
  { id: "objects", char: "💡", label: "OBJECTS" },
  { id: "activities", char: "⚽", label: "ACTIVITIES" },
];

function Explore() {
  const { cat } = Route.useSearch();
  const navigate = Route.useNavigate();
  const [q, setQ] = useState("");

  const results = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return EMOJIS.filter((e) => {
      if (cat && e.category !== cat) return false;
      if (!needle) return true;
      return (
        e.name.toLowerCase().includes(needle) ||
        e.desc.toLowerCase().includes(needle) ||
        e.tags.some((t) => t.includes(needle)) ||
        e.char === needle
      );
    });
  }, [q, cat]);

  return (
    <main className="mx-auto max-w-6xl px-4 pt-10 pb-24 sm:px-6">
      <span className="label-mono">EMOJI_HUB / 002 — WALL</span>
      <h1 className="mt-3 font-display text-[clamp(2.5rem,9vw,5.5rem)] leading-[0.88] font-extrabold tracking-[-0.04em]">
        EMOJI <span className="inline-block anim-bob">EXPLORER</span>
      </h1>
      <p className="mt-4 max-w-md text-lg text-muted-foreground">Find the one that feels right.</p>

      <div className="mt-8 flex items-center gap-3 rounded-full hairline bg-paper px-5 py-3 shadow-[3px_3px_0_var(--ink)]">
        <span className="text-xl">🔍</span>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="What are you looking for?"
          className="w-full bg-transparent font-sans text-base outline-none placeholder:text-muted-foreground"
        />
        {q && (
          <button onClick={() => setQ("")} className="label-mono hover:text-ink">
            CLEAR ✕
          </button>
        )}
      </div>

      <div className="mt-6 flex flex-wrap gap-2.5">
        <button
          onClick={() => navigate({ search: {} })}
          className={`rounded-full hairline px-3.5 py-2 font-mono text-[0.65rem] tracking-[0.14em] transition-transform hover:-translate-y-0.5 ${!cat ? "bg-ink text-paper" : "bg-paper"}`}
          style={{ transform: "rotate(-1deg)" }}
        >
          ✦ ALL
        </button>
        {FILTERS.map((f, i) => (
          <button
            key={f.id}
            onClick={() => navigate({ search: { cat: cat === f.id ? undefined : f.id } })}
            style={{ transform: `rotate(${((i % 3) - 1) * 1.4}deg)` }}
            className={`rounded-full hairline px-3.5 py-2 font-mono text-[0.65rem] tracking-[0.14em] transition-transform hover:-translate-y-0.5 hover:scale-105 ${cat === f.id ? "bg-ink text-paper" : "bg-paper"}`}
          >
            {f.char} {f.label}
          </button>
        ))}
      </div>

      <div className="mt-8 flex items-center justify-between label-mono">
        <span>{String(results.length).padStart(3, "0")} RESULTS</span>
        <span>SORTED BY VIBE ↗</span>
      </div>

      {results.length === 0 ? (
        <div className="mt-16 text-center">
          <div className="text-7xl anim-bob">🫥</div>
          <p className="mt-6 font-display text-2xl font-bold">Nothing matches that.</p>
          <p className="mt-2 text-muted-foreground">Try something shorter, or vaguer.</p>
        </div>
      ) : (
        <div className="mt-6 columns-2 gap-4 [column-fill:balance] sm:columns-3 lg:columns-4">
          {results.map((e, i) => (
            <div key={e.slug} className="mb-4 break-inside-avoid" style={{ paddingTop: i % 5 === 2 ? 18 : 0 }}>
              <EmojiCard emoji={e} size={i % 7 === 0 ? "lg" : i % 3 === 1 ? "sm" : "md"} />
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
