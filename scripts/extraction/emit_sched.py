import json, re
d = json.load(open('schedules_final.json'))
bad = {t for r in d.values() for g in r['groups'] for b in g['blocks'] for t, x in b['rows'] if not re.fullmatch(r'\d{1,2}:\d{2}', t)}
assert not bad, bad
def q(s): return "'" + s.replace('\\', '\\\\').replace("'", "\\'") + "'"
out = ["import type { VillagerSchedule } from './types'", "",
"// Emplois du temps des villageois, extraits du wiki FR (section « Emploi du temps » de chaque fiche, 1.6) par script : ne pas retoucher à la main sans vérifier.",
"// Chargé à la demande (import dynamique) : le fichier est volumineux. `rows` : [heure (24 h), lieu / activité].",
"export const SCHEDULES: Record<string, VillagerSchedule> = {"]
for vid, r in d.items():
    out.append(f"  {q(vid)}: {{")
    out.append(f"    intro: {q(r['intro'])},")
    out.append("    groups: [")
    for g in r['groups']:
        out.append(f"      {{ label: {q(g['label'])}, blocks: [")
        for b in g['blocks']:
            rows = ', '.join('[' + q(t) + ', ' + q(x) + ']' for t, x in b['rows'])
            out.append(f"        {{ title: {q(b['title'].strip())}, rows: [{rows}] }},")
        out.append("      ] },")
    out.append("    ],")
    out.append("  },")
out += ["}", ""]
open('/Users/leborgnekevin/Project/stardew-helper/src/data/schedules.ts', 'w', encoding='utf-8').write('\n'.join(out))
print('ok', len(d))
