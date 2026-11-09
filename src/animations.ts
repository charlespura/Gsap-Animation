import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin, ScrollToPlugin);

export function initAnimations(root: HTMLElement) {
  let context: gsap.Context | undefined;
  const motionEnabled = () =>
    document.documentElement.dataset.motion === "on" ||
    (document.documentElement.dataset.motion === undefined &&
      !matchMedia("(prefers-reduced-motion: reduce)").matches);
  const build = () => {
    context?.revert();
    if (!motionEnabled()) return;
    context = gsap.context(() => {
      gsap.from(".hero-content > *", {
        y: 26,
        opacity: 0,
        duration: 0.85,
        stagger: 0.12,
        ease: "power3.out",
      });
      gsap.from(".hero-ship", { opacity: 0, duration: 1.3, delay: 0.25 });
      root.querySelectorAll<HTMLElement>(".chapter").forEach((chapter) => {
        gsap.from(chapter.querySelectorAll(".chapter-copy > *"), {
          scrollTrigger: { trigger: chapter, start: "top 76%", once: true },
          y: 22,
          opacity: 0,
          stagger: 0.065,
          duration: 0.7,
          ease: "power2.out",
        });
        gsap.from(chapter.querySelector(".chapter-art"), {
          scrollTrigger: { trigger: chapter, start: "top 76%", once: true },
          y: 35,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
        });
      });
      gsap.from(".network-lines path", {
        drawSVG: "0%",
        duration: 1.7,
        scrollTrigger: {
          trigger: ".network-art",
          start: "top 75%",
          once: true,
        },
      });
      gsap.from(".network-node", {
        scale: 0,
        opacity: 0,
        transformOrigin: "center",
        stagger: 0.12,
        duration: 0.7,
        ease: "back.out(1.5)",
        scrollTrigger: {
          trigger: ".network-art",
          start: "top 75%",
          once: true,
        },
      });
      gsap.from(".console-response", {
        opacity: 0,
        y: 15,
        delay: 0.4,
        duration: 0.8,
        scrollTrigger: {
          trigger: ".console-art",
          start: "top 70%",
          once: true,
        },
      });
      gsap.from(".landing h2", {
        y: 30,
        opacity: 0,
        duration: 1,
        scrollTrigger: { trigger: ".landing", start: "top 72%", once: true },
      });
    }, root);
    ScrollTrigger.refresh();
  };
  const navigate = (event: MouseEvent) => {
    const anchor = (event.target as Element).closest<HTMLAnchorElement>(
      'a[href^="#"]',
    );
    if (
      !anchor ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    )
      return;
    const target = document.getElementById(anchor.hash.slice(1));
    if (!target) return;
    event.preventDefault();
    const focusTarget = () => {
      if (!target.hasAttribute("tabindex"))
        target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
      history.replaceState(null, "", anchor.hash);
    };
    gsap.killTweensOf(window);
    if (motionEnabled()) {
      gsap.to(window, {
        duration: 0.9,
        scrollTo: { y: target, offsetY: 88, autoKill: true },
        ease: "power2.inOut",
        onComplete: focusTarget,
      });
    } else {
      window.scrollTo({
        top: target.getBoundingClientRect().top + scrollY - 88,
        behavior: "instant",
      });
      focusTarget();
    }
  };
  build();
  window.addEventListener("orbital-motion", build);
  root.addEventListener("click", navigate);
  return () => {
    window.removeEventListener("orbital-motion", build);
    root.removeEventListener("click", navigate);
    gsap.killTweensOf(window);
    context?.revert();
  };
}
