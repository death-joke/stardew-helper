import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Card } from '../components/Card'
import type { Quest, QuestKind } from '../data/types'
import { KIND_TABS, filterQuests, questsOfKind } from '../lib/quests'
import { PLACES } from '../data/places'

const TABS = Object.keys(KIND_TABS) as QuestKind[]
const isKind = (v: string | null): v is QuestKind => TABS.includes(v as QuestKind)

const HINTS: Record<QuestKind, string> = {
  histoire: 'Quêtes déclenchées par le courrier, des lieux ou des événements. Elles ne comptent pas pour les succès de coursier.',
  speciale: 'Tableau devant le manoir de Lewis (dès le 2 Automne de l’année 1) : deux nouvelles commandes chaque lundi, dont une à choisir.',
  qi: 'Tableau de la chambre des noix de M. Qi (Île Gingembre), à partir de 100 noix dorées : deux commandes chaque lundi.',
}

export function Quests() {
  const [params] = useSearchParams()
  const tabParam = params.get('tab')
  const [tab, setTab] = useState<QuestKind>(isKind(tabParam) ? tabParam : 'histoire')
  const [query, setQuery] = useState(params.get('q') ?? '')

  const list = filterQuests(questsOfKind(tab), query)

  return (
    <div className="space-y-4">
      <Card title="Quêtes" icon="📜">
        <div role="tablist" className="mb-3 flex gap-1">
          {TABS.map((t) => (
            <button
              key={t}
              role="tab"
              aria-selected={t === tab}
              onClick={() => setTab(t)}
              className={`flex-1 rounded px-2 py-1.5 text-sm ${t === tab ? 'bg-wood text-parchment' : 'bg-parchment-dark hover:bg-parchment-dark/70'}`}
            >
              {KIND_TABS[t]} ({questsOfKind(t).length})
            </button>
          ))}
        </div>
        <input
          type="search"
          aria-label="Rechercher une quête"
          placeholder="Rechercher une quête, un objet, un villageois…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="field w-full"
        />
        <p className="mt-3 text-sm text-muted">{list.length} quête{list.length > 1 ? 's' : ''}. {HINTS[tab]}</p>
      </Card>

      {list.length === 0 ? (
        <p className="text-sm text-muted">Aucune quête avec cette recherche.</p>
      ) : (
        <ul className="grid gap-3 md:grid-cols-2">
          {list.map((q) => <QuestCard key={q.id} quest={q} />)}
        </ul>
      )}
    </div>
  )
}

function placesFor(quest: Quest) {
  return PLACES.filter((p) => p.links?.some((l) => l.kind === 'quete' && l.name === quest.name))
}

function QuestCard({ quest: q }: { quest: Quest }) {
  const places = placesFor(q)
  return (
    <li className="rounded-lg border border-wood/30 bg-card p-3 shadow-sm">
      <div className="flex items-baseline justify-between gap-2">
        <h3 className="font-semibold">{q.name}</h3>
        {q.duration && <span className="shrink-0 rounded bg-parchment-dark px-1.5 text-xs">{q.duration}</span>}
      </div>
      {q.giver && <p className="text-xs text-muted">Donnée par {q.giver}{q.repeatable && ' · répétable'}</p>}
      <p className="mt-1 text-sm text-muted">{q.text}</p>
      <dl className="mt-2 space-y-1 text-sm">
        <div><dt className="inline font-semibold">{q.kind === 'histoire' ? 'Déclencheur' : 'Prérequis'} : </dt><dd className="inline">{q.unlock}</dd></div>
        <div><dt className="inline font-semibold">Objectif : </dt><dd className="inline">{q.objective}</dd></div>
        {q.reward && <div><dt className="inline font-semibold">Récompense : </dt><dd className="inline">{q.reward}</dd></div>}
      </dl>
      {places.length > 0 && (
        <p className="mt-2 text-xs">
          Lieu lié : {places.map((p, i) => (
            <span key={p.id}>{i > 0 && ', '}<Link to={`/lieux?q=${encodeURIComponent(p.name)}`} className="text-wood underline">{p.name}</Link></span>
          ))}
        </p>
      )}
    </li>
  )
}

