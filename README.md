# Stardew Helper

Compagnon de jeu pour **Stardew Valley 1.6**, en français, utilisable sur téléphone comme sur ordinateur.
Application statique (React + TypeScript + Vite) : aucune donnée n'est envoyée nulle part, tout fonctionne hors ligne une fois chargée.

## Fonctionnalités

- **Aujourd'hui** : festival ou événement du jour, anniversaires à venir avec les cadeaux adorés, rappels (marchand ambulant, fin de saison, dernier jour pour planter, Grand-père…), poissons de saison.
- **Calendrier** : festivals, anniversaires et événements de chaque saison, avec choix de l'année (évaluation de Grand-père en An 3).
- **Agriculture** : profit par jour, récoltes possibles à partir d'une date, engrais et métiers, produits transformés, arbres fruitiers.
- **Pêche** : filtres par saison, météo, heure et lieu, bonus de métier et de qualité, production des étangs à poissons, casiers à crabes.
- **Craft** : 150 recettes d'artisanat et 80 de cuisine, avec filtres et tris (prix, énergie, santé, bonus).
- **Objets** : où trouver minéraux, artefacts, ressources, objets spéciaux, anneaux, livres… (480 entrées avec cultures et poissons).
- **Armes & armures** : armes, chaussures et anneaux.
- **Villageois** : anniversaires, cadeaux par niveau d'appréciation, emploi du temps du jour d'après la date du jeu.
- **Paquets** du Centre communautaire, avec les objets de saison.
- **Recherche globale** (touche `/` sur ordinateur), **mode sombre**, **installation** sur l'écran d'accueil (PWA).

La date du jeu se règle en haut de page et se mémorise sur l'appareil (c'est la seule donnée enregistrée). Il n'y a pas de suivi de progression : le stockage local ne se synchronise pas entre appareils.

## Développement

```bash
npm install
npm run dev        # serveur de développement
npm test           # tests (Vitest)
npm run lint       # oxlint
npm run build      # build de production (+ service worker)
npm run preview    # aperçu du build
npm run release    # (CI) bump de version, CHANGELOG et étiquette vX.Y.Z — voir plus bas
```

## Structure

```
src/data/      données statiques typées (certaines générées, voir scripts/extraction)
src/lib/       logique pure et testée (dates, calculs, filtres, recherche…)
src/state/     date du jeu, thème, chargement des horaires
src/pages/     une page par onglet
src/components composants partagés
scripts/extraction/   scripts d'extraction des données du wiki (outils ponctuels)
.github/workflows/    CI (ci.yml) et publication de l'image (release.yml)
deploy/        configuration nginx de l'image + exemple d'extrait compose
Dockerfile     image nginx + fichiers statiques (amd64 et arm64)
```

## Versions, CI et image Docker

**Commits** : [Conventional Commits](https://www.conventionalcommits.org/fr/) (`feat:`, `fix:`, `chore:`…). Ils décident de la version et alimentent `CHANGELOG.md` :

| Commit | Effet sur la version |
|---|---|
| `fix:`, `chore:`, `docs:`… | correctif (1.2.3 → 1.2.4) |
| `feat:` | mineure (1.2.3 → 1.3.0) |
| `feat!:` ou `BREAKING CHANGE:` | majeure (1.2.3 → 2.0.0) |

**Sur chaque pull request vers `main`** (`ci.yml`) : lint, tests, build, et construction de l'image Docker (amd64 et arm64) sans la publier.

**À chaque fusion sur `main`** (`release.yml`) :
1. mêmes vérifications ;
2. `commit-and-tag-version` calcule la version, met à jour `package.json`, `package-lock.json` et `CHANGELOG.md`, crée le commit `chore(release): X.Y.Z` et l'étiquette `vX.Y.Z` ;
3. l'image est construite à partir de ce commit et publiée sur GHCR : `ghcr.io/<propriétaire>/stardew-helper:X.Y.Z` et `:sha-<commit>` (pas de `latest`, pour que le homelab épingle une version exacte). Le résumé du job indique la ligne `image:` à reprendre.

**Le déploiement n'est pas automatisé** : la nouvelle version se reprend à la main dans le homelab (voir `deploy/compose.yml` pour un exemple d'extrait). La version en cours est affichée en bas de chaque page.

### Première mise en service

- Régler *Settings → Actions → General → Workflow permissions* si besoin (le workflow déclare ses droits : `contents: write`, `packages: write`).
- **Si `main` est protégée** (revue obligatoire), le jeton par défaut ne peut pas pousser le commit de release : créer un jeton personnel (droit *Contents* en écriture sur ce dépôt) et l'enregistrer comme secret `RELEASE_PAT`. Sans protection de branche, rien à faire.
- **Première version** : sans étiquette existante, le calcul automatique part de la version de `package.json` (1.0.0) et pourrait donner 1.1.0 dès le premier `feat:`. Pour obtenir exactement `1.0.0` : donner au tout premier commit le message `chore(release): 1.0.0` (le workflow l'ignore), puis lancer *Actions → Release → Run workflow* avec `release-as` = `1.0.0`. Le lancement manuel sert aussi à forcer une version plus tard (`minor`, `major`, ou un numéro).
- **Visibilité de l'image** : la première publication crée un paquet *privé*, relié au dépôt. Pour que le serveur puisse tirer l'image sans `docker login`, le passer en public (*Packages → stardew-helper → Package settings → Change visibility*) ; sinon, prévoir un jeton `read:packages` sur le serveur.

## Données et licence

Les données proviennent du [Stardew Valley Wiki](https://fr.stardewvalleywiki.com) (version 1.6), publié sous licence
[CC BY-NC-SA 3.0](https://creativecommons.org/licenses/by-nc-sa/3.0/deed.fr) : **usage non commercial, attribution, partage dans les mêmes conditions**.
Les données dérivées incluses dans ce dépôt (`src/data/`) restent soumises à cette licence.
Application non officielle ; Stardew Valley est une création de ConcernedApe.

Limites connues : les cultures de l'Île Gingembre ne sont pas recoupées avec le wiki ; les poissons de l'île n'ont pas de production d'étang
documentée sur le wiki FR ; le profit des cultures ignore les récoltes supplémentaires aléatoires ; avec un accélérateur de croissance, la durée
de pousse peut différer d'un jour du jeu.
