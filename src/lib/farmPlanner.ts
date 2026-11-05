export type ObjectKind =
  | 'arroseur'
  | 'arroseur-qualite'
  | 'arroseur-iridium'
  | 'epouvantail'
  | 'epouvantail-deluxe'
  | 'cabane-junimo'
  | 'batiment'
  | 'arbre-fruitier'

export interface PlacedObject {
  kind: ObjectKind
  x: number
  y: number
  nozzle?: boolean // buse de projection (arroseurs seulement)
  variant?: string // id du bâtiment (BUILDING_TYPES) ou de l'arbre fruitier (FRUIT_TREES)
}

export interface FarmPlan {
  crops: string[] // cases de culture, « x,y »
  objects: PlacedObject[]
}

export const EMPTY_PLAN: FarmPlan = { crops: [], objects: [] }

export type Layer = 'arrosage' | 'protection' | 'junimo' | 'arbre'

export interface KindInfo { label: string; w: number; h: number; layer: Layer | null }

// Emprises au sol (largeur × hauteur en cases), d'après le wiki (Buildings, 1.6). Les améliorations gardent l'emprise.
export interface BuildingType { id: string; label: string; w: number; h: number; glyph: string }
export const BUILDING_TYPES: BuildingType[] = [
  { id: 'silo', label: 'Silo', w: 3, h: 3, glyph: '🌾' },
  { id: 'puits', label: 'Puits', w: 3, h: 3, glyph: '🪣' },
  { id: 'moulin', label: 'Moulin', w: 4, h: 2, glyph: '⚙️' },
  { id: 'poulailler', label: 'Poulailler', w: 6, h: 3, glyph: '🐔' },
  { id: 'grange', label: 'Grange', w: 7, h: 4, glyph: '🐄' },
  { id: 'etable', label: 'Étable', w: 4, h: 2, glyph: '🐴' },
  { id: 'cabanon', label: 'Cabanon', w: 7, h: 3, glyph: '🏚️' },
  { id: 'etang', label: 'Étang à poissons', w: 5, h: 5, glyph: '🐟' },
  { id: 'clapier', label: 'Clapier pour Slime', w: 7, h: 4, glyph: '🟢' },
  { id: 'cabane', label: 'Cabane (multijoueur)', w: 5, h: 3, glyph: '🏠' },
  { id: 'obelisque', label: 'Obélisque / Horloge dorée', w: 3, h: 2, glyph: '🗿' },
  { id: 'gamelle', label: 'Gamelle', w: 2, h: 2, glyph: '🐕' },
  { id: 'bac', label: 'Bac d’expédition', w: 2, h: 1, glyph: '📦' },
]

const buildingType = (id: string | undefined) => BUILDING_TYPES.find((b) => b.id === id)

export const KINDS: Record<ObjectKind, KindInfo> = {
  arroseur: { label: 'Arroseur', w: 1, h: 1, layer: 'arrosage' },
  'arroseur-qualite': { label: 'Arroseur de qualité', w: 1, h: 1, layer: 'arrosage' },
  'arroseur-iridium': { label: 'Arroseur d’iridium', w: 1, h: 1, layer: 'arrosage' },
  epouvantail: { label: 'Épouvantail', w: 1, h: 1, layer: 'protection' },
  'epouvantail-deluxe': { label: 'Épouvantail deluxe', w: 1, h: 1, layer: 'protection' },
  'cabane-junimo': { label: 'Cabane Junimo', w: 3, h: 2, layer: 'junimo' },
  batiment: { label: 'Bâtiment', w: 1, h: 1, layer: null },
  'arbre-fruitier': { label: 'Arbre fruitier', w: 1, h: 1, layer: 'arbre' },
}

/** Taille de l'objet posé (celle du bâtiment choisi, 1 × 1 pour les autres cas). */
export function sizeOf(o: Pick<PlacedObject, 'kind' | 'variant'>): { w: number; h: number } {
  if (o.kind === 'batiment') {
    const b = buildingType(o.variant)
    if (b) return { w: b.w, h: b.h }
  }
  return KINDS[o.kind]
}

// Rayon de l'arroseur (carré de côté 2r+1) ; l'arroseur de base n'arrose qu'en croix.
const SPRINKLER_RADIUS: Partial<Record<ObjectKind, number>> = { 'arroseur-qualite': 1, 'arroseur-iridium': 2 }
const SCARECROW_RADIUS: Partial<Record<ObjectKind, number>> = { epouvantail: 8, 'epouvantail-deluxe': 16 }
// Hypothèse non recoupée avec le wiki FR : carré 17 × 17 centré sur la case de la porte (x + 1, y + 1).
const JUNIMO_RADIUS = 8

export const key = (x: number, y: number) => `${x},${y}`

export function parseKey(k: string): [number, number] {
  const [x, y] = k.split(',').map(Number)
  return [x, y]
}

export function footprint(o: PlacedObject): string[] {
  const { w, h } = sizeOf(o)
  const cells: string[] = []
  for (let dx = 0; dx < w; dx++) for (let dy = 0; dy < h; dy++) cells.push(key(o.x + dx, o.y + dy))
  return cells
}

/** Cases touchées par l'objet, sans sa propre emprise (sauf la cabane Junimo, qui récolte autour de sa porte). */
export function coverage(o: PlacedObject): Set<string> {
  const out = new Set<string>()
  const add = (x: number, y: number) => { if (x !== o.x || y !== o.y) out.add(key(x, y)) }

  if (o.kind === 'arroseur') {
    const r = o.nozzle ? 1 : 0
    if (r === 0) {
      add(o.x, o.y - 1); add(o.x, o.y + 1); add(o.x - 1, o.y); add(o.x + 1, o.y)
      return out
    }
    for (let dx = -1; dx <= 1; dx++) for (let dy = -1; dy <= 1; dy++) add(o.x + dx, o.y + dy)
    return out
  }

  const sr = SPRINKLER_RADIUS[o.kind]
  if (sr !== undefined) {
    const r = sr + (o.nozzle ? 1 : 0)
    for (let dx = -r; dx <= r; dx++) for (let dy = -r; dy <= r; dy++) add(o.x + dx, o.y + dy)
    return out
  }

  const cr = SCARECROW_RADIUS[o.kind]
  if (cr !== undefined) {
    for (let dx = -cr; dx <= cr; dx++) {
      for (let dy = -cr; dy <= cr; dy++) {
        if (dx * dx + dy * dy < (cr + 1) * (cr + 1)) add(o.x + dx, o.y + dy)
      }
    }
    return out
  }

  if (o.kind === 'arbre-fruitier') {
    for (let dx = -1; dx <= 1; dx++) for (let dy = -1; dy <= 1; dy++) add(o.x + dx, o.y + dy)
    return out
  }

  if (o.kind === 'batiment') return out

  const cx = o.x + 1
  const cy = o.y + 1
  for (let dx = -JUNIMO_RADIUS; dx <= JUNIMO_RADIUS; dx++) {
    for (let dy = -JUNIMO_RADIUS; dy <= JUNIMO_RADIUS; dy++) out.add(key(cx + dx, cy + dy))
  }
  return out
}

export interface Grid { w: number; h: number; blocked: (x: number, y: number) => boolean }

function occupied(plan: FarmPlan): Set<string> {
  return new Set(plan.objects.flatMap(footprint))
}

export function canPlace(plan: FarmPlan, obj: PlacedObject, grid: Grid): boolean {
  const taken = occupied(plan)
  const { w, h } = sizeOf(obj)
  for (let dx = 0; dx < w; dx++) {
    for (let dy = 0; dy < h; dy++) {
      const cx = obj.x + dx
      const cy = obj.y + dy
      if (cx < 0 || cy < 0 || cx >= grid.w || cy >= grid.h) return false
      if (grid.blocked(cx, cy) || taken.has(key(cx, cy))) return false
    }
  }
  // Deux arbres fruitiers doivent garder leurs zones 3 × 3 distinctes : au moins 3 cases entre les troncs.
  if (obj.kind === 'arbre-fruitier') {
    return !plan.objects.some((o) => o.kind === 'arbre-fruitier' && Math.max(Math.abs(o.x - obj.x), Math.abs(o.y - obj.y)) < 3)
  }
  return true
}

/** Pose l'objet (il remplace les cultures sous son emprise). Ne fait rien si la pose est impossible. */
export function addObject(plan: FarmPlan, obj: PlacedObject, grid: Grid): FarmPlan {
  if (!canPlace(plan, obj, grid)) return plan
  const under = new Set(footprint(obj))
  return { crops: plan.crops.filter((c) => !under.has(c)), objects: [...plan.objects, obj] }
}

export function objectAt(plan: FarmPlan, x: number, y: number): PlacedObject | undefined {
  const k = key(x, y)
  return plan.objects.find((o) => footprint(o).includes(k))
}

/** Retire l'objet puis, à défaut, la culture de la case. */
export function removeAt(plan: FarmPlan, x: number, y: number): FarmPlan {
  const obj = objectAt(plan, x, y)
  if (obj) return { ...plan, objects: plan.objects.filter((o) => o !== obj) }
  const k = key(x, y)
  return plan.crops.includes(k) ? { ...plan, crops: plan.crops.filter((c) => c !== k) } : plan
}

export function paintCrop(plan: FarmPlan, x: number, y: number, grid: Grid): FarmPlan {
  const k = key(x, y)
  if (x < 0 || y < 0 || x >= grid.w || y >= grid.h || grid.blocked(x, y)) return plan
  if (plan.crops.includes(k) || objectAt(plan, x, y)) return plan
  return { ...plan, crops: [...plan.crops, k] }
}

export interface PlanStats {
  total: number
  watered: number
  scared: number
  harvested: number
  dry: string[]
  exposed: string[]
  unreached: string[]
  crowded: string[] // cultures dans la zone 3 × 3 d'un arbre fruitier
}

export function layerCoverage(plan: FarmPlan): Record<Layer, Set<string>> {
  const layers = { arrosage: new Set<string>(), protection: new Set<string>(), junimo: new Set<string>(), arbre: new Set<string>() }
  for (const o of plan.objects) {
    const layer = KINDS[o.kind].layer
    if (layer) for (const c of coverage(o)) layers[layer].add(c)
  }
  return layers
}

export function planStats(plan: FarmPlan): PlanStats {
  const layers = layerCoverage(plan)
  const dry = plan.crops.filter((c) => !layers.arrosage.has(c))
  const exposed = plan.crops.filter((c) => !layers.protection.has(c))
  const unreached = plan.crops.filter((c) => !layers.junimo.has(c))
  const total = plan.crops.length
  return {
    total,
    watered: total - dry.length,
    scared: total - exposed.length,
    harvested: total - unreached.length,
    dry,
    exposed,
    unreached,
    crowded: plan.crops.filter((c) => layers.arbre.has(c)),
  }
}

const KIND_IDS = Object.keys(KINDS)

export function isFarmPlan(v: unknown): v is FarmPlan {
  if (typeof v !== 'object' || v === null) return false
  const { crops, objects } = v as Record<string, unknown>
  return (
    Array.isArray(crops) && crops.every((c) => typeof c === 'string' && /^\d+,\d+$/.test(c)) &&
    Array.isArray(objects) &&
    objects.every((o) => {
      if (typeof o !== 'object' || o === null) return false
      const { kind, x, y, nozzle, variant } = o as Record<string, unknown>
      return (
        typeof kind === 'string' && KIND_IDS.includes(kind) &&
        Number.isInteger(x) && Number.isInteger(y) &&
        (nozzle === undefined || typeof nozzle === 'boolean') &&
        (variant === undefined || typeof variant === 'string') &&
        (kind !== 'batiment' || buildingType(variant) !== undefined) &&
        (kind !== 'arbre-fruitier' || typeof variant === 'string')
      )
    })
  )
}
