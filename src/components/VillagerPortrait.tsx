/** Portrait pixel-art d'un villageois (`public/portraits/<id>.png`, 128×128). Décoratif : le nom est toujours affiché à côté. */
export function VillagerPortrait({ id, className = 'h-10 w-10' }: { id: string; className?: string }) {
  return (
    <img
      src={`${import.meta.env.BASE_URL}portraits/${id}.png`}
      alt=""
      width={128}
      height={128}
      loading="lazy"
      className={`${className} shrink-0 rounded bg-parchment-dark object-contain [image-rendering:pixelated]`}
    />
  )
}
