import { createFileRoute, Link } from "@tanstack/react-router";
import { EMOJIS } from "@/lib/emoji-data";
import { useFavorites } from "@/lib/favorites";
import { EmojiCard } from "@/components/EmojiCard";

export const Route = createFileRoute("/favorites")({
  head: () => ({
    meta: [
      { title: "My Little Collection — Emoji Hub" },
      { name: "description", content: "Your personal emoji sticker wall — the emojis that just feel right." },
      { property: "og:title", content: "My Little Collection — Emoji Hub" },
      { property: "og:description", content: "A scrapbook of your saved emojis." },
    ],
  }),
  component: Favorites,
});

function Favorites() {
  const { favorites } = useFavorites();
  const saved = EMOJIS.filter((e) => favorites.includes(e.slug));

  return (
    <main className="mx-auto max-w-5xl px-4 pt-10 pb-24 sm:px-6">
      <span className="label-mono">EMOJI_HUB / 003 — SCRAPBOOK</span>
      <h1 className="mt-3 font-display text-[clamp(2.4rem,8vw,5rem)] leading-[0.88] font-extrabold tracking-[-0.04em]">
        MY LITTLE
        <br />
        COLLECTION <span className="inline-block text-4xl anim-bob">💛</span>
      </h1>
      <p className="mt-4 text-lg text-muted-foreground">The emojis that just feel right.</p>

      {saved.length === 0 ? (
        <div className="mt-16 rounded-3xl border-2 border-dashed border-ink/25 px-6 py-20 text-center">
          <div className="text-6xl anim-bob">🫙</div>
          <p className="mt-6 font-display text-2xl font-bold">No favorites yet 💛</p>
          <p className="mt-2 text-muted-foreground">Tap the little heart on any emoji to pin it here.</p>
          <Link
            to="/explore"
            className="mt-8 inline-block rounded-full hairline bg-sun px-6 py-3 font-mono text-xs tracking-[0.16em] transition-transform hover:-translate-y-1"
          >
            GO COLLECT SOME →
          </Link>
        </div>
      ) : (
        <>
          <div className="mt-8 label-mono">{String(saved.length).padStart(3, "0")} PINNED ✦</div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {saved.map((e) => (
              <EmojiCard key={e.slug} emoji={e} />
            ))}
          </div>
        </>
      )}
    </main>
  );
}
