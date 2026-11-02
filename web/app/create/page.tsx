"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { getSupabase } from "@/lib/supabase/client";
import { mapsSearchUrl, validateTripDates } from "@/lib/plans";

export default function CreatePage() {
  const router = useRouter();
  const [db] = useState(getSupabase);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const pending = useRef(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (pending.current) return;
    setError("");
    if (!name.trim()) { setError("Give your plan a name."); return; }
    const form = new FormData(e.currentTarget);
    const tripStart = String(form.get("start_date") || "");
    const tripEnd = String(form.get("end_date") || "");
    const dateError = validateTripDates(tripStart, tripEnd);
    if (dateError) { setError(dateError); return; }
    if (!db) { setError("Plan creation is temporarily unavailable. Please try again later."); return; }
    pending.current = true;
    setSaving(true);
    try {
      const { data, error: saveError } = await db.from("plans").insert({
        name: name.trim(), location: location.trim() || null,
        start_date: tripStart, end_date: tripEnd,
      }).select("id").single();
      if (saveError) throw saveError;
      router.push(`/plan/${data.id}`);
    } catch {
      pending.current = false;
      setSaving(false);
      setError("We couldn't save your plan. Your details are still here—please try again.");
    }
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

        <form onSubmit={handleSubmit} className="space-y-5" aria-busy={saving}>
          <fieldset disabled={saving} className="space-y-5">
            <div>
              <label htmlFor="plan-name" className="block font-mono text-[10px] tracking-[0.2em] text-white/30 uppercase mb-2">
                Plan name
              </label>
              <input
                id="plan-name"
                type="text"
                maxLength={200}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Yosemite weekend"
                required
                className="w-full bg-white/[0.03] border border-white/[0.08] rounded-lg px-4 py-3 text-[14px] text-white placeholder-white/15 outline-none focus:border-white/20 transition-colors"
              />
            </div>

            <div>
              <label htmlFor="plan-location" className="block font-mono text-[10px] tracking-[0.2em] text-white/30 uppercase mb-2">
                Location
              </label>
              <input
                id="plan-location"
                type="text"
                maxLength={300}
                aria-describedby="location-help"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="City, park, or venue"
                className="w-full bg-white/[0.03] border border-white/[0.08] rounded-lg px-4 py-3 text-[14px] text-white placeholder-white/15 outline-none focus:border-white/20 transition-colors"
              />
              <p id="location-help" className="mt-2 text-xs text-white/45">Add a destination or address. You can check it on Google Maps.</p>
              {location.trim() && <a href={mapsSearchUrl(location)} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex text-xs text-white/65 underline underline-offset-4 hover:text-white">View in Google Maps ↗</a>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="plan-start" className="block font-mono text-[10px] tracking-[0.2em] text-white/30 uppercase mb-2">
                  Start date
                </label>
                <input
                  id="plan-start"
                  name="start_date"
                  type="date"
                  required min="2000-01-01" max="2100-12-31"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full bg-white/[0.03] border border-white/[0.08] rounded-lg px-4 py-3 text-[14px] text-white outline-none focus:border-white/20 transition-colors [color-scheme:dark]"
                />
              </div>
              <div>
                <label htmlFor="plan-end" className="block font-mono text-[10px] tracking-[0.2em] text-white/30 uppercase mb-2">
                  End date
                </label>
                <input
                  id="plan-end"
                  name="end_date"
                  type="date"
                  required min={startDate || "2000-01-01"} max="2100-12-31"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full bg-white/[0.03] border border-white/[0.08] rounded-lg px-4 py-3 text-[14px] text-white outline-none focus:border-white/20 transition-colors [color-scheme:dark]"
                />
              </div>
            </div>

            <p className="text-xs leading-relaxed text-white/45">This creates a public trip page. Anyone with the link can view the name, destination, and dates. Keep private addresses and sensitive details out of your plan.</p>
            {error && <p role="alert" className="text-sm text-red-300">{error}</p>}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full bg-white text-black text-[14px] font-medium rounded-lg py-3 hover:bg-white/90 transition-colors"
              >
                {saving ? "Saving your plan…" : "Create plan"}
              </button>
            </div>
          </fieldset>
        </form>
      </div>

    </main>
  );
}
