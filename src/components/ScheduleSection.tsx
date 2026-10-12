import { useState } from 'react'
import type { ScheduleBlock, VillagerSchedule } from '../data/types'
import { SEASON_LABELS, WEEKDAYS, weekdayIndex } from '../lib/gameDate'
import type { GameDate } from '../lib/gameDate'
import { hasSpecialSchedules, scheduleRowCount, todaySchedule } from '../lib/schedules'

function RowsTable({ block }: { block: ScheduleBlock }) {
  return (
    <ul className="space-y-1 text-sm">
      {block.rows.map(([time, where], i) => (
        <li key={`${time}-${i}`} className="flex gap-3">
          <span className="w-12 shrink-0 font-mono text-xs leading-5 text-muted">{time}</span>
          <span>{where}</span>
        </li>
      ))}
    </ul>
  )
}

/** Emploi du temps d'un villageois : l'horaire du jour (d'après la date du jeu), puis tous les horaires. */
export function ScheduleSection({ schedule, date }: { schedule: VillagerSchedule; date: GameDate }) {
  const today = todaySchedule(schedule, date)
  const seasonLabel = SEASON_LABELS[date.season]
  const labelled = schedule.groups.filter((g) => g.label !== '')
  const groups = schedule.groups.map((g) => g.label)
  const [picked, setPicked] = useState<string | null>(null)
  const active = picked ?? (groups.includes(seasonLabel) ? seasonLabel : groups[0] ?? '')

  if (scheduleRowCount(schedule) === 0) {
    return schedule.intro ? <p className="mt-3 text-sm text-ink/80">{schedule.intro}</p> : null
  }

  return (
    <div className="mt-4">
      <h3 className="text-xs font-semibold uppercase text-muted">Emploi du temps</h3>
      {schedule.intro && (
        <details className="mt-1 text-xs text-muted">
          <summary className="cursor-pointer text-sm font-medium text-ink">Résumé de la journée</summary>
          <p className="mt-1">{schedule.intro}</p>
        </details>
      )}

      <p className="mt-2 text-sm font-semibold">
        Aujourd’hui · {WEEKDAYS[weekdayIndex(date.day)]} {date.day} {seasonLabel}
      </p>
      {today ? (
        <div className="mt-1">
          <p className="mb-1 text-xs text-muted">
            {today.exact ? today.block.title : `Horaire habituel (${today.block.title})`}
          </p>
          <RowsTable block={today.block} />
        </div>
      ) : (
        <p className="mt-1 text-sm text-muted">Pas d’horaire précis pour ce jour : voir tous les horaires ci-dessous.</p>
      )}
      {hasSpecialSchedules(schedule) && (
        <p className="mt-2 text-xs text-muted">Il existe des horaires particuliers (jours de pluie, dates précises…) : ils sont dans « Tous les horaires ».</p>
      )}

      <details className="mt-3 rounded border border-wood/30 bg-card p-2">
        <summary className="cursor-pointer text-sm font-medium">Tous les horaires</summary>
        {labelled.length > 1 && (
          <div role="tablist" className="mt-2 flex flex-wrap gap-1">
            {groups.map((g) => (
              <button
                key={g || 'general'}
                type="button"
                role="tab"
                aria-selected={g === active}
                onClick={() => setPicked(g)}
                className={`rounded px-2 py-1 text-xs ${g === active ? 'bg-wood text-parchment' : 'bg-parchment-dark'}`}
              >
                {g || 'Général'}
              </button>
            ))}
          </div>
        )}
        <div className="mt-2 space-y-1.5">
          {schedule.groups
            .filter((g) => g.label === active)
            .flatMap((g) => g.blocks)
            .map((b, i) => (
              <details key={`${b.title}-${i}`} className="rounded border border-wood/20 bg-parchment/50 px-2 py-1">
                <summary className="cursor-pointer text-sm">{b.title}</summary>
                <div className="mt-1 pb-1"><RowsTable block={b} /></div>
              </details>
            ))}
        </div>
      </details>
    </div>
  )
}
