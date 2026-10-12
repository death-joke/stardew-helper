import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Card } from '../components/Card'
import { BUNDLE_ROOMS } from '../data/bundles'
import type { Bundle } from '../data/types'
import { SEASONS, SEASON_LABELS } from '../lib/gameDate'
import type { Season } from '../lib/gameDate'
import { availableIn, seasonSummary } from '../lib/bundles'
import { itemLink } from '../lib/links'
import { useGameDate } from '../state/useGameDate'

const field = 'field'

export function Bundles() {
  const { date } = useGameDate()
  const [season, setSeason] = useState<Season>(date.season)
  const [room, setRoom] = useState('toutes')
  const [hideOut, setHideOut] = useState(false)

  const rooms = BUNDLE_ROOMS.filter((r) => room === 'toutes' || r.id === room)

  return (
    <div className="space-y-4">
      <Card title="Paquets du Centre communautaire" icon="🧺">
        <div className="flex flex-wrap items-center gap-2">
          <select aria-label="Salle" value={room} onChange={(e) => setRoom(e.target.value)} className={field}>
            <option value="toutes">Toutes les salles</option>
            {BUNDLE_ROOMS.map((r) => <option key={r.id} value={r.id}>{r.name}</option>)}
          </select>
          <select aria-label="Saison" value={season} onChange={(e) => setSeason(e.target.value as Season)} className={field}>
            {SEASONS.map((s) => <option key={s} value={s}>Disponible en : {SEASON_LABELS[s]}</option>)}
          </select>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" className="check" checked={hideOut} onChange={(e) => setHideOut(e.target.checked)} />
            Masquer les objets hors saison
          </label>
        </div>
        <p className="mt-3 text-sm text-muted">
          Chaque paquet demande un certain nombre d’objets parmi ceux listés. La saison ne s’applique qu’aux cultures, poissons et plantes sauvages : pour les autres objets, rien n’est indiqué.
        </p>
      </Card>

      {rooms.map((r) => (
        <section key={r.id}>
          <h2 className="mb-2 font-pixel text-xs leading-5 text-wood-dark">{r.name}</h2>
          <p className="mb-3 text-sm text-muted">Récompense de la salle : {r.reward}</p>
          <ul className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {r.bundles.map((b) => <BundleCard key={b.id} bundle={b} season={season} hideOut={hideOut} />)}
          </ul>
        </section>
      ))}
    </div>
  )
}

function BundleCard({ bundle, season, hideOut }: { bundle: Bundle; season: Season; hideOut: boolean }) {
  const summary = seasonSummary(bundle, season)
  const items = bundle.items.filter((i) => !(hideOut && availableIn(i, season) === false))

  return (
    <li className="rounded-lg border border-wood/30 bg-card p-3 shadow-sm">
      <h3 className="font-semibold">{bundle.name}</h3>
      <p className="text-sm text-muted">
        {bundle.slots === bundle.items.length ? `Les ${bundle.slots} objets` : `${bundle.slots} objets sur ${bundle.items.length}`}
        {bundle.reward && <> · Récompense : {bundle.reward.qty > 1 && `${bundle.reward.qty} × `}{bundle.reward.name}</>}
      </p>
      <p className="mt-1 text-xs text-muted">
        En {SEASON_LABELS[season].toLowerCase()} : {summary.inSeason} de saison
        {summary.outOfSeason > 0 && `, ${summary.outOfSeason} hors saison`}
        {summary.unknown > 0 && `, ${summary.unknown} non concernés`}.
      </p>
      <ul className="mt-2 space-y-1.5">
        {items.map((i) => {
          const avail = availableIn(i, season)
          const to = itemLink(i.name)
          return (
            <li key={i.name} className={avail === false ? 'italic text-muted' : ''}>
              <div className="flex items-baseline gap-2 text-sm">
                <span aria-hidden className="w-4 shrink-0 text-center">{avail === true ? '✓' : avail === false ? '✕' : '·'}</span>
                <span>
                  {i.qty > 1 && `${i.qty} × `}
                  {to ? <Link to={to} className={avail === false ? 'underline' : 'text-wood underline'}>{i.name}</Link> : i.name}
                  {avail === true && <span className="sr-only"> (de saison)</span>}
                  {avail === false && <span className="sr-only"> (hors saison)</span>}
                </span>
              </div>
              {i.note && <p className="ml-6 text-xs text-muted">{i.note}</p>}
            </li>
          )
        })}
      </ul>
    </li>
  )
}
