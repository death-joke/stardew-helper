import { describe, expect, it } from 'vitest'
import { FESTIVALS } from '../data/calendar'
import { birthdaysOn, festivalsOn, nextFestival, remindersFor, upcomingBirthdays } from './today'

const d = (season: 'printemps' | 'ete' | 'automne' | 'hiver', day: number, year = 1) => ({ season, day, year })

describe('today', () => {
  it('Printemps 13 → Fête des Œufs', () => {
    expect(festivalsOn(d('printemps', 13)).map((f) => f.id)).toEqual(['oeufs'])
  })

  it('Printemps 4 → anniversaire de Kent', () => {
    expect(birthdaysOn(d('printemps', 4)).map((v) => v.name)).toEqual(['Kent'])
  })

  it('Hiver 7 → anniversaire de Caroline', () => {
    expect(birthdaysOn(d('hiver', 7)).map((v) => v.name)).toEqual(['Caroline'])
  })

  it('prochain festival, y compris au-delà de la fin de saison', () => {
    const n = nextFestival(d('hiver', 26))!
    expect(n.festival.id).toBe('oeufs')
    expect(n.date).toEqual(d('printemps', 13, 2))
    expect(n.daysUntil).toBe(15)
  })

  it('le prochain festival exclut aujourd’hui', () => {
    expect(nextFestival(d('printemps', 15))!.festival.id).toBe('desert')
    expect(nextFestival(d('printemps', 15))!.daysUntil).toBe(1)
  })

  it('anniversaires à venir, aujourd’hui exclu', () => {
    const r = upcomingBirthdays(d('printemps', 3))
    expect(r.map((b) => [b.villager.name, b.daysUntil])).toEqual([['Kent', 1], ['Lewis', 4], ['Vincent', 7]])
  })

  it('rappels : vendredi marchand + Clint fermé, dimanche marchand + télé', () => {
    expect(remindersFor(d('printemps', 5)).map((r) => r.id)).toEqual(['marchand', 'clint'])
    expect(remindersFor(d('printemps', 7)).map((r) => r.id)).toEqual(['marchand', 'reine'])
  })

  it('rappel de fin de saison', () => {
    expect(remindersFor(d('ete', 26)).some((r) => r.id === 'fin-saison')).toBe(true)
    expect(remindersFor(d('ete', 10)).some((r) => r.id === 'fin-saison')).toBe(false)
  })

  it('rappels de plantation : dernier jour pour le panais le 24 printemps, bientôt le 22', () => {
    const last = remindersFor(d('printemps', 24)).find((r) => r.id === 'plantation-dernier')
    expect(last?.text).toContain('Panais')
    const soon = remindersFor(d('printemps', 22)).find((r) => r.id === 'plantation-bientot')
    expect(soon?.text).toContain('Panais (dans 2 jours)')
  })

  it('pas de rappel de plantation pour les cultures rares ou en début de saison', () => {
    expect(remindersFor(d('printemps', 1)).some((r) => r.id.startsWith('plantation'))).toBe(false)
  })

  it('évaluation de Grand-père : seulement le 1er printemps de l’An 3', () => {
    expect(festivalsOn(d('printemps', 1, 3)).map((f) => f.id)).toEqual(['grand-pere'])
    expect(festivalsOn(d('printemps', 1, 1))).toEqual([])
    expect(festivalsOn(d('printemps', 1, 4))).toEqual([])
  })

  it('le prochain événement depuis le 26 hiver de l’An 2 est l’évaluation de Grand-père', () => {
    const n = nextFestival(d('hiver', 26, 2))!
    expect(n.festival.id).toBe('grand-pere')
    expect(n.daysUntil).toBe(3)
    expect(n.date).toEqual(d('printemps', 1, 3))
  })

  it('rappel de Grand-père : la dernière semaine de l’An 2, pas avant ni en An 1', () => {
    expect(remindersFor(d('hiver', 22, 2)).find((r) => r.id === 'grand-pere')?.text).toContain('dans 7 jours')
    expect(remindersFor(d('hiver', 28, 2)).find((r) => r.id === 'grand-pere')?.text).toContain('demain')
    expect(remindersFor(d('hiver', 21, 2)).some((r) => r.id === 'grand-pere')).toBe(false)
    expect(remindersFor(d('hiver', 25, 1)).some((r) => r.id === 'grand-pere')).toBe(false)
  })

  it('barème de Grand-père : les points du tableau totalisent 21', () => {
    const table = FESTIVALS.find((f) => f.id === 'grand-pere')!.tables!.find((x) => x.title === 'Points à gagner')!
    expect(table.rows.reduce((n, r) => n + Number(r[2]), 0)).toBe(21)
    expect(table.total?.[2]).toBe('21')
  })
})
