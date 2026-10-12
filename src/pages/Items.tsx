import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Card } from '../components/Card'
import { catalog, categories, filterItems, lovedBy, recipesUsing } from '../lib/items'
import type { CatalogItem } from '../lib/items'

const field = 'field'
const ALL = catalog()
const CATEGORIES = categories(ALL)

export function Items() {
  const [params] = useSearchParams()
  const [query, setQuery] = useState(params.get('q') ?? '')
  const [category, setCategory] = useState(CATEGORIES.some((c) => c.name === params.get('cat')) ? params.get('cat')! : 'toutes')

  const items = filterItems(ALL, { query, category })

  return (
    <div className="space-y-4">
      <Card title="Objets" icon="🎒">
        <div className="flex flex-wrap items-center gap-2">
          <input
            type="search"
            aria-label="Rechercher un objet"
            placeholder="Rechercher un objet…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className={`${field} w-full sm:w-auto sm:min-w-0 sm:flex-1`}
          />
          <select aria-label="Catégorie" value={category} onChange={(e) => setCategory(e.target.value)} className={field}>
            <option value="toutes">Toutes les catégories ({ALL.length})</option>
            {CATEGORIES.map((c) => <option key={c.name} value={c.name}>{c.name} ({c.count})</option>)}
          </select>
        </div>
        <p className="mt-3 text-sm text-muted">{items.length} objet{items.length > 1 ? 's' : ''}.</p>
      </Card>

      {items.length === 0 ? (
        <p className="text-sm text-muted">Aucun objet avec ces filtres.</p>
      ) : (
        <ul className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {items.map((i) => <ItemCard key={i.id} item={i} />)}
        </ul>
      )}
    </div>
  )
}

function ItemCard({ item }: { item: CatalogItem }) {
  const recipes = recipesUsing(item.name)
  const fans = lovedBy(item.name)
  const price = item.price !== null ? `${item.price} po` : item.priceNote ?? null

  return (
    <li className="rounded-lg border border-wood/30 bg-card p-3 shadow-sm">
      <div className="flex items-baseline justify-between gap-2">
        <h3 className="font-semibold">{item.name}</h3>
        {price && <span className="shrink-0 text-sm">{price}</span>}
      </div>
      <p className="text-xs text-muted">{item.category}{item.sub && ` · ${item.sub}`}</p>
      {item.desc && <p className="mt-1 text-sm text-ink/80">{item.desc}</p>}

      <h4 className="mt-2 text-xs font-semibold uppercase text-muted">Où le trouver</h4>
      {item.where.length > 0 ? (
        <ul className="list-disc pl-5 text-sm">{item.where.map((w) => <li key={w}>{w}</li>)}</ul>
      ) : (
        <p className="text-sm text-muted">Non précisé sur le wiki.</p>
      )}

      {item.usedIn.length > 0 && (
        <p className="mt-2 text-sm"><span className="font-semibold">Utilisé dans : </span>{item.usedIn.join(', ')}</p>
      )}
      {(recipes.craft.length > 0 || recipes.cooking.length > 0) && (
        <p className="mt-2 text-sm">
          <span className="font-semibold">Recettes : </span>
          {recipes.craft.length > 0 && (
            <Link className="text-wood underline" to={`/craft?ingredient=${encodeURIComponent(item.name)}`}>{recipes.craft.length} d’artisanat</Link>
          )}
          {recipes.craft.length > 0 && recipes.cooking.length > 0 && ' · '}
          {recipes.cooking.length > 0 && (
            <Link className="text-wood underline" to={`/craft?tab=cuisine&ingredient=${encodeURIComponent(item.name)}`}>{recipes.cooking.length} de cuisine</Link>
          )}
        </p>
      )}
      {fans.length > 0 && <p className="mt-2 text-sm"><span className="font-semibold">Adoré par : </span>{fans.map((v) => v.name).join(', ')}</p>}
      {item.link && <Link className="mt-2 inline-block text-sm text-wood underline" to={item.link.to}>{item.link.label} →</Link>}
    </li>
  )
}
