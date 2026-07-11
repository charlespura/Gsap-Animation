
# 🚀 Internet Evolution — GSAP Scroll Showcase

A single-file, scroll-driven storytelling page that takes the visitor through six eras of the internet (1990s → 2050s). As you scroll, a rocket flies down a fixed motion path and **morphs its shape** to match whichever era is currently in view, while each era's visual box runs its own unique GSAP effect (physics, draw-in SVG, scramble text, flip shuffle, drag/inertia, etc).

Everything lives in **one HTML file** — no build step, no bundler, no npm install. Just open it in a browser.

---

## ✨ Features

### Global / page-wide
| Feature | Description |
|---|---|
| **Dark / Light theme toggle** | Button top-right swaps a full CSS-variable palette (`body.light-theme`) with smooth color transitions. |
| **Scroll progress bar** | Thin gradient bar pinned to the top, fills `0% → 100%` as you scroll the whole document. |
| **Rocket motion path + morph** | A rocket icon flies along a fixed SVG bezier path (`#motionPath`) as you scroll the entire page. Its body shape **morphs** (via `MorphSVGPlugin`) into a desktop → phone → robot → brain → galaxy-swirl → DNA helix as each era section scrolls into view, with a little "pulse" scale bounce on every morph. |
| **Hero animations** | Title, badge, subtext, and CTA button fade/slide in on load. |
| **Parallax hero icons** | Three floating glyphs (✦ ◆ ●) drift and rotate at different speeds as you scroll past the hero. |
| **Per-section parallax blobs** | Each era section has soft glow "shapes" that drift at their own speed/direction (`ScrollTrigger` scrub) for depth. |
| **Era text/box reveals** | Each era's text block slides in from alternating left/right, and its visual box scales + rotates in with a `back.out` ease. |
| **Floating visual boxes** | The big icon card in each era gently floats and tilts as you scroll past it (independent of the reveal-in animation). |
| **GSAP-driven hover states** | Hero title, hero paragraph, era numbers, year labels (3D tilt), headings, paragraphs, tech-tag pills, and the footer CTA heading all have custom hover tweens (no CSS `:hover` — done via `mouseenter`/`mouseleave` + `gsap.to`). |
| **Smooth anchor scrolling** | All `<a href="#...">` links scroll smoothly via `ScrollToPlugin` instead of jumping. |

### Per-era effects
| Era | Visual | Effect(s) used |
|---|---|---|
| **1990s — Static Web** | 🖥️ Desktop | `MorphSVGPlugin` cycles the shape through star → circle → diamond → hexagon as you scroll through the section; `DrawSVGPlugin` draws a squiggly line stroke-on. |
| **2000s — Social Web** | 📱 Phone | `ScrambleTextPlugin` scrambles/reveals a rotating list of words ("Web 2.0", "Social Media"...); `TextPlugin` swaps a second line of emoji-text as you scroll. |
| **2010s — Semantic Web** | 🤖 Robot | `Physics2DPlugin` launches a ball with gravity/velocity when the section is ~20% scrolled; `Flip` shuffles 4 icon tiles into a new random order; `Observer` lights up an "observer active" label on pointer/wheel/touch input. |
| **2020s+ — Intelligent Web** | 🧠 Brain | `TextPlugin` typewriter-replaces a label through several buzzwords; `MorphSVGPlugin` cycles a second shape (star → circle → triangle → diamond). |
| **2030s — Immersive Web** | 🌀 Galaxy | `MotionPathPlugin` drives a glowing orb around a closed SVG loop, scrubbed to scroll; `SplitText` explodes a caption into characters and animates them in with stagger. |
| **2050s — Symbiotic Web** | 🧬 DNA | `MorphSVGPlugin` morphs a shape through brain → star → circle → diamond; `DrawSVGPlugin` draws a network of connecting lines; `Draggable` + `InertiaPlugin` let you **drag-and-throw** a little box with real inertia/bounds. |

### Plugins used
`ScrollTrigger` · `ScrollSmoother` · `ScrollToPlugin` · `MorphSVGPlugin` · `MotionPathPlugin` · `DrawSVGPlugin` · `Flip` · `Draggable` · `InertiaPlugin` · `Observer` · `SplitText` · `ScrambleTextPlugin` · `TextPlugin` · `GSDevTools`

*(All loaded from the GSAP 3.15 CDN — some, like `ScrollSmoother` and `GSDevTools`, are Club GreenSock plugins bundled via the CDN links already in the file; if your license/CDN access doesn't include them, see [Troubleshooting](#-troubleshooting) below.)*

---

## ⚙️ How it works

1. **One `ScrollTrigger.create()`** spans `top top` → `bottom bottom` of the whole `<body>`, `scrub: 1.2`. On every scroll update it:
   - Advances the rocket's `MotionPathPlugin` tween progress (`0 → 1`) to match overall scroll progress.
   - Checks each era section's `getBoundingClientRect().top` to figure out which era is "active" (top has crossed 65% of viewport height).
   - If the active era changed, `morphSVG`-tweens the rocket's `<path>` `d` attribute to that era's target shape, plus a quick scale-pulse.
2. **Every other effect is scoped to its own era section** via its own `ScrollTrigger` (`trigger: '#era3'`, etc.), so effects only run/animate while that section is on screen — either `scrub`-tied to scroll position, or fired once via `toggleActions: "play none none none"`.
3. **Theming** is pure CSS custom properties on `:root` / `body.light-theme` — the JS never touches colors directly except in a few explicit hover tweens.
4. **No React/Vue/build tooling** — plain `DOMContentLoaded` + vanilla `document.querySelector` calls.

---

## 📦 How to clone & run

This is a static single HTML file, so there's nothing to install.

### Option A — just download and open
1. Save the file as `index.html`.
2. Double-click it (or drag into a browser tab). Done.

### Option B — clone via git (if you put it in a repo)
```bash
git clone <your-repo-url>
cd <your-repo-folder>
```
Then either open `index.html` directly, or serve it locally (recommended, since some browsers restrict certain features on `file://`):
```bash
# Python 3
python3 -m http.server 8000

# or Node
npx serve .
```
Visit `http://localhost:8000` in your browser.

### Requirements
- A modern browser (Chrome/Edge/Firefox/Safari, last ~2 years).
- An internet connection on first load, since GSAP + plugins are pulled from the jsDelivr CDN — no local install needed.

---

## 🛠 Customization guide

| Want to change... | Edit... |
|---|---|
| Colors / theme | The `:root` and `body.light-theme` CSS variable blocks at the top of `<style>`. |
| Era copy (title, description, tags) | The text inside each `<section class="era-section" id="eraN">` block. |
| The rocket's flight path | The `d` attribute of `<path id="motionPath">` (an SVG cubic-bezier path in a `0 0 1000 900` viewBox). |
| The rocket's per-era morph shapes | The `rocketMorphShapes` object in the script (maps `#era1`…`#era6` → an SVG path string). |
| Which era maps to which shape | Same `rocketMorphShapes` object — keys are section IDs. |
| Add a 7th era | Duplicate an `<section class="era-section" id="era7">` block, add its entry to the `eras` array (step 7 in the script) **and** to `rocketMorphShapes` (step 18) so the rocket knows to morph there too. |
| Scroll "stickiness" of effects (how fast they scrub) | The `scrub:` value on each relevant `ScrollTrigger` (`scrub: 1.5` = smoother/slower catch-up, `scrub: true` = 1:1 with scroll). |

---

## 🩺 Troubleshooting

- **Nothing animates at all** → Open dev tools console; if you see 404s on the GSAP CDN `<script>` tags, check your network/ad-blocker isn't blocking `cdn.jsdelivr.net`.
- **`ScrollSmoother is not defined` / `GSDevTools is not defined`** → These are Club GreenSock (paid) plugins. If your CDN access doesn't include them, remove their `<script>` tag and drop them from the `gsap.registerPlugin(...)` call — nothing else in the page depends on them being *used*, they're loaded but not actively invoked elsewhere.
- **Rocket doesn't morph on some eras** → Make sure each era `<section>` keeps its original `id="eraN"` — the rocket effect looks sections up by ID (`#era1`…`#era6`), not by class or position.
- **Effects feel laggy on mobile** → Lower the `scrub` values or reduce the number of parallax elements; heavy `filter: drop-shadow(...)` blur effects are the most expensive part on low-end GPUs.

---

## 📁 File structure

```
index.html   ← everything: markup, CSS, and JS in one file
```

That's it — it's intentionally a single-file build so it's trivial to drop into any static host (GitHub Pages, Netlify, Vercel, S3, etc.) with zero configuration.