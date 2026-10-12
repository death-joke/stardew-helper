# Stardew Helper

**English** · [Français](README.fr.md)

Companion app for **Stardew Valley 1.6**, usable on phones and desktops. The interface and data are in **French**.
It is a static app (React + TypeScript + Vite): nothing is sent anywhere, and everything works offline once loaded.

## Features

Tab names are those of the (French) interface.

- **Aujourd'hui** (Today): today's festival or event, upcoming birthdays with loved gifts, reminders (traveling cart, end of season, last day to plant, Grandpa…), seasonal fish.
- **Calendrier** (Calendar): festivals, birthdays and events for each season, with a year selector (Grandpa's evaluation in Year 3).
- **Agriculture** (Farming): profit per day, possible harvests from a given date, fertilizers and professions, processed goods, fruit trees.
- **Pêche** (Fishing): filters by season, weather, hour and location, profession and quality bonuses, fish pond output, crab pots.
- **Craft**: 150 crafting and 80 cooking recipes, with filters and sorting (price, energy, health, buffs).
- **Objets** (Items): where to find minerals, artifacts, resources, special items, rings, books… (480 entries including crops and fish).
- **Armes & armures** (Weapons & armor): weapons, boots and rings.
- **Villageois** (Villagers): birthdays, gifts by liking level, and today's schedule based on the in-game date.
- **Paquets** (Bundles): Community Center bundles, with seasonal items.
- **Global search** (`/` key on desktop), **dark mode**, and **installation** on the home screen (PWA).

The in-game date is set at the top of the page and remembered on the device (it is the only stored data). There is no progress tracking: local storage does not sync across devices.

## Usage

Stardew Helper is a static web app, so the easiest way to run it is the Docker image: a small nginx container (about 22 MB) that serves the built app. Pick one of the three options below.

### Option 1 — Run the published image (recommended)

The package is **public**: no login and no password are needed (checked with an empty Docker configuration).

```bash
docker pull ghcr.io/death-joke/stardew-helper:1.0.0
docker run -d --name stardew-helper -p 8080:80 ghcr.io/death-joke/stardew-helper:1.0.0   # http://localhost:8080
```

Or in a Compose file:

```yaml
services:
  stardew-helper:
    image: ghcr.io/death-joke/stardew-helper:1.0.0
    restart: unless-stopped
    ports:
      - "8080:80"
```

Good to know:

- **Always give an exact version.** There is no `latest` tag (`docker pull …:latest` answers "not found"). Versions are listed in the repository's *Tags* and *Packages* sections and in `CHANGELOG.md`; each release summary also shows the `image:` line.
- **Architectures**: the image is multi-architecture (amd64 and arm64); Docker picks the right one automatically.
- **HTTPS for the app features**: installing the app on a home screen and the offline mode need HTTPS (`localhost` is fine). When you serve it from a server, put it behind a reverse proxy that provides HTTPS.
- **If the package is ever made private**, pulling requires `docker login ghcr.io -u <user>` with a personal token that has the `read:packages` scope.
- **Storage**: GitHub does not delete package versions on its own (its documentation mentions no expiry): a version stays until it is deleted by hand, and a deleted version can be restored within 30 days. Storage and bandwidth for public packages are free ("currently free" for the Container registry, with at least one month's notice of any change). Each version adds very little, since the nginx layers are shared between versions and only the app layer (about 1 MB) changes. Nothing is guaranteed forever, which is why Option 2 exists.

### Option 2 — Build the image yourself

Only Docker is needed: Node and the build run inside the image build.

```bash
git clone https://github.com/death-joke/stardew-helper.git
cd stardew-helper
git checkout v1.0.0                  # optional: a specific version instead of the latest code
docker build -t stardew-helper:local .
docker run -d --name stardew-helper -p 8080:80 stardew-helper:local   # http://localhost:8080
```

With Compose, replace `image:` by `build: .` in the snippet above.

### Option 3 — Without Docker

You need Node.js 24+.

```bash
npm install
npm run build
npm run preview    # http://localhost:4173
```

`npm run dev` starts the development server instead (see [Development](#development)). Any static server can serve the `dist/` folder, as long as unknown paths fall back to `index.html` (the app uses client-side routes such as `/villageois`): `deploy/nginx.conf` is a working example.

## Development

```bash
npm install
npm run dev        # development server
npm test           # tests (Vitest)
npm run lint       # oxlint
npm run build      # production build (+ service worker)
npm run preview    # preview the build
npm run release    # (CI) version bump, CHANGELOG and vX.Y.Z tag — see below
```

## Structure

```
src/data/      typed static data (some generated, see scripts/extraction)
src/lib/       pure, tested logic (dates, calculations, filters, search…)
src/state/     in-game date, theme, schedule loading
src/pages/     one page per tab
src/components shared components
scripts/extraction/   scripts that extract the data from the wiki (one-off tools)
.github/workflows/    CI (ci.yml) and image publishing (release.yml)
deploy/        nginx configuration of the image + example compose snippet
Dockerfile     nginx image + static files (amd64 and arm64)
```

## Versions, CI and Docker image

**Commits**: [Conventional Commits](https://www.conventionalcommits.org/) (`feat:`, `fix:`, `chore:`…). They decide the version and feed `CHANGELOG.md`:

| Commit | Effect on the version |
|---|---|
| `fix:`, `chore:`, `docs:`… | patch (1.2.3 → 1.2.4) |
| `feat:` | minor (1.2.3 → 1.3.0) |
| `feat!:` or `BREAKING CHANGE:` | major (1.2.3 → 2.0.0) |

**On every pull request to `main`** (`ci.yml`): lint, tests, build, and a Docker image build (amd64 and arm64) without publishing it.

**On every merge to `main`** (`release.yml`):
1. the same checks;
2. `commit-and-tag-version` computes the version, updates `package.json`, `package-lock.json` and `CHANGELOG.md`, and creates the `chore(release): X.Y.Z` commit and the `vX.Y.Z` tag;
3. the image is built from that commit and published to GHCR as `ghcr.io/<owner>/stardew-helper:X.Y.Z` and `:sha-<commit>` (no `latest`, so that the homelab pins an exact version). The job summary shows the `image:` line to copy.

**Deployment is not automated**: the new version is picked up by hand in the homelab (see `deploy/compose.yml` for an example snippet, and [Usage](#usage) for how to pull the image). The running version is displayed at the bottom of every page.

### First setup

- Adjust *Settings → Actions → General → Workflow permissions* if needed (the workflow declares its own permissions: `contents: write`, `packages: write`).
- **First version**: with no existing tag, the automatic computation starts from the `package.json` version (1.0.0) and could produce 1.1.0 on the first `feat:`. To get exactly `1.0.0`: make two commits (the project content as `feat:`, then an empty `chore(release): 1.0.0` commit that the workflow ignores), **push them together** (a single `git push`), then run *Actions → Release → Run workflow* with `release-as` = `1.0.0`. The manual run can also force a version later (`minor`, `major`, or an exact number).
- **Do not push to `main` twice in a row**: if a second push arrives while a release is running, the branch push is rejected. The workflow uses `git push --atomic`, so the tag is not published either (without it, an orphan tag would stay on GitHub and block the next version: delete it with `git push origin --delete vX.Y.Z`).
- **Image visibility**: the GHCR package is linked to the repository. If it is public, the server can pull the image without `docker login`; otherwise (*Packages → stardew-helper → Package settings → Change visibility*), plan for a `read:packages` token on the server.

### Protecting `main` (recommended)

Merges to `main` publish a version, so they are worth guarding. Recommended settings (*Settings → Rules → Rulesets → New branch ruleset*, target `main`):

- block deletions and force pushes;
- require a pull request (0 approvals required for a personal repository: you cannot approve your own PR);
- require the `Lint, tests & build` and `Docker build (sans publication)` checks (they only show up in the list after running on a first PR);
- allow **squash merging only**, with *the PR title* as the commit message: every PR title must therefore follow Conventional Commits, since it decides the version;
- **bypass list: the "Repository admin" role, mode "Always"**, needed so that the release job can push its `chore(release)` commit.

The release job pushes with the `RELEASE_PAT` secret (a fine-grained token limited to this repository, with *Contents: Read and write*, and an expiry date to renew). **Create this secret before enabling the ruleset**, otherwise the release fails.

## Data and license

The data comes from the [Stardew Valley Wiki](https://fr.stardewvalleywiki.com) (version 1.6, French edition), published under the
[CC BY-NC-SA 3.0](https://creativecommons.org/licenses/by-nc-sa/3.0/) license: **non-commercial use, attribution, share-alike**.
The derived data included in this repository (`src/data/`) remains subject to that license.
This is an unofficial app; Stardew Valley is a creation of ConcernedApe.

Known limitations: Ginger Island crops are not cross-checked against the wiki; island fish have no documented pond output on the French wiki;
crop profit ignores random extra harvests; with a growth accelerator, the growth time can differ by one day from the game.
