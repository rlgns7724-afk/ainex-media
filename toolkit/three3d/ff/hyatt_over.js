// ================= 하얏트 2D 화면 · 오버레이 =================
const RED = '#e8463a', NAVY = '#14203a', INKC = '#1f2430', TEAL = '#2f7f7c', MUST = '#d9a441', BEIGE = '#efebe4', ORG = '#ff9a3c';
function bg(col = NAVY, gridc = 'rgba(255,255,255,.06)', t = 0) { ctx.fillStyle = col; ctx.fillRect(0, 0, W, H); ctx.strokeStyle = gridc; ctx.lineWidth = 2; for (let x = 0; x <= W; x += 60) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); } for (let y = (t * 30) % 60; y <= H; y += 60) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); } }
function slam(text, x, y, size, col, t, t0, stroke = '#000') { if (t < t0) return; const p = pr(t, t0, t0 + .22); const k = 1 + 1.4 * (1 - E.out(p)); const sh = p < 1 ? 0 : Math.max(0, 1 - (t - t0 - .22) * 5) * 8 * Math.sin(t * 90);
  ctx.save(); ctx.translate(x + sh, y); ctx.scale(k, k); txt(text, 0, 0, size, col, stroke, size * .12, 'center', cl(p * 2)); ctx.restore(); }
function stamp(text, x, y, a, col = RED, size = 90) { if (a <= 0) return; const k = 1 + 1.5 * (1 - E.out(cl(a))); ctx.save(); ctx.translate(x, y); ctx.rotate(-.12); ctx.scale(k, k); ctx.globalAlpha = cl(a * 2); ctx.font = `${size}px Jua`; const w = ctx.measureText(text).width + 70; ctx.fillStyle = 'rgba(255,255,255,.92)'; ctx.fillRect(-w / 2, -size * .8, w, size * 1.6); ctx.strokeStyle = col; ctx.lineWidth = 12; ctx.strokeRect(-w / 2, -size * .8, w, size * 1.6); ctx.fillStyle = col; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(text, 0, 4); ctx.restore(); }
function card2(kind, col, body, a, y = 1440) { if (a <= 0) return; ctx.save(); ctx.translate(540, y); const k = E.back(cl(a)); ctx.scale(k, k);
  ctx.font = '44px Jua'; const w = Math.max(560, ctx.measureText(body).width + 220); ctx.fillStyle = 'rgba(0,0,0,.3)'; ctx.beginPath(); ctx.roundRect(-w / 2 + 8, -58, w, 116, 22); ctx.fill();
  ctx.fillStyle = '#fbf9f4'; ctx.beginPath(); ctx.roundRect(-w / 2, -66, w, 116, 22); ctx.fill(); ctx.lineWidth = 6; ctx.strokeStyle = INKC; ctx.stroke();
  ctx.fillStyle = col; ctx.beginPath(); ctx.roundRect(-w / 2, -66, 150, 116, [22, 0, 0, 22]); ctx.fill(); ctx.stroke();
  txt(kind, -w / 2 + 75, 8, 46, '#fff', null); txt(body, 75, 8, 44, INKC, null); ctx.restore(); }
const sh = (fn, dx = 8, dy = 10) => { ctx.save(); ctx.translate(dx, dy); ctx.globalAlpha *= .18; fn('#000'); ctx.restore(); fn(null); };
// flat pictogram person
function picto(x, y, s, col, a = 1, armsUp = 0) { if (a <= 0) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.fillStyle = col; ctx.strokeStyle = INKC; ctx.lineWidth = 6 / s * s; ctx.lineJoin = 'round';
  ctx.beginPath(); ctx.arc(0, -62, 18, 0, 7); ctx.fill(); ctx.stroke(); ctx.beginPath(); ctx.roundRect(-20, -40, 40, 52, 14); ctx.fill(); ctx.stroke(); ctx.beginPath(); ctx.roundRect(-17, 8, 14, 38, 6); ctx.roundRect(3, 8, 14, 38, 6); ctx.fill(); ctx.stroke();
  ctx.lineCap = 'round'; ctx.lineWidth = 10; ctx.beginPath(); if (armsUp) { ctx.moveTo(-18, -34); ctx.lineTo(-10, -100); ctx.moveTo(18, -34); ctx.lineTo(10, -100); } else { ctx.moveTo(-20, -34); ctx.lineTo(-30, 0); ctx.moveTo(20, -34); ctx.lineTo(30, 0); } ctx.strokeStyle = INKC; ctx.stroke(); ctx.lineWidth = 5; ctx.strokeStyle = col; ctx.stroke(); ctx.restore(); }
// ---------- when: flat map ----------
const US = [[.02, .04], [.0, .34], [.05, .6], [.14, .79], [.25, .84], [.41, .86], [.49, .98], [.58, .88], [.69, .85], [.79, .86], [.85, 1.0], [.88, .8], [.92, .62], [.96, .44], [1.0, .26], [.96, .1], [.87, .26], [.76, .22], [.64, .14], [.56, .04]];
function mapScreen(t) { const t0 = S.when.start; ctx.fillStyle = BEIGE; ctx.fillRect(0, 0, W, H); ctx.fillStyle = '#e4dfd3'; ctx.fillRect(0, 1540, W, 380); ctx.fillStyle = INKC; ctx.fillRect(0, 1540, W, 5);
  const z = 1 + .05 * pr(t, t0, S.party.start); ctx.save(); ctx.translate(540, 800); ctx.scale(z, z); ctx.translate(-540, -800);
  const ox = 100, oy = 520, mw = 880, mh = 470, a = E.out(pr(t, t0, t0 + .45));
  const path = c => { ctx.beginPath(); US.forEach(([u, v], i) => { const x = ox + u * mw, y = oy + v * mh; i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); }); ctx.closePath(); };
  ctx.globalAlpha = a; ctx.save(); ctx.translate(8, 10); path(); ctx.fillStyle = 'rgba(0,0,0,.15)'; ctx.fill(); ctx.restore(); path(); ctx.fillStyle = '#b9c99a'; ctx.fill(); ctx.lineWidth = 6; ctx.lineJoin = 'round'; ctx.strokeStyle = INKC; ctx.stroke();
  ctx.save(); path(); ctx.clip(); ctx.setLineDash([14, 12]); ctx.strokeStyle = 'rgba(31,36,48,.28)'; ctx.lineWidth = 3; [.2, .38, .52, .68, .82].forEach(u => { ctx.beginPath(); ctx.moveTo(ox + u * mw, oy); ctx.lineTo(ox + u * mw + 20, oy + mh); ctx.stroke(); }); [.3, .55].forEach(v => { ctx.beginPath(); ctx.moveTo(ox, oy + v * mh); ctx.lineTo(ox + mw, oy + v * mh + 10); ctx.stroke(); }); ctx.restore(); ctx.setLineDash([]);
  txt('미국', ox + .25 * mw, oy + .45 * mh, 64, INKC, null, 0, 'center', a); ctx.globalAlpha = 1;
  const kx = ox + .52 * mw, ky = oy + .41 * mh, pa = pop(t, t0 + .4); if (pa > 0) { ring(kx, ky, t, t0 + .5, RED); ticks(kx, ky, t, t0 + .5, 1.2, RED); ctx.save(); ctx.translate(kx, ky); ctx.scale(pa, pa); ctx.fillStyle = RED; ctx.strokeStyle = INKC; ctx.lineWidth = 6; ctx.beginPath(); ctx.arc(0, -60, 34, Math.PI * .8, Math.PI * 2.2); ctx.lineTo(0, 0); ctx.closePath(); ctx.fill(); ctx.stroke(); ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(0, -62, 13, 0, 7); ctx.fill(); ctx.restore(); pill('캔자스시티', kx + 120, ky - 120, pa, '#fff', 48); }
  ctx.restore();
  // hotel card
  const ha = pop(t, C.kc + .1, .45); if (ha > 0) { ctx.save(); ctx.translate(540, 1460); ctx.scale(ha, ha); sh(c => { ctx.fillStyle = c || '#fbf9f4'; ctx.beginPath(); ctx.roundRect(-330, -110, 660, 210, 24); ctx.fill(); if (!c) { ctx.lineWidth = 6; ctx.strokeStyle = INKC; ctx.stroke(); } });
    // tiny flat hotel: tower + glass atrium
    ctx.fillStyle = '#5d7290'; ctx.fillRect(-300, -90, 110, 170); ctx.strokeStyle = INKC; ctx.lineWidth = 5; ctx.strokeRect(-300, -90, 110, 170); ctx.fillStyle = '#ffe2a8'; for (let r = 0; r < 5; r++) for (let c = 0; c < 3; c++) ctx.fillRect(-290 + c * 34, -80 + r * 32, 22, 18);
    ctx.fillStyle = '#cfe0e6'; ctx.beginPath(); ctx.moveTo(-190, 80); ctx.lineTo(-190, -10); ctx.lineTo(-120, -50); ctx.lineTo(-120, 80); ctx.closePath(); ctx.fill(); ctx.stroke();
    txt('하얏트 리젠시 호텔', 70, -10, 56, INKC, null); txt('로비 = 4층 높이 유리 천장', 70, 60, 36, '#5a5f6a', null); ctx.restore(); }
  txt('1981년 7월 17일', 540, 470, 64, INKC, null, 0, 'center', pop(t, t0 + .1)); }
// ---------- toll: data pictograms ----------
function tollScreen(t) { const t0 = S.toll.start; bg('#151b2e', 'rgba(255,255,255,.04)', t);
  // dead: 100 icons (10x10) left, hurt: 180 icons right (wave in)
  const nd = Math.floor(100 * E.out(pr(t, C.dead + .1, C.dead + 1.2))), nh = Math.floor(180 * E.out(pr(t, C.hurt + .1, C.hurt + 1.2)));
  for (let i = 0; i < 100; i++) { const c = i % 10, r = Math.floor(i / 10); picto(110 + c * 34, 700 + r * 46, .38, i < nd ? '#c9a0a8' : 'rgba(255,255,255,.08)', 1); }
  for (let i = 0; i < 180; i++) { const c = i % 12, r = Math.floor(i / 12); picto(600 + c * 33, 700 + r * 31, .3, i < nh ? '#8aa4c4' : 'rgba(255,255,255,.06)', 1); }
  txt('숨진 사람', 270, 450, 50, '#fff', '#000', 6, 'center', pop(t, t0 + .05)); txt('다친 사람', 795, 450, 50, '#fff', '#000', 6, 'center', pop(t, C.hurt));
  if (t > C.dead + .3) slam('100명+', 270, 570, 110, YEL, t, C.dead + .3); if (t > C.hurt + .3) slam('180명+', 795, 570, 110, '#cfe0f6', t, C.hurt + .3);
  pill('미국 손꼽히는 구조물 붕괴 참사', 540, 1440, pop(t, C.hurt + .8), '#fff', 44); }
// ---------- rope analogy (flat) ----------
function ropeScreen(t) { const t0 = S.rope.start; ctx.fillStyle = BEIGE; ctx.fillRect(0, 0, W, H); ctx.fillStyle = '#e4dfd3'; ctx.fillRect(0, 1540, W, 380); ctx.fillStyle = INKC; ctx.fillRect(0, 1540, W, 5);
  // ceiling beam
  ctx.fillStyle = '#9a6a3a'; ctx.fillRect(60, 470, 960, 40); ctx.strokeStyle = INKC; ctx.lineWidth = 6; ctx.strokeRect(60, 470, 960, 40);
  const panelA = (x, title, col, a) => { if (a <= 0) return; ctx.save(); ctx.globalAlpha = cl(a * 2); txt(title, x, 600, 52, col, null); ctx.restore(); };
  // left: one rope, two people both hold rope
  const la = pop(t, t0 + .05); panelA(290, '원래: 밧줄 하나', TEAL, la);
  if (la > 0) { const sw = Math.sin(t * 2) * 4; ctx.save(); ctx.globalAlpha = cl(la * 2); ctx.strokeStyle = '#c9a46a'; ctx.lineWidth = 14; ctx.beginPath(); ctx.moveTo(290, 510); ctx.lineTo(290 + sw, 1140); ctx.stroke(); ctx.strokeStyle = INKC; ctx.lineWidth = 3; ctx.stroke();
    picto(290 + sw * .3, 830, 1.7, '#2f7f7c', 1, 1); picto(290 + sw * .8, 1110, 1.7, '#d9a441', 1, 1); ctx.restore(); check(420, 700, 44, pr(t, t0 + .8, t0 + 1.1)); txt('각자 밧줄을 잡음', 290, 1440, 40, INKC, null, 0, 'center', la); }
  // divider
  ctx.strokeStyle = 'rgba(31,36,48,.25)'; ctx.lineWidth = 4; ctx.setLineDash([16, 14]); ctx.beginPath(); ctx.moveTo(540, 560); ctx.lineTo(540, 1180); ctx.stroke(); ctx.setLineDash([]);
  // right: rope ends at top person; bottom person hangs from his ankle
  const ra = pop(t, C.low - .1); panelA(790, '바뀐 뒤', RED, ra);
  if (ra > 0) { const strain = pr(t, C.ankle, C.ankle + .8); const sw = Math.sin(t * 2.4) * 4; ctx.save(); ctx.globalAlpha = cl(ra * 2); ctx.strokeStyle = '#c9a46a'; ctx.lineWidth = 14; ctx.beginPath(); ctx.moveTo(790, 510); ctx.lineTo(790 + sw, 680); ctx.stroke(); ctx.strokeStyle = INKC; ctx.lineWidth = 3; ctx.stroke();
    picto(790 + sw, 830, 1.7, '#2f7f7c', 1, 1); const dy = 14 * strain; picto(790 + sw * 1.4, 1100 + dy, 1.7, '#d9a441', 1, 1);
    // hands to ankle link
    ctx.strokeStyle = INKC; ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(768 + sw, 905); ctx.lineTo(772 + sw * 1.3, 935 + dy); ctx.moveTo(812 + sw, 905); ctx.lineTo(808 + sw * 1.3, 935 + dy); ctx.stroke(); ctx.restore();
    if (strain > 0) { ctx.save(); ctx.globalAlpha = strain; ctx.strokeStyle = RED; ctx.lineWidth = 7; ctx.lineCap = 'round'; for (let k = 0; k < 3; k++) { const yy = 640 + k * 34; ctx.beginPath(); ctx.moveTo(840, yy); ctx.lineTo(880 + Math.sin(t * 30 + k) * 6, yy - 10); ctx.stroke(); ctx.beginPath(); ctx.moveTo(740, yy); ctx.lineTo(700 - Math.sin(t * 30 + k) * 6, yy - 10); ctx.stroke(); } ctx.restore(); pill('손 하나가 2명 무게', 790, 1440, pop(t, C.ankle + .5), RED, 40, '#fff'); }
    xMark(930, 760, 44, pr(t, C.ankle + 1.0, C.ankle + 1.3)); }
  txt('개념도', 980, 1500, 32, '#7a7f8a', null); }
// ---------- overlays on 3D ----------
function overlays(t, md, vt) {
  if (md == 'atrium' && t < C.rewind) { slam('100명+', 540, 640, 190, YEL, t, .15); pill('호텔 로비 위 공중 통로', 540, 1450, pop(t, C.rewind - 3.0), '#fff', 46); }
  if (md == 'atrium' && t >= S.party.start && t < S.walk.start) { callout('댄스 파티', [-7, 1.6, 7], 300, 640, pop(t, C.dance + .2), YEL);
    for (let k = 0; k < 5; k++) { const u = ((t * .5 + k * .2) % 1); const [nx, ny] = proj(8 + (k - 2) * .6, 2 + u * 3, 6.4); { ctx.save(); ctx.globalAlpha = Math.sin(u * Math.PI); ctx.fillStyle = '#fff'; ctx.strokeStyle = INKC; ctx.lineWidth = 5; ctx.beginPath(); ctx.ellipse(nx, ny, 18, 13, -.4, 0, 7); ctx.fill(); ctx.stroke(); ctx.fillRect(nx + 12, ny - 60, 7, 60); ctx.strokeRect(nx + 12, ny - 60, 7, 60); ctx.restore(); } } }
  if (md == 'atrium' && t >= S.walk.start && t < S.fall.start) { if (t < C.walks + .3) callout('쇠막대', wp(atr, -2.08, 12.6, 1.35), 780, 600, pop(t, C.rods + .3), YEL);
    if (t > C.walks - .1) { callout('4층 통로', wp(W4, 4, .5, 1.1), 300, 560, pop(t, C.walks + .1), '#fff'); callout('2층 통로', wp(W2, 5, .5, 1.1), 820, 1020, pop(t, C.walks + .5), '#fff'); }
    if (t > C.crowd + .2) callout('구경꾼', wp(ON4[5].g, 0, 1.9, 0), 800, 760, pop(t, C.crowd + .3), YEL); }
  if (md == 'atrium' && t >= S.fall.start && t < S.toll.start) { // clock
    const ca = pop(t, S.fall.start + .1); if (ca > 0) { ctx.save(); ctx.translate(900, 520); ctx.scale(ca, ca); ctx.fillStyle = '#fbf9f4'; ctx.strokeStyle = INKC; ctx.lineWidth = 7; ctx.beginPath(); ctx.arc(0, 0, 80, 0, 7); ctx.fill(); ctx.stroke(); ctx.lineCap = 'round'; ctx.lineWidth = 9; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(Math.cos(-Math.PI / 2 + (7 + 5 / 60) / 12 * 6.283) * 44, Math.sin(-Math.PI / 2 + (7 + 5 / 60) / 12 * 6.283) * 44); ctx.stroke(); ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(Math.cos(-Math.PI / 2 + 5 / 60 * 6.283) * 64, Math.sin(-Math.PI / 2 + 5 / 60 * 6.283) * 64); ctx.stroke(); ctx.restore(); txt('오후 7:05', 900, 650, 50, '#fff', '#000', 7, 'center', ca); }
    if (t > C.snap - .1) slam('툭!', 330, 600, 150, RED, t, C.snap - .05, '#fff'); if (t > C.hit) slam('쾅!', 680, 820, 170, YEL, t, C.hit + .4);
    if (t > C.hit + .9) pill('4층 + 2층 함께 추락', 540, 1450, pop(t, C.hit + .9), RED, 48, '#fff'); }
  if (md == 'lab') { txt('CONCEPT DIAGRAM | 개념도', 60, 470, 30, 'rgba(255,255,255,.8)', null, 0, 'left');
    if (t < S.change.start) { callout('천장', wp(lab, 2.6, 11.3, 2), 860, 560, pop(t, S.design.start + .3), '#fff'); if (t > C.rod1 - .1) callout('긴 쇠막대 1개', wp(lab, 0, 8.6, 1.5), 300, 640, pop(t, C.rod1 + .1), YEL);
      if (t > C.thread) { callout('4층 통로', wp(lab, 2.4, 6.2, 1.6), 860, 900, pop(t, C.thread + .2), '#fff'); callout('2층 통로', wp(lab, 2.4, 1.2, 1.6), 860, 1060, pop(t, C.thread + .6), '#fff'); }
      card2('원래', TEAL, '막대 1개가 두 통로를 꿴다', pop(t, C.thread + .9)); }
    if (t >= S.change.start && t < S.hang.start) { pill('공사 중 변경', 540, 560, pop(t, S.change.start + .1), RED, 50, '#fff'); if (t > C.easy + .1 && t < C.split - .4) stamp('조립 편하게', 760, 720, pr(t, C.easy + .1, C.easy + .4), RED, 74);
      const sc = pr(t, C.split - .55, C.split - .2) * (1 - pr(t, C.split + .1, C.split + .4)); if (sc > 0) { const [sx, sy] = proj(...wp(lab, 0, 6.6, 1.5)); txt('싹둑', sx + 110, sy, 80, '#fff', '#000', 8, 'center', sc); }
      if (t > C.split + .2) { callout('위 막대', wp(lab, -.2, 8.4, 1.5), 260, 640, pop(t, C.split + .3), YEL); callout('아래 막대', wp(lab, .25, 3.2, 1.5), 830, 1040, pop(t, C.split + .6), ORG, '#fff'); }
      card2('변경', RED, '막대 1개를 2개로', pop(t, C.split + .2)); }
    if (t >= S.hang.start && t < S.rope.start) { const fa = pr(t, C.carry, C.carry + .4); flow([wp(lab, .2, .5, 1.5), wp(lab, .2, 6.1, 1.5), wp(lab, -.2, 5.5, 1.5), wp(lab, -.2, 11, 1.5)], t, ORG, fa, 1.1);
      callout('2층 무게가 4층으로', wp(lab, .2, 3.4, 1.5), 820, 1040, pop(t, C.carry + .3), ORG, '#fff'); callout('위 통로', wp(lab, -2.2, 6.3, 1.6), 270, 600, pop(t, S.hang.start + .2), YEL);
      card2('결과', RED, '4층 통로가 2층을 들고 버팀', pop(t, C.carry + .9)); }
    if (t >= S.double.start && t < S.nut.start) { callout('4층 연결부', wp(lab, -.2, 5.45, 1.5), 300, 620, pop(t, S.double.start + .2), YEL);
      const [nx, ny] = proj(...wp(lab, -.2, 5.3, 1.5)); [[0, '4층 무게', '#fff'], [1, '2층 무게', ORG]].forEach(([k, lab2, col]) => { const a = pop(t, S.double.start + .5 + k * .8); if (a <= 0) return; const x = 760 + k * 170, y0 = 620; ctx.save(); ctx.globalAlpha = cl(a); ctx.lineCap = 'round'; [[INKC, 26], [col, 14]].forEach(([c, w]) => { ctx.strokeStyle = c; ctx.lineWidth = w; ctx.beginPath(); ctx.moveTo(x, y0); ctx.lineTo(x, y0 + 200 * a); ctx.stroke(); ctx.beginPath(); ctx.moveTo(x - 34, y0 + 170 * a); ctx.lineTo(x, y0 + 212 * a); ctx.lineTo(x + 34, y0 + 170 * a); ctx.stroke(); }); ctx.restore(); txt(lab2, x, y0 - 30, 40, col, '#000', 6, 'center', a); });
      if (t > C.x2) slam('거의 2배', 540, 1440, 130, YEL, t, C.x2 + .05); }
    if (t >= S.nut.start && t < S.outro.start) { if (t < C.out) callout('너트', wp(lab, -.2, 5.47, 1.5), 300, 600, pop(t, S.nut.start + .1), '#fff');
      if (t > C.pierce) { const [cx, cy] = proj(...wp(lab, -.2, 5.4, 1.5)); ring(cx, cy, t, C.pierce, RED); ring(cx, cy, t, C.pierce + .5, RED); }
      if (t > C.out) slam('쑥!', 760, 640, 150, RED, t, C.out + .05, '#fff'); card2('붕괴', RED, '너트가 철골을 뚫고 빠짐', pop(t, C.pierce + .3)); } }
  if (md == 'atrium' && t >= S.outro.start) { ctx.fillStyle = 'rgba(14,10,24,.42)'; ctx.fillRect(0, 520, W, 640);
    const a2 = pop(t, C.o2); if (a2 > 0) { ctx.save(); ctx.globalAlpha = cl(a2); for (let k = 0; k < 5; k++) picto(340 + k * 100, 870, .9, '#cfc4d8', 1); ctx.restore(); xMark(540, 830, 90, pr(t, C.o2 + .9, C.o2 + 1.2)); }
    if (t > C.o3) callout('둘로 자른 막대', wp(atr, -2.08, 11.4, 1.35), 300, 620, pop(t, C.o3), YEL);
    if (t > C.o4) slam('그 편리함', 540, 1080, 140, YEL, t, C.o4 + .15); }
}
function grade(t, md, vt) { const g = ctx.createRadialGradient(540, 960, 520, 540, 960, 1250); g.addColorStop(0, 'rgba(40,20,60,0)'); g.addColorStop(1, 'rgba(40,20,60,.38)'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  if (md == 'atrium' && t >= S.party.start && t < S.fall.start + .5) { ctx.fillStyle = 'rgba(160,120,60,.16)'; ctx.fillRect(0, 0, W, H); }
  if (md == 'atrium' && (vt > C.hit + .2) && t < S.outro.start) { ctx.fillStyle = `rgba(40,20,70,${.25 * pr(vt, C.hit + .2, C.hit + 1)})`; ctx.fillRect(0, 0, W, H); } }
const TAGS = () => [[S.party.start, S.walk.start, '1981년 7월 17일 금요일 저녁'], [S.walk.start, S.fall.start, '로비 위 공중 통로'], [S.fall.start, S.toll.start, '오후 7시 5분'], [S.toll.start, S.twist.start, '사고 결과'], [S.design.start, S.change.start, '원래 설계'], [S.change.start, S.hang.start, '공사 중 바뀐 설계'], [S.hang.start, S.rope.start, '바뀐 설계의 결과'], [S.rope.start, S.double.start, '비유하면'], [S.double.start, S.outro.start, '4층 연결부']];
function chrome(t) { const g = ctx.createLinearGradient(0, 0, 0, 520); g.addColorStop(0, 'rgba(5,8,15,.55)'); g.addColorStop(1, 'rgba(5,8,15,0)'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, 520);
  const ta = t < C.rewind ? 1 - pr(t, C.rewind - .3, C.rewind) : pr(t, S.outro.start, S.outro.start + .4);
  if (ta > 0) { txt('알고 보면 다른 사건', 540, 236, 62, '#fff', '#000', 10, 'center', ta); txt('하얏트 공중 통로 붕괴', 540, 350, 96, YEL, '#000', 12, 'center', ta); }
  TAGS().forEach(([a, b, s]) => { if (t >= a && t < b) pill(s, 540, 300, pop(t, a + .1), '#ffffff', 46); });
  const g2 = ctx.createLinearGradient(0, 1100, 0, 1920); g2.addColorStop(0, 'rgba(10,15,30,0)'); g2.addColorStop(1, 'rgba(10,15,30,.45)'); ctx.fillStyle = g2; ctx.fillRect(0, 1100, W, 820);
  txt('출처: 미국 NBS(NIST) 조사 보고서, 브리태니커, 린다 홀 도서관, STRUCTURE지, KCTV5', 540, 1700, 28, '#fff', '#000', 5); }
function ticks(x, y, t, t0, every, col) { if (t < t0) return; for (let k = 0; k < 3; k++) { const s = t0 + (Math.floor((t - t0) / every) - k) * every; ring(x, y, t, s, col); } }
function flashes(t) { const fl = pr(t, C.rewind - .25, C.rewind) * (1 - pr(t, C.rewind, C.rewind + .35)); if (fl > 0) { ctx.fillStyle = `rgba(255,255,255,${fl})`; ctx.fillRect(0, 0, W, H); }
  if (t > C.rewind - .6 && t < C.rewind + .45) txt('◀◀', 540, 900, 160, '#fff', '#000', 12, 'center', pr(t, C.rewind - .6, C.rewind - .3) * (1 - pr(t, C.rewind, C.rewind + .45)));
  [S.party.start, S.toll.start, S.twist.start, S.design.start, S.rope.start, S.double.start, S.outro.start].forEach(c => { const f = 1 - pr(t, c, c + .18); if (t >= c && f > 0) { ctx.fillStyle = `rgba(255,255,255,${f * .7})`; ctx.fillRect(0, 0, W, H); } }); }
const capOn = t => !(t >= S.twist.start && t < S.design.start);
function draw(t) { const st = state(t); camAt(t); ctx.clearRect(0, 0, W, H); const md = st.md;
  if (md == 'atrium' || md == 'lab') render3(); else if (md == 'map') mapScreen(t); else if (md == 'toll') tollScreen(t); else if (md == 'rope') ropeScreen(t);
  else if (md == 'typo') { bg('#2457d6', 'rgba(255,255,255,.08)', t); slam('그런데 말이죠', 540, 960, 150, '#fff', t, S.twist.start + .02); }
  grade(t, md, st.vt); overlays(t, md, st.vt); chrome(t); flashes(t); if (capOn(t)) caption(t); }
window.seek = async t => draw(t);
TL = await (await fetch(TLFILE)).json();
S = {}; TL.scenes.forEach(s => S[s.name] = s); C = TL.cues; KW = TL.keywords; CHUNKS = TL.lines.flatMap(l => l.chunks);
draw(+(new URLSearchParams(location.search).get('t') || 0)); window.TOTAL = TL.TOTAL; window.ready = true;
</script></body></html>
