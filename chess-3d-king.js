(function () {
  'use strict';

  function initWhenReady() {
    if (typeof THREE === 'undefined') {
      setTimeout(initWhenReady, 50);
      return;
    }
    setupChessAnimation();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initWhenReady);
  } else {
    initWhenReady();
  }

  function setupChessAnimation() {
    const container = document.getElementById('chess3dViewport');
    const canvas = document.getElementById('chess3dCanvas');

    if (!container || !canvas) {
      console.warn('[Chess3D] Viewport or Canvas element not found.');
      return;
    }

    function isWebGLAvailable() {
      try {
        const testCanvas = document.createElement('canvas');
        return !!(window.WebGLRenderingContext &&
          (testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl')));
      } catch (e) {
        return false;
      }
    }

    if (!isWebGLAvailable()) {
      showFallback(container);
      return;
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x041515, 0.022);

    let width = container.clientWidth || 800;
    let height = container.clientHeight || 500;

    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    const BASE_CAM_POS = new THREE.Vector3(0, 13.0, 20.5);
    const BASE_CAM_LOOK = new THREE.Vector3(0, 1.4, 0.0);
    camera.position.copy(BASE_CAM_POS);
    camera.lookAt(BASE_CAM_LOOK);

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
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    if (renderer.outputEncoding !== undefined) {
      renderer.outputEncoding = THREE.sRGBEncoding;
    }

    const hemiLight = new THREE.HemisphereLight(0x194543, 0x051313, 0.65);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xf5e3b5, 1.35);
    keyLight.position.set(7, 18, 11);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 2048;
    keyLight.shadow.mapSize.height = 2048;
    keyLight.shadow.camera.near = 0.5;
    keyLight.shadow.camera.far = 45;
    keyLight.shadow.camera.left = -12;
    keyLight.shadow.camera.right = 12;
    keyLight.shadow.camera.top = 12;
    keyLight.shadow.camera.bottom = -12;
    keyLight.shadow.bias = -0.0004;
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x0e7c75, 1.1);
    rimLight.position.set(-9, 10, -12);
    scene.add(rimLight);

    const kingSpotLight = new THREE.SpotLight(0xe4c98a, 0.4, 32, Math.PI / 5.2, 0.6, 1.1);
    kingSpotLight.position.set(1.0, 17, 3.0);
    const kingTargetObject = new THREE.Object3D();
    kingTargetObject.position.set(0.8, 0, 0.8);
    scene.add(kingTargetObject);
    kingSpotLight.target = kingTargetObject;
    kingSpotLight.castShadow = true;
    kingSpotLight.shadow.bias = -0.0004;
    scene.add(kingSpotLight);

    const sweepLight = new THREE.PointLight(0xc6a15b, 0, 16, 1.6);
    sweepLight.position.set(0, 3.5, 2.5);
    scene.add(sweepLight);

    const pieceDarkMaterial = new THREE.MeshStandardMaterial({
      color: 0x0c1315,
      roughness: 0.22,
      metalness: 0.68
    });

    const brassMaterial = new THREE.MeshStandardMaterial({
      color: 0xc6a15b,
      roughness: 0.26,
      metalness: 0.88
    });

    const champagneMaterial = new THREE.MeshStandardMaterial({
      color: 0xe4c98a,
      roughness: 0.18,
      metalness: 0.92
    });

    const darkSquareMaterial = new THREE.MeshStandardMaterial({
      color: 0x072221,
      roughness: 0.24,
      metalness: 0.52
    });

    const lightSquareMaterial = new THREE.MeshStandardMaterial({
      color: 0xe8e4da,
      roughness: 0.20,
      metalness: 0.15
    });

    const boardFrameMaterial = new THREE.MeshStandardMaterial({
      color: 0x041111,
      roughness: 0.32,
      metalness: 0.38
    });

    const materials = {
      pieceDarkMaterial,
      brassMaterial,
      champagneMaterial
    };

    function createContactShadowTexture() {
      const c = document.createElement('canvas');
      c.width = 128;
      c.height = 128;
      const ctx = c.getContext('2d');
      const grad = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
      grad.addColorStop(0, 'rgba(0, 0, 0, 0.85)');
      grad.addColorStop(0.35, 'rgba(0, 0, 0, 0.55)');
      grad.addColorStop(0.75, 'rgba(0, 0, 0, 0.18)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 128, 128);
      const texture = new THREE.CanvasTexture(c);
      return texture;
    }
    const shadowTexture = createContactShadowTexture();

    function createPieceShadow(radius) {
      const geo = new THREE.PlaneGeometry(radius * 2, radius * 2);
      geo.rotateX(-Math.PI / 2);
      const mat = new THREE.MeshBasicMaterial({
        map: shadowTexture,
        transparent: true,
        opacity: 0,
        depthWrite: false
      });
      const shadowMesh = new THREE.Mesh(geo, mat);
      shadowMesh.position.y = 0.005;
      scene.add(shadowMesh);
      return shadowMesh;
    }

    function buildChessboard() {
      const boardGroup = new THREE.Group();
      const squareSize = 2.0;

      const sqGeo = new THREE.BoxGeometry(1.95, 0.16, 1.95);

      for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
          const isDark = (row + col) % 2 === 1;
          const sqMat = isDark ? darkSquareMaterial : lightSquareMaterial;
          const sqMesh = new THREE.Mesh(sqGeo, sqMat);
          const x = (col - 3.5) * squareSize;
          const z = (row - 3.5) * squareSize;
          sqMesh.position.set(x, -0.08, z);
          sqMesh.receiveShadow = true;
          boardGroup.add(sqMesh);
        }
      }

      const trimThick = 0.08;
      const boardSpan = 8 * squareSize;
      const trimGeoH = new THREE.BoxGeometry(boardSpan + trimThick * 2, 0.04, trimThick);
      const trimGeoV = new THREE.BoxGeometry(trimThick, 0.04, boardSpan + trimThick * 2);

      const trimTop = new THREE.Mesh(trimGeoH, brassMaterial);
      trimTop.position.set(0, 0.002, -(boardSpan / 2 + trimThick / 2));
      boardGroup.add(trimTop);

      const trimBottom = new THREE.Mesh(trimGeoH, brassMaterial);
      trimBottom.position.set(0, 0.002, boardSpan / 2 + trimThick / 2);
      boardGroup.add(trimBottom);

      const trimLeft = new THREE.Mesh(trimGeoV, brassMaterial);
      trimLeft.position.set(-(boardSpan / 2 + trimThick / 2), 0.002, 0);
      boardGroup.add(trimLeft);

      const trimRight = new THREE.Mesh(trimGeoV, brassMaterial);
      trimRight.position.set(boardSpan / 2 + trimThick / 2, 0.002, 0);
      boardGroup.add(trimRight);

      const frameGeo = new THREE.BoxGeometry(18.5, 0.55, 18.5);
      const frameMesh = new THREE.Mesh(frameGeo, boardFrameMaterial);
      frameMesh.position.set(0, -0.35, 0);
      frameMesh.receiveShadow = true;
      boardGroup.add(frameMesh);

      const baseGeo = new THREE.BoxGeometry(20.0, 0.40, 20.0);
      const baseMesh = new THREE.Mesh(baseGeo, boardFrameMaterial);
      baseMesh.position.set(0, -0.75, 0);
      baseMesh.receiveShadow = true;
      boardGroup.add(baseMesh);

      const boardShadowGeo = new THREE.PlaneGeometry(25, 25);
      boardShadowGeo.rotateX(-Math.PI / 2);
      const boardShadowMat = new THREE.MeshBasicMaterial({
        map: shadowTexture,
        transparent: true,
        opacity: 0.65,
        depthWrite: false
      });
      const boardShadow = new THREE.Mesh(boardShadowGeo, boardShadowMat);
      boardShadow.position.y = -0.96;
      boardGroup.add(boardShadow);

      scene.add(boardGroup);
      return boardGroup;
    }

    buildChessboard();

    function tagShadows(group) {
      group.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
    }

    function createKingMesh() {
      const kingGroup = new THREE.Group();
      const pts = [
        new THREE.Vector2(0, 0),
        new THREE.Vector2(1.35, 0),
        new THREE.Vector2(1.35, 0.12),
        new THREE.Vector2(1.24, 0.24),
        new THREE.Vector2(1.15, 0.38),
        new THREE.Vector2(1.22, 0.48),
        new THREE.Vector2(1.05, 0.62),
        new THREE.Vector2(0.82, 0.95),
        new THREE.Vector2(0.62, 1.45),
        new THREE.Vector2(0.52, 2.05),
        new THREE.Vector2(0.58, 2.50),
        new THREE.Vector2(0.74, 2.88),
        new THREE.Vector2(0.82, 3.02),
        new THREE.Vector2(0.82, 3.16),
        new THREE.Vector2(0.64, 3.25),
        new THREE.Vector2(0.60, 3.38),
        new THREE.Vector2(0.72, 3.50),
        new THREE.Vector2(0.88, 3.82),
        new THREE.Vector2(0.96, 4.08),
        new THREE.Vector2(0.88, 4.18),
        new THREE.Vector2(0.48, 4.15),
        new THREE.Vector2(0.24, 4.25),
        new THREE.Vector2(0, 4.28)
      ];
      const bodyGeo = new THREE.LatheGeometry(pts, 36);
      bodyGeo.computeVertexNormals();
      const bodyMesh = new THREE.Mesh(bodyGeo, materials.pieceDarkMaterial);
      kingGroup.add(bodyMesh);

      const baseRingGeo = new THREE.TorusGeometry(1.20, 0.05, 16, 48);
      baseRingGeo.rotateX(Math.PI / 2);
      const baseRing = new THREE.Mesh(baseRingGeo, materials.brassMaterial);
      baseRing.position.y = 0.38;
      kingGroup.add(baseRing);

      const collarRingGeo = new THREE.TorusGeometry(0.76, 0.045, 16, 40);
      collarRingGeo.rotateX(Math.PI / 2);
      const collarRing = new THREE.Mesh(collarRingGeo, materials.brassMaterial);
      collarRing.position.y = 3.09;
      kingGroup.add(collarRing);

      const crownRimGeo = new THREE.TorusGeometry(0.94, 0.04, 16, 48);
      crownRimGeo.rotateX(Math.PI / 2);
      const crownRim = new THREE.Mesh(crownRimGeo, materials.brassMaterial);
      crownRim.position.y = 4.10;
      kingGroup.add(crownRim);

      const crossGroup = new THREE.Group();
      const vBarGeo = new THREE.BoxGeometry(0.12, 0.68, 0.12);
      const vBar = new THREE.Mesh(vBarGeo, materials.brassMaterial);
      vBar.position.y = 4.60;
      crossGroup.add(vBar);

      const hBarGeo = new THREE.BoxGeometry(0.46, 0.12, 0.12);
      const hBar = new THREE.Mesh(hBarGeo, materials.brassMaterial);
      hBar.position.y = 4.72;
      crossGroup.add(hBar);

      const crossBeadGeo = new THREE.SphereGeometry(0.08, 16, 16);
      const crossBead = new THREE.Mesh(crossBeadGeo, materials.champagneMaterial);
      crossBead.position.y = 4.96;
      crossGroup.add(crossBead);

      const leftBead = crossBead.clone();
      leftBead.position.set(-0.24, 4.72, 0);
      crossGroup.add(leftBead);

      const rightBead = crossBead.clone();
      rightBead.position.set(0.24, 4.72, 0);
      crossGroup.add(rightBead);

      kingGroup.add(crossGroup);
      tagShadows(kingGroup);
      return kingGroup;
    }

    function createQueenMesh() {
      const queenGroup = new THREE.Group();
      const pts = [
        new THREE.Vector2(0, 0),
        new THREE.Vector2(1.22, 0),
        new THREE.Vector2(1.22, 0.10),
        new THREE.Vector2(1.12, 0.20),
        new THREE.Vector2(1.04, 0.32),
        new THREE.Vector2(1.10, 0.42),
        new THREE.Vector2(0.92, 0.58),
        new THREE.Vector2(0.68, 0.95),
        new THREE.Vector2(0.48, 1.50),
        new THREE.Vector2(0.42, 2.05),
        new THREE.Vector2(0.50, 2.50),
        new THREE.Vector2(0.68, 2.85),
        new THREE.Vector2(0.74, 2.98),
        new THREE.Vector2(0.58, 3.10),
        new THREE.Vector2(0.68, 3.22),
        new THREE.Vector2(0.84, 3.58),
        new THREE.Vector2(0.92, 3.75),
        new THREE.Vector2(0.82, 3.82),
        new THREE.Vector2(0.38, 3.78),
        new THREE.Vector2(0.12, 3.82),
        new THREE.Vector2(0, 3.84)
      ];
      const bodyGeo = new THREE.LatheGeometry(pts, 36);
      bodyGeo.computeVertexNormals();
      const bodyMesh = new THREE.Mesh(bodyGeo, materials.pieceDarkMaterial);
      queenGroup.add(bodyMesh);

      const baseRingGeo = new THREE.TorusGeometry(1.08, 0.045, 16, 48);
      baseRingGeo.rotateX(Math.PI / 2);
      const baseRing = new THREE.Mesh(baseRingGeo, materials.brassMaterial);
      baseRing.position.y = 0.34;
      queenGroup.add(baseRing);

      const coronetRadius = 0.88;
      const coronetY = 3.80;
      for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2;
        const pearlGeo = new THREE.SphereGeometry(0.065, 12, 12);
        const pearl = new THREE.Mesh(pearlGeo, materials.champagneMaterial);
        pearl.position.set(Math.cos(angle) * coronetRadius, coronetY, Math.sin(angle) * coronetRadius);
        queenGroup.add(pearl);
      }

      const orbGeo = new THREE.SphereGeometry(0.18, 20, 20);
      const orbMesh = new THREE.Mesh(orbGeo, materials.brassMaterial);
      orbMesh.position.y = 4.02;
      queenGroup.add(orbMesh);

      const crownRimGeo = new THREE.TorusGeometry(0.88, 0.035, 16, 48);
      crownRimGeo.rotateX(Math.PI / 2);
      const crownRim = new THREE.Mesh(crownRimGeo, materials.brassMaterial);
      crownRim.position.y = 3.75;
      queenGroup.add(crownRim);

      tagShadows(queenGroup);
      return queenGroup;
    }

    function createRookMesh() {
      const rookGroup = new THREE.Group();
      const pts = [
        new THREE.Vector2(0, 0),
        new THREE.Vector2(1.15, 0),
        new THREE.Vector2(1.15, 0.12),
        new THREE.Vector2(1.06, 0.22),
        new THREE.Vector2(0.98, 0.35),
        new THREE.Vector2(1.02, 0.45),
        new THREE.Vector2(0.86, 0.60),
        new THREE.Vector2(0.78, 1.10),
        new THREE.Vector2(0.72, 1.70),
        new THREE.Vector2(0.68, 2.15),
        new THREE.Vector2(0.78, 2.35),
        new THREE.Vector2(0.94, 2.50),
        new THREE.Vector2(0.94, 2.65),
        new THREE.Vector2(0.65, 2.65),
        new THREE.Vector2(0, 2.65)
      ];
      const bodyGeo = new THREE.LatheGeometry(pts, 32);
      bodyGeo.computeVertexNormals();
      const bodyMesh = new THREE.Mesh(bodyGeo, materials.pieceDarkMaterial);
      rookGroup.add(bodyMesh);

      const baseRingGeo = new THREE.TorusGeometry(1.00, 0.04, 16, 40);
      baseRingGeo.rotateX(Math.PI / 2);
      const baseRing = new THREE.Mesh(baseRingGeo, materials.brassMaterial);
      baseRing.position.y = 0.36;
      rookGroup.add(baseRing);

      const machGeo = new THREE.TorusGeometry(0.88, 0.04, 16, 40);
      machGeo.rotateX(Math.PI / 2);
      const machRing = new THREE.Mesh(machGeo, materials.brassMaterial);
      machRing.position.y = 2.45;
      rookGroup.add(machRing);

      const numMerlons = 4;
      const merlonRadius = 0.80;
      for (let i = 0; i < numMerlons; i++) {
        const angle = (i / numMerlons) * Math.PI * 2 + Math.PI / 4;
        const merlonGeo = new THREE.BoxGeometry(0.42, 0.44, 0.22);
        const merlon = new THREE.Mesh(merlonGeo, materials.pieceDarkMaterial);
        merlon.position.set(Math.cos(angle) * merlonRadius, 2.85, Math.sin(angle) * merlonRadius);
        merlon.rotation.y = -angle + Math.PI / 2;
        rookGroup.add(merlon);

        const capGeo = new THREE.BoxGeometry(0.44, 0.04, 0.24);
        const cap = new THREE.Mesh(capGeo, materials.brassMaterial);
        cap.position.set(Math.cos(angle) * merlonRadius, 3.08, Math.sin(angle) * merlonRadius);
        cap.rotation.y = -angle + Math.PI / 2;
        rookGroup.add(cap);
      }

      tagShadows(rookGroup);
      return rookGroup;
    }

    function createBishopMesh() {
      const bishopGroup = new THREE.Group();
      const pts = [
        new THREE.Vector2(0, 0),
        new THREE.Vector2(1.10, 0),
        new THREE.Vector2(1.10, 0.10),
        new THREE.Vector2(1.02, 0.20),
        new THREE.Vector2(0.95, 0.32),
        new THREE.Vector2(0.98, 0.42),
        new THREE.Vector2(0.82, 0.58),
        new THREE.Vector2(0.62, 1.05),
        new THREE.Vector2(0.46, 1.60),
        new THREE.Vector2(0.42, 2.05),
        new THREE.Vector2(0.52, 2.38),
        new THREE.Vector2(0.65, 2.58),
        new THREE.Vector2(0.70, 2.70),
        new THREE.Vector2(0.54, 2.78),
        new THREE.Vector2(0.66, 2.88),
        new THREE.Vector2(0.66, 3.10),
        new THREE.Vector2(0.68, 3.32),
        new THREE.Vector2(0.56, 3.60),
        new THREE.Vector2(0.32, 3.82),
        new THREE.Vector2(0.12, 3.92),
        new THREE.Vector2(0, 3.95)
      ];
      const bodyGeo = new THREE.LatheGeometry(pts, 32);
      bodyGeo.computeVertexNormals();
      const bodyMesh = new THREE.Mesh(bodyGeo, materials.pieceDarkMaterial);
      bishopGroup.add(bodyMesh);

      const baseRingGeo = new THREE.TorusGeometry(0.96, 0.04, 16, 40);
      baseRingGeo.rotateX(Math.PI / 2);
      const baseRing = new THREE.Mesh(baseRingGeo, materials.brassMaterial);
      baseRing.position.y = 0.34;
      bishopGroup.add(baseRing);

      const collarRingGeo = new THREE.TorusGeometry(0.68, 0.035, 16, 36);
      collarRingGeo.rotateX(Math.PI / 2);
      const collar = new THREE.Mesh(collarRingGeo, materials.brassMaterial);
      collar.position.y = 2.70;
      bishopGroup.add(collar);

      const slitGeo = new THREE.BoxGeometry(0.045, 0.55, 0.70);
      const slitMesh = new THREE.Mesh(slitGeo, materials.brassMaterial);
      slitMesh.position.set(0.24, 3.42, 0);
      slitMesh.rotation.z = -Math.PI / 6;
      bishopGroup.add(slitMesh);

      const pearlGeo = new THREE.SphereGeometry(0.12, 16, 16);
      const pearlMesh = new THREE.Mesh(pearlGeo, materials.champagneMaterial);
      pearlMesh.position.y = 4.07;
      bishopGroup.add(pearlMesh);

      tagShadows(bishopGroup);
      return bishopGroup;
    }

    function createKnightMesh() {
      const knightGroup = new THREE.Group();

      const basePts = [
        new THREE.Vector2(0, 0),
        new THREE.Vector2(1.12, 0),
        new THREE.Vector2(1.12, 0.10),
        new THREE.Vector2(1.04, 0.20),
        new THREE.Vector2(0.96, 0.32),
        new THREE.Vector2(1.00, 0.42),
        new THREE.Vector2(0.88, 0.55),
        new THREE.Vector2(0.86, 0.72),
        new THREE.Vector2(0, 0.72)
      ];
      const baseGeo = new THREE.LatheGeometry(basePts, 32);
      baseGeo.computeVertexNormals();
      const baseMesh = new THREE.Mesh(baseGeo, materials.pieceDarkMaterial);
      knightGroup.add(baseMesh);

      const baseRingGeo = new THREE.TorusGeometry(0.98, 0.04, 16, 40);
      baseRingGeo.rotateX(Math.PI / 2);
      const baseRing = new THREE.Mesh(baseRingGeo, materials.brassMaterial);
      baseRing.position.y = 0.34;
      knightGroup.add(baseRing);

      const pedRingGeo = new THREE.TorusGeometry(0.86, 0.035, 16, 40);
      pedRingGeo.rotateX(Math.PI / 2);
      const pedRing = new THREE.Mesh(pedRingGeo, materials.brassMaterial);
      pedRing.position.y = 0.70;
      knightGroup.add(pedRing);

      const shape = new THREE.Shape();
      shape.moveTo(0.50, 0.72);
      shape.bezierCurveTo(0.68, 0.95, 0.65, 1.30, 0.52, 1.55);
      shape.bezierCurveTo(0.42, 1.70, 0.40, 1.85, 0.48, 1.98);
      shape.bezierCurveTo(0.60, 2.05, 0.76, 2.12, 0.92, 2.18);
      shape.lineTo(0.98, 2.26);
      shape.lineTo(0.90, 2.34);
      shape.bezierCurveTo(0.80, 2.45, 0.68, 2.62, 0.56, 2.80);
      shape.bezierCurveTo(0.48, 2.92, 0.44, 3.02, 0.42, 3.12);
      shape.lineTo(0.38, 3.38);
      shape.lineTo(0.28, 3.08);
      shape.bezierCurveTo(0.22, 3.05, 0.15, 2.95, 0.08, 2.82);
      shape.bezierCurveTo(-0.06, 2.50, -0.22, 2.15, -0.34, 1.70);
      shape.bezierCurveTo(-0.42, 1.35, -0.45, 1.05, -0.45, 0.72);
      shape.lineTo(0.50, 0.72);

      const extrudeSettings = {
        steps: 1,
        depth: 0.42,
        bevelEnabled: true,
        bevelThickness: 0.10,
        bevelSize: 0.10,
        bevelOffset: 0,
        bevelSegments: 4
      };
      const headGeo = new THREE.ExtrudeGeometry(shape, extrudeSettings);
      headGeo.center();
      headGeo.computeVertexNormals();

      const headMesh = new THREE.Mesh(headGeo, materials.pieceDarkMaterial);
      headMesh.position.set(0.04, 2.05, 0);
      knightGroup.add(headMesh);

      const earGeo = new THREE.ConeGeometry(0.08, 0.32, 8);
      earGeo.rotateX(Math.PI);
      const leftEar = new THREE.Mesh(earGeo, materials.pieceDarkMaterial);
      leftEar.position.set(0.36, 3.25, 0.18);
      leftEar.rotation.set(-0.2, 0.1, 0.25);
      knightGroup.add(leftEar);

      const rightEar = new THREE.Mesh(earGeo, materials.pieceDarkMaterial);
      rightEar.position.set(0.36, 3.25, -0.18);
      rightEar.rotation.set(0.2, -0.1, 0.25);
      knightGroup.add(rightEar);

      const maneSpineGeo = new THREE.BoxGeometry(0.10, 1.6, 0.12);
      const maneSpine = new THREE.Mesh(maneSpineGeo, materials.brassMaterial);
      maneSpine.position.set(-0.20, 2.15, 0);
      maneSpine.rotation.z = -0.42;
      knightGroup.add(maneSpine);

      const nostrilGeo = new THREE.SphereGeometry(0.05, 8, 8);
      const leftNostril = new THREE.Mesh(nostrilGeo, materials.brassMaterial);
      leftNostril.position.set(0.88, 2.28, 0.14);
      knightGroup.add(leftNostril);

      const rightNostril = new THREE.Mesh(nostrilGeo, materials.brassMaterial);
      rightNostril.position.set(0.88, 2.28, -0.14);
      knightGroup.add(rightNostril);

      tagShadows(knightGroup);
      return knightGroup;
    }

    const pieces = {};

    pieces.king = {
      mesh: createKingMesh(),
      shadow: createPieceShadow(1.5),
      targetPos: new THREE.Vector3(0.8, 0, 0.8),
      startPos: new THREE.Vector3(0.8, 18, 0.8),
      targetRot: new THREE.Vector3(0, 0, 0)
    };
    scene.add(pieces.king.mesh);

    pieces.queen = {
      mesh: createQueenMesh(),
      shadow: createPieceShadow(1.35),
      targetPos: new THREE.Vector3(-1.0, 0, 0.8),
      startPos: new THREE.Vector3(-1.0, -3.5, 0.8),
      targetRot: new THREE.Vector3(0, 0, 0)
    };
    scene.add(pieces.queen.mesh);

    pieces.rook1 = {
      mesh: createRookMesh(),
      shadow: createPieceShadow(1.2),
      targetPos: new THREE.Vector3(5.0, 0, -1.4),
      startPos: new THREE.Vector3(5.0, -3.2, -1.4),
      targetRot: new THREE.Vector3(0, 0, 0)
    };
    scene.add(pieces.rook1.mesh);

    pieces.rook2 = {
      mesh: createRookMesh(),
      shadow: createPieceShadow(1.2),
      targetPos: new THREE.Vector3(-5.0, 0, -1.4),
      startPos: new THREE.Vector3(-5.0, -3.2, -1.4),
      targetRot: new THREE.Vector3(0, 0, 0)
    };
    scene.add(pieces.rook2.mesh);

    pieces.bishop1 = {
      mesh: createBishopMesh(),
      shadow: createPieceShadow(1.2),
      targetPos: new THREE.Vector3(3.0, 0, -1.0),
      startPos: new THREE.Vector3(3.0, -3.2, -1.0),
      targetRot: new THREE.Vector3(0, 0, 0)
    };
    scene.add(pieces.bishop1.mesh);

    pieces.bishop2 = {
      mesh: createBishopMesh(),
      shadow: createPieceShadow(1.2),
      targetPos: new THREE.Vector3(-3.0, 0, -1.0),
      startPos: new THREE.Vector3(-3.0, -3.2, -1.0),
      targetRot: new THREE.Vector3(0, 0, 0)
    };
    scene.add(pieces.bishop2.mesh);

    pieces.knight1 = {
      mesh: createKnightMesh(),
      shadow: createPieceShadow(1.25),
      targetPos: new THREE.Vector3(3.0, 0, 1.6),
      startPos: new THREE.Vector3(3.0, -3.2, 1.6),
      targetRot: new THREE.Vector3(0, -0.45, 0)
    };
    scene.add(pieces.knight1.mesh);

    pieces.knight2 = {
      mesh: createKnightMesh(),
      shadow: createPieceShadow(1.25),
      targetPos: new THREE.Vector3(-3.0, 0, 1.6),
      startPos: new THREE.Vector3(-3.0, -3.2, 1.6),
      targetRot: new THREE.Vector3(0, 0.45, 0)
    };
    scene.add(pieces.knight2.mesh);

    function updatePieceShadow(p) {
      const y = p.mesh.position.y;
      p.shadow.position.x = p.mesh.position.x;
      p.shadow.position.z = p.mesh.position.z;
      if (y > 10 || p.mesh.scale.x < 0.05) {
        p.shadow.material.opacity = 0;
      } else {
        const falloff = Math.max(0, 1 - y / 3.0);
        p.shadow.material.opacity = falloff * 0.70 * p.mesh.scale.x;
        const s = Math.max(0.2, 1 + y * 0.25);
        p.shadow.scale.set(s, s, s);
      }
    }

    function createParticleTexture() {
      const c = document.createElement('canvas');
      c.width = 64;
      c.height = 64;
      const ctx = c.getContext('2d');
      const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      grad.addColorStop(0, 'rgba(255, 240, 195, 1.0)');
      grad.addColorStop(0.3, 'rgba(228, 201, 138, 0.75)');
      grad.addColorStop(0.65, 'rgba(198, 161, 91, 0.25)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 64, 64);
      return new THREE.CanvasTexture(c);
    }
    const particleTexture = createParticleTexture();

    const AMBIENT_COUNT = 110;
    const ambGeo = new THREE.BufferGeometry();
    const ambPos = new Float32Array(AMBIENT_COUNT * 3);
    const ambVel = [];

    for (let i = 0; i < AMBIENT_COUNT; i++) {
      ambPos[i * 3 + 0] = (Math.random() - 0.5) * 24;
      ambPos[i * 3 + 1] = Math.random() * 14 + 0.5;
      ambPos[i * 3 + 2] = (Math.random() - 0.5) * 20;
      ambVel.push({
        x: (Math.random() - 0.5) * 0.008,
        y: Math.random() * 0.012 + 0.004,
        z: (Math.random() - 0.5) * 0.008,
        phase: Math.random() * Math.PI * 2
      });
    }
    ambGeo.setAttribute('position', new THREE.BufferAttribute(ambPos, 3));
    const ambMat = new THREE.PointsMaterial({
      map: particleTexture,
      size: 0.38,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    const ambientParticles = new THREE.Points(ambGeo, ambMat);
    scene.add(ambientParticles);

    const SHOCKWAVE_COUNT = 90;
    const shockGeo = new THREE.BufferGeometry();
    const shockPos = new Float32Array(SHOCKWAVE_COUNT * 3);
    const shockData = [];

    for (let i = 0; i < SHOCKWAVE_COUNT; i++) {
      shockPos[i * 3 + 0] = 0.8;
      shockPos[i * 3 + 1] = 0.08;
      shockPos[i * 3 + 2] = 0.8;
      const angle = (i / SHOCKWAVE_COUNT) * Math.PI * 2 + (Math.random() - 0.5) * 0.2;
      const speed = 4.2 + Math.random() * 2.8;
      shockData.push({
        originX: 0.8,
        originZ: 0.8,
        vx: Math.cos(angle) * speed,
        vz: Math.sin(angle) * speed,
        vy: Math.random() * 0.9 + 0.1,
        active: false,
        age: 0,
        lifespan: 0.85
      });
    }
    shockGeo.setAttribute('position', new THREE.BufferAttribute(shockPos, 3));
    const shockMat = new THREE.PointsMaterial({
      map: particleTexture,
      size: 0.44,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    const shockParticles = new THREE.Points(shockGeo, shockMat);
    scene.add(shockParticles);

    function triggerKingShockwave() {
      shockMat.opacity = 0.95;
      for (let i = 0; i < SHOCKWAVE_COUNT; i++) {
        shockData[i].active = true;
        shockData[i].age = 0;
        shockPos[i * 3 + 0] = 0.8;
        shockPos[i * 3 + 1] = 0.08;
        shockPos[i * 3 + 2] = 0.8;
      }
      shockGeo.attributes.position.needsUpdate = true;
    }

    const MIST_COUNT = 80;
    const mistGeo = new THREE.BufferGeometry();
    const mistPos = new Float32Array(MIST_COUNT * 3);
    const mistData = [];

    for (let i = 0; i < MIST_COUNT; i++) {
      mistPos[i * 3 + 0] = 0;
      mistPos[i * 3 + 1] = -10;
      mistPos[i * 3 + 2] = 0;
      mistData.push({
        active: false,
        age: 0,
        lifespan: 1.0,
        vx: 0,
        vy: 0,
        vz: 0
      });
    }
    mistGeo.setAttribute('position', new THREE.BufferAttribute(mistPos, 3));
    const mistMat = new THREE.PointsMaterial({
      map: particleTexture,
      size: 0.36,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    const mistParticles = new THREE.Points(mistGeo, mistMat);
    scene.add(mistParticles);

    function spawnRevealMist(x, z, count = 20) {
      let spawned = 0;
      for (let i = 0; i < MIST_COUNT && spawned < count; i++) {
        if (!mistData[i].active) {
          mistData[i].active = true;
          mistData[i].age = 0;
          mistData[i].lifespan = 0.9 + Math.random() * 0.4;
          mistPos[i * 3 + 0] = x + (Math.random() - 0.5) * 1.4;
          mistPos[i * 3 + 1] = 0.15;
          mistPos[i * 3 + 2] = z + (Math.random() - 0.5) * 1.4;
          const theta = Math.random() * Math.PI * 2;
          mistData[i].vx = Math.cos(theta) * 0.35;
          mistData[i].vy = 1.2 + Math.random() * 1.4;
          mistData[i].vz = Math.sin(theta) * 0.35;
          spawned++;
        }
      }
      mistGeo.attributes.position.needsUpdate = true;
      mistMat.opacity = 0.85;
    }

    const SHIMMER_COUNT = 65;
    const shimGeo = new THREE.BufferGeometry();
    const shimPos = new Float32Array(SHIMMER_COUNT * 3);
    const shimVel = [];

    for (let i = 0; i < SHIMMER_COUNT; i++) {
      shimPos[i * 3 + 0] = (Math.random() - 0.5) * 14;
      shimPos[i * 3 + 1] = Math.random() * 6;
      shimPos[i * 3 + 2] = (Math.random() - 0.5) * 10;
      shimVel.push({
        y: Math.random() * 0.02 + 0.01,
        osc: Math.random() * Math.PI * 2
      });
    }
    shimGeo.setAttribute('position', new THREE.BufferAttribute(shimPos, 3));
    const shimMat = new THREE.PointsMaterial({
      map: particleTexture,
      size: 0.34,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    const shimmerParticles = new THREE.Points(shimGeo, shimMat);
    scene.add(shimmerParticles);

    const LOOP_DURATION = 14.0;
    let timelineTime = 0.0;
    let kingHasImpacted = false;
    let cameraShakeIntensity = 0;

    function easeInCubic(x) { return x * x * x; }
    function easeOutCubic(x) { return 1 - Math.pow(1 - x, 3); }
    function easeInOutQuad(x) { return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2; }

    function resetToOpening() {
      timelineTime = 0;
      kingHasImpacted = false;
      cameraShakeIntensity = 0;

      pieces.king.mesh.position.copy(pieces.king.startPos);
      pieces.king.mesh.rotation.set(0, 0, 0);
      pieces.king.mesh.scale.set(1, 1, 1);
      updatePieceShadow(pieces.king);

      ['queen', 'rook1', 'rook2', 'bishop1', 'bishop2', 'knight1', 'knight2'].forEach((k) => {
        pieces[k].mesh.position.copy(pieces[k].startPos);
        pieces[k].mesh.rotation.set(0, 0, 0);
        pieces[k].mesh.scale.set(0.001, 0.001, 0.001);
        updatePieceShadow(pieces[k]);
      });

      kingSpotLight.intensity = 0.4;
      sweepLight.intensity = 0;
      shimMat.opacity = 0;
    }

    resetToOpening();

    if (prefersReducedMotion) {
      Object.keys(pieces).forEach((k) => {
        pieces[k].mesh.position.copy(pieces[k].targetPos);
        pieces[k].mesh.rotation.copy(pieces[k].targetRot);
        pieces[k].mesh.scale.set(1, 1, 1);
        updatePieceShadow(pieces[k]);
      });
      kingSpotLight.intensity = 2.2;
    }

    function updateTimeline(delta) {
      if (prefersReducedMotion) return;

      timelineTime += delta;
      if (timelineTime >= LOOP_DURATION) {
        timelineTime = 0;
        resetToOpening();
      }

      const t = timelineTime;

      if (t < 2.0) {
        if (t < 1.70) {

          const p = easeInCubic(t / 1.70);
          pieces.king.mesh.position.y = 18.0 * (1 - p);
          pieces.king.mesh.position.x = pieces.king.targetPos.x;
          pieces.king.mesh.position.z = pieces.king.targetPos.z;

          kingSpotLight.intensity = 0.4 + p * 1.8;
          updatePieceShadow(pieces.king);
        } else {

          if (!kingHasImpacted) {
            kingHasImpacted = true;
            triggerKingShockwave();
            cameraShakeIntensity = 0.09;
          }

          const dt = t - 1.70;

          const bounce = Math.sin(dt * 30.0) * Math.exp(-dt * 14.0) * 0.42;
          pieces.king.mesh.position.y = Math.max(0, bounce);
          pieces.king.mesh.position.x = pieces.king.targetPos.x;
          pieces.king.mesh.position.z = pieces.king.targetPos.z;
          updatePieceShadow(pieces.king);

          cameraShakeIntensity = Math.max(0, 0.09 * Math.exp(-dt * 9.0));
        }
      }

      if (t >= 2.0 && t < 4.0) {
        pieces.king.mesh.position.y = 0;
        updatePieceShadow(pieces.king);

        if (t >= 2.2 && t < 3.7) {
          const rotP = (t - 2.2) / 1.5;
          pieces.king.mesh.rotation.y = rotP * Math.PI * 2;

          sweepLight.intensity = Math.sin(rotP * Math.PI) * 2.2;
          sweepLight.position.x = Math.cos(rotP * Math.PI * 2) * 3.2 + 0.8;
          sweepLight.position.z = Math.sin(rotP * Math.PI * 2) * 3.2 + 0.8;
        } else if (t >= 3.7) {
          pieces.king.mesh.rotation.y = 0;
          sweepLight.intensity = Math.max(0, sweepLight.intensity - delta * 4);
        }

        if (t >= 3.4 && t < 3.9) {
          const bowP = (t - 3.4) / 0.5;

          pieces.king.mesh.rotation.x = Math.sin(bowP * Math.PI) * 0.17;
        } else if (t >= 3.9) {
          pieces.king.mesh.rotation.x = 0;
        }
      }

      if (t >= 4.0 && t < 5.5) {
        const qT = t - 4.0;
        if (qT < 1.0) {
          if (qT < 0.05) spawnRevealMist(-1.0, 0.8, 25);
          const p = easeOutCubic(qT / 1.0);
          pieces.queen.mesh.position.y = -3.5 * (1 - p);
          pieces.queen.mesh.scale.setScalar(p);
          updatePieceShadow(pieces.queen);
        } else {
          pieces.queen.mesh.position.y = 0;
          pieces.queen.mesh.scale.setScalar(1);
          updatePieceShadow(pieces.queen);
        }

        if (qT >= 0.8 && qT <= 1.4) {
          const rotP = (qT - 0.8) / 0.6;
          pieces.queen.mesh.rotation.y = (1 - Math.cos(rotP * Math.PI * 0.5)) * (Math.PI / 2);
        } else if (qT > 1.4) {
          pieces.queen.mesh.rotation.y = Math.PI / 2 * 0;
        }
      }

      if (t >= 5.5 && t < 7.0) {

        if (t >= 5.5 && t < 6.3) {
          const r1T = (t - 5.5) / 0.75;
          if (r1T < 0.08) spawnRevealMist(5.0, -1.4, 18);
          const p = easeOutCubic(Math.min(1, r1T));
          pieces.rook1.mesh.position.y = -3.2 * (1 - p);
          pieces.rook1.mesh.scale.setScalar(p);
          pieces.rook1.mesh.rotation.y = (1 - p) * 0.8;
          updatePieceShadow(pieces.rook1);
        } else if (t >= 6.3) {
          pieces.rook1.mesh.position.y = 0;
          pieces.rook1.mesh.scale.setScalar(1);
          pieces.rook1.mesh.rotation.y = 0;
          updatePieceShadow(pieces.rook1);
        }

        if (t >= 6.1 && t < 6.9) {
          const r2T = (t - 6.1) / 0.75;
          if (r2T < 0.08) spawnRevealMist(-5.0, -1.4, 18);
          const p = easeOutCubic(Math.min(1, r2T));
          pieces.rook2.mesh.position.y = -3.2 * (1 - p);
          pieces.rook2.mesh.scale.setScalar(p);
          pieces.rook2.mesh.rotation.y = -(1 - p) * 0.8;
          updatePieceShadow(pieces.rook2);
        } else if (t >= 6.9) {
          pieces.rook2.mesh.position.y = 0;
          pieces.rook2.mesh.scale.setScalar(1);
          pieces.rook2.mesh.rotation.y = 0;
          updatePieceShadow(pieces.rook2);
        }
      }

      if (t >= 7.0 && t < 8.5) {

        if (t >= 7.0 && t < 7.8) {
          const b1T = (t - 7.0) / 0.75;
          if (b1T < 0.08) spawnRevealMist(3.0, -1.0, 18);
          const p = easeOutCubic(Math.min(1, b1T));
          pieces.bishop1.mesh.position.y = -3.2 * (1 - p);
          pieces.bishop1.mesh.scale.setScalar(p);
          pieces.bishop1.mesh.rotation.y = (1 - p) * Math.PI * 0.5;
          updatePieceShadow(pieces.bishop1);
        } else if (t >= 7.8) {
          pieces.bishop1.mesh.position.y = 0;
          pieces.bishop1.mesh.scale.setScalar(1);
          pieces.bishop1.mesh.rotation.y = 0;
          updatePieceShadow(pieces.bishop1);
        }

        if (t >= 7.6 && t < 8.4) {
          const b2T = (t - 7.6) / 0.75;
          if (b2T < 0.08) spawnRevealMist(-3.0, -1.0, 18);
          const p = easeOutCubic(Math.min(1, b2T));
          pieces.bishop2.mesh.position.y = -3.2 * (1 - p);
          pieces.bishop2.mesh.scale.setScalar(p);
          pieces.bishop2.mesh.rotation.y = -(1 - p) * Math.PI * 0.5;
          updatePieceShadow(pieces.bishop2);
        } else if (t >= 8.4) {
          pieces.bishop2.mesh.position.y = 0;
          pieces.bishop2.mesh.scale.setScalar(1);
          pieces.bishop2.mesh.rotation.y = 0;
          updatePieceShadow(pieces.bishop2);
        }
      }

      if (t >= 8.5 && t < 10.5) {

        if (t >= 8.5 && t < 9.5) {
          const k1T = (t - 8.5) / 0.9;
          if (k1T < 0.08) spawnRevealMist(3.0, 1.6, 20);
          const p = easeOutCubic(Math.min(1, k1T));
          pieces.knight1.mesh.position.y = -3.2 * (1 - p);
          pieces.knight1.mesh.scale.setScalar(p);

          pieces.knight1.mesh.rotation.y = p * pieces.knight1.targetRot.y;
          updatePieceShadow(pieces.knight1);
        } else if (t >= 9.5) {
          pieces.knight1.mesh.position.y = 0;
          pieces.knight1.mesh.scale.setScalar(1);
          pieces.knight1.mesh.rotation.y = pieces.knight1.targetRot.y;
          updatePieceShadow(pieces.knight1);
        }

        if (t >= 9.3 && t < 10.3) {
          const k2T = (t - 9.3) / 0.9;
          if (k2T < 0.08) spawnRevealMist(-3.0, 1.6, 20);
          const p = easeOutCubic(Math.min(1, k2T));
          pieces.knight2.mesh.position.y = -3.2 * (1 - p);
          pieces.knight2.mesh.scale.setScalar(p);

          pieces.knight2.mesh.rotation.y = p * pieces.knight2.targetRot.y;
          updatePieceShadow(pieces.knight2);
        } else if (t >= 10.3) {
          pieces.knight2.mesh.position.y = 0;
          pieces.knight2.mesh.scale.setScalar(1);
          pieces.knight2.mesh.rotation.y = pieces.knight2.targetRot.y;
          updatePieceShadow(pieces.knight2);
        }
      }

      if (t >= 10.5) {

        Object.keys(pieces).forEach((k) => {
          pieces[k].mesh.position.copy(pieces[k].targetPos);
          pieces[k].mesh.scale.setScalar(1);
          updatePieceShadow(pieces[k]);
        });

        if (t < 12.5) {
          const orbitP = (t - 10.5) / 2.0;
          const arc = Math.sin(orbitP * Math.PI);
          cameraOrbitOffset.x = arc * 2.8;
          cameraOrbitOffset.y = -arc * 0.7;
          cameraOrbitOffset.z = -arc * 1.2;

          shimMat.opacity = Math.min(0.85, arc * 1.1);
        } else {
          cameraOrbitOffset.set(0, 0, 0);
          shimMat.opacity = Math.max(0, shimMat.opacity - delta * 0.8);
        }

        if (t >= 13.4) {
          const fadeP = (t - 13.4) / 0.6;

          ['queen', 'rook1', 'rook2', 'bishop1', 'bishop2', 'knight1', 'knight2'].forEach((k) => {
            pieces[k].mesh.position.y = -fadeP * 3.5;
            pieces[k].mesh.scale.setScalar(Math.max(0.001, 1 - fadeP));
            updatePieceShadow(pieces[k]);
          });
          pieces.king.mesh.position.y = fadeP * 18;
          updatePieceShadow(pieces.king);
        }
      }
    }

    const cameraOrbitOffset = new THREE.Vector3(0, 0, 0);

    function updateParticles(delta) {

      const aPos = ambGeo.attributes.position.array;
      for (let i = 0; i < AMBIENT_COUNT; i++) {
        const idx = i * 3;
        ambVel[i].phase += delta * 0.8;
        aPos[idx + 0] += Math.sin(ambVel[i].phase) * 0.005;
        aPos[idx + 1] += ambVel[i].y;
        aPos[idx + 2] += Math.cos(ambVel[i].phase) * 0.005;

        if (aPos[idx + 1] > 15) {
          aPos[idx + 1] = 0.5;
        }
      }
      ambGeo.attributes.position.needsUpdate = true;

      if (shockMat.opacity > 0.01) {
        const sPos = shockGeo.attributes.position.array;
        let anyActive = false;
        for (let i = 0; i < SHOCKWAVE_COUNT; i++) {
          if (shockData[i].active) {
            shockData[i].age += delta;
            const progress = shockData[i].age / shockData[i].lifespan;
            if (progress >= 1) {
              shockData[i].active = false;
            } else {
              anyActive = true;
              const idx = i * 3;

              const drag = Math.pow(0.2, delta);
              shockData[i].vx *= drag;
              shockData[i].vz *= drag;
              sPos[idx + 0] += shockData[i].vx * delta * 5.0;
              sPos[idx + 1] += shockData[i].vy * delta;
              sPos[idx + 2] += shockData[i].vz * delta * 5.0;
            }
          }
        }
        shockGeo.attributes.position.needsUpdate = true;
        if (!anyActive) {
          shockMat.opacity = Math.max(0, shockMat.opacity - delta * 3);
        }
      }

      if (mistMat.opacity > 0.01) {
        const mPos = mistGeo.attributes.position.array;
        let anyMistActive = false;
        for (let i = 0; i < MIST_COUNT; i++) {
          if (mistData[i].active) {
            mistData[i].age += delta;
            const progress = mistData[i].age / mistData[i].lifespan;
            if (progress >= 1) {
              mistData[i].active = false;
            } else {
              anyMistActive = true;
              const idx = i * 3;
              mPos[idx + 0] += mistData[i].vx * delta;
              mPos[idx + 1] += mistData[i].vy * delta;
              mPos[idx + 2] += mistData[i].vz * delta;
            }
          }
        }
        mistGeo.attributes.position.needsUpdate = true;
        if (!anyMistActive) {
          mistMat.opacity = Math.max(0, mistMat.opacity - delta * 2);
        }
      }

      if (shimMat.opacity > 0.01) {
        const shPos = shimGeo.attributes.position.array;
        for (let i = 0; i < SHIMMER_COUNT; i++) {
          const idx = i * 3;
          shimVel[i].osc += delta * 1.5;
          shPos[idx + 0] += Math.sin(shimVel[i].osc) * 0.008;
          shPos[idx + 1] += shimVel[i].y * 2.0;
          if (shPos[idx + 1] > 8.0) {
            shPos[idx + 1] = 0.2;
          }
        }
        shimGeo.attributes.position.needsUpdate = true;
      }
    }

    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    let isDragging = false;
    let prevMousePos = { x: 0, y: 0 };
    let dragOrbit = { x: 0, y: 0, targetX: 0, targetY: 0 };

    container.addEventListener('mousemove', (e) => {
      const rect = container.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouse.targetX = nx;
      mouse.targetY = ny;

      if (isDragging) {
        const dx = e.clientX - prevMousePos.x;
        const dy = e.clientY - prevMousePos.y;
        dragOrbit.targetX += dx * 0.006;
        dragOrbit.targetY += dy * 0.006;

        dragOrbit.targetX = Math.max(-0.6, Math.min(0.6, dragOrbit.targetX));
        dragOrbit.targetY = Math.max(-0.25, Math.min(0.35, dragOrbit.targetY));
        prevMousePos = { x: e.clientX, y: e.clientY };
      }
    });

    container.addEventListener('mousedown', (e) => {
      isDragging = true;
      prevMousePos = { x: e.clientX, y: e.clientY };
    });

    window.addEventListener('mouseup', () => {
      isDragging = false;
    });

    container.addEventListener('mouseleave', () => {
      mouse.targetX = 0;
      mouse.targetY = 0;
      isDragging = false;
    });

    container.addEventListener('touchmove', (e) => {
      if (e.touches.length === 1) {
        const touch = e.touches[0];
        const rect = container.getBoundingClientRect();
        mouse.targetX = ((touch.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.targetY = -(((touch.clientY - rect.top) / rect.height) * 2 - 1);
      }
    }, { passive: true });

    const raycaster = new THREE.Raycaster();
    const rayMouse = new THREE.Vector2();
    let hoveredPiece = null;

    container.addEventListener('pointermove', (e) => {
      const rect = container.getBoundingClientRect();
      rayMouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      rayMouse.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

      raycaster.setFromCamera(rayMouse, camera);
      const meshesToTest = Object.values(pieces).map(p => p.mesh);
      const intersects = raycaster.intersectObjects(meshesToTest, true);

      if (intersects.length > 0) {
        container.style.cursor = 'pointer';
        hoveredPiece = intersects[0].object;
      } else {
        container.style.cursor = isDragging ? 'grabbing' : 'grab';
        hoveredPiece = null;
      }
    });

    container.addEventListener('click', () => {
      if (timelineTime > 12.0) {
        resetToOpening();
      }
    });

    function onResize() {
      width = container.clientWidth || 480;
      height = container.clientHeight || 540;
      if (width === 0 || height === 0) return;

      camera.aspect = width / height;

      if (width < 400) {

        BASE_CAM_POS.set(0, 14.5, 24.0);
        camera.fov = 54;
      } else if (width < 600) {

        BASE_CAM_POS.set(0, 14.0, 22.5);
        camera.fov = 52;
      } else {

        BASE_CAM_POS.set(0, 13.0, 20.5);
        camera.fov = 50;
      }

      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    }

    if (window.ResizeObserver) {
      const resizeObserver = new ResizeObserver(() => onResize());
      resizeObserver.observe(container);
    } else {
      window.addEventListener('resize', onResize);
    }
    onResize();

    let isVisible = true;
    let isTabActive = true;
    let lastTime = performance.now();
    let animFrameId = null;

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
          if (isVisible && isTabActive && !animFrameId) {
            lastTime = performance.now();
            tick(lastTime);
          }
        });
      }, { threshold: 0.1 });
      observer.observe(container);
    }

    document.addEventListener('visibilitychange', () => {
      isTabActive = !document.hidden;
      if (isVisible && isTabActive && !animFrameId) {
        lastTime = performance.now();
        tick(lastTime);
      }
    });

    function tick(now) {
      if (!isVisible || !isTabActive) {
        animFrameId = null;
        return;
      }

      const delta = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      updateTimeline(delta);

      updateParticles(delta);

      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      dragOrbit.x += (dragOrbit.targetX - dragOrbit.x) * 0.08;
      dragOrbit.y += (dragOrbit.targetY - dragOrbit.y) * 0.08;

      let shakeX = 0;
      let shakeY = 0;
      if (cameraShakeIntensity > 0.001) {
        shakeX = (Math.random() - 0.5) * cameraShakeIntensity;
        shakeY = (Math.random() - 0.5) * cameraShakeIntensity;
      }

      camera.position.x = BASE_CAM_POS.x + cameraOrbitOffset.x + mouse.x * 2.2 + dragOrbit.x * 4.0 + shakeX;
      camera.position.y = BASE_CAM_POS.y + cameraOrbitOffset.y - mouse.y * 1.3 - dragOrbit.y * 3.0 + shakeY;
      camera.position.z = BASE_CAM_POS.z + cameraOrbitOffset.z;

      camera.lookAt(
        BASE_CAM_LOOK.x + mouse.x * 0.6 + dragOrbit.x * 1.2,
        BASE_CAM_LOOK.y,
        BASE_CAM_LOOK.z
      );

      renderer.render(scene, camera);
      animFrameId = requestAnimationFrame(tick);
    }

    animFrameId = requestAnimationFrame(tick);

    window.__chess3dCleanup = function () {
      if (animFrameId) cancelAnimationFrame(animFrameId);
      scene.traverse((obj) => {
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) {
          if (Array.isArray(obj.material)) {
            obj.material.forEach((m) => m.dispose());
          } else {
            obj.material.dispose();
          }
        }
      });
      renderer.dispose();
    };
  }

  function showFallback(container) {
    container.innerHTML = `
      <div style="display:flex;align-items:center;justify-content:center;height:100%;background:radial-gradient(circle,#073B3A 0%,#041515 100%);color:#E4C98A;font-family:'Cinzel',serif;text-align:center;padding:24px;">
        <div>
          <svg width="64" height="64" viewBox="0 0 44 44" fill="none" style="margin-bottom:12px;">
            <path d="M22 3L6 9V20C6 30.5 12.8 40.2 22 42.5C31.2 40.2 38 30.5 38 20V9L22 3Z" stroke="#E4C98A" stroke-width="2" fill="#073B3A"/>
            <path d="M19 14C19 14 16.5 15.5 15.5 18C14.5 20.5 16 22 17 22C17.5 22 18.5 20.5 20.5 20.5C21.8 20.5 22.8 21.2 22.8 22.5C22.8 23.5 21.5 24.2 20 25C18 26 15 28 15 32H29C29 29.5 27.5 27.5 26.5 26C25.5 24.5 25.8 23 27 21C28.2 19 28 16 25 14C23 12.7 20.5 13 19 14Z" fill="#C6A15B"/>
          </svg>
          <div style="font-size:1.1rem;letter-spacing:0.1em;font-weight:700;">STRATAGEM 3D CHESS ACADEMY</div>
        </div>
      </div>
    `;
  }
})();
