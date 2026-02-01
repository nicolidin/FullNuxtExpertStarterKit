# Nuxt Minimal Starter

**Important** : cette application nécessite des **variables d'environnement OIDC / Auth0** pour fonctionner (authentification). Avant de lancer le projet, copiez `.env.dist` vers `.env` et renseignez les variables indiquées dans la section [Setup > Variables d'environnement](#variables-denvironnement). Les valeurs sensibles (OIDC) sont fournies par le formateur.

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

### Variables d'environnement

1. Copier `.env.dist` vers `.env` : `cp .env.dist .env`
2. Renseigner les variables Strapi si besoin (URL, token).
3. **OIDC / Auth0** : les 4 variables suivantes sont sensibles. **Demander au formateur** les valeurs :
   - `NUXT_SESSION_PASSWORD` (secret session, min 32 caractères, ex. : `openssl rand -hex 32`)
   - `NUXT_OAUTH_AUTH0_DOMAIN` (domaine Auth0 sans `https://`)
   - `NUXT_OAUTH_AUTH0_CLIENT_ID`
   - `NUXT_OAUTH_AUTH0_CLIENT_SECRET`

### Installer les dépendances

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

### Développement avec la lib locale (LIB_DEV_MODE)

Quand on travaille à la fois sur l’app Nuxt et sur la lib `vue-lib-exo-nico-corrected`, on peut l’utiliser depuis son **build local** au lieu de `node_modules`. Cela évite de republier la lib à chaque changement.

---

#### 1. Pourquoi c’est configuré comme ça ?

- **Alias** : `vue-lib-exo-corrected` pointe vers la racine de la lib. Le `package.json` de la lib renvoie vers `dist/` pour le JS, donc on consomme toujours le **build** (`dist/`), pas les sources.
- **CSS** : en mode lib, on importe directement `dist/style.css` (chemin absolu). Sinon, on passe par le `package.json` de la lib (`vue-lib-exo-corrected/style.css`).
- **SCSS** : les variables/mixins partagés viennent de `src/styles/` de la lib en mode dev, pour que les overrides SCSS du projet hôte restent cohérents avec la lib.
- **`server.fs.allow`** : Vite ne sert par défaut que les fichiers sous la racine du projet. La lib est en dehors (`../../Common/...`), il faut donc l’autoriser explicitement.
- **`ssr.noExternal`** : en SSR, Nuxt externalise les dépendances. Ici on force à bundle la lib pour que l’alias et le `dist/` soient bien pris en compte côté serveur.
- **`build.transpile`** : on s’assure que le code de la lib est transpilé avec le reste de l’app.

---

#### 2. Récap des réglages dans `nuxt.config.ts`

| Réglage | Rôle |
|--------|------|
| `isLibDev` / `LIB_DEV_MODE` | Active les chemins et alias spécifiques à la lib locale. |
| `resolve.alias['vue-lib-exo-corrected']` | En lib dev : pointe vers la racine de la lib → résolution via `package.json` vers `dist/`. |
| `css` (élément pour la lib) | En lib dev : `path.resolve(libRootPath, 'dist/style.css')`. Sinon : `vue-lib-exo-corrected/style.css`. |
| `vite.css.preprocessorOptions.scss.additionalData` | En lib dev : `@use` vers `src/styles/vue-lib-exo-corrected.scss`. Sinon : via le package. |
| `vite.server.fs.allow` | Autorise l’accès aux fichiers sous la racine du projet **et** sous `libRootPath` (dont `dist/`). |
| `vite.ssr.noExternal` | Inclut la lib dans le bundle SSR pour respecter l’alias et le `dist/`. |
| `build.transpile` | Transpile la lib avec le reste de l’app. |

---

#### 3. Workflow

**Prérequis** : la lib est à `../vue-lib-exo-nico-starter-kit` par rapport à ce projet (même repo FullStarterKit).

1. **Dans la lib** (`vue-lib-exo-nico-corrected`), **une fois** (après un clone ou si `dist/` est vide) :
   ```bash
   yarn build          # génère dist/ + .d.ts
   ```

2. **Dans ce projet** :
   ```bash
   yarn dev:lib        # lance build:watch de la lib en arrière-plan (&) puis nuxi dev
   ```
   `yarn dev:lib` démarre le `build:watch` de la lib en tâche de fond et le serveur Nuxt. Un seul terminal. Au Ctrl+C, le `build:watch` peut continuer ; le fermer ou faire `pkill -f "vite build --watch"` si besoin.

3. **Après une modification dans la lib** :
   - Avec la config actuelle (`emptyOutDir: false` dans la lib), le `dist/` n’est pas vidé avant rebuild, donc les 404 pendant l’écriture sont évitées. Un **rechargement automatique** (HMR) peut se déclencher.
   - Si des 404 réapparaissent au moment du rebuild, on peut réactiver `server.watch.ignored` sur `dist/**` dans `nuxt.config` et faire un **F5** après chaque modification de la lib.

---

#### 4. En cas de problème

- **404 sur `dist/style.css` ou `vue-lib-exo-corrected`**  
  Souvent pendant le rebuild de la lib (fichiers en cours d’écriture). Vérifier que la lib a bien `build.emptyOutDir: false`. Si besoin, remettre `server.watch.ignored: [path.resolve(libRootPath, 'dist', '**')]` et utiliser F5 après les modifs de la lib.

- **“Outside of Vite serving allow list”**  
  Le chemin de la lib n’est pas dans `server.fs.allow`. Vérifier `libRootPath` et que `libRootPath` est bien inclus dans `fs.allow`.

- **Changements de la lib invisibles**  
  Vérifier que `yarn build:watch` tourne et que `dist/` est bien à jour. Si `watch.ignored` exclut `dist/`, le rechargement ne se fera pas tout seul : utiliser F5.

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
