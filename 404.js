(function () {
  'use strict';

  const THEME_STORAGE_KEY = 'strata_chess_theme';
  const DIR_STORAGE_KEY = 'strata_chess_direction';

  const htmlRoot = document.documentElement;
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const rtlToggleBtn = document.getElementById('rtlToggleBtn');
  const rtlLabel = document.getElementById('rtlLabel');

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

  function init3DAnimation() {
    const container = document.getElementById('chess404Viewport');
    const canvas = document.getElementById('chess404Canvas');
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

    let width = container.clientWidth || 400;
    let height = container.clientHeight || 350;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 3.2, 8.5);
    camera.lookAt(0, 2.2, 0);

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

    const keyLight = new THREE.DirectionalLight(0xe4c98a, 1.3);
    keyLight.position.set(5, 8, 6);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x0e5552, 1.2);
    rimLight.position.set(-6, 4, -4);
    scene.add(rimLight);

    const spotLight = new THREE.SpotLight(0xc6a15b, 1.5, 15, Math.PI / 4, 0.5, 1);
    spotLight.position.set(0, 7, 3);
    scene.add(spotLight);

    update3DThemeLighting = function (currentTheme) {
      if (currentTheme === 'dark') {
        ambientLight.intensity = 0.55;
        keyLight.intensity = 1.45;
        rimLight.color.setHex(0x116864);
        rimLight.intensity = 1.3;
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

    const kingMasterGroup = new THREE.Group();

    const pts = [
      new THREE.Vector2(0, 0),
      new THREE.Vector2(1.20, 0),
      new THREE.Vector2(1.20, 0.12),
      new THREE.Vector2(1.10, 0.24),
      new THREE.Vector2(1.02, 0.38),
      new THREE.Vector2(1.08, 0.48),
      new THREE.Vector2(0.92, 0.62),
      new THREE.Vector2(0.72, 0.95),
      new THREE.Vector2(0.55, 1.45),
      new THREE.Vector2(0.46, 2.05),
      new THREE.Vector2(0.52, 2.50),
      new THREE.Vector2(0.66, 2.88),
      new THREE.Vector2(0.74, 3.02),
      new THREE.Vector2(0.74, 3.16),
      new THREE.Vector2(0.58, 3.25),
      new THREE.Vector2(0.54, 3.38),
      new THREE.Vector2(0.64, 3.50),
      new THREE.Vector2(0.78, 3.82),
      new THREE.Vector2(0.85, 4.08),
      new THREE.Vector2(0.78, 4.18),
      new THREE.Vector2(0.42, 4.15),
      new THREE.Vector2(0.22, 4.25),
      new THREE.Vector2(0, 4.28)
    ];

    const bodyGeo = new THREE.LatheGeometry(pts, 36);
    bodyGeo.computeVertexNormals();
    const bodyMesh = new THREE.Mesh(bodyGeo, pieceDarkMaterial);
    bodyMesh.castShadow = true;
    bodyMesh.receiveShadow = true;
    kingMasterGroup.add(bodyMesh);

    const baseRingGeo = new THREE.TorusGeometry(1.06, 0.05, 16, 44);
    baseRingGeo.rotateX(Math.PI / 2);
    const baseRing = new THREE.Mesh(baseRingGeo, brassMaterial);
    baseRing.position.y = 0.38;
    baseRing.castShadow = true;
    kingMasterGroup.add(baseRing);

    const collarRingGeo = new THREE.TorusGeometry(0.68, 0.045, 16, 36);
    collarRingGeo.rotateX(Math.PI / 2);
    const collarRing = new THREE.Mesh(collarRingGeo, brassMaterial);
    collarRing.position.y = 3.09;
    collarRing.castShadow = true;
    kingMasterGroup.add(collarRing);

    const crownRimGeo = new THREE.TorusGeometry(0.82, 0.04, 16, 44);
    crownRimGeo.rotateX(Math.PI / 2);
    const crownRim = new THREE.Mesh(crownRimGeo, brassMaterial);
    crownRim.position.y = 4.10;
    crownRim.castShadow = true;
    kingMasterGroup.add(crownRim);

    const crossGroup = new THREE.Group();
    const vBar = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.62, 0.12), brassMaterial);
    vBar.position.y = 4.56;
    vBar.castShadow = true;
    crossGroup.add(vBar);

    const hBar = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.12, 0.12), brassMaterial);
    hBar.position.y = 4.68;
    hBar.castShadow = true;
    crossGroup.add(hBar);

    const crossBead = new THREE.Mesh(new THREE.SphereGeometry(0.075, 16, 16), champagneMaterial);
    crossBead.position.y = 4.90;
    crossGroup.add(crossBead);
    kingMasterGroup.add(crossGroup);

    const pedestalGroup = new THREE.Group();
    const tileGeo = new THREE.BoxGeometry(2.8, 0.18, 2.8);
    const tileMesh = new THREE.Mesh(tileGeo, pieceDarkMaterial);
    tileMesh.position.y = -0.09;
    tileMesh.receiveShadow = true;
    pedestalGroup.add(tileMesh);

    const tileTrimGeo = new THREE.BoxGeometry(2.9, 0.05, 2.9);
    const tileTrim = new THREE.Mesh(tileTrimGeo, brassMaterial);
    tileTrim.position.y = -0.01;
    pedestalGroup.add(tileTrim);

    scene.add(pedestalGroup);
    scene.add(kingMasterGroup);

    const particleCount = 28;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 6;
      particlePositions[i + 1] = Math.random() * 5 + 0.2;
      particlePositions[i + 2] = (Math.random() - 0.5) * 6;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xc6a15b,
      size: 0.08,
      transparent: true,
      opacity: 0.75,
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

      targetRotationY = normX * 0.45;
      targetRotationX = normY * 0.25;
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

        if (elapsed < 1.4) {
          const progress = Math.min(1, elapsed / 1.4);

          const ease = 1 - Math.pow(1 - progress, 3);
          kingMasterGroup.position.y = -3.5 + 3.5 * ease;
          kingMasterGroup.rotation.y = ease * Math.PI * 0.75;
        }

        else if (elapsed < 3.2) {
          const phaseProgress = (elapsed - 1.4) / 1.8;
          kingMasterGroup.position.y = 0;
          kingMasterGroup.rotation.y = (Math.PI * 0.75) + phaseProgress * Math.PI * 1.5;
        }

        else if (elapsed < 5.5) {
          const searchPhase = (elapsed - 3.2);
          kingMasterGroup.position.y = 0;

          kingMasterGroup.rotation.z = Math.sin(searchPhase * 2.5) * 0.12;
          kingMasterGroup.rotation.y = (Math.PI * 2.25) + Math.sin(searchPhase * 2.0) * 0.25;
        }

        else {
          const idleTime = elapsed - 5.5;

          kingMasterGroup.rotation.z *= 0.95;

          kingMasterGroup.position.y = Math.sin(idleTime * 1.4) * 0.12;

          kingMasterGroup.rotation.y += 0.007;

          spotLight.intensity = 1.3 + Math.sin(idleTime * 2.0) * 0.35;
        }

        const positions = particleGeo.attributes.position.array;
        for (let i = 1; i < positions.length; i += 3) {
          positions[i] += 0.004;
          if (positions[i] > 5.5) positions[i] = 0.2;
        }
        particleGeo.attributes.position.needsUpdate = true;
        particleSystem.rotation.y += 0.001;

      } else {

        kingMasterGroup.position.y = 0;
        kingMasterGroup.rotation.y = 0.4;
      }

      currentRotationX += (targetRotationX - currentRotationX) * 0.06;
      currentRotationY += (targetRotationY - currentRotationY) * 0.06;

      camera.position.x = currentRotationY * 1.5;
      camera.position.y = 3.2 + currentRotationX * 0.8;
      camera.lookAt(0, 2.2, 0);

      renderer.render(scene, camera);
    }

    function handleResize() {
      if (!container || !renderer || !camera) return;
      width = container.clientWidth || 400;
      height = container.clientHeight || 350;
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

    init3DAnimation();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
