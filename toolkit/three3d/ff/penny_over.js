function wp(g, x, y, z) { const v = new THREE.Vector3(x, y, z); g.localToWorld(v); return [v.x, v.y, v.z]; }
const RED = '#e8463a', NAVY = '#141a2e', INKC = '#1f2430', ORGC = '#ff7a2a', SKY = '#4aa3e8', GOLDC = '#e0ad45';
function slam(text, x, y, size, col, t, t0, stroke = '#000') { if (t < t0) return; const p = pr(t, t0, t0 + .22); const k = 1 + 1.4 * (1 - E.out(p)); const sh = p < 1 ? 0 : Math.max(0, 1 - (t - t0 - .22) * 5) * 8 * Math.sin(t * 90);
  ctx.save(); ctx.translate(x + sh, y); ctx.scale(k, k); txt(text, 0, 0, size, col, stroke, size * .12, 'center', cl(p * 2)); ctx.restore(); }
function bg(col, gridc, t) { ctx.fillStyle = col; ctx.fillRect(0, 0, W, H); ctx.strokeStyle = gridc; ctx.lineWidth = 2; for (let x = 0; x <= W; x += 60) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); } for (let y = (t * 30) % 60; y <= H; y += 60) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); } }
function panel(x, y, w, h, a, bgc = 'rgba(255,255,255,.96)') { if (a <= 0) return false; const k = E.back(cl(a)); ctx.save(); ctx.translate(x, y); ctx.scale(k, k); ctx.fillStyle = 'rgba(0,0,0,.3)'; ctx.beginPath(); ctx.roundRect(-w / 2 + 10, -h / 2 + 14, w, h, 30); ctx.fill(); ctx.fillStyle = bgc; ctx.beginPath(); ctx.roundRect(-w / 2, -h / 2, w, h, 30); ctx.fill(); ctx.lineWidth = 7; ctx.strokeStyle = INKC; ctx.stroke(); return true; }
function arrow(x0, y0, x1, y1, a, col = YEL, w = 14) { if (a <= 0) return; const p = E.out(cl(a)); const x = lerp(x0, x1, p), y = lerp(y0, y1, p), an = Math.atan2(y1 - y0, x1 - x0); ctx.save(); ctx.strokeStyle = '#000'; ctx.lineWidth = w + 8; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x, y); ctx.stroke(); ctx.strokeStyle = col; ctx.lineWidth = w; ctx.stroke(); ctx.translate(x, y); ctx.rotate(an); ctx.fillStyle = col; ctx.strokeStyle = '#000'; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(w * 2.2, 0); ctx.lineTo(-w, -w * 1.8); ctx.lineTo(-w, w * 1.8); ctx.closePath(); ctx.fill(); ctx.stroke(); ctx.restore(); }
function coin2(x, y, r, rot = 0, sq = 1) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(1, sq); ctx.fillStyle = GOLDC; ctx.strokeStyle = '#000'; ctx.lineWidth = 8; ctx.beginPath(); ctx.arc(0, 0, r, 0, 7); ctx.fill(); ctx.stroke(); ctx.lineWidth = 5; ctx.strokeStyle = '#a8741c'; ctx.beginPath(); ctx.arc(0, 0, r * .68, 0, 7); ctx.stroke(); ctx.fillStyle = '#a8741c'; ctx.font = `${r * .8}px Jua`; ctx.textAlign = 'center'; ctx.fillText('1', 0, r * .28); ctx.restore(); }
function drop2(x, y, r, col = SKY) { ctx.save(); ctx.translate(x, y); ctx.fillStyle = col; ctx.strokeStyle = '#000'; ctx.lineWidth = 7; ctx.beginPath(); ctx.moveTo(0, -r * 1.7); ctx.bezierCurveTo(r * .9, -r * .6, r, 0, r, r * .15); ctx.arc(0, r * .15, r, 0, Math.PI); ctx.bezierCurveTo(-r, 0, -r * .9, -r * .6, 0, -r * 1.7); ctx.fill(); ctx.stroke(); ctx.fillStyle = 'rgba(255,255,255,.6)'; ctx.beginPath(); ctx.ellipse(-r * .38, -r * .05, r * .16, r * .3, .3, 0, 7); ctx.fill(); ctx.restore(); }
// gauge (speedometer)
function gauge(cx, cy, R0, v, vmax, a, label) { if (a <= 0) return; ctx.save(); ctx.globalAlpha = cl(a * 2); ctx.translate(cx, cy); const k = E.back(cl(a)); ctx.scale(k, k);
  ctx.fillStyle = '#fbf9f4'; ctx.strokeStyle = '#000'; ctx.lineWidth = 10; ctx.beginPath(); ctx.arc(0, 0, R0, Math.PI, 0); ctx.closePath(); ctx.fill(); ctx.stroke();
  const zones = [[0, .3, '#2f7f7c'], [.3, .65, '#f0c419'], [.65, 1, RED]]; zones.forEach(([a0, a1, c]) => { ctx.strokeStyle = c; ctx.lineWidth = 30; ctx.beginPath(); ctx.arc(0, 0, R0 - 34, Math.PI + a0 * Math.PI, Math.PI + a1 * Math.PI); ctx.stroke(); });
  for (let i = 0; i <= 8; i++) { const an = Math.PI + i / 8 * Math.PI; ctx.strokeStyle = '#000'; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(Math.cos(an) * (R0 - 60), Math.sin(an) * (R0 - 60)); ctx.lineTo(Math.cos(an) * (R0 - 82), Math.sin(an) * (R0 - 82)); ctx.stroke(); if (i % 2 == 0) txt(String(i * vmax / 8), Math.cos(an) * (R0 - 125), Math.sin(an) * (R0 - 125) + 14, 38, INKC, null); }
  const an = Math.PI + cl(v / vmax) * Math.PI; ctx.strokeStyle = '#000'; ctx.lineWidth = 16; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(Math.cos(an) * (R0 - 50), Math.sin(an) * (R0 - 50)); ctx.stroke(); ctx.strokeStyle = RED; ctx.lineWidth = 9; ctx.stroke();
  ctx.fillStyle = '#000'; ctx.beginPath(); ctx.arc(0, 0, 22, 0, 7); ctx.fill(); txt(label, 0, 80, 44, INKC, null); ctx.restore(); }
// 2D screens
function beliefScreen(t) { bg('#2a1d3a', 'rgba(255,255,255,.05)', t);
  if (t < S.vacuum.start) { const sp = 1 + 5 * pr(t, C.fast, C.bullet); const y = 640 + 40 * Math.sin(t * 3);
    for (let i = 0; i < 14; i++) { const x = 300 + (i * 97 % 480), l = 60 + 60 * sp, yy = ((t * 300 * sp + i * 137) % 900) + 300; ctx.strokeStyle = 'rgba(255,255,255,.5)'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(x, yy - l); ctx.lineTo(x, yy); ctx.stroke(); }
    coin2(540, y + 120, 120 * pop(t, C.bel, .4), t * 4 * sp, .35 + .65 * Math.abs(Math.cos(t * 3 * sp)));
    slam('다들 믿는 것', 540, 470, 90, '#fff', t, C.bel + .05);
    if (t > C.fast) slam('점점 빨라진다?', 540, 1040, 100, YEL, t, C.fast + .1);
    if (t > C.bullet) { if (panel(540, 1450, 640, 150, pop(t, C.bullet + .1), RED)) { txt('총알처럼 머리를 뚫는다?', 0, 22, 58, '#fff', null); ctx.restore(); } } return; }
  slam('공기가 없다면?', 540, 470, 100, '#fff', t, C.vac + .05); const v = 335 * E.io(pr(t, C.v335 + .1, C.v335 + 1.6)); gauge(540, 900, 380, v, 400, pop(t, C.vac + .3, .5), '시속 km');
  if (t > C.v335 + .4) slam(`${Math.round(v)}km/h`, 540, 1060, 120, YEL, t, C.v335 + .4); }
function typoScreen(t) { bg('#2457d6', 'rgba(255,255,255,.08)', t); slam('그런데 말이죠', 540, 960, 150, '#fff', t, S.twist.start + .02); }
// terminal velocity graph
function graphScreen(t) { bg(NAVY, 'rgba(56,225,255,.07)', t); const x0 = 150, x1 = 960, y0 = 1080, y1 = 520; const X = m => x0 + (x1 - x0) * m / 381, Y = v => y0 - (y0 - y1) * v / 360;
  txt('낙하 거리별 동전 속도', 540, 470, 64, '#fff', '#000', 8, 'center', pop(t, C.m15));
  ctx.strokeStyle = '#fff'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(x0, y1 - 20); ctx.lineTo(x0, y0); ctx.lineTo(x1 + 20, y0); ctx.stroke(); txt('0', x0 - 30, y0 + 10, 34, '#fff', null); txt('381m', x1, y0 + 50, 36, '#fff', null); txt('km/h', x0 + 10, y1 - 40, 34, '#fff', null, 0, 'left');
  // vacuum curve (dashed)
  const pv = pr(t, C.m15 + .2, C.m15 + 1.6); ctx.save(); ctx.setLineDash([16, 14]); ctx.strokeStyle = 'rgba(255,255,255,.55)'; ctx.lineWidth = 6; ctx.beginPath(); for (let i = 0; i <= 60 * pv; i++) { const m = 381 * i / 60, v = Math.sqrt(2 * 9.8 * m) * 3.6; i ? ctx.lineTo(X(m), Y(v)) : ctx.moveTo(X(m), Y(v)); } ctx.stroke(); ctx.restore(); if (pv >= 1) txt('공기 없을 때 335', X(300), Y(335) - 30, 40, 'rgba(255,255,255,.8)', '#000', 6);
  // real curve
  const pr2 = pr(t, C.m15 + 1.2, C.flat + .8); ctx.strokeStyle = YEL; ctx.lineWidth = 12; ctx.lineCap = 'round'; ctx.beginPath(); for (let i = 0; i <= 120 * pr2; i++) { const m = 381 * i / 120, v = 40 * Math.tanh(m / 7); i ? ctx.lineTo(X(m), Y(v)) : ctx.moveTo(X(m), Y(v)); } ctx.stroke();
  if (t > C.m15 + 1.4) { const xm = X(15); ctx.strokeStyle = ORGC; ctx.lineWidth = 5; ctx.setLineDash([10, 8]); ctx.beginPath(); ctx.moveTo(xm, y0); ctx.lineTo(xm, Y(40) - 120); ctx.stroke(); ctx.setLineDash([]); pill('15m', xm + 40, Y(40) - 150, pop(t, C.m15 + 1.4), ORGC, 50, '#fff'); }
  if (t > C.flat) pill('더 이상 안 빨라짐', 640, Y(40) - 60, pop(t, C.flat + .3), '#fff', 44);
  if (t > C.k40 && t < C.flick) slam('40km/h', 760, 880, 130, YEL, t, C.k40 + .2);
  if (t > C.flick) { if (panel(540, 860, 760, 300, pop(t, C.flick))) { ctx.fillStyle = '#f3dcc6'; ctx.strokeStyle = '#000'; ctx.lineWidth = 8; ctx.beginPath(); ctx.arc(-220, 20, 100, 0, 7); ctx.fill(); ctx.stroke(); ctx.fillStyle = '#000'; [-250, -190].forEach(x => { ctx.beginPath(); ctx.arc(x, 20, 9, 0, 7); ctx.fill(); });
      const fk = Math.sin(t * 10) > 0 ? 0 : 1; ctx.fillStyle = '#f3dcc6'; ctx.beginPath(); ctx.roundRect(-120 + fk * 20, -80, 90, 34, 16); ctx.fill(); ctx.stroke(); txt('툭', 0 + fk * 10, -40, 80, ORGC, '#000', 8); txt('이마에 딱밤 정도', 120, 70, 54, INKC, null); ctx.restore(); }
    if (t > C.soft) pill('그것도 약하게', 540, 1060, pop(t, C.soft + .1), YEL, 54); } }
// force balance
function forceScreen(t) { bg(NAVY, 'rgba(56,225,255,.07)', t);
  if (t < C.same) { slam('더 높이서', 540, 640, 120, '#fff', t, C.hq + .1); slam('떨어뜨리면?', 540, 800, 150, YEL, t, C.hq + .7); return; }
  [[100, '100m'], [200, '200m'], [381, '381m']].forEach(([h, lab], i) => { const a = pop(t, C.same + i * .25); if (a <= 0) return; const x = 210 + i * 330; txt(lab, x, 450, 56, '#fff', '#000', 8, 'center', a); pill('40km/h', x, 530, a, YEL, 48); });
  if (t > C.bal) { const cx = 540, cy = 880; coin2(cx, cy, 90, 0, .45); const up = E.out(pr(t, C.bal + .3, C.stop)); arrow(cx, cy + 60, cx, cy + 250, pop(t, C.bal + .1), RED, 18); txt('무게', cx + 130, cy + 200, 56, RED, '#000', 8, 'left', pop(t, C.bal + .1));
    arrow(cx, cy - 60, cx, cy - 60 - 190 * up, up, SKY, 18); txt('공기가 미는 힘', cx + 70, cy - 170, 56, SKY, '#000', 8, 'left', up);
    if (t > C.stop) { slam('=', 260, cy + 20, 200, YEL, t, C.stop); pill('속도 고정', 540, 1440, pop(t, C.stop + .4), YEL, 60); } } }
// raindrop size vs speed
function dropScreen(t) { bg('#123a5a', 'rgba(255,255,255,.06)', t);
  txt('가장 큰 빗방울', 540, 480, 72, '#fff', '#000', 8, 'center', pop(t, C.big));
  if (t < C.bigger) { const g = E.back(pr(t, C.big + .2, C.big + .8)); drop2(540, 820, 120 * g); if (t > C.m10) { slam('초속 10m', 540, 1080, 130, YEL, t, C.m10 + .1); txt('(시속 약 36km)', 540, 1450, 52, '#fff', '#000', 8, 'center', pop(t, C.m10 + .6)); } return; }
  const gr = 120 + 50 * E.out(pr(t, C.bigger, C.split)), sp = E.out(pr(t, C.split + .3, C.split + 1.2));
  if (sp <= 0) { const wob = Math.sin(t * 20) * .08 * pr(t, C.bigger + .4, C.split); ctx.save(); ctx.translate(540, 820); ctx.scale(1 + wob, 1 - wob); drop2(0, 0, gr); ctx.restore(); slam('더 커지면?', 540, 1080, 110, YEL, t, C.bigger + .1); }
  else { [[-1, -1], [1, -1], [-1, 1], [1, 1], [0, 0]].forEach(([dx, dy], i) => drop2(540 + dx * 220 * sp, 820 + dy * 160 * sp, lerp(gr, i == 4 ? 70 : 60, sp))); for (let k = 0; k < 6; k++) { const an = k / 6 * 6.28; ctx.strokeStyle = 'rgba(255,255,255,.7)'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(540 + Math.cos(an) * 150 * sp, 820 + Math.sin(an) * 150 * sp); ctx.lineTo(540 + Math.cos(an) * 220 * sp, 820 + Math.sin(an) * 220 * sp); ctx.stroke(); } slam('쪼개짐!', 540, 1100, 130, YEL, t, C.split + .4); txt('공기 저항', 540, 520 + 60, 0, '#fff'); } }
function outroScreen(t) { bg(NAVY, 'rgba(56,225,255,.07)', t);
  // umbrella of air
  const u = E.out(pr(t, C.o2, C.o2 + .8)); if (u > 0) { ctx.save(); ctx.globalAlpha = u; ctx.translate(540, 1000); ctx.scale(.85, .85); ctx.fillStyle = 'rgba(74,163,232,.35)'; ctx.strokeStyle = SKY; ctx.lineWidth = 10; ctx.beginPath(); ctx.arc(0, 0, 360, Math.PI, 0); for (let k = 3; k >= 0; k--) ctx.arc(-270 + k * 180, 0, 90, 0, Math.PI, true); ctx.closePath(); ctx.fill(); ctx.stroke(); ctx.strokeStyle = '#fff'; ctx.lineWidth = 12; ctx.beginPath(); ctx.moveTo(0, -360); ctx.lineTo(0, 260); ctx.arc(-40, 260, 40, 0, Math.PI); ctx.stroke(); ctx.restore();
    for (let i = 0; i < 9; i++) { const x = 260 + i * 70, y = 620 + ((t * 200 + i * 90) % 90); drop2(x, y, 16); } }
  txt('매일 우리를 지켜 주는', 540, 540, 76, '#fff', '#000', 10, 'center', pop(t, C.o1)); slam('진짜 우산은', 540, 1080, 100, '#fff', t, C.o2 + .1); slam('공기', 540, 1420, 230, YEL, t, C.o3 + .1); }
const MODE = t => t < S.belief.start ? '3d' : t < S.twist.start ? 'belief' : t < S.study.start ? 'typo' : t < S.terminal.start ? '3d' : t < S.higher.start ? 'graph' : t < S.pen.start ? 'force' : t < C.big ? '3d' : t < S.outro.start ? 'drop' : 'outro';
function overlays(t) {
  if (t < S.belief.start) { if (t > C.esb + .4 && t < C.die - .4) { const [ax, ay] = proj(-4.6, 0, -.2), [bx, by] = proj(-4.6, 27, -.2); ctx.save(); ctx.lineCap = 'round'; [['#000', 14], [YEL, 7]].forEach(([c, w]) => { ctx.strokeStyle = c; ctx.lineWidth = w; ctx.beginPath(); ctx.moveTo(ax, ay); ctx.lineTo(ax, lerp(ay, by, E.out(pr(t, C.esb + .4, C.esb + 1.6)))); ctx.stroke(); }); ctx.restore(); pill('381m', ax - 10, (ay + by) / 2, pop(t, C.esb + 1.4), YEL, 60); }
    if (t > C.drop && t < C.die + 1.2) callout('동전 1개', [coinA.position.x, coinA.position.y, coinA.position.z], 800, 640, pop(t, C.drop + .2), GOLDC, INKC, 52);
    if (t > C.die) { const [x, y] = proj(...wp(mStreet.g, 0, 2.2, 0)); txt('?!', x - 160, y - 40, 120, RED, '#000', 10, 'center', pop(t, C.die + .2)); } }
  if (t >= S.study.start && t < S.terminal.start) { callout('루이스 블룸필드 (버지니아대)', wp(mProf.g, 0, 1.6, 0), 540, 560, pop(t, C.prof + .4), '#fff', INKC, 48);
    if (t > C.tunnel) { callout('풍동', [LX + 1.2, 5.6, 1.1], 860, 760, pop(t, C.tunnel + .3), SKY, '#fff', 54); callout('헬륨 풍선', wp(balloon, 0, .4, .6), 230, 760, pop(t, C.tunnel + .9), RED, '#fff', 50); }
    if (t > C.exp) pill('실제 낙하를 재현', 540, 1440, pop(t, C.exp + .2), YEL, 54); }
  if (t >= S.pen.start && t < S.rain.start) { if (t < C.arrow) { callout('볼펜', wp(pen, 0, 1.2, 0), 780, 560, pop(t, C.pq + .2), '#fff', INKC, 56); if (t > C.diff) pill('동전과는 다르다', 540, 1440, pop(t, C.diff + .1), ORGC, 54, '#fff'); }
    else if (t < C.k300) pill('화살처럼 똑바로', 540, 540, pop(t, C.arrow + .1), '#fff', 56);
    else { slam('300km/h+', 540, 620, 140, RED, t, C.k300 + .05); if (t > C.kill) { if (panel(540, 1440, 600, 130, pop(t, C.kill + .1), RED)) { txt('사람이 죽을 수도', 0, 22, 62, '#fff', null); ctx.restore(); } } } }
  if (t >= S.rain.start && t < C.big) { if (t < C.k700) pill('매일 떨어지는 빗방울', 540, 1440, pop(t, C.rq + .3), SKY, 54, '#fff');
    if (t > C.km2) callout('구름 높이 약 2km', wp(cloud, 2.5, 1.5, 1.5), 760, 560, pop(t, C.km2 + .2), '#fff', INKC, 50);
    if (t > C.k700) { pill('공기가 없다면', 540, 760, pop(t, C.k700 + .1), '#fff', 52); slam('700km/h+', 540, 900, 140, RED, t, C.k700 + 1.2); } }
}
function grade() { const g = ctx.createRadialGradient(540, 960, 500, 540, 960, 1250); g.addColorStop(0, 'rgba(20,20,40,0)'); g.addColorStop(1, 'rgba(20,20,40,.3)'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H); }
function chrome(t) { const g = ctx.createLinearGradient(0, 0, 0, 520); g.addColorStop(0, 'rgba(10,15,30,.5)'); g.addColorStop(1, 'rgba(10,15,30,0)'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, 520);
  const ta = t < C.esb ? 1 - pr(t, C.esb - .3, C.esb) : pr(t, S.outro.start, S.outro.start + .4);
  if (ta > 0) { txt('알고 보면 다른 과학', 540, 236, 62, '#fff', '#000', 10, 'center', ta); txt('동전 하나로 사람이 죽을까', 540, 350, 84, YEL, '#000', 12, 'center', ta); }
  const T = [[S.study.start, S.terminal.start, '실제로 실험해 보니'], [S.terminal.start, S.higher.start, '종단 속도'], [S.higher.start, S.pen.start, '높이와 상관없다'], [S.pen.start, S.rain.start, '볼펜이라면?'], [S.rain.start, S.outro.start, '빗방울이라면?']];
  T.forEach(([a, b, s]) => { if (t >= a && t < b) pill(s, 540, 300, pop(t, a + .1), '#ffffff', 46); });
  if (t > C.esb) txt('출처: 버지니아대 Bloomfield(사이언티픽 아메리칸), NASA GPM, 위스콘신대 SSEC', 540, 1700, 26, '#fff', '#000', 5); }
function flashes(t) { [S.belief.start, S.vacuum.start, S.twist.start, S.study.start, S.terminal.start, S.higher.start, S.pen.start, S.rain.start, C.big, S.outro.start].forEach(c => { const f = 1 - pr(t, c, c + .18); if (t >= c && f > 0) { ctx.fillStyle = `rgba(255,255,255,${f * .7})`; ctx.fillRect(0, 0, W, H); } }); }
const capOn = t => !((t >= S.twist.start && t < S.study.start) || t >= S.outro.start);
function draw(t) { state(t); camAt(t); ctx.clearRect(0, 0, W, H); const md = MODE(t);
  if (md == '3d') render3(); else if (md == 'belief') beliefScreen(t); else if (md == 'typo') typoScreen(t); else if (md == 'graph') graphScreen(t); else if (md == 'force') forceScreen(t); else if (md == 'drop') dropScreen(t); else outroScreen(t);
  grade(); if (md == '3d') overlays(t); chrome(t); flashes(t); if (capOn(t)) caption(t); }
window.seek = async t => draw(t);
TL = await (await fetch(TLFILE)).json();
S = {}; TL.scenes.forEach(s => S[s.name] = s); C = TL.cues; KW = TL.keywords; CHUNKS = TL.lines.flatMap(l => l.chunks);
draw(+(new URLSearchParams(location.search).get('t') || 0)); window.TOTAL = TL.TOTAL; window.ready = true;
</script></body></html>
