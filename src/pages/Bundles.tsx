import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Card } from '../components/Card'
import { BUNDLE_ROOMS } from '../data/bundles'
import type { Bundle } from '../data/types'
import { SEASONS, SEASON_LABELS } from '../lib/gameDate'
import type { Season } from '../lib/gameDate'
import { availableIn, gotCount, isBundleDone, missingByRoom, seasonSummary } from '../lib/bundles'
import type { BundleChecks } from '../lib/bundles'
import { itemLink } from '../lib/links'
import { useBundleChecks } from '../state/useBundleChecks'
import { useGameDate } from '../state/useGameDate'

const field = 'field'

export function Bundles() {
  const { date } = useGameDate()
  const { checks, toggleBundle, toggleItem, reset } = useBundleChecks()
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

      <div className="grid items-start gap-4 lg:grid-cols-[17rem_1fr]">
        <aside className="lg:sticky lg:top-4 lg:max-h-[calc(100vh-2rem)] lg:overflow-y-auto">
          <MissingSummary checks={checks} roomId={room === 'toutes' ? undefined : room} season={season} onReset={reset} />
        </aside>

        <div className="space-y-4">
          {rooms.map((r) => (
            <section key={r.id}>
              <h2 className="mb-2 font-pixel text-xs leading-5 text-wood-dark">{r.name}</h2>
              <p className="mb-3 text-sm text-muted">Récompense de la salle : {r.reward}</p>
              <ul className="grid gap-3 md:grid-cols-2">
                {r.bundles.map((b) => <BundleCard key={b.id} bundle={b} season={season} hideOut={hideOut} checks={checks} onToggleBundle={toggleBundle} onToggleItem={toggleItem} />)}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </div>
  )
}

function MissingSummary({ checks, roomId, season, onReset }: { checks: BundleChecks; roomId?: string; season: Season; onReset: () => void }) {
  const rooms = missingByRoom(checks, roomId)
  const roomName = roomId ? BUNDLE_ROOMS.find((r) => r.id === roomId)?.name : null
  const hasProgress = checks.done.length > 0 || Object.values(checks.got).some((g) => g.length > 0)

  return (
    <Card title={roomName ? `Ce qui manque · ${roomName}` : 'Ce qui manque · toutes les salles'} icon="📋">
      {rooms.length === 0 ? (
        <p className="text-sm">{roomName ? 'Cette salle est terminée 🎉' : 'Tous les paquets sont terminés 🎉'}</p>
      ) : (
        <div className="space-y-4">
          {rooms.map((r) => (
            <section key={r.room.id}>
              {!roomId && <h3 className="mb-1 font-semibold">{r.room.name}</h3>}
              <ul className="space-y-2">
                {r.bundles.map((m) => (
                  <li key={m.bundle.id} className="text-sm">
                    <span className="font-medium">{m.bundle.name}</span>
                    <span className="text-muted">
                      {' '}· {m.remaining === m.items.length ? `tous les ${m.remaining} objets` : `${m.remaining} objet${m.remaining > 1 ? 's' : ''} parmi`}
                    </span>
                    <ul className="ml-4 list-disc text-muted">
                      {m.items.map((i) => {
                        const to = itemLink(i.name)
                        const out = availableIn(i, season) === false
                        return (
                          <li key={i.name} className={out ? 'italic' : ''}>
                            {i.qty > 1 && `${i.qty} × `}
                            {to ? <Link to={to} className="text-wood underline">{i.name}</Link> : i.name}
                            {out && <span className="text-xs"> (hors saison)</span>}
                          </li>
                        )
                      })}
                    </ul>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      )}
      {hasProgress && (
        <button
          type="button"
          className="mt-3 text-xs text-muted underline"
          onClick={() => { if (window.confirm('Effacer toute la progression du Centre communautaire ?')) onReset() }}
        >
          Réinitialiser la progression
        </button>
      )}
    </Card>
  )
}

interface BundleCardProps {
  bundle: Bundle
  season: Season
  hideOut: boolean
  checks: BundleChecks
  onToggleBundle: (id: string) => void
  onToggleItem: (id: string, name: string) => void
}

function BundleCard({ bundle, season, hideOut, checks, onToggleBundle, onToggleItem }: BundleCardProps) {
  const summary = seasonSummary(bundle, season)
  const done = isBundleDone(bundle, checks)
  const got = checks.got[bundle.id] ?? []
  const items = bundle.items.filter((i) => !(hideOut && availableIn(i, season) === false))

  return (
    <li className={`rounded-lg border border-wood/30 bg-card p-3 shadow-sm ${done ? 'opacity-60' : ''}`}>
      <label className="flex items-center gap-2">
        <input type="checkbox" className="check" checked={done} onChange={() => onToggleBundle(bundle.id)} aria-label={`Paquet terminé : ${bundle.name}`} />
        <h3 className={`font-semibold ${done ? 'line-through' : ''}`}>{bundle.name}</h3>
        <span className="ml-auto text-xs text-muted">{done ? bundle.slots : Math.min(gotCount(bundle, checks), bundle.slots)}/{bundle.slots}</span>
      </label>
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
                <input
                  type="checkbox"
                  className="check self-center"
                  checked={got.includes(i.name)}
                  onChange={() => onToggleItem(bundle.id, i.name)}
                  aria-label={`Objet réuni : ${i.name}`}
                />
                <span aria-hidden className="w-4 shrink-0 text-center">{avail === true ? '✓' : avail === false ? '✕' : '·'}</span>
                <span>
                  {i.qty > 1 && `${i.qty} × `}
                  {to ? <Link to={to} className={avail === false ? 'underline' : 'text-wood underline'}>{i.name}</Link> : i.name}
                  {avail === true && <span className="sr-only"> (de saison)</span>}
                  {avail === false && <span className="sr-only"> (hors saison)</span>}
                </span>
              </div>
              {i.note && <p className="ml-[3.15rem] text-xs text-muted">{i.note}</p>}
            </li>
          )
        })}
      </ul>
    </li>
  )
}
