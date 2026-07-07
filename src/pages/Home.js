import React from "react";
import Hero from "../components/Hero";
import EpisodeCard from "../components/EpisodeCard";
import episodes from "../data/episodes";
import useFadeIn from "../hooks/useFadeIn";

/**
 * Home
 * -----------------------------------------------------------------------
 * Landing page: Hero -> small featured list of the latest episodes.
 * The full theme-based browsing experience lives on the Episodes page.
 * -----------------------------------------------------------------------
 */
function Home() {
  // "Latest" = the most recently published episodes, newest first
  const latestEpisodes = [...episodes]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 4);

  const latestSectionRef = useFadeIn();

  return (
    <>
      <Hero />

      <section
        className="fade-in-section"
        ref={latestSectionRef}
        aria-label="Latest episodes"
      >
        <div className="container section-heading">
          <p className="eyebrow">Fresh Off The Press</p>
          <h2>Latest Episodes</h2>
        </div>

        <div className="container latest-episodes-row">
          {latestEpisodes.map((episode) => (
            <EpisodeCard key={episode.id} episode={episode} />
          ))}
        </div>
      </section>
    </>
  );
}

export default Home;
