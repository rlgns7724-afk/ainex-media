function wp(g, x, y, z) { const v = new THREE.Vector3(x, y, z); g.localToWorld(v); return [v.x, v.y, v.z]; }
const RED = '#e8463a', NAVY = '#141a2e', INKC = '#1f2430', ORGC = '#ff7a2a';
function slam(text, x, y, size, col, t, t0, stroke = '#000') { if (t < t0) return; const p = pr(t, t0, t0 + .22); const k = 1 + 1.4 * (1 - E.out(p)); const sh = p < 1 ? 0 : Math.max(0, 1 - (t - t0 - .22) * 5) * 8 * Math.sin(t * 90);
  ctx.save(); ctx.translate(x + sh, y); ctx.scale(k, k); txt(text, 0, 0, size, col, stroke, size * .12, 'center', cl(p * 2)); ctx.restore(); }
function bg(col, gridc, t) { ctx.fillStyle = col; ctx.fillRect(0, 0, W, H); ctx.strokeStyle = gridc; ctx.lineWidth = 2; for (let x = 0; x <= W; x += 60) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); } for (let y = (t * 30) % 60; y <= H; y += 60) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); } }
function panel(x, y, w, h, a, bgc = 'rgba(255,255,255,.96)') { if (a <= 0) return false; const k = E.back(cl(a)); ctx.save(); ctx.translate(x, y); ctx.scale(k, k); ctx.fillStyle = 'rgba(0,0,0,.3)'; ctx.beginPath(); ctx.roundRect(-w / 2 + 10, -h / 2 + 14, w, h, 30); ctx.fill(); ctx.fillStyle = bgc; ctx.beginPath(); ctx.roundRect(-w / 2, -h / 2, w, h, 30); ctx.fill(); ctx.lineWidth = 7; ctx.strokeStyle = INKC; ctx.stroke(); return true; }
function arrow(x0, y0, x1, y1, a, col = YEL, w = 14) { if (a <= 0) return; const p = E.out(cl(a)); const x = lerp(x0, x1, p), y = lerp(y0, y1, p), an = Math.atan2(y1 - y0, x1 - x0); ctx.save(); ctx.strokeStyle = '#000'; ctx.lineWidth = w + 8; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x, y); ctx.stroke(); ctx.strokeStyle = col; ctx.lineWidth = w; ctx.stroke(); ctx.translate(x, y); ctx.rotate(an); ctx.fillStyle = col; ctx.strokeStyle = '#000'; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(w * 2.2, 0); ctx.lineTo(-w, -w * 1.8); ctx.lineTo(-w, w * 1.8); ctx.closePath(); ctx.fill(); ctx.stroke(); ctx.restore(); }
// 2D screens
function beliefScreen(t) { bg('#2a1d3a', 'rgba(255,255,255,.05)', t); ctx.save(); ctx.translate(540, 760); const k = E.back(cl(pop(t, C.glue, .4))); ctx.scale(k, k);
  ctx.fillStyle = '#f3dcc6'; ctx.strokeStyle = '#000'; ctx.lineWidth = 10; ctx.beginPath(); ctx.roundRect(-150, -60, 300, 280, 70); ctx.fill(); ctx.stroke(); [-110, -40, 30, 100].forEach((fx, i) => { ctx.beginPath(); ctx.roundRect(fx - 32, -260 + (i % 2) * 30, 64, 230, 32); ctx.fill(); ctx.stroke(); ctx.fillStyle = ORGC; ctx.beginPath(); ctx.arc(fx, -220 + (i % 2) * 30, 26, 0, 7); ctx.fill(); ctx.stroke(); ctx.fillStyle = '#f3dcc6'; });
  ctx.fillStyle = ORGC; ctx.beginPath(); ctx.ellipse(0, 90, 110, 90, 0, 0, 7); ctx.fill(); ctx.stroke(); ctx.restore();
  if (t > C.glue2) { for (let i = 0; i < 5; i++) { const x = 400 + i * 60, d = ((t - C.glue2) * 120 + i * 37) % 160; ctx.fillStyle = ORGC; ctx.strokeStyle = '#000'; ctx.lineWidth = 5; ctx.beginPath(); ctx.ellipse(x, 900 + d, 14, 22, 0, 0, 7); ctx.fill(); ctx.stroke(); } slam('더 끈적하게?', 540, 470, 110, YEL, t, C.glue2 + .1); }
  else slam('접착력?', 540, 470, 120, '#fff', t, C.glue + .2); }
function typoScreen(t) { if (t < S.truth.start) { bg('#2457d6', 'rgba(255,255,255,.08)', t); slam('그런데 말이죠', 540, 960, 150, '#fff', t, S.twist.start + .02); return; }
  bg(NAVY, 'rgba(56,225,255,.07)', t); slam('끈적함', 540, 760, 140, '#9aa3b5', t, S.truth.start + .1); if (t > C.size - .4) xMark(540, 720, 150, pr(t, C.size - .4, C.size - .1)); slam('몸 크기', 540, 1010, 190, YEL, t, C.size + .05); }
function qScreen(t) { bg(NAVY, 'rgba(56,225,255,.07)', t); slam('발바닥을', 540, 760, 130, '#fff', t, C.q + .1); slam('넓히면?', 540, 920, 170, YEL, t, C.q + .7); if (t > C.cam) { if (panel(540, 1440, 640, 130, pop(t, C.cam))) { txt('케임브리지대 연구팀', 0, 20, 62, INKC, null); ctx.restore(); } } }
function outroScreen(t) { bg(NAVY, 'rgba(56,225,255,.07)', t); txt('벽을 타는 비밀은', 540, 760, 80, '#fff', '#000', 10, 'center', pop(t, C.o1)); slam('끈끈한 손이 아니라', 540, 920, 100, '#9aa3b5', t, C.o2); if (t > C.o2 + .5) { const p = E.out(pr(t, C.o2 + .5, C.o2 + .8)); ctx.save(); ctx.strokeStyle = RED; ctx.lineWidth = 14; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(130, 890); ctx.lineTo(130 + 820 * p, 890); ctx.stroke(); ctx.restore(); } slam('작은 몸', 540, 1140, 190, YEL, t, C.o3); }
const MODE = t => t < S.belief.start ? '3d' : t < S.twist.start ? 'belief' : t < S.scale.start ? 'typo' : t < S.study.start ? '3d' : t < C.n225 ? 'q' : t < S.outro.start ? '3d' : 'outro';
function overlays(t) {
  if (t < S.belief.start) { callout('몸무게 80kg', wp(mA.g, 0, 1.0, 0), 800, 880, pop(t, C.kg)); callout('도마뱀붙이 발바닥', wp(mA.g, .4, 1.9, 0), 760, 600, pop(t, C.gecko), ORGC, '#fff'); }
  if (t >= S.scale.start && t < S.study.start) {
    if (t < C.x2) callout('붙는 힘 = 닿는 면적', [29, .05, .9], 330, 1050, pop(t, C.area + .5), ORGC, '#fff');
    if (t > C.weight && t < C.x2) { const [x, y] = proj(29, 1.3, .4); arrow(x, y - 220, x, y - 20, pr(t, C.weight, C.weight + .4), RED); pill('떨어지려는 힘 = 무게(부피)', 540, 560, pop(t, C.weight + .2), '#fff', 50); }
    if (t > C.x2) { pill('몸 ×2', 540, 540, pop(t, C.x2), '#fff', 64); callout('면적 ×4', [32.2, .05, 1.2], 760, 1060, pop(t, C.x2 + 1.2), ORGC, '#fff', 60); callout('무게 ×8', [32.2, 1.6, .2], 800, 720, pop(t, C.x8), RED, '#fff', 72); if (t > C.x8) slam('8 > 4', 300, 760, 120, YEL, t, C.x8 + .4); } }
  if (t >= C.n225 && t < S.human.start) {
    if (t < C.mite) { pill('벽 타는 동물 225종', 540, 560, pop(t, C.n225 + .3), YEL, 60); }
    if (t > C.mite && t < C.big) { callout('진드기', [37.6, .25, -.2], 300, 640, pop(t, C.mite)); callout('도마뱀붙이', wp(gD, 0, .5, 0), 780, 600, pop(t, C.mite + 1.1), '#5f9a62', '#fff'); if (t > C.x200) { if (panel(540, 980, 700, 170, pop(t, C.x200 + .2))) { txt('발바닥 비율', -170, 22, 56, INKC, null); txt('1/200', 180, 30, 100, RED, null); ctx.restore(); } } }
    if (t > C.big) { const [x0, y0] = proj(37.6, 1.0, 1.2), [x1, y1] = proj(44.0, 3.8, 1.2); arrow(x0, y0 - 60, x1, y1 - 60, pr(t, C.big + .3, C.big + 1.3)); pill('덩치 ↑', 300, 600, pop(t, C.big), '#fff', 56); pill('발바닥 비율 ↑', 760, 540, pop(t, C.ratio + .3), ORGC, 56, '#fff'); } }
  if (t >= S.human.start && t < S.limit.start) {
    if (t < C.shoe) { if (t > C.h40) { slam('40%', 260, 720, 150, YEL, t, C.h40 + .3); txt('몸 겉넓이', 260, 800, 50, '#fff', '#000', 8, 'center', pop(t, C.h40 + .3)); } if (t > C.h80) { slam('80%', 830, 720, 150, ORGC, t, C.h80 + .3); txt('앞면', 830, 800, 50, '#fff', '#000', 8, 'center', pop(t, C.h80 + .3)); } }
    else { callout('보통 신발', wp(shoeN, 0, .2, 0), 260, 700, pop(t, C.shoe + .1)); callout('유럽 사이즈 145', wp(shoeG, 0, .6, 0), 760, 560, pop(t, C.shoe + .6), ORGC, '#fff', 54); if (t > C.m1) slam('약 1m', 760, 1060, 130, YEL, t, C.m1 + .2); } }
  if (t >= S.limit.start && t < S.other.start) { callout('도마뱀붙이 = 한계', wp(gF, 0, 0, .5), 720, 520, pop(t, C.lim2), YEL, INKC, 54); if (t > C.lim2 + .9) { const [x, y] = proj(...wp(mF.g, 0, 1, 0)); xMark(x, y - 40, 90, pr(t, C.lim2 + .9, C.lim2 + 1.2)); } }
  if (t >= S.other.start && t < S.outro.start) { if (t < C.claw) { pill('더 큰 동물들의 다른 길', 540, 560, pop(t, S.other.start + .2), '#fff', 54); callout('더 끈적한 발바닥', wp(frog, .9, .05, .5), 760, 760, pop(t, C.frog + .4), ORGC, '#fff'); } else callout('발톱으로 붙잡기', wp(paw, 0, .6, .3), 320, 620, pop(t, C.claw + .3), YEL, INKC, 54); }
}
function grade() { const g = ctx.createRadialGradient(540, 960, 500, 540, 960, 1250); g.addColorStop(0, 'rgba(20,20,40,0)'); g.addColorStop(1, 'rgba(20,20,40,.3)'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H); }
function chrome(t) { const g = ctx.createLinearGradient(0, 0, 0, 520); g.addColorStop(0, 'rgba(10,15,30,.5)'); g.addColorStop(1, 'rgba(10,15,30,0)'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, 520);
  const ta = t < C.kg ? 1 - pr(t, C.kg - .3, C.kg) : pr(t, S.outro.start, S.outro.start + .4);
  if (ta > 0) { txt('알고 보면 다른 과학', 540, 236, 62, '#fff', '#000', 10, 'center', ta); txt('스파이더맨은 왜 벽을 못 탈까', 540, 350, 84, YEL, '#000', 12, 'center', ta); }
  const T = [[S.scale.start, S.study.start, '제곱-세제곱 법칙'], [C.n225, S.human.start, '케임브리지대 연구'], [S.human.start, S.limit.start, '사람이라면?'], [S.limit.start, S.other.start, '벽 타기의 한계'], [S.other.start, S.outro.start, '큰 동물의 해법']];
  T.forEach(([a, b, s]) => { if (t >= a && t < b) pill(s, 540, 300, pop(t, a + .1), '#ffffff', 46); });
  if (t > C.kg) txt('출처: 케임브리지대 Labonte 외, PNAS(2016)', 540, 1700, 28, '#fff', '#000', 5); }
function flashes(t) { [S.belief.start, S.twist.start, S.truth.start, S.scale.start, S.study.start, C.n225, S.human.start, S.limit.start, S.other.start, S.outro.start].forEach(c => { const f = 1 - pr(t, c, c + .18); if (t >= c && f > 0) { ctx.fillStyle = `rgba(255,255,255,${f * .7})`; ctx.fillRect(0, 0, W, H); } }); }
const capOn = t => !((t >= S.twist.start && t < S.scale.start) || t >= S.outro.start);
function draw(t) { state(t); camAt(t); ctx.clearRect(0, 0, W, H); const md = MODE(t);
  if (md == '3d') render3(); else if (md == 'belief') beliefScreen(t); else if (md == 'typo') typoScreen(t); else if (md == 'q') qScreen(t); else outroScreen(t);
  grade(); if (md == '3d') overlays(t); chrome(t); flashes(t); if (capOn(t)) caption(t); }
window.seek = async t => draw(t);
TL = await (await fetch(TLFILE)).json();
S = {}; TL.scenes.forEach(s => S[s.name] = s); C = TL.cues; KW = TL.keywords; CHUNKS = TL.lines.flatMap(l => l.chunks);
draw(+(new URLSearchParams(location.search).get('t') || 0)); window.TOTAL = TL.TOTAL; window.ready = true;
</script></body></html>
