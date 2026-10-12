import { describe, expect, it } from 'vitest'
import { CROPS } from '../data/crops'
import { artisanProducts, daysToLastPlanting, growthDays, harvestDates, profitPerDay, sellPrice, totalRevenue } from './crops'

const crop = (id: string) => CROPS.find((c) => c.id === id)!
const d = (season: 'printemps' | 'ete' | 'automne' | 'hiver', day: number, year = 1) => ({ season, day, year })

describe('crops', () => {
  it('panais planté le 24 → une seule récolte le 28 ; le 25 → aucune', () => {
    expect(harvestDates(crop('panais'), d('printemps', 24))).toEqual([d('printemps', 28)])
    expect(harvestDates(crop('panais'), d('printemps', 25))).toEqual([])
  })

  it('fraise plantée à la Fête des Œufs (printemps 13) → 21 et 25', () => {
    expect(harvestDates(crop('fraise'), d('printemps', 13))).toEqual([d('printemps', 21), d('printemps', 25)])
  })

  it('maïs poussant sur deux saisons : planté été 20 → 6 récoltes jusqu’à l’automne 26', () => {
    const dates = harvestDates(crop('mais'), d('ete', 20))
    expect(dates[0]).toEqual(d('automne', 6))
    expect(dates).toHaveLength(6)
    expect(dates[5]).toEqual(d('automne', 26))
  })

  it('une culture ne pousse pas hors de sa saison', () => {
    expect(harvestDates(crop('panais'), d('ete', 1))).toEqual([])
  })

  it('accélérateur : panais 4 → 3 jours, jamais moins de 1 jour', () => {
    expect(growthDays(crop('panais'), 0.1)).toBe(3)
    expect(growthDays(crop('carotte'), 0.9)).toBeGreaterThanOrEqual(1)
  })

  it('profit par jour d’un panais planté le 1er : (35−20)/4', () => {
    expect(profitPerDay(crop('panais'), d('printemps', 1), { speed: 0, tiller: false })).toBeCloseTo(3.75)
  })

  it('pas de profit sans prix de graine ni pour l’île', () => {
    expect(profitPerDay(crop('carotte'), d('printemps', 1), { speed: 0, tiller: false })).toBeNull()
    expect(profitPerDay(crop('ananas'), d('printemps', 1), { speed: 0, tiller: false })).toBeNull()
  })

  it('cultivateur : +10 %', () => {
    expect(sellPrice(crop('panais'), true)).toBe(38)
  })

  it('dernier jour pour planter', () => {
    expect(daysToLastPlanting(crop('panais'), d('printemps', 24))).toBe(0)
    expect(daysToLastPlanting(crop('panais'), d('printemps', 20))).toBe(4)
  })

  it('produits artisanaux', () => {
    expect(artisanProducts(crop('melon'), false).map((p) => p.value)).toEqual([750, 550])
    expect(artisanProducts(crop('panais'), false).map((p) => p.value)).toEqual([78, 120])
    expect(artisanProducts(crop('ble'), false)).toEqual([])
  })

  it('culture d’hiver : poudremelon planté le 1er hiver → récolte le 8', () => {
    expect(harvestDates(crop('poudremelon'), d('hiver', 1))).toEqual([d('hiver', 8)])
    expect(harvestDates(crop('poudremelon'), d('automne', 1))).toEqual([])
  })

  it('brocoli (1.6) : 8 jours puis repousse tous les 4 jours', () => {
    const dates = harvestDates(crop('brocoli'), d('automne', 1))
    expect(dates.slice(0, 3)).toEqual([d('automne', 9), d('automne', 13), d('automne', 17)])
  })

  it('tournesol : graine à 200 po chez Pierre', () => {
    expect(crop('tournesol').seed.price).toBe(200)
  })

  it('rendement par récolte : myrtille ×3, canneberges ×2, café ×4, autres ×1', () => {
    expect(totalRevenue(crop('myrtille'), 2, false)).toBe(2 * 3 * 50)
    expect(totalRevenue(crop('canneberges'), 1, false)).toBe(2 * 75)
    expect(totalRevenue(crop('cafe'), 1, false)).toBe(4 * 15)
    expect(totalRevenue(crop('panais'), 1, false)).toBe(35)
  })

  it('café planté au printemps 1 : −20,74 po/jour, comme sur le wiki', () => {
    expect(profitPerDay(crop('cafe'), d('printemps', 1), { speed: 0, tiller: false })).toBeCloseTo(-20.74, 1)
  })
})
