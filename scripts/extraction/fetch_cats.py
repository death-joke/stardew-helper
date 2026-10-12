import json, re, subprocess, urllib.parse
API = 'https://fr.stardewvalleywiki.com/mediawiki/api.php'
def get(params):
    args = ['curl', '-sL', API] + sum([['--data-urlencode', f'{k}={v}'] for k, v in params.items()], [])
    return json.loads(subprocess.run(args, capture_output=True, text=True).stdout)
CATS = ['Ressources', 'Produits animaliers', 'Produits artisanaux', 'Déchets', 'Butin de monstre']
out = {}
for cat in CATS:
    d = get({'action': 'query', 'list': 'categorymembers', 'cmtitle': 'Catégorie:' + cat, 'cmlimit': '100', 'format': 'json'})
    titles = [m['title'] for m in d['query']['categorymembers'] if m['ns'] == 0]
    pages = {}
    for i in range(0, len(titles), 25):
        chunk = titles[i:i+25]
        r = get({'action': 'query', 'prop': 'revisions', 'rvprop': 'content', 'rvslots': 'main', 'titles': '|'.join(chunk), 'format': 'json', 'formatversion': '2'})
        for p in r['query']['pages']:
            if 'revisions' in p: pages[p['title']] = p['revisions'][0]['slots']['main']['content']
    out[cat] = pages
    print(cat, len(titles), len(pages))
json.dump(out, open('cats_raw.json', 'w'), ensure_ascii=False)
