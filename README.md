# Orbital

**An internet flight journal.**

Travel through six eras of the web, from the first hyperlinks to possible futures. Orbital pairs a custom 3D rocket with a readable timeline, original illustrations, and scroll-driven animation.

Built with **React · Vite · TypeScript · Three.js · GSAP**.

[Explore the code](https://github.com/charlespura/Gsap-Animation) · [Expected GitHub Pages URL](https://charlespura.github.io/Gsap-Animation/)

> The Pages link becomes available after GitHub Pages is enabled and the deployment workflow succeeds.

## What’s inside

- **Custom 3D rocket:** cream body, orange fins, illuminated window, animated engine, and a star field. Geometry and materials are created in Three.js; no external model downloads.
- **A navigable flight plan:** jump directly to any decade, follow the desktop mission rail, or read from beginning to end.
- **Six distinct illustrations:** a browser window, a social network, a mobile map, a conversational interface, a spatial concept, and a deep-space signal.
- **Purposeful animation:** GSAP entrance sequences, chapter reveals, SVG drawing, and smooth anchor navigation.
- **Motion controls:** a saved on/off preference and support for system reduced-motion settings.
- **Responsive navigation:** a mobile menu, keyboard focus states, Escape support, skip link, and reading-progress bar.
- **WebGL fallback:** a static SVG rocket appears when the browser cannot create a WebGL renderer.
- **Self-hosted assets:** fonts, artwork, favicon, and application scripts ship with the site.

## The flight plan

| Era | Chapter | Perspective |
| --- | --- | --- |
| 1990s | First contact | Pages, hyperlinks, and dial-up |
| 2000s | Open channels | Publishing, communities, and online video |
| 2010s | Always connected | Mobile access, cloud services, and streaming |
| 2020s | New intelligence | Conversational tools and human judgment |
| 2030s | Beyond the screen | A speculative look at spatial interfaces |
| 2050s | The next frontier | A speculative look at long-distance connection |

The final two chapters are clearly marked as possible futures. This is a creative field guide, not an exhaustive history or a forecast.

## Quick start

### Requirements

- Node.js **22.12 or newer**
- npm
- A modern browser; WebGL is used for the animated rocket

```bash
git clone https://github.com/charlespura/Gsap-Animation.git
cd Gsap-Animation
npm ci
npm run dev
```

Open the local URL printed by Vite. On Windows PowerShell, use `npm.cmd` instead of `npm` if your execution policy blocks `npm.ps1`.

### Commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start Vite with hot reload |
| `npm run typecheck` | Check TypeScript without emitting files |
| `npm run build` | Type-check and create the production site in `dist/` |
| `npm run preview` | Serve the existing production build locally |

To check the production version:

```bash
npm run build
npm run preview
```

Opening `index.html` directly does not compile React or TypeScript. For XAMPP/Apache or another static host, build first and serve the contents of `dist/`.

## Controls and accessibility

- Choose **Begin the journey** to move to the first chapter.
- Use the **Flight plan**, chapter links, or desktop mission rail to jump between eras.
- On smaller screens, open **Menu** to access navigation. Press **Escape** to close it and return focus to the menu button.
- Use **Motion on/off** at the bottom of the hero to pause or resume animation. The setting is saved locally as `orbital-motion`.
- System reduced-motion preferences turn motion off by default. Turning motion off removes GSAP motion, disables CSS animation, and renders the rocket without ongoing animation.
- Keyboard users can use the **Skip to the journey** link and visible focus indicators.

The rocket’s pointer response is decorative; every chapter and navigation control works without it.

## Deploy to GitHub Pages

The workflow at [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) builds and deploys this static site.

1. Push the project to GitHub, including `package-lock.json` and the workflow file.
2. Open **Settings → Pages → Build and deployment** in the repository.
3. Select **GitHub Actions** as the source.
4. Push to `main` or `master`, or run **Actions → Deploy to GitHub Pages → Run workflow** manually.
5. Wait for both the `build` and `deploy` jobs to succeed. Find the published URL in the deployment environment or **Settings → Pages**.

For this repository, the expected address is:

**https://charlespura.github.io/Gsap-Animation/**

The workflow uses Node.js 22, installs dependencies with `npm ci`, runs the production build, and uploads only `dist/`. It uses the workflow’s GitHub token; no personal access token or `gh-pages` branch is needed.

Vite’s `base: "./"` keeps generated asset URLs relative, so the same build supports a repository subpath, a domain root, or a custom domain. Navigation uses same-page anchors and needs no SPA rewrite rules.

- **Different deployment branch:** update `on.push.branches` in the workflow.
- **Custom domain:** add `public/CNAME` containing your domain and configure the domain in GitHub Pages settings.
- **Another static host:** upload the contents of `dist/` after running `npm run build`.

References: [Vite static deployment](https://vite.dev/guide/static-deploy) · [GitHub Pages publishing settings](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)

## Project structure

```text
.github/
  workflows/deploy.yml       GitHub Pages build and deployment
public/
  favicon.svg                Orbital mark
src/
  main.tsx                   React entry point
  App.tsx                    Page and animation lifecycle
  Journey.tsx                Navigation, controls, layout, and illustrations
  chapters.ts                Chapter copy, years, tags, and status labels
  animations.ts              GSAP effects and anchor scrolling
  ThreeBackdrop.tsx          Rocket geometry, lighting, renderer, and cleanup
  styles.css                 Palette, typography, layout, and breakpoints
index.html                   Page metadata and Vite entry
package.json                 Dependencies and npm commands
package-lock.json            Locked dependency versions
tsconfig.json                TypeScript configuration
vite.config.ts               React plugin, asset paths, and build chunks
```

## Customize

| Change | File |
| --- | --- |
| Chapter titles, descriptions, years, and tags | [`src/chapters.ts`](src/chapters.ts) |
| Navigation, labels, page layout, and chapter illustrations | [`src/Journey.tsx`](src/Journey.tsx) |
| Colors, font families, spacing, and responsive layout | [`src/styles.css`](src/styles.css) |
| Rocket shape, materials, engine, stars, and lighting | [`src/ThreeBackdrop.tsx`](src/ThreeBackdrop.tsx) |
| Scroll timing, reveals, and SVG drawing | [`src/animations.ts`](src/animations.ts) |
| Page title, description, and browser theme color | [`index.html`](index.html) |

DM Sans, Space Grotesk, and IBM Plex Mono are bundled through Fontsource. GSAP plugins are imported from npm. There are no CDN script tags, remote textures, or model files to configure.

React Strict Mode is enabled. GSAP contexts, event listeners, and Three.js resources are cleaned up when their owning components unmount.

## Troubleshooting

| Problem | Check |
| --- | --- |
| Pages returns 404 | Select GitHub Actions as the Pages source, check the latest workflow, and use the full repository URL. |
| Deployment does not run | Push to `main` or `master`, update the configured branch, or trigger the workflow manually. |
| Build fails | Use the required Node version, commit `package-lock.json`, and run `npm ci` followed by `npm run build` locally. |
| Rocket does not move | Check the Motion control and system reduced-motion setting. A static rocket is expected when WebGL is unavailable. |
| Source changes do not appear | Use the Vite dev server, or rebuild `dist/` before serving production files. |
| PowerShell blocks npm | Run the same command using `npm.cmd`. |

Vite may report that the Three.js chunk exceeds its default size warning threshold. This is a build warning; the renderer is split into a separate chunk, and a successful build still produces deployable files.
