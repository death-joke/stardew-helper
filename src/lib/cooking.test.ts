import { describe, expect, it } from 'vitest'
import { COOKING_RECIPES } from '../data/recipes'
import { buffDurationSeconds, buffStats, filterCooking, parseBuffs, sortCooking, sourceKind } from './cooking'

const all = { buff: 'tous', source: 'toutes' } as const
const byId = (id: string) => COOKING_RECIPES.find((r) => r.id === id)!

describe('cooking helpers', () => {
  it('lit les bonus', () => {
    expect(parseBuffs('Agriculture (+2) Énergie max (+50)')).toEqual([{ stat: 'Agriculture', value: 2 }, { stat: 'Énergie max', value: 50 }])
    expect(parseBuffs('')).toEqual([])
  })

  it('lit la durée du bonus', () => {
    expect(buffDurationSeconds('7m')).toBe(420)
    expect(buffDurationSeconds('11m 11s')).toBe(671)
    expect(buffDurationSeconds('')).toBe(0)
    expect(buffDurationSeconds('4m 39s (Extraction minière) 2m 59s (Buff)')).toBe(279)
  })

  it('classe les sources', () => {
    expect(sourceKind('La reine des sauces 28 Printemps, Année 1 · Saloon pour 500po')).toBe('reine')
    expect(sourceKind('Emily (Lettre à 3+ )')).toBe('villageois')
    expect(sourceKind('Pêche Niveau 3')).toBe('competence')
    expect(sourceKind('Pêche (Niveau 9)')).toBe('competence')
    expect(sourceKind('Station balnéaire de l’Île Gingembre')).toBe('ile')
    expect(sourceKind('Maison de ferme améliorée')).toBe('autre')
  })

  it('toutes les recettes ont une source classée et chaque catégorie est utilisée', () => {
    const kinds = new Set(COOKING_RECIPES.map((r) => sourceKind(r.source)))
    expect([...kinds].sort()).toEqual(['autre', 'competence', 'ile', 'reine', 'villageois'])
  })
})

describe('cooking filters and sort', () => {
  it('filtre par caractéristique de bonus', () => {
    const fishing = filterCooking(COOKING_RECIPES, { ...all, buff: 'Pêche' })
    expect(fishing.length).toBe(10)
    expect(fishing.every((r) => parseBuffs(r.buff).some((b) => b.stat === 'Pêche'))).toBe(true)
  })

  it('avec / sans bonus se partagent les 80 plats', () => {
    const withBuff = filterCooking(COOKING_RECIPES, { ...all, buff: 'avec' }).length
    const without = filterCooking(COOKING_RECIPES, { ...all, buff: 'sans' }).length
    expect(withBuff + without).toBe(80)
    expect(withBuff).toBeGreaterThan(0)
  })

  it('liste des caractéristiques', () => {
    expect(buffStats(COOKING_RECIPES)).toContain('Énergie max')
    expect(buffStats(COOKING_RECIPES)).toHaveLength(10)
  })

  it('tri par prix décroissant, énergie croissante, nom', () => {
    const byPrice = sortCooking(COOKING_RECIPES, 'prix', 'desc')
    expect(byPrice[0].price).toBeGreaterThanOrEqual(byPrice[1].price)
    expect(byPrice[0].price).toBe(Math.max(...COOKING_RECIPES.map((r) => r.price)))
    const byEnergy = sortCooking(COOKING_RECIPES, 'energie', 'asc')
    expect(byEnergy[0].energy).toBe(Math.min(...COOKING_RECIPES.map((r) => r.energy ?? 0)))
    expect(sortCooking(COOKING_RECIPES, 'nom', 'asc')[0].name.localeCompare(sortCooking(COOKING_RECIPES, 'nom', 'asc')[1].name, 'fr')).toBeLessThanOrEqual(0)
  })

  it('tri sur la valeur d’un bonus', () => {
    const list = sortCooking(filterCooking(COOKING_RECIPES, { ...all, buff: 'Pêche' }), 'bonus', 'desc', 'Pêche')
    const values = list.map((r) => parseBuffs(r.buff).find((b) => b.stat === 'Pêche')!.value)
    expect(values).toEqual([...values].sort((a, b) => b - a))
    expect(list[0].id).toBe('pudding-de-mousse-de-mer') // Pêche +4
  })

  it('le tri ne modifie pas la liste d’origine', () => {
    const copy = [...COOKING_RECIPES]
    sortCooking(COOKING_RECIPES, 'prix', 'desc')
    expect(COOKING_RECIPES).toEqual(copy)
    expect(byId('omelette').name).toBe('Omelette')
  })
})
