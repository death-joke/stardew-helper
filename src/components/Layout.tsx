import { useState } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { DatePicker } from './DatePicker'
import { SearchBox } from './SearchBox'
import { ThemeToggle } from './ThemeToggle'

interface NavItem { to: string; label: string; icon: string; primary?: boolean }

const NAV: NavItem[] = [
  { to: '/', label: "Aujourd'hui", icon: '🏠', primary: true },
  { to: '/calendrier', label: 'Calendrier', icon: '📅', primary: true },
  { to: '/agriculture', label: 'Agriculture', icon: '🌱', primary: true },
  { to: '/peche', label: 'Pêche', icon: '🎣', primary: true },
  { to: '/objets', label: 'Objets', icon: '🎒' },
  { to: '/craft', label: 'Craft', icon: '🔨' },
  { to: '/equipement', label: 'Armes & armures', icon: '🗡️' },
  { to: '/villageois', label: 'Villageois', icon: '👥' },
  { to: '/paquets', label: 'Paquets', icon: '🧺' },
  { to: '/constructions', label: 'Constructions', icon: '🏗️' },
  { to: '/quetes', label: 'Quêtes', icon: '📜' },
  { to: '/lieux', label: 'Lieux', icon: '🗺️' },
]

const PRIMARY = NAV.filter((n) => n.primary)
const SECONDARY = NAV.filter((n) => !n.primary)

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `flex items-center gap-3 rounded px-3 py-2 ${isActive ? 'bg-wood text-parchment' : 'hover:bg-parchment-dark'}`

const tabClass = (active: boolean) =>
  `flex min-w-0 flex-1 flex-col items-center py-2 text-[11px] ${active ? 'font-bold text-wood' : 'text-muted'}`

export function Layout() {
  const { pathname, key: locationKey } = useLocation()
  // Le menu est ouvert pour un chemin donné : il se referme donc de lui-même quand on navigue.
  const [moreFor, setMoreFor] = useState<string | null>(null)
  const moreOpen = moreFor === pathname
  const moreActive = SECONDARY.some((n) => n.to === pathname)

  return (
    <div className="min-h-screen lg:grid lg:grid-cols-[14rem_1fr]">
      {/* Sidebar desktop */}
      <aside className="hidden border-r border-wood/30 bg-parchment-dark/50 p-4 lg:block">
        <h1 className="mb-6 font-pixel text-sm leading-6 text-wood-dark">Stardew Helper</h1>
        <nav className="flex flex-col gap-1">
          {NAV.map((n) => (
            <NavLink key={n.to} to={n.to} end={n.to === '/'} className={linkClass}>
              <span aria-hidden>{n.icon}</span>{n.label}
            </NavLink>
          ))}
        </nav>
        <ThemeToggle className="mt-6" />
      </aside>

      <div className="flex min-w-0 flex-col pb-20 lg:pb-0">
        <header className="z-10 border-b border-wood/30 bg-parchment/95 px-4 py-3 backdrop-blur lg:sticky lg:top-0">
          <div className="mb-2 flex items-center justify-between lg:hidden">
            <h1 className="font-pixel text-xs text-wood-dark">Stardew Helper</h1>
            <ThemeToggle />
          </div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <DatePicker />
            <SearchBox className="w-full lg:ml-auto lg:w-72" />
          </div>
        </header>
        <main className="mx-auto w-full max-w-6xl flex-1 p-4 lg:p-6">
          {/* key : un lien avec paramètres (?q=…) remonte la page pour les relire */}
          <Outlet key={locationKey} />
        </main>
        <footer className="mx-auto w-full max-w-6xl px-4 pb-6 pt-2 text-xs text-muted lg:px-6">
          <p>
            Application non officielle. Stardew Valley est une création de ConcernedApe. Les données viennent du{' '}
            <a className="underline" href="https://fr.stardewvalleywiki.com" target="_blank" rel="noreferrer">Stardew Valley Wiki</a>{' '}
            (version 1.6), sous licence{' '}
            <a className="underline" href="https://creativecommons.org/licenses/by-nc-sa/3.0/deed.fr" target="_blank" rel="noreferrer">CC BY-NC-SA 3.0</a>
            {' '}: usage non commercial, partage dans les mêmes conditions. Version {__APP_VERSION__}.
          </p>
        </footer>
      </div>

      {/* Barre du bas mobile : 4 onglets + « Plus » */}
      <nav className="fixed inset-x-0 bottom-0 z-30 flex border-t border-wood/30 bg-parchment lg:hidden" aria-label="Navigation principale">
        {PRIMARY.map((n) => (
          <NavLink key={n.to} to={n.to} end={n.to === '/'} className={({ isActive }) => tabClass(isActive)}>
            <span className="text-lg" aria-hidden>{n.icon}</span>
            <span className="max-w-full truncate">{n.label}</span>
          </NavLink>
        ))}
        <button
          type="button"
          aria-expanded={moreOpen}
          aria-controls="more-menu"
          onClick={() => setMoreFor(moreOpen ? null : pathname)}
          className={tabClass(moreActive || moreOpen)}
        >
          <span className="text-lg" aria-hidden>⋯</span>
          <span>Plus</span>
        </button>
      </nav>

      {moreOpen && (
        <div id="more-menu" className="fixed inset-x-2 bottom-16 z-30 grid grid-cols-2 gap-1 rounded-lg border border-wood/30 bg-parchment p-2 shadow-xl lg:hidden">
          {SECONDARY.map((n) => (
            <NavLink key={n.to} to={n.to} className={linkClass}>
              <span aria-hidden>{n.icon}</span>{n.label}
            </NavLink>
          ))}
        </div>
      )}
    </div>
  )
}
