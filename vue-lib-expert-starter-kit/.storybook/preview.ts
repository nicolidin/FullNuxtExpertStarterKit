import "./storybook.scss";

import { createLidinAppKit } from "../src/lidinAppKitConfig/createLidinAppKit";
import { DEFAULT_VUETIFY_CONFIG } from "../src/lidinAppKitConfig/vuetifyConfig/defaultVuetifyConfig";
import { defineComponent } from "vue";
import Layout from "../src/components/Organisms/Layout/Layout.vue";
import { setup } from "@storybook/vue3";
import { createPinia } from "pinia";

/* Core CSS required for Ionic components to work properly */

/* Basic CSS for apps built with Ionic */
export default defineComponent({
  components: { Layout },
});

/* Optional CSS utils that can be commented out */

setup((app) => {
  const pinia = createPinia();
  app.use(pinia); // Register Pinia globally
  const lidinAppKit = createLidinAppKit(DEFAULT_VUETIFY_CONFIG);
  app.use(lidinAppKit);
});

export const decorators = [
  (story, context) => {
    const id = String(context.id || context.title || "").toLowerCase();
    if (id.includes("sidebartags")) {
      return { template: "<story />", components: { story } };
    }
    return { components: { story, Layout }, template: "<Layout><story/></Layout>" };
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
