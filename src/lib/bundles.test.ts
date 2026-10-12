import { describe, expect, it } from 'vitest'
import { BUNDLE_ROOMS } from '../data/bundles'
import { availableIn, seasonSummary, totalBundles } from './bundles'
import { itemLink } from './links'

const item = (name: string, qty = 1) => ({ name, qty, note: '' })
const bundle = (id: string) => BUNDLE_ROOMS.flatMap((r) => r.bundles).find((b) => b.id === id)!

describe('bundles data', () => {
  it('7 salles, 31 paquets, chacun avec des objets et un nombre de cases valide', () => {
    expect(BUNDLE_ROOMS).toHaveLength(7)
    expect(totalBundles()).toBe(31)
    for (const b of BUNDLE_ROOMS.flatMap((r) => r.bundles)) {
      expect(b.items.length).toBeGreaterThan(0)
      expect(b.slots).toBeGreaterThanOrEqual(1)
      expect(b.slots).toBeLessThanOrEqual(b.items.length)
      expect(b.items.every((i) => i.name && i.qty >= 1)).toBe(true)
    }
  })

  it('structure connue du jeu', () => {
    expect(bundle('paquet-artisan')).toMatchObject({ slots: 6 })
    expect(bundle('paquet-artisan').items).toHaveLength(12)
    expect(bundle('paquet-cueillette-exotique')).toMatchObject({ slots: 5 })
    expect(bundle('paquet-cueillette-de-printemps').items.map((i) => i.name)).toEqual(['Raifort sauvage', 'Jonquille', 'Poireau', 'Pissenlit'])
    expect(bundle('paquet-cueillette-de-printemps').reward).toEqual({ name: 'Graines de printemps', qty: 30 })
  })
})

describe('availability by season', () => {
  it('cueillette de saison', () => {
    expect(availableIn(item('Jonquille'), 'printemps')).toBe(true)
    expect(availableIn(item('Jonquille'), 'hiver')).toBe(false)
  })

  it('poisson : poisson-globe en été seulement', () => {
    expect(availableIn(item('Poisson-globe'), 'ete')).toBe(true)
    expect(availableIn(item('Poisson-globe'), 'automne')).toBe(false)
  })

  it('créatures de casier : toute l’année', () => {
    expect(availableIn(item('Homard'), 'hiver')).toBe(true)
  })

  it('culture et objet inconnu', () => {
    expect(availableIn(item('Panais'), 'printemps')).toBe(true)
    expect(availableIn(item('Panais'), 'ete')).toBe(false)
    expect(availableIn(item('Huile de truffe'), 'ete')).toBeNull()
  })

  it('résumé d’un paquet pour une saison', () => {
    const spring = seasonSummary(bundle('paquet-cueillette-de-printemps'), 'printemps')
    expect(spring).toEqual({ inSeason: 4, outOfSeason: 0, unknown: 0 })
    const winter = seasonSummary(bundle('paquet-cueillette-de-printemps'), 'hiver')
    expect(winter.outOfSeason).toBeGreaterThan(0)
  })
})

describe('item links', () => {
  it('lien vers un objet, une recette ou rien', () => {
    expect(itemLink('Bois')).toBe('/objets?q=Bois')
    expect(itemLink('Calmars frits')).toBe('/craft?tab=cuisine&q=Calmars%20frits')
    expect(itemLink('Tous les poissons')).toBeNull()
  })
})
