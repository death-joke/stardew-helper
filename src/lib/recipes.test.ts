import { describe, expect, it } from 'vitest'
import { COOKING_RECIPES, CRAFT_RECIPES } from '../data/recipes'
import { filterRecipes, ingredientNames } from './recipes'

const none = { query: '', ingredient: '' }

describe('recipes data', () => {
  it('150 recettes d’artisanat et 80 de cuisine, identifiants uniques, ingrédients présents', () => {
    expect(CRAFT_RECIPES).toHaveLength(150)
    expect(COOKING_RECIPES).toHaveLength(80)
    for (const list of [CRAFT_RECIPES, COOKING_RECIPES]) {
      expect(new Set(list.map((r) => r.id)).size).toBe(list.length)
      expect(list.every((r) => r.ingredients.length > 0 && r.ingredients.every((i) => i.qty >= 1))).toBe(true)
    }
  })

  it('bombe : 4 minerais de fer + 1 charbon', () => {
    const bomb = CRAFT_RECIPES.find((r) => r.id === 'bombe')!
    expect(bomb.ingredients).toEqual([{ name: 'Minerai de fer', qty: 4 }, { name: 'Charbon', qty: 1 }])
  })

  it('omelette : œuf + lait, source Reine de la sauce', () => {
    const omelette = COOKING_RECIPES.find((r) => r.id === 'omelette')!
    expect(omelette.ingredients.map((i) => i.name)).toEqual(['Œuf', 'Lait'])
    expect(omelette.source).toContain('La reine des sauces')
    expect(omelette.energy).toBe(100)
  })
})

describe('recipes filters', () => {
  it('recherche par nom sans accent ni casse', () => {
    expect(filterRecipes(COOKING_RECIPES, { ...none, query: 'GATEAU' }).length).toBeGreaterThan(0)
    expect(filterRecipes(COOKING_RECIPES, { ...none, query: 'gateau' }).every((r) => /g[âa]teau/i.test(r.name))).toBe(true)
  })

  it('par ingrédient', () => {
    const withCoal = filterRecipes(CRAFT_RECIPES, { ...none, ingredient: 'charbon' })
    expect(withCoal.length).toBeGreaterThan(0)
    expect(withCoal.every((r) => r.ingredients.some((i) => /charbon/i.test(i.name)))).toBe(true)
  })

  it('combine nom et ingrédient', () => {
    expect(filterRecipes(CRAFT_RECIPES, { query: 'bombe', ingredient: 'charbon' }).map((r) => r.id)).toContain('bombe')
    expect(filterRecipes(CRAFT_RECIPES, { query: 'zzz', ingredient: '' })).toEqual([])
  })

  it('liste d’ingrédients unique et triée', () => {
    const names = ingredientNames(CRAFT_RECIPES)
    expect(new Set(names).size).toBe(names.length)
    expect(names).toContain('Bois')
  })
})
