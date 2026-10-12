import json, re
rows = json.load(open('pond_rows.json'))
RENAME = {'Esturgeon Oeufs de poisson': "Œufs d'esturgeon"}
def norm_item(s):
    s = RENAME.get(s, s)
    s = s.replace('Oeufs de', 'Œufs de').replace('Oeuf ', 'Œuf ').replace('Oeuf du', 'Œuf du')
    return s
def q(s): return "'" + s.replace('\\', '\\\\').replace("'", "\\'") + "'"
entries = []  # group consecutive rows with the same fish list
for r in rows:
    key = tuple(r['fish'])
    if not entries or entries[-1][0] != key: entries.append((key, []))
    m = re.match(r'(\d+)(?:-(\d+))?\s+(.*)$', r['item'])
    qmin, qmax, item = int(m.group(1)), int(m.group(2) or m.group(1)), norm_item(m.group(3))
    pop = int(re.match(r'(\d+)', r['pop']).group(1))
    chance = float(r['chance'].rstrip('%'))
    entries[-1][1].append((pop, item, qmin, qmax, chance))
out = ["import type { PondEntry } from './types'", "",
"// Production des étangs à poissons, extraite du wiki FR (fr.stardewvalleywiki.com/Étang_à_poissons, 1.6) par script.",
"// `minPopulation` : nombre de poissons requis (le « 10 » du wiki signifie population maximale). Les objets sont testés dans l'ordre listé.",
"// `chance` est en pourcentage, une fois passée la vérification « l'étang produit quelque chose ».",
"export const POND_PRODUCTION: PondEntry[] = ["]
for key, drops in entries:
    out.append("  {")
    out.append("    fish: [" + ', '.join(q(f) for f in key) + "],")
    out.append("    drops: [")
    for pop, item, a, b, c in drops:
        out.append(f"      {{ minPopulation: {pop}, item: {q(item)}, min: {a}, max: {b}, chance: {c:g} }},")
    out.append("    ],")
    out.append("  },")
out += ["]", "",
"// Capacité de départ d'un seul poisson (3 pour les autres espèces). Elle augmente avec les quêtes de population, jusqu'à 10.",
"export const POND_SINGLE_START = ['Poisson-blob', 'Poisson spectral', 'Poisson-glace', 'Anguille de lave', 'Slime-Jack', 'Poisson pierre', 'Esturgeon', 'Saumon du Vide', 'Poisson de forêt']",
""]
open('/Users/leborgnekevin/Project/stardew-helper/src/data/ponds.ts', 'w').write('\n'.join(out))
print(len(entries), sum(len(d) for _, d in entries))
