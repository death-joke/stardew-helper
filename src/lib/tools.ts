import type { Ingredient, ToolGroup, ToolLine } from '../data/types'
import { normalize } from './text'

export const GROUP_LABELS: Record<ToolGroup, string> = {
  amelioration: 'Améliorations chez Clint',
  peche: 'Cannes à pêche',
  autre: 'Sacs, faux et élevage',
}

export interface ToolFilter {
  query: string
  group: ToolGroup | 'tous'
}

/** Filtre par groupe, puis par nom de famille, de niveau ou effet (insensible à la casse et aux accents). */
export function filterTools(list: ToolLine[], { query, group }: ToolFilter): ToolLine[] {
  const q = normalize(query.trim())
  return list.filter((l) => {
    if (group !== 'tous' && l.group !== group) return false
    return !q || [l.name, ...l.levels.flatMap((v) => [v.name, v.effect])].some((s) => normalize(s).includes(q))
  })
}

export interface ToolCost {
  price: number
  ingredients: Ingredient[]
}

/** Coût pour monter une famille du premier au dernier niveau payant (prix + barres de métal cumulés). */
export function totalCost(line: ToolLine): ToolCost {
  const mats = new Map<string, number>()
  let price = 0
  for (const v of line.levels) {
    price += v.price ?? 0
    for (const i of v.ingredients) mats.set(i.name, (mats.get(i.name) ?? 0) + i.qty)
  }
  return { price, ingredients: [...mats].map(([name, qty]) => ({ name, qty })) }
}

export function formatLevelPrice(v: { price: number | null; priceNote?: string }): string {
  if (v.price !== null) return `${v.price.toLocaleString('fr-FR')} po`
  return v.priceNote ?? 'Non vendu'
}

