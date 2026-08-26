/* =============================================================
   SOS CTE Results Page — Case Studies & Proof
   ============================================================= */
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowRight, TrendingUp, CheckCircle2 } from "lucide-react";
import { Link } from "wouter";

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

      {/* Case Study 01 — Local Garage Door Company */}
      <section className="py-20" style={{ backgroundColor: "#23262E" }}>
        <div className="container">
          <div className="section-label mb-4 fade-up">Case Study 01 · Local Garage Door Company</div>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:items-start">
            <div>
              <h2 className="mb-6 text-white fade-up">
                They Forgot. <span style={{ color: "#FF7900" }}>Not Gone.</span>
              </h2>

              <div className="mb-8 grid grid-cols-3 overflow-hidden border border-white/10 bg-[#1C1E24] fade-up">
                {[
                  { value: "280+", label: "Dead quotes" },
                  { value: "$52K", label: "Revenue recovered" },
                  { value: "30", label: "Days" },
                ].map((stat) => (
                  <div key={stat.label} className="border-r border-white/10 p-4 text-center last:border-r-0 sm:p-6">
                    <div className="text-2xl font-black text-white sm:text-3xl">{stat.value}</div>
                    <div className="mt-1 text-xs font-bold uppercase tracking-[0.12em] text-white/35">{stat.label}</div>
                  </div>
                ))}
              </div>

              <div className="space-y-5 fade-up">
                <p className="text-white/60 leading-relaxed">
                  A founder-led local garage door company had well over 280 dead quotes sitting in its system. These weren't new leads gone cold. They were jobs the team had already bid and already earned the right to close—quotes that had simply gone quiet with no structured follow-up behind them.
                </p>
                <p className="text-white/60 leading-relaxed">
                  Nothing was wrong with the leads or the pitch. The real issue was the <strong className="text-white">Field-to-Office Gap</strong>: strong field work with no office system to keep a quote alive after the homeowner went quiet. The team was reactive to the customer's communication instead of proactive with its own.
                </p>
                <p className="text-white/60 leading-relaxed">
                  SOS installed a seven-touch follow-up sequence with specific timing, specific scripts, and three channels—call, text, and email. Then Ryan spent one day working directly with the company's office administrator, training her to run the sequence from the newest estimates backward through the list.
                </p>
                <p className="text-white/80 leading-relaxed">
                  In 30 days, the local garage door company generated nearly <strong className="text-[#FF7900]">$52,000 in new revenue</strong>, all recovered from quotes already sitting in the pipeline. No new leads. No new ad spend.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="relative overflow-hidden border border-[#4682B4]/30 bg-[#1C1E24] p-7 fade-up blueprint-grid sm:p-9">
                <div className="absolute right-0 top-0 h-16 w-16 border-r-2 border-t-2 border-[#FF7900]/75" />
                <div className="section-label mb-4">The Build</div>
                <h3 className="mb-6 text-white">Specific Timing. Specific Scripts. Three Channels.</h3>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { value: "7", label: "Touches" },
                    { value: "3", label: "Channels" },
                    { value: "1", label: "Training day" },
                  ].map((item) => (
                    <div key={item.label} className="border border-white/8 bg-[#2A2D36] p-4 text-center">
                      <div className="text-3xl font-black text-[#4682B4]">{item.value}</div>
                      <div className="mt-1 text-xs font-bold uppercase tracking-[0.1em] text-white/35">{item.label}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 flex items-center justify-between gap-2 border-t border-white/8 pt-5 text-xs font-bold uppercase tracking-[0.12em] text-white/45">
                  <span>Call</span>
                  <ArrowRight size={14} className="text-[#4682B4]" />
                  <span>Text</span>
                  <ArrowRight size={14} className="text-[#4682B4]" />
                  <span>Email</span>
                </div>
                <p className="mt-5 text-sm leading-relaxed text-white/50">
                  Ryan trained the office administrator to start with the newest estimates and work backward through the 280-plus quote list.
                </p>
              </div>

              <div className="border-l-4 border-[#4682B4] bg-[#1C1E24] p-6 fade-up">
                <div className="section-label mb-3">What homeowners kept saying</div>
                <p className="text-white/75 italic leading-relaxed">
                  “Oh, we actually did want to move forward. We just got busy and forgot.”
                </p>
                <p className="mt-4 text-sm leading-relaxed text-white/45">
                  They hadn't rejected the quote. They had simply been waiting for someone to show back up.
                </p>
              </div>

              <div className="border border-[#FF7900]/35 bg-[#FF7900]/[0.06] p-6 fade-up">
                <p className="text-xl font-black text-white">They forgot. Not gone.</p>
                <p className="mt-2 text-sm text-white/50">Just waiting on someone to show back up.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Case Study 02 — 47 Open Quotes */}
      <section className="py-20">
        <div className="container">
          <div className="section-label mb-4 fade-up">Case Study 02 · 47 Open Quotes</div>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
            <div className="space-y-6">
              <div className="border border-[#4682B4]/30 bg-[#2A2D36] p-8 fade-up sm:p-10">
                <div className="type-stat text-[#4682B4]">47</div>
                <div className="mt-2 text-lg font-bold text-white">Open quotes in a spreadsheet</div>
                <p className="mt-3 text-sm leading-relaxed text-white/45">
                  No follow-up process. No system. Just leads going cold while the team stayed heads down on the next job.
                </p>
                <div className="mt-7 grid grid-cols-2 gap-3">
                  <div className="border border-white/8 bg-[#1C1E24] p-4">
                    <div className="text-3xl font-black text-white">5</div>
                    <div className="mt-1 text-xs font-bold uppercase tracking-[0.12em] text-white/35">Leads revived</div>
                  </div>
                  <div className="border border-white/8 bg-[#1C1E24] p-4">
                    <div className="text-3xl font-black text-[#FF7900]">2</div>
                    <div className="mt-1 text-xs font-bold uppercase tracking-[0.12em] text-white/35">Jobs closed</div>
                  </div>
                </div>
              </div>

              <div className="border border-white/10 bg-[#17191F] p-6 fade-up">
                <div className="section-label mb-4">The sequence going forward</div>
                <div className="grid grid-cols-3 gap-3">
                  {["Day 3", "Day 7", "Day 14"].map((day, index) => (
                    <div key={day} className="border border-[#4682B4]/20 bg-[#4682B4]/[0.06] p-3 text-center">
                      <div className="text-xs font-bold text-[#4682B4]">0{index + 1}</div>
                      <div className="mt-1 text-sm font-bold text-white">{day}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <h2 className="mb-6 text-white fade-up">
                The Team Stopped Guessing. <span style={{ color: "#4682B4" }}>And Started Executing.</span>
              </h2>
              <div className="space-y-5 fade-up">
                <p className="text-white/60 leading-relaxed">
                  At the start of a 30-day Sprint Session, this contractor had 47 open quotes sitting in a spreadsheet with no follow-up process behind them. SOS built one thing first: a revival campaign with simple scripts, a clear sequence, and a way to track what happened after every touch.
                </p>
                <p className="text-white/60 leading-relaxed">
                  Five leads came back to life. Two became closed jobs. Then the team built the next layer: a follow-up sequence for every new quote going forward—Day 3, Day 7, and Day 14 if nothing moved.
                </p>
                <p className="text-white/80 leading-relaxed">
                  The team stopped guessing and started executing. On the final call, the contractor described exactly what had changed:
                </p>
              </div>

              <div className="mt-7 space-y-3 fade-up">
                {[
                  "I finally feel organized in our follow up, knowing where every customer's at.",
                  "Our closing rate over the last month or two has gone up since we've been pre-qualifying and doing better follow-up.",
                  "I've actually used your script, man, the one you wrote almost word for word. That helped.",
                ].map((quote) => (
                  <blockquote key={quote} className="border-l-2 border-[#4682B4] bg-[#2A2D36] px-5 py-4 text-sm italic leading-relaxed text-white/75">
                    “{quote}”
                  </blockquote>
                ))}
              </div>

              <div className="mt-7 flex gap-3 border border-white/10 bg-[#17191F] p-6 fade-up">
                <CheckCircle2 className="mt-0.5 shrink-0 text-[#FF7900]" size={20} />
                <p className="text-sm leading-relaxed text-white/65">
                  You do not need more leads. You need a system that makes sure the ones you already have do not die in a spreadsheet. If your quotes are piling up with no process behind them, that is fixable in 30 days.
                </p>
              </div>

              <p className="mt-6 text-xl font-black leading-tight text-white fade-up">
                What would it be worth to your business if every quote got the follow-up it deserved?
              </p>
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
              className="type-stat text-white/10 mb-4 leading-none"
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
            Find out which part of your pipeline is leaking before you spend another dollar chasing new leads.
          </p>
          <Link
            href="/scorecard"
            className="sos-orange-btn px-10 py-5 rounded text-base font-bold inline-flex items-center gap-2 fade-up"
          >
            Get My Full Capture Score <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
