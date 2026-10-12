import type { CookingRecipe } from '../data/types'

export interface Buff {
  stat: string
  value: number
}

/** « Agriculture (+2) Énergie max (+50) » → [{ Agriculture, 2 }, { Énergie max, 50 }] */
export function parseBuffs(buff: string): Buff[] {
  return [...buff.matchAll(/([^()+\-\d][^()]*?)\s*\(([+-]\d+)\)/g)].map((m) => ({ stat: m[1].trim(), value: Number(m[2]) }))
}

/** Durée du premier bonus en secondes (« 11m 11s » → 671). 0 s'il n'y en a pas. */
export function buffDurationSeconds(duration: string): number {
  const m = duration.match(/^(?:(\d+)m)?\s*(?:(\d+)s)?/)
  return m ? Number(m[1] ?? 0) * 60 + Number(m[2] ?? 0) : 0
}

export type SourceKind = 'reine' | 'villageois' | 'competence' | 'ile' | 'autre'

export const SOURCE_LABELS: Record<SourceKind, string> = {
  reine: 'La reine des sauces',
  villageois: 'Lettre d’un villageois',
  competence: 'Niveau de compétence',
  ile: 'Île Gingembre',
  autre: 'Autre',
}

export function sourceKind(source: string): SourceKind {
  if (source.includes('La reine des sauces')) return 'reine'
  if (/\((?:Lettre|Courrier)|événement des/i.test(source)) return 'villageois'
  if (/Niveau \d/.test(source)) return 'competence'
  if (source.includes('Île Gingembre') || source.includes('insulaire')) return 'ile'
  return 'autre'
}

export type CookingSort = 'nom' | 'prix' | 'energie' | 'sante' | 'duree' | 'bonus'

export const SORT_LABELS: Record<Exclude<CookingSort, 'bonus'>, string> = {
  nom: 'Nom',
  prix: 'Prix de vente',
  energie: 'Énergie',
  sante: 'Santé',
  duree: 'Durée du bonus',
}

export interface CookingFilter {
  buff: 'tous' | 'avec' | 'sans' | string // ou le nom d'une caractéristique (« Pêche »…)
  source: SourceKind | 'toutes'
}

export function buffStats(recipes: CookingRecipe[]): string[] {
  const all = new Set(recipes.flatMap((r) => parseBuffs(r.buff).map((b) => b.stat)))
  return [...all].sort((a, b) => a.localeCompare(b, 'fr'))
}

export function filterCooking(recipes: CookingRecipe[], { buff, source }: CookingFilter): CookingRecipe[] {
  return recipes.filter((r) => {
    const buffs = parseBuffs(r.buff)
    if (buff === 'avec' && buffs.length === 0) return false
    if (buff === 'sans' && buffs.length > 0) return false
    if (buff !== 'tous' && buff !== 'avec' && buff !== 'sans' && !buffs.some((b) => b.stat === buff)) return false
    if (source !== 'toutes' && sourceKind(r.source) !== source) return false
    return true
  })
}

/** Valeur du tri. `stat` = caractéristique choisie, pour trier sur la valeur de ce bonus. */
function sortValue(r: CookingRecipe, key: Exclude<CookingSort, 'nom'>, stat: string | null): number {
  switch (key) {
    case 'prix': return r.price
    case 'energie': return r.energy ?? -1
    case 'sante': return r.health ?? -1
    case 'duree': return buffDurationSeconds(r.buffDuration)
    case 'bonus': return parseBuffs(r.buff).find((b) => b.stat === stat)?.value ?? 0
  }
}

export function sortCooking(recipes: CookingRecipe[], key: CookingSort, dir: 'asc' | 'desc', stat: string | null = null): CookingRecipe[] {
  const sign = dir === 'asc' ? 1 : -1
  return [...recipes].sort((a, b) => {
    const diff = key === 'nom' ? a.name.localeCompare(b.name, 'fr') : sortValue(a, key, stat) - sortValue(b, key, stat)
    return diff * sign || a.name.localeCompare(b.name, 'fr')
  })
}
