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
def tick(): return ping(2400, .05, 60)
def thock(): return thump(.18, 320, 140)
for name in ["belief", "truth", "scale", "study", "human", "limit", "other", "outro"]: put(whoosh(.5) * .7, S[name]["start"] - .3, -26)
put(pop(), C["kg"], -24); put(pop(), C["gecko"], -24); put(thock(), C["gecko"] + .2, -22)
put(pop(), C["glue"] + .6, -24); put(blips(8, 900, .05), C["glue2"], -30); put(pop(), C["glue2"] + .2, -24)
put(boom() * .5, C["twist"], -22); put(thump(.5, 120, 40), C["twist"] + .02, -18); put(sweep(.4, 600, 1800) * env(int(.4 * SR), .01, .1), C["twist"] + .3, -28)
put(pop(), C["size"], -24); put(pop(), C["size"] + .25, -24)
put(thock(), C["area"] - .1, -20); put(pop(), C["area"] + .5, -24); put(sweep(.4, 1200, 300) * env(int(.4 * SR), .01, .1), C["weight"], -26); put(thock(), C["x2"], -18); put(pop(), C["x2"] + 1.2, -24); put(thump(.3, 160, 60), C["x8"], -18)
put(pop(), C["q"] + .1, -24); put(pop(), C["cam"], -26)
for i in range(37): put(tick(), C["n225"] + i * .03, -36)
put(pop(), C["mite"], -24); put(pop(), C["mite"] + 1.1, -24); put(ping(1568, .4, 8), C["x200"] + .3, -24)
for i in range(5): put(thock(), C["big"] + i * .15, -24)
put(sweep(1.0, 300, 1200) * env(int(1.0 * SR), .05, .2), C["big"] + .3, -28); put(pop(), C["ratio"] + .3, -24)
put(pop(), C["h40"] + .2, -24); put(sweep(.8, 200, 600) * env(int(.8 * SR), .05, .2), C["h80"], -26); put(pop(), C["h80"] + .3, -24)
put(pop(), C["shoe"] + .1, -24); put(thump(.4, 100, 40), C["shoe"] + .3, -16); put(sweep(.5, 800, 1600) * env(int(.5 * SR), .01, .1), C["m1"], -28)
put(chime(), C["lim2"], -24); put(sweep(.7, 900, 150) * env(int(.7 * SR), .01, .2), C["lim2"] + .3, -24); put(thump(.3, 140, 50), C["lim2"] + 1.0, -18); put(buzzer(), C["lim2"] + .9, -28)
put(pop(), S["other"]["start"] + .2, -24); put(drip(), C["frog"] + .3, -22); put(pop(), C["frog"] + .4, -24); put(snap(), C["claw"] + .1, -22); put(pop(), C["claw"] + .3, -24)
put(blips(10, 1800, .08), S["outro"]["start"] + .3, -32); put(sweep(.25, 2000, 600) * env(int(.25 * SR), .01, .1), C["o2"] + .4, -26); put(thump(.4, 120, 40), C["o3"], -16); put(mx(ping(1319, 1.2, 3), ping(1760, 1.2, 3)), C["end"], -22)
w = wave.open("out/sfx.wav", "wb"); w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR); w.writeframes((np.clip(out, -1, 1) * 32767).astype(np.int16).tobytes()); w.close()
