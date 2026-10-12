import type { Ingredient } from '../data/types'
import { normalize } from './text'

interface HasIngredients {
  name: string
  ingredients: Ingredient[]
}

export interface RecipeFilter {
  query: string // nom de la recette
  ingredient: string // « je veux fabriquer avec… »
}

/** Noms d'ingrédients uniques, triés. */
export function ingredientNames(recipes: HasIngredients[]): string[] {
  const all = new Set(recipes.flatMap((r) => r.ingredients.map((i) => i.name)))
  return [...all].sort((a, b) => a.localeCompare(b, 'fr'))
}

export function filterRecipes<T extends HasIngredients>(recipes: T[], { query, ingredient }: RecipeFilter): T[] {
  const q = normalize(query.trim())
  const ing = normalize(ingredient.trim())
  return recipes.filter((r) => {
    if (q && !normalize(r.name).includes(q)) return false
    if (ing && !r.ingredients.some((i) => normalize(i.name).includes(ing))) return false
    return true
  })
}
