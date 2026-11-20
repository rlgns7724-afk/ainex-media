// ================= AI 안경 커닝의 진실 =================
import { OutlineEffect } from 'three/addons/effects/OutlineEffect.js';
const TLFILE = 'glasses_timeline.json';
const V3 = THREE.Vector3;
const grad = (() => { const d = new Uint8Array([95, 175, 255]); const t = new THREE.DataTexture(d, 3, 1, THREE.RedFormat); t.minFilter = t.magFilter = THREE.NearestFilter; t.needsUpdate = true; return t; })();
const MM = (c, o = {}) => new THREE.MeshToonMaterial({ color: c, gradientMap: grad, ...o });
const NO_OL = m => { m.userData.outlineParameters = { visible: false }; return m; };
// ---------------- lights ----------------
const hemi = new THREE.HemisphereLight(0xfff4e6, 0x6a5a8a, 1.5); scene.add(hemi);
const sun = new THREE.DirectionalLight(0xfff0d8, 2.3); sun.position.set(-8, 12, -4); sun.castShadow = true; sun.shadow.mapSize.set(2048, 2048); Object.assign(sun.shadow.camera, { left: -12, right: 12, top: 12, bottom: -8, far: 50 }); sun.shadow.bias = -.0008; sun.shadow.radius = 3; scene.add(sun);
const key2 = new THREE.DirectionalLight(0xffffff, 1.6); key2.position.set(103, 6, 6); key2.target.position.set(100, 1, 0); scene.add(key2, key2.target);
[hemi, sun, key2].forEach(l => l.layers.enableAll());
const SKY = new THREE.Color(0xe8e2f0); scene.background = SKY.clone(); scene.fog = new THREE.Fog(SKY, 30, 80);
const FAR = 1; function far(o) { o.traverse(c => c.layers.set(FAR)); return o; }
// ---------------- classroom ----------------
const room = group();
const woodTex = canvasTex(512, 512, (x, w, h) => { x.fillStyle = '#c9a274'; x.fillRect(0, 0, w, h); for (let j = 0; j < 16; j++) { x.fillStyle = j % 2 ? '#c19a6c' : '#d1aa7c'; x.fillRect(0, j * 32, w, 31); x.fillStyle = 'rgba(80,50,20,.25)'; x.fillRect(((j * 97) % w), j * 32, 3, 32); } }, 6, 6);
add(mesh(new THREE.PlaneGeometry(20, 20), new THREE.MeshToonMaterial({ map: woodTex, gradientMap: grad })), 0, 0, 0, room).rotation.x = -Math.PI / 2;
const walls = group(0, 0, 0, room); add(box(20, 6, .3, MM(0xf2ead8)), 0, 3, 7.5, walls); add(box(.3, 6, 16, MM(0xece2cc)), -8, 3, 0, walls); add(box(.3, 6, 16, MM(0xece2cc)), 8, 3, 0, walls); add(box(20, .8, .32, MM(0x9a7a5a)), 0, .4, 7.48, walls);
for (let i = 0; i < 3; i++) { add(box(.12, 2.2, 2.2, MM(0xbfe0f2)), -7.85, 3.2, -4 + i * 3.6, walls); add(box(.16, 2.4, .12, MM(0xffffff)), -7.82, 3.2, -4 + i * 3.6, walls); }
for (let i = 0; i < 8; i++) add(box(1.1, 2.0, .5, MM(i % 2 ? 0x7aa0c8 : 0x6a90b8)), -4.4 + i * 1.25, 1.0, 7.1, walls);
add(box(5, 1.2, .1, MM(0x2e5a46)), 0, 3.6, 7.3, walls); const clk = group(4.2, 4.6, 7.25, walls); add(cyl(.35, .35, .08, MM(0xffffff), 24), 0, 0, 0, clk).rotation.x = Math.PI / 2;
far(walls);
const DESKS = []; for (let r = 0; r < 4; r++) for (let c = 0; c < 4; c++) { const x0 = -3.6 + c * 2.4, z0 = -1.6 + r * 2.0; const d = group(x0, 0, z0, room); add(box(1.3, .07, .75, MM(0xd9b98a), .02), 0, .76, 0, d); [[-.58, -.3], [.58, -.3], [-.58, .3], [.58, .3]].forEach(([x, z]) => add(box(.05, .74, .05, MM(0x5a6068)), x, .37, z, d)); add(box(.6, .04, .5, MM(0xffffff)), -.15, .8, -.02, d); add(box(.52, .5, .06, MM(0x5a6068)), 0, .7, .75, d); DESKS.push([x0, z0, d]); }
const front = group(0, 0, -5); add(box(1.8, .9, .7, MM(0x8a6a4a), .03), 0, .45, 0, front, ); front.parent = room; room.add(front);
// ---------------- studio (device) ----------------
const studio = group(100, 0, 0); add(cyl(3.2, 3.3, .1, MM(0xffffff), 48), 0, -.05, 0, studio);
const GL = new THREE.MeshPhysicalMaterial({ color: 0xdfeef8, transparent: true, opacity: .35, roughness: .05, clearcoat: 1, depthWrite: false }); NO_OL(GL);
const FRAME = MM(0x23262e); const SHELL = new THREE.MeshPhysicalMaterial({ color: 0x23262e, roughness: .3, transparent: true, opacity: 1 });
function makeGlasses(p, smart = true) { const g = group(0, 0, 0, p);
  [-1, 1].forEach(s => { add(mesh(new THREE.TorusGeometry(.32, .035, 8, 32), FRAME), s * .4, 0, 0, g); add(mesh(new THREE.CircleGeometry(.31, 32), GL), s * .4, 0, -.005, g); });
  add(box(.2, .04, .04, FRAME), 0, .08, 0, g);
  const temples = [-1, 1].map(s => { const t = group(s * .73, .05, 0, g); add(box(.08, smart ? .1 : .04, 1.25, smart ? SHELL : FRAME, .02), 0, 0, -.62, t); return t; });
  let cam = null; if (smart) { cam = group(.73, .12, .03, g); add(cyl(.05, .05, .06, MM(0x1a1a1a), 16), 0, 0, 0, cam).rotation.x = Math.PI / 2; add(cyl(.026, .026, .065, NO_OL(new THREE.MeshPhysicalMaterial({ color: 0x3a5a9a, roughness: .05, clearcoat: 1, emissive: 0x1a2a6a, emissiveIntensity: .6 })), 16), 0, 0, .01, cam).rotation.x = Math.PI / 2; }
  return { g, temples, cam }; }
const G = makeGlasses(studio); G.g.position.set(0, 1.2, 0);
const batt = add(box(.06, .07, .4, MM(0x3ad17a), .01), .73, 1.25, -.75, studio), chip = add(box(.06, .06, .3, MM(0x2a3a2a), .01), -.73, 1.25, -.6, studio); const chipGold = add(box(.065, .02, .25, MM(0xd9b14a)), -.73, 1.28, -.6, studio);
const phone = group(1.9, 0, -.6, studio); add(box(.5, .95, .06, MM(0x1d2026), .05), 0, 1.1, 0, phone); const PS = NO_OL(new THREE.MeshBasicMaterial({ color: 0x3d6fd6 })); add(mesh(new THREE.PlaneGeometry(.44, .85), PS), 0, 1.1, .035, phone); phone.rotation.y = -.5;
const wand = group(0, 0, 0, studio); add(box(.12, .6, .1, MM(0x2a2d33), .03), 0, -.3, 0, wand); add(box(.32, .5, .06, MM(0xf2c230), .05), 0, .25, 0, wand); const WL = MM(0xff3030, { emissive: 0xff2020, emissiveIntensity: 0 }); add(box(.06, .06, .07, WL), 0, .05, .03, wand);
// mini glasses on desks (csat)
const minis = DESKS.map(([x0, z0], i) => { const m = makeGlasses(room, i % 3 == 0); m.g.scale.setScalar(.22); m.g.position.set(x0 + .3, .82, z0 - .1); m.g.rotation.x = -Math.PI / 2 + .2; return m; });
// ---------------- characters ----------------
const INK = '#1d1a22';
function drawChar(sp, pose, fr) { const c = document.createElement('canvas'); c.width = 256; c.height = 512; const x = c.getContext('2d'); x.lineJoin = x.lineCap = 'round'; x.lineWidth = 9; x.strokeStyle = INK; const col = sp.col, skin = '#f3dcc6';
  [.06, -.06].forEach((a, i) => { const sd = i ? 1 : -1; x.save(); x.translate(128 + sd * 22, 330); x.rotate(a); x.fillStyle = sp.pants || '#2b2a35'; x.beginPath(); x.roundRect(-14, 0, 28, 150, 12); x.fill(); x.stroke(); x.fillStyle = INK; x.beginPath(); x.ellipse(sd * 6, 150, 26, 13, 0, 0, 7); x.fill(); x.restore(); });
  x.fillStyle = col; x.beginPath(); x.roundRect(68, 190, 120, 160, 34); x.fill(); x.stroke(); if (sp.btn) { x.fillStyle = '#e8e2d6'; [230, 270, 310].forEach(y => { x.beginPath(); x.arc(128, y, 8, 0, 7); x.fill(); x.lineWidth = 4; x.stroke(); x.lineWidth = 9; }); } if (sp.tie) { x.fillStyle = sp.tie; x.beginPath(); x.moveTo(128, 196); x.lineTo(118, 240); x.lineTo(128, 252); x.lineTo(138, 240); x.fill(); }
  let arms = [-.25, .25]; if (pose == 'write') arms = [-.6, .7 + fr * .15]; if (pose == 'shock') arms = [-2.5, 2.6]; if (pose == 'paper') arms = [-1.0, 1.0]; if (pose == 'point') arms = [-.2, 1.5]; if (pose == 'behind') arms = [.3, -.3];
  arms.forEach((a, i) => { const sd = i ? 1 : -1; x.save(); x.translate(128 + sd * 58, 210); x.rotate(a); x.fillStyle = col; x.beginPath(); x.roundRect(-14, 0, 28, 120, 12); x.fill(); x.stroke(); x.fillStyle = skin; x.beginPath(); x.arc(0, 128, 15, 0, 7); x.fill(); x.stroke(); if (pose == 'write' && i == 1) { x.fillStyle = '#f2c230'; x.fillRect(-4, 130, 8, 40); } x.restore(); });
  if (pose == 'paper') { x.fillStyle = '#fff'; x.beginPath(); x.roundRect(70, 250, 116, 130, 6); x.fill(); x.lineWidth = 6; x.stroke(); x.fillStyle = '#3d8fd6'; [[85, 40], [105, 70], [125, 50], [145, 30], [165, 100]].forEach(([bx, bh], k) => x.fillRect(bx - 8, 365 - bh, 16, bh)); x.fillStyle = '#d9443a'; x.fillRect(157, 265, 16, 100); x.lineWidth = 9; }
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
const TEXC = {}; function texOf(sp, pose, fr) { const k = sp.id + pose + fr; if (!TEXC[k]) TEXC[k] = drawChar(sp, pose, fr); return TEXC[k]; }
const CH = []; function makeChar(id, sp, s = 1) { sp.id = id; const g = new THREE.Group(); const m = NO_OL(new THREE.MeshBasicMaterial({ map: texOf(sp, 'idle', 0), transparent: true, alphaTest: .5, side: THREE.DoubleSide, toneMapped: false }));
  const pl = mesh(new THREE.PlaneGeometry(.95 * s, 1.9 * s), m); pl.position.y = .95 * s; pl.customDepthMaterial = new THREE.MeshDepthMaterial({ depthPacking: THREE.RGBADepthPacking, map: m.map, alphaTest: .5 }); g.add(pl); room.add(g); const o = { g, pl, m, sp }; CH.push(o); return o; }
function pose(o, p, fr = 0) { const tx = texOf(o.sp, p, fr); if (o.m.map !== tx) { o.m.map = tx; o.pl.customDepthMaterial.map = tx; o.m.needsUpdate = true; } }
const COLS = ['#3d6fb6', '#7a9a4a', '#c9783a', '#8a5a9a', '#4a8a8a', '#d9a441', '#b44a5a', '#5a6a8a'], HATS = ['hair', 'bob', 'cap', 'hair', 'bob', 'hair', 'cap', 'bob'];
const STU = DESKS.map(([x0, z0], i) => i == 6 ? null : makeChar('s' + i, { col: COLS[i % 8], hat: HATS[(i * 3) % 8], hatc: ['#3a2a1a', '#5a3a2a', '#1d1a22', '#7a4a2a'][i % 4], specs: i % 5 == 2 }));
const TOP = makeChar('top', { col: '#5d6873', hat: 'hair', hatc: '#1d1a22', btn: true });
const PROC = [makeChar('p1', { col: '#2f3a4a', hat: 'hair', hatc: '#6a6a6a', tie: '#d9443a' }), makeChar('p2', { col: '#4a3a5a', hat: 'bob', hatc: '#2a1a1a' })];
// ---------------- state ----------------
let effect = new OutlineEffect(R, { defaultThickness: .0045, defaultColor: [.08, .06, .1] });
const MODE = t => t < C.glass ? 'typo' : t < S.score.start ? 'device' : t < S.avg.start ? 'class' : t < S.suspect.start ? 'bars' : t < S.tell.start ? 'class' : t < S.twist.start ? 'device' : t < S.cam.start ? 'typo' : t < C.button + .1 ? 'class' : t < S.proctor.start ? 'circuit' : t < S.students.start ? 'class' : t < C.dist ? 'class' : t < C.stud - .2 ? 'hist' : t < S.outro.start ? 'class' : 'typo';
function state(t) {
  const md = MODE(t); room.visible = md != 'device'; studio.visible = md == 'device';
  scene.background = md == 'device' ? new THREE.Color(0xf4f6f8) : SKY.clone(); scene.fog.color.copy(scene.background);
  const fr = Math.floor(t * 3) % 2;
  STU.forEach((o, i) => { if (!o) return; const [x0, z0] = DESKS[i]; o.g.position.set(x0 - .1, 0, z0 + .5); let p = 'write'; if (t > C.eyes && t < S.tell.start) p = 'sus'; if (t > C.stud - .3 && t < S.csat.start && i % 3 == 0) p = 'paper'; if (t > C.off && t < S.outro.start) p = 'idle'; pose(o, p, (fr + i) % 2); });
  { const [x0, z0] = DESKS[6]; TOP.g.position.set(x0 - .1, 0, z0 + .5); pose(TOP, t > C.eyes && t < S.tell.start ? 'shock' : 'write', fr); }
  PROC[0].g.position.set(-.6, 0, -4.4); PROC[1].g.position.set(1.4, 0, -4.2); PROC.forEach((o, i) => pose(o, t > C.nobody && t < S.students.start ? 'smug' : 'behind'));
  minis.forEach((m, i) => m.g.visible = t > C.off + .2 + (i % 5) * .08 && t < S.outro.start);
  // device: explode, transparency, bluetooth, wand
  const ex = E.io(pr(t, C.parts, C.parts + .9)) * (1 - E.io(pr(t, C.bt - .4, C.bt + .2))); G.temples.forEach((tp, i) => { tp.position.x = (i ? 1 : -1) * (.73 + ex * .35); });
  SHELL.opacity = 1 - .7 * ex; SHELL.transparent = true; batt.visible = chip.visible = chipGold.visible = ex > .05; batt.position.set(.73 + ex * .35, 1.25 + ex * .25, -.75); chip.position.set(-.73 - ex * .35, 1.25 + ex * .25, -.6); chipGold.position.set(chip.position.x, chip.position.y + .03, -.6);
  G.g.rotation.y = md == 'device' ? (t < S.tell.start ? -.9 + (t - C.glass) * .5 : t < C.parts ? -.6 + (t - S.tell.start) * .25 : t < C.hole ? -.25 : t < C.bt ? .55 * pr(t, C.hole, C.hole + .5) - .25 + .3 : -.2) : 0; G.g.rotation.x = .08;
  phone.visible = t > C.bt - .2; PS.color.setHex(t > C.bt + .3 && Math.sin(t * 8) > 0 ? 0x5a8fe6 : 0x3d6fd6);
  const wn = E.out(pr(t, C.near - .2, C.near + .7)); wand.visible = md == 'device' && t > C.near - .3; wand.position.set(lerp(2.4, .95, wn), 1.2 + Math.sin(t * 2) * .03, .5); wand.rotation.z = .3 + (t > C.detect ? Math.sin(t * 70) * .06 : 0); WL.emissiveIntensity = t > C.detect && Math.sin(t * 14) > 0 ? 2.5 : .2;
  return { md };
}
// ---------------- cameras ----------------
const KEYS = () => [
  [0, [0, 3, -9], [0, 1, 1], 46], [C.glass - .01, [0, 3, -9], [0, 1, 1], 46], [C.glass, [100, 1.6, 4.6], [100, 1.1, 0], 40], [S.score.start - .01, [100, 1.4, 4.0], [100, 1.15, 0], 40],
  [S.score.start, [-1.5, 6.5, -10], [0, .8, 1.5], 46], [C.score + .3, [-.5, 4.0, -7.5], [.5, .9, 2.4], 46], [C.s397 + .6, [.6, 1.9, -1.2], [1.2, 1.2, 2.4], 44], [S.avg.start, [.6, 1.9, -1.0], [1.2, 1.2, 2.4], 44],
  [S.avg.start + .01, [.6, 2.4, -2.5], [1.2, 1.1, 2.4], 44], [S.suspect.start - .01, [.6, 2.4, -2.5], [1.2, 1.1, 2.4], 44],
  [S.suspect.start, [-3.5, 3.2, -4.5], [.8, 1.0, 2.0], 48], [S.tell.start - .01, [-2.5, 2.6, -3.2], [1.0, 1.1, 2.4], 48],
  [S.tell.start, [100.8, 1.8, 4.9], [100, 1.2, 0], 40], [C.parts - .1, [100.6, 1.7, 4.5], [100, 1.2, 0], 40], [C.parts + .8, [101.9, 2.3, 4.7], [100.25, 1.2, -.3], 42], [C.hole - .1, [101.8, 2.2, 4.5], [100.25, 1.2, -.3], 42],
  [C.hole + .6, [101.2, 1.45, 2.1], [100.7, 1.25, 0], 36], [C.bt - .3, [101.2, 1.45, 2.1], [100.7, 1.25, 0], 36], [C.bt + .6, [100.6, 2.2, 5.8], [100.55, 1.15, -.2], 44], [99, [100.6, 2.1, 5.5], [100.55, 1.15, -.2], 44],
  [S.cam.start - .01, [100.6, 2.1, 5.5], [100.55, 1.15, -.2], 44], [S.cam.start, [-1.5, 2.6, -2.0], [1.2, 1.2, 2.6], 44], [C.button - .3, [.4, 1.7, .4], [1.2, 1.3, 2.6], 40], [S.proctor.start - .01, [.4, 1.7, .4], [1.2, 1.3, 2.6], 40],
  [S.proctor.start, [-4.5, 3.0, -7.5], [.4, 1.2, -1], 46], [C.nobody + .6, [-3.0, 2.2, -6.5], [.6, 1.3, -2], 44], [S.students.start, [-3.0, 2.2, -6.5], [.6, 1.3, -2], 44],
  [S.students.start + .01, [3.5, 3.0, -6], [0, 1.1, 2], 46], [C.dist - .01, [2.6, 2.6, -5], [0, 1.1, 2], 46],
  [S.csat.start, [-2.6, 4.2, -6.5], [.4, .8, 2.2], 46], [C.sticker - 1.2, [-1.4, 3.0, -4.5], [.4, .9, 2.2], 46], [S.outro.start, [-1.2, 2.8, -4.2], [.4, .9, 2.2], 46], [99, [-1.2, 2.8, -4.2], [.4, .9, 2.2], 46]].sort((a, b) => a[0] - b[0]);
function camAt(t) { const K = KEYS(); let i = 0; while (i < K.length - 2 && K[i + 1][0] <= t) i++; const [t0, P0, T0, f0] = K[i], [t1, P1, T1, f1] = K[i + 1]; const p = Math.abs(P1[0] - P0[0]) > 50 ? 0 : E.io(pr(t, t0, t1));
  const P = P0.map((v, k) => lerp(v, P1[k], p)), T = T0.map((v, k) => lerp(v, T1[k], p)); cam.fov = lerp(f0, f1, p); cam.updateProjectionMatrix(); cam.position.set(...P); cam.lookAt(...T); CH.forEach(o => o.g.quaternion.copy(cam.quaternion)); }
function render3(md) { if (md == 'device') { cam.layers.enableAll(); R.setClearColor(0xf4f6f8, 1); effect.render(scene, cam); ctx.drawImage(glc, 0, 0); return; }
  cam.layers.set(FAR); effect.render(scene, cam); ctx.save(); ctx.filter = 'blur(4px)'; ctx.drawImage(glc, -10, -10, W + 20, H + 20); ctx.restore();
  cam.layers.set(0); const bg = scene.background; scene.background = null; R.setClearColor(0x000000, 0); effect.render(scene, cam); ctx.drawImage(glc, 0, 0); scene.background = bg; }
