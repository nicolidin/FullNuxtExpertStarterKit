// plugins/vuetify.ts
import {createLidinAppKit, DEFAULT_VUETIFY_CONFIG} from "vue-lib-exo-corrected";


export default defineNuxtPlugin((nuxtApp) => {
  const lidinAppKit = createLidinAppKit(DEFAULT_VUETIFY_CONFIG);

  nuxtApp.vueApp.use(lidinAppKit);
});
