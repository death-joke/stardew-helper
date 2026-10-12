import json
items = json.load(open('items_final.json'))
def q(s): return "'" + s.replace('\\', '\\\\').replace("'", "\\'") + "'"
def ser(v):
    if isinstance(v, str): return q(v)
    if v is None: return 'null'
    if isinstance(v, bool): return 'true' if v else 'false'
    if isinstance(v, (int, float)): return str(v)
    if isinstance(v, list): return '[' + ', '.join(ser(x) for x in v) + ']'
    if isinstance(v, dict): return '{ ' + ', '.join(f'{k}: {ser(x)}' for k, x in v.items()) + ' }'
KEYS = ['id', 'name', 'category', 'sub', 'desc', 'price', 'priceNote', 'where', 'usedIn']
out = ["import type { Item } from './types'", "",
"// Extraits du wiki FR par script (pages Minéraux, Artefacts, Cueillette et catégories Ressources, Produits animaliers, Produits artisanaux, Déchets, Butin de monstre,",
"// Objets spéciaux, Anneaux, Livres, Graines, Matériel de pêche, Appât, Bibelots, Ingrédients…) : ne pas retoucher à la main sans vérifier.",
"// Les cultures et poissons ont leurs propres données (crops.ts, fish.ts) et sont ajoutés au catalogue dans lib/items.ts.",
"export const ITEMS: Item[] = ["]
out += ['  ' + ser({k: i[k] for k in KEYS if k in i}) + ',' for i in items]
out += ["]", ""]
open('/Users/leborgnekevin/Project/stardew-helper/src/data/items.ts', 'w', encoding='utf-8').write('\n'.join(out))
print(len(items))
