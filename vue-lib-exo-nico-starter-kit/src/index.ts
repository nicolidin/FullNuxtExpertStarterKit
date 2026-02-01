import Tag from "./components/Atoms/Tag/Tag.vue";
import HeaderLayout from "./components/Molecules/HeaderLayout/HeaderLayout.vue";
import { DEFAULT_VUETIFY_CONFIG } from "./lidinAppKitConfig/vuetifyConfig/defaultVuetifyConfig";
import { createLidinAppKit } from "./lidinAppKitConfig/createLidinAppKit";
import { useLanguage } from "./modules/globalAppData/composables/useLanguage";
import { useTheme } from "./modules/globalAppData/composables/useTheme";
import { generateRandomUuid } from "./services/utils/randomId.ts";
import { extractTitleFromMarkdown } from "./services/utils/markdownUtils.ts";

// Types (pas de schémas Zod — à ajouter en formation)
export type { NoteType } from "./types/NoteType";
export type { TagType } from "./types/TagType";

export {
  useLanguage,
  useTheme,
  createLidinAppKit,
  DEFAULT_VUETIFY_CONFIG,
  Tag,
  HeaderLayout,
  generateRandomUuid,
  extractTitleFromMarkdown,
};
