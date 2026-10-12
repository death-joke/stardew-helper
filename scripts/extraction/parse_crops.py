import re, json
lines = open('crops.raw', encoding='utf-8').read().split('\n')
text = '\n'.join(lines[100:1618])
SECTIONS = [(m.start(), m.group(1)) for m in re.finditer(r'^==(Récoltes[^=]*)==', text, re.M)]
blocks = re.split(r'\n(?====[^=])', text)
out = []
for b in blocks:
    m = re.match(r'===(?:\[\[File:[^\]]*\]\]\s*)?\[\[([^\]|]+)(?:\|([^\]]+))?\]\]===', b)
    if not m: continue
    name = (m.group(2) or m.group(1)).strip()
    pos = text.find(b[:60]); sec = [s for p, s in SECTIONS if p <= pos][-1]
    seeds = re.findall(r'\[\[([^\]|]+)(?:\|[^\]]+)?\]\]\s*:\s*\{\{[Pp]rice\|(\d+)\}\}', b)
    tot = re.search(r'Total\s*:\s*([\d\-–]+)\s*jours?', b)
    reg = re.search(r'Repousse\s*:\s*(?:<br\s*/?>)?\s*(\d+)\s*jours?', b)
    sell = re.search(r'\{\{Qualityprice\|[^|]+\|(\d+)', b)
    out.append(dict(name=name, section=sec, seeds=seeds, total=tot.group(1) if tot else None, regrow=int(reg.group(1)) if reg else None,
                    sell=int(sell.group(1)) if sell else None))
json.dump(out, open('crops_wiki.json', 'w'), ensure_ascii=False, indent=1)
print(len(out))
for o in out: print(o['section'][10:18].ljust(9), o['name'].ljust(24), 'tot', str(o['total']).ljust(5), 'reg', str(o['regrow']).ljust(5), 'sell', str(o['sell']).ljust(5), o['seeds'])
