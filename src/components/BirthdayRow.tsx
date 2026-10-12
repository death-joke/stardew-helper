import type { Villager } from '../data/types'

export function BirthdayRow({ villager, when }: { villager: Villager; when?: string }) {
  const gifts = villager.loves.slice(0, 5)
  return (
    <li className="flex flex-col gap-0.5">
      <span className="font-medium">
        🎂 {villager.name}{when && <span className="ml-2 text-sm font-normal text-muted">{when}</span>}
      </span>
      <span className="text-sm text-ink/80">
        Adore : {gifts.join(', ')}{villager.loves.length > gifts.length ? '…' : ''}
      </span>
    </li>
  )
}
