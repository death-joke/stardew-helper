import type { Building } from './types'

// Constructions : bâtiments de Robine (Scierie), maison, bâtiments du Sorcier et achats en noix dorées, recopiés du wiki FR
// (fr.stardewvalleywiki.com : Scierie, Tour du sorcier, Poissonnerie, Île Gingembre, 1.6) : à revérifier sur le wiki avant toute modification.
// `days` : 0 = instantané. `upgradeOf` : nom du bâtiment qu'il faut déjà posséder.
export const BUILDINGS: Building[] = [
  // — Bâtiments de ferme (Robine, à la Scierie) —
  { id: 'silo', name: 'Silo', group: 'robin', price: 100, currency: 'po', days: 2, materials: [{ name: 'Pierre', qty: 100 }, { name: 'Argile', qty: 10 }, { name: 'Lingot de cuivre', qty: 5 }], desc: 'Stocke la paille (240 unités) coupée à la faux, pour nourrir les animaux.' },
  { id: 'puits', name: 'Puits', group: 'robin', price: 1000, currency: 'po', days: 2, materials: [{ name: 'Pierre', qty: 75 }], desc: 'Permet de remplir l’arrosoir sans aller au bord de l’eau.' },
  { id: 'moulin', name: 'Moulin', group: 'robin', price: 2500, currency: 'po', days: 2, materials: [{ name: 'Pierre', qty: 50 }, { name: 'Bois', qty: 150 }, { name: 'Tissu', qty: 4 }], desc: 'Moud le blé en farine, la betterave en sucre et le riz non moulu en riz.' },
  { id: 'poulailler', name: 'Poulailler', group: 'robin', price: 4000, currency: 'po', days: 3, materials: [{ name: 'Bois', qty: 300 }, { name: 'Pierre', qty: 100 }], desc: '4 animaux : poules.' },
  { id: 'grand-poulailler', name: 'Grand poulailler', group: 'robin', price: 10000, currency: 'po', days: 2, upgradeOf: 'Poulailler', materials: [{ name: 'Bois', qty: 400 }, { name: 'Pierre', qty: 150 }], desc: '8 animaux : poules, canards, dinosaures. Ajoute l’incubateur.' },
  { id: 'poulailler-de-luxe', name: 'Poulailler de luxe', group: 'robin', price: 20000, currency: 'po', days: 2, upgradeOf: 'Grand poulailler', materials: [{ name: 'Bois', qty: 500 }, { name: 'Pierre', qty: 200 }], desc: '12 animaux : poules, canards, dinosaures, lapins. Ajoute l’alimentation automatique.' },
  { id: 'grange', name: 'Grange', group: 'robin', price: 6000, currency: 'po', days: 3, materials: [{ name: 'Bois', qty: 350 }, { name: 'Pierre', qty: 150 }], desc: '4 animaux : vaches, autruches.' },
  { id: 'grande-grange', name: 'Grande grange', group: 'robin', price: 12000, currency: 'po', days: 2, upgradeOf: 'Grange', materials: [{ name: 'Bois', qty: 450 }, { name: 'Pierre', qty: 200 }], desc: '8 animaux : vaches, chèvres, autruches. Permet les naissances.' },
  { id: 'grange-de-luxe', name: 'Grange de luxe', group: 'robin', price: 25000, currency: 'po', days: 2, upgradeOf: 'Grande grange', materials: [{ name: 'Bois', qty: 550 }, { name: 'Pierre', qty: 300 }], desc: '12 animaux : vaches, chèvres, moutons, cochons, autruches. Ajoute l’alimentation automatique.' },
  { id: 'etable', name: 'Étable', group: 'robin', price: 10000, currency: 'po', days: 2, materials: [{ name: 'Bois dur', qty: 100 }, { name: 'Lingot de fer', qty: 5 }], desc: 'Donne un cheval (monture).' },
  { id: 'etang-a-poissons', name: 'Étang à poissons', group: 'robin', price: 5000, currency: 'po', days: 2, materials: [{ name: 'Pierre', qty: 200 }, { name: 'Algue', qty: 5 }, { name: 'Algue verte', qty: 5 }], desc: 'Permet d’élever des poissons (voir l’onglet Pêche).' },
  { id: 'cabanon', name: 'Cabanon', group: 'robin', price: 15000, currency: 'po', days: 2, materials: [{ name: 'Bois', qty: 300 }], desc: 'Grand espace de stockage et de fabrication à l’abri.' },
  { id: 'grand-cabanon', name: 'Grand cabanon', group: 'robin', price: 20000, currency: 'po', days: 2, upgradeOf: 'Cabanon', materials: [{ name: 'Bois', qty: 550 }, { name: 'Pierre', qty: 300 }], desc: 'Agrandit le cabanon.' },
  { id: 'clapier-pour-slime', name: 'Clapier pour Slime', group: 'robin', price: 10000, currency: 'po', days: 2, materials: [{ name: 'Pierre', qty: 500 }, { name: 'Quartz raffiné', qty: 10 }, { name: 'Lingot en iridium', qty: 1 }], desc: 'Pour élever des Slimes.' },
  { id: 'cabane', name: 'Cabane', group: 'robin', price: 100, currency: 'po', days: 0, materials: [], desc: 'Pour un fermier supplémentaire en multijoueur.' },
  { id: 'bac-d-expedition', name: 'Bac d’expédition', group: 'robin', price: 250, currency: 'po', days: 0, materials: [{ name: 'Bois', qty: 150 }], desc: 'Un bac d’expédition supplémentaire.' },
  { id: 'gamelle', name: 'Gamelle', group: 'robin', price: 5000, currency: 'po', days: 0, materials: [{ name: 'Bois dur', qty: 25 }], desc: 'Pour un chat, un chien ou une tortue.' },
  { id: 'caravane', name: 'Amélioration communautaire : caravane', group: 'robin', price: 500000, currency: 'po', materials: [{ name: 'Bois', qty: 950 }], desc: 'Robine construit une vraie maison à Pam (et Penny).', unlock: 'Maison de ferme au niveau maximal et Centre communautaire terminé (ou Marché Joja).' },
  { id: 'raccourcis', name: 'Amélioration communautaire : raccourcis', group: 'robin', price: 300000, currency: 'po', days: 3, materials: [], desc: 'Débloque cinq raccourcis dans la vallée (plage ↔ Forêt Sève-Cendreuse, Montagne ↔ Pélican Ville, Forêt inexploitée…).', unlock: 'Amélioration de la caravane achetée.' },

  // — Maison de ferme —
  { id: 'maison-1', name: 'Maison : première amélioration', group: 'maison', price: 10000, currency: 'po', days: 3, materials: [{ name: 'Bois', qty: 450 }], desc: 'Agrandit la maison et ajoute la cuisine.' },
  { id: 'maison-2', name: 'Maison : deuxième amélioration', group: 'maison', price: 65000, currency: 'po', days: 3, upgradeOf: 'Maison : première amélioration', materials: [{ name: 'Bois dur', qty: 100 }], desc: 'Ajoute deux pièces (chambre d’enfants), agrandit la cuisine et débloque les rénovations et la peinture.' },
  { id: 'maison-3', name: 'Maison : troisième amélioration', group: 'maison', price: 100000, currency: 'po', days: 3, upgradeOf: 'Maison : deuxième amélioration', materials: [], desc: 'Ajoute un cellier sous la maison, pour faire vieillir fromages et boissons dans des fûts.' },
  { id: 'reno-berceau', name: 'Rénovation : retirer le berceau', group: 'maison', price: 0, currency: 'po', days: 0, materials: [], desc: 'Supprime le berceau nécessaire pour avoir un enfant.', unlock: 'Deuxième amélioration de la maison.' },
  { id: 'reno-chambre-ouverte', name: 'Rénovation : chambre ouverte', group: 'maison', price: 10000, currency: 'po', days: 0, materials: [], desc: 'Supprime le mur entre la chambre et l’entrée (+12 tuiles).', unlock: 'Deuxième amélioration de la maison.' },
  { id: 'reno-piece-sud', name: 'Rénovation : ajouter une pièce sud', group: 'maison', price: 30000, currency: 'po', days: 0, materials: [], desc: 'Ajoute une pièce de 11×7 côté sud de la chambre.', unlock: 'Deuxième amélioration de la maison.' },
  { id: 'reno-piece-angle', name: 'Rénovation : ajouter une pièce d’angle', group: 'maison', price: 20000, currency: 'po', days: 0, materials: [], desc: 'Ajoute une pièce de 9×5 dans le coin nord-est.', unlock: 'Deuxième amélioration de la maison.' },
  { id: 'reno-salle-a-manger', name: 'Rénovation : ajouter une salle à manger', group: 'maison', price: 150000, currency: 'po', days: 0, materials: [], desc: 'Grande pièce à gauche de la cuisine (9×10 + 4×5).', unlock: 'Deuxième amélioration de la maison.' },
  { id: 'reno-petite-chambre', name: 'Rénovation : ajouter une petite chambre', group: 'maison', price: 10000, currency: 'po', days: 0, materials: [], desc: 'Un cagibi de 4×5 à côté de la porte d’entrée.', unlock: 'Deuxième amélioration de la maison.' },
  { id: 'reno-grenier', name: 'Rénovation : ajouter un grenier', group: 'maison', price: 60000, currency: 'po', days: 0, materials: [], desc: 'Un escalier et une pièce de 13×5 sous le toit.', unlock: 'Deuxième amélioration de la maison.' },
  { id: 'reno-agrandir-angle', name: 'Rénovation : agrandir la pièce d’angle', group: 'maison', price: 100000, currency: 'po', days: 0, materials: [], desc: 'Étend la pièce d’angle (8×13 + 4×5) et l’élargit à 10×5.', unlock: 'Pièce d’angle ajoutée.' },
  { id: 'reno-ouvrir-salle-a-manger', name: 'Rénovation : ouvrir la salle à manger', group: 'maison', price: 10000, currency: 'po', days: 0, materials: [], desc: 'Supprime le mur entre la salle à manger et la cuisine (+12 tuiles).', unlock: 'Salle à manger ajoutée.' },

  // — Bâtiments du Sorcier (livre de magie de la tour ; construction instantanée) —
  { id: 'hutte-de-junimo', name: 'Hutte de Junimo', group: 'sorcier', price: 20000, currency: 'po', days: 0, materials: [{ name: 'Pierre', qty: 200 }, { name: 'Fruit étoilé', qty: 9 }, { name: 'Fibre', qty: 100 }], desc: 'Des Junimos récoltent les cultures autour de la hutte.', unlock: 'Encre magique rendue au Sorcier (quête Problème de Gobelin).' },
  { id: 'obelisque-terrestre', name: 'Obélisque terrestre', group: 'sorcier', price: 500000, currency: 'po', days: 0, materials: [{ name: 'Lingot en iridium', qty: 10 }, { name: 'Cristal de terre', qty: 10 }], desc: 'Téléporte à la Montagne.', unlock: 'Encre magique rendue au Sorcier (quête Problème de Gobelin).' },
  { id: 'obelisque-aquatique', name: 'Obélisque aquatique', group: 'sorcier', price: 500000, currency: 'po', days: 0, materials: [{ name: 'Lingot en iridium', qty: 5 }, { name: 'Palourde', qty: 10 }, { name: 'Corail', qty: 10 }], desc: 'Téléporte à la plage.', unlock: 'Encre magique rendue au Sorcier (quête Problème de Gobelin).' },
  { id: 'obelisque-du-desert', name: 'Obélisque du désert', group: 'sorcier', price: 1000000, currency: 'po', days: 0, materials: [{ name: 'Lingot en iridium', qty: 20 }, { name: 'Noix de coco', qty: 10 }, { name: 'Fruit de cactus', qty: 10 }], desc: 'Téléporte au Désert de Calico.', unlock: 'Encre magique rendue au Sorcier (quête Problème de Gobelin).' },
  { id: 'obelisque-de-l-ile', name: 'Obélisque de l’île', group: 'sorcier', price: 1000000, currency: 'po', days: 0, materials: [{ name: 'Lingot en iridium', qty: 10 }, { name: 'Banane', qty: 10 }, { name: 'Dent de dragon', qty: 10 }], desc: 'Téléporte à l’Île Gingembre.', unlock: 'Encre magique rendue au Sorcier (quête Problème de Gobelin).' },
  { id: 'horloge-doree', name: 'Horloge dorée', group: 'sorcier', price: 10000000, currency: 'po', days: 0, materials: [], desc: 'Compte pour la perfection (10 %).', unlock: 'Encre magique rendue au Sorcier (quête Problème de Gobelin).' },

  // — Île Gingembre : bateau de Willy et achats en noix dorées (aux perroquets) —
  { id: 'bateau-de-willy', name: 'Réparation du bateau de Willy', group: 'gingembre', price: 0, currency: 'po', materials: [{ name: 'Bois dur', qty: 200 }, { name: 'Pile', qty: 5 }, { name: 'Lingot en iridium', qty: 5 }], desc: 'Donne accès à l’Île Gingembre (traversée : 1 000 po).', unlock: 'Quête principale de Willy faite et Centre communautaire réparé : Willy t’invite dans son arrière-boutique.' },
  { id: 'ouest-de-l-ile', name: 'Passage vers l’ouest de l’île', group: 'gingembre', price: 10, currency: 'noix', days: 0, materials: [], desc: 'Le perroquet près de la tortue qui bloque l’Ouest ouvre le passage.' },
  { id: 'ferme-de-l-ile', name: 'Ferme de l’île', group: 'gingembre', price: 20, currency: 'noix', days: 0, materials: [], desc: 'Répare la maison : cuisine, lit, rangements et nuit possible sur l’île.', unlock: 'Ouest de l’île débloqué.' },
  { id: 'boite-aux-lettres-de-l-ile', name: 'Boîte aux lettres de l’île', group: 'gingembre', price: 5, currency: 'noix', days: 0, materials: [], desc: 'Le courrier est livré à la ferme où tu as dormi.', unlock: 'Ferme de l’île réparée.' },
  { id: 'obelisque-de-ferme', name: 'Obélisque de ferme', group: 'gingembre', price: 20, currency: 'noix', days: 0, materials: [], desc: 'Retour direct vers ta ferme de la vallée. Ne peut pas être déplacé.', unlock: 'Ferme de l’île réparée et boîte aux lettres installée.' },
  { id: 'station-balneaire', name: 'Station balnéaire', group: 'gingembre', price: 20, currency: 'noix', days: 0, materials: [], desc: 'Des villageois viennent à l’île (11 h–18 h, jours de soleil) ; Gus tient un bar ; ouvre le Sud-Est et la caverne des pirates.', unlock: 'Ferme de l’île réparée.' },
  { id: 'pont-du-volcan', name: 'Pont du volcan', group: 'gingembre', price: 5, currency: 'noix', days: 0, materials: [], desc: 'Un pont au-dessus de la rivière de lave de l’entrée du donjon du volcan.', unlock: 'Donjon du volcan traversé jusqu’au bout.' },
]

export const GROUP_LABELS: Record<Building['group'], string> = {
  robin: 'Robine (Scierie)',
  maison: 'Maison de ferme',
  sorcier: 'Sorcier (tour)',
  gingembre: 'Île Gingembre',
}
