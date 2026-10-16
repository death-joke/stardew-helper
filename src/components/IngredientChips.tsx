import { Link } from 'react-router-dom'
import type { Ingredient } from '../data/types'
import { itemLink } from '../lib/links'

/** Pastilles « 5 × Lingot de fer », cliquables vers la fiche de l'objet quand elle existe. */
export function IngredientChips({ items, title = 'Ingrédients' }: { items: Ingredient[]; title?: string }) {
  if (items.length === 0) return null
  return (
    <div className="mt-2">
      <h4 className="text-xs font-semibold uppercase text-muted">{title}</h4>
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
    </div>
  )
}
