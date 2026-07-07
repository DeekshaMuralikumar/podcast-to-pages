import React from "react";
import { Link } from "react-router-dom";

/**
 * Footer
 * -----------------------------------------------------------------------
 * Closing section of every page, styled like the inside back cover of
 * a book.
 * -----------------------------------------------------------------------
 */
function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container site-footer-inner">
        <div className="site-footer-brand">
          <img
            src="/podcast-to-pages.png"
            alt="Podcast to Pages"
            className="site-footer-logo"
          />
          <div>
            <p className="site-footer-title">Podcast to Pages</p>
            <p className="site-footer-tagline">
              Episodes written instead of recorded.
            </p>
          </div>
        </div>

        <nav className="site-footer-links">
          <Link to="/">Home</Link>
          <Link to="/episodes">Episodes</Link>
          <Link to="/about">About</Link>
        </nav>
      </div>

      <div className="container">
        <p className="site-footer-copy">
          &copy; {year} Podcast to Pages. Written first, read always.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
