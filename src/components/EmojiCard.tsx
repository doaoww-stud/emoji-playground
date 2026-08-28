import { Link } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { categoryLabel, type Emoji } from "@/lib/emoji-data";
import { useFavorites } from "@/lib/favorites";

export function FavButton({ slug, className = "" }: { slug: string; className?: string }) {
  const { isFavorite, toggle } = useFavorites();
  const active = isFavorite(slug);
  const [pop, setPop] = useState(false);
  return (
    <button
      aria-label={active ? "Remove from favorites" : "Save to favorites"}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle(slug);
        setPop(true);
        setTimeout(() => setPop(false), 450);
      }}
      className={`grid size-7 place-items-center border border-ink/25 bg-paper text-[0.8rem] transition-colors hover:border-ink hover:bg-sun ${active ? "border-ink bg-sun" : ""} ${pop ? "anim-pop" : ""} ${className}`}
    >
      {active ? "♥" : "♡"}
    </button>
  );
}

export function EmojiCard({ emoji, size = "md" }: { emoji: Emoji; size?: "sm" | "md" | "lg" }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const rot = ((emoji.name.length % 5) - 2) * 0.45;

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `rotate(0deg) translate(${x * 3}px, ${y * 3 - 4}px)`;
  };
  const reset = () => {
    if (ref.current) ref.current.style.transform = `rotate(${rot}deg)`;
  };

  const emojiSize = size === "lg" ? "text-7xl" : size === "sm" ? "text-4xl" : "text-5xl";

  return (
    <Link
      ref={ref}
      to="/emoji/$slug"
      params={{ slug: emoji.slug }}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ transform: `rotate(${rot}deg)` }}
      className="group relative block border border-ink/30 bg-paper p-4 transition-[box-shadow,background-color,border-color] duration-300 hover:border-ink hover:bg-cream hover:shadow-[6px_7px_0_rgb(23_21_18_/_0.1)]"
    >
      <div className="flex items-start justify-between gap-2">
        <span className="label-mono">{categoryLabel(emoji.category)}</span>
        <span className="opacity-100 transition-opacity duration-200 sm:opacity-0 sm:group-hover:opacity-100">
          <FavButton slug={emoji.slug} />
        </span>
      </div>

      <div
        className={`${emojiSize} mt-6 leading-none transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-108`}
      >
        {emoji.char}
      </div>

      <div className="mt-6 rule-t pt-3">
        <h3 className="font-mono text-[0.72rem] tracking-[0.1em] uppercase">{emoji.name}</h3>
        <p className="mt-1.5 font-serif text-base leading-snug text-muted-foreground italic">
          {emoji.desc}
        </p>
      </div>

      <span className="pointer-events-none absolute right-3 bottom-3 label-mono opacity-0 transition-opacity group-hover:opacity-100">
        Open ↗
      </span>
    </Link>
  );
}
