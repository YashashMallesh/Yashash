const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const canAnimate = !prefersReducedMotion.matches && typeof gsap !== "undefined";

const q = (selector) => document.querySelector(selector);
const qa = (selector) => Array.from(document.querySelectorAll(selector));

function setupThemeToggle() {
  const THEME_KEY = "theme";
  const btn = q("#themeToggle");

  const apply = (mode) => {
    const isLight = mode === "light";
    document.body.classList.toggle("lightmode", isLight);
    if (btn) btn.setAttribute("aria-pressed", String(isLight));
  };

  const saved = localStorage.getItem(THEME_KEY);
  if (saved === "light" || saved === "dark") {
    apply(saved);
  } else {
    const prefersLight = window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches;
    apply(prefersLight ? "light" : "dark");
  }

  if (!btn) return;
  btn.addEventListener("click", () => {
    const isLightNow = document.body.classList.toggle("lightmode");
    localStorage.setItem(THEME_KEY, isLightNow ? "light" : "dark");
    btn.setAttribute("aria-pressed", String(isLightNow));
  });
}

function animateHero() {
  const tl = gsap.timeline({ defaults: { ease: "power3.out", duration: 0.9 } });

  tl.from(".nav", { y: -40, opacity: 0 })
    .from(".hero__content .eyebrow", { y: 24, opacity: 0 }, "-=0.5")
    .from(".hero__content h1", { y: 28, opacity: 0 }, "-=0.4")
    .from(".hero__content .lede", { y: 22, opacity: 0 }, "-=0.4")
    .from(".hero__cta .button", { y: 20, opacity: 0 }, "-=0.3")
    .from(".hero__cta .ghost", { y: 20, opacity: 0 }, "-=0.25")
    .from(".hero__meta div", { y: 20, opacity: 0, stagger: 0.08 }, "-=0.2")
    .from(".floating-card", { y: 40, opacity: 0, rotate: 2 }, "-=0.4")
    .from(".floating-pill", { y: -20, opacity: 0, scale: 0.9 }, "-=0.5");
}

function animateSections() {
  gsap.utils.toArray(".section").forEach((section) => {
    gsap.from(section.querySelector(".section__header"), {
      opacity: 0,
      y: 30,
      duration: 0.8,
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
      },
    });
  });

  gsap.utils.toArray(".card, .stat").forEach((el, i) => {
    gsap.from(el, {
      opacity: 0,
      y: 26,
      scale: 0.98,
      duration: 0.7,
      delay: Math.min(i * 0.05, 0.3),
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
      },
    });
  });
}

function parallaxOrbs() {
  gsap.to(".orb--one", {
    xPercent: -8,
    yPercent: 12,
    ease: "none",
    scrollTrigger: {
      trigger: ".hero__visual",
      scrub: true,
    },
  });

  gsap.to(".orb--two", {
    xPercent: 14,
    yPercent: -10,
    ease: "none",
    scrollTrigger: {
      trigger: ".hero__visual",
      scrub: true,
    },
  });
}

function init() {
  setupThemeToggle();

  if (!canAnimate) {
    document.documentElement.style.scrollBehavior = "smooth";
    return;
  }

  gsap.registerPlugin(ScrollTrigger);
  animateHero();
  animateSections();
  parallaxOrbs();
}

window.addEventListener("DOMContentLoaded", init);

