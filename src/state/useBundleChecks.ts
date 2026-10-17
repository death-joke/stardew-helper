import { useCallback, useEffect, useState } from 'react'
import { EMPTY_CHECKS, isBundleChecks, toggleDone, toggleGot } from '../lib/bundles'
import type { BundleChecks } from '../lib/bundles'

const STORAGE_KEY = 'stardew-helper:bundles'

function load(): BundleChecks {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed: unknown = JSON.parse(raw)
      if (isBundleChecks(parsed)) return parsed
    }
  } catch {
    // stockage indisponible : on repart de zéro
  }
  return EMPTY_CHECKS
}

export function useBundleChecks() {
  const [checks, setChecks] = useState<BundleChecks>(load)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(checks))
    } catch {
      // ignoré
    }
  }, [checks])

  const toggleBundle = useCallback((id: string) => setChecks((c) => toggleDone(c, id)), [])
  const toggleItem = useCallback((id: string, name: string) => setChecks((c) => toggleGot(c, id, name)), [])
  const reset = useCallback(() => setChecks(EMPTY_CHECKS), [])

  return { checks, toggleBundle, toggleItem, reset }
}
