import { Link } from "@tanstack/react-router";
import { ARCHIVE_COUNT } from "@/lib/emoji-data";

export function SiteFooter() {
  return (
    <footer className="rule-t">
      <div className="mx-auto grid max-w-[1400px] gap-10 px-4 py-14 sm:grid-cols-2 sm:px-8 lg:grid-cols-4">
        <div>
          <div className="font-display text-xl font-extrabold tracking-[-0.03em] uppercase">Emoji Hub</div>
          <p className="mt-3 max-w-[22ch] font-serif text-xl leading-tight italic">
            a catalogue of moods, kept in one place.
          </p>
        </div>

        <div>
          <div className="label-mono">In the archive</div>
          <div className="mt-2 font-display text-4xl font-extrabold tracking-[-0.04em]">
            {ARCHIVE_COUNT.toLocaleString("en-US")}
          </div>
          <div className="mt-1 label-mono">Emojis</div>
        </div>

        <div>
          <div className="label-mono">Index</div>
          <ul className="mt-3 space-y-1.5 font-mono text-[0.72rem] tracking-[0.1em] uppercase">
            <li><Link to="/" className="hover:underline">Home</Link></li>
            <li><Link to="/explore" className="hover:underline">Catalogue</Link></li>
            <li><Link to="/favorites" className="hover:underline">Saved</Link></li>
          </ul>
        </div>

        <div>
          <div className="label-mono">Social</div>
          <ul className="mt-3 space-y-1.5 font-mono text-[0.72rem] tracking-[0.1em] uppercase">
            <li><span className="cursor-default hover:underline">X ↗</span></li>
            <li><span className="cursor-default hover:underline">Instagram ↗</span></li>
            <li><span className="cursor-default hover:underline">TikTok ↗</span></li>
          </ul>
        </div>
      </div>

      <div className="rule-t">
        <div className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-2 px-4 py-4 label-mono sm:px-8">
          <span>© {new Date().getFullYear()} Emoji Hub</span>
          <span>Made with ♥ and emoji</span>
        </div>
      </div>
    </footer>
  );
}
