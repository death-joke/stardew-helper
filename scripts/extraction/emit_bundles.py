import re, json, unicodedata
from tables import load, clean

def slug(n):
    n = unicodedata.normalize('NFD', n.lower())
    n = ''.join(c for c in n if unicodedata.category(c) != 'Mn')
    return re.sub(r'[^a-z0-9]+', '-', n).strip('-')
def norm(s):
    return s.replace('\xa0', ' ').replace("'", '’').replace('Oeuf', 'Œuf').replace('oeuf', 'œuf').replace('Oeil', 'Œil')

html = open('Paquets.html', encoding='utf-8').read()
tabs = load('Paquets')

def name_qty(cell):
    t = clean(cell).replace('‖', '').strip(' |')
    m = re.match(r'^(.*?)\s*\((\d+)\)$', t)
    return (norm(m.group(1).strip()), int(m.group(2))) if m else (norm(t), 1)

# nombre de cases (= objets à fournir) : images « Bundle Slot » entre l'en-tête d'un paquet et le suivant
bundle_names = [clean(t['rows'][0][0]['t']) for t in tabs if t['rows'] and len(t['rows'][0]) == 1 and clean(t['rows'][0][0]['t']).startswith('Paquet')]
pos, cursor = [], 0
for n in bundle_names:
    i = html.find('>' + n.replace("'", '&#39;'), cursor)
    if i < 0: i = html.find(n, cursor)
    if i < 0: raise SystemExit('en-tête introuvable : ' + n)
    pos.append(i); cursor = i + 1
pos.append(len(html))
slots = {n: len(re.findall(r'<img[^>]*Bundle[ _]Slot[^>]*>', html[pos[k]:pos[k + 1]])) for k, n in enumerate(bundle_names)}

rooms, cur = [], None
for t in tabs:
    rows = t['rows']
    if not rows: continue
    first = [clean(c['t']) for c in rows[0]]
    if len(rows) == 1 and len(first) == 3 and 'Récompense' in first[1]:
        cur = dict(id=slug(t['sec']), name=norm(t['sec']), reward=norm(first[2]), bundles=[])
        rooms.append(cur)
        continue
    if len(first) == 1 and first[0].startswith('Paquet') and cur is not None:
        name = first[0]
        items, reward = [], None
        for r in rows[1:]:
            cells = [clean(c['t']) for c in r]
            if not any(cells): continue  # ligne d'images (cases) fusionnée sur plusieurs lignes
            if cells[0].startswith('Récompense'):
                reward = name_qty(r[1]['t']); continue
            if len(r) >= 4: nm, note = r[2], cells[3]          # première ligne : image + cases + objet + lieu
            elif len(r) == 2 and cells[0] == '': nm, note = r[1], ''   # paquet d'argent : ['', '2 500po']
            else: nm, note = r[0], cells[1]
            n_, q_ = name_qty(nm['t'])
            items.append(dict(name=n_, qty=q_, note=norm(note.replace(' | ', ' · '))))
        cur['bundles'].append(dict(id=slug(name), name=norm(name), slots=slots[name] or len(items), items=items,
                                   reward=dict(name=reward[0], qty=reward[1]) if reward else None))
json.dump(rooms, open('bundles_final.json', 'w'), ensure_ascii=False, indent=1)
print(len(rooms), sum(len(r['bundles']) for r in rooms))
for r in rooms:
    print(r['name'], '|', r['reward'])
    for b in r['bundles']: print('   ', b['name'].ljust(34), 'cases', b['slots'], 'objets', len(b['items']), '| récompense', b['reward'])
