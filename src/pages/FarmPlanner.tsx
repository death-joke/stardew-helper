import { useMemo, useRef, useState } from 'react'
import type { PointerEvent } from 'react'
import { Card } from '../components/Card'
import { FARM_H, FARM_W, isBlocked } from '../data/farmMap'
import { FRUIT_TREES } from '../data/trees'
import {
  BUILDING_TYPES, KINDS, addObject, canPlace, coverage, footprint, key, layerCoverage, objectAt, paintCrop, planStats, removeAt, sizeOf,
} from '../lib/farmPlanner'
import type { Grid, Layer, ObjectKind, PlacedObject } from '../lib/farmPlanner'
import { useFarmPlan } from '../state/useFarmPlan'

type Tool = 'culture' | 'gomme' | 'deplacer' | ObjectKind

const GRID: Grid = { w: FARM_W, h: FARM_H, blocked: isBlocked }

const TREE_GLYPHS: Record<string, string> = {
  abricotier: '🟠', cerisier: '🍒', oranger: '🍊', pecher: '🍑', pommier: '🍎', grenadier: '🔴',
}

const GLYPHS: Record<ObjectKind, string> = {
  arroseur: '💧',
  'arroseur-qualite': '💦',
  'arroseur-iridium': '🔮',
  epouvantail: '🎃',
  'epouvantail-deluxe': '👹',
  'cabane-junimo': '🍄',
  batiment: '🏠',
  'arbre-fruitier': '🌳',
}

const glyphOf = (o: PlacedObject) =>
  (o.kind === 'batiment' && BUILDING_TYPES.find((b) => b.id === o.variant)?.glyph) ||
  (o.kind === 'arbre-fruitier' && o.variant && TREE_GLYPHS[o.variant]) ||
  GLYPHS[o.kind]

const SOLID: Record<Layer | 'none', string> = {
  arrosage: 'fill-sky-600', protection: 'fill-yellow-500', junimo: 'fill-green-600', arbre: 'fill-emerald-700', none: 'fill-stone-500',
}

const LAYER_STYLE: Record<Layer, { label: string; fill: string; swatch: string }> = {
  arrosage: { label: 'Arrosage', fill: 'fill-sky-500/45', swatch: 'bg-sky-500' },
  protection: { label: 'Protection (corbeaux)', fill: 'fill-yellow-400/45', swatch: 'bg-yellow-400' },
  junimo: { label: 'Récolte Junimo', fill: 'fill-green-500/35', swatch: 'bg-green-500' },
  arbre: { label: 'Zone dégagée des arbres (3×3)', fill: 'fill-violet-500/40', swatch: 'bg-violet-500' },
}

// Les couches dont une culture dépend pour être « couverte ».
const CROP_LAYERS: Layer[] = ['arrosage', 'protection', 'junimo']

const TOOLS: Array<{ id: Tool; label: string; icon: string }> = [
  { id: 'culture', label: 'Culture', icon: '🌱' },
  { id: 'gomme', label: 'Gomme', icon: '🧽' },
  { id: 'arroseur', label: KINDS.arroseur.label, icon: GLYPHS.arroseur },
  { id: 'arroseur-qualite', label: KINDS['arroseur-qualite'].label, icon: GLYPHS['arroseur-qualite'] },
  { id: 'arroseur-iridium', label: KINDS['arroseur-iridium'].label, icon: GLYPHS['arroseur-iridium'] },
  { id: 'epouvantail', label: KINDS.epouvantail.label, icon: GLYPHS.epouvantail },
  { id: 'epouvantail-deluxe', label: KINDS['epouvantail-deluxe'].label, icon: GLYPHS['epouvantail-deluxe'] },
  { id: 'cabane-junimo', label: KINDS['cabane-junimo'].label, icon: GLYPHS['cabane-junimo'] },
  { id: 'batiment', label: 'Bâtiment', icon: GLYPHS.batiment },
  { id: 'arbre-fruitier', label: 'Arbre fruitier', icon: GLYPHS['arbre-fruitier'] },
  { id: 'deplacer', label: 'Défiler', icon: '✋' },
]

const isSprinkler = (t: Tool) => t === 'arroseur' || t === 'arroseur-qualite' || t === 'arroseur-iridium'
const isObjectTool = (t: Tool): t is ObjectKind => t in KINDS

// Un chemin SVG unique par couche : des milliers de <rect> ralentiraient le rendu.
function cellsPath(cells: Iterable<string>): string {
  let d = ''
  for (const c of cells) {
    const [x, y] = c.split(',').map(Number)
    if (x >= 0 && y >= 0 && x < FARM_W && y < FARM_H) d += `M${x} ${y}h1v1h-1z`
  }
  return d
}

export function FarmPlanner() {
  const { plan, update, reset } = useFarmPlan()
  const [tool, setTool] = useState<Tool>('culture')
  const [nozzle, setNozzle] = useState(false)
  const [layers, setLayers] = useState<Record<Layer, boolean>>({ arrosage: true, protection: true, junimo: true, arbre: true })
  const [buildingId, setBuildingId] = useState(BUILDING_TYPES[0].id)
  const [treeId, setTreeId] = useState(FRUIT_TREES[0].id)
  const [highlight, setHighlight] = useState(true)
  const [zoom, setZoom] = useState(12)
  const [hover, setHover] = useState<[number, number] | null>(null)
  const drawing = useRef(false)

  const cover = useMemo(() => layerCoverage(plan), [plan])
  const stats = useMemo(() => planStats(plan), [plan])
  const layerPaths = useMemo(
    () => ({ arrosage: cellsPath(cover.arrosage), protection: cellsPath(cover.protection), junimo: cellsPath(cover.junimo), arbre: cellsPath(cover.arbre) }),
    [cover],
  )
  const trees = useMemo(() => {
    const counts = new Map<string, number>()
    for (const o of plan.objects) if (o.kind === 'arbre-fruitier' && o.variant) counts.set(o.variant, (counts.get(o.variant) ?? 0) + 1)
    return [...counts]
  }, [plan.objects])
  const cropsPath = useMemo(() => cellsPath(plan.crops), [plan.crops])
  const uncoveredPath = useMemo(() => {
    const active = CROP_LAYERS.filter((l) => layers[l])
    if (!highlight || active.length === 0) return ''
    return cellsPath(plan.crops.filter((c) => active.some((l) => !cover[l].has(c))))
  }, [plan.crops, cover, layers, highlight])

  const newObject = (kind: ObjectKind, x: number, y: number): PlacedObject => ({
    kind,
    x,
    y,
    ...(isSprinkler(kind) && nozzle ? { nozzle: true } : {}),
    ...(kind === 'batiment' ? { variant: buildingId } : {}),
    ...(kind === 'arbre-fruitier' ? { variant: treeId } : {}),
  })

  const ghost: PlacedObject | null = hover && isObjectTool(tool) ? newObject(tool, hover[0], hover[1]) : null
  const ghostOk = ghost ? canPlace(plan, ghost, GRID) : false
  const hoverObj = hover && !ghost ? objectAt(plan, hover[0], hover[1]) : undefined
  const previewCells = ghost ? coverage(ghost) : hoverObj ? coverage(hoverObj) : null
  const previewPath = previewCells ? cellsPath(previewCells) : ''

  const tileOf = (e: PointerEvent<SVGSVGElement>): [number, number] => {
    const r = e.currentTarget.getBoundingClientRect()
    return [Math.floor(((e.clientX - r.left) / r.width) * FARM_W), Math.floor(((e.clientY - r.top) / r.height) * FARM_H)]
  }

  const apply = (x: number, y: number, first: boolean) => {
    if (tool === 'culture') update((p) => paintCrop(p, x, y, GRID))
    else if (tool === 'gomme') update((p) => removeAt(p, x, y))
    else if (first && isObjectTool(tool)) {
      update((p) => addObject(p, newObject(tool, x, y), GRID))
    }
  }

  const onDown = (e: PointerEvent<SVGSVGElement>) => {
    if (tool === 'deplacer') return
    e.currentTarget.setPointerCapture(e.pointerId)
    drawing.current = true
    const [x, y] = tileOf(e)
    setHover([x, y])
    apply(x, y, true)
  }

  const onMove = (e: PointerEvent<SVGSVGElement>) => {
    const [x, y] = tileOf(e)
    setHover((h) => (h && h[0] === x && h[1] === y ? h : [x, y]))
    if (drawing.current && (tool === 'culture' || tool === 'gomme')) apply(x, y, false)
  }

  const stop = () => { drawing.current = false }

  const toggleLayer = (l: Layer) => setLayers((s) => ({ ...s, [l]: !s[l] }))

  const confirmReset = () => {
    if (plan.crops.length + plan.objects.length === 0 || window.confirm('Effacer tout le plan de ferme ?')) reset()
  }

  return (
    <div className="space-y-4">
      <Card title="Plan de ferme" icon="📐">
        <p className="mb-3 text-sm text-muted">
          Peins tes cultures, pose bâtiments, arbres fruitiers, arroseurs, épouvantails et cabanes Junimo : leur zone d’effet s’affiche sur la carte de la ferme standard.
          Le plan est gardé sur cet appareil.
        </p>
        <div className="flex flex-wrap gap-1.5" role="radiogroup" aria-label="Outil">
          {TOOLS.map((t) => (
            <button
              key={t.id}
              type="button"
              role="radio"
              aria-checked={tool === t.id}
              onClick={() => setTool(t.id)}
              className={`rounded border px-2 py-1 text-sm ${tool === t.id ? 'border-wood bg-wood text-parchment' : 'border-wood/30 bg-field hover:bg-parchment-dark'}`}
            >
              <span aria-hidden>{t.icon}</span> {t.label}
            </button>
          ))}
        </div>
        {tool === 'batiment' && (
          <select aria-label="Type de bâtiment" value={buildingId} onChange={(e) => setBuildingId(e.target.value)} className="field mt-3">
            {BUILDING_TYPES.map((b) => <option key={b.id} value={b.id}>{b.label} ({b.w}×{b.h})</option>)}
          </select>
        )}
        {tool === 'arbre-fruitier' && (
          <select aria-label="Arbre fruitier" value={treeId} onChange={(e) => setTreeId(e.target.value)} className="field mt-3">
            {FRUIT_TREES.map((t) => <option key={t.id} value={t.id}>{t.name} ({t.fruit})</option>)}
          </select>
        )}
        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
          <label className="flex items-center gap-1.5">
            <input type="checkbox" checked={nozzle} onChange={(e) => setNozzle(e.target.checked)} />
            Buse de projection (nouveaux arroseurs)
          </label>
          {(Object.keys(LAYER_STYLE) as Layer[]).map((l) => (
            <label key={l} className="flex items-center gap-1.5">
              <input type="checkbox" checked={layers[l]} onChange={() => toggleLayer(l)} />
              <span aria-hidden className={`inline-block size-3 rounded-sm ${LAYER_STYLE[l].swatch}`} />
              {LAYER_STYLE[l].label}
            </label>
          ))}
          <label className="flex items-center gap-1.5">
            <input type="checkbox" checked={highlight} onChange={(e) => setHighlight(e.target.checked)} />
            Surligner les cultures non couvertes
          </label>
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-2 text-sm">
          <span>Zoom</span>
          <button type="button" className="field" aria-label="Dézoomer" onClick={() => setZoom((z) => Math.max(6, z - 2))}>−</button>
          <span className="w-10 text-center">{zoom} px</span>
          <button type="button" className="field" aria-label="Zoomer" onClick={() => setZoom((z) => Math.min(32, z + 2))}>+</button>
          <button type="button" className="field ml-auto" onClick={confirmReset}>Réinitialiser</button>
        </div>
      </Card>

      <Card title="Bilan" icon="📊">
        {stats.total === 0 ? (
          <p className="text-sm text-muted">Aucune culture placée.</p>
        ) : (
          <ul className="grid gap-1 text-sm sm:grid-cols-2 lg:grid-cols-4">
            <li><span className="font-semibold">{stats.total}</span> cases de culture</li>
            <li><span className="font-semibold">{stats.watered}</span> arrosées{stats.dry.length > 0 && <span className="text-muted"> ({stats.dry.length} à la main)</span>}</li>
            <li><span className="font-semibold">{stats.scared}</span> protégées{stats.exposed.length > 0 && <span className="text-muted"> ({stats.exposed.length} exposées)</span>}</li>
            <li><span className="font-semibold">{stats.harvested}</span> récoltées par les Junimos{stats.unreached.length > 0 && <span className="text-muted"> ({stats.unreached.length} hors de portée)</span>}</li>
          </ul>
        )}
        {stats.crowded.length > 0 && (
          <p className="mt-2 text-sm text-muted">
            {stats.crowded.length} case{stats.crowded.length > 1 ? 's' : ''} de culture dans la zone 3×3 d’un arbre fruitier : le jeu veut cette zone dégagée pour planter l’arbre.
          </p>
        )}
        {trees.length > 0 && (
          <p className="mt-2 text-sm">
            <span className="font-semibold">Arbres fruitiers : </span>
            {trees.map(([id, n]) => `${n} ${FRUIT_TREES.find((t) => t.id === id)?.name.toLowerCase() ?? id}`).join(', ')}.
          </p>
        )}
      </Card>

      <div className="max-h-[75vh] overflow-auto rounded-lg border border-wood/30 bg-card">
        <div className="relative" style={{ width: FARM_W * zoom, height: FARM_H * zoom }}>
          <img
            src="/maps/standard-farm.png"
            alt="Carte de la ferme standard"
            draggable={false}
            className="absolute inset-0 size-full select-none"
            style={{ imageRendering: 'pixelated' }}
          />
          <svg
            viewBox={`0 0 ${FARM_W} ${FARM_H}`}
            className="absolute inset-0 size-full"
            style={{ touchAction: tool === 'deplacer' ? 'auto' : 'none', cursor: tool === 'deplacer' ? 'grab' : 'crosshair' }}
            onPointerDown={onDown}
            onPointerMove={onMove}
            onPointerUp={stop}
            onPointerCancel={stop}
            onPointerLeave={() => { stop(); setHover(null) }}
          >
            <path d={cropsPath} className="fill-amber-700/80" />
            {(Object.keys(LAYER_STYLE) as Layer[]).map((l) => layers[l] && <path key={l} d={layerPaths[l]} className={LAYER_STYLE[l].fill} />)}
            <path d={uncoveredPath} className="fill-none stroke-red-600" strokeWidth={0.14} />
            {plan.objects.map((o) => {
              const { w, h } = sizeOf(o)
              return (
                <g key={`${o.kind}-${key(o.x, o.y)}`}>
                  <rect x={o.x} y={o.y} width={w} height={h} className={`${SOLID[KINDS[o.kind].layer ?? 'none']} stroke-black/60`} strokeWidth={0.06} />
                  <text x={o.x + w / 2} y={o.y + h / 2} fontSize={Math.min(w, h, 2) * 0.85} textAnchor="middle" dominantBaseline="central" pointerEvents="none">
                    {glyphOf(o)}
                  </text>
                  {o.nozzle && <circle cx={o.x + 0.85} cy={o.y + 0.15} r={0.15} className="fill-orange-500 stroke-black/60" strokeWidth={0.04} />}
                </g>
              )
            })}
            {previewPath && <path d={previewPath} className="fill-white/35" pointerEvents="none" />}
            {ghost && (
              <g pointerEvents="none">
                {footprint(ghost).map((c) => {
                  const [x, y] = c.split(',').map(Number)
                  return <rect key={c} x={x} y={y} width={1} height={1} className={ghostOk ? 'fill-white/60' : 'fill-red-600/70'} />
                })}
              </g>
            )}
            {hover && tool === 'culture' && (
              <rect x={hover[0]} y={hover[1]} width={1} height={1} className={isBlocked(hover[0], hover[1]) ? 'fill-red-600/60' : 'fill-white/50'} pointerEvents="none" />
            )}
          </svg>
        </div>
      </div>

      <p className="text-xs text-muted">
        Carte : <a className="underline" href="https://stardewvalleywiki.com/File:Standard_Farm.png" target="_blank" rel="noreferrer">Stardew Valley Wiki</a> (CC BY-NC-SA 3.0).
        Les zones non constructibles (eau, maison, serre, falaises) sont relevées à la main sur l’image : à quelques cases près.
        Épouvantail : rayon 8 (deluxe : 16). Emprises des bâtiments : wiki (Buildings). Un arbre fruitier demande une zone 3×3 dégagée, sans chevaucher celle d’un autre. Cabane Junimo : zone 17 × 17 autour de sa porte, valeur non recoupée avec le wiki.
      </p>
    </div>
  )
}
