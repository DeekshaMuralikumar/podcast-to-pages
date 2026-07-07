import React from "react";
import { Link } from "react-router-dom";

/**
 * EpisodeCard
 * -----------------------------------------------------------------------
 * A single episode "card", styled like a small book jacket. Reused on
 * the Home carousels and on the Episodes page grid.
 *
 * Props:
 *   episode        - the episode data object
 *   episodeNumber  - optional display number (e.g. "Episode 03")
 * -----------------------------------------------------------------------
 */
function EpisodeCard({ episode, episodeNumber }) {
  return (
    <article className="episode-card">
      <Link to={`/episodes/${episode.slug}`} className="episode-card-cover-link">
        <div className="episode-card-cover">
          <img src={episode.cover} alt={`Cover art for ${episode.title}`} />
          {episodeNumber && (
            <span className="episode-card-number">{episodeNumber}</span>
          )}
        </div>
      </Link>

      <div className="episode-card-body">
        <span className="episode-card-theme">{episode.theme}</span>
        <h3 className="episode-card-title">
          <Link to={`/episodes/${episode.slug}`}>{episode.title}</Link>
        </h3>
        <p className="episode-card-description">{episode.description}</p>

        <div className="episode-card-meta">
          <span>{episode.readTime} read</span>
        </div>

        <div className="episode-card-actions">
          <Link
            to={`/episodes/${episode.slug}`}
            className="episode-card-action episode-card-action-read"
          >
            Read
          </Link>
          <Link
            to={`/episodes/${episode.slug}#listen`}
            className="episode-card-action episode-card-action-listen"
          >
            Listen
          </Link>
        </div>
      </div>
    </article>
  );
}

export default EpisodeCard;
