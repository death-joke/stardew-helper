import { useTheme } from '../state/useTheme'
import type { Theme } from '../state/useTheme'

const LABELS: Record<Theme, { icon: string; text: string }> = {
  auto: { icon: '🌗', text: 'Thème automatique' },
  light: { icon: '☀️', text: 'Thème clair' },
  dark: { icon: '🌙', text: 'Thème sombre' },
}

export function ThemeToggle({ className = '' }: { className?: string }) {
  const { theme, cycle } = useTheme()
  const { icon, text } = LABELS[theme]
  return (
    <button
      type="button"
      onClick={cycle}
      aria-label={`${text} (cliquer pour changer)`}
      title={text}
      className={`flex items-center gap-2 rounded border border-wood/40 bg-field px-2 py-1.5 text-sm ${className}`}
    >
      <span aria-hidden>{icon}</span>
      <span>{text.replace('Thème ', '')}</span>
    </button>
  )
}
