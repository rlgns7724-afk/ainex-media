// ================= 수출 1조 달러, 짐은 오히려 줄었다 =================
import { OutlineEffect } from 'three/addons/effects/OutlineEffect.js';
const TLFILE = 'export_timeline.json';
const grad = (() => { const d = new Uint8Array([95, 175, 255]); const t = new THREE.DataTexture(d, 3, 1, THREE.RedFormat); t.minFilter = t.magFilter = THREE.NearestFilter; t.needsUpdate = true; return t; })();
const MM = (c, o = {}) => new THREE.MeshToonMaterial({ color: c, gradientMap: grad, ...o });
const NO_OL = m => { m.userData.outlineParameters = { visible: false }; return m; };
const hemi = new THREE.HemisphereLight(0xfff4e6, 0x4a5a7a, 1.6); scene.add(hemi);
const key = new THREE.DirectionalLight(0xffffff, 2.0); key.position.set(6, 12, 9); key.castShadow = true; key.shadow.mapSize.set(2048, 2048); Object.assign(key.shadow.camera, { left: -16, right: 16, top: 16, bottom: -16 }); scene.add(key, key.target);
const rim = new THREE.DirectionalLight(0x9ad8ff, 1.0); rim.position.set(-6, 5, -6); scene.add(rim);
const SKY = new THREE.Color(0x9fd3f0); scene.background = SKY; scene.fog = new THREE.Fog(0x9fd3f0, 30, 80);
const CCOL = [0xe8463a, 0x3d8fd6, 0xf2c230, 0x2fb07c, 0xff8a3c, 0x8a6aff];
const ribTex = canvasTex(256, 128, (x, w, h) => { x.fillStyle = '#fff'; x.fillRect(0, 0, w, h); for (let i = 0; i < 16; i++) { x.fillStyle = i % 2 ? 'rgba(0,0,0,.16)' : 'rgba(255,255,255,.2)'; x.fillRect(i * 16, 0, 9, h); } x.strokeStyle = 'rgba(0,0,0,.35)'; x.lineWidth = 8; x.strokeRect(0, 0, w, h); });
const CMAT = CCOL.map(c => MM(c, { map: ribTex }));
const container = (k) => box(2.4, 1.0, 1.0, CMAT[k % CMAT.length], .03);
// ---------- port (origin) ----------
const port = group();
const sea = add(mesh(new THREE.PlaneGeometry(120, 120), NO_OL(MM(0x2f86c8))), 0, -.2, 10, port); sea.rotation.x = -Math.PI / 2;
const waveM = NO_OL(new THREE.MeshBasicMaterial({ color: 0xbfe6ff, transparent: true, opacity: .55 }));
const WAVES = []; for (let i = 0; i < 26; i++) { const w = add(mesh(new THREE.PlaneGeometry(1.6, .12), waveM), (i * 7.3 % 30) - 15, -.15, 6 + (i * 3.7 % 14), port); w.rotation.x = -Math.PI / 2; WAVES.push(w); }
add(box(34, 1.2, 12, MM(0xcfc6b4)), 0, .4, -3, port);
add(box(34, .15, .4, MM(0xf2c230)), 0, 1.05, 2.9, port);
// gantry crane
const crane = group(4, 1, 1.5, port); const CR = MM(0xf2a33a);
[[-1.6, -1.6], [1.6, -1.6], [-1.6, 1.4], [1.6, 1.4]].forEach(([x, z]) => add(box(.35, 9, .35, CR), x, 4.5, z, crane));
add(box(3.6, .5, .5, CR), 0, 9, -1.6, crane); add(box(3.6, .5, .5, CR), 0, 9, 1.4, crane);
const boom = add(box(.6, .5, 13, CR), 0, 9.4, 3.5, crane); add(box(1.4, 1, 1.4, MM(0x3a4a5e)), 0, 10.1, -.5, crane);
const trolley = group(0, 9.0, 6, crane); add(box(1, .4, 1, MM(0x3a4a5e)), 0, 0, 0, trolley);
const cable = add(cyl(.04, .04, 1, MM(0x222222), 6), 0, 0, 0, trolley); const hang = container(2); add(hang, 0, 0, 0, trolley);
// ship
const ship = group(-1, 0, 9.5, port);
add(box(20, 2.4, 4.6, MM(0x24324f), .2), 0, .9, 0, ship); add(box(20.1, .6, 4.7, MM(0xc9372d)), 0, -.05, 0, ship);
const bridge = group(-8, 2.1, 0, ship); add(box(2.6, 3.2, 3.8, MM(0xf4f1ea), .1), 0, 1.6, 0, bridge); add(box(2.7, .5, 3.9, NO_OL(MM(0x5ab4e8))), 0, 2.6, 0, bridge); add(cyl(.4, .5, 1.6, MM(0xe8463a)), .6, 3.8, 0, bridge);
let k0 = 0; for (let c = 0; c < 6; c++) for (let r = 0; r < 3; r++) for (let l = 0; l < 2 + ((c + r) % 2); l++) add(container(k0++), -4.6 + c * 2.5, 2.6 + l * 1.0, -1.05 + r * 1.05, ship);
// dock stacks (grow to a mountain during belief)
const STK = []; { let k = 3; for (let x = -6; x <= 6; x++) for (let z = -2; z <= 2; z++) { const hgt = Math.max(1, Math.round(6 - Math.abs(x) * .75 - Math.abs(z) * .9)); for (let l = 0; l < hgt; l++) { const c = container(k++); c.rotation.y = Math.PI / 2; add(c, -6 + x * 1.08, 1.5 + l * 1.0, -4.5 + z * 2.45, port); c.userData = { l, d: Math.abs(x) + Math.abs(z), base: 1.5 + l }; STK.push(c); } } }
const LOW = []; [[-12, -1], [-10.5, -1], [-12, -3.2], [11.5, -2], [13, -2], [11.5, -4.4]].forEach(([x, z], i) => { const c = container(i); add(c, x, 1.5, z, port); LOW.push(c); });
// billboard counter
const bb = group(-7.5, 1, -8.6, port); [-2.8, 2.8].forEach(x => add(cyl(.18, .18, 6, MM(0x8a96a8)), x, 3, 0, bb));
add(box(7.4, 2.8, .4, MM(0x1f2430), .1), 0, 6.6, 0, bb);
const bbTex = canvasTex(1024, 384, () => {}); let bbTxt = '';
function paintBB(s, s2) { const c = bbTex.image, x = c.getContext('2d'); x.fillStyle = '#0d1420'; x.fillRect(0, 0, 1024, 384); x.fillStyle = '#9ad8ff'; x.font = '62px Jua'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(s2, 512, 70); x.shadowColor = '#ffe600'; x.shadowBlur = 30; x.fillStyle = '#ffe600'; x.font = '170px Jua'; x.fillText(s, 512, 240); bbTex.needsUpdate = true; }
add(mesh(new THREE.PlaneGeometry(7, 2.6), NO_OL(new THREE.MeshBasicMaterial({ map: bbTex, toneMapped: false }))), 0, 6.6, .22, bb);
// ---------- chip lab (x=100) ----------
const lab = group(100, 0, 0);
add(mesh(new THREE.PlaneGeometry(60, 60), MM(0x1c2a48)), 0, 0, 0, lab).rotation.x = -Math.PI / 2;
const gridTex = canvasTex(512, 512, (x, w, h) => { x.fillStyle = '#1c2a48'; x.fillRect(0, 0, w, h); x.strokeStyle = 'rgba(80,200,255,.35)'; x.lineWidth = 4; for (let i = 0; i <= 8; i++) { x.beginPath(); x.moveTo(i * 64, 0); x.lineTo(i * 64, h); x.stroke(); x.beginPath(); x.moveTo(0, i * 64); x.lineTo(w, i * 64); x.stroke(); } }, 8, 8);
add(mesh(new THREE.PlaneGeometry(40, 40), NO_OL(MM(0xffffff, { map: gridTex }))), 0, .01, 0, lab).rotation.x = -Math.PI / 2;
const ped = group(0, 0, 0, lab); add(cyl(2.2, 2.5, 1.2, MM(0xe8e0f0), 32), 0, .6, 0, ped); add(cyl(2.25, 2.25, .12, NO_OL(MM(0x38e1ff)), 32), 0, 1.2, 0, ped);
const chip = group(0, 1.7, 0, lab);
const chipTex = canvasTex(512, 512, (x, w, h) => { x.fillStyle = '#23272f'; x.fillRect(0, 0, w, h); x.strokeStyle = '#3a404c'; x.lineWidth = 6; x.strokeRect(40, 40, w - 80, h - 80); x.fillStyle = '#c8ced8'; x.font = '92px Jua'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('MEMORY', w / 2, h / 2 - 40); x.font = '56px Jua'; x.fillStyle = '#7a8494'; x.fillText('DRAM · HBM', w / 2, h / 2 + 60); x.fillStyle = '#9aa3b5'; x.beginPath(); x.arc(90, 90, 16, 0, 7); x.fill(); });
const CB = MM(0x23272f); add(mesh(new THREE.BoxGeometry(2.6, .35, 2.6), [CB, CB, MM(0xffffff, { map: chipTex }), CB, CB, CB]), 0, 0, 0, chip);
const PIN = MM(0xf2c230); for (let i = 0; i < 9; i++) { const o = -1.04 + i * .26; [[o, 1.42, 0], [o, -1.42, 0], [1.42, o, 1], [-1.42, o, 1]].forEach(([a, b, r]) => { const p = add(box(.12, .08, .3, PIN), a, -.1, b, chip); if (r) p.rotation.y = Math.PI / 2; }); }
const SM = []; for (let i = 0; i < 12; i++) { const s = add(box(.5, .08, .5, MM(0x2a3a5a)), 0, 0, 0, lab); s.userData = { a: i / 12 * Math.PI * 2, r: 4 + (i % 3) * .8 }; SM.push(s); }
const bigC = container(1); bigC.scale.setScalar(2.2); add(bigC, -6.5, 1.1, -3, lab); bigC.rotation.y = .5;
// ---------- rank bars (x=200) ----------
const rk = group(200, 0, 0);
add(mesh(new THREE.PlaneGeometry(60, 60), MM(0xefe6d6)), 0, 0, 0, rk).rotation.x = -Math.PI / 2;
add(box(16, .3, 4, MM(0xd8cdb8)), 0, .15, 0, rk);
const RK = [['멕시코', 4688, 26, 0x2fb07c], ['이탈리아', 4658, 13, 0x3d8fd6], ['일본', 4288, 256, 0xe8e0f0], ['한국', 4136, 1817, 0xe8463a]];
const chipTex2 = canvasTex(256, 256, (x, w, h) => { x.fillStyle = '#2fd0c0'; x.fillRect(0, 0, w, h); x.strokeStyle = '#1f6f6a'; x.lineWidth = 8; for (let i = 1; i < 4; i++) { x.beginPath(); x.moveTo(i * 64, 0); x.lineTo(i * 64, h); x.stroke(); x.beginPath(); x.moveTo(0, i * 64); x.lineTo(w, i * 64); x.stroke(); } x.fillStyle = '#1f2430'; x.font = '70px Jua'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('칩', w / 2, h / 2 + 4); });
const U = 1 / 600; const BARS = RK.map(([n, v, c, col], i) => { const g = group(-5.4 + i * 3.6, .3, 0, rk); const hb = v * U, hc = Math.max(.06, c * U);
  const base = add(box(2.4, hb, 2.4, MM(col, { map: ribTex }), .05), 0, hb / 2, 0, g); const top = add(box(2.4, hc, 2.4, MM(0xffffff, { map: chipTex2 }), .05), 0, hb + hc / 2, 0, g); return { g, base, top, hb, hc, n }; });
const effect = new OutlineEffect(R, { defaultThickness: .004, defaultColor: [.06, .07, .12] });
// ---------- modes ----------
const MODE = t => t < C.usa ? 'port' : t < C.min ? 'club' : t < S.belief.start ? 'clock' : t < S.twist.start ? 'port' : t < S.weight.start ? 'typo' : t < S.chip.start ? 'weight' : t < S.ai.start ? 'chip' : t < S.ratio.start ? 'neon' : t < S.rank.start ? 'ratio' : t < S.caveat.start ? 'rank' : t < S.outro.start ? 'collage' : 'port';
function state(t) { const md = MODE(t); port.visible = md == 'port'; lab.visible = md == 'chip'; rk.visible = md == 'rank';
  scene.background = md == 'chip' ? new THREE.Color(0x101a30) : md == 'rank' ? new THREE.Color(0xf4ecdc) : SKY; scene.fog.color.copy(scene.background);
  // billboard counter
  let s, s2 = '올해 누적 수출'; if (t < C.first + 1.6) { const v = Math.round(lerp(9950, 9999, E.out(pr(t, .2, C.first + 1.5)))); s = '$ ' + v.toLocaleString() + '억'; } else { s = '$ 1조 돌파!'; s2 = '11월 19일 오후 2시 9분'; }
  if (s != bbTxt) { bbTxt = s; paintBB(s, s2); }
  WAVES.forEach((w, i) => { w.position.x = ((i * 7.3 + t * .6) % 34) - 17; w.material.opacity = .35 + .25 * Math.sin(t * 2 + i); });
  // crane loading loop
  const cyc = (t * .35) % 1; trolley.position.z = lerp(6, 8.5, Math.sin(cyc * Math.PI)); const drop = 3 + 2.5 * Math.max(0, Math.sin(cyc * Math.PI * 2)); hang.position.y = -drop; cable.scale.y = drop; cable.position.y = -drop / 2;
  const bel = t >= S.belief.start && t < S.twist.start, out = t >= S.outro.start;
  STK.forEach(c => { const u = c.userData; let vis = true, y = u.base; if (bel) { const t0 = C.cont + u.d * .12 + u.l * .18; vis = t > t0 - .6; y = u.base + Math.max(0, 1 - pr(t, t0 - .6, t0)) * 9; } else if (out) { vis = u.l < 1; } else vis = u.l < 2 && u.d < 7; c.visible = vis; c.position.y = y; });
  LOW.forEach(c => c.visible = !bel);
  ship.position.x = out ? -1 - E.io(pr(t, S.outro.start + .5, TL.TOTAL)) * 9 : -1; ship.position.y = Math.sin(t * 1.4) * .08; ship.rotation.z = Math.sin(t * 1.1) * .01;
  // chip
  chip.rotation.y = t * .5; chip.position.y = 1.9 + Math.sin(t * 2) * .12; SM.forEach((m, i) => { const u = m.userData, a = u.a + t * .4; m.position.set(Math.cos(a) * u.r, .5 + Math.sin(t * 2 + i) * .2 + (i % 2) * .4, Math.sin(a) * u.r); m.rotation.y = a; });
  // rank bars: chip tops lift off at C.ex
  BARS.forEach((b, i) => { const p = E.io(pr(t, C.ex + i * .12, C.ex + .9 + i * .12)); b.top.position.y = b.hb + b.hc / 2 + p * 9; b.top.rotation.y = p * 2; b.top.visible = p < .98; });
  return { md }; }
const KEYS = () => [
  [0, [-7.5, 7.2, 8.5], [-7.5, 7.0, -8.6], 44], [C.first, [-6.5, 7.2, 10], [-6.5, 6.6, -8.6], 44], [C.first + 1.8, [6, 9, 22], [-1, 3.5, 0], 46], [C.usa - .01, [8, 8.5, 23], [-1, 3.5, 0], 46],
  [S.belief.start, [10, 7, 14], [-5, 3.5, -4.5], 46], [S.twist.start - .01, [13, 12, 20], [-5, 4, -4.5], 48],
  [S.chip.start, [100, 3.4, 5.2], [100, 1.9, 0], 40], [C.semi, [101.5, 4.8, 7.5], [100, 1.8, 0], 42], [C.x3, [103, 6, 10.5], [99, 2.2, -1], 46], [S.ai.start - .01, [103.5, 6.5, 11.5], [99, 2.6, -1], 46],
  [S.rank.start, [200, 6.4, 35], [200, 4.4, 0], 44], [C.r8, [200.2, 6.0, 34], [200.2, 4.2, 0], 44], [S.caveat.start - .01, [200.3, 5.8, 33.5], [200.3, 4.2, 0], 44],
  [S.outro.start, [12, 10, 26], [-2, 3, 0], 48], [70.5, [4, 14, 34], [-6, 2, 4], 50]].sort((a, b) => a[0] - b[0]);
function camAt(t) { const K = KEYS(); let i = 0; while (i < K.length - 2 && K[i + 1][0] <= t) i++; const [t0, P0, T0, f0] = K[i], [t1, P1, T1, f1] = K[i + 1]; const p = Math.abs(P1[0] - P0[0]) > 50 ? 0 : E.io(pr(t, t0, t1));
  const P = P0.map((v, k) => lerp(v, P1[k], p)), T = T0.map((v, k) => lerp(v, T1[k], p)); cam.fov = lerp(f0, f1, p); cam.updateProjectionMatrix(); cam.position.set(...P); cam.lookAt(...T); }
function render3() { R.setClearColor(scene.background, 1); effect.render(scene, cam); ctx.drawImage(glc, 0, 0); }
