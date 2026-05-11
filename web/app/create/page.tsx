"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CreatePage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [showWaitlist, setShowWaitlist] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setShowWaitlist(true);
  }

  async function handleWaitlistSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
    } catch {
      // still show success — we'll catch it in logs
    }
    setSubmitted(true);
  }

  return (
    <main className="min-h-screen bg-[#09090b] text-white px-6 py-16">
      <div className="max-w-lg mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 font-mono text-[11px] text-white/25 hover:text-white/50 transition-colors mb-12"
        >
          ← GoDeep
        </Link>

        <p className="font-mono text-[10px] tracking-[0.25em] text-white/25 uppercase mb-4">
          New plan
        </p>
        <h1 className="text-3xl font-semibold tracking-tight mb-8 text-white">
          Start something worth<br />showing up for.
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block font-mono text-[10px] tracking-[0.2em] text-white/30 uppercase mb-2">
              Plan name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Yosemite weekend"
              required
              className="w-full bg-white/[0.03] border border-white/[0.08] rounded-lg px-4 py-3 text-[14px] text-white placeholder-white/15 outline-none focus:border-white/20 transition-colors"
            />
          </div>

          <div>
            <label className="block font-mono text-[10px] tracking-[0.2em] text-white/30 uppercase mb-2">
              Location
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Yosemite, CA"
              className="w-full bg-white/[0.03] border border-white/[0.08] rounded-lg px-4 py-3 text-[14px] text-white placeholder-white/15 outline-none focus:border-white/20 transition-colors"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-mono text-[10px] tracking-[0.2em] text-white/30 uppercase mb-2">
                Start date
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full bg-white/[0.03] border border-white/[0.08] rounded-lg px-4 py-3 text-[14px] text-white outline-none focus:border-white/20 transition-colors [color-scheme:dark]"
              />
            </div>
            <div>
              <label className="block font-mono text-[10px] tracking-[0.2em] text-white/30 uppercase mb-2">
                End date
              </label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full bg-white/[0.03] border border-white/[0.08] rounded-lg px-4 py-3 text-[14px] text-white outline-none focus:border-white/20 transition-colors [color-scheme:dark]"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full bg-white text-black text-[14px] font-medium rounded-lg py-3 hover:bg-white/90 transition-colors"
            >
              Create plan
            </button>
          </div>
        </form>
      </div>

      {showWaitlist && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-6">
          <div className="w-full max-w-sm border border-white/[0.08] rounded-xl bg-[#09090b] p-6">
            {submitted ? (
              <div className="text-center py-4">
                <p className="text-[15px] font-medium text-white mb-2">You&apos;re on the list.</p>
                <p className="text-[13px] text-white/40">We&apos;ll reach out when it&apos;s your turn.</p>
              </div>
            ) : (
              <>
                <p className="font-mono text-[10px] tracking-[0.25em] text-white/25 uppercase mb-3">
                  Early access
                </p>
                <h2 className="text-[20px] font-semibold tracking-tight mb-2">
                  We&apos;re still in beta
                </h2>
                <p className="text-[14px] text-white/40 mb-6">
                  Drop your email to get on the list. We&apos;ll let you know as soon as you can start planning.
                </p>
                <form onSubmit={handleWaitlistSubmit} className="space-y-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@email.com"
                    required
                    autoFocus
                    className="w-full bg-white/[0.03] border border-white/[0.08] rounded-lg px-4 py-3 text-[14px] text-white placeholder-white/15 outline-none focus:border-white/20 transition-colors"
                  />
                  <button
                    type="submit"
                    className="w-full bg-white text-black text-[14px] font-medium rounded-lg py-3 hover:bg-white/90 transition-colors"
                  >
                    Join the waitlist
                  </button>
                </form>
              </>
            )}
            <button
              onClick={() => { setShowWaitlist(false); setSubmitted(false); }}
              className="mt-4 w-full text-center text-[12px] text-white/25 hover:text-white/50 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
