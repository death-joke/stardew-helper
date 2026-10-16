# Scripts d'extraction des données

Les fichiers de `src/data/*.ts` marqués « extrait du wiki FR par script » ont été produits avec ces scripts Python
(bibliothèque standard uniquement, pas de dépendance). **Ce sont des outils ponctuels, fournis tels quels** :
ils lisent des téléchargements bruts du wiki dans leur dossier de travail et écrivent dans `src/data/`.
Ils ne sont pas lancés par `npm` et ne forment pas une chaîne automatisée de bout en bout.

## Sources (Stardew Valley Wiki FR, 1.6)

Deux formes de téléchargement, avec `curl` :

- **Texte brut** d'une page : `https://fr.stardewvalleywiki.com/<Page>?action=raw`
  (Poisson, Étang_à_poissons, Récoltes, Liste_de_tous_les_cadeaux, fiches des villageois…).
- **Page rendue** via l'API MediaWiki :
  `https://fr.stardewvalleywiki.com/mediawiki/api.php?action=parse&page=<Page>&prop=text&format=json&formatversion=2`
  (Fabrication, Cuisine, Minéraux, Artefacts, Cueillette, Paquets). Les recettes de cuisine sont à demander par petits
  lots (`{{:<Plat>|RecipeRow}}` dans un `action=parse&text=…`), car la page entière est tronquée par le wiki.
- **Catégories** : `action=query&list=categorymembers&cmtitle=Catégorie:<Nom>` puis le contenu des pages
  (`prop=revisions&rvprop=content&rvslots=main`), voir `fetch_cats.py` et `fetch_cats2.py`.
- **Traduction des clés anglaises** `{{Name|Prismatic Shard}}` : demandée au wiki lui-même
  (`action=parse&text={{Name|<clé>}}`), table gardée dans `en2fr_extra.json` (voir `emit_items.py`).

## Scripts

| Données | Scripts (dans l'ordre) |
|---|---|
| Poissons (`fish.ts`) | `parse_fish.py` → `fish_struct.py` → `gen_fish.py` → `emit_fish.py` |
| Étangs à poissons (`ponds.ts`) | `parse_pond.py` → `emit_pond.py` |
| Recettes (`recipes.ts`) | `tables.py` (extracteur de tableaux HTML) → `emit_recipes.py` |
| Objets (`items.ts`) | `fetch_cats.py`, `fetch_cats2.py` → `emit_items.py` → `emit_items_ts.py` |
| Armes et chaussures (`equipment.ts`) | `emit_weapons.py` |
| Paquets (`bundles.ts`) | `tables.py` → `emit_bundles.py` |
| Quêtes (`quests.ts`) | `Quêtes` rendue via `action=parse` → `tables.py` → `emit_quests.py` |
| Cadeaux et détails des villageois (`villagerDetails.ts`) | `parse_gifts.py` |
| Emplois du temps (`schedules.ts`) | `parse_sched.py` → `emit_sched.py` |
| Cultures (`crops.ts`) | saisies à la main, recoupées avec `parse_crops.py` |
| Constructions et lieux (`buildings.ts`, `places.ts`) | saisis à la main d'après les pages Scierie, Tour du sorcier, Poissonnerie, Île Gingembre et les pages de chaque lieu |

Les chemins (`/Users/…`, noms de fichiers bruts) sont ceux de la session de travail : à adapter pour les relancer.
Après toute régénération, lancer `npm test` : les tests vérifient les effectifs (80 recettes, 31 paquets, 34 villageois…)
et plusieurs valeurs connues.
