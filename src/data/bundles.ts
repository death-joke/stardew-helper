import type { BundleRoom } from './types'

// Paquets du Centre communautaire, extraits du wiki FR (fr.stardewvalleywiki.com/Paquets, 1.6) par script : ne pas retoucher à la main sans vérifier.
// `slots` : nombre d'objets à fournir parmi `items` (cases du paquet). `note` : où l'obtenir, d'après le wiki.
export const BUNDLE_ROOMS: BundleRoom[] = [
  {
    id: 'salle-d-artisanats', name: 'Salle d’artisanats', reward: 'Réparation du pont vers la carrière',
    bundles: [
      {
        id: 'paquet-cueillette-de-printemps', name: 'Paquet cueillette de printemps', slots: 4, reward: { name: 'Graines de printemps', qty: 30 },
        items: [
          { name: 'Raifort sauvage', qty: 1, note: 'Cueillette au Printemps' },
          { name: 'Jonquille', qty: 1, note: 'Cueillette au Printemps, acheté chez Pierre à Danse des Fleurs' },
          { name: 'Poireau', qty: 1, note: 'Cueillette au Printemps' },
          { name: 'Pissenlit', qty: 1, note: 'Cueillette au Printemps, acheté chez Pierre à Danse des Fleurs' },
        ],
      },
      {
        id: 'paquet-cueillette-d-ete', name: 'Paquet cueillette d’été', slots: 3, reward: { name: 'Graines d’été', qty: 30 },
        items: [
          { name: 'Raisin', qty: 1, note: 'Cueillette en Été, Récoltes d’Automne' },
          { name: 'Baie épicée', qty: 1, note: 'Cueillette en Été, la grotte (option chauves-souris)' },
          { name: 'Pois de senteur', qty: 1, note: 'Cueillette en Été' },
        ],
      },
      {
        id: 'paquet-cueillette-d-automne', name: 'Paquet cueillette d’automne', slots: 4, reward: { name: 'Graines d’automne', qty: 30 },
        items: [
          { name: 'Champignon commun', qty: 1, note: 'Cueillette en Automne, Printemps & Cueillette en Automne dans la Forêt secrète, la grotte (option champignons), saignant un Arbre champignon' },
          { name: 'Prune sauvage', qty: 1, note: 'Cueillette en Automne, la grotte (option chauves-souris)' },
          { name: 'Noisette', qty: 1, note: 'Cueillette en Automne' },
          { name: 'Mûre', qty: 1, note: 'Cueillette en Automne, la grotte (option chauves-souris)' },
        ],
      },
      {
        id: 'paquet-cueillette-d-hiver', name: 'Paquet cueillette d’hiver', slots: 4, reward: { name: 'Graines d’hiver', qty: 30 },
        items: [
          { name: 'Racine d’hiver', qty: 1, note: 'Labourage de la terre en Hiver, lâché par les Slimes bleus dans les niveaux 41-79 des Mines' },
          { name: 'Fruit de cristal', qty: 1, note: 'Cueillette en Hiver, laché par les esprits de poussière dans les niveaux 41-79 des Mines' },
          { name: 'Igname des neiges', qty: 1, note: 'Labourage de la terre ou des lieus d’artefacts en Hiver' },
          { name: 'Crocus', qty: 1, note: 'Cueillette en Hiver' },
        ],
      },
      {
        id: 'paquet-construction', name: 'Paquet Construction', slots: 4, reward: { name: 'Fourneau à charbon', qty: 1 },
        items: [
          { name: 'Bois', qty: 99, note: 'Abattre les Arbres ou les branches avec une Hache' },
          { name: 'Bois', qty: 99, note: 'Abattre les Arbres ou les branches avec une Hache' },
          { name: 'Pierre', qty: 99, note: 'Écraser les pierres avec une Pioche' },
          { name: 'Bois dur', qty: 10, note: 'Abattre les grandes souches ou les grandes bûches avec une Hache améliorée, détruire des caisses dans les Mines' },
        ],
      },
      {
        id: 'paquet-cueillette-exotique', name: 'Paquet cueillette exotique', slots: 5, reward: { name: 'Récompense d’automne', qty: 5 },
        items: [
          { name: 'Noix de coco', qty: 1, note: 'Cueillette dans le Désert de Calico' },
          { name: 'Fruit de cactus', qty: 1, note: 'Cueillette dans le Désert de Calico' },
          { name: 'Carrotte des cavernes', qty: 1, note: 'Mines, en détruisant les caisses ou en utilisant les Houe' },
          { name: 'Champignon rouge', qty: 1, note: 'Cueillette dans les Mines, Été or Cueillette en Automne dans la Forêt secrète, la grotte (option champignons), Ferme forestière en Automne, Saigneur sur un Arbre champignon.' },
          { name: 'Champignon violet', qty: 1, note: 'Mines, la grotte (option champignons), Ferme forestière en Automne, Cueillette en Automne.' },
          { name: 'Sirop d’érable', qty: 1, note: 'Sève de Érable' },
          { name: 'Résine de chêne', qty: 1, note: 'Sève de Chêne' },
          { name: 'Goudron de pin', qty: 1, note: 'Sève de Pin' },
          { name: 'Morille', qty: 1, note: 'Cueillette dans la Forêt secrète ou Ferme forestière au Printemps, la Grotte (option champignons)' },
        ],
      },
    ],
  },
  {
    id: 'cellier', name: 'Cellier', reward: 'Restauration de la Serre',
    bundles: [
      {
        id: 'paquet-recoltes-de-printemps', name: 'Paquet récoltes de printemps', slots: 4, reward: { name: 'Engrais de croissance rapide', qty: 20 },
        items: [
          { name: 'Panais', qty: 1, note: 'Récoltes de Printemps' },
          { name: 'Haricot vert', qty: 1, note: 'Récoltes de Printemps' },
          { name: 'Chou-fleur', qty: 1, note: 'Récoltes de Printemps' },
          { name: 'Pomme de terre', qty: 1, note: 'Récoltes de Printemps' },
        ],
      },
      {
        id: 'paquet-recoltes-d-ete', name: 'Paquet récoltes d’été', slots: 4, reward: { name: 'Arroseur de qualité', qty: 1 },
        items: [
          { name: 'Tomate', qty: 1, note: 'Récoltes d’Été' },
          { name: 'Piment fort', qty: 1, note: 'Récoltes d’Été' },
          { name: 'Myrtille', qty: 1, note: 'Récoltes d’Été' },
          { name: 'Melon', qty: 1, note: 'Récoltes d’Été' },
        ],
      },
      {
        id: 'paquet-recoltes-d-automne', name: 'Paquet récoltes d’automne', slots: 4, reward: { name: 'Ruche', qty: 1 },
        items: [
          { name: 'Maïs', qty: 1, note: 'Été / Récoltes d’Automne' },
          { name: 'Aubergine', qty: 1, note: 'Récoltes d’Automne' },
          { name: 'Citrouille', qty: 1, note: 'Récoltes d’Automne' },
          { name: 'Igname', qty: 1, note: 'Récoltes d’Automne' },
        ],
      },
      {
        id: 'paquet-recoltes-de-qualite', name: 'Paquet récoltes de qualité', slots: 3, reward: { name: 'Bocal', qty: 1 },
        items: [
          { name: 'Panais', qty: 5, note: 'Qualité or Récoltes de Printemps' },
          { name: 'Melon', qty: 5, note: 'Qualité or Récoltes d’Été' },
          { name: 'Citrouille', qty: 5, note: 'Qualité or Récoltes d’Automne' },
          { name: 'Maïs', qty: 5, note: 'Qualité or Été / Récoltes d’Automne' },
        ],
      },
      {
        id: 'paquet-animal', name: 'Paquet Animal', slots: 5, reward: { name: 'Presse à fromage', qty: 1 },
        items: [
          { name: 'Grosse quantité de lait', qty: 1, note: 'Vaches' },
          { name: 'Gros œuf brun', qty: 1, note: 'Poules' },
          { name: 'Gros œuf', qty: 1, note: 'Poules' },
          { name: 'Grand lait de chèvre', qty: 1, note: 'Chèvres' },
          { name: 'Laine', qty: 1, note: 'Moutons, Lapins' },
          { name: 'Œuf de canard', qty: 1, note: 'Canards' },
        ],
      },
      {
        id: 'paquet-artisan', name: 'Paquet Artisan', slots: 6, reward: { name: 'Tonneau', qty: 1 },
        items: [
          { name: 'Huile de truffe', qty: 1, note: 'Fabriqué avec des Truffes en utilisant une Machine à huile' },
          { name: 'Tissu', qty: 1, note: 'Métier à tisser, Recyclage d’un Journal détrempé' },
          { name: 'Fromage de chèvre', qty: 1, note: 'Presse à fromage' },
          { name: 'Fromage', qty: 1, note: 'Presse à fromage' },
          { name: 'Miel', qty: 1, note: 'Ruche' },
          { name: 'Gelée', qty: 1, note: 'Bocal' },
          { name: 'Pomme', qty: 1, note: 'Pommiers en Automne, la grotte (option chauves-souris)' },
          { name: 'Abricot', qty: 1, note: 'Abricotiers au Printemps, la grotte (option chauves-souris)' },
          { name: 'Orange', qty: 1, note: 'Orangers en Été, la grotte (option chauves-souris)' },
          { name: 'Pêche (fruit)', qty: 1, note: 'Pêchers en Été, la grotte (option chauves-souris)' },
          { name: 'Grenade', qty: 1, note: 'Grenadiers en Automne, la grotte (option chauves-souris)' },
          { name: 'Cerise', qty: 1, note: 'Cerisiers au Printemps, la grotte (option chauves-souris)' },
        ],
      },
    ],
  },
  {
    id: 'aquarium', name: 'Aquarium', reward: 'Rocher scintillant enlevé',
    bundles: [
      {
        id: 'paquet-poisson-de-riviere', name: 'Paquet poisson de rivière', slots: 4, reward: { name: 'Appât', qty: 30 },
        items: [
          { name: 'Poisson lune', qty: 1, note: 'Se trouve en rivière, 6h - 19h, Printemps, et Été pendant les jours ensoleillés. · Se trouve dans la Ferme de rivière ou dans l’étang de la Ferme en région sauvage lorsqu’il pleut.' },
          { name: 'Poisson-chat', qty: 1, note: 'Se trouve en rivière et dans l’étang de la forêt secrète, Printemps et Automne pendant les jours de pluie.' },
          { name: 'Alose', qty: 1, note: 'Se trouve en rivière, 9h - 2h, Printemps, Été, et Automne pendant les jours de pluie.' },
          { name: 'Truite tigrée', qty: 1, note: 'Se trouve en rivière, 6h - 19h, Automne et Hiver.' },
        ],
      },
      {
        id: 'paquet-poissons-d-eau-douce', name: 'Paquet poissons d’eau douce', slots: 4, reward: { name: 'Hameçon à leurre', qty: 1 },
        items: [
          { name: 'Achigan à grande bouche', qty: 1, note: 'Se trouve dans le lac de montagne, 6h - 19h, pendant toutes les saisons.' },
          { name: 'Carpe', qty: 1, note: 'Se trouve dans le lac de montagne, à tout moment et pendant toutes les saisons. · Se trouve dans la mare de la Forêt Sève-Cendreuse n’importe quand en Printemps, Été ou Automne. · Se trouve dans la Forêt secrète ou dans les Égouts, n’importe quand.' },
          { name: 'Barbotte', qty: 1, note: 'Se trouve dans le lac de montagne, à tout moment et pendant toutes les saisons.' },
          { name: 'Esturgeon', qty: 1, note: 'Se trouve dans le lac de montagne, 6h - 19h, Été et Hiver.' },
        ],
      },
      {
        id: 'paquet-poissons-de-mer', name: 'Paquet poissons de mer', slots: 4, reward: { name: 'Totem de téléportation : Mer', qty: 5 },
        items: [
          { name: 'Sardine', qty: 1, note: 'Se trouve dans l’océan, 6h - 19h, Printemps, Automne et Hiver.' },
          { name: 'Thon', qty: 1, note: 'Se trouve dans l’océan, 6h - 19h, Été et Hiver.' },
          { name: 'Vivaneau rouge', qty: 1, note: 'Se trouve dans l’océan, 6h - 19h, Été et Automne les jours de pluie seulement.' },
          { name: 'Tilapia', qty: 1, note: 'Se trouve dans l’océan, 6h - 14h, Été et Automne.' },
        ],
      },
      {
        id: 'paquet-peche-nocturne', name: 'Paquet pêche nocturne', slots: 3, reward: { name: 'Petite bague scintillante', qty: 1 },
        items: [
          { name: 'Doré jaune', qty: 1, note: 'Se trouve en rivière, lacs et étang de la forêt, 12h – 2h, Automne les jours de pluie seulement.' },
          { name: 'Dorade', qty: 1, note: 'Se trouve en rivière, 18h - 2h, pendant toutes les saisons.' },
          { name: 'Anguille', qty: 1, note: 'Se trouve dans l’océan, 16h - 2h, Printemps et Automne les jours de pluie seulement.' },
        ],
      },
      {
        id: 'paquet-casier-a-crabes', name: 'Paquet casier à crabes', slots: 5, reward: { name: 'Casier à crabes', qty: 3 },
        items: [
          { name: 'Homard', qty: 1, note: 'Attrapé dans un Casier à crabes' },
          { name: 'Écrevisse', qty: 1, note: 'Attrapé dans un Casier à crabes' },
          { name: 'Crabe', qty: 1, note: 'Attrapé dans un Casier à crabes, butin de Crabe rocheux et Crabe de lave dans les Mines' },
          { name: 'Coque', qty: 1, note: 'Attrapé dans un Casier à crabes, trouvé sur La plage' },
          { name: 'Moule', qty: 1, note: 'Attrapé dans un Casier à crabes, trouvé sur La plage' },
          { name: 'Crevette', qty: 1, note: 'Attrapé dans un Casier à crabes' },
          { name: 'Escargot', qty: 1, note: 'Attrapé dans un Casier à crabes' },
          { name: 'Bigorneau', qty: 1, note: 'Attrapé dans un Casier à crabes' },
          { name: 'Huître', qty: 1, note: 'Attrapé dans un Casier à crabes, trouvé sur La plage' },
          { name: 'Palourde', qty: 1, note: 'Attrapé dans un Casier à crabes, trouvé sur La plage' },
        ],
      },
      {
        id: 'paquet-poisson-de-specialite', name: 'Paquet poisson de spécialité', slots: 4, reward: { name: 'Plat de la mer', qty: 5 },
        items: [
          { name: 'Poisson-globe', qty: 1, note: 'Se trouve dans l’océan, 12h - 16h, Été pendant les jours ensoleillés.' },
          { name: 'Poisson spectral', qty: 1, note: 'Se trouve dans les étangs des Mines aux niveaux 20 et 60, n’importe quand. Peut aussi être lâché par les Fantômes.' },
          { name: 'Poisson des sables', qty: 1, note: 'Se trouve dans le Désert, 6h - 20h, toute saison.' },
          { name: 'Poisson de forêt', qty: 1, note: 'Se trouve dans la forêt secrète, tout le temps et pendant toutes les saisons.' },
        ],
      },
    ],
  },
  {
    id: 'chaufferie', name: 'Chaufferie', reward: 'Wagonnets réparés',
    bundles: [
      {
        id: 'paquet-de-forgeron', name: 'Paquet de forgeron', slots: 3, reward: { name: 'Fournaise', qty: 1 },
        items: [
          { name: 'Lingot de cuivre', qty: 1, note: 'Faire fondre du minerai de cuivre dans une Fournaise' },
          { name: 'Lingot de fer', qty: 1, note: 'Faire fondre du minerai de fer dans une Fournaise, Fabriquer la recette "Transmutation (Fe)"' },
          { name: 'Lingot en or', qty: 1, note: 'Faire fondre du minerai d’or dans une Fournaise, Fabriquer la recette "Transmutation (Au)"' },
        ],
      },
      {
        id: 'paquet-de-geologue', name: 'Paquet de géologue', slots: 4, reward: { name: 'Géode-omni', qty: 5 },
        items: [
          { name: 'Quartz', qty: 1, note: 'Cueillette à tous les niveau des Mines' },
          { name: 'Cristal de terre', qty: 1, note: 'Cueillette aux niveau 1 - 39 des Mines, Géodes, Géode-omni, butin des Fouisseur-boueux dans les Mines (étages 1 - 29)' },
          { name: 'Larme gelée', qty: 1, note: 'Cueillette aux niveaux 40 - 79 des Mines, Géodes gelées, Géode-omni, butin des Esprits de poussière dans les Mines (étages 40 - 80)' },
          { name: 'Quartz de feu', qty: 1, note: 'Cueillette aux niveaux 80 - 120 des Mines, Géodes de lave, Géode-omni' },
        ],
      },
      {
        id: 'paquet-d-aventurier', name: 'Paquet d’aventurier', slots: 2, reward: { name: 'Petite bague magnétique', qty: 1 },
        items: [
          { name: 'Slime', qty: 99, note: 'Butin des Slimes' },
          { name: 'Aile de chauve-souris', qty: 10, note: 'Butin des Chauves-souris dans les Mines' },
          { name: 'Essence solaire', qty: 1, note: 'Butin des Fantômes, Jeunes calmars, ou des Têtes métalliques dans les Mines, butin des Momies dans la Caverne du Crâne' },
          { name: 'Essence du Vide', qty: 1, note: 'Butin des Brutes des ombres dans les Mines ou des Serpents dans la Caverne du Crâne' },
        ],
      },
    ],
  },
  {
    id: 'panneau-d-affichage', name: 'Panneau d’affichage', reward: 'Amitié ♡',
    bundles: [
      {
        id: 'paquet-du-chef', name: 'Paquet du chef', slots: 6, reward: { name: 'Gâteau rose', qty: 3 },
        items: [
          { name: 'Sirop d’érable', qty: 1, note: 'Sève d’ Érable' },
          { name: 'Crosse de fougère', qty: 1, note: 'Cueillette l’Été dans la Forêt secrète' },
          { name: 'Truffe', qty: 1, note: 'Cochons' },
          { name: 'Pavot', qty: 1, note: 'Récoltes d’Été' },
          { name: 'Maki', qty: 1, note: 'Cuisine (Sources de la recette: La reine des sauces, Le Saloon)' },
          { name: 'Œuf sur le plat', qty: 1, note: 'Cuisine' },
        ],
      },
      {
        id: 'paquet-colorant', name: 'Paquet colorant', slots: 6, reward: { name: 'Machine à graines', qty: 1 },
        items: [
          { name: 'Champignon rouge', qty: 1, note: 'Cueillette dans les Mines, Cueillette en Été ou en Automne, Cueillette dans la Forêt secrète, la Grotte (à champignons), Saigneur sur un Arbre champignon' },
          { name: 'Oursin', qty: 1, note: 'Cueillette sur La plage, après avoir dépensé 300 bois pour réparer le pont sur la droite de la plage.' },
          { name: 'Tournesol', qty: 1, note: 'Récoltes d’Été et d’Automne' },
          { name: 'Plume de canard', qty: 1, note: 'Canards' },
          { name: 'Aigue-marine', qty: 1, note: 'Aigue-marine, caisses dans les Mines, Coffres au trésor' },
          { name: 'Chou rouge', qty: 1, note: 'Récoltes d’Été (Graines de chou rouge disponibles au Magasin général de Pierre dès l’année 2)' },
        ],
      },
      {
        id: 'paquet-recherche-sur-le-terrain', name: 'Paquet recherche sur le terrain', slots: 4, reward: { name: 'Machine de recyclage', qty: 1 },
        items: [
          { name: 'Champignon violet', qty: 1, note: 'Les mines, Grotte de la ferme (option champignons), Carte de la ferme forestière Cueillette en Automne' },
          { name: 'Coquillage', qty: 1, note: 'Cueillette en Hiver sur La plage (Note: Pas l’artefact Fossile de nautile)' },
          { name: 'Chevesne', qty: 1, note: 'Peut être trouvé dans le lac de montagne et en rivière durant toutes les saisons et à toute heure.' },
          { name: 'Géode gelée', qty: 1, note: 'Les mines niveaux 40 à 79' },
        ],
      },
      {
        id: 'paquet-fourrage', name: 'Paquet fourrage', slots: 3, reward: { name: 'Radiateur', qty: 1 },
        items: [
          { name: 'Blé', qty: 10, note: 'Récoltes en Été et Automne' },
          { name: 'Paille', qty: 10, note: 'Achetable au Ranch de Marnie, ou récoltez l’herbe avec la Faux une fois que vous avez un Silo, et retirez le foin de la trémie d’alimentation une fois que vous avez un poulailler ou une grange' },
          { name: 'Pomme', qty: 3, note: 'Pommiers durant l’Automne, Grotte de la ferme (option chauve-souris)' },
        ],
      },
      {
        id: 'paquet-d-enchanteur', name: 'Paquet d’enchanteur', slots: 4, reward: { name: 'Lingot en or', qty: 5 },
        items: [
          { name: 'Résine de chêne', qty: 1, note: 'Sève de Chêne' },
          { name: 'Vin', qty: 1, note: 'Tonneau' },
          { name: 'Patte de lapin', qty: 1, note: 'Lapins, Serpent en laisse tomber dans la Caverne du Crâne (0.8%)' },
          { name: 'Grenade', qty: 1, note: 'Grenadiers durant l’Automne, Grotte de la ferme (option chauve-souris)' },
        ],
      },
    ],
  },
  {
    id: 'coffre', name: 'Coffre', reward: 'Bus réparé',
    bundles: [
      {
        id: 'paquet-2-500po', name: 'Paquet 2,500po', slots: 1, reward: { name: 'Gâteau au chocolat', qty: 3 },
        items: [
          { name: '2 500po', qty: 1, note: '' },
        ],
      },
      {
        id: 'paquet-5-000po', name: 'Paquet 5,000po', slots: 1, reward: { name: 'Engrais de qualité', qty: 30 },
        items: [
          { name: '5 000po', qty: 1, note: '' },
        ],
      },
      {
        id: 'paquet-10-000po', name: 'Paquet 10,000po', slots: 1, reward: { name: 'Paratonnerre', qty: 1 },
        items: [
          { name: '10 000po', qty: 1, note: '' },
        ],
      },
      {
        id: 'paquet-25-000po', name: 'Paquet 25,000po', slots: 1, reward: { name: 'Cristalarium', qty: 1 },
        items: [
          { name: '25 000po', qty: 1, note: '' },
        ],
      },
    ],
  },
  {
    id: 'marche-joja-abandonne', name: 'Marché Joja abandonné', reward: 'Cinéma',
    bundles: [
      {
        id: 'paquet-disparu', name: 'Paquet disparu', slots: 5, reward: null,
        items: [
          { name: 'Vin qualité argent (N’importe quel)', qty: 1, note: 'Fût' },
          { name: 'Mayonnaise de dinosaure', qty: 1, note: 'Machine à mayonnaise' },
          { name: 'Tesson prismatique', qty: 1, note: 'Extraction minière' },
          { name: 'Fruit ancien qualité or', qty: 5, note: 'Récoltes' },
          { name: 'Saumon du Vide qualité or', qty: 1, note: 'Pêche dans le Marais de la sorcière' },
          { name: 'Caviar', qty: 1, note: 'Bocal' },
        ],
      },
    ],
  },
]
