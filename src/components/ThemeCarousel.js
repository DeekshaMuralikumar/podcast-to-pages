import React, { useEffect, useRef, useState } from "react";
import EpisodeCard from "./EpisodeCard";
import useFadeIn from "../hooks/useFadeIn";

/**
 * ThemeCarousel
 * -----------------------------------------------------------------------
 * Renders one horizontally-scrollable row of EpisodeCards for a given
 * theme. The Home page generates one of these per unique theme found
 * in the episodes data - no theme name is ever hardcoded here.
 *
 * Props:
 *   theme       - string, e.g. "Growth"
 *   episodes    - array of episode objects belonging to that theme
 *   hideHeader  - if true, skips the built-in "Theme / Name" header,
 *                 useful when the parent page renders its own heading
 *                 (e.g. the "Latest Episodes" row on Home)
 * -----------------------------------------------------------------------
 */
function ThemeCarousel({ theme, episodes, hideHeader = false }) {
  const trackRef = useRef(null);
  const sectionRef = useFadeIn();
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollState = () => {
    const track = trackRef.current;

    if (!track) {
      return;
    }

    const { scrollLeft, scrollWidth, clientWidth } = track;
    setCanScrollLeft(scrollLeft > 2);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 2);
  };

  useEffect(() => {
    updateScrollState();

    const track = trackRef.current;
    const handleScroll = () => updateScrollState();

    if (track) {
      track.addEventListener("scroll", handleScroll, { passive: true });
      window.addEventListener("resize", handleScroll);
    }

    return () => {
      if (track) {
        track.removeEventListener("scroll", handleScroll);
      }
      window.removeEventListener("resize", handleScroll);
    };
  }, [episodes.length]);

  const scrollByAmount = (amount) => {
    if (trackRef.current) {
      const item = trackRef.current.querySelector(".theme-carousel-item");
      const itemWidth = item?.getBoundingClientRect().width || 300;
      const gap = 22;
      trackRef.current.scrollBy({ left: amount * (itemWidth + gap), behavior: "smooth" });
    }
  };

  return (
    <section
      className="theme-carousel fade-in-section"
      ref={sectionRef}
      aria-label={`${theme || "Latest"} episodes`}
    >
      {!hideHeader && (
        <div className="container theme-carousel-header">
          <div>
            <p className="eyebrow">Theme</p>
            <h2 className="theme-carousel-title">{theme}</h2>
          </div>
          <div className="theme-carousel-controls">
            <button
              type="button"
              aria-label={`Scroll ${theme} carousel left`}
              onClick={() => scrollByAmount(-1)}
              disabled={!canScrollLeft}
            >
              &#8592;
            </button>
            <button
              type="button"
              aria-label={`Scroll ${theme} carousel right`}
              onClick={() => scrollByAmount(1)}
              disabled={!canScrollRight}
            >
              &#8594;
            </button>
          </div>
        </div>
      )}

      <div className="theme-carousel-track" ref={trackRef}>
        {episodes.map((episode) => (
          <div className="theme-carousel-item" key={episode.id}>
            <EpisodeCard episode={episode} />
          </div>
        ))}
      </div>
    </section>
  );
}

export default ThemeCarousel;
