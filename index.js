(function () {
  'use strict';

  function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    revealElements.forEach((el) => {
      el.classList.add('is-revealed');
    });
  }

  function initSmoothScroll() {
    const internalLinks = document.querySelectorAll('a[href^="#"]:not([href="#"]):not([href="#login"])');

    internalLinks.forEach((link) => {
      link.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (!targetId || targetId === '#') return;

        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          e.preventDefault();

          const header = document.getElementById('strataHeader');
          const headerHeight = header ? header.getBoundingClientRect().height : 80;
          const targetPosition = targetEl.getBoundingClientRect().top + window.pageYOffset - headerHeight - 16;

          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  function initMarquee() {
    const marqueeSection = document.querySelector('.marquee-strip-section');
    if (!marqueeSection) return;

    const track = marqueeSection.querySelector('.marquee-track');
    if (!track) return;

    marqueeSection.addEventListener('focusin', () => {
      track.style.animationPlayState = 'paused';
    });

    marqueeSection.addEventListener('focusout', () => {
      track.style.animationPlayState = 'running';
    });
  }

  function initTimeline() {
    const steps = document.querySelectorAll('.timeline-step');
    steps.forEach((step) => {
      step.setAttribute('tabindex', '0');
      step.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          step.classList.toggle('active');
        }
      });
    });
  }

  function initWhyChessFlipCards() {
    const flipCards = document.querySelectorAll('.why-flip-card');
    flipCards.forEach((card) => {
      card.addEventListener('click', (e) => {
        if (e.target.closest('a') || e.target.closest('button')) return;
        const isFlipped = card.classList.contains('is-flipped');
        flipCards.forEach((other) => {
          if (other !== card) other.classList.remove('is-flipped');
        });
        card.classList.toggle('is-flipped', !isFlipped);
      });

      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          card.classList.toggle('is-flipped');
        }
      });
    });
  }

  function init() {
    initScrollReveal();
    initSmoothScroll();
    initMarquee();
    initTimeline();
    initWhyChessFlipCards();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
