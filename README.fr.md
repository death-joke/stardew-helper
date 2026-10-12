# Stardew Helper

[English](README.md) · **Français**

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

## Utilisation

Stardew Helper est une application web statique : le plus simple pour la lancer est l'image Docker, un petit conteneur nginx (environ 22 Mo) qui sert l'application construite. Trois façons au choix.

### Option 1 — Lancer l'image publiée (recommandé)

Le paquet est **public** : ni connexion ni mot de passe (vérifié avec une configuration Docker vide).

```bash
docker pull ghcr.io/death-joke/stardew-helper:1.0.0
docker run -d --name stardew-helper -p 8080:80 ghcr.io/death-joke/stardew-helper:1.0.0   # http://localhost:8080
```

Ou dans un fichier Compose :

```yaml
services:
  stardew-helper:
    image: ghcr.io/death-joke/stardew-helper:1.0.0
    restart: unless-stopped
    ports:
      - "8080:80"
```

À savoir :

- **Toujours donner une version exacte.** Il n'existe pas de tag `latest` (`docker pull …:latest` répond « not found »). Les versions sont listées dans les sections *Tags* et *Packages* du dépôt et dans `CHANGELOG.md` ; le résumé de chaque release affiche aussi la ligne `image:`.
- **Architectures** : l'image est multi-architecture (amd64 et arm64) ; Docker choisit la bonne tout seul.
- **HTTPS pour les fonctions de l'app** : l'installation sur l'écran d'accueil et le mode hors ligne demandent HTTPS (`localhost` convient). Servie depuis un serveur, l'app doit passer derrière un reverse proxy qui fournit HTTPS.
- **Si le paquet devenait privé**, il faudrait `docker login ghcr.io -u <utilisateur>` avec un jeton personnel ayant le droit `read:packages`.
- **Conservation** : GitHub ne supprime pas les versions d'un paquet de lui-même (sa documentation ne mentionne aucune expiration) : une version reste jusqu'à ce qu'on la supprime à la main, et une version supprimée peut être restaurée sous 30 jours. Le stockage et le trafic des paquets publics sont gratuits (« actuellement gratuits » pour le Container registry, avec au moins un mois de préavis avant tout changement). Chaque version ajoute très peu : les couches nginx sont partagées entre versions, seule la couche de l'application (environ 1 Mo) change. Rien n'est garanti pour toujours, d'où l'option 2.

### Option 2 — Construire l'image soi-même

Seul Docker est nécessaire : Node et la construction de l'app se font dans le build de l'image.

```bash
git clone https://github.com/death-joke/stardew-helper.git
cd stardew-helper
git checkout v1.0.0                  # facultatif : une version précise plutôt que le dernier code
docker build -t stardew-helper:local .
docker run -d --name stardew-helper -p 8080:80 stardew-helper:local   # http://localhost:8080
```

Avec Compose, remplacer `image:` par `build: .` dans l'extrait ci-dessus.

### Option 3 — Sans Docker

Node.js 24+ est nécessaire.

```bash
npm install
npm run build
npm run preview    # http://localhost:4173
```

`npm run dev` lance à la place le serveur de développement (voir [Développement](#développement)). N'importe quel serveur statique peut servir le dossier `dist/`, à condition que les chemins inconnus renvoient `index.html` (l'app utilise des routes côté navigateur comme `/villageois`) : `deploy/nginx.conf` en est un exemple qui fonctionne.

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

**Le déploiement n'est pas automatisé** : la nouvelle version se reprend à la main dans le homelab (voir `deploy/compose.yml` pour un exemple d'extrait, et [Utilisation](#utilisation) pour tirer l'image). La version en cours est affichée en bas de chaque page.

### Première mise en service

- Régler *Settings → Actions → General → Workflow permissions* si besoin (le workflow déclare ses droits : `contents: write`, `packages: write`).
- **Si `main` est protégée** (revue obligatoire), le jeton par défaut ne peut pas pousser le commit de release : créer un jeton personnel (droit *Contents* en écriture sur ce dépôt) et l'enregistrer comme secret `RELEASE_PAT`. Sans protection de branche, rien à faire.
- **Première version** : sans étiquette existante, le calcul automatique part de la version de `package.json` (1.0.0) et pourrait donner 1.1.0 dès le premier `feat:`. Pour obtenir exactement `1.0.0` : faire deux commits (le contenu du projet en `feat:`, puis un commit vide `chore(release): 1.0.0` que le workflow ignore), **les pousser ensemble** (un seul `git push`), puis lancer *Actions → Release → Run workflow* avec `release-as` = `1.0.0`. Le lancement manuel sert aussi à forcer une version plus tard (`minor`, `major`, ou un numéro).
- **Ne pas pousser deux fois de suite sur `main`** : si un second push arrive pendant qu'une release tourne, le push de la branche est refusé. Le workflow utilise `git push --atomic`, donc l'étiquette n'est alors pas publiée non plus (sans cela, une étiquette orpheline resterait sur GitHub et bloquerait la version suivante : à supprimer avec `git push origin --delete vX.Y.Z`).
- **Visibilité de l'image** : le paquet GHCR est relié au dépôt. S'il est public, le serveur tire l'image sans `docker login` ; sinon (*Packages → stardew-helper → Package settings → Change visibility*), prévoir un jeton `read:packages` sur le serveur.

### Protéger `main` (recommandé)

Les fusions sur `main` publient une version : autant les encadrer. Réglages recommandés (*Settings → Rules → Rulesets → New branch ruleset*, cible `main`) :

- interdire la suppression et les pushs forcés ;
- exiger une pull request (0 approbation requise si le dépôt est personnel : on ne peut pas approuver sa propre PR) ;
- exiger les vérifications `Lint, tests & build` et `Docker build (sans publication)` (elles n'apparaissent dans la liste qu'après avoir tourné sur une première PR) ;
- n'autoriser que la **fusion par squash**, avec *le titre de la PR* comme message de commit : le titre de chaque PR doit donc suivre les Conventional Commits, puisque c'est lui qui décide de la version ;
- **liste de contournement : rôle « Repository admin », mode « Toujours »**, indispensable pour que le job de release puisse pousser son commit `chore(release)`.

Le job de release pousse avec le secret `RELEASE_PAT` (jeton fine-grained limité à ce dépôt, droit *Contents : Read and write*, avec une date d'expiration à renouveler). **Créer ce secret avant d'activer la règle**, sinon la release échoue.

## Données et licence

Les données proviennent du [Stardew Valley Wiki](https://fr.stardewvalleywiki.com) (version 1.6), publié sous licence
[CC BY-NC-SA 3.0](https://creativecommons.org/licenses/by-nc-sa/3.0/deed.fr) : **usage non commercial, attribution, partage dans les mêmes conditions**.
Les données dérivées incluses dans ce dépôt (`src/data/`) restent soumises à cette licence.
Application non officielle ; Stardew Valley est une création de ConcernedApe.

Limites connues : les cultures de l'Île Gingembre ne sont pas recoupées avec le wiki ; les poissons de l'île n'ont pas de production d'étang
documentée sur le wiki FR ; le profit des cultures ignore les récoltes supplémentaires aléatoires ; avec un accélérateur de croissance, la durée
de pousse peut différer d'un jour du jeu.
