import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Episodes from "./pages/Episodes";
import EpisodeReader from "./pages/EpisodeReader";
import About from "./pages/About";

// Global styles first, then page-specific styles
import "./styles/global.css";
import "./styles/navbar.css";
import "./styles/home.css";
import "./styles/episodes.css";
import "./styles/reader.css";

/**
 * App
 * -----------------------------------------------------------------------
 * Top-level component: sets up client-side routing and the shared
 * page shell (Navbar + page content + Footer).
 *
 * Routes:
 *   /                 -> Home
 *   /about            -> About
 *   /episodes         -> Episodes (full library, search + filters)
 *   /episodes/:slug   -> EpisodeReader (single episode, read or listen)
 * -----------------------------------------------------------------------
 */
function App() {
  return (
    <BrowserRouter>
      <div className="page-shell">
        <Navbar />
        <main className="page-main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/episodes" element={<Episodes />} />
            <Route path="/episodes/:slug" element={<EpisodeReader />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
