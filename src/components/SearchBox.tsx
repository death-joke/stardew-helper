import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { KIND_LABELS, search } from '../lib/search'
import type { SearchEntry } from '../lib/search'

function isTyping(target: EventTarget | null): boolean {
  const el = target as HTMLElement | null
  return !!el && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.tagName === 'SELECT' || el.isContentEditable)
}

/** Recherche globale : objets, poissons, cultures, recettes, villageois, festivals. Raccourci « / » sur PC. */
export function SearchBox({ className = '' }: { className?: string }) {
  const navigate = useNavigate()
  const inputRef = useRef<HTMLInputElement>(null)
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(0)

  const results = open ? search(query) : []

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === '/' && !isTyping(e.target) && !e.metaKey && !e.ctrlKey) {
        e.preventDefault()
        inputRef.current?.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const choose = (entry: SearchEntry) => {
    setQuery('')
    setOpen(false)
    inputRef.current?.blur()
    navigate(entry.to)
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActive((a) => Math.min(a + 1, results.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActive((a) => Math.max(a - 1, 0))
    } else if (e.key === 'Enter' && results[active]) {
      e.preventDefault()
      choose(results[active])
    } else if (e.key === 'Escape') {
      setQuery('')
      setOpen(false)
      inputRef.current?.blur()
    }
  }

  return (
    <div className={`relative ${className}`}>
      <input
        ref={inputRef}
        type="search"
        role="combobox"
        aria-expanded={results.length > 0}
        aria-controls="search-results"
        aria-label="Rechercher partout"
        placeholder="Rechercher partout…  ( / )"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value)
          setOpen(true)
          setActive(0)
        }}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        onKeyDown={onKeyDown}
        className="field w-full"
      />
      {results.length > 0 && (
        <ul
          id="search-results"
          role="listbox"
          className="absolute right-0 top-full z-40 mt-1 max-h-80 w-full overflow-y-auto rounded-lg border border-wood/30 bg-parchment shadow-xl lg:w-[28rem]"
        >
          {results.map((r, i) => (
            <li key={r.key} role="option" aria-selected={i === active}>
              <button
                type="button"
                onMouseDown={(e) => {
                  e.preventDefault() // garde le focus pour que le clic soit pris en compte avant la fermeture
                  choose(r)
                }}
                onMouseEnter={() => setActive(i)}
                className={`flex w-full items-baseline justify-between gap-3 px-3 py-2 text-left text-sm ${i === active ? 'bg-parchment-dark' : ''}`}
              >
                <span className="font-medium">{r.name}</span>
                <span className="shrink-0 text-xs text-muted">{KIND_LABELS[r.kind]} · {r.detail}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
      {open && query.trim().length >= 2 && results.length === 0 && (
        <p className="absolute right-0 top-full z-40 mt-1 w-full rounded-lg border border-wood/30 bg-parchment px-3 py-2 text-sm text-muted shadow-xl lg:w-[28rem]">
          Aucun résultat.
        </p>
      )}
    </div>
  )
}
