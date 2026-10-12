import { describe, expect, it } from 'vitest'
import { EQUIPMENT } from '../data/equipment'
import { averageDamage, filterEquipment, isWeapon, sortEquipment, statValue } from './equipment'
import { normalize } from './text'

const by = (name: string) => EQUIPMENT.find((e) => e.name === name)!
const all = { query: '', kind: 'toutes' } as const

describe('equipment data', () => {
  it('64 armes et 18 paires de chaussures, identifiants uniques', () => {
    expect(EQUIPMENT.filter(isWeapon)).toHaveLength(64)
    expect(EQUIPMENT.filter((e) => e.kind === 'Chaussures')).toHaveLength(18)
    expect(new Set(EQUIPMENT.map((e) => e.id)).size).toBe(EQUIPMENT.length)
  })

  it('chaque arme (hors lance-pierre) a des dégâts, un niveau et une source', () => {
    for (const e of EQUIPMENT.filter((x) => isWeapon(x) && x.kind !== 'Lance-pierre')) {
      expect(e.damage, e.name).not.toBeNull()
      expect(e.level, e.name).not.toBeNull()
      expect(e.where.length, e.name).toBeGreaterThan(0)
    }
  })

  it('chaque paire de chaussures a une statistique', () => {
    expect(EQUIPMENT.filter((e) => e.kind === 'Chaussures').every((e) => e.stats.length > 0)).toBe(true)
  })

  it('valeurs connues', () => {
    expect(by('Glaive de Neptune')).toMatchObject({ kind: 'Épée', level: 5, damage: [18, 35], crit: 2, sellPrice: 250 })
    expect(by('Baskets')).toMatchObject({ kind: 'Chaussures', sellPrice: 50, shopPrice: 500 })
    expect(by('Lame sacrée').enchant).toBe('Justicier')
  })
})

describe('equipment logic', () => {
  it('dégâts moyens et valeurs de statistiques', () => {
    expect(averageDamage(by('Glaive de Neptune'))).toBe(26.5)
    expect(averageDamage(by('Baskets'))).toBeNull()
    expect(statValue(by('Glaive de Neptune'), 'Vitesse')).toBe(-1)
    expect(statValue(by('Glaive de Neptune'), 'Défense')).toBe(2)
    expect(statValue(by('Glaive de Neptune'), 'Immunité')).toBe(0)
  })

  it('filtre par type et par nom (apostrophe droite ou typographique)', () => {
    expect(filterEquipment(EQUIPMENT, { ...all, kind: 'Dague' })).toHaveLength(16)
    expect(filterEquipment(EQUIPMENT, { ...all, query: "lame de l'infini" }).map((e) => e.name)).toContain('Lame de l’infini')
    expect(filterEquipment(EQUIPMENT, { query: 'LAME', kind: 'Épée' }).every((e) => /lame/i.test(normalize(e.name)))).toBe(true)
  })

  it('tri par dégâts décroissants et par défense', () => {
    const weapons = EQUIPMENT.filter((e) => e.damage)
    const top = sortEquipment(weapons, 'degats', 'desc')[0]
    expect(averageDamage(top)).toBe(Math.max(...weapons.map((e) => averageDamage(e)!)))
    const boots = sortEquipment(EQUIPMENT.filter((e) => e.kind === 'Chaussures'), 'defense', 'desc')
    expect(statValue(boots[0], 'Défense')).toBe(Math.max(...boots.map((e) => statValue(e, 'Défense'))))
  })

  it('tri par nom et immutabilité', () => {
    const copy = [...EQUIPMENT]
    sortEquipment(EQUIPMENT, 'prix', 'desc')
    expect(EQUIPMENT).toEqual(copy)
    expect(sortEquipment(EQUIPMENT, 'nom', 'asc')[0].name.localeCompare(sortEquipment(EQUIPMENT, 'nom', 'asc')[1].name, 'fr')).toBeLessThanOrEqual(0)
  })
})
