import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "../styles/navbar.css";

/**
 * Navbar
 * -----------------------------------------------------------------------
 * Top navigation, styled like the spine label on a book. Collapses into
 * a simple slide-down menu on mobile/tablet widths.
 * -----------------------------------------------------------------------
 */
function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <NavLink to="/" className="navbar-brand" onClick={closeMenu}>
          <img
            src="/podcast-to-pages.png"
            alt="Podcast to Pages"
            className="navbar-brand-logo"
          />
          <span className="navbar-brand-text">Podcast to Pages</span>
        </NavLink>

        {/* Desktop links */}
        <nav className="navbar-links">
          <NavLink to="/" className="navbar-link" end>
            Home
          </NavLink>
          <NavLink to="/episodes" className="navbar-link">
            Episodes
          </NavLink>
          <NavLink to="/about" className="navbar-link">
            About
          </NavLink>
        </nav>

        {/* Mobile toggle */}
        <button
          className={`navbar-toggle ${isMenuOpen ? "is-open" : ""}`}
          aria-label="Toggle navigation menu"
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Mobile menu panel */}
      <nav className={`navbar-mobile-menu ${isMenuOpen ? "is-open" : ""}`}>
        <NavLink to="/" className="navbar-mobile-link" onClick={closeMenu} end>
          Home
        </NavLink>
        <NavLink
          to="/episodes"
          className="navbar-mobile-link"
          onClick={closeMenu}
        >
          Episodes
        </NavLink>
        <NavLink to="/about" className="navbar-mobile-link" onClick={closeMenu}>
          About
        </NavLink>
      </nav>
    </header>
  );
}

export default Navbar;
