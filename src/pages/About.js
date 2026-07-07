import React from "react";
import { Link } from "react-router-dom";

/**
 * About
 * -----------------------------------------------------------------------
 * Explains the project. Kept as its own page component (rather than a
 * modal or section) so it has a clean, linkable /about route.
 * -----------------------------------------------------------------------
 */
function About() {
  return (
    <div className="container about-page">
      <p className="eyebrow">The Project</p>
      <h1>About Podcast to Pages</h1>

      <p className="about-lede">
        Podcast to Pages is a place where conversations become essays, and
        essays become podcast episodes.
      </p>

      <div className="about-body">
        <p>
          It began as a simple idea: the best moments from a podcast rarely
          come from the recording itself &mdash; they come from sitting with
          an idea afterward, turning it over, and writing down what it
          actually meant. This project is that second half, made public.
        </p>
        <p>
          Every episode published here started life as an article on Medium.
          Rather than choosing between the two formats, each one now lives as
          both: a page to read at your own pace, in your own voice in your
          head, and an episode to listen to when your hands are busy and your
          eyes are elsewhere.
        </p>
        <p>
          There's no schedule to keep up with and no feed to fall behind on.
          Just a small, growing shelf of episodes, organized by the themes
          that keep showing up in life &mdash; growth, friendship, love,
          society, and everything in between.
        </p>
      </div>

      <Link to="/episodes" className="btn-primary">
        Start Reading
      </Link>
    </div>
  );
}

export default About;
