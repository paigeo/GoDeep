import Link from "next/link";

type Trip = {
  slug: string;
  title: string;
  eyebrow: string;
  location: string;
  dates: string;
  people: string;
  tagline: string;
  highlights: string[];
  theme: "yosemite" | "zermatt" | "amsterdam";
};

const TRIPS: Trip[] = [
  {
    slug: "yosemite-weekend",
    title: "Yosemite Weekend",
    eyebrow: "Memorial Day · May 2026",
    location: "San Francisco → Yosemite",
    dates: "May 23 – 25, 2026",
    people: "6 people",
    tagline: "Three days. Granite walls. Good people.",
    highlights: ["Glacier Point sunset", "Mist Trail", "Tioga Pass"],
    theme: "yosemite",
  },
  {
    slug: "zermatt-ski-trip",
    title: "Zermatt Ski Trip",
    eyebrow: "Winter · Jan 2026",
    location: "SFO → Zurich → Zermatt",
    dates: "Jan 16 – 26, 2026",
    people: "7 friends",
    tagline: "Ten days in the Swiss Alps.",
    highlights: ["Italy via gondola", "Chez Vrony lunch", "Haus Andy"],
    theme: "zermatt",
  },
  {
    slug: "amsterdam-girls-trip",
    title: "Amsterdam",
    eyebrow: "Long weekend · June 2026",
    location: "Schiphol → Centraal",
    dates: "June 27 – 29, 2026",
    people: "3 girls",
    tagline: "Canals, pastries, slow mornings, photo time.",
    highlights: ["Vondelpark bikes", "Van Gogh", "Patisserie Holtkamp"],
    theme: "amsterdam",
  },
];

function TripPreview({ theme, title, eyebrow, tagline }: Trip) {
  if (theme === "yosemite") {
    return (
      <div className="aspect-[5/3] relative bg-gradient-to-br from-[#2a1820] via-[#3a1f2a] to-[#1a1018] overflow-hidden">
        <svg
          viewBox="0 0 500 280"
          className="absolute bottom-0 right-0 w-3/4 opacity-[0.12]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <polygon points="500,280 340,280 420,130 500,190" fill="white" />
          <polygon points="360,280 170,280 295,72 400,175" fill="white" />
          <polygon points="250,280 50,280 168,38 308,158" fill="white" />
          <polygon points="150,280 0,280 78,118 198,198" fill="white" />
        </svg>
        <div className="absolute inset-0 flex flex-col justify-between p-6">
          <p className="font-mono text-[9px] tracking-[0.25em] uppercase text-[#e8c4c8]/80">
            {eyebrow}
          </p>
          <div>
            <h2
              className="text-[36px] leading-[0.9] text-[#fefbf8]"
              style={{ fontFamily: "'Bodoni Moda', Georgia, serif" }}
            >
              {title}
            </h2>
            <p
              className="text-[13px] text-[#c8bcd0] italic mt-2"
              style={{ fontFamily: "'Bodoni Moda', Georgia, serif" }}
            >
              {tagline}
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (theme === "zermatt") {
    return (
      <div className="aspect-[5/3] relative bg-[#14130f] overflow-hidden">
        <div className="absolute inset-0 flex flex-col justify-between p-6">
          <div className="flex items-center justify-between text-[10px] text-[#7a7468]">
            <span>{eyebrow}</span>
            <span>02</span>
          </div>
          <div>
            <h2 className="text-[40px] tracking-tight leading-[0.95] text-[#ebe6dc] font-light">
              {title.split(" ")[0]}<span className="text-[#c97757]">.</span>
            </h2>
            <p className="text-[12px] text-[#b8b1a5] mt-2 font-light">
              {tagline}
            </p>
          </div>
        </div>
      </div>
    );
  }

  // amsterdam
  return (
    <div className="aspect-[5/3] relative bg-gradient-to-br from-[#fdf8f0] via-[#f7f0e4] to-[#f0e6d6] overflow-hidden">
      <svg
        viewBox="0 0 500 200"
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 opacity-50"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        stroke="#c97758"
        strokeWidth="1.5"
        strokeLinecap="round"
      >
        <path d="M20 140 Q 130 80, 250 140 T 480 140" />
        <path d="M70 120 L 70 142 M 110 116 L 110 142 M 200 110 L 200 142 M 290 116 L 290 142 M 380 120 L 380 142 M 440 124 L 440 142" />
        <circle cx="130" cy="98" r="3" fill="#c97758" stroke="none" />
        <circle cx="370" cy="104" r="3" fill="#c97758" stroke="none" />
      </svg>
      <div className="absolute inset-0 flex flex-col justify-between p-6">
        <p
          className="text-[10px] tracking-[0.28em] uppercase text-[#a8593e] italic"
          style={{ fontFamily: "Georgia, serif" }}
        >
          {eyebrow}
        </p>
        <div>
          <h2
            className="text-[40px] leading-[0.95] text-[#3a2820] italic font-light"
            style={{ fontFamily: "Georgia, serif" }}
          >
            {title}
          </h2>
          <p
            className="text-[13px] text-[#8a7866] italic mt-1"
            style={{ fontFamily: "Georgia, serif" }}
          >
            {tagline}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function PortfolioPage() {
  return (
    <main className="min-h-screen bg-[#09090b] text-white">
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 sm:px-8 py-4 border-b border-white/[0.06] bg-[#09090b]/80 backdrop-blur-sm">
        <Link
          href="/"
          className="font-mono text-[11px] tracking-[0.25em] text-white/35 hover:text-white/70 uppercase transition-colors"
        >
          GoDeep
        </Link>
        <div className="flex items-center gap-6">
          <Link
            href="/how-it-works"
            className="text-[13px] text-white/45 hover:text-white/80 transition-colors duration-150"
          >
            How it works
          </Link>
          <Link
            href="/create"
            className="text-[13px] text-white/45 hover:text-white/80 transition-colors duration-150"
          >
            Start planning →
          </Link>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 sm:px-8 pt-32 pb-24">
        <div className="max-w-xl mb-20">
          <p className="font-mono text-[10px] tracking-[0.25em] text-white/25 uppercase mb-6">
            Examples
          </p>
          <h1 className="text-[44px] sm:text-[56px] font-semibold tracking-[-0.02em] leading-[1.05] mb-6">
            Trips worth<br />showing up for.
          </h1>
          <p className="text-[17px] text-white/40 leading-relaxed">
            Three example itineraries — different crews, different vibes, same planning tool. Built to spark ideas for your own.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {TRIPS.map((trip) => (
            <Link
              key={trip.slug}
              href={`/portfolio/${trip.slug}`}
              className="group border border-white/[0.08] rounded-xl bg-white/[0.015] hover:bg-white/[0.03] hover:border-white/[0.14] transition-colors overflow-hidden flex flex-col"
            >
              <TripPreview {...trip} />

              <div className="p-5 flex flex-col flex-1">
                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div>
                    <p className="font-mono text-[9px] tracking-[0.2em] uppercase text-white/25 mb-1">
                      Route
                    </p>
                    <p className="text-[11px] text-white/65 leading-snug">{trip.location}</p>
                  </div>
                  <div>
                    <p className="font-mono text-[9px] tracking-[0.2em] uppercase text-white/25 mb-1">
                      Dates
                    </p>
                    <p className="text-[11px] text-white/65 leading-snug">{trip.dates}</p>
                  </div>
                  <div>
                    <p className="font-mono text-[9px] tracking-[0.2em] uppercase text-white/25 mb-1">
                      Group
                    </p>
                    <p className="text-[11px] text-white/65 leading-snug">{trip.people}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {trip.highlights.map((h) => (
                    <span
                      key={h}
                      className="font-mono text-[9px] tracking-[0.1em] uppercase px-2.5 py-1 rounded-full border border-white/[0.08] text-white/40"
                    >
                      {h}
                    </span>
                  ))}
                </div>
                <p className="mt-auto text-[12px] text-white/35 group-hover:text-white/70 transition-colors">
                  View itinerary →
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-28 border-t border-white/[0.06] pt-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight mb-2">Plan one like this.</h2>
            <p className="text-[15px] text-white/40">Start with your dates and crew — GoDeep handles the rest.</p>
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
