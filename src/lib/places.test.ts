import { describe, expect, it } from 'vitest'
import { PLACES } from '../data/places'
import { filterPlaces, groupByArea, linkTarget } from './places'

describe('places data', () => {
  it('ids uniques et chaque lieu a une condition de déblocage', () => {
    expect(new Set(PLACES.map((p) => p.id)).size).toBe(PLACES.length)
    expect(PLACES.every((p) => p.name && p.unlock && p.region)).toBe(true)
  })

  it('tous les liens vers une quête ou une construction existent', () => {
    for (const p of PLACES) {
      for (const l of p.links ?? []) expect(linkTarget(l), `${p.name} → ${l.name}`).not.toBeNull()
    }
  })

  it('connaît les déblocages clés', () => {
    const unlock = (id: string) => PLACES.find((p) => p.id === id)!.unlock
    expect(unlock('egouts')).toContain('60 objets')
    expect(unlock('caverne-du-crane')).toContain('Clé en tête de mort')
    expect(unlock('chambre-des-noix-de-qi')).toContain('100 noix dorées')
  })
})

describe('links and search', () => {
  it('construit les liens profonds', () => {
    expect(linkTarget({ kind: 'quete', name: 'Talisman noir' })).toBe('/quetes?tab=histoire&q=Talisman%20noir')
    expect(linkTarget({ kind: 'quete', name: 'Les récoltes de Qi' })).toContain('tab=qi')
    expect(linkTarget({ kind: 'construction', name: 'Hutte de Junimo' })).toBe('/constructions?q=Hutte%20de%20Junimo')
    expect(linkTarget({ kind: 'quete', name: 'Inexistante' })).toBeNull()
  })

  it('filtre sans tenir compte des accents', () => {
    expect(filterPlaces(PLACES, 'egouts').map((p) => p.id)).toContain('egouts')
    expect(filterPlaces(PLACES, 'talisman').length).toBeGreaterThanOrEqual(2)
  })

  it('regroupe par zone', () => {
    expect(groupByArea().map((g) => g.area)).toEqual(['Vallée', 'Montagne', 'Désert de Calico', 'Île Gingembre'])
  })
})
