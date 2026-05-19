import Link from "next/link";
import { Bodoni_Moda, Tenor_Sans, Jost } from "next/font/google";
import styles from "./page.module.css";

const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  style: ["normal", "italic"],
  variable: "--font-bodoni",
});

const tenor = Tenor_Sans({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-tenor",
});

const jost = Jost({
  subsets: ["latin"],
  weight: ["200", "300", "400"],
  variable: "--font-jost",
});

export const metadata = {
  title: "Yosemite Weekend · May 2026 — GoDeep",
  description:
    "An example three-day Yosemite itinerary built with GoDeep. Granite walls, Mist Trail, Glacier Point sunset.",
};

export default function YosemiteWeekend() {
  return (
    <div className={`${bodoni.variable} ${tenor.variable} ${jost.variable} ${styles.root}`}>
      <Link href="/portfolio" className={styles.backLink}>
        ← All examples
      </Link>

      <article className={styles.itinerary}>
        <div className={styles.hero}>
          <svg
            className={styles.mountainSvg}
            viewBox="0 0 500 280"
            xmlns="http://www.w3.org/2000/svg"
          >
            <polygon points="500,280 340,280 420,130 500,190" fill="white" />
            <polygon points="360,280 170,280 295,72 400,175" fill="white" />
            <polygon points="250,280 50,280 168,38 308,158" fill="white" />
            <polygon points="150,280 0,280 78,118 198,198" fill="white" />
          </svg>

          <div className={styles.heroEyebrow}>
            Memorial Day Weekend &nbsp;·&nbsp; May 2026
          </div>
          <div className={styles.heroTitle}>
            Yosemite
            <br />
            <span className={styles.italic}>Weekend</span>
          </div>
          <div className={styles.heroBottom}>
            <div className={styles.heroTagline}>
              Three days. Granite walls. Good people.
            </div>
            <div className={styles.heroMeta}>
              San Francisco → Yosemite
              <br />
              May 23 – 25 &nbsp;·&nbsp; 2026
            </div>
          </div>
        </div>

        <div className={styles.logistics}>
          <div className={styles.logItem}>
            <div className={styles.logLabel}>Stay</div>
            <div className={styles.logVal}>42339 Lulang Ln, Ahwahnee</div>
          </div>
          <div className={styles.logItem}>
            <div className={styles.logLabel}>Book Now</div>
            <div className={styles.logVal}>Glacier Point + Park Entry</div>
          </div>
          <div className={styles.logItem}>
            <div className={styles.logLabel}>Pack Food For</div>
            <div className={styles.logVal}>Mon lunch</div>
          </div>
          <div className={styles.logItem}>
            <div className={styles.logLabel}>Drive</div>
            <div className={styles.logVal}>~3.5 hrs each way from SF</div>
          </div>
        </div>

        <div className={styles.body}>
          <div className={styles.dayCard}>
            <div className={styles.dayNumCol}>
              <div>
                <div className={styles.dayNum}>23</div>
                <div className={styles.dayDow}>Saturday</div>
              </div>
              <div className={styles.dayVibe}>arrival &amp; rest</div>
            </div>
            <div className={styles.dayContent}>
              <div className={styles.slot}>
                <div className={styles.slotLabel}>Morning</div>
                <div>
                  <div className={styles.slotTitle}>Drive to Airbnb</div>
                  <div className={styles.slotBody}>
                    Leave SF early — holiday weekend traffic on 120 can be brutal. Budget 3–4 hrs.
                  </div>
                </div>
              </div>
              <hr className={styles.rule} />
              <div className={styles.slot}>
                <div className={styles.slotLabel}>Afternoon</div>
                <div>
                  <div className={styles.slotTitle}>Settle in, groceries, cook dinner</div>
                  <div className={styles.slotBody}>
                    Easy night — games, good food, early sleep before the big hike day.
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={`${styles.dayCard} ${styles.c2}`}>
            <div className={styles.dayNumCol}>
              <div>
                <div className={styles.dayNum}>24</div>
                <div className={styles.dayDow}>Sunday</div>
              </div>
              <div className={styles.dayVibe}>yosemite valley day</div>
            </div>
            <div className={styles.dayContent}>
              <div className={styles.slot}>
                <div className={styles.slotLabel}>Morning</div>
                <div>
                  <div className={styles.slotTitle}>Waterfall hike — choose your path</div>
                  <div className={styles.slotDetail}>
                    <strong>Option A</strong> &nbsp;·&nbsp; Upper Yosemite Falls · 7.2 mi RT · tallest waterfall in North America · Yosemite Falls Trailhead
                  </div>
                  <div className={styles.slotDetail}>
                    <strong>Option B</strong> &nbsp;·&nbsp; Vernal &amp; Nevada Falls via Mist Trail · 7 mi RT · 2,000 ft gain · Happy Isles Trailhead · expect to get soaked
                  </div>
                  <div className={styles.pills}>
                    <span className={`${styles.pill} ${styles.pillRose}`}>Start before 8am</span>
                    <span className={`${styles.pill} ${styles.pillRose}`}>Pack lunch + dinner</span>
                    <span className={styles.pill}>Holiday crowds</span>
                  </div>
                </div>
              </div>
              <hr className={styles.rule} />
              <div className={styles.slot}>
                <div className={styles.slotLabel}>8:00 PM</div>
                <div>
                  <div className={styles.slotTitle}>Glacier Point sunset</div>
                  <div className={styles.slotBody}>
                    Half Dome straight ahead, valley 3,200 ft below. One of the great views on earth. Arrive by 7:30 — sort dinner beforehand.
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={`${styles.dayCard} ${styles.c3}`}>
            <div className={styles.dayNumCol}>
              <div>
                <div className={styles.dayNum}>25</div>
                <div className={styles.dayDow}>Monday</div>
              </div>
              <div className={styles.dayVibe}>tioga pass revenge day</div>
            </div>
            <div className={styles.dayContent}>
              <div className={styles.slot}>
                <div className={styles.slotLabel}>Morning</div>
                <div>
                  <div className={styles.slotTitle}>North Dome via Tioga Pass</div>
                  <div className={styles.slotBody}>
                    Looking down at Half Dome from the north — fewer crowds, different angle, equally absurd view. 8.8 mi RT · Porcupine Creek Trailhead.
                  </div>
                  <div className={styles.altLine}>
                    ↳ Steph&apos;s alt: Tenaya Lake — flat walk, crystal water, still stunning
                  </div>
                </div>
              </div>
              <hr className={styles.rule} />
              <div className={styles.slot}>
                <div className={styles.slotLabel}>Evening</div>
                <div>
                  <div className={styles.slotTitle}>Drive home (~5 hrs)</div>
                  <div className={styles.slotBody}>
                    Leave by 4–5 PM. Memorial Day traffic on the return is no joke.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.footer}>
          <div className={styles.footerL}>
            The mountains are calling — and you must go.
          </div>
          <div className={styles.footerR}>
            Yosemite National Park &nbsp;·&nbsp; Est. 1890
          </div>
        </div>
      </article>

      <div className={styles.cta}>
        <Link href="/create" className={styles.ctaButton}>
          Plan a trip like this →
        </Link>
      </div>
    </div>
  );
}
