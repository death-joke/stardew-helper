import { BUILDINGS } from '../data/buildings'
import { PLACES } from '../data/places'
import type { Place, PlaceArea, PlaceLink } from '../data/types'
import { findQuest } from './quests'
import { normalize } from './text'

const enc = encodeURIComponent
const BUILDING_NAMES = new Set(BUILDINGS.map((b) => normalize(b.name)))

/** Lien interne vers la quête ou la construction visée ; `null` si elle n'existe pas. */
export function linkTarget(link: PlaceLink): string | null {
  if (link.kind === 'construction') {
    return BUILDING_NAMES.has(normalize(link.name)) ? `/constructions?q=${enc(link.name)}` : null
  }
  const quest = findQuest(link.name)
  return quest ? `/quetes?tab=${quest.kind}&q=${enc(quest.name)}` : null
}

/** Filtre par nom, région, condition de déblocage ou notes. */
export function filterPlaces(list: Place[], query: string): Place[] {
  const q = normalize(query.trim())
  if (!q) return list
  return list.filter((p) => [p.name, p.region, p.unlock, p.notes ?? ''].some((s) => normalize(s).includes(q)))
}

/** Lieux regroupés par zone, dans l'ordre d'apparition des données. */
export function groupByArea(list: Place[] = PLACES): Array<{ area: PlaceArea; places: Place[] }> {
  const out: Array<{ area: PlaceArea; places: Place[] }> = []
  for (const p of list) {
    let g = out.find((x) => x.area === p.area)
    if (!g) out.push((g = { area: p.area, places: [] }))
    g.places.push(p)
  }
  return out
}
