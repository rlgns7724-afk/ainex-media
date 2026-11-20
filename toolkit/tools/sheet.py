import sys
from PIL import Image
ts=[float(x) for x in sys.argv[2:]]
ims=[Image.open(f'/home/claude/three3d/probe/t_{t:06.2f}.png').resize((270,480)) for t in ts]
n=8; s=Image.new('RGB',(270*n,480*((len(ims)+n-1)//n)))
for i,im in enumerate(ims): s.paste(im,((i%n)*270,(i//n)*480))
s.save(sys.argv[1])
