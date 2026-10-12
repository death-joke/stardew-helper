import json, re, unicodedata
res = json.load(open('fish.json'))
raw = open('poisson.raw', encoding='utf-8').read().split('\n')

def strip_markup(s):
    s = s.replace('&amp;', '&')
    s = re.sub(r"\[\[([^\]|]+)\|([^\]]+)\]\]", r"\2", s)
    s = re.sub(r"\[\[([^\]]+)\]\]", r"\1", s)
    s = re.sub(r'<br\s*/?>', ' / ', s).replace("''", '')
    s = re.sub(r'<[^>]+>', '', s)
    s = re.sub(r'\{\{[^}]*\}\}', '', s)
    return re.sub(r'\s+', ' ', s).strip()

def slug(n):
    n = unicodedata.normalize('NFD', n.lower())
    n = ''.join(c for c in n if unicodedata.category(c) != 'Mn')
    return re.sub(r'[^a-z0-9]+', '-', n).strip('-')

def windows(t):
    t = t.strip()
    if t in ('Tout', 'Tous'): return None
    out = []
    for part in t.split('<br />'):
        m = re.match(r'\s*(\d+):00\s*[–-]\s*(\d+):00', part)
        if not m: raise SystemExit('time? ' + t)
        a, b = int(m.group(1)), int(m.group(2))
        if b <= a: b += 24
        out.append([a, b])
    return out

def weather(ws):
    ws = [w for w in ws]
    if ws in (['Tout'], ['Tous']): return 'tous'
    if ws and ws[0] == 'Sun': return 'soleil'
    if ws and ws[0] == 'Rain': return 'pluie'
    raise SystemExit('weather? %r' % ws)

def habitats(where):
    h = []
    if re.search('Océan', where): h.append('ocean')
    if re.search('Rivière', where): h.append('riviere')
    if re.search('Lac', where): h.append('lac')
    if re.search('Étang|Forêt secrète', where): h.append('etang')
    if re.search('Mine|fantôme', where): h.append('mines')
    if re.search('Désert', where): h.append('desert')
    if re.search('Île Gingembre', where): h.append('ile')
    return h or ['autre']

BUNDLE = {'River Fish': 'Paquet poisson de rivière', 'Lake Fish': 'Paquet poissons d’eau douce', 'Ocean Fish': 'Paquet poissons de mer',
          'Night Fish': 'Paquet pêche nocturne', 'Specialty Fish': 'Paquet poisson de spécialité', 'specialty fish': 'Paquet poisson de spécialité',
          'field research': 'Paquet recherche sur le terrain'}
ALL = ['printemps', 'ete', 'automne', 'hiver']
SEA = {'Spring': 'printemps', 'Summer': 'ete', 'Fall': 'automne', 'Winter': 'hiver'}

def diff(s):
    m = re.match(r'(\d+)\s*(\S+)', s)
    beh = m.group(2).lower()
    beh = {'plomb': 'plombs', 'lisse': 'lisses'}.get(beh, beh)
    return int(m.group(1)), beh

fish = []
for r in res:
    if r['sec'] == 'canne':
        seasons = ALL if r['allseasons'] or 'Toutes les saisons' in r['seasonnote'] else r['seasons']
        seasons = [s for i, s in enumerate(seasons) if s not in seasons[:i]]
        order = [s for s in ALL if s in seasons]
        d, beh = diff(r['difficulty'])
        notes = []
        n = r['seasonnote']
        if 'Totem de pluie' in n: notes.append('Aussi avec le Totem de pluie.')
        if 'sur l\'[[Île Gingembre]]' in n: notes.append('Toutes les saisons sur l’Île Gingembre.')
        if r['name'] == 'Poisson-chat': notes.append('Été seulement dans l’étang de la forêt secrète.')
        if r['name'] == 'Poisson lune': notes.append('Soleil ou vent.')
        bundles = sorted({BUNDLE[x] for x in re.findall(r'\{\{Bundle\|([^}|]+)', r['used'])})
        loves = re.findall(r'\{\{NPC\|([^|}]+)\|cadeau adoré', r['used'])
        fish.append(dict(id=slug(r['name']), name=r['name'], price=r['price'], where=strip_markup(r['where']), seasons=order,
            windows=windows(r['time']), weather=weather(r['weather']), difficulty=d, behavior=beh, notes=notes, bundles=bundles))
    else:
        c = r['raw']
        sea = [SEA[x] for x in re.findall(r'Season\|(\w+)', c[8]) if x in SEA]
        d, beh = diff(c[11])
        w = 'pluie' if 'Rain' in c[9] else 'tous'
        name = strip_markup(c[1])
        fish.append(dict(id=slug(name), name=name, price=int(re.search(r'\|(\d+)\}\}', c[3]).group(1)), where=strip_markup(c[6]),
            seasons=sea or ALL, windows=None, weather=w, difficulty=d, behavior=beh, notes=[], bundles=[], legendary=True))
for f in fish: f['habitats'] = habitats(f['where'])

# Marché nocturne
night = []
txt = '\n'.join(raw[816:866])
for m in re.finditer(r'\|\[\[([^\]]+)\]\]\n\|\{\{Description[^\n]*\n\|\{\{Qualityprice\|[^|]+\|(\d+)\}\}\n[^\n]*\n[^\n]*\n\|[^\n]*\n\|(\d+) (\S+)', txt):
    night.append(dict(id=slug(m.group(1)), name=m.group(1), price=int(m.group(2)), difficulty=int(m.group(3)), behavior=m.group(4).lower()))

# Casiers à crabes
crab = []
ctxt = '\n'.join(raw[967:1104])
for m in re.finditer(r'\|\[\[File:[^\]]*\]\]\n\|\[\[([^\]|]+)(?:\|[^\]]*)?\]\]\n\|\{\{Description[^\n]*\n\|\{\{Qualityprice\|[^|]+\|(?:quality=\w+\|)?(\d+)[^\n]*\n[^\n]*\n[^\n]*\n\|([^\n]+)\n\|([^\n]+)\n\|([^\n]+)', ctxt):
    crab.append(dict(id=slug(m.group(1)), name=m.group(1), price=int(m.group(2)), where=strip_markup(m.group(3)), chance=m.group(4).strip(), chanceMariner=m.group(5).strip()))
json.dump(dict(fish=fish, night=night, crab=crab), open('fish_final.json', 'w'), ensure_ascii=False, indent=1)
print(len(fish), len(night), len(crab))
print([c['name'] + ':' + c['where'] for c in crab])
print([ (n['name'], n['price'], n['difficulty'], n['behavior']) for n in night])
