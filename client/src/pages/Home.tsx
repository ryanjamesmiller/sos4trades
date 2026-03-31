/* =============================================================
   SOS CTE Home Page — Steel & Signal Design System
   Sections: Hero, Problem, Visual Journey, Proof, Offers, About, CTA
   Design: Dark graphite base, Steel Blue brand, Orange CTAs
   ============================================================= */
import { useEffect, useRef } from "react";
import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  ArrowRight,
  CheckCircle2,
  XCircle,
  ChevronRight,
} from "lucide-react";

// Scroll animation hook
function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll(".fade-up").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

// Counter animation hook
function useCountUp(target: number, suffix: string, ref: React.RefObject<HTMLSpanElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let start = 0;
          const duration = 1800;
          const step = (timestamp: number) => {
            if (!start) start = timestamp;
            const progress = Math.min((timestamp - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.floor(eased * target) + suffix;
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, suffix, ref]);
}

function StatCounter({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useCountUp(value, suffix, ref);
  return (
    <div className="text-center">
      <div className="stat-number text-5xl md:text-6xl mb-2">
        <span ref={ref}>0{suffix}</span>
      </div>
      <p className="text-white/50 text-sm font-medium tracking-wide">{label}</p>
    </div>
  );
}

export default function Home() {
  useScrollReveal();

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#1C1E24", color: "#F5F7F8" }}>
      <Navbar />

      {/* ─── HERO ─────────────────────────────────────────────── */}
      <section
        className="relative min-h-screen flex items-center overflow-hidden"
        style={{
          backgroundImage: `url(https://d2xsxph8kpxj0f.cloudfront.net/106943050/ckBSY4wLs96BZ2LvuKj6yL/jRpX3Zho2UUX_5b167da8.jpg)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-[#1C1E24]/75" />
        {/* Blueprint grid overlay */}
        <div className="absolute inset-0 blueprint-grid opacity-30" />

        <div className="container relative z-10 pt-24 pb-20">
          <div className="max-w-3xl">
            <div className="section-label mb-5 fade-up">
              Sales Operating System — Contractors & Trades
            </div>

            <h1
              className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 fade-up text-white leading-[1.05]"
              style={{ letterSpacing: "-0.03em" }}
            >
              Turn Stalled Quotes Into{" "}
              <span style={{ color: "#FF7900" }}>Booked Jobs</span>{" "}
              in 30 Days.
            </h1>

            <p className="text-lg md:text-xl text-white/70 mb-10 max-w-2xl leading-relaxed fade-up">
              Without more leads. Without more ads. The revenue is already in your pipeline —
              you just don't have a system to get it out.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 fade-up">
              <a
                href="https://coach.ryanjamesmiller.com/offers/zruPZzFM/checkout"
                target="_blank"
                rel="noopener noreferrer"
                className="sos-orange-btn px-8 py-4 rounded text-base font-bold flex items-center justify-center gap-2"
              >
                Start the 30-Day Sprint — $997
                <ArrowRight size={18} />
              </a>

            </div>

            <p className="text-white/40 text-sm mt-5 fade-up">
              Built for roofers, HVAC, plumbers, garage door, electricians, painters & more.
            </p>
          </div>
        </div>

        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#1C1E24] to-transparent" />
      </section>



      {/* ─── PROBLEM SECTION ──────────────────────────────────── */}
      <section className="py-24 relative overflow-hidden">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="section-label mb-4 fade-up">The Real Problem</div>
              <h2
                className="text-4xl md:text-5xl font-black mb-6 text-white fade-up"
                style={{ letterSpacing: "-0.03em" }}
              >
                You Don't Have a Lead Problem.{" "}
                <span style={{ color: "#4682B4" }}>You Have a Conversion Problem.</span>
              </h2>
              <p className="text-white/60 text-lg leading-relaxed mb-8 fade-up">
                You're spending money on ads, getting quotes out the door, and then watching jobs go cold —
                not because the homeowner said no, but because no one followed up with the right message
                at the right time. The revenue is already in your pipeline. It's just not being captured.
              </p>
              <p className="text-white/60 text-lg leading-relaxed mb-8 fade-up">
                The second problem is the <strong className="text-white">Field-to-Office Gap.</strong> You're
                exceptional at your craft. That credibility built the business. But field credibility doesn't
                automatically translate into a sales system your team can run without you in every deal.
                That gap is the ceiling.
              </p>
            </div>

            <div className="space-y-4 fade-up">
              {[
                { icon: XCircle, text: "Quotes sitting out with zero structured follow-up", color: "#ef4444" },
                { icon: XCircle, text: "Inconsistent close rates month to month", color: "#ef4444" },
                { icon: XCircle, text: "No documented sales process — everything lives in your head", color: "#ef4444" },
                { icon: XCircle, text: "Sales team doing their own thing with no accountability", color: "#ef4444" },
                { icon: XCircle, text: "You're stuck in every deal because no one else can close", color: "#ef4444" },
                { icon: XCircle, text: "Revenue swings tied to season, not system", color: "#ef4444" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-4 rounded-lg"
                  style={{ backgroundColor: "#2A2D36", border: "1px solid rgba(239,68,68,0.15)" }}
                >
                  <item.icon size={20} style={{ color: item.color, flexShrink: 0, marginTop: 2 }} />
                  <span className="text-white/70 text-sm leading-relaxed">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── VISUAL JOURNEY (TAKI MOORE STYLE) ───────────────── */}
      <section
        className="py-24 relative overflow-hidden"
        style={{
          backgroundImage: `url(https://d2xsxph8kpxj0f.cloudfront.net/106943050/ckBSY4wLs96BZ2LvuKj6yL/sos-journey-bg-YHQC94ZyY9NHamzQkXzpF6.webp)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-[#1C1E24]/90" />
        <div className="container relative z-10">
          <div className="text-center mb-16">
            <div className="section-label mb-4 fade-up">The Transformation</div>
            <h2
              className="text-4xl md:text-5xl font-black text-white fade-up"
              style={{ letterSpacing: "-0.03em" }}
            >
              From Chaos to a{" "}
              <span style={{ color: "#FF7900" }}>Predictable Sales Machine</span>
            </h2>
            <p className="text-white/50 mt-4 max-w-xl mx-auto fade-up">
              This is the journey every SOS CTE client walks. It's not theory — it's a system.
            </p>
          </div>

          {/* Journey Pipeline */}
          <div className="relative">
            {/* Connector line (desktop) */}
            <div
              className="hidden lg:block absolute top-[72px] left-[10%] right-[10%] h-0.5"
              style={{ background: "linear-gradient(to right, rgba(70,130,180,0.2), #4682B4, rgba(255,121,0,0.8))" }}
            />

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-4">
              {[
                {
                  step: "01",
                  label: "WHERE YOU ARE",
                  title: "The Chaos State",
                  desc: "Quotes going cold. Owner in every deal. Revenue swings. No system, no visibility, no predictability.",
                  color: "#ef4444",
                  bg: "rgba(239,68,68,0.08)",
                  border: "rgba(239,68,68,0.2)",
                },
                {
                  step: "02",
                  label: "THE GAP",
                  title: "Field-to-Office Gap",
                  desc: "Your field credibility built the business. But it doesn't run a sales team. This gap is your ceiling.",
                  color: "#f97316",
                  bg: "rgba(249,115,22,0.08)",
                  border: "rgba(249,115,22,0.2)",
                },
                {
                  step: "03",
                  label: "THE SYSTEM",
                  title: "SOS Installed",
                  desc: "Pipeline clarity. Follow-up engine. Scripts. CRM automations. A documented process your team can run.",
                  color: "#4682B4",
                  bg: "rgba(70,130,180,0.1)",
                  border: "rgba(70,130,180,0.3)",
                },
                {
                  step: "04",
                  label: "OPTIMIZED",
                  title: "Metrics & Momentum",
                  desc: "Close rate tracked. Quote aging visible. Rep performance measured. Weekly operating rhythm locked in.",
                  color: "#4682B4",
                  bg: "rgba(70,130,180,0.1)",
                  border: "rgba(70,130,180,0.3)",
                },
                {
                  step: "05",
                  label: "WHERE YOU'RE GOING",
                  title: "Predictable Scale",
                  desc: "Owner out of every deal. Team running the pipeline. Revenue tied to system, not season.",
                  color: "#FF7900",
                  bg: "rgba(255,121,0,0.1)",
                  border: "rgba(255,121,0,0.3)",
                },
              ].map((stage, i) => (
                <div
                  key={i}
                  className="fade-up flex flex-col"
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  {/* Node circle */}
                  <div className="flex justify-center mb-6">
                    <div
                      className="w-14 h-14 rounded-full flex items-center justify-center font-black text-sm relative z-10"
                      style={{
                        backgroundColor: stage.bg,
                        border: `2px solid ${stage.border}`,
                        color: stage.color,
                        boxShadow: `0 0 20px ${stage.color}20`,
                      }}
                    >
                      {stage.step}
                    </div>
                  </div>

                  {/* Card */}
                  <div
                    className="flex-1 p-5 rounded-xl"
                    style={{
                      backgroundColor: stage.bg,
                      border: `1px solid ${stage.border}`,
                    }}
                  >
                    <div
                      className="text-[10px] font-bold tracking-[0.15em] uppercase mb-2"
                      style={{ color: stage.color }}
                    >
                      {stage.label}
                    </div>
                    <h3 className="text-white font-bold text-base mb-2">{stage.title}</h3>
                    <p className="text-white/50 text-sm leading-relaxed">{stage.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SOS Framework */}
          <div className="mt-20 text-center">
            <div className="section-label mb-6 fade-up">The SOS Framework</div>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-0 fade-up">
              {[
                { letter: "S", word: "STRUCTURE", desc: "Document the process. Define the pipeline. Clarify the ICP." },
                { letter: "O", word: "OPTIMIZE", desc: "Install follow-up. Train the team. Measure what matters." },
                { letter: "S", word: "SCALE", desc: "Remove the owner bottleneck. Build a system that runs itself." },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 md:gap-0">
                  <div
                    className="flex flex-col items-center px-8 py-6 rounded-xl"
                    style={{ backgroundColor: "#2A2D36", border: "1px solid rgba(70,130,180,0.2)", minWidth: 200 }}
                  >
                    <div
                      className="text-5xl font-black mb-1"
                      style={{ color: "#4682B4", letterSpacing: "-0.05em" }}
                    >
                      {item.letter}
                    </div>
                    <div className="text-white font-bold text-sm tracking-[0.1em] mb-2">{item.word}</div>
                    <p className="text-white/40 text-xs text-center leading-relaxed">{item.desc}</p>
                  </div>
                  {i < 2 && (
                    <ChevronRight
                      size={24}
                      className="hidden md:block mx-2 flex-shrink-0"
                      style={{ color: "#4682B4" }}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── PROOF / CASE STUDIES ─────────────────────────────── */}
      <section className="py-24" style={{ backgroundColor: "#23262E" }}>
        <div className="container">
          <div className="text-center mb-16">
            <div className="section-label mb-4 fade-up">Proof It Works</div>
            <h2
              className="text-4xl md:text-5xl font-black text-white fade-up"
              style={{ letterSpacing: "-0.03em" }}
            >
              Real Contractors. Real Results.
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Consulting Success Story */}
            <div
              className="rounded-2xl overflow-hidden fade-up"
              style={{ border: "1px solid rgba(255,121,0,0.2)" }}
            >
              <div
                className="relative h-52 flex items-center justify-center overflow-hidden"
                style={{
                  backgroundImage: `url(https://d2xsxph8kpxj0f.cloudfront.net/106943050/ckBSY4wLs96BZ2LvuKj6yL/sos-ontrac-result-jq8F8FUdFZMW4nZrGodLHc.webp)`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="absolute inset-0 bg-[#1C1E24]/60" />
              </div>
              <div className="p-8" style={{ backgroundColor: "#2A2D36" }}>
                <div className="section-label mb-3">Consulting Success Story</div>
                <h3 className="text-2xl font-black text-white mb-2">Local Garage Door Company</h3>
                <div className="flex items-baseline gap-3 mb-4">
                  <span className="text-white/40 text-sm line-through">$40K</span>
                  <ArrowRight size={14} style={{ color: "#FF7900" }} />
                  <span
                    className="text-3xl font-black"
                    style={{ color: "#FF7900" }}
                  >
                    $1.4M
                  </span>
                  <span className="text-white/50 text-sm">in profit growth</span>
                </div>
                <p className="text-white/60 text-sm leading-relaxed mb-5">
                  A garage door company that was doing $40K in profit implemented the SOS framework
                  and grew to $1.4M. This is the standard everything else is measured against.
                </p>
                <Link
                  href="/results"
                  className="text-[#4682B4] hover:text-[#5a9fd4] text-sm font-semibold flex items-center gap-1 transition-colors"
                >
                  Read the full case study <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            {/* Quote Revival Campaign */}
            <div
              className="rounded-2xl overflow-hidden fade-up"
              style={{ border: "1px solid rgba(70,130,180,0.2)", backgroundColor: "#2A2D36" }}
            >
              <div
                className="h-52 flex items-center justify-center"
                style={{ backgroundColor: "#1C1E24", borderBottom: "1px solid rgba(70,130,180,0.15)" }}
              >
                <div className="text-center px-8">
                  <div
                    className="text-7xl font-black mb-2"
                    style={{ color: "#4682B4", letterSpacing: "-0.04em" }}
                  >
                    168
                  </div>
                  <div className="text-white/60 text-sm font-medium tracking-wide">
                    Stalled Quotes Revived
                  </div>
                </div>
              </div>
              <div className="p-8">
                <div className="section-label mb-3">Quote Revival Campaign</div>
                <h3 className="text-2xl font-black text-white mb-2">Residential Water Filtration</h3>
                <p className="text-white/60 text-sm leading-relaxed mb-5">
                  168 stalled quotes revived in a single weekend using the Quote Revival Campaign
                  inside the Sprint. This is the proof of concept for what's possible when you
                  have the right follow-up system installed.
                </p>
                <div
                  className="flex items-center gap-3 p-4 rounded-lg"
                  style={{ backgroundColor: "rgba(70,130,180,0.08)", border: "1px solid rgba(70,130,180,0.15)" }}
                >
                  <CheckCircle2 size={18} style={{ color: "#4682B4", flexShrink: 0 }} />
                  <span className="text-white/70 text-sm">
                    The revenue was already in the pipeline — it just needed a system to capture it.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── OFFERS ───────────────────────────────────────────── */}
      <section className="py-24">
        <div className="container">
          <div className="text-center mb-16">
            <div className="section-label mb-4 fade-up">The Path Forward</div>
            <h2
              className="text-4xl md:text-5xl font-black text-white fade-up"
              style={{ letterSpacing: "-0.03em" }}
            >
              Choose Your Starting Point
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Free Community */}
            <div
              className="p-8 rounded-2xl fade-up flex flex-col"
              style={{ backgroundColor: "#2A2D36", border: "1px solid rgba(255,255,255,0.06)" }}
            >
              <div className="section-label mb-3">Free Entry Point</div>
              <h3 className="text-xl font-black text-white mb-3">Pipeline Builders Network</h3>
              <p className="text-white/50 text-sm leading-relaxed mb-6 flex-1">
                A private Skool community for contractor and trades owners actively building their
                sales pipeline using the SOS framework. Weekly frameworks, monthly live calls,
                win-sharing threads.
              </p>
              <div className="text-2xl font-black text-white mb-6">Free</div>
              <a
                href="https://www.skool.com/sos-pipeline-builders-network"
                target="_blank"
                rel="noopener noreferrer"
                className="sos-ghost-btn px-6 py-3 rounded text-sm font-bold text-center block"
              >
                Join the Community
              </a>
            </div>

            {/* Sprint — Featured */}
            <div
              className="p-8 rounded-2xl fade-up flex flex-col relative"
              style={{
                backgroundColor: "#1C1E24",
                border: "2px solid #FF7900",
                boxShadow: "0 0 40px rgba(255,121,0,0.15)",
              }}
            >
              <div
                className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold tracking-wide"
                style={{ backgroundColor: "#FF7900", color: "#fff" }}
              >
                PRIMARY OFFER
              </div>
              <div className="section-label mb-3" style={{ color: "#FF7900" }}>
                30-Day Sprint
              </div>
              <h3 className="text-xl font-black text-white mb-3">SOS Quote Conversion Sprint</h3>
              <p className="text-white/60 text-sm leading-relaxed mb-4 flex-1">
                Done-with-you. 2 private 1:1 implementation calls. Full system installation.
                Scripts, templates, automations. Direct access to Ryan for 30 days.
                Satisfaction guarantee.
              </p>
              <ul className="space-y-2 mb-6">
                {[
                  "Week 1: Pipeline & Quote Clarity",
                  "Week 2: Follow-Up Engine Installed",
                  "Week 3: Scripts & Objection Handling",
                  "Week 4: Lock It In & Optimize",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-white/60">
                    <CheckCircle2 size={14} style={{ color: "#FF7900", flexShrink: 0, marginTop: 2 }} />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="text-3xl font-black text-white mb-6">$997</div>
              <a
                href="https://coach.ryanjamesmiller.com/offers/zruPZzFM/checkout"
                target="_blank"
                rel="noopener noreferrer"
                className="sos-orange-btn px-6 py-3.5 rounded text-sm font-bold text-center block"
              >
                Start the Sprint Now
              </a>
            </div>

            {/* 1:1 Consulting */}
            <div
              className="p-8 rounded-2xl fade-up flex flex-col"
              style={{ backgroundColor: "#2A2D36", border: "1px solid rgba(70,130,180,0.2)" }}
            >
              <div className="section-label mb-3">Flagship Offer</div>
              <h3 className="text-xl font-black text-white mb-3">SOS CTE 1:1 Consulting</h3>
              <p className="text-white/50 text-sm leading-relaxed mb-6 flex-1">
                For established trades businesses ($1M+) with existing teams who are ready to
                build a world-class sales engine. 90-day done-with-you engagement. Full SOS
                playbook, implemented pipeline, trained sales team.
              </p>
              <div className="text-2xl font-black text-white mb-2">Scoped Per Client</div>
              <p className="text-white/30 text-xs mb-6">90-day engagement</p>
              <a
                href="https://calendly.com/ryanjamesmiller/sos-discovery-call"
                target="_blank"
                rel="noopener noreferrer"
                className="sos-orange-btn px-6 py-3 rounded text-sm font-bold text-center block"
              >
                Book a Discovery Call
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ─── WHO IT'S FOR / NOT FOR ───────────────────────────── */}
      <section className="py-24" style={{ backgroundColor: "#23262E" }}>
        <div className="container">
          <div className="text-center mb-16">
            <div className="section-label mb-4 fade-up">Straight Talk</div>
            <h2
              className="text-4xl md:text-5xl font-black text-white fade-up"
              style={{ letterSpacing: "-0.03em" }}
            >
              This Is Built for You — Or It Isn't.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* For */}
            <div
              className="p-8 rounded-2xl fade-up"
              style={{ backgroundColor: "rgba(70,130,180,0.06)", border: "1px solid rgba(70,130,180,0.2)" }}
            >
              <h3 className="text-xl font-black text-white mb-6 flex items-center gap-2">
                <CheckCircle2 size={20} style={{ color: "#4682B4" }} />
                This IS for you if...
              </h3>
              <ul className="space-y-3">
                {[
                  "You're a founder-led specialty contractor or trades owner",
                  "You're doing $250K–$30M and hitting a revenue plateau",
                  "You're losing jobs because follow-up dies after quote delivery",
                  "You want to grow past owner-dependence before the next busy season",
                  "You've had the honest moment: the problem isn't leads — it's conversion",
                  "You want a system your team can run without you in every deal",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-white/70 text-sm">
                    <CheckCircle2 size={16} style={{ color: "#4682B4", flexShrink: 0, marginTop: 2 }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Not for */}
            <div
              className="p-8 rounded-2xl fade-up"
              style={{ backgroundColor: "rgba(239,68,68,0.05)", border: "1px solid rgba(239,68,68,0.15)" }}
            >
              <h3 className="text-xl font-black text-white mb-6 flex items-center gap-2">
                <XCircle size={20} style={{ color: "#ef4444" }} />
                This is NOT for you if...
              </h3>
              <ul className="space-y-3">
                {[
                  "You're a know-it-all unwilling to change how you operate",
                  "You want motivation without execution",
                  "Your business practices conflict with Christian values",
                  "You want tactics without investing in strategy and culture",
                  "You're looking for a course, a PDF, or a shortcut",
                  "You're not willing to do the work alongside the system",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-white/60 text-sm">
                    <XCircle size={16} style={{ color: "#ef4444", flexShrink: 0, marginTop: 2 }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ─── ABOUT RYAN ───────────────────────────────────────── */}
      <section className="py-24 relative overflow-hidden">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div
              className="relative rounded-2xl overflow-hidden fade-up"
              style={{
                border: "1px solid rgba(70,130,180,0.2)",
                minHeight: 480,
              }}
            >
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/106943050/ckBSY4wLs96BZ2LvuKj6yL/55611B66-D6EE-445E-B076-CA5A354237D1_502687a4.jpeg"
                alt="Ryan James Miller"
                className="w-full h-full object-cover object-top"
                style={{ minHeight: 480 }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1C1E24] via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <div className="text-2xl font-black text-white mb-1">Ryan James Miller</div>
                <div className="text-[#4682B4] text-sm font-semibold">Faith-Driven Sales Strategist</div>
                <div className="text-white/40 text-xs mt-1">Founder, SOS — Sales Operating System</div>
              </div>
            </div>

            <div>
              <div className="section-label mb-4 fade-up">About Ryan</div>
              <h2
                className="text-4xl md:text-5xl font-black text-white mb-6 fade-up"
                style={{ letterSpacing: "-0.03em" }}
              >
                Built for the Trades.{" "}
                <span style={{ color: "#4682B4" }}>Not Adapted From a Corporate Model.</span>
              </h2>
              <p className="text-white/60 text-base leading-relaxed mb-5 fade-up">
                Ryan James Miller is a faith-driven sales strategist who built the SOS framework
                from the ground up — specifically for trades and specialty contractors. Not adapted
                from a boardroom model. Built for the job site.
              </p>
              <p className="text-white/60 text-base leading-relaxed mb-8 fade-up">
                His core conviction: sales is stewardship, not manipulation. Every framework,
                every coaching session, every system he builds flows from his identity as a
                follower of Christ, husband, and father first.
              </p>


              <Link
                href="/about"
                className="sos-ghost-btn px-6 py-3 rounded text-sm font-bold inline-flex items-center gap-2 fade-up"
              >
                Read Ryan's Story <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>



      {/* ─── FINAL CTA ────────────────────────────────────────── */}
      <section
        className="py-28 relative overflow-hidden"
        style={{ backgroundColor: "#1C1E24" }}
      >
        <div className="absolute inset-0 blueprint-grid opacity-20" />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #FF7900 0%, transparent 70%)" }}
        />
        <div className="container relative z-10 text-center">
          <div className="section-label mb-6 fade-up">Ready to Build Your System?</div>
          <h2
            className="text-4xl md:text-6xl font-black text-white mb-6 fade-up"
            style={{ letterSpacing: "-0.03em" }}
          >
            Stop Watching Quotes Go Cold.
            <br />
            <span style={{ color: "#FF7900" }}>Start Closing.</span>
          </h2>
          <p className="text-white/60 text-lg max-w-xl mx-auto mb-10 fade-up">
            Turn stalled quotes into booked jobs in 30 days — without more leads or ads.
            Done-with-you. Satisfaction guaranteed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center fade-up">
            <a
              href="https://coach.ryanjamesmiller.com/offers/zruPZzFM/checkout"
              target="_blank"
              rel="noopener noreferrer"
              className="sos-orange-btn px-10 py-5 rounded text-base font-bold flex items-center justify-center gap-2"
            >
              Start the 30-Day Sprint — $997
              <ArrowRight size={18} />
            </a>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
