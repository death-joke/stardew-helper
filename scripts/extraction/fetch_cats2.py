import json, re, subprocess
API = 'https://fr.stardewvalleywiki.com/mediawiki/api.php'
def get(params):
    args = ['curl', '-sL', API] + sum([['--data-urlencode', f'{k}={v}'] for k, v in params.items()], [])
    return json.loads(subprocess.run(args, capture_output=True, text=True).stdout)
CATS = ['Objets spéciaux', 'Totems de téléportation', 'Graines', 'Engrais', 'Appât', 'Matériel de pêche', 'Ingrédients', 'Cueillette du désert', 'Cueillette du volcan', 'Cueillette minière',
        'Cueillette de plage', 'Objets', 'Bibelots', 'Anneaux', 'Livres', 'Champignons', 'Déchets', 'Butin de monstre', 'Ressources', 'Produits animaliers', 'Produits artisanaux', 'Artefacts', 'Géodes', 'Gemmes',
        'Minéraux cueillis', 'Minéraux de géodes', 'Fleurs', 'Fruits', 'Légumes', 'Arbres fruitiers', 'Cueillette']
out = {}
for cat in CATS:
    d = get({'action': 'query', 'list': 'categorymembers', 'cmtitle': 'Catégorie:' + cat, 'cmlimit': '200', 'format': 'json'})
    titles = [m['title'] for m in d['query']['categorymembers'] if m['ns'] == 0]
    pages = {}
    for i in range(0, len(titles), 25):
        r = get({'action': 'query', 'prop': 'revisions', 'rvprop': 'content', 'rvslots': 'main', 'titles': '|'.join(titles[i:i+25]), 'format': 'json', 'formatversion': '2'})
        for p in r['query']['pages']:
            if 'revisions' in p: pages[p['title']] = p['revisions'][0]['slots']['main']['content']
    out[cat] = pages
json.dump(out, open('cats_raw2.json', 'w'), ensure_ascii=False)
mine = open('/Users/leborgnekevin/Project/stardew-helper/src/data/items.ts', encoding='utf-8').read().replace('’', "'")
fish = open('/Users/leborgnekevin/Project/stardew-helper/src/data/fish.ts', encoding='utf-8').read().replace('’', "'")
crops = open('/Users/leborgnekevin/Project/stardew-helper/src/data/crops.ts', encoding='utf-8').read().replace('’', "'")
def have(t): return f"name: '{t}'" in mine.replace("\\'", "'") or f"name: '{t}'" in fish or f"name: '{t}'" in crops
for cat, pages in out.items():
    ti = [t for t, x in pages.items() if '{{Infobox' in x]
    missing = [t for t in ti if not have(re.sub(r'\s*\(.*\)$', '', t))]
    print(cat.ljust(24), 'pages', str(len(pages)).rjust(3), 'infobox', str(len(ti)).rjust(3), 'absents', str(len(missing)).rjust(3), missing[:8])
