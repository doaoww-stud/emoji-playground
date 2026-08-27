import { useEffect, useRef } from "react";

const FLOATERS = [
  { c: "😂", x: 6, y: 14, s: 40, d: 21 },
  { c: "✨", x: 22, y: 8, s: 22, d: 15 },
  { c: "🪩", x: 88, y: 18, s: 44, d: 24 },
  { c: "❤️", x: 78, y: 62, s: 26, d: 19 },
  { c: "👀", x: 12, y: 55, s: 30, d: 17 },
  { c: "🚀", x: 60, y: 88, s: 28, d: 22 },
  { c: "🦋", x: 34, y: 74, s: 32, d: 20 },
  { c: "💀", x: 92, y: 82, s: 26, d: 16 },
  { c: "🍕", x: 46, y: 30, s: 22, d: 25 },
  { c: "🐸", x: 68, y: 40, s: 24, d: 18 },
];

const MARKS = ["✦", "✶", "·", "☆", "+", "✧", "·", "✦"];

export function EmojiSky() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const nx = e.clientX / window.innerWidth - 0.5;
        const ny = e.clientY / window.innerHeight - 0.5;
        el.style.setProperty("--mx", String(nx));
        el.style.setProperty("--my", String(ny));
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
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden grid-paper"
      style={{ ["--mx" as string]: 0, ["--my" as string]: 0 }}
    >
      {FLOATERS.map((f, i) => (
        <span
          key={i}
          className="absolute anim-drift select-none opacity-[0.45] max-sm:opacity-30"
          style={{
            left: `${f.x}%`,
            top: `${f.y}%`,
            fontSize: f.s,
            ["--dur" as string]: `${f.d}s`,
            animationDelay: `${i * -2.3}s`,
            translate: `calc(var(--mx) * ${(i % 4) * 12 + 10}px) calc(var(--my) * ${(i % 3) * 12 + 8}px)`,
            transition: "translate 0.5s cubic-bezier(0.2,0.9,0.3,1)",
          }}
        >
          {f.c}
        </span>
      ))}
      {Array.from({ length: 26 }).map((_, i) => (
        <span
          key={`m${i}`}
          className="absolute anim-twinkle font-mono text-ink/40"
          style={{
            left: `${(i * 37) % 97}%`,
            top: `${(i * 53) % 95}%`,
            fontSize: 8 + ((i * 7) % 9),
            animationDelay: `${(i % 7) * 0.6}s`,
          }}
        >
          {MARKS[i % MARKS.length]}
        </span>
      ))}
    </div>
  );
}
