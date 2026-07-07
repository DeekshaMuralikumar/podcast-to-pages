/**
 * episodes.js
 * -----------------------------------------------------------------------
 * This is the ONLY file you need to touch when adding a new episode.
 *
 * To publish a new episode:
 *   1. Write the article and save it as a Markdown file inside
 *      public/articles/your-slug.md
 *   2. Record/export the audio and save it inside
 *      public/audio/your-slug.mp3
 *   3. Add a new object to the array below.
 *
 * Everything else in the app (theme sections, carousels, routes,
 * cards, the reader page, search and filters) is generated
 * automatically from this array. You never need to edit a React
 * component to add an episode.
 * -----------------------------------------------------------------------
 */

const episodes = [
  {
    id: 1,
    slug: "outgrow-people",
    title: "You Outgrow People Without Hating Them",
    theme: "Growth",
    readTime: "5 min",
    date: "2026-01-12",
    description:
      "Some relationships end without conflict. They simply run out of room to grow.",
    keywords: ["growth", "friendship", "change", "letting go"],
    articleFile: "/articles/outgrow-people.md",
    audio: "/audio/outgrow-people.mp3",
    cover: "/images/outgrow.jpg",
  },
  {
    id: 2,
    slug: "embrace-uncertainty",
    title: "The Comfort of Not Knowing What's Next",
    theme: "Life Lessons",
    readTime: "6 min",
    date: "2026-02-03",
    description:
      "Certainty is a story we tell ourselves. Uncertainty is where the living happens.",
    keywords: ["uncertainty", "life lessons", "mindset", "peace"],
    articleFile: "/articles/embrace-uncertainty.md",
    audio: "/audio/embrace-uncertainty.mp3",
    cover: "/images/uncertainty.jpg",
  },
  {
    id: 3,
    slug: "quiet-strength",
    title: "Quiet Strength Doesn't Ask for an Audience",
    theme: "Growth",
    readTime: "4 min",
    date: "2026-02-18",
    description:
      "The loudest rooms rarely hold the strongest people in them.",
    keywords: ["strength", "growth", "resilience", "self-worth"],
    articleFile: "/articles/quiet-strength.md",
    audio: "/audio/quiet-strength.mp3",
    cover: "/images/quiet-strength.jpg",
  },
  {
    id: 4,
    slug: "the-friends-who-stay",
    title: "The Friends Who Stay Don't Keep Score",
    theme: "Friendship",
    readTime: "5 min",
    date: "2026-03-02",
    description:
      "Real friendship is measured in patience, not in favors returned.",
    keywords: ["friendship", "loyalty", "connection"],
    articleFile: "/articles/the-friends-who-stay.md",
    audio: "/audio/the-friends-who-stay.mp3",
    cover: "/images/friends-who-stay.jpg",
  },
  {
    id: 5,
    slug: "the-weight-of-being-easy",
    title: "The Weight of Being 'The Easy One'",
    theme: "Feminism",
    readTime: "7 min",
    date: "2026-03-20",
    description:
      "Being agreeable was never a personality. It was a survival skill.",
    keywords: ["feminism", "identity", "boundaries", "society"],
    articleFile: "/articles/the-weight-of-being-easy.md",
    audio: "/audio/the-weight-of-being-easy.mp3",
    cover: "/images/weight-of-easy.jpg",
  },
  {
    id: 6,
    slug: "love-without-urgency",
    title: "Love Without Urgency",
    theme: "Love",
    readTime: "5 min",
    date: "2026-04-08",
    description:
      "The best kind of love has never once made you chase it.",
    keywords: ["love", "relationships", "patience"],
    articleFile: "/articles/love-without-urgency.md",
    audio: "/audio/love-without-urgency.mp3",
    cover: "/images/love-without-urgency.jpg",
  },
  {
    id: 7,
    slug: "the-society-we-inherited",
    title: "The Society We Inherited, Not the One We Chose",
    theme: "Society",
    readTime: "8 min",
    date: "2026-04-27",
    description:
      "We are all fluent in rules nobody sat us down to teach.",
    keywords: ["society", "culture", "systems"],
    articleFile: "/articles/the-society-we-inherited.md",
    audio: "/audio/the-society-we-inherited.mp3",
    cover: "/images/society.jpg",
  },
];

export default episodes;

/**
 * Returns a sorted list of every unique theme found in the episodes
 * array. Used to build theme sections/carousels and filter options
 * without ever hardcoding a theme name in a component.
 */
export function getAllThemes() {
  const themes = episodes.map((episode) => episode.theme);
  return [...new Set(themes)].sort();
}

/**
 * Returns every episode belonging to a given theme.
 */
export function getEpisodesByTheme(theme) {
  return episodes.filter((episode) => episode.theme === theme);
}

/**
 * Finds a single episode by its slug (used on the reader page).
 */
export function getEpisodeBySlug(slug) {
  return episodes.find((episode) => episode.slug === slug);
}

/**
 * Given a slug, returns the previous and next episode in publish
 * order, so the reader page can offer "Previous" / "Next" navigation.
 */
export function getAdjacentEpisodes(slug) {
  const index = episodes.findIndex((episode) => episode.slug === slug);
  const previous = index > 0 ? episodes[index - 1] : null;
  const next = index < episodes.length - 1 ? episodes[index + 1] : null;
  return { previous, next };
}

/**
 * Simple search across title, theme, description and keywords.
 */
export function searchEpisodes(query) {
  const q = query.trim().toLowerCase();
  if (!q) return episodes;
  return episodes.filter((episode) => {
    const haystack = [
      episode.title,
      episode.theme,
      episode.description,
      ...(episode.keywords || []),
    ]
      .join(" ")
      .toLowerCase();
    return haystack.includes(q);
  });
}
