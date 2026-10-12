import type { Festival, InfoTable } from '../data/types'
import { festivalDays } from '../lib/today'

export function FestivalDetails({ festival }: { festival: Festival }) {
  return (
    <div>
      <h3 className="text-lg font-semibold">{festival.name}</h3>
      <p className="text-sm text-muted">
        {festivalDays(festival)} · {festival.hours} · {festival.location}
      </p>
      <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
        {festival.tips.map((t) => <li key={t}>{t}</li>)}
      </ul>
      {festival.tables?.map((t) => <InfoTableView key={t.title} table={t} />)}
      <a
        className="mt-2 inline-block text-sm text-wood underline"
        href={`https://fr.stardewvalleywiki.com/${encodeURI(festival.wiki)}`}
        target="_blank"
        rel="noreferrer"
      >
        Voir sur le wiki ↗
      </a>
    </div>
  )
}

function InfoTableView({ table }: { table: InfoTable }) {
  return (
    <div className="mt-3">
      <h4 className="mb-1 text-sm font-semibold">{table.title}</h4>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="text-xs uppercase text-muted">
            <tr>
              {table.columns.map((c, i) => <th key={c} className={`py-1 ${i === table.columns.length - 1 ? 'pl-2 text-right' : 'pr-2'}`}>{c}</th>)}
            </tr>
          </thead>
          <tbody>
            {table.rows.map((row, r) => (
              <tr key={row.join('|')} className={`border-t border-wood/15 ${table.groupFirst && table.rows[r - 1]?.[0] !== row[0] ? 'border-wood/40' : ''}`}>
                {row.map((cell, i) => (
                  <td key={i} className={`py-1 ${i === row.length - 1 ? 'pl-2 text-right font-medium' : 'pr-2'}`}>
                    {i === 0 && table.groupFirst && table.rows[r - 1]?.[0] === cell ? '' : cell}
                  </td>
                ))}
              </tr>
            ))}
            {table.total && (
              <tr className="border-t-2 border-wood/40 font-semibold">
                {table.total.map((cell, i) => <td key={i} className={`py-1 ${i === table.total!.length - 1 ? 'pl-2 text-right' : 'pr-2'}`}>{cell}</td>)}
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
