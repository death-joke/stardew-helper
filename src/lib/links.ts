import { COOKING_RECIPES } from '../data/recipes'
import { catalog } from './items'
import { normalize } from './text'

const KNOWN_ITEMS = new Set(catalog().map((i) => normalize(i.name)))
const KNOWN_DISHES = new Set(COOKING_RECIPES.map((r) => normalize(r.name)))

/** Lien vers la fiche d'un objet ou la recette de cuisine portant ce nom, s'il en existe une. */
export function itemLink(name: string): string | null {
  const n = normalize(name)
  if (KNOWN_ITEMS.has(n)) return `/objets?q=${encodeURIComponent(name)}`
  if (KNOWN_DISHES.has(n)) return `/craft?tab=cuisine&q=${encodeURIComponent(name)}`
  return null
}
