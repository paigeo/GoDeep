import Link from "next/link";

const STEPS = [
  {
    number: "01",
    title: "Create a plan",
    description:
      "Name it, pick a location, set the dates. Takes about 30 seconds. No account required.",
    preview: (
      <div className="border border-white/[0.08] rounded-xl bg-white/[0.015] overflow-hidden">
        <div className="px-5 py-4 border-b border-white/[0.06]">
          <p className="font-mono text-[10px] tracking-[0.2em] text-white/25 uppercase mb-3">
            New plan
          </p>
          <h3 className="text-[15px] font-medium text-white/80 mb-4">
            Start something worth showing up for.
          </h3>
          <div className="space-y-3">
            <div className="bg-white/[0.04] border border-white/[0.07] rounded-lg px-4 py-2.5">
              <p className="font-mono text-[10px] text-white/25 mb-1 uppercase tracking-widest">Plan name</p>
              <p className="text-[13px] text-white/70">Yosemite Weekend</p>
            </div>
            <div className="bg-white/[0.04] border border-white/[0.07] rounded-lg px-4 py-2.5">
              <p className="font-mono text-[10px] text-white/25 mb-1 uppercase tracking-widest">Location</p>
              <p className="text-[13px] text-white/70">Yosemite, CA</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white/[0.04] border border-white/[0.07] rounded-lg px-4 py-2.5">
                <p className="font-mono text-[10px] text-white/25 mb-1 uppercase tracking-widest">Start</p>
                <p className="text-[13px] text-white/70">May 16</p>
              </div>
              <div className="bg-white/[0.04] border border-white/[0.07] rounded-lg px-4 py-2.5">
                <p className="font-mono text-[10px] text-white/25 mb-1 uppercase tracking-widest">End</p>
                <p className="text-[13px] text-white/70">May 18</p>
              </div>
            </div>
          </div>
        </div>
        <div className="px-5 py-3">
          <div className="w-full bg-white rounded-lg py-2.5 text-center text-[13px] font-medium text-black">
            Create plan
          </div>
        </div>
      </div>
    ),
  },
  {
    number: "02",
    title: "Build the itinerary",
    description:
      "Add events for each day — hikes, meals, travel legs, anything. Switch between list view and a calendar whenever you want.",
    preview: (
      <div className="border border-white/[0.08] rounded-xl bg-white/[0.015] overflow-hidden">
        <div className="px-5 py-4 border-b border-white/[0.06]">
          <h3 className="text-[14px] font-medium text-white/90 mb-1">Yosemite Weekend</h3>
          <div className="font-mono text-[10px] text-white/25 mb-3">
            Yosemite, CA · May 16–18
          </div>
          <div className="flex gap-1">
            <div className="px-3 py-1 rounded-md bg-white/[0.08] text-[10px] font-mono text-white/70">List</div>
            <div className="px-3 py-1 rounded-md text-[10px] font-mono text-white/25">Calendar</div>
          </div>
        </div>
        <div className="divide-y divide-white/[0.04]">
          {[
            { day: "Day 1", label: "Fri · May 16", events: ["14:00  Drive up from SF", "18:00  Check in at cabin"] },
            { day: "Day 2", label: "Sat · May 17", events: ["07:00  Sunrise hike · Half Dome", "19:00  Group dinner"] },
          ].map((group, i) => (
            <div key={i} className="px-5 py-3">
              <div className="flex gap-3 mb-2">
                <span className="font-mono text-[10px] text-white/20 uppercase tracking-widest">{group.day}</span>
                <span className="font-mono text-[10px] text-white/30">{group.label}</span>
              </div>
              <div className="border border-white/[0.07] rounded-lg divide-y divide-white/[0.05] overflow-hidden">
                {group.events.map((e, j) => (
                  <div key={j} className="px-3 py-2 font-mono text-[11px] text-white/50">{e}</div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    number: "03",
    title: "Share the link",
    description:
      "One URL for everyone. No accounts, no app to install. Anyone with the link can see the plan — and eventually contribute to it.",
    preview: (
      <div className="border border-white/[0.08] rounded-xl bg-white/[0.015] overflow-hidden">
        <div className="px-5 py-5">
          <p className="font-mono text-[10px] tracking-[0.2em] text-white/25 uppercase mb-4">
            Share plan
          </p>
          <div className="flex items-center gap-2 bg-white/[0.04] border border-white/[0.07] rounded-lg px-4 py-3 mb-3">
            <span className="font-mono text-[11px] text-white/40 flex-1 truncate">
              go-deep.vercel.app/plan/yosemite-weekend
            </span>
            <span className="font-mono text-[10px] text-white/25 flex-shrink-0">Copy</span>
          </div>
          <p className="text-[12px] text-white/25 text-center">
            Anyone with this link can view the plan
          </p>
        </div>
        <div className="border-t border-white/[0.06] px-5 py-4">
          <p className="font-mono text-[10px] text-white/20 uppercase tracking-widest mb-3">Viewing now</p>
          <div className="flex items-center gap-2">
            {["P", "J", "M", "A", "K"].map((initial, i) => (
              <div
                key={i}
                className="w-7 h-7 rounded-full bg-white/[0.06] border border-white/[0.1] flex items-center justify-center font-mono text-[10px] text-white/40"
              >
                {initial}
              </div>
            ))}
            <span className="font-mono text-[10px] text-white/20 ml-1">+1 more</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    number: "04",
    title: "Show up",
    description:
      "Everyone's on the same page. No more 'wait, what time was that?' or 'who's driving?' The plan is the plan.",
    preview: (
      <div className="border border-white/[0.08] rounded-xl bg-white/[0.015] overflow-hidden">
        <div className="px-5 py-4 border-b border-white/[0.06]">
          <h3 className="text-[14px] font-medium text-white/90 mb-1">Yosemite Weekend</h3>
          <div className="font-mono text-[10px] text-white/25">May 16–18 · 3 days · 6 people</div>
        </div>
        <div className="px-5 py-4 space-y-3">
          {[
            { time: "Today", label: "Drive up from SF", meta: "14:00 · 4 hours", highlight: true },
            { time: "Tomorrow", label: "Sunrise hike · Half Dome", meta: "07:00 · all day", highlight: false },
            { time: "Sun", label: "Valley floor walk", meta: "09:00 · 3 hours", highlight: false },
          ].map((item, i) => (
            <div
              key={i}
              className={`flex items-center gap-4 p-3 rounded-lg ${
                item.highlight ? "bg-white/[0.06] border border-white/[0.1]" : ""
              }`}
            >
              <div className="flex-shrink-0 w-12 text-right">
                <span className={`font-mono text-[10px] ${item.highlight ? "text-white/60" : "text-white/20"}`}>
                  {item.time}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-[13px] ${item.highlight ? "text-white/90" : "text-white/40"} truncate`}>
                  {item.label}
                </p>
                <p className={`font-mono text-[10px] ${item.highlight ? "text-white/35" : "text-white/18"}`}>
                  {item.meta}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
];

export default function HowItWorksPage() {
  return (
    <main className="min-h-screen bg-[#09090b] text-white">
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 sm:px-8 py-4 border-b border-white/[0.06] bg-[#09090b]/80 backdrop-blur-sm">
        <Link
          href="/"
          className="font-mono text-[11px] tracking-[0.25em] text-white/35 uppercase hover:text-white/60 transition-colors"
        >
          GoDeep
        </Link>
        <Link
          href="/create"
          className="text-[13px] text-white/45 hover:text-white/80 transition-colors duration-150"
        >
          Start planning →
        </Link>
      </nav>

      <div className="max-w-5xl mx-auto px-6 sm:px-8 pt-32 pb-24">
        <div className="max-w-xl mb-20">
          <p className="font-mono text-[10px] tracking-[0.25em] text-white/25 uppercase mb-6">
            How it works
          </p>
          <h1 className="text-[44px] sm:text-[56px] font-semibold tracking-[-0.02em] leading-[1.05] mb-6">
            Don&apos;t get lost<br />in the sauce.
          </h1>
          <p className="text-[17px] text-white/40 leading-relaxed">
            Make it easy for your friends to just show up.
          </p>
        </div>

        <div className="space-y-24">
          {STEPS.map((step, i) => (
            <div
              key={i}
              className={`grid lg:grid-cols-2 gap-12 lg:gap-20 items-center ${
                i % 2 === 1 ? "lg:[direction:rtl]" : ""
              }`}
            >
              <div className={i % 2 === 1 ? "lg:[direction:ltr]" : ""}>
                <div className="flex items-baseline gap-4 mb-5">
                  <span className="font-mono text-[11px] text-white/20 tracking-widest">{step.number}</span>
                  <div className="flex-1 h-px bg-white/[0.06]" />
                </div>
                <h2 className="text-[28px] font-semibold tracking-tight mb-4">{step.title}</h2>
                <p className="text-[16px] text-white/45 leading-relaxed">{step.description}</p>
              </div>
              <div className={i % 2 === 1 ? "lg:[direction:ltr]" : ""}>{step.preview}</div>
            </div>
          ))}
        </div>

        <div className="mt-28 border-t border-white/[0.06] pt-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight mb-2">Ready to go deeper?</h2>
            <p className="text-[15px] text-white/40">Create your first plan in under a minute.</p>
          </div>
          <Link
            href="/create"
            className="flex-shrink-0 px-6 py-3 bg-white text-black text-[14px] font-medium rounded-[6px] hover:bg-white/90 transition-colors"
          >
            Start planning
          </Link>
        </div>
      </div>
    </main>
  );
}
