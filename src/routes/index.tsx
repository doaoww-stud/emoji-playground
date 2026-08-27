import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { CATEGORIES, EMOJIS } from "@/lib/emoji-data";
import { EmojiCard } from "@/components/EmojiCard";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Emoji Hub — Emojis Have Vibes" },
      {
        name: "description",
        content:
          "An interactive emoji universe. Explore, search and collect the tiny characters that say it better than words.",
      },
      { property: "og:title", content: "Emoji Hub — Emojis Have Vibes" },
      {
        property: "og:description",
        content: "Explore 12,482 emojis in a playful, animated emoji universe.",
      },
    ],
  }),
  component: Home,
});

const HERO_CYCLE = ["🪩", "😂", "❤️", "✨", "🔥", "🥹", "👀"];
const TICKER = ["✦ FEELING GOOD", "😂 MOST USED TODAY", "✶ 12,482 IN THE UNIVERSE", "🪩 DISCO MODE AVAILABLE", "☆ NEW STICKERS WEEKLY"];

function Home() {
  const [heroIdx, setHeroIdx] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [surprise, setSurprise] = useState<(typeof EMOJIS)[number] | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width / 2) / r.width;
      const y = (e.clientY - r.top - r.height / 2) / r.height;
      el.style.setProperty("--tx", `${x * 26}px`);
      el.style.setProperty("--ty", `${y * 20}px`);
      el.style.setProperty("--rot", `${x * 12}deg`);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  const roll = () => {
    if (spinning) return;
    setSpinning(true);
    setSurprise(null);
    let n = 0;
    const t = setInterval(() => {
      setHeroIdx(Math.floor(Math.random() * HERO_CYCLE.length));
      n++;
      if (n > 12) {
        clearInterval(t);
        setSurprise(EMOJIS[Math.floor(Math.random() * EMOJIS.length)]);
        setSpinning(false);
      }
    }, 90);
  };

  const popular = ["face-with-tears-of-joy", "red-heart", "fire", "face-holding-back-tears", "skull", "sparkles", "eyes", "mirror-ball", "frog", "pizza", "rocket", "crescent-moon"]
    .map((s) => EMOJIS.find((e) => e.slug === s)!)
    .filter(Boolean);

  const scales = ["text-8xl", "text-5xl", "text-7xl", "text-6xl", "text-9xl", "text-5xl", "text-7xl", "text-8xl", "text-6xl", "text-5xl", "text-7xl", "text-6xl"];

  return (
    <main>
      {/* HERO */}
      <section className="relative mx-auto max-w-6xl px-4 pt-10 pb-16 sm:px-6 sm:pt-16">
        <div className="flex flex-wrap items-center justify-between gap-2 label-mono">
          <span>EMOJI_HUB / 001</span>
          <span>CURRENT MOOD: {HERO_CYCLE[heroIdx]}</span>
          <span className="hidden sm:inline">STATUS: FEELING GOOD</span>
        </div>

        <div className="mt-6 grid items-center gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="anim-rise">
            <h1 className="font-display text-[clamp(2.8rem,10vw,6.5rem)] leading-[0.86] font-extrabold tracking-[-0.04em]">
              EMOJIS
              <br />
              HAVE <span className="relative inline-block">VIBES
                <span className="absolute -right-6 -top-4 text-3xl anim-bob">✨</span>
              </span>.
            </h1>
            <p className="mt-5 max-w-md text-lg text-muted-foreground">
              Find the tiny character that says it better than words.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                to="/explore"
                className="rounded-full hairline bg-ink px-6 py-3 font-mono text-xs tracking-[0.16em] text-paper transition-transform hover:-translate-y-1 hover:rotate-[-1.5deg]"
              >
                EXPLORE EMOJIS →
              </Link>
              <button
                onClick={roll}
                className="rounded-full hairline bg-sun px-6 py-3 font-mono text-xs tracking-[0.16em] transition-transform hover:-translate-y-1 hover:rotate-[2deg]"
              >
                🎲 SURPRISE ME
              </button>
            </div>

            <div className="mt-8 flex items-center gap-4 label-mono">
              <span>12,482 EMOJIS IN THE UNIVERSE</span>
              <span className="anim-twinkle">✦</span>
            </div>
          </div>

          {/* hero composition */}
          <div
            ref={heroRef}
            className="relative mx-auto grid aspect-square w-full max-w-md place-items-center"
            style={{ ["--tx" as string]: "0px", ["--ty" as string]: "0px", ["--rot" as string]: "0deg" }}
          >
            <div className="absolute inset-6 rounded-full border-2 border-dashed border-ink/25" />
            <div className="absolute inset-16 rounded-full border border-ink/15" />
            <button
              onClick={roll}
              aria-label="Shuffle the hero emoji"
              className="relative z-10 text-[clamp(6rem,26vw,12rem)] leading-none anim-bob"
              style={{
                translate: "var(--tx) var(--ty)",
                rotate: "var(--rot)",
                transition: "translate 0.4s ease-out, rotate 0.4s ease-out",
              }}
            >
              {surprise ? surprise.char : HERO_CYCLE[heroIdx]}
            </button>
            {["😂", "❤️", "🔥", "🥹"].map((c, i) => (
              <span
                key={c}
                className="absolute text-3xl anim-drift sm:text-4xl"
                style={{
                  ["--dur" as string]: `${12 + i * 3}s`,
                  top: `${[8, 70, 20, 82][i]}%`,
                  left: `${[10, 6, 84, 78][i]}%`,
                }}
              >
                {c}
              </span>
            ))}
            {surprise && (
              <Link
                to="/emoji/$slug"
                params={{ slug: surprise.slug }}
                className="absolute bottom-0 rounded-full hairline bg-paper px-4 py-2 font-mono text-[0.65rem] tracking-[0.14em] anim-rise"
              >
                {surprise.name.toUpperCase()} ↗
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* TICKER */}
      <div className="overflow-hidden border-y border-ink/20 bg-ink py-2.5 text-paper">
        <div className="flex w-max anim-marquee gap-10 pr-10 font-mono text-[0.7rem] tracking-[0.2em] whitespace-nowrap">
          {[...TICKER, ...TICKER, ...TICKER, ...TICKER].map((t, i) => (
            <span key={i}>{t}</span>
          ))}
        </div>
      </div>

      {/* CATEGORIES */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-display text-[clamp(2rem,6vw,3.5rem)] leading-none font-extrabold tracking-[-0.03em]">
            FIND YOUR VIBE
          </h2>
          <span className="label-mono hidden sm:inline">08 CATEGORIES ✶</span>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {CATEGORIES.slice(0, 8).map((c, i) => (
            <Link
              key={c.id}
              to="/explore"
              search={{ cat: c.id }}
              style={{ transform: `rotate(${((i % 4) - 1.5) * 1.3}deg)`, ["--tint" as string]: c.tint }}
              className="group flex flex-col gap-3 rounded-2xl sticker sticker-lift p-5 hover:bg-[color-mix(in_oklab,var(--tint)_55%,var(--paper))]"
            >
              <span className="text-5xl transition-transform duration-300 group-hover:scale-125 group-hover:-rotate-12">
                {c.char}
              </span>
              <span className="font-display text-lg font-bold">{c.label}</span>
              <span className="label-mono">
                {String(i + 1).padStart(3, "0")} →
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* POPULAR */}
      <section className="mx-auto max-w-6xl px-4 pb-24 sm:px-6">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-display text-[clamp(2rem,6vw,3.5rem)] leading-none font-extrabold tracking-[-0.03em]">
            POPULAR RIGHT NOW
          </h2>
          <span className="label-mono hidden sm:inline">☆ HAND PICKED</span>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-2 gap-y-6 sm:gap-x-6">
          {popular.map((e, i) => (
            <Link
              key={e.slug}
              to="/emoji/$slug"
              params={{ slug: e.slug }}
              title={e.name}
              className={`${scales[i]} group relative leading-none transition-transform duration-300 hover:scale-125`}
              style={{
                transform: `rotate(${((i * 7) % 9) - 4}deg) translateY(${((i * 5) % 6) * 6 - 15}px)`,
                marginInline: `${-(i % 3) * 6}px`,
              }}
            >
              <span className="inline-block group-hover:animate-none">{e.char}</span>
              <span className="pointer-events-none absolute -bottom-5 left-1/2 -translate-x-1/2 rounded-full hairline bg-paper px-2 py-0.5 font-mono text-[0.55rem] tracking-widest whitespace-nowrap opacity-0 transition-opacity group-hover:opacity-100">
                {e.name.toUpperCase()}
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {popular.slice(0, 3).map((e) => (
            <EmojiCard key={e.slug} emoji={e} />
          ))}
        </div>
      </section>
    </main>
  );
}
