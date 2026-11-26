#!/usr/bin/env python3
"""title_ko.py - 유튜브 쇼츠 제목 검사 (youtube-agent-skill title.py의 한국어판, MIT).
    python3 title_ko.py --title "제목 #Shorts" --hook "영상 첫 화면 큰 제목"
검사: 모바일 피드 잘림(공백 포함 약 28자 넘으면 경고), 핵심어가 앞 15자 안에 있는지,
화면 큰 제목과 똑같은 말 반복, 막연한 말, 숫자 유무."""
import argparse, re
VAGUE = ["대박", "충격", "역대급", "미친", "놀라운", "엄청난", "소름", "레전드"]
ap = argparse.ArgumentParser(); ap.add_argument("--title", required=True); ap.add_argument("--hook", default=""); ap.add_argument("--keyword", default="")
a = ap.parse_args(); t = re.sub(r"\s*#\S+", "", a.title).strip(); issues, good = [], []
if len(t) > 40: issues.append(f"{len(t)}자: 너무 김(40자 넘음)")
elif len(t) > 28: issues.append(f"{len(t)}자: 모바일 피드에서 뒤가 잘릴 수 있음(28자 이하 권장)")
else: good.append(f"{len(t)}자: 길이 좋음")
if a.keyword and a.keyword not in t[:15]: issues.append(f"핵심어 '{a.keyword}'가 앞 15자 안에 없음")
if a.hook:
    hw = set(re.findall(r"[가-힣A-Za-z0-9]{2,}", a.hook)); tw = set(re.findall(r"[가-힣A-Za-z0-9]{2,}", t)); ov = hw & tw
    if len(ov) >= max(2, len(tw) * .6): issues.append(f"화면 큰 제목과 겹치는 말이 많음: {sorted(ov)} → 제목은 다른 정보를 더하기")
    else: good.append("화면 제목과 역할이 나뉨")
for w in VAGUE:
    if w in t: issues.append(f"막연한 말 '{w}' → 숫자나 구체적 사실로 바꾸기")
good.append("숫자 있음") if re.search(r"\d", t) else issues.append("숫자 없음(가능하면 숫자 하나)")
print("통과" if not issues else "고칠 점 있음"); [print(" ✗", i) for i in issues]; [print(" ✓", g) for g in good]
