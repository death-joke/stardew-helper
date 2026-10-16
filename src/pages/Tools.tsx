import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Card } from '../components/Card'
import { TOOLS } from '../data/tools'
import type { Ingredient, ToolGroup, ToolLine } from '../data/types'
import { itemLink } from '../lib/links'
import { GROUP_LABELS, filterTools, formatLevelPrice, totalCost } from '../lib/tools'

const field = 'field'
const GROUPS = Object.keys(GROUP_LABELS) as ToolGroup[]

export function Tools() {
  const [params] = useSearchParams()
  const [query, setQuery] = useState(params.get('q') ?? '')
  const [group, setGroup] = useState<ToolGroup | 'tous'>('tous')

  const list = filterTools(TOOLS, { query, group })

  return (
    <div className="space-y-4">
      <Card title="Outils" icon="⛏️">
        <div className="flex flex-wrap items-center gap-2">
          <input
            type="search"
            aria-label="Rechercher un outil"
            placeholder="Rechercher un outil ou un effet…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className={`${field} w-full sm:w-auto sm:min-w-0 sm:flex-1`}
          />
          <select aria-label="Catégorie" value={group} onChange={(e) => setGroup(e.target.value as ToolGroup | 'tous')} className={field}>
            <option value="tous">Toutes les catégories</option>
            {GROUPS.map((g) => <option key={g} value={g}>{GROUP_LABELS[g]}</option>)}
          </select>
        </div>
        <p className="mt-3 text-sm text-muted">
          {list.length} famille{list.length > 1 ? 's' : ''} d’outils. Clint améliore la houe, la pioche, la hache, l’arrosoir et la poubelle en 2 jours, dans l’ordre des métaux (cuivre, acier, or, iridium) : on ne saute pas de niveau, et l’outil est indisponible pendant les travaux.
        </p>
      </Card>

      {list.length === 0 ? (
        <p className="text-sm text-muted">Aucun outil avec ces filtres.</p>
      ) : (
        <ul className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {list.map((l) => <ToolCard key={l.id} line={l} />)}
        </ul>
      )}
    </div>
  )
}

function Chips({ items }: { items: Ingredient[] }) {
  return (
    <ul className="mt-1 flex flex-wrap gap-1.5">
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

function ToolCard({ line }: { line: ToolLine }) {
  const total = line.group === 'amelioration' && line.levels.length > 1 ? totalCost(line) : null
  return (
    <li className="rounded-lg border border-wood/30 bg-card p-3 shadow-sm">
      <h3 className="font-semibold">{line.name}</h3>
      <p className="text-xs text-muted">{GROUP_LABELS[line.group]}</p>
      <ol className="mt-2 space-y-3">
        {line.levels.map((v) => (
          <li key={v.name} className="border-t border-wood/20 pt-2 first:border-t-0 first:pt-0">
            <div className="flex items-baseline justify-between gap-2">
              <span className="text-sm font-medium">{v.name}</span>
              <span className="shrink-0 text-sm">{formatLevelPrice(v)}</span>
            </div>
            {v.days !== undefined && <p className="text-xs text-muted">Amélioration : {v.days} jour{v.days > 1 ? 's' : ''} chez Clint</p>}
            {v.ingredients.length > 0 && <Chips items={v.ingredients} />}
            {v.effect && <p className="mt-1 text-xs text-muted">{v.effect}</p>}
            {v.where && <p className="mt-1 text-xs">{v.where}</p>}
            {v.requires && <p className="text-xs text-muted">Condition : {v.requires}</p>}
          </li>
        ))}
      </ol>
      {total && (
        <p className="mt-3 border-t border-wood/30 pt-2 text-xs">
          <span className="font-semibold">Tout améliorer : </span>
          {total.price.toLocaleString('fr-FR')} po, {total.ingredients.map((i) => `${i.qty} ${i.name.toLowerCase()}`).join(', ')}.
        </p>
      )}
    </li>
  )
}
