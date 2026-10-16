(function () {
  'use strict';

  const PROGRAMS_DATA = {
    'young-pawns': {
      slug: 'young-pawns',
      name: 'Young Pawns',
      eyebrow: 'CHESS FOUNDATIONS & FIRST MOVES',
      headline: 'MASTER THE FIRST MOVE.',
      ageGroup: 'Ages 5–7',
      skillLevel: 'Novice • First Moves & Discovery',
      duration: '2-Week Intensive (Mon–Fri)',
      schedule: '9:30 AM – 12:30 PM PST',
      format: 'Small Group Studio (Max 6:1 Ratio)',
      tuition: 'Contact for Pricing',
      tuitionNote: 'Sibling bursary & early registration options available',
      heroImage: 'assets/program-young-pawns.jpg',
      heroAlt: 'Young Pawns early childhood chess discovery and board awareness',
      shortDesc: 'An engaging introduction to chess where young learners develop board awareness, understand the rules, explore their first strategies, and build confidence through guided play.',
      about: 'The Young Pawns program is specially crafted for our youngest thinkers aged 5 to 7. Utilizing Montessori-inspired physical piece discovery, vibrant story-based character journeys, and tactile wooden boards, our certified junior coaches demystify the royal game. Children develop sustained concentration, spatial reasoning, emotional composure, and the pure joy of tactical discovery in a nurturing, playful environment.',
      modules: [
        {
          num: '01',
          title: 'The Royal Kingdom & Piece Identities',
          desc: 'Children learn piece personalities, movement rules, values, and how the proud King and Queen command their loyal defenders.'
        },
        {
          num: '02',
          title: 'Board Geometry & Central Awareness',
          desc: 'Exploration of ranks, files, diagonals, and the four sovereign center squares that govern all strategic initiative.'
        },
        {
          num: '03',
          title: 'The King’s Sanctuary & Castling Secrets',
          desc: 'King defense, understanding check and checkmate, preventing early beginner traps, and practicing safe castle fortification.'
        },
        {
          num: '04',
          title: 'Tactical Playgrounds & Match Etiquette',
          desc: 'Friendly student matches, graceful sportsmanship, handshakes before and after play, and celebrated daily puzzle solving.'
        }
      ],
      objectives: [
        'Recognize and legally move all six chess piece types without hesitation.',
        'Sustain 35+ minutes of continuous, joyful focus during guided board activities.',
        'Demonstrate authentic sportsmanship, congratulating peers with genuine poise.',
        'Navigate the 64-square grid with intuitive spatial vision and square naming.'
      ],
      skills: [
        { name: 'Spatial Vision', desc: 'Understanding diagonal, lateral, and vertical piece vectors' },
        { name: 'Attentive Focus', desc: 'Prolonging uninterrupted task immersion and patience' },
        { name: 'Gracious Sportsmanship', desc: 'Celebrating peer success and handling setbacks with grace' },
        { name: 'Rule Discipline', desc: 'Respecting boundaries, turns, and thoughtful touch-move norms' }
      ],
      methodology: 'Our early childhood coaches employ the "Tactile Story Method." Rather than memorizing abstract coordinate notation, children interact with large wooden pieces, physical movement maps, colorful puzzle illustrations, and celebratory daily accomplishment ribbons.',
      activities: [
        'Pawn Wars & Knight Jumping obstacle courses on physical boards',
        'Daily "Find the King" hide-and-seek spatial awareness challenges',
        'Collaborative pair-solving on magnetic grandmaster demo boards',
        'Coach-supervised mini-matches with gentle verbal feedback'
      ],
      outcomes: [
        'Complete mastery of chess rules, piece movements, and capture mechanics',
        'Demonstrable increase in early spatial reasoning and visual memory',
        'Readiness to advance into structured tactical problem solving in Knight Tacticians'
      ],
      gallery: [
        { src: 'assets/hero-child-chess.jpg', title: 'Tactile Learning', caption: 'Individual tactile piece guidance with dedicated mentors.' },
        { src: 'assets/academy-learning.jpg', title: 'Studio Collaboration', caption: 'Children analyzing opening moves in small cohorts.' },
        { src: 'assets/camp-experience.jpg', title: 'Joyful Achievement', caption: 'Daily milestones celebrated with peer camaraderie.' }
      ],
      plans: [
        {
          id: 'yp-standard',
          name: 'STANDARD IMMERSION',
          badge: 'Most Popular',
          price: 'Contact for Pricing',
          period: 'Per 2-Week Session',
          desc: 'Complete foundational camp curriculum with certified youth trainers.',
          features: [
            'Daily 3-hour morning coaching sessions (Mon–Fri)',
            'Maximum 6:1 student-to-mentor studio ratio',
            'Stratagem Junior Chess Coursebook & Notation Slate',
            'Daily digital photo update & written coach progress note',
            'Certificate of Foundational Chess Completion'
          ]
        },
        {
          id: 'yp-plus',
          name: 'STUDIO PLUS',
          badge: 'Recommended',
          price: 'Contact for Pricing',
          period: 'Per 2-Week Session',
          desc: 'Includes afternoon guided puzzle labs and personalized tactical debriefs.',
          features: [
            'All Standard Immersion inclusions',
            '1-hour daily afternoon supervised tactical puzzle club',
            '1:1 weekly 30-minute private mentor check-in',
            'Official Stratagem Weighted Wooden Chess Set & Board',
            'Priority enrollment for Fall Academy Weekend leagues'
          ]
        },
        {
          id: 'yp-fellowship',
          name: 'ACADEMY FELLOWSHIP',
          badge: 'Comprehensive',
          price: 'Contact for Pricing',
          period: 'Full 4-Week Summer',
          desc: 'Comprehensive multi-week immersion with complete cognitive assessment.',
          features: [
            'Full 4-week dual session coverage (Foundations + Tactics Intro)',
            'Comprehensive developmental cognitive milestone dossier',
            'Bi-weekly private parent strategy consultation',
            'Lifetime membership to Stratagem Digital Problem Library',
            'Complimentary Academy Team Blazer & Tournament Bag'
          ]
        }
      ],
      faqs: [
        {
          q: 'Does my child need any prior chess experience to join Young Pawns?',
          a: 'No prior experience is necessary! Young Pawns is specifically designed for complete beginners as well as children who know how pieces move but have not yet developed structured board concepts.'
        },
        {
          q: 'What is the student-to-coach ratio in the Young Pawns studio?',
          a: 'We strictly maintain a maximum ratio of 6 students per coach. This ensures every child receives attentive, individualized guidance, constant encouragement, and gentle correction.'
        },
        {
          q: 'How long are daily sessions and what is the schedule?',
          a: 'Sessions run Monday through Friday from 9:30 AM to 12:30 PM PST. The three hours are divided into engaging 25-minute learning blocks interspersed with movement breaks, snacks, and playful interactive drills.'
        },
        {
          q: 'What materials does my child receive on the first day?',
          a: 'Each student receives a personalized Stratagem Academy student folder, tactile coordinate puzzle sheets, child-friendly chess markers, and their own tournament badge.'
        },
        {
          q: 'Can parents observe the coaching sessions?',
          a: 'Parents are welcome to attend the final 20 minutes of each Friday session to witness peer demonstrations, celebrate weekly accomplishments, and review progress portfolios with our mentors.'
        },
        {
          q: 'What program does my child progress to after Young Pawns?',
          a: 'Upon demonstrating confident piece coordination and board mastery, students typically graduate into our Knight Tacticians program (Ages 8–11) or our Summer Blitz & Problem Solving workshops.'
        }
      ]
    },

    'knight-tacticians': {
      slug: 'knight-tacticians',
      name: 'Knight Tacticians',
      eyebrow: 'STRATEGIC THINKING & TACTICAL WEAPONRY',
      headline: 'CALCULATE THE WINNING LINE.',
      ageGroup: 'Ages 8–11',
      skillLevel: 'Intermediate • Tactics & Combinations',
      duration: '2-Week Intensive (Mon–Fri)',
      schedule: '1:00 PM – 4:30 PM PST',
      format: 'Tactical Studio & Lab (Max 8:1 Ratio)',
      tuition: 'Contact for Pricing',
      tuitionNote: 'Tuition includes tournament notation diary & puzzle handbook',
      heroImage: 'assets/program-knight-tactics.jpg',
      heroAlt: 'Knight Tacticians tactical calculation and multi-step foresight',
      shortDesc: 'Master essential tactical weapons — forks, pins, skewers, and discoveries — while cultivating multi-step calculation, opening balance, and calm tournament clock discipline.',
      about: 'Knight Tacticians is our premier intermediate program for children aged 8 to 11 who understand chess rules and are ready to calculate like true strategists. Students explore the core tactical motifs that decide over 85% of competitive youth games. Under the tutelage of FIDE certified masters, scholars learn how to spot vulnerabilities, coordinate minor pieces, and maintain psychological composure under clock constraints.',
      modules: [
        {
          num: '01',
          title: 'The Tactical Arsenal: Pins, Forks & Skewers',
          desc: 'Deconstructing devastating geometric combinations, double attacks, royal knight forks, and absolute pin exploitation.'
        },
        {
          num: '02',
          title: 'Opening Geometry & Center Domination',
          desc: 'Mastering classical pawn structures, rapid king safety, initiative acquisition, and refuting common opening blunders.'
        },
        {
          num: '03',
          title: 'Middle-Game Coordinates & Outposts',
          desc: 'Establishing dominant knight outposts, opening rook files, calculating sacrifices, and creating checkmating nets.'
        },
        {
          num: '04',
          title: 'Timed Simulation & Notation Mastery',
          desc: 'Daily 15-minute rapid rated games with live digital clocks, strict scoresheet recording, and post-game coach analysis.'
        }
      ],
      objectives: [
        'Calculate 3-to-4 ply candidate move sequences before touching any piece.',
        'Identify 12 standard tactical motifs within 15 seconds on physical demo boards.',
        'Fluently record complete games using standard international algebraic notation.',
        'Demonstrate disciplined clock management under a 15-minute time control.'
      ],
      skills: [
        { name: 'Multi-Step Calculation', desc: 'Mentally projecting 3 to 4 moves into future board configurations' },
        { name: 'Tactical Pattern Acuity', desc: 'Instinctively detecting overloaded pieces and weak back ranks' },
        { name: 'Emotional Composure', desc: 'Remaining calm and analytical when defending difficult positions' },
        { name: 'Notation Literacy', desc: 'Accurately writing algebraic move notations for post-game study' }
      ],
      methodology: 'We combine rigorous puzzle ladders, grandmaster game reconstructions on demo boards, digital clock simulations, and mandatory peer debriefs where students explain their candidate move evaluations aloud.',
      activities: [
        'Daily "Blunder Buster" tactical diagnostic challenges',
        'Interactive Master Reenactment: Playing through Tal & Morphy attack gems',
        'Digital clock training matches with increment simulation (15+10)',
        'Post-mortem game analysis with coach red-pen notation critiques'
      ],
      outcomes: [
        'Dramatic reduction in unforced single-move tactical blunders',
        'Confident ability to plan multi-piece attacks against enemy kings',
        'Full readiness for regional youth tournament and scholastic league competition'
      ],
      gallery: [
        { src: 'assets/strategy-thinking.jpg', title: 'Tactical Analysis', caption: 'Scholars evaluating candidate move trees.' },
        { src: 'assets/instructor-coaching.jpg', title: 'Master Mentorship', caption: 'Individual post-game game notation review.' },
        { src: 'assets/chess-details.jpg', title: 'Studio Environment', caption: 'Quiet concentration in our Silicon Valley tactical studio.' }
      ],
      plans: [
        {
          id: 'kt-standard',
          name: 'TACTICAL INTENSIVE',
          badge: 'Standard',
          price: 'Contact for Pricing',
          period: 'Per 2-Week Session',
          desc: 'Full tactical syllabus covering all core motifs and clock training.',
          features: [
            'Daily 3.5-hour afternoon tactical sessions (Mon–Fri)',
            'Maximum 8:1 student-to-mentor studio ratio',
            'Stratagem Tactical Workbook: 300 Curated Combinations',
            'Daily digital scoresheet archive with coach comments',
            'Tournament Clock Certification of Completion'
          ]
        },
        {
          id: 'kt-plus',
          name: 'CHAMPIONSHIP PREP',
          badge: 'Most Popular',
          price: 'Contact for Pricing',
          period: 'Per 2-Week Session',
          desc: 'Adds customized opening repertoire blueprint and 1:1 master review.',
          features: [
            'All Tactical Intensive inclusions',
            'Personalized White & Black opening repertoire guide',
            'Two 45-minute 1:1 private Grandmaster analytical debriefs',
            'Digital chess engine analysis report of all camp games',
            'Stratagem Executive Leather Notation Binder'
          ]
        },
        {
          id: 'kt-summer',
          name: 'GRANDMASTER TRACK',
          badge: 'Elite',
          price: 'Contact for Pricing',
          period: 'Full Summer Pass',
          desc: 'Complete seasonal access across Knight Tacticians and Scholars seminars.',
          features: [
            'Full 4-week access (Knight Tacticians + Scholar Seminars)',
            'Weekly private mentor lessons with FIDE International Masters',
            'Official FIDE Arbiter rules certification module',
            'Lifetime VIP portal access to Stratagem tactics engine',
            'Custom engraved Stratagem Academy Trophy'
          ]
        }
      ],
      faqs: [
        {
          q: 'What skill level is required for Knight Tacticians?',
          a: 'Students should be familiar with all basic rules, understand check and checkmate, and have played at least 15 to 20 full games. If your child is unsure, we provide a quick 10-minute friendly placement assessment.'
        },
        {
          q: 'Do students use digital chess clocks in class?',
          a: 'Yes. Learning clock management is an integral component of Knight Tacticians. We train with digital tournament clocks using classical and rapid delay/increment settings.'
        },
        {
          q: 'How is notation taught and why is it important?',
          a: 'Students learn standard algebraic notation from Day 1. Writing down moves reinforces mental calculation, discipline, and allows coaches to conduct thorough game debriefs.'
        },
        {
          q: 'What is the schedule for Knight Tacticians?',
          a: 'Sessions run Monday through Friday from 1:00 PM to 4:30 PM PST at our Silicon Valley campus.'
        },
        {
          q: 'Are homework puzzles assigned between sessions?',
          a: 'Optional daily "Master Puzzles" (15 minutes) are provided in their workbook. Students who complete their puzzle passport earn celebratory tactical pins!'
        },
        {
          q: 'Can students transition into FIDE Tournament Prep from here?',
          a: 'Yes! Knight Tacticians is the direct developmental springboard into FIDE Tournament Prep and Grandmaster Scholars.'
        }
      ]
    },

    'grandmaster-scholars': {
      slug: 'grandmaster-scholars',
      name: 'Grandmaster Scholars',
      eyebrow: 'ADVANCED POSITIONAL CALCULATIONS & ENDGAMES',
      headline: 'ELEVATE POSITIONAL MASTERY.',
      ageGroup: 'Ages 12–16',
      skillLevel: 'Advanced • Positional Calculation & Endgames',
      duration: '3-Week Fellowship (Mon–Fri)',
      schedule: '10:00 AM – 3:30 PM PST',
      format: 'Advanced Seminar & Master Studio (Max 6:1 Ratio)',
      tuition: 'Contact for Pricing',
      tuitionNote: 'Includes Grandmaster engine-free analysis and symposium materials',
      heroImage: 'assets/program-gm-scholars.jpg',
      heroAlt: 'Grandmaster Scholars advanced calculation, evaluation, and endgames',
      shortDesc: 'Rigorous training in deep positional evaluation, pawn skeleton dynamics, prophylactic defense, and master endgame technique guided by senior FIDE trainers.',
      about: 'Grandmaster Scholars is an intellectually immersive fellowship for dedicated young chess scholars aged 12 to 16. Stepping beyond short-term tactical strikes, scholars study positional harmony, imbalances, prophylactic maneuvering (preventing opponent ideas before they manifest), and the exacting science of endgame conversions. Designed to build the intellectual foundation of national master candidates.',
      modules: [
        {
          num: '01',
          title: 'Positional Evaluation & Pawn Architecture',
          desc: 'Assessing static vs. dynamic advantages, pawn islands, backward pawns, outpost creation, and color-complex weaknesses.'
        },
        {
          num: '02',
          title: 'The Art of Prophylaxis & Defensive Resourcefulness',
          desc: 'Cultivating the instinct to detect subtle opponent threats, neutralize counterplay, and defend difficult endgames with tenacity.'
        },
        {
          num: '03',
          title: 'Master-Level Endgame Technique',
          desc: 'In-depth study of Lucena and Philidor positions, rook activity, opposition, triangulation, and king infiltration paths.'
        },
        {
          num: '04',
          title: 'Deep Candidate Calculation & Blindfold Vision',
          desc: 'Blindfold board exercises, calculating 5-to-7 ply trees without moving physical pieces, and systematic candidate pruning.'
        }
      ],
      objectives: [
        'Formulate coherent 15-move strategic plans based on positional imbalances.',
        'Execute 12 fundamental theoretical rook and pawn endgames with zero technical errors.',
        'Accurately calculate deep 6-ply candidate branches under tournament time pressure.',
        'Deconstruct classical masterpieces from Nimzowitsch, Botvinnik, and Karpov.'
      ],
      skills: [
        { name: 'Positional Evaluation', desc: 'Discerning subtle advantages in space, piece activity, and pawn structure' },
        { name: 'Deep Tree Calculation', desc: 'Visualizing multi-branch candidate trees without moving physical pieces' },
        { name: 'Endgame Precision', desc: 'Translating positional advantages into decisive technical conversions' },
        { name: 'Prophylactic Intuition', desc: 'Anticipating and neutralizing opponent counter-plans in advance' }
      ],
      methodology: 'High-intensity seminar format: Engine-free physical board analysis, blindfold mental geometry drills, collegiate strategy symposiums, and deep post-mortem peer presentations.',
      activities: [
        'Daily 60-minute classical rated match with complete post-mortem review',
        'Blindfold pawn structure and knight destination visualization tests',
        'Endgame laboratory: Playing out won and drawn grandmaster theoretical positions',
        'Student-led master game tactical breakdown symposiums'
      ],
      outcomes: [
        'Elevated USCF / FIDE performance rating readiness (1600–2100+ target trajectory)',
        'Superior mental stamina required for 3-to-4 hour tournament rounds',
        'Intellectual poise and analytical maturity extending into advanced academic disciplines'
      ],
      gallery: [
        { src: 'assets/chess-academy.jpg', title: 'Grandmaster Studio', caption: 'Collegiate seminar environment with international masters.' },
        { src: 'assets/luxury-knight.jpg', title: 'Positional Study', caption: 'Analyzing strategic outposts on executive Staunton boards.' },
        { src: 'assets/cinematic-frame-4.jpg', title: 'Scholarly Debate', caption: 'Scholars defending candidate evaluations in peer symposiums.' }
      ],
      plans: [
        {
          id: 'gs-fellowship',
          name: 'FELLOWSHIP SEMINAR',
          badge: 'Standard Track',
          price: 'Contact for Pricing',
          period: 'Per 3-Week Fellowship',
          desc: 'Complete 3-week advanced seminar curriculum with Senior FIDE Trainers.',
          features: [
            'Daily 5.5-hour advanced seminar sessions (Mon–Fri)',
            'Maximum 6:1 scholar-to-grandmaster ratio',
            'Complete Grandmaster Endgame Compendium & Repertoire Files',
            'Full engine analytical dossier of all classical camp games',
            'Stratagem Senior Scholar Certificate & USCF rating debrief'
          ]
        },
        {
          id: 'gs-master',
          name: 'MASTER CANDIDATE',
          badge: 'Most Selective',
          price: 'Contact for Pricing',
          period: 'Per 3-Week Fellowship',
          desc: 'Includes 1:1 private Grandmaster opening preparation and mental conditioning.',
          features: [
            'All Fellowship Seminar inclusions',
            'Three 60-minute private 1:1 coaching sessions with GM Marcus Lindqvist',
            'Personalized ChessBase opening preparation tree (.pgn files)',
            'Sports psychology & tournament stamina coaching sessions',
            'Exclusive invite to Autumn Grandmaster Invitational Blitz Arena'
          ]
        },
        {
          id: 'gs-residency',
          name: 'SUMMER RESIDENCY',
          badge: 'Full Season',
          price: 'Contact for Pricing',
          period: 'Full 6-Week Summer Residency',
          desc: 'Comprehensive dual-session residency preparing for national championships.',
          features: [
            'Complete 6-week residency (Scholars + Tournament Immersion)',
            'Weekly private Grandmaster mentoring throughout summer',
            'FIDE tournament entry sponsorship & on-site coach accompaniment',
            'Comprehensive written analytical appraisal for college applications',
            'Custom handcrafted luxury walnut analysis set'
          ]
        }
      ],
      faqs: [
        {
          q: 'What rating or experience level is expected for Grandmaster Scholars?',
          a: 'Scholars typically hold an active USCF/FIDE rating of 1200+ or have demonstrated comparable tactical acumen in our diagnostic interview. We welcome passionate unrated players who demonstrate advanced analytical maturity.'
        },
        {
          q: 'Are personal laptops or tablets required for software analysis?',
          a: 'The academy provides dedicated workstations equipped with ChessBase, Stockfish, and master game databases. Students are also welcome to bring personal laptops for PGN repertoire synchronization.'
        },
        {
          q: 'How does this program prepare students for college admissions?',
          a: 'Chess at this level demonstrates sustained intellectual dedication, analytical rigor, and resilience under pressure. Our Grandmasters provide detailed academic recommendation letters for verified residency fellows.'
        },
        {
          q: 'Who leads the instruction for Grandmaster Scholars?',
          a: 'Instruction is directed by GM Marcus Lindqvist (Senior FIDE Trainer) alongside Woman International Master Elena Rostova.'
        },
        {
          q: 'What is the daily schedule?',
          a: 'Sessions run Monday through Friday from 10:00 AM to 3:30 PM PST, including a healthy catered lunch and mindful physical movement breaks.'
        },
        {
          q: 'Can scholars participate in both Scholars and FIDE Tournament Prep?',
          a: 'Yes, our 6-Week Summer Residency seamlessly combines both programs for students seeking an intensive pre-national championship summer.'
        }
      ]
    },

    'strategy-masterclass': {
      slug: 'strategy-masterclass',
      name: 'Masterclass Strategy Immersion',
      eyebrow: 'EXECUTIVE STRATEGY & DECISION MODELING',
      headline: 'THINK LIKE A GRANDMASTER.',
      ageGroup: 'Ages 10–16',
      skillLevel: 'Executive • Strategic Thinking & Game Theory',
      duration: '2-Week Executive Seminar (Mon–Fri)',
      schedule: '1:30 PM – 5:00 PM PST',
      format: 'Collegiate Masterclass (Max 8:1 Ratio)',
      tuition: 'Contact for Pricing',
      tuitionNote: 'Includes Decision Science Workbook & Game Theory case study dossier',
      heroImage: 'assets/program-endgame-strategy.jpg',
      heroAlt: 'Masterclass Strategy Immersion decision modeling and grandmaster psychology',
      shortDesc: 'Bridges grandmaster chess strategy with real-world decision modeling, game theory, risk assessment, and executive psychological composure.',
      about: 'Masterclass Strategy Immersion is a transformative seminar that extends chess mastery into high-stakes real-world thinking. Students examine how the principles of the 64 squares — capital allocation, time value, risk vs. reward, strategic equilibrium, and psychological warfare — mirror strategic decision-making in competitive academia, leadership, and negotiation.',
      modules: [
        {
          num: '01',
          title: 'Game Theory & Strategic Equilibrium',
          desc: 'Zero-sum dynamics, dominant strategies, prisoner’s dilemmas, and calculating counter-intuitive tactical sacrifices for long-term equity.'
        },
        {
          num: '02',
          title: 'Psychological Dynamics & Competitive Composure',
          desc: 'Managing tilt under severe clock pressure, reading body language, poker-faced presence, and maintaining emotional resilience.'
        },
        {
          num: '03',
          title: 'Deconstructing Historical Masterpieces',
          desc: 'Analyzing the visionary decisions of Kasparov, Tal, and modern AI engines like AlphaZero through a strategic lens.'
        },
        {
          num: '04',
          title: 'The Executive Decision Lab',
          desc: 'Simulated crisis decision-making, resource allocation trade-offs, and defending strategic proposals in mock collegiate debriefs.'
        }
      ],
      objectives: [
        'Apply structured decision trees to assess risk vs. reward within seconds.',
        'Deconstruct complex volatile situations into underlying systemic leverage points.',
        'Sustain supreme psychological composure and objectivity when confronting adversity.',
        'Synthesize chess strategic principles into written leadership and academic briefs.'
      ],
      skills: [
        { name: 'Decision Architecture', desc: 'Evaluating probabilities, expected value, and worst-case safeguards' },
        { name: 'Psychological Composure', desc: 'Mastering pulse and breath control during high-pressure crises' },
        { name: 'Game Theory Modeling', desc: 'Understanding interdependent choices and competitive equilibria' },
        { name: 'Persuasive Articulation', desc: 'Defending analytical conclusions clearly before peer review boards' }
      ],
      methodology: 'Socratic seminar dialogues, case-study discussions, simultaneous exhibitions against international masters, stress-testing under speed clocks, and executive strategy debates.',
      activities: [
        'Simultaneous exhibition matches with GM feedback on decision bottlenecks',
        'Time-pressured crisis simulations: Reversing deteriorating board positions',
        'Case-study workshops connecting chess gambits to real-world strategic breakthroughs',
        'Socratic debates defending candidate moves against adversarial coach critique'
      ],
      outcomes: [
        'Unshakable intellectual poise during competitive school exams and interviews',
        'Sophisticated understanding of how strategic patience compounds into decisive victory',
        'Lifelong framework for evaluating choices, calculating risks, and achieving goals'
      ],
      gallery: [
        { src: 'assets/home2-strategy.jpg', title: 'Macro Strategy', caption: 'Deconstructing global board imbalances.' },
        { src: 'assets/instructor-hero.jpg', title: 'Executive Lecture', caption: 'Grandmaster guest seminars on psychological resilience.' },
        { src: 'assets/cinematic-frame-6.jpg', title: 'Interactive Seminar', caption: 'Collaborative team decision modeling workshops.' }
      ],
      plans: [
        {
          id: 'sm-seminar',
          name: 'EXECUTIVE SEMINAR',
          badge: 'Standard',
          price: 'Contact for Pricing',
          period: 'Per 2-Week Seminar',
          desc: 'Full 2-week collegiate strategy syllabus with certified master trainers.',
          features: [
            'Daily 3.5-hour afternoon seminars (Mon–Fri)',
            'Maximum 8:1 scholar-to-mentor seminar ratio',
            'Stratagem Executive Strategy Case Study Dossier',
            'Simultaneous Exhibition entry against guest Grandmasters',
            'Executive Certificate in Strategic Decision Science'
          ]
        },
        {
          id: 'sm-leadership',
          name: 'LEADERSHIP FELLOWSHIP',
          badge: 'Most Popular',
          price: 'Contact for Pricing',
          period: 'Per 2-Week Seminar',
          desc: 'Adds 1:1 decision coaching and personalized strategic cognitive profile.',
          features: [
            'All Executive Seminar inclusions',
            'Two 1:1 cognitive decision-making debriefs with academy directors',
            'Comprehensive written Strategic Decision Style Profile',
            'Exclusive VIP invitation to the Executive Alumni Strategy Dinner',
            'Executive Brass Chess Emblem Paperweight'
          ]
        },
        {
          id: 'sm-master',
          name: 'SUMMER STRATEGY DUAL',
          badge: 'Premier Dual',
          price: 'Contact for Pricing',
          period: 'Full 4-Week Immersion',
          desc: 'Combines Strategy Immersion with Grandmaster Scholars for total mastery.',
          features: [
            'Full 4-week dual registration (Strategy Immersion + Grandmaster Scholars)',
            'Continuous 1:1 mentorship throughout the entire summer',
            'Personalized letter of analytical recommendation from Grandmaster panel',
            'VIP pass to all 2026 academy masterclasses and exhibition matches',
            'Custom engraved walnut strategy travel set'
          ]
        }
      ],
      faqs: [
        {
          q: 'Is this program suitable for non-competitive chess players?',
          a: 'Absolutely! While strong chess familiarity is helpful, this program focuses primarily on decision science, psychology, and strategic architecture rather than pure opening memorization.'
        },
        {
          q: 'How does this course benefit students outside of chess?',
          a: 'Students report dramatic improvements in analytical writing, debate, standardized test composure (SAT/ACT), mathematical problem solving, and confidence during high-stakes academic interviews.'
        },
        {
          q: 'What is the format of the daily sessions?',
          a: 'Each 3.5-hour session includes an interactive lecture, collaborative small-group case studies, board demonstrations, and a live strategic exercise or tournament round.'
        },
        {
          q: 'Are high school students eligible for academic credit?',
          a: 'We provide an official 40-hour Certificate of Strategic Decision Science and a formal syllabus description that many independent schools accept for enrichment credit.'
        },
        {
          q: 'Who should enroll in Masterclass Strategy Immersion?',
          a: 'Ambitious middle and high school students who want to develop executive thinking habits, mental toughness, and a profound appreciation for strategic depth.'
        },
        {
          q: 'What is the minimum age for this program?',
          a: 'The program is designed for students aged 10 to 16. Highly mature 9-year-olds with strong academic aptitude may be admitted following a director consultation.'
        }
      ]
    },

    'fide-tournament-prep': {
      slug: 'fide-tournament-prep',
      name: 'FIDE Tournament Prep',
      eyebrow: 'COMPETITIVE READINESS & RATED EXCELLENCE',
      headline: 'PREPARE FOR THE ARENA.',
      ageGroup: 'Ages 8–16',
      skillLevel: 'Competitive • Rated & Tournament Active Players',
      duration: '2-Week Championship Bootcamp (Mon–Fri)',
      schedule: '9:00 AM – 3:00 PM PST',
      format: 'Simulated Tournament Arena (Max 8:1 Ratio)',
      tuition: 'Contact for Pricing',
      tuitionNote: 'Includes official FIDE rated simulation events & arbiter reviews',
      heroImage: 'assets/program-fide-prep.jpg',
      heroAlt: 'FIDE Tournament Prep official competitive readiness and clock mastery',
      shortDesc: 'Comprehensive championship preparation: build custom opening repertoires, master increment clock management, and simulate official FIDE rated conditions.',
      about: 'FIDE Tournament Prep is an intensive championship training camp engineered for ambitious junior players preparing for state championships, national qualifiers, and international FIDE rated opens. Under the guidance of certified FIDE arbiters and international trainers, players master official tournament protocols, time controls with increment, psychological endurance, and custom opening repertoires.',
      modules: [
        {
          num: '01',
          title: 'Custom Opening Repertoire Architecture',
          desc: 'Constructing robust, personalized opening arsenals for White (1.e4 or 1.d4) and Black against all major master systems.'
        },
        {
          num: '02',
          title: 'Official FIDE Regulations & Arbiter Standards',
          desc: 'Mastering touch-move discipline, illegal move claims, 50-move and threefold repetition rules, and scoresheet precision.'
        },
        {
          num: '03',
          title: 'Digital Clock & Increment Management',
          desc: 'Managing time scrambles, calculating during opponent’s clock time, and converting increment (30-second additions) into victory.'
        },
        {
          num: '04',
          title: 'Daily Classical Rated Simulation Matches',
          desc: 'Full classical time-control matches under real tournament conditions, silent arena rules, and complete post-game analysis.'
        }
      ],
      objectives: [
        'Eliminate early opening phase inaccuracies across 15 standard master lines.',
        'Achieve 100% scoresheet recording accuracy during rapid and classical games.',
        'Demonstrate zero time-trouble panic under 2 minutes with increment.',
        'Conduct professional post-game analytical debriefs with certified coaches.'
      ],
      skills: [
        { name: 'Tournament Protocol', desc: 'Strict mastery of touch-move, arbiter summons, and formal draw claims' },
        { name: 'Opening System Repertoire', desc: 'Memorizing 12 to 15 moves deep into tailored personal opening trees' },
        { name: 'Time Pressure Stamina', desc: 'Calm calculation during time scrambles with digital clock increments' },
        { name: 'Competitive Resilience', desc: 'Bouncing back vigorously after a difficult match loss' }
      ],
      methodology: 'Arena immersion: Real digital tournament clocks, silent playing hall etiquette, formal scoresheets, certified FIDE arbiter supervision, and personalized daily game diagnostic reports.',
      activities: [
        'Daily 90-minute tournament simulation match with formal clock rules',
        'One-on-one opening repertoire flashcard testing with master coaches',
        'Speed endgame conversion under 60-second sudden death pressure',
        'Psychological decompression and physical posture conditioning'
      ],
      outcomes: [
        'Complete readiness to win trophies in regional, national, and FIDE rated tournaments',
        'Elimination of administrative forfeits, notation disputes, or clock panic',
        'Significant upward momentum in official national and international ratings'
      ],
      gallery: [
        { src: 'assets/event-championship.jpg', title: 'Tournament Hall', caption: 'Strict tournament lighting and regulation digital clocks.' },
        { src: 'assets/cinematic-frame-8.jpg', title: 'Repertoire Building', caption: 'Individual opening preparation with international trainers.' },
        { src: 'assets/instructor-03.jpg', title: 'Arbiter Guidance', caption: 'Certified instruction in official FIDE competition guidelines.' }
      ],
      plans: [
        {
          id: 'ftp-bootcamp',
          name: 'CHAMPIONSHIP BOOTCAMP',
          badge: 'Standard',
          price: 'Contact for Pricing',
          period: 'Per 2-Week Bootcamp',
          desc: 'Full competitive preparation curriculum with daily classical matches.',
          features: [
            'Daily 6-hour tournament arena sessions (Mon–Fri)',
            'Maximum 8:1 student-to-trainer arena ratio',
            'Personalized PGN Opening Repertoire file package',
            'Daily classical match with full coach notation debrief',
            'FIDE Competition Readiness Certification'
          ]
        },
        {
          id: 'ftp-rated',
          name: 'RATED ARENA PRO',
          badge: 'Recommended',
          price: 'Contact for Pricing',
          period: 'Per 2-Week Bootcamp',
          desc: 'Adds official tournament entry support and 1:1 master game preparation.',
          features: [
            'All Championship Bootcamp inclusions',
            'Three 45-minute 1:1 private Grandmaster opening preparation sessions',
            'Pre-round opponent scouting and psychological preparation guide',
            'Official Stratagem DGT North American Tournament Digital Clock',
            'Guaranteed entry into Stratagem Summer Rated Grand Prix'
          ]
        },
        {
          id: 'ftp-national',
          name: 'NATIONAL SQUAD',
          badge: 'Elite Squad',
          price: 'Contact for Pricing',
          period: 'Full Summer Squad',
          desc: 'Comprehensive seasonal squad training for national championship contenders.',
          features: [
            'Full 4-week squad training (Tournament Prep + Masterclass Immersion)',
            'Weekly private coaching with FIDE Grandmasters throughout summer',
            'On-site coach accompaniment at regional summer open tournaments',
            'Complete custom repertoire book printed in executive hardcover',
            'Custom embroidered Stratagem National Squad Team Jacket'
          ]
        }
      ],
      faqs: [
        {
          q: 'What rating is required to enter FIDE Tournament Prep?',
          a: 'Students should ideally hold a USCF or FIDE rating of 1000+ or have played in at least two rated scholastic tournaments. Unrated students with active online ratings of 1400+ (Chess.com/Lichess) are also eligible following assessment.'
        },
        {
          q: 'Do matches played in camp count toward official ratings?',
          a: 'We host both simulated practice matches and sanctioned rated weekend events where official USCF/FIDE rating points can be earned.'
        },
        {
          q: 'What time controls are used during the daily simulation matches?',
          a: 'We train with standard classical controls: G/45;d5, G/60;+30, and G/90;+30 to replicate actual state and national championship conditions.'
        },
        {
          q: 'Are opening repertoires customized to each student?',
          a: 'Yes! Coaches evaluate each student’s playing style (tactical, positional, aggressive, solid) to build a personalized opening repertoire suited to their strengths.'
        },
        {
          q: 'What is the camp schedule?',
          a: 'Sessions run Monday through Friday from 9:00 AM to 3:00 PM PST. Lunch is provided, followed by light outdoor mental rejuvenation activities.'
        },
        {
          q: 'What gear should students bring each day?',
          a: 'Students receive an official tournament bag on Day 1 containing an official digital clock, scoresheet notebook, and regulation tournament board.'
        }
      ]
    },

    'weekend-blitz': {
      slug: 'weekend-blitz',
      name: 'Summer Blitz & Problem Solving',
      eyebrow: 'RAPID TACTICS & HIGH-OCTANE PROBLEM SOLVING',
      headline: 'LIGHTNING SPEED. SHARP TACTICS.',
      ageGroup: 'All Ages (6–16)',
      skillLevel: 'All Skill Levels • Grouped by Rating & Age',
      duration: '1-Week Sprint or Multi-Session Flex',
      schedule: '2:00 PM – 5:30 PM PST',
      format: 'Rapid Arena & Puzzle Rush Lab (Max 10:1 Ratio)',
      tuition: 'Contact for Pricing',
      tuitionNote: 'Flexible 1-week, 2-week, or drop-in pass options available',
      heroImage: 'assets/program-summer-blitz.jpg',
      heroAlt: 'Summer Blitz and Problem Solving high-speed tactical calculations and puzzle rush',
      shortDesc: 'High-octane rapid chess, puzzle rush competitions, creative pattern recognition, and instinctual tactical combinations in an energetic summer arena.',
      about: 'Summer Blitz & Problem Solving is our most vibrant, high-energy program! Perfect for players who love fast-paced calculations, thrilling tactical puzzle rushes, and rapid games with clocks. Students sharpen their intuitive pattern recognition, learn how to calculate in split seconds, and experience the joyous thrill of tournament blitz in a positive, supportive team atmosphere.',
      modules: [
        {
          num: '01',
          title: 'Puzzle Rush Speed Calculation',
          desc: 'Training the subconscious eye to spot mate-in-two, back-rank weaknesses, and tactical combinations in under 10 seconds.'
        },
        {
          num: '02',
          title: 'Intuitive Attack & King Storms',
          desc: 'Executing aggressive sacrifices, pawn storms, and dynamic king hunts without wasting critical clock time.'
        },
        {
          num: '03',
          title: 'Clock Strategy for Rapid & Blitz (3+2 & 5+3)',
          desc: 'Managing increment time controls, playing with clean finger technique, and making solid candidate moves under time pressure.'
        },
        {
          num: '04',
          title: 'Daily Summer Blitz Arena & Team Relays',
          desc: 'Exciting Swiss-system blitz tournaments, bughouse team chess, puzzle rush relays, and daily trophy presentations.'
        }
      ],
      objectives: [
        'Increase rapid pattern recognition speed by over 40% across 50 core motifs.',
        'Accurately solve 150+ curated tactical puzzle themes per week.',
        'Execute clean clock technique in 3-minute and 5-minute blitz formats.',
        'Foster joyful peer camaraderie, enthusiasm, and sportsmanship.'
      ],
      skills: [
        { name: 'Instant Pattern Vision', desc: 'Immediate recognition of common tactical motifs and tactical forks' },
        { name: 'Mental Agility', desc: 'Rapid cognitive processing and decision-making under ticking clocks' },
        { name: 'Blitz Clock Technique', desc: 'Hitting the clock smoothly with the same hand used to move the piece' },
        { name: 'Joyful Resilience', desc: 'Bouncing back instantly and enjoying friendly, energetic competition' }
      ],
      methodology: 'Gamified puzzle rush ladders, interactive live commentary by Grandmasters, digital leaderboards, bughouse team chess, and celebratory daily medal ceremonies.',
      activities: [
        'Daily "Puzzle Rush Speed Championship" with live visual leaderboards',
        'Bughouse (Team 2v2) strategy and tactical cooperation matches',
        'Coach-commentated Blitz Arena: Fun live analysis of student games',
        'Endgame blitz gauntlets: Converting winning positions in 60 seconds'
      ],
      outcomes: [
        'Razor-sharp tactical reflexes that dramatically improve regular game play',
        'Elimination of overthinking on straightforward tactical conversions',
        'Huge boost in chess enthusiasm, love for the game, and lasting friendships'
      ],
      gallery: [
        { src: 'assets/hero-chess-board.jpg', title: 'Puzzle Rush Fun', caption: 'High-energy tactical puzzle rush solving.' },
        { src: 'assets/cinematic-frame-2.jpg', title: 'Blitz Matches', caption: 'Exciting rapid games with tournament digital clocks.' },
        { src: 'assets/home2-tournament-cadets.jpg', title: 'Camaraderie & Awards', caption: 'Daily celebratory medals and sportsmanship honors.' }
      ],
      plans: [
        {
          id: 'wb-sprint',
          name: '1-WEEK BLITZ SPRINT',
          badge: 'Flexible',
          price: 'Contact for Pricing',
          period: 'Per 1-Week Sprint',
          desc: 'Perfect high-energy one-week tactical boost for summer schedules.',
          features: [
            'Daily 3.5-hour afternoon blitz & puzzle lab (Mon–Fri)',
            'Maximum 10:1 student-to-coach dynamic ratio',
            'Stratagem Blitz Tactics Passport with 250 puzzle challenges',
            'Entry into Daily Afternoon Blitz Arena Tournaments',
            'Custom Summer Blitz Medal of Achievement'
          ]
        },
        {
          id: 'wb-pass',
          name: 'ALL-SUMMER BLITZ PASS',
          badge: 'Best Value',
          price: 'Contact for Pricing',
          period: 'Multi-Week Flex Pass',
          desc: 'Attend any three weeks throughout the summer with maximum flexibility.',
          features: [
            'Access to 3 full weeks of Summer Blitz & Problem Solving',
            'Stratagem Official Speed Chess Tournament Mat & Pieces',
            'Weekly private 30-minute tactical diagnostic consultation',
            'Priority seating in the Grandmaster Simultaneous Blitz Showdown',
            'Official Stratagem Blitz Champion Hoodie'
          ]
        },
        {
          id: 'wb-combo',
          name: 'FULL-DAY CAMP COMBO',
          badge: 'Complete Day',
          price: 'Contact for Pricing',
          period: 'Combined Morning + Afternoon',
          desc: 'Combine morning classical programs with afternoon Blitz for full-day camp.',
          features: [
            'Full day immersion: Morning Program + Afternoon Blitz Arena',
            'Complimentary healthy catered lunch and mindful breaks',
            'Comprehensive multi-discipline student progress report',
            'Two weekly 1:1 master tactical debriefs',
            'Special family rate discount for siblings'
          ]
        }
      ],
      faqs: [
        {
          q: 'Is my child too young or too inexperienced for blitz chess?',
          a: 'Not at all! We group students strictly by age and ability. Younger beginners play with generous time controls (10 minutes) and focus on fun puzzle rushes, while older scholars enjoy 3-minute and 5-minute games.'
        },
        {
          q: 'What is Bughouse and do students play it?',
          a: 'Bughouse is a wildly popular 2v2 chess variant where pieces captured by one partner are passed to the other to drop on their board. It teaches teamwork, visual alertness, and is a beloved camp favorite!'
        },
        {
          q: 'Can this program be paired with morning programs?',
          a: 'Yes! Many families combine a morning classical program (like Young Pawns or FIDE Prep) with afternoon Summer Blitz for a comprehensive, exhilarating full-day camp experience.'
        },
        {
          q: 'What is the daily schedule for Summer Blitz?',
          a: 'Sessions run Monday through Friday from 2:00 PM to 5:30 PM PST.'
        },
        {
          q: 'Does blitz play hurt a child’s classical chess discipline?',
          a: 'When taught properly, blitz actually sharpens instinctual tactical vision and teaches clock composure! Our mentors emphasize calculating candidate moves quickly rather than moving carelessly.'
        },
        {
          q: 'Can students register for multiple consecutive weeks?',
          a: 'Yes! The puzzle curriculum and tournament pairings rotate weekly, so returning scholars encounter fresh challenges each session.'
        }
      ]
    }
  };

  let currentSelectedProgram = null;
  let currentSelectedPlan = null;

  function getProgramSlugFromUrl() {
    const params = new URLSearchParams(window.location.search);
    const slug = params.get('program');
    if (slug && PROGRAMS_DATA[slug]) {
      return slug;
    }

    return 'young-pawns';
  }

  function renderProgramDetails(slug) {
    const prog = PROGRAMS_DATA[slug];
    if (!prog) return;

    currentSelectedProgram = prog;
    currentSelectedPlan = prog.plans[0];

    document.title = `${prog.name} (${prog.ageGroup}) — Stratagem Kids Chess Academy`;

    const heroEyebrow = document.getElementById('detHeroEyebrow');
    const heroTitle = document.getElementById('detHeroTitle');
    const heroAgeTag = document.getElementById('detHeroAgeTag');
    const heroLevelTag = document.getElementById('detHeroLevelTag');
    const heroDesc = document.getElementById('detHeroDesc');
    const heroDuration = document.getElementById('detHeroDuration');
    const heroImg = document.getElementById('detHeroImg');

    if (heroEyebrow) heroEyebrow.textContent = prog.eyebrow;
    if (heroTitle) heroTitle.textContent = prog.headline;
    if (heroAgeTag) heroAgeTag.textContent = prog.ageGroup;
    if (heroLevelTag) heroLevelTag.textContent = prog.skillLevel;
    if (heroDesc) heroDesc.textContent = prog.shortDesc;
    if (heroDuration) heroDuration.textContent = `${prog.duration} • ${prog.schedule}`;
    if (heroImg) {
      heroImg.src = prog.heroImage;
      heroImg.alt = prog.heroAlt;
    }

    const stickyImg = document.getElementById('stickyCardImg');
    const stickyTitle = document.getElementById('stickyCardTitle');
    const stickyAge = document.getElementById('stickyCardAge');
    const stickyLevel = document.getElementById('stickyCardLevel');
    const stickyDuration = document.getElementById('stickyCardDuration');
    const stickySchedule = document.getElementById('stickyCardSchedule');
    const stickyFormat = document.getElementById('stickyCardFormat');
    const stickyPrice = document.getElementById('stickyCardPrice');
    const stickyPriceNote = document.getElementById('stickyCardPriceNote');

    if (stickyImg) {
      stickyImg.src = prog.heroImage;
      stickyImg.alt = prog.name;
    }
    if (stickyTitle) stickyTitle.textContent = prog.name;
    if (stickyAge) stickyAge.textContent = prog.ageGroup;
    if (stickyLevel) stickyLevel.textContent = prog.skillLevel;
    if (stickyDuration) stickyDuration.textContent = prog.duration;
    if (stickySchedule) stickySchedule.textContent = prog.schedule;
    if (stickyFormat) stickyFormat.textContent = prog.format;
    if (stickyPrice) stickyPrice.textContent = prog.tuition;
    if (stickyPriceNote) stickyPriceNote.textContent = prog.tuitionNote;

    const aboutText = document.getElementById('detAboutText');
    if (aboutText) aboutText.textContent = prog.about;

    const modulesGrid = document.getElementById('detModulesGrid');
    if (modulesGrid) {
      modulesGrid.innerHTML = prog.modules.map(mod => `
        <div class="det-module-card">
          <div class="module-num-badge">${mod.num}</div>
          <div class="module-info">
            <h4 class="module-title">${mod.title}</h4>
            <p class="module-desc">${mod.desc}</p>
          </div>
        </div>
      `).join('');
    }

    const objList = document.getElementById('detObjectivesList');
    if (objList) {
      objList.innerHTML = prog.objectives.map(obj => `
        <li class="objective-item">
          <span class="obj-check" aria-hidden="true">&#10003;</span>
          <span>${obj}</span>
        </li>
      `).join('');
    }

    const skillsGrid = document.getElementById('detSkillsGrid');
    if (skillsGrid) {
      skillsGrid.innerHTML = prog.skills.map(sk => `
        <div class="skill-tile">
          <h5 class="skill-name">${sk.name}</h5>
          <p class="skill-desc">${sk.desc}</p>
        </div>
      `).join('');
    }

    const methodText = document.getElementById('detMethodText');
    if (methodText) methodText.textContent = prog.methodology;

    const actList = document.getElementById('detActivitiesList');
    if (actList) {
      actList.innerHTML = prog.activities.map(act => `
        <li class="act-item">
          <span class="act-bullet" aria-hidden="true">&#9670;</span>
          <span>${act}</span>
        </li>
      `).join('');
    }

    const outList = document.getElementById('detOutcomesList');
    if (outList) {
      outList.innerHTML = prog.outcomes.map(out => `
        <li class="outcome-bullet">
          <span class="outcome-icon" aria-hidden="true">&#9733;</span>
          <span>${out}</span>
        </li>
      `).join('');
    }

    const galleryGrid = document.getElementById('detGalleryGrid');
    if (galleryGrid) {
      galleryGrid.innerHTML = prog.gallery.map(item => `
        <figure class="det-gallery-item">
          <div class="gallery-media-box">
            <img src="${item.src}" alt="${item.title}" class="gallery-img" loading="lazy">
          </div>
          <figcaption class="gallery-caption">
            <strong class="caption-title">${item.title}</strong>
            <span class="caption-text">${item.caption}</span>
          </figcaption>
        </figure>
      `).join('');
    }

    const pricingGrid = document.getElementById('detPricingGrid');
    if (pricingGrid) {
      pricingGrid.innerHTML = prog.plans.map((plan, idx) => `
        <article class="pricing-card ${idx === 1 ? 'featured' : ''}" data-plan-id="${plan.id}" id="plan-${plan.id}">
          <div class="pricing-card-header">
            <span class="pricing-badge">${plan.badge}</span>
            <h3 class="plan-name">${plan.name}</h3>
            <div class="plan-price-row">
              <span class="price-val">${plan.price}</span>
              <span class="price-period">${plan.period}</span>
            </div>
            <p class="plan-desc">${plan.desc}</p>
          </div>

          <div class="plan-features-list">
            ${plan.features.map(f => `
              <div class="plan-feature-item">
                <span class="feat-check" aria-hidden="true">&#10003;</span>
                <span>${f}</span>
              </div>
            `).join('')}
          </div>

          <div class="pricing-card-footer">
            <button class="plan-select-btn ${idx === 1 ? 'btn-primary' : 'btn-outline'}" type="button" data-plan-idx="${idx}">
              <span>Select This Plan</span>
              <span class="btn-arrow" aria-hidden="true">&rarr;</span>
            </button>
          </div>
        </article>
      `).join('');

      const planBtns = pricingGrid.querySelectorAll('.plan-select-btn');
      planBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          const idx = parseInt(btn.getAttribute('data-plan-idx'), 10);
          selectPricingPlan(prog.plans[idx]);
        });
      });
    }

    const faqContainer = document.getElementById('detFaqContainer');
    if (faqContainer) {
      faqContainer.innerHTML = prog.faqs.map((faq, i) => `
        <div class="faq-item" id="faqItem-${i}">
          <button class="faq-question-btn" type="button" aria-expanded="false" aria-controls="faqAns-${i}">
            <span class="faq-q-text">${faq.q}</span>
            <span class="faq-chevron" aria-hidden="true">
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14">
                <path d="M4 6L8 10L12 6" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </span>
          </button>
          <div class="faq-answer-panel" id="faqAns-${i}" hidden>
            <p class="faq-ans-text">${faq.a}</p>
          </div>
        </div>
      `).join('');

      initFaqAccordion(faqContainer);
    }

    const ctaProgName = document.getElementById('detCtaProgName');
    if (ctaProgName) ctaProgName.textContent = prog.name;
    const ctaAgeChip = document.getElementById('detCtaAgeChip');
    if (ctaAgeChip) ctaAgeChip.textContent = prog.ageGroup;
  }

  function selectPricingPlan(plan) {
    currentSelectedPlan = plan;

    const allCards = document.querySelectorAll('.pricing-card');
    allCards.forEach(c => c.classList.remove('selected'));

    const selectedCard = document.getElementById(`plan-${plan.id}`);
    if (selectedCard) {
      selectedCard.classList.add('selected');
    }

    const primaryEnrollBtns = document.querySelectorAll('.btn-enroll-trigger');
    primaryEnrollBtns.forEach(btn => {
      btn.innerHTML = `<span>Enroll in ${currentSelectedProgram.name} (${plan.name})</span> <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14" aria-hidden="true"><path d="M6 3L11 8L6 13" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
    });

    showToast(`Selected Plan: ${plan.name}`);
  }

  function initFaqAccordion(container) {
    const faqItems = container.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
      const btn = item.querySelector('.faq-question-btn');
      const panel = item.querySelector('.faq-answer-panel');
      if (!btn || !panel) return;

      btn.addEventListener('click', () => {
        const isExpanded = btn.getAttribute('aria-expanded') === 'true';

        faqItems.forEach(otherItem => {
          if (otherItem !== item) {
            const otherBtn = otherItem.querySelector('.faq-question-btn');
            const otherPanel = otherItem.querySelector('.faq-answer-panel');
            if (otherBtn && otherPanel) {
              otherBtn.setAttribute('aria-expanded', 'false');
              otherPanel.hidden = true;
              otherItem.classList.remove('is-open');
            }
          }
        });

        btn.setAttribute('aria-expanded', String(!isExpanded));
        panel.hidden = isExpanded;
        item.classList.toggle('is-open', !isExpanded);
      });
    });
  }

  function initEnrollmentModal() {
    const modalBackdrop = document.getElementById('enrollModalBackdrop');
    const closeBtn = document.getElementById('enrollModalClose');
    const enrollButtons = document.querySelectorAll('.btn-enroll-trigger');

    if (!modalBackdrop || !closeBtn) return;

    const modalProgName = document.getElementById('modalProgName');
    const modalPlanName = document.getElementById('modalPlanName');
    const modalAge = document.getElementById('modalProgAge');

    function openModal() {
      if (currentSelectedProgram) {
        if (modalProgName) modalProgName.textContent = currentSelectedProgram.name;
        if (modalAge) modalAge.textContent = currentSelectedProgram.ageGroup;
        if (modalPlanName) {
          modalPlanName.textContent = currentSelectedPlan ? currentSelectedPlan.name : 'Standard Immersion';
        }
      }
      modalBackdrop.classList.add('is-open');
      modalBackdrop.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }

    function closeModal() {
      modalBackdrop.classList.remove('is-open');
      modalBackdrop.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }

    enrollButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        openModal();
      });
    });

    closeBtn.addEventListener('click', closeModal);
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) closeModal();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modalBackdrop.classList.contains('is-open')) {
        closeModal();
      }
    });

    const enrollForm = document.getElementById('enrollModalForm');
    if (enrollForm) {
      enrollForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const submitBtn = enrollForm.querySelector('.modal-submit-btn');
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.innerHTML = '<span>Processing Registration...</span>';
        }
        setTimeout(() => {
          closeModal();
          showToast(`Inquiry for ${currentSelectedProgram.name} received! Our admissions director will call you shortly.`);
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<span>Submit Enrollment Request</span>';
          }
          enrollForm.reset();
        }, 1200);
      });
    }
  }

  function showToast(message) {
    let toast = document.getElementById('progToast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'progToast';
      toast.className = 'prog-toast-notification';
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('is-visible');
    setTimeout(() => {
      toast.classList.remove('is-visible');
    }, 3200);
  }

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
      threshold: 0.1
    });

    revealElements.forEach(el => observer.observe(el));
  }

  function init() {
    const slug = getProgramSlugFromUrl();
    renderProgramDetails(slug);
    initEnrollmentModal();
    initScrollReveal();

    window.addEventListener('popstate', () => {
      const newSlug = getProgramSlugFromUrl();
      renderProgramDetails(newSlug);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
