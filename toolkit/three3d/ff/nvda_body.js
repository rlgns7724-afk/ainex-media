// ================= 젠슨 황이 떠난 날 =================
import { OutlineEffect } from 'three/addons/effects/OutlineEffect.js';
const TLFILE = 'nvda_timeline.json';
const grad = (() => { const d = new Uint8Array([95, 175, 255]); const t = new THREE.DataTexture(d, 3, 1, THREE.RedFormat); t.minFilter = t.magFilter = THREE.NearestFilter; t.needsUpdate = true; return t; })();
const MM = (c, o = {}) => new THREE.MeshToonMaterial({ color: c, gradientMap: grad, ...o });
const NO_OL = m => { m.userData.outlineParameters = { visible: false }; return m; };
const hemi = new THREE.HemisphereLight(0xe8eeff, 0x2a2a3a, 1.1); scene.add(hemi);
const spot = new THREE.SpotLight(0xfff2d8, 80, 30, .45, .5, 1.2); spot.position.set(0, 9, 3); spot.target.position.set(0, 0, 0); spot.castShadow = true; spot.shadow.mapSize.set(2048, 2048); scene.add(spot, spot.target);
const key = new THREE.DirectionalLight(0xffffff, 1.4); key.position.set(4, 8, 8); scene.add(key); const rim = new THREE.DirectionalLight(0x9ac8ff, 1.6); rim.position.set(-6, 5, -6); scene.add(rim);
scene.background = new THREE.Color(0x15181f); scene.fog = new THREE.Fog(0x15181f, 18, 50);
// ---------- stage ----------
const stage = group();
add(mesh(new THREE.PlaneGeometry(60, 60), MM(0x2a2d36)), 0, 0, 0, stage).rotation.x = -Math.PI / 2;
add(cyl(4, 4.2, .25, MM(0x3a3f4c), 48), 0, .12, 0, stage);
const scrTex = canvasTex(1024, 512, (x, w, h) => { x.fillStyle = '#0c1a0c'; x.fillRect(0, 0, w, h); x.strokeStyle = '#76b900'; x.lineWidth = 10; x.beginPath(); for (let i = 0; i <= 40; i++) { const xx = 60 + i * 23, yy = 380 - i * 7 - Math.sin(i * .9) * 25; i ? x.lineTo(xx, yy) : x.moveTo(xx, yy); } x.stroke(); x.fillStyle = 'rgba(118,185,0,.15)'; for (let i = 0; i < 12; i++) x.fillRect(60 + i * 80, 0, 2, h); });
const screen = add(mesh(new THREE.PlaneGeometry(14, 7), NO_OL(new THREE.MeshBasicMaterial({ map: scrTex, toneMapped: false }))), 0, 5, -7, stage); const SCR = screen.material;
add(box(15, 7.8, .3, MM(0x1d2028)), 0, 5, -7.2, stage);
const desk = group(0, 0, .2, stage); add(box(3.4, .12, 1.4, MM(0x4a3a2e), .04), 0, 1.15, 0, desk); add(box(3.2, 1.1, .1, MM(0x3a2e24)), 0, .58, -.6, desk); [[-1.55, 0], [1.55, 0]].forEach(([x]) => add(box(.12, 1.1, 1.3, MM(0x3a2e24)), x, .58, 0, desk));
let plateTxt = 'CEO'; const plateTex = canvasTex(512, 128, (x, w, h) => {}); function paintPlate(s) { const c = plateTex.image, x = c.getContext('2d'); x.fillStyle = '#d9b14a'; x.fillRect(0, 0, 512, 128); x.fillStyle = '#1f2430'; x.font = '64px Jua'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(s, 256, 68); plateTex.needsUpdate = true; } paintPlate('CEO');
const plate = group(0, 1.21, .45, desk); add(box(1.2, .3, .08, MM(0xb08a30)), 0, .15, 0, plate).rotation.x = -.25; add(mesh(new THREE.PlaneGeometry(1.12, .26), NO_OL(new THREE.MeshBasicMaterial({ map: plateTex, toneMapped: false }))), 0, .155, .045, plate).rotation.x = -.25;
const chair = group(0, 0, -1.3, stage); const LEA = MM(0x45454f); add(cyl(.06, .06, .5, MM(0x8a8f99)), 0, .5, 0, chair); for (let i = 0; i < 5; i++) { const a = i * Math.PI * 2 / 5; const l = add(box(.6, .06, .1, MM(0x8a8f99)), Math.cos(a) * .3, .2, Math.sin(a) * .3, chair); l.rotation.y = -a; }
add(box(1.0, .18, .95, LEA, .08), 0, .8, 0, chair); add(box(1.0, 1.5, .18, LEA, .09), 0, 1.65, -.45, chair); add(box(.9, .3, .15, LEA, .07), 0, 2.45, -.45, chair); [-1, 1].forEach(s => add(box(.1, .08, .7, LEA, .03), s * .55, 1.12, 0, chair));
const jacket = group(0, 0, 0, chair); const JK = MM(0x202024); add(box(1.12, 1.15, .34, JK, .1), 0, 1.75, -.48, jacket); add(box(.3, .35, .22, JK, .06), -.4, 2.35, -.36, jacket).rotation.z = .4; add(box(.3, .35, .22, JK, .06), .4, 2.35, -.36, jacket).rotation.z = -.4; [-1, 1].forEach(s => add(box(.22, 1.0, .22, JK, .08), s * .62, 1.45, -.3, jacket).rotation.z = s * .12);
const cone = add(mesh(new THREE.ConeGeometry(2.6, 9, 32, 1, true), NO_OL(new THREE.MeshBasicMaterial({ color: 0xfff2c8, transparent: true, opacity: .07, side: THREE.DoubleSide, depthWrite: false }))), 0, 4.6, -.6, stage);
// ---------- layered stack ----------
const stk = group(100, 0, 0);
add(mesh(new THREE.PlaneGeometry(60, 60), MM(0x1a1d26)), 0, 0, 0, stk).rotation.x = -Math.PI / 2;
const L1 = group(0, 0, 0, stk); add(box(4.4, .3, 3, MM(0x2a6a3a), .05), 0, 0, 0, L1); add(box(1.4, .22, 1.4, MM(0x2a2d33), .04), 0, .25, 0, L1); add(box(1.0, .06, 1.0, MM(0xc8ccd2)), 0, .38, 0, L1); for (let i = 0; i < 8; i++) add(box(.08, .2, .3, MM(0xd9b14a)), -1.9 + i * .1, .2, 1.3, L1); [[-1.5, -.8], [1.5, -.8], [-1.5, .8], [1.5, .8]].forEach(([x, z]) => add(box(.5, .3, .5, MM(0x3a3f4a), .03), x, .2, z, L1));
const cudaTex = canvasTex(512, 384, (x, w, h) => { x.fillStyle = 'rgba(30,90,200,.0)'; x.clearRect(0, 0, w, h); x.fillStyle = '#9fd8ff'; x.font = '26px monospace'; ['__global__ void k(float* a){', '  int i = blockIdx.x*blockDim.x', '       + threadIdx.x;', '  a[i] = a[i] * 2.0f;', '}', 'k<<<4096,256>>>(d_a);'].forEach((s, i) => x.fillText(s, 20, 50 + i * 54)); });
const L2 = group(0, 0, 0, stk); const GLS = NO_OL(new THREE.MeshPhysicalMaterial({ color: 0x3d8fd6, transparent: true, opacity: .45, roughness: .1, clearcoat: 1, depthWrite: false })); add(box(4.4, .22, 3, GLS), 0, 0, 0, L2); add(mesh(new THREE.PlaneGeometry(4.0, 2.7), NO_OL(new THREE.MeshBasicMaterial({ map: cudaTex, transparent: true, toneMapped: false, depthWrite: false }))), 0, .12, 0, L2).rotation.x = -Math.PI / 2;
const L3 = group(0, 0, 0, stk); add(box(4.4, .12, 3, NO_OL(new THREE.MeshPhysicalMaterial({ color: 0x76b900, transparent: true, opacity: .35, depthWrite: false }))), 0, 0, 0, L3);
const DEVS = []; for (let i = 0; i < 24; i++) { const a = (i % 6), b = Math.floor(i / 6); const n = group(-1.8 + a * .72, .1, -1.1 + b * .73, L3); add(mesh(new THREE.SphereGeometry(.14, 10, 8), MM([0x76b900, 0xffd23a, 0x3d8fd6, 0xe8463a][i % 4])), 0, .14, 0, n); add(cyl(.12, .16, .2, MM([0x76b900, 0xffd23a, 0x3d8fd6, 0xe8463a][i % 4]), 10), 0, -.03, 0, n); DEVS.push(n); }
const effect = new OutlineEffect(R, { defaultThickness: .004, defaultColor: [.06, .06, .08] });
const MODE = t => t < C.jh ? 'ticker' : t < S.crash.start ? 'stage' : t < S.doom.start ? 'chart' : t < S.twist.start ? 'news' : t < S.close.start ? 'typo' : t < S.why.start ? 'chart' : t < S.street.start ? 'stack' : t < S.contra.start ? 'quote' : t < S.now.start ? 'target' : t < S.outro.start ? 'stage' : 'stackEnd';
function state(t) { const md = MODE(t); stage.visible = md == 'stage'; stk.visible = md == 'stack' || md == 'stackEnd';
  spot.intensity = md == 'stage' ? (t > C.quit && t < S.crash.start ? lerp(80, 25, pr(t, C.quit, C.quit + .8)) : 80) : 0; hemi.intensity = md == 'stage' ? 1.5 : 1.5; key.intensity = md == 'stage' ? 1.0 : 2.0;
  jacket.visible = t < C.quit + .3 || t > S.now.start; chair.rotation.y = t > C.quit && t < S.crash.start ? Math.sin((t - C.quit) * 1.5) * .25 * Math.exp(-(t - C.quit) * .6) : 0;
  const pt = t > C.temp ? '임시 CEO' : 'CEO'; if (pt != plateTxt) { plateTxt = pt; paintPlate(pt); }
  jacket.visible = t < C.quit + .3; if (t > S.now.start) jacket.visible = false;
  const g = md == 'stackEnd' ? 1 : 0; const u1 = g || E.back(pr(t, C.sell, C.sell + .6)), u2 = g || E.back(pr(t, C.cuda, C.cuda + .6)), u3 = g || E.back(pr(t, C.eco0 + .2, C.eco0 + .8));
  L1.position.y = lerp(-2, .3, u1); L1.visible = u1 > .01 || g; L2.position.y = lerp(4, 1.25, u2); L2.visible = u2 > .01; L3.position.y = lerp(5, 2.1, u3); L3.visible = u3 > .01;
  DEVS.forEach((n, i) => { const a = g || pr(t, C.eco + i * .04, C.eco + .3 + i * .04); n.scale.setScalar(Math.max(.001, E.back(cl(a)))); n.position.y = .1 + Math.abs(Math.sin(t * 3 + i)) * .08; });
  stk.rotation.y = 0; L1.rotation.y = L2.rotation.y = L3.rotation.y = (t - S.why.start) * .12;
  return { md }; }
const KEYS = () => [
  [C.jh, [0, 5.5, 13], [0, 1.6, -1.2], 40], [C.priv, [1.5, 4.8, 11], [0, 1.7, -1.2], 38], [C.quit, [.8, 4.6, 10], [0, 1.6, -1.2], 38], [S.crash.start - .01, [0, 5.5, 12], [0, 1.5, -1.2], 42],
  [S.why.start, [109, 8.5, 12.5], [100, 1.0, 0], 40], [C.eco, [108, 8.0, 11.5], [100, 1.3, 0], 40], [S.street.start - .01, [107.5, 7.5, 11], [100, 1.3, 0], 40],
  [S.now.start, [-3, 5, 11], [0, 1.6, -.6], 40], [C.temp, [-1.2, 3.8, 7.5], [0, 1.3, 0], 36], [S.outro.start - .01, [-1, 3.6, 7], [0, 1.3, 0], 36],
  [S.outro.start, [105, 9.5, 13], [100, 1.0, 0], 40], [99, [109, 8, 11.5], [100, 1.2, 0], 40]].sort((a, b) => a[0] - b[0]);
function camAt(t) { const K = KEYS(); let i = 0; while (i < K.length - 2 && K[i + 1][0] <= t) i++; const [t0, P0, T0, f0] = K[i], [t1, P1, T1, f1] = K[i + 1]; const p = Math.abs(P1[0] - P0[0]) > 50 ? 0 : E.io(pr(t, t0, t1));
  const P = P0.map((v, k) => lerp(v, P1[k], p)), T = T0.map((v, k) => lerp(v, T1[k], p)); cam.fov = lerp(f0, f1, p); cam.updateProjectionMatrix(); cam.position.set(...P); cam.lookAt(...T); }
function render3() { R.setClearColor(scene.background, 1); effect.render(scene, cam); ctx.drawImage(glc, 0, 0); }
