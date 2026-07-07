/**
 * markdown.js
 * -----------------------------------------------------------------------
 * A deliberately small, dependency-free Markdown-to-HTML converter.
 * It only supports the subset of Markdown this project's articles use:
 * headings (#, ##, ###), paragraphs, bold (**text**), italics (*text*)
 * and blank-line-separated blocks. That keeps the app free of extra
 * npm packages while still letting writers use plain Markdown files.
 * -----------------------------------------------------------------------
 */

function escapeHtml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function formatInline(text) {
  let result = escapeHtml(text);
  // Bold: **text**
  result = result.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  // Italics: *text*
  result = result.replace(/\*(.+?)\*/g, "<em>$1</em>");
  return result;
}

export function markdownToHtml(markdown) {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const htmlBlocks = [];
  let paragraphBuffer = [];

  const flushParagraph = () => {
    if (paragraphBuffer.length > 0) {
      htmlBlocks.push(`<p>${formatInline(paragraphBuffer.join(" "))}</p>`);
      paragraphBuffer = [];
    }
  };

  lines.forEach((rawLine) => {
    const line = rawLine.trim();

    if (line === "") {
      flushParagraph();
      return;
    }

    const headingMatch = line.match(/^(#{1,3})\s+(.*)$/);
    if (headingMatch) {
      flushParagraph();
      const level = headingMatch[1].length;
      htmlBlocks.push(`<h${level + 1}>${formatInline(headingMatch[2])}</h${level + 1}>`);
      return;
    }

    paragraphBuffer.push(line);
  });

  flushParagraph();
  return htmlBlocks.join("\n");
}

/**
 * Removes a leading "# Title" line from the markdown source. The
 * Episode Reader page renders its own title header (with theme, read
 * time, etc.) above the article body, so the in-file H1 is redundant
 * once it has been read once via extractFirstHeading().
 */
export function stripLeadingHeading(markdown) {
  return markdown.replace(/^#\s+.*\n?/, "");
}

/**
 * Pulls the first "# Heading" line out of a markdown string, if present,
 * so the reader page can optionally use it (falls back to episode.title
 * from episodes.js if none is found).
 */
export function extractFirstHeading(markdown) {
  const match = markdown.match(/^#\s+(.*)$/m);
  return match ? match[1] : null;
}
