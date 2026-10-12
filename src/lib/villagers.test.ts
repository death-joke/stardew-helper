import { describe, expect, it } from 'vitest'
import { VILLAGER_DETAILS, UNIVERSAL_LIKES } from '../data/villagerDetails'
import { VILLAGERS } from '../data/villagers'
import { describeDays, daysUntilBirthday, filterVillagers, sortVillagers, villagerByName } from './villagers'

const d = (season: 'printemps' | 'ete' | 'automne' | 'hiver', day: number, year = 1) => ({ season, day, year })
const kent = villagerByName('Kent')! // printemps 4
const all = { query: '', marriageable: false, season: 'toutes' } as const

describe('villager data', () => {
  it('34 villageois, chacun avec des détails et ≥ 1 cadeau adoré', () => {
    expect(VILLAGERS).toHaveLength(34)
    expect(Object.keys(VILLAGER_DETAILS).sort()).toEqual(VILLAGERS.map((v) => v.id).sort())
    expect(VILLAGERS.every((v) => v.loves.length > 0)).toBe(true)
    expect(UNIVERSAL_LIKES.length).toBeGreaterThan(5)
  })

  it('12 candidats au mariage', () => {
    expect(VILLAGERS.filter((v) => v.marriageable).map((v) => v.name).sort()).toEqual(
      ['Abigail', 'Alex', 'Elliott', 'Emily', 'Haley', 'Harvey', 'Leah', 'Maru', 'Penny', 'Sam', 'Sebastian', 'Shane'],
    )
  })

  it('infos de vie et goûts remplis', () => {
    const pierre = VILLAGER_DETAILS['pierre']
    expect(pierre.hates).toContain('Tous les poissons')
    expect(VILLAGER_DETAILS['abigail'].address).toContain('Pierre')
    expect(VILLAGER_DETAILS['robin'].family).toContain('Demetrius')
    expect(Object.values(VILLAGER_DETAILS).every((x) => x.location && x.address)).toBe(true)
  })
})

describe('villager logic', () => {
  it('jours avant l’anniversaire, dans l’année et au passage d’année', () => {
    expect(daysUntilBirthday(kent, d('printemps', 1))).toBe(3)
    expect(daysUntilBirthday(kent, d('printemps', 4))).toBe(0)
    expect(daysUntilBirthday(kent, d('printemps', 5))).toBe(111) // il faut attendre l'année suivante
    expect(daysUntilBirthday(kent, d('hiver', 28))).toBe(4)
  })

  it('formulation', () => {
    expect([0, 1, 5].map(describeDays)).toEqual(['aujourd’hui', 'demain', 'dans 5 jours'])
  })

  it('tri par prochain anniversaire à partir de la date du jour', () => {
    const list = sortVillagers(VILLAGERS, 'anniversaire', d('printemps', 1))
    expect(list.slice(0, 3).map((v) => v.name)).toEqual(['Kent', 'Lewis', 'Vincent'])
    expect(list[list.length - 1].name).toBe('Clint') // 26 hiver : le plus tardif de l’année
  })

  it('tri par nom', () => {
    expect(sortVillagers(VILLAGERS, 'nom', d('printemps', 1))[0].name).toBe('Abigail')
  })

  it('filtres : nom sans accent, mariables, saison', () => {
    expect(filterVillagers(VILLAGERS, { ...all, query: 'LEO' }).map((v) => v.name)).toEqual(['Léo'])
    expect(filterVillagers(VILLAGERS, { ...all, marriageable: true })).toHaveLength(12)
    expect(filterVillagers(VILLAGERS, { ...all, season: 'ete' }).map((v) => v.name)).toContain('Willy')
    expect(filterVillagers(VILLAGERS, { query: 'sam', marriageable: true, season: 'ete' }).map((v) => v.name)).toEqual(['Sam'])
  })
})
