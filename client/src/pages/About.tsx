/* =============================================================
   SOS CTE About Page — Ryan's Story, Faith, Trades Credibility
   ============================================================= */
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "wouter";
import { ArrowRight, CheckCircle2 } from "lucide-react";

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

export default function About() {
  useScrollReveal();

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#1C1E24", color: "#F5F7F8" }}>
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 blueprint-grid opacity-20" />
        <div className="container relative z-10">
          <div className="max-w-3xl">
            <div className="section-label mb-5 fade-up">About Ryan James Miller</div>
            <h1
              className="text-5xl md:text-6xl font-black text-white mb-6 fade-up"
              style={{ letterSpacing: "-0.03em" }}
            >
              Built for the Trades.{" "}
              <span style={{ color: "#4682B4" }}>Grounded in Faith.</span>
            </h1>
            <p className="text-xl text-white/60 leading-relaxed fade-up">
              Ryan James Miller is a faith-driven sales strategist, coach, and movement builder
              who built the SOS framework from the ground up — specifically for trades and
              specialty contractors. Not adapted from a corporate model. Built for the job site.
            </p>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-20" style={{ backgroundColor: "#23262E" }}>
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div
              className="relative rounded-2xl overflow-hidden fade-up"
              style={{
                minHeight: 480,
                border: "1px solid rgba(70,130,180,0.2)",
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

            <div className="space-y-6 fade-up">
              <h2 className="text-3xl font-black text-white" style={{ letterSpacing: "-0.03em" }}>
                The Story Behind SOS
              </h2>
              <p className="text-white/60 leading-relaxed">
                Ryan operates from a faith-first identity — everything flows from his conviction as a
                follower of Christ, husband, and father. He builds frameworks, not tactics. He thinks
                in systems, moves in 90-day cycles, and measures success in both revenue and
                relational and spiritual fruit.
              </p>
              <p className="text-white/60 leading-relaxed">
                His core belief: <strong className="text-white">sales is stewardship, not manipulation.</strong> That
                conviction shapes every framework, every coaching session, every system he builds.
              </p>
              <p className="text-white/60 leading-relaxed">
                Through SOS, Ryan works directly with business owners, sales leaders, and their teams
                to build predictable, high-performance sales machines — not through pressure tactics,
                but through a philosophy that honors the client and the craft.
              </p>
              <p className="text-white/60 leading-relaxed">
                He also hosts the <strong className="text-white">Unlocking Greatness podcast</strong> (470+ episodes),
                authored <em className="text-white">Wounds: How Hurt, Heartache, and Tragedy Become the Keys to
                Unlocking Greatness</em>, and leads the Men of Greatness movement.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-14">
            <div className="section-label mb-4 fade-up">Core Values</div>
            <h2 className="text-4xl font-black text-white fade-up" style={{ letterSpacing: "-0.03em" }}>
              What Drives Everything
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Faith",
                desc: "Everything flows from identity as a follower of Christ. Faith informs every framework, every coaching conversation, every business decision.",
                color: "#4682B4",
              },
              {
                title: "Integrity",
                desc: "Sales is stewardship. Never manipulation. The right client, the right offer, the right outcome — or we don't do the deal.",
                color: "#FF7900",
              },
              {
                title: "Legacy",
                desc: "Not just revenue. Relational and spiritual fruit. Building businesses that outlast the owner and honor what God designed them to be.",
                color: "#CBBFAD",
              },
            ].map((value, i) => (
              <div
                key={i}
                className="p-8 rounded-2xl fade-up"
                style={{ backgroundColor: "#2A2D36", border: `1px solid ${value.color}25` }}
              >
                <div
                  className="text-3xl font-black mb-4"
                  style={{ color: value.color, letterSpacing: "-0.03em" }}
                >
                  {value.title}
                </div>
                <p className="text-white/60 leading-relaxed text-sm">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20" style={{ backgroundColor: "#13151A" }}>
        <div className="container text-center">
          <h2 className="text-4xl font-black text-white mb-6 fade-up" style={{ letterSpacing: "-0.03em" }}>
            Ready to Work with Ryan?
          </h2>
          <p className="text-white/50 text-lg mb-8 max-w-xl mx-auto fade-up">
            Start with the Sprint or jump straight to 1:1 consulting if you're at $1M+ and ready to build a world-class sales engine.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center fade-up">
            <a
              href="https://coach.ryanjamesmiller.com/offers/zruPZzFM/checkout"
              target="_blank"
              rel="noopener noreferrer"
              className="sos-orange-btn px-8 py-4 rounded text-sm font-bold inline-flex items-center gap-2"
            >
              Start the Sprint — $997 <ArrowRight size={16} />
            </a>
            <Link
              href="/results"
              className="sos-ghost-btn px-8 py-4 rounded text-sm font-semibold inline-flex items-center gap-2"
            >
              See the Results First
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
