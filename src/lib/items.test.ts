import { describe, expect, it } from 'vitest'
import { ITEMS } from '../data/items'
import { CULTURES, POISSONS, catalog, categories, filterItems, lovedBy, recipesUsing } from './items'
import { search } from './search'

describe('items data', () => {
  it('380 objets du wiki, identifiants uniques, chacun avec un nom et une catégorie', () => {
    expect(ITEMS).toHaveLength(380)
    expect(new Set(ITEMS.map((i) => i.id)).size).toBe(ITEMS.length)
    expect(ITEMS.every((i) => i.name && i.category)).toBe(true)
  })

  it('catalogue = objets + cultures + poissons, identifiants uniques', () => {
    const all = catalog()
    expect(all.length).toBeGreaterThan(ITEMS.length)
    expect(new Set(all.map((i) => i.id)).size).toBe(all.length)
    expect(categories(all).map((c) => c.name)).toEqual(expect.arrayContaining([CULTURES, POISSONS, 'Ressources', 'Artefacts', 'Gemmes']))
  })

  it('bois : obtenu avec les arbres, utilisé par des recettes', () => {
    const wood = ITEMS.find((i) => i.name === 'Bois')!
    expect(wood.category).toBe('Ressources')
    expect(wood.where.join(' ')).toContain('Arbres')
    expect(recipesUsing('Bois').craft.length).toBeGreaterThan(5)
  })

  it('recettes qui utilisent un ingrédient, sans tenir compte des accents', () => {
    expect(recipesUsing('oeuf').cooking.length).toBeGreaterThan(0)
    expect(recipesUsing('Œuf').cooking.map((r) => r.id)).toContain('omelette')
  })

  it('villageois qui adorent un objet', () => {
    expect(lovedBy('Diamant').map((v) => v.name)).toEqual(expect.arrayContaining(['Maru', 'Willy']))
    expect(lovedBy('objet inexistant')).toEqual([])
  })

  it('filtre du catalogue par nom et catégorie', () => {
    const gems = filterItems(catalog(), { query: 'EMERAUDE', category: 'Gemmes' })
    expect(gems.map((i) => i.name)).toEqual(['Émeraude'])
    expect(filterItems(catalog(), { query: '', category: 'Artefacts' })).toHaveLength(42)
  })
})

describe('global search', () => {
  it('trouve par nom exact sans accent ni casse', () => {
    expect(search('flétan')[0].name).toBe('Flétan')
    expect(search('FLETAN')[0].kind).toBe('poisson')
  })

  it('« commence par » avant « contient »', () => {
    const r = search('pizza')
    expect(r[0].name).toBe('Pizza')
  })

  it('tolère une faute de frappe', () => {
    expect(search('chou-flur').map((x) => x.name)).toContain('Chou-fleur')
  })

  it('« oeuf » trouve les « Œuf… »', () => {
    expect(search('oeuf').some((x) => x.name.startsWith('Œuf'))).toBe(true)
    expect(search('oeufs').some((x) => x.name.includes('Œufs'))).toBe(true)
  })

  it('trouve la dent de dragon et les anneaux', () => {
    expect(search('dent de dragon')[0]).toMatchObject({ name: 'Dent de dragon', kind: 'objet' })
    expect(search('bague magnetique')[0].name).toBe('Bague magnétique')
  })

  it('apostrophe droite ou typographique', () => {
    expect(search("sucre d'orge")[0].name).toBe('Sucre d’orge magique')
  })

  it('trouve les armes et les chaussures, avec le bon onglet', () => {
    expect(search("lame de l'infini")[0]).toMatchObject({ name: 'Lame de l’infini', kind: 'equipement', to: '/equipement?q=Lame%20de%20l%E2%80%99infini' })
    expect(search('baskets')[0].to).toBe('/equipement?q=Baskets&tab=chaussures')
  })

  it('moins de 2 caractères : aucun résultat', () => {
    expect(search('a')).toEqual([])
    expect(search('')).toEqual([])
  })

  it('les résultats pointent vers le bon onglet', () => {
    expect(search('Omelette').find((x) => x.kind === 'cuisine')!.to).toBe('/craft?tab=cuisine&q=Omelette')
    expect(search('Panais').find((x) => x.kind === 'culture')!.to).toBe('/agriculture?crop=panais')
    expect(search('Fête des Œufs')[0].to).toBe('/calendrier?season=printemps&day=13')
    expect(search('grand-père')[0]).toMatchObject({ kind: 'festival', to: '/calendrier?season=printemps&day=1&year=3' })
  })
})

describe('anneaux : effets et ingrédients', () => {
  const ring = (name: string) => catalog().find((i) => i.name === name)!

  it('chaque anneau a un effet', () => {
    const rings = catalog().filter((i) => i.category === 'Anneaux')
    expect(rings).toHaveLength(29)
    expect(rings.every((r) => r.effect)).toBe(true)
  })

  it('valeurs connues', () => {
    expect(ring('Bague de rubis').effect).toBe('Augmente l’Attaque de 10%.')
    expect(ring('Anneau de pierre luisante').ingredients).toEqual([{ name: 'Essence solaire', qty: 5 }, { name: 'Lingot de fer', qty: 5 }])
    expect(ring('Bague vampirique').ingredients).toEqual([])
  })
})
