// ================= 동전 하나로 사람이 죽을까 (과학 what-if) =================
import { OutlineEffect } from 'three/addons/effects/OutlineEffect.js';
const TLFILE = 'penny_timeline.json';
const grad = (() => { const d = new Uint8Array([120, 190, 255]); const t = new THREE.DataTexture(d, 3, 1, THREE.RedFormat); t.minFilter = t.magFilter = THREE.NearestFilter; t.needsUpdate = true; return t; })();
const MM = (c, o = {}) => new THREE.MeshToonMaterial({ color: c, gradientMap: grad, ...o });
const NO_OL = m => { m.userData.outlineParameters = { visible: false }; return m; };
const ORG = 0xff5a1f, TEAL = 0x2f8f8a, GRY = 0xcfd2d6, DK = 0x2a2d33;
const BGC = new THREE.Color(0xbfd8ee); scene.background = BGC.clone(); scene.fog = new THREE.Fog(BGC, 26, 60);
const hemi = new THREE.HemisphereLight(0xfff4e6, 0x6a5a8a, 1.6); scene.add(hemi);
const sun = new THREE.DirectionalLight(0xffffff, 2.0); sun.position.set(-6, 14, 9); sun.castShadow = true; sun.shadow.mapSize.set(2048, 2048); Object.assign(sun.shadow.camera, { left: -14, right: 14, top: 14, bottom: -14, far: 60 }); sun.shadow.bias = -.0006; sun.shadow.radius = 4; scene.add(sun, sun.target);
const floorTex = canvasTex(512, 512, (x, w, h) => { x.fillStyle = '#e6d9bf'; x.fillRect(0, 0, w, h); x.strokeStyle = 'rgba(120,90,50,.18)'; x.lineWidth = 2; for (let i = 0; i <= 8; i++) { x.beginPath(); x.moveTo(i * 64, 0); x.lineTo(i * 64, h); x.stroke(); x.beginPath(); x.moveTo(0, i * 64); x.lineTo(w, i * 64); x.stroke(); } }, 40, 8);
const floor = add(mesh(new THREE.PlaneGeometry(240, 48), new THREE.MeshToonMaterial({ map: floorTex, gradientMap: grad })), 60, 0, 0); floor.rotation.x = -Math.PI / 2; floor.receiveShadow = true;
for (let i = 0; i < 40; i++) { const h = 3 + (i * 37 % 9); add(box(3 + (i % 3), h, 3, MM([0x9fb4d0, 0xb8c6dc, 0x8fa6c4, 0xc9b8d8][i % 4])), -10 + i * 3.4, h / 2, -12 - (i % 3) * 2); }
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
scene.fog = new THREE.Fog(BGC, 50, 120);
const GOLD = 0xd9a441, BLUE = 0x3d8fd6, RED3 = 0xe8463a;
function coin(r = .35) { const g = new THREE.Group(); const c = add(cyl(r, r, r * .22, MM(GOLD), 28), 0, 0, 0, g); c.rotation.x = Math.PI / 2; add(cyl(r * .7, r * .7, r * .24, NO_OL(MM(0xc08a2a)), 24), 0, 0, 0, g).rotation.x = Math.PI / 2; scene.add(g); return g; }
// ---------- A: stepped skyscraper ----------
const winTex = canvasTex(256, 512, (x, w, h) => { x.fillStyle = '#d8ccb4'; x.fillRect(0, 0, w, h); for (let i = 0; i < 6; i++) for (let j = 0; j < 16; j++) { x.fillStyle = (i * 7 + j * 3) % 5 ? '#5d6b80' : '#f2d67a'; x.fillRect(i * 42 + 10, j * 32 + 8, 22, 18); } }, 1, 1);
const TW = group(0, 0, -3);
[[7, 12, 0], [5.2, 8, 12], [3.6, 5, 20], [2.2, 2, 25]].forEach(([w, h, y]) => { const tx = winTex.clone(); tx.needsUpdate = true; tx.repeat.set(w / 3, h / 4); const m = new THREE.MeshToonMaterial({ map: tx, gradientMap: grad }); add(box(w, h, w, m), 0, y + h / 2, 0, TW); add(box(w + .3, .3, w + .3, MM(0xb9ab90)), 0, y + h, 0, TW); });
add(cyl(.5, .7, 1.2, MM(0xb9ab90), 12), 0, 27.6, 0, TW); add(cyl(.06, .18, 4, MM(0x9aa2ab), 8), 0, 30.2, 0, TW);
const mTop = makeMascot(.85, { col: '#3d6fb6', hat: 'cap', hatc: '#d9443a' }); mTop.g.position.set(1.0, 25, -1.0);
const mStreet = makeMascot(1.4, { col: '#7a9a4a', hat: 'hair', hatc: '#3a2a1a' }); mStreet.g.position.set(1.8, 0, 4.2);
const coinA = coin(.3);
// street props
add(box(30, .08, 3, MM(0x8a8f96)), 0, .04, 6.5); for (let i = 0; i < 8; i++) add(box(1.2, .1, .25, NO_OL(MM(0xf4f4f2))), -12 + i * 3.4, .1, 6.5);
// ---------- B: wind tunnel lab ----------
const LX = 20;
add(box(9, .3, 6, MM(0xd5dde6)), LX, .15, 0);
const tube = add(cyl(1.15, 1.15, 6.2, NO_OL(new THREE.MeshToonMaterial({ color: 0xbfe6ff, gradientMap: grad, transparent: true, opacity: .28, depthWrite: false })), 32), LX + 1.2, 3.6, 0);
add(cyl(1.35, 1.35, .3, MM(0x9aa2ab), 32), LX + 1.2, .6, 0); add(cyl(1.35, 1.35, .3, MM(0x9aa2ab), 32), LX + 1.2, 6.75, 0);
const fanHub = group(LX + 1.2, .9, 0); for (let i = 0; i < 4; i++) { const b = add(box(.9, .06, .3, MM(DK)), 0, 0, 0, fanHub); b.rotation.y = i * Math.PI / 2; b.position.set(Math.cos(i * Math.PI / 2) * .45, 0, -Math.sin(i * Math.PI / 2) * .45); }
const coinB = coin(.32); coinB.position.set(LX + 1.2, 3.8, 0);
const AIR = []; for (let i = 0; i < 14; i++) { const a = add(box(.04, .5, .04, NO_OL(new THREE.MeshBasicMaterial({ color: 0xffffff }))), LX + 1.2 + Math.cos(i * 2.4) * .75, 1, Math.sin(i * 2.4) * .75); AIR.push(a); }
const mProf = makeMascot(1.55, { col: '#f4f4f2', hat: 'hair', hatc: '#8a8a8a', specs: true, btn: true }); mProf.g.position.set(LX - 2.4, .3, .8);
const balloon = group(LX - 1.6, 5.4, -1.4); add(mesh(new THREE.SphereGeometry(.7, 18, 14), MM(RED3)), 0, 0, 0, balloon).scale.set(1, 1.15, 1); add(cyl(.01, .01, 1.6, NO_OL(MM(DK)), 4), 0, -1.6, 0, balloon); const cB2 = coin(.18); balloon.add(cB2); cB2.position.set(0, -2.45, 0);
// ---------- C: pen vs sidewalk ----------
const PX = 40;
const walk = add(box(10, .4, 7, MM(0xc9c4ba)), PX, .2, 0); for (let i = -2; i <= 2; i++) add(box(.06, .02, 7, NO_OL(MM(0x8f8a80))), PX + i * 2, .41, 0);
const pen = group(PX, 6, .5); add(cyl(.12, .12, 2.0, MM(0xf4f4f2), 12), 0, .2, 0, pen); add(cyl(.13, .13, .5, MM(BLUE), 12), 0, 1.05, 0, pen); add(mesh(new THREE.ConeGeometry(.12, .35, 12), MM(0xb9ab90)), 0, -.97, 0, pen).rotation.x = Math.PI;
const crack = group(PX, .42, .5); for (let i = 0; i < 7; i++) { const c = add(box(.06, .02, .8 + (i % 3) * .3, NO_OL(MM(0x2a2d33))), 0, 0, 0, crack); c.rotation.y = i * .9; c.position.set(Math.sin(i * .9) * .4, 0, Math.cos(i * .9) * .4); }
const coinC = coin(.3); coinC.position.set(PX - 2.2, .45, 1.2); coinC.rotation.x = Math.PI / 2;
const mPen = makeMascot(1.4, { col: '#d9443a', hat: 'bob', hatc: '#5a3a2a' }); mPen.g.position.set(PX + 2.6, .4, 1.0);
// ---------- D: rain town ----------
const RX = 62;
for (let i = 0; i < 7; i++) { const hx = RX - 7 + i * 2.4, hz = -1.5 - (i % 2) * 1.6; add(box(1.8, 1.6, 1.8, MM([0xf2e3c6, 0xe8c9a8, 0xd9e2cf][i % 3])), hx, .8, hz); const rf = add(mesh(new THREE.ConeGeometry(1.5, 1.1, 4), MM([0xd9443a, 0x3d6fb6, 0x7a9a4a][i % 3])), hx, 2.15, hz); rf.rotation.y = Math.PI / 4; }
const cloud = group(RX, 13, -2); [[0, 0, 0, 2.2], [2.2, -.3, .3, 1.7], [-2.3, -.3, .2, 1.8], [1, .9, -.2, 1.6], [-1, .8, .1, 1.5], [3.8, -.6, 0, 1.2], [-3.9, -.6, 0, 1.2]].forEach(([x, y, z, r]) => add(mesh(new THREE.SphereGeometry(r, 16, 12), MM(0xeef2f6)), x, y, z, cloud));
const dropGeo = new THREE.SphereGeometry(.13, 10, 8); dropGeo.scale(1, 1.3, 1); const dropMat = NO_OL(MM(0x4aa3e8));
const DROPS = []; for (let i = 0; i < 46; i++) { const d = add(mesh(dropGeo, dropMat), RX - 6 + (i * 7.3 % 12), 5, -1 + (i * 3.1 % 5)); d.userData.ph = (i * .137) % 1; DROPS.push(d); }
const mRain = makeMascot(1.3, { col: '#f0c419', hat: 'hood' }); mRain.g.position.set(RX + .5, 0, 3.2);
// ---------- state ----------
const effect = new OutlineEffect(R, { defaultThickness: .0045, defaultColor: [.08, .06, .1] });
function state(t) {
  // A
  { const p = pr(t, C.drop + .6, C.die + 1.2); const q = p * p; coinA.position.set(lerp(1.35, 1.8, p), lerp(25.9, 3.0, q), lerp(-.7, 4.2, p)); coinA.rotation.set(t * 9, t * 5, 0); coinA.visible = t < C.die + 1.25;
    setTex(mTop, t < C.drop + .6 ? 'smug' : 'point', 0); setTex(mStreet, t > C.die - .3 ? 'shock' : 'idle', 0); }
  // B
  fanHub.rotation.y = t * 14; coinB.position.y = 3.8 + .25 * Math.sin(t * 7); coinB.rotation.set(t * 6, Math.sin(t * 3) * .6, 0);
  AIR.forEach((a, i) => { a.position.y = 1 + ((t * 3.2 + i * .37) % 5.2); });
  balloon.position.y = 5.4 + .2 * Math.sin(t * 1.4); setTex(mProf, t > C.tunnel ? 'point' : 'idle', 0);
  // C
  { const a = C.arrow + .3, b = C.k300 - .05; let y, rx; if (t < a) { y = 6 + .3 * Math.sin(t * 2); rx = t * 2.2; } else { const p = pr(t, a, b); y = lerp(7.2, 1.35, p * p); rx = 0; }
    pen.position.y = y; pen.rotation.set(t < a ? rx : 0, 0, t < a ? Math.sin(t * 3) * .8 : 0); pen.visible = t > S.pen.start - .1; crack.visible = t > b; setTex(mPen, t > C.kill - .2 ? 'shock' : 'sus', 0); }
  // D
  { const fast = pr(t, C.k700, C.k700 + .4) * (1 - pr(t, C.big - .6, C.big - .1)); DROPS.forEach(d => { const sp = .35 + 2.2 * fast; const u = (d.userData.ph + t * sp) % 1; d.position.y = lerp(11.8, .1, u); d.scale.set(1, 1 + 6 * fast, 1); d.material.color.setHex(fast > .3 ? 0xe8463a : 0x4aa3e8); });
    setTex(mRain, t > C.k700 && t < C.big ? 'shock' : 'smug', 0); }
  return {}; }
const KEYS = () => [
  [0, [4.2, 27.2, 6.5], [1.0, 25.8, -1.2], 40], [C.esb - .2, [4.6, 27.0, 7.2], [1.0, 25.6, -1.2], 40], [C.esb + 1.6, [16, 17, 34], [0, 14.5, -3], 46], [C.drop + .4, [16, 17, 34], [0, 14.5, -3], 46],
  [C.die - .2, [7, 3.4, 13], [1.8, 2.2, 4], 40], [S.belief.start, [7.2, 3.4, 13.4], [1.8, 2.2, 4], 40],
  [S.study.start, [LX + .2, 4.6, 13.5], [LX, 3.3, 0], 42], [C.tunnel - .1, [LX + .4, 4.6, 13], [LX, 3.3, 0], 42], [C.tunnel + .7, [LX + 2.4, 4.4, 8.5], [LX + 1.2, 3.8, 0], 36], [C.exp + .2, [LX + 2.2, 4.4, 8.8], [LX + 1.0, 3.8, 0], 36], [S.terminal.start, [LX + .2, 5, 12.5], [LX, 3.3, 0], 42],
  [S.pen.start, [PX + .8, 5.5, 13], [PX, 4.4, 0], 40], [C.arrow + .2, [PX + .8, 5.5, 13.5], [PX, 4.2, 0], 42], [C.k300, [PX + 1.5, 2.4, 9.5], [PX, .8, .5], 38], [S.rain.start - .1, [PX + 1.8, 2.8, 10], [PX + .6, 1.0, .5], 40],
  [S.rain.start, [RX, 6.5, 23], [RX, 6.5, 0], 46], [C.km2, [RX + 1, 7, 22], [RX, 7, 0], 46], [C.big, [RX + .6, 4, 15], [RX, 4, 0], 44], [S.outro.start, [RX + .6, 4, 15], [RX, 4, 0], 44], [80, [RX + .6, 4, 15], [RX, 4, 0], 44]].sort((a, b) => a[0] - b[0]);
function camAt(t) { const K = KEYS(); let i = 0; while (i < K.length - 2 && K[i + 1][0] <= t) i++; const [t0, P0, T0, f0] = K[i], [t1, P1, T1, f1] = K[i + 1]; const p = E.io(pr(t, t0, t1));
  const P = P0.map((v, k) => lerp(v, P1[k], p)), T = T0.map((v, k) => lerp(v, T1[k], p)); cam.fov = lerp(f0, f1, p); cam.updateProjectionMatrix(); cam.position.set(...P); cam.lookAt(...T); CARDS.forEach(o => o.g.quaternion.copy(cam.quaternion)); sun.position.set(T[0] - 6, T[1] + 14, 9); sun.target.position.set(T[0], T[1] - 2, 0); }
function render3() { R.setClearColor(scene.background, 1); effect.render(scene, cam); ctx.drawImage(glc, 0, 0); }
