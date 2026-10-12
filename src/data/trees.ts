import type { FruitTree } from './types'

// Un arbre met 28 jours à mûrir, puis produit un fruit par jour pendant sa saison.
export const FRUIT_TREES: FruitTree[] = [
  { id: 'abricotier', name: 'Abricotier', season: 'printemps', sapling: 2000, fruit: 'Abricot', sell: 50 },
  { id: 'cerisier', name: 'Cerisier', season: 'printemps', sapling: 3400, fruit: 'Cerise', sell: 80 },
  { id: 'oranger', name: 'Oranger', season: 'ete', sapling: 4000, fruit: 'Orange', sell: 100 },
  { id: 'pecher', name: 'Pêcher', season: 'ete', sapling: 6000, fruit: 'Pêche', sell: 140 },
  { id: 'pommier', name: 'Pommier', season: 'automne', sapling: 4000, fruit: 'Pomme', sell: 100 },
  { id: 'grenadier', name: 'Grenadier', season: 'automne', sapling: 6000, fruit: 'Grenade', sell: 140 },
]
