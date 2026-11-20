const out = document.getElementById('out'), ctx = out.getContext('2d');
function txt(t, x, y, size, f, s = '#000', sw = 10, al = 'center', a = 1) { if (a <= 0) return; ctx.save(); ctx.globalAlpha *= a; ctx.font = `${size}px Jua`; ctx.textAlign = al; ctx.lineJoin = 'round'; if (s) { ctx.lineWidth = sw; ctx.strokeStyle = s; ctx.strokeText(t, x, y); } ctx.fillStyle = f; ctx.fillText(t, x, y); ctx.restore(); }
function proj(x, y, z) { const v = new THREE.Vector3(x, y, z).project(cam); return [(v.x + 1) / 2 * W, (1 - v.y) / 2 * H]; }
function pill(t, x, y, a, bg = '#f0c419', size = 44, fg = '#1f2430') { if (a <= 0) return; ctx.save(); ctx.font = `${size}px Jua`; const w = ctx.measureText(t).width + 44; ctx.translate(x, y); ctx.scale(a, a); ctx.fillStyle = 'rgba(0,0,0,.25)'; ctx.beginPath(); ctx.roundRect(-w / 2 + 6, -size * .85 + 8, w, size * 1.5, 16); ctx.fill(); ctx.fillStyle = bg; ctx.beginPath(); ctx.roundRect(-w / 2, -size * .85, w, size * 1.5, 16); ctx.fill(); ctx.lineWidth = 5; ctx.strokeStyle = '#1f2430'; ctx.stroke(); ctx.fillStyle = fg; ctx.textAlign = 'center'; ctx.fillText(t, 0, size * .2); ctx.restore(); }
function xMark(x, y, s, a) { if (a <= 0) return; const k = E.back(cl(a)); ctx.save(); ctx.translate(x, y); ctx.scale(k * s / 60, k * s / 60); [['#1f2430', 34], ['#d9443a', 20]].forEach(([c, w]) => { ctx.strokeStyle = c; ctx.lineWidth = w; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-50, -50); ctx.lineTo(50, 50); ctx.moveTo(50, -50); ctx.lineTo(-50, 50); ctx.stroke(); }); ctx.restore(); }
function check(x, y, r, a) { if (a <= 0) return; ctx.save(); ctx.translate(x, y); ctx.scale(E.back(cl(a)), E.back(cl(a))); ctx.fillStyle = '#2f7f7c'; ctx.beginPath(); ctx.arc(0, 0, r, 0, 7); ctx.fill(); ctx.lineWidth = 6; ctx.strokeStyle = '#1f2430'; ctx.stroke(); ctx.strokeStyle = '#fff'; ctx.lineWidth = r * .22; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.beginPath(); ctx.moveTo(-r * .43, 0); ctx.lineTo(-r * .1, r * .33); ctx.lineTo(r * .5, -r * .37); ctx.stroke(); ctx.restore(); }
function ring(x, y, t, t0, col = '#ffdf3a') { const p = pr(t, t0, t0 + .7); if (p <= 0 || p >= 1) return; ctx.save(); ctx.globalAlpha = 1 - p; ctx.strokeStyle = col; ctx.lineWidth = 12; for (let k = 0; k < 2; k++) { ctx.beginPath(); ctx.arc(x, y, 30 + p * 140 + k * 30, 0, 7); ctx.stroke(); } ctx.restore(); }
// callout: label with leader line to a 3D point
function callout(label, P3, lx, ly, a, bg = '#ffffff', fg = '#1f2430', size = 44) { if (a <= 0) return; const [px, py] = proj(...P3); const k = E.out(cl(a));
  ctx.save(); ctx.globalAlpha = cl(a * 2); ctx.strokeStyle = '#1f2430'; ctx.lineWidth = 9; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(lx, ly); ctx.lineTo(lerp(lx, px, k), lerp(ly, py, k)); ctx.stroke(); ctx.strokeStyle = '#fff'; ctx.lineWidth = 4; ctx.stroke();
  ctx.fillStyle = '#fff'; ctx.strokeStyle = '#1f2430'; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(px, py, 11 * k, 0, 7); ctx.fill(); ctx.stroke(); ctx.restore(); pill(label, lx, ly, E.back(cl(a)), bg, size, fg); }
// flow arrows along projected 3D path
function flow(pts3, t, col, a, speed = 1, stopAt = 1) { if (a <= 0) return; const P = pts3.map(p => proj(...p)); const L = []; let tot = 0; for (let i = 1; i < P.length; i++) { const d = Math.hypot(P[i][0] - P[i - 1][0], P[i][1] - P[i - 1][1]); L.push(d); tot += d; }
  const at = u => { let d = u * tot; for (let i = 0; i < L.length; i++) { if (d <= L[i]) { const q = d / L[i]; return [lerp(P[i][0], P[i + 1][0], q), lerp(P[i][1], P[i + 1][1], q), Math.atan2(P[i + 1][1] - P[i][1], P[i + 1][0] - P[i][0])]; } d -= L[i]; } const n = P.length - 1; return [P[n][0], P[n][1], 0]; };
  ctx.save(); ctx.globalAlpha = a; for (let k = 0; k < 6; k++) { const u = ((t * .5 * speed + k / 6) % 1) * stopAt; const [x, y, an] = at(u); ctx.save(); ctx.translate(x, y); ctx.rotate(an); ctx.fillStyle = col; ctx.strokeStyle = '#1f2430'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(22, 0); ctx.lineTo(-14, -18); ctx.lineTo(-6, 0); ctx.lineTo(-14, 18); ctx.closePath(); ctx.fill(); ctx.stroke(); ctx.restore(); } ctx.restore(); }
// problem / solution card (below caption)
function card(kind, body, a) { if (a <= 0) return; const col = { '문제': '#d9443a', '해결': '#2f7f7c', '개선': '#3d8fd6', '지금': '#d9a441' }[kind]; ctx.save(); ctx.translate(540, 1440); const k = E.back(cl(a)); ctx.scale(k, k);
  ctx.font = '44px Jua'; const w = Math.max(560, ctx.measureText(body).width + 220); ctx.fillStyle = 'rgba(0,0,0,.3)'; ctx.beginPath(); ctx.roundRect(-w / 2 + 8, -58, w, 116, 22); ctx.fill();
  ctx.fillStyle = '#fbf9f4'; ctx.beginPath(); ctx.roundRect(-w / 2, -66, w, 116, 22); ctx.fill(); ctx.lineWidth = 6; ctx.strokeStyle = '#1f2430'; ctx.stroke();
  ctx.fillStyle = col; ctx.beginPath(); ctx.roundRect(-w / 2, -66, 150, 116, [22, 0, 0, 22]); ctx.fill(); ctx.stroke(); ctx.restore();
  txt(kind, 540 - w * k / 2 + 75 * k, 1440 + 8, 46 * k, '#fff', null); txt(body, 540 + 75 * k, 1440 + 8, 44 * k, '#1f2430', null); }
function caption(t) {
  const c = CHUNKS.find(c => t >= c.start && t < c.hold); if (!c) return;
  const s = c.text, runs = []; let i = 0;
  while (i < s.length) { let hit = null; for (const k of KW) if (s.startsWith(k, i) && (!hit || k.length > hit.length)) hit = k;
    if (hit) { runs.push([hit, true]); i += hit.length; } else { if (runs.length && !runs[runs.length - 1][1]) runs[runs.length - 1][0] += s[i]; else runs.push([s[i], false]); i++; } }
  let w = 0; runs.forEach(r => { ctx.font = `${r[1] ? 88 : 80}px Jua`; r.push(ctx.measureText(r[0]).width); w += r[2]; });
  const sc = w > 1000 ? 1000 / w : 1; ctx.save(); ctx.translate(540, 1250); ctx.scale(sc, sc); let px = -w / 2; runs.forEach(r => { txt(r[0], px, 0, r[1] ? 88 : 80, r[1] ? YEL : '#fff', '#000', 10, 'left'); px += r[2]; }); ctx.restore(); }


function timeline(t, a) { if (a <= 0) return; const x0 = 130, x1 = 950, y = 410, n = TLN.length - 1; ctx.save(); ctx.globalAlpha = a;
  ctx.lineCap = 'round'; ctx.strokeStyle = 'rgba(255,255,255,.55)'; ctx.lineWidth = 10; ctx.beginPath(); ctx.moveTo(x0, y); ctx.lineTo(x1, y); ctx.stroke();
  let cur = -1; TLN.forEach(([, sc], i) => { if (t >= S[sc].start) cur = i; });
  if (cur >= 0) { const xp = x0 + (x1 - x0) * cur / n; ctx.strokeStyle = YEL; ctx.beginPath(); ctx.moveTo(x0, y); ctx.lineTo(xp, y); ctx.stroke(); }
  const fs = n > 4 ? [30, 38] : [36, 44];
  TLN.forEach(([lab], i) => { const x = x0 + (x1 - x0) * i / n, on = i <= cur, now = i == cur; ctx.fillStyle = on ? YEL : '#d8d8d8'; ctx.strokeStyle = '#1f2430'; ctx.lineWidth = 5; ctx.beginPath(); ctx.arc(x, y, now ? 22 : 15, 0, 7); ctx.fill(); ctx.stroke();
    txt(lab, x, y + 62, now ? fs[1] : fs[0], on ? '#fff' : 'rgba(255,255,255,.75)', '#000', 8); }); ctx.restore(); }
function chrome(t) {
  const g = ctx.createLinearGradient(0, 0, 0, 560); g.addColorStop(0, 'rgba(10,15,30,.6)'); g.addColorStop(1, 'rgba(10,15,30,0)'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, 560);
  const ta = t < C.rewind + .4 ? 1 - pr(t, C.rewind, C.rewind + .4) : pr(t, S.outro.start, S.outro.start + .4);
  if (ta > 0) { txt(TITLE1, 540, 250, 84, '#fff', '#000', 11, 'center', ta); txt('최종 형태', 540, 368, 112, YEL, '#000', 12, 'center', ta); }
  const st = STEPS.find(([a, b]) => t >= S[a].start && t < S[b].end); if (st) pill(st[2], 540, 290, pop(t, S[st[0]].start + .05), '#ffffff', 52);
  timeline(t, t > C.rewind + .2 && t < S.outro.start ? pr(t, C.rewind + .2, C.rewind + .6) : 0);
  const g2 = ctx.createLinearGradient(0, 1100, 0, 1920); g2.addColorStop(0, 'rgba(10,15,30,0)'); g2.addColorStop(1, 'rgba(10,15,30,.55)'); ctx.fillStyle = g2; ctx.fillRect(0, 1100, W, 820);
  txt(SOURCE, 540, 1700, 28, '#fff', '#000', 5); }
function wp(g, x, y, z) { const v = new THREE.Vector3(x, y, z); g.localToWorld(v); return [v.x, v.y, v.z]; }
function ticks(x, y, t, t0, every, col) { if (t < t0) return; for (let k = 0; k < 3; k++) { const s = t0 + (Math.floor((t - t0) / every) - k) * every; ring(x, y, t, s, col); } }
function rewindFx(t) { const fl = pr(t, C.rewind - .25, C.rewind) * (1 - pr(t, C.rewind, C.rewind + .35)); if (fl > 0) { ctx.fillStyle = `rgba(255,255,255,${fl})`; ctx.fillRect(0, 0, W, H); }
  if (t > C.rewind - .6 && t < C.rewind + .4) txt('◀◀', 540, 900, 160, '#fff', '#000', 12, 'center', pr(t, C.rewind - .6, C.rewind - .3) * (1 - pr(t, C.rewind, C.rewind + .4))); }
function sizeArrow(a3, b3, a, label) { if (a <= 0) return; const [ax, ay] = proj(...a3), [bx, by] = proj(...b3); const p = E.out(cl(a)); const ex = lerp(ax, bx, p), ey = lerp(ay, by, p); ctx.save(); ctx.lineCap = 'round';
  [['#1f2430', 12], [YEL, 6]].forEach(([c, w]) => { ctx.strokeStyle = c; ctx.lineWidth = w; ctx.beginPath(); ctx.moveTo(ax, ay); ctx.lineTo(ex, ey); ctx.stroke(); }); ctx.restore(); if (label && a > .8) pill(label, (ax + bx) / 2 + 100, (ay + by) / 2, pop(a, .8, .2), YEL, 48); }
