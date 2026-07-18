// ===== Mobile nav toggle =====
document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var isOpen = toggle.classList.toggle('is-open');
      links.classList.toggle('is-open');
      document.body.classList.toggle('nav-locked', isOpen);
    });
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        toggle.classList.remove('is-open');
        links.classList.remove('is-open');
        document.body.classList.remove('nav-locked');
      });
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && links.classList.contains('is-open')) {
        toggle.classList.remove('is-open');
        links.classList.remove('is-open');
        document.body.classList.remove('nav-locked');
      }
    });
  }

  // ===== Hero carousel (auto-scroll through 3 slides) =====
  var slides = document.querySelectorAll('.carousel-slide');
  var dots = document.querySelectorAll('.carousel-dots button');
  if (slides.length) {
    var current = 0;
    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function showSlide(i) {
      slides.forEach(function (s, idx) { s.classList.toggle('is-active', idx === i); });
      dots.forEach(function (d, idx) { d.classList.toggle('is-active', idx === i); });
      current = i;
    }
    showSlide(0);

    dots.forEach(function (d, idx) {
      d.addEventListener('click', function () { showSlide(idx); resetTimer(); });
    });

    var timer;
    function resetTimer() {
      clearInterval(timer);
      if (!reduceMotion) {
        timer = setInterval(function () {
          showSlide((current + 1) % slides.length);
        }, 3800);
      }
    }
    resetTimer();
  }

  // ===== Scroll reveal =====
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { obs.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  // ===== Footer year =====
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});
