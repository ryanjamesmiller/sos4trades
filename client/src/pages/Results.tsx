/* =============================================================
   SOS CTE Results Page — Case Studies & Proof
   ============================================================= */
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowRight, TrendingUp, CheckCircle2 } from "lucide-react";

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

export default function Results() {
  useScrollReveal();

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#1C1E24", color: "#F5F7F8" }}>
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 blueprint-grid opacity-20" />
        <div className="container relative z-10">
          <div className="max-w-3xl">
            <div className="section-label mb-5 fade-up">Proof It Works</div>
            <h1
              className="text-5xl md:text-6xl font-black text-white mb-6 fade-up"
              style={{ letterSpacing: "-0.03em" }}
            >
              Real Contractors.{" "}
              <span style={{ color: "#FF7900" }}>Real Results.</span>
            </h1>
            <p className="text-xl text-white/60 leading-relaxed fade-up">
              Not testimonials. Not theory. Documented outcomes from real trades businesses
              that implemented the SOS framework.
            </p>
          </div>
        </div>
      </section>

      {/* OnTrac Deep Dive */}
      <section className="py-20" style={{ backgroundColor: "#23262E" }}>
        <div className="container">
          <div className="section-label mb-4 fade-up">Anchor Case Study</div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-4xl font-black text-white mb-4 fade-up" style={{ letterSpacing: "-0.03em" }}>
                OnTrac Garage Doors
              </h2>
              <div className="flex items-center gap-4 mb-6 fade-up">
                <div className="text-center">
                  <div className="text-2xl font-black text-white/40">$40K</div>
                  <div className="text-white/30 text-xs">Starting Profit</div>
                </div>
                <TrendingUp size={28} style={{ color: "#FF7900" }} />
                <div className="text-center">
                  <div className="text-4xl font-black" style={{ color: "#FF7900" }}>$1.4M</div>
                  <div className="text-white/50 text-xs">Profit Growth</div>
                </div>
              </div>
              <p className="text-white/60 leading-relaxed mb-5 fade-up">
                OnTrac Garage Doors is the anchor case study and the standard everything else
                is measured against. A founder-led garage door company that was doing $40K in
                profit implemented the full SOS framework and grew to $1.4M.
              </p>
              <p className="text-white/60 leading-relaxed mb-5 fade-up">
                This wasn't a marketing win. It wasn't more leads. It was a conversion system —
                a documented sales process, a follow-up engine, and a team that could run it
                without the owner in every deal.
              </p>
              <p className="text-white/60 leading-relaxed fade-up">
                That's what SOS does. It takes the revenue that's already in your pipeline
                and builds a system to capture it.
              </p>
            </div>

            <div
              className="rounded-2xl overflow-hidden fade-up"
              style={{
                backgroundImage: `url(https://d2xsxph8kpxj0f.cloudfront.net/106943050/ckBSY4wLs96BZ2LvuKj6yL/sos-ontrac-result-jq8F8FUdFZMW4nZrGodLHc.webp)`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                minHeight: 360,
                border: "1px solid rgba(255,121,0,0.2)",
              }}
            />
          </div>
        </div>
      </section>

      {/* Kelley Case Study */}
      <section className="py-20">
        <div className="container">
          <div className="section-label mb-4 fade-up">Quote Revival Campaign</div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div
              className="rounded-2xl p-12 text-center fade-up"
              style={{ backgroundColor: "#2A2D36", border: "1px solid rgba(70,130,180,0.2)" }}
            >
              <div
                className="text-9xl font-black mb-3"
                style={{ color: "#4682B4", letterSpacing: "-0.05em" }}
              >
                168
              </div>
              <div className="text-white font-bold text-lg mb-2">Stalled Quotes Revived</div>
              <div className="text-white/40 text-sm">In a Single Weekend</div>
            </div>

            <div>
              <h2 className="text-4xl font-black text-white mb-4 fade-up" style={{ letterSpacing: "-0.03em" }}>
                The Kelley Case Study
              </h2>
              <p className="text-white/60 leading-relaxed mb-5 fade-up">
                168 stalled quotes revived in a single weekend. This is the proof of concept
                for the Quote Revival Campaign inside the Sprint.
              </p>
              <p className="text-white/60 leading-relaxed mb-5 fade-up">
                These weren't new leads. These were quotes that had already gone cold — homeowners
                who had shown interest and then gone silent. The right follow-up message at the
                right time brought 168 of them back into active conversations.
              </p>
              <div
                className="p-5 rounded-xl fade-up"
                style={{ backgroundColor: "rgba(70,130,180,0.08)", border: "1px solid rgba(70,130,180,0.2)" }}
              >
                <p className="text-white/70 text-sm leading-relaxed italic">
                  "The revenue was already in the pipeline. It just needed a system to capture it."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20" style={{ backgroundColor: "#13151A" }}>
        <div className="container text-center">
          <h2 className="text-4xl font-black text-white mb-6 fade-up" style={{ letterSpacing: "-0.03em" }}>
            Your Results Start Here.
          </h2>
          <p className="text-white/50 text-lg mb-8 max-w-xl mx-auto fade-up">
            The same system that drove these results is available to you in the 30-Day Sprint.
          </p>
          <a
            href="https://coach.ryanjamesmiller.com/offers/zruPZzFM/checkout"
            target="_blank"
            rel="noopener noreferrer"
            className="sos-orange-btn px-10 py-5 rounded text-base font-bold inline-flex items-center gap-2 fade-up"
          >
            Start the Sprint — $997 <ArrowRight size={18} />
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
