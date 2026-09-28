import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// GitHub Pages serves pre-rendered pages at /about/; drop the trailing slash so the app sees /about.
const { pathname, search, hash } = window.location;
if (pathname.length > 1 && pathname.endsWith("/")) {
  history.replaceState(null, "", pathname.replace(/\/+$/, "") + search + hash);
}

const root = document.getElementById("root")!;
// Pages are pre-rendered at build time (scripts/prerender.mjs). Hydrate only when the markup belongs to this
// path (the 404.html bounce lands unknown paths on the home page's HTML) and the first render will match it
// (?unlocked=1 opens the Scorecard straight on the quiz, which the pre-rendered landing screen is not).
const here = window.location.pathname;
const unlocked = new URLSearchParams(window.location.search).get("unlocked") === "1";
if (root.hasChildNodes() && root.dataset.route === here && !unlocked) {
  hydrateRoot(root, <App />);
} else {
  root.textContent = "";
  createRoot(root).render(<App />);
}
