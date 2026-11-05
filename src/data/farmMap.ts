// Ferme standard (80 × 65 cases de 16 px), fond : public/maps/standard-farm.png (Stardew Valley Wiki, CC BY-NC-SA 3.0).
// Zones non constructibles relevées à la main sur l'image (approximatives, à quelques cases près) : tout ce qui est
// hors de la zone de terre, plus la maison, la serre en ruine, la caisse d'expédition, les mares et les falaises.
// Les arbres, rochers et branches du fond sont encore à dégager en jeu : ils ne sont pas comptés comme bloquants.
export const FARM_W = 80
export const FARM_H = 65

// [x1, y1, x2, y2] inclus
type Rect = [number, number, number, number]

const BLOCKED: Rect[] = [
  [59, 8, 68, 17], // maison
  [71, 13, 72, 13], // caisse d'expédition
  [25, 8, 33, 17], // serre en ruine
  [70, 28, 75, 33], // petite mare
  [3, 22, 6, 35], // falaise gauche
  [73, 59, 76, 60], // falaise en bas à droite
  // grande mare, ligne par ligne
  [36, 49, 43, 49],
  [33, 50, 46, 57],
  [37, 58, 43, 58],
]

const PLAYABLE: Rect = [3, 8, 76, 60]

function inRect(x: number, y: number, [x1, y1, x2, y2]: Rect) {
  return x >= x1 && x <= x2 && y >= y1 && y <= y2
}

export function isBlocked(x: number, y: number): boolean {
  return !inRect(x, y, PLAYABLE) || BLOCKED.some((r) => inRect(x, y, r))
}
