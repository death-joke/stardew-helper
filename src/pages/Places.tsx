import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Card } from '../components/Card'
import { PLACES } from '../data/places'
import type { Place } from '../data/types'
import { filterPlaces, groupByArea, linkTarget } from '../lib/places'

export function Places() {
  const [params] = useSearchParams()
  const [query, setQuery] = useState(params.get('q') ?? '')

  const groups = groupByArea(filterPlaces(PLACES, query))
  const count = groups.reduce((n, g) => n + g.places.length, 0)

  return (
    <div className="space-y-4">
      <Card title="Lieux" icon="🗺️">
        <input
          type="search"
          aria-label="Rechercher un lieu"
          placeholder="Rechercher un lieu, une condition…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="field w-full"
        />
        <p className="mt-3 text-sm text-muted">{count} lieu{count > 1 ? 'x' : ''} : où ils sont et comment les débloquer.</p>
      </Card>

      {count === 0 && <p className="text-sm text-muted">Aucun lieu avec cette recherche.</p>}
      {groups.map((g) => (
        <section key={g.area}>
          <h2 className="mb-2 font-pixel text-xs leading-5 text-wood-dark">{g.area}</h2>
          <ul className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {g.places.map((p) => <PlaceCard key={p.id} place={p} />)}
          </ul>
        </section>
      ))}
    </div>
  )
}

function PlaceCard({ place: p }: { place: Place }) {
  return (
    <li className="rounded-lg border border-wood/30 bg-card p-3 shadow-sm">
      <h3 className="font-semibold">{p.name}</h3>
      <p className="text-xs text-muted">{p.region}</p>
      <p className="mt-2 text-sm"><span className="font-semibold">Pour y accéder : </span>{p.unlock}</p>
      {p.notes && <p className="mt-1 text-sm text-muted">{p.notes}</p>}
      {p.links && p.links.length > 0 && (
        <ul className="mt-2 flex flex-wrap gap-1.5">
          {p.links.map((l) => {
            const to = linkTarget(l)
            return (
              <li key={`${l.kind}-${l.name}`}>
                {to
                  ? <Link to={to} className="rounded-full border border-wood/30 bg-parchment px-2 py-0.5 text-xs underline">{l.kind === 'quete' ? '📜' : '🏗️'} {l.name}</Link>
                  : <span className="text-xs">{l.name}</span>}
              </li>
            )
          })}
        </ul>
      )}
    </li>
  )
}
