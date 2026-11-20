<!doctype html>
<html><head><meta charset="utf-8">
<style>@font-face{font-family:Jua;src:url(fonts/Jua-Regular.ttf)} html,body{margin:0;background:#000} canvas{display:block}</style>
<script type="importmap">{"imports":{"three":"./node_modules/three/build/three.module.js","three/addons/":"./node_modules/three/examples/jsm/"}}</script>
</head><body><canvas id="out" width="1080" height="1920"></canvas>
<script type="module">
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
const W = 1080, H = 1920, YEL = 'rgb(255,230,0)';
let TL, S, C, CHUNKS, KW;
await document.fonts.load('80px Jua'); await document.fonts.ready;
const cl = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x)), pr = (t, a, b) => cl((t - a) / (b - a)), lerp = (a, b, p) => a + (b - a) * p;
const E = { io: x => x < .5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2, out: x => 1 - Math.pow(1 - x, 3), back: x => { const c1 = 1.6, c3 = c1 + 1; return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2); } };
const pop = (t, t0, d = .35) => t < t0 ? 0 : E.back(pr(t, t0, t0 + d));
let sd = 11; const rnd = () => { sd = (sd * 16807) % 2147483647; return sd / 2147483647; };
// ---------------- renderer ----------------
const glc = document.createElement('canvas'); glc.width = W; glc.height = H;
const R = new THREE.WebGLRenderer({ canvas: glc, antialias: true, preserveDrawingBuffer: true });
R.setSize(W, H, false); R.shadowMap.enabled = true; R.shadowMap.type = THREE.PCFSoftShadowMap;
R.toneMapping = THREE.ACESFilmicToneMapping; R.toneMappingExposure = 1.05; R.outputColorSpace = THREE.SRGBColorSpace;
const scene = new THREE.Scene(); scene.background = new THREE.Color(0xe8e0d4);
const cam = new THREE.PerspectiveCamera(45, W / H, .1, 200);
const M = (c, o = {}) => new THREE.MeshStandardMaterial({ color: c, roughness: .8, flatShading: true, ...o });
function mesh(g, m) { const x = new THREE.Mesh(g, m); x.castShadow = true; x.receiveShadow = true; return x; }
function add(o, x = 0, y = 0, z = 0, p = scene) { o.position.set(x, y, z); p.add(o); return o; }
const box = (w, h, d, c, r = 0) => mesh(r ? new RoundedBoxGeometry(w, h, d, 2, r) : new THREE.BoxGeometry(w, h, d), typeof c == 'number' ? M(c) : c);
const cyl = (r0, r1, h, c, s = 12) => mesh(new THREE.CylinderGeometry(r0, r1, h, s), typeof c == 'number' ? M(c) : c);
const group = (x = 0, y = 0, z = 0, p = scene) => add(new THREE.Group(), x, y, z, p);
const lathe = (pts, m, seg = 16) => mesh(new THREE.LatheGeometry(pts.map(([r, y]) => new THREE.Vector2(r, y)), seg), m);
function canvasTex(w, h, fn, rx = 1, ry = 1) { const c = document.createElement('canvas'); c.width = w; c.height = h; fn(c.getContext('2d'), w, h); const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(rx, ry); t.anisotropy = 4; return t; }
const tile = (c1, c2, n, gr) => canvasTex(512, 512, (x, w, h) => { const s = w / n; for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) { x.fillStyle = (i + j) % 2 ? c1 : c2; x.fillRect(i * s, j * s, s, s); const g = x.createLinearGradient(i * s, j * s, i * s + s, j * s + s); g.addColorStop(0, 'rgba(255,255,255,.35)'); g.addColorStop(.5, 'rgba(255,255,255,0)'); x.fillStyle = g; x.fillRect(i * s, j * s, s, s); } x.strokeStyle = gr; x.lineWidth = 5; for (let k = 0; k <= n; k++) { x.beginPath(); x.moveTo(k * s, 0); x.lineTo(k * s, h); x.stroke(); x.beginPath(); x.moveTo(0, k * s); x.lineTo(w, k * s); x.stroke(); } });
function tubeOf(pts, r, mat) { const c = new THREE.CatmullRomCurve3(pts.map(p => new THREE.Vector3(...p))); const m = mesh(new THREE.TubeGeometry(c, 60, r, 12, false), mat); return { m, c }; }
function person(col) { const g = new THREE.Group(); const body = M(col), skin = M(0xf1c7a6), hair = M(0x2a1f1a), pants = M(0x2b3140);
  [-1, 1].forEach(s => add(cyl(.11, .1, .75, pants, 6), s * .13, .38, 0, g)); add(box(.5, .7, .32, body, .12), 0, 1.08, 0, g); [-1, 1].forEach(s => add(cyl(.08, .07, .62, body, 6), s * .33, 1.05, 0, g).rotation.z = s * .12);
  add(mesh(new THREE.SphereGeometry(.24, 10, 8), skin), 0, 1.68, 0, g); add(mesh(new THREE.SphereGeometry(.25, 10, 6, 0, Math.PI * 2, 0, Math.PI * .45), hair), 0, 1.72, -.02, g);
  [-1, 1].forEach(s => add(mesh(new THREE.SphereGeometry(.03, 6, 6), M(0x111111)), s * .08, 1.7, .22, g)); scene.add(g); return g; }
