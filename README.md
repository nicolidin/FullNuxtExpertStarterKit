# FullNuxtExpertStarterKit – Formation Nuxt Expert

Starter kit complet pour la formation Nuxt Expert : Strapi + app Nuxt + lib Vue (vue-lib-expert-starter-kit).

**Important** : l’app Nuxt (**NuxtStarterKitExpert**) nécessite des **variables d’environnement OIDC / Auth0** pour fonctionner. Copiez `NuxtStarterKitExpert/.env.dist` vers `NuxtStarterKitExpert/.env` avant de lancer Nuxt et renseignez les variables (valeurs fournies par le formateur). Voir le [README de NuxtStarterKitExpert](NuxtStarterKitExpert/README.md#variables-denvironnement).

## Structure

- **Strapi/** – Backend Strapi (notes, tags, articles, community-pinned-notes). À lancer en premier.
- **vue-lib-expert-starter-kit/** – Librairie Vue (composants, types, configs).
- **NuxtStarterKitExpert/** – App Nuxt (articles, notes, proxy Strapi).

## Démarrage – Toutes les commandes

Ordre recommandé : Strapi → Lib → Nuxt.

### 1. Strapi

```bash
cd Strapi
npm install
npm run develop
```

Ouvrir le **portail admin** Strapi (http://localhost:1337/admin) et **se connecter** (créer un compte admin au premier lancement).

### 2. Lib

```bash
cd vue-lib-expert-starter-kit
yarn install
```

### 3. Nuxt

```bash
cd NuxtStarterKitExpert
yarn install
cp .env.dist .env
```

Ensuite, dans **deux terminaux** (ou un seul avec la lib en arrière-plan) :

**Terminal 1 – build watch de la lib :**

```bash
cd NuxtStarterKitExpert
yarn run lib:buildPreview
```

**Terminal 2 – lancer Nuxt en mode lib :**

```bash
cd NuxtStarterKitExpert
yarn run dev:lib
```

## Récap des commandes

| Étape | Dossier | Commandes |
|-------|---------|-----------|
| 1. Strapi | `Strapi/` | `npm install` → `npm run develop` → se connecter au portail admin |
| 2. Lib | `vue-lib-expert-starter-kit/` | `yarn install` |
| 3. Nuxt | `NuxtStarterKitExpert/` | `yarn install` → `cp .env.dist .env` → `yarn run lib:buildPreview` (term. 1) → `yarn run dev:lib` (term. 2) |

Les chemins sont configurés pour que la lib soit dans `../vue-lib-expert-starter-kit` par rapport à NuxtStarterKitExpert.

**Vérification** : une fois tout lancé, Strapi répond sur le portail, la lib tourne en build watch, Nuxt affiche l’app. Voir la slide « Vérifier que tout est bien en place » dans le support de formation.
