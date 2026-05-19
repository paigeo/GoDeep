import Link from "next/link";
import { Fraunces, DM_Sans } from "next/font/google";
import styles from "./page.module.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-serif",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Amsterdam · A Long Weekend — GoDeep",
  description:
    "An example three-day Amsterdam getaway built with GoDeep. Canals, pastries, slow brunches, photo time.",
};

export default function AmsterdamGirlsTrip() {
  return (
    <div className={`${fraunces.variable} ${dmSans.variable} ${styles.root}`}>
      <Link href="/portfolio" className={styles.backLink}>
        ← All examples
      </Link>

      <article className={styles.zine}>
        <section className={styles.hero}>
          <div className={styles.heroOrnament}>A long weekend abroad</div>
          <h1 className={styles.heroTitle}>
            <em>Amsterdam</em>
          </h1>
          <p className={styles.heroDates}>27 — 29 June, 2026</p>
          <p className={styles.heroTagline}>
            Three days. Three girls. Canal photos, slow mornings, and one museum
            you actually book in advance.
          </p>

          <svg
            className={styles.canalSvg}
            viewBox="0 0 240 80"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="#c97758"
            strokeWidth="1.2"
            strokeLinecap="round"
          >
            <path d="M10 60 Q 60 30, 120 60 T 230 60" />
            <path d="M30 50 L 30 60 M 50 48 L 50 60 M 90 45 L 90 60 M 130 48 L 130 60 M 170 50 L 170 60 M 200 52 L 200 60" />
            <circle cx="60" cy="38" r="2" fill="#c97758" stroke="none" />
            <circle cx="180" cy="42" r="2" fill="#c97758" stroke="none" />
          </svg>
        </section>

        <section className={styles.about}>
          <div className={styles.aboutCell}>
            <p className={styles.aboutLabel}>The girls</p>
            <p className={styles.aboutValue}>Paige, Steph &amp; Mira</p>
          </div>
          <div className={styles.aboutCell}>
            <p className={styles.aboutLabel}>From</p>
            <p className={styles.aboutValue}>Schiphol → Centraal</p>
          </div>
          <div className={styles.aboutCell}>
            <p className={styles.aboutLabel}>Pace</p>
            <p className={styles.aboutValue}>Unhurried</p>
          </div>
        </section>

        <section className={styles.section}>
          <p className={styles.sectionTag}>The Itinerary</p>
          <h2 className={styles.sectionTitle}>
            Three <em>perfect</em> days.
          </h2>

          <div className={styles.day}>
            <div className={styles.dayMeta}>
              <p className={styles.dayLabel}>Day 01</p>
              <p className={styles.dayNum}>27</p>
              <p className={styles.dayDow}>Saturday</p>
              <span className={styles.dayMood}>arrival &amp; canals</span>
            </div>
            <div className={styles.dayList}>
              <div className={styles.activity}>
                <p className={styles.activityTime}>9:15 AM</p>
                <div>
                  <h3 className={styles.activityTitle}>Land at Schiphol</h3>
                  <p className={styles.activityBody}>
                    NS Dutch Railways straight to Amsterdam Centraal — 20
                    minutes, trains every 10. Drop bags, change into the linen.
                  </p>
                </div>
              </div>
              <div className={styles.activity}>
                <p className={styles.activityTime}>11:30 AM</p>
                <div>
                  <h3 className={styles.activityTitle}>
                    Pancakes &amp; canal-side wander
                  </h3>
                  <p className={styles.activityBody}>
                    Dutch pancakes for first meal. Walk the Jordaan after — the
                    little bridges, the tilted houses, the canal.
                  </p>
                  <p className={styles.activityNote}>
                    ↳ Bring the film camera. The light at noon is everything.
                  </p>
                </div>
              </div>
              <div className={styles.activity}>
                <p className={styles.activityTime}>2:00 PM</p>
                <div>
                  <h3 className={styles.activityTitle}>
                    Bikes through <em>Vondelpark</em>
                  </h3>
                  <p className={styles.activityBody}>
                    Rent the cruiser bikes. Cut through the park, picnic if you
                    grabbed snacks, photograph everything.
                  </p>
                </div>
              </div>
              <div className={styles.activity}>
                <p className={styles.activityTime}>5 — 7 PM</p>
                <div>
                  <h3 className={styles.activityTitle}>The nap</h3>
                  <p className={styles.activityBody}>
                    Non-negotiable. You flew overnight. Reset before dinner.
                  </p>
                </div>
              </div>
              <div className={styles.activity}>
                <p className={styles.activityTime}>7:30 PM</p>
                <div>
                  <h3 className={styles.activityTitle}>
                    Dinner at <em>Wilde Zwijnen</em>
                  </h3>
                  <p className={styles.activityBody}>
                    A bit out from the center — the trade is the calm and the
                    decor. Three-course set menu, €37.50, book ahead.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.day}>
            <div className={styles.dayMeta}>
              <p className={styles.dayLabel}>Day 02</p>
              <p className={styles.dayNum}>28</p>
              <p className={styles.dayDow}>Sunday</p>
              <span className={styles.dayMood}>museums &amp; markets</span>
            </div>
            <div className={styles.dayList}>
              <div className={styles.activity}>
                <p className={styles.activityTime}>9:30 AM</p>
                <div>
                  <h3 className={styles.activityTitle}>
                    Coffee at <em>Scandinavian Embassy</em>
                  </h3>
                  <p className={styles.activityBody}>
                    Slow morning. Sourdough, oat lattes, the kind of cafe
                    everyone you know on Instagram has photographed.
                  </p>
                </div>
              </div>
              <div className={styles.activity}>
                <p className={styles.activityTime}>11:00 AM</p>
                <div>
                  <h3 className={styles.activityTitle}>Albert Cuyp market</h3>
                  <p className={styles.activityBody}>
                    Stroopwafels hot off the iron, vintage stalls, fresh
                    flowers. Wander slowly.
                  </p>
                </div>
              </div>
              <div className={styles.activity}>
                <p className={styles.activityTime}>2:00 PM</p>
                <div>
                  <h3 className={styles.activityTitle}>Van Gogh Museum</h3>
                  <p className={styles.activityBody}>
                    Book the timed-entry slot a week out. Plan ~2 hours inside.
                  </p>
                  <p className={styles.activityNote}>
                    ↳ The Rijksmuseum next door is the alt if it&apos;s sold out.
                  </p>
                </div>
              </div>
              <div className={styles.activity}>
                <p className={styles.activityTime}>4:30 PM</p>
                <div>
                  <h3 className={styles.activityTitle}>
                    Shopping at De Bijenkorf
                  </h3>
                  <p className={styles.activityBody}>
                    The grand department store. Even if you don&apos;t buy
                    anything, the building is the point.
                  </p>
                </div>
              </div>
              <div className={styles.activity}>
                <p className={styles.activityTime}>7:00 PM</p>
                <div>
                  <h3 className={styles.activityTitle}>
                    Dinner at <em>Moeders</em>
                  </h3>
                  <p className={styles.activityBody}>
                    Traditional Dutch. Walls covered in framed photos of
                    everyone&apos;s mothers. Order the stamppot.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.day}>
            <div className={styles.dayMeta}>
              <p className={styles.dayLabel}>Day 03</p>
              <p className={styles.dayNum}>29</p>
              <p className={styles.dayDow}>Monday</p>
              <span className={styles.dayMood}>pastries &amp; goodbyes</span>
            </div>
            <div className={styles.dayList}>
              <div className={styles.activity}>
                <p className={styles.activityTime}>9:00 AM</p>
                <div>
                  <h3 className={styles.activityTitle}>
                    Pastries at <em>Patisserie Holtkamp</em>
                  </h3>
                  <p className={styles.activityBody}>
                    The croquettes, the éclairs, the appeltaart. Eat
                    everything. You leave today.
                  </p>
                </div>
              </div>
              <div className={styles.activity}>
                <p className={styles.activityTime}>10:30 AM</p>
                <div>
                  <h3 className={styles.activityTitle}>
                    The photo hour
                  </h3>
                  <p className={styles.activityBody}>
                    Dedicated slot. Brouwersgracht, the Magere Brug, the
                    flower market. Outfits matter today.
                  </p>
                </div>
              </div>
              <div className={styles.activity}>
                <p className={styles.activityTime}>12:30 PM</p>
                <div>
                  <h3 className={styles.activityTitle}>Anne Frank House</h3>
                  <p className={styles.activityBody}>
                    Book the moment tickets release (two months ahead) — they
                    sell out within hours. Quiet, sobering, important.
                  </p>
                </div>
              </div>
              <div className={styles.activity}>
                <p className={styles.activityTime}>3:00 PM</p>
                <div>
                  <h3 className={styles.activityTitle}>Last lap of shopping</h3>
                  <p className={styles.activityBody}>
                    Pick up the thing you saw yesterday and almost bought. Now
                    is the time.
                  </p>
                </div>
              </div>
              <div className={styles.activity}>
                <p className={styles.activityTime}>5:00 PM</p>
                <div>
                  <h3 className={styles.activityTitle}>Flight home</h3>
                  <p className={styles.activityBody}>
                    Train back to Schiphol — leave by 3pm to give yourself a
                    buffer. Cry a little on the platform.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.notebook}>
          <div className={styles.notebookHeader}>
            <p className={styles.notebookEyebrow}>From a friend who&apos;s been</p>
            <h2 className={styles.notebookTitle}>
              <em>Steph&apos;s</em> notebook
            </h2>
            <p className={styles.notebookSub}>
              The recs she sent before we booked anything
            </p>
          </div>

          <div className={styles.notebookGrid}>
            <div className={styles.noteBlock}>
              <span className={styles.noteBlockLabel}>Long dinners</span>
              <div className={styles.noteItem}>
                <p className={styles.noteName}>
                  <em>Wilde Zwijnen</em>
                  <span className={styles.notePrice}>$$</span>
                </p>
                <p className={styles.noteBody}>
                  Beautiful decor, calmer than the center. The 3-course set is a steal.
                </p>
              </div>
              <div className={styles.noteItem}>
                <p className={styles.noteName}>
                  <em>de Silveren Spiegel</em>
                  <span className={styles.notePrice}>$$$ · Michelin</span>
                </p>
                <p className={styles.noteBody}>
                  Worth the trek if you want one fancy night.
                </p>
              </div>
              <div className={styles.noteItem}>
                <p className={styles.noteName}>
                  <em>The Pantry</em>
                  <span className={styles.notePrice}>$$</span>
                </p>
                <p className={styles.noteBody}>
                  Traditional Dutch. A little touristy but very good. Get the pea soup.
                </p>
              </div>
            </div>

            <div className={styles.noteBlock}>
              <span className={styles.noteBlockLabel}>Pastries &amp; coffee</span>
              <div className={styles.noteItem}>
                <p className={styles.noteName}>
                  <em>Patisserie Holtkamp</em>
                </p>
                <p className={styles.noteBody}>
                  The pastry case alone is worth the visit. Patisserie Kuyt is
                  the alt nearby.
                </p>
              </div>
              <div className={styles.noteItem}>
                <p className={styles.noteName}>
                  <em>Scandinavian Embassy</em>
                </p>
                <p className={styles.noteBody}>
                  The slow morning spot. Coffee, sourdough, no rush.
                </p>
              </div>
            </div>

            <div className={styles.noteBlock}>
              <span className={styles.noteBlockLabel}>Worth the line</span>
              <div className={styles.noteItem}>
                <p className={styles.noteName}>
                  <em>Anne Frank House</em>
                </p>
                <p className={styles.noteBody}>
                  Book the second tickets go live. Quiet, heavy, essential.
                </p>
              </div>
              <div className={styles.noteItem}>
                <p className={styles.noteName}>
                  <em>The Rijksmuseum</em>
                </p>
                <p className={styles.noteBody}>
                  Steph&apos;s favorite. Heavy on Rembrandt, has a sweet cafe inside.
                </p>
              </div>
            </div>

            <div className={styles.noteBlock}>
              <span className={styles.noteBlockLabel}>Just walk it</span>
              <div className={styles.noteItem}>
                <p className={styles.noteName}>The canals</p>
                <p className={styles.noteBody}>
                  Brouwersgracht, Prinsengracht, the Nine Streets. Just wander —
                  the bridges are the point.
                </p>
              </div>
              <div className={styles.noteItem}>
                <p className={styles.noteName}>Albert Cuyp market</p>
                <p className={styles.noteBody}>
                  Hot stroopwafels, vintage hunting, flowers everywhere.
                </p>
              </div>
            </div>
          </div>

          <div className={styles.packing}>
            <div className={styles.packingCell}>
              <p className={styles.packingLabel}>The packing list</p>
              <p className={styles.packingTitle}>
                <em>What we&apos;re bringing</em>
              </p>
              <ul className={styles.packingList}>
                <li>One white linen set</li>
                <li>Sneakers that survive cobblestones</li>
                <li>A film camera</li>
                <li>One slightly nicer dress for Wilde Zwijnen</li>
                <li>A rain layer (just in case)</li>
              </ul>
            </div>
            <div className={styles.packingCell}>
              <p className={styles.packingLabel}>Book before you fly</p>
              <p className={styles.packingTitle}>
                <em>The reservations</em>
              </p>
              <ul className={styles.packingList}>
                <li>Anne Frank House (2 months out)</li>
                <li>Van Gogh Museum (1 week out)</li>
                <li>Wilde Zwijnen dinner</li>
                <li>Moeders dinner</li>
              </ul>
            </div>
          </div>
        </section>

        <div className={styles.footer}>
          <p className={styles.footerTitle}>
            <em>Tot ziens, Amsterdam.</em>
          </p>
          <p className={styles.footerSub}>
            Until next time &nbsp;·&nbsp; A GoDeep example
          </p>
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
