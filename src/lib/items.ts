import { CROPS } from '../data/crops'
import { FISH } from '../data/fish'
import { ITEMS } from '../data/items'
import { COOKING_RECIPES, CRAFT_RECIPES } from '../data/recipes'
import type { CookingRecipe, CraftRecipe, Item, Villager } from '../data/types'
import { VILLAGERS } from '../data/villagers'
import { SEASON_LABELS } from './gameDate'
import { formatSeasons, formatWindows } from './fishing'
import { normalize } from './text'

/** Objet du catalogue ; `link` renvoie vers l'onglet dédié pour les cultures et les poissons. */
export interface CatalogItem extends Item {
  link?: { to: string; label: string }
}

export const CULTURES = 'Cultures'
export const POISSONS = 'Poissons'

function cropItems(): CatalogItem[] {
  return CROPS.map((c) => ({
    id: `culture-${c.id}`,
    name: c.name,
    category: CULTURES,
    sub: formatSeasons(c.seasons, SEASON_LABELS),
    desc: '',
    price: c.sell,
    where: [
      `Graines : ${c.seed.price === null ? 'prix inconnu' : `${c.seed.price} po`} (${c.seed.where})`,
      `Pousse en ${c.growth} jours${c.regrow ? `, repousse tous les ${c.regrow} jours` : ''}`,
    ],
    usedIn: [],
    link: { to: `/agriculture?crop=${c.id}`, label: 'Voir dans Agriculture' },
  }))
}

function fishItems(): CatalogItem[] {
  return FISH.map((f) => ({
    id: `poisson-${f.id}`,
    name: f.name,
    category: POISSONS,
    sub: f.legendary ? 'Légendaire' : formatSeasons(f.seasons, SEASON_LABELS),
    desc: '',
    price: f.price,
    where: [f.where, formatWindows(f.windows)],
    usedIn: f.bundles,
    link: { to: `/peche?q=${encodeURIComponent(f.name)}`, label: 'Voir dans Pêche' },
  }))
}

let cached: CatalogItem[] | null = null

/** Tous les objets : données du wiki + cultures + poissons. Calculé une fois. */
export function catalog(): CatalogItem[] {
  cached ??= [...ITEMS, ...cropItems(), ...fishItems()]
  return cached
}

export function categories(items: CatalogItem[] = catalog()): Array<{ name: string; count: number }> {
  const counts = new Map<string, number>()
  for (const i of items) counts.set(i.category, (counts.get(i.category) ?? 0) + 1)
  return [...counts].map(([name, count]) => ({ name, count }))
}

export interface ItemFilter {
  query: string
  category: string // 'toutes' ou le nom
}

export function filterItems(items: CatalogItem[], { query, category }: ItemFilter): CatalogItem[] {
  const q = normalize(query.trim())
  return items.filter((i) => (category === 'toutes' || i.category === category) && (!q || normalize(i.name).includes(q)))
}

/** Recettes (artisanat / cuisine) qui utilisent cet objet comme ingrédient. */
export function recipesUsing(name: string): { craft: CraftRecipe[]; cooking: CookingRecipe[] } {
  const n = normalize(name)
  const uses = (r: { ingredients: { name: string }[] }) => r.ingredients.some((i) => normalize(i.name) === n)
  return { craft: CRAFT_RECIPES.filter(uses), cooking: COOKING_RECIPES.filter(uses) }
}

/** Villageois qui adorent cet objet. */
export function lovedBy(name: string): Villager[] {
  const n = normalize(name)
  return VILLAGERS.filter((v) => v.loves.some((l) => normalize(l) === n))
}
