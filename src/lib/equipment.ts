import type { Equipment, EquipmentKind } from '../data/types'
import { normalize } from './text'

export const WEAPON_KINDS: EquipmentKind[] = ['Épée', 'Dague', 'Gourdin', 'Lance-pierre']

export type EquipmentSort = 'nom' | 'niveau' | 'degats' | 'critique' | 'prix' | 'defense' | 'immunite'

export const SORT_LABELS: Record<EquipmentSort, string> = {
  nom: 'Nom',
  niveau: 'Niveau',
  degats: 'Dégâts moyens',
  critique: 'Chance de critique',
  prix: 'Prix de vente',
  defense: 'Défense',
  immunite: 'Immunité',
}

export const WEAPON_SORTS: EquipmentSort[] = ['nom', 'niveau', 'degats', 'critique', 'prix']
export const FOOTWEAR_SORTS: EquipmentSort[] = ['nom', 'defense', 'immunite', 'prix']

export function isWeapon(e: Equipment): boolean {
  return e.kind !== 'Chaussures'
}

export function averageDamage(e: Equipment): number | null {
  return e.damage ? (e.damage[0] + e.damage[1]) / 2 : null
}

/** « +2 » → 2, « −1 » → -1 ; 0 si la caractéristique est absente. */
export function statValue(e: Equipment, label: string): number {
  const s = e.stats.find((x) => x.label === label)
  return s ? Number(s.value.replace('−', '-').replace('+', '')) || 0 : 0
}

export interface EquipmentFilter {
  query: string
  kind: EquipmentKind | 'toutes'
}

export function filterEquipment(list: Equipment[], { query, kind }: EquipmentFilter): Equipment[] {
  const q = normalize(query.trim())
  return list.filter((e) => (kind === 'toutes' || e.kind === kind) && (!q || normalize(e.name).includes(q)))
}

function sortValue(e: Equipment, key: Exclude<EquipmentSort, 'nom'>): number {
  switch (key) {
    case 'niveau': return e.level ?? -1
    case 'degats': return averageDamage(e) ?? -1
    case 'critique': return e.crit ?? -1
    case 'prix': return e.sellPrice ?? -1
    case 'defense': return statValue(e, 'Défense')
    case 'immunite': return statValue(e, 'Immunité')
  }
}

export function sortEquipment(list: Equipment[], key: EquipmentSort, dir: 'asc' | 'desc'): Equipment[] {
  const sign = dir === 'asc' ? 1 : -1
  return [...list].sort((a, b) => {
    const diff = key === 'nom' ? a.name.localeCompare(b.name, 'fr') : sortValue(a, key) - sortValue(b, key)
    return diff * sign || a.name.localeCompare(b.name, 'fr')
  })
}
