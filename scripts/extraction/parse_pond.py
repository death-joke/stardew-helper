import re, json
lines = open('pond.raw', encoding='utf-8').read().split('\n')
def table(start, end):
    text = '\n' + '\n'.join(lines[start-1:end-1])
    rows = re.split(r'\n\|-\s*\n?', text)
    return rows
def strip(s):
    s = re.sub(r'<br\s*/?>', ' | ', s)
    s = re.sub(r"\[\[File:[^\]]*\]\]", '', s)
    s = re.sub(r"\[\[([^\]|]+)\|([^\]]+)\]\]", r"\2", s)
    s = re.sub(r"\[\[([^\]]+)\]\]", r"\1", s)
    s = re.sub(r'\{\{[Nn]ame\|([^|}]+)[^}]*\}\}', r'{\1}', s)
    s = re.sub(r"'''?", '', s)
    return re.sub(r'\s+', ' ', s).strip()
rows = table(456, 1086)
cur = None; remain = 0; out = []
for r in rows:
    cells = [c for c in re.split(r'\n\|', '\n' + r.strip()) if c.strip()]
    cells = [c.lstrip('|') .strip() for c in cells]
    if not cells or cells[0].startswith('!') or cells[0].startswith('{|') or cells[0] == '}': continue
    if remain > 0:
        remain -= 1
        data = cells
    else:
        fish = cells[0]
        m = re.match(r'(?:[a-z]+="[^"]*"\s*)*?rowspan="(\d+)"(?:\s*[a-z]+="[^"]*")*\s*\|(.*)', fish, re.S)
        if m: remain = int(m.group(1)) - 1; fish = m.group(2)
        else:
            m = re.match(r'(?:[a-z]+="[^"]*"\s*)+\|(.*)', fish, re.S)
            if m: fish = m.group(1)
        cur = [strip(x) for x in strip(fish).split(' | ')]
        data = cells[1:]
    if len(data) < 4: print('SHORT', cells); continue
    out.append(dict(fish=cur, pop=strip(data[0]), item=strip(data[1]), chance=strip(data[2]), order=strip(data[3])))
json.dump(out, open('pond_rows.json', 'w'), ensure_ascii=False, indent=1)
print(len(out), len({tuple(o['fish']) for o in out}))
for o in out[:14]: print(o)
print('...')
fishes = []
for o in out:
    for f in o['fish']:
        if f not in fishes: fishes.append(f)
print(len(fishes), fishes)
