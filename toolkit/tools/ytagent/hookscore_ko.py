#!/usr/bin/env python3
"""hookscore_ko.py - 한국어 쇼츠 훅 점수기 (youtube-agent-skill의 hookscore.py를 한국어로 옮김, MIT).
    python3 hookscore_ko.py hooks.txt           # 한 줄에 훅 하나, 점수순 정렬
    python3 hookscore_ko.py --hook "한 줄"
다섯 항목(구체성·호기심·걸린 것·짧음·군더더기 없음) 0~100점, 최종 = 평균 60% + 최저점 40%.
낮은 점수는 '다시 보라'는 신호일 뿐, 높은 점수가 조회수를 약속하지 않는다."""
import re, sys, json
FILLER = ["안녕하세요", "여러분", "오늘은", "영상", "구독", "좋아요", "그냥", "진짜로", "사실상", "약간", "뭔가"]
VAGUE = ["대박", "충격", "역대급", "미친", "놀라운", "엄청난", "소름", "레전드", "비밀", "꿀팁"]
NUM = re.compile(r"\d|[일이삼사오육칠팔구십백천만억조]+\s?(명|년|배|개|원|달러|퍼센트|초|분|시간|킬로|미터|톤|층|편|종)")
CUR = re.compile(r"왜|어떻게|무엇|뭐가|진짜|사실|그런데|아니라|아닌|단 하나|뿐|만에|숨은|몰랐|처음|유일")
STAKE = re.compile(r"죽|사라|무너|멈|잃|망|터지|폭락|사고|참사|위험|금지|끊|실패|돈|조|억")
def score(h):
    s = h.strip(); n = len(s.replace(" ", ""))
    conc = 100 if NUM.search(s) else 40
    cur = min(100, 40 + 30 * len(CUR.findall(s)))
    stake = min(100, 40 + 30 * len(STAKE.findall(s)))
    short = 100 if n <= 22 else max(0, 100 - (n - 22) * 6)
    clean = max(0, 100 - 35 * sum(w in s for w in FILLER) - 25 * sum(w in s for w in VAGUE))
    p = {"구체성": conc, "호기심": cur, "걸린 것": stake, "짧음": short, "군더더기 없음": clean}
    v = round(.6 * sum(p.values()) / 5 + .4 * min(p.values()))
    return v, p
if __name__ == "__main__":
    a = sys.argv[1:]
    hooks = [a[1]] if a[:1] == ["--hook"] else [l for l in open(a[0], encoding="utf-8").read().splitlines() if l.strip()]
    for v, p, h in sorted(((*score(h), h) for h in hooks), reverse=True):
        weak = min(p, key=p.get); print(f"{v:3d}  {h}\n     약점: {weak}({p[weak]})  {json.dumps(p, ensure_ascii=False)}")
