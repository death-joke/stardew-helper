import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Card } from '../components/Card'
import { DetailPanel } from '../components/DetailPanel'
import { ScheduleSection } from '../components/ScheduleSection'
import { VillagerPortrait } from '../components/VillagerPortrait'
import { UNIVERSAL_LIKES, VILLAGER_DETAILS } from '../data/villagerDetails'
import { UNIVERSAL_LOVES, VILLAGERS } from '../data/villagers'
import type { Villager, VillagerSchedule } from '../data/types'
import { SEASONS, SEASON_LABELS } from '../lib/gameDate'
import type { Season } from '../lib/gameDate'
import { itemLink } from '../lib/links'
import { daysUntilBirthday, describeDays, filterVillagers, sortVillagers, villagerByName } from '../lib/villagers'
import type { VillagerSort } from '../lib/villagers'
import { useGameDate } from '../state/useGameDate'
import { useSchedules } from '../state/useSchedules'

const field = 'field'

export function Villagers() {
  const { date } = useGameDate()
  const schedules = useSchedules()
  const [params] = useSearchParams()
  const initialQuery = params.get('q') ?? ''
  const [query, setQuery] = useState(initialQuery)
  const [marriageable, setMarriageable] = useState(false)
  const [season, setSeason] = useState<Season | 'toutes'>('toutes')
  const [sort, setSort] = useState<VillagerSort>('anniversaire')
  const [selectedId, setSelectedId] = useState<string | null>(villagerByName(initialQuery)?.id ?? null)

  const list = sortVillagers(filterVillagers(VILLAGERS, { query, marriageable, season }), sort, date)
  const selected = VILLAGERS.find((v) => v.id === selectedId) ?? null

  return (
    <div className="space-y-4">
      <Card title="Villageois" icon="👥">
        <div className="flex flex-wrap items-center gap-2">
          <input
            type="search"
            aria-label="Rechercher un villageois"
            placeholder="Rechercher un villageois…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className={`${field} w-full sm:w-auto sm:min-w-0 sm:flex-1`}
          />
          <select aria-label="Saison de l’anniversaire" value={season} onChange={(e) => setSeason(e.target.value as Season | 'toutes')} className={field}>
            <option value="toutes">Toutes les saisons</option>
            {SEASONS.map((s) => <option key={s} value={s}>Anniversaire : {SEASON_LABELS[s]}</option>)}
          </select>
          <select aria-label="Trier par" value={sort} onChange={(e) => setSort(e.target.value as VillagerSort)} className={field}>
            <option value="anniversaire">Prochain anniversaire</option>
            <option value="nom">Nom</option>
          </select>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" className="check" checked={marriageable} onChange={(e) => setMarriageable(e.target.checked)} />
            Mariables
          </label>
        </div>
        <p className="mt-3 text-sm text-muted">{list.length} villageois.</p>
      </Card>

      <div className="grid gap-4 lg:grid-cols-[1fr_26rem]">
        <ul className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {list.map((v) => {
            const days = daysUntilBirthday(v, date)
            return (
              <li key={v.id}>
                <button
                  type="button"
                  onClick={() => setSelectedId(v.id)}
                  className={`w-full rounded-lg border p-3 text-left shadow-sm hover:bg-parchment-dark/60 ${v.id === selectedId ? 'border-wood bg-parchment-dark' : 'border-wood/30 bg-card'}`}
                >
                  <span className="flex items-center gap-3">
                    <VillagerPortrait id={v.id} />
                    <span className="min-w-0 flex-1">
                      <span className="flex items-baseline justify-between gap-2">
                        <span className="font-semibold">{v.name}</span>
                        {v.marriageable && <span aria-label="Mariable" title="Mariable">💍</span>}
                      </span>
                      <span className="block text-sm text-muted">🎂 {v.birthday.day} {SEASON_LABELS[v.birthday.season]}</span>
                      <span className={`block text-xs ${days <= 7 ? 'font-semibold text-fall-text' : 'text-muted'}`}>{describeDays(days)}</span>
                    </span>
                  </span>
                </button>
              </li>
            )
          })}
        </ul>

        <DetailPanel hasSelection={selected !== null} onClose={() => setSelectedId(null)}>
          <VillagerDetail villager={selected} schedules={schedules} />
        </DetailPanel>
      </div>

      <Card title="Cadeaux universels" icon="🎁">
        <p className="text-sm"><span className="font-semibold">Adorés par tous : </span>{UNIVERSAL_LOVES.join(', ')}.</p>
        <p className="mt-2 text-sm"><span className="font-semibold">Aimés par tous : </span>{UNIVERSAL_LIKES.join(' · ')}</p>
        <p className="mt-2 text-xs text-muted">Les goûts propres à un villageois l’emportent sur ces règles : la fiche indique ses exceptions.</p>
      </Card>
    </div>
  )
}

function GiftList({ title, items, tone }: { title: string; items: string[]; tone: string }) {
  if (items.length === 0) return null
  return (
    <div className="mt-3">
      <h3 className={`text-xs font-semibold uppercase ${tone}`}>{title}</h3>
      <ul className="mt-1 flex flex-wrap gap-1.5">
        {items.map((name) => {
          const to = itemLink(name)
          return (
            <li key={name}>
              {to ? (
                <Link to={to} className="rounded-full border border-wood/30 bg-parchment px-2 py-0.5 text-xs hover:bg-parchment-dark">{name}</Link>
              ) : (
                <span className="rounded-full border border-wood/20 bg-parchment/60 px-2 py-0.5 text-xs">{name}</span>
              )}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

function VillagerDetail({ villager, schedules }: { villager: Villager | null; schedules: Record<string, VillagerSchedule> | null }) {
  const { date } = useGameDate()
  if (!villager) {
    return <Card title="Détail"><p className="text-sm text-muted">Choisis un villageois dans la liste.</p></Card>
  }
  const d = VILLAGER_DETAILS[villager.id]
  const days = daysUntilBirthday(villager, date)

  return (
    <Card title={villager.name}>
      <dl className="space-y-1 text-sm">
        <div><dt className="inline font-semibold">Anniversaire : </dt><dd className="inline">{villager.birthday.day} {SEASON_LABELS[villager.birthday.season]} ({describeDays(days)})</dd></div>
        <div><dt className="inline font-semibold">Mariable : </dt><dd className="inline">{villager.marriageable ? 'Oui' : 'Non'}</dd></div>
        <div><dt className="inline font-semibold">Lieu : </dt><dd className="inline">{d.location}</dd></div>
        <div><dt className="inline font-semibold">Domicile : </dt><dd className="inline">{d.address}</dd></div>
        {d.family && <div><dt className="inline font-semibold">Famille : </dt><dd className="inline">{d.family}</dd></div>}
      </dl>
      {schedules === null ? (
        <div className="mt-3 min-h-[18rem] text-sm text-muted">Chargement de l’emploi du temps…</div>
      ) : schedules[villager.id] ? (
        <ScheduleSection key={villager.id} schedule={schedules[villager.id]} date={date} />
      ) : (
        d.routine && <p className="mt-2 text-sm text-ink/80">{d.routine}</p>
      )}

      <GiftList title="Adore (+80)" items={villager.loves} tone="text-spring-text" />
      <GiftList title="Aime (+45)" items={d.likes} tone="text-summer-text" />
      <GiftList title="N’aime pas (−20)" items={d.dislikes} tone="text-fall-text" />
      <GiftList title="Déteste (−40)" items={d.hates} tone="text-winter-text" />
      <p className="mt-3 text-xs text-muted">Les cadeaux universels s’appliquent en plus de cette liste (voir plus bas).</p>

      <a
        className="mt-2 inline-block text-sm text-wood underline"
        href={`https://fr.stardewvalleywiki.com/${encodeURIComponent(villager.name)}`}
        target="_blank"
        rel="noreferrer"
      >
        Voir sur le wiki (événements de cœur, citations) ↗
      </a>
    </Card>
  )
}
