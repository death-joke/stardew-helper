import { describe, expect, it } from 'vitest'
import { BUILDINGS } from '../data/buildings'
import { cumulativeCost, filterBuildings, formatPrice, upgradesOf } from './buildings'

const get = (id: string) => BUILDINGS.find((b) => b.id === id)!

describe('buildings data', () => {
  it('ids uniques, prix valides, améliorations qui existent', () => {
    expect(new Set(BUILDINGS.map((b) => b.id)).size).toBe(BUILDINGS.length)
    const names = new Set(BUILDINGS.map((b) => b.name))
    for (const b of BUILDINGS) {
      expect(b.name && b.desc).toBeTruthy()
      expect(b.price).toBeGreaterThanOrEqual(0)
      if (b.upgradeOf) expect(names.has(b.upgradeOf)).toBe(true)
      expect(b.materials.every((m) => m.name && m.qty >= 1)).toBe(true)
    }
  })

  it('valeurs connues du wiki', () => {
    expect(get('grange')).toMatchObject({ price: 6000, days: 3, materials: [{ name: 'Bois', qty: 350 }, { name: 'Pierre', qty: 150 }] })
    expect(get('obelisque-du-desert')).toMatchObject({ price: 1000000, group: 'sorcier' })
    expect(get('horloge-doree').price).toBe(10000000)
    expect(get('ferme-de-l-ile')).toMatchObject({ price: 20, currency: 'noix' })
    expect(BUILDINGS.filter((b) => b.group === 'sorcier')).toHaveLength(6)
  })
})

describe('cumulative cost', () => {
  it('grange de luxe = grange + grande grange + de luxe', () => {
    const c = cumulativeCost(get('grange-de-luxe'))
    expect(c.price).toBe(6000 + 12000 + 25000)
    expect(c.materials).toContainEqual({ name: 'Bois', qty: 350 + 450 + 550 })
    expect(c.materials).toContainEqual({ name: 'Pierre', qty: 150 + 200 + 300 })
  })

  it('un bâtiment sans amélioration coûte son prix', () => {
    expect(cumulativeCost(get('silo')).price).toBe(100)
  })

  it('upgradesOf donne le niveau suivant', () => {
    expect(upgradesOf(get('poulailler')).map((b) => b.name)).toEqual(['Grand poulailler'])
    expect(upgradesOf(get('poulailler-de-luxe'))).toEqual([])
  })
})

describe('filter and price', () => {
  it('filtre par groupe et par texte sans tenir compte des accents', () => {
    expect(filterBuildings(BUILDINGS, { query: '', group: 'maison' }).every((b) => b.group === 'maison')).toBe(true)
    expect(filterBuildings(BUILDINGS, { query: 'etable', group: 'tous' }).map((b) => b.id)).toEqual(['etable'])
    expect(filterBuildings(BUILDINGS, { query: 'iridium', group: 'sorcier' }).length).toBeGreaterThanOrEqual(4)
  })

  it('formate les prix', () => {
    expect(formatPrice(get('grange'))).toMatch(/^6\s000 po$/)
    expect(formatPrice(get('station-balneaire'))).toBe('20 noix dorées')
    expect(formatPrice(get('reno-berceau'))).toBe('Gratuit')
  })
})
