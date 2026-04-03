/* =============================================================
   SOS CTE Navbar — Steel & Signal Design System
   Dark graphite bar, Steel Blue logo, Orange CTA
   ============================================================= */
import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/results", label: "Results" },
  { href: "/community", label: "Community" },
  { href: "/resources", label: "Resources" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#1C1E24]/95 backdrop-blur-md border-b border-white/5 shadow-lg shadow-black/20"
          : "bg-transparent"
      }`}
    >
      <div className="container flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="flex flex-col leading-none">
            <span
              className="text-2xl font-black tracking-tight"
              style={{ color: "#4682B4", fontFamily: "'DM Sans', sans-serif", letterSpacing: "-0.03em" }}
            >
              SOS
            </span>
            <span
              className="text-[9px] font-semibold tracking-[0.2em] uppercase"
              style={{ color: "#CBBFAD" }}
            >
              Contractors & Trades
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors duration-200 ${
                location === link.href
                  ? "text-white"
                  : "text-white/60 hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/sprint"
            className="sos-orange-btn px-5 py-2.5 rounded text-sm font-bold"
          >
            Start the Sprint — $997
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-white/70 hover:text-white p-1"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-[#1C1E24] border-t border-white/5 px-6 py-6 flex flex-col gap-5">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-base font-medium transition-colors ${
                location === link.href ? "text-white" : "text-white/60"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/sprint"
            className="sos-orange-btn px-5 py-3 rounded text-sm font-bold text-center mt-2"
          >
            Start the Sprint — $997
          </Link>
        </div>
      )}
    </header>
  );
}
