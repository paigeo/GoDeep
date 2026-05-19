import Link from "next/link";
import { Inter } from "next/font/google";
import styles from "./page.module.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Zermatt Ski Trip · January 2026 — GoDeep",
  description:
    "An example ten-day Zermatt ski trip itinerary built with GoDeep. Seven friends in the Swiss Alps.",
};

const CREW = ["Alex", "Sam", "Will", "Jamie", "Marco", "Theo", "Nick"];

export default function ZermattSkiTrip() {
  return (
    <div className={`${inter.variable} ${styles.root}`}>
      <Link href="/portfolio" className={styles.backLink}>
        ← All examples
      </Link>

      <article className={styles.brief}>
        <section className={styles.hero}>
          <div className={styles.heroMeta}>
            <span>Example · 02</span>
            <span>Switzerland</span>
          </div>

          <h1 className={styles.heroTitle}>Zermatt.</h1>
          <p className={styles.heroSub}>
            Ten days in the Swiss Alps. Seven friends, one chalet, the Matterhorn out the window.
          </p>

          <div className={styles.heroBottom}>
            <div>
              <p className={styles.heroDates}>16 — 26 January</p>
              <p className={styles.heroDatesLabel}>2026</p>
            </div>
            <div className={styles.heroRoute}>
              SFO <span>·</span> ZRH <span>·</span> Zermatt
            </div>
          </div>
        </section>

        <section className={styles.overview}>
          <div className={styles.statCell}>
            <span className={styles.statLabel}>Duration</span>
            <span className={styles.statValue}>10 days</span>
          </div>
          <div className={styles.statCell}>
            <span className={styles.statLabel}>Crew</span>
            <span className={styles.statValue}>7 friends</span>
          </div>
          <div className={styles.statCell}>
            <span className={styles.statLabel}>Base</span>
            <span className={styles.statValue}>Haus Andy</span>
          </div>
          <div className={styles.statCell}>
            <span className={styles.statLabel}>Elevation</span>
            <span className={styles.statValue}>1,608 m</span>
          </div>
        </section>

        <section className={styles.section}>
          <header className={styles.sectionHeader}>
            <span className={styles.sectionNum}>01</span>
            <h2 className={styles.sectionTitle}>The crew</h2>
            <span className={styles.sectionMeta}>7 confirmed</span>
          </header>

          <div className={styles.crew}>
            {CREW.map((name) => (
              <div key={name} className={styles.crewName}>
                {name}
              </div>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <header className={styles.sectionHeader}>
            <span className={styles.sectionNum}>02</span>
            <h2 className={styles.sectionTitle}>Getting there</h2>
            <span className={styles.sectionMeta}>SFO → Zermatt · ~14 hrs</span>
          </header>

          <div className={styles.legs}>
            <div className={styles.leg}>
              <div>
                <p className={styles.legDate}>Fri, Jan 16</p>
                <span className={styles.legDay}>Red eye</span>
              </div>
              <div>
                <p className={styles.legTitle}>SFO → Zurich</p>
                <p className={styles.legBody}>
                  Red eye out of San Francisco, land Saturday morning.
                </p>
              </div>
            </div>

            <div className={styles.leg}>
              <div>
                <p className={styles.legDate}>Sat — Mon</p>
                <span className={styles.legDay}>Zurich</span>
              </div>
              <div>
                <p className={styles.legTitle}>Two nights to reset</p>
                <p className={styles.legBody}>
                  Shake the jet lag in the old town. Walk Niederdorf, eat heavy, sleep early.
                </p>
              </div>
            </div>

            <div className={styles.leg}>
              <div>
                <p className={styles.legDate}>Mon, Jan 19</p>
                <span className={styles.legDay}>~4 hrs by rail</span>
              </div>
              <div>
                <p className={styles.legTitle}>Train to Zermatt</p>
                <p className={styles.legBody}>
                  Board IC8 at Flughafen Zürich, transfer at Visp to the RE41 onward to Zermatt.
                </p>
                <div className={styles.trainRow}>
                  <span className={styles.trainStop}>Zurich</span>
                  <span className={styles.trainArrow}>→</span>
                  <span className={styles.trainPill}>IC8</span>
                  <span className={styles.trainDuration}>2 h 15</span>
                  <span className={styles.trainArrow}>→</span>
                  <span className={styles.trainStop}>Visp</span>
                  <span className={styles.trainArrow}>→</span>
                  <span className={styles.trainPill}>RE41</span>
                  <span className={styles.trainDuration}>1 h 06</span>
                  <span className={styles.trainArrow}>→</span>
                  <span className={styles.trainStop}>Zermatt</span>
                </div>
                <p className={styles.legNote}>
                  IC8 departs Zurich HB hourly on the :02 from platform 31.
                </p>
              </div>
            </div>

            <div className={styles.leg}>
              <div>
                <p className={styles.legDate}>Mon, Jan 26</p>
                <span className={styles.legDay}>Back out</span>
              </div>
              <div>
                <p className={styles.legTitle}>Zermatt → SFO</p>
                <p className={styles.legBody}>
                  Reverse the route. RE41 to Visp, IC8 to the airport, evening flight home.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <header className={styles.sectionHeader}>
            <span className={styles.sectionNum}>03</span>
            <h2 className={styles.sectionTitle}>Where we stay</h2>
            <span className={styles.sectionMeta}>2 locations · 8 nights</span>
          </header>

          <div className={styles.lodging}>
            <div className={styles.lodgeCard}>
              <span className={styles.lodgeLabel}>Zurich · 2 nights</span>
              <p className={styles.lodgeName}>Hotel Central</p>
              <p className={styles.lodgeAddr}>
                Central plaza, walking distance to old town.
              </p>
              <p className={styles.lodgeMeta}>4 of us before the train.</p>
            </div>

            <div className={styles.lodgeCard}>
              <span className={styles.lodgeLabel}>Zermatt · 7 nights</span>
              <p className={styles.lodgeName}>Haus Andy</p>
              <p className={styles.lodgeAddr}>
                Schluhmattstrasse · ski-in/ski-out · hot tub on the deck.
              </p>
              <div className={styles.payment}>
                <p className={styles.paymentLabel}>Payment</p>
                <p className={styles.paymentBody}>
                  $1,284 per person — collected through the trip ledger.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <header className={styles.sectionHeader}>
            <span className={styles.sectionNum}>04</span>
            <h2 className={styles.sectionTitle}>On the mountain</h2>
            <span className={styles.sectionMeta}>Day pass each morning</span>
          </header>

          <div className={styles.plays}>
            <div className={styles.play}>
              <span className={styles.playLabel}>Weather permitting</span>
              <p className={styles.playTitle}>Ski over to Breuil-Cervinia, Italy</p>
              <p className={styles.playBody}>
                Ski into Italy and lunch on the other side. The gondola often closes for high winds — check the forecast the night before.
              </p>
              <p className={styles.playNote}>↳ Bring a passport just in case.</p>
            </div>

            <div className={styles.play}>
              <span className={styles.playLabel}>Long lunch</span>
              <p className={styles.playTitle}>Restaurant Chez Vrony</p>
              <p className={styles.playBody}>
                Mid-mountain. Ski up, eat slowly, ski down. Reservations open about a month out.
              </p>
            </div>

            <div className={styles.play}>
              <span className={styles.playLabel}>Optional</span>
              <p className={styles.playTitle}>Off-piste with a guide</p>
              <p className={styles.playBody}>
                One day with a local guide if anyone wants to ski seriously off the marked runs.
              </p>
            </div>

            <div className={styles.play}>
              <span className={styles.playLabel}>Reserve early</span>
              <p className={styles.playTitle}>Swiss Chalet, Zermatt</p>
              <p className={styles.playBody}>
                Fondue and raclette. Book the night you arrive — restaurants here fill up.
              </p>
            </div>
          </div>
        </section>

        <div className={styles.footer}>
          <p className={styles.footerL}>Zermatt, 1,608 m · Matterhorn, 4,478 m</p>
          <p className={styles.footerR}>A GoDeep example</p>
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
