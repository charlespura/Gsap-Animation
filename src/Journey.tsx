import { useEffect, useRef, useState } from "react";
import { ThreeBackdrop } from "./ThreeBackdrop";
import { chapters } from "./chapters";

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d={diagonal ? "M5 19 19 5M5 5h14v14" : "M4 12h16m-6-6 6 6-6 6"}
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function Mark() {
  return (
    <svg
      viewBox="0 0 32 32"
      width="30"
      height="30"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="16" cy="16" r="11" stroke="currentColor" />
      <ellipse
        cx="16"
        cy="16"
        rx="17"
        ry="5"
        transform="rotate(-40 16 16)"
        stroke="currentColor"
      />
      <circle cx="26" cy="7" r="2.5" fill="var(--accent)" />
    </svg>
  );
}

function ChapterVisual({ index }: { index: number }) {
  if (index === 0)
    return (
      <div className="browser-art">
        <div className="window-bar">
          <span className="window-dots">
            <i />
            <i />
            <i />
          </span>
          <span>the beginning.html</span>
          <span>01</span>
        </div>
        <div className="browser-page">
          <span className="mono">WORLD WIDE WEB</span>
          <h3>
            Hello,
            <br />
            world<span>_</span>
          </h3>
          <p>
            A little text.
            <br />
            An underlined link.
            <br />
            An entirely different world.
          </p>
          <span className="first-link">
            Follow the first connection <Arrow />
          </span>
        </div>
        <div className="window-bottom">
          <span className="status-dot" /> CONNECTION ESTABLISHED{" "}
          <span>14.4 kb/s</span>
        </div>
      </div>
    );
  if (index === 1)
    return (
      <div className="network-art">
        <svg viewBox="0 0 520 380" aria-hidden="true">
          <g className="network-lines">
            <path d="M260 190 100 80M260 190 410 65M260 190 440 260M260 190 130 310M260 190 65 210M100 80 410 65M410 65 440 260M130 310 440 260" />
          </g>
          {[
            [100, 80],
            [410, 65],
            [440, 260],
            [130, 310],
            [65, 210],
            [260, 190],
          ].map(([x, y], i) => (
            <g
              key={i}
              className="network-node"
              transform={`translate(${x} ${y})`}
            >
              <circle r={i === 5 ? 43 : 26} />
              <circle cy="-5" r={i === 5 ? 9 : 6} className="person" />
              <path
                d={
                  i === 5
                    ? "M-16 18q0-19 16-19t16 19"
                    : "M-11 15q0-14 11-14t11 14"
                }
                className="person"
              />
            </g>
          ))}
        </svg>
        <span className="art-caption">ONE CONNECTION BECOMES MANY</span>
        <span className="message-tag">you are here.</span>
      </div>
    );
  if (index === 2)
    return (
      <div className="mobile-art">
        <div className="orbit-ring ring-a" />
        <div className="orbit-ring ring-b" />
        <span className="satellite-tag tag-cloud">CLOUD / SYNCED</span>
        <div className="phone">
          <div className="phone-speaker" />
          <div className="phone-screen">
            <span className="mono">ANYWHERE ON EARTH</span>
            <strong>09:41</strong>
            <div className="map-grid">
              <svg viewBox="0 0 160 130" aria-hidden="true">
                <path d="M0 95 50 95 50 45 105 45 105 0M0 25h160M25 0v130M0 115h160M140 0v130" />
                <circle cx="105" cy="45" r="10" />
              </svg>
              <span className="map-point" />
            </div>
            <div className="phone-apps">
              <i />
              <i />
              <i />
              <i />
            </div>
          </div>
          <div className="phone-home" />
        </div>
        <span className="satellite-tag tag-location">
          LOCATION / EVERYWHERE
        </span>
      </div>
    );
  if (index === 3)
    return (
      <div className="console-art">
        <div className="window-bar">
          <span className="status-dot" />
          <span>human + machine</span>
          <span>04</span>
        </div>
        <div className="console-body">
          <span className="mono console-role">YOU</span>
          <p>What comes next?</p>
          <div className="console-response">
            <span className="ai-mark">✳</span>
            <div>
              <span className="mono">CO-PILOT</span>
              <p className="type-line">
                Let's work it out.
                <span className="cursor" />
              </p>
              <div className="waveform">
                {Array.from({ length: 32 }, (_, i) => (
                  <i
                    key={i}
                    style={{ height: `${8 + Math.sin(i * 1.7) ** 2 * 30}px` }}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="console-note">
            A tool for thinking.
            <br />
            The judgment is still yours.
          </div>
        </div>
        <div className="window-bottom">
          HUMAN IN THE LOOP <span>● ACTIVE</span>
        </div>
      </div>
    );
  if (index === 4)
    return (
      <div className="spatial-art">
        <div className="spatial-grid" />
        <div className="spatial-orbit" />
        <div className="spatial-panel">
          <span className="mono">SHARED SPACE / 01</span>
          <svg viewBox="0 0 220 150" fill="none" aria-hidden="true">
            <path
              d="m110 15 70 40v75l-70-40-70 40V55Zm0 0v75m70-35-70 40-70-40m70 40v55"
              stroke="currentColor"
              strokeWidth="1"
            />
          </svg>
          <span>Less screen. More world.</span>
        </div>
        <span className="coordinate coord-a">X 028.4</span>
        <span className="coordinate coord-b">Y 063.1</span>
        <span className="art-caption">CONCEPT STUDY / SPATIAL WEB</span>
      </div>
    );
  return (
    <div className="space-art">
      <div className="planet planet-earth" />
      <div className="planet planet-far" />
      <svg viewBox="0 0 520 380" fill="none" aria-hidden="true">
        <path className="signal-path" d="M120 260Q245 20 410 105" />
        <circle className="signal-particle" r="4">
          <animateMotion
            dur="5s"
            repeatCount="indefinite"
            path="M120 260Q245 20 410 105"
          />
        </circle>
      </svg>
      <span className="earth-label mono">HOME</span>
      <span className="destination-label mono">SOMEWHERE NEW</span>
      <span className="art-caption">DISTANCE IS A DESIGN PROBLEM</span>
    </div>
  );
}

export function Journey() {
  const [active, setActive] = useState(-1);
  const [menuOpen, setMenuOpen] = useState(false);
  const [motion, setMotion] = useState(() => {
    try {
      return (
        localStorage.getItem("orbital-motion") !== "off" &&
        !window.matchMedia("(prefers-reduced-motion: reduce)").matches
      );
    } catch {
      return !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }
  });
  const progress = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const update = () => {
      const height = document.documentElement.scrollHeight - innerHeight;
      if (progress.current)
        progress.current.style.transform = `scaleX(${height > 0 ? scrollY / height : 0})`;
      const chapter = chapters.reduce(
        (found, item, index) =>
          (document.getElementById(item.id)?.getBoundingClientRect().top ??
            Infinity) <=
          innerHeight * 0.5
            ? index
            : found,
        -1,
      );
      setActive(chapter);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);
  useEffect(() => {
    document.documentElement.dataset.motion = motion ? "on" : "off";
    window.dispatchEvent(new Event("orbital-motion"));
    try {
      localStorage.setItem("orbital-motion", motion ? "on" : "off");
    } catch {
      /* Storage is optional. */
    }
  }, [motion]);
  useEffect(() => {
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        document.querySelector<HTMLButtonElement>(".menu-toggle")?.focus();
      }
    };
    if (menuOpen) window.addEventListener("keydown", escape);
    return () => window.removeEventListener("keydown", escape);
  }, [menuOpen]);
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const change = () => {
      if (preference.matches) setMotion(false);
    };
    preference.addEventListener("change", change);
    return () => preference.removeEventListener("change", change);
  }, []);
  const closeMenu = () => setMenuOpen(false);
  return (
    <>
      <a className="skip-link" href="#journey">
        Skip to the journey
      </a>
      <header className="site-header">
        <a href="#hero" className="wordmark" aria-label="Orbital home">
          <Mark />
          <span>
            orbital<span className="wordmark-period">.</span>
          </span>
        </a>
        <span className="header-edition mono">
          AN INTERNET FLIGHT JOURNAL <span>VOL. 001</span>
        </span>
        <nav
          id="mobile-menu"
          className={menuOpen ? "header-nav is-open" : "header-nav"}
          aria-label="Main navigation"
        >
          <a href="#flight-plan" onClick={closeMenu}>
            Flight plan
          </a>
          <a href="#journey" onClick={closeMenu}>
            The journey
          </a>
          <a href="#era5" onClick={closeMenu}>
            What’s next <Arrow diagonal />
          </a>
        </nav>
        <button
          className="menu-toggle mono"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "CLOSE −" : "MENU +"}
        </button>
        <div className="reading-progress" ref={progress} />
      </header>
      <main>
        <section className="hero" id="hero" aria-labelledby="hero-title">
          <div className="hero-grid" aria-hidden="true" />
          <div className="hero-content">
            <div className="eyebrow">
              <span className="status-dot" /> SMALL SIGNALS. GIANT LEAPS.
            </div>
            <h1 id="hero-title">
              It started
              <br />
              with a<br />
              <em>connection.</em>
            </h1>
            <p className="hero-description">
              A flight through the internet’s past.
              <br />
              And a look at where we might land next.
            </p>
            <div className="hero-actions">
              <a href="#era1" className="button button-primary">
                Begin the journey <Arrow />
              </a>
              <span className="reading-time mono">
                6 ERAS
                <br />
                ONE ONGOING MISSION
              </span>
            </div>
          </div>
          <div className="hero-ship">
            <ThreeBackdrop />
            <div className="ship-coordinate mono">
              VESSEL / ORB–001
              <br />
              <span>BUILT FOR CURIOSITY</span>
            </div>
            <div className="ship-label mono">
              <span className="crosshair">+</span> NEXT STOP
              <br />
              <strong>THE UNKNOWN</strong>
            </div>
            <span className="orbit-label mono">
              EXPLORATION HAS NO FINISH LINE
            </span>
          </div>
          <div className="hero-bottom mono">
            <a href="#flight-plan">
              SCROLL TO EXPLORE <span>↓</span>
            </a>
            <span>
              EST. 1990 <span className="muted">/</span> STILL IN FLIGHT
            </span>
            <button
              className="motion-control"
              aria-pressed={!motion}
              onClick={() => setMotion(!motion)}
            >
              <span
                className={
                  motion ? "motion-indicator running" : "motion-indicator"
                }
              />{" "}
              MOTION {motion ? "ON" : "OFF"}
            </button>
          </div>
        </section>
        <section
          className="flight-plan"
          id="flight-plan"
          aria-labelledby="plan-title"
        >
          <div className="plan-heading">
            <span className="eyebrow">THE FLIGHT PLAN</span>
            <h2 id="plan-title">Six stops. A different world at each.</h2>
            <p>Pick a decade, or take the long way through.</p>
          </div>
          <nav className="chapter-map" aria-label="Jump to an era">
            {chapters.map((chapter, index) => (
              <a href={`#${chapter.id}`} key={chapter.id}>
                <span className="map-step mono">
                  0{index + 1}
                  <span>{index > 3 ? "PROJECTED" : "LOGGED"}</span>
                </span>
                <span className="map-track">
                  <i />
                </span>
                <strong>{chapter.year}</strong>
                <span className="map-label">{chapter.label}</span>
                <Arrow diagonal />
              </a>
            ))}
          </nav>
        </section>
        <div className="journey-layout" id="journey">
          <aside className="mission-rail" aria-label="Journey progress">
            <span className="mono rail-heading">MISSION LOG</span>
            <nav>
              {chapters.map((chapter, index) => (
                <a
                  href={`#${chapter.id}`}
                  key={chapter.id}
                  className={active === index ? "active" : ""}
                  aria-current={active === index ? "step" : undefined}
                >
                  <span className="rail-dot" />
                  <span className="mono">{chapter.year}</span>
                  <span className="rail-name">{chapter.label}</span>
                </a>
              ))}
            </nav>
            <div className="rail-footer mono">
              <span className="status-dot" />{" "}
              {active > 3 ? "EXPLORING POSSIBILITIES" : "TRACING THE SIGNAL"}
            </div>
          </aside>
          <div className="chapters">
            {chapters.map((chapter, index) => (
              <section
                id={chapter.id}
                className={`chapter chapter-${index + 1}`}
                key={chapter.id}
                aria-labelledby={`${chapter.id}-title`}
              >
                <div className="chapter-top mono">
                  <span>LOG / 0{index + 1}</span>
                  <span>{chapter.status}</span>
                </div>
                <div className="chapter-body">
                  <div className="chapter-copy">
                    <div className="chapter-year">
                      {chapter.year}
                      <span>↗</span>
                    </div>
                    <span className="eyebrow">{chapter.label}</span>
                    <h2 id={`${chapter.id}-title`}>{chapter.title}</h2>
                    <p>{chapter.description}</p>
                    <ul className="chapter-tags" aria-label="Key technologies">
                      {chapter.tags.map((tag) => (
                        <li key={tag}>{tag}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="chapter-art">
                    <ChapterVisual index={index} />
                  </div>
                </div>
                <div className="chapter-foot">
                  <span className="chapter-takeaway">
                    <span>↳</span> {chapter.detail}
                  </span>
                  <a
                    href={index < 5 ? `#era${index + 2}` : "#landing"}
                    className="next-link mono"
                  >
                    {index < 5 ? "NEXT LOG" : "MISSION COMPLETE"} <span>↓</span>
                  </a>
                </div>
              </section>
            ))}
          </div>
        </div>
        <section className="landing" id="landing">
          <div className="eyebrow">
            <span className="status-dot" /> END OF LOG. NOT THE MISSION.
          </div>
          <h2>
            The next chapter
            <br />
            is <em>still unwritten.</em>
          </h2>
          <p>
            Every version of the web began with someone
            <br className="desktop-break" /> wondering what a connection could
            do.
          </p>
          <a href="#hero" className="button button-primary">
            Take it from the top <Arrow />
          </a>
          <span className="landing-orbit" aria-hidden="true" />
        </section>
      </main>
      <footer className="site-footer">
        <a href="#hero" className="wordmark">
          <Mark />
          <span>orbital.</span>
        </a>
        <p>A small field guide to a very big network.</p>
        <span className="mono">PAST RECORDED. FUTURE IMAGINED.</span>
        <a
          href="https://github.com/charlespura/Gsap-Animation"
          target="_blank"
          rel="noreferrer"
          className="source-link mono"
        >
          SOURCE <Arrow diagonal />
        </a>
      </footer>
    </>
  );
}
