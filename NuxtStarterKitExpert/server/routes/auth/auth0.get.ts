/**
 * Route GET /auth/auth0
 * OAuth Auth0 : login + callback (même route, le module gère code ou redirect).
 * Callback URL à configurer dans Auth0 : http://localhost:3000/auth/auth0
 */
const auth0Handler = defineOAuthAuth0EventHandler({
  config: {
    // Passer directement depuis process.env pour éviter problème de runtimeConfig
    domain: process.env.NUXT_OAUTH_AUTH0_DOMAIN,
    clientId: process.env.NUXT_OAUTH_AUTH0_CLIENT_ID,
    clientSecret: process.env.NUXT_OAUTH_AUTH0_CLIENT_SECRET,
    emailRequired: true,
    scope: ['openid', 'profile', 'email'],
    // Log l'URL de redirection qui sera construite
    redirectURL: process.env.APP_BASE_URL ? `${process.env.APP_BASE_URL}/auth/auth0` : undefined,
  },
  async onSuccess(event, { user }) {
    await setUserSession(event, {
      user: {
        sub: user.sub,
        email: user.email,
        name: user.name ?? user.nickname ?? user.email?.split('@')[0],
        picture: user.picture,
      },
      loggedInAt: Date.now(),
    })
    return sendRedirect(event, '/')
  },
  onError(event, error) {
    // Log error for debugging in development
    if (process.env.NODE_ENV === 'development') {
      console.error('[Auth0] OAuth error:', error?.message ?? error)
    }
    return sendRedirect(event, '/')
  },
})

export default auth0Handler
