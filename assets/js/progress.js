/* Field scroll-progress bar.
   Advances the fill + ball marker down the field as the reader scrolls.
   No dependencies. Degrades gracefully: with JS off the bar simply
   stays at the start. rAF-throttled; reduced motion needs no special
   case since updates are instantaneous position changes. */
(function () {
  "use strict";

  var bar = document.querySelector("[data-progress]");
  if (!bar) return;

  var fill = bar.querySelector(".field-progress__fill");
  var ball = bar.querySelector(".field-progress__ball");
  if (!fill || !ball) return;

  var ticking = false;

  function update() {
    ticking = false;
    var doc = document.documentElement;
    var scrollable = doc.scrollHeight - doc.clientHeight;
    var pct = scrollable > 0 ? (doc.scrollTop || window.pageYOffset) / scrollable : 0;
    pct = Math.max(0, Math.min(1, pct)) * 100;
    fill.style.width = pct + "%";
    ball.style.left = pct + "%";
  }

  function onScroll() {
    if (!ticking) {
      ticking = true;
      window.requestAnimationFrame(update);
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });
  update();
})();
