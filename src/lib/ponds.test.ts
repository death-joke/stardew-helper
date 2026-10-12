import { describe, expect, it } from 'vitest'
import { FISH, CRAB_POT, NIGHT_MARKET_FISH } from '../data/fish'
import { anythingChance, pondDrops, pondOdds, pondSpecies, startsWithSingleFish } from './ponds'

describe('ponds', () => {
  it('chance de production : 0,15 + 0,08 × population', () => {
    expect(anythingChance(1)).toBeCloseTo(0.23)
    expect(anythingChance(10)).toBeCloseTo(0.95)
  })

  it('calamar à 7 poissons : le premier objet (100 %) réussit toujours dès que l’étang produit', () => {
    const { rows, nothing } = pondOdds(pondDrops('Calamar'), 7)
    expect(rows[0].perDay).toBeCloseTo(0.71)
    expect(rows.slice(1).every((r) => r.perDay === 0 || r.perDay < 1e-9)).toBe(true)
    expect(nothing).toBeCloseTo(0.29)
  })

  it('les objets qui demandent plus de poissons ne sont pas admissibles', () => {
    const { rows } = pondOdds(pondDrops('Calamar'), 1)
    expect(rows.map((r) => r.eligible)).toEqual([false, false, false, true])
    expect(rows[3].perDay).toBeCloseTo(0.23 * 0.25)
  })

  it('les probabilités et « rien » somment à 1', () => {
    const { rows, nothing } = pondOdds(pondDrops('Anguille de lave'), 9)
    expect(rows.reduce((s, r) => s + r.perDay, nothing)).toBeCloseTo(1)
  })

  it('espèces partageant une même production', () => {
    expect(pondDrops('Carpe')).toEqual(pondDrops('Hareng'))
    expect(pondDrops('Sardine')).toEqual(pondDrops('Thon'))
  })

  it('espèce inconnue ou légendaire : aucune production', () => {
    expect(pondDrops('Légende')).toEqual([])
  })

  it('seules lacunes connues : la Palourde (non élevable) et les poissons de l’île (absents de la page Étang du wiki FR)', () => {
    const names = [...FISH.filter((f) => !f.legendary), ...NIGHT_MARKET_FISH, ...CRAB_POT].map((f) => f.name)
    const missing = names.filter((n) => pondDrops(n).length === 0)
    expect(missing.sort()).toEqual(['Discus bleu', 'Gobie', 'Palourde', 'Poisson-papillon', 'Raie'])
  })

  it('espèces à capacité de départ réduite', () => {
    expect(startsWithSingleFish('Poisson-blob')).toBe(true)
    expect(startsWithSingleFish('Carpe')).toBe(false)
    expect(pondSpecies()).toContain('Corail')
  })
})
