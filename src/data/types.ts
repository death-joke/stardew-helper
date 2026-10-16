import type { Season } from '../lib/gameDate'

export interface InfoTable {
  title: string
  columns: string[]
  rows: string[][]
  groupFirst?: boolean // n'affiche la 1re colonne qu'une fois par série de lignes identiques (catégories)
  total?: string[] // ligne de total
}

export interface Festival {
  id: string
  name: string
  season: Season
  days: number[]
  hours: string
  location: string
  tips: string[]
  wiki: string // chemin sur fr.stardewvalleywiki.com
  tables?: InfoTable[] // tableaux affichés sous les conseils (barèmes…)
  year?: number // événement qui n'a lieu qu'une année donnée (ex. l'évaluation de Grand-père, An 3)
  icon?: string // pastille dans le calendrier (🎪 par défaut)
}

export interface Villager {
  id: string
  name: string
  birthday: { season: Season; day: number }
  marriageable: boolean
  loves: string[] // cadeaux adorés
}

export type CropKind = 'legume' | 'fruit' | 'fleur' | 'autre'

export interface Crop {
  id: string
  name: string
  seasons: Season[]
  growth: number // jours avant la première récolte
  regrow: number | null // jours entre deux récoltes
  seed: { price: number | null; where: string }
  sell: number // prix de vente de base
  kind: CropKind
  island?: boolean // pousse toute l'année (Île Gingembre)
  rare?: boolean // graines introuvables en magasin : pas de rappel de plantation
  yield?: number // nombre d'objets par récolte (1 par défaut ; les chances de récolte supplémentaire ne sont pas comptées)
  note?: string
}

export interface FruitTree {
  id: string
  name: string
  season: Season
  sapling: number
  fruit: string
  sell: number
}

export type Weather = 'tous' | 'soleil' | 'pluie'
export type Habitat = 'ocean' | 'riviere' | 'lac' | 'etang' | 'mines' | 'desert' | 'ile' | 'autre'
export type FishBehavior = 'aléatoires' | 'lisses' | 'mixes' | 'flotteurs' | 'plombs'

export interface Fish {
  id: string
  name: string
  price: number
  where: string
  habitats: Habitat[]
  seasons: Season[]
  windows: Array<[number, number]> | null
  weather: Weather
  difficulty: number
  behavior: FishBehavior
  notes: string[]
  bundles: string[]
  legendary?: boolean
  wiki: string
}

export interface NightMarketFish {
  id: string
  name: string
  price: number
  difficulty: number
  behavior: FishBehavior
}

export interface CrabPotCreature {
  id: string
  name: string
  price: number
  where: string
  chance: string
  chanceMariner: string
}

export interface PondDrop {
  minPopulation: number
  item: string
  min: number
  max: number
  chance: number // %
}

export interface PondEntry {
  fish: string[]
  drops: PondDrop[]
}

export interface Ingredient {
  name: string
  qty: number
}

export interface CraftRecipe {
  id: string
  name: string
  category: string
  desc: string
  ingredients: Ingredient[]
  source: string
}

export interface CookingRecipe {
  id: string
  name: string
  desc: string
  ingredients: Ingredient[]
  energy: number | null
  health: number | null
  buff: string
  buffDuration: string
  source: string
  price: number
}

export interface Item {
  id: string
  name: string
  category: string
  sub: string | null // saison / lieu pour la cueillette
  desc: string
  price: number | null
  priceNote?: string // prix qui dépend d'une formule
  where: string[] // comment / où l'obtenir
  usedIn: string[] // usages indiqués par le wiki
}

export interface VillagerDetails {
  location: string
  address: string
  family: string | null
  routine: string
  likes: string[]
  dislikes: string[]
  hates: string[]
}

export interface BundleItem {
  name: string
  qty: number
  note: string
}

export interface Bundle {
  id: string
  name: string
  slots: number // objets à fournir parmi `items`
  items: BundleItem[]
  reward: { name: string; qty: number } | null
}

export interface BundleRoom {
  id: string
  name: string
  reward: string
  bundles: Bundle[]
}

export interface ScheduleBlock {
  title: string // « Lundi », « Jour de pluie », « 25 d’Automne »…
  rows: Array<[time: string, where: string]>
}

export interface ScheduleGroup {
  label: string // saison, « Exceptions », « Mariage », ou vide
  blocks: ScheduleBlock[]
}

export interface VillagerSchedule {
  intro: string
  groups: ScheduleGroup[]
}

export type EquipmentKind = 'Épée' | 'Dague' | 'Gourdin' | 'Lance-pierre' | 'Chaussures'

export interface EquipmentStat {
  label: string // Vitesse, Défense, Poids, Chance de critique, Puissance critique, Immunité
  value: string // « +2 », « −1 »
}

export interface Equipment {
  id: string
  name: string
  kind: EquipmentKind
  level: number | null
  damage: [min: number, max: number] | null
  crit: number | null // %
  stats: EquipmentStat[]
  enchant: string | null
  where: string[]
  sellPrice: number | null
  shopPrice: number | null
  desc: string
}

export type BuildingGroup = 'robin' | 'maison' | 'sorcier' | 'gingembre'

export interface Building {
  id: string
  name: string
  group: BuildingGroup
  /** Prix : en pièces d'or (`po`) ou en noix dorées (`noix`). */
  price: number
  currency: 'po' | 'noix'
  materials: Ingredient[]
  /** Jours de construction ; 0 = instantané. `undefined` : non documenté. */
  days?: number
  /** Nom du bâtiment à posséder pour acheter celui-ci (amélioration). */
  upgradeOf?: string
  desc: string
  unlock?: string
}

export type QuestKind = 'histoire' | 'speciale' | 'qi'

export interface Quest {
  id: string
  name: string
  kind: QuestKind
  text: string
  /** Commanditaire (commandes spéciales uniquement). */
  giver?: string
  /** Comment la quête se déclenche. */
  unlock: string
  objective: string
  reward: string
  duration?: string
  repeatable?: boolean
}

export interface PlaceLink {
  kind: 'quete' | 'construction'
  /** Nom exact de la quête ou de la construction visée. */
  name: string
}

export type PlaceArea = 'Vallée' | 'Montagne' | 'Désert de Calico' | 'Île Gingembre'

export interface Place {
  id: string
  name: string
  area: PlaceArea
  /** Emplacement précis (texte libre). */
  region: string
  unlock: string
  notes?: string
  links?: PlaceLink[]
}
