import { describe, expect, it } from 'vitest'
import { BUNDLE_ROOMS } from '../data/bundles'
import { EMPTY_CHECKS, availableIn, isBundleChecks, missingByRoom, missingForBundle, seasonSummary, toggleDone, toggleGot, totalBundles } from './bundles'
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

describe('suivi de progression', () => {
  const art = () => bundle('paquet-artisan')

  it('tout manque au départ, et par salle', () => {
    const all = missingByRoom(EMPTY_CHECKS)
    expect(all).toHaveLength(7)
    expect(missingByRoom(EMPTY_CHECKS, 'salle-d-artisanats').map((r) => r.room.id)).toEqual(['salle-d-artisanats'])
  })

  it('cocher un objet diminue ce qu’il reste et le retire de la liste', () => {
    const b = art()
    const name = b.items[0].name
    const m = missingForBundle(b, toggleGot(EMPTY_CHECKS, b.id, name))!
    expect(m.remaining).toBe(b.slots - 1)
    expect(m.items.map((i) => i.name)).not.toContain(name)
  })

  it('un paquet coché ou dont toutes les cases sont remplies ne manque plus', () => {
    const b = art()
    expect(missingForBundle(b, toggleDone(EMPTY_CHECKS, b.id))).toBeNull()
    const full = b.items.slice(0, b.slots).reduce((c, i) => toggleGot(c, b.id, i.name), EMPTY_CHECKS)
    expect(missingForBundle(b, full)).toBeNull()
  })

  it('décocher annule, et la validation du stockage rejette les données invalides', () => {
    const b = art()
    expect(toggleDone(toggleDone(EMPTY_CHECKS, b.id), b.id).done).toEqual([])
    expect(isBundleChecks(EMPTY_CHECKS)).toBe(true)
    expect(isBundleChecks({ done: [1], got: {} })).toBe(false)
    expect(isBundleChecks(null)).toBe(false)
  })
})
