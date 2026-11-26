# 에이넥스 2일 1쇼츠 자동 제작 절차

2일에 한 번(짝수 날 10:13 KST, 2026-11-24 사용자 지시로 변경) 예약 작업이 이 문서를 따라 주제 선정 → 대본 → TTS → 3D/모션그래픽 영상 → 효과음 → 검수 → 예약까지 혼자 끝낸다.
사용자에게 중간 승인을 받지 않는다(사용자 지시). 모든 메시지는 한국어로 쓴다.

## 0. 채널 규칙 (반드시 지킴)
- 채널: 에이넥스(유튜브 쇼츠) + 틱톡 ainexstory. 시리즈명 '알고 보면 다른 사건'.
- 주제 종류(2026-11-22 사용자 지시로 변경): **역사 사건·재난의 숨은 진짜 원인/반전**. 최신 뉴스·경제 화제는 하지 않는다.
- 공식: 말이 안 되는 사실 한 문장(숫자 포함) → 언제·어디서 → 피해를 서너 번에 걸쳐 키우기 → "그런데 말이죠," → 일상적 행동·비유로 진짜 원인 → 마지막 단어에서 뒤집으며 끝. 첫 2초에 숫자 훅.
- 길이 50~62초(과학편은 60~85초). 큰 제목은 훅과 마지막에만(그 사이에는 위쪽에 작은 주제 띠를 고정, 6단계 참고). 자막(SRT) 없음, 배경음악 없음, 믹스 -14 LUFS(최종 파일 기준 -14±0.5, 부족하면 volume으로 보정; 2026-11-23 변경).
- **두 시리즈를 번갈아 만든다(2026-11-23 사용자 지시).** `videos/LOG.md` 마지막 항목에 '[과학 what-if]'가 있으면 이번엔 역사 반전 '알고 보면 다른 사건'(아래 2~3단계 규칙), 없으면 과학 what-if '알고 보면 다른 과학'.
  - 과학 what-if: 대중문화·일상 소재의 물리·생물 질문(예: 스파이더맨 벽 타기). 출처는 논문·대학 보도자료·과학 매체 3개 이상. 대본은 질문 사다리: 상황 설정 → 다들 믿는 것 → "그런데 말이죠," → "그럼 ○○하면?"을 2~3번 → 한 줄 결론. 태그는 [curious] [serious] [pause] [sighs] [slowly] 중 4~5곳.
  - 과학편 그림체도 기존 그림체를 쓴다(2026-11-23 사용자 지시: 회색+주황 wall_* 스타일은 쓰지 않음). 툰 3D 세트 + 2D 모션그래픽(예시 faa/nvda/glasses, 과학편 예시 wall2_*, 6단계 규칙 그대로). 큰 제목 윗줄은 '알고 보면 다른 과학'. LOG.md에 '[과학 what-if]'를 붙여 기록.
- 출처는 1·2등급 언론·기관만. 출처끼리 숫자가 다르면 보수적으로 쓰거나 뺀다.
- 정치 진영 다툼, 희생자 개인을 부각하는 이야기, 유족이 생존한 최근(약 30년 이내) 국내 참사는 피한다. 반전·웃음은 지어내지 않고 확인한 사실에서만 찾는다.
- 결과물은 경량(crf 26)만 사용자에게 보낸다.

## 1. 준비
```bash
git clone --depth 1 https://github.com/rlgns7724-afk/ainex-media /home/claude/ainex-media   # 이미 있으면 생략
bash /home/claude/ainex-media/toolkit/setup.sh
```
- `videos/LOG.md`에서 지난 주제를 읽고 겹치지 않게 고른다.

## 2. 주제 (WebSearch)
- 세계·한국의 역사 사건·재난·사고(예: 산업 사고, 건축 붕괴, 화재, 전염병, 기묘한 역사 사건) 중 '다들 아는 이야기'와 다른 진짜 원인이 있는 것 하나. LOG.md의 지난 주제·이전 시리즈와 겹치지 않게 한다.
- 후보 3개를 표로(다들 아는 이야기 / 알고 보면 / 그림 포인트) 적고 하나를 고른다.
- 후보를 고를 때 '다들 아는 이야기와 다른 점'이 첫 문장 하나로 말해지는지 본다(youtube-agent-skill 'The Impossible Claim', 'Contrarian Flip' 공식).
- 사실 확인 표(✅/⚠️/❌): 공공기관·박물관·백과사전·주요 언론·학술 자료 3개 이상. 출처끼리 숫자가 다르면 빼고, 한 출처뿐인 수치·증언은 대본에 넣지 않는다. 단위는 한국식으로(갤런→리터, 마일→km).

## 3. 대본 (ElevenLabs v4 규칙)
- 인사 없이 시작. 숫자는 소리 나는 대로 한글로(예: 천구백십구 년, 팔백만 리터).
- 감정 태그는 4~5곳만: 훅 [intrigued], 전개 [building tension], 반전 직전 [serious], 마무리 [confident]. [slowly] [pause]는 쓰지 않는다.
- 약 17~19줄, 290~320음절(≈52~60초). "그런데 말이죠,"는 단독 줄. 마지막 줄은 마지막 단어에서 뒤집으며 딱 끝난다(예: "…바로 이 갈색 페인트입니다.").
- **훅 점수제(2026-11-26 추가):** 첫 문장 후보를 `toolkit/tools/ytagent/hooks.json`의 21가지 공식(숫자 충격 The Statistic, 통념 뒤집기 Contrarian Flip, 불가능해 보이는 주장 The Impossible Claim, 질문 The Question 등)에서 서로 다른 공식으로 5개 쓴 뒤 `python3 toolkit/tools/ytagent/hookscore_ko.py hooks.txt`로 점수를 매긴다. 1위를 쓰되 약점 항목이 40 이하면 그 부분(보통 숫자 넣기)을 고쳐 다시 매긴다. 보고 때 고른 훅의 공식 이름과 점수를 한 줄로 적는다.

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
- **위쪽 주제 띠(2026-11-26 추가):** 훅의 큰 제목이 사라진 뒤부터 마지막 큰 제목 전까지, 화면 맨 위(y≈150)에 작은 반투명 검정 띠 + 흰 글씨 40px로 짧은 주제(예: '스파이더맨 벽 타기의 진실')를 계속 띄운다. 중간에 들어온 시청자도 무슨 영상인지 알게 한다. 장면 태그 알약(y=300)과 겹치지 않게 한다.
- **스프라이트 스태킹(선택):** 옛날 게임·자동차·픽셀 도시처럼 레트로 장면이 어울리면 `toolkit/three3d/sstack.html` 방식(픽셀 단면 여러 장을 같은 각도로 돌려 1픽셀씩 쌓기)을 한 장면에 섞어도 된다.
- 예시: `toolkit/three3d/ff/faa_body.js` + `faa_over.js`(공항·땅속 케이블·레트로 PC 3D + 출발 안내판·레이더·달력·중고거래·돈 2D), `nvda_*`(무대·층 쌓기 3D + 주가 차트·신문 콜라주·인용 카드 2D), `glasses_*`(교실 종이인형 + 투명 분해).
- 새 `<slug>_body.js`(3D 세트, MODE(t), state, KEYS 카메라, render3)와 `<slug>_over.js`(2D 화면들, overlays, chrome 제목·태그·출처, flashes, capOn, draw)를 작성.
- 그림체는 장면에 맞게 여러 스킬을 골라 섞는다(사용자 지시). 시작 전에 쓸 스킬을 Skill 도구로 불러 읽는다.
  - ainex-twist-history-toon: 툰 3D 마을 + 2D 종이인형 캐릭터, 세피아 회상, ◀◀/▶▶ 되감기 (역사 장면의 기본 뼈대)
  - ainex-motion-graphics-10: 종이 콜라주·픽셀 레트로·키네틱 타이포·데이터 도시·네온 회로·투명 장치 분해·스케일 줌아웃·물리 연쇄 컷
  - ainex-final-form-3d: 기계·구조물 부품이 붙는 3D, 지시선·흐름·문제/해결 인포그래픽
  - ainex-lowpoly-3d-video: 이목구비 있는 로우폴리 사람, 근접 카메라·배경 흐림
  - ainex-flat-illustration-video: 베이지 평면 인포그래픽(지도·도표·아이콘)
  - ainex-code-motion-video, ainex-style-spec: 공통 렌더 방식과 자막·제목·출처 규격
- 한 영상에 3~4가지 스타일을 섞되, 이 저장소의 페이지 구조(head.js + <slug>_body.js + over.js 앞부분 + <slug>_over.js, render3d.py)로 통합해 한 페이지에서 렌더한다.
- 장면마다 스타일을 바꾼다: 키네틱 타이포 / 데이터 화면 / 3D 툰 세트 / 투명 분해 / 네온 회로 / 종이 콜라주. "그런데 말이죠"는 파란 화면 타이포.
- 자막 띠(y≈1250) 근처 1150~1300에는 다른 글자를 두지 않는다. 출처 줄은 y=1700.
```bash
cd /home/claude/three3d && python3 mkpage.py <slug>
rm -f probe/*.png; PAGE=<slug>.html python3 render3d.py probe 1 4 8 ... (20장 정도)
python3 /home/claude/clock/sheet.py $W/chk/s1.png 1 4 8 ...   # Read로 확인 → 겹침·구도 수정 반복
```

## 7. 렌더 (조각 단위, 이어 하기 가능)
- 작업 공간이 중간에 재시작될 수 있으므로 긴 백그라운드 렌더를 쓰지 않는다. 120프레임 조각으로 나눠 이미 있는 조각은 건너뛰고, `nproc`개(보통 2개) 작업자를 `timeout 540`으로 포그라운드 실행하고 조각이 다 찰 때까지 반복한다(`toolkit/tools/segrun.sh <slug> <총프레임> <폴더> <번호> <작업자수>`: 결과 파일을 .tmp로 쓰고 끝나면 mv). 다 모이면 concat. 렌더 중에는 probe를 돌리지 않는다.

## 8. 효과음·믹스
- `toolkit/tools/audio_base.py`를 복사한 뒤 put(...) 줄들을 추가(example_audio.py 참고). 장면 전환 whoosh, 숫자 thump, 팝업 pop, 반전 boom.
```bash
ffmpeg -y -i narr.mp3 -i out/sfx.wav -filter_complex "[0:a]aresample=48000,aformat=channel_layouts=mono,apad[n];[n][1:a]amix=inputs=2:normalize=0:duration=longest,loudnorm=I=-14:TP=-1.5:LRA=11" -t <TOTAL> -ar 48000 out/mix.wav
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
- **제목 검사(2026-11-26 추가):** 예약 전에 `python3 toolkit/tools/ytagent/title_ko.py --title "<제목>" --hook "<화면 큰 제목>" --keyword "<핵심어>"`를 돌려 ✗ 항목을 고친다(모바일 28자, 핵심어 앞 15자, 화면 제목과 같은 말 반복 금지, 막연한 말 금지, 숫자 하나).
- 틱톡: 같은 시각 별도 게시물, tiktokData {title, isAigc true}, text = 캡션 2~3문장 + 해시태그 5개.
- media = [공개 링크]. 응답의 plannerUrl을 기록.

## 12. 보고
- SendUserFile로 경량 영상 1개(status proactive) + 한국어 3~4줄: 주제, 반전 한 줄, 예약 시각, 사용 크레딧.
- 실패하면 어디서 멈췄는지와 남은 일을 같은 방식으로 알린다.
