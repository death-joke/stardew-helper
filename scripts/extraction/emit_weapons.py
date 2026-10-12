import json, re, unicodedata, html as H
d = json.load(open('weapons_raw.json', encoding='utf-8'))

def slug(n):
    n = unicodedata.normalize('NFD', n.lower()); n = ''.join(c for c in n if unicodedata.category(c) != 'Mn')
    return re.sub(r'[^a-z0-9]+', '-', n).strip('-')
def norm(s): return s.replace('\xa0', ' ').replace("'", '’').replace('Oeuf', 'Œuf').replace('oeuf', 'œuf')

# table anglais -> français (même méthode que pour les objets)
EN2FR = {}
for fn in ('cats_raw.json', 'cats_raw2.json', 'weapons_raw.json'):
    for _c, pages in json.load(open(fn, encoding='utf-8')).items():
        for t, x in pages.items():
            m = re.search(r'\|\s*eng\s*=\s*([^\n|]+)', x)
            if m: EN2FR.setdefault(m.group(1).strip().lower(), re.sub(r'\s*\((?:ressource|article)\)$', '', t))
for k, v in json.load(open('en2fr_extra.json', encoding='utf-8')).items(): EN2FR[k] = v
STAT_LABELS = {'speed w': 'Vitesse', 'defense': 'Défense', 'weight': 'Poids', 'crit. chance': 'Chance de critique', 'crit. power': 'Puissance critique', 'immunity': 'Immunité'}

def name_tpl(m):
    key, rest = m.group(1).strip(), (m.group(2) or '').lstrip('|')
    fr = EN2FR.get(key.lower()); first = rest.split('|')[0].strip() if rest else ''
    if not fr: return ''
    return f"{first} × {fr}" if first.isdigit() else fr
def wl(s):
    s = re.sub(r"\{\{[Nn]ame\|([^|}]+)((?:\|[^}]*)?)\}\}", name_tpl, s)
    s = re.sub(r"\{\{[Pp]rice\|(\d[\d.,]*)[^}]*\}\}", r"\1 po", s)
    s = re.sub(r"\[\[File:[^\]]*\]\]", '', s)
    s = re.sub(r"\[\[([^\]|]+)\|([^\]]+)\]\]", r"\2", s); s = re.sub(r"\[\[([^\]]+)\]\]", r"\1", s)
    s = re.sub(r"\{\{[^}]*\}\}", ' ', s); s = re.sub(r"<[^>]+>", ' ', s)
    s = re.sub(r'\b([LDld])\'{3,4}', r'\1’', s); s = re.sub(r"'{2,}", '', s)
    return norm(re.sub(r'\s+', ' ', H.unescape(s)).strip())
def price_of(raw):
    m = re.search(r'\{\{[Pp]rice\|(\d+)', raw or '') or re.fullmatch(r'\s*(\d+)\s*', raw or '')
    return int(m.group(1)) if m else None
def infobox(txt):
    m = re.search(r'\{\{Infobox([^\n]*)(.*?)\n\}\}', txt, re.S)
    if not m: return None, None
    kv = {}
    for line in re.split(r'\n\|', m.group(2)):
        if '=' in line: k, v = line.split('=', 1); kv[k.strip()] = v.strip()
    return kv, txt[m.end():]
def split_source(raw):
    parts = re.findall(r'<li[^>]*>(.*?)</li>', raw, re.S) if '<li' in raw else re.split(r'•|<br\s*/?>', raw)
    return [p for p in (wl(x).replace('*', '').strip() for x in parts) if p]
def first_sentence(body):
    para = next((wl(l) for l in body.strip().split('\n') if l.strip() and not l.startswith((':', '=', '{', '|', '!', '*', '#', '[[File', '<'))), '')
    return re.split(r'(?<=[.!?])\s', para)[0][:260] if para else ''
def stats_of(raw):
    out = []
    for m in re.finditer(r"\{\{[Nn]ame\|([^|}]+)\|([^|}]+)\}\}", raw or ''):
        label = STAT_LABELS.get(m.group(1).strip().lower())
        if label: out.append({'label': label, 'value': m.group(2).replace('&minus;', '−').replace('-', '−').strip()})
    return out
def enchant_of(raw):
    rest = re.sub(r"\{\{[^}]*\}\}", '', raw or ''); rest = re.sub(r'\[\[File:[^\]]*\]\]', '', rest)
    return wl(rest) or None

TYPES = {'sword': 'Épée', 'épée': 'Épée', 'dagger': 'Dague', 'dague': 'Dague', 'club': 'Gourdin', 'gourdin': 'Gourdin', 'slingshot': 'Lance-pierre'}
items = []; seen = set()
for cat in ('Épées', 'Dagues', 'Gourdins', 'Lance-pierres', 'Chaussures'):
    for title, txt in d[cat].items():
        kv, body = infobox(txt)
        if kv is None: continue
        kind = 'Chaussures' if cat == 'Chaussures' else TYPES.get(kv.get('type', '').strip().lower())
        if kind is None: print('type inconnu', title, kv.get('type')); continue
        name = norm(wl(kv.get('name') or title))
        if name in seen: continue
        seen.add(name)
        dm = re.fullmatch(r'\s*(\d+)\s*[-–]\s*(\d+)\s*', kv.get('damage', ''))
        csc = re.fullmatch(r'\s*0?\.(\d+)\s*', kv.get('csc', ''))
        crit = round(float('0.' + csc.group(1)) * 100, 1) if csc else None
        lvl = re.fullmatch(r'\s*(\d+)\s*', kv.get('level', ''))
        gp = price_of(kv.get('gprice')); sp = price_of(kv.get('value'))
        enchant = None
        st_raw = re.search(r'\|?\s*stats\s*=(.*)', '\n|'.join([f'{k} = {v}' for k, v in kv.items() if k == 'stats']), re.S)
        stats_raw = kv.get('stats', '')
        items.append(dict(id=slug(kind + '-' + name), name=name, kind=kind, level=int(lvl.group(1)) if lvl else None,
                          damage=[int(dm.group(1)), int(dm.group(2))] if dm else None, crit=crit, stats=stats_of(stats_raw), enchant=enchant_of(stats_raw),
                          where=split_source(kv.get('source', '')), sellPrice=sp, shopPrice=gp, desc=first_sentence(body)))
json.dump(items, open('equipment_final.json', 'w'), ensure_ascii=False, indent=1)
import collections
print(len(items), collections.Counter(i['kind'] for i in items))
for i in items[:2] + [x for x in items if x['kind'] == 'Chaussures'][:2] + [x for x in items if x['kind'] == 'Lance-pierre'][:1]: print(json.dumps(i, ensure_ascii=False)[:520])
print('sans lieu:', [i['name'] for i in items if not i['where']], '| sans stats chaussures:', [i['name'] for i in items if i['kind'] == 'Chaussures' and not i['stats']])
