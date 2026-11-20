import json,sys
t=json.load(open(sys.argv[1]))
def find(word, after=0):
    w=word.replace(' ','')
    s=''; idx=[]
    for k,(tk,ts) in enumerate(t):
        for ch in tk.strip(): s+=ch; idx.append(ts)
    i=0
    while True:
        j=s.find(w,i)
        if j<0: return None
        if idx[j]>=after: return idx[j]
        i=j+1
for a in sys.argv[2:]:
    w,_,af=a.partition('@'); print(w, find(w, float(af or 0)))
