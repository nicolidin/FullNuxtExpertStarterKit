# FullNuxtExpertStarterKit – Formation Nuxt Expert

Starter kit complet pour la formation Nuxt Expert : Strapi + app Nuxt + lib Vue (vue-lib-expert-starter-kit).

**Important** : l’app Nuxt (**NuxtStarterKitExpert**) nécessite des **variables d’environnement OIDC / Auth0** pour fonctionner. Avant de lancer Nuxt, copiez `NuxtStarterKitExpert/.env.dist` vers `NuxtStarterKitExpert/.env` et renseignez les variables (les valeurs sensibles sont fournies par le formateur). Voir le [README de NuxtStarterKitExpert](NuxtStarterKitExpert/README.md#variables-denvironnement).

## Structure

- **Strapi/** – Backend Strapi (notes, tags, articles, community-pinned-notes). À lancer en premier.
- **vue-lib-expert-starter-kit/** – Librairie Vue (composant Tag, types, configs). Pas de schémas Zod (à ajouter en formation).
- **NuxtStarterKitExpert/** – App Nuxt (articles, notes, proxy Strapi simple).

## Démarrage

### 1. Strapi

```bash
cd Strapi
npm install
npm run dev
```

### 2. Lib (build + watch pour dev avec Nuxt)

Dans un premier terminal :

```bash
cd vue-lib-expert-starter-kit
yarn install
yarn build          # une fois (génère dist/)
yarn build:watch    # ou depuis Nuxt : yarn lib:buildPreview
```

### 3. Nuxt (avec lib locale)

Dans un second terminal (ou après avoir lancé `lib:buildPreview` depuis la racine Nuxt) :

```bash
cd NuxtStarterKitExpert
yarn install
yarn dev:lib
```

Ou tout-en-un depuis NuxtStarterKitExpert :

```bash
yarn lib:buildPreview   # lance build:watch de la lib (dans ../vue-lib-expert-starter-kit)
yarn dev:lib            # lance Nuxt en LIB_DEV_MODE (alias vers la lib locale)
```

## Récap

- **Strapi** : `npm run dev` dans `Strapi/`
- **Lib** : `yarn build` puis `yarn build:watch` (ou `yarn lib:buildPreview` depuis NuxtStarterKitExpert)
- **Nuxt** : `yarn dev:lib` dans `NuxtStarterKitExpert/`

Les chemins (alias, libRootPath) sont configurés pour que la lib soit dans `../vue-lib-expert-starter-kit` par rapport à NuxtStarterKitExpert.
