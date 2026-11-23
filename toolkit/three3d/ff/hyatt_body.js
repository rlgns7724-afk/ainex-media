// ================= 하얏트 공중 통로 붕괴 (1981) =================
import { OutlineEffect } from 'three/addons/effects/OutlineEffect.js';
const TLFILE = 'hyatt_timeline.json';
const grad = (() => { const d = new Uint8Array([95, 175, 255]); const t = new THREE.DataTexture(d, 3, 1, THREE.RedFormat); t.minFilter = t.magFilter = THREE.NearestFilter; t.needsUpdate = true; return t; })();
const MM = (c, o = {}) => new THREE.MeshToonMaterial({ color: c, gradientMap: grad, ...o });
const NO_OL = m => { m.userData.outlineParameters = { visible: false }; return m; };
// ---------------- lights ----------------
const hemi = new THREE.HemisphereLight(0xfff2e2, 0x6a4f8a, 1.45); scene.add(hemi);
const sun = new THREE.DirectionalLight(0xfff0d8, 2.2); sun.position.set(-8, 24, 10); sun.castShadow = true; sun.shadow.mapSize.set(2048, 2048); Object.assign(sun.shadow.camera, { left: -16, right: 16, top: 16, bottom: -16, far: 70 }); sun.shadow.bias = -.0008; sun.shadow.radius = 4; scene.add(sun);
const warm = new THREE.PointLight(0xffc48a, 40, 30, 1.6); warm.position.set(0, 6, 6); scene.add(warm);
const key2 = new THREE.DirectionalLight(0xffffff, 1.8); key2.position.set(106, 12, 10); key2.target.position.set(100, 4, 0); scene.add(key2, key2.target);
const rimL = new THREE.DirectionalLight(0x8ad0ff, 1.0); rimL.position.set(94, 8, -8); rimL.target.position.set(100, 4, 0); scene.add(rimL, rimL.target);
const SKY = new THREE.Color(0xcfc4d8); scene.background = SKY.clone(); scene.fog = new THREE.Fog(SKY, 34, 90);
// ---------------- atrium ----------------
const atr = group();
const tileTex = canvasTex(512, 512, (x, w, h) => { for (let i = 0; i < 8; i++) for (let j = 0; j < 8; j++) { x.fillStyle = (i + j) % 2 ? '#e9dcc4' : '#d6c4a6'; x.fillRect(i * 64, j * 64, 64, 64); const g = x.createLinearGradient(i * 64, j * 64, i * 64 + 64, j * 64 + 64); g.addColorStop(0, 'rgba(255,255,255,.3)'); g.addColorStop(1, 'rgba(255,255,255,0)'); x.fillStyle = g; x.fillRect(i * 64, j * 64, 64, 64); } x.strokeStyle = '#a8957a'; x.lineWidth = 3; for (let k = 0; k <= 8; k++) { x.beginPath(); x.moveTo(k * 64, 0); x.lineTo(k * 64, h); x.stroke(); x.beginPath(); x.moveTo(0, k * 64); x.lineTo(w, k * 64); x.stroke(); } }, 8, 8);
add(mesh(new THREE.PlaneGeometry(44, 44), new THREE.MeshToonMaterial({ map: tileTex, gradientMap: grad })), 0, 0, 0, atr).rotation.x = -Math.PI / 2;
// dance floor rug
const rugTex = canvasTex(512, 256, (x, w, h) => { x.fillStyle = '#8a2f3a'; x.fillRect(0, 0, w, h); x.strokeStyle = '#e8c46a'; x.lineWidth = 12; x.strokeRect(16, 16, w - 32, h - 32); x.lineWidth = 4; x.strokeRect(40, 40, w - 80, h - 80); });
add(mesh(new THREE.PlaneGeometry(10, 5), NO_OL(new THREE.MeshToonMaterial({ map: rugTex, gradientMap: grad }))), -7, .02, 7, atr).rotation.x = -Math.PI / 2;
const winTex = canvasTex(512, 512, (x, w, h) => { x.fillStyle = '#efe4d0'; x.fillRect(0, 0, w, h); for (let j = 0; j < 4; j++) { x.fillStyle = '#c9b493'; x.fillRect(0, j * 128 + 110, w, 18); for (let i = 0; i < 6; i++) { x.fillStyle = (i + j) % 3 ? '#ffe2a8' : '#8aa4c4'; x.fillRect(14 + i * 84, j * 128 + 24, 60, 70); } } });
// back wall (4 floors) and side walls
add(box(44, 16, .4, MM(0xb8a890, { map: winTex })), 0, 8, -12, atr);
[-1, 1].forEach(s => add(box(.4, 16, 24, MM(0xf1e6d2, { map: winTex })), s * 14, 8, 0, atr));
// balcony slabs on back wall per floor
[3.6, 7.2, 10.8].forEach(y => add(box(28, .3, 1.2, MM(0x9a8a7a)), 0, y, -11.3, atr));
// ceiling trusses + skylight
const ceil = group(0, 14, 0, atr);
add(box(28, .25, 20, NO_OL(new THREE.MeshPhysicalMaterial({ color: 0xbfe0f2, transparent: true, opacity: .55, roughness: .1 }))), 0, .35, 0, ceil);
for (let i = -3; i <= 3; i++) add(box(.5, .7, 20, MM(0x4a5468)), i * 4, 0, 0, ceil);
for (let k = -2; k <= 2; k++) add(box(28, .5, .4, MM(0x4a5468)), 0, -.05, k * 4, ceil);
// planters + palms + bar + bandstand (props)
function palm(x, z) { const g = group(x, 0, z, atr); add(cyl(.7, .55, .9, MM(0x8a6a4a), 16), 0, .45, 0, g); add(cyl(.12, .16, 3.2, MM(0x7a5a3a), 8), 0, 2.4, 0, g); for (let k = 0; k < 7; k++) { const l = add(mesh(new THREE.SphereGeometry(.8, 10, 6), MM(0x5a9a4a)), Math.cos(k) * .7, 4.1, Math.sin(k) * .7, g); l.scale.set(1.3, .35, .6); l.rotation.y = k; } return g; }
[[-12, 4], [12, 4], [-11, -7], [11, -7]].forEach(([x, z]) => palm(x, z));
const band = group(8, 0, 7, atr); add(box(5, .5, 3, MM(0x5a3f6a), .08), 0, .25, 0, band); [[-1.4, 0xe8c46a], [0, 0x3d6fb6], [1.4, 0xd9443a]].forEach(([x, c]) => { add(cyl(.35, .35, .5, MM(c), 16), x, .75, -.6, band); add(cyl(.04, .04, 1.2, MM(0x2a2a2a)), x + .5, 1.1, .4, band); });
const bar = group(-11.5, 0, 0, atr); add(box(1.4, 1.1, 8, MM(0x7a4a3a), .06), 0, .55, 0, bar); add(box(1.6, .12, 8.2, MM(0xe8d0a0)), 0, 1.15, 0, bar);
// ---------------- walkways ----------------
const DECK = MM(0xf4ede0), STEEL = MM(0x5d6878), GLASS = NO_OL(new THREE.MeshPhysicalMaterial({ color: 0xd8eef8, transparent: true, opacity: .32, roughness: .05, clearcoat: 1, depthWrite: false }));
const ROD = MM(0x2f3640);
const BEAMX = [-6, -2, 2, 6];
function walkway(y, z) { const g = group(0, y, z, atr);
  add(box(20, .35, 2.4, DECK, .04), 0, 0, 0, g); add(box(20, .3, 2.6, MM(0x2f7f7c)), 0, -.24, 0, g);
  BEAMX.forEach(x => add(box(.38, .42, 2.9, STEEL), x, -.42, 0, g));
  [-1, 1].forEach(s => { add(box(20, .08, .08, STEEL), 0, 1.05, s * 1.15, g); add(box(20, .95, .05, GLASS), 0, .6, s * 1.15, g); for (let i = -10; i <= 10; i += 2) add(box(.07, 1.05, .07, STEEL), i, .55, s * 1.15, g); });
  return g; }
const W4 = walkway(10.8, 0), W2 = walkway(3.6, 0), W3 = walkway(7.2, -5.2);
// rods: upper (ceiling -> 4th), lower (4th -> 2nd, offset), 3rd own
const UP_RODS = [], LO_RODS = [];
BEAMX.forEach(x => [-1.35, 1.35].forEach(z => { const r = add(cyl(.05, .05, 3.2, ROD, 8), x - .08, 12.4, z, atr); UP_RODS.push(r); add(cyl(.13, .13, .12, ROD, 6), x - .08, -.68, z, W4);
  const l = add(cyl(.05, .05, 7.2, ROD, 8), x + .08, -3.6 - .1, z, W4); LO_RODS.push(l); add(cyl(.13, .13, .12, ROD, 6), x + .08, -.68, z, W2); add(cyl(.13, .13, .12, ROD, 6), x + .08, -.2, z, W4); }));
BEAMX.forEach(x => [-1.35, 1.35].forEach(z => add(cyl(.05, .05, 6.8, ROD, 8), x, 3.4, z, W3)));
// dust cloud
const DUST = []; const dustM = NO_OL(MM(0xd8cfc2, { transparent: true, opacity: .5, depthWrite: false }));
for (let i = 0; i < 36; i++) { const d = add(mesh(new THREE.SphereGeometry(1, 10, 8), dustM), 0, 0, 0, atr); d.userData = { x: -10 + rnd() * 20, z: -2 + rnd() * 4, s: .35 + rnd() * .6, vx: (rnd() - .5) * 4, vy: .3 + rnd() * .8, vz: (rnd() - .5) * 5 }; d.castShadow = false; DUST.push(d); }
// ---------------- paper-doll characters ----------------
const INK = '#1d1a22';
function drawChar(sp, pose, fr) { const c = document.createElement('canvas'); c.width = 256; c.height = 512; const x = c.getContext('2d'); x.lineJoin = x.lineCap = 'round'; x.lineWidth = 9; x.strokeStyle = INK; const col = sp.col, skin = '#f3dcc6';
  const legA = pose == 'run' ? (fr ? .45 : -.45) : pose == 'dance' ? (fr ? .25 : -.1) : .06;
  [legA, -legA].forEach((a, i) => { const sd = i ? 1 : -1; x.save(); x.translate(128 + sd * 22, 330); x.rotate(a); x.fillStyle = sp.dress && i == 0 ? col : (sp.pants || '#2b2a35'); x.beginPath(); x.roundRect(-14, 0, 28, 150, 12); x.fill(); x.stroke(); x.fillStyle = INK; x.beginPath(); x.ellipse(sd * 6, 150, 26, 13, 0, 0, 7); x.fill(); x.restore(); });
  x.fillStyle = col; x.beginPath(); if (sp.dress) { x.moveTo(84, 196); x.lineTo(172, 196); x.lineTo(200, 380); x.lineTo(56, 380); x.closePath(); } else x.roundRect(68, 190, 120, 160, 34); x.fill(); x.stroke();
  if (sp.tie) { x.fillStyle = sp.tie; x.beginPath(); x.moveTo(128, 196); x.lineTo(118, 240); x.lineTo(128, 252); x.lineTo(138, 240); x.fill(); }
  let arms = [-.25, .25]; if (pose == 'dance') arms = fr ? [-2.3, .6] : [-.6, 2.3]; if (pose == 'shock') arms = [-2.5, 2.6]; if (pose == 'run') arms = fr ? [-.9, .5] : [-.5, .9]; if (pose == 'lean') arms = [-1.3, 1.3];
  arms.forEach((a, i) => { const sd = i ? 1 : -1; x.save(); x.translate(128 + sd * 58, 210); x.rotate(a); x.fillStyle = col; x.beginPath(); x.roundRect(-14, 0, 28, 120, 12); x.fill(); x.stroke(); x.fillStyle = skin; x.beginPath(); x.arc(0, 128, 15, 0, 7); x.fill(); x.stroke(); x.restore(); });
  x.fillStyle = skin; x.beginPath(); x.ellipse(128, 120, 66, 74, 0, 0, 7); x.fill(); x.stroke(); x.fillStyle = INK; const big = pose == 'shock' || pose == 'run';
  [-24, 24].forEach(d => { x.beginPath(); x.arc(128 + d, 116, big ? 10 : 6, 0, 7); x.fill(); }); x.lineWidth = 6; x.beginPath(); if (big) x.ellipse(128, 158, 12, 16, 0, 0, 7); else x.arc(128, 146, 14, .2, Math.PI - .2); x.stroke();
  x.lineWidth = 9; const h = sp.hat;
  if (h == 'hair') { x.fillStyle = sp.hatc || '#3a2a1a'; x.beginPath(); x.ellipse(128, 70, 66, 34, 0, Math.PI, 0); x.fill(); x.stroke(); }
  if (h == 'bob') { x.fillStyle = sp.hatc || '#5a3a2a'; x.beginPath(); x.arc(128, 104, 80, Math.PI * 1.02, -.02 * Math.PI); x.lineTo(206, 150); x.lineTo(196, 104); x.moveTo(50, 104); x.lineTo(60, 150); x.lineTo(56, 104); x.fill(); x.stroke(); }
  if (h == 'cap') { x.fillStyle = sp.hatc || '#3b4a6a'; x.beginPath(); x.ellipse(128, 62, 70, 26, 0, Math.PI, 0); x.fill(); x.stroke(); x.beginPath(); x.ellipse(150, 64, 60, 12, 0, 0, 7); x.fill(); x.stroke(); }
  if (h == 'bald') { x.fillStyle = '#6a6a6a'; x.beginPath(); x.ellipse(70, 100, 12, 22, 0, 0, 7); x.ellipse(186, 100, 12, 22, 0, 0, 7); x.fill(); }
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t; }
const TEXC = {}; function texOf(sp, pose, fr) { const k = sp.id + pose + fr; if (!TEXC[k]) TEXC[k] = drawChar(sp, pose, fr); return TEXC[k]; }
const CH = []; const blobM = NO_OL(new THREE.MeshBasicMaterial({ color: 0x2a1f3a, transparent: true, opacity: .28, depthWrite: false }));
function makeChar(id, sp, parent, s = 1) { sp.id = id; const g = new THREE.Group(); const m = NO_OL(new THREE.MeshBasicMaterial({ map: texOf(sp, 'idle', 0), transparent: true, alphaTest: .5, side: THREE.DoubleSide, toneMapped: false }));
  const pl = new THREE.Mesh(new THREE.PlaneGeometry(.95 * s, 1.9 * s), m); pl.position.y = .95 * s; g.add(pl);
  const bl = new THREE.Mesh(new THREE.CircleGeometry(.42 * s, 16), blobM); bl.rotation.x = -Math.PI / 2; bl.position.y = .03; parent.add(bl);
  parent.add(g); const o = { g, pl, m, sp, bl }; CH.push(o); return o; }
function pose(o, p, fr = 0) { const tx = texOf(o.sp, p, fr); if (o.m.map !== tx) { o.m.map = tx; o.m.needsUpdate = true; } }
const COLS = ['#3d6fb6', '#7a9a4a', '#c9783a', '#8a5a9a', '#4a8a8a', '#d9a441', '#b44a5a', '#5a6a8a', '#e7a3b2', '#2f7f7c'], HATS = ['hair', 'bob', 'cap', 'hair', 'bob', 'bald', 'hair', 'bob'];
const spec = i => ({ col: COLS[i % 10], hat: HATS[(i * 3) % 8], hatc: ['#3a2a1a', '#5a3a2a', '#1d1a22', '#7a4a2a', '#c9a46a'][i % 5], dress: i % 4 == 1, tie: i % 5 == 3 ? '#d9443a' : null });
// floor dancers (avoid strip under walkway |z|<2.2)
const FLOOR = []; let ci = 0;
for (let i = 0; i < 34; i++) { let x = -11 + rnd() * 22, z = 3 + rnd() * 9; if (i % 3 == 0) z = -3 - rnd() * 4.5; const o = makeChar('f' + i, spec(ci++), atr); o.home = [x, z]; o.ph = rnd() * 6; FLOOR.push(o); }
const ON4 = [], ON2 = [];
for (let i = 0; i < 8; i++) { const o = makeChar('a' + i, spec(ci++), W4, .9); o.home = [-8 + i * 2.2 + rnd() * .6, (rnd() - .5) * 1.2]; ON4.push(o); }
for (let i = 0; i < 8; i++) { const o = makeChar('b' + i, spec(ci++), W2, .9); o.home = [-7.5 + i * 2.1 + rnd() * .6, (rnd() - .5) * 1.2]; ON2.push(o); }
const ON3 = []; for (let i = 0; i < 5; i++) { const o = makeChar('c' + i, spec(ci++), W3, .9); o.home = [-7 + i * 3.4, 0]; ON3.push(o); }
// ---------------- blueprint lab (x=100): connection detail ----------------
const lab = group(100, 0, 0);
const bpTex = canvasTex(512, 512, (x, w, h) => { x.fillStyle = '#173a6a'; x.fillRect(0, 0, w, h); x.strokeStyle = 'rgba(255,255,255,.18)'; x.lineWidth = 2; for (let k = 0; k <= 16; k++) { x.beginPath(); x.moveTo(k * 32, 0); x.lineTo(k * 32, h); x.stroke(); x.beginPath(); x.moveTo(0, k * 32); x.lineTo(w, k * 32); x.stroke(); } x.strokeStyle = 'rgba(255,255,255,.35)'; x.lineWidth = 4; x.strokeRect(0, 0, w, h); }, 6, 6);
add(mesh(new THREE.PlaneGeometry(60, 60), NO_OL(new THREE.MeshBasicMaterial({ map: bpTex, toneMapped: false }))), 0, -.5, 0, lab).rotation.x = -Math.PI / 2;
const bpWall = canvasTex(512, 512, (x, w, h) => { x.fillStyle = '#1b4478'; x.fillRect(0, 0, w, h); x.strokeStyle = 'rgba(255,255,255,.14)'; x.lineWidth = 2; for (let k = 0; k <= 16; k++) { x.beginPath(); x.moveTo(k * 32, 0); x.lineTo(k * 32, h); x.stroke(); x.beginPath(); x.moveTo(0, k * 32); x.lineTo(w, k * 32); x.stroke(); } }, 5, 5);
add(mesh(new THREE.PlaneGeometry(60, 40), NO_OL(new THREE.MeshBasicMaterial({ map: bpWall, toneMapped: false }))), 0, 10, -8, lab);
const LSTEEL = new THREE.MeshPhysicalMaterial({ color: 0x8a98ac, roughness: .35, metalness: .3, clearcoat: .6 });
const LBEAM = new THREE.MeshPhysicalMaterial({ color: 0xb8c8dc, roughness: .3, transparent: true, opacity: .82, clearcoat: 1, depthWrite: false }); NO_OL(LBEAM);
const LDECK = new THREE.MeshPhysicalMaterial({ color: 0xf2ece0, roughness: .6, transparent: true, opacity: .72, depthWrite: false }); NO_OL(LDECK);
const LROD = MM(0xffd23a), LROD2 = MM(0xff7a3a), LNUT = MM(0xf2f2f2);
const ceilL = add(box(6, .5, 4.4, MM(0xd8dde6), .05), 0, 11.25, 0, lab);
function labWalk(y) { const g = group(0, y, 0, lab); add(box(5.6, .3, 3.2, LDECK), 0, .2, 0, g); const bm = add(box(.8, .5, 3.8, LBEAM), 0, -.2, 0, g); const edge = add(new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry(.8, .5, 3.8)), new THREE.LineBasicMaterial({ color: 0xffffff })), 0, -.2, 0, g); return { g, bm }; }
const L4 = labWalk(6), L2 = labWalk(1);
const ZS = [-1.5, 1.5];
// original continuous rods
const ORIG = ZS.map(z => add(cyl(.07, .07, 11 - .3, LROD, 12), 0, (11 + .3) / 2, z, lab));
const ORIG_N = []; ZS.forEach(z => { ORIG_N.push(add(cyl(.17, .17, .14, LNUT, 6), 0, 5.47, z, lab)); ORIG_N.push(add(cyl(.17, .17, .14, LNUT, 6), 0, .47, z, lab)); });
// changed: upper rod A (ceiling -> under 4th beam), lower rod B (top of 4th beam -> under 2nd beam), offset
const A = ZS.map(z => add(cyl(.07, .07, 11 - 5.4, LROD, 12), -.2, (11 + 5.4) / 2, z, lab));
const AN = ZS.map(z => add(cyl(.17, .17, .14, LNUT, 6), -.2, 5.47, z, lab));
const lower = group(0, 0, 0, lab); // things that ride down when the nut pulls through
const B = ZS.map(z => add(cyl(.07, .07, 6.05 - .45, LROD2, 12), .2, (6.05 + .45) / 2, z, lower));
const BN = []; ZS.forEach(z => { BN.push(add(cyl(.17, .17, .14, LNUT, 6), .2, 6.12, z, lower)); BN.push(add(cyl(.17, .17, .14, LNUT, 6), .2, .47, z, lower)); });
lab.remove(L4.g); lower.add(L4.g); lab.remove(L2.g); lower.add(L2.g);
const SPARK = []; for (let i = 0; i < 26; i++) { const s = add(mesh(new THREE.SphereGeometry(.05, 6, 6), NO_OL(new THREE.MeshBasicMaterial({ color: 0xffd060, toneMapped: false }))), 0, 0, 0, lab); s.userData = { a: rnd() * 6.28, v: 1 + rnd() * 2.5, u: rnd() * 2 + 1 }; SPARK.push(s); }
const effect = new OutlineEffect(R, { defaultThickness: .0045, defaultColor: [.06, .05, .12] });
// ---------------- state ----------------
const MODE = t => t < C.rewind ? 'atrium' : t < S.party.start ? 'map' : t < S.toll.start ? 'atrium' : t < S.twist.start ? 'toll' : t < S.design.start ? 'typo' : t < S.rope.start ? 'lab' : t < S.double.start ? 'rope' : t < S.outro.start ? 'lab' : 'atrium';
const G = 30;
function collapse(vt) { // returns y offsets of W4, W2 and impact info
  let y4 = 10.8, y2 = 3.6, r4 = 0, r2 = 0;
  if (vt > C.snap) { const s = vt - C.snap; y4 = Math.max(3.6 + .62, 10.8 - .5 * G * s * s); r4 = Math.sin(Math.min(s, .6) * 5) * .02; }
  if (vt > C.hit) { const s = vt - C.hit; y2 = Math.max(.42, 3.6 - .5 * G * s * s); y4 = y2 + .62 + (vt < C.hit + .4 ? 0 : 0); r2 = -Math.min(1, s * 2) * .03; r4 = -Math.min(1, s * 2) * .045; }
  return { y4, y2, r4, r2 }; }
function state(t) { const md = MODE(t); atr.visible = md == 'atrium'; lab.visible = md == 'lab';
  scene.background = md == 'lab' ? new THREE.Color(0x173a6a) : SKY.clone(); scene.fog.color.copy(scene.background); scene.fog.near = md == 'lab' ? 40 : 34;
  const fr = Math.floor(t * 4) % 2;
  const hook = t < C.rewind, out = t >= S.outro.start;
  const vt = hook ? C.snap - .4 + t * .62 : out ? 99 : t;
  const c = collapse(vt); W4.position.y = c.y4; W2.position.y = c.y2; W4.rotation.z = c.r4; W2.rotation.z = c.r2;
  LO_RODS.forEach(r => r.visible = vt < C.snap + .25);
  FLOOR.forEach((o, i) => { const [hx, hz] = o.home; let x = hx, z = hz; let p = 'dance';
    if (t < S.party.start + .6 && !hook) p = 'idle';
    if (vt > C.snap - .05) { p = 'run'; const s = vt - C.snap; const dir = hz > 0 ? 1 : -1; z = hz + dir * Math.min(5, s * 3.2); x = hx * (1 + Math.min(.35, s * .12)); }
    o.g.position.set(x, 0, z); o.bl.position.set(x, .03, z); o.g.position.y = p == 'dance' ? Math.abs(Math.sin(t * 7 + o.ph)) * .12 : 0; pose(o, p, (fr + i) % 2); o.g.visible = o.bl.visible = !out; });
  [...ON4, ...ON2].forEach((o, i) => { const [hx, hz] = o.home; o.g.position.set(hx, .17, hz); o.bl.position.set(hx, .2, hz); pose(o, vt > C.snap - .1 ? 'shock' : (i % 3 ? 'lean' : 'idle'), 0); o.g.visible = o.bl.visible = !(out || vt > C.hit + .35); });
  ON3.forEach((o, i) => { o.g.position.set(o.home[0], .17, 0); o.bl.position.set(o.home[0], .2, 0); pose(o, vt > C.snap ? 'shock' : 'lean', 0); o.g.visible = o.bl.visible = !out; });
  // dust
  DUST.forEach(d => { const u = d.userData; const s = vt - C.hit - .25; const on = s > 0 && !out; d.visible = on && s < 9; if (!on) return; const k = Math.min(1, s * 2.5); d.position.set(u.x + u.vx * Math.sqrt(s), .4 + u.vy * Math.sqrt(s) * 1.3, u.z + u.vz * Math.sqrt(s)); d.scale.setScalar(u.s * (.4 + k) * (1 + s * .15) * Math.max(0, 1 - s / 6)); });
  // ---- lab ----
  const sp = E.io(pr(t, C.split - .5, C.split + .3));
  ORIG.forEach(r => r.visible = sp < .5); ORIG_N.forEach(n => n.visible = sp < .5);
  A.forEach(r => r.visible = sp >= .5); AN.forEach(n => n.visible = sp >= .5); B.forEach(r => { r.visible = sp >= .5; }); BN.forEach(n => n.visible = sp >= .5);
  // B slides in from center
  B.forEach(r => r.position.x = lerp(0, .2, sp)); A.forEach(r => r.position.x = lerp(0, -.2, sp)); AN.forEach(n => n.position.x = lerp(0, -.2, sp)); BN.forEach(n => n.position.x = lerp(0, .2, sp));
  // pull-through
  const pt = t < C.out ? 0 : Math.min(1.6, .5 * 12 * Math.pow(t - C.out, 2));
  const shake = t > C.pierce && t < C.out ? Math.sin(t * 80) * .03 : 0;
  lower.position.set(shake, -pt, 0);
  L4.bm.material.color.setHex(t > C.conn && t < S.outro.start ? (t > C.pierce ? 0xff6a4a : 0xffb08a) : 0x9ab0c8);
  SPARK.forEach((s, i) => { const u = s.userData, q = t - C.out; s.visible = lab.visible && q > 0 && q < u.u * .5; if (!s.visible) return; s.position.set(-.2 + Math.cos(u.a) * u.v * q, 5.4 - pt * .3 + Math.sin(u.a) * u.v * q * .6 - 4 * q * q, 1.5 + Math.sin(u.a * 2) * .4 * q); });
  return { md, vt }; }
const KEYS = () => [
  // hook: wide front, collapse borrowed
  [0, [2.5, 6, 18], [0, 6.5, 0], 50], [C.rewind - .01, [4, 4.6, 16], [0, 4.5, 0], 50],
  // party (after map)
  [S.party.start, [-6, 1.9, 15], [-3, 2.2, 3], 44], [S.walk.start - .01, [-1, 2.2, 13], [0, 3, 2], 46],
  // walk: crane up to rods and walkways
  [S.walk.start + .8, [1, 3.2, 15], [0, 11, 0], 52], [C.walks, [5, 7, 15], [0, 9, 0], 50], [C.crowd, [8, 11.5, 11], [0, 10.4, 0], 48], [S.fall.start - .01, [7, 10.5, 13], [0, 9.8, 0], 48],
  // fall: wide
  [S.fall.start + .3, [1.5, 7.5, 18], [0, 7.5, 0], 50], [C.snap, [1, 7, 17], [0, 6.8, 0], 50], [C.floor + .5, [-2, 4, 16], [0, 2.5, 0], 52], [S.toll.start - .01, [-3, 3.8, 15], [0, 2.2, 0], 52],
  // lab: design overview
  [S.design.start, [104.5, 7.5, 14.5], [100, 5.6, 0], 42], [C.rod1, [103.5, 9, 10], [100, 7, 0], 40], [C.thread, [105, 6, 13], [100, 3.6, 0], 44],
  [S.change.start, [104, 7, 12], [100, 5.5, 0], 42], [C.split - .6, [102.6, 6.6, 8], [100, 5.6, 1.5], 40], [S.hang.start - .01, [103, 6.3, 9], [100, 5.2, 1.0], 42],
  [S.hang.start + .2, [105, 5.5, 13], [100, 4.2, 0], 46], [S.rope.start - .01, [104.5, 5.2, 12], [100, 4.2, 0], 46],
  // double + nut: close-up on 4th beam connection
  [S.double.start, [103, 7.2, 8.5], [100, 5.6, 1.2], 40], [C.x2, [102.6, 6.8, 7.8], [100, 5.5, 1.2], 40], [S.nut.start, [102.6, 6.4, 7.6], [100, 5.3, 1.2], 40], [S.outro.start - .01, [103.2, 6, 8.6], [100, 4.6, 1.2], 42],
  // outro: atrium, look up at empty upper rods
  [S.outro.start, [0, 2.0, 17], [0, 9, 0], 52], [TL.TOTAL, [0, 3.0, 12.5], [0, 12, 0], 50]].sort((a, b) => a[0] - b[0]);
function camAt(t) { const K = KEYS(); let i = 0; while (i < K.length - 2 && K[i + 1][0] <= t) i++; const [t0, P0, T0, f0] = K[i], [t1, P1, T1, f1] = K[i + 1]; const p = Math.abs(P1[0] - P0[0]) > 50 ? 0 : E.io(pr(t, t0, t1));
  const P = P0.map((v, k) => lerp(v, P1[k], p)), T = T0.map((v, k) => lerp(v, T1[k], p)); cam.fov = lerp(f0, f1, p); cam.updateProjectionMatrix(); cam.position.set(...P); cam.lookAt(...T);
  // impact shake
  [C.snap + .62, C.hit + .45].forEach(c0 => { const vt = t < C.rewind ? C.snap - .4 + t * .62 : t; const d = vt - c0; if (d > 0 && d < .5) { const a = (1 - d / .5) * .25; cam.position.x += Math.sin(t * 90) * a; cam.position.y += Math.cos(t * 77) * a; } });
  CH.forEach(o => o.g.quaternion.copy(cam.quaternion)); }
function render3() { R.setClearColor(scene.background, 1); effect.render(scene, cam); ctx.drawImage(glc, 0, 0); }
function wp(g, x, y, z) { const v = new THREE.Vector3(x, y, z); g.localToWorld(v); return [v.x, v.y, v.z]; }
