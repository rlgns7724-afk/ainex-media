function wp(g, x, y, z) { const v = new THREE.Vector3(x, y, z); g.localToWorld(v); return [v.x, v.y, v.z]; }
const RED = '#e8463a', NAVY = '#141a2e', INKC = '#1f2430', ORGC = '#ff7a2a', SKY = '#4aa3e8', GOLDC = '#e0ad45';
function slam(text, x, y, size, col, t, t0, stroke = '#000') { if (t < t0) return; const p = pr(t, t0, t0 + .22); const k = 1 + 1.4 * (1 - E.out(p)); const sh = p < 1 ? 0 : Math.max(0, 1 - (t - t0 - .22) * 5) * 8 * Math.sin(t * 90);
  ctx.save(); ctx.translate(x + sh, y); ctx.scale(k, k); txt(text, 0, 0, size, col, stroke, size * .12, 'center', cl(p * 2)); ctx.restore(); }
function bg(col, gridc, t) { ctx.fillStyle = col; ctx.fillRect(0, 0, W, H); ctx.strokeStyle = gridc; ctx.lineWidth = 2; for (let x = 0; x <= W; x += 60) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); } for (let y = (t * 30) % 60; y <= H; y += 60) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); } }
function panel(x, y, w, h, a, bgc = 'rgba(255,255,255,.96)') { if (a <= 0) return false; const k = E.back(cl(a)); ctx.save(); ctx.translate(x, y); ctx.scale(k, k); ctx.fillStyle = 'rgba(0,0,0,.3)'; ctx.beginPath(); ctx.roundRect(-w / 2 + 10, -h / 2 + 14, w, h, 30); ctx.fill(); ctx.fillStyle = bgc; ctx.beginPath(); ctx.roundRect(-w / 2, -h / 2, w, h, 30); ctx.fill(); ctx.lineWidth = 7; ctx.strokeStyle = INKC; ctx.stroke(); return true; }
function arrow(x0, y0, x1, y1, a, col = YEL, w = 14) { if (a <= 0) return; const p = E.out(cl(a)); const x = lerp(x0, x1, p), y = lerp(y0, y1, p), an = Math.atan2(y1 - y0, x1 - x0); ctx.save(); ctx.strokeStyle = '#000'; ctx.lineWidth = w + 8; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x, y); ctx.stroke(); ctx.strokeStyle = col; ctx.lineWidth = w; ctx.stroke(); ctx.translate(x, y); ctx.rotate(an); ctx.fillStyle = col; ctx.strokeStyle = '#000'; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(w * 2.2, 0); ctx.lineTo(-w, -w * 1.8); ctx.lineTo(-w, w * 1.8); ctx.closePath(); ctx.fill(); ctx.stroke(); ctx.restore(); }
// ---------- silhouettes ----------
const BODY = (() => { const R = []; for (let k = 0; k <= 10; k++) { const a = -Math.PI / 2 + k / 10 * (Math.PI / 2 + 1.13); R.push([Math.cos(a) * 70, -330 + Math.sin(a) * 70]); }
  R.push([32, -250], [130, -222], [168, -150], [190, 30], [200, 70], [172, 82], [142, -40], [118, -110], [112, 40], [106, 95], [100, 330], [120, 365], [36, 365], [26, 130], [0, 112]);
  const Lf = R.slice(1, -1).reverse().map(([x, y]) => [-x, y]); return [...R, ...Lf]; })();
const CARP = [[-300, 40], [-300, -40], [-250, -60], [-150, -70], [-90, -150], [110, -150], [170, -70], [290, -50], [300, 40], [220, 40], [220, 20], [140, 20], [140, 40], [-140, 40], [-140, 20], [-220, 20], [-220, 40]];
function polyPath(P, s, x, y) { const p = new Path2D(); P.forEach(([a, b], i) => i ? p.lineTo(x + a * s, y + b * s) : p.moveTo(x + a * s, y + b * s)); p.closePath(); return p; }
function skinFlow(p, t, a, col = YEL, w = 16) { if (a <= 0) return; ctx.save(); ctx.globalAlpha = a; ctx.lineJoin = 'round'; ctx.shadowColor = col; ctx.shadowBlur = 30; ctx.strokeStyle = col; ctx.lineWidth = w; ctx.setLineDash([60, 34]); ctx.lineDashOffset = -t * 520; ctx.stroke(p); ctx.shadowBlur = 0; ctx.setLineDash([]); ctx.strokeStyle = 'rgba(255,255,255,.85)'; ctx.lineWidth = 4; ctx.setLineDash([60, 34]); ctx.lineDashOffset = -t * 520; ctx.stroke(p); ctx.restore(); }
function boltZ(x0, y0, x1, y1, seed, w = 14, col = '#fff6b0') { let s = seed; const r = () => { s = (s * 16807) % 2147483647; return s / 2147483647 - .5; }; ctx.save(); ctx.lineJoin = 'round'; ctx.shadowColor = col; ctx.shadowBlur = 40; [[col, w * 2.2], ['#fff', w]].forEach(([c, lw]) => { ctx.strokeStyle = c; ctx.lineWidth = lw; ctx.beginPath(); s = seed; for (let i = 0; i <= 8; i++) { const u = i / 8, k = i == 0 || i == 8 ? 0 : 1; const x = lerp(x0, x1, u) + r() * 90 * k, y = lerp(y0, y1, u); i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); } ctx.stroke(); }); ctx.restore(); }
function personIcon(x, y, s, col, a) { if (a <= 0) return; ctx.save(); ctx.translate(x, y); ctx.scale(s * a, s * a); ctx.fillStyle = col; ctx.strokeStyle = '#000'; ctx.lineWidth = 6; ctx.beginPath(); ctx.arc(0, -48, 22, 0, 7); ctx.fill(); ctx.stroke(); ctx.beginPath(); ctx.roundRect(-30, -20, 60, 72, 22); ctx.fill(); ctx.stroke(); ctx.restore(); }
// ---------- 2D screens ----------
function beliefScreen(t) { bg('#2a1d3a', 'rgba(255,255,255,.05)', t); slam('다들 믿는 것', 540, 430, 90, '#fff', t, C.bel + .05);
  const p = polyPath(BODY, 1.2, 540, 1000); ctx.save(); ctx.globalAlpha = pop(t, C.bel + .2, .5) > 0 ? 1 : 0; ctx.fillStyle = '#d9c6b2'; ctx.fill(p); ctx.lineWidth = 9; ctx.strokeStyle = '#000'; ctx.stroke(p); ctx.restore();
  if (t > C.bel + .9 && t < C.inside) { if (strikeOn(t, C.bel + .9, 2) || t > C.bel + 2.9) { boltZ(520, 180, 540, 520, 77); } slam('맞으면 끝?', 540, 1080, 110, YEL, t, C.bel + 1.2); }
  if (t > C.inside) { const q = E.out(pr(t, C.inside + .2, C.inside + 1.6)); ctx.save(); ctx.lineCap = 'round'; ctx.shadowColor = RED; ctx.shadowBlur = 30; ctx.strokeStyle = RED; ctx.lineWidth = 26; ctx.beginPath(); ctx.moveTo(540, 520); ctx.lineTo(540, lerp(520, 1420, q)); ctx.stroke(); ctx.restore();
    if (q > .99) pill('몸속을 그대로?', 540, 1440, pop(t, C.inside + 1.7), RED, 58, '#fff'); } }
function typoScreen(t) { bg('#2457d6', 'rgba(255,255,255,.08)', t); slam('그런데 말이죠', 540, 960, 150, '#fff', t, S.twist.start + .02); }
function flashScreen(t) { bg(NAVY, 'rgba(56,225,255,.07)', t); const p = polyPath(BODY, 1.2, 540, 1000);
  ctx.fillStyle = '#c9b8a6'; ctx.fill(p); ctx.lineWidth = 9; ctx.strokeStyle = '#000'; ctx.stroke(p);
  if (strikeOn(t, C.skin0 + .2, .7)) boltZ(560, 0, 540, 520, 33);
  if (t < C.skin) { slam('전기는 어디로?', 540, 1450, 96, '#fff', t, C.skin0 + .3); }
  skinFlow(p, t, pr(t, C.skin, C.skin + .4));
  if (t > C.skin && t < C.fo) pill('피부 겉', 860, 560, pop(t, C.skin + .2), YEL, 60);
  if (t > C.fo && t < C.fast) slam('플래시오버', 540, 1450, 120, YEL, t, C.fo + .1);
  if (t > C.fast && t < C.tiny) { const f = 1 - pr(t, C.fast, C.fast + .25); if (f > 0) { ctx.fillStyle = `rgba(255,255,255,${f * .8})`; ctx.fillRect(0, 0, W, H); } slam('순식간!', 540, 1450, 130, YEL, t, C.fast + .1); }
  if (t > C.tiny) { ctx.save(); ctx.strokeStyle = RED; ctx.lineWidth = 5; ctx.setLineDash([14, 14]); ctx.lineDashOffset = -t * 120; ctx.beginPath(); ctx.moveTo(540, 540); ctx.lineTo(540, 1300); ctx.stroke(); ctx.restore();
    if (panel(540, 1520, 820, 250, pop(t, C.tiny + .3))) { const bw = 520; txt('겉', -330, -30, 52, INKC, null); txt('속', -330, 70, 52, INKC, null);
      const g = E.out(pr(t, C.tiny + .5, C.tiny + 1.3)); ctx.fillStyle = YEL; ctx.strokeStyle = '#000'; ctx.lineWidth = 5; ctx.beginPath(); ctx.roundRect(-280, -70, bw * g, 56, 14); ctx.fill(); ctx.stroke(); ctx.fillStyle = RED; ctx.beginPath(); ctx.roundRect(-280, 30, 26 * g, 56, 10); ctx.fill(); ctx.stroke(); txt('아주 조금', -150, 72, 44, RED, null, 0, 'left', pr(t, C.tiny + 1.2, C.tiny + 1.5)); ctx.restore(); } } }
function afterScreen(t) { bg('#efe4cf', 'rgba(120,90,50,.08)', t); slam('후유증', 540, 470, 130, RED, t, C.after + .05, '#000');
  const items = [['청력 손상', -1, -1, -.06], ['두통', 1, -1, .05], ['기억력 저하', -1, 1, .04], ['만성 통증', 1, 1, -.05]];
  items.forEach(([s, dx, dy, rot], i) => { const a = pop(t, C.after + .6 + i * .55, .4); if (a <= 0) return; ctx.save(); ctx.translate(540 + dx * 230, 820 + dy * 160); ctx.rotate(rot); ctx.scale(a, a); ctx.fillStyle = 'rgba(0,0,0,.25)'; ctx.fillRect(-195, -95, 400, 200); ctx.fillStyle = ['#fff4a8', '#ffd1c4', '#cfe8ff', '#d9f2c6'][i]; ctx.fillRect(-205, -105, 400, 200); ctx.strokeStyle = '#000'; ctx.lineWidth = 6; ctx.strokeRect(-205, -105, 400, 200); ctx.fillStyle = 'rgba(255,255,255,.6)'; ctx.fillRect(-60, -122, 120, 34); txt(s, -5, 18, 64, INKC, null); ctx.restore(); }); }
function outroScreen(t) { bg(NAVY, 'rgba(56,225,255,.07)', t); const a1 = pop(t, C.o1, .5);
  const pp = polyPath(BODY, .72, 230, 900), pc = polyPath(CARP, .95, 790, 960);
  if (a1 > 0) { ctx.save(); ctx.globalAlpha = cl(a1); ctx.fillStyle = '#c9b8a6'; ctx.fill(pp); ctx.fillStyle = '#d9443a'; ctx.fill(pc); ctx.lineWidth = 8; ctx.strokeStyle = '#000'; ctx.stroke(pp); ctx.stroke(pc); ctx.fillStyle = '#1f2125'; [[-180, 40], [180, 40]].forEach(([x, y]) => { ctx.beginPath(); ctx.arc(790 + x * .95, 960 + y * .95, 48, 0, 7); ctx.fill(); }); ctx.restore(); }
  const f = pr(t, C.o2, C.o2 + .5); skinFlow(pp, t, f, YEL, 12); skinFlow(pc, t, f, YEL, 12);
  if (t > C.o1 && t < C.o3) slam('사람도 자동차도', 540, 1450, 80, '#fff', t, C.o1 + .1);
  if (t > C.o3 && t < C.o4) slam('안이 아니라', 540, 1450, 96, '#fff', t, C.o3 + .1);
  if (t > C.o4) slam('겉', 540, 1500, 260, YEL, t, C.o4 + .15); }
const MODE = t => t < S.belief.start ? '3d' : t < S.twist.start ? 'belief' : t < S.flash.start ? 'typo' : t < S.ground.start ? 'flash' : t < S.after.start ? '3d' : t < S.outro.start ? 'after' : 'outro';
function overlays(t) {
  if (t < S.belief.start) { if (t > C.n10 - .1) { for (let i = 0; i < 10; i++) { const x = 220 + (i % 5) * 160, y = 560 + Math.floor(i / 5) * 190, a = pop(t, C.n10 + i * .07, .3); const ok = t > C.n10 + 1.2 && i < 9; personIcon(x, y, 1.15, ok ? '#3fbf6a' : i == 9 && t > C.n10 + 1.2 ? '#8a8f96' : '#e8e8e8', a); if (ok) check(x + 34, y - 60, 22, pop(t, C.n10 + 1.2 + i * .05, .25)); }
      if (t > C.how) pill('생존', 540, 440, pop(t, C.how - .9), '#3fbf6a', 60, '#fff'); } }
  if (t >= S.ground.start && t < S.car.start) {
    if (t < C.rare) callout('직접 맞으면?', wp(mDir.g, 0, 2.3, 0), 330, 600, pop(t, C.gq + .3), '#fff', INKC, 54);
    else if (t < C.most) { pill('가장 흔한 위험은 따로', 540, 1440, pop(t, C.rare + .1), '#fff', 56); }
    if (t > C.gc + .4) { callout('땅을 타고 퍼지는 전류', [GX + 2.5, .1, 1.5], 540, 640, pop(t, C.gc + .5), YEL, INKC, 54); }
    if (t > C.near) { mN.forEach((o, i) => { const [x, y] = proj(...wp(o.g, 0, 2.3, 0)); txt('!', x, y - 10, 110, RED, '#000', 10, 'center', pop(t, C.near - .2 + i * .15)); }); pill('근처만 있어도 위험', 540, 1440, pop(t, C.near + .3), RED, 56, '#fff'); } }
  if (t >= S.car.start && t < S.after.start) {
    if (t > C.tire - .1 && t < C.shell) { callout('고무 타이어', wp(CAR, -1.4, .46, 1.2), 330, 640, pop(t, C.tire + .3), '#fff', INKC, 58); if (t > C.no) { const [x, y] = proj(...wp(CAR, -1.4, .46, 1.2)); xMark(x, y, 120, pr(t, C.no, C.no + .3)); } }
    if (t > C.shell + .2 && t < C.open) { const path = [wp(CAR, -.2, 2.38, 0), wp(CAR, 1.3, 2.3, 0), wp(CAR, 1.9, 1.5, .1), wp(CAR, 2.2, .6, .1), wp(CAR, 2.6, .05, .1)], path2 = [wp(CAR, -.2, 2.38, 0), wp(CAR, -1.5, 2.3, 0), wp(CAR, -2.1, 1.5, .1), wp(CAR, -2.25, .6, .1), wp(CAR, -2.7, .05, .1)];
      flow(path, t, YEL, pr(t, C.shell + .2, C.shell + .6), 1.4); flow(path2, t, YEL, pr(t, C.shell + .2, C.shell + .6), 1.4); callout('금속 차체 겉', wp(CAR, 1.3, 2.4, 0), 760, 640, pop(t, C.shell + .6), YEL, INKC, 56); check(540, 1440, 60, pr(t, C.shell + 1.4, C.shell + 1.8)); }
    if (t > C.open) { pill('지붕 없는 오픈카', 540, 640, pop(t, C.open + .1), '#fff', 58); if (t > C.open + .9) { xMark(540, 1440, 90, pr(t, C.open + .9, C.open + 1.2)); } } }
}
function grade() { const g = ctx.createRadialGradient(540, 960, 500, 540, 960, 1250); g.addColorStop(0, 'rgba(20,20,40,0)'); g.addColorStop(1, 'rgba(20,20,40,.3)'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H); }
function chrome(t) { const g = ctx.createLinearGradient(0, 0, 0, 520); g.addColorStop(0, 'rgba(10,15,30,.5)'); g.addColorStop(1, 'rgba(10,15,30,0)'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, 520);
  const ta = t < C.n10 ? 1 - pr(t, C.n10 - .3, C.n10) : pr(t, S.outro.start, S.outro.start + .4);
  if (ta > 0) { txt('알고 보면 다른 과학', 540, 236, 62, '#fff', '#000', 10, 'center', ta); txt('번개 맞고도 사는 이유', 540, 350, 96, YEL, '#000', 12, 'center', ta); }
  const ba = pr(t, C.n10, C.n10 + .3) * (1 - pr(t, S.outro.start - .2, S.outro.start)); if (ba > 0) { ctx.save(); ctx.globalAlpha = ba; ctx.fillStyle = 'rgba(0,0,0,.5)'; ctx.beginPath(); ctx.roundRect(260, 118, 560, 66, 33); ctx.fill(); ctx.restore(); txt('⚡ 번개에 맞으면 살까?', 540, 165, 40, '#fff', null, 0, 'center', ba); }
  const T = [[S.flash.start, S.ground.start, '플래시오버'], [S.ground.start, S.car.start, '진짜 위험은 바닥'], [S.car.start, S.after.start, '자동차는 왜 안전할까'], [S.after.start, S.outro.start, '그래도 조심']];
  T.forEach(([a, b, s]) => { if (t >= a && t < b) pill(s, 540, 300, pop(t, a + .1), '#ffffff', 46); });
  if (t > C.n10) txt('출처: 미국 기상청(NWS), 캐나다 환경기후변화부, 위스콘신대 SSEC, BBC 사이언스 포커스', 540, 1700, 26, '#fff', '#000', 5); }
function flashes(t) { [S.belief.start, S.twist.start, S.flash.start, S.ground.start, S.car.start, S.after.start, S.outro.start].forEach(c => { const f = 1 - pr(t, c, c + .18); if (t >= c && f > 0) { ctx.fillStyle = `rgba(255,255,255,${f * .7})`; ctx.fillRect(0, 0, W, H); } });
  STRIKES().forEach(([, t0]) => { const f = 1 - pr(t, t0, t0 + .3); if (t >= t0 && f > 0 && MODE(t) == '3d') { ctx.fillStyle = `rgba(255,255,240,${f * .55})`; ctx.fillRect(0, 0, W, H); } }); }

function capLine(chars, y, size) { const runs = []; chars.forEach(([ch, k]) => { if (runs.length && runs[runs.length - 1][1] == k) runs[runs.length - 1][0] += ch; else runs.push([ch, k]); });
  let w = 0; runs.forEach(r => { ctx.font = `${r[1] ? size + 8 : size}px Jua`; r.push(ctx.measureText(r[0]).width); w += r[2]; });
  const sc = w > 1010 ? 1010 / w : 1; ctx.save(); ctx.translate(540, y); ctx.scale(sc, sc); let px = -w / 2; runs.forEach(r => { txt(r[0], px, 0, r[1] ? size + 8 : size, r[1] ? YEL : '#fff', '#000', 12, 'left'); px += r[2]; }); ctx.restore(); }
function caption2(t) { const c = CHUNKS.find(c => t >= c.start && t < c.hold); if (!c) return; const s = c.text, chars = []; let i = 0;
  while (i < s.length) { let hit = null; for (const k of KW) if (s.startsWith(k, i) && (!hit || k.length > hit.length)) hit = k; if (hit) { for (const ch of hit) chars.push([ch, true]); i += hit.length; } else { chars.push([s[i], false]); i++; } }
  const SZ = 92; ctx.font = `${SZ}px Jua`; const full = ctx.measureText(s).width;
  if (full <= 940) { capLine(chars, 1255, SZ); return; }
  let best = -1, bd = 1e9; chars.forEach(([ch], j) => { if (ch == ' ') { const d = Math.abs(ctx.measureText(s.slice(0, j)).width - ctx.measureText(s.slice(j + 1)).width); if (d < bd) { bd = d; best = j; } } });
  if (best < 0) { capLine(chars, 1255, SZ); return; }
  capLine(chars.slice(0, best), 1200, SZ); capLine(chars.slice(best + 1), 1310, SZ); }
const capOn = t => !((t >= S.twist.start && t < S.flash.start) || t >= S.outro.start);
function draw(t) { state(t); camAt(t); ctx.clearRect(0, 0, W, H); const md = MODE(t);
  if (md == '3d') render3(); else if (md == 'belief') beliefScreen(t); else if (md == 'typo') typoScreen(t); else if (md == 'flash') flashScreen(t); else if (md == 'after') afterScreen(t); else outroScreen(t);
  grade(); if (md == '3d') overlays(t); chrome(t); flashes(t); if (capOn(t)) caption2(t); }
window.seek = async t => draw(t);
TL = await (await fetch(TLFILE)).json();
S = {}; TL.scenes.forEach(s => S[s.name] = s); C = TL.cues; KW = TL.keywords; CHUNKS = TL.lines.flatMap(l => l.chunks);
draw(+(new URLSearchParams(location.search).get('t') || 0)); window.TOTAL = TL.TOTAL; window.ready = true;
</script></body></html>
