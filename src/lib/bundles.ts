import { CROPS } from '../data/crops'
import { CRAB_POT, FISH } from '../data/fish'
import { ITEMS } from '../data/items'
import { BUNDLE_ROOMS } from '../data/bundles'
import type { Bundle, BundleItem } from '../data/types'
import { SEASONS, SEASON_LABELS } from './gameDate'
import type { Season } from './gameDate'
import { normalize } from './text'

const byName = <T extends { name: string }>(list: T[]) => new Map(list.map((x) => [normalize(x.name), x]))
const FISH_BY_NAME = byName(FISH)
const CRAB_BY_NAME = byName(CRAB_POT)
const CROP_BY_NAME = byName(CROPS)
const FORAGE_BY_NAME = byName(ITEMS.filter((i) => i.category === 'Cueillette'))

/** Saisons mentionnées dans l'étiquette de cueillette (« Printemps », « La plage · Hiver »…) ; vide = toute l'année. */
function foragingSeasons(sub: string | null): Season[] {
  if (!sub) return []
  return SEASONS.filter((s) => sub.includes(SEASON_LABELS[s]))
}

/**
 * L'objet est-il disponible pendant cette saison ? `null` quand on ne peut pas le dire
 * (objet fabriqué, minéral, variante de qualité…).
 */
export function availableIn(item: BundleItem, season: Season): boolean | null {
  const n = normalize(item.name)
  const fish = FISH_BY_NAME.get(n)
  if (fish) return fish.seasons.includes(season)
  if (CRAB_BY_NAME.has(n)) return true
  const forage = FORAGE_BY_NAME.get(n)
  if (forage) {
    const seasons = foragingSeasons(forage.sub)
    return seasons.length === 0 || seasons.includes(season)
  }
  const crop = CROP_BY_NAME.get(n)
  // Un objet exigé « de qualité » dépend aussi de la saison de culture, mais reste une culture : on la juge de même.
  if (crop) return crop.seasons.includes(season)
  return null
}

export interface BundleProgress {
  inSeason: number
  outOfSeason: number
  unknown: number
}

export function seasonSummary(bundle: Bundle, season: Season): BundleProgress {
  const out: BundleProgress = { inSeason: 0, outOfSeason: 0, unknown: 0 }
  for (const item of bundle.items) {
    const a = availableIn(item, season)
    if (a === true) out.inSeason++
    else if (a === false) out.outOfSeason++
    else out.unknown++
  }
  return out
}

export function totalBundles(): number {
  return BUNDLE_ROOMS.reduce((n, r) => n + r.bundles.length, 0)
}
