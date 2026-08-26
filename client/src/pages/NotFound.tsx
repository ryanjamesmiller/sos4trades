/* =============================================================
   SOS CTE Not Found — Unified Steel & Signal Typography
   ============================================================= */
import { ArrowRight, SearchX } from "lucide-react";
import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#1C1E24] text-white">
      <Navbar />
      <main className="flex min-h-[75vh] items-center blueprint-grid pt-24">
        <div className="container">
          <div className="mx-auto max-w-3xl border border-white/10 bg-[#17191F] p-8 text-center shadow-2xl shadow-black/25 sm:p-12">
            <SearchX className="mx-auto h-12 w-12 text-[#4682B4]" strokeWidth={1.5} />
            <p className="section-label mt-7">404 · Route Not Found</p>
            <h1 className="type-page-title mt-4 text-white">This page isn't in the system.</h1>
            <p className="type-body-lg mx-auto mt-5 max-w-xl text-white/55">
              The link may have moved. Return to the SOS homepage or go directly to the Full Capture Scorecard.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
              <Link href="/" className="sos-ghost-btn type-button inline-flex items-center justify-center rounded px-7 py-4">
                Return Home
              </Link>
              <Link href="/scorecard" className="sos-orange-btn type-button inline-flex items-center justify-center gap-2 rounded px-7 py-4">
                Take the Scorecard <ArrowRight size={17} />
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
