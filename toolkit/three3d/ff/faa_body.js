// ================= 미국 하늘이 멈춘 진짜 이유 =================
import { OutlineEffect } from 'three/addons/effects/OutlineEffect.js';
const TLFILE = 'faa_timeline.json';
const grad = (() => { const d = new Uint8Array([95, 175, 255]); const t = new THREE.DataTexture(d, 3, 1, THREE.RedFormat); t.minFilter = t.magFilter = THREE.NearestFilter; t.needsUpdate = true; return t; })();
const MM = (c, o = {}) => new THREE.MeshToonMaterial({ color: c, gradientMap: grad, ...o });
const NO_OL = m => { m.userData.outlineParameters = { visible: false }; return m; };
const hemi = new THREE.HemisphereLight(0xfff4e6, 0x5a6a8a, 1.5); scene.add(hemi);
const sun = new THREE.DirectionalLight(0xfff0d8, 2.4); sun.position.set(-10, 16, 8); sun.castShadow = true; sun.shadow.mapSize.set(2048, 2048); Object.assign(sun.shadow.camera, { left: -16, right: 16, top: 16, bottom: -16, far: 60 }); sun.shadow.bias = -.0008; scene.add(sun);
const SKY = new THREE.Color(0xbfd8ee); scene.background = SKY.clone(); scene.fog = new THREE.Fog(SKY, 30, 90);
// ---------- apron ----------
const apron = group();
const asph = canvasTex(1024, 1024, (x, w, h) => { x.fillStyle = '#7c8088'; x.fillRect(0, 0, w, h); for (let i = 0; i < 3000; i++) { x.fillStyle = `rgba(0,0,0,${Math.random() * .08})`; x.fillRect(Math.random() * w, Math.random() * h, 3, 3); }
  x.fillStyle = '#5d6168'; x.fillRect(0, 420, w, 200); x.fillStyle = '#fff'; for (let i = 0; i < 16; i++) x.fillRect(i * 64 + 10, 514, 36, 10); x.fillStyle = '#f2c230'; x.fillRect(0, 700, w, 6); for (let i = 0; i < 8; i++) x.fillRect(80 + i * 120, 700, 6, 200); }, 1, 1);
add(mesh(new THREE.PlaneGeometry(40, 40), new THREE.MeshToonMaterial({ map: asph, gradientMap: grad })), 0, 0, 0, apron).rotation.x = -Math.PI / 2;
add(mesh(new THREE.PlaneGeometry(120, 120), MM(0x8fb86a)), 0, -.02, 0, apron).rotation.x = -Math.PI / 2;
const term = group(0, 0, -13, apron); add(box(30, 3.2, 4, MM(0xe8e4dc), .1), 0, 1.6, 0, term); add(box(30, 1.2, .1, NO_OL(new THREE.MeshToonMaterial({ color: 0x6aa0d0, gradientMap: grad }))), 0, 2.1, 2.02, term); add(box(31, .3, 4.6, MM(0x9aa3b0)), 0, 3.3, 0, term);
const tower = group(-11, 0, -6, apron); add(cyl(.7, .9, 8, MM(0xe8e4dc), 16), 0, 4, 0, tower); add(cyl(1.7, 1.2, 1.4, MM(0x4a7aa8), 8), 0, 8.6, 0, tower); add(cyl(1.9, 1.9, .3, MM(0x9aa3b0), 8), 0, 9.45, 0, tower); add(cyl(.05, .05, 1.5, MM(0x333333)), 0, 10.3, 0, tower);
const TOWL = MM(0xff3030, { emissive: 0xff2020, emissiveIntensity: 0 }); add(mesh(new THREE.SphereGeometry(.18, 8, 6), TOWL), 0, 11.1, 0, tower);
function plane(col = 0x2a4a8a) { const g = new THREE.Group(); const W = MM(0xf6f6f4), C = MM(col);
  const f = mesh(new THREE.CapsuleGeometry(.42, 3.6, 6, 12), W); f.rotation.x = Math.PI / 2; g.add(f); add(mesh(new THREE.ConeGeometry(.42, 1.0, 12), W), 0, .02, -2.6, g).rotation.x = -Math.PI / 2 - .05;
  add(box(4.6, .08, .9, W, .03), 0, -.05, .1, g); add(box(.07, 1.1, .8, C, .02), 0, .75, -2.4, g); add(box(1.7, .06, .55, W, .02), 0, .2, -2.55, g);
  [-1, 1].forEach(s => { add(cyl(.17, .15, .7, C, 12), s * 1.2, -.3, .3, g).rotation.x = Math.PI / 2; }); add(box(.02, .14, 3.0, NO_OL(MM(0x203050))), .43, .12, .1, g); add(box(.02, .14, 3.0, NO_OL(MM(0x203050))), -.43, .12, .1, g);
  add(box(.9, .04, .2, C), 0, .1, 1.95, g).visible = false; g.traverse(o => { if (o.isMesh) o.castShadow = true; }); return g; }
const PLANES = [];
[[-8, -6.5, 0], [-3.5, -6.5, 0], [1, -6.5, 0], [5.5, -6.5, 0], [10, -6.5, 0], [-13, 3, Math.PI / 2], [13, 4, -Math.PI / 2]].forEach(([x, z, r], i) => { const p = plane([0x2a4a8a, 0xc0392b, 0x2f7f7c, 0xd9a441, 0x6a4a9a, 0x2a4a8a, 0xc0392b][i]); p.position.set(x, .95, z); p.rotation.y = r; apron.add(p); PLANES.push(p); });
const runPlane = plane(0x2a4a8a); runPlane.rotation.y = Math.PI / 2; apron.add(runPlane);
const jets = []; for (let i = 0; i < 3; i++) { const p = plane([0xc0392b, 0x2f7f7c, 0xd9a441][i]); p.scale.setScalar(.6); scene.add(p); jets.push(p); }
// ---------- trench ----------
const tr = group(100, 0, 0);
add(box(14, 3, 5, MM(0x8a5a3a)), 0, 1.5, 0, tr); add(box(14, .3, 5.02, MM(0x6aa04a)), 0, 3.1, 0, tr);
const soilTex = canvasTex(512, 256, (x, w, h) => { x.fillStyle = '#7a4e30'; x.fillRect(0, 0, w, h); for (let i = 0; i < 260; i++) { x.fillStyle = ['#6a4026', '#8c5e3c', '#a07050'][i % 3]; x.beginPath(); x.arc(Math.random() * w, Math.random() * h, 2 + Math.random() * 7, 0, 7); x.fill(); } });
add(mesh(new THREE.PlaneGeometry(14, 3), NO_OL(new THREE.MeshToonMaterial({ map: soilTex, gradientMap: grad }))), 0, 1.5, 2.52, tr);
add(box(13.6, 1.0, .9, MM(0x9aa3b0)), 0, 1.4, 2.2, tr);
const CU = MM(0xd07a3a), FB = NO_OL(new THREE.MeshToonMaterial({ color: 0x38e1ff, gradientMap: grad, emissive: 0x1aa0d0, emissiveIntensity: .8 }));
const copper = group(0, 0, 0, tr); [-.2, 0, .2].forEach((dy, i) => add(cyl(.12, .12, 13.4, CU, 12), 0, 1.4 + dy, 2.5 + (i - 1) * .05, copper).rotation.z = Math.PI / 2);
const fiber = group(0, 0, 0, tr); add(cyl(.1, .1, 13.4, FB, 12), 0, 1.4, 2.55, fiber).rotation.z = Math.PI / 2;
const rack = group(5.2, 3.25, 0, tr); add(box(2.2, 1.4, 1.2, MM(0x3a3f4a), .05), 0, .7, 0, rack);
const ROUT = [0, 1].map(i => { const r = group(0, .35 + i * .6, .62, rack); add(box(1.9, .4, .2, MM(0x23262e), .04), 0, 0, 0, r); const leds = []; for (let k = 0; k < 6; k++) { const m = NO_OL(MM(0x3ad17a, { emissive: 0x3ad17a, emissiveIntensity: .3 })); leds.push(m); add(box(.1, .1, .05, m), -.7 + k * .2, 0, .12, r); } [-1, 1].forEach(s => add(cyl(.03, .03, .7, MM(0x111111)), s * .85, .45, -.3, r).rotation.z = s * .2); return { r, leds }; });
const cab = group(-5.4, 3.25, 0, tr); add(box(1.8, 2.6, 1.4, MM(0xd8cdb0), .06), 0, 1.3, 0, cab); for (let k = 0; k < 4; k++) add(box(1.4, .3, .05, MM(0x9a8f78)), 0, .5 + k * .5, .72, cab); const CABL = NO_OL(MM(0xffd23a, { emissive: 0xffaa00, emissiveIntensity: .6 })); add(box(.15, .15, .05, CABL), .6, 2.3, .74, cab);
// ---------- retro ----------
const rt = group(200, 0, 0);
add(box(6, .2, 3, MM(0xa8784e), .05), 0, 1.6, 0, rt); [[-2.8, -1.3], [2.8, -1.3], [-2.8, 1.3], [2.8, 1.3]].forEach(([x, z]) => add(box(.15, 1.6, .15, MM(0x6a4a2e)), x, .8, z, rt));
add(mesh(new THREE.PlaneGeometry(40, 40), MM(0x6a7488)), 0, 0, 0, rt).rotation.x = -Math.PI / 2; add(box(30, 12, .3, MM(0xb9c2cf)), 0, 6, -4, rt);
const crt = group(-.8, 1.7, -.3, rt); add(box(2.2, 1.9, 2.0, MM(0xd8cdb0), .15), 0, .95, 0, crt);
const scrTex = canvasTex(512, 384, (x, w, h) => { x.fillStyle = '#0d2a12'; x.fillRect(0, 0, w, h); x.fillStyle = '#5aff7a'; x.font = '30px monospace'; ['FAA NAS v1.3', 'LOADING...', 'A:\\> COPY *.DAT', 'INSERT DISK 2', '_'].forEach((s, i) => x.fillText(s, 24, 60 + i * 60)); });
add(mesh(new THREE.PlaneGeometry(1.7, 1.3), NO_OL(new THREE.MeshBasicMaterial({ map: scrTex, toneMapped: false }))), 0, 1.0, 1.01, crt);
const pc = group(1.6, 1.7, -.2, rt); add(box(1.0, 1.9, 1.8, MM(0xd8cdb0), .08), 0, .95, 0, pc); add(box(.7, .08, .05, MM(0x3a3a3a)), 0, 1.45, .91, pc); add(box(.7, .08, .05, MM(0x3a3a3a)), 0, 1.2, .91, pc);
const fl = group(0, 0, 0, rt); add(box(.9, .9, .05, MM(0x2a4aa8), .02), 0, 0, 0, fl); add(box(.5, .26, .06, MM(0xc8ccd2)), 0, .3, 0, fl); add(box(.62, .42, .06, MM(0xf4f1e6)), 0, -.16, 0, fl);
const flLab = canvasTex(256, 128, (x, w, h) => { x.fillStyle = '#f4f1e6'; x.fillRect(0, 0, w, h); x.fillStyle = '#d9443a'; x.fillRect(0, 0, w, 18); x.fillStyle = '#1f2430'; x.font = '34px Jua'; x.fillText('NAS DATA', 30, 80); });
add(mesh(new THREE.PlaneGeometry(.6, .4), NO_OL(new THREE.MeshBasicMaterial({ map: flLab }))), 0, -.16, .035, fl);
// ---------- state ----------
const effect = new OutlineEffect(R, { defaultThickness: .004, defaultColor: [.08, .06, .1] });
const MODE = t => t < C.board ? 'apron' : t < C.s911 ? 'board' : t < S.suspect.start ? 'line' : t < S.twist.start ? 'sus' : t < S.cause.start ? 'typo' : t < S.centers.start ? 'trench' : t < S.worse.start ? 'radar' : t < C.sys ? 'cal' : t < C.noparts ? 'retro' : t < S.budget.start ? 'used' : t < S.outro.start ? 'money' : 'apronEnd';
function state(t) { const md = MODE(t);
  apron.visible = md == 'apron' || md == 'apronEnd'; tr.visible = md == 'trench'; rt.visible = md == 'retro';
  const dusk = md == 'apronEnd'; scene.background = new THREE.Color(md == 'trench' ? 0xcfe3f2 : md == 'retro' ? 0xb9c2cf : dusk ? 0xf2b48a : 0xbfd8ee); scene.fog.color.copy(scene.background);
  hemi.intensity = dusk ? 1.1 : 1.5; sun.color.setHex(dusk ? 0xffb070 : 0xfff0d8);
  // run plane: taxi/takeoff roll until stop
  const tStop = Math.min(t, C.stop), rp = tStop * 2.2; runPlane.position.set(-14 + rp * rp * .9, .95, 1.0); if (md == 'apronEnd') { const q = t - S.outro.start; runPlane.position.set(-10 + q * q * 1.6, .95 + Math.max(0, q - 2.2) * 1.6, 1.0); runPlane.rotation.z = 0; runPlane.rotation.x = 0; runPlane.rotation.y = Math.PI / 2; runPlane.children[0] && (runPlane.rotation.order = 'YXZ'); runPlane.rotation.x = -Math.min(.25, Math.max(0, q - 2.2) * .2); }
  jets.forEach((j, i) => { j.visible = md == 'apronEnd' && t > C.o3 + i * .5; const q = t - C.o3 - i * .5; j.position.set(-20 + q * 9, 6 + i * 2.5 + q * 1.2, -18 - i * 4); j.rotation.set(-.15, Math.PI / 2, 0, 'YXZ'); });
  TOWL.emissiveIntensity = t > C.stop && md == 'apron' && Math.sin(t * 8) > 0 ? 3 : .2;
  // trench
  const sw = E.io(pr(t, C.copper + .6, C.copper + 2.0)); copper.position.set(0, sw * 1.6, sw * -1.2); copper.visible = sw < .99; fiber.position.x = lerp(-14, 0, sw); fiber.visible = t > C.copper + .5;
  ROUT.forEach((r, i) => r.leds.forEach((m, k) => { const hot = t > C.k1000; m.color.setHex(hot ? 0xff4030 : 0x3ad17a); m.emissive.setHex(hot ? 0xff3020 : 0x3ad17a); m.emissiveIntensity = Math.sin(t * (hot ? 40 : 6) + k * 1.7 + i) > 0 ? 2.2 : .2; }));
  const ov = t > C.oldnet ? 1 : 0; cab.position.x = -5.4 + ov * Math.sin(t * 60) * .04; cab.rotation.z = ov * Math.sin(t * 47) * .01; CABL.emissive.setHex(t > C.fail ? 0xff2010 : 0xffaa00); CABL.emissiveIntensity = t > C.fail && Math.sin(t * 12) > 0 ? 3 : .6;
  // floppy
  const fi = E.io(pr(t, C.floppy + .5, C.floppy + 1.6)); fl.position.set(lerp(1.0, 1.6, fi), lerp(3.4, 3.15, fi), lerp(1.6, .7, fi)); fl.rotation.set(lerp(-.4, 0, fi), lerp(.6, Math.PI / 2, fi), 0); fl.scale.setScalar(lerp(1, .78, fi));
  return { md };
}
const KEYS = () => [
  [0, [6, 22, 28], [0, 0, -3], 42], [C.stop, [3, 17, 24], [0, 0, -3], 42], [C.board - .01, [-2, 13, 21], [-1, 1, -4], 44],
  [S.cause.start, [99, 5.2, 11.5], [100, 2.2, 0], 40], [C.copper - .1, [98.5, 3.4, 8.5], [99.5, 1.6, 2.5], 38], [C.routine + .5, [97.5, 3.0, 8.0], [100, 1.7, 2.5], 38], [C.router - .1, [101.5, 4.8, 8.5], [104.5, 4.0, .5], 40], [C.k1000 + .3, [101.0, 5.0, 10.0], [102.5, 3.9, .5], 46], [C.oldnet + .2, [97.5, 5.2, 10.5], [99.5, 3.9, .5], 46], [S.centers.start, [97.2, 5.4, 11.0], [99.5, 3.9, .5], 46],
  [C.sys, [204.5, 4.8, 9.0], [200.3, 2.6, 0], 40], [C.floppy + .3, [203.8, 4.0, 6.6], [201.0, 2.9, .3], 38], [C.noparts, [203.6, 3.9, 6.3], [201.1, 2.9, .3], 38],
  [S.outro.start, [-4, 3.5, 13], [0, 3, -2], 46], [99, [3, 4.5, 14], [2, 3.5, -3], 46]].sort((a, b) => a[0] - b[0]);
function camAt(t) { const K = KEYS(); let i = 0; while (i < K.length - 2 && K[i + 1][0] <= t) i++; const [t0, P0, T0, f0] = K[i], [t1, P1, T1, f1] = K[i + 1]; const p = Math.abs(P1[0] - P0[0]) > 50 ? 0 : E.io(pr(t, t0, t1));
  const P = P0.map((v, k) => lerp(v, P1[k], p)), T = T0.map((v, k) => lerp(v, T1[k], p)); cam.fov = lerp(f0, f1, p); cam.updateProjectionMatrix(); cam.position.set(...P); cam.lookAt(...T); }
function render3() { R.setClearColor(scene.background, 1); effect.render(scene, cam); ctx.drawImage(glc, 0, 0); }
