import type { Crop } from '../data/types'
import { DAYS_PER_SEASON, addDays, nextSeason, toOrdinal } from './gameDate'
import type { GameDate } from './gameDate'

export const ISLAND_HORIZON = 112 // les cultures de l'île sont comptées sur une année

export const FERTILIZERS = [
  { id: 'aucun', label: 'Aucun engrais', speed: 0 },
  { id: 'accel', label: 'Accélérateur de croissance (−10 %)', speed: 0.1 },
  { id: 'accel2', label: 'Accélérateur supérieur (−25 %)', speed: 0.25 },
  { id: 'accel3', label: 'Hyper accélérateur (−33 %)', speed: 0.33 },
] as const

export const AGRICULTURIST_SPEED = 0.1
export const TILLER_BONUS = 1.1
export const ARTISAN_BONUS = 1.4

export interface FarmOptions {
  speed: number // somme des bonus de vitesse (engrais + Agriculteur)
  tiller: boolean
}

/** Jours avant la première récolte. Arrondi approximatif (±1 jour) : le jeu retire les jours phase par phase. */
export function growthDays(crop: Crop, speed: number): number {
  if (speed <= 0 || crop.growth <= 1) return crop.growth
  return crop.growth - Math.min(Math.ceil(crop.growth * speed), crop.growth - 1)
}

/** Dernier jour où la culture est encore en vie, ou null si elle ne pousse pas à cette saison. */
export function lastGrowingDay(crop: Crop, plant: GameDate): GameDate | null {
  if (crop.island) return addDays(plant, ISLAND_HORIZON)
  if (!crop.seasons.includes(plant.season)) return null
  let extraSeasons = 0
  let s = plant.season
  while (extraSeasons < 3 && crop.seasons.includes(nextSeason(s))) {
    s = nextSeason(s)
    extraSeasons++
  }
  return addDays(plant, DAYS_PER_SEASON - plant.day + extraSeasons * DAYS_PER_SEASON)
}

/** Dates de récolte pour une plantation donnée. */
export function harvestDates(crop: Crop, plant: GameDate, speed = 0): GameDate[] {
  const end = lastGrowingDay(crop, plant)
  if (!end) return []
  const endOrd = toOrdinal(end)
  let ord = toOrdinal(plant) + growthDays(crop, speed)
  if (ord > endOrd) return []
  const out: GameDate[] = []
  for (;;) {
    out.push(addDays(plant, ord - toOrdinal(plant)))
    if (!crop.regrow) break
    ord += crop.regrow
    if (ord > endOrd) break
  }
  return out
}

export function sellPrice(crop: Crop, tiller: boolean): number {
  return tiller ? Math.floor(crop.sell * TILLER_BONUS) : crop.sell
}

/** Nombre d'objets obtenus à chaque récolte (hors récoltes supplémentaires aléatoires). */
export function yieldPerHarvest(crop: Crop): number {
  return crop.yield ?? 1
}

export function totalRevenue(crop: Crop, harvests: number, tiller: boolean): number {
  return harvests * yieldPerHarvest(crop) * sellPrice(crop, tiller)
}

/** Profit par jour entre la plantation et la dernière récolte, graine comprise. */
export function profitPerDay(crop: Crop, plant: GameDate, opts: FarmOptions): number | null {
  if (crop.island || crop.seed.price === null) return null
  const dates = harvestDates(crop, plant, opts.speed)
  if (dates.length === 0) return null
  const days = toOrdinal(dates[dates.length - 1]) - toOrdinal(plant)
  return (totalRevenue(crop, dates.length, opts.tiller) - crop.seed.price) / days
}

/** Nombre de jours (aujourd'hui compris) avant le dernier jour où planter donne au moins une récolte. null = hors saison/île. */
export function daysToLastPlanting(crop: Crop, today: GameDate): number | null {
  if (crop.island) return null
  const end = lastGrowingDay(crop, today)
  if (!end) return null
  return toOrdinal(end) - crop.growth - toOrdinal(today)
}

export interface ArtisanProduct { label: string; value: number; days: number }

/** Produits transformés (tonneau / bocal). Vide pour les cultures non transformables. */
export function artisanProducts(crop: Crop, artisan: boolean): ArtisanProduct[] {
  const bonus = (v: number) => Math.floor(artisan ? v * ARTISAN_BONUS : v)
  if (crop.kind === 'fruit') {
    return [
      { label: 'Vin (tonneau)', value: bonus(crop.sell * 3), days: 7 },
      { label: 'Gelée (bocal)', value: bonus(crop.sell * 2 + 50), days: 3 },
    ]
  }
  if (crop.kind === 'legume') {
    return [
      { label: 'Jus (tonneau)', value: bonus(Math.floor(crop.sell * 2.25)), days: 4 },
      { label: 'Cornichons (bocal)', value: bonus(crop.sell * 2 + 50), days: 3 },
    ]
  }
  return []
}
