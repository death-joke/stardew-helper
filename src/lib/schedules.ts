import type { ScheduleBlock, ScheduleGroup, VillagerSchedule } from '../data/types'
import { SEASON_LABELS, WEEKDAYS, weekdayIndex } from './gameDate'
import type { GameDate } from './gameDate'
import { normalize } from './text'

const REGULAR = /regulier|habituel|standard/

/** Le titre d'un bloc (« Lundi », « Mardi et Mercredi », « Samedi, Centre Communautaire rénové ») vise-t-il ce jour de la semaine ? */
export function titleMatchesWeekday(title: string, weekday: string): boolean {
  return new RegExp(`(^|[^a-z])${normalize(weekday)}([^a-z]|$)`).test(normalize(title))
}

export interface TodaySchedule {
  block: ScheduleBlock
  group: string
  /** Le titre vise précisément ce jour (sinon : horaire « habituel »). */
  exact: boolean
}

/** Les groupes qui décrivent un horaire hebdomadaire : la saison courante, ou le groupe sans nom des fiches plus simples. */
function weeklyGroups(groups: ScheduleGroup[], date: GameDate): ScheduleGroup[] {
  const season = SEASON_LABELS[date.season]
  const bySeason = groups.filter((g) => g.label === season)
  return bySeason.length > 0 ? bySeason : groups.filter((g) => g.label === '')
}

/** Horaire à afficher pour cette date : le jour de la semaine, sinon l'horaire habituel. `null` s'il n'y a rien de tel. */
export function todaySchedule(schedule: VillagerSchedule, date: GameDate): TodaySchedule | null {
  const weekday = WEEKDAYS[weekdayIndex(date.day)]
  const blocks = weeklyGroups(schedule.groups, date).flatMap((g) => g.blocks.map((block) => ({ block, group: g.label })))
  const exact = blocks.find(({ block }) => titleMatchesWeekday(block.title, weekday))
  if (exact) return { ...exact, exact: true }
  const regular = blocks.find(({ block }) => REGULAR.test(normalize(block.title)))
  return regular ? { ...regular, exact: false } : null
}

/** Y a-t-il des horaires particuliers (pluie, dates précises, mariage…) en plus de l'horaire courant ? */
export function hasSpecialSchedules(schedule: VillagerSchedule): boolean {
  return schedule.groups.some((g) => g.label === 'Exceptions') || schedule.groups.some((g) => g.blocks.some((b) => /pluie|pluvieux/.test(normalize(b.title))))
}

export function scheduleRowCount(schedule: VillagerSchedule): number {
  return schedule.groups.reduce((n, g) => n + g.blocks.reduce((m, b) => m + b.rows.length, 0), 0)
}
