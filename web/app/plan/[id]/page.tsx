"use client";

import Link from "next/link";
import { useState } from "react";

type PlanEvent = {
  id: string;
  date: Date;
  time: string;
  title: string;
};

type Plan = {
  id: string;
  name: string;
  location: string;
  startDate: Date;
  endDate: Date;
  events: PlanEvent[];
};

const MOCK_PLAN: Plan = {
  id: "demo",
  name: "Yosemite Weekend",
  location: "Yosemite National Park, CA",
  startDate: new Date(2026, 4, 16),
  endDate: new Date(2026, 4, 18),
  events: [
    { id: "1", date: new Date(2026, 4, 16), time: "14:00", title: "Drive up from SF" },
    { id: "2", date: new Date(2026, 4, 16), time: "18:00", title: "Check in at cabin" },
    { id: "3", date: new Date(2026, 4, 17), time: "07:00", title: "Sunrise hike · Half Dome" },
    { id: "4", date: new Date(2026, 4, 17), time: "13:00", title: "Lunch at Yosemite Valley" },
    { id: "5", date: new Date(2026, 4, 17), time: "19:00", title: "Group dinner at the cabin" },
    { id: "6", date: new Date(2026, 4, 18), time: "09:00", title: "Valley floor walk" },
    { id: "7", date: new Date(2026, 4, 18), time: "12:00", title: "Drive home" },
  ],
};

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const WEEKDAY_SHORT = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const DAY_HEADERS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function formatDateRange(start: Date, end: Date) {
  const sameMonth =
    start.getMonth() === end.getMonth() &&
    start.getFullYear() === end.getFullYear();
  if (sameMonth) {
    return `${MONTH_NAMES[start.getMonth()]} ${start.getDate()}–${end.getDate()}, ${start.getFullYear()}`;
  }
  return `${MONTH_NAMES[start.getMonth()]} ${start.getDate()} – ${MONTH_NAMES[end.getMonth()]} ${end.getDate()}, ${end.getFullYear()}`;
}

function dayCount(start: Date, end: Date) {
  return Math.round((end.getTime() - start.getTime()) / 86400000) + 1;
}

function getTripDays(start: Date, end: Date): Date[] {
  const days: Date[] = [];
  const cur = new Date(start);
  while (cur <= end) {
    days.push(new Date(cur));
    cur.setDate(cur.getDate() + 1);
  }
  return days;
}

function groupByDay(events: PlanEvent[]): Map<string, PlanEvent[]> {
  const map = new Map<string, PlanEvent[]>();
  for (const e of events) {
    const key = e.date.toDateString();
    if (!map.has(key)) map.set(key, []);
    map.get(key)!.push(e);
  }
  return map;
}

function ListView({ plan }: { plan: Plan }) {
  const tripDays = getTripDays(plan.startDate, plan.endDate);
  const byDay = groupByDay(plan.events);

  return (
    <div className="space-y-8">
      {tripDays.map((day, i) => {
        const events = byDay.get(day.toDateString()) ?? [];
        return (
          <div key={i}>
            <div className="flex items-baseline gap-3 mb-3">
              <span className="font-mono text-[10px] text-white/20 uppercase tracking-widest">
                Day {i + 1}
              </span>
              <span className="font-mono text-[11px] text-white/35">
                {WEEKDAY_SHORT[day.getDay()]} · {MONTH_NAMES[day.getMonth()].slice(0, 3)} {day.getDate()}
              </span>
            </div>

            {events.length === 0 ? (
              <div className="border border-dashed border-white/[0.07] rounded-lg px-4 py-3">
                <span className="text-[12px] text-white/15">No events yet</span>
              </div>
            ) : (
              <div className="border border-white/[0.07] rounded-lg overflow-hidden divide-y divide-white/[0.05]">
                {events.map((event) => (
                  <div
                    key={event.id}
                    className="flex items-center gap-4 px-4 py-3 hover:bg-white/[0.02] transition-colors group"
                  >
                    <span className="font-mono text-[12px] text-white/25 w-12 flex-shrink-0">
                      {event.time}
                    </span>
                    <span className="text-[14px] text-white/80 flex-1">{event.title}</span>
                    <span className="text-[11px] text-white/15 opacity-0 group-hover:opacity-100 transition-opacity">
                      ···
                    </span>
                  </div>
                ))}
                <div className="flex items-center gap-4 px-4 py-2.5">
                  <span className="font-mono text-[12px] text-white/0 w-12 flex-shrink-0" />
                  <span className="text-[12px] text-white/15 cursor-pointer hover:text-white/30 transition-colors select-none">
                    + Add event
                  </span>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function CalendarView({ plan }: { plan: Plan }) {
  const year = plan.startDate.getFullYear();
  const month = plan.startDate.getMonth();

  const firstDow = new Date(year, month, 1).getDay();
  const startOffset = (firstDow + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells: (number | null)[] = [];
  for (let i = 0; i < startOffset; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);

  function inTrip(d: number) {
    const date = new Date(year, month, d);
    return date >= plan.startDate && date <= plan.endDate;
  }

  function eventsOn(d: number) {
    return plan.events.filter((e) => isSameDay(e.date, new Date(year, month, d)));
  }

  return (
    <div className="max-w-xl">
      <div className="flex items-center justify-between mb-5">
        <span className="font-mono text-[13px] text-white/45">
          {MONTH_NAMES[month]} {year}
        </span>
      </div>

      <div className="grid grid-cols-7 mb-1">
        {DAY_HEADERS.map((d) => (
          <div
            key={d}
            className="text-center font-mono text-[10px] text-white/20 uppercase tracking-widest py-2"
          >
            {d}
          </div>
        ))}
      </div>

      <div className="border border-white/[0.06] rounded-xl overflow-hidden">
        <div className="grid grid-cols-7 divide-x divide-y divide-white/[0.05]">
          {cells.map((day, i) => {
            const active = day !== null && inTrip(day);
            const dayEvents = day !== null ? eventsOn(day) : [];

            return (
              <div
                key={i}
                className={`
                  relative flex flex-col min-h-[80px] p-2 bg-[#09090b]
                  ${day ? "cursor-pointer hover:bg-white/[0.025]" : ""}
                  ${active ? "bg-white/[0.035]" : ""}
                  transition-colors
                `}
              >
                {day && (
                  <>
                    <span
                      className={`
                        font-mono text-[12px] leading-none mb-1.5
                        ${active ? "text-white/80" : "text-white/18"}
                      `}
                    >
                      {day}
                    </span>
                    <div className="space-y-0.5">
                      {dayEvents.slice(0, 2).map((e) => (
                        <div
                          key={e.id}
                          className="text-[9px] font-mono text-white/35 truncate leading-snug"
                        >
                          {e.time} {e.title}
                        </div>
                      ))}
                      {dayEvents.length > 2 && (
                        <div className="text-[9px] font-mono text-white/20">
                          +{dayEvents.length - 2} more
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function PlanPage() {
  const [view, setView] = useState<"list" | "calendar">("list");
  const [copied, setCopied] = useState(false);
  const plan = MOCK_PLAN;

  async function handleShare() {
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <main className="min-h-screen bg-[#09090b] text-white">
      <nav className="sticky top-0 z-10 border-b border-white/[0.06] bg-[#09090b]/90 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="font-mono text-[11px] tracking-[0.2em] text-white/25 uppercase hover:text-white/50 transition-colors"
          >
            ← GoDeep
          </Link>
          <button
            onClick={handleShare}
            className="font-mono text-[11px] text-white/30 hover:text-white/60 transition-colors"
          >
            {copied ? "Copied ✓" : "Share ↗"}
          </button>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-6 pt-8 pb-5 border-b border-white/[0.05]">
        <h1 className="text-2xl font-semibold tracking-tight mb-2">{plan.name}</h1>
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[11px] text-white/30">
          <span>{plan.location}</span>
          <span className="text-white/12">·</span>
          <span>{formatDateRange(plan.startDate, plan.endDate)}</span>
          <span className="text-white/12">·</span>
          <span>{dayCount(plan.startDate, plan.endDate)} days</span>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 pt-6 pb-20">
        <div className="flex items-center gap-1 mb-8 bg-white/[0.03] border border-white/[0.06] rounded-lg p-1 w-fit">
          {(["list", "calendar"] as const).map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={`
                px-4 py-1.5 rounded-md font-mono text-[11px] capitalize transition-all
                ${
                  view === v
                    ? "bg-white/[0.09] text-white/85"
                    : "text-white/28 hover:text-white/50"
                }
              `}
            >
              {v}
            </button>
          ))}
        </div>

        {view === "list" ? <ListView plan={plan} /> : <CalendarView plan={plan} />}
      </div>
    </main>
  );
}
