import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Card } from '../components/Card'
import { BUILDINGS, GROUP_LABELS } from '../data/buildings'
import type { Building, BuildingGroup, Ingredient } from '../data/types'
import { cumulativeCost, filterBuildings, formatPrice, upgradesOf } from '../lib/buildings'
import { itemLink } from '../lib/links'

const field = 'field'
const GROUPS = Object.keys(GROUP_LABELS) as BuildingGroup[]

export function Constructions() {
  const [params] = useSearchParams()
  const [query, setQuery] = useState(params.get('q') ?? '')
  const [group, setGroup] = useState<BuildingGroup | 'tous'>('tous')

  const list = filterBuildings(BUILDINGS, { query, group })

  return (
    <div className="space-y-4">
      <Card title="Constructions" icon="🏗️">
        <div className="flex flex-wrap items-center gap-2">
          <input
            type="search"
            aria-label="Rechercher une construction"
            placeholder="Nom ou matériau…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className={`${field} w-full sm:w-auto sm:min-w-0 sm:flex-1`}
          />
          <select aria-label="Catégorie" value={group} onChange={(e) => setGroup(e.target.value as BuildingGroup | 'tous')} className={field}>
            <option value="tous">Toutes les catégories</option>
            {GROUPS.map((g) => <option key={g} value={g}>{GROUP_LABELS[g]}</option>)}
          </select>
        </div>
        <p className="mt-3 text-sm text-muted">
          {list.length} construction{list.length > 1 ? 's' : ''}. Bâtiments de Robine, maison, Sorcier et achats en noix dorées sur l’Île Gingembre.
        </p>
      </Card>

      {list.length === 0 ? (
        <p className="text-sm text-muted">Aucune construction avec ces filtres.</p>
      ) : (
        <ul className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {list.map((b) => <BuildingCard key={b.id} building={b} />)}
        </ul>
      )}
    </div>
  )
}

function Materials({ items }: { items: Ingredient[] }) {
  return (
    <ul className="mt-2 flex flex-wrap gap-1.5">
      {items.map((i) => {
        const to = itemLink(i.name)
        const label = `${i.qty} × ${i.name}`
        return (
          <li key={i.name} className="rounded-full border border-wood/30 bg-parchment px-2 py-0.5 text-xs">
            {to ? <Link to={to} className="underline">{label}</Link> : label}
          </li>
        )
      })}
    </ul>
  )
}

function BuildingCard({ building: b }: { building: Building }) {
  const next = upgradesOf(b)
  const total = b.upgradeOf ? cumulativeCost(b) : null

  return (
    <li className="rounded-lg border border-wood/30 bg-card p-3 shadow-sm">
      <div className="flex items-baseline justify-between gap-2">
        <h3 className="font-semibold">{b.name}</h3>
        <span className="shrink-0 text-sm">{formatPrice(b)}</span>
      </div>
      <p className="text-xs text-muted">
        {GROUP_LABELS[b.group]}
        {b.days !== undefined && <> · {b.days === 0 ? 'Instantané' : `${b.days} jour${b.days > 1 ? 's' : ''} de travaux`}</>}
      </p>
      <p className="mt-1 text-sm text-muted">{b.desc}</p>
      {b.materials.length > 0 && <Materials items={b.materials} />}
      {b.upgradeOf && <p className="mt-2 text-xs">Amélioration de : {b.upgradeOf}</p>}
      {total && b.currency === 'po' && (
        <p className="text-xs text-muted">Depuis zéro : {total.price.toLocaleString('fr-FR')} po, {total.materials.map((m) => `${m.qty} ${m.name.toLowerCase()}`).join(', ')}.</p>
      )}
      {next.length > 0 && <p className="mt-1 text-xs">S’améliore en : {next.map((n) => n.name).join(', ')}</p>}
      {b.unlock && <p className="mt-2 text-xs text-muted">À débloquer : {b.unlock}</p>}
    </li>
  )
}
