import React, { useMemo, useState } from "react";
import EpisodeCard from "../components/EpisodeCard";
import episodes, { getAllThemes } from "../data/episodes";

/**
 * Episodes
 * -----------------------------------------------------------------------
 * The full library: every episode, with a search bar (title, theme,
 * keywords) and theme filter chips. Both the filter chip list and the
 * results are derived from src/data/episodes.js, so a brand-new theme
 * shows up here automatically.
 * -----------------------------------------------------------------------
 */
function Episodes() {
  const [query, setQuery] = useState("");
  const [activeTheme, setActiveTheme] = useState("All");

  const themes = useMemo(() => ["All", ...getAllThemes()], []);

  const filteredEpisodes = useMemo(() => {
    const q = query.trim().toLowerCase();

    return episodes.filter((episode) => {
      const matchesTheme =
        activeTheme === "All" || episode.theme === activeTheme;

      if (!matchesTheme) return false;
      if (!q) return true;

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
  }, [query, activeTheme]);

  return (
    <div className="episodes-page">
      <div className="container episodes-header">
        <p className="eyebrow">The Full Library</p>
        <h1>All Episodes</h1>
        <p className="episodes-subtext">
          Search by title, theme or keyword, or browse the shelves by theme.
        </p>

        {/* Search bar */}
        <div className="episodes-search">
          <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
            <circle
              cx="10.5"
              cy="10.5"
              r="6.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
            <line
              x1="15.3"
              y1="15.3"
              x2="21"
              y2="21"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          <input
            type="text"
            placeholder="Search episodes, themes, or keywords..."
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            aria-label="Search episodes"
          />
        </div>

        {/* Theme filter chips */}
        <div className="episodes-filters" role="tablist" aria-label="Filter by theme">
          {themes.map((theme) => (
            <button
              key={theme}
              role="tab"
              aria-selected={activeTheme === theme}
              className={`episodes-filter-chip ${
                activeTheme === theme ? "is-active" : ""
              }`}
              onClick={() => setActiveTheme(theme)}
            >
              {theme}
            </button>
          ))}
        </div>
      </div>

      <div className="container episodes-grid">
        {filteredEpisodes.length === 0 ? (
          <p className="episodes-empty">
            No episodes match that search yet. Try a different word or theme.
          </p>
        ) : (
          filteredEpisodes.map((episode) => (
            <EpisodeCard
              key={episode.id}
              episode={episode}
              episodeNumber={`Episode ${String(episode.id).padStart(2, "0")}`}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default Episodes;
