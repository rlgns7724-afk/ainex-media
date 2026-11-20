#!/bin/bash
# 새 작업 공간에서 에이넥스 영상 도구를 복원한다.
set -e
R=$(cd "$(dirname "$0")/.." && pwd)
mkdir -p /home/claude/three3d /home/claude/clock
cp -r $R/toolkit/three3d/. /home/claude/three3d/
cp $R/toolkit/tools/tl_common.py $R/toolkit/tools/onset.py /home/claude/
cp $R/toolkit/tools/sheet.py /home/claude/clock/sheet.py
cd /home/claude/three3d && npm i --silent three@0.169.0 >/dev/null
pip install -q --break-system-packages sherpa-onnx scipy numpy pillow >/dev/null 2>&1 || true
M=/home/claude/asr/sherpa-onnx-sense-voice-zh-en-ja-ko-yue-2024-07-17
if [ ! -f $M/model.onnx ]; then mkdir -p /home/claude/asr && cd /home/claude/asr && curl -sSL -o sv.tar.bz2 https://github.com/k2-fsa/sherpa-onnx/releases/download/asr-models/sherpa-onnx-sense-voice-zh-en-ja-ko-yue-2024-07-17.tar.bz2 && tar xjf sv.tar.bz2 && rm sv.tar.bz2; fi
echo "SETUP OK"
