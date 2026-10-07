(function () {
  'use strict';

  const COACH_DATA = {
    '1': {
      name: 'David Vance',
      title: 'FIDE Candidate Master & Youth Specialist',
      spec: 'CHESS FUNDAMENTALS',
      exp: '10+ Years Dedicated Youth Coaching',
      img: 'assets/instructor-01.jpg',
      bio: 'Master David has introduced over 800 young scholars to the game of kings. He combines storytelling, tactile piece interaction, and visual geometry to make opening principles unforgettable. His classes emphasize sportsmanship, board respect, and the joy of tactical discovery.',
      skills: ['Pawn Structure Basics', 'King Safety & Castling', 'Opening Traps Prevention', 'Spatial Coordinate Vision', 'Growth Mindset Debriefs'],
      badges: ['FIDE Candidate Master', 'SafeSport Certified', 'Top Junior Trainer 2024']
    },
    '2': {
      name: 'Elena Rostova',
      title: 'Woman International Master (WIM)',
      spec: 'STRATEGIC THINKING',
      exp: '8+ Years International Coaching',
      img: 'assets/instructor-02.jpg',
      bio: 'WIM Elena represented her national federation in two Chess Olympiads before dedicating her career to junior strategic education. She specializes in middle-game planning, candidate move formulation, and teaching children how to remain calm under time pressure.',
      skills: ['Candidate Moves Calculation', 'Weak Square Exploitation', 'Outpost Fortification', 'Rook File Domination', 'Tournament Psychology'],
      badges: ['Woman International Master', 'Olympiad Veteran', 'FIDE Instructor License']
    },
    '3': {
      name: 'Marcus Lindqvist',
      title: 'FIDE Grandmaster & Senior FIDE Trainer',
      spec: 'ADVANCED CHESS & TOURNAMENTS',
      exp: '15+ Years Elite Academy Mentorship',
      img: 'assets/instructor-03.jpg',
      bio: 'GM Marcus has coached national junior champions and FIDE master candidates across Europe and North America. His analytical approach demystifies complex grandmaster endgames and teaches young minds how to evaluate positional imbalances with ruthless precision.',
      skills: ['FIDE Tournament Preparation', 'Grandmaster Endgame Technique', 'Deep Calculation Trees', 'Positional Sacrifices', 'Clock Management Tactics'],
      badges: ['FIDE Grandmaster (GM)', 'Senior FIDE Trainer', 'USCF 2550+ Peak Rating']
    },
    '4': {
      name: 'Sophia Bennett',
      title: 'National Youth Chess Trainer & Child Educator',
      spec: 'YOUNG LEARNERS & COGNITIVE GROWTH',
      exp: '6+ Years Early Childhood Pedagogy',
      img: 'assets/instructor-04.jpg',
      bio: 'Coach Sophia holds degrees in Early Childhood Education and sports psychology. She designs playful, puzzle-based curricula for 5-to-8-year-olds that turn complex chess concepts into delightful challenges, nurturing patience, resilience, and early spatial confidence.',
      skills: ['Gamified Tactical Puzzles', 'Visual Story Method', 'Attention Span Building', 'Positive Reinforcement', 'Parent Progress Feedback'],
      badges: ['Certified Youth Coach', 'Early Ed Specialist', 'Montessori Chess Advocate']
    }
  };

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

  function initTimeline() {
    const track = document.querySelector('.journey-timeline-track');
    const railLine = document.querySelector('.journey-rail-line');
    const journeyCols = document.querySelectorAll('.journey-col');
    if (!journeyCols.length) return;

    journeyCols.forEach(col => {
      col.addEventListener('click', () => {
        journeyCols.forEach(c => c.classList.remove('active'));
        col.classList.add('active');
      });

      col.addEventListener('mouseenter', () => {
        journeyCols.forEach(c => c.classList.remove('active'));
        col.classList.add('active');
      });
    });

    function updateJourneyRail() {
      if (!track || !railLine) return;
      if (window.innerWidth > 900) {
        railLine.style.left = '';
        railLine.style.right = '';
        railLine.style.width = '';
        railLine.style.height = '';
        railLine.style.top = '';
        railLine.style.bottom = '';
        return;
      }

      const firstDisc = track.querySelector('.journey-col .journey-piece-disc');
      if (!firstDisc) return;

      const trackRect = track.getBoundingClientRect();
      const discRect = firstDisc.getBoundingClientRect();
      const center = (discRect.left + discRect.width / 2) - trackRect.left;

      railLine.style.left = center + 'px';
      railLine.style.right = 'auto';
      railLine.style.width = '2px';
      railLine.style.height = 'auto';
      railLine.style.top = '26px';
      railLine.style.bottom = '26px';
    }

    updateJourneyRail();
    window.addEventListener('resize', updateJourneyRail);
    window.addEventListener('strataDirChanged', () => {
      requestAnimationFrame(updateJourneyRail);
    });

    if (window.MutationObserver) {
      const dirObserver = new MutationObserver((mutations) => {
        for (const m of mutations) {
          if (m.attributeName === 'dir') {
            requestAnimationFrame(updateJourneyRail);
            break;
          }
        }
      });
      dirObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['dir'] });
    }
  }

  function initFilterBar() {
    const filterButtons = document.querySelectorAll('.inst-filter-btn');
    const instructorCards = document.querySelectorAll('.inst-card');

    if (!filterButtons.length || !instructorCards.length) return;

    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.getAttribute('data-filter');

        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        instructorCards.forEach(card => {
          const category = card.getAttribute('data-category');
          const isMatch = (filter === 'all' || category === filter);

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
              if (btn.getAttribute('data-filter') !== 'all' && card.getAttribute('data-category') !== btn.getAttribute('data-filter')) {
                card.style.display = 'none';
              }
            }, 250);
          }
        });
      });
    });
  }

  function initModal() {
    const backdrop = document.getElementById('instModalBackdrop');
    const closeBtn = document.getElementById('modalCloseBtn');
    const profileBtns = document.querySelectorAll('.inst-profile-btn');

    if (!backdrop || !closeBtn) return;

    const modalImg = document.getElementById('modalCoachImg');
    const modalSpec = document.getElementById('modalCoachSpec');
    const modalName = document.getElementById('modalCoachName');
    const modalTitle = document.getElementById('modalCoachTitle');
    const modalExp = document.getElementById('modalCoachExp');
    const modalBio = document.getElementById('modalCoachBio');
    const modalSkillsList = document.getElementById('modalSkillsList');
    const modalBadgeStrip = document.getElementById('modalBadgeStrip');

    let lastFocusedElement = null;

    function openCoachModal(coachId) {
      const coach = COACH_DATA[coachId];
      if (!coach) return;

      lastFocusedElement = document.activeElement;

      if (modalImg) {
        modalImg.src = coach.img;
        modalImg.alt = coach.name;
      }
      if (modalSpec) modalSpec.textContent = coach.spec;
      if (modalName) modalName.textContent = coach.name;
      if (modalTitle) modalTitle.textContent = coach.title;
      if (modalExp) modalExp.textContent = coach.exp;
      if (modalBio) modalBio.textContent = coach.bio;

      if (modalSkillsList) {
        modalSkillsList.innerHTML = coach.skills
          .map(skill => `<span class="inst-skill-pill">${skill}</span>`)
          .join('');
      }

      if (modalBadgeStrip) {
        modalBadgeStrip.innerHTML = coach.badges
          .map(badge => `<span class="inst-card-spec-badge badge-brass" style="margin: 4px;">${badge}</span>`)
          .join('');
      }

      backdrop.classList.add('open');
      backdrop.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';

      closeBtn.focus();
    }

    function closeModal() {
      backdrop.classList.remove('open');
      backdrop.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';

      if (lastFocusedElement) {
        lastFocusedElement.focus();
      }
    }

    profileBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const coachId = btn.getAttribute('data-coach');
        openCoachModal(coachId);
      });
    });

    closeBtn.addEventListener('click', closeModal);

    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) {
        closeModal();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && backdrop.classList.contains('open')) {
        closeModal();
      }
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    initScrollReveal();
    initTimeline();
    initFilterBar();
    initModal();
  });

})();
