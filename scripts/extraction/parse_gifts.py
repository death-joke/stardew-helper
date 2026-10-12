import json, re
from html.parser import HTMLParser
html = open('gifts.html', encoding='utf-8').read()
class P(HTMLParser):
    def __init__(self):
        super().__init__(); self.rows=[]; self.row=None; self.cell=None; self.li=None; self.depth_li=0
    def handle_starttag(self, tag, a):
        a = dict(a)
        if tag == 'tr': self.row = []
        elif tag in ('td','th') and self.row is not None: self.cell = {'text': '', 'items': [], 'title': None}; 
        elif tag == 'li' and self.cell is not None: self.li = ''
        elif tag == 'a' and self.cell is not None and self.cell['title'] is None and a.get('title'): self.cell['title'] = a['title']
        elif tag == 'br' and self.cell is not None:
            if self.li is not None: self.li += ' '
            self.cell['text'] += '\n'
    def handle_endtag(self, tag):
        if tag == 'li' and self.cell is not None and self.li is not None:
            t = re.sub(r'\s+', ' ', self.li).strip()
            if t: self.cell['items'].append(t)
            self.li = None
        elif tag in ('td','th') and self.cell is not None:
            self.row.append(self.cell); self.cell = None
        elif tag == 'tr' and self.row is not None:
            self.rows.append(self.row); self.row = None
    def handle_data(self, d):
        if self.cell is not None:
            self.cell['text'] += d
            if self.li is not None: self.li += d
p = P(); p.feed(html)
rows = [r for r in p.rows if len(r) >= 7]
out = {}
for r in rows:
    name = re.sub(r'\s+', ' ', r[0]['text']).strip()
    out[name] = dict(birthday=re.sub(r'\s+',' ', r[1]['text']).strip(), loves=r[2]['items'], likes=r[3]['items'], neutral=r[4]['items'], dislikes=r[5]['items'], hates=r[6]['items'])
json.dump(out, open('gifts_wiki.json','w'), ensure_ascii=False, indent=1)
print(len(out))

