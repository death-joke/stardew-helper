import json
d = json.load(open('fish_final.json'))
LEG = {'poisson-ecarlate': ['ocean'], 'poisson-pecheur': ['riviere'], 'legende': ['lac'], 'poisson-des-glaciers': ['riviere'], 'carpe-mutante': ['autre']}
for f in d['fish']:
    if f.get('legendary'):
        f['habitats'] = LEG[f['id']]
    f['wiki'] = f['name'].replace(' ', '_')
    if f['behavior'] == 'doux': f['behavior'] = 'lisses'  # le wiki FR écrit « doux » pour le Doré jaune (smooth)

def q(s): return "'" + s.replace('\\', '\\\\').replace("'", "\\'") + "'"
def ser(v):
    if isinstance(v, str): return q(v)
    if v is None: return 'null'
    if isinstance(v, bool): return 'true' if v else 'false'
    if isinstance(v, (int, float)): return str(v)
    if isinstance(v, list): return '[' + ', '.join(ser(x) for x in v) + ']'
    if isinstance(v, dict): return '{ ' + ', '.join(f'{k}: {ser(x)}' for k, x in v.items()) + ' }'
KEYS = ['id','name','price','where','habitats','seasons','windows','weather','difficulty','behavior','notes','bundles','legendary','wiki']
def row(f): return '  ' + ser({k: f[k] for k in KEYS if k in f and not (k == 'legendary' and not f[k])}) + ','

out = ["import type { CrabPotCreature, Fish, NightMarketFish } from './types'", "",
"// Données extraites du wiki FR (fr.stardewvalleywiki.com/Poisson, 1.6) par script : ne pas retoucher à la main sans vérifier.",
"// `windows` : plages horaires [début, fin] en heures de jeu (24 = minuit, 26 = 2h du matin) ; null = toute la journée.",
"export const FISH: Fish[] = ["]
out += [row(f) for f in d['fish']]
out += ["]", "", "// Pêchés uniquement dans le sous-marin du Marché nocturne (15-17 hiver).", "export const NIGHT_MARKET_FISH: NightMarketFish[] = ["]
out += ['  ' + ser(n) + ',' for n in d['night']]
out += ["]", "", "// Créatures des casiers à crabes. `chance` : sans / avec le métier Marin.", "export const CRAB_POT: CrabPotCreature[] = ["]
out += ['  ' + ser({'id': c['id'], 'name': c['name'], 'price': c['price'], 'where': c['where'], 'chance': c['chance'], 'chanceMariner': c['chanceMariner']}) + ',' for c in d['crab']]
out += ["]", ""]
open('/Users/leborgnekevin/Project/stardew-helper/src/data/fish.ts', 'w').write('\n'.join(out))
print(len(d['fish']))
