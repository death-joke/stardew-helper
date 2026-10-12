import re, json
cells = json.load(open('fish_cells.json'))
SEA = {'Spring':'printemps','Summer':'ete','Fall':'automne','Winter':'hiver'}
def link(s):
    m = re.search(r'\[\[([^\]|]+)(?:\|([^\]]+))?\]\]', s); return (m.group(2) or m.group(1)) if m else s
def seasons(s):
    ss = [SEA[x] for x in re.findall(r'\{\{Season\|(\w+)\}\}', s) if x in SEA]
    allx = 'All' in re.findall(r'\{\{Season\|(\w+)\}\}', s)
    note = re.sub(r'\{\{Season\|\w+\}\}|<br />|class="no-wrap"\|', ' ', s).strip()
    return ss, allx, re.sub(r'\s+', ' ', note)
def weather(s):
    w = re.findall(r'\{\{Weather inline\|(\w+)', s)
    return w or [re.sub(r'\s+',' ',s).strip()]
res = []
for o in cells:
    c = o['cells']
    if o['sec'] == 'legendaire':
        c = [x.lstrip('|').strip() for x in c[0].split('\n|')]
        # legendary layout may differ; keep raw for inspection
        res.append({'sec': o['sec'], 'key': o['key'], 'raw': c}); continue
    name = link(c[1]); price = int(re.search(r'\|(\d+)\}\}', c[3]).group(1))
    ss, allx, note = seasons(c[8])
    res.append({'sec': o['sec'], 'key': o['key'], 'name': name, 'price': price, 'where': re.sub(r'\s+',' ',c[6]),
        'time': c[7], 'seasons': ss, 'allseasons': allx, 'seasonnote': note, 'weather': weather(c[9]),
        'difficulty': re.sub(r'\s+',' ',c[11]), 'used': c[13] if len(c)>13 else ''})
json.dump(res, open('fish.json','w'), ensure_ascii=False, indent=1)
for r in res:
    if r['sec']=='canne': print(r['key'], '|', r['name'], '|', r['where'][:45], '|', r['time'], '|', ','.join(r['seasons']) or ('ALL' if r['allseasons'] else r['seasonnote']), '|', r['weather'], '|', r['difficulty'], '|', r['price'])
    else: print('LEG', r['key'], r['raw'][:12])
