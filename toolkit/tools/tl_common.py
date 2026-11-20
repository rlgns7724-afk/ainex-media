import json
LEAD = 0.05
def build(L, TOTAL, KW, cuesf, out):
    lines = []
    for name, ch, end in L:
        cs = []
        for i, (txt, on) in enumerate(ch):
            e = ch[i + 1][1] - LEAD if i + 1 < len(ch) else end
            cs.append({"text": txt, "start": round(on - LEAD, 3), "end": round(e, 3)})
        lines.append({"name": name, "start": cs[0]["start"], "end": end, "chunks": cs})
    allc = [c for l in lines for c in l["chunks"]]
    for i, c in enumerate(allc):
        nxt = allc[i + 1]["start"] if i + 1 < len(allc) else TOTAL
        c["hold"] = round(max(nxt, c["start"] + .5), 3)
    scenes = []
    for i, l in enumerate(lines):
        s = 0 if i == 0 else l["start"]; e = lines[i + 1]["start"] if i + 1 < len(lines) else TOTAL
        scenes.append({"name": l["name"], "start": round(s, 3), "end": round(e, 3)})
    at = lambda line, idx: next(l for l in lines if l["name"] == line)["chunks"][idx]["start"]
    cues = cuesf(at)
    json.dump({"W": 1080, "H": 1920, "FPS": 30, "TOTAL": TOTAL, "lines": lines, "scenes": scenes, "cues": {k: round(v, 3) for k, v in cues.items()}, "keywords": KW}, open(out, "w"), ensure_ascii=False, indent=1)
    for s in scenes: print(f'{s["name"]} {s["start"]:.2f}-{s["end"]:.2f}', end=' | ')
    print(); print(json.dumps({k: round(v, 2) for k, v in cues.items()}))
