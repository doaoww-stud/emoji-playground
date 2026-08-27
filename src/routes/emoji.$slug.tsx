import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { CATEGORIES, EMOJIS, categoryLabel, findEmoji, HTML_ENTITY } from "@/lib/emoji-data";
import { FavButton } from "@/components/EmojiCard";

export const Route = createFileRoute("/emoji/$slug")({
  loader: ({ params }) => {
    const emoji = findEmoji(params.slug);
    if (!emoji) throw notFound();
    return emoji;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.name ?? "Emoji"} — Emoji Hub` },
      { name: "description", content: loaderData?.desc ?? "An emoji from the Emoji Hub universe." },
      { property: "og:title", content: `${loaderData?.name ?? "Emoji"} — Emoji Hub` },
      { property: "og:description", content: loaderData?.desc ?? "An emoji from the Emoji Hub universe." },
    ],
  }),
  component: Detail,
});

function Detail() {
  const emoji = Route.useLoaderData();
  const [copied, setCopied] = useState(false);
  const tint = CATEGORIES.find((c) => c.id === emoji.category)?.tint ?? "var(--sun)";

  const related = EMOJIS.filter((e) => e.category === emoji.category && e.slug !== emoji.slug).slice(0, 6);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(emoji.char);
    } catch {
      /* ignore */
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  return (
    <main className="mx-auto max-w-4xl px-4 pt-8 pb-24 sm:px-6">
      <Link to="/explore" className="label-mono hover:text-ink">
        ← BACK TO THE WALL
      </Link>

      <div
        className="mt-6 rounded-3xl hairline p-8 text-center shadow-[5px_6px_0_var(--ink)] sm:p-14"
        style={{ background: `color-mix(in oklab, ${tint} 35%, var(--paper))` }}
      >
        <span className="label-mono">{categoryLabel(emoji.category).toUpperCase()} · {emoji.code}</span>
        <div className="mt-6 text-[clamp(6rem,28vw,14rem)] leading-none anim-bob select-none">{emoji.char}</div>
        <h1 className="mt-8 font-display text-[clamp(1.8rem,6vw,3.5rem)] leading-none font-extrabold tracking-[-0.03em] uppercase">
          {emoji.name}
        </h1>
        <p className="mx-auto mt-4 max-w-md text-lg text-muted-foreground">{emoji.desc}</p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={copy}
            className="rounded-full hairline bg-ink px-6 py-3 font-mono text-xs tracking-[0.16em] text-paper transition-transform hover:-translate-y-1"
          >
            {copied ? "✓ COPIED" : "COPY"}
          </button>
          <div className="flex items-center gap-2 rounded-full hairline bg-paper py-1.5 pr-4 pl-1.5">
            <FavButton slug={emoji.slug} />
            <span className="font-mono text-xs tracking-[0.16em]">SAVE</span>
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        {[
          ["CODEPOINT", emoji.code],
          ["HTML", HTML_ENTITY(emoji.char)],
          ["TAGS", emoji.tags.join(" · ")],
        ].map(([k, v]) => (
          <div key={k} className="rounded-xl hairline bg-paper p-4">
            <div className="label-mono">{k}</div>
            <div className="mt-1.5 font-mono text-sm break-all">{v}</div>
          </div>
        ))}
      </div>

      {related.length > 0 && (
        <section className="mt-16">
          <div className="flex items-end justify-between">
            <h2 className="font-display text-2xl font-extrabold tracking-tight">SAME ENERGY</h2>
            <span className="label-mono">✶ RELATED</span>
          </div>
          <div className="mt-6 flex flex-wrap gap-4">
            {related.map((e, i) => (
              <Link
                key={e.slug}
                to="/emoji/$slug"
                params={{ slug: e.slug }}
                title={e.name}
                style={{ transform: `rotate(${((i % 4) - 1.5) * 2}deg)` }}
                className="grid size-20 place-items-center rounded-2xl sticker sticker-lift text-4xl"
              >
                {e.char}
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
