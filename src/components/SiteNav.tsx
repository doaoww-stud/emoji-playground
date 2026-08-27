import { Link, useNavigate } from "@tanstack/react-router";
import { EMOJIS } from "@/lib/emoji-data";

const LINKS = [
  { to: "/", label: "HOME" },
  { to: "/explore", label: "EXPLORE" },
  { to: "/favorites", label: "FAVORITES" },
];

export function SiteNav() {
  const navigate = useNavigate();

  const random = () => {
    const e = EMOJIS[Math.floor(Math.random() * EMOJIS.length)];
    navigate({ to: "/emoji/$slug", params: { slug: e.slug } });
  };

  return (
    <header className="sticky top-0 z-40 px-3 pt-3 sm:px-6 sm:pt-5">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-3 rounded-2xl hairline bg-paper/90 px-3 py-2 backdrop-blur-sm sm:px-5">
        <Link to="/" className="font-display text-lg font-extrabold tracking-tight sm:text-xl">
          <span className="mr-1 inline-block anim-twinkle">✦</span>EMOJI HUB
        </Link>

        <div className="flex items-center gap-1 sm:gap-2">
          {LINKS.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.to === "/" }}
              className="rounded-full px-2.5 py-1.5 font-mono text-[0.62rem] tracking-[0.16em] transition-colors hover:bg-sun/60 sm:px-3 sm:text-[0.7rem] [&.active]:bg-ink [&.active]:text-paper"
            >
              {l.label}
            </Link>
          ))}
          <button
            onClick={random}
            className="ml-1 rounded-full hairline bg-sun px-3 py-1.5 font-mono text-[0.62rem] tracking-[0.16em] transition-transform hover:-rotate-3 hover:scale-105 sm:text-[0.7rem]"
          >
            🎲 <span className="hidden sm:inline">RANDOM</span>
          </button>
          <span className="ml-2 hidden items-center gap-1.5 label-mono lg:flex">
            <span className="size-2 rounded-full bg-grass anim-twinkle" />
            ONLINE
          </span>
        </div>
      </nav>
    </header>
  );
}
