(function () {
  'use strict';

  const SCENES = [
    {
      id: 1,
      title: "The Chessboard Awakens",
      caption: "A single piece stands ready in the quiet arena.",
      duration: 2000,
      glowColor: "rgba(198, 161, 91, 0.45)",
      cameraTag: "CAM A • 50mm f/0.95 • 24 FPS",
      notation: "Position: Opening Setup",
      eval: 50,
      evalText: "EVAL: 0.00",
      sfx: "clockTick"
    },
    {
      id: 2,
      title: "The First Move",
      caption: "Curiosity sparks the start of a lifelong strategic journey.",
      duration: 2000,
      glowColor: "rgba(228, 201, 138, 0.52)",
      cameraTag: "CAM B • 35mm f/1.4 • TRACK",
      notation: "1. e4! • King's Pawn Opening",
      eval: 55,
      evalText: "EVAL: +0.35",
      sfx: "woodStrike"
    },
    {
      id: 3,
      title: "Discovering Strategy",
      caption: "Guided by Grandmasters, patience turns into tactical insight.",
      duration: 2000,
      glowColor: "rgba(14, 85, 82, 0.55)",
      cameraTag: "CAM C • 85mm f/1.2 • ORBIT",
      notation: "1... e5 2. Nf3 • Mentorship Depth",
      eval: 57,
      evalText: "EVAL: +0.55",
      sfx: "ambientTone"
    },
    {
      id: 4,
      title: "The Strategic Breakthrough",
      caption: "Foresight unlocks the decisive tactical opportunity.",
      duration: 2000,
      glowColor: "rgba(228, 201, 138, 0.65)",
      cameraTag: "CAM A • LOW-ANGLE 24mm",
      notation: "14... Ne4!! • Tactical Breakthrough",
      eval: 84,
      evalText: "EVAL: +3.20 !!",
      sfx: "heavyStrike"
    },
    {
      id: 5,
      title: "Learning Through Practice",
      caption: "Analyzing every puzzle, mastering every variation.",
      duration: 2000,
      glowColor: "rgba(198, 161, 91, 0.50)",
      cameraTag: "CAM D • MACRO 100mm • PAN",
      notation: "Algebraic Study • Variation Analysis",
      eval: 86,
      evalText: "EVAL: +3.45",
      sfx: "clockTick"
    },
    {
      id: 6,
      title: "Confidence & Achievement",
      caption: "The joy of accomplishment and earned intellectual poise.",
      duration: 2000,
      glowColor: "rgba(228, 201, 138, 0.70)",
      cameraTag: "CAM B • CRANE RISE • GOLD LIGHT",
      notation: "1-0 • Black Resigns (Earned Win)",
      eval: 96,
      evalText: "VICTORY 1-0",
      sfx: "victoryChime"
    },
    {
      id: 7,
      title: "A Community of Thinkers",
      caption: "Collaborating with peers who inspire each other to grow.",
      duration: 2000,
      glowColor: "rgba(14, 85, 82, 0.60)",
      cameraTag: "CAM A • WIDE 18mm • TOURNAMENT",
      notation: "Stratagem Academy Arena • 24 Players",
      eval: 75,
      evalText: "CHAMPIONSHIP",
      sfx: "ambientTone"
    },
    {
      id: 8,
      title: "Every Move Builds a Brighter Future",
      caption: "Stratagem Kids Chess & Strategy Summer Camp 2026.",
      duration: 2500,
      glowColor: "rgba(198, 161, 91, 0.75)",
      cameraTag: "STUDIO • CINEMATIC REVEAL",
      notation: "KIDS CHESS & STRATEGY 2026",
      eval: 100,
      evalText: "ACCREDITED",
      sfx: "anthemChime"
    }
  ];

  let cumulativeTime = 0;
  SCENES.forEach((scene) => {
    scene.startTime = cumulativeTime;
    cumulativeTime += scene.duration;
    scene.endTime = cumulativeTime;
  });
  const TOTAL_DURATION = cumulativeTime;

  let currentSceneIndex = 0;
  let isPlaying = true;
  let currentTime = 0;
  let lastTimestamp = null;
  let animFrameId = null;
  let audioEnabled = false;
  let audioCtx = null;

  let container = null;
  let viewport = null;
  let ambientGlow = null;
  let lightSweep = null;
  let glareOverlay = null;
  let chapterCounter = null;
  let progressBar = null;
  let timelineWrapper = null;
  let playBtn = null;
  let replayBtn = null;
  let audioBtn = null;
  let sceneElements = [];
  let chapterPills = [];

  let hudCameraTag = null;
  let hudNotationText = null;
  let hudEvalFill = null;
  let hudEvalText = null;

  let canvas = null;
  let ctx = null;
  let canvasWidth = 0;
  let canvasHeight = 0;
  let dustParticles = [];
  let moveTrailParticles = [];
  let celebrationEmbers = [];

  function getAudioContext() {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    return audioCtx;
  }

  function playSoundEffect(type) {
    if (!audioEnabled) return;
    try {
      const actx = getAudioContext();
      const now = actx.currentTime;

      if (type === 'woodStrike' || type === 'heavyStrike') {

        const osc = actx.createOscillator();
        const gain = actx.createGain();
        osc.type = 'triangle';
        const startFreq = type === 'heavyStrike' ? 220 : 340;
        osc.frequency.setValueAtTime(startFreq, now);
        osc.frequency.exponentialRampToValueAtTime(45, now + 0.08);

        gain.gain.setValueAtTime(0.001, now);
        gain.gain.linearRampToValueAtTime(type === 'heavyStrike' ? 0.35 : 0.22, now + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.14);

        osc.connect(gain);
        gain.connect(actx.destination);
        osc.start(now);
        osc.stop(now + 0.15);
      } else if (type === 'clockTick') {

        const osc = actx.createOscillator();
        const gain = actx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, now);
        osc.frequency.exponentialRampToValueAtTime(120, now + 0.02);

        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.03);

        osc.connect(gain);
        gain.connect(actx.destination);
        osc.start(now);
        osc.stop(now + 0.035);
      } else if (type === 'victoryChime' || type === 'anthemChime') {

        const freqs = type === 'anthemChime' ? [261.63, 329.63, 392.0, 523.25] : [523.25, 659.25, 783.99, 1046.5];
        freqs.forEach((freq, idx) => {
          const osc = actx.createOscillator();
          const gain = actx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now + idx * 0.04);

          gain.gain.setValueAtTime(0.001, now + idx * 0.04);
          gain.gain.linearRampToValueAtTime(0.08, now + idx * 0.04 + 0.03);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.04 + 1.2);

          osc.connect(gain);
          gain.connect(actx.destination);
          osc.start(now + idx * 0.04);
          osc.stop(now + idx * 0.04 + 1.25);
        });
      } else {

        const baseFreq = 196.0 + (currentSceneIndex % 4) * 44.0;
        const osc = actx.createOscillator();
        const gain = actx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(baseFreq, now);

        gain.gain.setValueAtTime(0.001, now);
        gain.gain.linearRampToValueAtTime(0.04, now + 0.1);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.9);

        osc.connect(gain);
        gain.connect(actx.destination);
        osc.start(now);
        osc.stop(now + 0.95);
      }
    } catch (e) {

    }
  }

  function initVFXCanvas() {
    canvas = container.querySelector('#cinemaVfxCanvas');
    if (!canvas) return;
    ctx = canvas.getContext('2d');

    const updateCanvasDimensions = () => {
      if (!canvas) return;
      canvasWidth = canvas.offsetWidth || 960;
      canvasHeight = canvas.offsetHeight || 540;
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
    };
    updateCanvasDimensions();
    window.addEventListener('resize', updateCanvasDimensions);

    dustParticles = [];
    for (let i = 0; i < 45; i++) {
      dustParticles.push({
        x: Math.random() * canvasWidth,
        y: Math.random() * canvasHeight,
        z: Math.random() * 2 + 0.5,
        radius: Math.random() * 1.8 + 0.6,
        alpha: Math.random() * 0.45 + 0.15,
        speedX: (Math.random() - 0.5) * 0.4,
        speedY: -Math.random() * 0.45 - 0.1,
        oscillation: Math.random() * Math.PI * 2,
        oscillationSpeed: Math.random() * 0.03 + 0.01
      });
    }
  }

  function renderVFX() {
    if (!ctx || !canvasWidth || !canvasHeight) return;
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    const scene = SCENES[currentSceneIndex];
    const sceneTime = currentTime - scene.startTime;
    const progress = Math.min(1, Math.max(0, sceneTime / scene.duration));

    if (scene.id === 1 || scene.id === 8) {
      ctx.save();
      ctx.globalCompositeOperation = 'screen';
      const rayGrad = ctx.createLinearGradient(0, 0, canvasWidth * 0.7, canvasHeight);
      rayGrad.addColorStop(0, 'rgba(228, 201, 138, 0.18)');
      rayGrad.addColorStop(0.4, 'rgba(198, 161, 91, 0.08)');
      rayGrad.addColorStop(1, 'transparent');

      ctx.fillStyle = rayGrad;
      ctx.beginPath();
      ctx.moveTo(canvasWidth * 0.1, 0);
      ctx.lineTo(canvasWidth * 0.35, 0);
      ctx.lineTo(canvasWidth * 0.75, canvasHeight);
      ctx.lineTo(canvasWidth * 0.4, canvasHeight);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }

    if (scene.id === 2) {
      ctx.save();
      ctx.globalCompositeOperation = 'screen';
      const startX = canvasWidth * 0.42;
      const startY = canvasHeight * 0.62;
      const targetX = canvasWidth * 0.48;
      const targetY = canvasHeight * 0.48;

      const currentX = startX + (targetX - startX) * progress;
      const currentY = startY + (targetY - startY) * progress;

      const pawnGlow = ctx.createRadialGradient(currentX, currentY, 2, currentX, currentY, 48);
      pawnGlow.addColorStop(0, 'rgba(243, 222, 176, 0.85)');
      pawnGlow.addColorStop(0.3, 'rgba(198, 161, 91, 0.45)');
      pawnGlow.addColorStop(1, 'transparent');
      ctx.fillStyle = pawnGlow;
      ctx.beginPath();
      ctx.arc(currentX, currentY, 48, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = 'rgba(228, 201, 138, 0.6)';
      ctx.lineWidth = 3;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.lineTo(currentX, currentY);
      ctx.stroke();
      ctx.restore();
    }

    if (scene.id === 4) {
      ctx.save();
      ctx.globalCompositeOperation = 'screen';
      const kStartX = canvasWidth * 0.38;
      const kStartY = canvasHeight * 0.68;
      const kCornerX = canvasWidth * 0.38;
      const kCornerY = canvasHeight * 0.44;
      const kTargetX = canvasWidth * 0.52;
      const kTargetY = canvasHeight * 0.44;

      ctx.lineWidth = 3.5;
      ctx.strokeStyle = 'rgba(243, 222, 176, 0.85)';
      ctx.shadowColor = '#C6A15B';
      ctx.shadowBlur = 12;

      ctx.beginPath();
      ctx.moveTo(kStartX, kStartY);
      if (progress < 0.5) {
        const segProgress = progress / 0.5;
        ctx.lineTo(kStartX, kStartY + (kCornerY - kStartY) * segProgress);
      } else {
        ctx.lineTo(kCornerX, kCornerY);
        const seg2Progress = (progress - 0.5) / 0.5;
        ctx.lineTo(kCornerX + (kTargetX - kCornerX) * seg2Progress, kTargetY);
      }
      ctx.stroke();

      if (progress > 0.45) {
        const ringProgress = (progress - 0.45) / 0.55;
        ctx.strokeStyle = `rgba(228, 201, 138, ${1 - ringProgress})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(kTargetX, kTargetY, 15 + ringProgress * 35, 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.restore();
    }

    if (scene.id === 6) {
      ctx.save();
      ctx.globalCompositeOperation = 'screen';
      const trophyX = canvasWidth * 0.72;
      const trophyY = canvasHeight * 0.48;

      for (let i = 0; i < 8; i++) {
        const angle = (sceneTime * 0.002) + (i * Math.PI / 4);
        const dist = 35 + Math.sin(sceneTime * 0.004 + i) * 18;
        const sparkX = trophyX + Math.cos(angle) * dist;
        const sparkY = trophyY + Math.sin(angle) * dist;

        ctx.fillStyle = 'rgba(243, 222, 176, 0.85)';
        ctx.beginPath();
        ctx.arc(sparkX, sparkY, 1.8, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }

    ctx.save();
    ctx.globalCompositeOperation = 'screen';
    dustParticles.forEach((p) => {
      p.y += p.speedY * p.z;
      p.x += p.speedX + Math.sin(p.oscillation) * 0.3;
      p.oscillation += p.oscillationSpeed;

      if (p.y < -10) p.y = canvasHeight + 10;
      if (p.x < -10) p.x = canvasWidth + 10;
      if (p.x > canvasWidth + 10) p.x = -10;

      ctx.fillStyle = `rgba(228, 201, 138, ${p.alpha})`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius * p.z, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.restore();
  }

  function init3DParallax() {
    if (!viewport) return;

    let targetRotX = 0;
    let targetRotY = 0;
    let currentRotX = 0;
    let currentRotY = 0;
    let isHovering = false;

    viewport.addEventListener('mousemove', (e) => {
      const rect = viewport.getBoundingClientRect();
      const normX = (e.clientX - rect.left) / rect.width - 0.5;
      const normY = (e.clientY - rect.top) / rect.height - 0.5;

      targetRotY = normX * 10;
      targetRotX = -normY * 10;
      isHovering = true;

      if (glareOverlay) {
        const posX = (normX + 0.5) * 100;
        const posY = (normY + 0.5) * 100;
        glareOverlay.style.background = `radial-gradient(circle at ${posX}% ${posY}%, rgba(255, 255, 255, 0.22), transparent 55%)`;
      }
    });

    viewport.addEventListener('mouseleave', () => {
      targetRotX = 0;
      targetRotY = 0;
      isHovering = false;
      if (glareOverlay) {
        glareOverlay.style.background = `radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.10), transparent 60%)`;
      }
    });

    function updateParallax() {
      currentRotX += (targetRotX - currentRotX) * 0.1;
      currentRotY += (targetRotY - currentRotY) * 0.1;

      if (isHovering || Math.abs(currentRotX) > 0.05 || Math.abs(currentRotY) > 0.05) {
        viewport.style.transform = `perspective(1100px) rotateX(${currentRotX.toFixed(2)}deg) rotateY(${currentRotY.toFixed(2)}deg) scale(${isHovering ? 1.015 : 1})`;
      } else {
        viewport.style.transform = 'perspective(1100px) rotateX(0deg) rotateY(0deg) scale(1)';
      }
    }

    return updateParallax;
  }

  function setScene(index, triggerTransitionEffect = true) {
    if (index < 0) index = 0;
    if (index >= SCENES.length) index = 0;

    const prevIndex = currentSceneIndex;
    currentSceneIndex = index;
    const scene = SCENES[currentSceneIndex];

    sceneElements.forEach((el, i) => {
      if (i === currentSceneIndex) {
        el.classList.add('is-active');
        el.classList.remove('is-prev');
      } else if (i === prevIndex) {
        el.classList.remove('is-active');
        el.classList.add('is-prev');
      } else {
        el.classList.remove('is-active', 'is-prev');
      }
    });

    if (chapterCounter) {
      chapterCounter.textContent = `Scene 0${currentSceneIndex + 1} / 0${SCENES.length}`;
    }

    chapterPills.forEach((pill, i) => {
      if (i === currentSceneIndex) {
        pill.classList.add('is-active');
        pill.setAttribute('aria-selected', 'true');
      } else {
        pill.classList.remove('is-active');
        pill.setAttribute('aria-selected', 'false');
      }
    });

    if (hudCameraTag) hudCameraTag.textContent = scene.cameraTag;
    if (hudNotationText) hudNotationText.textContent = scene.notation;
    if (hudEvalFill) hudEvalFill.style.width = `${scene.eval}%`;
    if (hudEvalText) hudEvalText.textContent = scene.evalText;

    if (ambientGlow) {
      ambientGlow.style.background = `radial-gradient(circle at 50% 50%, ${scene.glowColor}, rgba(7, 59, 58, 0.4) 60%, transparent 80%)`;
    }

    if (triggerTransitionEffect && lightSweep) {
      lightSweep.classList.remove('is-animating');
      void lightSweep.offsetWidth;
      lightSweep.classList.add('is-animating');
    }

    if (scene.sfx) {
      playSoundEffect(scene.sfx);
    }
  }

  let tickParallax = null;

  function updateTimeline(timestamp) {
    if (!lastTimestamp) lastTimestamp = timestamp;
    const deltaTime = timestamp - lastTimestamp;
    lastTimestamp = timestamp;

    if (isPlaying) {
      currentTime += deltaTime;

      if (currentTime >= TOTAL_DURATION) {
        currentTime = 0;
        setScene(0, true);
      } else {
        for (let i = 0; i < SCENES.length; i++) {
          if (currentTime >= SCENES[i].startTime && currentTime < SCENES[i].endTime) {
            if (i !== currentSceneIndex) {
              setScene(i, true);
            }
            break;
          }
        }
      }

      if (progressBar) {
        const progressPct = (currentTime / TOTAL_DURATION) * 100;
        progressBar.style.width = `${progressPct}%`;
      }
    }

    renderVFX();
    if (tickParallax) tickParallax();

    animFrameId = requestAnimationFrame(updateTimeline);
  }

  function play() {
    isPlaying = true;
    lastTimestamp = performance.now();
    if (playBtn) {
      playBtn.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="6" y="4" width="4" height="16"></rect>
          <rect x="14" y="4" width="4" height="16"></rect>
        </svg>
      `;
      playBtn.setAttribute('aria-label', 'Pause animation');
      playBtn.setAttribute('title', 'Pause');
    }
  }

  function pause() {
    isPlaying = false;
    if (playBtn) {
      playBtn.innerHTML = `
        <svg viewBox="0 0 24 24" fill="currentColor">
          <polygon points="5 3 19 12 5 21 5 3"></polygon>
        </svg>
      `;
      playBtn.setAttribute('aria-label', 'Play animation');
      playBtn.setAttribute('title', 'Play');
    }
  }

  function togglePlay() {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  }

  function replay() {
    currentTime = 0;
    lastTimestamp = performance.now();
    if (progressBar) progressBar.style.width = '0%';
    setScene(0, true);
    play();
  }

  function seekToNormalizedTime(fraction) {
    currentTime = Math.max(0, Math.min(TOTAL_DURATION - 1, fraction * TOTAL_DURATION));
    if (progressBar) {
      progressBar.style.width = `${fraction * 100}%`;
    }
    for (let i = 0; i < SCENES.length; i++) {
      if (currentTime >= SCENES[i].startTime && currentTime < SCENES[i].endTime) {
        setScene(i, true);
        break;
      }
    }
  }

  function preloadImages() {
    for (let i = 1; i <= 8; i++) {
      const img = new Image();
      img.src = `assets/cinematic-frame-${i}.jpg`;
    }
  }

  function initEvents() {
    if (playBtn) playBtn.addEventListener('click', togglePlay);
    if (replayBtn) replayBtn.addEventListener('click', replay);

    const inlineReplayBtn = document.getElementById('cinemaInlineReplay');
    if (inlineReplayBtn) inlineReplayBtn.addEventListener('click', replay);

    if (timelineWrapper) {
      const handleScrub = (e) => {
        const rect = timelineWrapper.getBoundingClientRect();
        const clientX = e.clientX || (e.touches && e.touches[0].clientX);
        if (clientX === undefined) return;
        const clickX = Math.max(0, Math.min(rect.width, clientX - rect.left));
        const fraction = clickX / rect.width;
        seekToNormalizedTime(fraction);
      };

      timelineWrapper.addEventListener('click', handleScrub);

      let isDragging = false;
      timelineWrapper.addEventListener('mousedown', (e) => {
        isDragging = true;
        handleScrub(e);
      });
      window.addEventListener('mousemove', (e) => {
        if (isDragging) handleScrub(e);
      });
      window.addEventListener('mouseup', () => {
        isDragging = false;
      });
    }

    chapterPills.forEach((pill) => {
      pill.addEventListener('click', () => {
        const targetSceneId = parseInt(pill.getAttribute('data-scene-target'), 10);
        const targetScene = SCENES.find((s) => s.id === targetSceneId);
        if (targetScene) {
          currentTime = targetScene.startTime + 50;
          if (progressBar) {
            progressBar.style.width = `${(currentTime / TOTAL_DURATION) * 100}%`;
          }
          setScene(targetSceneId - 1, true);
        }
      });
    });

    if (audioBtn) {
      audioBtn.addEventListener('click', () => {
        audioEnabled = !audioEnabled;
        audioBtn.classList.toggle('is-active', audioEnabled);
        audioBtn.setAttribute('aria-pressed', String(audioEnabled));
        const label = audioBtn.querySelector('.audio-label');
        if (label) {
          label.textContent = audioEnabled ? 'Sound: On' : 'Sound: Off';
        }
        if (audioEnabled) {
          playSoundEffect(SCENES[currentSceneIndex].sfx);
        }
      });
    }

    document.addEventListener('keydown', (e) => {
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName)) return;

      if (e.code === 'Space') {
        const rect = container?.getBoundingClientRect();
        if (rect && rect.top < window.innerHeight && rect.bottom > 0) {
          e.preventDefault();
          togglePlay();
        }
      } else if (e.code === 'ArrowRight') {
        const nextIdx = (currentSceneIndex + 1) % SCENES.length;
        currentTime = SCENES[nextIdx].startTime + 50;
        setScene(nextIdx, true);
      } else if (e.code === 'ArrowLeft') {
        const prevIdx = (currentSceneIndex - 1 + SCENES.length) % SCENES.length;
        currentTime = SCENES[prevIdx].startTime + 50;
        setScene(prevIdx, true);
      } else if (e.key === 'm' || e.key === 'M') {
        if (audioBtn) audioBtn.click();
      }
    });

    if (viewport) {
      let touchStartX = 0;
      viewport.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
      }, { passive: true });

      viewport.addEventListener('touchend', (e) => {
        const touchEndX = e.changedTouches[0].screenX;
        const diff = touchEndX - touchStartX;
        if (Math.abs(diff) > 40) {
          if (diff < 0) {
            const nextIdx = (currentSceneIndex + 1) % SCENES.length;
            currentTime = SCENES[nextIdx].startTime + 50;
            setScene(nextIdx, true);
          } else {
            const prevIdx = (currentSceneIndex - 1 + SCENES.length) % SCENES.length;
            currentTime = SCENES[prevIdx].startTime + 50;
            setScene(prevIdx, true);
          }
        }
      }, { passive: true });
    }

    document.addEventListener('visibilitychange', () => {
      if (document.hidden && isPlaying) {
        pause();
      }
    });
  }

  function init() {
    container = document.getElementById('heroCinemaStage');
    if (!container) return;

    viewport = container.querySelector('.cinema-viewport');
    ambientGlow = container.querySelector('.cinema-ambient-glow');
    lightSweep = container.querySelector('.cinema-light-sweep');
    glareOverlay = container.querySelector('#cinemaGlareOverlay');
    chapterCounter = container.querySelector('.cinema-chapter-counter');
    progressBar = container.querySelector('.cinema-timeline-progress');
    timelineWrapper = container.querySelector('.cinema-timeline-wrapper');
    playBtn = document.getElementById('cinemaPlayBtn');
    replayBtn = document.getElementById('cinemaReplayBtn');
    audioBtn = document.getElementById('cinemaAudioBtn');

    hudCameraTag = document.getElementById('hudCameraTag');
    hudNotationText = document.getElementById('hudNotationText');
    hudEvalFill = document.getElementById('hudEvalFill');
    hudEvalText = document.getElementById('hudEvalText');

    sceneElements = Array.from(container.querySelectorAll('.cinema-scene'));
    chapterPills = Array.from(container.querySelectorAll('.chapter-pill'));

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      isPlaying = false;
      pause();
    }

    preloadImages();
    initVFXCanvas();
    tickParallax = init3DParallax();
    initEvents();

    setScene(0, false);

    lastTimestamp = performance.now();
    animFrameId = requestAnimationFrame(updateTimeline);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
