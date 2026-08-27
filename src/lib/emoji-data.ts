export type Emoji = {
  char: string;
  name: string;
  slug: string;
  category: CategoryId;
  desc: string;
  code: string;
  tags: string[];
};

export type CategoryId =
  | "feelings"
  | "love"
  | "animals"
  | "food"
  | "travel"
  | "activities"
  | "objects"
  | "symbols"
  | "chaos";

export const CATEGORIES: { id: CategoryId; char: string; label: string; tint: string }[] = [
  { id: "feelings", char: "😀", label: "Smileys", tint: "var(--sun)" },
  { id: "love", char: "❤️", label: "Love", tint: "var(--blush)" },
  { id: "animals", char: "🐶", label: "Animals", tint: "var(--grass)" },
  { id: "food", char: "🍕", label: "Food", tint: "var(--tangerine)" },
  { id: "travel", char: "🚀", label: "Travel", tint: "var(--sky)" },
  { id: "activities", char: "⚽", label: "Activities", tint: "var(--grass)" },
  { id: "objects", char: "💡", label: "Objects", tint: "var(--sun)" },
  { id: "symbols", char: "✨", label: "Symbols", tint: "var(--violet)" },
  { id: "chaos", char: "💀", label: "Chaos", tint: "var(--violet)" },
];

function cp(char: string) {
  const c = [...char].map((s) => "U+" + s.codePointAt(0)!.toString(16).toUpperCase());
  return c.join(" ");
}

function html(char: string) {
  return [...char].map((s) => `&#${s.codePointAt(0)};`).join("");
}

const raw: [string, string, CategoryId, string, string[]][] = [
  ["😂", "Face with Tears of Joy", "feelings", "Laughing so hard the eyes gave up.", ["lol", "funny", "cry"]],
  ["🥹", "Face Holding Back Tears", "feelings", "Touched, a little wobbly, still holding it together.", ["soft", "proud"]],
  ["💀", "Skull", "chaos", "Dead. Not literally. Mostly.", ["dead", "lol", "doom"]],
  ["🔥", "Fire", "symbols", "Certified hot. Use responsibly.", ["lit", "hot", "flame"]],
  ["✨", "Sparkles", "symbols", "Instant magic on any sentence.", ["magic", "shine", "cute"]],
  ["👀", "Eyes", "feelings", "Watching. Always watching.", ["look", "sus", "peek"]],
  ["🪩", "Mirror Ball", "activities", "The whole party in one sphere.", ["disco", "party", "dance"]],
  ["❤️", "Red Heart", "love", "The original and undefeated.", ["love", "heart"]],
  ["🫶", "Heart Hands", "love", "Affection, hand-delivered.", ["love", "cute", "hands"]],
  ["🥲", "Smiling Face with Tear", "feelings", "Fine. Everything is fine.", ["sad", "smile"]],
  ["😭", "Loudly Crying Face", "feelings", "Emotional flooding in progress.", ["cry", "sad"]],
  ["🤡", "Clown Face", "chaos", "For when the clown was you.", ["joke", "fool"]],
  ["🐸", "Frog", "animals", "Amphibian of the internet.", ["frog", "green"]],
  ["🐶", "Dog Face", "animals", "Unconditional, tail-wagging support.", ["dog", "pet"]],
  ["🐱", "Cat Face", "animals", "Judging you, gently.", ["cat", "pet"]],
  ["🦋", "Butterfly", "animals", "Delicate chaos with wings.", ["blue", "soft"]],
  ["🐙", "Octopus", "animals", "Eight arms, zero panic.", ["sea", "weird"]],
  ["🍕", "Pizza", "food", "A plan everyone agrees on.", ["food", "slice"]],
  ["🍜", "Steaming Bowl", "food", "Comfort in liquid form.", ["noodles", "warm"]],
  ["🍓", "Strawberry", "food", "Small, red, extremely smug.", ["fruit", "sweet"]],
  ["🧋", "Bubble Tea", "food", "Chewy little joy.", ["drink", "boba"]],
  ["🚀", "Rocket", "travel", "Departing immediately.", ["launch", "space"]],
  ["🛸", "Flying Saucer", "travel", "Unidentified but friendly.", ["ufo", "alien"]],
  ["🏝️", "Desert Island", "travel", "Out of office, forever.", ["beach", "holiday"]],
  ["🗿", "Moai", "chaos", "No thoughts. Stone face.", ["stone", "deadpan"]],
  ["⚽", "Soccer Ball", "activities", "Universal excuse to shout.", ["sport", "game"]],
  ["🎲", "Game Die", "activities", "Let fate decide it.", ["random", "luck"]],
  ["🎧", "Headphone", "objects", "Do not perceive me.", ["music", "sound"]],
  ["💡", "Light Bulb", "objects", "The idea, arriving late.", ["idea", "bright"]],
  ["📼", "Videocassette", "objects", "Nostalgia, rewound.", ["retro", "tape"]],
  ["🕯️", "Candle", "objects", "Atmosphere in one object.", ["calm", "warm"]],
  ["🌙", "Crescent Moon", "symbols", "Late-night thoughts approved.", ["night", "sleep"]],
  ["⭐", "Star", "symbols", "A gold star, for you.", ["star", "good"]],
  ["🫧", "Bubbles", "symbols", "Weightless and briefly perfect.", ["soft", "clean"]],
  ["🌀", "Cyclone", "chaos", "Everything, all at once.", ["spiral", "dizzy"]],
  ["😈", "Smiling Face with Horns", "chaos", "Mildly evil plans only.", ["devil", "bad"]],
  ["🤠", "Cowboy Hat Face", "chaos", "Yeehaw energy detected.", ["cowboy", "fun"]],
  ["💛", "Yellow Heart", "love", "Friendship, sunlit.", ["heart", "friend"]],
  ["💘", "Heart with Arrow", "love", "Direct hit.", ["cupid", "crush"]],
  ["🌻", "Sunflower", "love", "Facing the light on purpose.", ["flower", "sun"]],
];

export const EMOJIS: Emoji[] = raw.map(([char, name, category, desc, tags]) => ({
  char,
  name,
  slug: name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
  category,
  desc,
  code: cp(char),
  html: html(char),
  tags,
})) as Emoji[];

export const HTML_ENTITY = html;

export function findEmoji(slug: string) {
  return EMOJIS.find((e) => e.slug === slug);
}

export function categoryLabel(id: CategoryId) {
  return CATEGORIES.find((c) => c.id === id)?.label ?? id;
}
