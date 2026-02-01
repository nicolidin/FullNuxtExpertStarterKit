import { transformAssetUrls } from 'vite-plugin-vuetify'
import path from 'path'

// LIB_DEV_MODE : consommer vue-lib-exo-corrected depuis son build local (dist/) au lieu de node_modules.
// Voir README § "Développement avec la lib locale (LIB_DEV_MODE)".
const isLibDev = process.env.LIB_DEV_MODE === 'true'
const isCloudflarePreset = process.env.NUXT_PRESET === 'cloudflare-pages'
const libRootPath = path.resolve(
  __dirname,
  '../vue-lib-exo-nico-starter-kit'
)

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  ssr: true,

  modules: [
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt',
    '@nuxtjs/i18n',
    '@nuxt/image',
    'nuxt-auth-utils',
  ],

  plugins: ['~/plugins/vuetify.ts'],

  nitro: {
    preset: process.env.NUXT_PRESET ?? undefined,
    debug: true,
    storage: {
      cache: { driver: 'memory' },
      kv: isCloudflarePreset
        ? { driver: 'cloudflare-kv' }
        : { driver: 'fs', base: './.cache/kv' },
    },
    devStorage: {
      kv: { driver: 'fs', base: './.cache/kv' }, // ← FS en dev (pas besoin de Cloudflare)
    },
    // Alias pour Nitro (serveur) : utiliser le dist compilé même en mode dev
    // car le serveur n'a pas besoin des fichiers source Vue, seulement du code compilé
    alias: isLibDev
      ? { 'vue-lib-exo-corrected': path.resolve(libRootPath, 'dist/vue-lib-exo-corrected.js') }
      : {},
  },

  routeRules: { '/': { prerender: true } },

  image: { domains: [process.env.APP_BASE_URL] },

  css: [
    '@mdi/font/css/materialdesignicons.css',
    '~/assets/main.scss',
    // Lib dev : chemin absolu vers dist/style.css. Sinon : résolution via package.json (exports).
    isLibDev
      ? path.resolve(libRootPath, 'dist/style.css')
      : 'vue-lib-exo-corrected/style.css',
  ],

  vite: {
    cacheDir: 'node_modules/.vite',

    resolve: {
      // Lib dev : "vue-lib-exo-corrected" → racine de la lib ; package.json de la lib envoie vers dist/.
      alias: isLibDev ? { 'vue-lib-exo-corrected': libRootPath } : {},
    },

    optimizeDeps: {
      include: ['vuetify', 'vuetify/components', 'vuetify/directives'],
    },

    server: isLibDev
      ? {
          // Autoriser les fichiers hors projet : la lib (dont dist/) est dans ../vue-lib-exo-nico-starter-kit
          fs: { allow: [path.resolve(__dirname), libRootPath] },
        }
      : undefined,

    css: {
      preprocessorOptions: {
        scss: {
          // Lib dev : Sass ne lit pas le package.json "exports" ; avec l'alias il résout
          // "styles/..." en libRootPath/styles/... (inexistant). On force src/styles/... explicite.
          // Sinon : vue-lib-exo-corrected/styles/... résolu via node_modules + exports.
          additionalData: isLibDev
            ? `@use "${path.resolve(libRootPath, 'src/styles/vue-lib-exo-corrected.scss')}" as *;`
            : `@use "vue-lib-exo-corrected/styles/vue-lib-exo-corrected.scss" as *;`,
        },
      },
    },
  },

  vue: { template: { transformAssetUrls } },

  // Inclure la lib (et vuetify) dans la transpilation pour l'alias et le dist/.
  build: { transpile: ['vuetify', 'vue-lib-exo-corrected'] },

  runtimeConfig: {
    public: {
      appBaseUrl: process.env.APP_BASE_URL,
      isStrapiMock: process.env.STRAPI_MOCK === 'true',
    },
    strapiBearerToken: process.env.STRAPI_BEARER_TOKEN,
    strapiBaseUrl: process.env.STRAPI_BASE_URL,
    // nuxt-auth-utils: session (NUXT_SESSION_PASSWORD in .env)
    // oauth.auth0: NUXT_OAUTH_AUTH0_CLIENT_ID, NUXT_OAUTH_AUTH0_CLIENT_SECRET, NUXT_OAUTH_AUTH0_DOMAIN
    oauth: {
      auth0: {
        clientId: process.env.NUXT_OAUTH_AUTH0_CLIENT_ID,
        clientSecret: process.env.NUXT_OAUTH_AUTH0_CLIENT_SECRET,
        domain: process.env.NUXT_OAUTH_AUTH0_DOMAIN,
      },
    },
  },

  i18n: {
    locales: ['en', 'fr'],
    defaultLocale: 'fr',
    detectBrowserLanguage: false,
    strategy: 'prefix_except_default',
    seo: true,
    vueI18n: './i18n.config.ts',
  },

  app: { rootId: 'nuxt-app' },
})
