# 에이넥스 1일 1쇼츠 자동 제작 절차

매일 예약 작업이 이 문서를 따라 주제 선정 → 대본 → TTS → 3D/모션그래픽 영상 → 효과음 → 검수 → 예약까지 혼자 끝낸다.
사용자에게 중간 승인을 받지 않는다(사용자 지시). 모든 메시지는 한국어로 쓴다.

## 0. 채널 규칙 (반드시 지킴)
- 채널: 에이넥스(유튜브 쇼츠) + 틱톡 ainexstory. 시리즈명 '알고 보면 다른 사건'.
- 공식: 화제 사건 → 다들 믿는 것 → "그런데 말이죠" 반전 → 한 줄 결론. 첫 2초에 숫자 훅.
- 길이 55~70초. 큰 제목은 훅과 마지막에만. 자막(SRT) 없음, 배경음악 없음, 믹스 -17 LUFS.
- 출처는 1·2등급 언론·기관만. 출처끼리 숫자가 다르면 보수적으로 쓰거나 뺀다.
- 수사 중·의혹 단계에서 실명이 나온 개인 이야기, 정치 진영 다툼, 참사 희생자 중심 이야기는 피한다.
- 결과물은 경량(crf 26)만 사용자에게 보낸다.

## 1. 준비
```bash
git clone --depth 1 https://github.com/rlgns7724-afk/ainex-media /home/claude/ainex-media   # 이미 있으면 생략
bash /home/claude/ainex-media/toolkit/setup.sh
```
- `videos/LOG.md`에서 지난 주제를 읽고 겹치지 않게 고른다.

## 2. 주제 (WebSearch, 최근 7일)
- 한국 기준 화제(경제·기술·사고·과학·생활)에서 숫자와 반전이 있는 것 하나.
- 사실 확인 기사 3개 이상을 읽고 핵심 숫자를 표로 정리한다.

## 3. 대본 (ElevenLabs v4 규칙)
- 숫자는 소리 나는 대로 한글로(예: 사 점 삼 퍼센트). 태그는 문장당 최대 1개: [curious] [serious] [pause] [sighs] [slowly].
- 약 20줄, 330~360음절(≈65~70초). "그런데 말이죠,"는 단독 줄. 마지막 줄은 [slowly] 결론.

## 4. TTS (ElevenLabs 커넥터)
- `creative_generate_speech`: model_id `eleven_v4`, voice_id `ZZ4xhVcc83kZBfNIlIIz`(Manbo), generations_count 1.
- `creative_get_generations`로 full_res_url을 받아 `curl -o narr.mp3` (elevenlabsusercontent.com 허용됨). 다시 생성하지 않는다.

## 5. 타이밍
```bash
W=/home/claude/<slug>; mkdir -p $W/out $W/chk; cd $W
ffmpeg -y -i narr.mp3 -ar 16000 -ac 1 n16.wav
ffmpeg -i n16.wav -af silencedetect=noise=-35dB:d=0.18 -f null - 2>&1 | grep -o "silence_\(start\|end\): [0-9.]*" | paste - - | awk '{printf "%.2f,", ($2+$4)/2}'
python3 /home/claude/ainex-media/toolkit/tools/asr_ts.py n16.wav /home/claude/asr/sherpa-onnx-sense-voice-zh-en-ja-ko-yue-2024-07-17 tokens.json "<쉼표로 이은 무음 중간값>"
python3 /home/claude/onset.py tokens.json 단어1 단어2@시작초 ...   # 각 자막 덩어리 시작 시각
```
- `toolkit/tools/example_build_timeline.py`를 본떠 `build_timeline.py` 작성: L=(장면, [(자막 덩어리, 시작초)], 끝), KW(노란 강조어), cues. 출력은 `/home/claude/three3d/<slug>_timeline.json`, 작업 폴더에 `timeline.json`으로도 복사.
- 자막 문구는 대본 문장 그대로(숫자는 아라비아 숫자로 표기).

## 6. 화면 (Three.js 툰 + 2D 모션그래픽)
- 예시: `toolkit/three3d/ff/faa_body.js` + `faa_over.js`(공항·땅속 케이블·레트로 PC 3D + 출발 안내판·레이더·달력·중고거래·돈 2D), `nvda_*`(무대·층 쌓기 3D + 주가 차트·신문 콜라주·인용 카드 2D), `glasses_*`(교실 종이인형 + 투명 분해).
- 새 `<slug>_body.js`(3D 세트, MODE(t), state, KEYS 카메라, render3)와 `<slug>_over.js`(2D 화면들, overlays, chrome 제목·태그·출처, flashes, capOn, draw)를 작성.
- 장면마다 스타일을 바꾼다: 키네틱 타이포 / 데이터 화면 / 3D 툰 세트 / 투명 분해 / 네온 회로 / 종이 콜라주. "그런데 말이죠"는 파란 화면 타이포.
- 자막 띠(y≈1250) 근처 1150~1300에는 다른 글자를 두지 않는다. 출처 줄은 y=1700.
```bash
cd /home/claude/three3d && python3 mkpage.py <slug>
rm -f probe/*.png; PAGE=<slug>.html python3 render3d.py probe 1 4 8 ... (20장 정도)
python3 /home/claude/clock/sheet.py $W/chk/s1.png 1 4 8 ...   # Read로 확인 → 겹침·구도 수정 반복
```

## 7. 렌더 (3분할 병렬, 백그라운드)
- 총 프레임 = round(TOTAL*30). out/run.sh에서 3구간을 `&`로 돌리고 `wait` 후 DONE 파일. 렌더 중에는 probe를 돌리지 않는다.

## 8. 효과음·믹스
- `toolkit/tools/audio_base.py`를 복사한 뒤 put(...) 줄들을 추가(example_audio.py 참고). 장면 전환 whoosh, 숫자 thump, 팝업 pop, 반전 boom.
```bash
ffmpeg -y -i narr.mp3 -i out/sfx.wav -filter_complex "[0:a]aresample=48000,aformat=channel_layouts=mono,apad[n];[n][1:a]amix=inputs=2:normalize=0:duration=longest,loudnorm=I=-17:TP=-1.5:LRA=11" -t <TOTAL> -ar 48000 out/mix.wav
```

## 9. 합치기·검수·경량화
- concat → mix.wav 결합 → 프레임 수, ebur128(-17±0.5), 18장 시트 확인.
- 경량: `ffmpeg -i full.mp4 -c:v libx264 -preset veryfast -crf 26 -c:a aac -b:a 128k -movflags +faststart <날짜>_<slug>.mp4`

## 10. 저장소에 올리기
```bash
cp <경량>.mp4 /home/claude/ainex-media/videos/; cd /home/claude/ainex-media
echo "- <날짜> <slug> | <유튜브 제목> | 출처: ..." >> videos/LOG.md
git add -A && git commit -m "video: <날짜> <slug>" && git -c push.negotiate=true push origin HEAD:main
```
- 공개 링크: `https://raw.githubusercontent.com/rlgns7724-afk/ainex-media/main/videos/<파일명>` (파일명은 영문·숫자만).

## 11. 예약 (Metricool 커넥터)
- blogId `8250564`, 시간대 Asia/Seoul. 그날 16:00 공개(이미 지났으면 다음 날 16:00).
- 유튜브: youtubeData {title(앞 25자에 핵심, 끝에 #Shorts), type "short", privacy "public", tags 15개, category "EDUCATION", madeForKids false, isAiGeneratedContent false}. text = 설명란(결론 2줄, 출처, "영상 속 이미지는 설명을 위한 그래픽입니다.", 해시태그 4~5개).
- 틱톡: 같은 시각 별도 게시물, tiktokData {title, isAigc true}, text = 캡션 2~3문장 + 해시태그 5개.
- media = [공개 링크]. 응답의 plannerUrl을 기록.

## 12. 보고
- SendUserFile로 경량 영상 1개(status proactive) + 한국어 3~4줄: 주제, 반전 한 줄, 예약 시각, 사용 크레딧.
- 실패하면 어디서 멈췄는지와 남은 일을 같은 방식으로 알린다.
