// ================= GTA 6 첫날 5조 =================
import { OutlineEffect } from 'three/addons/effects/OutlineEffect.js';
const TLFILE = 'gta6_timeline.json';
const grad = (() => { const d = new Uint8Array([95, 175, 255]); const t = new THREE.DataTexture(d, 3, 1, THREE.RedFormat); t.minFilter = t.magFilter = THREE.NearestFilter; t.needsUpdate = true; return t; })();
const MM = (c, o = {}) => new THREE.MeshToonMaterial({ color: c, gradientMap: grad, ...o });
const NO_OL = m => { m.userData.outlineParameters = { visible: false }; return m; };
const hemi = new THREE.HemisphereLight(0xfff0e0, 0x4a3a5a, 1.5); scene.add(hemi);
const key = new THREE.DirectionalLight(0xffffff, 2.0); key.position.set(5, 10, 8); key.castShadow = true; key.shadow.mapSize.set(2048, 2048); Object.assign(key.shadow.camera, { left: -12, right: 12, top: 12, bottom: -12 }); scene.add(key, key.target);
const rim = new THREE.DirectionalLight(0xff9ad8, 1.4); rim.position.set(-6, 5, -6); scene.add(rim);
scene.background = new THREE.Color(0x2a1f3d); scene.fog = new THREE.Fog(0x2a1f3d, 22, 60);
const PINK = 0xff4fa0, ORNG = 0xff9a3c, TEAL = 0x2fd0c0, GOLD = 0xf2c230;
// ---------- store (origin) ----------
const store = group();
add(mesh(new THREE.PlaneGeometry(40, 40), MM(0x3b2d4f)), 0, 0, 0, store).rotation.x = -Math.PI / 2;
const tileTex = canvasTex(512, 512, (x, w, h) => { for (let i = 0; i < 8; i++) for (let j = 0; j < 8; j++) { x.fillStyle = (i + j) % 2 ? '#4a3a62' : '#3b2d4f'; x.fillRect(i * 64, j * 64, 64, 64); } }, 6, 6);
add(mesh(new THREE.PlaneGeometry(30, 30), NO_OL(MM(0xffffff, { map: tileTex }))), 0, .01, 0, store).rotation.x = -Math.PI / 2;
add(box(30, 10, .4, MM(0x5a3f7a)), 0, 5, -6, store);
const neonTex = canvasTex(1024, 256, (x, w, h) => { x.fillStyle = '#1a0f28'; x.fillRect(0, 0, w, h); x.font = '150px Jua'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.shadowColor = '#ff4fa0'; x.shadowBlur = 40; x.fillStyle = '#ffd1ea'; x.fillText('GAME SHOP', w / 2, h / 2 + 8); });
add(mesh(new THREE.PlaneGeometry(9, 2.25), NO_OL(new THREE.MeshBasicMaterial({ map: neonTex, toneMapped: false }))), 0, 6.6, -5.75, store);
// shelves with game boxes
const coverTex = canvasTex(256, 360, (x, w, h) => { const g = x.createLinearGradient(0, 0, w, h); g.addColorStop(0, '#ff4fa0'); g.addColorStop(.5, '#ff9a3c'); g.addColorStop(1, '#5a2fd0'); x.fillStyle = g; x.fillRect(0, 0, w, h); x.fillStyle = '#111'; x.fillRect(0, 0, w, 50); x.fillStyle = '#fff'; x.font = '40px Jua'; x.textAlign = 'center'; x.fillText('GAME', w / 2, 38); x.font = '170px Jua'; x.fillStyle = '#fff'; x.strokeStyle = '#1f2430'; x.lineWidth = 10; x.strokeText('VI', w / 2, 250); x.fillText('VI', w / 2, 250); });
const COV = MM(0xffffff, { map: coverTex }), SIDE = MM(0x1f1a2a);
const gbox = () => mesh(new THREE.BoxGeometry(.5, .7, .1), [SIDE, SIDE, SIDE, SIDE, COV, SIDE]);
[-1, 1].forEach(s => { const sh = group(s * 6.5, 0, -5, store); for (let r = 0; r < 4; r++) { add(box(4.6, .1, 1, MM(0x7a5a3a)), 0, .8 + r * 1.1, 0, sh); for (let k = 0; k < 7; k++) add(gbox(), -1.95 + k * .65, 1.22 + r * 1.1, .1, sh); } add(box(.15, 5, 1, MM(0x6a4a30)), -2.35, 2.5, 0, sh); add(box(.15, 5, 1, MM(0x6a4a30)), 2.35, 2.5, 0, sh); });
// counter + register
const counter = group(0, 0, 0, store); add(box(5, 1.1, 1.4, MM(0xe8e0f0), .06), 0, .55, 0, counter); add(box(5.2, .1, 1.6, MM(0x2fd0c0), .03), 0, 1.15, 0, counter);
const reg = group(1.3, 1.2, 0, counter); add(box(1.1, .5, .9, MM(0x3a3f4c), .06), 0, .25, 0, reg); add(box(1.0, .1, .5, MM(0x22252e)), 0, .52, .15, reg).rotation.x = -.3;
let regTxt = ''; const regTex = canvasTex(512, 200, () => {}); function paintReg(s) { const c = regTex.image, x = c.getContext('2d'); x.fillStyle = '#0d1a12'; x.fillRect(0, 0, 512, 200); x.fillStyle = '#7dff9a'; x.font = '120px monospace'; x.textAlign = 'right'; x.textBaseline = 'middle'; x.fillText(s, 490, 108); regTex.needsUpdate = true; } paintReg('0');
const regScr = group(0, .95, -.25, reg); add(box(.9, .42, .08, MM(0x22252e)), 0, 0, 0, regScr); add(mesh(new THREE.PlaneGeometry(.8, .32), NO_OL(new THREE.MeshBasicMaterial({ map: regTex, toneMapped: false }))), 0, 0, .045, regScr); add(cyl(.05, .05, .4, MM(0x22252e)), 0, -.3, 0, regScr);
// game box stack on counter
const STACK = []; for (let i = 0; i < 14; i++) { const b = gbox(); b.rotation.x = -Math.PI / 2; b.rotation.z = (i % 3 - 1) * .15; add(b, -1.2 + (i % 2) * .08, 1.25 + i * .105, .1, counter); STACK.push(b); }
// clerk + customers (toon people)
function toonPerson(col, hairC = 0x2a1f1a) { const g = group(0, 0, 0, store); const B = MM(col), SK = MM(0xf4c9a8), HR = MM(hairC), P = MM(0x2b3140);
  [-1, 1].forEach(s => add(cyl(.13, .12, .8, P, 10), s * .15, .4, 0, g)); add(box(.62, .8, .4, B, .16), 0, 1.2, 0, g); [-1, 1].forEach(s => { const a = add(cyl(.09, .08, .7, B, 8), s * .4, 1.18, 0, g); a.rotation.z = s * .15; });
  const hd = group(0, 1.95, 0, g); add(mesh(new THREE.SphereGeometry(.34, 20, 16), SK), 0, 0, 0, hd); add(mesh(new THREE.SphereGeometry(.355, 20, 12, 0, Math.PI * 2, 0, Math.PI * .5), HR), 0, .04, -.02, hd);
  [-1, 1].forEach(s => { add(mesh(new THREE.SphereGeometry(.07, 10, 8), MM(0xffffff)), s * .12, .02, .3, hd); add(mesh(new THREE.SphereGeometry(.04, 8, 8), MM(0x111111)), s * .12, .02, .36, hd); });
  const mo = add(mesh(new THREE.TorusGeometry(.08, .025, 6, 12, Math.PI), MM(0x8a2a2a)), 0, -.13, .31, hd); mo.rotation.z = Math.PI; g.userData.hd = hd; return g; }
const clerk = toonPerson(0x2fd0c0); clerk.position.set(0, 0, -1.4);
const CUST = [[PINK, -2.4, 2.0], [ORNG, 2.6, 2.3], [0x5a8fff, -3.6, 3.4], [0xb06aff, 3.8, 3.6]].map(([c, x, z], i) => { const p = toonPerson(c, [0x2a1f1a, 0x6a3a1a, 0x111111, 0xd9a441][i]); p.position.set(x, 0, z); p.rotation.y = Math.PI; return p; });
// coin stacks (split scene)
const COIN = MM(GOLD); const coinStack = (n) => { const g = group(0, 0, 0, store); for (let i = 0; i < n; i++) add(cyl(.32, .32, .1, COIN, 24), (i % 2) * .02, 1.25 + i * .105, 0, g); return g; };
const PILES = []; for (let k = 0; k < 10; k++) { const p = coinStack(6 + (k % 3)); PILES.push(p); }
// ---------- city (x=100) ----------
const city = group(100, 0, 0);
add(mesh(new THREE.PlaneGeometry(80, 120), MM(0x3e6a4a)), 0, 0, -30, city).rotation.x = -Math.PI / 2;
add(box(7, .05, 120, MM(0x3a3a44)), 0, .03, -30, city);
for (let i = 0; i < 40; i++) add(box(.25, .02, 1.4, MM(0xf2f2f2)), 0, .07, 8 - i * 3, city);
const checkTex = canvasTex(256, 64, (x, w, h) => { for (let i = 0; i < 16; i++) for (let j = 0; j < 4; j++) { x.fillStyle = (i + j) % 2 ? '#111' : '#fff'; x.fillRect(i * 16, j * 16, 16, 16); } });
add(mesh(new THREE.PlaneGeometry(7, 1), NO_OL(MM(0xffffff, { map: checkTex }))), 0, .08, 0, city).rotation.x = -Math.PI / 2;
const winTex = canvasTex(256, 512, (x, w, h) => { x.fillStyle = '#ffffff'; x.fillRect(0, 0, w, h); for (let i = 0; i < 4; i++) for (let j = 0; j < 10; j++) { x.fillStyle = (i * 7 + j * 3) % 5 ? '#ffe9a8' : '#5a6a8a'; x.fillRect(20 + i * 58, 20 + j * 49, 40, 30); } });
let bs = 5; const br = () => { bs = (bs * 16807) % 2147483647; return bs / 2147483647; };
const BLD = [0xff8fb8, 0x8fb8ff, 0xffc86a, 0x9ae0c8, 0xc8a8ff];
for (let i = 0; i < 26; i++) { const s = i % 2 ? 1 : -1, z = 4 - Math.floor(i / 2) * 6, h = 3 + br() * 7, w = 2.5 + br() * 2; const b = add(box(w, h, 3, MM(BLD[i % 5], { map: winTex }), .1), s * (6.5 + br() * 2), h / 2, z, city); }
// HQ tower (belief)
const hq = group(-7, 0, -4, city); add(box(4, 12, 4, MM(0x6a5aff, { map: winTex }), .15), 0, 6, 0, hq); add(box(4.4, .4, 4.4, MM(0x3a2f8a)), 0, 12.2, 0, hq);
const hqTex = canvasTex(512, 256, (x, w, h) => { x.fillStyle = '#ffe600'; x.fillRect(0, 0, w, h); x.fillStyle = '#1f2430'; x.font = '130px Jua'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('게임 회사', w / 2, h / 2 + 8); });
add(mesh(new THREE.PlaneGeometry(3.6, 1.8), NO_OL(new THREE.MeshBasicMaterial({ map: hqTex, toneMapped: false }))), 0, 10.5, 2.02, hq);
const BILLS = []; const billM = NO_OL(MM(0x7ad17a, { side: THREE.DoubleSide })); for (let i = 0; i < 70; i++) { const b = add(mesh(new THREE.PlaneGeometry(.6, .3), billM), 0, 0, 0, hq); b.userData = { x: (br() - .5) * 9, z: (br() - .5) * 6 + 2, sp: .8 + br() * .9, ph: br() * 20, rx: br() * 6 }; BILLS.push(b); }
// car on start line
const car = group(0, 0, 1.8, city); add(box(1.9, .6, 3.6, MM(0xff4f5a), .2), 0, .65, 0, car); add(box(1.6, .55, 1.8, MM(0xff4f5a), .2), 0, 1.2, .2, car); add(box(1.5, .45, 1.7, NO_OL(MM(0x9ad8ff)), .1), 0, 1.22, .2, car);
const WHEELS = [[-1, 1.1], [1, 1.1], [-1, -1.2], [1, -1.2]].map(([x, z]) => { const w = add(cyl(.38, .38, .3, MM(0x1f1f24), 18), x * .95, .38, z, car); w.rotation.z = Math.PI / 2; return w; });
[-1, 1].forEach(s => add(box(.35, .2, .05, NO_OL(new THREE.MeshBasicMaterial({ color: 0xfff6c0 }))), s * .6, .7, -1.82, car));
// start banner + milestone signs
const banTex = canvasTex(1024, 192, (x, w, h) => { x.fillStyle = '#ff4fa0'; x.fillRect(0, 0, w, h); x.fillStyle = '#fff'; x.font = '130px Jua'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('START  출발선', w / 2, h / 2 + 8); });
const banner = group(0, 0, 0, city); [-1, 1].forEach(s => add(cyl(.12, .12, 5, MM(0xdddddd)), s * 4, 2.5, 0, banner)); add(mesh(new THREE.PlaneGeometry(8, 1.5), NO_OL(new THREE.MeshBasicMaterial({ map: banTex, toneMapped: false, side: THREE.DoubleSide }))), 0, 4.4, 0, banner);
const SIGNS = [['1년', -15], ['5년', -32], ['10년', -50]].map(([s, z]) => { const tx = canvasTex(256, 160, (x, w, h) => { x.fillStyle = '#2f7f4c'; x.fillRect(0, 0, w, h); x.strokeStyle = '#fff'; x.lineWidth = 10; x.strokeRect(8, 8, w - 16, h - 16); x.fillStyle = '#fff'; x.font = '90px Jua'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(s, w / 2, h / 2 + 6); });
  const g = group(4.6, 0, z, city); add(cyl(.08, .08, 3, MM(0xcccccc)), 0, 1.5, 0, g); add(mesh(new THREE.PlaneGeometry(1.8, 1.1), NO_OL(new THREE.MeshBasicMaterial({ map: tx, toneMapped: false, side: THREE.DoubleSide }))), 0, 3.3, 0, g); g.rotation.y = -.35; return g; });
const effect = new OutlineEffect(R, { defaultThickness: .004, defaultColor: [.06, .05, .1] });
// ---------- modes ----------
const MODE = t => t < C.pre ? 'store' : t < S.belief.start ? 'boxes' : t < S.twist.start ? 'city' : t < S.split.start ? 'typo' : t < S.cost.start ? 'store' : t < S.quote.start ? 'receipt' : t < S.gta5.start ? 'quote' : t < S.online.start ? 'chart' : t < S.street.start ? 'neon' : t < S.start.start ? 'scale' : 'city';
function state(t) { const md = MODE(t); store.visible = md == 'store'; city.visible = md == 'city';
  const split = t >= S.split.start && t < S.cost.start;
  // register count-up in hook
  const v = split ? '5조' : (t < C.won5 ? '0' : Math.round(5 * E.out(pr(t, C.won5, C.won5 + 1.0))) + '조'); if (v != regTxt) { regTxt = v; paintReg(v); }
  STACK.forEach((b, i) => { b.visible = !split; b.position.y = 1.25 + i * .105 + (t < 7 ? Math.max(0, 3 - (t - i * .12) * 6) : 0); });
  CUST.forEach((p, i) => { p.visible = true; p.position.y = Math.abs(Math.sin(t * 6 + i)) * .06; p.userData.hd.rotation.z = Math.sin(t * 2 + i) * .08; });
  clerk.userData.hd.rotation.y = Math.sin(t * 1.3) * .3;
  // coin piles: centered pile then 2 groups slide away
  PILES.forEach((p, k) => { p.visible = split; const col = k % 5, row = Math.floor(k / 5); let x = -1.6 + col * .75, z = .1 + row * .0 - (row ? .45 : -.2);
    const a = E.back(pr(t, C.notrev + k * .05, C.notrev + .4 + k * .05)); p.scale.setScalar(Math.max(.001, a));
    if (k < 2) { const m = E.io(pr(t, C.store + .2, C.store + 1.0)); x = lerp(x, -4.2 + k * .7, m); z = lerp(z, 1.4, m); }
    if (k == 2 || k == 3) { const m = E.io(pr(t, C.console, C.console + .8)); x = lerp(x, 3.4 + (k - 2) * .7, m); z = lerp(z, 1.4, m); }
    p.position.set(x, k < 4 && t > C.store + .2 ? -0.0 : 0, z); });
  // city
  const bel = t >= S.belief.start && t < S.twist.start;
  BILLS.forEach((b, i) => { b.visible = bel && t > C.rich - .2; const u = b.userData, f = ((t - C.rich) * u.sp + u.ph) % 14; b.position.set(u.x + Math.sin(t * 2 + i) * .4, 14 - f, u.z); b.rotation.set(u.rx + t * 3, t * 2 + i, Math.sin(t * 4 + i)); });
  hq.visible = bel; banner.visible = !bel && t < S.outro.start;
  const drive = t >= S.outro.start ? E.io(pr(t, S.outro.start + .3, TL.TOTAL)) : 0; car.position.z = 1.8 - drive * 46 - (t > S.start.start && t < S.outro.start ? Math.max(0, Math.sin((t - S.start.start) * 20)) * .02 : 0);
  WHEELS.forEach(w => w.rotation.x = -drive * 60); car.visible = !bel;
  return { md }; }
const KEYS = () => [
  [0, [1.0, 4.2, 9.5], [0.3, 1.6, 0], 40], [C.gta6, [-.5, 3.6, 8.0], [-.3, 1.6, 0], 38], [C.pre - .01, [-1.0, 3.3, 7.0], [-.4, 1.6, 0], 38],
  [S.belief.start, [103, 3.5, 12], [94, 7, -4], 44], [S.twist.start - .01, [101, 2.5, 10], [94, 8, -4], 44],
  [S.split.start, [0, 6.5, 7.5], [0, 1.2, .4], 40], [C.cust, [-.5, 5.5, 8.5], [0, 1.4, .8], 42], [C.console, [0, 6.0, 9.0], [0, 1.2, .8], 44], [S.cost.start - .01, [0, 6.2, 9.4], [0, 1.2, .8], 44],
  [S.start.start, [106, 5.5, 15], [100, 2.2, -2], 42], [S.outro.start - .01, [104.5, 4.8, 13], [100, 2.2, -2], 42],
  [S.outro.start, [100, 7, 14], [100, 1, -12], 46], [70.5, [100, 6.5, -28], [100, 1, -60], 50]].sort((a, b) => a[0] - b[0]);
function camAt(t) { const K = KEYS(); let i = 0; while (i < K.length - 2 && K[i + 1][0] <= t) i++; const [t0, P0, T0, f0] = K[i], [t1, P1, T1, f1] = K[i + 1]; const p = Math.abs(P1[0] - P0[0]) > 50 ? 0 : E.io(pr(t, t0, t1));
  const P = P0.map((v, k) => lerp(v, P1[k], p)), T = T0.map((v, k) => lerp(v, T1[k], p)); cam.fov = lerp(f0, f1, p); cam.updateProjectionMatrix(); cam.position.set(...P); cam.lookAt(...T); }
function render3() { R.setClearColor(scene.background, 1); effect.render(scene, cam); ctx.drawImage(glc, 0, 0); }
