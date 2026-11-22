function wp(g, x, y, z) { const v = new THREE.Vector3(x, y, z); g.localToWorld(v); return [v.x, v.y, v.z]; }
const RED = '#e8463a', BLUE = '#3d8fd6', NAVY = '#0f1a30', TEA = '#2fd0c0', GRN = '#2fb07c', INKC = '#1f2430', GLD = '#f2c230', PAPER = '#efe6d6';
function bg(col = NAVY, gridc = 'rgba(56,225,255,.07)', t = 0) { ctx.fillStyle = col; ctx.fillRect(0, 0, W, H); ctx.strokeStyle = gridc; ctx.lineWidth = 2; for (let x = 0; x <= W; x += 60) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); } for (let y = (t * 30) % 60; y <= H; y += 60) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); } }
function slam(text, x, y, size, col, t, t0, stroke = '#000') { if (t < t0) return; const p = pr(t, t0, t0 + .22); const k = 1 + 1.4 * (1 - E.out(p)); const sh = p < 1 ? 0 : Math.max(0, 1 - (t - t0 - .22) * 5) * 8 * Math.sin(t * 90);
  ctx.save(); ctx.translate(x + sh, y); ctx.scale(k, k); txt(text, 0, 0, size, col, stroke, size * .12, 'center', cl(p * 2)); ctx.restore(); }
function panel(x, y, w, h, a, bgc = 'rgba(255,255,255,.96)') { if (a <= 0) return false; const k = E.back(cl(a)); ctx.save(); ctx.translate(x, y); ctx.scale(k, k); ctx.fillStyle = 'rgba(0,0,0,.3)'; ctx.beginPath(); ctx.roundRect(-w / 2 + 10, -h / 2 + 14, w, h, 30); ctx.fill(); ctx.fillStyle = bgc; ctx.beginPath(); ctx.roundRect(-w / 2, -h / 2, w, h, 30); ctx.fill(); ctx.lineWidth = 7; ctx.strokeStyle = INKC; ctx.stroke(); return true; }
function stamp(text, x, y, a, col = RED, size = 90) { if (a <= 0) return; const k = 1 + 1.5 * (1 - E.out(cl(a))); ctx.save(); ctx.translate(x, y); ctx.rotate(-.14); ctx.scale(k, k); ctx.globalAlpha = cl(a * 2); ctx.font = `${size}px Jua`; const w = ctx.measureText(text).width + 70; ctx.fillStyle = 'rgba(255,255,255,.92)'; ctx.fillRect(-w / 2, -size * .8, w, size * 1.6); ctx.strokeStyle = col; ctx.lineWidth = 12; ctx.strokeRect(-w / 2, -size * .8, w, size * 1.6); ctx.fillStyle = col; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(text, 0, 4); ctx.restore(); }
function arrow(x, y, up, s, col, a) { if (a <= 0) return; ctx.save(); ctx.translate(x, y); ctx.scale(s * a, s * (up ? 1 : -1) * a); ctx.fillStyle = col; ctx.strokeStyle = INKC; ctx.lineWidth = 6 / s; ctx.beginPath(); ctx.moveTo(0, -60); ctx.lineTo(50, 0); ctx.lineTo(20, 0); ctx.lineTo(20, 60); ctx.lineTo(-20, 60); ctx.lineTo(-20, 0); ctx.lineTo(-50, 0); ctx.closePath(); ctx.fill(); ctx.stroke(); ctx.restore(); }
function chipIcon(x, y, s, a = 1) { if (a <= 0) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.fillStyle = GLD; for (let i = 0; i < 5; i++) { const o = -32 + i * 16; ctx.fillRect(o - 3, -56, 6, 14); ctx.fillRect(o - 3, 42, 6, 14); ctx.fillRect(-56, o - 3, 14, 6); ctx.fillRect(42, o - 3, 14, 6); } ctx.fillStyle = '#23272f'; ctx.beginPath(); ctx.roundRect(-44, -44, 88, 88, 10); ctx.fill(); ctx.strokeStyle = '#5a6272'; ctx.lineWidth = 4; ctx.strokeRect(-30, -30, 60, 60); ctx.restore(); }
// --- 1조 달러 클럽 ---
function clubScreen(t) { bg('#101a30', 'rgba(242,194,48,.06)', t); txt('연 수출 1조 달러 클럽', 540, 470, 76, YEL, '#000', 10, 'center', pop(t, C.usa));
  const rows = [['미국', '2006년', '#3d8fd6', C.usa + .1], ['독일', '2006년', '#f2c230', C.usa + .55], ['중국', '2007년', '#e8463a', C.usa + 1.0], ['한국', '2026년', '#2fd0c0', C.k4]];
  rows.forEach(([n, y, col, t0], i) => { const a = pop(t, t0); if (a <= 0) return; const yy = 620 + i * 125, me = i == 3; ctx.save(); ctx.translate(540 + (1 - cl(a)) * 600, yy); ctx.fillStyle = me ? 'rgba(47,208,192,.25)' : 'rgba(255,255,255,.1)'; ctx.beginPath(); ctx.roundRect(-400, -52, 800, 104, 24); ctx.fill(); ctx.lineWidth = me ? 6 : 3; ctx.strokeStyle = me ? TEA : 'rgba(255,255,255,.3)'; ctx.stroke();
    ctx.fillStyle = col; ctx.beginPath(); ctx.arc(-330, 0, 32, 0, 7); ctx.fill(); txt(String(i + 1), -330, 16, 46, INKC, null); txt(n, -260, 20, 64, '#fff', '#000', 8, 'left'); txt(y, 370, 20, 56, me ? YEL : '#c8ced8', '#000', 7, 'right'); ctx.restore(); });
  if (t > C.k4) ring(540, 995, t, C.k4 + .1, TEA);
  if (t > C.jp) { const a = pop(t, C.jp); ctx.save(); ctx.globalAlpha = cl(a); ctx.fillStyle = 'rgba(255,255,255,.06)'; ctx.beginPath(); ctx.roundRect(140, 1370, 800, 104, 24); ctx.fill(); ctx.restore(); txt('일본', 320, 1442, 60, '#9aa3b5', '#000', 7, 'left', a); txt('아직 없음', 900, 1442, 52, '#9aa3b5', '#000', 6, 'right', a); xMark(220, 1422, 40, pr(t, C.jp + .3, C.jp + .6)); } }
// --- 1분 = 42억 원 ---
function clockScreen(t) { bg('#1a1430', 'rgba(255,230,0,.05)', t); const cx = 540, cy = 720, r = 250; const a = pop(t, C.min);
  ctx.save(); ctx.translate(cx, cy); ctx.scale(E.back(cl(a)), E.back(cl(a))); ctx.fillStyle = '#fffdf6'; ctx.beginPath(); ctx.arc(0, 0, r, 0, 7); ctx.fill(); ctx.lineWidth = 14; ctx.strokeStyle = INKC; ctx.stroke();
  const sw = pr(t, C.min + .2, C.sell + .9); ctx.fillStyle = 'rgba(242,194,48,.55)'; ctx.beginPath(); ctx.moveTo(0, 0); ctx.arc(0, 0, r - 20, -Math.PI / 2, -Math.PI / 2 + sw * Math.PI * 2); ctx.closePath(); ctx.fill();
  for (let i = 0; i < 60; i++) { const an = i / 60 * Math.PI * 2; ctx.strokeStyle = INKC; ctx.lineWidth = i % 5 ? 3 : 8; ctx.beginPath(); ctx.moveTo(Math.cos(an) * (r - 18), Math.sin(an) * (r - 18)); ctx.lineTo(Math.cos(an) * (r - (i % 5 ? 34 : 50)), Math.sin(an) * (r - (i % 5 ? 34 : 50))); ctx.stroke(); }
  const ha = -Math.PI / 2 + sw * Math.PI * 2; ctx.strokeStyle = RED; ctx.lineWidth = 10; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(Math.cos(ha) * (r - 40), Math.sin(ha) * (r - 40)); ctx.stroke(); ctx.fillStyle = INKC; ctx.beginPath(); ctx.arc(0, 0, 18, 0, 7); ctx.fill(); ctx.restore();
  txt('1분', cx, 410, 90, '#fff', '#000', 10, 'center', a);
  if (t > C.min + .6) { const v = Math.round(42 * E.out(pr(t, C.min + .6, C.sell + .6))); slam(v + '억 원', cx, 1110, 150, YEL, t, C.min + .6); }
  txt('하루 평균 42.3억 달러 · 관세청', cx, 1450, 40, '#fff', '#000', 6, 'center', pr(t, C.sell, C.sell + .4)); }
// --- weight vs value ---
function weightScreen(t) { bg(PAPER, 'rgba(0,0,0,.04)', t); txt('작년 같은 기간 = 100', 540, 450, 52, INKC, null, 0, 'center', pop(t, S.weight.start + .1));
  const yb = 1080, sc = 3.2; ctx.strokeStyle = INKC; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(140, yb); ctx.lineTo(940, yb); ctx.stroke();
  const ref = yb - 100 * sc; ctx.setLineDash([16, 12]); ctx.strokeStyle = 'rgba(31,36,48,.45)'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(140, ref); ctx.lineTo(940, ref); ctx.stroke(); ctx.setLineDash([]);
  const bars = [[330, '무게', '#9aa3b5', 100, 95.1, C.wdown, '-4.9%', false], [750, '금액', GRN, 100, 162.9, C.amt, '+62.9%', true]];
  bars.forEach(([x, lab, col, v0, v1, t0, tag, up], i) => { const a = pop(t, S.weight.start + .3 + i * (C.amt - S.weight.start - .6)); if (a <= 0 || (i == 1 && t < C.amt - .4)) return; const v = lerp(v0, v1, E.out(pr(t, t0, t0 + 1.0))); const h = v * sc * cl(a);
    ctx.fillStyle = col; ctx.fillRect(x - 130, yb - h, 260, h); ctx.lineWidth = 6; ctx.strokeStyle = INKC; ctx.strokeRect(x - 130, yb - h, 260, h);
    if (!i) { for (let k = 0; k < 3; k++) { ctx.fillStyle = ['#e8463a', '#3d8fd6', '#f2c230'][k]; ctx.fillRect(x - 100, yb - 60 - k * 70, 200, 56); ctx.strokeRect(x - 100, yb - 60 - k * 70, 200, 56); } }
    else chipIcon(x, yb - 120, 1.1);
    txt(lab, x, yb + 80, 64, INKC, null); if (t > t0) { txt(tag, x, yb - h - 40, 80, up ? GRN : RED, '#fff', 10, 'center', pr(t, t0, t0 + .3)); arrow(x + 175, yb - h + 40, up, .7, up ? GRN : RED, pr(t, t0, t0 + .3)); } });
  txt('1/1~11/19 · 관세청(이투데이)', 540, 1450, 38, INKC, null, 0, 'center', pr(t, C.wdown, C.wdown + .4)); }
// --- neon: AI buying memory ---
function neonScreen(t) { bg('#05060f', 'rgba(56,225,255,.06)', t); const cx = 540, cy = 860;
  const racks = [[200, 560], [880, 560], [200, 1060], [880, 1060]]; const p = pr(t, S.ai.start, S.ai.start + 1.0);
  ctx.save(); ctx.shadowColor = '#38e1ff'; ctx.shadowBlur = 18; racks.forEach(([x, y], i) => { const a = cl(p * 4 - i); if (a <= 0) return; ctx.strokeStyle = `rgba(56,225,255,${a})`; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx, y); ctx.lineTo(lerp(cx, x, a), y); ctx.stroke();
    for (let k = 0; k < 3; k++) { const u = ((t * .8 + k / 3 + i * .1) % 1); const L1 = Math.abs(y - cy), L2 = Math.abs(x - cx), d = u * (L1 + L2); const px = d < L2 ? lerp(x, cx, d / L2) : cx, py = d < L2 ? y : lerp(y, cy, (d - L2) / L1); ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(px, py, 7, 0, 7); ctx.fill(); }
    ctx.fillStyle = '#18223a'; ctx.strokeStyle = '#38e1ff'; ctx.lineWidth = 5; ctx.beginPath(); ctx.roundRect(x - 90, y - 120, 180, 240, 16); ctx.fill(); ctx.stroke(); for (let k = 0; k < 5; k++) { ctx.fillStyle = (Math.floor(t * 6) + k + i) % 3 ? '#2fd0c0' : '#ff4fa0'; ctx.fillRect(x - 64, y - 96 + k * 44, 30, 12); ctx.fillStyle = '#3a4a6a'; ctx.fillRect(x - 24, y - 96 + k * 44, 88, 12); } }); ctx.restore();
  txt('AI 데이터센터', 540, 450, 64, '#38e1ff', '#000', 8, 'center', pop(t, C.big + .5)); chipIcon(cx, cy, 1.8 + .08 * Math.sin(t * 6), pop(t, S.ai.start + .3));
  if (t > C.mem) { const a = pop(t, C.mem); panel(540, 1500, 640, 200, a, 'rgba(10,14,30,.95)') && (ctx.restore(), 0);
    const q = E.out(pr(t, C.mem + .2, C.mem + 1.4)); ctx.save(); ctx.beginPath(); for (let k = 0; k <= 40; k++) { const u = k / 40 * q; const x = 290 + u * 500, y = 1560 - (Math.pow(u, 2.2) * 130 + Math.sin(u * 20) * 6); k ? ctx.lineTo(x, y) : ctx.moveTo(x, y); } ctx.strokeStyle = '#ff4fa0'; ctx.lineWidth = 9; ctx.shadowColor = '#ff4fa0'; ctx.shadowBlur = 14; ctx.stroke(); ctx.restore();
    txt('메모리 값', 360, 1470, 48, '#fff', '#000', 6, 'center', a); arrow(780, 1460, true, .6, '#ff4fa0', pr(t, C.mem + 1.2, C.mem + 1.5)); } }
// --- ratio: chip weight vs value ---
function ratioScreen(t) { bg('#0f1a30', 'rgba(255,255,255,.04)', t); chipIcon(540, 470, 1.0, pop(t, S.ratio.start + .1)); txt('반도체만 보면', 540, 610, 64, '#fff', '#000', 8, 'center', pop(t, S.ratio.start + .2));
  const x0 = 140, maxW = 800, sc = maxW / 197; [[780, '무게', 39, '#9aa3b5', C.r39 - .6], [1010, '금액', 197, TEA, C.r197 - .4]].forEach(([y, lab, v, col, t0]) => { const a = pop(t, t0); if (a <= 0) return; txt(lab, x0, y - 70, 54, '#fff', '#000', 7, 'left', a);
    const w = v * sc * E.out(pr(t, t0, t0 + 1.0)); ctx.fillStyle = 'rgba(255,255,255,.08)'; ctx.fillRect(x0, y - 40, maxW, 80); ctx.fillStyle = col; ctx.fillRect(x0, y - 40, w, 80); ctx.lineWidth = 5; ctx.strokeStyle = INKC; ctx.strokeRect(x0, y - 40, w, 80);
    const vv = Math.round(v * E.out(pr(t, t0, t0 + 1.0))); txt('+' + vv + '%', Math.min(x0 + w + 20, 760), y - 70, 70, YEL, '#000', 9, 'left', a); });
  if (t > C.r197 + 1.2) pill('무게보다 값이 5배 빨리', 540, 1450, pop(t, C.r197 + 1.2), YEL, 52); }
// --- caveat: paper collage ---
function paperCard(x, y, w, h, rot, col, a) { if (a <= 0) return false; const k = E.back(cl(a)); ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(k, k); ctx.fillStyle = 'rgba(0,0,0,.18)'; ctx.fillRect(-w / 2 + 12, -h / 2 + 14, w, h); ctx.fillStyle = col; ctx.beginPath(); ctx.moveTo(-w / 2, -h / 2); for (let i = 0; i <= 12; i++) ctx.lineTo(-w / 2 + i * w / 12, -h / 2 + (i % 2 ? 7 : -3)); ctx.lineTo(w / 2, h / 2); for (let i = 12; i >= 0; i--) ctx.lineTo(-w / 2 + i * w / 12, h / 2 + (i % 2 ? -6 : 4)); ctx.closePath(); ctx.fill();
  ctx.fillStyle = 'rgba(255,240,180,.85)'; ctx.save(); ctx.rotate(-.1); ctx.fillRect(-60, -h / 2 - 22, 120, 40); ctx.restore(); return true; }
function collageScreen(t) { bg('#d9cdb6', 'rgba(0,0,0,.05)', t); for (let i = 0; i < 14; i++) { ctx.fillStyle = `rgba(255,255,255,${.12 + (i % 3) * .05})`; ctx.save(); ctx.translate((i * 197) % 1080, (i * 331) % 1920); ctx.rotate(i); ctx.fillRect(-90, -60, 180, 120); ctx.restore(); }
  if (paperCard(540, 620, 760, 300, -.04, '#fffdf6', pop(t, C.oth + .1, .45))) { txt('반도체 말고 다른 수출도', 0, -40, 56, INKC, null); txt('+20%', 0, 80, 120, GRN, null); ctx.restore(); }
  if (t > C.oth + 1.2) stamp('20년 새 최고 증가율', 760, 830, pr(t, C.oth + 1.2, C.oth + 1.5), GRN, 44);
  if (t > C.but) { if (paperCard(540, 1480, 820, 280, .03, '#fffdf6', pop(t, C.but))) { txt('메모리 값이 꺾이면?', 0, -90, 50, INKC, null); const q = E.io(pr(t, C.but + .3, C.shake + .6)); ctx.beginPath(); for (let k = 0; k <= 50; k++) { const u = k / 50 * q; const x = -340 + u * 680, y = 70 - Math.sin(u * Math.PI) * 110 + (u > .5 ? (u - .5) * 120 : 0); k ? ctx.lineTo(x, y) : ctx.moveTo(x, y); } ctx.strokeStyle = RED; ctx.lineWidth = 9; ctx.stroke(); ctx.restore(); } }
  if (t > C.shake - .6 && t < S.outro.start) { const sh = t > C.shake ? Math.sin(t * 40) * 12 * Math.max(0, 1 - (t - C.shake) * .6) : 0; ctx.save(); ctx.translate(540 + sh, 980); ctx.rotate(sh * .006); txt('1조 달러', 0, 0, 120, '#fff', INKC, 14, 'center', pr(t, C.shake - .6, C.shake - .2)); ctx.restore(); }
 }
function overlays(t, md) {
  if (md == 'port' && t < S.belief.start) { if (t > C.first + 1.6) slam('1조 달러', 540, 700, 190, YEL, t, C.first + 1.6); if (t < C.first + 1.1) pill('11월 19일 오후 2시 9분', 540, 1450, pop(t, C.d19 + .1), '#fff', 50); pill('사상 첫 돌파', 540, 1450, pop(t, C.first + 1.2), TEA, 56); }
  if (md == 'port' && t >= S.belief.start && t < S.twist.start) { if (panel(540, 640, 720, 150, pop(t, C.bel + .2))) { txt('다들 이렇게 생각', 0, 22, 70, INKC, null); ctx.restore(); } if (t > C.mount) slam('컨테이너 산?!', 540, 840, 130, YEL, t, C.mount + .3); }
  if (md == 'chip') { if (t < C.semi) txt('손톱만 한 칩', 540, 640, 96, YEL, '#000', 12, 'center', pop(t, C.nail + .3)); else if (t < C.p43) callout('반도체', wp(chip, 0, .3, 0), 540, 620, pop(t, C.semi + .1), YEL, INKC, 60);
    if (t > C.x3 - .3 && t < C.p43) pill('작년의 3배 가까이 (+197%)', 540, 1450, pop(t, C.x3 - .3), '#fff', 50);
    if (t > C.p43 - .3) { const a = pop(t, C.p43 - .3); const q = .433 * E.out(pr(t, C.p43, C.p43 + .9)); ctx.save(); ctx.translate(540, 640); ctx.scale(cl(a), cl(a)); ctx.fillStyle = 'rgba(255,255,255,.95)'; ctx.beginPath(); ctx.arc(0, 0, 190, 0, 7); ctx.fill(); ctx.lineWidth = 8; ctx.strokeStyle = INKC; ctx.stroke();
      ctx.fillStyle = '#c8ced8'; ctx.beginPath(); ctx.arc(0, 0, 160, 0, 7); ctx.fill(); ctx.fillStyle = TEA; ctx.beginPath(); ctx.moveTo(0, 0); ctx.arc(0, 0, 160, -Math.PI / 2, -Math.PI / 2 + q * Math.PI * 2); ctx.closePath(); ctx.fill(); ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(0, 0, 92, 0, 7); ctx.fill(); ctx.restore();
      txt(Math.round(q * 100) + '%', 540, 668, 84, INKC, null, 0, 'center', a); txt('전체 수출 중 반도체 (1/1~11/19)', 540, 1450, 42, '#fff', '#000', 6, 'center', a); } }
  if (md == 'rank') { pill('반도체를 빼고 세면?', 540, 470, pop(t, S.rank.start + .1), YEL, 56);
    BARS.forEach((b, i) => { const P = proj(...wp(b.g, 0, 0, 1.3)); txt(b.n, P[0], P[1] + 75, 48, INKC, '#fff', 8, 'center', 1);
      const T = proj(...wp(b.g, 0, b.hb + (t < C.ex ? b.hc : 0), 0)); const done = t > C.ex + 1.4; const lab = done ? ['5위', '6위', '7위', '8위'][i] : ''; if (lab) txt(lab, T[0], T[1] - 40, i == 3 ? 72 : 56, i == 3 ? RED : INKC, '#fff', 9, 'center', pr(t, C.ex + 1.4 + i * .1, C.ex + 1.7 + i * .1)); });
    if (t > C.ex - .2 && t < C.ex + 1.6) { const T = proj(...wp(BARS[3].g, 0, BARS[3].hb + BARS[3].hc + 1.5, 0)); pill('반도체 -1,817억 달러', T[0] - 120, Math.max(560, T[1] - 140), pop(t, C.ex - .2), TEA, 44); }
    if (t > C.r8) stamp('세계 8위', 800, 880, pr(t, C.r8, C.r8 + .3), RED, 80);
    txt('2026년 1~7월 · 반도체 제외 수출(억 달러) · WTO·UN 자료', 540, 1450, 34, INKC, '#fff', 6, 'center', pop(t, C.jul)); }
  if (md == 'port' && t >= S.outro.start) { ctx.fillStyle = 'rgba(10,14,30,.42)'; ctx.fillRect(0, 600, W, 820);
    txt('1조 달러는', 540, 800, 84, '#fff', '#000', 10, 'center', pop(t, C.o1 + .1)); slam('더 많이 실어서가 아니라', 540, 980, 92, '#fff', t, C.o2); slam('더 비싸게 팔아서', 540, 1190, 132, YEL, t, C.o3 + .1); }
}
function grade() { const g = ctx.createRadialGradient(540, 960, 500, 540, 960, 1250); g.addColorStop(0, 'rgba(10,10,20,0)'); g.addColorStop(1, 'rgba(10,10,20,.32)'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H); }
function chrome(t) { const g = ctx.createLinearGradient(0, 0, 0, 520); g.addColorStop(0, 'rgba(5,8,15,.55)'); g.addColorStop(1, 'rgba(5,8,15,0)'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, 520);
  const ta = t < C.first + .1 ? 1 - pr(t, C.first - .3, C.first + .1) : pr(t, S.outro.start, S.outro.start + .4);
  if (ta > 0) { txt('알고 보면 다른 사건', 540, 236, 62, '#fff', '#000', 10, 'center', ta); txt('수출 1조 달러의 비밀', 540, 350, 96, YEL, '#000', 12, 'center', ta); }
  const T = [[C.first + .1, C.usa, '한국 수출 사상 첫 1조 달러'], [S.belief.start, S.twist.start, '항구가 꽉 찼을까?'], [S.weight.start, S.chip.start, '올해 수출, 무게 vs 금액'], [S.chip.start, S.ratio.start, '주인공은 반도체'], [S.rank.start, S.caveat.start, '순위 다시 세기'], [S.caveat.start, S.outro.start, '반론과 위험']];
  T.forEach(([a, b, s]) => { if (t >= a && t < b) pill(s, 540, 300, pop(t, a + .1), '#ffffff', 46); });
  if (t > C.first + .1) txt('출처: 관세청·산업통상부 발표(연합뉴스·한국일보·헤럴드경제·파이낸셜뉴스·이투데이)', 540, 1700, 27, '#fff', '#000', 5); }
function flashes(t) { [C.usa, C.min, S.belief.start, S.twist.start, S.weight.start, S.chip.start, S.ai.start, S.ratio.start, S.rank.start, S.caveat.start, S.outro.start].forEach(c => { const f = 1 - pr(t, c, c + .18); if (t >= c && f > 0) { ctx.fillStyle = `rgba(255,255,255,${f * .7})`; ctx.fillRect(0, 0, W, H); } }); }
const capOn = t => !((t >= S.twist.start && t < S.weight.start) || t >= S.outro.start);
function draw(t) { const st = state(t); camAt(t); ctx.clearRect(0, 0, W, H); const md = st.md;
  if (md == 'port' || md == 'chip' || md == 'rank') render3(); else if (md == 'club') clubScreen(t); else if (md == 'clock') clockScreen(t); else if (md == 'weight') weightScreen(t); else if (md == 'neon') neonScreen(t); else if (md == 'ratio') ratioScreen(t); else if (md == 'collage') collageScreen(t);
  else if (md == 'typo') { bg('#2457d6', 'rgba(255,255,255,.08)', t); slam('그런데 말이죠', 540, 960, 150, '#fff', t, S.twist.start + .02); }
  grade(); overlays(t, md); chrome(t); flashes(t); if (capOn(t)) caption(t); }
window.seek = async t => draw(t);
TL = await (await fetch(TLFILE)).json();
S = {}; TL.scenes.forEach(s => S[s.name] = s); C = TL.cues; KW = TL.keywords; CHUNKS = TL.lines.flatMap(l => l.chunks);
draw(+(new URLSearchParams(location.search).get('t') || 0)); window.TOTAL = TL.TOTAL; window.ready = true;
</script></body></html>
