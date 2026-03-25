/**
 * script.js — Notary Landing Page
 * Extracted from index.html inline <script>.
 * All DOM-dependent code runs inside DOMContentLoaded.
 */

"use strict";

document.addEventListener("DOMContentLoaded", () => {
  /* ============================================================
     1. STICKY HEADER SHADOW
  ============================================================ */
  const hdr = document.querySelector(".site-header");

  if (hdr) {
    window.addEventListener(
      "scroll",
      () => {
        hdr.style.boxShadow =
          window.scrollY > 8 ? "0 1px 20px rgba(26,26,24,.08)" : "none";
      },
      { passive: true },
    );
  }

  /* ============================================================
     2. LANGUAGE TOGGLE BUTTONS
     Replaces: onclick="location.href = 'index.html'"
               onclick="location.href = 'index-en.html'"
  ============================================================ */
  const langMap = {
    uk: "index.html",
    en: "index-en.html",
  };

  document.querySelectorAll(".lang-btn[data-lang]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = langMap[btn.dataset.lang];
      if (target) location.href = target;
    });
  });

  /* ============================================================
     3. MOBILE HAMBURGER MENU
  ============================================================ */
  const ham = document.getElementById("hamburger");
  const panel = document.getElementById("mobPanel");
  const overlay = document.getElementById("mobOverlay");
  const close = document.getElementById("mobClose");

  function openMenu() {
    ham.classList.add("open");
    ham.setAttribute("aria-expanded", "true");
    panel.classList.add("open");
    overlay.style.display = "block";
    requestAnimationFrame(() => overlay.classList.add("show"));
    document.body.style.overflow = "hidden";
  }

  function closeMenu() {
    ham.classList.remove("open");
    ham.setAttribute("aria-expanded", "false");
    panel.classList.remove("open");
    overlay.classList.remove("show");
    document.body.style.overflow = "";
    setTimeout(() => {
      overlay.style.display = "none";
    }, 350);
  }

  ham && ham.addEventListener("click", openMenu);
  close && close.addEventListener("click", closeMenu);
  overlay && overlay.addEventListener("click", closeMenu);

  document
    .querySelectorAll(".mob-link")
    .forEach((link) => link.addEventListener("click", closeMenu));

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });

  /* ============================================================
     4. SCROLL REVEAL
  ============================================================ */
  const srEls = document.querySelectorAll("[data-sr]");

  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const delay = +(entry.target.dataset.delay || 0);
            setTimeout(() => entry.target.classList.add("in"), delay);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
    );
    srEls.forEach((el) => io.observe(el));
  } else {
    // Fallback for browsers without IntersectionObserver
    srEls.forEach((el) => el.classList.add("in"));
  }

  /* ============================================================
     5. CONTACT FORM — removed (form deleted from HTML)
     Keeping showFormMessage stub in case it is referenced elsewhere.
  ============================================================ */

}); // end DOMContentLoaded
