import { describe, expect, it } from 'vitest'
import { SCHEDULES } from '../data/schedules'
import { VILLAGERS } from '../data/villagers'
import { hasSpecialSchedules, scheduleRowCount, titleMatchesWeekday, todaySchedule } from './schedules'

const d = (season: 'printemps' | 'ete' | 'automne' | 'hiver', day: number) => ({ season, day, year: 1 })

describe('schedules data', () => {
  it('tous les villageois ont une entrée ; 30 ont des horaires, 4 seulement un texte', () => {
    expect(Object.keys(SCHEDULES).sort()).toEqual(VILLAGERS.map((v) => v.id).sort())
    const withRows = Object.entries(SCHEDULES).filter(([, s]) => scheduleRowCount(s) > 0)
    expect(withRows).toHaveLength(30)
    const textOnly = Object.entries(SCHEDULES).filter(([, s]) => scheduleRowCount(s) === 0).map(([id]) => id).sort()
    expect(textOnly).toEqual(['krobus', 'nain', 'sandy', 'sorcier'])
    expect(textOnly.every((id) => SCHEDULES[id].intro.length > 20)).toBe(true)
  })

  it('chaque ligne a une heure et un lieu', () => {
    for (const s of Object.values(SCHEDULES))
      for (const g of s.groups)
        for (const b of g.blocks)
          for (const [time, where] of b.rows) {
            expect(time).toMatch(/^\d{1,2}:\d{2}$/)
            expect(where.length).toBeGreaterThan(0)
          }
  })
})

describe('todaySchedule', () => {
  it('jour de la semaine : lundi 1 printemps pour Abigail', () => {
    const t = todaySchedule(SCHEDULES['abigail'], d('printemps', 1))!
    expect(t.group).toBe('Printemps')
    expect(t.block.title).toBe('Lundi')
    expect(t.exact).toBe(true)
    expect(t.block.rows[0]).toEqual(['9:00', 'Sort de sa chambre pour aller dans la cuisine.'])
  })

  it('suit la saison de la date', () => {
    expect(todaySchedule(SCHEDULES['abigail'], d('hiver', 3))!.group).toBe('Hiver')
  })

  it('fiches simples (sans saison) : le jour, sinon l’horaire habituel', () => {
    expect(todaySchedule(SCHEDULES['caroline'], d('printemps', 2))!.block.title).toBe('Mardi')
    const fallback = todaySchedule(SCHEDULES['caroline'], d('printemps', 1)) // lundi : pas de bloc dédié
    expect(fallback?.exact).toBe(false)
    expect(fallback?.block.title).toMatch(/standard|habituel|regulier/i)
  })

  it('titres groupés (« Mardi et Mercredi »)', () => {
    expect(titleMatchesWeekday('Mardi et Mercredi', 'Mercredi')).toBe(true)
    expect(titleMatchesWeekday('Samedi, Centre Communautaire rénové', 'Samedi')).toBe(true)
    expect(titleMatchesWeekday('Jeudi et Vendredi', 'Lundi')).toBe(false)
  })

  it('aucun horaire exploitable pour un villageois sans tableau', () => {
    expect(todaySchedule(SCHEDULES['krobus'], d('printemps', 1))).toBeNull()
  })

  it('horaires particuliers repérés', () => {
    expect(hasSpecialSchedules(SCHEDULES['abigail'])).toBe(true)
    expect(hasSpecialSchedules(SCHEDULES['caroline'])).toBe(true) // bloc « Pluvieux »
    expect(hasSpecialSchedules(SCHEDULES['nain'])).toBe(false)
  })
})
