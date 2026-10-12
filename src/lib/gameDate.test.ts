import { describe, expect, it } from 'vitest'
import { addDays, daysLeftInSeason, fromOrdinal, isValidDate, toOrdinal, weekdayName } from './gameDate'

describe('gameDate', () => {
  it('le jour 1 est un lundi, le jour 28 un dimanche', () => {
    expect(weekdayName({ season: 'ete', day: 1, year: 1 })).toBe('Lundi')
    expect(weekdayName({ season: 'ete', day: 28, year: 1 })).toBe('Dimanche')
    expect(weekdayName({ season: 'printemps', day: 5, year: 1 })).toBe('Vendredi')
  })

  it('passe à la saison suivante', () => {
    expect(addDays({ season: 'printemps', day: 28, year: 1 }, 1)).toEqual({ season: 'ete', day: 1, year: 1 })
  })

  it("passe à l'année suivante", () => {
    expect(addDays({ season: 'hiver', day: 28, year: 1 }, 1)).toEqual({ season: 'printemps', day: 1, year: 2 })
  })

  it('recule sans passer sous le Printemps 1, An 1', () => {
    expect(addDays({ season: 'ete', day: 1, year: 1 }, -1)).toEqual({ season: 'printemps', day: 28, year: 1 })
    expect(addDays({ season: 'printemps', day: 1, year: 1 }, -5)).toEqual({ season: 'printemps', day: 1, year: 1 })
  })

  it('ordinal et inverse sont cohérents', () => {
    const d = { season: 'automne', day: 16, year: 3 } as const
    expect(fromOrdinal(toOrdinal(d))).toEqual(d)
  })

  it('jours restants', () => {
    expect(daysLeftInSeason({ season: 'ete', day: 24, year: 1 })).toBe(4)
  })

  it('valide les dates', () => {
    expect(isValidDate({ season: 'hiver', day: 28, year: 2 })).toBe(true)
    expect(isValidDate({ season: 'hiver', day: 29, year: 2 })).toBe(false)
    expect(isValidDate({ season: 'x', day: 1, year: 1 })).toBe(false)
    expect(isValidDate(null)).toBe(false)
  })
})
