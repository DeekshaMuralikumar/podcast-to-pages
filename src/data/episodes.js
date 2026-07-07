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
    readTime: "3 min",
    description:
      "Some relationships end without conflict. They simply run out of room to grow.",
    keywords: ["growth", "friendship", "change", "letting go"],
    articleFile: "/articles/epi1.md",
    audio: "/audio/epi1.mp3",
    cover: "/images/outgrow.webp",
  }
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
