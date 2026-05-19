import Link from "next/link";

const PREVIEW_EVENTS = [
  { dayLabel: "Fri 16", time: "14:00", title: "Drive up from SF", showDay: true },
  { dayLabel: "Fri 16", time: "18:00", title: "Check in at cabin", showDay: false },
  { dayLabel: "Sat 17", time: "07:00", title: "Sunrise hike · Half Dome", showDay: true },
  { dayLabel: "Sat 17", time: "13:00", title: "Lunch at Yosemite Valley", showDay: false },
  { dayLabel: "Sat 17", time: "19:00", title: "Group dinner at the cabin", showDay: false },
  { dayLabel: "Sun 18", time: "09:00", title: "Valley floor walk", showDay: true },
  { dayLabel: "Sun 18", time: "12:00", title: "Drive home", showDay: false },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#09090b] text-white">
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 sm:px-8 py-4 border-b border-white/[0.06] bg-[#09090b]/80 backdrop-blur-sm">
        <span className="font-mono text-[11px] tracking-[0.25em] text-white/35 uppercase">
          GoDeep
        </span>
        <div className="flex items-center gap-6">
          <Link
            href="/portfolio"
            className="text-[13px] text-white/45 hover:text-white/80 transition-colors duration-150"
          >
            Examples
          </Link>
          <Link
            href="/create"
            className="text-[13px] text-white/45 hover:text-white/80 transition-colors duration-150"
          >
            Start planning →
          </Link>
        </div>
      </nav>

      <section className="flex min-h-screen items-center px-6 sm:px-8 pt-20 pb-16 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center w-full">
          <div>
            <p className="font-mono text-[10px] tracking-[0.25em] text-white/25 uppercase mb-8">
              Trip planning for real people
            </p>
            <h1 className="text-[52px] sm:text-[64px] font-semibold tracking-[-0.02em] leading-[1.04] mb-6 text-white">
              Go deeper<br />with the right<br />people.
            </h1>
            <p className="text-[17px] text-white/40 leading-relaxed max-w-[360px] mb-10">
              Coordinate trips, plans, and meaningful time together without the group chat chaos.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/create"
                className="px-5 py-2.5 bg-white text-black text-[13px] font-medium rounded-[6px] hover:bg-white/90 transition-colors duration-150"
              >
                Start planning
              </Link>
              <Link
                href="/how-it-works"
                className="px-5 py-2.5 border border-white/[0.1] text-white/50 text-[13px] rounded-[6px] hover:bg-white/[0.04] hover:text-white/70 transition-colors duration-150"
              >
                See how it works
              </Link>
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="border border-white/[0.08] rounded-xl bg-white/[0.015] overflow-hidden">
              <div className="px-5 py-4 border-b border-white/[0.06]">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-[14px] font-medium text-white/90">Yosemite Weekend</h3>
                    <div className="flex items-center gap-2 mt-1 font-mono text-[10px] text-white/25">
                      <span>Yosemite, CA</span>
                      <span>·</span>
                      <span>May 16–18</span>
                      <span>·</span>
                      <span>6 people</span>
                    </div>
                  </div>
                  <span className="font-mono text-[10px] text-white/15 uppercase tracking-widest mt-0.5">
                    Shared
                  </span>
                </div>
                <div className="flex gap-1">
                  <div className="px-3 py-1 rounded-md bg-white/[0.08] text-[10px] font-mono text-white/70">
                    List
                  </div>
                  <div className="px-3 py-1 rounded-md text-[10px] font-mono text-white/25">
                    Calendar
                  </div>
                </div>
              </div>

              <div className="divide-y divide-white/[0.04]">
                {PREVIEW_EVENTS.map((event, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 px-5 py-2.5 hover:bg-white/[0.02] transition-colors"
                  >
                    <span className="font-mono text-[10px] text-white/18 w-10 flex-shrink-0">
                      {event.showDay ? event.dayLabel : ""}
                    </span>
                    <span className="font-mono text-[10px] text-white/25 w-10 flex-shrink-0">
                      {event.time}
                    </span>
                    <span className="text-[13px] text-white/65">{event.title}</span>
                  </div>
                ))}
              </div>

              <div className="px-5 py-3 border-t border-white/[0.04]">
                <span className="text-[12px] text-white/15">+ Add event</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
