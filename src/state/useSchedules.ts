import { useEffect, useState } from 'react'
import type { VillagerSchedule } from '../data/types'

type Schedules = Record<string, VillagerSchedule>

// Les horaires pèsent environ 170 Ko : chargés à la première utilisation, puis gardés en mémoire.
let cache: Schedules | null = null
let pending: Promise<Schedules> | null = null

function load(): Promise<Schedules> {
  pending ??= import('../data/schedules').then((m) => (cache = m.SCHEDULES))
  return pending
}

export function useSchedules(): Schedules | null {
  const [schedules, setSchedules] = useState<Schedules | null>(cache)
  useEffect(() => {
    if (cache) return
    let alive = true
    load().then((s) => alive && setSchedules(s))
    return () => {
      alive = false
    }
  }, [])
  return schedules
}
