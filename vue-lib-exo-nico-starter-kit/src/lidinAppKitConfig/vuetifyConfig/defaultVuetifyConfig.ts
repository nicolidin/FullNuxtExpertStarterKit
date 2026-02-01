import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { dark, light } from "./themes.ts";

export const DEFAULT_VUETIFY_CONFIG = {
  ssr: true,
  theme: {
    defaultTheme: "light",
    themes: {
      light,
      dark,
    },
  },
  components,
  directives,
};
