import { describe, expect, it } from 'vitest'
import { FARM_H, FARM_W, isBlocked } from '../data/farmMap'
import {
  EMPTY_PLAN, addObject, canPlace, coverage, footprint, isFarmPlan, key, objectAt, paintCrop, planStats, removeAt,
} from './farmPlanner'
import type { Grid, PlacedObject } from './farmPlanner'

const open: Grid = { w: 80, h: 65, blocked: () => false }
const farm: Grid = { w: FARM_W, h: FARM_H, blocked: isBlocked }
const at = (kind: PlacedObject['kind'], x: number, y: number, nozzle?: boolean, variant?: string): PlacedObject => ({ kind, x, y, nozzle, variant })

describe('coverage', () => {
  it("l'arroseur de base arrose en croix, avec ou sans buse", () => {
    expect([...coverage(at('arroseur', 10, 10))].sort()).toEqual(['10,11', '10,9', '11,10', '9,10'])
    expect(coverage(at('arroseur', 10, 10, true)).size).toBe(8)
  })

  it('arroseurs de qualité et d’iridium', () => {
    expect(coverage(at('arroseur-qualite', 20, 20)).size).toBe(8)
    expect(coverage(at('arroseur-qualite', 20, 20, true)).size).toBe(24)
    expect(coverage(at('arroseur-iridium', 20, 20)).size).toBe(24)
    expect(coverage(at('arroseur-iridium', 20, 20, true)).size).toBe(48)
  })

  it('épouvantail : 248 cases (wiki), rayon 8 ; deluxe : rayon 16', () => {
    const s = coverage(at('epouvantail', 40, 30))
    expect(s.size).toBe(248)
    expect(s.has(key(48, 30))).toBe(true)
    expect(s.has(key(49, 30))).toBe(false)
    expect(s.has(key(46, 36))).toBe(true) // diagonale : 6 cases
    expect(s.has(key(48, 38))).toBe(false)
    const d = coverage(at('epouvantail-deluxe', 40, 30))
    expect(d.has(key(56, 30))).toBe(true)
    expect(d.has(key(57, 30))).toBe(false)
  })

  it('cabane Junimo : carré 17 × 17 autour de la porte', () => {
    const s = coverage(at('cabane-junimo', 10, 10))
    expect(s.size).toBe(17 * 17)
    expect(s.has(key(3, 3))).toBe(true)
    expect(s.has(key(19, 19))).toBe(true)
    expect(s.has(key(2, 11))).toBe(false)
  })
})

describe('pose', () => {
  it('la cabane occupe 3 × 2 cases', () => {
    expect(footprint(at('cabane-junimo', 5, 5))).toHaveLength(6)
  })

  it('refuse hors carte, case bloquée et chevauchement', () => {
    expect(canPlace(EMPTY_PLAN, at('arroseur', -1, 0), open)).toBe(false)
    expect(canPlace(EMPTY_PLAN, at('cabane-junimo', 78, 10), open)).toBe(false)
    expect(canPlace(EMPTY_PLAN, at('arroseur', 40, 53), farm)).toBe(false) // mare
    expect(canPlace(EMPTY_PLAN, at('arroseur', 20, 30), farm)).toBe(true)
    const p = addObject(EMPTY_PLAN, at('epouvantail', 10, 10), open)
    expect(canPlace(p, at('arroseur', 10, 10), open)).toBe(false)
    expect(addObject(p, at('arroseur', 10, 10), open)).toBe(p)
  })

  it('un objet remplace la culture dessous ; la gomme retire objet puis culture', () => {
    let p = paintCrop(EMPTY_PLAN, 10, 10, open)
    p = addObject(p, at('arroseur', 10, 10), open)
    expect(p.crops).toEqual([])
    expect(objectAt(p, 10, 10)).toBeDefined()
    expect(removeAt(p, 10, 10).objects).toEqual([])
    expect(removeAt(paintCrop(EMPTY_PLAN, 3, 3, open), 3, 3).crops).toEqual([])
  })

  it('paintCrop ignore les cases bloquées ou déjà occupées', () => {
    expect(paintCrop(EMPTY_PLAN, 0, 0, farm)).toBe(EMPTY_PLAN)
    const once = paintCrop(EMPTY_PLAN, 20, 30, farm)
    expect(paintCrop(once, 20, 30, farm)).toBe(once)
  })
})

describe('bâtiments et arbres fruitiers', () => {
  it('un bâtiment prend la taille de son type', () => {
    expect(footprint(at('batiment', 10, 10, undefined, 'grange'))).toHaveLength(28)
    expect(footprint(at('batiment', 10, 10, undefined, 'poulailler'))).toHaveLength(18)
    expect(footprint(at('batiment', 10, 10, undefined, 'etang'))).toHaveLength(25)
    expect(canPlace(EMPTY_PLAN, at('batiment', 75, 10, undefined, 'grange'), open)).toBe(false)
  })

  it('un bâtiment remplace les cultures dessous et n’a pas de zone', () => {
    let p = paintCrop(EMPTY_PLAN, 11, 11, open)
    p = addObject(p, at('batiment', 10, 10, undefined, 'silo'), open)
    expect(p.crops).toEqual([])
    expect(coverage(at('batiment', 10, 10, undefined, 'silo')).size).toBe(0)
  })

  it('arbre fruitier : zone 3 × 3 et 3 cases minimum entre deux troncs', () => {
    const t = at('arbre-fruitier', 10, 10, undefined, 'pommier')
    expect(coverage(t).size).toBe(8)
    const p = addObject(EMPTY_PLAN, t, open)
    expect(canPlace(p, at('arbre-fruitier', 12, 10, undefined, 'pommier'), open)).toBe(false)
    expect(canPlace(p, at('arbre-fruitier', 13, 12, undefined, 'pommier'), open)).toBe(true)
  })

  it('compte les cultures dans la zone d’un arbre', () => {
    let p = addObject(EMPTY_PLAN, at('arbre-fruitier', 10, 10, undefined, 'pommier'), open)
    p = paintCrop(paintCrop(p, 11, 10, open), 20, 20, open)
    expect(planStats(p).crowded).toEqual(['11,10'])
  })
})

describe('planStats', () => {
  it('compte cultures arrosées, protégées et récoltées', () => {
    let p = EMPTY_PLAN
    for (const [x, y] of [[11, 10], [12, 10], [40, 10]]) p = paintCrop(p, x, y, open)
    p = addObject(p, at('arroseur', 10, 10), open)
    p = addObject(p, at('epouvantail', 14, 10), open)
    const s = planStats(p)
    expect(s.total).toBe(3)
    expect(s.watered).toBe(1)
    expect(s.scared).toBe(2)
    expect(s.harvested).toBe(0)
    expect(s.dry).toEqual(['12,10', '40,10'])
    expect(s.exposed).toEqual(['40,10'])
  })
})

describe('farmMap', () => {
  it('maison et mares bloquées, centre de la ferme libre', () => {
    expect(isBlocked(60, 10)).toBe(true)
    expect(isBlocked(40, 53)).toBe(true)
    expect(isBlocked(0, 0)).toBe(true)
    expect(isBlocked(40, 30)).toBe(false)
  })
})

describe('isFarmPlan', () => {
  it('accepte un plan valide, rejette le reste', () => {
    expect(isFarmPlan({ crops: ['1,2'], objects: [{ kind: 'arroseur', x: 1, y: 1, nozzle: true }] })).toBe(true)
    expect(isFarmPlan(EMPTY_PLAN)).toBe(true)
    expect(isFarmPlan(null)).toBe(false)
    expect(isFarmPlan({ crops: ['a'], objects: [] })).toBe(false)
    expect(isFarmPlan({ crops: [], objects: [{ kind: 'tracteur', x: 1, y: 1 }] })).toBe(false)
    expect(isFarmPlan({ crops: [], objects: [{ kind: 'arroseur', x: 1.5, y: 1 }] })).toBe(false)
    expect(isFarmPlan({ crops: [], objects: [{ kind: 'batiment', x: 1, y: 1, variant: 'grange' }] })).toBe(true)
    expect(isFarmPlan({ crops: [], objects: [{ kind: 'batiment', x: 1, y: 1 }] })).toBe(false)
  })
})
