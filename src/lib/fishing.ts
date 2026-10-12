import { FISH } from '../data/fish'
import type { Fish, FishBehavior, Habitat } from '../data/types'
import { nextSeason } from './gameDate'
import { normalize } from './text'
import type { Season } from './gameDate'

export const BEHAVIOR_HELP: Record<FishBehavior, string> = {
  mixes: 'Mixe : mouvement basique.',
  lisses: 'Lisse : mouvement plus régulier.',
  plombs: 'Plomb : accélère plus vite vers le bas.',
  flotteurs: 'Flotteur : accélère plus vite vers le haut.',
  'aléatoires': 'Aléatoire : se déplace de façon erratique, avec une amplitude plus grande.',
}

export const HABITAT_LABELS: Record<Habitat, string> = {
  ocean: 'Océan',
  riviere: 'Rivière',
  lac: 'Lac de la montagne',
  etang: 'Étangs (forêt)',
  mines: 'Mines',
  desert: 'Désert',
  ile: 'Île Gingembre',
  autre: 'Autres',
}

export const PROFESSIONS = [
  { id: 'aucune', label: 'Aucun métier', multiplier: 1 },
  { id: 'pecheur', label: 'Pêcheur (+25 %)', multiplier: 1.25 },
  { id: 'maitre', label: 'Pêcheur maître (+50 %)', multiplier: 1.5 },
] as const

export const QUALITIES = [
  { id: 'normale', label: 'Qualité normale', multiplier: 1 },
  { id: 'argent', label: 'Argent (×1,25)', multiplier: 1.25 },
  { id: 'or', label: 'Or (×1,5)', multiplier: 1.5 },
  { id: 'iridium', label: 'Iridium (×2)', multiplier: 2 },
] as const

export interface PriceOptions {
  profession: (typeof PROFESSIONS)[number]['id']
  quality: (typeof QUALITIES)[number]['id']
}

/** Prix de vente avec la qualité puis le métier de pêche (arrondis à l'entier inférieur à chaque étape). */
export function sellPrice(base: number, { profession, quality }: PriceOptions): number {
  const q = QUALITIES.find((x) => x.id === quality)?.multiplier ?? 1
  const p = PROFESSIONS.find((x) => x.id === profession)?.multiplier ?? 1
  return Math.floor(Math.floor(base * q) * p)
}

export interface FishFilter {
  season: Season | null // null = toutes
  weather: 'soleil' | 'pluie' | null // null = indifférent
  hour: number | null // 6..25 (24 = minuit, 25 = 1h) ; null = indifférent
  habitat: Habitat | null
  query: string
}

/** Poisson qui ne s'attrape que pendant la quête « Famille plus nombreuse » de Monsieur Qi. */
export function isQuestOnly(fish: Fish): boolean {
  return fish.notes.some((n) => n.includes('Famille plus nombreuse'))
}

export function inWindows(windows: Fish['windows'], hour: number): boolean {
  if (windows === null) return true
  return windows.some(([from, to]) => hour >= from && hour < to)
}

export function weatherMatches(fish: Fish, weather: 'soleil' | 'pluie'): boolean {
  return fish.weather === 'tous' || fish.weather === weather
}

export function matchesFilter(fish: Fish, f: FishFilter): boolean {
  if (f.season && !fish.seasons.includes(f.season)) return false
  if (f.weather && !weatherMatches(fish, f.weather)) return false
  if (f.hour !== null && !inWindows(fish.windows, f.hour)) return false
  if (f.habitat && !fish.habitats.includes(f.habitat)) return false
  const q = normalize(f.query.trim())
  if (q && !normalize(fish.name).includes(q)) return false
  return true
}

export function formatHour(h: number): string {
  return `${h % 24}h`
}

export function formatWindows(windows: Fish['windows']): string {
  if (windows === null) return 'Toute la journée'
  return windows.map(([a, b]) => `${formatHour(a)} – ${formatHour(b)}`).join(' et ')
}

export function formatSeasons(seasons: Season[], labels: Record<Season, string>): string {
  return seasons.length === 4 ? 'Toute l’année' : seasons.map((s) => labels[s]).join(', ')
}

/** Poissons pêchables à la canne cette saison (hors légendaires), les mieux payés en premier. */
export function seasonalFish(season: Season, limit = 5): Fish[] {
  return FISH.filter((f) => !f.legendary && f.seasons.includes(season))
    .sort((a, b) => b.price - a.price)
    .slice(0, limit)
}

/** Poissons qui ne seront plus pêchables à la saison suivante. */
export function fishLeavingAfter(season: Season): Fish[] {
  const next = nextSeason(season)
  return FISH.filter((f) => !f.legendary && f.seasons.includes(season) && !f.seasons.includes(next))
}
