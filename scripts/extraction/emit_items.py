import re, json, unicodedata
from tables import load, clean

def slug(n):
    n = unicodedata.normalize('NFD', n.lower())
    n = ''.join(c for c in n if unicodedata.category(c) != 'Mn')
    return re.sub(r'[^a-z0-9]+', '-', n).strip('-')

def norm(s):
    return s.replace('\xa0', ' ').replace("'", '’').replace('Oeuf', 'Œuf').replace('Oeil', 'Œil').replace('oeuf', 'œuf')

def parts(cell):
    """Texte de cellule → liste d'éléments (séparateurs « ‖ » et « | »)."""
    return [norm(p.strip()) for p in re.split(r'‖|\|', cell) if p.strip()]

def first_price(cell):
    m = re.search(r'(\d[\d\s]*)\s*po', cell.replace('\xa0', ' '))
    return int(re.sub(r'\s', '', m.group(1))) if m else None

items = []
def add(name, category, sub, desc, price, where, used):
    items.append(dict(id=slug(category + '-' + name), name=norm(name), category=category, sub=sub, desc=norm(desc), price=price, where=where, usedIn=used))

def collect(page, cat_by_section, default_sub=None):
    for t in load(page):
        rows = t['rows']
        if not rows: continue
        hdr = [clean(c['t']) for c in rows[0]]
        if 'Nom' not in hdr or t['sec'] not in cat_by_section: continue
        ix = {h: i for i, h in enumerate(hdr)}
        category, sub = cat_by_section[t['sec']]
        for r in rows[1:]:
            if len(r) != len(hdr) or r[0]['th']: continue
            g = lambda col: r[ix[col]]['t'] if col in ix else ''
            name = clean(g('Nom'))
            if not name: continue
            where = parts(g('Localisation')) if 'Localisation' in ix else ([sub] if sub else [])
            if 'Saison' in ix and not where: where = [sub or '']
            if 'Saison' in ix and category == 'Cueillette': sub_ = f"{sub} · {clean(g('Saison'))}"
            else: sub_ = sub
            price_cell = g('Prix de vente') or g('Prix')
            add(name, category, sub_, clean(g('Description')) if 'Description' in ix else '', first_price(price_cell) if price_cell else None, where,
                parts(g('Utilisé dans')) if 'Utilisé dans' in ix else [])

collect('Mineraux', {'Minéraux cueillis': ('Minéraux', None), 'Gemmes': ('Gemmes', None), 'Minéraux de géodes': ('Minéraux de géode', None), 'Géodes': ('Géodes', None)})
collect('Artefacts', {'Artefacts': ('Artefacts', None)})
collect('Cueillette', {'Basique': ('Cueillette', 'Toute l’année'), 'Printemps': ('Cueillette', 'Printemps'), 'Été': ('Cueillette', 'Été'), 'Automne': ('Cueillette', 'Automne'),
                       'Hiver': ('Cueillette', 'Hiver'), 'La plage': ('Cueillette', 'La plage'), 'Les mines': ('Cueillette', 'Les mines')})
ids = {}
for it in items:
    n = ids.get(it['id'], 0); ids[it['id']] = n + 1
    if n: it['id'] += f'-{n + 1}'
json.dump(items, open('items_final.json', 'w'), ensure_ascii=False, indent=1)
import collections
print(len(items), collections.Counter(i['category'] for i in items))
for i in items[:2] + [x for x in items if x['category'] == 'Cueillette'][:2] + [x for x in items if x['category'] == 'Artefacts'][:2]: print(i)
print('sans lieu:', [i['name'] for i in items if not i['where']])

# ---- Catégories du wiki : fiches (infobox) -------------------------------------------------------
# Table anglais -> français : champ `eng` des fiches, sections du tableau des poissons, noms de fichiers des cultures
EN2FR = {}
for fn in ('cats_raw.json', 'cats_raw2.json'):
    for _cat, _pages in json.load(open(fn, encoding='utf-8')).items():
        for _title, _txt in _pages.items():
            _m = re.search(r'\|\s*eng\s*=\s*([^\n|]+)', _txt)
            if _m: EN2FR.setdefault(_m.group(1).strip().lower(), re.sub(r'\s*\((?:ressource|article)\)$', '', _title))
for _f in json.load(open('fish.json', encoding='utf-8')):
    if _f.get('name') and _f.get('key'): EN2FR.setdefault(_f['key'].lower(), _f['name'])
for _m in re.finditer(r"===\[\[File:([^\].|]+)\.png\]\]\s*\[\[([^\]|]+)\]\]===", open('crops.raw', encoding='utf-8').read()):
    EN2FR.setdefault(_m.group(1).strip().lower(), _m.group(2).strip())

for _k, _v in json.load(open('en2fr_extra.json', encoding='utf-8')).items(): EN2FR.setdefault(_k, _v)

def _name_tpl(m):
    key, rest = m.group(1).strip(), (m.group(2) or '').lstrip('|')
    fr = EN2FR.get(key.lower())
    if not fr: return ''
    first = rest.split('|')[0].strip() if rest else ''
    return f"{first} × {fr}" if first.isdigit() else fr

def wl(s):
    s = re.sub(r"\{\{[Nn]ame\|([^|}]+)((?:\|[^}]*)?)\}\}", _name_tpl, s)
    s = re.sub(r"\{\{[Pp]rice\|(\d[\d.,]*)[^}]*\}\}", r"\1 po", s)  # {{price|5000}} -> 5000 po
    s = re.sub(r"\[\[File:[^\]]*\]\]", '', s)
    s = re.sub(r"\[\[([^\]|]+)\|([^\]]+)\]\]", r"\2", s)
    s = re.sub(r"\[\[([^\]]+)\]\]", r"\1", s)
    s = re.sub(r"\{\{[^}]*\}\}?", ' ', s).replace('}}', ' ')
    s = re.sub(r"<[^>]+>", ' ', s)
    s = re.sub(r"\b([LDld])'{3,4}", "\\1’", s)  # L'''Essence''' ou L''''Essence''' = « L’ » + gras
    s = re.sub(r"'{2,}", '', s)
    return re.sub(r'\s+', ' ', s).strip()

SKIP = ('Productivité', 'Rentabilité', 'Produits artisanaux', 'Déchets (article)', 'Déchets', 'Butin de monstre', 'Gelées et Cornichons')
CATS = {'Ressources': 'Ressources', 'Produits animaliers': 'Produits animaliers', 'Produits artisanaux': 'Produits artisanaux', 'Déchets': 'Déchets', 'Butin de monstre': 'Butin de monstre'}
raw = json.load(open('cats_raw.json', encoding='utf-8'))
have = {i['name'] for i in items}
for cat, label in CATS.items():
    for title, txt in raw[cat].items():
        if title.startswith(SKIP) or title in SKIP: continue
        m = re.search(r'\{\{Infobox(.*?)\n\}\}', txt, re.S)
        if not m: continue
        info = {}
        for line in m.group(1).split('\n|'):
            if '=' in line:
                k, v = line.split('=', 1); info[k.strip()] = v.strip()
        name = norm(re.sub(r'\s*\(ressource\)$', '', title))
        if name in have: continue
        have.add(name)
        src = wl(info.get('source', '')).replace('*', '•')
        where = [norm(p.strip()) for p in re.split(r'•', src) if p.strip()]
        price_raw = wl(info.get('sellprice', ''))
        price = int(price_raw) if re.fullmatch(r'\d+', price_raw) else None
        body = txt[m.end():].strip().split('\n')
        para = next((wl(l) for l in body if l.strip() and not l.startswith((':', '=', '{', '|', '!', '*', '#', '[[File'))), '')
        desc = norm(re.split(r'(?<=[.!?])\s', para)[0][:220]) if para else ''
        it = dict(id=slug(label + '-' + name), name=name, category=label, sub=None, desc=desc, price=price, where=where, usedIn=[])
        if price is None and price_raw and price_raw != 'N/A': it['priceNote'] = norm(price_raw)
        items.append(it)
json.dump(items, open('items_final.json', 'w'), ensure_ascii=False, indent=1)
print(len(items), collections.Counter(i['category'] for i in items))
for i in items[138:150] + items[-6:]: print(i['category'], '|', i['name'], '|', i['price'], i.get('priceNote', ''), '|', i['where'][:3], '|', i['desc'][:90])

# ---- Catégories supplémentaires (objets spéciaux, anneaux, livres, graines, etc.) -------------------
raw2 = json.load(open('cats_raw2.json', encoding='utf-8'))

def nrm(s):
    s = unicodedata.normalize('NFD', s.lower()); s = ''.join(c for c in s if unicodedata.category(c) != 'Mn')
    return s.replace('œ', 'oe').replace('æ', 'ae').replace('’', "'")

def price_of(raw):
    if not raw: return None
    m = re.search(r'\{\{[Pp]rice\|(\d+)', raw) or re.fullmatch(r'\s*(\d+)\s*', raw)
    return int(m.group(1)) if m else None

def split_source(raw):
    if '<li' in raw: parts = re.findall(r'<li[^>]*>(.*?)</li>', raw, re.S)
    else: parts = re.split(r'•|<br\s*/?>', raw)
    return [norm(wl(p).replace('*', '').strip()) for p in parts if wl(p).replace('*', '').strip()]

def infobox(txt):
    m = re.search(r'\{\{Infobox([^\n]*)(.*?)\n\}\}', txt, re.S)
    if not m: return None, None
    kv = {}
    for line in re.split(r'\n\|', m.group(2)):
        if '=' in line: k, v = line.split('=', 1); kv[k.strip()] = v.strip()
    return kv, txt[m.end():]

def first_sentence(body):
    para = next((wl(l) for l in body.strip().split('\n') if l.strip() and not l.startswith((':', '=', '{', '|', '!', '*', '#', '[[File', '<'))), '')
    return norm(re.split(r'(?<=[.!?])\s', para)[0][:240]) if para else ''

SEED_VENDORS = {'gPrice': 'Pierre', 'oPrice': 'Oasis', 'tPrice': 'Chariot ambulant', 'jPrice': 'Marché Joja'}
EXTRA = [('Objets spéciaux', 'Objets spéciaux', None), ('Anneaux', 'Anneaux', None), ('Livres', 'Livres', None), ('Graines', 'Graines', None), ('Matériel de pêche', 'Matériel de pêche', None),
         ('Appât', 'Appâts', None), ('Bibelots', 'Bibelots', None), ('Ingrédients', 'Ingrédients', None), ('Cueillette du désert', 'Cueillette', 'Désert'),
         ('Cueillette du volcan', 'Cueillette', 'Donjon du volcan'), ('Fruits', 'Fruits et légumes', None), ('Légumes', 'Fruits et légumes', None)]
SKIP2 = ('Erreur d\'objet', 'Obélisque')
existing = {nrm(i['name']) for i in items}
crop_names = {nrm(n) for n in re.findall(r"name: '([^']+)'", open('/Users/leborgnekevin/Project/stardew-helper/src/data/crops.ts', encoding='utf-8').read().replace("\\'", "'"))}
fish_names = {nrm(n) for n in re.findall(r"name: '([^']+)'", open('/Users/leborgnekevin/Project/stardew-helper/src/data/fish.ts', encoding='utf-8').read().replace("\\'", "'"))}
added = collections.Counter()
for cat, label, sub in EXTRA:
    for title, txt in raw2[cat].items():
        if title in SKIP2 or title.startswith(SKIP2): continue
        kv, body = infobox(txt)
        if kv is None: continue
        name = norm(re.sub(r'\s*\((?:ressource|article)\)$', '', kv.get('name') or title))
        if label == 'Fruits et légumes' and (nrm(name) in crop_names or nrm(name) in existing): continue
        key = nrm(name)
        if key in existing or (label in ('Fruits et légumes',) and key in fish_names): continue
        existing.add(key)
        price = price_of(kv.get('sellprice')) if price_of(kv.get('sellprice')) is not None else price_of(kv.get('value'))
        if 'crop' in kv:  # graines : on ne garde que les informations propres
            crop_txt = wl(kv.get('crop', '')); growth = wl(kv.get('growth', '')); season = {'All': 'Toutes'}.get(wl(kv.get('season', '')), wl(kv.get('season', '')))
            parts = []
            if crop_txt and crop_txt not in ('Varie', 'Varies'): parts.append(f"Donne : {crop_txt}")
            if re.fullmatch(r'\d+ jours?', growth): parts.append(f"pousse en {growth}")
            if season and re.fullmatch(r"[A-Za-zÀ-ÿ ,/]+", season): parts.append(f"saison : {season}")
            where = [' · '.join(parts)] if parts else []
            for k, v in SEED_VENDORS.items():
                if k in kv and price_of(kv[k]) is not None: where.append(f"{v} : {price_of(kv[k])} po")
            if kv.get('source') == 'crafting': where.append('Fabrication')
        else:
            where = split_source(kv.get('source', ''))
        it = dict(id=slug(label + '-' + name), name=name, category=label, sub=sub, desc=first_sentence(body), price=price, where=where, usedIn=[])
        sp = wl(kv.get('sellprice', '')) if kv.get('sellprice') else ''
        if price is None and sp and sp not in ('N/A', 'Non vendu'): it['priceNote'] = norm(sp)
        items.append(it); added[label] += 1
ids = {}
for it in items:
    n = ids.get(it['id'], 0); ids[it['id']] = n + 1
    if n: it['id'] += f'-{n + 1}'
json.dump(items, open('items_final.json', 'w'), ensure_ascii=False, indent=1)
print('ajoutés :', dict(added), '| total', len(items))
for i in [x for x in items if x['name'] in ('Dent de dragon', 'Bague magnétique', 'Mangue', 'Graines de cactus', 'Leurre', 'Livre des étoiles', 'Boîte de fées')]:
    print(i['category'], '|', i['name'], '|', i['price'], '|', i['where'][:3], '|', i['desc'][:80])
