import type { ReactNode } from 'react'

export function Card({ title, icon, children, className = '' }: { title: string; icon?: string; children: ReactNode; className?: string }) {
  return (
    <section className={`rounded-lg border border-wood/30 bg-card p-4 shadow-sm ${className}`}>
      <h2 className="mb-3 flex items-center gap-2 font-pixel text-[11px] leading-5 text-wood-dark">
        {icon && <span aria-hidden>{icon}</span>}{title}
      </h2>
      {children}
    </section>
  )
}
