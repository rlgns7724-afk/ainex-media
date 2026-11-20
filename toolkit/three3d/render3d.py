"""render3d.py probe t1 t2 ... | frames a b out.mp4"""
import sys, subprocess, json, os, http.server, threading, functools, time
from playwright.sync_api import sync_playwright
ROOT = os.path.dirname(os.path.abspath(__file__)); FPS = 30
h = functools.partial(http.server.SimpleHTTPRequestHandler, directory=ROOT); h.log_message = lambda *a: None
srv = http.server.ThreadingHTTPServer(("127.0.0.1", 0), h); threading.Thread(target=srv.serve_forever, daemon=True).start()
with sync_playwright() as p:
    b = p.chromium.launch(args=["--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"])
    pg = b.new_page(viewport={"width": 1080, "height": 1920}); errs = []
    pg.on("pageerror", lambda e: errs.append(str(e))); pg.on("console", lambda m: errs.append(m.text) if m.type == "error" else None)
    pg.goto(f"http://127.0.0.1:{srv.server_address[1]}/" + os.environ.get("PAGE","film3d.html") + "")
    try: pg.wait_for_function("window.ready === true", timeout=180000)
    except Exception: print("FAIL", errs[:5]); sys.exit(1)
    cv = pg.locator("#out")
    if sys.argv[1] == "probe":
        os.makedirs(os.path.join(ROOT, "probe"), exist_ok=True)
        for ts in sys.argv[2:]:
            t0 = time.time(); pg.evaluate(f"window.seek({float(ts)})"); cv.screenshot(path=os.path.join(ROOT, "probe", f"t_{float(ts):06.2f}.png")); print(ts, round(time.time() - t0, 2), "s")
        if errs: print("ERR", errs[:5])
    else:
        a, bb, out = int(sys.argv[2]), int(sys.argv[3]), sys.argv[4]
        ff = subprocess.Popen(["ffmpeg", "-v", "error", "-y", "-f", "image2pipe", "-framerate", str(FPS), "-c:v", "mjpeg", "-i", "-", "-c:v", "libx264", "-preset", "veryfast", "-crf", "16", "-pix_fmt", "yuv420p", out], stdin=subprocess.PIPE)
        for i in range(a, bb):
            pg.evaluate(f"window.seek({i / FPS})"); ff.stdin.write(cv.screenshot(type="jpeg", quality=95))
            if i % 60 == 0: print(out, i, flush=True)
        ff.stdin.close(); ff.wait(); print("DONE", out)
    b.close()
