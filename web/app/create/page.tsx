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

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    router.push("/plan/demo");
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
    </main>
  );
}
