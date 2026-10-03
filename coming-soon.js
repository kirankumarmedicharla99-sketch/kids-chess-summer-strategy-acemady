(function () {
  'use strict';

  const DEFAULT_DEMO_LAUNCH_TIME = Date.now() + (45 * 24 * 60 * 60 * 1000) + (14 * 60 * 60 * 1000) + (32 * 60 * 1000);
  const TARGET_LAUNCH_DATE = new Date(DEFAULT_DEMO_LAUNCH_TIME);

  const THEME_STORAGE_KEY = 'strata_chess_theme';
  const DIR_STORAGE_KEY = 'strata_chess_direction';

  const htmlRoot = document.documentElement;
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const rtlToggleBtn = document.getElementById('rtlToggleBtn');
  const rtlLabel = document.getElementById('rtlLabel');

  const countdownContainer = document.getElementById('countdownContainer');
  const daysNum = document.getElementById('daysNum');
  const hoursNum = document.getElementById('hoursNum');
  const minutesNum = document.getElementById('minutesNum');
  const secondsNum = document.getElementById('secondsNum');
  const liveAnnouncement = document.getElementById('liveAnnouncement');

  const toast = document.getElementById('pageToast');
  const toastTitle = document.getElementById('toastTitle');
  const toastMessage = document.getElementById('toastMessage');
  let toastTimer = null;

  let update3DThemeLighting = null;

  function applyTheme(theme) {
    const validTheme = theme === 'dark' ? 'dark' : 'light';
    htmlRoot.setAttribute('data-theme', validTheme);
    localStorage.setItem(THEME_STORAGE_KEY, validTheme);

    if (themeToggleBtn) {
      themeToggleBtn.setAttribute(
        'aria-label',
        validTheme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'
      );
      themeToggleBtn.setAttribute(
        'title',
        validTheme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'
      );
    }

    if (typeof update3DThemeLighting === 'function') {
      update3DThemeLighting(validTheme);
    }
  }

  function initTheme() {

    const urlParams = new URLSearchParams(window.location.search);
    const urlTheme = urlParams.get('theme');

    if (urlTheme === 'dark' || urlTheme === 'light') {
      applyTheme(urlTheme);
      return;
    }

    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    if (savedTheme === 'dark' || savedTheme === 'light') {
      applyTheme(savedTheme);
      return;
    }

    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      applyTheme('dark');
    } else {
      applyTheme('light');
    }
  }

  function toggleTheme() {
    const currentTheme = htmlRoot.getAttribute('data-theme') || 'light';
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(nextTheme);
  }

  function applyDirection(dir) {
    const validDir = dir === 'rtl' ? 'rtl' : 'ltr';
    htmlRoot.setAttribute('dir', validDir);
    localStorage.setItem(DIR_STORAGE_KEY, validDir);

    if (rtlLabel) {
      rtlLabel.textContent = validDir === 'rtl' ? 'LTR' : 'RTL';
    }

    if (rtlToggleBtn) {
      rtlToggleBtn.setAttribute(
        'aria-label',
        validDir === 'rtl' ? 'Switch to Left-to-Right layout' : 'Switch to Right-to-Left layout'
      );
      rtlToggleBtn.setAttribute(
        'title',
        validDir === 'rtl' ? 'Switch to Left-to-Right layout' : 'Switch to Right-to-Left layout'
      );
    }
  }

  function initDirection() {

    const urlParams = new URLSearchParams(window.location.search);
    const urlDir = urlParams.get('dir');

    if (urlDir === 'rtl' || urlDir === 'ltr') {
      applyDirection(urlDir);
      return;
    }

    const savedDir = localStorage.getItem(DIR_STORAGE_KEY);
    if (savedDir === 'rtl' || savedDir === 'ltr') {
      applyDirection(savedDir);
      return;
    }

    applyDirection('ltr');
  }

  function toggleDirection() {
    const currentDir = htmlRoot.getAttribute('dir') || 'ltr';
    const nextDir = currentDir === 'rtl' ? 'ltr' : 'rtl';
    applyDirection(nextDir);
  }

  function showToast(title, message, duration = 3000) {
    if (!toast) return;

    if (toastTimer) {
      clearTimeout(toastTimer);
    }

    if (toastTitle) toastTitle.textContent = title;
    if (toastMessage) toastMessage.textContent = message;

    toast.hidden = false;
    void toast.offsetWidth;
    toast.classList.add('is-visible');

    toastTimer = setTimeout(() => {
      toast.classList.remove('is-visible');
      setTimeout(() => {
        toast.hidden = true;
      }, 300);
    }, duration);
  }

  let countdownInterval = null;

  function padZero(num) {
    return String(Math.max(0, Math.floor(num))).padStart(2, '0');
  }

  function updateCountdown() {
    const now = Date.now();
    const diff = TARGET_LAUNCH_DATE.getTime() - now;

    if (diff <= 0) {

      if (countdownInterval) {
        clearInterval(countdownInterval);
      }

      if (daysNum) daysNum.textContent = '00';
      if (hoursNum) hoursNum.textContent = '00';
      if (minutesNum) minutesNum.textContent = '00';
      if (secondsNum) secondsNum.textContent = '00';

      if (countdownContainer) countdownContainer.hidden = true;
      if (liveAnnouncement) liveAnnouncement.hidden = false;
      return;
    }

    const totalSeconds = Math.floor(diff / 1000);
    const days = Math.floor(totalSeconds / (3600 * 24));
    const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const formattedDays = padZero(days);
    const formattedHours = padZero(hours);
    const formattedMinutes = padZero(minutes);
    const formattedSeconds = padZero(seconds);

    if (daysNum && daysNum.textContent !== formattedDays) daysNum.textContent = formattedDays;
    if (hoursNum && hoursNum.textContent !== formattedHours) hoursNum.textContent = formattedHours;
    if (minutesNum && minutesNum.textContent !== formattedMinutes) minutesNum.textContent = formattedMinutes;
    if (secondsNum && secondsNum.textContent !== formattedSeconds) secondsNum.textContent = formattedSeconds;

    if (countdownContainer && seconds === 0) {
      countdownContainer.setAttribute('aria-label', `Launch countdown: ${days} days, ${hours} hours, and ${minutes} minutes remaining.`);
    }
  }

  function startCountdown() {
    updateCountdown();
    countdownInterval = setInterval(updateCountdown, 1000);
  }

  function init3DAnimation() {
    const container = document.getElementById('chessComingSoonViewport');
    const canvas = document.getElementById('chessComingSoonCanvas');
    const fallback = document.getElementById('chessFallback');

    if (!container || !canvas) return;

    function isWebGLAvailable() {
      try {
        const testCanvas = document.createElement('canvas');
        return !!(window.WebGLRenderingContext &&
          (testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl')));
      } catch (e) {
        return false;
      }
    }

    if (typeof THREE === 'undefined' || !isWebGLAvailable()) {
      if (fallback) fallback.hidden = false;
      if (canvas) canvas.style.display = 'none';
      return;
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const scene = new THREE.Scene();

    let width = container.clientWidth || 380;
    let height = container.clientHeight || 200;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 2.6, 7.8);
    camera.lookAt(0, 1.8, 0);

    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height, false);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xe4c98a, 1.4);
    keyLight.position.set(5, 7, 5);
    keyLight.castShadow = true;
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x0e5552, 1.3);
    rimLight.position.set(-5, 4, -4);
    scene.add(rimLight);

    const spotlight = new THREE.SpotLight(0xc6a15b, 1.6, 12, Math.PI / 4, 0.4, 1);
    spotlight.position.set(0, 6, 2.5);
    scene.add(spotlight);

    update3DThemeLighting = function (currentTheme) {
      if (currentTheme === 'dark') {
        ambientLight.intensity = 0.55;
        keyLight.intensity = 1.5;
        rimLight.color.setHex(0x116864);
        rimLight.intensity = 1.35;
      } else {
        ambientLight.intensity = 0.85;
        keyLight.intensity = 1.15;
        rimLight.color.setHex(0x0e5552);
        rimLight.intensity = 0.95;
      }
    };
    update3DThemeLighting(htmlRoot.getAttribute('data-theme') || 'light');

    const pieceDarkMaterial = new THREE.MeshStandardMaterial({
      color: 0x073B3A,
      roughness: 0.28,
      metalness: 0.72
    });

    const brassMaterial = new THREE.MeshStandardMaterial({
      color: 0xc6a15b,
      roughness: 0.24,
      metalness: 0.88
    });

    const champagneMaterial = new THREE.MeshStandardMaterial({
      color: 0xe4c98a,
      roughness: 0.16,
      metalness: 0.92
    });

    const kingGroup = new THREE.Group();

    const pts = [
      new THREE.Vector2(0, 0),
      new THREE.Vector2(1.15, 0),
      new THREE.Vector2(1.15, 0.12),
      new THREE.Vector2(1.05, 0.24),
      new THREE.Vector2(0.98, 0.38),
      new THREE.Vector2(1.04, 0.48),
      new THREE.Vector2(0.88, 0.62),
      new THREE.Vector2(0.68, 0.95),
      new THREE.Vector2(0.52, 1.45),
      new THREE.Vector2(0.44, 2.05),
      new THREE.Vector2(0.50, 2.50),
      new THREE.Vector2(0.64, 2.88),
      new THREE.Vector2(0.72, 3.02),
      new THREE.Vector2(0.72, 3.16),
      new THREE.Vector2(0.56, 3.25),
      new THREE.Vector2(0.52, 3.38),
      new THREE.Vector2(0.62, 3.50),
      new THREE.Vector2(0.76, 3.82),
      new THREE.Vector2(0.82, 4.08),
      new THREE.Vector2(0.76, 4.18),
      new THREE.Vector2(0.40, 4.15),
      new THREE.Vector2(0.20, 4.25),
      new THREE.Vector2(0, 4.28)
    ];

    const bodyGeo = new THREE.LatheGeometry(pts, 36);
    bodyGeo.computeVertexNormals();
    const bodyMesh = new THREE.Mesh(bodyGeo, pieceDarkMaterial);
    bodyMesh.castShadow = true;
    bodyMesh.receiveShadow = true;
    kingGroup.add(bodyMesh);

    const baseRingGeo = new THREE.TorusGeometry(1.02, 0.05, 16, 44);
    baseRingGeo.rotateX(Math.PI / 2);
    const baseRing = new THREE.Mesh(baseRingGeo, brassMaterial);
    baseRing.position.y = 0.38;
    baseRing.castShadow = true;
    kingGroup.add(baseRing);

    const collarRingGeo = new THREE.TorusGeometry(0.65, 0.045, 16, 36);
    collarRingGeo.rotateX(Math.PI / 2);
    const collarRing = new THREE.Mesh(collarRingGeo, brassMaterial);
    collarRing.position.y = 3.09;
    collarRing.castShadow = true;
    kingGroup.add(collarRing);

    const crownRimGeo = new THREE.TorusGeometry(0.80, 0.04, 16, 44);
    crownRimGeo.rotateX(Math.PI / 2);
    const crownRim = new THREE.Mesh(crownRimGeo, brassMaterial);
    crownRim.position.y = 4.10;
    crownRim.castShadow = true;
    kingGroup.add(crownRim);

    const crossGroup = new THREE.Group();
    const vBar = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.60, 0.12), brassMaterial);
    vBar.position.y = 4.54;
    vBar.castShadow = true;
    crossGroup.add(vBar);

    const hBar = new THREE.Mesh(new THREE.BoxGeometry(0.40, 0.12, 0.12), brassMaterial);
    hBar.position.y = 4.66;
    hBar.castShadow = true;
    crossGroup.add(hBar);

    const crossBead = new THREE.Mesh(new THREE.SphereGeometry(0.075, 16, 16), champagneMaterial);
    crossBead.position.y = 4.88;
    crossGroup.add(crossBead);
    kingGroup.add(crossGroup);

    const pedestalGroup = new THREE.Group();
    const tileMesh = new THREE.Mesh(new THREE.BoxGeometry(2.6, 0.16, 2.6), pieceDarkMaterial);
    tileMesh.position.y = -0.08;
    tileMesh.receiveShadow = true;
    pedestalGroup.add(tileMesh);

    const tileTrim = new THREE.Mesh(new THREE.BoxGeometry(2.7, 0.04, 2.7), brassMaterial);
    tileTrim.position.y = -0.01;
    pedestalGroup.add(tileTrim);

    scene.add(pedestalGroup);
    scene.add(kingGroup);

    const particleCount = 24;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 5;
      particlePositions[i + 1] = Math.random() * 5 + 0.1;
      particlePositions[i + 2] = (Math.random() - 0.5) * 5;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xc6a15b,
      size: 0.08,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    });
    const particleSystem = new THREE.Points(particleGeo, particleMat);
    scene.add(particleSystem);

    let targetRotationX = 0;
    let targetRotationY = 0;
    let currentRotationX = 0;
    let currentRotationY = 0;

    function onPointerMove(e) {
      const rect = container.getBoundingClientRect();
      const clientX = e.clientX || (e.touches && e.touches[0] ? e.touches[0].clientX : 0);
      const clientY = e.clientY || (e.touches && e.touches[0] ? e.touches[0].clientY : 0);

      const normX = ((clientX - rect.left) / rect.width) * 2 - 1;
      const normY = -(((clientY - rect.top) / rect.height) * 2 - 1);

      targetRotationY = normX * 0.4;
      targetRotationX = normY * 0.2;
    }

    container.addEventListener('mousemove', onPointerMove);
    container.addEventListener('touchmove', onPointerMove, { passive: true });

    const startTime = performance.now();
    let isRunning = true;

    function animate() {
      if (!isRunning) return;
      requestAnimationFrame(animate);

      const elapsed = (performance.now() - startTime) / 1000;

      if (!prefersReducedMotion) {

        if (elapsed < 1.6) {
          const p = Math.min(1, elapsed / 1.6);
          const easeOutBounce = 1 - Math.pow(1 - p, 3);
          kingGroup.position.y = 4.5 * (1 - easeOutBounce);
          kingGroup.rotation.y = easeOutBounce * Math.PI * 0.5;
        }

        else if (elapsed < 3.6) {
          const spinP = (elapsed - 1.6) / 2.0;
          kingGroup.position.y = 0;
          kingGroup.rotation.y = (Math.PI * 0.5) + spinP * (Math.PI * 2.0);
        }

        else if (elapsed < 4.8) {
          const bowP = (elapsed - 3.6) / 1.2;
          kingGroup.position.y = 0;
          kingGroup.rotation.x = Math.sin(bowP * Math.PI) * 0.14;
          kingGroup.rotation.y = (Math.PI * 2.5);
        }

        else {
          const idleTime = elapsed - 4.8;
          kingGroup.rotation.x *= 0.96;
          kingGroup.position.y = Math.sin(idleTime * 1.5) * 0.09;
          kingGroup.rotation.y += 0.006;
          spotlight.intensity = 1.4 + Math.sin(idleTime * 1.8) * 0.3;
        }

        const positions = particleGeo.attributes.position.array;
        for (let i = 1; i < positions.length; i += 3) {
          positions[i] += 0.0035;
          if (positions[i] > 5.0) positions[i] = 0.1;
        }
        particleGeo.attributes.position.needsUpdate = true;
        particleSystem.rotation.y += 0.0008;

      } else {

        kingGroup.position.y = 0;
        kingGroup.rotation.y = 0.5;
      }

      currentRotationX += (targetRotationX - currentRotationX) * 0.06;
      currentRotationY += (targetRotationY - currentRotationY) * 0.06;

      camera.position.x = currentRotationY * 1.2;
      camera.position.y = 2.6 + currentRotationX * 0.6;
      camera.lookAt(0, 1.8, 0);

      renderer.render(scene, camera);
    }

    function handleResize() {
      if (!container || !renderer || !camera) return;
      width = container.clientWidth || 380;
      height = container.clientHeight || 200;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    }
    window.addEventListener('resize', handleResize);

    document.addEventListener('visibilitychange', () => {
      isRunning = document.visibilityState === 'visible';
      if (isRunning) {
        animate();
      }
    });

    animate();
  }

  function init() {
    initTheme();
    initDirection();

    if (themeToggleBtn) {
      themeToggleBtn.addEventListener('click', toggleTheme);
    }
    if (rtlToggleBtn) {
      rtlToggleBtn.addEventListener('click', toggleDirection);
    }

    startCountdown();
    init3DAnimation();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
