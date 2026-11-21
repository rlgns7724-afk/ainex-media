function wp(g, x, y, z) { const v = new THREE.Vector3(x, y, z); g.localToWorld(v); return [v.x, v.y, v.z]; }
const RED = '#e8463a', BLUE = '#3d8fd6', NAVY = '#1c1430', PNK = '#ff4fa0', ORG = '#ff9a3c', TEA = '#2fd0c0', GRN = '#3ad17a', INKC = '#1f2430', GLD = '#f2c230';
function bg(col = NAVY, gridc = 'rgba(255,79,160,.07)', t = 0) { ctx.fillStyle = col; ctx.fillRect(0, 0, W, H); ctx.strokeStyle = gridc; ctx.lineWidth = 2; for (let x = 0; x <= W; x += 60) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); } for (let y = (t * 30) % 60; y <= H; y += 60) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); } }
function slam(text, x, y, size, col, t, t0, stroke = '#000') { if (t < t0) return; const p = pr(t, t0, t0 + .22); const k = 1 + 1.4 * (1 - E.out(p)); const sh = p < 1 ? 0 : Math.max(0, 1 - (t - t0 - .22) * 5) * 8 * Math.sin(t * 90);
  ctx.save(); ctx.translate(x + sh, y); ctx.scale(k, k); txt(text, 0, 0, size, col, stroke, size * .12, 'center', cl(p * 2)); ctx.restore(); }
function panel(x, y, w, h, a, bgc = 'rgba(255,255,255,.96)') { if (a <= 0) return false; const k = E.back(cl(a)); ctx.save(); ctx.translate(x, y); ctx.scale(k, k); ctx.fillStyle = 'rgba(0,0,0,.3)'; ctx.beginPath(); ctx.roundRect(-w / 2 + 10, -h / 2 + 14, w, h, 30); ctx.fill(); ctx.fillStyle = bgc; ctx.beginPath(); ctx.roundRect(-w / 2, -h / 2, w, h, 30); ctx.fill(); ctx.lineWidth = 7; ctx.strokeStyle = INKC; ctx.stroke(); return true; }
function stamp(text, x, y, a, col = RED, size = 90) { if (a <= 0) return; const k = 1 + 1.5 * (1 - E.out(cl(a))); ctx.save(); ctx.translate(x, y); ctx.rotate(-.14); ctx.scale(k, k); ctx.globalAlpha = cl(a * 2); ctx.font = `${size}px Jua`; const w = ctx.measureText(text).width + 70; ctx.fillStyle = 'rgba(255,255,255,.9)'; ctx.fillRect(-w / 2, -size * .8, w, size * 1.6); ctx.strokeStyle = col; ctx.lineWidth = 12; ctx.strokeRect(-w / 2, -size * .8, w, size * 1.6); ctx.fillStyle = col; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(text, 0, 4); ctx.restore(); }
function boxIcon(x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); const g = ctx.createLinearGradient(-30, -42, 30, 42); g.addColorStop(0, PNK); g.addColorStop(.5, ORG); g.addColorStop(1, '#5a2fd0'); ctx.fillStyle = g; ctx.fillRect(-30, -42, 60, 84); ctx.lineWidth = 4; ctx.strokeStyle = INKC; ctx.strokeRect(-30, -42, 60, 84); ctx.fillStyle = '#111'; ctx.fillRect(-30, -42, 60, 12); ctx.fillStyle = '#fff'; ctx.font = '40px Jua'; ctx.textAlign = 'center'; ctx.fillText('VI', 0, 22); ctx.restore(); }
// --- hook 2: units + endgame comparison ---
function boxesScreen(t) { bg('#1c1430', 'rgba(255,154,60,.06)', t);
  if (t < C.eg) { pill('출시 전 판매량', 540, 420, pop(t, C.pre + .1), '#fff', 56);
    const n = Math.floor(90 * E.out(pr(t, C.pre + .2, C.m325 + 1.2))); for (let i = 0; i < n; i++) { const c = i % 10, r = Math.floor(i / 10); const dy = Math.max(0, 1 - pr(t, C.pre + .2 + i * .012, C.pre + .45 + i * .012)) * -500; boxIcon(145 + c * 88, 1040 - r * 58 + dy, .95); }
    if (t > C.m325) { const v = Math.round(3250 * E.out(pr(t, C.m325, C.m325 + 1.0))); slam(v.toLocaleString() + '만 장', 540, 620, 170, YEL, t, C.m325); txt('테이크투 발표 · 출시 전 판매', 540, 1450, 40, '#fff', '#000', 6, 'center', pr(t, C.m325 + .4, C.m325 + .8)); } return; }
  txt('GTA 6 첫날 vs 영화 한 편 평생', 540, 430, 60, '#fff', '#000', 8, 'center', pop(t, C.eg));
  [[330, 3.79, PNK, 'GTA 6', '출시 첫날'], [750, 2.8, '#9aa3b5', '어벤져스: 엔드게임', '극장 수입 전체']].forEach(([x, v, c, lab, sub], i) => { const t0 = C.eg + .3 + i * .7; const a = pop(t, t0); if (a <= 0) return; const h = 400 * v / 3.79 * E.out(pr(t, t0, t0 + .8));
    ctx.fillStyle = c; ctx.fillRect(x - 130, 1000 - h, 260, h); ctx.lineWidth = 6; ctx.strokeStyle = INKC; ctx.strokeRect(x - 130, 1000 - h, 260, h); txt(lab, x, 1055, i ? 44 : 64, '#fff', '#000', 7, 'center', a); txt(sub, x, 1105, 38, '#c8ced8', '#000', 5, 'center', a);
    if (!i) txt('37.9억 달러', x, 970 - h, 64, YEL, '#000', 9, 'center', a); });
  if (t > C.eg2 + .5) stamp('더 많다', 760, 600, pr(t, C.eg2 + .5, C.eg2 + .8), PNK, 80);
  txt('첫날 판매액(소비자 지출) 기준 · 로이터·코타쿠', 540, 1450, 36, '#fff', '#000', 5, 'center', pop(t, C.eg + .5)); }
// --- cost: receipt ---
function receiptScreen(t) { bg('#efe6d6', 'rgba(0,0,0,.04)', t); const a = pop(t, S.cost.start + .05, .45); if (a <= 0) return; const k = E.back(cl(a));
  ctx.save(); ctx.translate(540, 820); ctx.rotate(-.04); ctx.scale(k, k); ctx.fillStyle = 'rgba(0,0,0,.2)'; ctx.fillRect(-330 + 14, -420 + 18, 660, 860); ctx.fillStyle = '#fffdf6'; ctx.beginPath(); ctx.moveTo(-330, -420); ctx.lineTo(330, -420); for (let i = 0; i <= 22; i++) ctx.lineTo(330 - i * 30, 440 + (i % 2 ? -16 : 0)); ctx.closePath(); ctx.fill(); ctx.lineWidth = 4; ctx.strokeStyle = '#bdb6a4'; ctx.stroke();
  txt('영수증 · 제작비', 0, -330, 62, INKC, null); ctx.setLineDash([12, 10]); ctx.strokeStyle = '#9a9488'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(-280, -280); ctx.lineTo(280, -280); ctx.stroke(); ctx.setLineDash([]);
  [['GTA 6 제작비', -150]].forEach(([s, y], i) => { const aa = pr(t, S.cost.start + .4, S.cost.start + .7); txt(s, -270, y, 56, '#5a5448', null, 0, 'left', aa); txt('?', 270, y, 56, '#5a5448', null, 0, 'right', aa); });
  ctx.strokeStyle = INKC; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(-280, 60); ctx.lineTo(280, 60); ctx.stroke();
  txt('합계', -270, 160, 58, INKC, null, 0, 'left', pr(t, S.cost.start + 1.2, S.cost.start + 1.5)); txt('$10억+', 270, 160, 88, RED, null, 0, 'right', pr(t, S.cost.start + 1.2, S.cost.start + 1.5));
  txt('≈ 1조 4천억 원 이상', 0, 290, 66, INKC, null, 0, 'center', pr(t, C.c14, C.c14 + .4)); ctx.restore();
  stamp('추정', 830, 1450, pr(t, C.est + .2, C.est + .5), RED, 90); txt('로이터 보도 추정치', 540, 1580, 40, INKC, null, 0, 'center', pr(t, C.est, C.est + .4)); }
// --- quote ---
function quoteScreen(t) { bg(NAVY, 'rgba(47,208,192,.06)', t); pill('테이크투 CEO', 540, 470, pop(t, S.quote.start + .1), TEA, 56, '#fff');
  if (panel(540, 860, 920, 500, pop(t, C.vict - .3, .45))) { txt('“', -380, -110, 220, PNK, null); txt('아직 승리를', 0, -60, 96, INKC, null); txt('선언할 때가 아니다', 0, 60, 86, t > C.vict + 1.2 ? RED : INKC, null); txt('스트라우스 젤닉 (로이터 인용)', 0, 180, 36, '#7a808c', null); ctx.restore(); } }
// --- GTA5 long tail chart ---
function chartScreen(t) { bg('#120f1e', 'rgba(255,255,255,.04)', t); const x0 = 150, x1 = 950, yb = 1080, yt = 560;
  if (t < C.g5) { slam('진짜 돈줄은?', 540, 900, 130, YEL, t, C.real + .1); return; }
  ctx.strokeStyle = 'rgba(255,255,255,.4)'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(x0, yb); ctx.lineTo(x1, yb); ctx.stroke(); [2013, 2016, 2019, 2022, 2026].forEach((y, i) => txt(String(y), lerp(x0, x1, (y - 2013) / 13), yb + 60, 38, '#c8ced8', '#000', 5));
  txt('GTA 5 누적 판매', 540, 450, 64, '#fff', '#000', 8, 'center', pop(t, C.g5));
  const q = t < C.m230 ? 0 : E.io(pr(t, C.m230, C.y10 + 1.2)); const f = u => 1 - Math.pow(1 - u, 1.6); // cumulative curve
  if (q > 0) { ctx.save(); ctx.beginPath(); ctx.moveTo(x0, yb); for (let k = 0; k <= 120; k++) { const u = k / 120 * q; ctx.lineTo(lerp(x0, x1, u), lerp(yb, yt, f(u))); } ctx.lineTo(lerp(x0, x1, q), yb); ctx.closePath(); const g = ctx.createLinearGradient(0, yt, 0, yb); g.addColorStop(0, 'rgba(255,79,160,.6)'); g.addColorStop(1, 'rgba(255,79,160,.05)'); ctx.fillStyle = g; ctx.fill();
    ctx.beginPath(); for (let k = 0; k <= 120; k++) { const u = k / 120 * q; const x = lerp(x0, x1, u), y = lerp(yb, yt, f(u)); k ? ctx.lineTo(x, y) : ctx.moveTo(x, y); } ctx.strokeStyle = PNK; ctx.lineWidth = 10; ctx.shadowColor = PNK; ctx.shadowBlur = 16; ctx.stroke(); ctx.restore();
    } if (t > C.m230 + .6) slam('2억 3천만 장+', 540, 640, 100, YEL, t, C.m230 + .6);
  if (t > C.d8) { const a = pop(t, C.d8); const h = 46 * E.out(pr(t, C.d8, C.d8 + .4)); ctx.fillStyle = TEA; ctx.fillRect(x0 - 18, yb - h, 36, h); if (panel(x0 + 190, yb - 160, 330, 110, a, 'rgba(255,255,255,.96)')) { txt('첫날 $8억', 0, 18, 56, INKC, null); ctx.restore(); } }
  if (t > C.y10) { const a = pop(t, C.y10 + .2); pill('10년 넘게 계속 수익', 540, 1440, a, YEL, 54); } }
// --- online neon ---
function neonScreen(t) { bg('#05060f', 'rgba(56,225,255,.06)', t); const cx = 540, cy = 820; const nodes = []; for (let i = 0; i < 18; i++) { const a = i * 2.39996, r = 140 + 260 * Math.sqrt((i + .5) / 18); nodes.push([cx + Math.cos(a) * r, cy + Math.sin(a) * r * .9]); }
  const p = pr(t, S.online.start, S.online.start + 1.2); ctx.save(); ctx.lineWidth = 5; ctx.shadowColor = '#38e1ff'; ctx.shadowBlur = 18;
  nodes.forEach(([x, y], i) => { const a = cl(p * 18 - i); if (a <= 0) return; ctx.strokeStyle = `rgba(56,225,255,${.8 * a})`; ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + (x - cx) * a, cy + (y - cy) * a); ctx.stroke();
    const u = ((t * .9 + i * .13) % 1); ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(lerp(x, cx, u), lerp(y, cy, u), 6, 0, 7); ctx.fill(); ctx.fillStyle = PNK; ctx.beginPath(); ctx.arc(x, y, 22 * a, 0, 7); ctx.fill(); txt('$', x, y + 12, 30, '#fff', null, 0, 'center', a); });
  ctx.fillStyle = '#38e1ff'; ctx.beginPath(); ctx.arc(cx, cy, 110, 0, 7); ctx.fill(); ctx.restore(); txt('온라인', cx, cy + 22, 64, INKC, null);
  slam('온라인 모드', 540, 470, 120, YEL, t, C.onl + .4); txt('아이템·업데이트로 계속 매출', 540, 1430, 48, '#fff', '#000', 7, 'center', pr(t, C.onl + .9, C.onl + 1.3)); }
// --- analyst scale ---
function scaleScreen(t) { bg('#1c1430', 'rgba(255,79,160,.06)', t); pill('증권가 시각', 540, 420, pop(t, S.street.start + .1), '#fff', 56);
  const tilt = lerp(0, .22, E.back(pr(t, C.imp, C.imp + .8))); const cx = 540, cy = 640; ctx.save(); ctx.fillStyle = '#c8ced8'; ctx.strokeStyle = INKC; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(cx - 90, 1110); ctx.lineTo(cx + 90, 1110); ctx.lineTo(cx + 20, cy); ctx.lineTo(cx - 20, cy); ctx.closePath(); ctx.fill(); ctx.stroke();
  ctx.translate(cx, cy); ctx.rotate(tilt); ctx.fillStyle = '#e8e0f0'; ctx.fillRect(-400, -14, 800, 28); ctx.strokeRect(-400, -14, 800, 28); ctx.restore();
  [[-1, '이번 판매량', TEA, C.sales], [1, '다음 온라인 모드', PNK, C.more + .4]].forEach(([s, lab, col, t0]) => { const a = pop(t, t0); const px = cx + s * 320 * Math.cos(tilt), py = cy + s * 320 * Math.sin(tilt); ctx.strokeStyle = INKC; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px - 120, py + 200); ctx.moveTo(px, py); ctx.lineTo(px + 120, py + 200); ctx.stroke();
    ctx.fillStyle = '#9aa3b5'; ctx.beginPath(); ctx.ellipse(px, py + 205, 150, 30, 0, 0, 7); ctx.fill(); ctx.stroke(); if (a <= 0) return; ctx.save(); ctx.translate(px, py + 120); ctx.scale(E.back(cl(a)), E.back(cl(a))); ctx.fillStyle = col; ctx.beginPath(); ctx.roundRect(-130, -50, 260, 125, 20); ctx.fill(); ctx.stroke(); ctx.restore(); txt(lab, px, py + 330, 44, '#fff', '#000', 7, 'center', a); });
  if (t > C.imp + .6) txt('더 무겁다', cx + 320, cy + 40, 64, YEL, '#000', 8, 'center', pop(t, C.imp + .6));
  txt('TD코웬 분석 (로이터 인용)', 540, 1560, 38, '#c8ced8', '#000', 5, 'center', pop(t, C.more)); }
function overlays(t, md) {
  if (md == 'store' && t < S.belief.start) { if (t > C.won5) { slam('5조 원', 540, 640, 200, YEL, t, C.won5); txt('37.9억 달러', 540, 760, 64, '#fff', '#000', 8, 'center', pr(t, C.won5 + .4, C.won5 + .8)); }
    pill('13년 만의 신작', 540, 880, pop(t, C.y13 + .2), PNK, 54, '#fff'); pill('출시 첫날 판매액', 540, 1450, pop(t, C.gta6 + .6), '#fff', 50); }
  if (md == 'city' && t < S.twist.start) { if (t > C.bel && t < C.co) { if (panel(540, 700, 720, 150, pop(t, C.bel + .2))) { txt('다들 이렇게 생각', 0, 22, 70, INKC, null); ctx.restore(); } }
    if (t > C.rich) slam('떼돈?!', 540, 720, 170, YEL, t, C.rich + .5); }
  if (md == 'store' && t >= S.split.start) { if (t < C.cust) { if (panel(540, 620, 760, 140, pop(t, C.notrev + .1))) { txt('5조 원 = 회사 매출?', 0, 22, 66, INKC, null); ctx.restore(); } xMark(870, 620, 70, pr(t, C.notrev + 1.4, C.notrev + 1.7)); }
    if (t > C.cust && t < C.store) callout('손님이 낸 돈', wp(PILES[7], 0, 2.0, 0), 540, 620, pop(t, C.cust + .3), YEL);
    callout('게임 가게 몫', wp(PILES[0], .3, 2.0, 0), 250, 700, pop(t, C.store + 1.0), TEA, '#fff'); callout('콘솔 회사 몫', wp(PILES[3], -.3, 2.0, 0), 820, 560, pop(t, C.console + .8), PNK, '#fff');
    if (t > C.console + 1.2) callout('게임 회사 몫', wp(PILES[7], 0, 1.9, 0), 540, 1460, pop(t, C.console + 1.3), YEL); }
  if (md == 'city' && t >= S.start.start && t < S.outro.start) { slam('첫날 = 출발선', 540, 1000, 120, YEL, t, C.beg + .3); }
  if (md == 'city' && t >= S.outro.start) { ctx.fillStyle = 'rgba(10,8,20,.35)'; ctx.fillRect(0, 560, W, 900);
    txt('하루 5조 원 게임도', 540, 820, 80, '#fff', '#000', 10, 'center', pop(t, C.o1 + .2)); slam('진짜 승부는', 540, 980, 110, '#fff', t, C.o2); slam('앞으로 10년', 540, 1170, 150, YEL, t, C.o3 + .1); }
}
function grade() { const g = ctx.createRadialGradient(540, 960, 500, 540, 960, 1250); g.addColorStop(0, 'rgba(10,10,20,0)'); g.addColorStop(1, 'rgba(10,10,20,.35)'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H); }
function chrome(t) { const g = ctx.createLinearGradient(0, 0, 0, 520); g.addColorStop(0, 'rgba(5,8,15,.55)'); g.addColorStop(1, 'rgba(5,8,15,0)'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, 520);
  const ta = t < C.y13 + .1 ? 1 - pr(t, C.y13 - .3, C.y13 + .1) : pr(t, S.outro.start, S.outro.start + .4);
  if (ta > 0) { txt('알고 보면 다른 사건', 540, 236, 62, '#fff', '#000', 10, 'center', ta); txt('GTA 6 첫날 5조의 진실', 540, 350, 96, YEL, '#000', 12, 'center', ta); }
  const T = [[C.y13 + .1, S.belief.start, '11월 19일 · GTA 6 출시'], [S.split.start, S.cost.start, '5조 원은 누구 돈?'], [S.cost.start, S.quote.start, '만드는 데 든 돈'], [S.gta5.start, S.online.start, '13년 전 GTA 5'], [S.start.start, S.outro.start, '이제 시작']];
  T.forEach(([a, b, s]) => { if (t >= a && t < b) pill(s, 540, 300, pop(t, a + .1), '#ffffff', 46); });
  if (t > C.y13 + .1) txt('출처: 로이터, 비즈니스포스트, 글로벌이코노믹, 블록미디어, 코타쿠', 540, 1700, 28, '#fff', '#000', 5); }
function flashes(t) { [C.pre, S.belief.start, S.twist.start, S.split.start, S.cost.start, S.quote.start, S.gta5.start, S.online.start, S.street.start, S.start.start, S.outro.start].forEach(c => { const f = 1 - pr(t, c, c + .18); if (t >= c && f > 0) { ctx.fillStyle = `rgba(255,255,255,${f * .7})`; ctx.fillRect(0, 0, W, H); } }); }
const capOn = t => !((t >= S.twist.start && t < S.split.start) || t >= S.outro.start);
function draw(t) { const st = state(t); camAt(t); ctx.clearRect(0, 0, W, H); const md = st.md;
  if (md == 'store' || md == 'city') render3(); else if (md == 'boxes') boxesScreen(t); else if (md == 'receipt') receiptScreen(t); else if (md == 'quote') quoteScreen(t); else if (md == 'chart') chartScreen(t); else if (md == 'neon') neonScreen(t); else if (md == 'scale') scaleScreen(t);
  else if (md == 'typo') { bg('#2457d6', 'rgba(255,255,255,.08)', t); slam('그런데 말이죠', 540, 960, 150, '#fff', t, S.twist.start + .02); }
  grade(); overlays(t, md); chrome(t); flashes(t); if (capOn(t)) caption(t); }
window.seek = async t => draw(t);
TL = await (await fetch(TLFILE)).json();
S = {}; TL.scenes.forEach(s => S[s.name] = s); C = TL.cues; KW = TL.keywords; CHUNKS = TL.lines.flatMap(l => l.chunks);
draw(+(new URLSearchParams(location.search).get('t') || 0)); window.TOTAL = TL.TOTAL; window.ready = true;
</script></body></html>
