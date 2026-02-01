import { createApp } from "vue";
import App from "./App.vue";
import { createLidinAppKit, DEFAULT_VUETIFY_CONFIG } from "../src";
import { createPinia } from "pinia";

const pinia = createPinia();
const lidinAppKit = createLidinAppKit(DEFAULT_VUETIFY_CONFIG);
const app = createApp(App);
app.use(pinia); // Register Pinia globally
app.use(lidinAppKit);
app.mount("#app");
