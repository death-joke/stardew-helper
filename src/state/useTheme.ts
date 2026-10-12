import { useCallback, useEffect, useState } from 'react'

export type Theme = 'auto' | 'light' | 'dark'

const STORAGE_KEY = 'stardew-helper:theme'
const ORDER: Theme[] = ['auto', 'light', 'dark']
const META_COLORS = { light: '#7a4a21', dark: '#1c1710' }

function load(): Theme {
  try {
    const v = localStorage.getItem(STORAGE_KEY)
    if (v === 'light' || v === 'dark') return v
  } catch {
    // stockage indisponible : thème automatique
  }
  return 'auto'
}

function prefersDark(): boolean {
  return typeof matchMedia === 'function' && matchMedia('(prefers-color-scheme: dark)').matches
}

/** Applique le thème au document ; « auto » laisse la feuille de style suivre le système. */
function apply(theme: Theme) {
  const root = document.documentElement
  if (theme === 'auto') root.removeAttribute('data-theme')
  else root.setAttribute('data-theme', theme)
  const dark = theme === 'dark' || (theme === 'auto' && prefersDark())
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', dark ? META_COLORS.dark : META_COLORS.light)
}

export function useTheme(): { theme: Theme; cycle: () => void } {
  const [theme, setTheme] = useState<Theme>(load)

  useEffect(() => {
    apply(theme)
    try {
      if (theme === 'auto') localStorage.removeItem(STORAGE_KEY)
      else localStorage.setItem(STORAGE_KEY, theme)
    } catch {
      // ignoré
    }
  }, [theme])

  const cycle = useCallback(() => setTheme((t) => ORDER[(ORDER.indexOf(t) + 1) % ORDER.length]), [])
  return { theme, cycle }
}
