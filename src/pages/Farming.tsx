import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Card } from '../components/Card'
import { DetailPanel } from '../components/DetailPanel'
import { CROPS } from '../data/crops'
import { FRUIT_TREES } from '../data/trees'
import type { Crop } from '../data/types'
import {
  AGRICULTURIST_SPEED, FERTILIZERS, artisanProducts, growthDays, harvestDates, profitPerDay, sellPrice, totalRevenue, yieldPerHarvest,
} from '../lib/crops'
import type { FarmOptions } from '../lib/crops'
import { DAYS_PER_SEASON, SEASONS, SEASON_LABELS, formatDate } from '../lib/gameDate'
import type { GameDate, Season } from '../lib/gameDate'
import { useGameDate } from '../state/useGameDate'

type SortKey = 'profit' | 'nom' | 'croissance' | 'vente'

const SORTS: Array<[SortKey, string]> = [
  ['profit', 'Profit / jour'],
  ['nom', 'Nom'],
  ['croissance', 'Croissance'],
  ['vente', 'Prix de vente'],
]

const field = 'field'

export function Farming() {
  const { date } = useGameDate()
  const [params] = useSearchParams()
  const [override, setOverride] = useState<GameDate | null>(null)
  const [fertilizer, setFertilizer] = useState<string>(FERTILIZERS[0].id)
  const [agriculturist, setAgriculturist] = useState(false)
  const [tiller, setTiller] = useState(false)
  const [artisan, setArtisan] = useState(false)
  const [sort, setSort] = useState<SortKey>('profit')
  const [selectedId, setSelectedId] = useState<string | null>(CROPS.some((c) => c.id === params.get('crop')) ? params.get('crop') : null)

  const plant = override ?? date
  const speed = (FERTILIZERS.find((f) => f.id === fertilizer)?.speed ?? 0) + (agriculturist ? AGRICULTURIST_SPEED : 0)
  const opts: FarmOptions = { speed, tiller }

  const rows = CROPS
    .filter((c) => c.seasons.includes(plant.season))
    .map((crop) => ({
      crop,
      harvests: crop.island ? null : harvestDates(crop, plant, speed).length,
      profit: profitPerDay(crop, plant, opts),
    }))
    .sort((a, b) => {
      switch (sort) {
        case 'nom': return a.crop.name.localeCompare(b.crop.name, 'fr')
        case 'croissance': return growthDays(a.crop, speed) - growthDays(b.crop, speed)
        case 'vente': return b.crop.sell - a.crop.sell
        default: return (b.profit ?? -Infinity) - (a.profit ?? -Infinity)
      }
    })

  const selected = CROPS.find((c) => c.id === selectedId) ?? null

  return (
    <div className="space-y-4">
      <Card title="Si je plante…" icon="🌱">
        <div className="flex flex-wrap items-center gap-2">
          <select
            aria-label="Saison de plantation"
            value={plant.season}
            onChange={(e) => setOverride({ ...plant, season: e.target.value as Season })}
            className={field}
          >
            {SEASONS.map((s) => <option key={s} value={s}>{SEASON_LABELS[s]}</option>)}
          </select>
          <select
            aria-label="Jour de plantation"
            value={plant.day}
            onChange={(e) => setOverride({ ...plant, day: Number(e.target.value) })}
            className={field}
          >
            {Array.from({ length: DAYS_PER_SEASON }, (_, i) => i + 1).map((d) => <option key={d} value={d}>{d}</option>)}
          </select>
          {override && (
            <button type="button" onClick={() => setOverride(null)} className="text-sm text-wood underline">
              Utiliser la date du jour
            </button>
          )}
          <select aria-label="Engrais" value={fertilizer} onChange={(e) => setFertilizer(e.target.value)} className={field}>
            {FERTILIZERS.map((f) => <option key={f.id} value={f.id}>{f.label}</option>)}
          </select>
        </div>
        <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm">
          <label className="flex items-center gap-2"><input type="checkbox" className="check" checked={agriculturist} onChange={(e) => setAgriculturist(e.target.checked)} />Agriculteur (−10 % de temps)</label>
          <label className="flex items-center gap-2"><input type="checkbox" className="check" checked={tiller} onChange={(e) => setTiller(e.target.checked)} />Cultivateur (+10 % de prix)</label>
          <label className="flex items-center gap-2"><input type="checkbox" className="check" checked={artisan} onChange={(e) => setArtisan(e.target.checked)} />Artisan (+40 % produits transformés)</label>
        </div>
        <p className="mt-3 text-sm text-muted">
          Plantation le {formatDate(plant)}. Avec un bonus de vitesse, le calcul peut varier d’un jour par rapport au jeu.
        </p>
      </Card>

      <div className="grid gap-4 lg:grid-cols-[1fr_22rem]">
        <Card title="Cultures" icon="🥕">
          <label className="mb-3 flex items-center gap-2 text-sm">
            Trier par
            <select value={sort} onChange={(e) => setSort(e.target.value as SortKey)} className={field}>
              {SORTS.map(([k, label]) => <option key={k} value={k}>{label}</option>)}
            </select>
          </label>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="text-xs uppercase text-muted">
                <tr>
                  <th className="py-1 pr-2">Culture</th>
                  <th className="px-2 py-1 text-right">Pousse</th>
                  <th className="hidden px-2 py-1 text-right sm:table-cell">Repousse</th>
                  <th className="hidden px-2 py-1 text-right sm:table-cell">Graine</th>
                  <th className="px-2 py-1 text-right">Vente</th>
                  <th className="px-2 py-1 text-right">Récoltes</th>
                  <th className="py-1 pl-2 text-right">Profit/j</th>
                </tr>
              </thead>
              <tbody>
                {rows.map(({ crop, harvests, profit }) => (
                  <tr
                    key={crop.id}
                    onClick={() => setSelectedId(crop.id)}
                    className={`cursor-pointer border-t border-wood/15 hover:bg-parchment-dark/60 ${crop.id === selectedId ? 'bg-parchment-dark' : ''} ${harvests === 0 ? 'text-ink/40' : ''}`}
                  >
                    <td className="py-1.5 pr-2 font-medium">
                      <button type="button" className="text-left" onClick={() => setSelectedId(crop.id)}>{crop.name}</button>
                    </td>
                    <td className="px-2 text-right">{growthDays(crop, speed)} j</td>
                    <td className="hidden px-2 text-right sm:table-cell">{crop.regrow ? `${crop.regrow} j` : '—'}</td>
                    <td className="hidden px-2 text-right sm:table-cell">{crop.seed.price ?? '—'}</td>
                    <td className="px-2 text-right">{sellPrice(crop, tiller)}</td>
                    <td className="px-2 text-right">{harvests === null ? '∞' : harvests}</td>
                    <td className="py-1.5 pl-2 text-right">{profit === null ? '—' : profit.toFixed(1)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-2 text-xs text-muted">
            Profit/jour = (récoltes × rendement × prix de vente − graine) ÷ jours jusqu’à la dernière récolte. « ∞ » : pousse toute l’année (Île Gingembre).
          </p>
        </Card>

        <DetailPanel hasSelection={selected !== null} onClose={() => setSelectedId(null)}>
          <CropDetail crop={selected} plant={plant} opts={opts} artisan={artisan} />
        </DetailPanel>
      </div>

      <Card title="Arbres fruitiers" icon="🌳">
        <p className="mb-2 text-sm text-muted">28 jours pour mûrir, puis un fruit par jour pendant leur saison.</p>
        <table className="w-full text-left text-sm">
          <thead className="text-xs uppercase text-muted">
            <tr><th className="py-1">Arbre</th><th className="px-2">Saison</th><th className="px-2 text-right">Jeune plant</th><th className="py-1 pl-2 text-right">Fruit</th></tr>
          </thead>
          <tbody>
            {FRUIT_TREES.map((t) => (
              <tr key={t.id} className="border-t border-wood/15">
                <td className="py-1.5 font-medium">{t.name}</td>
                <td className="px-2">{SEASON_LABELS[t.season]}</td>
                <td className="px-2 text-right">{t.sapling} po</td>
                <td className="py-1.5 pl-2 text-right">{t.fruit} · {t.sell} po</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  )
}

function CropDetail({ crop, plant, opts, artisan }: { crop: Crop | null; plant: GameDate; opts: FarmOptions; artisan: boolean }) {
  if (!crop) {
    return <Card title="Détail"><p className="text-sm text-muted">Choisis une culture dans le tableau.</p></Card>
  }
  const dates = harvestDates(crop, plant, opts.speed)
  const products = artisanProducts(crop, artisan)
  const price = crop.seed.price
  const revenue = totalRevenue(crop, dates.length, opts.tiller)
  const shown = dates.slice(0, 12)

  return (
    <Card title={crop.name}>
      <p className="text-sm text-muted">
        {crop.island ? 'Île Gingembre (toute l’année)' : crop.seasons.map((s) => SEASON_LABELS[s]).join(' / ')}
        {' · '}pousse en {growthDays(crop, opts.speed)} j{crop.regrow ? `, repousse tous les ${crop.regrow} j` : ''}
      </p>
      <p className="mt-1 text-sm">
        Graine : {price === null ? 'prix inconnu' : `${price} po`} ({crop.seed.where}) · Vente : {sellPrice(crop, opts.tiller)} po
      </p>

      {crop.note && <p className="mt-1 text-xs text-muted">{crop.note}</p>}

      <h3 className="mt-3 text-sm font-semibold">Récoltes si plantée le {formatDate(plant)}</h3>
      {dates.length === 0 ? (
        <p className="text-sm text-muted">Aucune récolte possible : {crop.seasons.includes(plant.season) ? 'trop tard dans la saison.' : 'ne pousse pas en cette saison.'}</p>
      ) : (
        <>
          <ul className="mt-1 grid grid-cols-2 gap-x-3 text-sm">
            {shown.map((d) => <li key={`${d.season}-${d.day}-${d.year}`}>{formatDate(d).replace(/, An \d+$/, '')}</li>)}
          </ul>
          {dates.length > shown.length && <p className="text-xs text-muted">… et {dates.length - shown.length} de plus ({dates.length} au total)</p>}
          <p className="mt-2 text-sm">
            {crop.island ? `${dates.length} récoltes sur ${112} jours` : `${dates.length} récolte${dates.length > 1 ? 's' : ''}`}{yieldPerHarvest(crop) > 1 && ` de ${yieldPerHarvest(crop)} unités`} · {revenue} po
            {price !== null && <> · bénéfice {revenue - price} po</>}
          </p>
        </>
      )}

      {products.length > 0 && (
        <>
          <h3 className="mt-3 text-sm font-semibold">Transformation (par unité)</h3>
          <ul className="text-sm">
            {products.map((p) => <li key={p.label}>{p.label} : {p.value} po · ≈ {p.days} j</li>)}
          </ul>
        </>
      )}

      <a className="mt-3 inline-block text-sm text-wood underline" href={`https://fr.stardewvalleywiki.com/${encodeURIComponent(crop.name.replaceAll(' ', '_'))}`} target="_blank" rel="noreferrer">
        Voir sur le wiki ↗
      </a>
    </Card>
  )
}
