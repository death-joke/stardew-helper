import re, sys
from html.parser import HTMLParser


class T(HTMLParser):
    """Extrait les tableaux (avec imbrication), le texte des cellules et la section h2/h3 courante.
    Un tableau imbriqué est aplati dans le texte de la cellule parente. Chaque <span class=nametemplate>
    ajoute un séparateur « ‖ » (un ingrédient / un objet)."""

    def __init__(self):
        super().__init__()
        self.skip = 0
        self.sec = ''
        self.in_h = False
        self.hbuf = ''
        self.tables = []
        self.stack = []  # tableaux ouverts : {'sec','rows','cls','row','cell'}

    def _top(self):
        return self.stack[-1] if self.stack else None

    def handle_starttag(self, tag, a):
        a = dict(a)
        if tag in ('style', 'script'):
            self.skip += 1
            return
        if tag in ('h2', 'h3', 'h4') and not self.stack:
            self.in_h = True
            self.hbuf = ''
        elif tag == 'table':
            self.stack.append({'sec': self.sec, 'rows': [], 'cls': a.get('class', ''), 'row': None, 'cell': None})
        top = self._top()
        if top is None:
            return
        if tag == 'tr':
            top['row'] = []
        elif tag in ('td', 'th') and top['row'] is not None:
            top['cell'] = {'t': '', 'th': tag == 'th', 'rowspan': int(a.get('rowspan', 1)), 'colspan': int(a.get('colspan', 1))}
        elif top['cell'] is not None:
            if tag == 'span' and 'nametemplate' in a.get('class', ''):
                top['cell']['t'] += ' ‖ '
            elif tag in ('br', 'li', 'p'):
                top['cell']['t'] += ' | '

    def handle_endtag(self, tag):
        if tag in ('style', 'script'):
            self.skip = max(0, self.skip - 1)
            return
        if tag in ('h2', 'h3', 'h4') and self.in_h:
            self.in_h = False
            self.sec = re.sub(r'\[.*?\]', '', self.hbuf).strip()
            return
        top = self._top()
        if top is None:
            return
        if tag in ('td', 'th') and top['cell'] is not None:
            top['row'].append(top['cell'])
            top['cell'] = None
        elif tag == 'tr' and top['row'] is not None:
            top['rows'].append(top['row'])
            top['row'] = None
        elif tag == 'table':
            done = self.stack.pop()
            parent = self._top()
            if parent is not None and parent['cell'] is not None:
                flat = ' '.join(c['t'] for r in done['rows'] for c in r)
                parent['cell']['t'] += ' | ' + flat + ' | '
            else:
                self.tables.append(done)

    def handle_data(self, d):
        if self.skip:
            return
        if self.in_h:
            self.hbuf += d
        top = self._top()
        if top is not None and top['cell'] is not None:
            top['cell']['t'] += d


def load(name):
    p = T()
    p.feed(open(name + '.html', encoding='utf-8').read())
    return p.tables


def clean(s):
    s = re.sub(r'data-sort-value="[^"]*"&?g?t?;?>?\s*', '', s).replace('\xa0', ' ')
    s = re.sub(r'(\s*\|\s*)+', ' | ', s)
    return re.sub(r'\s+', ' ', s).strip(' |')


if __name__ == '__main__':
    tabs = load(sys.argv[1])
    print(len(tabs), 'tables')
    for t in tabs[: int(sys.argv[2]) if len(sys.argv) > 2 else 3]:
        print('\n## sec=', t['sec'], 'cls=', t['cls'], 'rows=', len(t['rows']))
        for r in t['rows'][:4]:
            print('   ', [clean(c['t'])[:70] for c in r])
