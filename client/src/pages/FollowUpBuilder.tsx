/* =============================================================
   SOS Quote Follow-Up Builder — Steel & Signal Design System
   Replaces the retired SOS Follow-Up Sequence Builder GPT (10/17/26).
   One quote in, a dated 7-touch call / text / email sequence out.
   Writing happens in the sos-followup-builder Cloudflare Worker (Claude).
   ============================================================= */
import { type FormEvent, useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Check, Copy, MessageSquareText, Phone, Mail, Voicemail } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const API_URL = "https://sos-followup-builder.ryan-james-miller.workers.dev";
const MARK = "/assets/sos-scorecard-mark.png";
const SCORECARD_URL = "/scorecard";
const CALL_URL = "https://calendly.com/ryanjamesmiller/sos-discovery-call";

// Each build is saved to the Jotform "Quote Follow-Up Builder - Leads" form (10/17/26).
const LEADS_FORM_ID = "262896590973073";
const LEADS_FORM_URL = `https://submit.jotform.com/submit/${LEADS_FORM_ID}`;
const STORAGE_KEY = "sos-followup-builder-profile";

const TRADES = ["HVAC", "Plumbing", "Electrical", "Roofing", "Garage Doors", "Security", "Landscaping", "Painting", "Remodeling", "Other"];

type Profile = {
  trade: string;
  company: string;
  yourName: string;
  city: string;
  differentiator: string;
  availability: string;
  contactName: string;
  email: string;
  phone: string;
};

type Quote = { customerName: string; job: string; amount: string; sentDate: string; notes: string };

type Message = { kind: "Call script" | "Voicemail" | "Text" | "Email"; subject: string; body: string };
type Touch = { day: number; title: string; messages: Message[]; why: string };

const EMPTY_PROFILE: Profile = {
  trade: "", company: "", yourName: "", city: "", differentiator: "", availability: "", contactName: "", email: "", phone: "",
};

function todayISO() {
  const now = new Date();
  return new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
}

function sendDate(sentDate: string, day: number) {
  const base = sentDate ? new Date(`${sentDate}T12:00:00`) : new Date();
  base.setDate(base.getDate() + day);
  return base.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
}

function loadProfile(): Profile {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? { ...EMPTY_PROFILE, ...JSON.parse(saved) } : EMPTY_PROFILE;
  } catch {
    return EMPTY_PROFILE;
  }
}

function saveProfile(profile: Profile) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
  } catch {
    /* storage blocked: the builder still works, it just won't remember */
  }
}

function readSource() {
  const params = new URLSearchParams(window.location.search);
  return {
    source: [params.get("utm_source"), params.get("utm_medium")].filter(Boolean).join(" / ") || "direct",
    campaign: params.get("utm_campaign") || "",
  };
}

function messageText(message: Message) {
  return message.kind === "Email" && message.subject ? `Subject: ${message.subject}\n\n${message.body}` : message.body;
}

function allText(touches: Touch[], quote: Quote) {
  return touches
    .map((touch) => {
      const parts = touch.messages.map((m) => `${m.kind.toUpperCase()}\n${messageText(m)}`).join("\n\n");
      return `DAY ${touch.day} (${sendDate(quote.sentDate, touch.day)}): ${touch.title}\n\n${parts}`;
    })
    .join("\n\n----------\n\n");
}

const KIND_ICON = { "Call script": Phone, Voicemail: Voicemail, Text: MessageSquareText, Email: Mail } as const;

function CopyButton({ text, label = "Copy" }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard blocked: the text is still selectable on the page */
    }
  }
  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex shrink-0 items-center gap-1.5 rounded border border-[#41424C]/20 bg-white px-3 py-1.5 text-xs font-bold text-[#41424C] transition hover:border-[#4682B4] hover:text-[#4682B4]"
    >
      {copied ? <Check size={14} /> : <Copy size={14} />} {copied ? "Copied" : label}
    </button>
  );
}

function Field({
  label,
  value,
  onChange,
  required = false,
  placeholder = "",
  type = "text",
  autoComplete,
  wide = false,
  textarea = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  placeholder?: string;
  type?: string;
  autoComplete?: string;
  wide?: boolean;
  textarea?: boolean;
}) {
  const className =
    "mt-1.5 w-full border border-[#41424C]/20 bg-white px-4 py-3 text-base text-[#1C1E24] outline-none transition focus:border-[#4682B4]";
  return (
    <label className={`block ${wide ? "sm:col-span-2" : ""}`}>
      <span className="text-sm font-semibold text-[#41424C]">
        {label}
        {!required && <span className="font-normal text-[#41424C]/60"> (optional)</span>}
      </span>
      {textarea ? (
        <textarea rows={3} required={required} placeholder={placeholder} value={value} onChange={(e) => onChange(e.target.value)} className={className} />
      ) : (
        <input type={type} required={required} placeholder={placeholder} autoComplete={autoComplete} value={value} onChange={(e) => onChange(e.target.value)} className={className} />
      )}
    </label>
  );
}

export default function FollowUpBuilder() {
  const [profile, setProfile] = useState<Profile>(EMPTY_PROFILE);
  const [quote, setQuote] = useState<Quote>({ customerName: "", job: "", amount: "", sentDate: todayISO(), notes: "" });
  const [touches, setTouches] = useState<Touch[] | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [returning, setReturning] = useState(false);

  useEffect(() => {
    document.title = "Quote Follow-Up Builder | SOS Contractors & Trades";
    const description = "Turn one open quote into a ready-to-send 7-touch call, text and email follow-up sequence, free from SOS Contractors & Trades.";
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", description);
    const saved = loadProfile();
    setProfile(saved);
    setReturning(Boolean(saved.company && saved.email));
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [touches]);

  const setP = (key: keyof Profile) => (value: string) => setProfile((p) => ({ ...p, [key]: value }));
  const setQ = (key: keyof Quote) => (value: string) => setQuote((q) => ({ ...q, [key]: value }));

  function saveLead() {
    const arrival = readSource();
    const data = new FormData();
    data.append("formID", LEADS_FORM_ID);
    data.append("simple_spc", `${LEADS_FORM_ID}-${LEADS_FORM_ID}`);
    data.append("website", "");
    data.append("q2_q2_textbox0", profile.contactName);
    data.append("q3_q3_email1", profile.email);
    data.append("q4_q4_textbox2", profile.company);
    data.append("q5_q5_textbox3", profile.phone);
    data.append("q6_q6_textbox4", profile.trade);
    data.append("q7_q7_textbox5", profile.city);
    data.append("q8_q8_textbox6", quote.job);
    data.append("q9_q9_textbox7", quote.amount);
    data.append("q10_q10_textbox8", arrival.source);
    data.append("q11_q11_textbox9", arrival.campaign);
    (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag?.("event", "generate_lead", { form_name: "quote_followup_builder" });
    // A failed save must never block the owner from his sequence.
    fetch(LEADS_FORM_URL, { method: "POST", mode: "no-cors", body: data }).catch(() => undefined);
  }

  async function build(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;
    setBusy(true);
    setError("");
    saveProfile(profile);
    saveLead();
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          trade: profile.trade,
          company: profile.company,
          yourName: profile.yourName || profile.contactName,
          city: profile.city,
          differentiator: profile.differentiator,
          availability: profile.availability,
          ...quote,
        }),
      });
      const result = await response.json();
      if (!response.ok || !Array.isArray(result.touches)) throw new Error(result.error || "Something went wrong. Please try again.");
      setTouches(
        (result.touches as Touch[]).map((t) => ({ ...t, messages: t.messages.filter((m) => m.body && m.body.trim()) })),
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  function another() {
    setTouches(null);
    setQuote({ customerName: "", job: "", amount: "", sentDate: todayISO(), notes: "" });
    setReturning(true);
  }

  return (
    <div className="min-h-screen bg-[#1C1E24] text-[#F5F7F8]">
      <Navbar />
      <main>
        {touches ? (
          <Results touches={touches} quote={quote} profile={profile} onAnother={another} />
        ) : (
          <section className="min-h-[calc(100vh-80px)] bg-[#1C1E24] pb-20 pt-28 blueprint-grid md:pt-36">
            <div className="container">
              <div className="mx-auto max-w-5xl">
                <div className="mb-10 max-w-3xl">
                  <img src={MARK} alt="" aria-hidden="true" className="h-14 w-14 object-contain" />
                  <p className="section-label mt-7">Free tool · About 1 minute</p>
                  <h1 className="type-subsection-title mt-4 text-white">Quote Follow-Up Builder</h1>
                  <p className="mt-5 text-lg leading-relaxed text-white/60">
                    Give it one open quote. Get back a dated 7-touch call, text and email sequence written for that customer, ready to copy into your phone or CRM.
                  </p>
                </div>

                <form onSubmit={build} className="grid overflow-hidden border border-white/10 bg-[#F5F7F8] text-[#1C1E24] shadow-2xl shadow-black/30 lg:grid-cols-2">
                  <div className="border-b border-[#41424C]/10 p-6 sm:p-8 lg:border-b-0 lg:border-r">
                    <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#4682B4]">This quote</p>
                    <div className="mt-5 grid gap-4 sm:grid-cols-2">
                      <Field label="Customer's first name" required value={quote.customerName} onChange={setQ("customerName")} placeholder="Sam" />
                      <Field label="Quote sent on" required type="date" value={quote.sentDate} onChange={setQ("sentDate")} />
                      <Field label="Job you quoted" required wide value={quote.job} onChange={setQ("job")} placeholder="Full AC system replacement, 3-ton" />
                      <Field label="Quote amount" value={quote.amount} onChange={setQ("amount")} placeholder="$11,400" />
                      <Field label="Next available start" value={profile.availability} onChange={setP("availability")} placeholder="Crew opens up the week of the 27th" />
                      <Field
                        label="What the customer cares about"
                        wide
                        textarea
                        value={quote.notes}
                        onChange={setQ("notes")}
                        placeholder="Worried about price, wants it done before summer, getting two other bids"
                      />
                    </div>
                  </div>

                  <div className="p-6 sm:p-8">
                    <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#4682B4]">Your business</p>
                    {returning && (
                      <p className="mt-2 text-sm text-[#41424C]/70">Saved from last time. Change anything that's different.</p>
                    )}
                    <div className="mt-5 grid gap-4 sm:grid-cols-2">
                      <label className="block">
                        <span className="text-sm font-semibold text-[#41424C]">Trade</span>
                        <select
                          required
                          value={profile.trade}
                          onChange={(e) => setP("trade")(e.target.value)}
                          className="mt-1.5 w-full border border-[#41424C]/20 bg-white px-4 py-3 text-base text-[#1C1E24] outline-none transition focus:border-[#4682B4]"
                        >
                          <option value="">Pick one</option>
                          {TRADES.map((trade) => (
                            <option key={trade} value={trade}>{trade}</option>
                          ))}
                        </select>
                      </label>
                      <Field label="Company" required value={profile.company} onChange={setP("company")} autoComplete="organization" />
                      <Field label="Name on the messages" required value={profile.yourName} onChange={setP("yourName")} placeholder="Mike" />
                      <Field label="City or service area" value={profile.city} onChange={setP("city")} placeholder="Mesa, AZ" />
                      <Field
                        label="Why customers choose you"
                        wide
                        value={profile.differentiator}
                        onChange={setP("differentiator")}
                        placeholder="Same-week installs and a 10-year labor warranty"
                      />
                    </div>

                    <p className="mt-8 text-xs font-bold uppercase tracking-[0.15em] text-[#4682B4]">Where to reach you</p>
                    <div className="mt-5 grid gap-4 sm:grid-cols-2">
                      <Field label="Your name" required value={profile.contactName} onChange={setP("contactName")} autoComplete="name" />
                      <Field label="Email" required type="email" value={profile.email} onChange={setP("email")} autoComplete="email" />
                      <Field label="Phone" type="tel" value={profile.phone} onChange={setP("phone")} autoComplete="tel" />
                    </div>

                    {error && <p className="mt-6 border-l-4 border-[#FF7900] bg-white px-4 py-3 text-sm text-[#1C1E24]">{error}</p>}

                    <button
                      type="submit"
                      disabled={busy}
                      className="sos-orange-btn mt-7 inline-flex w-full items-center justify-center gap-3 rounded px-7 py-4 text-base font-bold disabled:opacity-60"
                    >
                      {busy ? "Writing your sequence, about 30 seconds..." : "Build My Follow-Up Sequence"} <ArrowRight size={18} />
                    </button>
                    <p className="mt-4 text-xs leading-relaxed text-[#41424C]/70">
                      No spam. Your business details are remembered on this device so the next quote takes seconds.
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
}

function Results({ touches, quote, profile, onAnother }: { touches: Touch[]; quote: Quote; profile: Profile; onAnother: () => void }) {
  return (
    <section className="bg-[#1C1E24] pb-20 pt-28 md:pt-36">
      <div className="container">
        <div className="mx-auto max-w-4xl">
          <button onClick={onAnother} className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-white/45 transition hover:text-white">
            <ArrowLeft size={16} /> Build one for another quote
          </button>

          <div className="flex flex-wrap items-end justify-between gap-5">
            <div>
              <p className="section-label">Your 7-touch sequence</p>
              <h1 className="type-subsection-title mt-4 text-white">
                {quote.customerName}: {quote.job}
              </h1>
              <p className="mt-3 text-white/55">
                {profile.trade}
                {profile.city ? ` in ${profile.city}` : ""} · Quote sent {sendDate(quote.sentDate, 0)}
              </p>
            </div>
            <CopyButton text={allText(touches, quote)} label="Copy all 7 touches" />
          </div>

          <p className="mt-6 border-l-4 border-[#FF7900] pl-4 text-sm leading-relaxed text-white/60">
            Fill in anything in [brackets] before you send. Those are facts only you know, like a real customer story or number.
          </p>

          <div className="mt-10 space-y-6">
            {touches.map((touch) => (
              <article key={touch.day} className="overflow-hidden border border-white/10 bg-[#F5F7F8] text-[#1C1E24]">
                <header className="flex flex-wrap items-baseline justify-between gap-3 bg-[#41424C] px-6 py-4 text-white">
                  <h2 className="text-lg font-extrabold">
                    Day {touch.day}: {touch.title}
                  </h2>
                  <span className="text-sm font-semibold text-[#CBBFAD]">{sendDate(quote.sentDate, touch.day)}</span>
                </header>
                <div className="space-y-5 p-6">
                  {touch.messages.map((message, index) => {
                    const Icon = KIND_ICON[message.kind] ?? MessageSquareText;
                    return (
                      <div key={index}>
                        <div className="flex items-center justify-between gap-3">
                          <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-[#4682B4]">
                            <Icon size={15} /> {message.kind}
                          </p>
                          <CopyButton text={messageText(message)} />
                        </div>
                        {message.kind === "Email" && message.subject && (
                          <p className="mt-2 text-sm font-semibold text-[#41424C]">Subject: {message.subject}</p>
                        )}
                        <p className="mt-2 whitespace-pre-line text-base leading-relaxed">{message.body}</p>
                      </div>
                    );
                  })}
                  <p className="border-t border-[#41424C]/10 pt-4 text-sm leading-relaxed text-[#41424C]/80">
                    <span className="font-bold text-[#41424C]">Why this works: </span>
                    {touch.why}
                  </p>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-12 grid gap-5 border border-white/10 bg-[#17191F] p-8 md:grid-cols-2">
            <div>
              <h2 className="text-xl font-extrabold text-white">Find the rest of your leaks</h2>
              <p className="mt-2 text-sm leading-relaxed text-white/55">
                Follow-up is one of three places revenue leaks out. The free Full Capture Scorecard shows the other two in about four minutes.
              </p>
              <a href={SCORECARD_URL} className="mt-5 inline-flex items-center gap-2 font-bold text-[#FF7900] hover:underline">
                Take the Scorecard <ArrowRight size={16} />
              </a>
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-white">Want this running for your whole team?</h2>
              <p className="mt-2 text-sm leading-relaxed text-white/55">
                Book a call and we'll look at how your quotes move from estimate to signed job.
              </p>
              <a href={CALL_URL} target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-2 font-bold text-[#FF7900] hover:underline">
                Book a call with Ryan <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
