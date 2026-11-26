// ================= 화성 탐사선 2D 화면 · 오버레이 =================
const RED = '#e8463a', NAVY = '#14203a', INKC = '#1f2430', TEAL = '#2f7f7c', BEIGE = '#efebe4', GRN = '#5ee08a', ORG = '#ff9a3c';
function bg(col = NAVY, gridc = 'rgba(255,255,255,.06)', t = 0) { ctx.fillStyle = col; ctx.fillRect(0, 0, W, H); ctx.strokeStyle = gridc; ctx.lineWidth = 2; for (let x = 0; x <= W; x += 60) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); } for (let y = (t * 30) % 60; y <= H; y += 60) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); } }
function slam(text, x, y, size, col, t, t0, stroke = '#000') { if (t < t0) return; const p = pr(t, t0, t0 + .22); const k = 1 + 1.4 * (1 - E.out(p)); const sh = p < 1 ? 0 : Math.max(0, 1 - (t - t0 - .22) * 5) * 8 * Math.sin(t * 90);
  ctx.save(); ctx.translate(x + sh, y); ctx.scale(k, k); txt(text, 0, 0, size, col, stroke, size * .12, 'center', cl(p * 2)); ctx.restore(); }
function stamp(text, x, y, a, col = RED, size = 90) { if (a <= 0) return; const k = 1 + 1.5 * (1 - E.out(cl(a))); ctx.save(); ctx.translate(x, y); ctx.rotate(-.12); ctx.scale(k, k); ctx.globalAlpha = cl(a * 2); ctx.font = `${size}px Jua`; const w = ctx.measureText(text).width + 70; ctx.fillStyle = 'rgba(255,255,255,.92)'; ctx.fillRect(-w / 2, -size * .8, w, size * 1.6); ctx.strokeStyle = col; ctx.lineWidth = 12; ctx.strokeRect(-w / 2, -size * .8, w, size * 1.6); ctx.fillStyle = col; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(text, 0, 4); ctx.restore(); }
function card2(kind, col, body, a, y = 1440) { if (a <= 0) return; ctx.save(); ctx.translate(540, y); const k = E.back(cl(a)); ctx.scale(k, k);
  ctx.font = '44px Jua'; const w = Math.max(560, ctx.measureText(body).width + 220); ctx.fillStyle = 'rgba(0,0,0,.3)'; ctx.beginPath(); ctx.roundRect(-w / 2 + 8, -58, w, 116, 22); ctx.fill();
  ctx.fillStyle = '#fbf9f4'; ctx.beginPath(); ctx.roundRect(-w / 2, -66, w, 116, 22); ctx.fill(); ctx.lineWidth = 6; ctx.strokeStyle = INKC; ctx.stroke();
  ctx.fillStyle = col; ctx.beginPath(); ctx.roundRect(-w / 2, -66, 150, 116, [22, 0, 0, 22]); ctx.fill(); ctx.stroke();
  txt(kind, -w / 2 + 75, 8, 46, '#fff', null); txt(body, 75, 8, 44, INKC, null); ctx.restore(); }
function bubble(text, x, y, a, tailX, tailY) { if (a <= 0) return; ctx.save(); ctx.translate(x, y); const k = E.back(cl(a)); ctx.scale(k, k); ctx.font = '46px Jua'; const w = ctx.measureText(text).width + 70;
  ctx.fillStyle = '#fff'; ctx.strokeStyle = INKC; ctx.lineWidth = 6; ctx.beginPath(); ctx.roundRect(-w / 2, -50, w, 100, 40); ctx.fill(); ctx.stroke(); ctx.beginPath(); ctx.moveTo(-20, 46); ctx.lineTo((tailX - x) / k, (tailY - y) / k); ctx.lineTo(24, 46); ctx.closePath(); ctx.fill(); ctx.stroke(); ctx.fillRect(-18, 40, 40, 10);
  ctx.fillStyle = INKC; ctx.textAlign = 'center'; ctx.fillText(text, 0, 16); ctx.restore(); }
// ---------- lost: retro CRT ----------
function nosigScreen(t) { const t0 = S.lost.start; ctx.fillStyle = '#0d1410'; ctx.fillRect(0, 0, W, H);
  ctx.save(); ctx.fillStyle = '#2a2f2a'; ctx.beginPath(); ctx.roundRect(70, 430, 940, 760, 50); ctx.fill(); ctx.strokeStyle = '#000'; ctx.lineWidth = 8; ctx.stroke();
  ctx.fillStyle = '#062012'; ctx.beginPath(); ctx.roundRect(120, 480, 840, 620, 36); ctx.fill(); ctx.clip();
  ctx.strokeStyle = 'rgba(94,224,138,.12)'; ctx.lineWidth = 2; for (let x = 120; x < 960; x += 60) { ctx.beginPath(); ctx.moveTo(x, 480); ctx.lineTo(x, 1100); ctx.stroke(); } for (let y = 480; y < 1100; y += 60) { ctx.beginPath(); ctx.moveTo(120, y); ctx.lineTo(960, y); ctx.stroke(); }
  const cut = C.lost + .35; ctx.strokeStyle = t < cut + .2 ? GRN : RED; ctx.lineWidth = 8; ctx.shadowColor = ctx.strokeStyle; ctx.shadowBlur = 18; ctx.beginPath();
  for (let x = 120; x <= 960; x += 6) { const tx = t - (960 - x) / 900; const amp = tx < cut ? 120 : 0; const y = 790 + amp * Math.sin(x * .045 - t * 12) * (.6 + .4 * Math.sin(x * .013)); x == 120 ? ctx.moveTo(x, y) : ctx.lineTo(x, y); } ctx.stroke(); ctx.shadowBlur = 0;
  ctx.font = '40px monospace'; ctx.fillStyle = GRN; ctx.fillText('MCO  SIGNAL', 150, 540); ctx.fillText('1999.09.23', 690, 540);
  for (let y = 480; y < 1100; y += 6) { ctx.fillStyle = 'rgba(0,0,0,.18)'; ctx.fillRect(120, y, 840, 2); } ctx.restore();
  if (t > cut + .2) { slam('신호 없음', 540, 1000, 120, RED, t, cut + .2, '#000'); }
  [[300, 1150], [780, 1150]].forEach(([x, y], i) => { ctx.fillStyle = '#4a514a'; ctx.beginPath(); ctx.arc(x, y - 5, 0, 0, 7); ctx.fill(); }); }
// ---------- alt: flat altitude diagram ----------
function altScreen(t) { const t0 = S.alt.start; ctx.fillStyle = '#10142a'; ctx.fillRect(0, 0, W, H);
  for (let i = 0; i < 90; i++) { const x = (i * 137) % W, y = (i * 241) % 1100; ctx.fillStyle = 'rgba(255,255,255,.5)'; ctx.fillRect(x, y, 3, 3); }
  const cx = 540, cy = 2550, R0 = 1350, k = 2.4; const top = r => cy - r;
  const ga = E.out(pr(t, t0, t0 + .5));
  // atmosphere band
  const rg = ctx.createRadialGradient(cx, cy, R0, cx, cy, R0 + 100 * k); rg.addColorStop(0, 'rgba(255,140,80,.75)'); rg.addColorStop(1, 'rgba(255,140,80,0)'); ctx.fillStyle = rg; ctx.beginPath(); ctx.arc(cx, cy, R0 + 100 * k, 0, 7); ctx.fill();
  ctx.fillStyle = '#c4653a'; ctx.beginPath(); ctx.arc(cx, cy, R0, 0, 7); ctx.fill(); ctx.lineWidth = 8; ctx.strokeStyle = INKC; ctx.stroke();
  ctx.fillStyle = 'rgba(120,50,30,.5)'; [[300, 1260, 50], [700, 1300, 70], [520, 1420, 40], [880, 1400, 46]].forEach(([x, y, r]) => { ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.fill(); });
  txt('화성', 540, 1500, 60, '#fff', '#000', 8, 'center', ga); txt('대기', 160, top(R0) - 40, 40, '#ffd0a8', '#000', 6, 'center', ga);
  // planned orbit
  const pa = E.out(pr(t, C.plan + .1, C.plan + 1.0)), rP = R0 + 210 * k; if (pa > 0) { ctx.save(); ctx.setLineDash([24, 16]); ctx.lineDashOffset = -t * 60; ctx.strokeStyle = GRN; ctx.lineWidth = 10; ctx.beginPath(); ctx.arc(cx, cy, rP, -Math.PI / 2 - .45 * pa, -Math.PI / 2 + .45 * pa); ctx.stroke(); ctx.restore(); pill('계획: 200km 넘게', 300, top(rP) - 70, pop(t, C.plan + .5), GRN, 44); check(780, top(rP) - 70, 40, pr(t, C.plan + 1.0, C.plan + 1.3)); }
  // actual
  const aa = E.out(pr(t, C.act + .1, C.act + 1.0)), rA = R0 + 57 * k; if (aa > 0) { ctx.save(); ctx.strokeStyle = RED; ctx.lineWidth = 12; ctx.beginPath(); ctx.arc(cx, cy, rA, -Math.PI / 2 - .45 * aa, -Math.PI / 2 + .45 * aa); ctx.stroke(); ctx.restore(); }
  // ruler
  const rx = 960; ctx.strokeStyle = '#fff'; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(rx, top(R0)); ctx.lineTo(rx, top(rP) - 10); ctx.stroke(); [[0, '0'], [57, '57'], [200, '200']].forEach(([km, l]) => { const y = top(R0 + km * k); ctx.beginPath(); ctx.moveTo(rx - 20, y); ctx.lineTo(rx + 20, y); ctx.stroke(); txt(l, rx - 34, y + 12, 34, '#fff', '#000', 5, 'right'); }); txt('km', rx, top(rP) - 30, 32, '#fff', '#000', 5);
  // orbiter icon on current path
  const onA = t > C.act + .3; const ang = -Math.PI / 2 + Math.sin(t * .8) * .25, rr = onA ? rA : rP; const ox = cx + rr * Math.cos(ang), oy = cy + rr * Math.sin(ang);
  if (pa > .5) { ctx.save(); ctx.translate(ox, oy); ctx.fillStyle = '#d9a441'; ctx.strokeStyle = INKC; ctx.lineWidth = 5; ctx.fillRect(-18, -18, 36, 36); ctx.strokeRect(-18, -18, 36, 36); ctx.fillStyle = '#2f4f9a'; ctx.fillRect(-80, -8, 56, 16); ctx.strokeRect(-80, -8, 56, 16); ctx.fillRect(24, -8, 56, 16); ctx.strokeRect(24, -8, 56, 16); if (onA) { ctx.fillStyle = 'rgba(255,140,40,.6)'; ctx.beginPath(); ctx.arc(10, 0, 40 + Math.sin(t * 30) * 5, 0, 7); ctx.fill(); } ctx.restore(); }
  if (t > C.k57) { slam('57km', 300, top(rA) - 90, 120, RED, t, C.k57 + .1, '#fff'); sizeArrowF(rx - 70, top(rP), top(rA), pr(t, C.k57 + .3, C.k57 + .8)); }
  txt('개념도', 980, 1700 - 80, 30, 'rgba(255,255,255,.6)', null); }
function sizeArrowF(x, y0, y1, a) { if (a <= 0) return; ctx.save(); ctx.lineCap = 'round'; const ye = lerp(y0, y1, E.out(a)); [['#000', 16], [YEL, 8]].forEach(([c, w]) => { ctx.strokeStyle = c; ctx.lineWidth = w; ctx.beginPath(); ctx.moveTo(x, y0); ctx.lineTo(x, ye); ctx.moveTo(x - 22, ye - 26); ctx.lineTo(x, ye); ctx.lineTo(x + 22, ye - 26); ctx.stroke(); }); ctx.restore(); }
// ---------- units: paper collage ----------
function paperCard(x, y, w, h, rot, a, fill = '#fbf6ea') { if (a <= 0) return false; const k = E.back(cl(a)); ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(k, k); ctx.fillStyle = 'rgba(0,0,0,.22)'; ctx.fillRect(-w / 2 + 10, -h / 2 + 12, w, h); ctx.fillStyle = fill; ctx.beginPath(); ctx.moveTo(-w / 2, -h / 2); for (let i = 0; i <= 20; i++) ctx.lineTo(-w / 2 + w * i / 20, -h / 2 + (i % 2 ? 5 : -3)); ctx.lineTo(w / 2, h / 2); ctx.lineTo(-w / 2, h / 2); ctx.closePath(); ctx.fill(); ctx.strokeStyle = 'rgba(31,36,48,.5)'; ctx.lineWidth = 3; ctx.stroke();
  ctx.fillStyle = 'rgba(240,210,120,.75)'; ctx.fillRect(-50, -h / 2 - 18, 100, 34); return true; }
function factory(x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.fillStyle = '#8a9ab0'; ctx.strokeStyle = INKC; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(-90, 60); ctx.lineTo(-90, -10); ctx.lineTo(-40, 20); ctx.lineTo(-40, -10); ctx.lineTo(10, 20); ctx.lineTo(10, -10); ctx.lineTo(60, 20); ctx.lineTo(60, -70); ctx.lineTo(90, -70); ctx.lineTo(90, 60); ctx.closePath(); ctx.fill(); ctx.stroke(); ctx.fillStyle = '#ffe2a8'; [-70, -20, 30].forEach(xx => { ctx.fillRect(xx, 30, 26, 18); ctx.strokeRect(xx, 30, 26, 18); }); ctx.restore(); }
function antenna(x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.fillStyle = '#eeeeea'; ctx.strokeStyle = INKC; ctx.lineWidth = 6; ctx.beginPath(); ctx.ellipse(0, -20, 80, 40, -.5, 0, Math.PI); ctx.closePath(); ctx.fill(); ctx.stroke(); ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(-30, 60); ctx.lineTo(30, 60); ctx.closePath(); ctx.fillStyle = '#8a9ab0'; ctx.fill(); ctx.stroke(); ctx.beginPath(); ctx.moveTo(10, -10); ctx.lineTo(40, -60); ctx.stroke(); ctx.fillStyle = RED; ctx.beginPath(); ctx.arc(40, -60, 10, 0, 7); ctx.fill(); ctx.stroke(); ctx.restore(); }
function unitsScreen(t) { const t0 = S.units.start; ctx.fillStyle = '#e9dcc0'; ctx.fillRect(0, 0, W, H); ctx.fillStyle = 'rgba(160,120,60,.08)'; for (let i = 0; i < 300; i++) ctx.fillRect((i * 97) % W, (i * 173) % H, 4, 4);
  const la = pop(t, C.co + .05, .4), ra = pop(t, C.nasa + .05, .4);
  if (paperCard(285, 640, 430, 400, -.04, la)) { factory(0, -40, 1); txt('탐사선 제작사', 0, 120, 46, INKC, null); ctx.restore(); }
  if (paperCard(800, 660, 430, 400, .04, ra)) { antenna(0, -40, 1); txt('나사 항법팀', 0, 120, 46, INKC, null); ctx.restore(); }
  // number slip
  const sa = pop(t, C.lb + .1, .4); if (sa > 0) { const fly = E.io(pr(t, C.nread + .2, C.nread + 1.1)); const x = lerp(285, 800, fly), y = 960 - Math.sin(fly * Math.PI) * 140, rot = lerp(-.06, .05, fly);
    const isN = fly > .55; ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(sa, sa); ctx.fillStyle = 'rgba(0,0,0,.25)'; ctx.fillRect(-170, -62, 350, 136); ctx.fillStyle = '#fff'; ctx.fillRect(-180, -72, 350, 136); ctx.strokeStyle = INKC; ctx.lineWidth = 5; ctx.strokeRect(-180, -72, 350, 136);
    txt('10', -70, 30, 96, INKC, null); txt(isN ? '뉴턴' : '파운드', 70, 26, 58, isN ? '#2f6fc0' : RED, null); ctx.restore(); }
  if (t > C.nread + 1.1) { const q = pop(t, C.nread + 1.1); txt('?', 960, 900, 130, RED, '#000', 10, 'center', q); }
  card2('문제', RED, '숫자는 그대로, 단위만 바뀜', pop(t, C.nread + 1.3)); }
// ---------- ratio: kinetic typo + bars ----------
function ratioScreen(t) { const t0 = S.ratio.start; bg('#14203a', 'rgba(255,255,255,.05)', t);
  slam('1 파운드', 540, 560, 120, '#fff', t, C.eq + .05); if (t > C.eq + .7) slam('= 4.45 뉴턴', 540, 720, 120, YEL, t, C.eq + .9);
  const ba = pop(t, C.same + .05); if (ba > 0) { const y1 = 900, y2 = 1040, x0 = 130, unit = 175; ctx.save(); ctx.globalAlpha = cl(ba);
    txt('항법팀이 읽은 힘', x0, y1 - 40, 40, '#cfe0f6', '#000', 6, 'left'); const g1 = E.out(pr(t, C.same + .2, C.same + .8)); ctx.fillStyle = '#3d8fd6'; ctx.fillRect(x0, y1 - 18, unit * g1, 56); ctx.strokeStyle = '#000'; ctx.lineWidth = 5; ctx.strokeRect(x0, y1 - 18, unit * g1, 56);
    const g2 = E.out(pr(t, C.x4, C.x4 + 1.2)); txt('실제로 낸 힘', x0, y2 - 40, 40, '#ffd0a8', '#000', 6, 'left'); if (g2 > 0) { ctx.fillStyle = RED; ctx.fillRect(x0, y2 - 18, unit * 4.45 * g2, 56); ctx.strokeRect(x0, y2 - 18, unit * 4.45 * g2, 56); }
    ctx.restore(); }
  if (t > C.x4 + 1.0) slam('4배 넘게!', 540, 1450, 130, YEL, t, C.x4 + 1.0); }
// ---------- overlays on 3D ----------
function overlays(t, md) {
  const hook = t < C.rewind, when = !hook && t < S.lost.start, burn = t >= S.burn.start && t < S.nav.start, drift = t >= S.drift.start && t < S.outro.start, out = t >= S.outro.start;
  if (hook) { slam('4.45', 540, 700, 220, YEL, t, 2.4); pill('천억 원 넘는 화성 탐사선', 540, 1450, pop(t, .4), '#fff', 46); }
  if (when) { if (t < C.behind) { callout('지구', wp(sp, ...EARTH), 300, 1420, pop(t, C.rewind + .3), '#fff'); callout('화성', [0, -6, 8], 760, 560, pop(t, C.rewind + .5), ORG, '#fff'); }
    if (t > C.mco && t < C.behind + .2) callout('마스 클라이밋 오비터', wp(ORB.g, 0, 0, 0), 330, 820, pop(t, C.mco + .1), YEL, INKC, 42);
    if (t > C.trip && t < C.behind) pill('열 달 가까이 비행', 540, 1440, pop(t, C.trip + .1), '#fff', 46);
    if (t > C.behind + .3) { pill('화성 뒤편으로', 540, 1440, pop(t, C.behind + .3), '#fff', 46); } }
  if (burn) { if (t < C.brk) callout('대기권', [1.5, 10.25, 1], 760, 620, pop(t, C.deep + .2), ORG, '#fff'); if (t > C.brk) slam('콰직!', 540, 640, 160, RED, t, C.brk + .05, '#fff'); }
  if (md == 'room') { // calendar
    const ca = pop(t, S.nav.start + .2); if (ca > 0 && t < C.nofind) { const mo = t < C.nav1 + .9 ? '7월' : t < C.odd + .4 ? '8월' : '9월'; ctx.save(); ctx.translate(880, 1000); ctx.scale(ca, ca); ctx.fillStyle = '#fbf9f4'; ctx.strokeStyle = INKC; ctx.lineWidth = 6; ctx.beginPath(); ctx.roundRect(-90, -80, 180, 170, 16); ctx.fill(); ctx.stroke(); ctx.fillStyle = RED; ctx.beginPath(); ctx.roundRect(-90, -80, 180, 56, [16, 16, 0, 0]); ctx.fill(); ctx.stroke(); txt('1999', 0, -38, 34, '#fff', null); txt(mo, 0, 50, 66, INKC, null); ctx.restore(); }
    if (t > C.odd) { const [hx, hy] = proj(...wp(NAV[0].g, 0, 2.6, 0)); bubble('궤도가 이상한데?', 380, 600, pop(t, C.odd + .1), hx, hy - 20); [1, 2, 3].forEach((i, k) => { const [qx, qy] = proj(...wp(NAV[i].g, 0, 2.7, 0)); txt('?', qx, 1070 - Math.abs(Math.sin(t * 4 + k)) * 14, 90, YEL, '#000', 9, 'center', pop(t, C.odd + .4 + k * .2)); }); }
    if (t > C.nofind + .2) stamp('원인 못 찾음', 540, 1450, pr(t, C.nofind + .2, C.nofind + .5), RED, 76); }
  if (drift) { callout('계획한 길', PLAN.getPoint(.18).toArray(), 300, 560, pop(t, S.drift.start + .3), GRN); if (t > C.err) callout('실제로 간 길', ACT.getPoint(.4).toArray(), 760, 1000, pop(t, C.err + .1), RED, '#fff');
    PUFF.forEach((p, i) => { const tt = S.drift.start + .3 + i * .7, q = t - tt; if (q < 0 || q > .6) return; const [x, y] = proj(p.position.x, p.position.y, p.position.z); txt('칙!', x + 70, y - 40, 50, '#fff', '#000', 7, 'center', 1 - q / .6); });
    // error meter
    const ea = pop(t, C.err + .1); if (ea > 0) { const v = E.io(pr(t, C.err, S.outro.start - .5)); ctx.save(); ctx.globalAlpha = cl(ea); ctx.fillStyle = 'rgba(0,0,0,.55)'; ctx.beginPath(); ctx.roundRect(140, 1520, 800, 70, 20); ctx.fill(); ctx.fillStyle = RED; ctx.beginPath(); ctx.roundRect(150, 1530, 780 * (.04 + .96 * v), 50, 14); ctx.fill(); ctx.restore(); txt('오차 누적', 540, 1500, 40, '#fff', '#000', 6, 'center', ea); }
    if (t > C.pull) callout('대기', [-10.6, -1.2, 1], 300, 1020, pop(t, C.pull + .4), ORG, '#fff'); }
  if (out) { ctx.fillStyle = 'rgba(14,10,24,.35)'; ctx.fillRect(0, 520, W, 620); if (t > C.o2) slam('파운드 ≠ 뉴턴', 540, 820, 120, YEL, t, C.o2 + .05); }
}
function grade(t, md) { const g = ctx.createRadialGradient(540, 960, 520, 540, 960, 1250); g.addColorStop(0, 'rgba(40,20,60,0)'); g.addColorStop(1, 'rgba(40,20,60,.38)'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  if (md == 'room') { ctx.fillStyle = 'rgba(160,120,60,.14)'; ctx.fillRect(0, 0, W, H); }
  const burn = t >= S.burn.start && t < S.nav.start; if (burn) { ctx.fillStyle = `rgba(60,10,20,${.18 * pr(t, C.brk, C.brk + 1)})`; ctx.fillRect(0, 0, W, H); } }
const TAGS = () => [[C.rewind, S.lost.start, '1999년 9월 23일'], [S.alt.start, S.burn.start, '화성 궤도 높이'], [S.burn.start, S.nav.start, '그 순간'], [S.nav.start, S.twist.start, '몇 달 전, 나사 항법팀'], [S.units.start, S.ratio.start, '진짜 원인'], [S.ratio.start, S.drift.start, '단위 차이'], [S.drift.start, S.outro.start, '열 달 동안']];
function chrome(t) { const g = ctx.createLinearGradient(0, 0, 0, 520); g.addColorStop(0, 'rgba(5,8,15,.55)'); g.addColorStop(1, 'rgba(5,8,15,0)'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, 520);
  const ta = t < C.rewind ? 1 - pr(t, C.rewind - .3, C.rewind) : pr(t, S.outro.start, S.outro.start + .4);
  if (ta > 0) { txt('알고 보면 다른 사건', 540, 236, 62, '#fff', '#000', 10, 'center', ta); txt('화성 탐사선 실종', 540, 350, 104, YEL, '#000', 12, 'center', ta); }
  TAGS().forEach(([a, b, s]) => { if (t >= a && t < b) pill(s, 540, 300, pop(t, a + .1), '#ffffff', 46); });
  const g2 = ctx.createLinearGradient(0, 1100, 0, 1920); g2.addColorStop(0, 'rgba(10,15,30,0)'); g2.addColorStop(1, 'rgba(10,15,30,.45)'); ctx.fillStyle = g2; ctx.fillRect(0, 1100, W, 820);
  txt('출처: NASA 안전 보고서(2009), IEEE 스펙트럼(1999), 기네스 세계기록', 540, 1700, 28, '#fff', '#000', 5); }
function flashes(t) { const fl = pr(t, C.rewind - .25, C.rewind) * (1 - pr(t, C.rewind, C.rewind + .35)); if (fl > 0) { ctx.fillStyle = `rgba(255,255,255,${fl})`; ctx.fillRect(0, 0, W, H); }
  if (t > C.rewind - .6 && t < C.rewind + .45) txt('◀◀', 540, 900, 160, '#fff', '#000', 12, 'center', pr(t, C.rewind - .6, C.rewind - .3) * (1 - pr(t, C.rewind, C.rewind + .45)));
  [S.lost.start, S.alt.start, S.burn.start, S.nav.start, S.twist.start, S.units.start, S.ratio.start, S.drift.start, S.outro.start].forEach(c => { const f = 1 - pr(t, c, c + .18); if (t >= c && f > 0) { ctx.fillStyle = `rgba(255,255,255,${f * .7})`; ctx.fillRect(0, 0, W, H); } }); }
const capOn = t => !(t >= S.twist.start && t < S.units.start);
function draw(t) { const st = state(t); camAt(t); ctx.clearRect(0, 0, W, H); const md = st.md;
  if (md == 'space' || md == 'room') render3(); else if (md == 'nosig') nosigScreen(t); else if (md == 'alt') altScreen(t); else if (md == 'units') unitsScreen(t); else if (md == 'ratio') ratioScreen(t);
  else if (md == 'typo') { bg('#2457d6', 'rgba(255,255,255,.08)', t); slam('그런데 말이죠', 540, 960, 150, '#fff', t, S.twist.start + .02); }
  grade(t, md); overlays(t, md); chrome(t); flashes(t); if (capOn(t)) caption(t); }
window.seek = async t => draw(t);
TL = await (await fetch(TLFILE)).json();
S = {}; TL.scenes.forEach(s => S[s.name] = s); C = TL.cues; KW = TL.keywords; CHUNKS = TL.lines.flatMap(l => l.chunks);
draw(+(new URLSearchParams(location.search).get('t') || 0)); window.TOTAL = TL.TOTAL; window.ready = true;
</script></body></html>
