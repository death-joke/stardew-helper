import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Card } from '../components/Card'
import { BirthdayRow } from '../components/BirthdayRow'
import { FestivalDetails } from '../components/FestivalDetails'
import { DAYS_PER_SEASON, SEASONS, SEASON_LABELS, WEEKDAYS, formatDate, isSameDay } from '../lib/gameDate'
import type { GameDate, Season } from '../lib/gameDate'
import { birthdaysOn, festivalsOn } from '../lib/today'
import { useGameDate } from '../state/useGameDate'

export function Calendar() {
  const { date, setDate } = useGameDate()
  const [params] = useSearchParams()
  const linkedSeason = SEASONS.find((s) => s === params.get('season'))
  const linkedDay = Number(params.get('day'))
  const linkedYear = Math.floor(Number(params.get('year')))
  const [year, setYear] = useState<number>(linkedYear >= 1 ? linkedYear : date.year)
  const [season, setSeason] = useState<Season>(linkedSeason ?? date.season)
  const [selected, setSelected] = useState<number>(linkedSeason && linkedDay >= 1 && linkedDay <= DAYS_PER_SEASON ? linkedDay : date.day)

  const selectedDate: GameDate = { season, day: selected, year }
  const festivals = festivalsOn(selectedDate)
  const birthdays = birthdaysOn(selectedDate)

  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_28rem]">
      <div>
        <label className="mb-2 flex items-center gap-2 text-sm">
          Année
          <input
            type="number"
            min={1}
            aria-label="Année affichée"
            value={year}
            onChange={(e) => setYear(Math.max(1, Math.floor(Number(e.target.value)) || 1))}
            className="field w-20"
          />
        </label>
        <div role="tablist" className="mb-3 flex gap-1">
          {SEASONS.map((s) => (
            <button
              key={s}
              role="tab"
              aria-selected={s === season}
              onClick={() => setSeason(s)}
              className={`flex-1 rounded px-2 py-1.5 text-sm ${s === season ? 'bg-wood text-parchment' : 'bg-parchment-dark hover:bg-parchment-dark/70'}`}
            >
              {SEASON_LABELS[s]}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1 text-center text-xs text-muted">
          {WEEKDAYS.map((w) => <div key={w}>{w.slice(0, 3)}</div>)}
        </div>
        <div className="mt-1 grid grid-cols-7 gap-1">
          {Array.from({ length: DAYS_PER_SEASON }, (_, i) => i + 1).map((day) => {
            const d: GameDate = { season, day, year }
            const festival = festivalsOn(d)[0]
            const hasBirthday = birthdaysOn(d).length > 0
            const isToday = isSameDay(d, date)
            return (
              <button
                key={day}
                onClick={() => setSelected(day)}
                aria-label={`${day} ${SEASON_LABELS[season]}`}
                aria-pressed={day === selected}
                className={`flex aspect-square flex-col items-center justify-between rounded border p-1 text-sm
                  ${day === selected ? 'border-wood bg-wood/15' : 'border-wood/20 bg-card'}
                  ${isToday ? 'ring-2 ring-spring' : ''}`}
              >
                <span>{day}</span>
                <span className="text-xs leading-none" aria-hidden>
                  {festival && (festival.icon ?? '🎪')}{hasBirthday && '🎂'}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      <Card title={formatDate(selectedDate)}>
        {festivals.length === 0 && birthdays.length === 0 && (
          <p className="text-sm text-muted">Rien de prévu ce jour-là.</p>
        )}
        <div className="space-y-4">
          {festivals.map((f) => <FestivalDetails key={f.id} festival={f} />)}
          {birthdays.length > 0 && (
            <ul className="space-y-3">{birthdays.map((v) => <BirthdayRow key={v.id} villager={v} />)}</ul>
          )}
        </div>
        <button
          onClick={() => setDate(selectedDate)}
          disabled={isSameDay(selectedDate, date)}
          className="mt-4 rounded bg-wood px-3 py-1.5 text-sm text-parchment disabled:opacity-40"
        >
          Définir comme aujourd’hui
        </button>
      </Card>
    </div>
  )
}
