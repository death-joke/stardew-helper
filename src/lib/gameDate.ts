export const SEASONS = ['printemps', 'ete', 'automne', 'hiver'] as const
export type Season = (typeof SEASONS)[number]

export const SEASON_LABELS: Record<Season, string> = {
  printemps: 'Printemps',
  ete: 'Été',
  automne: 'Automne',
  hiver: 'Hiver',
}

export const WEEKDAYS = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'] as const

export const DAYS_PER_SEASON = 28

export interface GameDate {
  season: Season
  day: number // 1..28
  year: number // >= 1
}

/** Jour de la semaine (0 = lundi) : le jour 1 de chaque saison est un lundi. */
export function weekdayIndex(day: number): number {
  return (day - 1) % 7
}

export function weekdayName(date: GameDate): string {
  return WEEKDAYS[weekdayIndex(date.day)]
}

/** Nombre de jours écoulés depuis le Printemps 1, An 1. */
export function toOrdinal(date: GameDate): number {
  return (
    (date.year - 1) * SEASONS.length * DAYS_PER_SEASON +
    SEASONS.indexOf(date.season) * DAYS_PER_SEASON +
    (date.day - 1)
  )
}

export function fromOrdinal(ordinal: number): GameDate {
  const perYear = SEASONS.length * DAYS_PER_SEASON
  const n = Math.max(0, ordinal)
  const year = Math.floor(n / perYear) + 1
  const inYear = n % perYear
  return {
    year,
    season: SEASONS[Math.floor(inYear / DAYS_PER_SEASON)],
    day: (inYear % DAYS_PER_SEASON) + 1,
  }
}

export function addDays(date: GameDate, n: number): GameDate {
  return fromOrdinal(toOrdinal(date) + n)
}

/** Jours restants dans la saison, aujourd'hui exclu. */
export function daysLeftInSeason(date: GameDate): number {
  return DAYS_PER_SEASON - date.day
}

export function nextSeason(season: Season): Season {
  return SEASONS[(SEASONS.indexOf(season) + 1) % SEASONS.length]
}

export function isSameDay(a: GameDate, b: GameDate): boolean {
  return a.season === b.season && a.day === b.day && a.year === b.year
}

export function formatDate(date: GameDate): string {
  return `${weekdayName(date)} ${date.day} ${SEASON_LABELS[date.season]}, An ${date.year}`
}

export function isValidDate(d: unknown): d is GameDate {
  if (typeof d !== 'object' || d === null) return false
  const { season, day, year } = d as Record<string, unknown>
  return (
    SEASONS.includes(season as Season) &&
    Number.isInteger(day) && (day as number) >= 1 && (day as number) <= DAYS_PER_SEASON &&
    Number.isInteger(year) && (year as number) >= 1
  )
}
