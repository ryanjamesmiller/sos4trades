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
const ROUTES = ["/", "/about", "/results", "/scorecard", "/resources", "/community", "/sprint", "/404"];

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
    page = template.replace('<div id="root"></div>', `<div id="root" data-route="${route}">${result.html}</div>`);
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
