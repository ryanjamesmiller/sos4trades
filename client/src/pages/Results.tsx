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

      {/* Consulting Success Story */}
      <section className="py-20" style={{ backgroundColor: "#23262E" }}>
        <div className="container">
          <div className="section-label mb-4 fade-up">Consulting Success Story</div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-4xl font-black text-white mb-4 fade-up" style={{ letterSpacing: "-0.03em" }}>
                Local Garage Door Company
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
                This consulting success story is the standard everything else is measured against.
                A founder-led garage door company that was doing $40K in profit implemented the
                full SOS framework and grew to $1.4M.
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

      {/* Quote Revival Campaign */}
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
                Residential Water Filtration
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

      {/* ─── TESTIMONIALS ─────────────────────────────────── */}
      <section className="py-24" style={{ backgroundColor: "#1C1E24" }}>
        <div className="container">
          <div className="text-center mb-16">
            <div className="section-label mb-4 fade-up">What Clients Say</div>
            <h2
              className="text-4xl font-black text-white fade-up"
              style={{ letterSpacing: "-0.03em" }}
            >
              Straight From the People in the Room
            </h2>
          </div>

          {/* Featured testimonial — Paul Shibley */}
          <div
            className="p-10 rounded-2xl mb-10 fade-up"
            style={{
              backgroundColor: "#23262E",
              border: "1px solid rgba(70,130,180,0.25)",
              boxShadow: "0 0 40px rgba(70,130,180,0.06)",
            }}
          >
            <div
              className="text-3xl font-black text-white/10 mb-4 leading-none"
              style={{ fontFamily: "Georgia, serif", fontSize: 64 }}
            >
              &ldquo;
            </div>
            <p className="text-white/80 text-lg leading-relaxed mb-8 italic" style={{ marginTop: -24 }}>
              You are a BIG breath of fresh air for our old business. We needed new perspective and advice,
              and you provided that with a clear roadmap forward. Your guidance helped our leadership define
              what truly matters for the business, customers, and employees, allowing us to refocus on core
              priorities. You have an incredible ability to cut through the noise and get to the heart of
              issues. The accountability you bring helps refine not just operations, but also realigns our
              people with our central purpose. Your coaching balances big-picture vision with practical,
              actionable steps. You challenge us to think differently, avoid shiny distractions, yet also
              roll up your sleeves to drive real change. The positive impact on our culture, morale and
              future of the business cannot be overstated. Your authenticity, empathy, and passion for
              helping companies reach their potential is truly inspiring. Thank you for making our business
              more than better.
            </p>
            <div className="flex items-center gap-4">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-white font-black text-sm flex-shrink-0"
                style={{ backgroundColor: "#4682B4" }}
              >
                PS
              </div>
              <div>
                <div className="text-white font-bold text-sm">Paul Shibley</div>
                <div className="text-white/40 text-xs">President</div>
              </div>
            </div>
          </div>

          {/* Grid testimonials */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                quote:
                  "You have given us sound council on how to make our firm better and have proven yourself to be a trustworthy business partner for us. We are so glad that you can speak strategy with our team and have led us in the area of sales/marketing.",
                name: "Ben Conner",
                title: "CEO",
                initials: "BC",
              },
              {
                quote:
                  "You have made our business better by challenging the norms and the voice of our business development, account management, and marketing teams. Hearing it from someone who is not part of our company, instead of someone within, yet with industry knowledge provides a completely different perspective to the teams. For me, you have made my job better by reminding me of things forgotten and nudging me to drive the team in the right direction. I know that I, and the team, appreciate your candor, conviction, direct approach, and honest feedback.",
                name: "Dave Parker",
                title: "VP of Sales and Marketing",
                initials: "DP",
              },
              {
                quote:
                  "Can't speak highly enough of the pivotal role you played at a critical moment in my journey. When I was on the verge of giving up, your authentic guidance and actionable advice not only helped me combat imposter syndrome but also instilled a newfound sense of direction and purpose in my approach to leadership and business management. Your emphasis on effective time management, building strong relationships, setting aligned goals, intrinsic motivation, resilience, understanding clients, listening, and focusing on outcomes has been transformative. I'm truly grateful for your mentorship — your impact has been a game-changer for me.",
                name: "Joel Daniels",
                title: "CEO",
                initials: "JD",
              },
              {
                quote:
                  "You have shown me a path on how I can step away from the office and grow our technicians/installers to the highest quality possible.",
                name: "Kyle Colton",
                title: "VP of Operations",
                initials: "KC",
              },
            ].map((t, i) => (
              <div
                key={i}
                className="p-8 rounded-xl fade-up"
                style={{
                  backgroundColor: "#2A2D36",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <p className="text-white/70 text-sm leading-relaxed italic mb-6">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-white font-black text-xs flex-shrink-0"
                    style={{ backgroundColor: "rgba(70,130,180,0.25)", border: "1px solid rgba(70,130,180,0.4)" }}
                  >
                    {t.initials}
                  </div>
                  <div>
                    <div className="text-white font-bold text-sm">{t.name}</div>
                    <div className="text-white/40 text-xs">{t.title}</div>
                  </div>
                </div>
              </div>
            ))}
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
