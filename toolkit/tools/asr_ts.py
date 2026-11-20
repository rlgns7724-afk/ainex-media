import sys, wave, json, numpy as np, sherpa_onnx
wav, d, out = sys.argv[1], sys.argv[2], sys.argv[3]
r = sherpa_onnx.OfflineRecognizer.from_sense_voice(model=f"{d}/model.onnx", tokens=f"{d}/tokens.txt", language="ko", use_itn=False, num_threads=4)
w = wave.open(wav); sr = w.getframerate()
x = np.frombuffer(w.readframes(w.getnframes()), dtype=np.int16).astype(np.float32) / 32768
# cut at given boundaries (silence midpoints) so no word is split
cuts = [float(c) for c in sys.argv[4].split(",")]
bounds = [0.0] + cuts + [len(x) / sr]
toks = []
for a, b in zip(bounds[:-1], bounds[1:]):
    s = r.create_stream(); s.accept_waveform(sr, x[int(a * sr):int(b * sr)]); r.decode_stream(s)
    res = s.result
    for tk, ts in zip(res.tokens, res.timestamps):
        toks.append([tk, round(a + ts, 3)])
    print(f"[{a:5.2f}-{b:5.2f}] {res.text}")
json.dump(toks, open(out, "w"), ensure_ascii=False)
