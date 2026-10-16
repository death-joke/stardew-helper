"""Effets et ingrédients des anneaux -> src/data/rings.ts.

Entrée : Anneaux.html (page « Anneaux » rendue via action=parse). Sortie sur stdout, à rediriger vers src/data/rings.ts.
"""
import json, re
from tables import load, clean


def norm(s):
    return s.replace('\xa0', ' ').replace("'", '’').strip()


def ingredients(cell):
    out = []
    for part in cell.split('‖'):
        m = re.match(r'^\s*(.*?)\s*\((\d+)\)\s*$', part)
        if m:
            out.append({'name': norm(m.group(1)), 'qty': int(m.group(2))})
    return out


table = next(t for t in load('Anneaux') if t['rows'] and len(t['rows'][0]) == 8)
print("import type { Ingredient } from './types'\n")
print('// Effets et ingrédients des anneaux, extraits du wiki FR (fr.stardewvalleywiki.com/Anneaux, 1.6) par script : ne pas retoucher à la main sans vérifier.')
print('export interface RingDetails {\n  name: string\n  effect: string\n  ingredients: Ingredient[]\n}\n')
print('export const RINGS: RingDetails[] = [')
for row in table['rows'][1:]:
    c = [c['t'].replace('\xa0', ' ') for c in row]
    effect = norm(re.sub(r'\s+', ' ', clean(c[3])))
    if effect.count('"') % 2:  # guillemet fermant oublié sur le wiki
        effect = effect.replace('guerrière après', 'guerrière" après')
    entry = {'name': norm(clean(c[1])), 'effect': effect, 'ingredients': ingredients(c[5])}
    print('  ' + json.dumps(entry, ensure_ascii=False) + ',')
print(']')
