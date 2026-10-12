import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { COOKING_RECIPES, CRAFT_RECIPES } from '../data/recipes'
import type { CookingRecipe, CraftRecipe, Ingredient } from '../data/types'
import { SORT_LABELS, SOURCE_LABELS, buffStats, filterCooking, parseBuffs, sortCooking } from '../lib/cooking'
import type { CookingSort, SourceKind } from '../lib/cooking'
import { filterRecipes, ingredientNames } from '../lib/recipes'
import { Card } from '../components/Card'

type Tab = 'artisanat' | 'cuisine'

const field = 'rounded border border-wood/40 bg-field px-2 py-1.5 text-sm'
const CATEGORIES = [...new Set(CRAFT_RECIPES.map((r) => r.category))]
const INGREDIENTS = ingredientNames([...CRAFT_RECIPES, ...COOKING_RECIPES])
const BUFF_STATS = buffStats(COOKING_RECIPES)

export function Crafting() {
  const [params] = useSearchParams()
  const [tab, setTab] = useState<Tab>(params.get('tab') === 'cuisine' ? 'cuisine' : 'artisanat')
  const [query, setQuery] = useState(params.get('q') ?? '')
  const [ingredient, setIngredient] = useState(params.get('ingredient') ?? '')
  const [category, setCategory] = useState('toutes')
  const [buff, setBuff] = useState('tous')
  const [source, setSource] = useState<SourceKind | 'toutes'>('toutes')
  const [sortKey, setSortKey] = useState<CookingSort>('nom')
  const [dir, setDir] = useState<'asc' | 'desc'>('asc')

  const statFilter = BUFF_STATS.includes(buff) ? buff : null
  const changeSort = (key: CookingSort) => {
    setSortKey(key)
    setDir(key === 'nom' ? 'asc' : 'desc')
  }
  const changeBuff = (value: string) => {
    setBuff(value)
    if (sortKey === 'bonus' && !BUFF_STATS.includes(value)) changeSort('nom')
  }

  const filter = { query, ingredient }
  const crafts = filterRecipes(CRAFT_RECIPES, filter).filter((r) => category === 'toutes' || r.category === category)
  const dishes = sortCooking(filterCooking(filterRecipes(COOKING_RECIPES, filter), { buff, source }), sortKey, dir, statFilter)
  const count = tab === 'artisanat' ? crafts.length : dishes.length

  return (
    <div className="space-y-4">
      <Card title="Craft" icon="🔨">
        <div role="tablist" className="mb-3 flex gap-1">
          {(['artisanat', 'cuisine'] as const).map((t) => (
            <button
              key={t}
              role="tab"
              aria-selected={t === tab}
              onClick={() => setTab(t)}
              className={`flex-1 rounded px-2 py-1.5 text-sm ${t === tab ? 'bg-wood text-parchment' : 'bg-parchment-dark hover:bg-parchment-dark/70'}`}
            >
              {t === 'artisanat' ? `Artisanat (${CRAFT_RECIPES.length})` : `Cuisine (${COOKING_RECIPES.length})`}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <input
            type="search"
            aria-label="Rechercher une recette"
            placeholder="Rechercher une recette…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className={`${field} w-full sm:w-auto sm:min-w-0 sm:flex-1`}
          />
          <input
            type="search"
            list="ingredients"
            aria-label="Ingrédient"
            placeholder="Avec quel ingrédient ?"
            value={ingredient}
            onChange={(e) => setIngredient(e.target.value)}
            className={`${field} w-full sm:w-auto sm:min-w-0 sm:flex-1`}
          />
          <datalist id="ingredients">
            {INGREDIENTS.map((n) => <option key={n} value={n} />)}
          </datalist>
          {tab === 'artisanat' && (
            <select aria-label="Catégorie" value={category} onChange={(e) => setCategory(e.target.value)} className={field}>
              <option value="toutes">Toutes les catégories</option>
              {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          )}
        </div>
        {tab === 'cuisine' && (
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <select aria-label="Bonus" value={buff} onChange={(e) => changeBuff(e.target.value)} className={field}>
              <option value="tous">Tous les plats</option>
              <option value="avec">Avec un bonus</option>
              <option value="sans">Sans bonus</option>
              {BUFF_STATS.map((b) => <option key={b} value={b}>Bonus : {b}</option>)}
            </select>
            <select aria-label="Source de la recette" value={source} onChange={(e) => setSource(e.target.value as SourceKind | 'toutes')} className={field}>
              <option value="toutes">Toutes les sources</option>
              {(Object.keys(SOURCE_LABELS) as SourceKind[]).map((k) => <option key={k} value={k}>{SOURCE_LABELS[k]}</option>)}
            </select>
            <label className="flex items-center gap-2 text-sm">
              Trier par
              <select aria-label="Trier par" value={sortKey} onChange={(e) => changeSort(e.target.value as CookingSort)} className={field}>
                {(Object.keys(SORT_LABELS) as Array<keyof typeof SORT_LABELS>).map((k) => <option key={k} value={k}>{SORT_LABELS[k]}</option>)}
                {statFilter && <option value="bonus">Valeur du bonus ({statFilter})</option>}
              </select>
            </label>
            <button
              type="button"
              onClick={() => setDir(dir === 'asc' ? 'desc' : 'asc')}
              aria-label={dir === 'asc' ? 'Ordre croissant, cliquer pour inverser' : 'Ordre décroissant, cliquer pour inverser'}
              className="rounded bg-wood px-3 py-1.5 text-sm text-parchment active:bg-wood-dark"
            >
              {dir === 'asc' ? '↑ Croissant' : '↓ Décroissant'}
            </button>
          </div>
        )}
        <p className="mt-3 text-sm text-muted">{count} recette{count > 1 ? 's' : ''}. Clique sur un ingrédient pour filtrer avec lui.</p>
      </Card>

      {count === 0 ? (
        <p className="text-sm text-muted">Aucune recette avec ces filtres.</p>
      ) : (
        <ul className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {tab === 'artisanat'
            ? crafts.map((r) => <CraftCard key={r.id} recipe={r} onIngredient={setIngredient} />)
            : dishes.map((r) => <CookingCard key={r.id} recipe={r} onIngredient={setIngredient} />)}
        </ul>
      )}
    </div>
  )
}

function Ingredients({ items, onPick }: { items: Ingredient[]; onPick: (name: string) => void }) {
  return (
    <ul className="mt-2 flex flex-wrap gap-1.5">
      {items.map((i) => (
        <li key={i.name}>
          <button
            type="button"
            onClick={() => onPick(i.name)}
            className="rounded-full border border-wood/30 bg-parchment px-2 py-0.5 text-xs hover:bg-parchment-dark"
          >
            {i.qty} × {i.name}
          </button>
        </li>
      ))}
    </ul>
  )
}

function CraftCard({ recipe, onIngredient }: { recipe: CraftRecipe; onIngredient: (name: string) => void }) {
  return (
    <li className="rounded-lg border border-wood/30 bg-card p-3 shadow-sm">
      <div className="flex items-baseline justify-between gap-2">
        <h3 className="font-semibold">{recipe.name}</h3>
        <span className="shrink-0 rounded bg-parchment-dark px-1.5 text-xs">{recipe.category}</span>
      </div>
      <p className="text-sm text-muted">{recipe.desc}</p>
      <Ingredients items={recipe.ingredients} onPick={onIngredient} />
      <p className="mt-2 text-xs text-muted">Recette : {recipe.source || 'inconnue'}</p>
    </li>
  )
}

function CookingCard({ recipe, onIngredient }: { recipe: CookingRecipe; onIngredient: (name: string) => void }) {
  const buffs = parseBuffs(recipe.buff)
  return (
    <li className="rounded-lg border border-wood/30 bg-card p-3 shadow-sm">
      <div className="flex items-baseline justify-between gap-2">
        <h3 className="font-semibold">{recipe.name}</h3>
        <span className="shrink-0 text-sm">{recipe.price} po</span>
      </div>
      <p className="text-sm text-muted">{recipe.desc}</p>
      <Ingredients items={recipe.ingredients} onPick={onIngredient} />
      <p className="mt-2 text-xs">
        {recipe.energy !== null && <>Énergie {recipe.energy} · Santé {recipe.health}</>}
        {buffs.length > 0 && <> · Bonus : {buffs.map((b) => `${b.stat} ${b.value > 0 ? '+' : ''}${b.value}`).join(', ')}{recipe.buffDuration && ` (${recipe.buffDuration})`}</>}
      </p>
      <p className="mt-1 text-xs text-muted">Recette : {recipe.source || 'inconnue'}</p>
    </li>
  )
}
