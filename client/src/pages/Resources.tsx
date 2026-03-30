/* =============================================================
   SOS CTE Resources Page — Free Tools & Lead Magnets
   ============================================================= */
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowRight, Download, BarChart3, FileText, Clipboard } from "lucide-react";

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

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#1C1E24", color: "#F5F7F8" }}>
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 blueprint-grid opacity-20" />
        <div className="container relative z-10 text-center">
          <div className="section-label mb-5 fade-up">Free Tools</div>
          <h1
            className="text-5xl md:text-6xl font-black text-white mb-6 fade-up"
            style={{ letterSpacing: "-0.03em" }}
          >
            Start Building Your{" "}
            <span style={{ color: "#4682B4" }}>Pipeline Today</span>
          </h1>
          <p className="text-xl text-white/60 max-w-2xl mx-auto fade-up">
            Free tools, scorecards, and resources for contractor and trades owners
            who are ready to stop guessing and start building a system.
          </p>
        </div>
      </section>

      {/* Primary Resource */}
      <section className="py-20" style={{ backgroundColor: "#23262E" }}>
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div
              className="p-10 rounded-2xl fade-up"
              style={{ border: "2px solid #4682B4", boxShadow: "0 0 40px rgba(70,130,180,0.1)" }}
            >
              <div className="flex items-start gap-6">
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: "rgba(70,130,180,0.15)", border: "1px solid rgba(70,130,180,0.3)" }}
                >
                  <BarChart3 size={24} style={{ color: "#4682B4" }} />
                </div>
                <div className="flex-1">
                  <div className="section-label mb-2">Primary Lead Magnet</div>
                  <h2 className="text-2xl font-black text-white mb-3" style={{ letterSpacing: "-0.02em" }}>
                    Pipeline Power System Scorecard
                  </h2>
                  <p className="text-white/60 text-sm leading-relaxed mb-6">
                    Assess where your sales pipeline stands right now. Identify the exact gaps
                    costing you jobs and revenue. Get a clear picture of what to fix first.
                    Free. No credit card. Takes 5 minutes.
                  </p>
                  <a
                    href="https://coach.ryanjamesmiller.com/Pipeline-Power-System-Scorecard"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="sos-orange-btn px-8 py-4 rounded text-sm font-bold inline-flex items-center gap-2"
                  >
                    Get the Free Scorecard <ArrowRight size={16} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Other Resources */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-14">
            <div className="section-label mb-4 fade-up">More Free Resources</div>
            <h2 className="text-4xl font-black text-white fade-up" style={{ letterSpacing: "-0.03em" }}>
              Tools for Every Stage
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: FileText,
                title: "Pipeline Builder Starter Kit",
                desc: "The foundational toolkit for building your sales pipeline from scratch. Templates, frameworks, and a step-by-step guide.",
                tag: "Lead Magnet",
                href: "https://coach.ryanjamesmiller.com/Pipeline-Power-System-Scorecard",
              },
              {
                icon: Clipboard,
                title: "ICP Definition Worksheet",
                desc: "Define your Ideal Client Profile with precision. Know exactly who you're selling to and why they buy.",
                tag: "Free Tool",
                href: "https://coach.ryanjamesmiller.com/Pipeline-Power-System-Scorecard",
              },
              {
                icon: Download,
                title: "Field-to-Office Sales Bridge Guide",
                desc: "Close the gap between field credibility and a team-runnable sales system. The bridge most trades owners are missing.",
                tag: "Free Guide",
                href: "https://coach.ryanjamesmiller.com/Pipeline-Power-System-Scorecard",
              },
            ].map((resource, i) => (
              <div
                key={i}
                className="p-6 rounded-xl fade-up"
                style={{ backgroundColor: "#2A2D36", border: "1px solid rgba(255,255,255,0.06)" }}
              >
                <resource.icon size={22} style={{ color: "#4682B4", marginBottom: 12 }} />
                <div
                  className="text-[10px] font-bold tracking-[0.15em] uppercase mb-2"
                  style={{ color: "#CBBFAD" }}
                >
                  {resource.tag}
                </div>
                <h3 className="text-white font-bold text-base mb-2">{resource.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed mb-5">{resource.desc}</p>
                <a
                  href={resource.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#4682B4] hover:text-[#5a9fd4] text-sm font-semibold flex items-center gap-1 transition-colors"
                >
                  Get it free <ArrowRight size={14} />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Community CTA */}
      <section className="py-20" style={{ backgroundColor: "#13151A" }}>
        <div className="container text-center">
          <h2 className="text-4xl font-black text-white mb-6 fade-up" style={{ letterSpacing: "-0.03em" }}>
            Want More? Join the Community.
          </h2>
          <p className="text-white/50 text-lg mb-8 max-w-xl mx-auto fade-up">
            The Pipeline Builders Network delivers weekly frameworks, monthly live calls,
            and a community of trades owners building their pipelines together. Free.
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
              Skip to the Sprint — $997
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
