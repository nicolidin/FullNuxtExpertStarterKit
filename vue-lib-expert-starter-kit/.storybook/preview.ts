import "./storybook.scss";

import { createLidinAppKit } from "../src/lidinAppKitConfig/createLidinAppKit";
import { DEFAULT_VUETIFY_CONFIG } from "../src/lidinAppKitConfig/vuetifyConfig/defaultVuetifyConfig";
import HeaderLayout from "../src/components/Molecules/HeaderLayout/HeaderLayout.vue";
import { setup } from "@storybook/vue3";
import { createPinia } from "pinia";

setup((app) => {
  const pinia = createPinia();
  app.use(pinia);
  const lidinAppKit = createLidinAppKit(DEFAULT_VUETIFY_CONFIG);
  app.use(lidinAppKit);
});

/** Layout pour les stories : v-app + HeaderLayout (sans sidebar) + zone contenu */
export const decorators = [
  (story, context) => {
    const id = String(context.id || context.title || "").toLowerCase();
    if (id.includes("sidebartags")) {
      return { template: "<story />", components: { story } };
    }
    return {
      components: { story, HeaderLayout },
      template: `
        <v-app>
          <HeaderLayout>Storybook</HeaderLayout>
          <v-main><story /></v-main>
        </v-app>
      `,
    };
  },
];

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  docs: {
    story: {
      inline: false,
      iframeHeight: 400, // Set default iframe height
    },
  },
};
