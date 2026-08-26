/* =============================================================
   Legacy Sprint Route — Steel & Signal Design System
   Preserve old inbound links while sending every visitor to the
   current primary conversion path: the Full Capture Scorecard.
   ============================================================= */
import { Redirect } from "wouter";

export default function Sprint() {
  return <Redirect to="/scorecard" />;
}
