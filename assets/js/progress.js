/* Post-page enhancements. No dependencies. Each feature is independent and
   guarded, so a missing element never breaks the others. One rAF-throttled
   scroll handler drives the field-progress bar and the back-to-top toggle.
   Honors prefers-reduced-motion (instant scroll, no animated jumps). */
(function () {
  "use strict";

  var doc = document.documentElement;
  var reduceMotion = window.matchMedia
    ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
    : false;

  /* --- Field scroll-progress bar --- */
  var bar = document.querySelector("[data-progress]");
  var fill = bar && bar.querySelector(".field-progress__fill");
  var ball = bar && bar.querySelector(".field-progress__ball");

  function updateProgress(scrolled, scrollable) {
    if (!fill || !ball) return;
    var pct = scrollable > 0 ? scrolled / scrollable : 0;
    pct = Math.max(0, Math.min(1, pct)) * 100;
    fill.style.width = pct + "%";
    ball.style.left = pct + "%";
  }

  /* --- Back-to-top control --- */
  var toTop = document.querySelector("[data-back-to-top]");
  if (toTop) {
    toTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
    });
  }

  function updateBackToTop(scrolled) {
    if (!toTop) return;
    toTop.classList.toggle("is-visible", scrolled > 600);
  }

  /* --- Shared scroll handler --- */
  var ticking = false;
  function frame() {
    ticking = false;
    var scrolled = doc.scrollTop || window.pageYOffset;
    updateProgress(scrolled, doc.scrollHeight - doc.clientHeight);
    updateBackToTop(scrolled);
  }
  function onScroll() {
    if (!ticking) {
      ticking = true;
      window.requestAnimationFrame(frame);
    }
  }
  if (bar || toTop) {
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    frame();
  }

  /* --- Share links: fill hrefs from the live page URL (host-agnostic) --- */
  var shareLinks = document.querySelectorAll("[data-share]");
  if (shareLinks.length) {
    var url = encodeURIComponent(window.location.href);
    var title = encodeURIComponent(document.title);
    shareLinks.forEach(function (el) {
      var kind = el.getAttribute("data-share");
      if (kind === "x") {
        el.href = "https://twitter.com/intent/tweet?url=" + url + "&text=" + title;
      } else if (kind === "linkedin") {
        el.href = "https://www.linkedin.com/sharing/share-offsite/?url=" + url;
      }
    });
  }
})();
