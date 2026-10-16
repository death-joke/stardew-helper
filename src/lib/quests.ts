import { QUESTS } from '../data/quests'
import type { Quest, QuestKind } from '../data/types'
import { normalize } from './text'

export const KIND_TABS: Record<QuestKind, string> = {
  histoire: 'Histoire',
  speciale: 'Commandes spéciales',
  qi: 'M. Qi',
}

export function questsOfKind(kind: QuestKind, list: Quest[] = QUESTS): Quest[] {
  return list.filter((q) => q.kind === kind)
}

/** Filtre par nom, texte, déclencheur, objectif ou récompense. */
export function filterQuests(list: Quest[], query: string): Quest[] {
  const q = normalize(query.trim())
  if (!q) return list
  return list.filter((x) => [x.name, x.text, x.unlock, x.objective, x.reward, x.giver ?? ''].some((s) => normalize(s).includes(q)))
}

export function findQuest(name: string, list: Quest[] = QUESTS): Quest | undefined {
  const n = normalize(name)
  return list.find((q) => normalize(q.name) === n)
}
