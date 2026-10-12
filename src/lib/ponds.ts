import { POND_PRODUCTION, POND_SINGLE_START } from '../data/ponds'
import type { PondDrop } from '../data/types'

export const MAX_POPULATION = 10
export const BASE_CHANCE = 0.15
export const CHANCE_PER_FISH = 0.08

/** Nom d'espèce → objets que son étang peut produire (dans l'ordre de vérification du jeu). */
export function pondDrops(species: string): PondDrop[] {
  return POND_PRODUCTION.find((e) => e.fish.includes(species))?.drops ?? []
}

export function pondSpecies(): string[] {
  const all = new Set(POND_PRODUCTION.flatMap((e) => e.fish))
  return [...all].sort((a, b) => a.localeCompare(b, 'fr'))
}

export function startsWithSingleFish(species: string): boolean {
  return POND_SINGLE_START.includes(species)
}

/** Chance (0..1) que l'étang produise « quelque chose » un jour donné. */
export function anythingChance(population: number): number {
  return Math.min(1, BASE_CHANCE + CHANCE_PER_FISH * population)
}

export interface DropOdds {
  drop: PondDrop
  eligible: boolean
  perDay: number // 0..1, probabilité de récupérer cet objet un jour donné
}

/**
 * Estimation d'après la règle du wiki : l'étang produit quelque chose avec la chance `anythingChance`,
 * puis les objets admissibles (population suffisante) sont testés dans l'ordre ; le premier réussi gagne.
 */
export function pondOdds(drops: PondDrop[], population: number): { rows: DropOdds[]; nothing: number } {
  let remaining = anythingChance(population)
  let produced = 0
  const rows = drops.map((drop) => {
    const eligible = population >= drop.minPopulation
    if (!eligible) return { drop, eligible, perDay: 0 }
    const perDay = remaining * (drop.chance / 100)
    remaining -= perDay
    produced += perDay
    return { drop, eligible, perDay }
  })
  return { rows, nothing: 1 - produced }
}

export function formatQty(drop: PondDrop): string {
  return drop.min === drop.max ? `${drop.min}` : `${drop.min}–${drop.max}`
}
