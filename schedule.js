(function () {
  'use strict';

  const CAMP_SESSIONS = [
    {
      id: 'sess-yp-morning',
      slug: 'young-pawns',
      programName: 'Young Pawns',
      sessionTitle: 'Foundations Studio: The Royal Kingdom & Central Geometry',
      ageGroup: 'Ages 5–7',
      ageKey: 'young-pawns',
      skillLevel: 'novice',
      skillLabel: 'Novice • First Moves',
      formatKey: 'morning',
      formatLabel: 'Morning Intensive (9:00 AM – 12:30 PM)',
      days: 'Mon – Fri (2-Week Session)',
      timeHours: '9:00 AM – 12:30 PM PST',
      instructor: 'IM Elena Rostova & Certified Youth Mentors',
      studio: 'Studio Alpha • Tactile Board Room',
      ratio: 'Max 6:1 Ratio',
      seatsStatus: '4 Seats Available',
      badgeClass: 'status-available',
      badgeText: 'Filling Fast',
      price: '$495 / 2-Wk Cohort',
      image: 'assets/hero-child-chess.jpg',
      shortDesc: 'Montessori-inspired physical piece discovery, vibrant story-based character journeys, and tactile wooden boards designed for our youngest strategic minds.',
      modules: [
        'Piece personalities, rules of legal movement, and value equations',
        'Board orientation: ranks, files, diagonals, and the sovereign center',
        'King safety, gentle checkmate concepts, and early fortress building',
        'Tactile puzzle playgrounds and graceful sportsmanship etiquette'
      ],
      includes: [
        'Stratagem Junior Chess Coursebook & Notation Slate',
        'Daily digital photo update & written coach progress card',
        'Tactile wooden chess piece discovery kit',
        'Certificate of Foundational Chess Completion'
      ]
    },
    {
      id: 'sess-jk-morning',
      slug: 'junior-knights',
      programName: 'Junior Knights',
      sessionTitle: 'Tactics Arena: Forks, Skewers & Piece Coordination',
      ageGroup: 'Ages 7–9',
      ageKey: 'junior-knights',
      skillLevel: 'intermediate',
      skillLabel: 'Intermediate • Tactical Play',
      formatKey: 'morning',
      formatLabel: 'Morning Intensive (9:00 AM – 12:30 PM)',
      days: 'Mon – Fri (2-Week Session)',
      timeHours: '9:00 AM – 12:30 PM PST',
      instructor: 'GM Alexey Volkov',
      studio: 'Studio Beta • Calculation Lab',
      ratio: 'Max 6:1 Ratio',
      seatsStatus: '2 Seats Available',
      badgeClass: 'status-limited',
      badgeText: 'Almost Full',
      price: '$545 / 2-Wk Cohort',
      image: 'assets/chess-learning.jpg',
      shortDesc: 'Transition from basic rules into active tactical hunting, double attacks, knight forks, pinning mechanics, and disciplined board calculation.',
      modules: [
        'Tactical motifs: pins, skewers, discovered attacks, and deflection',
        'Vulnerable king targets and mating net patterns',
        'Clock discipline: pacing calculation and tournament scorekeeping',
        'Daily supervised practice games with personalized Grandmaster debrief'
      ],
      includes: [
        'Stratagem Intermediate Tactical Workbook (120 Curated Puzzles)',
        'Personal Staunton magnetic tournament travel set',
        'Daily game notation analysis with Grandmaster annotations',
        'Junior Tactician Summer Medal & Rating Assessment'
      ]
    },
    {
      id: 'sess-tb-fullday',
      slug: 'tactical-bishops',
      programName: 'Tactical Bishops',
      sessionTitle: 'Full-Day Immersion: Deep Calculation & Rapid Arenas',
      ageGroup: 'Ages 8–11',
      ageKey: 'tactical-bishops',
      skillLevel: 'intermediate',
      skillLabel: 'Intermediate • Tactical Play',
      formatKey: 'full-day',
      formatLabel: 'Full-Day Immersion (9:00 AM – 3:30 PM)',
      days: 'Mon – Fri (2-Week Session)',
      timeHours: '9:00 AM – 3:30 PM PST',
      instructor: 'WGM Sarah Chen & GM Alexey Volkov',
      studio: 'Arena Grand • Competition Hall',
      ratio: 'Max 6:1 Ratio',
      seatsStatus: '3 Seats Available',
      badgeClass: 'status-available',
      badgeText: 'Featured Cohort',
      price: '$795 / 2-Wk Cohort',
      image: 'assets/instructor-coaching.jpg',
      shortDesc: 'Comprehensive full-day camp pairing morning tactical masterclasses with afternoon tournament rounds, puzzle rush gauntlets, and post-game notation review.',
      modules: [
        'Mastering candidate moves and calculation branches',
        'Open vs closed board pawn structures and bishop diagonals',
        'Clock strategy under tournament conditions (G/15 + 10s)',
        'Afternoon Arena: Swiss-paired matches with GM game reviews'
      ],
      includes: [
        'Full daily camp schedule with gourmet healthy lunch & snack breaks',
        'Daily digital PGN file of student matches reviewed by Grandmasters',
        'Stratagem Tournament Competition Clock & Scorebook',
        'Entry into the Summer Junior Grand Prix Rapid Championship'
      ]
    },
    {
      id: 'sess-sr-fullday',
      slug: 'strategic-rooks',
      programName: 'Strategic Rooks',
      sessionTitle: 'Positional Mastery: Pawn Structures, Outposts & Endgames',
      ageGroup: 'Ages 10–13',
      ageKey: 'strategic-rooks',
      skillLevel: 'advanced',
      skillLabel: 'Advanced • Deep Strategy',
      formatKey: 'full-day',
      formatLabel: 'Full-Day Immersion (9:00 AM – 3:30 PM)',
      days: 'Mon – Fri (2-Week Session)',
      timeHours: '9:00 AM – 3:30 PM PST',
      instructor: 'GM Marcus Sterling',
      studio: 'Studio Master • Senior Strategy Lab',
      ratio: 'Max 6:1 Ratio',
      seatsStatus: '5 Seats Available',
      badgeClass: 'status-available',
      badgeText: 'High Demand',
      price: '$825 / 2-Wk Cohort',
      image: 'assets/strategy-thinking.jpg',
      shortDesc: 'Elevated strategic training focusing on pawn structure imbalances, rook open files, minor piece trades, and essential theoretical endgames.',
      modules: [
        'Evaluating positional imbalances and long-range strategic plans',
        'The Lucena & Philidor positions in rook and pawn endgames',
        'Counter-play against aggressive gambits and king safety sacrifices',
        'Afternoon rated challenge matches with deep tactical post-mortems'
      ],
      includes: [
        'Stratagem Master Strategy Treatise & Endgame Compendium',
        '1-on-1 private game review session with GM Marcus Sterling',
        'FIDE Notation binder and master evaluation certificate',
        'Complimentary entry into the Weekend Grandmaster Masterclass'
      ]
    },
    {
      id: 'sess-mq-afternoon',
      slug: 'master-queens',
      programName: 'Master Queens',
      sessionTitle: 'Precision Attack Studio: Dynamic Play & King Hunting',
      ageGroup: 'Ages 12–15',
      ageKey: 'master-queens',
      skillLevel: 'advanced',
      skillLabel: 'Advanced • Deep Strategy',
      formatKey: 'afternoon',
      formatLabel: 'Afternoon Arena (1:00 PM – 4:00 PM)',
      days: 'Mon – Fri (2-Week Session)',
      timeHours: '1:00 PM – 4:00 PM PST',
      instructor: 'WGM Sarah Chen & IM David Vance',
      studio: 'Studio Theta • Strategic Analysis Room',
      ratio: 'Max 6:1 Ratio',
      seatsStatus: '4 Seats Available',
      badgeClass: 'status-available',
      badgeText: 'Advanced Track',
      price: '$595 / 2-Wk Cohort',
      image: 'assets/academy-learning.jpg',
      shortDesc: 'Intense afternoon immersion for ambitious teens focusing on complex combinational sacrifices, initiative maintenance, and psychological match poise.',
      modules: [
        'Dynamic sacrifices for sustained positional initiative',
        'Opposite-side castling attacks and mating pattern recognition',
        'Time-pressure crisis management and emotional stability',
        'Modern opening repertoires: Sicilian, French, and King’s Indian'
      ],
      includes: [
        'Master Queens Advanced Repertoire USB & Lecture Transcripts',
        'Personalized tactical blindspot diagnostic report',
        'Bi-weekly blitz challenge matches against titled coaches',
        'Stratagem Collegiate Chess Preparation Reference Guide'
      ]
    },
    {
      id: 'sess-gk-fullday',
      slug: 'grandmaster-kings',
      programName: 'Grandmaster Kings',
      sessionTitle: 'FIDE Elite Tournament Intensive: Calculation & Repertoire',
      ageGroup: 'Ages 14–16',
      ageKey: 'grandmaster-kings',
      skillLevel: 'tournament',
      skillLabel: 'Tournament • FIDE Prep',
      formatKey: 'full-day',
      formatLabel: 'Full-Day Immersion (9:00 AM – 3:30 PM)',
      days: 'Mon – Fri (2-Week Session)',
      timeHours: '9:00 AM – 3:30 PM PST',
      instructor: 'GM Marcus Sterling & GM Alexey Volkov',
      studio: 'Arena High-Stakes • Master Suite',
      ratio: 'Max 6:1 Ratio',
      seatsStatus: '2 Seats Available',
      badgeClass: 'status-limited',
      badgeText: 'Top Tier Cohort',
      price: '$895 / 2-Wk Cohort',
      image: 'assets/chess-academy.jpg',
      shortDesc: 'Our highest echelon youth training camp. Deep repertoire building, engine-assisted preparation routines, psychological resilience, and tournament mastery.',
      modules: [
        'Professional opening preparation using modern database techniques',
        'Calculation depth training: blindfold visualizations and complex endgames',
        'Handling tactical chaos in critical tournament rounds',
        'Daily classical matches analyzed with two resident Grandmasters'
      ],
      includes: [
        'Lifetime access to Stratagem Masterclass Digital Archive',
        'Two 1-on-1 private repertoire design sessions with GM Marcus Sterling',
        'Official FIDE Tournament Board & Weighted Wooden Chess Set',
        'FIDE rating progression roadmap & national championship pathway'
      ]
    },
    {
      id: 'sess-wb-weekend',
      slug: 'weekend-blitz',
      programName: 'Weekend Blitz',
      sessionTitle: 'Rapid Tactics Lab & Speed Chess Arena',
      ageGroup: 'Ages 7–16',
      ageKey: 'all',
      skillLevel: 'intermediate',
      skillLabel: 'All Levels • Blitz & Rapid',
      formatKey: 'weekend',
      formatLabel: 'Weekend Blitz (10:00 AM – 2:00 PM)',
      days: 'Sat & Sun (Bi-Weekly Camp)',
      timeHours: '10:00 AM – 2:00 PM PST',
      instructor: 'IM David Vance & Guest Coaches',
      studio: 'Arena Central • Speed Chess Lab',
      ratio: 'Max 6:1 Ratio',
      seatsStatus: '6 Seats Available',
      badgeClass: 'status-available',
      badgeText: 'Weekend Special',
      price: '$345 / Weekend Cohort',
      image: 'assets/hero-chess-board.jpg',
      shortDesc: 'High-octane weekend camp centered on rapid calculation, speed puzzle rushes, blitz survival arenas, and instinctual tactical decision making under pressure.',
      modules: [
        'Speed pattern recognition and eliminating tactical blunders',
        'Blitz clock management: 3m+2s and 5m blitz tournament tactics',
        'Instinctive piece coordination and immediate trap detection',
        'Weekly Grandmaster Blitz Exhibition and simultaneous matches'
      ],
      includes: [
        'Digital Chess Clock technique guide',
        'Puzzle Rush Mastery cheat sheet & opening speed repertoire',
        'Tournament entry into the Saturday Afternoon Blitz Gauntlet',
        'Stratagem Summer Speed Chess Cap & Medal'
      ]
    }
  ];

  const DAILY_TIMELINE = [
    {
      stepNum: '01',
      time: '9:00 AM',
      title: 'Welcome & Warm-Up',
      piece: 'Pawn',
      pieceSvg: '<svg viewBox="0 0 40 40" fill="currentColor" width="26" height="26" aria-hidden="true"><circle cx="20" cy="11" r="5"/><ellipse cx="20" cy="18" rx="7" ry="2"/><path d="M16 19c0 4-2 9-4 13h16c-2-4-4-9-4-13h-8z"/><rect x="10" y="32" width="20" height="3" rx="1.5"/><rect x="8" y="35" width="24" height="2.5" rx="1"/></svg>',
      focus: 'Warm-up check-in, demonstration board puzzles, tactical icebreakers, setting daily strategic objectives.',
      highlight: 'Ignites mental alertness and camaraderie before board immersion begins.',
      format: 'Whole Group • Studio Alpha',
      side: 'top'
    },
    {
      stepNum: '02',
      time: '9:30 AM',
      title: 'Chess Foundations & Master Demo',
      piece: 'Knight',
      pieceSvg: '<svg viewBox="0 0 40 40" fill="currentColor" width="26" height="26" aria-hidden="true"><path d="M14 36h14c0-2-1-3-2-4-2-2-1-6 2-9 1-1 3-3 3-6 0-3-2-5-4-5-1 0-2 .5-3 1.5-.5-1.5-2-2.5-4-2.5s-4 1.5-4 4c0 1 .5 2 1 3-1.5 1-4 3.5-4 6 0 3 2 5 2 8 0 1-1 2-2 3v1h4z"/><circle cx="17" cy="15" r="1.5" fill="#073B3A"/><rect x="10" y="36" width="20" height="2.5" rx="1"/></svg>',
      focus: 'Interactive Grandmaster lecture on opening principles, center control, piece synergy, and historical games.',
      highlight: 'Visual demonstrations on 60-inch magnetic master demo boards.',
      format: 'Small Cohorts (6:1) • Assigned Studio',
      side: 'bottom'
    },
    {
      stepNum: '03',
      time: '10:30 AM',
      title: 'Strategy Lab & Tactical Puzzles',
      piece: 'Bishop',
      pieceSvg: '<svg viewBox="0 0 40 40" fill="currentColor" width="26" height="26" aria-hidden="true"><circle cx="20" cy="7" r="2"/><path d="M20 9c-4 0-7 4-7 8 0 3 1.5 6 3 8h8c1.5-2 3-5 3-8 0-4-3-8-7-8zm-.5 3h1v4h-1v-4z"/><ellipse cx="20" cy="26" rx="6.5" ry="1.8"/><path d="M15 27c-.5 3-2 5-3 7h16c-1-2-2.5-4-3-7h-10z"/><rect x="9" y="34.5" width="22" height="3" rx="1.5"/></svg>',
      focus: 'Paired problem solving, calculation without moving pieces (blindfold visualization), and endgame technique.',
      highlight: 'Sharpening spatial calculation and tactical pattern recognition.',
      format: 'Paired Lab Stations • Mentor Guided',
      side: 'top'
    },
    {
      stepNum: '04',
      time: '11:30 AM',
      title: 'Supervised Matchplay & Peer Arenas',
      piece: 'Rook',
      pieceSvg: '<svg viewBox="0 0 40 40" fill="currentColor" width="26" height="26" aria-hidden="true"><rect x="10" y="9" width="20" height="5" rx="1"/><rect x="13.5" y="9" width="3" height="3" fill="#073B3A"/><rect x="23.5" y="9" width="3" height="3" fill="#073B3A"/><path d="M12.5 14h15l-1.5 17.5h-12L12.5 14z"/><rect x="10" y="31.5" width="20" height="3" rx="1"/><rect x="8" y="35" width="24" height="2.5" rx="1"/></svg>',
      focus: 'Clock-timed friendly matches, tournament etiquette practice, official notation, and coach observation.',
      highlight: 'Hands-on experience with real digital tournament clocks and scorebooks.',
      format: 'Arena Pairing • Titled Coach Oversight',
      side: 'bottom'
    },
    {
      stepNum: '05',
      time: '12:30 PM',
      title: 'Chess Challenge & Team Relays',
      piece: 'Queen',
      pieceSvg: '<svg viewBox="0 0 40 40" fill="currentColor" width="26" height="26" aria-hidden="true"><circle cx="10" cy="11" r="1.5"/><circle cx="15" cy="9" r="1.5"/><circle cx="20" cy="8" r="1.8"/><circle cx="25" cy="9" r="1.5"/><circle cx="30" cy="11" r="1.5"/><path d="M10 13l5 4 5-8 5 8 5-4-2 7H12l-2-7z"/><ellipse cx="20" cy="22" rx="7" ry="1.8"/><path d="M14 23c-1 3-3 7-4 10h20c-1-3-3-7-4-10h-12z"/><rect x="9" y="33.5" width="22" height="2.5" rx="1"/><rect x="7" y="36.5" width="26" height="2.5" rx="1"/></svg>',
      focus: 'Team vs team problem-solving relays, puzzle rush gauntlets, endgame survival battles, and tactical speed runs.',
      highlight: 'High-octane celebratory energy where strategy becomes collaborative.',
      format: 'Team Arena • Interactive Big Board',
      side: 'top'
    },
    {
      stepNum: '06',
      time: '1:00 PM',
      title: 'Daily Wrap-Up & Parent Debrief',
      piece: 'King',
      pieceSvg: '<svg viewBox="0 0 40 40" fill="currentColor" width="26" height="26" aria-hidden="true"><path d="M19 5h2v6h-2zM17 7h6v2h-6z"/><path d="M20 11c-4.5 0-8 3-8 6 0 2 1.5 4 3 5h10c1.5-1 3-3 3-5 0-3-3.5-6-8-6z"/><ellipse cx="20" cy="23" rx="8" ry="2"/><path d="M13.5 24.5c-1 3-2.5 6.5-3.5 9.5h20c-1-3-2.5-6.5-3.5-9.5h-13z"/><rect x="9" y="34.5" width="22" height="2.5" rx="1"/><rect x="7" y="37.2" width="26" height="2.5" rx="1"/></svg>',
      focus: 'Review of individual tactical milestones, badge reward ceremony, take-home puzzle packet, and parent pickup.',
      highlight: 'Daily progress cards delivered directly into the parent communication app.',
      format: 'Whole Group Studio & Parent Concierge',
      side: 'bottom'
    }
  ];

  const CAMP_EVENTS = [
    {
      id: 'event-grand-prix',
      category: 'tournament',
      categoryLabel: 'TOURNAMENT CHAMPIONSHIP',
      featured: true,
      title: 'Stratagem Summer Junior Grand Prix: 5-Round Rapid Championship',
      date: 'Saturday, July 18, 2026',
      time: '10:00 AM – 3:00 PM PST',
      ageGroup: 'Ages 6–16 (Sections by Rating)',
      instructor: 'GM Marcus Sterling & WGM Sarah Chen',
      image: 'assets/chess-academy.jpg',
      format: '5-Round Rated Swiss • G/15 + 10s Digital Increment',
      capacity: '38 of 50 Competitors Registered',
      seatsRemaining: '12 Slots Open',
      capacityPercent: 76,
      statusBadge: 'Marquee Tournament • 76% Filled',
      desc: 'Our marquee mid-summer tournament! Features 5 Swiss-system rounds with digital chess clocks (G/15 + 10s increment), professional notation review with resident Grandmasters, handcrafted wooden trophies, and commemorative participation medals for every competitor.',
      specs: [
        { label: 'Time Control', val: 'G/15 + 10s Digital Increment' },
        { label: 'Tournament Sections', val: 'Championship, Reserve & Novice' },
        { label: 'Equipment Provided', val: 'DGT Electronic Clocks & Staunton Sets' },
        { label: 'Official Arbiter', val: 'National & FIDE Certified Arbiters' }
      ],
      highlights: [
        '5 Rated Swiss Rounds with certified national tournament arbiters',
        'Live demonstration board broadcasts for parents in observation lounge',
        'Post-game 1-on-1 analysis room with GM Marcus Sterling'
      ],
      perks: [
        'Official FIDE / USCF Rating',
        'Handcrafted Wooden Trophies',
        '1-on-1 Grandmaster Game Review',
        'Parent Lounge Video Stream'
      ],
      location: 'Grand Arena • Stratagem Main Campus'
    },
    {
      id: 'event-simul-exhibition',
      category: 'masterclass',
      categoryLabel: 'SPECIAL COACHING',
      featured: false,
      title: 'Grandmaster Simultaneous Exhibition & Clock Challenge',
      date: 'Saturday, July 25, 2026',
      time: '1:00 PM – 4:00 PM PST',
      ageGroup: 'Ages 8–16 (Novice to Advanced)',
      instructor: 'GM Alexey Volkov',
      image: 'assets/instructor-coaching.jpg',
      format: '20-Board Simultaneous Clock Challenge',
      capacity: '16 of 20 Boards Reserved',
      seatsRemaining: 'Only 4 Boards Left',
      capacityPercent: 80,
      statusBadge: 'Strictly 20 Boards • 80% Reserved',
      desc: 'An unforgettable masterclass where GM Alexey Volkov takes on 20 camp students simultaneously on beautiful Staunton wooden boards. Students test their openings against elite defense and receive personalized feedback.',
      specs: [
        { label: 'Board Limit', val: 'Strictly 20 Boards Max' },
        { label: 'Time Control', val: 'Students 45m / GM Volkov 90m' },
        { label: 'Equipment', val: 'Triple-Weighted Staunton Wood' },
        { label: 'Takeaway Gift', val: 'Signed Master Notation Sheet' }
      ],
      highlights: [
        'Limited to 20 student boards for optimal 1-on-1 interaction',
        'Commemorative scoresheet signed by GM Alexey Volkov',
        'Medals awarded to any student who draws or triumphs'
      ],
      perks: [
        'Staunton Wood Sets Provided',
        'Signed GM Scoresheet',
        'Victory & Draw Medals',
        'Personalized Post-Game Critique'
      ],
      location: 'Studio Alpha • Grandmaster Suite'
    },
    {
      id: 'event-endgame-workshop',
      category: 'workshop',
      categoryLabel: 'STRATEGY WORKSHOP',
      featured: false,
      title: 'Mastering King & Pawn Endgames Intensive Workshop',
      date: 'Saturday, August 1, 2026',
      time: '10:30 AM – 1:30 PM PST',
      ageGroup: 'Ages 9–16 (Intermediate & Advanced)',
      instructor: 'IM Elena Rostova',
      image: 'assets/strategy-thinking.jpg',
      format: 'Interactive Calculation & Theoretical Lab',
      capacity: '19 of 24 Seats Claimed',
      seatsRemaining: '5 Seats Remaining',
      capacityPercent: 79,
      statusBadge: 'Theory Intensive • 79% Filled',
      desc: 'A laser-focused 3-hour theoretical workshop unlocking the secrets of opposition, triangulation, the square of the pawn, and breakthrough sacrifices that turn drawish endgames into decisive victories.',
      specs: [
        { label: 'Theory Core', val: 'Opposition, Triangulation, Pawn Sacs' },
        { label: 'Practical Drills', val: 'Physical Board Blindfold Drills' },
        { label: 'Study Booklet', val: '40-Page Treatise with Solutions' },
        { label: 'Recommended Elo', val: 'Rating 850–1600 Bracket' }
      ],
      highlights: [
        'Physical board calculation drills without moving pieces',
        'Take-home 40-page Endgame Mastery booklet with solutions',
        'Interactive blitz test at conclusion of session'
      ],
      perks: [
        '40-Page Theory Compendium',
        'Blindfold Calculation Drills',
        'Certificate of Mastery',
        'End-of-Session Blitz Gauntlet'
      ],
      location: 'Studio Master • Room 402'
    },
    {
      id: 'event-puzzle-rush',
      category: 'activity',
      categoryLabel: 'CAMP ARENA',
      featured: false,
      title: 'Summer Tactics Puzzle Rush Invitational & Blitz Arena',
      date: 'Friday, August 7, 2026',
      time: '2:00 PM – 5:00 PM PST',
      ageGroup: 'Ages 7–15 (All Skill Brackets)',
      instructor: 'IM David Vance',
      image: 'assets/hero-chess-board.jpg',
      format: 'Speed Tactics Gauntlet & 4-Player Relays',
      capacity: '22 of 30 Spots Reserved',
      seatsRemaining: '8 Spots Open',
      capacityPercent: 73,
      statusBadge: 'High-Energy Arena • 73% Filled',
      desc: 'A dynamic, high-energy speed tactics festival! Students compete in timed tactical puzzle gauntlets, solving escalating combinations on touch monitors and giant magnetic demo boards.',
      specs: [
        { label: 'Competition Format', val: 'Individual Sprints + Team Relays' },
        { label: 'Interactive Tech', val: '65" Touch Magnetic Demo Monitors' },
        { label: 'Prizes & Honors', val: 'Tactics Champion Cup & Medals' },
        { label: 'Hospitality', val: 'Artisanal Pastries & Fresh Juice' }
      ],
      highlights: [
        'Individual and team puzzle rush relay competitions',
        'Instant digital scoreboards with celebratory milestone badges',
        'Healthy refreshments and celebratory award presentation'
      ],
      perks: [
        'Digital Touch Demo Screens',
        'Milestone Achievement Badges',
        'Puzzle Rush Trophy & Medals',
        'Catered Healthy Refreshments'
      ],
      location: 'Arena Central • Interactive Lounge'
    },
    {
      id: 'event-family-bughouse',
      category: 'activity',
      categoryLabel: 'CAMP ARENA',
      featured: false,
      title: 'Parent-Child Bughouse & Doubles Chess Gala',
      date: 'Saturday, August 15, 2026',
      time: '11:00 AM – 2:30 PM PST',
      ageGroup: 'Open to All Camp Families',
      instructor: 'Stratagem Faculty',
      image: 'assets/camp-experience.jpg',
      format: 'Family Doubles & Bughouse Tournament',
      capacity: '26 of 32 Teams Registered',
      seatsRemaining: '6 Team Slots Left',
      capacityPercent: 81,
      statusBadge: 'Annual Camp Gala • 81% Booked',
      desc: 'Our beloved end-of-summer family gala! Students team up with a parent, sibling, or mentor in the joyful, high-speed variant of Bughouse chess where captured pieces can be dropped back onto the board.',
      specs: [
        { label: 'Team Structure', val: '1 Student + 1 Parent or Sibling' },
        { label: 'Game Variant', val: 'Official 4-Player Bughouse Chess' },
        { label: 'Catering Included', val: 'Artisanal Brunch & Dessert Bar' },
        { label: 'Ceremony', val: 'Summer 2026 Recognition Honors' }
      ],
      highlights: [
        'Relaxed, laughter-filled family team competition',
        'Introductory tutorial on Bughouse team communication tactics',
        'Catered artisanal brunch & Summer Camp Recognition Ceremony'
      ],
      perks: [
        'Family Team Matchplay',
        'Tactics Communication Briefing',
        'Artisanal Catered Brunch',
        'Season Trophy Presentation'
      ],
      location: 'Main Auditorium & Courtyard'
    }
  ];

  let currentFilters = {
    cohort: 'all',
    level: 'all',
    format: 'all',
    search: ''
  };

  let currentEventCategory = 'all';
  let activeSecondaryIndex = 0;
  let activeModalSession = null;
  let activeModalEvent = null;

  function renderSessions() {
    const feed = document.getElementById('schSessionsFeed');
    const emptyState = document.getElementById('schEmptyState');
    const counter = document.getElementById('resultsCounter');
    if (!feed) return;

    const filtered = CAMP_SESSIONS.filter(session => {

      if (currentFilters.cohort !== 'all') {
        if (session.ageKey !== currentFilters.cohort && session.ageKey !== 'all') {
          return false;
        }
      }

      if (currentFilters.level !== 'all') {
        if (session.skillLevel !== currentFilters.level) {
          return false;
        }
      }

      if (currentFilters.format !== 'all') {
        if (session.formatKey !== currentFilters.format) {
          return false;
        }
      }

      if (currentFilters.search.trim() !== '') {
        const q = currentFilters.search.toLowerCase();
        const matchTitle = session.sessionTitle.toLowerCase().includes(q);
        const matchProg = session.programName.toLowerCase().includes(q);
        const matchCoach = session.instructor.toLowerCase().includes(q);
        const matchDesc = session.shortDesc.toLowerCase().includes(q);
        if (!matchTitle && !matchProg && !matchCoach && !matchDesc) {
          return false;
        }
      }

      return true;
    });

    if (counter) {
      counter.textContent = `Showing ${filtered.length} of ${CAMP_SESSIONS.length} Sessions`;
    }

    if (filtered.length === 0) {
      feed.innerHTML = '';
      if (emptyState) emptyState.hidden = false;
      return;
    }

    if (emptyState) emptyState.hidden = true;

    feed.innerHTML = filtered.map((sess, idx) => {
      const isWide = idx % 3 === 0;
      return `
        <article class="sch-card ${isWide ? 'card-wide' : 'card-standard'} reveal-on-scroll" data-session-id="${sess.id}">
          <div class="card-inner">

            <div class="card-media-col">
              <div class="card-img-wrap">
                <img src="${sess.image}" alt="${sess.sessionTitle}" class="card-thumb-img" loading="lazy">
                <span class="card-badge-pill ${sess.badgeClass}">${sess.badgeText}</span>
              </div>
            </div>

            <div class="card-content-col">
              <div class="card-meta-header">
                <div class="cohort-tag-row">
                  <span class="cohort-name-tag">${sess.programName}</span>
                  <span class="cohort-age-tag">${sess.ageGroup}</span>
                </div>
                <div class="meta-right-group">
                  <span class="skill-tag">${sess.skillLabel}</span>
                  <span class="card-price-tag">${sess.price}</span>
                </div>
              </div>

              <h4 class="card-title">${sess.sessionTitle}</h4>

              <div class="card-spec-grid">
                <div class="spec-item">
                  <span class="spec-label">Camp Timetable</span>
                  <strong class="spec-val">${sess.timeHours}</strong>
                </div>
                <div class="spec-item">
                  <span class="spec-label">Format &amp; Ratio</span>
                  <strong class="spec-val">${sess.studio} (${sess.ratio})</strong>
                </div>
                <div class="spec-item">
                  <span class="spec-label">Lead Mentor</span>
                  <strong class="spec-val">${sess.instructor}</strong>
                </div>
                <div class="spec-item">
                  <span class="spec-label">Availability</span>
                  <strong class="spec-val status-val">${sess.seatsStatus}</strong>
                </div>
              </div>

              <p class="card-desc">${sess.shortDesc}</p>

              <div class="card-curriculum-chips">
                <span class="curriculum-chip-label">Key Topics:</span>
                ${sess.modules.slice(0, 2).map(m => `<span class="curriculum-chip">${m}</span>`).join('')}
              </div>

              <div class="card-inclusions-strip">
                <span class="inc-bullet" aria-hidden="true">&#10003;</span>
                <span><strong>Included:</strong> ${sess.includes.slice(0, 2).join(' &bull; ')}</span>
              </div>

              <div class="card-footer-actions">
                <button type="button" class="sch-btn-secondary card-view-btn" data-session-id="${sess.id}">
                  <span>View Details</span>
                  <span aria-hidden="true">&rarr;</span>
                </button>
                <a href="programs-details.html?program=${sess.slug}" class="sch-btn-primary card-enroll-btn">
                  <span>Enroll in Cohort</span>
                </a>
              </div>

            </div>

          </div>
        </article>
      `;
    }).join('');

    const viewBtns = feed.querySelectorAll('.card-view-btn');
    viewBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-session-id');
        const session = CAMP_SESSIONS.find(s => s.id === id);
        if (session) openSessionModal(session);
      });
    });

    initScrollReveal();
  }

  function renderDailyTimeline() {
    const track = document.getElementById('dailyTimelineTrack');
    if (!track) return;

    track.innerHTML = DAILY_TIMELINE.map((item, index) => {
      const isTop = item.side === 'top';
      return `
        <div class="sch-timeline-col ${isTop ? 'col-top' : 'col-bottom'} reveal-on-scroll" data-step="${item.stepNum}">

          <!-- Top Row Slot -->
          <div class="timeline-slot slot-top">
            ${isTop ? `
              <div class="node-card">
                <div class="node-time-strip">
                  <span class="node-time">${item.time}</span>
                  <span class="node-piece-tag">${item.piece}</span>
                </div>
                <h4 class="node-title">${item.title}</h4>
                <p class="node-focus">${item.focus}</p>
                <div class="node-highlight-box">
                  <span class="highlight-icon" aria-hidden="true">&#9733;</span>
                  <span class="highlight-text">${item.highlight}</span>
                </div>
              </div>
              <div class="timeline-connector-stem stem-down" aria-hidden="true"></div>
            ` : ''}
          </div>

          <!-- Central Fixed Milestone Marker Row -->
          <div class="timeline-marker-row">
            <div class="node-milestone-marker" aria-label="Step ${item.stepNum}: ${item.title} (${item.piece})">
              <div class="marker-circle">
                ${item.pieceSvg}
              </div>
              <span class="marker-step-tag">${item.stepNum}</span>
            </div>
          </div>

          <!-- Bottom Row Slot -->
          <div class="timeline-slot slot-bottom">
            ${!isTop ? `
              <div class="timeline-connector-stem stem-up" aria-hidden="true"></div>
              <div class="node-card">
                <div class="node-time-strip">
                  <span class="node-time">${item.time}</span>
                  <span class="node-piece-tag">${item.piece}</span>
                </div>
                <h4 class="node-title">${item.title}</h4>
                <p class="node-focus">${item.focus}</p>
                <div class="node-highlight-box">
                  <span class="highlight-icon" aria-hidden="true">&#9733;</span>
                  <span class="highlight-text">${item.highlight}</span>
                </div>
              </div>
            ` : ''}
          </div>

        </div>
      `;
    }).join('');
  }

  function renderEvents() {
    const grid = document.getElementById('eventsGridContainer');
    if (!grid) return;

    const filteredEvents = CAMP_EVENTS.filter(evt => {
      if (currentEventCategory === 'all') return true;
      return evt.category === currentEventCategory;
    });

    if (filteredEvents.length === 0) {
      grid.innerHTML = `
        <div class="events-empty-box">
          <p>No special events currently scheduled in this category. Please check back soon or browse our full summer tournament calendar.</p>
        </div>
      `;
      return;
    }

    const primary = filteredEvents.find(e => e.featured) || filteredEvents[0];
    let secondaries = filteredEvents.filter(e => e.id !== primary.id);

    if (secondaries.length === 0) {
      secondaries = CAMP_EVENTS.filter(e => e.id !== primary.id);
    }

    if (activeSecondaryIndex >= secondaries.length) {
      activeSecondaryIndex = 0;
    }
    const secondary = secondaries[activeSecondaryIndex] || secondaries[0];

    function createCardHTML(evt, isPrimary) {
      const isTournament = evt.category === 'tournament';
      const regButtonText = isTournament ? 'Register for Tournament' : 'Reserve Seat';
      const briefButtonText = isTournament ? 'View Tournament Brief' : 'View Session Brief';
      const capacityLabel = isTournament ? 'Tournament Capacity' : 'Seat Availability';
      const capacityState = isTournament ? 'Registered' : 'Reserved';
      const highlightsHeading = isTournament ? 'Championship Highlights &amp; Features:' : 'Session Highlights &amp; Takeaways:';

      return `
        <article class="event-featured-card reveal-on-scroll" data-event-id="${evt.id}">
          <div class="featured-media-frame event-media-frame">
            <img src="${evt.image}" alt="${evt.title}" class="featured-img event-img" loading="lazy">
            <div class="featured-overlay event-overlay"></div>
            <div class="featured-category-badge event-category-badge">${evt.categoryLabel}</div>
            <div class="featured-status-pill event-status-pill">
              <span class="pulse-dot" aria-hidden="true"></span>
              <span>${evt.statusBadge}</span>
            </div>
            ${isPrimary ? `
              <div class="event-media-nav event-featured-tag">
                <span class="featured-star" aria-hidden="true">&#9733;</span>
                <span>HEADLINE EVENT</span>
              </div>
            ` : (secondaries.length > 1 ? `
              <div class="event-media-nav" aria-label="Event session navigation">
                <button type="button" class="sec-nav-btn sec-nav-prev" data-dir="-1" title="Previous Session" aria-label="Previous Session">&lsaquo;</button>
                <span class="sec-nav-indicator">Session ${activeSecondaryIndex + 1} of ${secondaries.length}</span>
                <button type="button" class="sec-nav-btn sec-nav-next" data-dir="1" title="Next Session" aria-label="Next Session">&rsaquo;</button>
              </div>
            ` : '')}
          </div>

          <div class="featured-content event-card-content">
            <div class="event-date-row">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16" aria-hidden="true">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                <line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/>
                <line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
              <span class="event-date-text">${evt.date} &bull; ${evt.time}</span>
            </div>

            <h3 class="featured-title event-card-title">${evt.title}</h3>

            <div class="event-meta-pill-row">
              <span class="event-meta-chip">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="12" height="12" aria-hidden="true"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>
                ${evt.ageGroup}
              </span>
              <span class="event-meta-chip">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="12" height="12" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                ${evt.location}
              </span>
              <span class="event-meta-chip mentor-chip">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="12" height="12" aria-hidden="true"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                ${evt.instructor}
              </span>
              <span class="event-meta-chip format-chip">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="12" height="12" aria-hidden="true"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
                ${evt.format}
              </span>
            </div>

            <p class="featured-desc event-card-desc">${evt.desc}</p>

            <!-- Specifications Matrix -->
            <div class="event-spec-matrix">
              ${evt.specs.map(s => `
                <div class="matrix-spec-item">
                  <span class="matrix-spec-label">${s.label}</span>
                  <strong class="matrix-spec-val" title="${s.val}">${s.val}</strong>
                </div>
              `).join('')}
            </div>

            <!-- Highlights List -->
            <div class="featured-highlights-list event-highlights-list">
              <span class="highlights-box-title">${highlightsHeading}</span>
              ${evt.highlights.map(h => `
                <div class="highlight-bullet">
                  <span class="h-check" aria-hidden="true">&#10003;</span>
                  <span>${h}</span>
                </div>
              `).join('')}
            </div>

            <!-- Live Registration Capacity Meter -->
            <div class="event-capacity-container">
              <div class="capacity-header-row">
                <span class="capacity-info-text">
                  <strong>${capacityLabel}:</strong> ${evt.capacity} (${evt.capacityPercent}% ${capacityState})
                </span>
                <span class="capacity-pill-highlight">${evt.seatsRemaining}</span>
              </div>
              <div class="capacity-track" role="progressbar" aria-valuenow="${evt.capacityPercent}" aria-valuemin="0" aria-valuemax="100">
                <div class="capacity-fill" style="width: ${evt.capacityPercent}%;"></div>
              </div>
            </div>

            <!-- Included Amenities & Perks -->
            <div class="event-perks-row">
              ${evt.perks.map(p => `
                <span class="perk-chip">
                  <span class="perk-star" aria-hidden="true">&#10022;</span>
                  <span>${p}</span>
                </span>
              `).join('')}
            </div>

            <!-- Bottom Actions Row (Pinned to Bottom) -->
            <div class="featured-actions-row event-actions-row">
              <button type="button" class="sch-btn-primary event-register-btn" data-event-id="${evt.id}">
                <span>${regButtonText}</span>
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14" aria-hidden="true">
                  <path d="M6 3L11 8L6 13" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
              <button type="button" class="sch-btn-secondary event-details-btn" data-event-id="${evt.id}">
                <span>${briefButtonText}</span>
              </button>
            </div>
          </div>
        </article>
      `;
    }

    grid.innerHTML = `
      <!-- LEFT / FEATURED PRIMARY EVENT CARD -->
      ${createCardHTML(primary, true)}

      <!-- RIGHT / COMPANION EVENT CARD -->
      ${createCardHTML(secondary, false)}

      <!-- Full-Width Bottom Ticker Banner Spanning Both Columns -->
      <div class="event-ticker-card reveal-on-scroll">
        <div class="ticker-icon" aria-hidden="true">&#9670;</div>
        <div class="ticker-text">
          <strong>Summer Tournament &amp; Masterclass Pass:</strong> Full cohort access, notation analysis, and priority seat reservation included with camp enrollment.
        </div>
      </div>
    `;

    const prevBtn = grid.querySelector('.sec-nav-prev');
    const nextBtn = grid.querySelector('.sec-nav-next');
    if (prevBtn) {
      prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        activeSecondaryIndex = (activeSecondaryIndex - 1 + secondaries.length) % secondaries.length;
        renderEvents();
      });
    }
    if (nextBtn) {
      nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        activeSecondaryIndex = (activeSecondaryIndex + 1) % secondaries.length;
        renderEvents();
      });
    }

    const regBtns = grid.querySelectorAll('.event-register-btn');
    regBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-event-id');
        const evt = CAMP_EVENTS.find(e => e.id === id);
        if (evt) openEventModal(evt);
      });
    });

    const detBtns = grid.querySelectorAll('.event-details-btn');
    detBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-event-id');
        const evt = CAMP_EVENTS.find(e => e.id === id);
        if (evt) openEventModal(evt);
      });
    });

    initScrollReveal();
  }

  function openSessionModal(session) {
    activeModalSession = session;
    const backdrop = document.getElementById('sessionModalBackdrop');
    if (!backdrop) return;

    document.getElementById('modalSessionCohort').textContent = `${session.programName} • ${session.ageGroup}`;
    document.getElementById('sessionModalTitle').textContent = session.sessionTitle;
    document.getElementById('modalSessionTime').textContent = session.timeHours;
    document.getElementById('modalSessionLevel').textContent = session.skillLabel;
    document.getElementById('modalSessionFormat').textContent = `${session.studio} (${session.ratio})`;
    document.getElementById('modalSessionInstructor').textContent = session.instructor;
    document.getElementById('modalSessionDesc').textContent = session.shortDesc;

    const bulletsList = document.getElementById('modalSessionBullets');
    if (bulletsList) {
      bulletsList.innerHTML = [
        ...session.modules.map(m => `<li><strong>Focus:</strong> ${m}</li>`),
        ...session.includes.map(inc => `<li><strong>Includes:</strong> ${inc}</li>`)
      ].join('');
    }

    const enrollBtn = document.getElementById('modalEnrollBtn');
    if (enrollBtn) {
      enrollBtn.onclick = () => {
        closeSessionModal();
        window.location.href = `programs-details.html?program=${session.slug}`;
      };
    }

    backdrop.classList.add('is-open');
    backdrop.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeSessionModal() {
    const backdrop = document.getElementById('sessionModalBackdrop');
    if (!backdrop) return;
    backdrop.classList.remove('is-open');
    backdrop.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function openEventModal(evt) {
    activeModalEvent = evt;
    const backdrop = document.getElementById('eventModalBackdrop');
    if (!backdrop) return;

    document.getElementById('modalEventCategory').textContent = evt.categoryLabel;
    document.getElementById('eventModalTitle').textContent = evt.title;
    document.getElementById('modalEventDate').textContent = evt.date;
    document.getElementById('modalEventTime').textContent = `${evt.time} (${evt.location})`;

    backdrop.classList.add('is-open');
    backdrop.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeEventModal() {
    const backdrop = document.getElementById('eventModalBackdrop');
    if (!backdrop) return;
    backdrop.classList.remove('is-open');
    backdrop.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function initModals() {

    const sessionClose = document.getElementById('sessionModalClose');
    const sessionCancel = document.getElementById('modalCloseActionBtn');
    const sessionBackdrop = document.getElementById('sessionModalBackdrop');

    if (sessionClose) sessionClose.addEventListener('click', closeSessionModal);
    if (sessionCancel) sessionCancel.addEventListener('click', closeSessionModal);
    if (sessionBackdrop) {
      sessionBackdrop.addEventListener('click', (e) => {
        if (e.target === sessionBackdrop) closeSessionModal();
      });
    }

    const eventClose = document.getElementById('eventModalClose');
    const eventBackdrop = document.getElementById('eventModalBackdrop');
    const eventForm = document.getElementById('eventRegForm');

    if (eventClose) eventClose.addEventListener('click', closeEventModal);
    if (eventBackdrop) {
      eventBackdrop.addEventListener('click', (e) => {
        if (e.target === eventBackdrop) closeEventModal();
      });
    }

    if (eventForm) {
      eventForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const submitBtn = eventForm.querySelector('.form-submit-btn');
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.innerHTML = '<span>Reserving Player Seat...</span>';
        }

        setTimeout(() => {
          closeEventModal();
          showToast(`Seat reserved for ${activeModalEvent ? activeModalEvent.title : 'Event'}! Our admissions concierge will email your confirmation pack.`);
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<span>Confirm Event Reservation</span>';
          }
          eventForm.reset();
        }, 1200);
      });
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeSessionModal();
        closeEventModal();
      }
    });
  }

  function showToast(message) {
    let toast = document.getElementById('schToast');
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('is-visible');
    setTimeout(() => {
      toast.classList.remove('is-visible');
    }, 3600);
  }

  function initFilterListeners() {

    const cohortPills = document.querySelectorAll('#cohortFilterPills .cohort-pill');
    cohortPills.forEach(pill => {
      pill.addEventListener('click', () => {
        cohortPills.forEach(p => {
          p.classList.remove('active');
          p.setAttribute('aria-checked', 'false');
        });
        pill.classList.add('active');
        pill.setAttribute('aria-checked', 'true');
        currentFilters.cohort = pill.getAttribute('data-cohort');
        renderSessions();
      });
    });

    const levelSelect = document.getElementById('schLevelSelect');
    if (levelSelect) {
      levelSelect.addEventListener('change', () => {
        currentFilters.level = levelSelect.value;
        renderSessions();
      });
    }

    const formatSelect = document.getElementById('schFormatSelect');
    if (formatSelect) {
      formatSelect.addEventListener('change', () => {
        currentFilters.format = formatSelect.value;
        renderSessions();
      });
    }

    const searchInput = document.getElementById('schSearchInput');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        currentFilters.search = e.target.value;
        renderSessions();
      });
    }

    const resetBtn = document.getElementById('filterResetBtn');
    const emptyResetBtn = document.getElementById('emptyResetBtn');

    function resetFilters() {
      currentFilters = {
        cohort: 'all',
        level: 'all',
        format: 'all',
        search: ''
      };

      cohortPills.forEach(p => {
        const isAll = p.getAttribute('data-cohort') === 'all';
        p.classList.toggle('active', isAll);
        p.setAttribute('aria-checked', String(isAll));
      });

      if (levelSelect) levelSelect.value = 'all';
      if (formatSelect) formatSelect.value = 'all';
      if (searchInput) searchInput.value = '';

      renderSessions();
      showToast('Schedule filters reset to All Cohorts.');
    }

    if (resetBtn) resetBtn.addEventListener('click', resetFilters);
    if (emptyResetBtn) emptyResetBtn.addEventListener('click', resetFilters);

    const eventTabs = document.querySelectorAll('.sch-event-tabs-bar .event-tab');
    eventTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        eventTabs.forEach(t => {
          t.classList.remove('active');
          t.setAttribute('aria-selected', 'false');
        });
        tab.classList.add('active');
        tab.setAttribute('aria-selected', 'true');
        currentEventCategory = tab.getAttribute('data-category');
        activeSecondaryIndex = 0;
        renderEvents();
      });
    });
  }

  function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal-on-scroll:not(.is-visible)');
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
      threshold: 0.05
    });

    revealElements.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        el.classList.add('is-visible');
      } else {
        observer.observe(el);
      }
    });
  }

  function initSmoothScroll() {
    const heroExploreBtn = document.getElementById('heroExploreBtn');
    if (heroExploreBtn) {
      heroExploreBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.getElementById('scheduleExplorer');
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    }
  }

  function init() {
    renderSessions();
    renderDailyTimeline();
    renderEvents();
    initFilterListeners();
    initModals();
    initSmoothScroll();
    initScrollReveal();

    window.addEventListener('strataThemeChanged', () => {

      initScrollReveal();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
