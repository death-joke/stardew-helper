import type { PondEntry } from './types'

// Production des étangs à poissons, extraite du wiki FR (fr.stardewvalleywiki.com/Étang_à_poissons, 1.6) par script.
// `minPopulation` : nombre de poissons requis (le « 10 » du wiki signifie population maximale). Les objets sont testés dans l'ordre listé.
// `chance` est en pourcentage, une fois passée la vérification « l'étang produit quelque chose ».
export const POND_PRODUCTION: PondEntry[] = [
  {
    fish: ['Calamar'],
    drops: [
      { minPopulation: 7, item: 'Encre de Calamar', min: 1, max: 1, chance: 100 },
      { minPopulation: 5, item: 'Encre de Calamar', min: 1, max: 1, chance: 60 },
      { minPopulation: 3, item: 'Encre de Calamar', min: 1, max: 1, chance: 45 },
      { minPopulation: 1, item: 'Encre de Calamar', min: 1, max: 1, chance: 25 },
    ],
  },
  {
    fish: ['Calamar de minuit'],
    drops: [
      { minPopulation: 10, item: 'Encre de Calamar', min: 2, max: 2, chance: 25 },
      { minPopulation: 7, item: 'Encre de Calamar', min: 1, max: 1, chance: 80 },
      { minPopulation: 5, item: 'Encre de Calamar', min: 1, max: 1, chance: 60 },
      { minPopulation: 3, item: 'Encre de Calamar', min: 1, max: 1, chance: 45 },
      { minPopulation: 1, item: 'Encre de Calamar', min: 1, max: 1, chance: 20 },
    ],
  },
  {
    fish: ['Carpe', 'Hareng'],
    drops: [
      { minPopulation: 1, item: 'Œufs de poisson', min: 1, max: 1, chance: 100 },
    ],
  },
  {
    fish: ['Poisson lune'],
    drops: [
      { minPopulation: 10, item: 'Essence solaire', min: 1, max: 1, chance: 8 },
      { minPopulation: 1, item: 'Œufs de poisson', min: 1, max: 1, chance: 90 },
    ],
  },
  {
    fish: ['Poisson-blob'],
    drops: [
      { minPopulation: 9, item: 'Perle', min: 1, max: 1, chance: 2 },
      { minPopulation: 9, item: 'Totem de téléportation : Ferme', min: 5, max: 5, chance: 2 },
      { minPopulation: 6, item: 'Œufs de poisson', min: 1, max: 2, chance: 100 },
      { minPopulation: 1, item: 'Œufs de poisson', min: 1, max: 1, chance: 90 },
    ],
  },
  {
    fish: ['Anguille de lave'],
    drops: [
      { minPopulation: 10, item: 'Géode de lave', min: 10, max: 10, chance: 3.3 },
      { minPopulation: 9, item: 'Géode de lave', min: 5, max: 5, chance: 2 },
      { minPopulation: 9, item: 'Anguille épicée', min: 5, max: 5, chance: 4 },
      { minPopulation: 9, item: 'Œufs de poisson', min: 3, max: 3, chance: 3.3 },
      { minPopulation: 9, item: 'Œufs de poisson', min: 2, max: 2, chance: 15 },
      { minPopulation: 3, item: 'Minerai d\'or', min: 5, max: 5, chance: 10 },
      { minPopulation: 6, item: 'Œufs de poisson', min: 1, max: 1, chance: 100 },
      { minPopulation: 1, item: 'Œufs de poisson', min: 1, max: 1, chance: 80 },
    ],
  },
  {
    fish: ['Poisson de forêt'],
    drops: [
      { minPopulation: 9, item: 'Gland', min: 1, max: 5, chance: 5 },
      { minPopulation: 9, item: 'Graine d\'érable', min: 1, max: 5, chance: 5 },
      { minPopulation: 9, item: 'Pomme de pin', min: 1, max: 5, chance: 5 },
      { minPopulation: 8, item: 'Bois', min: 5, max: 10, chance: 8 },
      { minPopulation: 6, item: 'Bois dur', min: 5, max: 5, chance: 10 },
      { minPopulation: 1, item: 'Œufs de poisson', min: 1, max: 1, chance: 66 },
      { minPopulation: 1, item: 'Bois', min: 1, max: 5, chance: 66 },
    ],
  },
  {
    fish: ['Truite tigrée'],
    drops: [
      { minPopulation: 10, item: 'Œufs de poisson', min: 2, max: 2, chance: 80 },
      { minPopulation: 5, item: 'Œufs de poisson', min: 2, max: 2, chance: 40 },
      { minPopulation: 1, item: 'Œufs de poisson', min: 1, max: 1, chance: 100 },
    ],
  },
  {
    fish: ['Poisson des sables', 'Carpe scorpion'],
    drops: [
      { minPopulation: 10, item: 'Graines de cactus', min: 2, max: 5, chance: 5 },
      { minPopulation: 10, item: 'Œufs de poisson', min: 3, max: 3, chance: 25 },
      { minPopulation: 8, item: 'Œufs de poisson', min: 2, max: 2, chance: 50 },
      { minPopulation: 1, item: 'Œufs de poisson', min: 1, max: 1, chance: 75 },
    ],
  },
  {
    fish: ['Saumon du Vide'],
    drops: [
      { minPopulation: 9, item: 'Œuf du Vide', min: 1, max: 1, chance: 5 },
      { minPopulation: 8, item: 'Essence du Vide', min: 5, max: 10, chance: 8 },
      { minPopulation: 9, item: 'Œufs de poisson', min: 1, max: 3, chance: 83 },
      { minPopulation: 1, item: 'Œufs de poisson', min: 1, max: 1, chance: 100 },
    ],
  },
  {
    fish: ['Slime-Jack'],
    drops: [
      { minPopulation: 9, item: 'Œuf de slime vert', min: 1, max: 1, chance: 2 },
      { minPopulation: 9, item: 'Slime', min: 50, max: 50, chance: 7.5 },
      { minPopulation: 9, item: 'Slime', min: 30, max: 30, chance: 12 },
      { minPopulation: 9, item: 'Slime', min: 10, max: 10, chance: 20 },
      { minPopulation: 3, item: 'Algues vertes', min: 1, max: 1, chance: 10 },
      { minPopulation: 1, item: 'Œufs de poisson', min: 1, max: 1, chance: 80 },
    ],
  },
  {
    fish: ['Poisson pierre'],
    drops: [
      { minPopulation: 9, item: 'Géode', min: 5, max: 5, chance: 5 },
      { minPopulation: 9, item: 'Pierre', min: 30, max: 30, chance: 7.5 },
      { minPopulation: 9, item: 'Géode', min: 1, max: 1, chance: 12 },
      { minPopulation: 9, item: 'Diamant', min: 1, max: 1, chance: 1 },
      { minPopulation: 3, item: 'Minerai de cuivre', min: 5, max: 5, chance: 10 },
      { minPopulation: 9, item: 'Œufs de poisson', min: 1, max: 1, chance: 50 },
      { minPopulation: 1, item: 'Œufs de poisson', min: 1, max: 1, chance: 25 },
    ],
  },
  {
    fish: ['Poisson-glace'],
    drops: [
      { minPopulation: 9, item: 'Géode gelée', min: 5, max: 5, chance: 5 },
      { minPopulation: 9, item: 'Larme gelée', min: 5, max: 5, chance: 7.5 },
      { minPopulation: 9, item: 'Géode gelée', min: 1, max: 1, chance: 12 },
      { minPopulation: 9, item: 'Diamant', min: 1, max: 1, chance: 1 },
      { minPopulation: 3, item: 'Minerai de fer', min: 5, max: 5, chance: 10 },
      { minPopulation: 9, item: 'Œufs de poisson', min: 1, max: 1, chance: 50 },
      { minPopulation: 1, item: 'Œufs de poisson', min: 1, max: 1, chance: 25 },
    ],
  },
  {
    fish: ['Poisson spectral'],
    drops: [
      { minPopulation: 9, item: 'Algues blanches', min: 5, max: 5, chance: 5 },
      { minPopulation: 9, item: 'Bouillon clair', min: 3, max: 3, chance: 2 },
      { minPopulation: 9, item: 'Quartz', min: 3, max: 3, chance: 12 },
      { minPopulation: 9, item: 'Quartz raffiné', min: 1, max: 1, chance: 5 },
      { minPopulation: 3, item: 'Quartz', min: 1, max: 1, chance: 8 },
      { minPopulation: 1, item: 'Œufs de poisson', min: 1, max: 1, chance: 100 },
    ],
  },
  {
    fish: ['Esturgeon'],
    drops: [
      { minPopulation: 10, item: 'Œufs d\'esturgeon', min: 2, max: 2, chance: 25 },
      { minPopulation: 10, item: 'Œufs d\'esturgeon', min: 1, max: 1, chance: 100 },
      { minPopulation: 9, item: 'Œufs d\'esturgeon', min: 1, max: 1, chance: 80 },
      { minPopulation: 6, item: 'Œufs d\'esturgeon', min: 1, max: 1, chance: 60 },
      { minPopulation: 3, item: 'Œufs d\'esturgeon', min: 1, max: 1, chance: 40 },
      { minPopulation: 1, item: 'Œufs d\'esturgeon', min: 1, max: 1, chance: 20 },
    ],
  },
  {
    fish: ['Grand concombre de mer'],
    drops: [
      { minPopulation: 9, item: 'Minerai d\'iridium', min: 1, max: 3, chance: 5 },
      { minPopulation: 9, item: 'Améthyste', min: 1, max: 3, chance: 5 },
      { minPopulation: 1, item: 'Œufs de poisson', min: 1, max: 1, chance: 100 },
    ],
  },
  {
    fish: ['Poulpe'],
    drops: [
      { minPopulation: 9, item: 'Géode-omni', min: 3, max: 3, chance: 6.6 },
      { minPopulation: 9, item: 'Géode-omni', min: 10, max: 10, chance: 1 },
      { minPopulation: 9, item: 'Géode-omni', min: 1, max: 1, chance: 10 },
      { minPopulation: 1, item: 'Œufs de poisson', min: 1, max: 1, chance: 100 },
    ],
  },
  {
    fish: ['Truite arc-en-ciel'],
    drops: [
      { minPopulation: 9, item: 'Coquille arc-en-ciel', min: 1, max: 1, chance: 2 },
      { minPopulation: 9, item: 'Tesson prismatique', min: 1, max: 1, chance: 0.1 },
      { minPopulation: 1, item: 'Œufs de poisson', min: 1, max: 1, chance: 100 },
    ],
  },
  {
    fish: ['Poisson-espion'],
    drops: [
      { minPopulation: 9, item: 'Coffre au trésor', min: 1, max: 1, chance: 0.3 },
      { minPopulation: 1, item: 'Œufs de poisson', min: 1, max: 1, chance: 100 },
    ],
  },
  {
    fish: ['Poisson-chat'],
    drops: [
      { minPopulation: 1, item: 'Œufs de poisson', min: 1, max: 1, chance: 100 },
    ],
  },
  {
    fish: ['Dorade coryphène', 'Morue-lingue', 'Brochet'],
    drops: [
      { minPopulation: 9, item: 'Viande d\'insecte', min: 20, max: 20, chance: 5 },
      { minPopulation: 1, item: 'Œufs de poisson', min: 1, max: 1, chance: 100 },
    ],
  },
  {
    fish: ['Corail'],
    drops: [
      { minPopulation: 9, item: 'Dolomite', min: 1, max: 1, chance: 6 },
      { minPopulation: 9, item: 'Calcaire', min: 1, max: 1, chance: 6 },
    ],
  },
  {
    fish: ['Oursin'],
    drops: [
      { minPopulation: 9, item: 'Œufs de poisson', min: 5, max: 5, chance: 2 },
      { minPopulation: 9, item: 'Œufs de poisson', min: 1, max: 1, chance: 33 },
      { minPopulation: 5, item: 'Œufs de poisson', min: 1, max: 1, chance: 20 },
      { minPopulation: 1, item: 'Œufs de poisson', min: 1, max: 1, chance: 10 },
    ],
  },
  {
    fish: ['Écrevisse', 'Bigorneau', 'Escargot'],
    drops: [
      { minPopulation: 9, item: 'Totem de téléportation : Montagnes', min: 1, max: 1, chance: 7.5 },
      { minPopulation: 1, item: 'Algues vertes', min: 1, max: 3, chance: 5 },
      { minPopulation: 5, item: 'Mélange de graines', min: 2, max: 3, chance: 5 },
      { minPopulation: 1, item: 'Déchets', min: 1, max: 1, chance: 5 },
      { minPopulation: 1, item: 'Bois flotté', min: 1, max: 1, chance: 5 },
      { minPopulation: 1, item: 'Lunettes cassées', min: 1, max: 1, chance: 5 },
      { minPopulation: 1, item: 'CD cassé', min: 1, max: 1, chance: 5 },
      { minPopulation: 1, item: 'Journal détrempé', min: 1, max: 1, chance: 5 },
      { minPopulation: 1, item: 'Déchets', min: 1, max: 1, chance: 5 },
      { minPopulation: 1, item: 'Œufs de poisson', min: 1, max: 1, chance: 20 },
    ],
  },
  {
    fish: ['Coque', 'Crabe', 'Homard', 'Moule', 'Huître', 'Crevette'],
    drops: [
      { minPopulation: 9, item: 'Coquillage', min: 1, max: 1, chance: 2 },
      { minPopulation: 9, item: 'Totem de téléportation : Mer', min: 1, max: 1, chance: 7.5 },
      { minPopulation: 1, item: 'Algues', min: 1, max: 3, chance: 8.8 },
      { minPopulation: 5, item: 'Oursin', min: 1, max: 1, chance: 5 },
      { minPopulation: 5, item: 'Corail', min: 1, max: 1, chance: 7.5 },
      { minPopulation: 1, item: 'Déchets', min: 1, max: 1, chance: 5 },
      { minPopulation: 1, item: 'Bois flotté', min: 1, max: 1, chance: 5 },
      { minPopulation: 1, item: 'Lunettes cassées', min: 1, max: 1, chance: 5 },
      { minPopulation: 1, item: 'CD cassé', min: 1, max: 1, chance: 5 },
      { minPopulation: 1, item: 'Journal détrempé', min: 1, max: 1, chance: 5 },
      { minPopulation: 1, item: 'Déchets', min: 1, max: 1, chance: 5 },
      { minPopulation: 1, item: 'Œufs de poisson', min: 1, max: 1, chance: 20 },
    ],
  },
  {
    fish: ['Albacore', 'Anchois', 'Anguille', 'Flet', 'Flétan', 'Poisson-globe', 'Rouget', 'Vivaneau rouge', 'Sardine', 'Concombre de mer', 'Tilapia', 'Thon'],
    drops: [
      { minPopulation: 5, item: 'Œufs de poisson', min: 1, max: 1, chance: 100 },
      { minPopulation: 1, item: 'Œufs de poisson', min: 1, max: 1, chance: 70 },
    ],
  },
  {
    fish: ['Dorade', 'Chevesne', 'Perche', 'Saumon', 'Alose', 'Achigan à petite bouche', 'Doré jaune', 'Barbotte', 'Achigan à grande bouche', 'Carpe de minuit'],
    drops: [
      { minPopulation: 1, item: 'Œufs de poisson', min: 1, max: 1, chance: 90 },
    ],
  },
]

// Capacité de départ d'un seul poisson (3 pour les autres espèces). Elle augmente avec les quêtes de population, jusqu'à 10.
export const POND_SINGLE_START = ['Poisson-blob', 'Poisson spectral', 'Poisson-glace', 'Anguille de lave', 'Slime-Jack', 'Poisson pierre', 'Esturgeon', 'Saumon du Vide', 'Poisson de forêt']
