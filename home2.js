(function () {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    revealElements.forEach(el => el.classList.add('is-revealed'));
  }

  function initHeroParallax() {
    if (prefersReducedMotion) return;

    const heroStage = document.getElementById('hero2StickerStage');
    const stickerWrapper = document.querySelector('.hero2-sticker-wrapper');
    const bgSilhouette = document.querySelector('.hero2-bg-silhouette');

    if (!heroStage || !stickerWrapper || window.innerWidth < 1024) return;

    let ticking = false;
    let targetX = 0;
    let targetY = 0;

    heroStage.addEventListener('mousemove', (e) => {
      const rect = heroStage.getBoundingClientRect();
      const xNorm = (e.clientX - rect.left) / rect.width - 0.5;
      const yNorm = (e.clientY - rect.top) / rect.height - 0.5;

      targetX = xNorm * 18;
      targetY = yNorm * 14;

      if (!ticking) {
        window.requestAnimationFrame(() => {
          stickerWrapper.style.transform = `perspective(800px) rotateY(${targetX * 0.4}deg) rotateX(${-targetY * 0.4}deg) translate3d(${targetX * 0.4}px, ${targetY * 0.3}px, 15px)`;
          if (bgSilhouette) {
            bgSilhouette.style.transform = `translate3d(${-targetX * 0.6}px, ${-targetY * 0.4}px, 0)`;
          }
          ticking = false;
        });
        ticking = true;
      }
    });

    heroStage.addEventListener('mouseleave', () => {
      stickerWrapper.style.transform = '';
      if (bgSilhouette) {
        bgSilhouette.style.transform = '';
      }
    });
  }

  function initJourneyMoments() {
    const moments = document.querySelectorAll('.journey2-moment-card, .journey2-moment');
    if (!moments.length) return;

    moments.forEach(moment => {
      moment.addEventListener('mouseenter', () => {
        moments.forEach(m => m.classList.remove('is-active'));
        moment.classList.add('is-active');
      });

      moment.addEventListener('click', () => {
        moments.forEach(m => m.classList.remove('is-active'));
        moment.classList.add('is-active');
      });
    });
  }

  function initAnchorScrolling() {
    const internalLinks = document.querySelectorAll('a[href^="#"]');

    internalLinks.forEach(link => {
      link.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#' || href === '#login' || href === '#home') return;

        const targetEl = document.querySelector(href);
        if (targetEl) {
          e.preventDefault();
          const headerHeight = document.getElementById('strataHeader')?.offsetHeight || 80;
          const targetPosition = targetEl.getBoundingClientRect().top + window.pageYOffset - headerHeight;

          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  function initProgramFilters() {
    const filterPills = document.querySelectorAll('.prog2-filter-pill');
    const cards = document.querySelectorAll('.prog2-card');
    if (!filterPills.length || !cards.length) return;

    filterPills.forEach(pill => {
      pill.addEventListener('click', () => {
        const filter = pill.getAttribute('data-filter');

        filterPills.forEach(p => {
          p.classList.remove('is-active');
          p.setAttribute('aria-selected', 'false');
        });
        pill.classList.add('is-active');
        pill.setAttribute('aria-selected', 'true');

        cards.forEach(card => {
          const cardTier = card.getAttribute('data-tier');
          if (filter === 'all' || cardTier === filter) {
            card.style.display = '';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    initScrollReveal();
    initHeroParallax();
    initJourneyMoments();
    initAnchorScrolling();
    initProgramFilters();
  });

})();
