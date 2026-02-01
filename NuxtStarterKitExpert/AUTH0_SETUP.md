# Auth0 avec nuxt-auth-utils (BFF)

## 1. Auth0 – URLs à configurer

Dans ton application Auth0 (Regular Web Application) :

- **Allowed Callback URLs** : `http://localhost:3000/auth/auth0`
- **Allowed Logout URLs** : `http://localhost:3000`

## 2. Variables d’environnement (.env)

```env
# Session (min 32 caractères). Générer avec : openssl rand -hex 32
NUXT_SESSION_PASSWORD=ton-secret-32-caracteres-minimum

# Auth0 – Domain SANS https:// (ex: dev-xxx.us.auth0.com)
NUXT_OAUTH_AUTH0_DOMAIN=dev-78riiz218tpk7jru.us.auth0.com
NUXT_OAUTH_AUTH0_CLIENT_ID=ton_client_id
NUXT_OAUTH_AUTH0_CLIENT_SECRET=ton_client_secret
```

## 3. Routes

- **Login / callback** : `GET /auth/auth0` (initie le login et reçoit le callback Auth0)
- **Session** : gérée par le module via `/api/_auth/session` (cookie HTTP-only)
- **Exemple protégé** : `GET /api/protected` (nécessite une session)

## 4. Côté serveur (Nitro)

```ts
// Exemple : route protégée
export default defineEventHandler(async (event) => {
  const session = await requireUserSession(event)
  return { user: session.user }
})
```

## 5. Côté client (Vue)

- **Composable** : `useUserSession()` → `loggedIn`, `user`, `session`, `fetch`, `clear`, `openInPopup`
- **Composant** : `<AuthState>` pour afficher login/logout sans flash (prerender/cache)
- **Login** : lien vers `/auth/auth0` ou `openInPopup('/auth/auth0')`
- **Logout** : `clear()` depuis `useUserSession()`

Tout reste côté BFF (Nitro) : session en cookie, pas de token exposé au front.
