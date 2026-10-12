import type { Crop } from './types'

// Valeurs de base du jeu (1.6), recoupées avec le wiki FR (page Récoltes). Les prix de graines sont ceux de Pierre sauf mention contraire.
// Île Gingembre (ananas, taro) : non recoupé, la page Récoltes ne les couvre pas.
const P = 'Pierre'
const OASIS = 'Oasis'
const VAR = 'Sources variables'

export const CROPS: Crop[] = [
  // Printemps
  { id: 'ail', name: 'Ail', seasons: ['printemps'], growth: 4, regrow: null, seed: { price: 40, where: P }, sell: 60, kind: 'legume' },
  { id: 'carotte', name: 'Carotte', seasons: ['printemps'], growth: 3, regrow: null, seed: { price: null, where: VAR }, sell: 35, kind: 'legume', rare: true },
  { id: 'chou-frise', name: 'Chou frisé', seasons: ['printemps'], growth: 6, regrow: null, seed: { price: 70, where: P }, sell: 110, kind: 'legume' },
  { id: 'chou-fleur', name: 'Chou-fleur', seasons: ['printemps'], growth: 12, regrow: null, seed: { price: 80, where: P }, sell: 175, kind: 'legume' },
  { id: 'fraise', name: 'Fraise', seasons: ['printemps'], growth: 8, regrow: 4, seed: { price: 100, where: 'Fête des Œufs' }, sell: 120, kind: 'fruit' },
  { id: 'haricot-vert', name: 'Haricot vert', seasons: ['printemps'], growth: 10, regrow: 3, seed: { price: 60, where: P }, sell: 40, kind: 'legume' },
  { id: 'panais', name: 'Panais', seasons: ['printemps'], growth: 4, regrow: null, seed: { price: 20, where: P }, sell: 35, kind: 'legume' },
  { id: 'pomme-de-terre', name: 'Pomme de terre', seasons: ['printemps'], growth: 6, regrow: null, seed: { price: 50, where: P }, sell: 80, kind: 'legume' },
  { id: 'rhubarbe', name: 'Rhubarbe', seasons: ['printemps'], growth: 13, regrow: null, seed: { price: 100, where: OASIS }, sell: 220, kind: 'fruit' },
  { id: 'riz', name: 'Riz non moulu', seasons: ['printemps'], growth: 8, regrow: null, seed: { price: 40, where: P }, sell: 30, kind: 'autre', note: 'Le wiki indique 6 à 8 jours ; le tableau compte 8.' },
  { id: 'tulipe', name: 'Tulipe', seasons: ['printemps'], growth: 6, regrow: null, seed: { price: 20, where: P }, sell: 30, kind: 'fleur' },
  { id: 'zinnia-bleue', name: 'Zinnia bleue', seasons: ['printemps'], growth: 7, regrow: null, seed: { price: 30, where: P }, sell: 50, kind: 'fleur' },
  // Été
  { id: 'carambole', name: 'Carambole', seasons: ['ete'], growth: 13, regrow: null, seed: { price: 400, where: OASIS }, sell: 750, kind: 'fruit' },
  { id: 'chou-rouge', name: 'Chou rouge', seasons: ['ete'], growth: 9, regrow: null, seed: { price: 100, where: P }, sell: 260, kind: 'legume' },
  { id: 'courge-ete', name: 'Courge d’été', seasons: ['ete'], growth: 6, regrow: 3, seed: { price: null, where: VAR }, sell: 45, kind: 'legume', rare: true },
  { id: 'fleur-tropicale', name: 'Fleur tropicale d’été', seasons: ['ete'], growth: 8, regrow: null, seed: { price: 50, where: P }, sell: 90, kind: 'fleur' },
  { id: 'houblon', name: 'Houblon', seasons: ['ete'], growth: 11, regrow: 1, seed: { price: 60, where: P }, sell: 25, kind: 'autre' },
  { id: 'melon', name: 'Melon', seasons: ['ete'], growth: 12, regrow: null, seed: { price: 80, where: P }, sell: 250, kind: 'fruit' },
  { id: 'myrtille', name: 'Myrtille', seasons: ['ete'], growth: 13, regrow: 4, seed: { price: 80, where: P }, sell: 50, kind: 'fruit', yield: 3 },
  { id: 'pavot', name: 'Pavot', seasons: ['ete'], growth: 7, regrow: null, seed: { price: 100, where: P }, sell: 140, kind: 'fleur' },
  { id: 'piment', name: 'Piment fort', seasons: ['ete'], growth: 5, regrow: 3, seed: { price: 40, where: P }, sell: 40, kind: 'fruit' },
  { id: 'radis', name: 'Radis', seasons: ['ete'], growth: 6, regrow: null, seed: { price: 40, where: P }, sell: 90, kind: 'legume' },
  { id: 'tomate', name: 'Tomate', seasons: ['ete'], growth: 11, regrow: 4, seed: { price: 50, where: P }, sell: 60, kind: 'legume' },
  // Été + Automne
  { id: 'ble', name: 'Blé', seasons: ['ete', 'automne'], growth: 4, regrow: null, seed: { price: 10, where: P }, sell: 25, kind: 'autre' },
  { id: 'mais', name: 'Maïs', seasons: ['ete', 'automne'], growth: 14, regrow: 4, seed: { price: 150, where: P }, sell: 50, kind: 'legume' },
  { id: 'tournesol', name: 'Tournesol', seasons: ['ete', 'automne'], growth: 8, regrow: null, seed: { price: 200, where: P }, sell: 80, kind: 'fleur' },
  // Automne
  { id: 'amarante', name: 'Amarante', seasons: ['automne'], growth: 7, regrow: null, seed: { price: 70, where: P }, sell: 150, kind: 'legume' },
  { id: 'artichaut', name: 'Artichaut', seasons: ['automne'], growth: 8, regrow: null, seed: { price: 30, where: P }, sell: 160, kind: 'legume' },
  { id: 'aubergine', name: 'Aubergine', seasons: ['automne'], growth: 5, regrow: 5, seed: { price: 20, where: P }, sell: 60, kind: 'legume' },
  { id: 'betterave', name: 'Betterave', seasons: ['automne'], growth: 6, regrow: null, seed: { price: 20, where: OASIS }, sell: 100, kind: 'legume' },
  { id: 'bok-choy', name: 'Chou chinois', seasons: ['automne'], growth: 4, regrow: null, seed: { price: 50, where: P }, sell: 80, kind: 'legume' },
  { id: 'canneberges', name: 'Canneberges', seasons: ['automne'], growth: 7, regrow: 5, seed: { price: 240, where: P }, sell: 75, kind: 'fruit', yield: 2 },
  { id: 'citrouille', name: 'Citrouille', seasons: ['automne'], growth: 13, regrow: null, seed: { price: 100, where: P }, sell: 320, kind: 'legume' },
  { id: 'igname', name: 'Igname', seasons: ['automne'], growth: 10, regrow: null, seed: { price: 60, where: P }, sell: 160, kind: 'legume' },
  { id: 'raisin', name: 'Raisin', seasons: ['automne'], growth: 10, regrow: 3, seed: { price: 60, where: P }, sell: 80, kind: 'fruit' },
  { id: 'brocoli', name: 'Brocoli', seasons: ['automne'], growth: 8, regrow: 4, seed: { price: null, where: VAR }, sell: 70, kind: 'legume', rare: true },
  { id: 'rose-fee', name: 'Rose de fée', seasons: ['automne'], growth: 12, regrow: null, seed: { price: 200, where: P }, sell: 290, kind: 'fleur' },
  // Hiver
  { id: 'poudremelon', name: 'Poudremelon', seasons: ['hiver'], growth: 7, regrow: null, seed: { price: null, where: 'Graines d’hiver (cueillette)' }, sell: 60, kind: 'fruit', rare: true },
  // Plusieurs saisons / rares
  { id: 'cafe', name: 'Grain de café', seasons: ['printemps', 'ete'], growth: 10, regrow: 2, seed: { price: 2500, where: 'Chariot ambulant' }, sell: 15, kind: 'autre', rare: true, yield: 4 },
  { id: 'fruit-ancien', name: 'Fruit ancien', seasons: ['printemps', 'ete', 'automne'], growth: 28, regrow: 7, seed: { price: null, where: 'Graine ancienne (artefact), Chariot ambulant' }, sell: 550, kind: 'fruit', rare: true },
  { id: 'baie-gemme', name: 'Baie de gemme sucrée', seasons: ['automne'], growth: 24, regrow: null, seed: { price: 1000, where: 'Chariot ambulant' }, sell: 3000, kind: 'fruit', rare: true },
  // Île Gingembre (pousse toute l'année)
  { id: 'ananas', name: 'Ananas', seasons: ['printemps', 'ete', 'automne', 'hiver'], growth: 14, regrow: 7, seed: { price: 1000, where: 'Île Gingembre' }, sell: 300, kind: 'fruit', island: true },
  { id: 'taro', name: 'Racine de taro', seasons: ['printemps', 'ete', 'automne', 'hiver'], growth: 10, regrow: null, seed: { price: 500, where: 'Île Gingembre' }, sell: 100, kind: 'legume', island: true },
]
