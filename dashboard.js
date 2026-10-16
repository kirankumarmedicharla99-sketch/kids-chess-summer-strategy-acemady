(function () {
  'use strict';

  const STORAGE_CHILDREN_KEY = 'strata_dash_children';
  const STORAGE_INVOICES_KEY = 'strata_dash_invoices';
  const THEME_STORAGE_KEY = 'strata_chess_theme';
  const DIR_STORAGE_KEY = 'strata_chess_direction';

  const LUCIDE_ICON_PATHS = {
    'award': '<path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526"/><circle cx="12" cy="8" r="6"/>',
    'star': '<path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/>',
    'sparkles': '<path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/><path d="M20 3v4"/><path d="M22 5h-4"/><path d="M4 17v2"/><path d="M5 18H3"/>',
    'shield': '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/>',
    'zap': '<path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/>',
    'map-pin': '<path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/>',
    'user': '<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
    'camera': '<path d="M13.997 4a2 2 0 0 1 1.76 1.05l.486.9A2 2 0 0 0 18.003 7H20a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1.997a2 2 0 0 0 1.759-1.048l.489-.904A2 2 0 0 1 10.004 4z"/><circle cx="12" cy="13" r="3"/>',
    'calendar': '<path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/>',
    'trophy': '<path d="M10 14.66v1.626a2 2 0 0 1-.976 1.696A5 5 0 0 0 7 21.978"/><path d="M14 14.66v1.626a2 2 0 0 0 .976 1.696A5 5 0 0 1 17 21.978"/><path d="M18 9h1.5a1 1 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M6 9a6 6 0 0 0 12 0V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1z"/><path d="M6 9H4.5a1 1 0 0 1 0-5H6"/>',
    'crown': '<path d="M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.734H5.81a1 1 0 0 1-.957-.734L2.02 6.02a.5.5 0 0 1 .798-.519l4.276 3.664a1 1 0 0 0 1.516-.294z"/><path d="M5 21h14"/>'
  };

  function lucideIcon(name) {
    const paths = LUCIDE_ICON_PATHS[name] || LUCIDE_ICON_PATHS.award;
    return '<svg class="lucide-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + paths + '</svg>';
  }

  const DEFAULT_CHILDREN = [
    {
      id: 'leo',
      name: 'Leo Morgan',
      age: 9,
      level: 'Intermediate',
      elo: '1240 (Demo)',
      program: 'Grandmaster Tactics & Strategic Openings',
      progress: 82,
      avatar: 'assets/hero-child-chess.jpg',
      nextSession: 'Tomorrow, 9:30 AM',
      location: 'Salon Alpha',
      mentor: 'GM Marcus Vance',
      accuracy: '88% (44/50)',
      status: 'Active Summer',
      recentBadge: {
        icon: 'award',
        title: "Knight's Fork Prodigy",
        desc: 'Solved 15/15 dual-attack puzzles in under 12 minutes.'
      },
      stats: {
        openings: 85,
        tactics: 92,
        endgames: 78,
        clockPlay: 74
      },
      coachNote: 'Leo has demonstrated exceptional patience during complex piece trades. Focus for next week: Rooks controlling the 7th rank and quiet king safety moves.'
    },
    {
      id: 'maya',
      name: 'Maya Morgan',
      age: 7,
      level: 'Beginner',
      elo: '890 (Demo)',
      program: 'Young Knights Foundations & Creative Logic',
      progress: 64,
      avatar: 'assets/avatar-child-maya.jpg',
      nextSession: 'Thursday, 10:00 AM',
      location: 'Room 204',
      mentor: 'WGM Elena Rostova',
      accuracy: '76% (38/50)',
      status: 'Active Summer',
      recentBadge: {
        icon: 'star',
        title: 'Pawn Shield Explorer',
        desc: 'Successfully mastered checkmate using King and Rook.'
      },
      stats: {
        openings: 72,
        tactics: 68,
        endgames: 80,
        clockPlay: 60
      },
      coachNote: 'Maya has a wonderful intuitive feel for pawn structures. She loves creating fortress positions and solved all back-rank mate challenges today!'
    }
  ];

  const DEFAULT_INVOICES = [
    {
      id: 'INV-2026-084',
      child: 'Leo Morgan',
      program: 'Grandmaster Tactics Lab',
      date: 'Jun 25, 2026',
      dueDate: 'July 5, 2026',
      amount: 280.00,
      method: 'Credit Card (Demo)',
      status: 'Pending',
      items: [
        { desc: 'Grandmaster Tactics & Opening Lab (Session 3)', price: 450.00 },
        { desc: 'Official Staunton Wood Chess Set & Notation Journal', price: 80.00 },
        { desc: 'Family Sibling Discount (15%)', price: -50.00 },
        { desc: 'Early Deposit Paid (June 10)', price: -200.00 }
      ]
    },
    {
      id: 'INV-2026-071',
      child: 'Maya Morgan',
      program: 'Young Knights Foundations',
      date: 'Jun 10, 2026',
      dueDate: 'Jun 20, 2026',
      amount: 420.00,
      method: 'Apple Pay (Demo)',
      status: 'Paid',
      items: [
        { desc: 'Young Knights Foundations Full Cohort Tuition', price: 450.00 },
        { desc: 'Early Bird Registration Incentive', price: -30.00 }
      ]
    },
    {
      id: 'INV-2026-052',
      child: 'Leo Morgan',
      program: 'Opening Masterclass Spring',
      date: 'May 15, 2026',
      dueDate: 'May 25, 2026',
      amount: 450.00,
      method: 'Visa •••• 4242',
      status: 'Paid',
      items: [
        { desc: 'Spring Tournament Prep Bootcamp', price: 450.00 }
      ]
    },
    {
      id: 'INV-2026-039',
      child: 'Maya Morgan',
      program: 'Chess Logic & Puzzles',
      date: 'Apr 12, 2026',
      dueDate: 'Apr 22, 2026',
      amount: 300.00,
      method: 'MasterCard •••• 8821',
      status: 'Paid',
      items: [
        { desc: 'Introductory Strategy & Board Vision Workshop', price: 300.00 }
      ]
    }
  ];

  const SCHEDULE_TIMELINE = [
    {
      id: 'act-1',
      startTime: '08:30 AM',
      endTime: '09:00 AM',
      title: 'Morning Check-in & Warm-up Blindfold Puzzle',
      desc: 'Arrival at the Academy Chess Salon, morning greeting, and warm-up visualization challenge.',
      group: 'All Cohorts',
      type: 'recreation',
      status: 'completed',
      instructor: 'Coach Marcus & Elena',
      room: 'Main Welcome Hall'
    },
    {
      id: 'act-2',
      startTime: '09:00 AM',
      endTime: '10:30 AM',
      title: 'Chess Fundamentals: French Defense & Spatial Pawn Control',
      desc: 'Interactive demonstration on masterboards dissecting central outpost control and knight maneuvering.',
      group: 'Junior Masters',
      type: 'tactics',
      status: 'in-progress',
      instructor: 'GM Marcus Vance',
      room: 'Salon Alpha'
    },
    {
      id: 'act-3',
      startTime: '10:30 AM',
      endTime: '11:00 AM',
      title: 'Tactical Puzzle Challenge: Double Attacks & Knight Forks',
      desc: 'Timed tactical puzzle solving where students earn badges for discovering pins and skewers.',
      group: 'All Children',
      type: 'tactics',
      status: 'upcoming',
      instructor: 'WGM Elena Rostova',
      room: 'Tactics Arena B'
    },
    {
      id: 'act-4',
      startTime: '11:00 AM',
      endTime: '12:30 PM',
      title: 'Strategy Workshop: Kasparov’s Immortal Attacks',
      desc: 'Analytical review of classic world championship games focusing on long-term initiative and sacrifices.',
      group: 'Advanced Cohort',
      type: 'workshop',
      status: 'upcoming',
      instructor: 'GM Marcus Vance',
      room: 'Strategy Theater'
    },
    {
      id: 'act-5',
      startTime: '12:30 PM',
      endTime: '01:30 PM',
      title: 'Healthy Academy Lunch & Strategic Board Recreation',
      desc: 'Chef-prepared nutritious lunch followed by casual chess variants, giant chess, and courtyard games.',
      group: 'All Cohorts',
      type: 'recreation',
      status: 'upcoming',
      instructor: 'Counselor Staff',
      room: 'Courtyard & Dining Pavilion'
    },
    {
      id: 'act-6',
      startTime: '01:30 PM',
      endTime: '03:00 PM',
      title: 'Rated Practice Matches & Clock Management',
      desc: 'Official rapid practice games (15 min + 10s increment) with personal move notation and peer analysis.',
      group: 'Ranked Group',
      type: 'matches',
      status: 'upcoming',
      instructor: 'Tournament Arbiters',
      room: 'Grand Tournament Hall'
    },
    {
      id: 'act-7',
      startTime: '03:00 PM',
      endTime: '04:00 PM',
      title: 'Team Chess Arena & Cooperative Problem Solving',
      desc: 'Four-player relay matches and consultational team puzzles fostering strategic communication.',
      group: 'All Children',
      type: 'matches',
      status: 'upcoming',
      instructor: 'Coach Marcus & Elena',
      room: 'Main Arena'
    },
    {
      id: 'act-8',
      startTime: '04:00 PM',
      endTime: '04:30 PM',
      title: 'Daily Reflection, Badge Stamping & Guardian Pick-up',
      desc: 'Progress booklet stamping, recognition of the tactician of the day, and organized guardian checkout.',
      group: 'All Cohorts',
      type: 'recreation',
      status: 'upcoming',
      instructor: 'Academy Reception',
      room: 'Grand Foyer'
    }
  ];

  const GALLERY_PHOTOS = [
    {
      id: 'gal-1',
      src: 'assets/chess-academy.jpg',
      title: 'Focused Tactical Analysis in Salon Alpha',
      desc: 'Leo evaluating queen sacrifices during the afternoon masterclass session.',
      album: 'tactics',
      child: 'Leo Morgan',
      date: 'June 28, 2026'
    },
    {
      id: 'gal-2',
      src: 'assets/instructor-coaching.jpg',
      title: '1-on-1 Personalized Coaching with GM Vance',
      desc: 'Mentor guiding Leo through the intricacies of the Sicilian Defense dragon variation.',
      album: 'tactics',
      child: 'Leo Morgan',
      date: 'June 27, 2026'
    },
    {
      id: 'gal-3',
      src: 'assets/camp-experience.jpg',
      title: 'Summer Cohort Grandmaster Masterclass',
      desc: 'Students observing live board demonstrations on master coordinate boards.',
      album: 'workshops',
      child: 'All Children',
      date: 'June 26, 2026'
    },
    {
      id: 'gal-4',
      src: 'assets/hero-child-chess.jpg',
      title: 'Maya’s First Checkmate Milestone',
      desc: 'Maya successfully delivering a discovered checkmate with Rook and Bishop.',
      album: 'celebration',
      child: 'Maya Morgan',
      date: 'June 25, 2026'
    },
    {
      id: 'gal-5',
      src: 'assets/cinematic-frame-1.jpg',
      title: 'Round 3 Summer Rapid Tournament',
      desc: 'Deep focus during the tense final moments with digital chess clocks.',
      album: 'matches',
      child: 'Leo Morgan',
      date: 'June 24, 2026'
    },
    {
      id: 'gal-6',
      src: 'assets/cinematic-frame-2.jpg',
      title: 'Pawn Structure Masterclass Workshop',
      desc: 'Analyzing isolated queen pawns and open files in the academy strategy lab.',
      album: 'workshops',
      child: 'Leo Morgan',
      date: 'June 23, 2026'
    },
    {
      id: 'gal-7',
      src: 'assets/cinematic-frame-3.jpg',
      title: 'Young Knights Team Relay Challenge',
      desc: 'Maya collaborating with her team to crack the 3-move combination.',
      album: 'matches',
      child: 'Maya Morgan',
      date: 'June 22, 2026'
    },
    {
      id: 'gal-8',
      src: 'assets/cinematic-frame-4.jpg',
      title: 'Blindfold Visualization Workshop',
      desc: 'Exercising mental board mapping and calculate moves without touching pieces.',
      album: 'tactics',
      child: 'All Children',
      date: 'June 20, 2026'
    },
    {
      id: 'gal-9',
      src: 'assets/cinematic-frame-5.jpg',
      title: 'Artisan Staunton Set Familiarization',
      desc: 'Appreciating the craftsmanship and balance of weighted championship pieces.',
      album: 'workshops',
      child: 'All Children',
      date: 'June 18, 2026'
    },
    {
      id: 'gal-10',
      src: 'assets/cinematic-frame-6.jpg',
      title: 'Endgame Precision & King Activity',
      desc: 'WGM Elena demonstrating opposition and triangulation technique.',
      album: 'tactics',
      child: 'Maya Morgan',
      date: 'June 17, 2026'
    },
    {
      id: 'gal-11',
      src: 'assets/cinematic-frame-7.jpg',
      title: 'Weekly Award Ceremony & Badge Stamping',
      desc: 'Celebrating tactical breakthroughs and sportsmanship achievements.',
      album: 'celebration',
      child: 'All Children',
      date: 'June 15, 2026'
    },
    {
      id: 'gal-12',
      src: 'assets/cinematic-frame-8.jpg',
      title: 'Courtyard Giant Chess Match',
      desc: 'Healthy recreation and teamwork solving outdoor chess problems.',
      album: 'celebration',
      child: 'All Children',
      date: 'June 14, 2026'
    }
  ];

  let notificationsData = [
    {
      id: 'notif-1',
      title: 'Upcoming Chess Session Tomorrow',
      body: "Leo has 'Tactical Openings & King Safety' tomorrow at 9:30 AM in Salon Alpha with GM Vance.",
      time: '12m ago',
      type: 'gold',
      unread: true
    },
    {
      id: 'notif-2',
      title: 'Skill Progression Update',
      body: "Maya solved 8/10 pawn endgame puzzles and leveled up to 'Developing Strategist'!",
      time: '2h ago',
      type: 'teal',
      unread: true
    },
    {
      id: 'notif-3',
      title: 'New Camp Photo Album Published',
      body: "54 new high-resolution photos added to 'Summer Grandmaster Masterclass 2026'.",
      time: '1d ago',
      type: 'gold',
      unread: true
    },
    {
      id: 'notif-4',
      title: 'Tuition Payment Reminder',
      body: "Invoice #INV-2026-084 for Leo's Summer Strategy Camp is due on July 5 ($280.00).",
      time: '2d ago',
      type: 'gold',
      unread: false
    }
  ];

  function getStoredChildren() {
    try {
      const data = localStorage.getItem(STORAGE_CHILDREN_KEY);
      return data ? JSON.parse(data) : DEFAULT_CHILDREN;
    } catch (e) {
      return DEFAULT_CHILDREN;
    }
  }

  function saveStoredChildren(children) {
    try {
      localStorage.setItem(STORAGE_CHILDREN_KEY, JSON.stringify(children));
    } catch (e) {
      console.warn('Could not save to localStorage:', e);
    }
  }

  function getStoredInvoices() {
    try {
      const data = localStorage.getItem(STORAGE_INVOICES_KEY);
      return data ? JSON.parse(data) : DEFAULT_INVOICES;
    } catch (e) {
      return DEFAULT_INVOICES;
    }
  }

  function saveStoredInvoices(invoices) {
    try {
      localStorage.setItem(STORAGE_INVOICES_KEY, JSON.stringify(invoices));
    } catch (e) {
      console.warn('Could not save to localStorage:', e);
    }
  }

  const VIEW_TITLES = {
    overview: {
      title: 'Overview',
      subtitle: "Here's your family's chess camp activity, progress, and upcoming schedule at a glance."
    },
    children: {
      title: 'My Children',
      subtitle: "Manage your children's camp profiles, learning journey, and tournament registrations."
    },
    schedule: {
      title: 'Camp Schedule',
      subtitle: 'Explore daily activities, workshop timelines, and upcoming chess sessions.'
    },
    gallery: {
      title: 'Camp Memories',
      subtitle: 'Private visual log of coaching moments, match celebrations, and tactical breakthroughs.'
    },
    payments: {
      title: 'Payments & Billing',
      subtitle: 'Review transparent fee breakdowns, download invoices, and manage session payments securely.'
    }
  };

  let activeView = 'overview';

  function switchView(viewName) {
    if (!VIEW_TITLES[viewName]) return;

    activeView = viewName;

    document.querySelectorAll('.nav-link').forEach((link) => {
      const linkView = link.getAttribute('data-view');
      if (linkView === viewName) {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
      } else {
        link.classList.remove('active');
        link.removeAttribute('aria-current');
      }
    });

    document.querySelectorAll('.dash-view').forEach((section) => {
      if (section.getAttribute('data-view') === viewName) {
        section.classList.add('active');
      } else {
        section.classList.remove('active');
      }
    });

    const titleEl = document.getElementById('headerPageTitle');
    const subtitleEl = document.getElementById('headerPageSubtitle');
    if (titleEl) titleEl.textContent = VIEW_TITLES[viewName].title;
    if (subtitleEl) subtitleEl.textContent = VIEW_TITLES[viewName].subtitle;

    window.scrollTo({ top: 0, behavior: 'smooth' });

    closeMobileDrawer();

    if (viewName === 'overview' && window.skillProgressChartInstance) {
      setTimeout(() => {
        window.skillProgressChartInstance.resize();
        if (window.campActivityBarInstance) window.campActivityBarInstance.resize();
        if (window.skillDonutInstance) window.skillDonutInstance.resize();
      }, 50);
    }
  }

  function initNavigation() {

    document.querySelectorAll('.nav-link').forEach((button) => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        const targetView = button.getAttribute('data-view');
        switchView(targetView);
      });
    });

    document.addEventListener('click', (e) => {
      const navTrigger = e.target.closest('[data-action="navigate-view"]');
      if (navTrigger) {
        e.preventDefault();
        const target = navTrigger.getAttribute('data-target');
        switchView(target);
      }
    });
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_STORAGE_KEY, theme);

    const btn = document.getElementById('themeToggleBtn');
    if (btn) {
      btn.setAttribute('aria-label', theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode');
      btn.setAttribute('title', theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode');
    }

    updateChartsTheme(theme);
  }

  function initTheme() {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY) ||
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    applyTheme(savedTheme);

    const themeBtn = document.getElementById('themeToggleBtn');
    if (themeBtn) {
      themeBtn.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme') || 'light';
        const next = current === 'dark' ? 'light' : 'dark';
        applyTheme(next);
      });
    }
  }

  function applyDirection(dir) {
    document.documentElement.setAttribute('dir', dir);
    localStorage.setItem(DIR_STORAGE_KEY, dir);

    const rtlLabel = document.getElementById('rtlLabel');
    if (rtlLabel) {
      rtlLabel.textContent = dir === 'rtl' ? 'LTR' : 'RTL';
    }

    const rtlBtn = document.getElementById('rtlToggleBtn');
    if (rtlBtn) {
      rtlBtn.setAttribute('title', dir === 'rtl' ? 'Switch to Left-to-Right layout' : 'Switch to Right-to-Left layout');
    }
  }

  function initRTL() {
    const savedDir = localStorage.getItem(DIR_STORAGE_KEY) || 'ltr';
    applyDirection(savedDir);

    const rtlBtn = document.getElementById('rtlToggleBtn');
    if (rtlBtn) {
      rtlBtn.addEventListener('click', () => {
        const currentDir = document.documentElement.getAttribute('dir') || 'ltr';
        const nextDir = currentDir === 'rtl' ? 'ltr' : 'rtl';
        applyDirection(nextDir);
      });
    }
  }

  const sidebar = document.getElementById('dashSidebar');
  const sidebarBackdrop = document.getElementById('sidebarBackdrop');
  const mobileToggle = document.getElementById('headerMobileToggle');
  const sidebarClose = document.getElementById('sidebarCloseBtn');

  function openMobileDrawer() {
    if (sidebar) sidebar.classList.add('drawer-open');
    if (sidebarBackdrop) sidebarBackdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileDrawer() {
    if (sidebar) sidebar.classList.remove('drawer-open');
    if (sidebarBackdrop) sidebarBackdrop.classList.remove('active');
    document.body.style.overflow = '';
  }

  function initDrawer() {
    if (mobileToggle) mobileToggle.addEventListener('click', openMobileDrawer);
    if (sidebarClose) sidebarClose.addEventListener('click', closeMobileDrawer);
    if (sidebarBackdrop) sidebarBackdrop.addEventListener('click', closeMobileDrawer);
  }

  function initDropdowns() {
    const notifBtn = document.getElementById('notifBtn');
    const notifDropdown = document.getElementById('notifDropdown');
    const profileBtn = document.getElementById('profileBtn');
    const profileDropdown = document.getElementById('profileDropdown');

    function closeAllDropdowns() {
      if (notifDropdown) notifDropdown.classList.remove('open');
      if (notifBtn) notifBtn.setAttribute('aria-expanded', 'false');
      if (profileDropdown) profileDropdown.classList.remove('open');
      if (profileBtn) profileBtn.setAttribute('aria-expanded', 'false');
    }

    if (notifBtn && notifDropdown) {
      notifBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = notifDropdown.classList.contains('open');
        closeAllDropdowns();
        if (!isOpen) {
          notifDropdown.classList.add('open');
          notifBtn.setAttribute('aria-expanded', 'true');
        }
      });
    }

    if (profileBtn && profileDropdown) {
      profileBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = profileDropdown.classList.contains('open');
        closeAllDropdowns();
        if (!isOpen) {
          profileDropdown.classList.add('open');
          profileBtn.setAttribute('aria-expanded', 'true');
        }
      });
    }

    document.addEventListener('click', (e) => {
      if (!e.target.closest('.header-dropdown-wrap')) {
        closeAllDropdowns();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeAllDropdowns();
      }
    });
  }

  function renderNotifications() {
    const listEl = document.getElementById('notifList');
    const badgeEl = document.getElementById('notifBadge');
    const countTag = document.getElementById('notifCountTag');
    if (!listEl) return;

    listEl.innerHTML = '';
    const unreadCount = notificationsData.filter(n => n.unread).length;

    if (badgeEl) {
      badgeEl.textContent = unreadCount;
      badgeEl.style.display = unreadCount > 0 ? 'flex' : 'none';
    }

    if (countTag) {
      countTag.textContent = `${unreadCount} New`;
    }

    notificationsData.forEach((item) => {
      const notifItem = document.createElement('div');
      notifItem.className = `notif-item ${item.unread ? 'unread' : ''}`;
      notifItem.innerHTML = `
        <div class="notif-icon-circle ${item.type}">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
          </svg>
        </div>
        <div class="notif-content">
          <span class="notif-title">${item.title}</span>
          <p class="notif-body">${item.body}</p>
          <span class="notif-time">${item.time}</span>
        </div>
      `;

      notifItem.addEventListener('click', () => {
        item.unread = false;
        renderNotifications();
      });

      listEl.appendChild(notifItem);
    });
  }

  function initNotifications() {
    renderNotifications();

    const markAllReadBtn = document.getElementById('markAllReadBtn');
    if (markAllReadBtn) {
      markAllReadBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        notificationsData.forEach(n => n.unread = false);
        renderNotifications();
        showToast('Notifications Cleared', 'All notifications marked as read.', 'info');
      });
    }
  }

  function getChartThemeColors() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    return {
      textColor: isDark ? '#C9D1CD' : '#526765',
      gridColor: isDark ? 'rgba(228, 201, 138, 0.1)' : 'rgba(198, 161, 91, 0.12)',
      gold: '#C6A15B',
      goldLight: '#E4C98A',
      teal: '#0E5552',
      tealLight: '#2ECC71'
    };
  }

  window.skillProgressChartInstance = null;
  window.campActivityBarInstance = null;
  window.skillDonutInstance = null;

  function initSkillProgressChart() {
    const canvas = document.getElementById('skillProgressChart');
    if (!canvas) return;

    const colors = getChartThemeColors();
    const ctx = canvas.getContext('2d');

    const goldGrad = ctx.createLinearGradient(0, 0, 0, 260);
    goldGrad.addColorStop(0, 'rgba(198, 161, 91, 0.35)');
    goldGrad.addColorStop(1, 'rgba(198, 161, 91, 0.0)');

    const tealGrad = ctx.createLinearGradient(0, 0, 0, 260);
    tealGrad.addColorStop(0, 'rgba(14, 85, 82, 0.3)');
    tealGrad.addColorStop(1, 'rgba(14, 85, 82, 0.0)');

    const config = {
      type: 'line',
      data: {
        labels: ['Jun 01', 'Jun 05', 'Jun 10', 'Jun 15', 'Jun 20', 'Jun 25', 'Jun 30'],
        datasets: [
          {
            label: 'Tactical Accuracy (%)',
            data: [68, 72, 75, 78, 81, 84, 88],
            borderColor: colors.gold,
            backgroundColor: goldGrad,
            borderWidth: 3,
            fill: true,
            tension: 0.35,
            pointBackgroundColor: colors.gold,
            pointBorderColor: '#FFF',
            pointBorderWidth: 2,
            pointRadius: 4,
            pointHoverRadius: 6
          },
          {
            label: 'ELO Equivalent (Leo)',
            data: [60, 65, 70, 74, 76, 80, 82],
            borderColor: colors.teal,
            backgroundColor: tealGrad,
            borderWidth: 2.5,
            borderDash: [4, 4],
            fill: true,
            tension: 0.35,
            pointBackgroundColor: colors.teal,
            pointBorderColor: '#FFF',
            pointBorderWidth: 1.5,
            pointRadius: 3
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        resizeDelay: 100,
        interaction: {
          mode: 'index',
          intersect: false
        },
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            backgroundColor: '#052423',
            titleFont: { family: 'Cinzel', size: 12, weight: 'bold' },
            bodyFont: { family: 'Plus Jakarta Sans', size: 12 },
            borderColor: '#C6A15B',
            borderWidth: 1,
            padding: 10,
            callbacks: {
              label: function (context) {
                return ` ${context.dataset.label}: ${context.parsed.y}%`;
              }
            }
          }
        },
        scales: {
          x: {
            grid: {
              color: colors.gridColor
            },
            ticks: {
              color: colors.textColor,
              font: { family: 'Plus Jakarta Sans', size: 11 }
            }
          },
          y: {
            min: 50,
            max: 100,
            grid: {
              color: colors.gridColor
            },
            ticks: {
              color: colors.textColor,
              font: { family: 'Plus Jakarta Sans', size: 11 },
              callback: function (val) {
                return val + '%';
              }
            }
          }
        }
      }
    };

    window.skillProgressChartInstance = new Chart(ctx, config);

    const childSelect = document.getElementById('skillChartChildSelect');
    if (childSelect) {
      childSelect.addEventListener('change', (e) => {
        const val = e.target.value;
        if (val === 'leo') {
          window.skillProgressChartInstance.data.datasets[0].data = [68, 72, 75, 78, 81, 84, 88];
          window.skillProgressChartInstance.data.datasets[1].data = [60, 65, 70, 74, 76, 80, 82];
        } else if (val === 'maya') {
          window.skillProgressChartInstance.data.datasets[0].data = [50, 54, 58, 62, 65, 70, 76];
          window.skillProgressChartInstance.data.datasets[1].data = [45, 50, 54, 57, 60, 62, 64];
        } else {
          window.skillProgressChartInstance.data.datasets[0].data = [68, 72, 75, 78, 81, 84, 88];
          window.skillProgressChartInstance.data.datasets[1].data = [50, 54, 58, 62, 65, 70, 76];
        }
        window.skillProgressChartInstance.update();
      });
    }

    document.querySelectorAll('.time-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        document.querySelectorAll('.time-pill').forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        const range = pill.getAttribute('data-range');
        if (range === '7d') {
          window.skillProgressChartInstance.data.labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
          window.skillProgressChartInstance.data.datasets[0].data = [80, 81, 83, 84, 85, 87, 88];
        } else if (range === '30d') {
          window.skillProgressChartInstance.data.labels = ['Jun 01', 'Jun 05', 'Jun 10', 'Jun 15', 'Jun 20', 'Jun 25', 'Jun 30'];
          window.skillProgressChartInstance.data.datasets[0].data = [68, 72, 75, 78, 81, 84, 88];
        } else if (range === '3m') {
          window.skillProgressChartInstance.data.labels = ['April', 'May', 'June'];
          window.skillProgressChartInstance.data.datasets[0].data = [55, 72, 88];
        }
        window.skillProgressChartInstance.update();
      });
    });
  }

  function initCampActivityBarChart() {
    const canvas = document.getElementById('campActivityBarChart');
    if (!canvas) return;

    const colors = getChartThemeColors();
    const ctx = canvas.getContext('2d');

    const config = {
      type: 'bar',
      data: {
        labels: ['Puzzles', 'Openings', 'Tactics', 'Matches', 'Team Challenges'],
        datasets: [
          {
            label: 'Leo Morgan',
            data: [4.5, 3.2, 5.0, 4.0, 2.5],
            backgroundColor: colors.gold,
            borderRadius: 4,
            barThickness: 12,
            maxBarThickness: 16
          },
          {
            label: 'Maya Morgan',
            data: [3.0, 2.0, 3.5, 2.5, 3.0],
            backgroundColor: colors.teal,
            borderRadius: 4,
            barThickness: 12,
            maxBarThickness: 16
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        resizeDelay: 100,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: '#052423',
            titleFont: { family: 'Cinzel', size: 12, weight: 'bold' },
            bodyFont: { family: 'Plus Jakarta Sans', size: 12 },
            borderColor: '#C6A15B',
            borderWidth: 1,
            padding: 8,
            callbacks: {
              label: function (ctx) {
                return ` ${ctx.dataset.label}: ${ctx.parsed.y} hrs`;
              }
            }
          }
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: {
              color: colors.textColor,
              font: { family: 'Plus Jakarta Sans', size: 10 }
            }
          },
          y: {
            grid: { color: colors.gridColor },
            ticks: {
              color: colors.textColor,
              font: { family: 'Plus Jakarta Sans', size: 10 },
              callback: function (val) {
                return val + 'h';
              }
            }
          }
        }
      }
    };

    window.campActivityBarInstance = new Chart(ctx, config);
  }

  function initSkillDonutChart() {
    const canvas = document.getElementById('skillDonutChart');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    const config = {
      type: 'doughnut',
      data: {
        labels: ['Tactics & Forks', 'King Safety', 'Endgames', 'Opening Principles'],
        datasets: [
          {
            data: [40, 25, 20, 15],
            backgroundColor: ['#C6A15B', '#0E5552', '#E4C98A', '#526765'],
            borderColor: '#052423',
            borderWidth: 2,
            hoverOffset: 6
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '72%',
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: '#052423',
            titleFont: { family: 'Cinzel', size: 11, weight: 'bold' },
            bodyFont: { family: 'Plus Jakarta Sans', size: 11 },
            borderColor: '#C6A15B',
            borderWidth: 1,
            callbacks: {
              label: function (ctx) {
                return ` ${ctx.label}: ${ctx.parsed}%`;
              }
            }
          }
        }
      }
    };

    window.skillDonutInstance = new Chart(ctx, config);
  }

  function updateChartsTheme(theme) {
    const colors = getChartThemeColors();

    if (window.skillProgressChartInstance) {
      window.skillProgressChartInstance.options.scales.x.grid.color = colors.gridColor;
      window.skillProgressChartInstance.options.scales.x.ticks.color = colors.textColor;
      window.skillProgressChartInstance.options.scales.y.grid.color = colors.gridColor;
      window.skillProgressChartInstance.options.scales.y.ticks.color = colors.textColor;
      window.skillProgressChartInstance.update();
    }

    if (window.campActivityBarInstance) {
      window.campActivityBarInstance.options.scales.y.grid.color = colors.gridColor;
      window.campActivityBarInstance.options.scales.x.ticks.color = colors.textColor;
      window.campActivityBarInstance.options.scales.y.ticks.color = colors.textColor;
      window.campActivityBarInstance.update();
    }
  }

  function renderChildrenCards() {
    const grid = document.getElementById('childrenCardsGrid');
    if (!grid) return;

    const children = getStoredChildren();
    grid.innerHTML = '';

    children.forEach((child) => {
      const card = document.createElement('div');
      card.className = 'child-profile-card';
      card.setAttribute('data-child-id', child.id);

      card.innerHTML = `
        <div class="child-card-header">
          <div class="child-avatar-box">
            <img src="${child.avatar || 'assets/hero-child-chess.jpg'}" alt="${child.name}" class="child-avatar-img">
            <span class="child-level-badge ${child.level.toLowerCase() === 'beginner' ? 'beginner' : ''}">${child.level}</span>
          </div>
          <div class="child-primary-meta">
            <div class="child-name-row">
              <h3 class="child-name">${child.name}</h3>
              <span class="child-age-pill">Age ${child.age}</span>
            </div>
            <span class="child-elo-tag">Tactical Rating: <strong>${child.elo}</strong></span>
            <span class="child-program-tag">
              <svg viewBox="0 0 16 16" fill="currentColor"><circle cx="8" cy="8" r="4"/></svg>
              ${child.program}
            </span>
          </div>
        </div>

        <div class="child-card-body">
          <div class="child-progress-block">
            <div class="cp-header">
              <span>Curriculum Mastery</span>
              <span class="cp-val">${child.progress}%</span>
            </div>
            <div class="cp-track">
              <div class="cp-fill" style="width: ${child.progress}%;"></div>
            </div>
          </div>

          <div class="child-details-grid">
            <div class="c-detail-item">
              <span class="cd-label">Next Session</span>
              <span class="cd-val">${child.nextSession}</span>
            </div>
            <div class="c-detail-item">
              <span class="cd-label">Mentor</span>
              <span class="cd-val">${child.mentor}</span>
            </div>
            <div class="c-detail-item">
              <span class="cd-label">Puzzle Accuracy</span>
              <span class="cd-val">${child.accuracy}</span>
            </div>
            <div class="c-detail-item">
              <span class="cd-label">Status</span>
              <span class="cd-status active">${child.status}</span>
            </div>
          </div>

          <div class="child-recent-achievement">
            <div class="ach-icon">${lucideIcon(child.recentBadge?.icon || 'award')}</div>
            <div class="ach-text">
              <span class="ach-title">${child.recentBadge?.title || 'Tactical Milestone'}</span>
              <span class="ach-desc">${child.recentBadge?.desc || 'Active participant in daily problem solving.'}</span>
            </div>
          </div>
        </div>

        <div class="child-card-footer">
          <button class="dash-btn-gold btn-sm" data-action="open-child-progress" data-child="${child.id}">
            View Progress
          </button>
          <button class="dash-btn-outline btn-sm" data-action="edit-child" data-child="${child.id}">
            Edit Profile
          </button>
          <button class="dash-btn-outline btn-sm" data-action="filter-schedule-child" data-child="${child.id}">
            Schedule
          </button>
        </div>
      `;

      grid.appendChild(card);
    });
  }

  function openChildModal(mode = 'add', childId = null) {
    const modal = document.getElementById('childModal');
    const title = document.getElementById('childModalTitle');
    const form = document.getElementById('childForm');
    const modeInput = document.getElementById('childFormMode');
    const idInput = document.getElementById('childFormId');

    modeInput.value = mode;
    idInput.value = childId || '';

    document.querySelectorAll('.form-error').forEach(e => e.classList.remove('visible'));

    if (mode === 'edit' && childId) {
      title.textContent = 'Edit Child Profile';
      const children = getStoredChildren();
      const child = children.find(c => c.id === childId);
      if (child) {
        document.getElementById('childFullName').value = child.name;
        document.getElementById('childAge').value = child.age;
        document.getElementById('childSkillLevel').value = child.level;
        document.getElementById('childProgram').value = child.program;
        document.getElementById('childNotes').value = child.coachNote || '';
      }
    } else {
      title.textContent = 'Add Child Profile';
      form.reset();
    }

    openModal('childModal');
  }

  function handleChildFormSubmit(e) {
    e.preventDefault();

    const name = document.getElementById('childFullName').value.trim();
    const age = parseInt(document.getElementById('childAge').value, 10);
    const level = document.getElementById('childSkillLevel').value;
    const program = document.getElementById('childProgram').value;
    const notes = document.getElementById('childNotes').value.trim();
    const mode = document.getElementById('childFormMode').value;
    const childId = document.getElementById('childFormId').value;

    let isValid = true;

    if (!name) {
      document.getElementById('childNameError').classList.add('visible');
      isValid = false;
    } else {
      document.getElementById('childNameError').classList.remove('visible');
    }

    if (isNaN(age) || age < 4 || age > 17) {
      document.getElementById('childAgeError').classList.add('visible');
      isValid = false;
    } else {
      document.getElementById('childAgeError').classList.remove('visible');
    }

    if (!level) {
      document.getElementById('childSkillError').classList.add('visible');
      isValid = false;
    } else {
      document.getElementById('childSkillError').classList.remove('visible');
    }

    if (!program) {
      document.getElementById('childProgError').classList.add('visible');
      isValid = false;
    } else {
      document.getElementById('childProgError').classList.remove('visible');
    }

    if (!isValid) return;

    let children = getStoredChildren();

    if (mode === 'edit' && childId) {
      const idx = children.findIndex(c => c.id === childId);
      if (idx !== -1) {
        children[idx].name = name;
        children[idx].age = age;
        children[idx].level = level;
        children[idx].program = program;
        children[idx].coachNote = notes;
      }
      showToast('Profile Updated', `${name}’s profile was successfully updated.`, 'success');
    } else {
      const newId = 'child-' + Date.now();
      const newChild = {
        id: newId,
        name: name,
        age: age,
        level: level,
        elo: level === 'Beginner' ? '850 (Demo)' : '1100 (Demo)',
        program: program,
        progress: 45,
        avatar: 'assets/hero-child-chess.jpg',
        nextSession: 'July 07, 9:00 AM',
        location: 'Salon Alpha',
        mentor: 'GM Marcus Vance',
        accuracy: '80% (24/30)',
        status: 'Active Summer',
        recentBadge: {
          icon: 'sparkles',
          title: 'Welcome Tactician',
          desc: 'Completed onboarding orientation & placement evaluation.'
        },
        stats: {
          openings: 60,
          tactics: 65,
          endgames: 55,
          clockPlay: 50
        },
        coachNote: notes || 'Enthusiastic and eager to explore classical opening systems!'
      };

      children.push(newChild);
      showToast('Child Enrolled', `${name} has been added to your parent dashboard.`, 'success');
    }

    saveStoredChildren(children);
    renderChildrenCards();
    closeModal('childModal');
  }

  function openChildProgressModal(childId) {
    const children = getStoredChildren();
    const child = children.find(c => c.id === childId) || children[0];
    if (!child) return;

    const modalBody = document.getElementById('childProgressModalBody');
    const subtitle = document.getElementById('progModalSubtitle');

    if (subtitle) {
      subtitle.textContent = `${child.name} • ${child.level} Strategist (Age ${child.age})`;
    }

    modalBody.innerHTML = `
      <div class="eval-grid">
        <div class="eval-overview-card">
          <div class="eval-header-avatar">
            <img src="${child.avatar}" alt="${child.name}">
            <div>
              <h4>${child.name}</h4>
              <span class="eval-level-tag">${child.level} &bull; ELO ${child.elo}</span>
              <p class="eval-prog-name">${child.program}</p>
            </div>
          </div>

          <div class="eval-meter-row">
            <div class="em-label">
              <span>Overall Curriculum Mastery</span>
              <strong>${child.progress}%</strong>
            </div>
            <div class="em-track">
              <div class="em-fill" style="width: ${child.progress}%;"></div>
            </div>
          </div>

          <div class="eval-coach-quote">
            <svg viewBox="0 0 24 24" fill="currentColor" class="quote-mark"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/></svg>
            <p>${child.coachNote}</p>
            <span class="coach-signature">— ${child.mentor}</span>
          </div>
        </div>

        <div class="eval-metrics-column">
          <h4 class="eval-section-heading">Tactical Competencies (4-Category Breakdown)</h4>
          <div class="eval-bar-group">
            <div class="eval-bar-item">
              <div class="ebi-header"><span>Tactical Combinations &amp; Forks</span><strong>${child.stats?.tactics || 88}%</strong></div>
              <div class="ebi-track"><div class="ebi-fill" style="width: ${child.stats?.tactics || 88}%;"></div></div>
            </div>
            <div class="eval-bar-item">
              <div class="ebi-header"><span>King Safety &amp; Castling Security</span><strong>${child.stats?.openings || 82}%</strong></div>
              <div class="ebi-track"><div class="ebi-fill" style="width: ${child.stats?.openings || 82}%;"></div></div>
            </div>
            <div class="eval-bar-item">
              <div class="ebi-header"><span>Endgame Technique &amp; Pawn Promotion</span><strong>${child.stats?.endgames || 78}%</strong></div>
              <div class="ebi-track"><div class="ebi-fill" style="width: ${child.stats?.endgames || 78}%;"></div></div>
            </div>
            <div class="eval-bar-item">
              <div class="ebi-header"><span>Clock Management &amp; Rapid Precision</span><strong>${child.stats?.clockPlay || 70}%</strong></div>
              <div class="ebi-track"><div class="ebi-fill" style="width: ${child.stats?.clockPlay || 70}%;"></div></div>
            </div>
          </div>

          <h4 class="eval-section-heading mt-18">Earned Summer Badges</h4>
          <div class="eval-badges-row">
            <div class="eval-badge-pill gold"><span>${lucideIcon('award')} Knight's Fork Prodigy</span></div>
            <div class="eval-badge-pill teal"><span>${lucideIcon('shield')} Pawn Shield Master</span></div>
            <div class="eval-badge-pill gold"><span>${lucideIcon('zap')} Blitz Tactician</span></div>
          </div>
        </div>
      </div>
    `;

    openModal('childProgressModal');
  }

  function initEnrollment() {
    const enrollForm = document.getElementById('enrollForm');
    const programSelect = document.getElementById('enrollProgramSelect');
    const baseFeeEl = document.getElementById('enrollBaseFee');
    const totalFeeEl = document.getElementById('enrollTotalFee');

    if (programSelect) {
      programSelect.addEventListener('change', () => {
        const opt = programSelect.options[programSelect.selectedIndex];
        const price = parseFloat(opt.getAttribute('data-price')) || 450;
        const total = price - 50;
        if (baseFeeEl) baseFeeEl.textContent = `$${price.toFixed(2)}`;
        if (totalFeeEl) totalFeeEl.textContent = `$${total.toFixed(2)}`;
      });
    }

    if (enrollForm) {
      enrollForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const childVal = document.getElementById('enrollChildSelect').value;
        const progVal = document.getElementById('enrollProgramSelect').value;
        const sessionVal = document.getElementById('enrollSessionSelect').value;

        closeModal('enrollModal');
        showToast(
          'Enrollment Confirmed (Demo)',
          `Registered for ${progVal} (${sessionVal}). Invoice generated in billing ledger.`,
          'success'
        );

        const invoices = getStoredInvoices();
        const newInvoice = {
          id: 'INV-2026-0' + (85 + Math.floor(Math.random() * 10)),
          child: childVal === 'leo' ? 'Leo Morgan' : 'Maya Morgan',
          program: progVal.split('(')[0].trim(),
          date: 'July 1, 2026',
          dueDate: 'July 10, 2026',
          amount: 400.00,
          method: 'Pending Online Checkout',
          status: 'Pending',
          items: [
            { desc: `${progVal.split('(')[0].trim()} Summer Camp`, price: 450.00 },
            { desc: 'Family Sibling Incentive Discount', price: -50.00 }
          ]
        };

        invoices.unshift(newInvoice);
        saveStoredInvoices(invoices);
        renderInvoicesTable();
      });
    }
  }

  function renderScheduleTimeline(filterChild = 'all', filterActivity = 'all') {
    const stream = document.getElementById('timelineStream');
    if (!stream) return;

    stream.innerHTML = '';

    const filtered = SCHEDULE_TIMELINE.filter(item => {
      if (filterActivity !== 'all' && item.type !== filterActivity) return false;
      return true;
    });

    filtered.forEach((act) => {
      const card = document.createElement('div');
      card.className = 'timeline-activity-card';
      card.setAttribute('data-id', act.id);

      card.innerHTML = `
        <div class="t-time-col">
          <span class="t-start-time">${act.startTime}</span>
          <span class="t-end-time">${act.endTime}</span>
        </div>
        <div class="t-connector-node ${act.status}"></div>
        <div class="t-content-card">
          <div class="t-card-details">
            <h4>${act.title}</h4>
            <p class="t-card-desc">${act.desc}</p>
            <div class="t-tags-row">
              <span class="t-tag">${act.group}</span>
              <span class="t-tag">${lucideIcon('map-pin')} ${act.room}</span>
              <span class="t-tag">${lucideIcon('user')} ${act.instructor}</span>
            </div>
          </div>
          <div class="t-action-col">
            <span class="s-status-badge ${act.status}">${act.status.replace('-', ' ')}</span>
            <button class="dash-link-btn font-sm" data-action="view-session" data-session-id="${act.id}">
              Details &rarr;
            </button>
          </div>
        </div>
      `;

      card.querySelector('.t-content-card').addEventListener('click', () => {
        openSessionDetailsModal(act);
      });

      stream.appendChild(card);
    });
  }

  function renderWeeklyCalendar() {
    const table = document.getElementById('weeklyGridTable');
    if (!table) return;

    table.innerHTML = '';
    const days = [
      { name: 'Mon', num: '29', events: [{ time: '9:30 AM', title: 'Opening Theory Lab' }, { time: '1:30 PM', title: 'Rapid Tournament' }] },
      { name: 'Tue', num: '30', events: [{ time: '10:00 AM', title: 'Endgame Opposition' }, { time: '2:00 PM', title: 'Puzzle Duel' }] },
      { name: 'Wed', num: '01', today: true, events: [{ time: '9:00 AM', title: 'French Defense & Pawn Structures' }, { time: '1:30 PM', title: 'Clock Match Arena' }] },
      { name: 'Thu', num: '02', events: [{ time: '10:00 AM', title: 'Double Attacks & Forks' }, { time: '1:00 PM', title: 'Strategy Workshop' }] },
      { name: 'Fri', num: '03', events: [{ time: '9:30 AM', title: 'Tournament Round 4' }, { time: '3:00 PM', title: 'Relay Matches' }] },
      { name: 'Sat', num: '04', events: [{ time: '1:00 PM', title: 'Weekend Masterclass' }] },
      { name: 'Sun', num: '05', events: [] }
    ];

    days.forEach(day => {
      const col = document.createElement('div');
      col.className = `cal-day-col ${day.today ? 'today' : ''}`;

      let eventsHtml = '';
      if (day.events.length === 0) {
        eventsHtml = `<span class="cal-no-events text-muted font-sm" style="margin-top:20px; text-align:center; display:block;">No sessions</span>`;
      } else {
        day.events.forEach(ev => {
          eventsHtml += `
            <div class="cal-event-pill" data-title="${ev.title}" data-time="${ev.time}">
              <div class="cal-event-time">${ev.time}</div>
              <div class="cal-event-title">${ev.title}</div>
            </div>
          `;
        });
      }

      col.innerHTML = `
        <div class="cal-day-header">
          <span class="cal-day-name">${day.name}</span>
          <span class="cal-day-num">${day.num}</span>
        </div>
        <div class="cal-events-stack">
          ${eventsHtml}
        </div>
      `;

      col.querySelectorAll('.cal-event-pill').forEach(pill => {
        pill.addEventListener('click', () => {
          const t = pill.getAttribute('data-title');
          const tm = pill.getAttribute('data-time');
          openSessionDetailsModal({
            title: t,
            startTime: tm,
            endTime: '2 Hours Duration',
            room: 'Grand Tournament Salon Alpha',
            instructor: 'GM Marcus Vance',
            group: 'All Cohorts',
            status: 'Confirmed',
            desc: 'Hands-on live game review, digital clock management, and personalized coaching feedback.'
          });
        });
      });

      table.appendChild(col);
    });
  }

  function openSessionDetailsModal(act) {
    const body = document.getElementById('sessionModalBody');
    if (!body) return;

    body.innerHTML = `
      <div class="session-modal-content">
        <div class="session-modal-top">
          <span class="s-status-badge ${act.status || 'confirmed'}">${act.status || 'Confirmed'}</span>
          <span class="text-muted font-sm">Stratagem Summer Cohort &bull; Session 03</span>
        </div>
        <h3 class="session-modal-title mt-8">${act.title}</h3>
        <p class="session-modal-desc mt-6">${act.desc}</p>

        <div class="session-meta-specs mt-18">
          <div class="spec-row">
            <span class="spec-lbl">Time:</span>
            <strong>${act.startTime} – ${act.endTime}</strong>
          </div>
          <div class="spec-row">
            <span class="spec-lbl">Instructor:</span>
            <strong>${act.instructor}</strong>
          </div>
          <div class="spec-row">
            <span class="spec-lbl">Room / Venue:</span>
            <span>${act.room}</span>
          </div>
          <div class="spec-row">
            <span class="spec-lbl">Target Cohort:</span>
            <span>${act.group}</span>
          </div>
          <div class="spec-row">
            <span class="spec-lbl">Required Equipment:</span>
            <span>Standard Staunton Board provided. Bring personal tournament notation book.</span>
          </div>
        </div>

        <div class="modal-form-actions mt-20">
          <button type="button" class="dash-btn-gold" data-action="close-modal">Got it</button>
        </div>
      </div>
    `;

    openModal('sessionModal');
  }

  function initScheduleControls() {
    const timelineBtn = document.getElementById('schedTimelineBtn');
    const calendarBtn = document.getElementById('schedCalendarBtn');
    const timelineView = document.getElementById('scheduleTimelineView');
    const calendarView = document.getElementById('scheduleCalendarView');

    if (timelineBtn && calendarBtn) {
      timelineBtn.addEventListener('click', () => {
        timelineBtn.classList.add('active');
        calendarBtn.classList.remove('active');
        if (timelineView) timelineView.style.display = 'block';
        if (calendarView) calendarView.style.display = 'none';
      });

      calendarBtn.addEventListener('click', () => {
        calendarBtn.classList.add('active');
        timelineBtn.classList.remove('active');
        if (timelineView) timelineView.style.display = 'none';
        if (calendarView) {
          calendarView.style.display = 'block';
          renderWeeklyCalendar();
        }
      });
    }

    const childFilter = document.getElementById('schedChildFilter');
    const actFilter = document.getElementById('schedActivityFilter');
    const clearBtn = document.getElementById('schedClearFiltersBtn');

    function applyScheduleFilters() {
      const c = childFilter ? childFilter.value : 'all';
      const a = actFilter ? actFilter.value : 'all';
      renderScheduleTimeline(c, a);
    }

    if (childFilter) childFilter.addEventListener('change', applyScheduleFilters);
    if (actFilter) actFilter.addEventListener('change', applyScheduleFilters);

    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        if (childFilter) childFilter.value = 'all';
        if (actFilter) actFilter.value = 'all';
        renderScheduleTimeline('all', 'all');
        showToast('Filters Reset', 'Showing full daily activity timeline.', 'info');
      });
    }

    renderScheduleTimeline();
  }

  let activeLightboxIndex = 0;
  let currentFilteredPhotos = GALLERY_PHOTOS;

  function renderGallery(album = 'all', searchQuery = '') {
    const grid = document.getElementById('galleryPhotoGrid');
    if (!grid) return;

    grid.innerHTML = '';

    currentFilteredPhotos = GALLERY_PHOTOS.filter(photo => {
      const matchAlbum = album === 'all' || photo.album === album;
      const matchQuery = !searchQuery ||
        photo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        photo.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        photo.child.toLowerCase().includes(searchQuery.toLowerCase());
      return matchAlbum && matchQuery;
    });

    if (currentFilteredPhotos.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1 / -1; padding: 40px; text-align: center; color: var(--theme-text-muted);">
          <p>No photos match the selected criteria.</p>
        </div>
      `;
      return;
    }

    currentFilteredPhotos.forEach((photo, idx) => {
      const card = document.createElement('div');
      card.className = 'gallery-card';
      card.innerHTML = `
        <div class="gallery-img-wrap">
          <img src="${photo.src}" alt="${photo.title}" class="gallery-img" loading="lazy">
          <div class="gallery-zoom-badge" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              <line x1="11" y1="8" x2="11" y2="14"></line>
              <line x1="8" y1="11" x2="14" y2="11"></line>
            </svg>
          </div>
        </div>
        <div class="gallery-card-body">
          <h4 class="gallery-card-title">${photo.title}</h4>
          <div class="gallery-card-meta">
            <span class="gallery-card-child">${photo.child}</span>
            <span>${photo.date}</span>
          </div>
        </div>
      `;

      card.addEventListener('click', () => {
        openLightbox(idx);
      });

      grid.appendChild(card);
    });
  }

  function openLightbox(index) {
    activeLightboxIndex = index;
    const photo = currentFilteredPhotos[activeLightboxIndex];
    if (!photo) return;

    const lightbox = document.getElementById('galleryLightbox');
    const img = document.getElementById('lightboxImg');
    const title = document.getElementById('lightboxTitle');
    const desc = document.getElementById('lightboxDesc');
    const tag = document.getElementById('lightboxTag');
    const counter = document.getElementById('lightboxCounter');

    img.src = photo.src;
    img.alt = photo.title;
    title.textContent = photo.title;
    desc.textContent = photo.desc;
    tag.textContent = photo.album.toUpperCase();
    counter.textContent = `${activeLightboxIndex + 1} of ${currentFilteredPhotos.length}`;

    lightbox.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    const lightbox = document.getElementById('galleryLightbox');
    if (lightbox) lightbox.style.display = 'none';
    document.body.style.overflow = '';
  }

  function nextLightbox() {
    activeLightboxIndex = (activeLightboxIndex + 1) % currentFilteredPhotos.length;
    openLightbox(activeLightboxIndex);
  }

  function prevLightbox() {
    activeLightboxIndex = (activeLightboxIndex - 1 + currentFilteredPhotos.length) % currentFilteredPhotos.length;
    openLightbox(activeLightboxIndex);
  }

  function initGallery() {
    renderGallery();

    document.querySelectorAll('.album-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        document.querySelectorAll('.album-pill').forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        const album = pill.getAttribute('data-album');
        const searchVal = document.getElementById('gallerySearchInput')?.value || '';
        renderGallery(album, searchVal);
      });
    });

    const searchInput = document.getElementById('gallerySearchInput');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        const query = e.target.value.trim();
        const activePill = document.querySelector('.album-pill.active');
        const album = activePill ? activePill.getAttribute('data-album') : 'all';
        renderGallery(album, query);
      });
    }

    const closeBtn = document.getElementById('lightboxCloseBtn');
    const backdrop = document.getElementById('lightboxBackdrop');
    const prevBtn = document.getElementById('lightboxPrevBtn');
    const nextBtn = document.getElementById('lightboxNextBtn');

    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
    if (backdrop) backdrop.addEventListener('click', closeLightbox);
    if (prevBtn) prevBtn.addEventListener('click', prevLightbox);
    if (nextBtn) nextBtn.addEventListener('click', nextLightbox);

    document.addEventListener('keydown', (e) => {
      const lb = document.getElementById('galleryLightbox');
      if (lb && lb.style.display === 'flex') {
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') nextLightbox();
        if (e.key === 'ArrowLeft') prevLightbox();
      }
    });
  }

  function renderInvoicesTable(statusFilter = 'all', searchQuery = '') {
    const tbody = document.getElementById('invoicesTableBody');
    if (!tbody) return;

    const invoices = getStoredInvoices();
    tbody.innerHTML = '';

    let totalPaid = 0;
    let totalPending = 0;

    invoices.forEach(inv => {
      if (inv.status === 'Paid') {
        totalPaid += inv.amount;
      } else if (inv.status === 'Pending') {
        totalPending += inv.amount;
      }
    });

    const paidEl = document.getElementById('summaryAmountPaid');
    const outEl = document.getElementById('summaryOutstanding');
    if (paidEl) paidEl.textContent = `$${totalPaid.toFixed(2)}`;
    if (outEl) outEl.textContent = `$${totalPending.toFixed(2)}`;

    const filtered = invoices.filter(inv => {
      const matchStatus = statusFilter === 'all' || inv.status.toLowerCase() === statusFilter.toLowerCase();
      const matchQuery = !searchQuery ||
        inv.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        inv.child.toLowerCase().includes(searchQuery.toLowerCase()) ||
        inv.program.toLowerCase().includes(searchQuery.toLowerCase());
      return matchStatus && matchQuery;
    });

    filtered.forEach(inv => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><span class="invoice-id-code">${inv.id}</span></td>
        <td><strong>${inv.child}</strong></td>
        <td>${inv.program}</td>
        <td>${inv.date}</td>
        <td>${inv.dueDate}</td>
        <td><strong>$${inv.amount.toFixed(2)}</strong></td>
        <td><span class="text-muted">${inv.method}</span></td>
        <td>
          <span class="table-status-pill ${inv.status.toLowerCase()}">${inv.status}</span>
        </td>
        <td class="text-right">
          <div class="table-actions-cell">
            ${inv.status === 'Pending' ? `
              <button class="dash-btn-gold btn-sm" data-action="open-pay-modal" data-invoice="${inv.id}" data-amount="${inv.amount}">
                Pay Now
              </button>
            ` : ''}
            <button class="dash-btn-outline btn-sm" data-action="view-invoice" data-invoice="${inv.id}">
              View
            </button>
          </div>
        </td>
      `;

      tbody.appendChild(tr);
    });
  }

  function openInvoiceModal(invoiceId) {
    const invoices = getStoredInvoices();
    const inv = invoices.find(i => i.id === invoiceId) || invoices[0];
    if (!inv) return;

    const body = document.getElementById('invoiceModalBody');
    const payBtn = document.getElementById('invoicePayNowBtn');

    if (payBtn) {
      if (inv.status === 'Pending') {
        payBtn.style.display = 'inline-flex';
        payBtn.onclick = () => {
          closeModal('invoiceModal');
          openPayModal(inv.id, inv.amount);
        };
      } else {
        payBtn.style.display = 'none';
      }
    }

    let itemsHtml = '';
    (inv.items || [{ desc: inv.program, price: inv.amount }]).forEach(item => {
      itemsHtml += `
        <div class="acc-detail-row">
          <span>${item.desc}</span>
          <strong>${item.price < 0 ? '-' : ''}$${Math.abs(item.price).toFixed(2)}</strong>
        </div>
      `;
    });

    body.innerHTML = `
      <div class="invoice-sheet-container">
        <div class="invoice-sheet-header">
          <div>
            <h4 class="font-heading" style="color:var(--primary-accent); font-size:1.15rem;">STRATAGEM CHESS ACADEMY</h4>
            <p class="font-sm text-muted">Invoice Ref: <strong>${inv.id}</strong> &bull; Issued ${inv.date}</p>
          </div>
          <span class="table-status-pill ${inv.status.toLowerCase()}">${inv.status}</span>
        </div>

        <div class="acc-detail-row mt-14">
          <span class="acc-lbl">Billed Guardian:</span>
          <strong>Alex Morgan (Primary Guardian)</strong>
        </div>
        <div class="acc-detail-row">
          <span class="acc-lbl">Student Name:</span>
          <strong>${inv.child}</strong>
        </div>
        <div class="acc-detail-row">
          <span class="acc-lbl">Camp Program:</span>
          <span>${inv.program}</span>
        </div>
        <div class="acc-detail-row">
          <span class="acc-lbl">Payment Due Date:</span>
          <strong style="color:var(--primary-accent);">${inv.dueDate}</strong>
        </div>

        <h5 class="mt-18 mb-10 font-heading font-sm" style="letter-spacing:0.06em; text-transform:uppercase;">Itemized Academy Statement</h5>
        <div class="invoice-items-box" style="padding:10px 14px; background:var(--theme-bg); border-radius:12px; border:1px solid var(--theme-border-subtle);">
          ${itemsHtml}
          <div class="acc-detail-row" style="border-top:2px solid var(--primary-accent); margin-top:8px; padding-top:10px;">
            <span style="font-weight:800; font-size:0.95rem;">Total Balance Due:</span>
            <span style="font-family:var(--font-heading); font-size:1.25rem; font-weight:800; color:var(--primary-accent);">$${inv.amount.toFixed(2)}</span>
          </div>
        </div>
      </div>
    `;

    openModal('invoiceModal');
  }

  function openPayModal(invoiceId, amount) {
    document.getElementById('payInvoiceId').value = invoiceId;
    document.getElementById('payAmountVal').value = amount;
    document.getElementById('payTargetInvoice').textContent = invoiceId;
    document.getElementById('payTargetAmount').textContent = `$${parseFloat(amount).toFixed(2)}`;
    openModal('payModal');
  }

  function initPayments() {
    renderInvoicesTable();

    const searchInput = document.getElementById('invoiceSearchInput');
    const statusSelect = document.getElementById('invoiceStatusFilter');

    function applyInvoiceFilters() {
      const q = searchInput ? searchInput.value.trim() : '';
      const s = statusSelect ? statusSelect.value : 'all';
      renderInvoicesTable(s, q);
    }

    if (searchInput) searchInput.addEventListener('input', applyInvoiceFilters);
    if (statusSelect) statusSelect.addEventListener('change', applyInvoiceFilters);

    const payForm = document.getElementById('payForm');
    if (payForm) {
      payForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const invoiceId = document.getElementById('payInvoiceId').value;
        const amount = document.getElementById('payAmountVal').value;
        const btn = document.getElementById('paySubmitBtn');

        btn.disabled = true;
        btn.innerHTML = `<span>Processing Demo Payment...</span>`;

        setTimeout(() => {
          btn.disabled = false;
          btn.innerHTML = `<span>Authorize Demo Payment</span>`;
          closeModal('payModal');

          const invoices = getStoredInvoices();
          const target = invoices.find(i => i.id === invoiceId);
          if (target) {
            target.status = 'Paid';
            target.method = 'Visa •••• 4242 (Simulated)';
          }
          saveStoredInvoices(invoices);
          renderInvoicesTable();

          showToast(
            'Payment Successful',
            `Invoice ${invoiceId} for $${parseFloat(amount).toFixed(2)} is settled. Receipt sent to alex.morgan@email.com.`,
            'success'
          );
        }, 800);
      });
    }

    const printBtn = document.getElementById('printInvoiceBtn');
    if (printBtn) {
      printBtn.addEventListener('click', () => {
        showToast('Printing PDF (Demo)', 'Simulating invoice download / PDF print preview.', 'info');
      });
    }
  }

  function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  function initGlobalModals() {

    document.querySelectorAll('[data-action="close-modal"]').forEach(btn => {
      btn.addEventListener('click', () => {
        const modal = btn.closest('.dash-modal');
        if (modal) {
          modal.classList.remove('open');
          document.body.style.overflow = '';
        }
      });
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        document.querySelectorAll('.dash-modal.open').forEach(modal => {
          modal.classList.remove('open');
        });
        document.body.style.overflow = '';
      }
    });

    document.addEventListener('click', (e) => {

      if (e.target.closest('[data-action="open-add-child-modal"]')) {
        e.preventDefault();
        openChildModal('add');
      }

      const editChildBtn = e.target.closest('[data-action="edit-child"]');
      if (editChildBtn) {
        e.preventDefault();
        const cid = editChildBtn.getAttribute('data-child');
        openChildModal('edit', cid);
      }

      const progressBtn = e.target.closest('[data-action="open-child-progress"]');
      if (progressBtn) {
        e.preventDefault();
        const cid = progressBtn.getAttribute('data-child');
        openChildProgressModal(cid);
      }

      if (e.target.closest('[data-action="open-enroll-modal"]')) {
        e.preventDefault();
        openModal('enrollModal');
      }

      const payTrigger = e.target.closest('[data-action="open-pay-modal"]');
      if (payTrigger) {
        e.preventDefault();
        const invId = payTrigger.getAttribute('data-invoice') || 'INV-2026-084';
        const amt = payTrigger.getAttribute('data-amount') || '280.00';
        openPayModal(invId, amt);
      }

      const viewInvTrigger = e.target.closest('[data-action="view-invoice"]');
      if (viewInvTrigger) {
        e.preventDefault();
        const invId = viewInvTrigger.getAttribute('data-invoice');
        openInvoiceModal(invId);
      }

      const filterSchedChild = e.target.closest('[data-action="filter-schedule-child"]');
      if (filterSchedChild) {
        e.preventDefault();
        const cid = filterSchedChild.getAttribute('data-child');
        switchView('schedule');
        const sel = document.getElementById('schedChildFilter');
        if (sel) {
          sel.value = cid;
          renderScheduleTimeline(cid, 'all');
        }
      }

      const viewSessionBtn = e.target.closest('[data-action="view-session"]');
      if (viewSessionBtn) {
        e.preventDefault();
        const sid = viewSessionBtn.getAttribute('data-session-id');
        const act = SCHEDULE_TIMELINE.find(a => a.id === sid);
        if (act) openSessionDetailsModal(act);
      }

      if (e.target.closest('#sidebarLogoutBtn') || e.target.closest('#profileLogoutBtn')) {
        e.preventDefault();
        openModal('logoutModal');
      }

      if (e.target.closest('[data-action="open-account-modal"]')) {
        e.preventDefault();
        openModal('accountModal');
      }

      if (e.target.closest('[data-action="open-preferences-modal"]')) {
        e.preventDefault();
        showToast('Preferences', 'Notification preferences saved (Demo prototype).', 'info');
      }

      if (e.target.closest('[data-action="open-support-modal"]')) {
        e.preventDefault();
        showToast('Academy Support', 'Academy concierge available at support@stratagemchess.com.', 'info');
      }
    });

    const childForm = document.getElementById('childForm');
    if (childForm) childForm.addEventListener('submit', handleChildFormSubmit);
  }

  function showToast(title, message, type = 'success') {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `dash-toast toast-${type}`;

    let iconSvg = '';
    if (type === 'success') {
      iconSvg = `
        <svg viewBox="0 0 20 20" fill="currentColor" class="toast-icon">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
        </svg>
      `;
    } else {
      iconSvg = `
        <svg viewBox="0 0 20 20" fill="currentColor" class="toast-icon">
          <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"/>
        </svg>
      `;
    }

    toast.innerHTML = `
      ${iconSvg}
      <div class="toast-content">
        <h5 class="toast-title">${title}</h5>
        <p class="toast-msg">${message}</p>
      </div>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(12px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  }

  document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initRTL();
    initNavigation();
    initDrawer();
    initDropdowns();
    initNotifications();
    initGlobalModals();
    initEnrollment();
    renderChildrenCards();
    initScheduleControls();
    initGallery();
    initPayments();

    if (typeof Chart !== 'undefined') {
      initSkillProgressChart();
      initCampActivityBarChart();
      initSkillDonutChart();
    } else {
      console.warn('Chart.js CDN did not load; falling back gracefully.');
    }
  });

})();
