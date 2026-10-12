import { DAYS_PER_SEASON, SEASONS, SEASON_LABELS, formatDate } from '../lib/gameDate'
import type { Season } from '../lib/gameDate'
import { useGameDate } from '../state/useGameDate'

const SEASON_BG: Record<Season, string> = {
  printemps: 'bg-spring',
  ete: 'bg-summer',
  automne: 'bg-fall',
  hiver: 'bg-winter',
}

export function DatePicker() {
  const { date, setDate, shift } = useGameDate()
  const field = 'field'

  return (
    <div className="flex flex-wrap items-center gap-2">
      <button
        type="button"
        aria-label="Jour précédent"
        onClick={() => shift(-1)}
        className="rounded bg-wood px-3 py-1.5 text-parchment active:bg-wood-dark"
      >
        ◀
      </button>

      <select
        aria-label="Saison"
        value={date.season}
        onChange={(e) => setDate({ ...date, season: e.target.value as Season })}
        className={field}
      >
        {SEASONS.map((s) => (
          <option key={s} value={s}>{SEASON_LABELS[s]}</option>
        ))}
      </select>

      <select
        aria-label="Jour"
        value={date.day}
        onChange={(e) => setDate({ ...date, day: Number(e.target.value) })}
        className={field}
      >
        {Array.from({ length: DAYS_PER_SEASON }, (_, i) => i + 1).map((d) => (
          <option key={d} value={d}>{d}</option>
        ))}
      </select>

      <label className="flex items-center gap-1 text-sm">
        An
        <input
          type="number"
          min={1}
          aria-label="Année"
          value={date.year}
          onChange={(e) => setDate({ ...date, year: Math.max(1, Math.floor(Number(e.target.value)) || 1) })}
          className={`${field} w-20`}
        />
      </label>

      <button
        type="button"
        aria-label="Jour suivant"
        onClick={() => shift(1)}
        className="rounded bg-wood px-3 py-1.5 text-parchment active:bg-wood-dark"
      >
        ▶
      </button>

      <span className={`${SEASON_BG[date.season]} rounded px-2 py-1 text-sm font-medium text-white`}>
        {formatDate(date)}
      </span>
    </div>
  )
}
