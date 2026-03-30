/* =============================================================
   SOS CTE Community Page — Pipeline Builders Network
   ============================================================= */
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowRight, CheckCircle2, Users, Calendar, Trophy, Star } from "lucide-react";

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

export default function Community() {
  useScrollReveal();

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#1C1E24", color: "#F5F7F8" }}>
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 blueprint-grid opacity-20" />
        <div className="container relative z-10 text-center">
          <div className="section-label mb-5 fade-up">Free Community</div>
          <h1
            className="text-5xl md:text-6xl font-black text-white mb-6 fade-up"
            style={{ letterSpacing: "-0.03em" }}
          >
            SOS Pipeline{" "}
            <span style={{ color: "#4682B4" }}>Builders Network</span>
          </h1>
          <p className="text-xl text-white/60 max-w-2xl mx-auto mb-10 fade-up">
            A private Skool community for contractor and trades owners actively building their
            sales pipeline using the SOS framework. Free to join. No pitch. Just the work.
          </p>
          <div className="fade-up">
            <a
              href="https://www.skool.com/sos-pipeline-builders-network"
              target="_blank"
              rel="noopener noreferrer"
              className="sos-orange-btn px-10 py-5 rounded text-base font-bold inline-flex items-center gap-2"
            >
              Join the Network — Free <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </section>

      {/* What You Get */}
      <section className="py-20" style={{ backgroundColor: "#23262E" }}>
        <div className="container">
          <div className="text-center mb-14">
            <div className="section-label mb-4 fade-up">What Members Get</div>
            <h2 className="text-4xl font-black text-white fade-up" style={{ letterSpacing: "-0.03em" }}>
              More Than a Community. A Pipeline.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: CheckCircle2, title: "Weekly Frameworks", desc: "Prompts and resources from Ryan every week — not fluff, actionable pipeline-building content." },
              { icon: Calendar, title: "Monthly Live Calls", desc: "Group coaching calls with Ryan, recorded for members who can't attend live." },
              { icon: Trophy, title: "Win-Sharing Threads", desc: "Members post pipeline results. Real wins from real contractors using the SOS framework." },
              { icon: Star, title: "Quarterly Spotlights", desc: "Member spotlights highlighting transformations and results from inside the community." },
            ].map((item, i) => (
              <div
                key={i}
                className="p-6 rounded-xl fade-up"
                style={{ backgroundColor: "#2A2D36", border: "1px solid rgba(70,130,180,0.15)" }}
              >
                <item.icon size={24} style={{ color: "#4682B4", marginBottom: 12 }} />
                <h3 className="text-white font-bold text-base mb-2">{item.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Positioning */}
      <section className="py-20">
        <div className="container max-w-3xl mx-auto text-center">
          <div className="section-label mb-4 fade-up">The Starting Point</div>
          <h2 className="text-4xl font-black text-white mb-6 fade-up" style={{ letterSpacing: "-0.03em" }}>
            Not Ready for the Sprint Yet? Start Here.
          </h2>
          <p className="text-white/60 text-lg leading-relaxed mb-8 fade-up">
            The Pipeline Builders Network is where you land when you're not yet ready for the Sprint —
            and where you get warmed up until you are. It's the entry point to the full SOS CTE ecosystem.
            Free to join. No discovery call. No pitch. Just the work.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center fade-up">
            <a
              href="https://www.skool.com/sos-pipeline-builders-network"
              target="_blank"
              rel="noopener noreferrer"
              className="sos-orange-btn px-8 py-4 rounded text-sm font-bold inline-flex items-center gap-2"
            >
              Join Free <ArrowRight size={16} />
            </a>
            <a
              href="https://coach.ryanjamesmiller.com/offers/zruPZzFM/checkout"
              target="_blank"
              rel="noopener noreferrer"
              className="sos-ghost-btn px-8 py-4 rounded text-sm font-semibold inline-flex items-center gap-2"
            >
              Skip Ahead — Start the Sprint
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
