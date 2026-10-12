import Fuse from 'fuse.js'
import { COOKING_RECIPES, CRAFT_RECIPES } from '../data/recipes'
import { CRAB_POT, FISH, NIGHT_MARKET_FISH } from '../data/fish'
import { CROPS } from '../data/crops'
import { FESTIVALS } from '../data/calendar'
import { EQUIPMENT } from '../data/equipment'
import { ITEMS } from '../data/items'
import { VILLAGERS } from '../data/villagers'
import { SEASON_LABELS } from './gameDate'
import { normalize } from './text'

export type SearchKind = 'objet' | 'equipement' | 'poisson' | 'culture' | 'artisanat' | 'cuisine' | 'villageois' | 'festival'

export const KIND_LABELS: Record<SearchKind, string> = {
  objet: 'Objet',
  equipement: 'Arme / chaussures',
  poisson: 'Poisson',
  culture: 'Culture',
  artisanat: 'Recette d’artisanat',
  cuisine: 'Recette de cuisine',
  villageois: 'Villageois',
  festival: 'Festival',
}

export interface SearchEntry {
  key: string
  name: string
  kind: SearchKind
  detail: string
  to: string
  norm: string
}

const enc = encodeURIComponent

function build(): SearchEntry[] {
  const e: Omit<SearchEntry, 'norm' | 'key'>[] = [
    ...ITEMS.map((i) => ({ name: i.name, kind: 'objet' as const, detail: i.category, to: `/objets?q=${enc(i.name)}` })),
    ...EQUIPMENT.map((e) => ({ name: e.name, kind: 'equipement' as const, detail: e.kind, to: `/equipement?q=${enc(e.name)}${e.kind === 'Chaussures' ? '&tab=chaussures' : ''}` })),
    ...[...FISH, ...NIGHT_MARKET_FISH, ...CRAB_POT].map((f) => ({ name: f.name, kind: 'poisson' as const, detail: `${f.price} po`, to: `/peche?q=${enc(f.name)}` })),
    ...CROPS.map((c) => ({ name: c.name, kind: 'culture' as const, detail: c.seasons.map((s) => SEASON_LABELS[s]).join(' / '), to: `/agriculture?crop=${c.id}` })),
    ...CRAFT_RECIPES.map((r) => ({ name: r.name, kind: 'artisanat' as const, detail: r.category, to: `/craft?q=${enc(r.name)}` })),
    ...COOKING_RECIPES.map((r) => ({ name: r.name, kind: 'cuisine' as const, detail: `${r.price} po`, to: `/craft?tab=cuisine&q=${enc(r.name)}` })),
    ...VILLAGERS.map((v) => ({ name: v.name, kind: 'villageois' as const, detail: `Anniversaire : ${v.birthday.day} ${SEASON_LABELS[v.birthday.season]}`, to: `/villageois?q=${enc(v.name)}` })),
    ...FESTIVALS.map((f) => ({ name: f.name, kind: 'festival' as const, detail: `${f.days[0]} ${SEASON_LABELS[f.season]}`, to: `/calendrier?season=${f.season}&day=${f.days[0]}${f.year ? `&year=${f.year}` : ''}` })),
  ]
  return e.map((x, i) => ({ ...x, key: `${x.kind}-${i}`, norm: normalize(x.name) }))
}

let entries: SearchEntry[] | null = null
let fuse: Fuse<SearchEntry> | null = null

function index(): { entries: SearchEntry[]; fuse: Fuse<SearchEntry> } {
  entries ??= build()
  fuse ??= new Fuse(entries, { keys: ['norm'], threshold: 0.3, ignoreLocation: true, includeScore: true })
  return { entries, fuse }
}

/** Recherche floue sur tous les contenus. Les correspondances exactes ou « commence par » passent en premier. */
export function search(query: string, limit = 8): SearchEntry[] {
  const q = normalize(query.trim())
  if (q.length < 2) return []
  const { entries: all, fuse: f } = index()
  const rank = (x: SearchEntry) => (x.norm === q ? 0 : x.norm.startsWith(q) ? 1 : x.norm.includes(q) ? 2 : 3)
  const direct = all.filter((x) => x.norm.includes(q))
  const fuzzy = f.search(q, { limit: 30 }).map((r) => r.item).filter((x) => !x.norm.includes(q))
  return [...direct.sort((a, b) => rank(a) - rank(b) || a.norm.length - b.norm.length), ...fuzzy].slice(0, limit)
}
