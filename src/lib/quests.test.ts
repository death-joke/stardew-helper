import { describe, expect, it } from 'vitest'
import { QUESTS } from '../data/quests'
import { filterQuests, findQuest, questsOfKind } from './quests'

describe('quests data', () => {
  it('effectifs par type et ids uniques par type', () => {
    expect(questsOfKind('histoire')).toHaveLength(58)
    expect(questsOfKind('speciale')).toHaveLength(18)
    expect(questsOfKind('qi')).toHaveLength(10)
    for (const kind of ['histoire', 'speciale', 'qi'] as const) {
      const ids = questsOfKind(kind).map((q) => q.id)
      expect(new Set(ids).size).toBe(ids.length)
    }
  })

  it('chaque quête a un nom, un texte et un objectif', () => {
    for (const q of QUESTS) {
      expect(q.name && q.text && q.objective).toBeTruthy()
    }
  })

  it('quêtes du Sorcier et de son ex-femme', () => {
    expect(findQuest('Talisman noir')).toMatchObject({ kind: 'histoire', reward: 'Accès au marais de la sorcière' })
    expect(findQuest('Problème de Gobelin')?.reward).toContain('Constructions du Sorcier')
    expect(findQuest('probleme de gobelin')).toBeDefined()
  })

  it('commandes de Qi : récompenses en gemmes', () => {
    expect(questsOfKind('qi').every((q) => /gemmes de Qi/.test(q.reward))).toBe(true)
  })
})

describe('filterQuests', () => {
  it('cherche dans le nom, l’objectif et la récompense', () => {
    expect(filterQuests(QUESTS, 'krobus').length).toBeGreaterThan(0)
    expect(filterQuests(QUESTS, '').length).toBe(QUESTS.length)
    expect(filterQuests(QUESTS, 'zzzzzz')).toEqual([])
  })
})
