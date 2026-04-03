/**
 * Resources Page — SOS CTE
 * Design: Dark graphite (#1C1E24) base, Steel Blue (#4682B4) accents, Orange (#E8622A) CTAs
 * Typography: DM Sans — heavy display headings, clean body
 * Layout: Hero → YouTube playlist embed → What's Inside grid → CTA
 */

import { useEffect } from "react";
import { ExternalLink, Play, Youtube } from "lucide-react";
import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll(".fade-up").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

export default function Resources() {
  useScrollReveal();

  const playlistId = "PLUiQgrmBE-kdKmKOG8yf0dY-XJbLTuHMy";
  const playlistUrl =
    "https://youtube.com/playlist?list=PLUiQgrmBE-kdKmKOG8yf0dY-XJbLTuHMy&si=ZbcdUhsBxx-K1hOn";

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#1C1E24", color: "#F5F7F8" }}>
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-16 px-4" style={{ backgroundColor: "#13151A" }}>
        <div className="max-w-4xl mx-auto text-center">
          <p
            className="text-xs font-bold tracking-[0.2em] uppercase mb-4 fade-up"
            style={{ color: "#4682B4" }}
          >
            Free Training
          </p>
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-6 fade-up"
            style={{ letterSpacing: "-0.03em" }}
          >
            The SOS{" "}
            <span style={{ color: "#E8622A" }}>Field Library</span>
          </h1>
          <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed fade-up">
            Frameworks, field guides, and real-world breakdowns from inside the SOS system.
            Watch these before your first call — or use them to start building your pipeline today.
          </p>
        </div>
      </section>

      {/* Playlist Embed */}
      <section className="py-14 px-4">
        <div className="max-w-5xl mx-auto fade-up">
          <div
            className="relative w-full rounded-2xl overflow-hidden shadow-2xl"
            style={{
              paddingBottom: "56.25%",
              border: "1px solid rgba(255,255,255,0.08 )",
              boxShadow: "0 0 60px rgba(70,130,180,0.12)",
            }}
          >
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src={`https://www.youtube.com/embed/videoseries?list=${playlistId}&rel=0&modestbranding=1`}
              title="SOS CTE Field Library — YouTube Playlist"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>

          <div className="mt-5 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-white/40 text-sm">
              <Play className="w-4 h-4 flex-shrink-0" style={{ color: "#E8622A" }} />
              <span>Use the playlist menu (top-right of the player ) to navigate between videos</span>
            </div>
            <a
              href={playlistUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm font-semibold transition-colors"
              style={{ color: "#4682B4" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#4682B4")}
            >
              <Youtube className="w-4 h-4" />
              Open on YouTube
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </section>

      {/* What's Inside */}
      <section className="py-14 px-4" style={{ backgroundColor: "#13151A" }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p
              className="text-xs font-bold tracking-[0.2em] uppercase mb-3 fade-up"
              style={{ color: "#4682B4" }}
            >
              What You'll Learn
            </p>
            <h2
              className="text-3xl md:text-4xl font-black text-white fade-up"
              style={{ letterSpacing: "-0.03em" }}
            >
              What's Inside
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Sales System Fundamentals",
                desc: "The core SOS framework — how to build a repeatable process that converts without pressure or manipulation.",
              },
              {
                title: "Pipeline & Follow-Up",
                desc: "How to work stalled quotes, revive cold leads, and build a follow-up engine that runs without you chasing every deal.",
              },
              {
                title: "Trades-Specific Breakdowns",
                desc: "Real scenarios from the field — roofing, HVAC, garage doors, water treatment, and more. Built for the trades, not adapted from a corporate model.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="p-6 rounded-xl fade-up transition-colors"
                style={{
                  backgroundColor: "#1C1E24",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLDivElement).style.borderColor = "rgba(70,130,180,0.35)")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.07)")
                }
              >
                <h3 className="text-white font-bold text-lg mb-3">{item.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2
            className="text-3xl md:text-4xl font-black text-white mb-4 fade-up"
            style={{ letterSpacing: "-0.03em" }}
          >
            Ready to Install the System?
          </h2>
          <p className="text-white/50 text-lg mb-8 fade-up">
            The videos give you the framework. The Sprint gives you the installation.
            Start the 30-Day Sprint and have a working sales system in 30 days.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center fade-up">
            <Link href="/sprint">
              <button
                className="font-bold px-8 py-4 rounded-lg text-lg transition-colors text-white"
                style={{ backgroundColor: "#E8622A" }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLButtonElement).style.backgroundColor = "#d4561f")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLButtonElement).style.backgroundColor = "#E8622A")
                }
              >
                Start the Sprint — $997
              </button>
            </Link>
            <a
              href="https://calendly.com/ryanjamesmiller/sos-discovery-call"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold px-8 py-4 rounded-lg text-lg transition-colors text-center"
              style={{ border: "2px solid #4682B4", color: "#4682B4" }}
              onMouseEnter={(e ) => {
                (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#4682B4";
                (e.currentTarget as HTMLAnchorElement).style.color = "#fff";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "transparent";
                (e.currentTarget as HTMLAnchorElement).style.color = "#4682B4";
              }}
            >
              Book a Discovery Call
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
