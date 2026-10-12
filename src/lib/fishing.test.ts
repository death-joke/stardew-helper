import { describe, expect, it } from 'vitest'
import { FISH, NIGHT_MARKET_FISH, CRAB_POT } from '../data/fish'
import { fishLeavingAfter, formatWindows, inWindows, isQuestOnly, matchesFilter, seasonalFish, sellPrice } from './fishing'
import { normalize } from './text'
import type { FishFilter } from './fishing'

const fish = (id: string) => FISH.find((f) => f.id === id)!
const base: FishFilter = { season: null, weather: null, hour: null, habitat: null, query: '' }

describe('fishing data', () => {
  it('contient les 48 poissons de canne, 10 légendaires, 3 du marché nocturne et 10 créatures de casier', () => {
    expect(FISH.filter((f) => !f.legendary)).toHaveLength(48)
    expect(FISH.filter((f) => f.legendary)).toHaveLength(10)
    expect(NIGHT_MARKET_FISH).toHaveLength(3)
    expect(CRAB_POT).toHaveLength(10)
  })

  it('identifiants uniques', () => {
    expect(new Set(FISH.map((f) => f.id)).size).toBe(FISH.length)
  })
})

describe('fishing filters', () => {
  it('plages horaires, y compris après minuit', () => {
    expect(inWindows([[18, 26]], 25)).toBe(true) // 1h
    expect(inWindows([[18, 26]], 17)).toBe(false)
    expect(inWindows([[6, 11], [18, 26]], 12)).toBe(false)
    expect(inWindows(null, 12)).toBe(true)
  })

  it('poisson-globe : été, soleil, 12h–16h seulement', () => {
    const f = fish('poisson-globe')
    expect(matchesFilter(f, { ...base, season: 'ete', weather: 'soleil', hour: 14 })).toBe(true)
    expect(matchesFilter(f, { ...base, season: 'ete', weather: 'pluie', hour: 14 })).toBe(false)
    expect(matchesFilter(f, { ...base, season: 'ete', weather: 'soleil', hour: 17 })).toBe(false)
    expect(matchesFilter(f, { ...base, season: 'hiver', weather: 'soleil', hour: 14 })).toBe(false)
  })

  it('recherche insensible aux accents et à la casse', () => {
    expect(normalize('Flétan')).toBe('fletan')
    expect(matchesFilter(fish('fletan'), { ...base, query: 'FLETAN' })).toBe(true)
  })

  it('filtre par lieu', () => {
    expect(matchesFilter(fish('thon'), { ...base, habitat: 'ocean' })).toBe(true)
    expect(matchesFilter(fish('thon'), { ...base, habitat: 'riviere' })).toBe(false)
  })

  it('formatage des horaires', () => {
    expect(formatWindows([[6, 11], [19, 26]])).toBe('6h – 11h et 19h – 2h')
    expect(formatWindows(null)).toBe('Toute la journée')
  })

  it('poissons de saison : sans légendaires, triés par prix', () => {
    const top = seasonalFish('hiver', 5)
    expect(top.every((f) => !f.legendary && f.seasons.includes('hiver'))).toBe(true)
    expect(top.map((f) => f.price)).toEqual([...top.map((f) => f.price)].sort((a, b) => b - a))
  })

  it('poissons qui partent : le poisson-globe (été seulement) quitte à la fin de l’été', () => {
    expect(fishLeavingAfter('ete').map((f) => f.id)).toContain('poisson-globe')
    expect(fishLeavingAfter('ete').map((f) => f.id)).not.toContain('dorade') // toutes saisons
  })

  it('prix avec métier et qualité', () => {
    expect(sellPrice(100, { profession: 'aucune', quality: 'normale' })).toBe(100)
    expect(sellPrice(100, { profession: 'pecheur', quality: 'normale' })).toBe(125)
    expect(sellPrice(100, { profession: 'maitre', quality: 'normale' })).toBe(150)
    expect(sellPrice(100, { profession: 'maitre', quality: 'iridium' })).toBe(300)
    expect(sellPrice(45, { profession: 'pecheur', quality: 'argent' })).toBe(70) // floor(56,25)=56 → floor(70)=70
  })

  it('poissons réservés à la quête de Monsieur Qi : les 5 légendaires de la 1.6', () => {
    expect(FISH.filter(isQuestOnly).map((f) => f.name).sort()).toEqual(
      ['Carpe radioactive', 'Fils de poisson écarlate', 'Légende II', 'Mme Poisson-pêcheur', 'Poisson des glaciers junior'],
    )
  })
})
