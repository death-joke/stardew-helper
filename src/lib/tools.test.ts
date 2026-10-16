import { describe, expect, it } from 'vitest'
import { TOOLS } from '../data/tools'
import { filterTools, formatLevelPrice, totalCost } from './tools'

const line = (id: string) => TOOLS.find((l) => l.id === id)!

describe('tools data', () => {
  it('ids uniques, chaque niveau a un nom', () => {
    expect(new Set(TOOLS.map((l) => l.id)).size).toBe(TOOLS.length)
    for (const l of TOOLS) {
      expect(l.levels.length).toBeGreaterThan(0)
      expect(l.levels.every((v) => v.name)).toBe(true)
    }
  })

  it('familles améliorables : outil de départ puis 4 niveaux de métal', () => {
    for (const id of ['houe', 'pioche', 'hache', 'arrosoir', 'poubelle']) {
      expect(line(id).levels).toHaveLength(5)
      expect(line(id).levels[0].price).toBeNull()
    }
    expect(line('hache').levels[4]).toMatchObject({ name: 'Hache en iridium', price: 25000, ingredients: [{ name: 'Lingot en iridium', qty: 5 }] })
    expect(line('poubelle').levels[1].price).toBe(1000)
    expect(line('hache').levels.map((v) => v.days)).toEqual([undefined, 2, 2, 2, 2])
  })

  it('autres outils connus', () => {
    expect(line('sac-a-dos').levels.map((v) => v.price)).toEqual([null, 2000, 10000])
    expect(line('recolteur-automatique').levels[0]).toMatchObject({ price: 25000 })
  })
})

describe('totalCost and price', () => {
  it('cumule prix et barres de la houe', () => {
    const c = totalCost(line('houe'))
    expect(c.price).toBe(2000 + 5000 + 10000 + 25000)
    expect(c.ingredients).toHaveLength(4)
    expect(c.ingredients.every((i) => i.qty === 5)).toBe(true)
  })

  it('formate les prix', () => {
    expect(formatLevelPrice(line('houe').levels[0])).toBe('Outil de départ')
    expect(formatLevelPrice(line('houe').levels[1])).toMatch(/^2\s000 po$/)
  })
})

describe('filterTools', () => {
  it('filtre par groupe et par texte sans accents', () => {
    expect(filterTools(TOOLS, { query: '', group: 'peche' }).map((l) => l.id)).toEqual(['cannes-a-peche'])
    expect(filterTools(TOOLS, { query: 'recolteur', group: 'tous' }).map((l) => l.id)).toContain('recolteur-automatique')
    expect(filterTools(TOOLS, { query: 'zzzz', group: 'tous' })).toEqual([])
  })
})
