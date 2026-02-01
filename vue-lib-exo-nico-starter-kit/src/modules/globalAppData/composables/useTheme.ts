// composables/useThemeToggle.ts
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { useTheme as useVuetifyTheme } from "vuetify";
import {
  type ColorMode,
  useGlobalAppDataStore,
} from "../store/globalAppDataStore.ts";

export function useTheme() {
  const generalDataManager = useGlobalAppDataStore();
  const { color, isDark } = storeToRefs(generalDataManager);

  const theme = useVuetifyTheme(); // This will give access to `vuetify.theme.global`

  const toogleVuetifyTheme = (newTheme: ColorMode) => {
    console.log("theme !: ", theme);
    theme.global.name.value = newTheme;
  };

  const initTheme = () => {
    if (theme) {
      // If Vuetify is already available (likely on SSR hydration), apply theme immediately
      toogleVuetifyTheme(color.value);
    }
  };

  const colorRef = computed<ColorMode>({
    get: () => color.value,
    set: (value) => {
      generalDataManager.toggleTheme();
      toogleVuetifyTheme(value);
    },
  });

  const isDarkRef = computed({
    get: () => isDark.value,
    set: (value) => {
      colorRef.value = value ? "dark" : "light";
    },
  });

  return { isDarkRef, colorRef, initTheme };
}
