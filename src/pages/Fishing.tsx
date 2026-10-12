import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Card } from '../components/Card'
import { DetailPanel } from '../components/DetailPanel'
import { PondDrops } from '../components/PondDrops'
import { CRAB_POT, FISH, NIGHT_MARKET_FISH } from '../data/fish'
import type { Fish, Habitat } from '../data/types'
import { SEASONS, SEASON_LABELS } from '../lib/gameDate'
import type { Season } from '../lib/gameDate'
import { BEHAVIOR_HELP, HABITAT_LABELS, QUALITIES, formatHour, formatSeasons, formatWindows, isQuestOnly, matchesFilter, sellPrice } from '../lib/fishing'
import type { FishFilter, PriceOptions } from '../lib/fishing'
import { pondSpecies } from '../lib/ponds'
import { useGameDate } from '../state/useGameDate'

const field = 'rounded border border-wood/40 bg-field px-2 py-1.5 text-sm'
const HOURS = Array.from({ length: 20 }, (_, i) => i + 6) // 6h … 1h (25)

export function Fishing() {
  const { date } = useGameDate()
  const [params] = useSearchParams()
  const initialQuery = params.get('q') ?? ''
  // Venu de la recherche : on lève les filtres de saison / météo pour ne pas masquer le poisson cherché.
  const [season, setSeason] = useState<Season | 'toutes'>(initialQuery ? 'toutes' : date.season)
  const [weather, setWeather] = useState<'indifferent' | 'soleil' | 'pluie'>(initialQuery ? 'indifferent' : 'soleil')
  const [hour, setHour] = useState<number | null>(null)
  const [habitat, setHabitat] = useState<Habitat | 'tous'>('tous')
  const [query, setQuery] = useState(initialQuery)
  const [selectedId, setSelectedId] = useState<string | null>(FISH.find((f) => f.name === initialQuery)?.id ?? null)
  const [fisher, setFisher] = useState(false)
  const [angler, setAngler] = useState(false)
  const [quality, setQuality] = useState<PriceOptions['quality']>('normale')
  const [mariner, setMariner] = useState(false)
  const [pondSpeciesName, setPondSpeciesName] = useState('Carpe')

  const profession: PriceOptions['profession'] = angler ? 'maitre' : fisher ? 'pecheur' : 'aucune'
  const price: PriceOptions = { profession, quality }

  const filter: FishFilter = {
    season: season === 'toutes' ? null : season,
    weather: weather === 'indifferent' ? null : weather,
    hour,
    habitat: habitat === 'tous' ? null : habitat,
    query,
  }
  // Du plus cher au moins cher, les poissons réservés à la quête de Monsieur Qi en dernier.
  const rows = FISH.filter((f) => matchesFilter(f, filter)).sort((a, b) => Number(isQuestOnly(a)) - Number(isQuestOnly(b)) || b.price - a.price)
  const selected = FISH.find((f) => f.id === selectedId) ?? null

  return (
    <div className="space-y-4">
      <Card title="Que puis-je pêcher ?" icon="🎣">
        <div className="flex flex-wrap items-center gap-2">
          <select aria-label="Saison" value={season} onChange={(e) => setSeason(e.target.value as Season | 'toutes')} className={field}>
            <option value="toutes">Toutes les saisons</option>
            {SEASONS.map((s) => <option key={s} value={s}>{SEASON_LABELS[s]}</option>)}
          </select>
          <select aria-label="Météo" value={weather} onChange={(e) => setWeather(e.target.value as typeof weather)} className={field}>
            <option value="soleil">☀️ Soleil / vent</option>
            <option value="pluie">🌧️ Pluie</option>
            <option value="indifferent">Météo indifférente</option>
          </select>
          <select
            aria-label="Heure"
            value={hour ?? ''}
            onChange={(e) => setHour(e.target.value === '' ? null : Number(e.target.value))}
            className={field}
          >
            <option value="">Toute heure</option>
            {HOURS.map((h) => <option key={h} value={h}>{formatHour(h)}</option>)}
          </select>
          <select aria-label="Lieu" value={habitat} onChange={(e) => setHabitat(e.target.value as Habitat | 'tous')} className={field}>
            <option value="tous">Tous les lieux</option>
            {(Object.keys(HABITAT_LABELS) as Habitat[]).map((h) => <option key={h} value={h}>{HABITAT_LABELS[h]}</option>)}
          </select>
          <select aria-label="Qualité des poissons" value={quality} onChange={(e) => setQuality(e.target.value as PriceOptions['quality'])} className={field}>
            {QUALITIES.map((q) => <option key={q.id} value={q.id}>{q.label}</option>)}
          </select>
          <input
            type="search"
            aria-label="Rechercher un poisson"
            placeholder="Rechercher…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className={`${field} w-full sm:w-auto sm:min-w-0 sm:flex-1`}
          />
        </div>
        <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm">
          <label className="flex items-center gap-2"><input type="checkbox" checked={fisher} onChange={(e) => setFisher(e.target.checked)} />Pêcheur (+25 %)</label>
          <label className="flex items-center gap-2"><input type="checkbox" checked={angler} onChange={(e) => setAngler(e.target.checked)} />Pêcheur maître (+50 %)</label>
          <label className="flex items-center gap-2"><input type="checkbox" checked={mariner} onChange={(e) => setMariner(e.target.checked)} />Marin</label>
        </div>
        <p className="mt-3 text-sm text-muted">
          {rows.length} poisson{rows.length > 1 ? 's' : ''}. Par défaut : saison et météo « soleil » ; passe en « pluie » pour voir ceux qui ne sortent que sous la pluie.
        </p>
      </Card>

      <div className="grid gap-4 lg:grid-cols-[1fr_22rem]">
        <Card title="Poissons" icon="🐟">
          {rows.length === 0 ? (
            <p className="text-sm text-muted">Aucun poisson avec ces filtres.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="text-xs uppercase text-muted">
                  <tr>
                    <th className="py-1 pr-2">Poisson</th>
                    <th className="hidden px-2 py-1 md:table-cell">Lieu</th>
                    <th className="px-2 py-1">Heures</th>
                    <th className="hidden px-2 py-1 text-right sm:table-cell">Diff.</th>
                    <th className="py-1 pl-2 text-right">Prix</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((f) => (
                    <tr
                      key={f.id}
                      onClick={() => setSelectedId(f.id)}
                      className={`cursor-pointer border-t border-wood/15 hover:bg-parchment-dark/60 ${f.id === selectedId ? 'bg-parchment-dark' : ''}`}
                    >
                      <td className="py-1.5 pr-2 font-medium">
                        <button type="button" className="text-left" onClick={() => setSelectedId(f.id)}>{f.name}</button>
                        {f.legendary && <span className="ml-1 rounded bg-summer/30 px-1 text-xs">légendaire</span>}
                        {f.weather === 'pluie' && <span aria-label="pluie" className="ml-1">🌧️</span>}
                      </td>
                      <td className="hidden px-2 text-ink/80 md:table-cell">{shortWhere(f)}</td>
                      <td className="px-2 whitespace-nowrap">{formatWindows(f.windows)}</td>
                      <td className="hidden px-2 text-right sm:table-cell">{f.difficulty}</td>
                      <td className="py-1.5 pl-2 text-right">{sellPrice(f.price, price)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>

        <DetailPanel hasSelection={selected !== null} onClose={() => setSelectedId(null)}>
          <FishDetail fish={selected} price={price} />
        </DetailPanel>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card title="Marché nocturne (15–17 hiver)" icon="🌙">
          <p className="mb-2 text-sm text-muted">Sous-marin du Marché nocturne : toute la durée du marché, par tous les temps.</p>
          <ul className="space-y-1 text-sm">
            {NIGHT_MARKET_FISH.map((n) => (
              <li key={n.id}><span className="font-medium">{n.name}</span> · {sellPrice(n.price, price)} po · difficulté {n.difficulty} ({n.behavior})</li>
            ))}
          </ul>
        </Card>
        <Card title="Casiers à crabes" icon="🦀">
          <p className="mb-2 text-sm text-muted">{mariner ? 'Avec le métier Marin : plus de déchets, chaque créature du même milieu a la même chance de capture.' : 'Chance de capture sans le métier Marin (les déchets restent possibles).'}</p>
          <table className="w-full text-left text-sm">
            <thead className="text-xs uppercase text-muted">
              <tr><th className="py-1">Créature</th><th className="px-2">Lieu</th><th className="px-2 text-right">Prix</th><th className="py-1 pl-2 text-right">Chance</th></tr>
            </thead>
            <tbody>
              {CRAB_POT.map((c) => (
                <tr key={c.id} className="border-t border-wood/15">
                  <td className="py-1.5 font-medium">{c.name}</td>
                  <td className="px-2">{c.where}</td>
                  <td className="px-2 text-right">{sellPrice(c.price, { profession, quality: 'normale' })}</td>
                  <td className="py-1.5 pl-2 text-right">{mariner ? c.chanceMariner : fmtPct(c.chance)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>

      <Card title="Étang à poissons" icon="🫧">
        <label className="mb-3 flex flex-wrap items-center gap-2 text-sm">
          Espèce
          <select value={pondSpeciesName} onChange={(e) => setPondSpeciesName(e.target.value)} className={field}>
            {pondSpecies().map((n) => <option key={n} value={n}>{n}</option>)}
          </select>
        </label>
        <PondDrops key={pondSpeciesName} species={pondSpeciesName} />
      </Card>
    </div>
  )
}

function fmtPct(s: string): string {
  const n = parseFloat(s.replace(',', '.'))
  return Number.isNaN(n) ? s : `${n.toFixed(1).replace('.', ',')} %`
}

function shortWhere(f: Fish): string {
  return f.legendary ? f.habitats.map((h) => HABITAT_LABELS[h]).join(', ') : f.where
}

function FishDetail({ fish, price }: { fish: Fish | null; price: PriceOptions }) {
  if (!fish) {
    return <Card title="Détail"><p className="text-sm text-muted">Choisis un poisson dans la liste.</p></Card>
  }
  return (
    <Card title={fish.name}>
      <dl className="space-y-1 text-sm">
        <div><dt className="inline font-semibold">Lieu : </dt><dd className="inline">{fish.where}</dd></div>
        <div><dt className="inline font-semibold">Saisons : </dt><dd className="inline">{formatSeasons(fish.seasons, SEASON_LABELS)}</dd></div>
        <div><dt className="inline font-semibold">Heures : </dt><dd className="inline">{formatWindows(fish.windows)}</dd></div>
        <div>
          <dt className="inline font-semibold">Météo : </dt>
          <dd className="inline">{fish.weather === 'tous' ? 'Toutes' : fish.weather === 'pluie' ? 'Pluie' : 'Soleil / vent'}</dd>
        </div>
        <div><dt className="inline font-semibold">Difficulté : </dt><dd className="inline">{fish.difficulty} ({fish.behavior})</dd></div>
        <div><dt className="inline font-semibold">Prix : </dt><dd className="inline">{sellPrice(fish.price, price)} po <span className="text-muted">(base {fish.price})</span></dd></div>
      </dl>
      <p className="mt-2 text-xs text-muted">{BEHAVIOR_HELP[fish.behavior]}</p>
      {fish.notes.length > 0 && (
        <ul className="mt-2 list-disc pl-5 text-sm">{fish.notes.map((n) => <li key={n}>{n}</li>)}</ul>
      )}
      {fish.bundles.length > 0 && (
        <p className="mt-2 text-sm"><span className="font-semibold">Centre communautaire : </span>{fish.bundles.join(', ')}</p>
      )}
      {!fish.legendary && (
        <>
          <h3 className="mt-3 text-sm font-semibold">En étang à poissons</h3>
          <PondDrops key={fish.id} species={fish.name} />
        </>
      )}
      {fish.legendary && <p className="mt-2 text-sm text-muted">Les poissons légendaires ne peuvent pas être élevés en étang.</p>}
      <a
        className="mt-3 inline-block text-sm text-wood underline"
        href={`https://fr.stardewvalleywiki.com/${encodeURIComponent(fish.wiki)}`}
        target="_blank"
        rel="noreferrer"
      >
        Voir sur le wiki ↗
      </a>
    </Card>
  )
}
