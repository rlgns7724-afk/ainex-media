// ================= 스파이더맨은 왜 벽을 못 탈까 (과학 what-if) =================
import { OutlineEffect } from 'three/addons/effects/OutlineEffect.js';
const TLFILE = 'wall2_timeline.json';
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
// ---------- (old robot mascot removed) ----------
function _unusedRobot(s = 1) { const g = new THREE.Group(); const W = MM(0xf4f4f2), D = MM(DK);
  const body = mesh(new THREE.CapsuleGeometry(.42, .7, 6, 16), W); body.position.y = 1.0; g.add(body);
  const visor = add(box(.66, .34, .2, D, .1), 0, 1.22, .32, g);
  const EM = NO_OL(new THREE.MeshBasicMaterial({ color: 0x6af0ff, toneMapped: false })); const eyes = [-1, 1].map(s2 => add(mesh(new THREE.CircleGeometry(.065, 16), EM), s2 * .14, 1.23, .425, g));
  add(cyl(.02, .02, .3, D), 0, 1.92, 0, g); add(mesh(new THREE.SphereGeometry(.07, 12, 8), MM(ORG)), 0, 2.1, 0, g);
  const arms = [-1, 1].map(s2 => { const a = new THREE.Group(); a.position.set(s2 * .45, 1.25, 0); g.add(a); add(mesh(new THREE.CapsuleGeometry(.09, .38, 4, 8), W), 0, -.28, 0, a); const pad = add(mesh(new THREE.SphereGeometry(.13, 10, 8), MM(ORG)), 0, -.56, 0, a); pad.scale.set(1, .6, 1); pad.visible = false; a.userData.pad = pad; return a; });
  const legs = [-1, 1].map(s2 => { const l = new THREE.Group(); l.position.set(s2 * .17, .42, 0); g.add(l); add(mesh(new THREE.CapsuleGeometry(.1, .2, 4, 8), W), 0, -.2, 0, l); add(box(.24, .1, .32, D, .04), 0, -.38, .05, l); return l; });
  g.traverse(o => { if (o.isMesh) o.castShadow = true; }); g.scale.setScalar(s); scene.add(g); return { g, arms, legs, eyes, body }; }
function _unusedPose(m, kind, t) { const [aL, aR] = m.arms, [lL, lR] = m.legs; let a = [.15, -.15], l = [0, 0];
  if (kind == 'climb') { const s = Math.sin(t * 6); a = [2.6 + s * .3, -2.6 + s * .3]; l = [.4 * s, -.4 * s]; }
  if (kind == 'walk') { const s = Math.sin(t * 8); l = [.5 * s, -.5 * s]; a = [.3 - .3 * s, -.3 - .3 * s]; }
  if (kind == 'shrug') a = [.9, -.9]; if (kind == 'up') a = [2.8, -2.8];
  aL.rotation.z = -a[0]; aR.rotation.z = -a[1]; lL.rotation.x = l[0]; lR.rotation.x = l[1]; m.eyes.forEach(e => e.scale.y = Math.sin(t * 2.7) > .97 ? .15 : 1); }
// ---------- A: glass tower ----------
const glassTex = canvasTex(512, 1024, (x, w, h) => { x.fillStyle = '#b9c4ce'; x.fillRect(0, 0, w, h); for (let i = 0; i < 8; i++) for (let j = 0; j < 20; j++) { x.fillStyle = (i + j) % 3 ? '#a9b6c2' : '#c6d0d9'; x.fillRect(i * 64 + 4, j * 51 + 4, 56, 43); } });
function tower(x, z, wd = 7, ht = 16) { const g = group(x, 0, z); const m = add(box(wd, ht, .6, new THREE.MeshToonMaterial({ map: glassTex, gradientMap: grad })), 0, ht / 2, 0, g); add(box(wd + .3, .4, .9, MM(0x9aa2ab)), 0, ht, 0, g); m.receiveShadow = true; return g; }
const towerA = tower(0, -1.6); const mA = makeMascot(1.5); mA.arms.forEach(a => a.userData.pad.visible = true);
// ---------- B: pad + glue ----------
const padB = add(cyl(1.6, 1.6, .18, MM(ORG), 40), 12, .09, 0); const setae = group(12, .18, 0); for (let i = 0; i < 90; i++) { const r = Math.sqrt(Math.random()) * 1.45, a = Math.random() * 6.28; add(cyl(.025, .04, .25 + Math.random() * .12, MM(0xd94a14), 5), Math.cos(a) * r, .12, Math.sin(a) * r, setae); }
const glue = group(14.2, 0, .6); add(cyl(.32, .32, 1.3, MM(0xf4f4f2), 16), 0, .65, 0, glue); add(cyl(.1, .32, .4, MM(ORG), 16), 0, 1.5, 0, glue); add(box(.5, .4, .02, NO_OL(MM(DK))), 0, .7, .33, glue); glue.rotation.z = .5;
// ---------- C: two mascots + cubes ----------
const mS = makeMascot(.8, { col: '#3d6fb6', hat: 'bob', hatc: '#5a3a2a' }), mB = makeMascot(1.6, { col: '#7a9a4a', hat: 'cap', hatc: '#3b4a6a' }); mS.g.position.set(22.6, 0, .4); mB.g.position.set(25, 0, .2);
const cube1 = group(29, 0, .4), cube2 = group(32.2, 0, .2); add(box(1, 1, 1, MM(0xf4f4f2), .03), 0, .5, 0, cube1); add(box(2, 2, 2, MM(0xf4f4f2), .05), 0, 1, 0, cube2);
const face1 = add(box(1.01, .03, 1.01, MM(ORG)), 0, .02, 0, cube1), face2 = add(box(2.01, .03, 2.01, MM(ORG)), 0, .02, 0, cube2);
// ---------- D: 225 dots + bars ----------
const dots = group(40, 0, -2.2); const DOTS = []; for (let i = 0; i < 225; i++) { const d = add(mesh(new THREE.SphereGeometry(.09, 6, 5), MM([0x8a9098, DK, TEAL, 0xf4f4f2][i % 4])), (i % 25) * .36 - 4.3, .09, Math.floor(i / 25) * .36 - 1.4, dots); DOTS.push(d); }
const BARS = []; const bv = [.12, .45, 1.0, 1.7, 2.6]; bv.forEach((v, i) => { const b = group(37.6 + i * 1.6, 0, 1.2); add(box(1, 1, 1, MM(i == 4 ? TEAL : 0x8a9098), .04), 0, .5, 0, b); b.userData.v = v; BARS.push(b); });
// animals on pedestals: mite and gecko
function gecko(s = 1) { const g = new THREE.Group(); const G = MM(0x5f9a62); const b = mesh(new THREE.CapsuleGeometry(.22, .8, 6, 12), G); b.rotation.x = Math.PI / 2; g.add(b); add(mesh(new THREE.SphereGeometry(.24, 12, 10), G), 0, .03, .58, g).scale.set(1, .8, 1.2); const tail = add(mesh(new THREE.ConeGeometry(.14, 1.0, 10), G), 0, 0, -.9, g); tail.rotation.x = -Math.PI / 2;
  [[-1, .3], [1, .3], [-1, -.3], [1, -.3]].forEach(([sx, sz]) => { add(cyl(.05, .05, .35, G), sx * .3, -.05, sz, g).rotation.z = sx * 1.2; add(cyl(.09, .09, .04, MM(ORG), 10), sx * .46, -.12, sz, g); }); [-1, 1].forEach(sx => add(mesh(new THREE.SphereGeometry(.05, 8, 6), MM(DK)), sx * .14, .15, .72, g)); g.traverse(o => { if (o.isMesh) o.castShadow = true; }); g.scale.setScalar(s); return g; }
const gD = gecko(.7); gD.position.set(43.0, .25, -.2); scene.add(gD); add(cyl(.35, .35, .12, MM(0xf4f4f2), 20), 37.6, .06, -.2); const mite = add(mesh(new THREE.SphereGeometry(.09, 8, 6), MM(0x8a4a2a)), 37.6, .21, -.2);
// ---------- E: human coverage + shoes ----------
const mE = makeMascot(1.7, { col: '#5d6873', hat: 'hair', hatc: '#1d1a22' }); mE.g.position.set(55.5, 0, 0); const cover = { visible: false, scale: { y: 1 } };
function shoe(L, col) { const g = new THREE.Group(); add(box(L * .38, L * .14, L, MM(col), .05), 0, L * .1, 0, g); add(box(L * .4, L * .04, L * 1.02, MM(DK)), 0, L * .02, 0, g); add(box(L * .34, L * .12, L * .4, MM(col), .05), 0, L * .2, -L * .25, g); g.traverse(o => { if (o.isMesh) o.castShadow = true; }); scene.add(g); return g; }
const shoeN = shoe(.81, 0xf4f4f2), shoeG = shoe(2.9, ORG); shoeN.position.set(58.6, 0, 1.6); shoeG.position.set(60.6, 0, .4); shoeN.rotation.y = shoeG.rotation.y = -.35;
// ---------- F: limit wall with gecko ----------
const towerF = tower(72, -1.6, 6, 10); const gF = gecko(1.1); gF.rotation.set(-Math.PI / 2, 0, 0); gF.position.set(71.4, 4.0, -1.0); scene.add(gF); const mF = makeMascot(1); mF.g.position.set(73.6, 0, .6); mF.arms.forEach(a => a.userData.pad.visible = true);
// ---------- G: frog + paw ----------
const frog = new THREE.Group(); { const G = MM(0x7fb86a); const b = add(mesh(new THREE.SphereGeometry(.7, 16, 12), G), 0, .55, 0, frog); b.scale.set(1, .7, 1.1); [-1, 1].forEach(s => { add(mesh(new THREE.SphereGeometry(.18, 10, 8), G), s * .32, 1.0, .45, frog); add(mesh(new THREE.SphereGeometry(.08, 8, 6), MM(DK)), s * .34, 1.06, .6, frog); [[.6, .5], [.75, -.4]].forEach(([dx, dz]) => { add(cyl(.07, .07, .5, G), s * dx, .2, dz, frog).rotation.z = s * 1.3; add(cyl(.17, .17, .06, MM(ORG), 12), s * (dx + .28), .04, dz, frog); }); }); frog.traverse(o => { if (o.isMesh) o.castShadow = true; }); frog.position.set(83.5, 0, .5); scene.add(frog); }
const trunk = add(cyl(.9, 1.1, 9, MM(0x8a6a4e), 16), 89.4, 4.5, -1.4); const paw = group(88.6, 3.2, -.6); add(box(1.3, 1.0, .6, MM(0x5a4030), .2), 0, 0, 0, paw); for (let i = 0; i < 4; i++) { const c = add(mesh(new THREE.ConeGeometry(.08, .45, 8), MM(0xf4f1e6)), -.45 + i * .3, .55, .25, paw); c.rotation.x = -.6; } paw.rotation.z = -.15;
// ---------- H: outro tower with tiny mascot ----------
const towerH = tower(100, -1.6, 8, 14); const mH = makeMascot(.3); mH.arms.forEach(a => a.userData.pad.visible = true); const mH2 = makeMascot(1); mH2.g.position.set(102.6, 0, .9);
// ---------- state ----------
const effect = new OutlineEffect(R, { defaultThickness: .0045, defaultColor: [.08, .06, .1] });
function state(t) {
  // A: mascot climbs then slips
  { const c = pr(t, .6, C.kg), sl = pr(t, C.glue, C.glue + 3.5); mA.g.position.set(.2, Math.max(0, 2.6 * E.io(c) - 2.6 * (sl * sl)), -1.05); mA.g.rotation.y = Math.PI; poseM(mA, t < C.glue + 3.5 && t > .6 ? 'climb' : 'idle', t); }
  setae.visible = t > C.glue2 - .2; glue.position.y = .1 * Math.sin(t * 3);
  // C
  poseM(mS, 'idle', t); poseM(mB, 'idle', t + 1); const cs = E.back(pr(t, C.area - .2, C.area + .4)); cube1.scale.setScalar(Math.max(.001, cs)); cube2.scale.setScalar(Math.max(.001, E.back(pr(t, C.x2, C.x2 + .5))));
  face1.visible = face2.visible = t > C.area + .4;
  // D
  DOTS.forEach((d, i) => d.scale.setScalar(Math.max(.001, E.back(pr(t, C.n225 + (i % 37) * .03, C.n225 + .3 + (i % 37) * .03)))));
  BARS.forEach((b, i) => { const h = b.userData.v * E.out(pr(t, C.big + i * .15, C.big + .6 + i * .15)); b.scale.set(1, Math.max(.001, h), 1); });
  mite.visible = t > C.mite - .2; gD.visible = t > C.mite + 1; gD.position.y = .25 + .05 * Math.abs(Math.sin(t * 4));
  // E
  mE.sp.cover = t > C.h80; poseM(mE, t > C.h80 ? 'shrug' : 'idle', t); cover.visible = t > C.h80; cover.scale.y = Math.max(.001, E.out(pr(t, C.h80, C.h80 + .8))); shoeG.visible = t > C.shoe + .2; shoeG.scale.setScalar(Math.max(.001, E.back(pr(t, C.shoe + .2, C.shoe + .8))));
  // F
  { const f = pr(t, C.lim2 + .3, C.lim2 + 1.0); mF.g.position.y = t < C.lim2 + .3 ? 1.4 + .15 * Math.sin(t * 6) : 1.4 * (1 - (f * f)); mF.g.position.z = -.95; mF.g.rotation.y = Math.PI; poseM(mF, t < C.lim2 + 1 ? 'climb' : 'idle', t); gF.position.y = 4.0 + Math.sin(t * 1.5) * .2; }
  frog.position.y = .02 * Math.abs(Math.sin(t * 5)); frog.scale.y = 1 + .05 * Math.sin(t * 5);
  // H
  { const q = pr(t, S.outro.start + .3, 81.4); mH.g.position.set(99.6, .3 + 9.5 * q, -1.18); mH.g.rotation.y = Math.PI; poseM(mH, 'climb', t * 1.6); poseM(mH2, t > C.o3 ? 'up' : 'idle', t); }
  return {}; }
// camera: continuous glide along the floor
const KEYS = () => [
  [0, [1.4, 3.2, 9.5], [0, 3.6, -1.6], 44], [C.kg, [2.4, 3.2, 10.5], [0, 3.2, -1.6], 40], [S.belief.start - .01, [2.2, 3.6, 10], [0, 3.4, -1.6], 40], [C.glue + .6, [11.5, 6.5, 8.5], [12.6, .6, .2], 32], [S.twist.start, [12.5, 6.5, 8.5], [13, .6, .2], 32],
  [S.truth.start, [23.6, 6, 14.5], [23.9, 1.4, .3], 36], [C.area - .5, [26.5, 6, 12.5], [27.5, 1.2, .3], 36], [C.x8 + 1.3, [30.6, 5.6, 10], [30.6, 1.0, .3], 34],
  [C.q + .2, [34.5, 8, 12], [36, .8, 0], 36], [C.n225 + .2, [40, 9, 11], [40, .3, -1.6], 36], [C.mite - .2, [38.6, 4.2, 7.5], [40.5, .4, -.2], 34], [C.x200 + 1.0, [41.4, 4.8, 9.5], [41.6, .4, -.2], 36], [C.big + .3, [41.4, 8, 16.5], [41.4, 1.4, .8], 38], [S.human.start - .2, [42, 8, 16.5], [41.5, 1.4, .8], 38],
  [S.human.start + .6, [55.8, 5, 14.5], [55.8, 1.8, 0], 36], [C.shoe - .2, [56.6, 5, 14.5], [57.2, 1.6, .2], 36], [C.shoe + .4, [59.4, 5.5, 12], [59.6, .8, .8], 36], [C.m1 + 1.0, [59.6, 5.8, 12.5], [59.8, .8, .8], 36],
  [S.limit.start + .5, [74.5, 4.2, 12], [72.2, 3.0, -1], 36], [S.limit.end - .2, [73.5, 4.6, 11.5], [72, 3.0, -1], 36],
  [S.other.start + .6, [82, 4.5, 10], [84, 1.0, .3], 34], [C.frog + 1.5, [83.8, 3.8, 8], [84.0, .6, .3], 32], [C.claw + .3, [87.6, 4.8, 13], [89, 3.0, -1], 36], [S.outro.start - .1, [87.8, 5.0, 13.5], [89, 3.0, -1], 36],
  [S.outro.start + .4, [103, 3.2, 12], [100.5, 4.5, -1.5], 40], [99, [102.4, 4.0, 12.5], [100.3, 6.5, -1.5], 42]].sort((a, b) => a[0] - b[0]);
function camAt(t) { const K = KEYS(); let i = 0; while (i < K.length - 2 && K[i + 1][0] <= t) i++; const [t0, P0, T0, f0] = K[i], [t1, P1, T1, f1] = K[i + 1]; const p = E.io(pr(t, t0, t1));
  const P = P0.map((v, k) => lerp(v, P1[k], p)), T = T0.map((v, k) => lerp(v, T1[k], p)); cam.fov = lerp(f0, f1, p); cam.updateProjectionMatrix(); cam.position.set(...P); cam.lookAt(...T); CARDS.forEach(o => o.g.quaternion.copy(cam.quaternion)); sun.position.set(T[0] - 6, 14, 9); sun.target.position.set(T[0], 0, 0); }
function render3() { R.setClearColor(scene.background, 1); effect.render(scene, cam); ctx.drawImage(glc, 0, 0); }
