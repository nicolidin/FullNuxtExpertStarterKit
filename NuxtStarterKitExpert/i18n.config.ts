// @ts-ignore - JSON imports are handled by Nuxt
import en from '~/locales/en.json'
// @ts-ignore - JSON imports are handled by Nuxt
import fr from '~/locales/fr.json'

// You can use `defineI18nConfig` to get type inferences for options to pass to vue-i18n.
export default defineI18nConfig(() => {
  return {
    legacy: false,
    fallbackLocale: 'en', // Langue de secours
    messages: {
      en,
      fr
    }
  }
})
