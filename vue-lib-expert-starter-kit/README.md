## Part 1: Project Architecture

### Component Architecture
Our project follows a strict component architecture based on Atomic Design principles. This architecture emphasizes:
- Pure, stateless components for better maintainability
- Clear separation of concerns
- Predictable component behavior
- Easy testing and debugging

For detailed information about our component architecture and guidelines, please refer to the [Component Architecture Guide](./src/components/README.md).

By following these instructions, you can efficiently set up and run the project in both production and development environments. Feel free to explore the scripts for more details on what each command does.

---

## Build et développement avec un projet hôte (ex. Nuxt)

Quand cette lib est utilisée par une app (Nuxt, Vite, etc.) en **mode développement**, on peut l’éditer et voir les changements sans republier. Voici ce qui est configuré pour que ça fonctionne.

### Commandes

| Commande | Rôle |
|----------|------|
| `yarn build` | Build **une fois** : génère `dist/` (JS, CSS) + les `.d.ts` via `vite-plugin-dts`, puis `postprocess-dts`. À lancer après un clone ou quand `dist/` est vide/obsolète. |
| `yarn build:watch` | Build **en continu** : surveille `src/`, rebuild à chaque modification. À lancer **en parallèle** de l’app hôte (ex. `yarn dev:lib` dans Nuxt) quand on travaille sur la lib. |

En mode `build:watch`, le plugin **vite-plugin-dts** est désactivé : il provoque des erreurs (TS5069, TS5104, ENOENT) en watch. Les `.d.ts` du dernier `yarn build` restent valides pour l’IDE et le projet hôte.

### Récap des réglages dans `vite.config.ts`

| Réglage | Rôle |
|---------|------|
| `BUILD_WATCH=1` (dans le script `build:watch`) | Indique qu’on est en watch. Utilisé pour désactiver `vite-plugin-dts` et éviter les erreurs en mode continu. |
| `plugins: [...(isWatch ? [] : [dts()])]` | En watch : on n’exécute pas `dts()`. En build normal : on génère les déclarations. |
| `build.emptyOutDir: false` | On ne vide pas `dist/` avant chaque build. En watch, ça évite la fenêtre où les fichiers sont supprimés puis pas encore réécrits : le projet hôte qui importe `dist/` ne tombe pas en 404 pendant le rebuild. |

### Workflow typique avec un hôte Nuxt (LIB_DEV_MODE)

1. **Lib** : `yarn build` une fois, puis `yarn build:watch` en continu.
2. **Nuxt** : `yarn dev:lib` (ou `LIB_DEV_MODE=true nuxi dev`).
3. Modifier un composant dans la lib → `build:watch` met à jour `dist/` → selon la config de l’hôte, rechargement automatique ou F5.

Pour le détail côté Nuxt (alias, `fs.allow`, CSS, etc.), voir la doc **LIB_DEV_MODE** du projet hôte (ex. NuxtStarterKit).
