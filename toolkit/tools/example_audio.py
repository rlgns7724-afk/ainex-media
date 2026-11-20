import json, numpy as np, wave
from scipy.signal import butter, sosfilt
SR = 48000
TL = json.load(open("timeline.json")); S = {s["name"]: s for s in TL["scenes"]}; C = TL["cues"]; T = TL["TOTAL"]
N = int(T * SR); out = np.zeros(N); rng = np.random.default_rng(7)
NARR = 10 ** (-20 / 20)
def db(x): return NARR * 10 ** (x / 20)
def tt(d): return np.arange(int(d * SR)) / SR
def env(n, a=.005, r=.1):
    e = np.ones(n); na, nr = min(n, int(a * SR)), min(n, int(r * SR))
    if na: e[:na] = np.linspace(0, 1, na)
    if nr: e[-nr:] *= np.linspace(1, 0, nr)
    return e
def bp(x, lo, hi): return sosfilt(butter(2, [lo, hi], "band", fs=SR, output="sos"), x)
def lp(x, f): return sosfilt(butter(2, f, "low", fs=SR, output="sos"), x)
def hp(x, f): return sosfilt(butter(2, f, "high", fs=SR, output="sos"), x)
def norm(x): return x / (np.sqrt(np.mean(x ** 2)) + 1e-9)
def put(x, t0, lvl):
    i = int(t0 * SR)
    if i >= N or i + len(x) <= 0: return
    if i < 0: x = x[-i:]; i = 0
    x = norm(x) * db(lvl); j = min(N, i + len(x)); out[i:j] += x[:j - i]
def sweep(d, f0, f1, kind="sin"):
    ph = 2 * np.pi * np.cumsum(np.linspace(f0, f1, int(d * SR))) / SR
    return np.sin(ph) if kind == "sin" else (np.sign(np.sin(ph)) if kind == "sq" else 2 * ((ph / (2 * np.pi)) % 1) - 1)
def whoosh(d=.45, up=True):
    n = int(d * SR); x = rng.standard_normal(n); f = np.linspace(300, 3200, n) if up else np.linspace(3200, 300, n); y = np.zeros(n)
    for k in range(0, n, 2400): y[k:k + 2400] = bp(x[k:k + 2400], max(80, f[k] * .6), min(20000, f[k] * 1.6))
    return y * np.sin(np.linspace(0, np.pi, n)) ** 1.5
def thump(d=.5, f0=110, f1=38): t = tt(d); return sweep(d, f0, f1) * np.exp(-t * 7)
def ping(f=1800, d=.5, decay=9): t = tt(d); return (np.sin(2 * np.pi * f * t) + .3 * np.sin(2 * np.pi * f * 2.01 * t)) * np.exp(-t * decay)
def pop(): t = tt(.12); return sweep(.12, 300, 900) * np.exp(-t * 35)
def tick(): x = rng.standard_normal(int(.015 * SR)); return hp(x, 2500) * np.exp(-tt(.015) * 300)
def buzzer(d=.28): t = tt(d); return lp(sweep(d, 140, 120, "sq"), 1500) * env(len(t), .005, .05)
def boom(): t = tt(1.2); return lp(rng.standard_normal(len(t)), 220) * np.exp(-t * 4) + .6 * sweep(1.2, 70, 30) * np.exp(-t * 5)
def hum(d, f=55, cut=300): t = tt(d); return (np.sin(2 * np.pi * f * t) + .5 * np.sin(2 * np.pi * f * 2 * t) + .4 * lp(rng.standard_normal(len(t)), cut)) * env(len(t), .3, .3)
def mx(*a):
    n = max(len(v) for v in a); o = np.zeros(n)
    for v in a: o[:len(v)] += v
    return o
def creak(d): n = int(d * SR); return bp(sweep(d, 180, 120, "saw"), 150, 900) * env(n, .05, .2)
def snap(): return mx(hp(rng.standard_normal(int(.08 * SR)), 2000) * np.exp(-tt(.08) * 60), .6 * thump(.2, 300, 120))
def crash(): return mx(thump(.6, 90, 40), .6 * lp(rng.standard_normal(int(.8 * SR)), 1500) * np.exp(-tt(.8) * 6))
def clack(): return mx(ping(1800, .12, 40), .5 * thump(.12, 600, 300))
def roarn(d, hi=400): n = int(d * SR); return lp(rng.standard_normal(n), hi) * env(n, .2, .4)
def drip(): return mx(ping(1400, .15, 30), .4 * ping(900, .1, 40))
def flushn(d): n = int(d * SR); return bp(rng.standard_normal(n), 300, 2500) * env(n, .05, d * .6)
def gurgle(d):
    n = int(d * SR); y = bp(rng.standard_normal(n), 150, 700) * (0.6 + .4 * np.sin(np.linspace(0, d * 40, n))); return y * env(n, .1, .4)
def steps(d):
    y = np.zeros(int(d * SR))
    for k in range(int(d * 3)):
        s = thump(.12, 160, 90); i = int(k / 3 * SR); y[i:i + len(s)] += s[:len(y) - i]
    return y

def chime(): return mx(ping(1319, .6, 5), ping(1760, .6, 5))
def ratchet(d): t = tt(d); return (np.sin(2*np.pi*14*t) > .6) * rng.normal(0, .5, len(t)) * np.exp(-((t % (1/14)) * 60))

def roarn(d, f=300): n = int(d * SR); return lp(rng.standard_normal(n), f) * env(n, .3, .6)
def murmur(d): n = int(d * SR); return bp(rng.standard_normal(n), 300, 1200) * (.6 + .4 * np.sin(2 * np.pi * 1.3 * tt(d)))
def groan(d): t = tt(d); return np.sin(2 * np.pi * (70 + 25 * np.sin(2 * np.pi * .7 * t)) * t) * env(len(t), .3, .4) * .8
def squelch(): t = tt(.35); return lp(rng.standard_normal(len(t)), 500) * np.exp(-t * 8) + .3 * np.sin(2 * np.pi * (180 - 200 * t) * t) * np.exp(-t * 6)
def roll(d): n = int(d * SR); return bp(rng.standard_normal(n), 800, 3000) * (.5 + .5 * np.abs(np.sin(2 * np.pi * 1.6 * tt(d)))) * env(n, .1, .2)
def gavel(): return mx(thump(.12, 400, 180), .5 * clack())
def shutter(): return mx(clack(), .6 * snap())
def blips(n=6, f=1600, gap=.07):
    y = np.zeros(int((n * gap + .2) * SR))
    for k in range(n): s = ping(f + (k % 3) * 300, .06, 50); i = int(k * gap * SR); y[i:i + len(s)] += s
    return y
def beeps(d, f=2400, rate=7):
    t = tt(d); return np.sin(2 * np.pi * f * t) * (np.sin(2 * np.pi * rate * t) > 0) * env(len(t), .01, .05)
def slap(): return mx(thump(.15, 500, 200), .7 * hp(rng.standard_normal(int(.06 * SR)), 1500) * np.exp(-tt(.06) * 60))
def jet(d): n = int(d * SR); t = tt(d); return (bp(rng.standard_normal(n), 400, 3000) * .6 + lp(rng.standard_normal(n), 300)) * env(n, .4, .5)
def flap(n=10, gap=.06):
    y = np.zeros(int((n * gap + .2) * SR))
    for k in range(n): s = clack(); i = int(k * gap * SR); y[i:i + len(s)] += s * .6
    return y
def alarm(d): t = tt(d); return np.sin(2 * np.pi * (700 + 300 * (np.sin(2 * np.pi * 2 * t) > 0)) * t) * env(len(t), .02, .1)
for name in ["suspect", "cause", "centers", "worse", "budget", "outro"]: put(whoosh(.45), S[name]["start"] - .25, -24)
for c in ["board", "s911", "dev", "sys", "noparts"]: put(whoosh(.4), C[c] - .2, -26)
put(jet(1.6), 0, -28); put(thump(.4, 90, 40), C["stop"], -18); put(alarm(1.2), C["stop"] + .1, -32)
put(blips(10, 1400, .1), C["h420"] + .1, -30); put(thump(.35, 160, 50), C["ban"], -16)
put(flap(10, .12), C["board"] + .2, -24); put(thump(.35, 160, 50), C["n14k"], -18); put(blips(8, 1800, .07), C["n14k"], -28)
put(pop(), C["s911"] + .1, -24); put(pop(), C["s911"] + 1.0, -24); put(chime(), C["y25"] + .7, -26)
put(hum(5, 60, 300) * .5, S["suspect"]["start"], -34); put(pop(), C["hack"] - .6, -24); put(pop(), C["foreign"], -24); put(pop(), C["ai"], -24); put(beeps(.5, 900, 6), C["culprit"], -28)
put(boom() * .6, C["twist"], -22); put(thump(.5, 120, 40), C["twist"] + .02, -18)
put(pop(), C["gov"] + .1, -24); put(buzzer(), C["gov"] + 1.2, -26); put(pop(), C["copper"], -24); put(creak(1.2) * .6, C["copper"] + .6, -30); put(pop(), C["copper"] + 1.6, -24); put(pop(), C["routine"], -24)
put(pop(), C["router"] + .3, -24); put(blips(12, 1500, .12), C["sec45"], -30); put(blips(30, 2000, .04), C["k1000"], -28); put(hum(3.5, 110, 2000) * .6, C["k1000"], -32)
put(creak(1.5), C["oldnet"], -28); put(alarm(1.4), C["fail"], -28); put(thump(.35, 200, 80), C["fail"], -16)
for i in range(22): put(ping(1200, .1, 30), C["c22"] + i * .04, -36)
for i in range(17): put(ping(500, .12, 25), C["c17"] + .1 + i * .09, -30)
put(pop(), S["worse"]["start"] + .1, -24); put(pop(), C["dev"], -24); put(thump(.35, 200, 80), C["y2006"] + 1.9, -16)
put(pop(), C["sys"] + .1, -26); put(pop(), C["floppy"] + .2, -24); put(clack(), C["floppy"] + 1.5, -20); put(snap(), C["floppy"] + 1.6, -26)
put(pop(), C["noparts"], -24); put(thump(.3, 200, 80), C["used"] + .3, -18)
put(pop(), S["budget"]["start"] + .1, -24); put(roll(1.2), C["b67"], -28); put(chime(), C["b67"] + 1.1, -24)
put(pop(), C["o1"], -26); put(thump(.35, 160, 50), C["o2"], -20); put(sweep(.25, 2000, 600) * env(int(.25 * SR), .01, .1), C["o3"], -26); put(thump(.4, 120, 40), C["o3"] + .3, -16)
put(jet(2.5), C["o3"], -30); put(mx(ping(1319, 1.2, 3), ping(1760, 1.2, 3)), C["end"], -22)
w = wave.open("out/sfx.wav", "wb"); w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR); w.writeframes((np.clip(out, -1, 1) * 32767).astype(np.int16).tobytes()); w.close()
