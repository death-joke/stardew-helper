import { createContext, createElement, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { addDays, isValidDate } from '../lib/gameDate'
import type { GameDate } from '../lib/gameDate'

// Seul état persistant de la V1. Point d'extension pour une future synchronisation (V2).
const STORAGE_KEY = 'stardew-helper:date'
const DEFAULT_DATE: GameDate = { season: 'printemps', day: 1, year: 1 }

function load(): GameDate {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed: unknown = JSON.parse(raw)
      if (isValidDate(parsed)) return parsed
    }
  } catch {
    // stockage indisponible : on retombe sur la date par défaut
  }
  return DEFAULT_DATE
}

interface GameDateContextValue {
  date: GameDate
  setDate: (date: GameDate) => void
  shift: (days: number) => void
}

const GameDateContext = createContext<GameDateContextValue | null>(null)

export function GameDateProvider({ children }: { children: ReactNode }) {
  const [date, setDate] = useState<GameDate>(load)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(date))
    } catch {
      // ignoré
    }
  }, [date])

  const shift = useCallback((days: number) => setDate((d) => addDays(d, days)), [])
  const value = useMemo(() => ({ date, setDate, shift }), [date, shift])

  return createElement(GameDateContext.Provider, { value }, children)
}

export function useGameDate(): GameDateContextValue {
  const ctx = useContext(GameDateContext)
  if (!ctx) throw new Error('useGameDate doit être utilisé dans <GameDateProvider>')
  return ctx
}
