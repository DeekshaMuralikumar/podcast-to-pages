import { useEffect, useRef } from "react";

/**
 * useFadeIn
 * -----------------------------------------------------------------------
 * Small reusable hook that adds the "in-view" class (see global.css)
 * to an element once it scrolls into the viewport. Combine with the
 * "fade-in-section" class to get a gentle fade + rise animation
 * anywhere in the app, without repeating IntersectionObserver code
 * in every component.
 *
 * Usage:
 *   const ref = useFadeIn();
 *   <div ref={ref} className="fade-in-section">...</div>
 * -----------------------------------------------------------------------
 */
export default function useFadeIn(options = { threshold: 0.15 }) {
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        observer.unobserve(entry.target);
      }
    }, options);

    observer.observe(node);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return ref;
}
