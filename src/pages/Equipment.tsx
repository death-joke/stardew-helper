import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Card } from '../components/Card'
import { IngredientChips } from '../components/IngredientChips'
import { EQUIPMENT } from '../data/equipment'
import type { Equipment as EquipmentItem, EquipmentKind } from '../data/types'
import {
  FOOTWEAR_SORTS, SORT_LABELS, WEAPON_KINDS, WEAPON_SORTS, filterEquipment, isWeapon, sortEquipment,
} from '../lib/equipment'
import type { EquipmentSort } from '../lib/equipment'
import { catalog } from '../lib/items'
import type { CatalogItem } from '../lib/items'
import { normalize } from '../lib/text'

type Tab = 'armes' | 'chaussures' | 'anneaux'

const field = 'field'
const WEAPONS = EQUIPMENT.filter(isWeapon)
const FOOTWEAR = EQUIPMENT.filter((e) => !isWeapon(e))
const RINGS = catalog().filter((i) => i.category === 'Anneaux')
const TABS: Array<[Tab, string, number]> = [
  ['armes', 'Armes', WEAPONS.length],
  ['chaussures', 'Chaussures', FOOTWEAR.length],
  ['anneaux', 'Anneaux', RINGS.length],
]

export function Equipment() {
  const [params] = useSearchParams()
  const tabParam = params.get('tab')
  const [tab, setTab] = useState<Tab>(tabParam === 'chaussures' || tabParam === 'anneaux' ? tabParam : 'armes')
  const [query, setQuery] = useState(params.get('q') ?? '')
  const [kind, setKind] = useState<EquipmentKind | 'toutes'>('toutes')
  const [sortKey, setSortKey] = useState<EquipmentSort>('nom')
  const [dir, setDir] = useState<'asc' | 'desc'>('asc')

  const changeSort = (key: EquipmentSort) => {
    setSortKey(key)
    setDir(key === 'nom' ? 'asc' : 'desc')
  }
  const changeTab = (t: Tab) => {
    setTab(t)
    changeSort('nom')
  }

  const q = normalize(query.trim())
  const weapons = sortEquipment(filterEquipment(WEAPONS, { query, kind }), sortKey, dir)
  const footwear = sortEquipment(filterEquipment(FOOTWEAR, { query, kind: 'toutes' }), sortKey, dir)
  const rings = RINGS.filter((r) => !q || normalize(r.name).includes(q))
  const count = tab === 'armes' ? weapons.length : tab === 'chaussures' ? footwear.length : rings.length
  const sorts = tab === 'armes' ? WEAPON_SORTS : FOOTWEAR_SORTS

  return (
    <div className="space-y-4">
      <Card title="Armes & armures" icon="🗡️">
        <div role="tablist" className="mb-3 flex gap-1">
          {TABS.map(([t, label, n]) => (
            <button
              key={t}
              role="tab"
              aria-selected={t === tab}
              onClick={() => changeTab(t)}
              className={`flex-1 rounded px-2 py-1.5 text-sm ${t === tab ? 'bg-wood text-parchment' : 'bg-parchment-dark hover:bg-parchment-dark/70'}`}
            >
              {label} ({n})
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <input
            type="search"
            aria-label="Rechercher"
            placeholder="Rechercher par nom…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className={`${field} w-full sm:w-auto sm:min-w-0 sm:flex-1`}
          />
          {tab === 'armes' && (
            <select aria-label="Type d’arme" value={kind} onChange={(e) => setKind(e.target.value as EquipmentKind | 'toutes')} className={field}>
              <option value="toutes">Tous les types</option>
              {WEAPON_KINDS.map((k) => <option key={k} value={k}>{k}</option>)}
            </select>
          )}
          {tab !== 'anneaux' && (
            <>
              <label className="flex items-center gap-2 text-sm">
                Trier par
                <select aria-label="Trier par" value={sorts.includes(sortKey) ? sortKey : 'nom'} onChange={(e) => changeSort(e.target.value as EquipmentSort)} className={field}>
                  {sorts.map((k) => <option key={k} value={k}>{SORT_LABELS[k]}</option>)}
                </select>
              </label>
              <button
                type="button"
                onClick={() => setDir(dir === 'asc' ? 'desc' : 'asc')}
                aria-label={dir === 'asc' ? 'Ordre croissant, cliquer pour inverser' : 'Ordre décroissant, cliquer pour inverser'}
                className="rounded bg-wood px-3 py-1.5 text-sm text-parchment active:bg-wood-dark"
              >
                {dir === 'asc' ? '↑ Croissant' : '↓ Décroissant'}
              </button>
            </>
          )}
        </div>
        <p className="mt-3 text-sm text-muted">{count} résultat{count > 1 ? 's' : ''}.</p>
      </Card>

      {count === 0 ? (
        <p className="text-sm text-muted">Rien avec ces filtres.</p>
      ) : (
        <ul className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {tab === 'anneaux'
            ? rings.map((r) => <RingCard key={r.id} ring={r} />)
            : (tab === 'armes' ? weapons : footwear).map((e) => <EquipmentCard key={e.id} item={e} />)}
        </ul>
      )}
    </div>
  )
}

function WhereList({ where }: { where: string[] }) {
  return (
    <>
      <h4 className="mt-2 text-xs font-semibold uppercase text-muted">Où le trouver</h4>
      {where.length > 0 ? (
        <ul className="list-disc pl-5 text-sm">{where.map((w) => <li key={w}>{w}</li>)}</ul>
      ) : (
        <p className="text-sm text-muted">Non précisé sur le wiki.</p>
      )}
    </>
  )
}

function EquipmentCard({ item }: { item: EquipmentItem }) {
  const bits: string[] = []
  if (item.damage) bits.push(`Dégâts ${item.damage[0]}–${item.damage[1]}`)
  if (item.crit !== null) bits.push(`Critique ${String(item.crit).replace('.', ',')} %`)
  for (const s of item.stats) bits.push(`${s.label} ${s.value}`)

  return (
    <li className="rounded-lg border border-wood/30 bg-card p-3 shadow-sm">
      <div className="flex items-baseline justify-between gap-2">
        <h3 className="font-semibold">{item.name}</h3>
        <span className="shrink-0 rounded bg-parchment-dark px-1.5 text-xs">{item.kind}{item.level !== null && ` · niv. ${item.level}`}</span>
      </div>
      {item.desc && <p className="text-sm text-muted">{item.desc}</p>}
      {bits.length > 0 && <p className="mt-1 text-sm font-medium">{bits.join(' · ')}</p>}
      {item.enchant && <p className="text-sm">Enchantement : {item.enchant}</p>}
      <WhereList where={item.where} />
      <p className="mt-2 text-sm text-muted">
        {item.sellPrice !== null ? `Vente : ${item.sellPrice} po` : 'Ne peut pas être vendu'}
        {item.shopPrice !== null && ` · Achat : ${item.shopPrice} po`}
      </p>
    </li>
  )
}

function RingCard({ ring }: { ring: CatalogItem }) {
  return (
    <li className="rounded-lg border border-wood/30 bg-card p-3 shadow-sm">
      <div className="flex items-baseline justify-between gap-2">
        <h3 className="font-semibold">{ring.name}</h3>
        {ring.price !== null && <span className="shrink-0 text-sm">{ring.price} po</span>}
      </div>
      {ring.effect && <p className="mt-1 text-sm font-medium">Effet : {ring.effect}</p>}
      {ring.desc && <p className="text-sm text-muted">{ring.desc}</p>}
      {ring.ingredients && <IngredientChips items={ring.ingredients} />}
      <WhereList where={ring.where} />
    </li>
  )
}
