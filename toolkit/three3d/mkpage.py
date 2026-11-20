import sys
n=sys.argv[1]; d='ff/'; o=open(d+'over.js').read(); o=o[:o.index('function timeline')]
open(n+'.html','w').write(open(d+'head.js').read()+"\n"+open(d+n+'_body.js').read()+"\n"+o+"\n"+open(d+n+'_over.js').read())
