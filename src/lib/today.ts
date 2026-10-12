import { FESTIVALS } from '../data/calendar'
import { CROPS } from '../data/crops'
import { VILLAGERS } from '../data/villagers'
import type { Festival, Villager } from '../data/types'
import { SEASON_LABELS, addDays, daysLeftInSeason, toOrdinal, weekdayIndex } from './gameDate'
import type { GameDate } from './gameDate'
import { daysToLastPlanting } from './crops'

export const BIRTHDAY_LOOKAHEAD = 7
const PLANTING_LOOKAHEAD = 3
const GRANDPA_REMINDER_FROM = 22 // jour d'hiver de l'An 2 à partir duquel on rappelle l'évaluation de Grand-père

export interface UpcomingFestival { festival: Festival; daysUntil: number; date: GameDate }
export interface UpcomingBirthday { villager: Villager; daysUntil: number; date: GameDate }

export function festivalDays(f: Festival): string {
  const days = f.days.length > 1 ? `${f.days[0]}–${f.days[f.days.length - 1]}` : String(f.days[0])
  return `${days} ${SEASON_LABELS[f.season]}${f.year ? `, An ${f.year}` : ''}`
}

export function festivalsOn(date: GameDate): Festival[] {
  return FESTIVALS.filter((f) => f.season === date.season && f.days.includes(date.day) && (f.year === undefined || f.year === date.year))
}

export function birthdaysOn(date: GameDate): Villager[] {
  return VILLAGERS.filter((v) => v.birthday.season === date.season && v.birthday.day === date.day)
}

/** Prochain festival strictement après aujourd'hui (jusqu'à un an en avant). */
export function nextFestival(date: GameDate): UpcomingFestival | null {
  for (let n = 1; n <= 112; n++) {
    const d = addDays(date, n)
    const [festival] = festivalsOn(d)
    if (festival) return { festival, daysUntil: toOrdinal(d) - toOrdinal(date), date: d }
  }
  return null
}

/** Anniversaires dans les `lookahead` prochains jours (aujourd'hui exclu), triés par date. */
export function upcomingBirthdays(date: GameDate, lookahead = BIRTHDAY_LOOKAHEAD): UpcomingBirthday[] {
  const out: UpcomingBirthday[] = []
  for (let n = 1; n <= lookahead; n++) {
    const d = addDays(date, n)
    for (const villager of birthdaysOn(d)) out.push({ villager, daysUntil: n, date: d })
  }
  return out
}

export interface Reminder { id: string; icon: string; text: string }

export function remindersFor(date: GameDate): Reminder[] {
  const out: Reminder[] = []
  const wd = weekdayIndex(date.day) // 0 = lundi
  if (wd === 4 || wd === 6) out.push({ id: 'marchand', icon: '🛒', text: 'Le marchand ambulant est dans la forêt de la Sève-Cendreuse.' })
  if (wd === 2) out.push({ id: 'pierre', icon: '🚪', text: 'L’épicerie de Pierre est fermée aujourd’hui.' })
  if (wd === 4) out.push({ id: 'clint', icon: '⚒️', text: 'La forge de Clint est fermée aujourd’hui.' })
  if (wd === 6) out.push({ id: 'reine', icon: '📺', text: 'Émission « La Reine de la sauce » à la télé (nouvelle recette).' })
  const lastToday: string[] = []
  const soon: Array<{ name: string; delta: number }> = []
  for (const crop of CROPS) {
    if (crop.rare) continue
    const delta = daysToLastPlanting(crop, date)
    if (delta === 0) lastToday.push(crop.name)
    else if (delta !== null && delta > 0 && delta <= PLANTING_LOOKAHEAD) soon.push({ name: crop.name, delta })
  }
  if (lastToday.length) out.push({ id: 'plantation-dernier', icon: '🌱', text: `Dernier jour pour planter : ${lastToday.join(', ')}.` })
  if (soon.length) {
    const list = soon.map((c) => `${c.name} (${c.delta === 1 ? 'demain' : `dans ${c.delta} jours`})`).join(', ')
    out.push({ id: 'plantation-bientot', icon: '🌱', text: `Dernier jour pour planter bientôt : ${list}.` })
  }
  if (date.year === 2 && date.season === 'hiver' && date.day >= GRANDPA_REMINDER_FROM) {
    const n = daysLeftInSeason(date) + 1
    out.push({ id: 'grand-pere', icon: '🕯️', text: `Évaluation de Grand-père ${n === 1 ? 'demain' : `dans ${n} jours`} (1er printemps, An 3) : vérifie ton score sur 21 points.` })
  }
  const left = daysLeftInSeason(date)
  if (left === 0) out.push({ id: 'fin-saison', icon: '🍂', text: 'Dernier jour de la saison : récolte tout ce qui va faner cette nuit.' })
  else if (left <= 3) out.push({ id: 'fin-saison', icon: '🍂', text: `Plus que ${left} jour${left > 1 ? 's' : ''} avant la fin de la saison.` })
  return out
}
