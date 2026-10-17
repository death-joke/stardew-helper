import { CROPS } from '../data/crops'
import { CRAB_POT, FISH } from '../data/fish'
import { ITEMS } from '../data/items'
import { BUNDLE_ROOMS } from '../data/bundles'
import type { Bundle, BundleItem, BundleRoom } from '../data/types'
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

/** Avancement saisi par le joueur : paquets terminés et objets déjà réunis, par id de paquet. */
export interface BundleChecks {
  done: string[]
  got: Record<string, string[]>
}

export const EMPTY_CHECKS: BundleChecks = { done: [], got: {} }

export function isBundleDone(bundle: Bundle, checks: BundleChecks): boolean {
  return checks.done.includes(bundle.id)
}

export function gotCount(bundle: Bundle, checks: BundleChecks): number {
  const got = checks.got[bundle.id] ?? []
  return bundle.items.filter((i) => got.includes(i.name)).length
}

export interface BundleMissing {
  bundle: Bundle
  /** Nombre d'objets encore à fournir. */
  remaining: number
  /** Objets au choix qui n'ont pas encore été cochés. */
  items: BundleItem[]
}

/** Ce qu'il reste à réunir pour un paquet ; `null` s'il est terminé (coché, ou toutes ses cases remplies). */
export function missingForBundle(bundle: Bundle, checks: BundleChecks): BundleMissing | null {
  if (isBundleDone(bundle, checks)) return null
  const remaining = bundle.slots - gotCount(bundle, checks)
  if (remaining <= 0) return null
  const got = checks.got[bundle.id] ?? []
  return { bundle, remaining, items: bundle.items.filter((i) => !got.includes(i.name)) }
}

export interface RoomMissing {
  room: BundleRoom
  bundles: BundleMissing[]
}

/** Ce qui manque, par salle (salles terminées omises). `roomId` restreint à une seule salle. */
export function missingByRoom(checks: BundleChecks, roomId?: string): RoomMissing[] {
  return BUNDLE_ROOMS.filter((r) => !roomId || r.id === roomId)
    .map((room) => ({
      room,
      bundles: room.bundles.map((b) => missingForBundle(b, checks)).filter((m): m is BundleMissing => m !== null),
    }))
    .filter((r) => r.bundles.length > 0)
}

export function toggleDone(checks: BundleChecks, bundleId: string): BundleChecks {
  const done = checks.done.includes(bundleId) ? checks.done.filter((d) => d !== bundleId) : [...checks.done, bundleId]
  return { ...checks, done }
}

export function toggleGot(checks: BundleChecks, bundleId: string, itemName: string): BundleChecks {
  const cur = checks.got[bundleId] ?? []
  const next = cur.includes(itemName) ? cur.filter((n) => n !== itemName) : [...cur, itemName]
  return { ...checks, got: { ...checks.got, [bundleId]: next } }
}

export function isBundleChecks(v: unknown): v is BundleChecks {
  if (typeof v !== 'object' || v === null) return false
  const { done, got } = v as Record<string, unknown>
  return (
    Array.isArray(done) && done.every((d) => typeof d === 'string') &&
    typeof got === 'object' && got !== null && !Array.isArray(got) &&
    Object.values(got).every((l) => Array.isArray(l) && l.every((n) => typeof n === 'string'))
  )
}
