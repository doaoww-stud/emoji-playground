import { Link, useNavigate } from "@tanstack/react-router";
import { EMOJIS } from "@/lib/emoji-data";

const LINKS = [
  { to: "/", label: "Home" },
  { to: "/explore", label: "Catalogue" },
  { to: "/favorites", label: "Saved" },
];

export function SiteNav() {
  const navigate = useNavigate();

  const random = () => {
    const e = EMOJIS[Math.floor(Math.random() * EMOJIS.length)];
    navigate({ to: "/emoji/$slug", params: { slug: e.slug } });
  };

  return (
    <header className="sticky top-0 z-40 rule-b bg-background/92 backdrop-blur-[2px]">
      <div className="mx-auto grid max-w-[1400px] grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 py-3 sm:px-8">
        <div className="flex min-w-0 items-center gap-3">
          <Link to="/" className="font-display text-lg leading-none font-extrabold tracking-[-0.03em] whitespace-nowrap uppercase sm:text-xl">
            Emoji Hub
          </Link>
          <span className="anim-twinkle text-sun">✦</span>
          <span className="hidden min-w-0 border-l border-ink/20 pl-3 label-mono leading-[1.3] md:block">
            Internet archive
            <br />
            of emotions
          </span>
        </div>

        <nav className="flex items-center gap-1 sm:gap-2">
          {LINKS.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.to === "/" }}
              className="px-2 py-1.5 font-mono text-[0.66rem] tracking-[0.14em] uppercase transition-colors hover:text-ink [&.active]:underline [&.active]:decoration-sun [&.active]:decoration-[3px] [&.active]:underline-offset-[6px]"
            >
              {l.label}
            </Link>
          ))}
          <button
            onClick={random}
            className="ml-1 flex items-center gap-1.5 border border-ink bg-sun px-3 py-1.5 font-mono text-[0.66rem] tracking-[0.14em] uppercase transition-transform hover:-translate-y-0.5"
          >
            <span>⤨</span>
            <span className="hidden sm:inline">Random</span>
          </button>
          <span className="ml-2 hidden items-center gap-1.5 label-mono lg:flex">
            <span className="size-1.5 rounded-full bg-ink anim-twinkle" />
            Online
          </span>
        </nav>
      </div>
    </header>
  );
}
