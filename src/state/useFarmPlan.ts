import { useCallback, useEffect, useState } from 'react'
import { EMPTY_PLAN, isFarmPlan } from '../lib/farmPlanner'
import type { FarmPlan } from '../lib/farmPlanner'

const STORAGE_KEY = 'stardew-helper:farm-plan'

function load(): FarmPlan {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed: unknown = JSON.parse(raw)
      if (isFarmPlan(parsed)) return parsed
    }
  } catch {
    // stockage indisponible : on repart d'un plan vide
  }
  return EMPTY_PLAN
}

export function useFarmPlan() {
  const [plan, setPlan] = useState<FarmPlan>(load)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(plan))
    } catch {
      // ignoré
    }
  }, [plan])

  const update = useCallback((fn: (p: FarmPlan) => FarmPlan) => setPlan(fn), [])
  const reset = useCallback(() => setPlan(EMPTY_PLAN), [])

  return { plan, update, reset }
}
