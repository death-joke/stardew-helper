/** Minuscules sans accents ni ligatures, apostrophes unifiées : « oeuf » trouve « Œuf », « l'infini » trouve « l’infini ». */
export function normalize(s: string): string {
  return s
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .replace(/œ/g, 'oe')
    .replace(/æ/g, 'ae')
    .replace(/[’‘`´]/g, "'")
}
