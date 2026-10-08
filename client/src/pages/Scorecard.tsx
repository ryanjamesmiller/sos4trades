/* =============================================================
   SOS Full Capture Scorecard — Steel & Signal Design System
   Exact SOS CTE shell: graphite, steel blue, orange signal CTAs,
   blueprint linework, DM Sans, and asymmetric industrial layouts.
   ============================================================= */
import { type FormEvent, useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Clock3,
  Eye,
  RefreshCw,
  ShieldCheck,
  Users,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const HERO_IMAGE = "/assets/sos-scorecard-hero.webp";
const SCORECARD_MARK = "/assets/sos-scorecard-mark.png";

const SECTIONS = [
  {
    name: "Total Visibility",
    short: "Visibility",
    prompt: "Do you actually know what's happening to every quote, or does it live in your head?",
    icon: Eye,
  },
  {
    name: "Zero Cold Quotes",
    short: "Follow-Up",
    prompt: "When a quote goes quiet, does something happen automatically, or does it depend on you remembering?",
    icon: RefreshCw,
  },
  {
    name: "System Handoff",
    short: "Handoff",
    prompt: "If you took two weeks off tomorrow, would the pipeline keep moving without you?",
    icon: Users,
  },
] as const;

const QUESTIONS = [
  { section: 0, text: "If I asked you right now, you could tell me exactly how many open quotes you're sitting on, no digging required." },
  { section: 0, text: "Every job that comes through gets logged into a real pipeline stage, not just a mental note or a sticky pad." },
  { section: 0, text: "Someone besides you could pull up any deal's status without calling or texting you first." },
  { section: 0, text: "You know your close rate on the last 60 days of quotes off the top of your head." },
  { section: 1, text: "When a quote sits quiet for a week, something automatically happens next. It doesn't wait on you to remember." },
  { section: 1, text: "Most of the quotes you deliver close within 30 days." },
  { section: 1, text: "You've got a written follow-up cadence—exact touches, exact timing—that runs on every quote without you thinking about it." },
  { section: 1, text: "You could tell me right now which of your old, dead quotes are actually still worth chasing." },
  { section: 2, text: "If you took two weeks off tomorrow, new opportunities would keep moving without you touching them." },
  { section: 2, text: "At least one other person on your team has defined sales responsibilities and gets held to a number." },
  { section: 2, text: "There's a weekly rhythm—a meeting, a report, a review—that runs whether or not you're the one running it." },
  { section: 2, text: "A new hire could learn your sales process from something written down, not by shadowing you for three months." },
] as const;

const ANSWER_LABELS = ["Never true", "Rarely true", "Sometimes true", "Usually true", "Always true"];

const LEAKS = [
  {
    tag: "Obstacle 01 · The Black Box",
    title: "Nobody can see what's actually happening in your pipeline.",
    body: "Right now, the state of every open quote lives in your head, your notebook, or a scattered text thread. Nothing is wrong with your work ethic. What's missing is a defined stage for every opportunity and a place to see it that isn't you.",
    next: "Start with pipeline visibility: define the stages, establish the baseline, and make every open quote visible in one operating view.",
  },
  {
    tag: "Obstacle 02 · The Memory Leak",
    title: "Quotes are going cold because follow-up depends on your memory.",
    body: "You didn't lose those jobs to a cheaper bid. You lost them to silence. Without a structured, automated cadence, every quote you deliver is one busy week away from going quiet for good.",
    next: "Start with the follow-up engine: exact touches, exact timing, and a system that activates before a quote turns cold.",
  },
  {
    tag: "Obstacle 03 · The One-Man Ceiling",
    title: "You're still the only one who can close, so growth is capped at your capacity.",
    body: "You've built something real. But if the business runs on your personal hustle instead of a system, your name is both what built it and what's capping it now.",
    next: "Start with the handoff: document the process, assign ownership, and install a weekly rhythm the business can run without you.",
  },
] as const;

type Screen = "landing" | "quiz" | "capture" | "results";

// Each finished scorecard is saved to the Jotform "Full Capture Scorecard - Results" form (10/07/26).
const RESULTS_FORM_ID = "262798199132066";
const RESULTS_FORM_URL = `https://submit.jotform.com/submit/${RESULTS_FORM_ID}`;

function hasUnlockParameter() {
  return typeof window !== "undefined" && new URLSearchParams(window.location.search).get("unlocked") === "1";
}

// Remember the channel link (utm_*) a visitor arrived on, so the saved result says where they came from.
function readSource() {
  const keys = ["utm_source", "utm_medium", "utm_campaign"] as const;
  const params = new URLSearchParams(window.location.search);
  const source: Record<string, string> = {};
  for (const key of keys) {
    let value = params.get(key) ?? "";
    try {
      if (value) sessionStorage.setItem(key, value);
      else value = sessionStorage.getItem(key) ?? "";
    } catch {
      /* storage blocked: use what the URL gave us */
    }
    source[key] = value;
  }
  return {
    source: [source.utm_source, source.utm_medium].filter(Boolean).join(" / ") || "direct",
    campaign: source.utm_campaign,
  };
}

function scorePercent(sum: number) {
  return Math.round(((sum - 4) / 16) * 100);
}

function scoreBand(score: number) {
  if (score < 40) return { label: "Wide Open", color: "#F47A5B", copy: "Revenue is escaping through multiple parts of the pipeline." };
  if (score < 70) return { label: "Partially Sealed", color: "#FFB04A", copy: "The system has pieces, but execution still depends too heavily on memory and owner effort." };
  return { label: "Locked Down", color: "#69B89D", copy: "Your capture system is strong. The next gain comes from tightening the weakest remaining handoff." };
}

function BrandMark({ className = "h-10 w-10" }: { className?: string }) {
  return <img src={SCORECARD_MARK} alt="" aria-hidden="true" className={`${className} object-contain`} />;
}

export default function Scorecard() {
  const [screen, setScreen] = useState<Screen>(() => (hasUnlockParameter() ? "quiz" : "landing"));
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Array<number | null>>(() => new Array(QUESTIONS.length).fill(null));
  const [arrival] = useState(readSource);

  useEffect(() => {
    document.title = "Full Capture Scorecard | SOS Contractors & Trades";
    const description = "Find where revenue is leaking from your contractor sales pipeline in four minutes with the SOS Full Capture Scorecard.";
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", description);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [screen]);

  const sectionScores = useMemo(() => {
    return SECTIONS.map((_, sectionIndex) => {
      const sum = QUESTIONS.reduce((total, question, index) => {
        return question.section === sectionIndex ? total + (answers[index] ?? 1) : total;
      }, 0);
      return scorePercent(sum);
    });
  }, [answers]);

  const overallScore = Math.round(sectionScores.reduce((sum, score) => sum + score, 0) / sectionScores.length);
  const weakestSection = sectionScores.indexOf(Math.min(...sectionScores));

  function startQuiz() {
    setScreen("quiz");
  }

  function saveResult(contact: Contact) {
    const data = new FormData();
    data.append("formID", RESULTS_FORM_ID);
    data.append("simple_spc", `${RESULTS_FORM_ID}-${RESULTS_FORM_ID}`);
    data.append("website", "");
    data.append("q2_q2_textbox0", contact.name);
    data.append("q3_q3_email1", contact.email);
    data.append("q4_q4_textbox2", contact.company);
    data.append("q5_q5_textbox3", contact.phone);
    data.append("q6_q6_textbox4", String(overallScore));
    data.append("q7_q7_textbox5", String(sectionScores[0]));
    data.append("q8_q8_textbox6", String(sectionScores[1]));
    data.append("q9_q9_textbox7", String(sectionScores[2]));
    data.append("q10_q10_textbox8", SECTIONS[weakestSection].name);
    data.append("q11_q11_textbox9", answers.map((answer) => answer ?? "-").join(","));
    data.append("q12_q12_textbox10", arrival.source);
    data.append("q13_q13_textbox11", arrival.campaign);
    // Results show either way; a failed save must never block the owner from his score.
    return fetch(RESULTS_FORM_URL, { method: "POST", mode: "no-cors", body: data }).catch(() => undefined);
  }

  function selectAnswer(value: number) {
    const nextAnswers = [...answers];
    nextAnswers[questionIndex] = value;
    setAnswers(nextAnswers);

    window.setTimeout(() => {
      if (questionIndex < QUESTIONS.length - 1) {
        setQuestionIndex((current) => current + 1);
      } else {
        setScreen("capture");
      }
    }, 140);
  }

  function restart() {
    setAnswers(new Array(QUESTIONS.length).fill(null));
    setQuestionIndex(0);
    setScreen("quiz");
  }

  return (
    <div className="min-h-screen bg-[#1C1E24] text-[#F5F7F8]">
      <Navbar />
      <main>
        {screen === "landing" && <LandingPage onStart={startQuiz} />}
        {screen === "quiz" && (
          <Quiz
            questionIndex={questionIndex}
            answers={answers}
            onAnswer={selectAnswer}
            onBack={() => setQuestionIndex((current) => Math.max(0, current - 1))}
          />
        )}
        {screen === "capture" && (
          <ContactCapture
            onBack={() => setScreen("quiz")}
            onSubmit={async (contact) => {
              await saveResult(contact);
              setScreen("results");
            }}
          />
        )}
        {screen === "results" && (
          <Results
            overall={overallScore}
            sectionScores={sectionScores}
            weakestSection={weakestSection}
            onRestart={restart}
          />
        )}
      </main>
      {(screen === "landing" || screen === "results") && <Footer />}
    </div>
  );
}

function LandingPage({ onStart }: { onStart: () => void }) {
  return (
    <>
      <section className="relative min-h-[760px] overflow-hidden pt-28 md:pt-36 blueprint-grid">
        <div className="absolute inset-0">
          <img src={HERO_IMAGE} alt="" className="h-full w-full object-cover object-center opacity-75" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,#1C1E24_0%,rgba(28,30,36,0.96)_42%,rgba(28,30,36,0.52)_72%,rgba(28,30,36,0.78)_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(28,30,36,0.05),#1C1E24_98%)]" />
        </div>

        <div className="container relative z-10 grid items-center gap-12 pb-24 pt-10 lg:grid-cols-[1.15fr_0.85fr] lg:pb-28 lg:pt-16">
          <div className="max-w-4xl">
            <div className="mb-8 flex items-center gap-4">
              <BrandMark className="h-12 w-12 md:h-14 md:w-14" />
              <div>
                <p className="section-label">SOS · Contractors & Trades</p>
                <p className="mt-1 text-xs font-semibold uppercase tracking-[0.22em] text-white/45">Full Capture Diagnostic</p>
              </div>
            </div>

            <h1 className="type-hero-title max-w-4xl text-white">
              You didn't lose that job to a cheaper bid.
            </h1>
            <p className="mt-7 max-w-3xl text-xl font-semibold leading-relaxed text-[#FF7900] md:text-2xl">
              You lost it to silence.
            </p>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/68 md:text-lg">
              Take the Full Capture Scorecard and find out in four minutes exactly where your revenue is leaking, before you spend another dollar chasing new leads.
            </p>

            <div className="mt-9 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <button onClick={onStart} className="sos-orange-btn inline-flex items-center gap-3 rounded px-7 py-4 text-base font-bold">
                Get My Full Capture Score <ArrowRight size={18} />
              </button>
              <div className="flex items-center gap-2 text-sm text-white/45">
                <Clock3 size={16} className="text-[#4682B4]" />
                12 questions · About 4 minutes
              </div>
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="relative ml-auto max-w-md border border-[#4682B4]/35 bg-[#17191F]/82 p-7 shadow-2xl shadow-black/35 backdrop-blur-sm">
              <div className="absolute -right-2 -top-2 h-16 w-16 border-r-2 border-t-2 border-[#FF7900]" />
              <p className="section-label">Diagnostic Readout</p>
              <h2 className="mt-4 text-2xl font-extrabold text-white">Three places revenue leaks out.</h2>
              <div className="mt-7 space-y-5">
                {SECTIONS.map((section, index) => (
                  <div key={section.name} className="grid grid-cols-[40px_1fr_auto] items-center gap-3 border-b border-white/7 pb-5 last:border-0 last:pb-0">
                    <span className="type-ui-label text-[#4682B4]">0{index + 1}</span>
                    <span className="text-sm font-bold text-white/85">{section.name}</span>
                    <span className="h-2 w-2 bg-[#FF7900] shadow-[0_0_14px_rgba(255,121,0,0.6)]" />
                  </div>
                ))}
              </div>
              <div className="mt-7 border-l-2 border-[#4682B4] pl-4 text-sm leading-relaxed text-white/48">
                Find the leak. Fix the system. Capture the revenue.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-y border-white/5 bg-[#17191F] py-20 text-white md:py-28 blueprint-grid">
        <div className="absolute right-0 top-0 h-full w-[36%] bg-[linear-gradient(135deg,transparent_0%,rgba(70,130,180,0.05)_100%)]" />
        <div className="container grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
          <div>
            <p className="section-label">The real problem</p>
            <h2 className="mt-4 text-4xl font-black leading-tight tracking-[-0.035em] text-white md:text-5xl">
              The revenue is already in your pipeline.
            </h2>
            <div className="mt-7 h-1 w-20 bg-[#FF7900]" />
          </div>
          <div className="relative space-y-6 border-l border-[#4682B4]/35 pl-6 text-lg leading-relaxed text-white/58 md:pl-10">
            <p>
              Most contractors think their problem is not enough leads. It isn't. Somewhere in your pipeline right now sits a stack of quotes you already earned—real jobs, real interest, real money—that went quiet because nobody had a system to catch them before they went cold.
            </p>
            <p className="font-semibold text-white">
              The Full Capture Scorecard grades your business across the three places that revenue leaks out.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#20232B] py-20 md:py-28 blueprint-grid">
        <div className="container">
          <div className="mb-12 grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
            <div>
              <p className="section-label">The three leak points</p>
              <h2 className="mt-4 max-w-3xl text-4xl font-black text-white md:text-5xl">Know exactly which leak to plug first.</h2>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-white/45">Each category gets its own score. Your lowest score reveals the first system constraint to fix.</p>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            {SECTIONS.map((section, index) => {
              const Icon = section.icon;
              return (
                <article key={section.name} className="group relative overflow-hidden border border-white/10 bg-[#17191F] shadow-xl shadow-black/15">
                  <div className="absolute right-0 top-0 h-14 w-14 border-r-2 border-t-2 border-[#4682B4]/50 transition-colors group-hover:border-[#FF7900]" />
                  <div className="relative h-48 overflow-hidden border-b border-white/8 bg-[#1C1E24] blueprint-grid">
                    <span className="type-ui-label absolute left-5 top-5 text-[#4682B4]">MODULE · 0{index + 1}</span>
                    <Icon className="absolute bottom-6 right-7 h-16 w-16 text-[#4682B4]/24 transition-colors group-hover:text-[#4682B4]/40" strokeWidth={1.2} />
                    <div className="absolute bottom-8 left-5 right-24 space-y-2">
                      <span className="block h-1 w-full bg-[#4682B4]/18"><span className="block h-full w-[82%] bg-[#4682B4]/65" /></span>
                      <span className="block h-1 w-full bg-[#4682B4]/18"><span className="block h-full w-[58%] bg-[#4682B4]/45" /></span>
                      <span className="block h-1 w-full bg-[#4682B4]/18"><span className="block h-full w-[36%] bg-[#FF7900]/75" /></span>
                    </div>
                  </div>
                  <div className="relative p-6 pt-0">
                    <div className="-mt-6 mb-5 flex h-12 w-12 items-center justify-center bg-[#4682B4] text-white shadow-lg shadow-black/30">
                      <Icon size={22} />
                    </div>
                    <h3 className="text-2xl font-extrabold text-white">{section.name}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-white/55">{section.prompt}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-[#13151A] py-20 md:py-24">
        <div className="container grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="section-label">What you get</p>
            <h2 className="mt-4 max-w-3xl text-4xl font-black text-white md:text-5xl">Twelve questions. Four minutes. One clear first move.</h2>
            <p className="mt-5 max-w-3xl text-lg leading-relaxed text-white/58">
              You'll walk away with a score for each leak point and know exactly which one to plug first.
            </p>
            <div className="mt-8 border-l-4 border-[#FF7900] bg-white/[0.035] p-6">
              <p className="text-lg leading-relaxed text-white/68">
                <strong className="text-white">A local garage door company ran this exact diagnostic and recovered $52,000 from cold quotes in 30 days.</strong> Same leads they already had. Different system.
              </p>
            </div>
          </div>
          <div className="lg:pl-10">
            <button onClick={onStart} className="sos-orange-btn inline-flex items-center gap-3 rounded px-8 py-4 text-base font-bold">
              Get My Full Capture Score <ArrowRight size={18} />
            </button>
            <p className="mt-4 max-w-sm text-xs leading-relaxed text-white/35">
              No spam. Just your score and, if there's a real gap, a straight answer on the fastest way to close it.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

type Contact = { name: string; email: string; company: string; phone: string };

function ContactCapture({ onBack, onSubmit }: { onBack: () => void; onSubmit: (contact: Contact) => Promise<void> }) {
  const [contact, setContact] = useState<Contact>({ name: "", email: "", company: "", phone: "" });
  const [saving, setSaving] = useState(false);
  const fields: Array<{ key: keyof Contact; label: string; type: string; required: boolean; autoComplete: string }> = [
    { key: "name", label: "Your name", type: "text", required: true, autoComplete: "name" },
    { key: "email", label: "Email", type: "email", required: true, autoComplete: "email" },
    { key: "company", label: "Company", type: "text", required: true, autoComplete: "organization" },
    { key: "phone", label: "Phone (optional)", type: "tel", required: false, autoComplete: "tel" },
  ];

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (saving) return;
    setSaving(true);
    await onSubmit({
      name: contact.name.trim(),
      email: contact.email.trim(),
      company: contact.company.trim(),
      phone: contact.phone.trim(),
    });
  }

  return (
    <section className="min-h-[calc(100vh-80px)] bg-[#1C1E24] pb-20 pt-28 blueprint-grid md:pt-36">
      <div className="container">
        <div className="mx-auto max-w-5xl">
          <button onClick={onBack} className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-white/45 transition hover:text-white">
            <ArrowLeft size={16} /> Back to the questions
          </button>

          <div className="grid overflow-hidden border border-white/10 bg-[#17191F] shadow-2xl shadow-black/30 lg:grid-cols-[0.82fr_1.18fr]">
            <div className="relative overflow-hidden border-b border-white/10 p-8 lg:border-b-0 lg:border-r lg:p-10">
              <div className="absolute inset-0 opacity-30 blueprint-grid" />
              <div className="relative">
                <BrandMark className="h-14 w-14" />
                <p className="section-label mt-7">Diagnostic complete · 12 / 12</p>
                <h1 className="type-subsection-title mt-4 text-white">Your score is ready.</h1>
                <p className="mt-5 text-base leading-relaxed text-white/55">
                  Tell us where to send it and your results open on the next screen.
                </p>
                <div className="mt-8 space-y-4 text-sm text-white/50">
                  <div className="flex gap-3"><Check size={18} className="mt-0.5 shrink-0 text-[#4682B4]" /> Three category scores</div>
                  <div className="flex gap-3"><Check size={18} className="mt-0.5 shrink-0 text-[#4682B4]" /> Your biggest revenue leak</div>
                  <div className="flex gap-3"><Check size={18} className="mt-0.5 shrink-0 text-[#4682B4]" /> The first system move to make</div>
                </div>
              </div>
            </div>

            <form onSubmit={submit} className="bg-[#F5F7F8] p-6 text-[#1C1E24] sm:p-8 lg:p-10">
              <h2 className="type-subsection-title text-[#1C1E24]">See your Full Capture Score</h2>
              <div className="mt-6 space-y-4">
                {fields.map((field) => (
                  <label key={field.key} className="block">
                    <span className="text-sm font-semibold text-[#41424C]">{field.label}</span>
                    <input
                      type={field.type}
                      required={field.required}
                      autoComplete={field.autoComplete}
                      value={contact[field.key]}
                      onChange={(event) => setContact({ ...contact, [field.key]: event.target.value })}
                      className="mt-1.5 w-full border border-[#41424C]/20 bg-white px-4 py-3 text-base text-[#1C1E24] outline-none transition focus:border-[#4682B4]"
                    />
                  </label>
                ))}
              </div>
              <button
                type="submit"
                disabled={saving}
                className="sos-orange-btn mt-7 inline-flex w-full items-center justify-center gap-3 rounded px-7 py-4 text-base font-bold disabled:opacity-60"
              >
                {saving ? "Opening your score..." : "Show My Score"} <ArrowRight size={18} />
              </button>
              <p className="mt-4 text-xs leading-relaxed text-[#41424C]/70">
                No spam. Just your score and, if there's a real gap, a straight answer on the fastest way to close it.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

function Quiz({
  questionIndex,
  answers,
  onAnswer,
  onBack,
}: {
  questionIndex: number;
  answers: Array<number | null>;
  onAnswer: (value: number) => void;
  onBack: () => void;
}) {
  const question = QUESTIONS[questionIndex];
  const section = SECTIONS[question.section];

  return (
    <section className="min-h-screen bg-[#1C1E24] pb-16 pt-28 blueprint-grid md:pt-32">
      <div className="container">
        <div className="mx-auto max-w-3xl">
          <div className="mb-7 flex items-center justify-between gap-5">
            <div className="flex items-center gap-3">
              <BrandMark className="h-10 w-10" />
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#4682B4]">Full Capture Scorecard</p>
                <p className="mt-1 text-xs text-white/35">Answer for how the business actually runs today.</p>
              </div>
            </div>
            <span className="type-ui-label shrink-0 whitespace-nowrap text-white/50">{String(questionIndex + 1).padStart(2, "0")} / 12</span>
          </div>

          <div className="mb-8 grid grid-cols-12 gap-1.5" aria-label={`Question ${questionIndex + 1} of 12`}>
            {QUESTIONS.map((_, index) => (
              <span
                key={index}
                className={`h-1.5 transition-colors duration-200 ${
                  index < questionIndex ? "bg-[#4682B4]" : index === questionIndex ? "bg-[#FF7900]" : "bg-white/10"
                }`}
              />
            ))}
          </div>

          <div className="relative border border-white/10 bg-[#20232B] p-6 shadow-2xl shadow-black/25 sm:p-9 md:p-11">
            <div className="absolute right-0 top-0 h-16 w-16 border-r-2 border-t-2 border-[#4682B4]/55" />
            <div className="mb-7 flex items-center gap-3">
              <span className="type-ui-label flex h-9 w-9 items-center justify-center bg-[#4682B4]/15 text-[#4682B4]">0{question.section + 1}</span>
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#4682B4]">{section.name}</p>
            </div>

            <h1 className="type-quiz-question normal-case text-white">
              {question.text}
            </h1>

            <div className="mt-8 grid gap-3" role="radiogroup" aria-label="Choose how true this statement is">
              {ANSWER_LABELS.map((label, index) => {
                const value = index + 1;
                const selected = answers[questionIndex] === value;
                return (
                  <button
                    key={label}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    onClick={() => onAnswer(value)}
                    className={`group grid grid-cols-[42px_1fr_auto] items-center gap-4 border px-4 py-4 text-left transition-all duration-150 sm:px-5 ${
                      selected
                        ? "border-[#FF7900] bg-[#FF7900]/8 text-white"
                        : "border-white/10 bg-[#17191F] text-white/68 hover:border-[#4682B4]/65 hover:bg-[#4682B4]/8 hover:text-white"
                    }`}
                  >
                    <span className={`type-ui-label flex h-8 w-8 items-center justify-center ${selected ? "bg-[#FF7900] text-white" : "bg-white/5 text-white/40 group-hover:text-[#4682B4]"}`}>
                      {value}
                    </span>
                    <span className="font-semibold">{label}</span>
                    {selected && <Check size={18} className="text-[#FF7900]" />}
                  </button>
                );
              })}
            </div>

            <div className="mt-7 flex items-center justify-between gap-4 border-t border-white/7 pt-5">
              <button
                type="button"
                onClick={onBack}
                disabled={questionIndex === 0}
                className="inline-flex items-center gap-2 text-sm font-semibold text-white/40 transition hover:text-white disabled:cursor-not-allowed disabled:opacity-25"
              >
                <ArrowLeft size={16} /> Back
              </button>
              <p className="text-right text-xs text-white/28">Select an answer to advance</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Results({
  overall,
  sectionScores,
  weakestSection,
  onRestart,
}: {
  overall: number;
  sectionScores: number[];
  weakestSection: number;
  onRestart: () => void;
}) {
  const band = scoreBand(overall);
  const leak = LEAKS[weakestSection];
  const highCapture = overall >= 85;

  return (
    <>
      <section className="bg-[#1C1E24] pb-20 pt-28 blueprint-grid md:pb-28 md:pt-36">
        <div className="container">
          <div className="mx-auto max-w-5xl">
            <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="section-label">Diagnostic complete</p>
                <h1 className="type-page-title mt-4 text-white">Your Full Capture Score</h1>
              </div>
              <button onClick={onRestart} className="inline-flex items-center gap-2 self-start text-sm font-semibold text-white/45 transition hover:text-white">
                <RefreshCw size={16} /> Retake scorecard
              </button>
            </div>

            <div className="grid overflow-hidden border border-white/10 bg-[#17191F] shadow-2xl shadow-black/30 lg:grid-cols-[0.7fr_1.3fr]">
              <div className="relative flex min-h-[330px] flex-col items-center justify-center border-b border-white/10 p-10 text-center lg:border-b-0 lg:border-r">
                <div className="absolute inset-0 opacity-35 blueprint-grid" />
                <div className="relative flex h-52 w-52 rotate-[-5deg] flex-col items-center justify-center rounded-full border-4" style={{ color: band.color, borderColor: band.color }}>
                  <span className="text-xs font-black uppercase tracking-[0.18em]">{band.label}</span>
                  <span className="type-stat mt-2 text-white">{overall}</span>
                  <span className="mt-1 text-xs font-bold text-white/40">OUT OF 100</span>
                </div>
                <p className="relative mt-7 max-w-xs text-sm leading-relaxed text-white/50">{band.copy}</p>
              </div>

              <div className="p-7 sm:p-10 lg:p-12">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#4682B4]">Category scores</p>
                <div className="mt-8 space-y-8">
                  {SECTIONS.map((section, index) => (
                    <div key={section.name}>
                      <div className="mb-3 flex items-end justify-between gap-5">
                        <div>
                          <p className="text-sm font-bold text-white">{section.name}</p>
                          <p className="mt-1 text-xs text-white/35">{section.short}</p>
                        </div>
                        <span className="type-card-title text-white">{sectionScores[index]}%</span>
                      </div>
                      <div className="h-3 overflow-hidden border border-white/10 bg-[#1C1E24]">
                        <div
                          className="h-full transition-[width] duration-700"
                          style={{ width: `${sectionScores[index]}%`, backgroundColor: scoreBand(sectionScores[index]).color }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div
              className={`mt-8 grid lg:grid-cols-[0.42fr_1.58fr] ${
                highCapture
                  ? "border border-[#4682B4]/50 bg-[#4682B4]/[0.07]"
                  : "border border-[#F47A5B]/50 bg-[#F47A5B]/[0.07]"
              }`}
            >
              <div className={`border-b p-7 lg:border-b-0 lg:border-r lg:p-9 ${highCapture ? "border-[#4682B4]/30" : "border-[#F47A5B]/30"}`}>
                <p className={`type-ui-label ${highCapture ? "text-[#4682B4]" : "text-[#F47A5B]"}`}>
                  {highCapture ? `Strength Review · ${SECTIONS[weakestSection].name}` : leak.tag}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-white/45">
                  {highCapture ? "Your next tightening point" : "Your biggest leak right now"}
                </p>
              </div>
              <div className="p-7 lg:p-9">
                <h2 className="text-2xl font-extrabold text-white md:text-3xl">
                  {highCapture ? "No major capture leak showed up in this pass." : leak.title}
                </h2>
                <p className="mt-4 text-base leading-relaxed text-white/58">
                  {highCapture
                    ? `Your answers point to a strong operating system. Keep pressure-testing ${SECTIONS[weakestSection].name}; it is the first place to audit when volume increases, the team changes, or ownership shifts.`
                    : leak.body}
                </p>
                <div className="mt-6 border-l-2 border-[#4682B4] pl-5">
                  <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#4682B4]">First move</p>
                  <p className="mt-2 text-sm leading-relaxed text-white/65">
                    {highCapture
                      ? "Document the current standard, assign a clear owner, and review this category monthly so strong performance stays durable as the business grows."
                      : leak.next}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 grid gap-8 border border-white/10 bg-[#20232B] p-7 md:p-10 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="section-label">Straight answer</p>
                <h2 className="mt-3 text-3xl font-black text-white">Walk through your score with Ryan.</h2>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/50">
                  In 20 minutes, we'll look at the three scores together and show you the fastest way to close the biggest gap first.
                </p>
              </div>
              <a
                href="https://calendly.com/ryanjamesmiller/sos-discovery-call"
                target="_blank"
                rel="noopener noreferrer"
                className="sos-orange-btn inline-flex items-center justify-center gap-3 rounded px-7 py-4 text-center text-sm font-bold"
              >
                Walk Through My Score <ArrowRight size={17} />
              </a>
            </div>

            <div className="mt-8 flex items-start gap-3 border-l-4 border-[#FF7900] bg-white/[0.025] p-5">
              <ShieldCheck className="mt-0.5 shrink-0 text-[#FF7900]" size={20} />
              <p className="text-sm leading-relaxed text-white/50">
                A local garage door company recovered <strong className="text-white">$52,000 from cold quotes in 30 days</strong> running this exact diagnostic. Same leads. Different system.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
