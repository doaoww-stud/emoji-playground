import { Link } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { CATEGORIES, categoryLabel, type Emoji } from "@/lib/emoji-data";
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
      className={`grid size-8 place-items-center rounded-full hairline bg-paper text-sm transition-colors hover:bg-blush ${active ? "bg-blush" : ""} ${pop ? "anim-pop" : ""} ${className}`}
    >
      {active ? "❤️" : "♡"}
    </button>
  );
}

export function EmojiCard({ emoji, size = "md" }: { emoji: Emoji; size?: "sm" | "md" | "lg" }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const tint = CATEGORIES.find((c) => c.id === emoji.category)?.tint ?? "var(--sun)";
  const rot = ((emoji.name.length % 5) - 2) * 0.8;

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `rotate(${rot}deg) translate(-2px,-3px) rotateX(${-y * 8}deg) rotateY(${x * 10}deg)`;
  };
  const reset = () => {
    if (ref.current) ref.current.style.transform = `rotate(${rot}deg)`;
  };

  const emojiSize = size === "lg" ? "text-7xl" : size === "sm" ? "text-4xl" : "text-6xl";

  return (
    <Link
      ref={ref}
      to="/emoji/$slug"
      params={{ slug: emoji.slug }}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ transform: `rotate(${rot}deg)`, ["--tint" as string]: tint }}
      className="group relative block rounded-2xl sticker p-4 [transform-style:preserve-3d] hover:!shadow-[4px_5px_0_var(--ink)] hover:bg-[color-mix(in_oklab,var(--tint)_45%,var(--paper))]"
    >
      <div className="mb-3 flex items-start justify-between">
        <span className="label-mono">{categoryLabel(emoji.category)}</span>
        <FavButton slug={emoji.slug} />
      </div>
      <div
        className={`${emojiSize} leading-none transition-transform duration-300 group-hover:scale-115 group-hover:-rotate-6`}
      >
        {emoji.char}
      </div>
      <div className="mt-4">
        <h3 className="font-display text-base leading-tight font-bold">{emoji.name}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{emoji.desc}</p>
      </div>
      <span className="mt-3 inline-block label-mono opacity-0 transition-opacity group-hover:opacity-100">
        OPEN ↗
      </span>
    </Link>
  );
}
