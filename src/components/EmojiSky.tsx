import { useEffect, useRef } from "react";

/** Restrained editorial background: paper grain, a few marks, 3 slow emoji. */
const FLOATERS = [
  { c: "✦", x: 8, y: 26, s: 16, d: 26 },
  { c: "🦋", x: 90, y: 34, s: 24, d: 30 },
  { c: "✶", x: 24, y: 78, s: 14, d: 24 },
  { c: "🪩", x: 72, y: 88, s: 22, d: 28 },
];

const MARKS = ["✦", "+", "·", "✶", "·", "×"];

export function EmojiSky() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.setProperty("--mx", String(e.clientX / window.innerWidth - 0.5));
        el.style.setProperty("--my", String(e.clientY / window.innerHeight - 0.5));
      });
    };
    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden paper-grain"
      style={{ ["--mx" as string]: 0, ["--my" as string]: 0 }}
    >
      {FLOATERS.map((f, i) => (
        <span
          key={i}
          className="absolute anim-drift text-ink/45 select-none max-sm:hidden"
          style={{
            left: `${f.x}%`,
            top: `${f.y}%`,
            fontSize: f.s,
            ["--dur" as string]: `${f.d}s`,
            animationDelay: `${i * -4}s`,
            translate: `calc(var(--mx) * ${(i % 3) * 10 + 8}px) calc(var(--my) * ${(i % 2) * 10 + 6}px)`,
            transition: "translate 0.6s cubic-bezier(0.2,0.9,0.3,1)",
          }}
        >
          {f.c}
        </span>
      ))}
      {Array.from({ length: 10 }).map((_, i) => (
        <span
          key={`m${i}`}
          className="absolute anim-twinkle font-mono text-ink/30"
          style={{
            left: `${(i * 41) % 96}%`,
            top: `${(i * 67) % 92}%`,
            fontSize: 8 + ((i * 5) % 5),
            animationDelay: `${(i % 5) * 0.8}s`,
          }}
        >
          {MARKS[i % MARKS.length]}
        </span>
      ))}
    </div>
  );
}
