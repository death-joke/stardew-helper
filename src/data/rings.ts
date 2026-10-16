import type { Ingredient } from './types'

// Effets et ingrédients des anneaux, extraits du wiki FR (fr.stardewvalleywiki.com/Anneaux, 1.6) par script : ne pas retoucher à la main sans vérifier.
export interface RingDetails {
  name: string
  effect: string
  ingredients: Ingredient[]
}

export const RINGS: RingDetails[] = [
  {"name": "Petite bague scintillante", "effect": "Émet un cercle de lumière de 5 de rayon. L’effet de lumière s’empile avec d’autres bagues scintillantes.", "ingredients": []},
  {"name": "Bague scintillante", "effect": "Émet un cercle de lumière de 10 de rayon. L’effet de lumière s’empile avec d’autres bagues scintillantes.", "ingredients": []},
  {"name": "Petite bague magnétique", "effect": "Augmente le Magnétisme d’1 carreau. S’empile avec elle-même, la Bague magnétique et l’Anneau d’iridium.", "ingredients": []},
  {"name": "Bague magnétique", "effect": "Augmente le Magnétisme de 2 carreaux. S’empile avec elle-même, la Petite bague magnétique et l’Anneau d’iridium.", "ingredients": []},
  {"name": "Anneau charmeur de Slimes", "effect": "Empêche les dégâts de la part des Slimes et empêche le debuff \"Englué(e)\"", "ingredients": []},
  {"name": "Anneau du guerrier", "effect": "A une chance de donner le buff \"Énergie guerrière\" après avoir tué un monstre", "ingredients": [{"name": "Lingot de fer", "qty": 10}, {"name": "Charbon", "qty": 25}, {"name": "Larme gelée", "qty": 10}]},
  {"name": "Bague vampirique", "effect": "Restaure 2 de Santé après avoir tué un monstre", "ingredients": []},
  {"name": "Anneau sauvage", "effect": "Donne 2 secondes de Vitesse (+2) Buff obtenu après avoir tué un monstre.", "ingredients": []},
  {"name": "Anneau de Yoba", "effect": "A une chance de donner la Bénédiction de Yoba (buff) après avoir subi des dégâts. Plus votre Santé est basse et plus votre Chance est grande, plus la chance de recevoir ce buff est grande.", "ingredients": [{"name": "Lingot de fer", "qty": 5}, {"name": "Lingot en or", "qty": 5}, {"name": "Diamant", "qty": 1}]},
  {"name": "Anneau solide", "effect": "La durée des Buffs négatifs (ex :, \"Englué(e)\", \"Maudit(e)\") est divisée par 2.", "ingredients": [{"name": "Lingot de cuivre", "qty": 10}, {"name": "Quartz raffiné", "qty": 5}, {"name": "Cristal de terre", "qty": 10}]},
  {"name": "Bague de cambrioleur", "effect": "Les Monstres lâchent des butins plus souvent. Le jeu \"retourne\" deux fois sur le tableau des butins de monstres quand la bague est équipée afin que les objets aient une chance d’être lâchés deux fois.", "ingredients": []},
  {"name": "Anneau d’iridium", "effect": "Se combine avec l’effet de la Bague scintillante, de la Bague magnétique et la Bague de rubis.", "ingredients": [{"name": "Lingot en iridium", "qty": 5}, {"name": "Essence solaire", "qty": 50}, {"name": "Essence du Vide", "qty": 50}]},
  {"name": "Bague de jukebox", "effect": "Inconnu", "ingredients": []},
  {"name": "Bague en améthyste", "effect": "Augmente le recul de 10%.", "ingredients": []},
  {"name": "Bague en topaze", "effect": "Augmente la précision de l’arme de 10%.", "ingredients": []},
  {"name": "Bague en aigue-marine", "effect": "Augmente de 10% les chances de coup critique (effet multiplicatif, comme la Profession Scout).", "ingredients": []},
  {"name": "Bague de jade", "effect": "Augmente la Puissance Critique de 10%.", "ingredients": []},
  {"name": "Bague d’émeraude", "effect": "Augmente la Vitesse de l’arme de 10%.", "ingredients": []},
  {"name": "Bague de rubis", "effect": "Augmente l’Attaque de 10%.", "ingredients": []},
  {"name": "Bague de mariage", "effect": "Vous permet de demander en Mariage un autre joueur dans une partie Multijoueur.", "ingredients": [{"name": "Lingot en iridium", "qty": 5}, {"name": "Tesson prismatique", "qty": 1}]},
  {"name": "Bague coquille de crabe", "effect": "Augmente la Défense de +5", "ingredients": []},
  {"name": "Bague en napalm", "effect": "Les Monstres tués vont exploser, détruisant les objets proches", "ingredients": []},
  {"name": "Anneau épineux", "effect": "Les monstres subissent des dégâts égaux aux dégâts non atténués infligés au joueur.", "ingredients": [{"name": "Fragments d’os", "qty": 50}, {"name": "Pierre", "qty": 50}, {"name": "Lingot en or", "qty": 1}]},
  {"name": "Bague porte-bonheur", "effect": "Augmente la Chance de +1.", "ingredients": []},
  {"name": "Anneau de café chaud", "effect": "Augmente les chances de trouver du Café et de la Triple dose d’espresso lorsque vous tuez des monstres.", "ingredients": []},
  {"name": "Anneau de protection", "effect": "Augmente le temps d’invincibilité après avoir subi des dégâts de 0,4 seconde", "ingredients": []},
  {"name": "Anneau mangeur d’âmes", "effect": "Gagnez 4 points d’énergie après avoir tué un monstre.", "ingredients": []},
  {"name": "Anneau du phoenix", "effect": "Une fois par jour, retrouvez 50% de santé après avoir été assommé.", "ingredients": []},
  {"name": "Anneau d’immunité", "effect": "Augmente l’ Immunité de +4.", "ingredients": []},
  {"name": "Anneau de pierre luisante", "effect": "Une combinaison des bagues scintillante et magnétique: émet un cercle de lumière de 10 rayons et augmente le Magnétisme de deux tuiles.", "ingredients": [{"name": "Essence solaire", "qty": 5}, {"name": "Lingot de fer", "qty": 5}]},
]
