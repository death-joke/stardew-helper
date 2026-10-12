import json, re
pages = json.load(open('villager_pages.json'))
src = open('/Users/leborgnekevin/Project/stardew-helper/src/data/villagers.ts', encoding='utf-8').read()
ids = dict((n, i) for i, n in re.findall(r"\{ id: '([^']+)', name: '([^']+)'", src))
inv = {n: i for n, i in ((n, i) for i, n in re.findall(r"\{ id: '([^']+)', name: '([^']+)'", src))}

def norm(s): return s.replace('\xa0', ' ').replace("'", '’').replace('Oeuf', 'Œuf').replace('oeuf', 'œuf')
def wl(s):
    s = re.sub(r"\[\[File:[^\]]*\]\]", '', s)
    s = re.sub(r"\[\[([^\]|]+)\|([^\]]+)\]\]", r"\2", s)
    s = re.sub(r"\[\[([^\]]+)\]\]", r"\1", s)
    s = re.sub(r"\{\{[^}]*\}\}", '', s)
    s = re.sub(r"<br\s*/?>", ' ', s)
    s = re.sub(r"<[^>]+>", ' ', s)
    s = re.sub(r'={2,}[^=\n]*={2,}', ' ', s)
    s = s.replace('&amp;', '&')
    return norm(re.sub(r'\s+', ' ', re.sub(r"'{2,}", '', s)).strip())

GROUPS = {'Spring': 'Printemps', 'Printemps': 'Printemps', 'Summer': 'Été', 'Été': 'Été', 'Fall': 'Automne', 'Automne': 'Automne', 'Winter': 'Hiver', 'Hiver': 'Hiver',
          'Marriage': 'Mariage', 'Mariage': 'Mariage', 'Deviations': 'Exceptions', 'Déviations': 'Exceptions'}

def norm_time(t):
    t = t.replace(' ', '').replace('(?)', '').replace('?', '')
    m = re.fullmatch(r'(\d{1,2})[:h](\d{2})(h)?', t, re.I)
    if m: return f'{int(m.group(1))}:{m.group(2)}'
    m = re.fullmatch(r'(\d{1,2}):(\d{2})(am|pm)', t, re.I)
    if m:
        h = int(m.group(1)) % 12 + (12 if m.group(3).lower() == 'pm' else 0)
        return f'{h}:{m.group(2)}'
    return t

def rows_of(table):
    rows = []
    for chunk in re.split(r'\n\|-', table):
        if re.search(r'^!', chunk.strip(), re.M) and not re.search(r'^\|', chunk.strip(), re.M): continue
        cells = []
        for line in chunk.split('\n'):
            if line.startswith('|') and not line.startswith('|}') and not line.startswith('|-'):
                cells += [c.strip() for c in line[1:].split('||')]
        cells = [c for c in cells if c != '']
        if len(cells) >= 2 and re.match(r'^\d{1,2}[:h]\d{2}', cells[0].strip()):
            rows.append([norm_time(wl(cells[0])), wl(' '.join(cells[1:]))])
    return rows

def parse(text):
    m = re.search(r'==\s*Emploi du temps\s*==(.*?)(?=\n==[^=])', text, re.S)
    if not m: return None
    sec = m.group(1)
    groups, order, group, pending = {}, [], None, None
    token = re.compile(r"\{\{ScheduleHeader\|([^}]+)\}\}|^'''([^\n]+?)'''(?:[^\n]*)$|\{\|(.*?)\n\|\}", re.M | re.S)
    for t in token.finditer(sec):
        if t.group(1) is not None:
            group = GROUPS.get(t.group(1).strip(), t.group(1).strip()); pending = None
        elif t.group(2) is not None:
            full = t.group(0).strip()
            pending = wl(re.sub(r"^'''(.*?)'''", r'\1', full)) if full.startswith("'''") else wl(t.group(2))
        else:
            tbl = t.group(3)
            hm = re.search(r'^!\s*colspan="\d+"\s*\|\s*(.+)$', tbl, re.M)
            title = wl(hm.group(1)) if hm and hm.group(1).strip() else (pending or '')
            rows = rows_of(tbl)
            if rows:
                key = group or ''
                if key not in groups: groups[key] = []; order.append(key)
                groups[key].append({'title': title or 'Horaire', 'rows': rows})
            pending = None
    # texte d'introduction : ce qui précède le premier en-tête de saison ou le premier tableau
    cut = [i for i in (sec.find('{{ScheduleHeader'), sec.find('{|')) if i >= 0]
    head = sec[:min(cut)] if cut else sec
    paras = []
    for para in re.split(r'\n\s*\n', head):
        p_ = wl(re.sub(r"^\s*[|!{-].*$", '', para, flags=re.M))
        if p_: paras.append(p_)
    intro = ' '.join(paras)
    if len(intro) > 900:
        sentences = re.split(r'(?<=[.!?])\s+', intro); intro = ''
        for sent in sentences:
            if intro and len(intro) + len(sent) > 900: break
            intro += (' ' if intro else '') + sent
    return dict(intro=intro, groups=[dict(label=k, blocks=groups[k]) for k in order])

out = {}
for name, text in pages.items():
    r = parse(text)
    if r is None: print('SANS SECTION', name); continue
    out[inv[name]] = r
json.dump(out, open('schedules_final.json', 'w'), ensure_ascii=False)
for vid, r in out.items():
    nb = sum(len(g['blocks']) for g in r['groups']); nr = sum(len(b['rows']) for g in r['groups'] for b in g['blocks'])
    print(vid.ljust(10), [g['label'] or '—' for g in r['groups']], 'blocs', nb, 'lignes', nr, '| intro', len(r['intro']))
