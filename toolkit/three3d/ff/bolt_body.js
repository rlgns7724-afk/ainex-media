// ================= 동전 하나로 사람이 죽을까 (과학 what-if) =================
import { OutlineEffect } from 'three/addons/effects/OutlineEffect.js';
const TLFILE = 'bolt_timeline.json';
const grad = (() => { const d = new Uint8Array([120, 190, 255]); const t = new THREE.DataTexture(d, 3, 1, THREE.RedFormat); t.minFilter = t.magFilter = THREE.NearestFilter; t.needsUpdate = true; return t; })();
const MM = (c, o = {}) => new THREE.MeshToonMaterial({ color: c, gradientMap: grad, ...o });
const NO_OL = m => { m.userData.outlineParameters = { visible: false }; return m; };
const ORG = 0xff5a1f, TEAL = 0x2f8f8a, GRY = 0xcfd2d6, DK = 0x2a2d33;
const BGC = new THREE.Color(0x7d8aa6); scene.background = BGC.clone(); scene.fog = new THREE.Fog(BGC, 26, 60);
const hemi = new THREE.HemisphereLight(0xfff4e6, 0x6a5a8a, 1.6); scene.add(hemi);
const sun = new THREE.DirectionalLight(0xffffff, 2.0); sun.position.set(-6, 14, 9); sun.castShadow = true; sun.shadow.mapSize.set(2048, 2048); Object.assign(sun.shadow.camera, { left: -14, right: 14, top: 14, bottom: -14, far: 60 }); sun.shadow.bias = -.0006; sun.shadow.radius = 4; scene.add(sun, sun.target);
const floorTex = canvasTex(512, 512, (x, w, h) => { x.fillStyle = '#7fae5a'; x.fillRect(0, 0, w, h); for (let i = 0; i < 260; i++) { x.strokeStyle = i % 2 ? 'rgba(40,90,30,.35)' : 'rgba(190,230,140,.35)'; x.lineWidth = 3; const a = (i * 97) % 512, b = (i * 211) % 512; x.beginPath(); x.moveTo(a, b); x.lineTo(a + 4, b - 14); x.stroke(); } }, 40, 8);
const floor = add(mesh(new THREE.PlaneGeometry(240, 48), new THREE.MeshToonMaterial({ map: floorTex, gradientMap: grad })), 60, 0, 0); floor.rotation.x = -Math.PI / 2; floor.receiveShadow = true;
for (let i = 0; i < 26; i++) add(mesh(new THREE.SphereGeometry(5 + (i % 3) * 2, 14, 10), MM([0x5f8a4a, 0x6e9a55, 0x557f44][i % 3])), -14 + i * 4.2, -2.5, -16 - (i % 2) * 3);
// ---------- paper-doll person (기존 그림체) ----------
const INK = '#1d1a22';
function drawChar(sp, pose, fr) { const PADS = pose.includes('P'), COV = pose.includes('C'); pose = pose.replace(/[PC]/g, ''); const c = document.createElement('canvas'); c.width = 256; c.height = 512; const x = c.getContext('2d'); x.lineJoin = x.lineCap = 'round'; x.lineWidth = 9; x.strokeStyle = INK; const col = sp.col, skin = '#f3dcc6';
  [.06, -.06].forEach((a, i) => { const sd = i ? 1 : -1; x.save(); x.translate(128 + sd * 22, 330); x.rotate(a); x.fillStyle = sp.pants || '#2b2a35'; x.beginPath(); x.roundRect(-14, 0, 28, 150, 12); x.fill(); x.stroke(); x.fillStyle = INK; x.beginPath(); x.ellipse(sd * 6, 150, 26, 13, 0, 0, 7); x.fill(); x.restore(); });
  x.fillStyle = col; x.beginPath(); x.roundRect(68, 190, 120, 160, 34); x.fill(); x.stroke(); if (sp.btn) { x.fillStyle = '#e8e2d6'; [230, 270, 310].forEach(y => { x.beginPath(); x.arc(128, y, 8, 0, 7); x.fill(); x.lineWidth = 4; x.stroke(); x.lineWidth = 9; }); } if (sp.tie) { x.fillStyle = sp.tie; x.beginPath(); x.moveTo(128, 196); x.lineTo(118, 240); x.lineTo(128, 252); x.lineTo(138, 240); x.fill(); }
  let arms = [-.25, .25]; if (pose == 'write') arms = [-.6, .7 + fr * .15]; if (pose == 'shock') arms = [-2.5, 2.6]; if (pose == 'paper') arms = [-1.0, 1.0]; if (pose == 'point') arms = [-.2, 1.5]; if (pose == 'behind') arms = [.3, -.3];
  arms.forEach((a, i) => { const sd = i ? 1 : -1; x.save(); x.translate(128 + sd * 58, 210); x.rotate(a); x.fillStyle = col; x.beginPath(); x.roundRect(-14, 0, 28, 120, 12); x.fill(); x.stroke(); x.fillStyle = skin; x.beginPath(); x.arc(0, 128, 15, 0, 7); x.fill(); x.stroke(); if (pose == 'write' && i == 1) { x.fillStyle = '#f2c230'; x.fillRect(-4, 130, 8, 40); } x.restore(); });
  if (pose == 'paper') { x.fillStyle = '#fff'; x.beginPath(); x.roundRect(70, 250, 116, 130, 6); x.fill(); x.lineWidth = 6; x.stroke(); x.fillStyle = '#3d8fd6'; [[85, 40], [105, 70], [125, 50], [145, 30], [165, 100]].forEach(([bx, bh], k) => x.fillRect(bx - 8, 365 - bh, 16, bh)); x.fillStyle = '#d9443a'; x.fillRect(157, 265, 16, 100); x.lineWidth = 9; }
  if (COV) { x.fillStyle = 'rgba(255,90,31,.92)'; x.beginPath(); x.roundRect(60, 180, 136, 290, 26); x.fill(); x.lineWidth = 6; x.stroke(); x.lineWidth = 9; }
  if (PADS) { const hp = pose == 'shock' ? [[128 - 58 + Math.sin(-2.5) * -128, 210 + Math.cos(-2.5) * 128], [128 + 58 + Math.sin(2.6) * -128, 210 + Math.cos(2.6) * 128]] : [[128 - 58 + Math.sin(-.25) * -128, 338], [128 + 58 + Math.sin(.25) * -128, 338]]; hp.forEach(([hx, hy]) => { x.fillStyle = '#ff5a1f'; x.beginPath(); x.arc(hx, hy, 24, 0, 7); x.fill(); x.lineWidth = 6; x.stroke(); }); x.lineWidth = 9; }
  x.fillStyle = skin; x.beginPath(); x.ellipse(128, 120, 66, 74, 0, 0, 7); x.fill(); x.stroke(); x.fillStyle = INK; const big = pose == 'shock';
  [-24, 24].forEach(d => { x.beginPath(); x.arc(128 + d, 116, big ? 10 : 6, 0, 7); x.fill(); }); x.lineWidth = 6; x.beginPath(); if (big) x.ellipse(128, 158, 12, 16, 0, 0, 7); else if (pose == 'sus') { x.moveTo(110, 150); x.lineTo(146, 146); } else if (pose == 'smug') { x.moveTo(108, 146); x.quadraticCurveTo(130, 160, 150, 140); } else x.arc(128, 146, 14, .2, Math.PI - .2); x.stroke();
  if (pose == 'sus') { x.beginPath(); x.moveTo(98, 98); x.lineTo(118, 104); x.moveTo(158, 98); x.lineTo(138, 104); x.stroke(); }
  if (sp.specs) { x.lineWidth = 6; [-24, 24].forEach(d => { x.beginPath(); x.arc(128 + d, 116, 18, 0, 7); x.stroke(); }); x.beginPath(); x.moveTo(122, 116); x.lineTo(134, 116); x.stroke(); }
  x.lineWidth = 9; const h = sp.hat;
  if (h == 'hair') { x.fillStyle = sp.hatc || '#3a2a1a'; x.beginPath(); x.ellipse(128, 70, 66, 34, 0, Math.PI, 0); x.fill(); x.stroke(); }
  if (h == 'cap') { x.fillStyle = sp.hatc || '#3b4a6a'; x.beginPath(); x.ellipse(128, 62, 70, 26, 0, Math.PI, 0); x.fill(); x.stroke(); x.beginPath(); x.ellipse(150, 64, 60, 12, 0, 0, 7); x.fill(); x.stroke(); }
  if (h == 'bob') { x.fillStyle = sp.hatc || '#5a3a2a'; x.beginPath(); x.arc(128, 104, 80, Math.PI * 1.02, -.02 * Math.PI); x.lineTo(206, 150); x.lineTo(196, 104); x.moveTo(50, 104); x.lineTo(60, 150); x.lineTo(56, 104); x.fill(); x.stroke(); }
  if (h == 'hood') { x.fillStyle = col; x.beginPath(); x.arc(128, 110, 86, Math.PI * .9, Math.PI * 2.1); x.fill(); x.stroke(); x.fillStyle = skin; x.beginPath(); x.ellipse(128, 124, 60, 64, 0, 0, 7); x.fill(); x.fillStyle = INK; [-22, 22].forEach(d => { x.beginPath(); x.arc(128 + d, 120, 6, 0, 7); x.fill(); }); x.lineWidth = 6; x.beginPath(); x.moveTo(112, 150); x.lineTo(144, 150); x.stroke(); }
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t; }
const TEXC = {}; function texOf(sp, p, fr) { const k = sp.id + p + fr; if (!TEXC[k]) TEXC[k] = drawChar(sp, p, fr); return TEXC[k]; }
let PID = 0; const CARDS = [];
function makeMascot(s = 1, sp0) { const sp = Object.assign({ col: '#d9443a', hat: 'hair', hatc: '#3a2a1a', pants: '#2b3a6a' }, sp0 || {}); sp.id = 'p' + (PID++); const g = new THREE.Group(); const m = NO_OL(new THREE.MeshBasicMaterial({ map: texOf(sp, 'idle', 0), transparent: true, alphaTest: .5, side: THREE.DoubleSide, toneMapped: false }));
  const pl = mesh(new THREE.PlaneGeometry(1.0, 2.0), m); pl.position.y = 1.0; pl.customDepthMaterial = new THREE.MeshDepthMaterial({ depthPacking: THREE.RGBADepthPacking, map: m.map, alphaTest: .5 }); pl.castShadow = true; g.add(pl); g.scale.setScalar(s); scene.add(g);
  const pad = { visible: false }; const arms = [{ userData: { pad }, rotation: {} }, { userData: { pad }, rotation: {} }]; const o = { g, pl, m, sp, arms, legs: [{ rotation: {} }, { rotation: {} }], eyes: [], body: pl, face: true }; CARDS.push(o); return o; }
function setTex(o, p, fr) { const tx = texOf(o.sp, p, fr); if (o.m.map !== tx) { o.m.map = tx; o.pl.customDepthMaterial.map = tx; o.m.needsUpdate = true; } }
function poseM(o, kind, t) { const fr = Math.floor(t * 4) % 2; const p = kind == 'climb' || kind == 'up' ? 'shock' : kind == 'shrug' ? 'point' : 'idle'; o.sp.pads = o.arms[0].userData.pad.visible; setTex(o, p + (o.sp.pads ? 'P' : '') + (o.sp.cover ? 'C' : ''), kind == 'climb' ? fr : 0); }
// ---------- shared ----------
scene.fog = new THREE.Fog(BGC, 30, 80); hemi.intensity = 1.25; sun.intensity = 1.5;
const DKC = 0x2a2d33, BOLTC = 0xfff3a0;
function zig(a, b, n, seed, amp = .9) { let s = seed; const r = () => { s = (s * 16807) % 2147483647; return s / 2147483647 - .5; }; const P = []; for (let i = 0; i <= n; i++) { const u = i / n; const k = i == 0 || i == n ? 0 : amp; P.push(new THREE.Vector3(lerp(a[0], b[0], u) + r() * k * 2, lerp(a[1], b[1], u), lerp(a[2], b[2], u) + r() * k)); } return P; }
function boltMesh(a, b, seed) { const g = new THREE.Group(); const P = zig(a, b, 9, seed); const c = new THREE.CatmullRomCurve3(P, false, 'catmullrom', .05);
  g.add(NO_OL(mesh(new THREE.TubeGeometry(c, 80, .11, 6), new THREE.MeshBasicMaterial({ color: 0xffffff, toneMapped: false }))));
  g.add(NO_OL(mesh(new THREE.TubeGeometry(c, 80, .32, 8), new THREE.MeshBasicMaterial({ color: BOLTC, transparent: true, opacity: .45, toneMapped: false, depthWrite: false }))));
  const mid = P[4]; const P2 = zig([mid.x, mid.y, mid.z], [mid.x + 2.2, mid.y - 3.5, mid.z], 4, seed + 7, .5); g.add(NO_OL(mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(P2), 30, .06, 5), new THREE.MeshBasicMaterial({ color: 0xffffff, toneMapped: false }))));
  g.children.forEach(m => m.castShadow = false); g.visible = false; scene.add(g); return g; }
function cloudAt(x, y, z, s = 1) { const g = group(x, y, z); [[0, 0, 0, 2.4], [2.4, -.3, .3, 1.8], [-2.5, -.3, .2, 1.9], [1.1, 1, -.2, 1.7], [-1.1, .9, .1, 1.6], [4.2, -.6, 0, 1.3], [-4.3, -.6, 0, 1.3]].forEach(([a, b, c, r]) => add(mesh(new THREE.SphereGeometry(r, 16, 12), MM(0x5b6278)), a, b, c, g).castShadow = false); g.scale.setScalar(s); return g; }
const strikeOn = (t, t0, d = .55) => t >= t0 && t < t0 + d && Math.sin((t - t0) * 70) > -.4;
function tree(x, z, s = 1) { const g = group(x, 0, z); add(cyl(.22, .32, 2.4, MM(0x7a5232), 8), 0, 1.2, 0, g); [[0, 3.0, 1.5], [0, 4.1, 1.15], [0, 5.0, .75]].forEach(([a, b, r]) => add(mesh(new THREE.ConeGeometry(r, 1.6, 9), MM(0x3f7a3a)), a, b, 0, g)); g.scale.setScalar(s); return g; }
// ---------- A: hook field ----------
const mHook = makeMascot(1.4, { col: '#3d6fb6', hat: 'cap', hatc: '#f0c419' }); mHook.g.position.set(0, 0, 1.5);
const cloudA = cloudAt(0, 12, -2, 1.2); tree(-4.5, -2.5, 1.1); tree(5.2, -3.5, .9);
const boltA = boltMesh([.3, 11, -1], [0, 2.8, 1.5], 101);
// ---------- B: ground current ----------
const GX = 30; tree(GX, -1, 1.2); const cloudB = cloudAt(GX, 13, -3, 1.3);
const mDir = makeMascot(1.3, { col: '#d9443a', hat: 'hair' }); mDir.g.position.set(GX - 4.2, 0, 2.2);
const mN = [makeMascot(1.25, { col: '#7a9a4a', hat: 'bob', hatc: '#5a3a2a' }), makeMascot(1.25, { col: '#f0c419', hat: 'hood' }), makeMascot(1.25, { col: '#8a5ab6', hat: 'cap', hatc: '#2b3a6a' })];
mN[0].g.position.set(GX + 2.6, 0, 1.2); mN[1].g.position.set(GX + 4.8, 0, 3.0); mN[2].g.position.set(GX - 1.8, 0, 3.6);
const boltB1 = boltMesh([GX - 4, 12, -2], [GX - 4.2, 2.6, 2.2], 202), boltB2 = boltMesh([GX + .5, 12, -3], [GX, 5.8, -1], 303);
const RINGS = [0, 1, 2].map(i => { const m = NO_OL(mesh(new THREE.RingGeometry(.9, 1, 64), new THREE.MeshBasicMaterial({ color: 0xffe14a, transparent: true, opacity: .9, toneMapped: false, side: THREE.DoubleSide, depthWrite: false }))); m.rotation.x = -Math.PI / 2; m.position.set(GX, .06, -1); m.visible = false; scene.add(m); return m; });
// ---------- C: car ----------
const CX = 60; add(box(40, .06, 5, MM(0x6b6f76)), CX, .03, 0); for (let i = 0; i < 9; i++) add(box(1.4, .02, .18, NO_OL(MM(0xf4f4f2))), CX - 16 + i * 4, .07, 0);
const CAR = group(CX, 0, 0); const RED3 = 0xd9443a;
add(box(4.4, 1.0, 2.0, MM(RED3), .3), 0, .95, 0, CAR);
const CAB = group(0, 0, 0, CAR); add(box(2.3, .8, 1.72, NO_OL(new THREE.MeshToonMaterial({ color: 0xbfe6ff, gradientMap: grad, transparent: true, opacity: .45, depthWrite: false }))), -.2, 1.85, 0, CAB);
add(box(2.5, .14, 1.86, MM(RED3), .05), -.2, 2.3, 0, CAB); [[-1.38, .8], [.98, .8]].forEach(([x]) => [-.86, .86].forEach(z => add(box(.12, .8, .12, MM(RED3)), x, 1.85, z, CAB)));
const WHEELS = []; [[-1.4, -1.0], [1.4, -1.0], [-1.4, 1.0], [1.4, 1.0]].forEach(([x, z]) => { const w = add(cyl(.46, .46, .36, MM(0x1f2125), 20), x, .46, z, CAR); w.rotation.x = Math.PI / 2; add(cyl(.2, .2, .38, MM(0xb8bec6), 12), x, .46, z, CAR).rotation.x = Math.PI / 2; WHEELS.push(w); });
add(box(.1, .25, .5, NO_OL(MM(0xfff3c0))), 2.2, 1.1, .6, CAR); add(box(.1, .25, .5, NO_OL(MM(0xfff3c0))), 2.2, 1.1, -.6, CAR);
const mCar = makeMascot(.62, { col: '#3d6fb6', hat: 'cap', hatc: '#f0c419' }); mCar.g.position.set(CX - .1, 1.05, .2);
const cloudC = cloudAt(CX, 12, -3, 1.2); tree(CX - 8, -5, 1); tree(CX + 9, -5.5, 1.2);
const boltC1 = boltMesh([CX - .5, 11, -2], [CX - .2, 2.4, 0], 404), boltC2 = boltMesh([CX + .5, 11, -2], [CX - .1, 1.6, .2], 505);
// ---------- state ----------
const effect = new OutlineEffect(R, { defaultThickness: .0045, defaultColor: [.08, .06, .1] });
const STRIKES = () => [[boltA, .55], [boltB1, C.gq + .6], [boltB2, C.gc + .1], [boltC1, C.shell + .15], [boltC2, C.open + .6]];
function state(t) {
  let flash = 0; STRIKES().forEach(([b, t0]) => { b.visible = strikeOn(t, t0); if (b.visible) flash = 1; });
  hemi.intensity = flash ? 2.6 : 1.25; scene.background.copy(BGC); if (flash) scene.background.offsetHSL(0, 0, .12);
  setTex(mHook, t > .6 && t < 1.4 ? 'shock' : t >= 1.4 ? 'smug' : 'idle', 0);
  setTex(mDir, t > C.gq + .6 && t < C.rare ? 'shock' : 'idle', 0);
  const g0 = C.gc + .2; RINGS.forEach((m, i) => { const p = (t - g0 - i * .5) / 2.2; m.visible = p > 0 && t < C.cq - .1; const pp = p % 1; m.scale.setScalar(.3 + 7.5 * pp); m.material.opacity = .9 * (1 - pp); });
  mN.forEach((o, i) => setTex(o, t > C.near - .3 + i * .15 && t < C.cq ? 'shock' : (t > C.most ? 'sus' : 'idle'), 0));
  CAB.visible = t < C.open; setTex(mCar, t > C.shell + .15 && t < C.shell + 1.6 ? 'shock' : t > C.open + .6 ? 'shock' : 'smug', 0);
  return { flash }; }
const KEYS = () => [
  [0, [0, 7, 21], [0, 5, 0], 46], [.9, [0, 7, 20], [0, 5, 0], 46], [C.n10 + .2, [1.2, 3.2, 10], [0, 2.4, 1.5], 40], [S.belief.start, [1.6, 3.0, 9.2], [0, 2.3, 1.5], 40],
  [S.ground.start, [GX - 3.5, 4.2, 13], [GX - 2.8, 2.0, 1], 46], [C.rare, [GX - 3.2, 4.4, 13.5], [GX - 2.6, 2.0, 1], 46], [C.most + .2, [GX + 1, 8.5, 16.5], [GX + .6, .9, 1], 50], [C.near + .3, [GX + 1, 8, 16], [GX + 1, .8, 1.5], 48], [S.car.start - .01, [GX + 1, 8, 16], [GX + 1, .8, 1.5], 48],
  [S.car.start, [CX + 5, 4.2, 11], [CX, 1.2, 0], 42], [C.tire - .2, [CX + 4.5, 4, 10.5], [CX, 1.1, 0], 42], [C.tire + .6, [CX - 3.2, 1.4, 6.5], [CX - 1.3, .1, 1], 36], [C.no + .6, [CX - 3.2, 1.4, 6.5], [CX - 1.3, .1, 1], 36],
  [C.shell + .1, [CX + 5, 5.0, 11], [CX, 1.2, 0], 40], [C.open - .1, [CX + 4.6, 5.5, 10.5], [CX, 1.0, 0], 40], [S.after.start, [CX + 3.6, 6, 9], [CX, .8, 0], 40], [80, [CX + 3.6, 6, 9], [CX, .8, 0], 40]].sort((a, b) => a[0] - b[0]);
function camAt(t) { const K = KEYS(); let i = 0; while (i < K.length - 2 && K[i + 1][0] <= t) i++; const [t0, P0, T0, f0] = K[i], [t1, P1, T1, f1] = K[i + 1]; const p = E.io(pr(t, t0, t1));
  const P = P0.map((v, k) => lerp(v, P1[k], p)), T = T0.map((v, k) => lerp(v, T1[k], p)); cam.fov = lerp(f0, f1, p); cam.updateProjectionMatrix(); cam.position.set(...P); cam.lookAt(...T); CARDS.forEach(o => o.g.quaternion.copy(cam.quaternion)); sun.position.set(T[0] - 6, T[1] + 14, 9); sun.target.position.set(T[0], T[1] - 2, 0); }
function render3() { R.setClearColor(scene.background, 1); effect.render(scene, cam); ctx.drawImage(glc, 0, 0); }
