/* =========================================================
   SEIF ZOGHLY — PORTFOLIO
   Main interactions
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* ---------------------------------------------------------
     1. Smooth navigation
     --------------------------------------------------------- */
  const internalLinks = document.querySelectorAll('a[href^="#"]');

  internalLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");

      // Ignore temporary "#" links used for future case studies.
      if (!targetId || targetId === "#") {
        event.preventDefault();
        return;
      }

      const target = document.querySelector(targetId);

      if (target) {
        event.preventDefault();

        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    });
  });


  /* ---------------------------------------------------------
     2. Header behavior on scroll
     --------------------------------------------------------- */
  const header = document.querySelector(".site-header");
  let lastScrollY = window.scrollY;

  const updateHeader = () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > 40) {
      header?.classList.add("is-scrolled");
    } else {
      header?.classList.remove("is-scrolled");
    }

    if (currentScrollY > lastScrollY && currentScrollY > 180) {
      header?.classList.add("header-hidden");
    } else {
      header?.classList.remove("header-hidden");
    }

    lastScrollY = currentScrollY;
  };

  window.addEventListener("scroll", updateHeader, {
    passive: true
  });

  updateHeader();


  /* ---------------------------------------------------------
     3. Reveal sections as they enter the viewport
     --------------------------------------------------------- */
  const revealElements = document.querySelectorAll(
    ".section-heading, .about-grid, .experience-item, .project-card, " +
    ".results-intro, .result-placeholder, .contact-content"
  );

  revealElements.forEach((element) => {
    element.classList.add("reveal");
  });

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -45px 0px"
    }
  );

  revealElements.forEach((element) => {
    revealObserver.observe(element);
  });


  /* ---------------------------------------------------------
     4. Stagger project cards
     --------------------------------------------------------- */
  document.querySelectorAll(".project-card").forEach((card, index) => {
    card.style.setProperty(
      "--reveal-delay",
      `${(index % 2) * 90}ms`
    );
  });


  /* ---------------------------------------------------------
     5. Active navigation section
     --------------------------------------------------------- */
  const sections = document.querySelectorAll("main section[id]");

  const navLinks = document.querySelectorAll(
    '.main-nav a[href^="#"]'
  );

  const navMap = new Map();

  navLinks.forEach((link) => {
    const id = link
      .getAttribute("href")
      ?.replace("#", "");

    if (id) {
      navMap.set(id, link);
    }
  });

  const activeSectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        navLinks.forEach((link) => {
          link.classList.remove("active");
        });

        const activeLink = navMap.get(entry.target.id);

        activeLink?.classList.add("active");
      });
    },
    {
      rootMargin: "-35% 0px -55% 0px",
      threshold: 0
    }
  );

  sections.forEach((section) => {
    activeSectionObserver.observe(section);
  });


  /* ---------------------------------------------------------
     6. Subtle hero movement
     Desktop only — intentionally restrained.
     --------------------------------------------------------- */
  const heroVisual = document.querySelector(".hero-visual");

  if (
    heroVisual &&
    window.matchMedia("(min-width: 981px)").matches &&
    !window
      .matchMedia("(prefers-reduced-motion: reduce)")
      .matches
  ) {
    window.addEventListener(
      "scroll",
      () => {
        const offset = Math.min(
          window.scrollY * 0.055,
          24
        );

        heroVisual.style.transform =
          `translateY(${offset}px)`;
      },
      {
        passive: true
      }
    );
  }


  /* ---------------------------------------------------------
     7. Current year in footer
     --------------------------------------------------------- */
  const footerCopyright =
    document.querySelector(".site-footer p");

  if (footerCopyright) {
    footerCopyright.textContent =
      `© ${new Date().getFullYear()} Seif Zoghly`;
  }

});
