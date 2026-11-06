// Pre-render every route to static HTML so search engines and AI crawlers get the full page text without JavaScript.
// Runs after `vite build`. Uses a Vite SSR build of client/src/entry-server.tsx.
import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const ROOT = process.cwd();
const OUT = path.join(ROOT, "dist/public");
const SSR_OUT = path.join(ROOT, "dist/ssr");
// Keep in step with the <Route> list in client/src/App.tsx.
const ROUTES = ["/", "/about", "/results", "/scorecard", "/follow-up-builder", "/resources", "/community", "/sprint", "/404"];

// A real DOM for the render pass: some UI libraries touch document/window at import time.
import { GlobalRegistrator } from "@happy-dom/global-registrator";
GlobalRegistrator.register({ url: "https://sos4trades.com/", width: 1280, height: 800 });
globalThis.IntersectionObserver = globalThis.IntersectionObserver || class { observe() {} unobserve() {} disconnect() {} };
globalThis.matchMedia = globalThis.matchMedia || (() => ({ matches: false, addEventListener() {}, removeEventListener() {}, addListener() {}, removeListener() {} }));
window.matchMedia = window.matchMedia || globalThis.matchMedia;

execSync(`npx vite build --ssr src/entry-server.tsx --outDir ${JSON.stringify(SSR_OUT)} --emptyOutDir`, { stdio: "inherit" });
const { render } = await import(pathToFileURL(path.join(SSR_OUT, "entry-server.js")).href);
const template = fs.readFileSync(path.join(OUT, "index.html"), "utf8");
if (!template.includes('<div id="root"></div>')) throw new Error("index.html has no empty #root to fill");


// Each page's own title and description, written into <head> so crawlers that never run JavaScript see them.
// Wording comes from each page's own headline and opening line. GitHub Pages redirects /about to /about/, so URLs end in a slash.
const SITE = "https://sos4trades.com";
const SOCIAL_IMAGE = `${SITE}/assets/sos-trades-social.jpg`;
const META = {
  "/": ["SOS CTE | Sales Operating System for Contractors & Trades", "Turn stalled quotes into booked jobs in 30 days, without more leads or ads. The Sales Operating System built for trades and specialty contractors."],
  "/about": ["About Ryan James Miller | SOS Contractors & Trades", "Ryan James Miller built the SOS framework from the ground up for trades and specialty contractors. Built for the trades. Grounded in faith."],
  "/results": ["Results | Real Contractors, Real Results | SOS CTE", "Documented outcomes from real trades businesses that implemented the SOS framework. Not testimonials. Not theory."],
  "/scorecard": ["Full Capture Scorecard | SOS Contractors & Trades", "You didn't lose that job to a cheaper bid. You lost it to silence. Score how many of your quotes your follow-up actually captures."],
  "/follow-up-builder": ["Quote Follow-Up Builder | SOS Contractors & Trades", "Give it one open quote. Get back a dated 7-touch call, text and email sequence written for that customer, ready to copy into your phone or CRM."],
  "/resources": ["The SOS Field Library | SOS Contractors & Trades", "Frameworks, field guides and real-world breakdowns from inside the SOS system for contractor and trades owners."],
  "/community": ["SOS Pipeline Builders Network | SOS Contractors & Trades", "A free private Skool community for contractor and trades owners building their sales pipeline with the SOS framework. No pitch. Just the work."],
};
const esc = (v) => String(v).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
function withHead(html, route) {
  if (route === "/404") return html.replace("</head>", `<meta name="robots" content="noindex" />\n</head>`);
  const m = META[route];
  if (!m) return html;
  const [t, d] = m.map(esc);
  const url = SITE + (route === "/" ? "/" : route + "/");
  html = html
    .replace(/<title>[^<]*<\/title>/, `<title>${t}</title>`)
    .replace(/(<meta name="description" content=")[^"]*/, `$1${d}`);
  const tags = [
    `<link rel="canonical" href="${url}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="SOS Contractors & Trades" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:title" content="${t}" />`,
    `<meta property="og:description" content="${d}" />`,
    `<meta property="og:image" content="${SOCIAL_IMAGE}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${t}" />`,
    `<meta name="twitter:description" content="${d}" />`,
    `<meta name="twitter:image" content="${SOCIAL_IMAGE}" />`,
  ];
  return html.replace("</head>", `    ${tags.join("\n    ")}\n</head>`);
}

let ok = 0;
for (const route of ROUTES) {
  let result;
  try { result = render(route); } catch (e) { console.error("prerender failed for", route, e.message); continue; }
  let page;
  if (result.redirectTo) {
    // Redirect routes (e.g. /sprint): leave #root empty so the app redirects in the browser; crawlers follow the meta refresh.
    page = template.replace("</head>", `<meta http-equiv="refresh" content="0; url=${result.redirectTo}" />\n</head>`);
  } else {
    // data-route tells client/src/main.tsx which path this markup belongs to, so it only hydrates a match.
    // A route with no META row would ship the home page's title to Google (11/05/26): stop the build instead.
    if (route !== "/404" && !META[route]) { console.error("no META row for", route, "in scripts/prerender.mjs"); process.exit(1); }
    page = withHead(template, route).replace('<div id="root"></div>', `<div id="root" data-route="${route}">${result.html}</div>`);
  }
  const file = route === "/" ? path.join(OUT, "index.html") : path.join(OUT, route.replace(/^\//, ""), "index.html");
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, page);
  ok++;
}
fs.rmSync(SSR_OUT, { recursive: true, force: true });
console.log(`pre-rendered ${ok}/${ROUTES.length} routes into dist/public`);
await GlobalRegistrator.unregister();
if (ok < ROUTES.length) process.exit(1);
