import { useCallback, useEffect, useState } from "react";

const KEY = "emoji-hub-favorites";
const listeners = new Set<(v: string[]) => void>();
let cache: string[] = [];

function read(): string[] {
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
}

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>(cache);

  useEffect(() => {
    cache = read();
    setFavorites(cache);
    const fn = (v: string[]) => setFavorites(v);
    listeners.add(fn);
    return () => void listeners.delete(fn);
  }, []);

  const toggle = useCallback((slug: string) => {
    const next = cache.includes(slug) ? cache.filter((s) => s !== slug) : [...cache, slug];
    cache = next;
    localStorage.setItem(KEY, JSON.stringify(next));
    listeners.forEach((l) => l(next));
  }, []);

  return { favorites, toggle, isFavorite: (slug: string) => favorites.includes(slug) };
}
