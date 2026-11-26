// ================= 화성 기후 궤도선 (1999) : 단위 하나 =================
import { OutlineEffect } from 'three/addons/effects/OutlineEffect.js';
const TLFILE = 'mco_timeline.json';
const grad = (() => { const d = new Uint8Array([95, 175, 255]); const t = new THREE.DataTexture(d, 3, 1, THREE.RedFormat); t.minFilter = t.magFilter = THREE.NearestFilter; t.needsUpdate = true; return t; })();
const MM = (c, o = {}) => new THREE.MeshToonMaterial({ color: c, gradientMap: grad, ...o });
const NO_OL = m => { m.userData.outlineParameters = { visible: false }; return m; };
const GLOW = (c, o = .8) => NO_OL(new THREE.MeshBasicMaterial({ color: c, transparent: true, opacity: o, blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false }));
// ---------------- lights ----------------
const hemi = new THREE.HemisphereLight(0xfff2e2, 0x6a4f8a, 1.1); scene.add(hemi);
const sun = new THREE.DirectionalLight(0xfff0d8, 2.6); sun.position.set(-30, 18, 30); scene.add(sun);
const rim = new THREE.DirectionalLight(0x9ac8ff, 1.2); rim.position.set(30, 10, -30); scene.add(rim);
const SPACE = new THREE.Color(0x0b0f24);
// ---------------- space set ----------------
const sp = group();
const marsTex = canvasTex(2048, 1024, (x, w, h) => { x.fillStyle = '#c4653a'; x.fillRect(0, 0, w, h);
  for (let i = 0; i < 70; i++) { x.fillStyle = ['rgba(150,70,40,.45)', 'rgba(220,140,90,.35)', 'rgba(120,55,35,.35)'][i % 3]; x.beginPath(); x.ellipse(rnd() * w, h * .15 + rnd() * h * .7, 40 + rnd() * 220, 20 + rnd() * 80, rnd() * 3, 0, 7); x.fill(); }
  for (let i = 0; i < 260; i++) { const cx = rnd() * w, cy = rnd() * h, r = 4 + Math.pow(rnd(), 3) * 46; x.fillStyle = 'rgba(110,50,30,.45)'; x.beginPath(); x.arc(cx, cy, r, 0, 7); x.fill(); x.strokeStyle = 'rgba(240,170,120,.5)'; x.lineWidth = Math.max(1.5, r * .18); x.beginPath(); x.arc(cx - r * .1, cy - r * .1, r, Math.PI * .9, Math.PI * 1.9); x.stroke(); }
  x.fillStyle = 'rgba(110,40,30,.55)'; x.fillRect(0, h * .52, w, 10); // canyon streak
  x.fillStyle = '#f4ece4'; x.beginPath(); x.ellipse(w / 2, 0, w, 60, 0, 0, 7); x.fill(); x.beginPath(); x.ellipse(w / 2, h, w, 44, 0, 0, 7); x.fill(); });
marsTex.wrapS = THREE.RepeatWrapping;
const MR = 10;
const mars = add(mesh(new THREE.SphereGeometry(MR, 96, 64), new THREE.MeshToonMaterial({ map: marsTex, gradientMap: grad })), 0, 0, 0, sp);
const atmo = add(mesh(new THREE.SphereGeometry(MR * 1.06, 64, 48), NO_OL(new THREE.MeshBasicMaterial({ color: 0xffa070, transparent: true, opacity: .18, side: THREE.BackSide, blending: THREE.AdditiveBlending, depthWrite: false }))), 0, 0, 0, sp);
const atmo2 = add(mesh(new THREE.SphereGeometry(MR * 1.025, 64, 48), NO_OL(new THREE.MeshBasicMaterial({ color: 0xffb080, transparent: true, opacity: .12, blending: THREE.AdditiveBlending, depthWrite: false }))), 0, 0, 0, sp);
const earthTex = canvasTex(512, 256, (x, w, h) => { x.fillStyle = '#2f6fc0'; x.fillRect(0, 0, w, h); x.fillStyle = '#5aa04a'; for (let i = 0; i < 14; i++) { x.beginPath(); x.ellipse(rnd() * w, 40 + rnd() * 170, 20 + rnd() * 60, 14 + rnd() * 40, rnd() * 3, 0, 7); x.fill(); } x.fillStyle = 'rgba(255,255,255,.7)'; for (let i = 0; i < 20; i++) { x.beginPath(); x.ellipse(rnd() * w, rnd() * h, 20 + rnd() * 40, 4 + rnd() * 6, 0, 0, 7); x.fill(); } });
const EARTH = [-8, -50, -6];
const earth = add(mesh(new THREE.SphereGeometry(4, 48, 32), new THREE.MeshToonMaterial({ map: earthTex, gradientMap: grad })), ...EARTH, sp);
// stars
{ const n = 1400, pos = new Float32Array(n * 3); for (let i = 0; i < n; i++) { const u = rnd() * 2 - 1, a = rnd() * 6.283, r = 160; pos[i * 3] = r * Math.sqrt(1 - u * u) * Math.cos(a); pos[i * 3 + 1] = r * u; pos[i * 3 + 2] = r * Math.sqrt(1 - u * u) * Math.sin(a); }
  const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.BufferAttribute(pos, 3)); add(new THREE.Points(g, new THREE.PointsMaterial({ color: 0xffffff, size: .9, sizeAttenuation: true, toneMapped: false })), 0, 0, 0, sp); }
// orbiter
const FOIL = MM(0xd9a441), PANEL = MM(0x2f4f9a), WHITE = MM(0xeeeeea), DKM = MM(0x2a2d33);
const panelTex = canvasTex(256, 128, (x, w, h) => { x.fillStyle = '#23407e'; x.fillRect(0, 0, w, h); x.strokeStyle = '#8ab0e8'; x.lineWidth = 3; for (let i = 0; i <= 8; i++) { x.beginPath(); x.moveTo(i * 32, 0); x.lineTo(i * 32, h); x.stroke(); } for (let j = 0; j <= 4; j++) { x.beginPath(); x.moveTo(0, j * 32); x.lineTo(w, j * 32); x.stroke(); } });
function makeOrbiter() { const g = group(0, 0, 0, sp); const body = group(0, 0, 0, g);
  add(box(1.2, 1.4, 1.1, FOIL, .08), 0, 0, 0, body); add(box(1.25, .12, 1.15, DKM), 0, .55, 0, body);
  const dish = add(mesh(new THREE.CylinderGeometry(.75, .15, .3, 24, 1, true), NO_OL(new THREE.MeshToonMaterial({ color: 0xeeeeea, gradientMap: grad, side: THREE.DoubleSide }))), 0, 1.0, 0, body); add(cyl(.05, .05, .5, DKM, 6), 0, .8, 0, body);
  [-.3, .3].forEach(x => add(cyl(.12, .2, .3, DKM, 10), x, -.85, 0, body));
  const pan = group(0, 0, 0, g); add(cyl(.05, .05, 1.2, DKM, 6), -1.2, 0, 0, pan).rotation.z = Math.PI / 2; add(box(3.2, .07, 1.3, new THREE.MeshToonMaterial({ map: panelTex, gradientMap: grad })), -3.4, 0, 0, pan);
  return { g, body, pan }; }
const ORB = makeOrbiter(); ORB.g.scale.setScalar(.55);
// fire
const FIRE = group(0, 0, 0, ORB.g); FIRE.scale.setScalar(.8);
const plasma = add(mesh(new THREE.SphereGeometry(1.4, 24, 16), GLOW(0xff8a2a, .3)), .7, 0, 0, FIRE); plasma.scale.set(.8, 1.1, 1.1);
const plasma2 = add(mesh(new THREE.SphereGeometry(1.1, 24, 16), GLOW(0xfff0a0, .3)), .9, 0, 0, FIRE); plasma2.scale.set(.6, .9, .9);
const trail = add(mesh(new THREE.ConeGeometry(1.4, 9, 24, 1, true), GLOW(0xff5a1a, .3)), -4.2, 0, 0, FIRE); trail.rotation.z = Math.PI / 2;
const trail2 = add(mesh(new THREE.ConeGeometry(.8, 6, 24, 1, true), GLOW(0xffd060, .3)), -3, 0, 0, FIRE); trail2.rotation.z = Math.PI / 2;
const SPK = []; for (let i = 0; i < 40; i++) { const s = add(mesh(new THREE.SphereGeometry(.12, 6, 6), GLOW(i % 2 ? 0xffd060 : 0xff7a2a, .9)), 0, 0, 0, sp); s.userData = { o: rnd(), y: (rnd() - .5) * 1.4, z: (rnd() - .5) * 1.4, v: 2 + rnd() * 4 }; SPK.push(s); }
// debris (outro / break)
const DEB = []; for (let i = 0; i < 9; i++) { const d = add(box(.25 + rnd() * .4, .1 + rnd() * .3, .2 + rnd() * .4, i % 3 ? FOIL : PANEL), 0, 0, 0, sp); d.userData = { a: rnd() * 6.28, b: rnd() * 6.28, v: .6 + rnd() * 1.4, y: (rnd() - .5) }; DEB.push(d); }
const debGlow = []; DEB.forEach(d => { const gl = add(mesh(new THREE.SphereGeometry(.35, 10, 8), GLOW(0xff7a2a, .6)), 0, 0, 0, d); debGlow.push(gl); });
// trajectory lines (journey + drift)
const TRIP = new THREE.CatmullRomCurve3([[-8, -45, -6], [-14, -34, 2], [-17, -22, 6], [-16, -11, 8], [-14.5, -4, 8]].map(p => new THREE.Vector3(...p)));
const tripLine = add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(TRIP.getPoints(200)), NO_OL(new THREE.LineDashedMaterial({ color: 0xffffff, dashSize: .9, gapSize: .7, transparent: true, opacity: .8 }))), 0, 0, 0, sp); tripLine.computeLineDistances();
function approach(rp) { const pts = []; for (let i = 0; i <= 120; i++) { const s = -1 + 2 * i / 120, a = s * 1.25, r = rp + 16 * s * s; pts.push(new THREE.Vector3(-r * Math.cos(a), r * Math.sin(a), 0)); } return new THREE.CatmullRomCurve3(pts); }
const PLAN = approach(15.5), ACT = approach(10.45);
const planTube = add(mesh(new THREE.TubeGeometry(PLAN, 200, .16, 8), NO_OL(new THREE.MeshBasicMaterial({ color: 0x5ee08a, toneMapped: false }))), 0, 0, 0, sp);
const actGeo = new THREE.TubeGeometry(ACT, 200, .2, 8); const actTube = add(mesh(actGeo, NO_OL(new THREE.MeshBasicMaterial({ color: 0xff4a3a, toneMapped: false }))), 0, 0, 0, sp);
const PUFF = []; for (let i = 0; i < 10; i++) { const p = add(mesh(new THREE.SphereGeometry(.5, 10, 8), NO_OL(new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: .7, depthWrite: false }))), 0, 0, 0, sp); PUFF.push(p); }
// ---------------- control room (x=200) ----------------
const room = group(200, 0, 0);
const floorTex = canvasTex(512, 512, (x, w, h) => { x.fillStyle = '#5a5f78'; x.fillRect(0, 0, w, h); x.strokeStyle = 'rgba(0,0,0,.25)'; x.lineWidth = 4; for (let i = 0; i <= 8; i++) { x.beginPath(); x.moveTo(i * 64, 0); x.lineTo(i * 64, h); x.stroke(); x.beginPath(); x.moveTo(0, i * 64); x.lineTo(w, i * 64); x.stroke(); } }, 6, 6);
add(mesh(new THREE.PlaneGeometry(40, 30), new THREE.MeshToonMaterial({ map: floorTex, gradientMap: grad })), 0, 0, 0, room).rotation.x = -Math.PI / 2;
add(box(40, 14, .4, MM(0x3a4058)), 0, 7, -8, room); [-1, 1].forEach(s => add(box(.4, 14, 30, MM(0x454b66)), s * 14, 7, 0, room));
let SCRT = 0; const scrTex = canvasTex(1024, 512, (x, w, h) => {}, 1, 1); scrTex.wrapS = scrTex.wrapT = THREE.ClampToEdgeWrapping;
function drawScreen(t) { const c = scrTex.image, x = c.getContext('2d'), w = c.width, h = c.height; x.fillStyle = '#0a1a14'; x.fillRect(0, 0, w, h); x.strokeStyle = 'rgba(90,255,150,.15)'; x.lineWidth = 2; for (let i = 0; i <= 16; i++) { x.beginPath(); x.moveTo(i * 64, 0); x.lineTo(i * 64, h); x.stroke(); } for (let j = 0; j <= 8; j++) { x.beginPath(); x.moveTo(0, j * 64); x.lineTo(w, j * 64); x.stroke(); }
  x.fillStyle = '#c4653a'; x.beginPath(); x.arc(w * .78, h * .55, 90, 0, 7); x.fill();
  x.setLineDash([16, 12]); x.strokeStyle = '#5ee08a'; x.lineWidth = 6; x.beginPath(); x.moveTo(40, 470); x.quadraticCurveTo(500, 420, w * .78 - 150, h * .55 - 120); x.stroke(); x.setLineDash([]);
  const k = cl(t); x.strokeStyle = '#ff4a3a'; x.lineWidth = 7; x.beginPath(); x.moveTo(40, 470); x.quadraticCurveTo(520, 470 - 40 * (1 - k), lerp(w * .78 - 150, w * .78 - 98, k), lerp(h * .55 - 120, h * .55 - 40, k)); x.stroke();
  x.fillStyle = '#5ee08a'; x.font = '44px monospace'; x.fillText('TRAJECTORY', 40, 60); x.fillStyle = '#ff4a3a'; if (t > .3) x.fillText('?? ' + (193 - Math.round(80 * k)) + ' km', 40, 120); scrTex.needsUpdate = true; }
add(box(12.4, 6.4, .3, DKM), 0, 7.5, -7.6, room); const screen = add(mesh(new THREE.PlaneGeometry(12, 6), NO_OL(new THREE.MeshBasicMaterial({ map: scrTex, toneMapped: false }))), 0, 7.5, -7.4, room);
const monTex = canvasTex(256, 192, (x, w, h) => { x.fillStyle = '#0a1a14'; x.fillRect(0, 0, w, h); x.strokeStyle = '#5ee08a'; x.lineWidth = 4; x.beginPath(); for (let i = 0; i < w; i += 8) x.lineTo(i, 100 + Math.sin(i * .07) * 40); x.stroke(); x.fillStyle = '#5ee08a'; x.font = '26px monospace'; x.fillText('NAV', 12, 30); });
const DESKS = [[-6, 0], [0, -1], [6, 0]];
DESKS.forEach(([dx, dz]) => { const d = group(dx, 0, dz + 1, room); add(box(4.4, .25, 1.8, MM(0xb9a88a)), 0, 1.6, 0, d); [-1.9, 1.9].forEach(x => add(box(.2, 1.6, 1.6, MM(0x8a7a62)), x, .8, 0, d));
  add(box(1.5, 1.2, 1.1, MM(0xd8d2c2), .08), -.6, 2.35, -.2, d); add(mesh(new THREE.PlaneGeometry(1.2, .9), NO_OL(new THREE.MeshBasicMaterial({ map: monTex, toneMapped: false }))), -.6, 2.4, .36, d); add(box(1.2, .06, .4, MM(0xeeeeea)), .5, 1.76, .3, d);
  // paper stack
  add(box(.7, .2, .9, MM(0xffffff)), 1.4, 1.83, -.2, d); });
// ---------------- paper-doll characters ----------------
const INK = '#1d1a22';
function drawChar(spx, pose, fr) { const c = document.createElement('canvas'); c.width = 256; c.height = 512; const x = c.getContext('2d'); x.lineJoin = x.lineCap = 'round'; x.lineWidth = 9; x.strokeStyle = INK; const col = spx.col, skin = '#f3dcc6';
  [.06, -.06].forEach((a, i) => { const sd = i ? 1 : -1; x.save(); x.translate(128 + sd * 22, 330); x.rotate(a); x.fillStyle = spx.pants || '#2b2a35'; x.beginPath(); x.roundRect(-14, 0, 28, 150, 12); x.fill(); x.stroke(); x.fillStyle = INK; x.beginPath(); x.ellipse(sd * 6, 150, 26, 13, 0, 0, 7); x.fill(); x.restore(); });
  x.fillStyle = col; x.beginPath(); x.roundRect(68, 190, 120, 160, 34); x.fill(); x.stroke();
  if (spx.tie) { x.fillStyle = spx.tie; x.beginPath(); x.moveTo(128, 196); x.lineTo(118, 240); x.lineTo(128, 252); x.lineTo(138, 240); x.fill(); }
  let arms = [-.25, .25]; if (pose == 'shock') arms = [-2.5, 2.6]; if (pose == 'point') arms = [-.2, 2.2]; if (pose == 'think') arms = [-.25, 2.7]; if (pose == 'shrug') arms = [-1.2 - fr * .2, 1.2 + fr * .2]; if (pose == 'paper') arms = [-1.0, 1.0];
  arms.forEach((a, i) => { const sd = i ? 1 : -1; x.save(); x.translate(128 + sd * 58, 210); x.rotate(a); x.fillStyle = col; x.beginPath(); x.roundRect(-14, 0, 28, 120, 12); x.fill(); x.stroke(); x.fillStyle = skin; x.beginPath(); x.arc(0, 128, 15, 0, 7); x.fill(); x.stroke(); x.restore(); });
  if (pose == 'paper') { x.fillStyle = '#fff'; x.beginPath(); x.roundRect(70, 250, 116, 130, 6); x.fill(); x.lineWidth = 6; x.stroke(); x.strokeStyle = '#d9443a'; x.beginPath(); x.moveTo(84, 350); x.quadraticCurveTo(130, 340, 172, 270); x.stroke(); x.strokeStyle = INK; x.lineWidth = 9; }
  x.fillStyle = skin; x.beginPath(); x.ellipse(128, 120, 66, 74, 0, 0, 7); x.fill(); x.stroke(); x.fillStyle = INK; const big = pose == 'shock';
  [-24, 24].forEach(d => { x.beginPath(); x.arc(128 + d, 116, big ? 10 : 6, 0, 7); x.fill(); }); x.lineWidth = 6; x.beginPath(); if (big) x.ellipse(128, 158, 12, 16, 0, 0, 7); else if (pose == 'think' || pose == 'shrug' || pose == 'paper') { x.moveTo(110, 152); x.lineTo(146, 146); } else x.arc(128, 146, 14, .2, Math.PI - .2); x.stroke();
  if (pose == 'think' || pose == 'paper') { x.beginPath(); x.moveTo(98, 96); x.lineTo(118, 102); x.moveTo(158, 92); x.lineTo(138, 100); x.stroke(); }
  if (spx.specs) { x.lineWidth = 6; [-24, 24].forEach(d => { x.beginPath(); x.arc(128 + d, 116, 18, 0, 7); x.stroke(); }); x.beginPath(); x.moveTo(122, 116); x.lineTo(134, 116); x.stroke(); }
  x.lineWidth = 9; const h = spx.hat;
  if (h == 'hair') { x.fillStyle = spx.hatc || '#3a2a1a'; x.beginPath(); x.ellipse(128, 70, 66, 34, 0, Math.PI, 0); x.fill(); x.stroke(); }
  if (h == 'bob') { x.fillStyle = spx.hatc || '#5a3a2a'; x.beginPath(); x.arc(128, 104, 80, Math.PI * 1.02, -.02 * Math.PI); x.lineTo(206, 150); x.lineTo(196, 104); x.moveTo(50, 104); x.lineTo(60, 150); x.lineTo(56, 104); x.fill(); x.stroke(); }
  if (h == 'bald') { x.fillStyle = '#6a6a6a'; x.beginPath(); x.ellipse(70, 100, 12, 22, 0, 0, 7); x.ellipse(186, 100, 12, 22, 0, 0, 7); x.fill(); }
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t; }
const TEXC = {}; function texOf(spx, p, fr) { const k = spx.id + p + fr; if (!TEXC[k]) TEXC[k] = drawChar(spx, p, fr); return TEXC[k]; }
const CH = []; const blobM = NO_OL(new THREE.MeshBasicMaterial({ color: 0x1a1430, transparent: true, opacity: .3, depthWrite: false }));
function makeChar(id, spx, parent, s = 1) { spx.id = id; const g = new THREE.Group(); const m = NO_OL(new THREE.MeshBasicMaterial({ map: texOf(spx, 'idle', 0), transparent: true, alphaTest: .5, side: THREE.DoubleSide, toneMapped: false }));
  const pl = new THREE.Mesh(new THREE.PlaneGeometry(.95 * s, 1.9 * s), m); pl.position.y = .95 * s; g.add(pl);
  const bl = new THREE.Mesh(new THREE.CircleGeometry(.42 * s, 16), blobM); bl.rotation.x = -Math.PI / 2; bl.position.y = .03; g.add(bl);
  parent.add(g); const o = { g, pl, m, sp: spx }; CH.push(o); return o; }
function pose(o, p, fr = 0) { const tx = texOf(o.sp, p, fr); if (o.m.map !== tx) { o.m.map = tx; o.m.needsUpdate = true; } }
const NAV = [makeChar('n0', { col: '#e8e2d6', hat: 'hair', hatc: '#3a2a1a', tie: '#d9443a', specs: 1 }, room, 1.25), makeChar('n1', { col: '#7aa0d0', hat: 'bob', hatc: '#5a3a2a' }, room, 1.25), makeChar('n2', { col: '#e8e2d6', hat: 'bald', tie: '#3d6fb6' }, room, 1.25), makeChar('n3', { col: '#d9a441', hat: 'hair', hatc: '#1d1a22', specs: 1 }, room, 1.25)];
[[-2.5, 4.4], [-.85, 5.0], [.85, 4.8], [2.5, 4.4]].forEach(([x, z], i) => NAV[i].g.position.set(x, 0, z));
const roomLamp = new THREE.PointLight(0xbfe8ff, 30, 30, 1.6); roomLamp.position.set(200, 9, 6); scene.add(roomLamp);
const effect = new OutlineEffect(R, { defaultThickness: .0045, defaultColor: [.06, .05, .12] });
// ---------------- state ----------------
const MODE = t => t < C.rewind ? 'space' : t < S.lost.start ? 'space' : t < S.alt.start ? 'nosig' : t < S.burn.start ? 'alt' : t < S.nav.start ? 'space' : t < S.twist.start ? 'room' : t < S.units.start ? 'typo' : t < S.ratio.start ? 'units' : t < S.drift.start ? 'ratio' : 'space';
const tan = new THREE.Vector3();
function burnPose(vt) { // orbiter skimming the limb, moving +x around Mars (great circle in x-y plane, top)
  const ph = -.32 + vt * .045, r = MR * 1.07; const p = [r * Math.sin(ph), r * Math.cos(ph), 0]; return { p, ph }; }
function state(t) { const md = MODE(t); sp.visible = md == 'space'; room.visible = md == 'room';
  scene.background = md == 'room' ? new THREE.Color(0x2a2e44) : SPACE.clone();
  const hook = t < C.rewind, burn = t >= S.burn.start && t < S.nav.start, out = t >= S.outro.start, drift = t >= S.drift.start && t < S.outro.start, when = !hook && t < S.lost.start;
  const fr = Math.floor(t * 4) % 2;
  mars.rotation.y = t * .01; tripLine.visible = when; planTube.visible = actTube.visible = drift || out; earth.visible = when;
  FIRE.visible = false; ORB.g.visible = true; ORB.pan.position.set(0, 0, 0); ORB.pan.rotation.set(0, 0, 0); ORB.body.rotation.set(0, 0, 0);
  SPK.forEach(s => s.visible = false); DEB.forEach(d => d.visible = false); PUFF.forEach(p => p.visible = false);
  ORB.g.scale.setScalar(.55);
  if (hook || burn) { const vt = hook ? 2 + t * .6 : (t - S.burn.start) + .5; const { p, ph } = burnPose(vt); ORB.g.position.set(...p); ORB.g.rotation.set(0, 0, -ph); FIRE.visible = true;
    const fl = .85 + .15 * Math.sin(t * 40) + .08 * Math.sin(t * 23); FIRE.scale.set(.8, .8 * fl, .8 * fl); plasma.material.opacity = .28 + .08 * Math.sin(t * 31);
    ORB.g.position.y += Math.sin(t * 60) * .02;
    SPK.forEach((s, i) => { const u = s.userData; const q = ((t * .9 + u.o) % 1); s.visible = true; const v = new THREE.Vector3(-q * u.v * 3.2, u.y * (1 + q * 2), u.z * (1 + q * 2)); v.applyEuler(ORB.g.rotation); s.position.set(p[0] + v.x * .9, p[1] + v.y * .9, p[2] + v.z); s.scale.setScalar(1 - q); });
    if (burn && t > C.brk) { const q = t - C.brk; ORB.pan.position.set(-q * 1.8, q * .9, q * 1.2); ORB.pan.rotation.set(q * 2, q * 1.5, q * 3); }
    if (hook && t > 3.0) { const q = t - 3.0; ORB.pan.position.set(-q * 1.6, q * .8, q * 1.1); ORB.pan.rotation.set(q * 2, q * 1.5, q * 3); } }
  else if (when) { let pos; const u = E.io(pr(t, C.rewind + .2, C.behind + .4)); if (t < C.behind + .4) pos = TRIP.getPoint(u); else { const k = E.io(pr(t, C.behind + .4, S.lost.start + .1)); const th0 = Math.atan2(8, -14.5), th = th0 + k * 2.4; pos = new THREE.Vector3(15.5 * Math.cos(th), -4 + k * 3, 15.5 * Math.sin(th)); }
    ORB.g.position.copy(pos); ORB.g.rotation.set(.3, t * .3, .2); ORB.g.scale.setScalar(t < C.behind ? 1.1 : .9); }
  else if (drift) { const u = .02 + .5 * E.io(pr(t, S.drift.start + .2, S.outro.start)); const pos = ACT.getPoint(u); ORB.g.position.copy(pos); ORB.g.scale.setScalar(1.0); ORB.g.rotation.set(.2, t * .4, 0);
    const nShown = Math.max(.02, u); actTube.geometry.setDrawRange(0, Math.floor(actGeo.index.count * nShown / 3) * 3);
    PUFF.forEach((p, i) => { const tt = S.drift.start + .3 + i * .7, q = t - tt; if (q < 0 || q > 1.2) return; p.visible = true; const pp = ACT.getPoint(Math.max(0, .02 + .5 * E.io(pr(tt, S.drift.start + .2, S.outro.start)))); p.position.set(pp.x + q * 1.5, pp.y - q * .8, pp.z + 1); p.scale.setScalar(.4 + q * 1.4); p.material.opacity = .8 * (1 - q / 1.2); }); }
  else if (out) { ORB.g.visible = false; actTube.geometry.setDrawRange(0, Infinity);
    DEB.forEach((d, i) => { const u = d.userData; d.visible = true; const q = (t - S.outro.start) * .25 + i * .03; const pp = ACT.getPoint(Math.min(.62, .5 + q * .2)); d.position.set(pp.x + Math.cos(u.a) * u.v * (1 + q), pp.y + u.y * 2 + Math.sin(u.a) * u.v * .6, pp.z + Math.sin(u.b) * u.v); d.rotation.set(t * u.v, t * u.a * .3, 0); debGlow[i].material.opacity = .5 + .2 * Math.sin(t * 20 + i); }); }
  if (!drift && !out) actTube.geometry.setDrawRange(0, Infinity);
  // room
  if (md == 'room') { drawScreen(pr(t, C.odd - .5, C.nofind + 1));
    NAV.forEach((o, i) => { let p = 'idle'; if (t > C.odd) p = i == 0 ? 'point' : i == 2 ? 'paper' : 'think'; if (t > C.nofind) p = i == 0 ? 'think' : 'shrug'; pose(o, p, p == 'shrug' ? fr : 0); }); }
  return { md }; }
const KEYS = () => [
  // hook: close on burning orbiter
  [0, [-3.2, 11.9, 6.5], [0, 10.4, 0], 46], [C.rewind - .01, [-1.5, 12.6, 5.0], [1.5, 10.4, 0], 44],
  // journey: wide vertical Earth -> Mars
  [C.rewind, [18, -22, 66], [-4, -20, 0], 50], [C.mco, [6, -30, 32], [-12, -32, 2], 48], [C.trip, [16, -18, 64], [-4, -18, 0], 50],
  [C.behind, [-12, 4, 36], [-2, 0, 0], 46], [S.lost.start - .01, [-14, 6, 34], [0, 0, 0], 46],
  // burn
  [S.burn.start, [-2.6, 11.6, 5.8], [0, 10.6, 0], 46], [S.nav.start - .01, [-1.2, 12.4, 4.6], [1.8, 10.4, 0], 44],
  // room
  [S.nav.start, [200, 4.6, 17], [200, 4.4, 0], 48], [C.odd, [200.8, 5.0, 16], [200, 4.6, 0], 48], [S.twist.start - .01, [199.4, 4.0, 14.5], [200, 3.6, 2], 48],
  // drift: wide on Mars + paths
  [S.drift.start, [-3, 3, 46], [-6, 0, 0], 50], [C.ten, [-4, 3, 42], [-6, 0, 0], 50], [S.outro.start - .01, [-8, 2, 34], [-8, -1, 0], 48],
  // outro
  [S.outro.start, [-4, 5, 40], [-6, 0, 0], 50], [TL.TOTAL, [-3, 7, 48], [-5, 1, 0], 50]].sort((a, b) => a[0] - b[0]);
function camAt(t) { const K = KEYS(); let i = 0; while (i < K.length - 2 && K[i + 1][0] <= t) i++; const [t0, P0, T0, f0] = K[i], [t1, P1, T1, f1] = K[i + 1]; const jump = Math.hypot(P1[0] - P0[0], P1[1] - P0[1], P1[2] - P0[2]) > 25 && t1 - t0 < .05; const p = jump ? 0 : E.io(pr(t, t0, t1));
  const P = P0.map((v, k) => lerp(v, P1[k], p)), T = T0.map((v, k) => lerp(v, T1[k], p)); cam.fov = lerp(f0, f1, p); cam.updateProjectionMatrix(); cam.position.set(...P); cam.lookAt(...T);
  const hook = t < C.rewind, burn = t >= S.burn.start && t < S.nav.start; if (hook || burn) { const o = ORB.g.position, zz = burn ? pr(t, S.burn.start, S.nav.start) : t / C.rewind; cam.fov = 44; cam.updateProjectionMatrix(); cam.position.set(o.x + 4.2 - zz * 1.2, o.y + 1.9, o.z + 7.2 - zz * 1.2); cam.lookAt(o.x - 1.4, o.y - .9, o.z); const a = .05 + (burn && t > C.brk && t < C.brk + .5 ? .2 : 0); cam.position.x += Math.sin(t * 70) * a; cam.position.y += Math.cos(t * 63) * a; }
  CH.forEach(o => o.pl.quaternion.copy(cam.quaternion)); }
function render3() { R.setClearColor(scene.background, 1); effect.render(scene, cam); ctx.drawImage(glc, 0, 0); }
function wp(g, x, y, z) { const v = new THREE.Vector3(x, y, z); g.localToWorld(v); return [v.x, v.y, v.z]; }
