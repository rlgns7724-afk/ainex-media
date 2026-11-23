function wp(g, x, y, z) { const v = new THREE.Vector3(x, y, z); g.localToWorld(v); return [v.x, v.y, v.z]; }
const ORGC = '#ff5a1f', INKC = '#1f2430', TEALC = '#2f8f8a';
// label tag: white box + black border (reference style), leader line to 3D point
function tag(label, P3, lx, ly, a, hot = false, size = 40) { if (a <= 0) return; const k = E.out(cl(a)); ctx.save(); ctx.globalAlpha = cl(a * 2);
  if (P3) { const [px, py] = proj(...P3); ctx.strokeStyle = INKC; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(lx, ly); ctx.lineTo(lerp(lx, px, k), lerp(ly, py, k)); ctx.stroke(); ctx.fillStyle = INKC; ctx.beginPath(); ctx.arc(px, py, 7 * k, 0, 7); ctx.fill(); }
  ctx.font = `${size}px Jua`; const w = ctx.measureText(label).width + 36, h = size * 1.45; ctx.translate(lx, ly); ctx.scale(E.back(cl(a)), E.back(cl(a)));
  ctx.fillStyle = INKC; ctx.fillRect(-w / 2 + 6, -h / 2 + 6, w, h); ctx.fillStyle = hot ? ORGC : '#fff'; ctx.fillRect(-w / 2, -h / 2, w, h); ctx.lineWidth = 4; ctx.strokeStyle = INKC; ctx.strokeRect(-w / 2, -h / 2, w, h);
  ctx.fillStyle = hot ? '#fff' : INKC; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(label, 0, 3); ctx.restore(); }
function arrow(x0, y0, x1, y1, a, col = ORGC, w = 12) { if (a <= 0) return; const p = E.out(cl(a)); const x = lerp(x0, x1, p), y = lerp(y0, y1, p), an = Math.atan2(y1 - y0, x1 - x0); ctx.save(); ctx.strokeStyle = col; ctx.fillStyle = col; ctx.lineWidth = w; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x - Math.cos(an) * w, y - Math.sin(an) * w); ctx.stroke(); ctx.translate(x, y); ctx.rotate(an); ctx.beginPath(); ctx.moveTo(w * 1.6, 0); ctx.lineTo(-w * 1.2, -w * 1.5); ctx.lineTo(-w * 1.2, w * 1.5); ctx.fill(); ctx.restore(); }
// caption: small, left-aligned, dark ink, keywords in orange (reference style)
function capL(t) { const c = CHUNKS.find(c => t >= c.start && t < c.hold); if (!c) return; const dark = t >= S.twist.start && t < S.truth.start; const s = c.text, runs = []; let i = 0;
  while (i < s.length) { let hit = null; for (const k of KW) if (s.startsWith(k, i) && (!hit || k.length > hit.length)) hit = k; if (hit) { runs.push([hit, true]); i += hit.length; } else { if (runs.length && !runs[runs.length - 1][1]) runs[runs.length - 1][0] += s[i]; else runs.push([s[i], false]); i++; } }
  const size = 64; ctx.font = `${size}px Jua`; const lines = [[]]; let lw = 0; const maxW = 900;
  runs.forEach(([txt0, hot]) => { txt0.split(/(?<= )/).forEach(piece => { const w = ctx.measureText(piece).width; if (lw + w > maxW && lines[lines.length - 1].length) { lines.push([]); lw = 0; } lines[lines.length - 1].push([piece, hot, w]); lw += w; }); });
  const y0 = 1380 - (lines.length - 1) * 40; const ap = pr(t, c.start, c.start + .12);
  lines.forEach((ln, j) => { let x = 80; ln.forEach(([p, hot, w]) => { ctx.save(); ctx.globalAlpha = ap; ctx.font = `${size}px Jua`; ctx.textAlign = 'left'; ctx.lineJoin = 'round'; ctx.lineWidth = 12; ctx.strokeStyle = dark ? '#000' : 'rgba(211,214,218,.95)'; ctx.strokeText(p, x, y0 + j * 82); ctx.fillStyle = hot ? ORGC : (dark ? '#fff' : INKC); ctx.fillText(p, x, y0 + j * 82); ctx.restore(); x += w; }); }); }
function chrome(t) {
  const ta = t < C.kg ? 1 - pr(t, C.kg - .3, C.kg) : pr(t, S.outro.start, S.outro.start + .4);
  if (ta > 0) { ctx.save(); ctx.globalAlpha = ta; ctx.fillStyle = 'rgba(211,214,218,.9)'; ctx.fillRect(0, 150, W, 290); ctx.restore(); txt('알고 보면 다른 과학', 540, 236, 52, INKC, null, 0, 'center', ta); txt('스파이더맨은 왜 벽을 못 탈까', 540, 345, 86, INKC, null, 0, 'center', ta); ctx.save(); ctx.globalAlpha = ta; ctx.fillStyle = ORGC; ctx.fillRect(170, 378, 740 * E.out(ta), 12); ctx.restore(); }
  if (t > C.kg) txt('출처: 케임브리지대 Labonte 외, PNAS(2016)', 540, 1700, 28, '#5a6068', null); }
function twistCard(t) { const a = pop(t, S.twist.start, .3); if (a <= 0) return; ctx.save(); ctx.fillStyle = `rgba(20,22,26,${.92 * cl(a)})`; ctx.fillRect(0, 0, W, H); ctx.translate(540, 900); ctx.rotate(-.04); ctx.scale(E.back(cl(a)), E.back(cl(a)));
  ctx.fillStyle = '#121418'; ctx.fillRect(-380, -170, 760, 340); txt('그런데 말이죠,', -320, -40, 64, '#c8ccd2', null, 0, 'left'); txt('진짜 문제는', -320, 70, 110, '#fff', null, 0, 'left'); ctx.fillStyle = ORGC; ctx.fillRect(-320, 105, 560 * pr(t, S.twist.start + .3, S.twist.start + .8), 12); ctx.restore(); }
function overlays(t) {
  if (t < S.belief.start) { tag('80kg', wp(mA.g, 0, 1.0, 0), 830, 860, pop(t, C.kg)); tag('도마뱀붙이 발바닥', wp(mA.arms[1], 0, -.56, 0), 760, 1040, pop(t, C.gecko), true); }
  if (t >= S.belief.start && t < S.twist.start) { tag('접착력?', wp(padB.parent || scene, 12, .2, 0), 300, 720, pop(t, C.glue + .6)); tag('더 끈적하게', [14.2, 1.6, .6], 760, 560, pop(t, C.glue2 + .2), true); }
  if (t >= S.twist.start && t < S.truth.start) twistCard(t);
  if (t >= S.truth.start && t < S.scale.start) { tag('작은 몸', wp(mS.g, 0, 2.3, 0), 330, 640, pop(t, C.size)); tag('큰 몸', wp(mB.g, 0, 2.3, 0), 720, 560, pop(t, C.size + .25), true); }
  if (t >= S.scale.start && t < S.study.start) {
    tag('붙는 힘 = 닿는 면적', [29, .05, .9], 300, 1080, pop(t, C.area + .5) * (1 - pr(t, C.x2 - .3, C.x2)), true);
    if (t > C.weight && t < C.x2) { const [x, y] = proj(29, 1.3, .4); arrow(x, y - 160, x, y + 40, pr(t, C.weight, C.weight + .4), INKC, 14); tag('떨어지려는 힘 = 무게(부피)', null, 540, 600, pop(t, C.weight + .2)); }
    if (t > C.x2) { tag('몸 ×2', [30.6, 2.4, .3], 540, 560, pop(t, C.x2)); tag('면적 ×4', [32.2, .05, 1.2], 780, 1080, pop(t, C.x2 + 1.2), true); tag('무게 ×8', [32.2, 1.6, .2], 830, 760, pop(t, C.x8), false, 46); } }
  if (t >= S.study.start && t < S.human.start) {
    if (t < C.n225) { const a = pop(t, C.q + .1); if (a > 0) { ctx.save(); ctx.translate(540, 720); ctx.scale(E.back(cl(a)), E.back(cl(a))); ctx.fillStyle = INKC; ctx.fillRect(-330, -80, 660, 160); txt('발바닥을 넓히면?', 0, 22, 72, '#fff', null); ctx.restore(); } tag('케임브리지대 연구팀', null, 540, 900, pop(t, C.cam)); }
    if (t > C.n225 && t < C.mite) tag('벽 타는 동물 225종', [40, .2, -2.2], 540, 560, pop(t, C.n225 + .3), true);
    if (t > C.mite && t < C.big) { tag('진드기', [37.6, .25, -.2], 330, 700, pop(t, C.mite)); tag('도마뱀붙이', wp(gD, 0, .5, 0), 760, 640, pop(t, C.mite + 1.1)); if (t > C.x200) tag('발바닥 면적 비율 1/200', null, 540, 860, pop(t, C.x200 + .3), true); }
    if (t > C.big) { const [x0, y0] = proj(37.6, 1.0, 1.2), [x1, y1] = proj(44.0, 3.8, 1.2); arrow(x0, y0 - 60, x1, y1 - 60, pr(t, C.big + .3, C.big + 1.3)); tag('덩치 ↑', null, 300, 620, pop(t, C.big)); tag('발바닥 비율 ↑', null, 760, 560, pop(t, C.ratio + .3), true); } }
  if (t >= S.human.start && t < S.limit.start) {
    if (t < C.shoe) { tag('몸 겉넓이 40%', wp(mE.g, -.4, 1.2, .4), 280, 640, pop(t, C.h40 + .2)); tag('앞면 80%', wp(mE.g, .2, 1.0, .5), 800, 760, pop(t, C.h80 + .3), true); }
    else { tag('보통 신발', wp(shoeN, 0, .2, 0), 270, 700, pop(t, C.shoe + .1)); tag('유럽 145', wp(shoeG, 0, .6, 0), 780, 600, pop(t, C.shoe + .6), true); if (t > C.m1) { const [x0, y0] = proj(...wp(shoeG, .7, .05, -1.45)), [x1, y1] = proj(...wp(shoeG, .7, .05, 1.45)); ctx.save(); ctx.strokeStyle = INKC; ctx.lineWidth = 6; const p = pr(t, C.m1, C.m1 + .5); ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(lerp(x0, x1, p), lerp(y0, y1, p)); ctx.stroke(); ctx.restore(); tag('약 1m', null, (x0 + x1) / 2 + 120, (y0 + y1) / 2 + 40, pop(t, C.m1 + .4)); } } }
  if (t >= S.limit.start && t < S.other.start) { tag('도마뱀붙이 = 한계', wp(gF, 0, 0, .5), 720, 520, pop(t, C.lim2), true); if (t > C.lim2 + .9) { const [x, y] = proj(...wp(mF.g, 0, 1, 0)); xMark(x, y - 40, 70, pr(t, C.lim2 + .9, C.lim2 + 1.2)); } }
  if (t >= S.other.start && t < S.outro.start) { if (t < C.claw) { tag('다른 길', null, 540, 560, pop(t, S.other.start + .2)); tag('더 끈적한 발바닥', wp(frog, .9, .05, .5), 760, 760, pop(t, C.frog + .4), true); } else tag('발톱으로 붙잡기', wp(paw, 0, .6, .3), 330, 620, pop(t, C.claw + .3), true); }
  if (t >= S.outro.start) { ctx.save(); ctx.fillStyle = `rgba(211,214,218,${.55 * pr(t, C.o2 - .3, C.o2)})`; ctx.fillRect(0, 700, W, 560); ctx.restore(); tag('지금 크기라면 쉽게 오른다', wp(mH.g, 0, 1, 0), 360, 1150, pop(t, S.outro.start + 1.0) * (1 - pr(t, C.o2 - .3, C.o2)));
    if (t > C.o2) { txt('끈끈한 손', 540, 850, 96, '#8a9098', null); const p = E.out(pr(t, C.o2 + .4, C.o2 + .8)); ctx.save(); ctx.strokeStyle = ORGC; ctx.lineWidth = 12; ctx.beginPath(); ctx.moveTo(330, 820); ctx.lineTo(330 + 420 * p, 820); ctx.stroke(); ctx.restore(); }
    if (t > C.o3) { const k = 1 + .6 * (1 - E.out(pr(t, C.o3, C.o3 + .25))); ctx.save(); ctx.translate(540, 1030); ctx.scale(k, k); txt('작은 몸', 0, 0, 150, ORGC, INKC, 8); ctx.restore(); } }
}
function flashes(t) { [S.truth.start, S.study.start, S.human.start, S.limit.start, S.other.start, S.outro.start].forEach(c => { const f = 1 - pr(t, c, c + .15); if (t >= c && f > 0) { ctx.fillStyle = `rgba(255,255,255,${f * .35})`; ctx.fillRect(0, 0, W, H); } }); }
const capOn = t => t < S.outro.start + .1 || t < C.o2;
function draw(t) { state(t); camAt(t); ctx.clearRect(0, 0, W, H); render3(); overlays(t); chrome(t); flashes(t); if (capOn(t)) capL(t); }
window.seek = async t => draw(t);
TL = await (await fetch(TLFILE)).json();
S = {}; TL.scenes.forEach(s => S[s.name] = s); C = TL.cues; KW = TL.keywords; CHUNKS = TL.lines.flatMap(l => l.chunks);
draw(+(new URLSearchParams(location.search).get('t') || 0)); window.TOTAL = TL.TOTAL; window.ready = true;
</script></body></html>
