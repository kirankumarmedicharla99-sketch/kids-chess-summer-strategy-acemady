(function () {
  'use strict';

  function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    if (!revealElements.length) return;

    if (!('IntersectionObserver' in window)) {
      revealElements.forEach(el => el.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '0px 0px -40px 0px',
      threshold: 0.12
    });

    revealElements.forEach(el => observer.observe(el));
  }

  function initFilterBar() {
    const filterButtons = document.querySelectorAll('.prog-filter-btn');
    const programCards = document.querySelectorAll('.prog-card');
    const countBadge = document.getElementById('filterCountBadge');

    if (!filterButtons.length || !programCards.length) return;

    const filterLabels = {
      'all': 'Showing All 6 Programs',
      'young-pawns': 'Showing Young Pawns • Ages 5–7',
      'knight-tacticians': 'Showing Knight Tacticians • Ages 8–11',
      'grandmaster-scholars': 'Showing Scholars • Ages 12–16',
      'strategy-masterclass': 'Showing Strategy Immersion • Executive',
      'fide-tournament-prep': 'Showing FIDE Tournament Prep • Championship',
      'weekend-blitz': 'Showing Summer Blitz & Tactics • Rapid Arena'
    };

    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.getAttribute('data-filter');

        filterButtons.forEach(b => {
          b.classList.remove('active');
          b.setAttribute('aria-pressed', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-pressed', 'true');

        if (countBadge && filterLabels[filter]) {
          countBadge.textContent = filterLabels[filter];
        }

        programCards.forEach(card => {
          const category = card.getAttribute('data-category');
          const isMatch = (filter === 'all' || category === filter || category.includes(filter));

          if (isMatch) {
            card.style.display = '';
            requestAnimationFrame(() => {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            });
          } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(12px)';
            setTimeout(() => {
              if (btn.getAttribute('data-filter') !== 'all' && !card.getAttribute('data-category').includes(btn.getAttribute('data-filter'))) {
                card.style.display = 'none';
              }
            }, 240);
          }
        });
      });
    });
  }

  function initSmoothScroll() {
    const scrollLinks = document.querySelectorAll('a[href^="#"]');
    scrollLinks.forEach(link => {
      link.addEventListener('click', e => {
        const targetId = link.getAttribute('href');
        if (targetId && targetId !== '#') {
          const targetElement = document.querySelector(targetId);
          if (targetElement) {
            e.preventDefault();
            targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      });
    });
  }

  function init() {
    initScrollReveal();
    initFilterBar();
    initSmoothScroll();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
