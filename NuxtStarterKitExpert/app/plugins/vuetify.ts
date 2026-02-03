// plugins/vuetify.ts
import {createLidinAppKit, DEFAULT_VUETIFY_CONFIG} from "vue-lib-expert-starter-kit";


export default defineNuxtPlugin((nuxtApp) => {
  const lidinAppKit = createLidinAppKit(DEFAULT_VUETIFY_CONFIG);

  nuxtApp.vueApp.use(lidinAppKit);
});
