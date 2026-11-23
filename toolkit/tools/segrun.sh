#!/bin/bash
# 사용: segrun.sh <페이지이름(slug)> <총프레임> <출력폴더> <작업자번호> <작업자수>
cd /home/claude/three3d; export PAGE=$1.html
N=$2; OUT=$3; STEP=120; w=$4; W=$5; i=0; mkdir -p $OUT
for ((a=0; a<N; a+=STEP)); do
  if (( i % W == w )); then b=$((a+STEP)); ((b>N)) && b=$N; f=$OUT/s$(printf %05d $a).mp4
    [ -f $f ] || { python3 render3d.py frames $a $b $f.tmp.mp4 > /dev/null 2>&1 && mv $f.tmp.mp4 $f; }
  fi; i=$((i+1)); done
