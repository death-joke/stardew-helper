import { BUILDINGS } from '../data/buildings'
import type { Building, BuildingGroup, Ingredient } from '../data/types'
import { normalize } from './text'

export interface BuildingFilter {
  query: string
  group: BuildingGroup | 'tous'
}

/** Filtre par groupe, puis par nom, description ou matériau (insensible à la casse et aux accents). */
export function filterBuildings(list: Building[], { query, group }: BuildingFilter): Building[] {
  const q = normalize(query.trim())
  return list.filter((b) => {
    if (group !== 'tous' && b.group !== group) return false
    if (!q) return true
    return [b.name, b.desc, ...b.materials.map((m) => m.name)].some((s) => normalize(s).includes(q))
  })
}

export function formatPrice(b: Pick<Building, 'price' | 'currency'>): string {
  if (b.currency === 'noix') return `${b.price} noix dorées`
  if (b.price === 0) return 'Gratuit'
  return `${b.price.toLocaleString('fr-FR')} po`
}

export interface Cost {
  price: number
  materials: Ingredient[]
}

/** Coût total depuis zéro d'un bâtiment, en cumulant toute la chaîne d'améliorations (Poulailler → … → de luxe). */
export function cumulativeCost(b: Building, all: Building[] = BUILDINGS): Cost {
  const byName = new Map(all.map((x) => [x.name, x]))
  const mats = new Map<string, number>()
  let price = 0
  for (let cur: Building | undefined = b; cur; cur = cur.upgradeOf ? byName.get(cur.upgradeOf) : undefined) {
    price += cur.price
    for (const m of cur.materials) mats.set(m.name, (mats.get(m.name) ?? 0) + m.qty)
  }
  return { price, materials: [...mats].map(([name, qty]) => ({ name, qty })) }
}

/** Bâtiments qui améliorent celui-ci (le suivant dans la chaîne). */
export function upgradesOf(b: Building, all: Building[] = BUILDINGS): Building[] {
  return all.filter((x) => x.upgradeOf === b.name)
}
