import { useState } from 'react'
import { MAX_POPULATION, anythingChance, formatQty, pondDrops, pondOdds, startsWithSingleFish } from '../lib/ponds'

const pct = (p: number) => `${(p * 100).toFixed(p < 0.1 ? 1 : 0).replace('.', ',')} %`

/** Ce que produit un étang à poissons pour une espèce donnée, selon le nombre de poissons. */
export function PondDrops({ species }: { species: string }) {
  const [population, setPopulation] = useState(MAX_POPULATION)
  const drops = pondDrops(species)

  if (drops.length === 0) {
    return <p className="text-sm text-muted">Pas de donnée de production pour cette espèce sur le wiki FR (ou elle ne peut pas être élevée).</p>
  }

  const { rows, nothing } = pondOdds(drops, population)
  const available = rows.filter((r) => r.eligible)
  const locked = rows.filter((r) => !r.eligible)

  return (
    <div className="text-sm">
      <label className="flex items-center gap-2">
        Poissons dans l’étang
        <input
          type="range"
          min={1}
          max={MAX_POPULATION}
          value={population}
          onChange={(e) => setPopulation(Number(e.target.value))}
          aria-label="Nombre de poissons dans l’étang"
          className="flex-1"
        />
        <span className="w-6 text-right font-semibold">{population}</span>
      </label>
      <p className="mt-1 text-xs text-muted">
        Chance qu’un objet apparaisse dans le panier chaque jour : {pct(anythingChance(population))}.
        {startsWithSingleFish(species) && ' Cette espèce commence avec 1 seul poisson ; la capacité augmente avec les quêtes de population.'}
      </p>

      <table className="mt-2 w-full text-left">
        <thead className="text-xs uppercase text-muted">
          <tr><th className="py-1">Objet</th><th className="px-2 text-right">Qté</th><th className="py-1 pl-2 text-right">Par jour</th></tr>
        </thead>
        <tbody>
          {available.map(({ drop, perDay }) => (
            <tr key={`${drop.minPopulation}-${drop.item}-${drop.chance}`} className="border-t border-wood/15">
              <td className="py-1">{drop.item}</td>
              <td className="px-2 text-right">{formatQty(drop)}</td>
              <td className="py-1 pl-2 text-right" title={`${drop.chance} % une fois l’étang en production, testé dans l’ordre`}>{pct(perDay)}</td>
            </tr>
          ))}
          <tr className="border-t border-wood/15 text-muted">
            <td className="py-1" colSpan={2}>Rien</td>
            <td className="py-1 pl-2 text-right">{pct(nothing)}</td>
          </tr>
        </tbody>
      </table>

      {locked.length > 0 && (
        <p className="mt-2 text-xs text-muted">
          Avec plus de poissons : {locked.map(({ drop }) => `${drop.item} (${drop.minPopulation}+)`).join(', ')}.
        </p>
      )}
      <p className="mt-2 text-xs text-muted">Estimation d’après la formule du wiki. Un poisson repêché dans l’étang est toujours de qualité normale.</p>
    </div>
  )
}
