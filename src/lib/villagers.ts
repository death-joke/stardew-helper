import { VILLAGERS } from '../data/villagers'
import type { Villager } from '../data/types'
import { DAYS_PER_SEASON, SEASONS, toOrdinal } from './gameDate'
import type { GameDate, Season } from './gameDate'
import { normalize } from './text'

const DAYS_PER_YEAR = SEASONS.length * DAYS_PER_SEASON

/** Jours avant le prochain anniversaire (0 = aujourd'hui). */
export function daysUntilBirthday(v: Villager, from: GameDate): number {
  const thisYear = toOrdinal({ ...v.birthday, year: from.year })
  const diff = thisYear - toOrdinal(from)
  return diff >= 0 ? diff : diff + DAYS_PER_YEAR
}

export type VillagerSort = 'anniversaire' | 'nom'

export interface VillagerFilter {
  query: string
  marriageable: boolean
  season: Season | 'toutes'
}

export function filterVillagers(villagers: Villager[], { query, marriageable, season }: VillagerFilter): Villager[] {
  const q = normalize(query.trim())
  return villagers.filter(
    (v) => (!q || normalize(v.name).includes(q)) && (!marriageable || v.marriageable) && (season === 'toutes' || v.birthday.season === season),
  )
}

export function sortVillagers(villagers: Villager[], sort: VillagerSort, from: GameDate): Villager[] {
  const byName = (a: Villager, b: Villager) => a.name.localeCompare(b.name, 'fr')
  return [...villagers].sort(sort === 'nom' ? byName : (a, b) => daysUntilBirthday(a, from) - daysUntilBirthday(b, from) || byName(a, b))
}

export function villagerByName(name: string | null): Villager | undefined {
  return name ? VILLAGERS.find((v) => normalize(v.name) === normalize(name)) : undefined
}

export function describeDays(n: number): string {
  if (n === 0) return 'aujourd’hui'
  if (n === 1) return 'demain'
  return `dans ${n} jours`
}
