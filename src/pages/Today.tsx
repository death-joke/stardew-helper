import { Card } from '../components/Card'
import { BirthdayRow } from '../components/BirthdayRow'
import { FestivalDetails } from '../components/FestivalDetails'
import { Link } from 'react-router-dom'
import { SEASON_LABELS, daysLeftInSeason, weekdayName } from '../lib/gameDate'
import { fishLeavingAfter, formatWindows, seasonalFish } from '../lib/fishing'
import { birthdaysOn, BIRTHDAY_LOOKAHEAD, festivalDays, festivalsOn, nextFestival, remindersFor, upcomingBirthdays } from '../lib/today'
import { useGameDate } from '../state/useGameDate'

const LEAVING_FISH_DAYS = 7

export function Today() {
  const { date } = useGameDate()
  const festivals = festivalsOn(date)
  const next = nextFestival(date)
  const birthdays = birthdaysOn(date)
  const soon = upcomingBirthdays(date)
  const reminders = remindersFor(date)
  const topFish = seasonalFish(date.season)
  const leaving = daysLeftInSeason(date) <= LEAVING_FISH_DAYS ? fishLeavingAfter(date.season) : []

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <div className="lg:col-span-2">
        <h2 className="font-pixel text-sm leading-6 text-wood-dark">
          {weekdayName(date)} {date.day} {SEASON_LABELS[date.season]}
        </h2>
      </div>

      {festivals.length > 0 && (
        <Card title="Événement aujourd’hui" icon="🎪" className="border-summer bg-summer/10 lg:col-span-2">
          {festivals.map((f) => <FestivalDetails key={f.id} festival={f} />)}
        </Card>
      )}

      {birthdays.length > 0 && (
        <Card title="Anniversaire aujourd’hui" icon="🎁" className="border-fall bg-fall/10">
          <ul className="space-y-3">{birthdays.map((v) => <BirthdayRow key={v.id} villager={v} />)}</ul>
        </Card>
      )}

      <Card title="Rappels" icon="🔔">
        {reminders.length === 0 ? (
          <p className="text-sm text-muted">Rien de particulier aujourd’hui.</p>
        ) : (
          <ul className="space-y-2 text-sm">
            {reminders.map((r) => <li key={r.id}><span aria-hidden>{r.icon}</span> {r.text}</li>)}
          </ul>
        )}
      </Card>

      {next && (
        <Card title="Prochain événement" icon="📅">
          <p className="mb-2 text-sm text-muted">
            {next.daysUntil === 1 ? 'Demain' : `Dans ${next.daysUntil} jours`} · {festivalDays(next.festival)}
          </p>
          <FestivalDetails festival={next.festival} />
        </Card>
      )}

      <Card title={`Anniversaires (${BIRTHDAY_LOOKAHEAD} prochains jours)`} icon="🎂">
        {soon.length === 0 ? (
          <p className="text-sm text-muted">Aucun anniversaire cette semaine.</p>
        ) : (
          <ul className="space-y-3">
            {soon.map((b) => (
              <BirthdayRow key={b.villager.id} villager={b.villager} when={b.daysUntil === 1 ? 'demain' : `dans ${b.daysUntil} jours`} />
            ))}
          </ul>
        )}
      </Card>

      <Card title={`Poissons de ${SEASON_LABELS[date.season].toLowerCase()}`} icon="🎣">
        <ul className="space-y-1 text-sm">
          {topFish.map((f) => (
            <li key={f.id}>
              <span className="font-medium">{f.name}</span> · {f.price} po · {formatWindows(f.windows)}
            </li>
          ))}
        </ul>
        {leaving.length > 0 && (
          <p className="mt-3 text-sm">
            <span aria-hidden>⚠️</span> Plus pêchables à la saison suivante : {leaving.map((f) => f.name).join(', ')}.
          </p>
        )}
        <Link to="/peche" className="mt-3 inline-block text-sm text-wood underline">Tous les poissons →</Link>
      </Card>
    </div>
  )
}
