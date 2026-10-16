"""Quêtes d'histoire, commandes spéciales (tableau de Lewis) et commandes de M. Qi -> src/data/quests.ts.

Entrée : Quetes.html (page « Quêtes » rendue via action=parse). Sortie : écrite sur stdout, à rediriger vers src/data/quests.ts.
"""
import json, re, sys, unicodedata
from tables import load, clean


def slug(n):
    n = unicodedata.normalize('NFD', n.lower())
    n = ''.join(c for c in n if unicodedata.category(c) != 'Mn')
    return re.sub(r'[^a-z0-9]+', '-', n).strip('-')


def txt(cell):
    t = clean(cell['t']).replace('‖', '').replace('\xa0', ' ')
    t = re.sub(r'\s*\|\s*', ' · ', t)
    t = re.sub(r'\s+', ' ', t).strip(' ·')
    t = re.sub(r'(\d)(po)\b', r'\1 \2', t)
    t = re.sub(r'^(La hache de Robine|Le panier de Linus)(?=[A-Z])', '', t)  # légende d'image collée au texte
    return t.replace("'", '’')


tabs = {t['sec']: t for t in load('Quetes')}
quests, seen = [], set()


def add(kind, name, **kw):
    qid = slug(name) or 'quete'
    base, n = qid, 2
    while (kind, qid) in seen:
        qid = f'{base}-{n}'; n += 1
    seen.add((kind, qid))
    quests.append(dict(id=qid, name=name, kind=kind, **kw))


prev = None  # dernière quête d'histoire complète : les lignes à cellules fusionnées (rowspan) en héritent le nom
steps = {}
for row in tabs["Liste des Quêtes d'Histoire"]['rows'][1:]:
    c = [txt(x) for x in row]
    if len(c) >= 5:
        add('histoire', c[0], text=c[1], unlock=c[2], objective=c[3], reward=c[4])
        prev = quests[-1]
        steps[prev['name']] = 1
    elif prev is not None and len(c) in (3, 4):
        # étape suivante d'une même quête : texte, condition, objectif[, récompense]
        steps[prev['name']] += 1
        label = 'variante Ferme des champs de prés' if prev['name'] == 'Comment bien démarrer' else f"étape {steps[prev['name']]}"
        add('histoire', f"{prev['name']} ({label})", text=c[0], unlock=c[1], objective=c[2], reward=c[3] if len(c) == 4 else prev['reward'])

for row in tabs['Liste des quêtes spéciales']['rows'][1:]:
    c = [txt(x) for x in row]
    add('speciale', c[0], text=c[1], giver=c[2], unlock=c[3], duration=c[4], objective=c[5], reward=c[6], repeatable=c[7].lower().startswith('oui'))

for row in tabs['Liste des quêtes spéciales de Qi']['rows'][1:]:
    c = [txt(x) for x in row]
    reward = c[4] + ' gemmes de Qi' if c[4].isdigit() else c[4]
    add('qi', c[0], text=c[1], unlock='Chambre des noix de M. Qi (100 noix dorées)', duration=c[2], objective=c[3], reward=reward)

print("import type { Quest } from './types'\n")
print("// Quêtes d'histoire, commandes spéciales et commandes de M. Qi, extraites du wiki FR (fr.stardewvalleywiki.com/Quêtes, 1.6) par script : ne pas retoucher à la main sans vérifier.")
print('export const QUESTS: Quest[] = [')
for q in quests:
    print('  ' + json.dumps(q, ensure_ascii=False) + ',')
print(']')
