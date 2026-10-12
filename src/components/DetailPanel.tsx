import type { ReactNode } from 'react'

/**
 * Détail d'une sélection : panneau latéral collant sur grand écran,
 * volet fixé au-dessus de la barre de navigation sur mobile (visible seulement s'il y a une sélection).
 */
export function DetailPanel({ hasSelection, onClose, children }: { hasSelection: boolean; onClose: () => void; children: ReactNode }) {
  return (
    <div
      className={`${hasSelection ? 'fixed inset-x-2 bottom-16 z-20 max-h-[60vh] overflow-y-auto rounded-lg bg-parchment shadow-xl' : 'hidden'}
        lg:sticky lg:top-24 lg:block lg:max-h-none lg:self-start lg:overflow-visible lg:rounded-none lg:bg-transparent lg:shadow-none`}
    >
      {hasSelection && (
        <button
          type="button"
          aria-label="Fermer le détail"
          onClick={onClose}
          className="absolute right-2 top-2 z-10 rounded px-2 py-1 text-lg leading-none text-wood-dark lg:hidden"
        >
          ✕
        </button>
      )}
      {children}
    </div>
  )
}
