import type { Villager } from './types'

// Anniversaires et cadeaux adorés : recoupés avec le wiki FR (page « Liste de tous les cadeaux », 1.6).
// Les « adorés universels » (valables pour tous) sont dans UNIVERSAL_LOVES.
export const UNIVERSAL_LOVES = [
  'Citrouille dorée', 'Patte de lapin', 'Perle', 'Tesson prismatique', 'Sucre d’orge magique', 'Thé de fruit étoilé',
]

export const VILLAGERS: Villager[] = [
  { id: 'abigail', name: 'Abigail', birthday: { season: 'automne', day: 13 }, marriageable: true, loves: ['Améthyste', 'Anguille épicée', 'Citrouille', 'Gâteau au chocolat', 'Manuel des monstres', 'Poisson-globe', 'Pudding à la banane', 'Tourte aux mûres'] },
  { id: 'alex', name: 'Alex', birthday: { season: 'ete', day: 13 }, marriageable: true, loves: ['Dîner de saumon', 'Jack est agile, Jack est épais', 'Petit-déjeuner complet'] },
  { id: 'caroline', name: 'Caroline', birthday: { season: 'hiver', day: 7 }, marriageable: false, loves: ['Curry tropical', 'Fleur tropicale d’été', 'Tacos de poisson', 'Thé vert'] },
  { id: 'clint', name: 'Clint', birthday: { season: 'hiver', day: 26 }, marriageable: false, loves: ['Aigue-marine', 'Améthyste', 'Émeraude', 'Géode-omni', 'Jade', 'Lingot en iridium', 'Lingot en or', 'Risotto aux crosses de fougère', 'Rubis', 'Topaze', 'Trempette aux artichauts'] },
  { id: 'demetrius', name: 'Demetrius', birthday: { season: 'ete', day: 19 }, marriageable: false, loves: ['Crème glacée', 'Fraise', 'Ragoût aux haricots', 'Riz au lait'] },
  { id: 'nain', name: 'Nain', birthday: { season: 'ete', day: 22 }, marriageable: false, loves: ['Aigue-marine', 'Améthyste', 'Anguille de lave', 'Émeraude', 'Géode-omni', 'Jade', 'Pierre de citron', 'Rubis', 'Topaze'] },
  { id: 'elliott', name: 'Elliott', birthday: { season: 'automne', day: 5 }, marriageable: true, loves: ['Beignets de crabe', 'Encre de Calamar', 'Grenade', 'Homard', 'Plume de canard', 'Soupe tom-kha'] },
  { id: 'emily', name: 'Emily', birthday: { season: 'printemps', day: 27 }, marriageable: true, loves: ['Aigue-marine', 'Améthyste', 'Émeraude', 'Hamburger de survie', 'Jade', 'Laine', 'Œuf de perroquet', 'Rubis', 'Tissu', 'Topaze'] },
  { id: 'evelyn', name: 'Evelyn', birthday: { season: 'hiver', day: 20 }, marriageable: false, loves: ['Betterave', 'Diamant', 'Farce', 'Gâteau au chocolat', 'Raisins', 'Rose de fée', 'Tulipe'] },
  { id: 'george', name: 'George', birthday: { season: 'automne', day: 24 }, marriageable: false, loves: ['Champignon frit', 'Poireau'] },
  { id: 'gus', name: 'Gus', birthday: { season: 'ete', day: 8 }, marriageable: false, loves: ['Curry tropical', 'Diamant', 'Escargots', 'Orange', 'Tacos de poisson'] },
  { id: 'haley', name: 'Haley', birthday: { season: 'printemps', day: 14 }, marriageable: true, loves: ['Gâteau rose', 'Noix de coco', 'Salade de fruits', 'Tournesol'] },
  { id: 'harvey', name: 'Harvey', birthday: { season: 'hiver', day: 14 }, marriageable: true, loves: ['Café', 'Cornichons', 'Huile de truffe', 'Repas énergétique', 'Vin'] },
  { id: 'jas', name: 'Jas', birthday: { season: 'ete', day: 4 }, marriageable: false, loves: ['Boîte de fées', 'Gâteau rose', 'Poupée ancienne', 'Poupée étrange (jaune)', 'Poupée étrange (vert)', 'Pudding aux prunes', 'Rose de fée'] },
  { id: 'jodi', name: 'Jodi', birthday: { season: 'automne', day: 11 }, marriageable: false, loves: ['Achigan croustillant', 'Anguille grillée', 'Aubergine au parmesan', 'Diamant', 'Gâteau au chocolat', 'Mélange de légumes', 'Pancakes', 'Tarte à la rhubarbe'] },
  { id: 'kent', name: 'Kent', birthday: { season: 'printemps', day: 4 }, marriageable: false, loves: ['Noisettes grillées', 'Risotto aux crosses de fougère'] },
  { id: 'krobus', name: 'Krobus', birthday: { season: 'hiver', day: 1 }, marriageable: false, loves: ['Citrouille', 'Diamant', 'Lingot en iridium', 'Manuel des monstres', 'Mayonnaise du Vide', 'Œuf du Vide', 'Raifort sauvage', 'Senteur de monstre'] },
  { id: 'leah', name: 'Leah', birthday: { season: 'hiver', day: 23 }, marriageable: true, loves: ['Fromage de chèvre', 'Mélange de légumes', 'Muffin aux graines de pavot', 'Salade', 'Sauté', 'Truffe', 'Vin'] },
  { id: 'leo', name: 'Léo', birthday: { season: 'ete', day: 26 }, marriageable: false, loves: ['Mangue', 'Œuf d’autruche', 'Œuf de perroquet', 'Plume de canard', 'Poï'] },
  { id: 'lewis', name: 'Lewis', birthday: { season: 'printemps', day: 7 }, marriageable: false, loves: ['Ignames glacées', 'Mélange de légumes', 'Piment fort', 'Récompense d’automne', 'Thé vert'] },
  { id: 'linus', name: 'Linus', birthday: { season: 'hiver', day: 3 }, marriageable: false, loves: ['Fruit de cactus', 'Noix de coco', 'Igname', 'Le buffet de la ruelle', 'Plat de la mer', 'Tarte aux myrtilles'] },
  { id: 'marnie', name: 'Marnie', birthday: { season: 'automne', day: 18 }, marriageable: false, loves: ['Déjeuner du fermier', 'Diamant', 'Gâteau rose', 'Tarte à la citrouille'] },
  { id: 'maru', name: 'Maru', birthday: { season: 'ete', day: 10 }, marriageable: true, loves: ['Chou-fleur', 'Diamant', 'Fraise', 'Friandise de mineur', 'Gadget de Nain', 'Gratin de chou-fleur', 'Lingot en iridium', 'Lingot en or', 'Lingot radioactif', 'Pile', 'Poivron farci', 'Tarte à la rhubarbe'] },
  { id: 'pam', name: 'Pam', birthday: { season: 'printemps', day: 18 }, marriageable: false, loves: ['Bière', 'Bière blonde', 'Fruit de cactus', 'Hydromel', 'Ignames glacées', 'Panais', 'Piña Colada', 'Soupe de panais'] },
  { id: 'penny', name: 'Penny', birthday: { season: 'automne', day: 2 }, marriageable: true, loves: ['Tous les livres', 'Assiette d’antioxydants', 'Diamant', 'Émeraude', 'Melon', 'Muffin aux graines de pavot', 'Pavot', 'Plateau de racines', 'Poisson des sables', 'Soupe tom-kha'] },
  { id: 'pierre', name: 'Pierre', birthday: { season: 'printemps', day: 26 }, marriageable: false, loves: ['Calmars frits', 'Catalogue des prix'] },
  { id: 'robin', name: 'Robine', birthday: { season: 'automne', day: 21 }, marriageable: false, loves: ['Fromage de chèvre', 'Le secret de Woody', 'Pêche', 'Spaghetti'] },
  { id: 'sam', name: 'Sam', birthday: { season: 'ete', day: 17 }, marriageable: true, loves: ['Fruit de cactus', 'Gâteau d’érable', 'Oeil-de-tigre', 'Pizza'] },
  { id: 'sandy', name: 'Sandy', birthday: { season: 'automne', day: 15 }, marriageable: false, loves: ['Crocus', 'Jonquille', 'Pois de senteur', 'Riz gluant à la mangue'] },
  { id: 'sebastian', name: 'Sebastian', birthday: { season: 'hiver', day: 10 }, marriageable: true, loves: ['Larme gelée', 'Obsidienne', 'Œuf de grenouille', 'Œuf du Vide', 'Sashimi', 'Soupe à la citrouille'] },
  { id: 'shane', name: 'Shane', birthday: { season: 'printemps', day: 20 }, marriageable: true, loves: ['Bière', 'Piment fort', 'Pizza', 'Poivron farci'] },
  { id: 'sorcier', name: 'Sorcier', birthday: { season: 'hiver', day: 17 }, marriageable: false, loves: ['Champignon violet', 'Essence du Vide', 'Essence solaire', 'Grand concombre de mer', 'Livre des mystères'] },
  { id: 'vincent', name: 'Vincent', birthday: { season: 'printemps', day: 10 }, marriageable: false, loves: ['Bonbons aux canneberges', 'Escargot', 'Gâteau rose', 'Œuf de grenouille', 'Raisin', 'Soda au gingembre'] },
  { id: 'willy', name: 'Willy', birthday: { season: 'ete', day: 24 }, marriageable: false, loves: ['Citrouille', 'Concombre de mer', 'Diamant', 'Esturgeon', 'Hydromel', 'Joyaux de la mer', 'L’art de la pêche au crabe', 'Lingot en iridium', 'Lingot en or', 'Poisson-chat', 'Poulpe'] },
]
