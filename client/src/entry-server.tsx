// Server entry used only at build time by scripts/prerender.mjs to write static HTML for every route.
import { renderToString } from "react-dom/server";
import { Router } from "wouter";
import App from "./App";

export function render(url: string) {
  const ssrContext: { redirectTo?: string } = {};
  const html = renderToString(
    <Router ssrPath={url} ssrContext={ssrContext}>
      <App />
    </Router>
  );
  return { html, redirectTo: ssrContext.redirectTo };
}
