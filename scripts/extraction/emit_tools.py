"""Outils (houes, pioches, haches, arrosoirs, poubelles, tamis, cannes à pêche, sacs, faux…) -> src/data/tools.ts.

Entrée : Outils.html (page « Outils » rendue via action=parse). Sortie sur stdout, à rediriger vers src/data/tools.ts.
"""
import json, re, unicodedata
from tables import load, clean


def slug(n):
    n = unicodedata.normalize('NFD', n.lower())
    n = ''.join(c for c in n if unicodedata.category(c) != 'Mn')
    return re.sub(r'[^a-z0-9]+', '-', n).strip('-')


def txt(cell):
    t = clean(cell['t']).replace('‖', '').replace('\xa0', ' ')
    t = re.sub(r'\s*\|\s*', ' ', t)
    return re.sub(r'\s+', ' ', t).strip().replace("'", '’')


def ingredients(cell):
    out = []
    for part in cell['t'].split('‖'):
        m = re.match(r'^\s*(.*?)\s*\((\d+)\)\s*$', re.sub(r'\s+', ' ', part.replace('|', ' ')).strip())
        if m:
            out.append({'name': m.group(1).replace("'", '’'), 'qty': int(m.group(2))})
    return out


def price(s):
    m = re.match(r'^([\d\s]+)po$', s)
    return (int(m.group(1).replace(' ', '')), None) if m else (None, s)


tabs = {t['sec']: t for t in load('Outils') if t['sec']}
lines = []


def level(name, cost, ing, effect, where='', requires=''):
    p, note = price(cost)
    lv = {'name': name, 'price': p}
    if note and note != 'N/A':
        lv['priceNote'] = note
    lv['ingredients'] = ing
    lv['effect'] = effect
    if where:
        lv['where'] = where
    if requires:
        lv['requires'] = requires
    return lv


# Familles améliorables : Image | Nom | Coût | Ingrédients | Améliorations (la 4e colonne peut être « N/A »)
for sec, fam in [('Houes', 'Houe'), ('Pioches', 'Pioche'), ('Haches', 'Hache'), ('Arrosoirs', 'Arrosoir'), ('Poubelles', 'Poubelle'), ('Tamis', 'Tamis')]:
    lv = []
    for r in tabs[sec]['rows'][1:]:
        c = [txt(x) for x in r]
        lv.append(level(c[1], c[2], ingredients(r[3]), c[4]))
    if fam != 'Tamis':  # wiki (Forgeron) : Clint améliore les quatre outils principaux et la poubelle en 2 jours
        for v in lv[1:]:
            v['days'] = 2
    lines.append({'id': slug(fam), 'name': fam, 'group': 'amelioration', 'levels': lv})

# Cannes à pêche : Image | Nom | Coût | Améliorations | Localisation | Conditions
lv = []
for r in tabs['Cannes à pêche']['rows'][1:]:
    c = [txt(x) for x in r]
    lv.append(level(c[1], c[2], [], c[3], where=c[4], requires=c[5]))
lines.append({'id': 'cannes-a-peche', 'name': 'Cannes à pêche', 'group': 'peche', 'levels': lv})

# Autres outils : Image | Nom | Coût | Description | Où le trouver ; les sacs et les faux forment chacun une famille
fam = {}
for r in tabs['Autres Outils']['rows'][1:]:
    c = [txt(x) for x in r]
    name = c[1].replace('slots', 'emplacements')
    key = 'Sac à dos' if name.startswith(('Sac', 'Grand sac')) else 'Faux' if name.startswith('Faux') else name
    fam.setdefault(key, []).append(level(name, c[2], [], c[3], where=c[4]))
for key, lv in fam.items():
    lines.append({'id': slug(key), 'name': key, 'group': 'autre', 'levels': lv})

print("import type { ToolLine } from './types'\n")
print('// Outils : niveaux, prix, ingrédients et effets, extraits du wiki FR (fr.stardewvalleywiki.com/Outils, 1.6) par script : ne pas retoucher à la main sans vérifier.')
print('// `price` : null pour un outil de départ ou non vendu (`priceNote` donne la raison). `ingredients` : barres de métal demandées par Clint.')
print('export const TOOLS: ToolLine[] = [')
for l in lines:
    print('  ' + json.dumps(l, ensure_ascii=False) + ',')
print(']')
