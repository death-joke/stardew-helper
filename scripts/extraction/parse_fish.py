import re, json, sys
lines = open('poisson.raw', encoding='utf-8').read().split('\n')
def block(a, b): return '\n'.join(lines[a-1:b-1])
sections = {
  'canne': block(29, 817),
  'marche': block(817, 866),
  'legendaire': block(866, 968),
  'casier': block(968, 1104),
}
def clean(s):
    s = re.sub(r'\{\{Season\|(\w+)\}\}', r'@\1', s)
    s = re.sub(r'\{\{Weather inline\|(\w+)[^}]*\}\}', r'#\1', s)
    return s
out = []
for sec, text in sections.items():
    for m in re.finditer(r'<section begin="([^"]+)" />(.*?)<section end="\1" />', text, re.S):
        key, body = m.groups()
        cells = re.split(r'\n\| ', '\n' + body.strip())
        cells = [c.strip() for c in cells if c.strip()]
        out.append({'sec': sec, 'key': key, 'cells': cells})
json.dump(out, open('fish_cells.json', 'w'), ensure_ascii=False, indent=1)
print(len(out), {k: sum(1 for o in out if o['sec']==k) for k in sections})
for o in out[:3] + [x for x in out if x['sec']=='legendaire'][:2] + [x for x in out if x['sec']=='casier'][:2]:
    print(o['sec'], o['key']); [print('   ', i, repr(c[:150])) for i, c in enumerate(o['cells'])]
