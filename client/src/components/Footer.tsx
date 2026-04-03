/* =============================================================
   SOS CTE Footer — Steel & Signal Design System
   ============================================================= */
import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-[#13151A] border-t border-white/5">
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="mb-4">
              <span
                className="text-3xl font-black tracking-tight block"
                style={{ color: "#4682B4", fontFamily: "'DM Sans', sans-serif", letterSpacing: "-0.03em" }}
              >
                SOS
              </span>
              <span
                className="text-xs font-semibold tracking-[0.2em] uppercase"
                style={{ color: "#CBBFAD" }}
              >
                Contractors & Trades
              </span>
            </div>
            <p className="text-white/50 text-sm leading-relaxed max-w-xs">
              Structure. Optimize. Scale. The Sales Operating System built for trades and specialty contractors.
            </p>
            <p className="text-white/30 text-xs mt-4">
              Built on faith. Proven in the field.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-5 tracking-wide">Navigate</h4>
            <ul className="space-y-3">
              {[
                { href: "/", label: "Home" },
                { href: "/sprint", label: "30-Day Sprint" },
                { href: "/about", label: "About Ryan" },
                { href: "/results", label: "Results" },
                { href: "/community", label: "Community" },
                { href: "/resources", label: "Resources" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/50 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-5 tracking-wide">Ready to Build Your System?</h4>
            <p className="text-white/50 text-sm mb-5 leading-relaxed">
              Turn stalled quotes into booked jobs in 30 days — without more leads or ads.
            </p>
            <Link
              href="/sprint"
              className="sos-orange-btn inline-block px-6 py-3 rounded text-sm font-bold"
            >
              Start the Sprint — $997
            </Link>
            <div className="mt-6">
              <p className="text-white/40 text-xs mb-2">Free starting point:</p>
              <a
                href="https://www.skool.com/sos-pipeline-builders-network"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#4682B4] hover:text-[#5a9fd4] text-sm font-medium transition-colors"
              >
                Join Pipeline Builders Network →
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-xs">
            © {new Date( ).getFullYear()} SOS — Sales Operating System. All rights reserved.
          </p>
          <p className="text-white/20 text-xs">
            Ryan James Miller · Faith-Driven Sales Strategist
          </p>
        </div>
      </div>
    </footer>
  );
}
