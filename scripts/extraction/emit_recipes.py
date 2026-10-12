import re, json, unicodedata
from tables import load, clean

def slug(n):
    n = unicodedata.normalize('NFD', n.lower())
    n = ''.join(c for c in n if unicodedata.category(c) != 'Mn')
    return re.sub(r'[^a-z0-9]+', '-', n).strip('-')

def norm(s):  # typographie cohérente avec le reste de l'app
    return s.replace('‖', '').replace('  ', ' ').strip().replace("'", '’').replace('Oeuf', 'Œuf').replace('Oeufs', 'Œufs').replace('oeuf', 'œuf')

def ingredients(cell):
    parts = [p.strip() for p in cell.split('‖')] if '‖' in cell else [cell.strip()]
    out = []
    for p in parts:
        p = clean(p)
        if not p: continue
        m = re.match(r'^(.*?)\s*\((\d+)\)$', p)
        out.append({'name': norm(m.group(1).strip()) if m else norm(p), 'qty': int(m.group(2)) if m else 1})
    return out

def uniq(items):
    seen = {}
    for it in items:
        base = it['id']; n = seen.get(base, 0); seen[base] = n + 1
        if n: it['id'] = f'{base}-{n + 1}'
    return items

# --- Artisanat -----------------------------------------------------------------------------------
craft = []
for t in load('Fabrication'):
    rows = t['rows']
    hdr = [clean(c['t']) for c in rows[0]] if rows else []
    if 'Ingrédients' not in hdr: continue
    ix = {h: i for i, h in enumerate(hdr)}
    for r in rows[1:]:
        if len(r) != len(hdr): continue
        cells = [clean(c['t']) for c in r]
        d = dict(id=slug(cells[ix['Nom']]), name=norm(cells[ix['Nom']]), category=t['sec'], desc=norm(cells[ix['Description']]) if 'Description' in ix else '',
                 ingredients=ingredients(r[ix['Ingrédients']]['t']), source=norm(cells[ix['Source de recette']]) if 'Source de recette' in ix else '')
        craft.append(d)
uniq(craft)

# --- Cuisine -------------------------------------------------------------------------------------
cook = []
for t in load('Recettes'):
    for r in t['rows']:
        if len(r) < 9 or r[0]['th']: continue
        c = [clean(x['t']) for x in r]
        eh = re.match(r'^(\d+)\s*\|\s*(\d+)$', c[4])
        buff = '' if c[5] in ('N/A', '') else norm(re.sub(r'‖\s*', '', r[5]['t']).strip())
        buff = clean(buff).replace(' | ', ' ')
        dur = '' if c[6] in ('N/A', '') else c[6].replace(' | ', ' ')
        name = norm(c[1]); desc = norm(c[2]); desc = desc.split('/', 1)[1] if desc.startswith(name + '/') else desc
        cook.append(dict(id=slug(c[1]), name=name, desc=desc, ingredients=ingredients(r[3]['t']),
                         energy=int(eh.group(1)) if eh else None, health=int(eh.group(2)) if eh else None,
                         buff=norm(buff), buffDuration=dur, source=norm(c[7].replace(' | ', ' · ')), price=int(re.sub(r'\D', '', c[8]) or 0)))
uniq(cook)
json.dump(dict(craft=craft, cook=cook), open('recipes_final.json', 'w'), ensure_ascii=False, indent=1)
print(len(craft), len(cook))
for x in craft[:2] + craft[-2:]: print(x)
for x in cook[:2] + cook[-2:]: print(x)
print([c['name'] for c in craft if not c['ingredients']], [c['name'] for c in cook if not c['ingredients']])
