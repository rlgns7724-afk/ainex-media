function wp(g, x, y, z) { const v = new THREE.Vector3(x, y, z); g.localToWorld(v); return [v.x, v.y, v.z]; }
const RED = '#e8463a', BLUE = '#3d8fd6', NAVY = '#141a2e', NEON = '#38e1ff';
const tmpC = document.createElement('canvas'); tmpC.width = W; tmpC.height = H; const tctx = tmpC.getContext('2d');
function blurAll(px = 10) { tctx.clearRect(0, 0, W, H); tctx.drawImage(out, 0, 0); ctx.save(); ctx.filter = `blur(${px}px)`; ctx.drawImage(tmpC, -20, -20, W + 40, H + 40); ctx.restore(); }
function slam(text, x, y, size, col, t, t0, stroke = '#000') { if (t < t0) return; const p = pr(t, t0, t0 + .22); const k = 1 + 1.4 * (1 - E.out(p)); const sh = p < 1 ? 0 : Math.max(0, 1 - (t - t0 - .22) * 5) * 8 * Math.sin(t * 90);
  ctx.save(); ctx.translate(x + sh, y); ctx.scale(k, k); txt(text, 0, 0, size, col, stroke, size * .12, 'center', cl(p * 2)); ctx.restore(); }
function glassIcon(x, y, s, col = '#fff', lw = 10) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.lineWidth = lw; ctx.strokeStyle = col; ctx.lineCap = 'round'; [-1, 1].forEach(d => { ctx.beginPath(); ctx.roundRect(d * 70 - 55, -40, 110, 80, 26); ctx.stroke(); }); ctx.beginPath(); ctx.moveTo(-15, -10); ctx.quadraticCurveTo(0, -24, 15, -10); ctx.moveTo(-125, -20); ctx.lineTo(-150, -30); ctx.moveTo(125, -20); ctx.lineTo(150, -30); ctx.stroke(); ctx.restore(); }
function phoneIcon(x, y, s, a, screen) { if (a <= 0) return; const k = E.back(cl(a)); ctx.save(); ctx.translate(x, y); ctx.scale(k * s, k * s); ctx.fillStyle = '#1d2026'; ctx.strokeStyle = NEON; ctx.lineWidth = 6; ctx.beginPath(); ctx.roundRect(-80, -150, 160, 300, 26); ctx.fill(); ctx.stroke(); ctx.fillStyle = '#2b5fc4'; ctx.beginPath(); ctx.roundRect(-66, -126, 132, 252, 12); ctx.fill(); if (screen) screen(); ctx.restore(); }
function panel(x, y, w, h, a, bg = 'rgba(255,255,255,.96)') { if (a <= 0) return false; const k = E.back(cl(a)); ctx.save(); ctx.translate(x, y); ctx.scale(k, k); ctx.fillStyle = 'rgba(0,0,0,.3)'; ctx.beginPath(); ctx.roundRect(-w / 2 + 10, -h / 2 + 14, w, h, 30); ctx.fill(); ctx.fillStyle = bg; ctx.beginPath(); ctx.roundRect(-w / 2, -h / 2, w, h, 30); ctx.fill(); ctx.lineWidth = 7; ctx.strokeStyle = '#1f2430'; ctx.stroke(); return true; }
function bubble(text, x, y, a, bg = '#fff', fg = '#1f2430', size = 50) { if (a <= 0) return; const k = E.back(cl(a)); ctx.save(); ctx.translate(x, y); ctx.scale(k, k); ctx.font = `${size}px Jua`; const w = ctx.measureText(text).width + 60, h = size + 44;
  ctx.fillStyle = bg; ctx.strokeStyle = '#1f2430'; ctx.lineWidth = 6; ctx.beginPath(); ctx.roundRect(-w / 2, -h / 2, w, h, 26); ctx.moveTo(-18, h / 2 - 2); ctx.lineTo(0, h / 2 + 34); ctx.lineTo(18, h / 2 - 2); ctx.fill(); ctx.stroke(); ctx.fillStyle = bg; ctx.fillRect(-16, h / 2 - 8, 32, 8); ctx.fillStyle = fg; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(text, 0, 3); ctx.restore(); }
function stamp(text, x, y, a, col = RED, size = 90) { if (a <= 0) return; const k = 1 + 1.5 * (1 - E.out(cl(a))); ctx.save(); ctx.translate(x, y); ctx.rotate(-.14); ctx.scale(k, k); ctx.globalAlpha = cl(a * 2); ctx.font = `${size}px Jua`; const w = ctx.measureText(text).width + 70; ctx.fillStyle = 'rgba(255,255,255,.85)'; ctx.fillRect(-w / 2, -size * .8, w, size * 1.6); ctx.strokeStyle = col; ctx.lineWidth = 12; ctx.strokeRect(-w / 2, -size * .8, w, size * 1.6); ctx.fillStyle = col; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(text, 0, 4); ctx.restore(); }
function shirtInset(x, y, r, a, t, sticker) { if (a <= 0) return; const k = E.back(cl(a)); ctx.save(); ctx.translate(x, y); ctx.scale(k, k); ctx.save(); ctx.beginPath(); ctx.arc(0, 0, r, 0, 7); ctx.clip(); ctx.fillStyle = '#5d6873'; ctx.fillRect(-r, -r, 2 * r, 2 * r); ctx.strokeStyle = 'rgba(0,0,0,.12)'; ctx.lineWidth = 3; for (let i = -r; i < r; i += 14) { ctx.beginPath(); ctx.moveTo(i, -r); ctx.lineTo(i + r, r); ctx.stroke(); }
  ctx.fillStyle = '#4b555f'; ctx.fillRect(-14, -r, 28, 2 * r); [-r * .6, 0, r * .6].forEach(by => { ctx.fillStyle = '#e8e2d6'; ctx.beginPath(); ctx.arc(0, by, r * .17, 0, 7); ctx.fill(); ctx.strokeStyle = '#1f2430'; ctx.lineWidth = 5; ctx.stroke(); });
  if (!sticker) { ctx.fillStyle = '#0d0f14'; ctx.beginPath(); ctx.arc(0, 0, r * .085, 0, 7); ctx.fill(); ctx.fillStyle = '#4a7aff'; ctx.beginPath(); ctx.arc(-r * .02, -r * .02, r * .035, 0, 7); ctx.fill(); const gl = .5 + .5 * Math.sin(t * 9); ctx.strokeStyle = `rgba(255,70,60,${gl})`; ctx.lineWidth = 6; ctx.beginPath(); ctx.arc(0, 0, r * .3, 0, 7); ctx.stroke(); }
  else { const sp = cl(sticker); const sk = 1 + 1.2 * (1 - E.out(sp)); ctx.save(); ctx.scale(sk, sk); ctx.rotate(-.2); ctx.globalAlpha = cl(sp * 3); ctx.fillStyle = YEL; ctx.strokeStyle = '#1f2430'; ctx.lineWidth = 5; ctx.beginPath(); ctx.roundRect(-r * .3, -r * .22, r * .6, r * .44, 8); ctx.fill(); ctx.stroke(); ctx.fillStyle = '#1f2430'; ctx.font = `${r * .16}px Jua`; ctx.textAlign = 'center'; ctx.fillText('봉인', 0, r * .06); ctx.restore(); }
  ctx.restore(); ctx.lineWidth = 12; ctx.strokeStyle = '#1f2430'; ctx.beginPath(); ctx.arc(0, 0, r, 0, 7); ctx.stroke(); ctx.lineWidth = 5; ctx.strokeStyle = '#fff'; ctx.stroke(); ctx.lineWidth = 22; ctx.strokeStyle = '#1f2430'; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(r * .72, r * .72); ctx.lineTo(r * 1.15, r * 1.15); ctx.stroke(); ctx.restore(); }
// ---------- backgrounds for typo mode ----------
function typoBG(t) { const tw = t >= S.twist.start && t < S.cam.start; ctx.fillStyle = tw ? '#2457d6' : NAVY; ctx.fillRect(0, 0, W, H);
  ctx.strokeStyle = tw ? 'rgba(255,255,255,.08)' : 'rgba(56,225,255,.07)'; ctx.lineWidth = 2; for (let x = 0; x <= W; x += 60) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); } for (let y = (t * 40) % 60; y <= H; y += 60) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }
  if (!tw) { ctx.font = '60px Jua'; ctx.textAlign = 'center'; const ns = ['397.5', '100', '30', '400', '49', '160']; for (let i = 0; i < 26; i++) { const x = (i * 211) % W, y = ((i * 337 + t * (40 + i % 5 * 15)) % (H + 200)) - 100; ctx.fillStyle = 'rgba(56,225,255,.08)'; ctx.fillText(ns[i % 6], x, y); } } }
// ---------- scenes ----------
function scenes(t, md) {
  const top = () => proj(...wp(TOP.g, 0, 2.15, 0));
  if (t < C.glass) { slam('문제 160개', 540, 720, 150, '#fff', t, C.n160); slam('49분', 540, 920, 170, NEON, t, C.n49);
    if (t > C.n49) { const p = pr(t, C.n49, C.n400); ctx.save(); ctx.strokeStyle = NEON; ctx.lineWidth = 12; ctx.globalAlpha = .7; ctx.beginPath(); ctx.arc(540, 860, 150, -Math.PI / 2, -Math.PI / 2 + p * 6.283); ctx.stroke(); ctx.restore(); }
    slam('400점 만점', 540, 1140, 170, YEL, t, C.n400); }
  if (md == 'device' && t < S.score.start) { pill('유튜버 실험', 540, 520, pop(t, C.glass + .1), '#ffffff', 52); const [cx, cy] = proj(100, 1.2, 0); const s = 1 + .03 * Math.sin(t * 6); ctx.save(); ctx.strokeStyle = NEON; ctx.lineWidth = 8; const a = pr(t, C.glass, C.glass + .4); ctx.globalAlpha = a; [[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(([dx, dy]) => { const x = cx + dx * 380 * s, y = cy + dy * 230 * s; ctx.beginPath(); ctx.moveTo(x, y - dy * 70); ctx.lineTo(x, y); ctx.lineTo(x - dx * 70, y); ctx.stroke(); });
    const sy = cy - 230 + ((t * 300) % 460); ctx.fillStyle = 'rgba(56,225,255,.25)'; ctx.fillRect(cx - 380, sy, 760, 8); ctx.restore(); pill('AI', cx + 380, cy - 250, pop(t, C.glass + .4), NEON, 50); }
  // score
  if (t >= S.score.start && t < S.avg.start) { const [x, y] = top(); if (t > C.score) { ring(x, y + 120, t, C.score, YEL); pill('수석', x, y - 40, pop(t, C.score) * (1 - pr(t, C.s400 - .3, C.s400)), YEL, 56); }
    if (panel(540, 640, 760, 330, pop(t, C.s400, .4))) { txt('세무사 시험 수석', 0, -80, 52, '#1f2430', null); const v = 397.5 * E.out(pr(t, C.s397 - .2, C.s397 + .7)); txt(t < C.s397 - .2 ? '???' : v.toFixed(1), -40, 70, 150, RED, '#1f2430', 10); txt('/ 400', 250, 70, 62, '#7a808c', null); ctx.restore(); } }
  // avg bars (iso)
  if (md == 'bars') { ctx.fillStyle = 'rgba(20,26,46,.55)'; ctx.fillRect(0, 0, W, H); txt('세법 과목', 540, 470, 70, '#fff', '#000', 10);
    const bar = (x, v, t0, c1, c2, c3, lab, val) => { const h = 560 * v * E.out(pr(t, t0, t0 + .7)); const by = 1080, w = 170, d = 70; ctx.lineWidth = 5; ctx.strokeStyle = '#1f2430';
      ctx.fillStyle = c2; ctx.beginPath(); ctx.moveTo(x - w / 2, by); ctx.lineTo(x - w / 2, by - h); ctx.lineTo(x + w / 2, by - h); ctx.lineTo(x + w / 2, by); ctx.closePath(); ctx.fill(); ctx.stroke();
      ctx.fillStyle = c3; ctx.beginPath(); ctx.moveTo(x + w / 2, by); ctx.lineTo(x + w / 2 + d, by - d * .6); ctx.lineTo(x + w / 2 + d, by - h - d * .6); ctx.lineTo(x + w / 2, by - h); ctx.closePath(); ctx.fill(); ctx.stroke();
      ctx.fillStyle = c1; ctx.beginPath(); ctx.moveTo(x - w / 2, by - h); ctx.lineTo(x - w / 2 + d, by - h - d * .6); ctx.lineTo(x + w / 2 + d, by - h - d * .6); ctx.lineTo(x + w / 2, by - h); ctx.closePath(); ctx.fill(); ctx.stroke();
      txt(lab, x + 30, by + 80, 52, '#fff', '#000', 8); if (t > t0 + .2) txt(val, x + 30, by - h - 70, 80, c1 == YEL ? YEL : '#fff', '#000', 10, 'center', pr(t, t0 + .2, t0 + .5)); };
    ctx.fillStyle = 'rgba(0,0,0,.3)'; ctx.fillRect(140, 1080, 800, 6);
    bar(330, .3, C.avg30 + .1, '#9fc4ea', BLUE, '#2b6aa8', '평균', '30점'); if (t > C.me100) bar(720, 1, C.me100, YEL, RED, '#a82a20', '수석', '100점');
    if (t > C.me100 + .6) ring(750, 520, t, C.me100 + .6, YEL); }
  // suspect
  if (t >= S.suspect.start && t < S.tell.start) { const [x, y] = top(); bubble('AI 안경?', x, y - 70, pop(t, C.susp), '#fff', RED, 64);
    STU.forEach((o, i) => { if (!o || i % 2) return; const [sx, sy] = proj(...wp(o.g, 0, 2.05, 0)); if (sx > 0 && sx < W && sy > 120) txt('?', sx, sy, 80, YEL, '#000', 10, 'center', pop(t, C.eyes + i * .05)); }); }
  // device teardown
  if (md == 'device' && t >= S.tell.start) { const fa = (t0, t1 = 99) => pop(t, t0) * (1 - pr(t, t1 - .2, t1));
    callout('카메라', wp(G.cam, 0, 0, .03), 300, 620, fa(C.parts, C.thick), '#ffffff'); callout('배터리', wp(studio, batt.position.x, batt.position.y, batt.position.z), 800, 520, fa(C.parts + .5, C.thick), '#3ad17a');
    if (t > C.thick && t < C.hole) { const a = fa(C.thick, C.hole); callout('두꺼운 안경다리', wp(G.temples[1], 0, 0, -.7), 540, 560, a, YEL, '#1f2430', 54); }
    if (t > C.hole && t < C.bt) { const [x, y] = proj(...wp(G.cam, 0, 0, .03)); ring(x, y, t, C.hole + .5, RED); ring(x, y, t, C.hole + 1.1, RED); callout('카메라 구멍', wp(G.cam, 0, 0, .03), 540, 540, fa(C.hole + .4, C.bt), RED, '#fff', 56); }
    if (t > C.bt) { const [gx, gy] = proj(...wp(G.temples[1], 0, .1, -.3)), [px, py] = proj(...wp(phone, 0, 1.1, 0)); const a = pr(t, C.bt, C.bt + .4); ctx.save(); ctx.globalAlpha = a; ctx.strokeStyle = BLUE; ctx.lineWidth = 10; ctx.setLineDash([22, 22]); ctx.lineDashOffset = -t * 160; ctx.beginPath(); ctx.moveTo(gx, gy); ctx.quadraticCurveTo((gx + px) / 2, Math.min(gy, py) - 160, px, py); ctx.stroke(); ctx.restore();
      for (let k = 0; k < 3; k++) { const p = ((t - C.bt) * 1.2 + k / 3) % 1; ctx.save(); ctx.globalAlpha = a * (1 - p); ctx.strokeStyle = BLUE; ctx.lineWidth = 8; ctx.beginPath(); ctx.arc(gx, gy, 30 + p * 160, -2.2, -.9); ctx.stroke(); ctx.beginPath(); ctx.arc(px, py, 30 + p * 160, -2.4, -.7); ctx.stroke(); ctx.restore(); }
      pill('블루투스 신호', 540, 560, pop(t, C.bt + .2) * (1 - pr(t, C.near - .2, C.near)), BLUE, 54, '#fff'); }
    if (t > C.near - .2) { const [wx, wy] = proj(...wp(wand, 0, .25, 0)); pill('전파탐지기', wx, wy - 240, pop(t, C.near), '#f2c230', 50); }
    if (t > C.detect) { const fl = Math.sin(t * 14) > 0 ? .22 : .08; const g = ctx.createRadialGradient(540, 960, 500, 540, 960, 1150); g.addColorStop(0, 'rgba(232,70,58,0)'); g.addColorStop(1, `rgba(232,70,58,${fl * 2.5})`); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
      if (panel(540, 1480, 520, 150, pop(t, C.detect))) { const n = 10; for (let i = 0; i < n; i++) { const on = i < n * (.6 + .4 * Math.abs(Math.sin(t * 9))); ctx.fillStyle = on ? (i > 6 ? RED : i > 3 ? '#f2c230' : '#3ad17a') : '#d8dce4'; ctx.beginPath(); ctx.roundRect(-225 + i * 46, -45, 36, 90, 8); ctx.fill(); } ctx.restore(); }
      slam('삐삐삐!', 540, 760, 110, RED, t, C.detect + .15, '#fff'); } }
  if (t >= S.twist.start && t < S.cam.start) slam('그런데 말이죠', 540, 960, 150, '#fff', t, S.twist.start + .02);
  // cam: real culprit
  if (t >= S.cam.start && md == 'class') { const [x, y] = top(); const a = pop(t, C.notg + .15) * (1 - pr(t, C.button - .5, C.button - .2)); if (a > 0) { ctx.save(); ctx.globalAlpha = cl(a); glassIcon(540, 780, 1.1 * cl(a), '#fff', 14); ctx.restore(); xMark(540, 780, 140, a); pill('범인은 안경이 아니다', 540, 560, pop(t, C.notg + .3), '#ffffff', 56, RED); }
    if (t > C.button - .4) { const [bx, by] = proj(...wp(TOP.g, .02, 1.0, .02)); ring(bx, by, t, C.button - .3, RED); } }
  if (md == 'circuit') { ctx.fillStyle = 'rgba(14,18,34,.86)'; ctx.fillRect(0, 0, W, H); ctx.strokeStyle = 'rgba(56,225,255,.08)'; ctx.lineWidth = 2; for (let x = 0; x <= W; x += 60) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); }
    const A = [280, 600], B = [800, 600], P = [540, 960];
    const wire = (p0, p1, t0, label) => { const p = E.io(pr(t, t0, t0 + .6)); if (p <= 0) return; const mx = p0[0], my = p1[1]; const pts = p0[1] == p1[1] ? [p0, p1] : [p0, [p0[0], (p0[1] + p1[1]) / 2], [p1[0], (p0[1] + p1[1]) / 2], p1];
      let L = 0; const seg = []; for (let i = 1; i < pts.length; i++) { const d = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); seg.push(d); L += d; }
      const go = l => { let r = l; for (let i = 0; i < seg.length; i++) { if (r <= seg[i]) { const q = r / seg[i]; return [lerp(pts[i][0], pts[i + 1][0], q), lerp(pts[i][1], pts[i + 1][1], q)]; } r -= seg[i]; } return pts[pts.length - 1]; };
      ctx.save(); ctx.shadowColor = NEON; ctx.shadowBlur = 30; ctx.strokeStyle = NEON; ctx.lineWidth = 10; ctx.lineJoin = 'round'; ctx.beginPath(); ctx.moveTo(...pts[0]); for (let l = 0; l <= L * p; l += 8) ctx.lineTo(...go(l)); ctx.stroke();
      if (p >= 1) for (let k = 0; k < 3; k++) { const [qx, qy] = go(((t * 500 + k * L / 3) % L)); ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(qx, qy, 12, 0, 7); ctx.fill(); } ctx.restore(); if (label) txt(label, ...go(L * .5).map((v, i) => i ? v - 34 : v), 44, '#fff', '#000', 6, 'center', p); };
    shirtInset(A[0], A[1] - 40, 190, pop(t, C.button + .1, .45), t, 0); txt('초소형 카메라', A[0], A[1] + 230, 56, YEL, '#000', 9, 'center', pr(t, C.button + .3, C.button + .6));
    wire([A[0] + 190, A[1] - 40], [B[0] - 130, B[1] - 40], C.toai - .4, '문제 사진');
    if (panel(B[0], B[1] - 40, 250, 250, pop(t, C.toai, .4))) { ctx.shadowColor = NEON; ctx.shadowBlur = 40; txt('AI', 0, 40, 130, '#1f2430', null); ctx.restore(); for (let k = 0; k < 4; k++) { ctx.save(); ctx.strokeStyle = NEON; ctx.lineWidth = 6; ctx.globalAlpha = pr(t, C.toai, C.toai + .4); [[-1, 0], [1, 0], [0, -1], [0, 1]].forEach(([dx, dy]) => { ctx.beginPath(); ctx.moveTo(B[0] + dx * 125 + (dy ? (k - 1.5) * 50 : 0), B[1] - 40 + dy * 125 + (dx ? (k - 1.5) * 50 : 0)); ctx.lineTo(B[0] + dx * 160 + (dy ? (k - 1.5) * 50 : 0), B[1] - 40 + dy * 160 + (dx ? (k - 1.5) * 50 : 0)); ctx.stroke(); }); ctx.restore(); } }
    wire([B[0], B[1] + 120], [P[0] + 120, P[1] - 60], C.phone - .4, '정답');
    phoneIcon(P[0], P[1], 1, pop(t, C.phone, .4), () => { if (t > C.phone + .4) { ctx.fillStyle = '#fff'; ctx.font = '44px Jua'; ctx.textAlign = 'center'; ctx.fillText('정답', 0, -40); ctx.font = '120px Jua'; ctx.fillText('③', 0, 80); } });
    stamp('자수', 800, 1010, pr(t, C.confess, C.confess + .3), RED, 110); }
  // proctor
  if (t >= S.proctor.start && t < S.students.start) { PROC.forEach((o, i) => { const [x, y] = proj(...wp(o.g, 0, 2.1, 0)); pill('감독관', x, y - 20, pop(t, C.proc + i * .2), '#ffffff', 46); if (t > C.nobody) bubble('이상 없음', x, y - 150, pop(t, C.nobody + i * .15), '#fff', '#2f7f7c', 50); });
    const [px, py] = proj(...wp(PROC[1].g, 0, 1.0, 0)), [tx, ty] = proj(...wp(TOP.g, 0, 1.0, 0)); const a = pr(t, C.proc + .6, C.proc + 1.2); if (a > 0) { ctx.save(); ctx.globalAlpha = a; ctx.strokeStyle = YEL; ctx.lineWidth = 10; ctx.setLineDash([24, 18]); ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(lerp(px, tx, a), lerp(py, ty, a)); ctx.stroke(); ctx.restore(); pill('바로 앞', (px + tx) / 2, (py + ty) / 2 - 50, pop(t, C.proc + 1.1), YEL, 46); }
    const [x, y] = top(); if (t > C.nobody) pill('수석', x, y + 10, 1, RED, 42, '#fff'); }
  // students
  if (t >= S.students.start && t < S.csat.start) {
    if (md == 'class' && t < C.dist) { pill('처음 의심한 건?', 540, 560, pop(t, C.first + .1), '#ffffff', 60); const a = pop(t, C.notdev); if (a > 0) { ctx.save(); ctx.globalAlpha = cl(a); glassIcon(400, 780, .9 * cl(a), '#fff', 14); ctx.restore(); phoneIcon(700, 780, .55, a); xMark(540, 780, 150, pr(t, C.notdev + .25, C.notdev + .5)); txt('장비', 540, 960, 64, '#fff', '#000', 9, 'center', cl(a)); } }
    if (md == 'hist') { ctx.fillStyle = 'rgba(20,26,46,.6)'; ctx.fillRect(0, 0, W, H); if (panel(540, 790, 940, 760, pop(t, C.dist, .4))) { txt('세법 점수 분포', 0, -300, 62, '#1f2430', null);
      const bins = [6, 14, 30, 48, 58, 44, 26, 12, 5, 0, 1], x0 = -400, bw = 72, by = 250; ctx.fillStyle = '#1f2430'; ctx.fillRect(x0 - 10, by, 820, 6);
      bins.forEach((v, i) => { const h = (v ? Math.max(v, 4) : 0) * 7 * E.out(pr(t, C.dist + .1 + i * .04, C.dist + .5 + i * .04)); const out = i == 10; ctx.fillStyle = out ? (Math.sin(t * 10) > -.3 ? RED : '#f2a090') : BLUE; ctx.fillRect(x0 + i * bw + 6, by - (out ? 46 : h), bw - 12, out ? 46 * pr(t, C.dist + .7, C.dist + .9) : h); });
      [0, 50, 100].forEach((v, i) => txt(v + '', x0 + (i * 5) * bw + (i == 2 ? bw / 2 : 0), by + 70, 44, '#1f2430', null)); ctx.restore();
      if (t > C.dist + .9) { ring(540 + x0 + 10 * bw + bw / 2, 790 + by - 30, t, C.dist + .9, RED); bubble('혼자 100점', 540 + x0 + 10 * bw - 30, 790 + 60, pop(t, C.dist + 1.0), '#fff', RED, 52); } } }
    if (md == 'class' && t >= C.stud - .2) { pill('수험생들이 먼저 찾아냈다', 540, 560, pop(t, C.stud), YEL, 56); STU.forEach((o, i) => { if (!o || i % 3) return; const [x, y] = proj(...wp(o.g, 0, 2.1, 0)); if (x > 0 && x < W) check(x, y - 30, 40, pop(t, C.stud + .1 + i * .03)); }); } }
  // csat
  if (t >= S.csat.start && t < S.outro.start) { pill('이번 수능부터', 540, 560, pop(t, S.csat.start + .1), '#ffffff', 60);
    if (t > C.off) { pill('안경 벗겨 검사', 540, 680, pop(t, C.off + .2), BLUE, 54, '#fff'); DESKS.forEach(([x0, z0], i) => { if (i % 4) return; const [x, y] = proj(x0 + .3, 1.0, z0 - .1); if (x > 0 && x < W) check(x, y - 50, 32, pop(t, C.off + .4 + i * .04)); }); }
    if (t > C.sticker - 1.0) { shirtInset(780, 880, 190, pop(t, C.sticker - .9, .4), t, pr(t, C.sticker, C.sticker + .25)); txt('단추에 스티커', 780, 1120, 52, YEL, '#000', 8, 'center', pr(t, C.sticker, C.sticker + .3)); } }
  // outro
  if (t >= S.outro.start) { txt('AI 시대의 시험 감독은', 540, 820, 74, '#fff', '#000', 10, 'center', pop(t, C.o1));
    slam('기계가 아니라', 540, 980, 104, '#9aa3b5', t, C.o2); if (t > C.o3) { const p = E.out(pr(t, C.o3, C.o3 + .3)); ctx.save(); ctx.strokeStyle = RED; ctx.lineWidth = 14; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(240, 950); ctx.lineTo(240 + 600 * p, 950); ctx.stroke(); ctx.restore(); }
    slam('숫자를 의심', 540, 1200, 160, YEL, t, C.o3 + .2); }
}
function grade(t, md) { const g = ctx.createRadialGradient(540, 960, 500, 540, 960, 1250); g.addColorStop(0, 'rgba(20,20,40,0)'); g.addColorStop(1, 'rgba(20,20,40,.32)'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H); }
function chrome(t) { const g = ctx.createLinearGradient(0, 0, 0, 520); g.addColorStop(0, 'rgba(10,15,30,.5)'); g.addColorStop(1, 'rgba(10,15,30,0)'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, 520);
  const ta = t < C.rewind + .4 ? 1 - pr(t, C.rewind, C.rewind + .4) : pr(t, S.outro.start, S.outro.start + .4);
  if (ta > 0) { txt('알고 보면 다른 사건', 540, 236, 62, '#fff', '#000', 10, 'center', ta); txt('AI 안경 커닝의 진실', 540, 350, 100, YEL, '#000', 12, 'center', ta); }
  let tag = null, t0 = 0; const T = [[S.score.start, S.tell.start, '올해 세무사 시험'], [S.tell.start, S.twist.start, 'AI 안경의 티'], [S.cam.start, S.proctor.start, '진짜 방법'], [S.proctor.start, S.students.start, '시험장 안'], [S.students.start, S.csat.start, '의혹의 시작'], [S.csat.start, S.outro.start, '달라진 시험장']];
  T.forEach(([a, b, s]) => { if (t >= a && t < b) { tag = s; t0 = a + .1; } }); if (tag) pill(tag, 540, 300, pop(t, t0), '#ffffff', 46);
  if (t > C.rewind + .4) txt('출처: 경향신문, 헤럴드경제, 한국경제, YTN, 교육부', 540, 1700, 28, '#fff', '#000', 5); }
function rewindFx(t) { const fl = pr(t, C.rewind - .25, C.rewind) * (1 - pr(t, C.rewind, C.rewind + .35)); if (fl > 0) { ctx.fillStyle = `rgba(255,255,255,${fl})`; ctx.fillRect(0, 0, W, H); }
  if (t > C.rewind - .6 && t < C.rewind + .4) txt('◀◀', 540, 900, 160, '#fff', '#000', 12, 'center', pr(t, C.rewind - .6, C.rewind - .3) * (1 - pr(t, C.rewind, C.rewind + .4)));
  [S.tell.start, S.twist.start, S.cam.start, C.button + .1, S.proctor.start, C.dist, C.stud - .2, S.outro.start].forEach(c => { const f = 1 - pr(t, c, c + .18); if (t >= c && f > 0) { ctx.fillStyle = `rgba(255,255,255,${f * .7})`; ctx.fillRect(0, 0, W, H); } }); }
const capOn = t => !(t < C.glass || (t >= S.twist.start && t < S.cam.start) || t >= S.outro.start);
function draw(t) { const st = state(t); camAt(t); ctx.clearRect(0, 0, W, H); const md = st.md;
  if (md == 'typo') typoBG(t); else { render3(md); if (md == 'bars' || md == 'hist' || md == 'circuit') blurAll(md == 'circuit' ? 14 : 8); }
  grade(t, md); scenes(t, md); chrome(t); rewindFx(t); if (capOn(t)) caption(t); }
window.seek = async t => draw(t);
TL = await (await fetch(TLFILE)).json();
S = {}; TL.scenes.forEach(s => S[s.name] = s); C = TL.cues; KW = TL.keywords; CHUNKS = TL.lines.flatMap(l => l.chunks);
draw(+(new URLSearchParams(location.search).get('t') || 0)); window.TOTAL = TL.TOTAL; window.ready = true;
</script></body></html>
