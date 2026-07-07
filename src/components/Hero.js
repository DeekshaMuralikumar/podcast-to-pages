import React from "react";
import { Link } from "react-router-dom";

/**
 * Hero
 * -----------------------------------------------------------------------
 * The opening section of the Home page. Designed to feel like the
 * open title page of a book: a lot of quiet paper, one confident
 * line of type, and a single way in ("Open The Book").
 * -----------------------------------------------------------------------
 */
function Hero() {
  return (
    <section className="hero">
      <div className="container hero-inner">
        <p className="eyebrow">A Digital Library</p>
        <h1 className="hero-title">Podcast to Pages</h1>
        <p className="hero-tagline">
          Episodes written instead of recorded.
        </p>
        <p className="hero-subtext">
          Every episode of the show, retold as an essay you can read at your
          own pace &mdash; or press play, and let it be read to you instead.
        </p>
        <Link to="/episodes" className="btn-primary hero-cta">
          Open The Book
        </Link>
      </div>

      {/* Decorative page-edge, purely visual, hidden from screen readers */}
      <div className="hero-page-edge" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
    </section>
  );
}

export default Hero;
