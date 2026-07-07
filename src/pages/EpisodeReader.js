import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import AudioPlayer from "../components/AudioPlayer";
import {
  getEpisodeBySlug,
  getAdjacentEpisodes,
} from "../data/episodes";
import { markdownToHtml, stripLeadingHeading } from "../utils/markdown";

/**
 * EpisodeReader
 * -----------------------------------------------------------------------
 * The "read" experience for a single episode. Fetches the episode's
 * Markdown file from public/articles/, renders it as large, book-like
 * typography, tracks reading progress with a top progress bar, and
 * offers Previous/Next navigation plus the custom AudioPlayer for
 * listening instead of reading.
 * -----------------------------------------------------------------------
 */
function EpisodeReader() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const episode = getEpisodeBySlug(slug);
  const { previous, next } = getAdjacentEpisodes(slug);

  const [articleHtml, setArticleHtml] = useState("");
  const [status, setStatus] = useState("loading"); // loading | ready | error
  const [progress, setProgress] = useState(0);

  // Fetch and convert the Markdown article whenever the slug changes
  useEffect(() => {
    if (!episode) {
      setStatus("error");
      return;
    }

    let isCancelled = false;
    setStatus("loading");
    window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });

    fetch(episode.articleFile)
      .then((response) => {
        if (!response.ok) throw new Error("Article not found");
        return response.text();
      })
      .then((markdown) => {
        if (isCancelled) return;
        const html = markdownToHtml(stripLeadingHeading(markdown));
        setArticleHtml(html);
        setStatus("ready");
      })
      .catch(() => {
        if (!isCancelled) setStatus("error");
      });

    return () => {
      isCancelled = true;
    };
  }, [episode, slug]);

  // Reading progress bar, based on scroll position within the article
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const percent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setProgress(Math.min(100, Math.max(0, percent)));
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [slug]);

  if (!episode) {
    return (
      <div className="container reader-not-found">
        <h1>Episode not found</h1>
        <p>That page hasn't been written yet.</p>
        <Link to="/episodes" className="btn-primary">
          Back to all episodes
        </Link>
      </div>
    );
  }

  return (
    <div className="reader-page">
      {/* Reading progress bar */}
      <div className="reader-progress-track" aria-hidden="true">
        <div
          className="reader-progress-fill"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="container reader-container">
        <button className="reader-back" onClick={() => navigate("/episodes")}>
          &#8592; All episodes
        </button>

        <header className="reader-header">
          <span className="episode-card-theme">{episode.theme}</span>
          <h1 className="reader-title">{episode.title}</h1>
          <div className="reader-meta">
            <span>{episode.readTime} read</span>
          </div>
        </header>

        {/* Listen instead of read */}
        <AudioPlayer src={episode.audio} title={episode.title} />

        {/* Article body */}
        <article className="reader-article">
          {status === "loading" && (
            <p className="reader-status">Turning the page...</p>
          )}
          {status === "error" && (
            <p className="reader-status">
              This article couldn't be loaded. Please try again later.
            </p>
          )}
          {status === "ready" && (
            <div dangerouslySetInnerHTML={{ __html: articleHtml }} />
          )}
        </article>

        {/* Previous / Next navigation */}
        <nav className="reader-pagination">
          {previous ? (
            <Link to={`/episodes/${previous.slug}`} className="reader-pagination-link reader-pagination-prev">
              <span className="reader-pagination-label">&#8592; Previous</span>
              <span className="reader-pagination-title">{previous.title}</span>
            </Link>
          ) : (
            <span className="reader-pagination-link reader-pagination-disabled" />
          )}

          {next ? (
            <Link to={`/episodes/${next.slug}`} className="reader-pagination-link reader-pagination-next">
              <span className="reader-pagination-label">Next &#8594;</span>
              <span className="reader-pagination-title">{next.title}</span>
            </Link>
          ) : (
            <span className="reader-pagination-link reader-pagination-disabled" />
          )}
        </nav>
      </div>
    </div>
  );
}

export default EpisodeReader;
