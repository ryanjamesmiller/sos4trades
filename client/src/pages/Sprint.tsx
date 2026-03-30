/* =============================================================
   SOS CTE Sprint Sales Page — Steel & Signal Design System
   Full sales page: Problem → Proof → Process → Investment → CTA
   ============================================================= */
import { useEffect } from "react";
import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowRight, CheckCircle2, Clock, Shield, Users, Wrench } from "lucide-react";

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

export default function Sprint() {
  useScrollReveal();

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#1C1E24", color: "#F5F7F8" }}>
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 blueprint-grid opacity-20" />
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="section-label mb-5 fade-up">30-Day Done-With-You Implementation</div>
            <h1
              className="text-5xl md:text-6xl font-black text-white mb-6 fade-up"
              style={{ letterSpacing: "-0.03em" }}
            >
              The SOS Quote{" "}
              <span style={{ color: "#FF7900" }}>Conversion Sprint</span>
            </h1>
            <p className="text-xl text-white/70 mb-4 fade-up">
              Turn stalled quotes into booked jobs in 30 days — without more leads or ads.
            </p>
            <p className="text-white/40 text-base mb-10 fade-up">
              This is not a course. Not a PDF. Not a group program. This is installation.
            </p>
            <div className="fade-up">
              <a
                href="https://coach.ryanjamesmiller.com/offers/zruPZzFM/checkout"
                target="_blank"
                rel="noopener noreferrer"
                className="sos-orange-btn px-10 py-5 rounded text-base font-bold inline-flex items-center gap-2"
              >
                Start the Sprint — $997 <ArrowRight size={18} />
              </a>
              <p className="text-white/30 text-sm mt-4">Satisfaction guarantee included.</p>
            </div>
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-20" style={{ backgroundColor: "#23262E" }}>
        <div className="container">
          <div className="text-center mb-14">
            <div className="section-label mb-4 fade-up">What You Get</div>
            <h2 className="text-4xl font-black text-white fade-up" style={{ letterSpacing: "-0.03em" }}>
              Everything You Need to Install the System
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Users, title: "2 Private 1:1 Calls", desc: "60-minute implementation calls with Ryan personally. Not a VA. Not an assistant. Ryan." },
              { icon: Wrench, title: "Full System Installation", desc: "Scripts, templates, automations, CRM setup (Jobber, Housecall Pro, ServiceTitan, GoHighLevel)." },
              { icon: Clock, title: "30 Days of Direct Access", desc: "Expert guidance for the full 30 days. Ask questions, get feedback, stay on track." },
              { icon: CheckCircle2, title: "Quote Revival Campaign", desc: "Launch the same campaign that revived 168 stalled quotes in a single weekend for a residential water filtration client." },
              { icon: Shield, title: "Satisfaction Guarantee", desc: "If you do the work and don't see results, we'll make it right. Period." },
              { icon: ArrowRight, title: "Ascension Path", desc: "Sprint graduates get priority access to Group Coaching and 1:1 Consulting as you scale." },
            ].map((item, i) => (
              <div
                key={i}
                className="p-6 rounded-xl fade-up"
                style={{ backgroundColor: "#2A2D36", border: "1px solid rgba(255,255,255,0.06)" }}
              >
                <item.icon size={24} style={{ color: "#4682B4", marginBottom: 12 }} />
                <h3 className="text-white font-bold text-base mb-2">{item.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4-Week Breakdown */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-14">
            <div className="section-label mb-4 fade-up">The 4-Week Blueprint</div>
            <h2 className="text-4xl font-black text-white fade-up" style={{ letterSpacing: "-0.03em" }}>
              Week by Week. Step by Step.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                week: "Week 1",
                title: "Pipeline & Quote Clarity",
                items: ["Clean up active opportunities", "Define pipeline stages", "Identify where quotes are leaking"],
                color: "#4682B4",
              },
              {
                week: "Week 2",
                title: "Follow-Up Engine Installed",
                items: ["7-touch follow-up system", "CRM automations installed", "Quote revival campaign launched"],
                color: "#4682B4",
              },
              {
                week: "Week 3",
                title: "Sales Conversations",
                items: ["Scripts for handling hesitation", "Opportunity scoring", "Price-and-value positioning"],
                color: "#FF7900",
              },
              {
                week: "Week 4",
                title: "Lock It In & Optimize",
                items: ["Review what converted", "Weekly operating rhythm", "System finalized and handed off"],
                color: "#FF7900",
              },
            ].map((week, i) => (
              <div
                key={i}
                className="p-6 rounded-xl fade-up"
                style={{
                  backgroundColor: "#2A2D36",
                  border: `1px solid ${week.color}30`,
                  transitionDelay: `${i * 80}ms`,
                }}
              >
                <div
                  className="text-xs font-bold tracking-[0.15em] uppercase mb-1"
                  style={{ color: week.color }}
                >
                  {week.week}
                </div>
                <h3 className="text-white font-bold text-base mb-4">{week.title}</h3>
                <ul className="space-y-2">
                  {week.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-2 text-white/50 text-sm">
                      <CheckCircle2 size={14} style={{ color: week.color, flexShrink: 0, marginTop: 2 }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Investment + CTA */}
      <section className="py-24" style={{ backgroundColor: "#13151A" }}>
        <div className="container">
          <div
            className="max-w-2xl mx-auto p-10 rounded-2xl text-center fade-up"
            style={{ border: "2px solid #FF7900", boxShadow: "0 0 60px rgba(255,121,0,0.1)" }}
          >
            <div className="section-label mb-4" style={{ color: "#FF7900" }}>Investment</div>
            <div
              className="text-7xl font-black text-white mb-2"
              style={{ letterSpacing: "-0.04em" }}
            >
              $997
            </div>
            <p className="text-white/50 text-sm mb-8">One-time. No discovery call required. Start immediately.</p>
            <a
              href="https://coach.ryanjamesmiller.com/offers/zruPZzFM/checkout"
              target="_blank"
              rel="noopener noreferrer"
              className="sos-orange-btn px-10 py-5 rounded text-base font-bold inline-flex items-center gap-2 mb-6"
            >
              Start the Sprint Now <ArrowRight size={18} />
            </a>
            <p className="text-white/30 text-xs">
              Not ready yet?{" "}
              <a
                href="https://www.skool.com/sos-pipeline-builders-network"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#4682B4] hover:underline"
              >
                Join the free Pipeline Builders Network
              </a>{" "}
              and get warmed up first.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
