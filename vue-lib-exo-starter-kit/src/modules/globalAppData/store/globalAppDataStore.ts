// src/modules/globalAppData/store/globalAppDataStore.ts
import { defineStore } from "pinia";
import { ref, computed } from "vue";

export type ColorMode = "dark" | "light" | "red";

export const useGlobalAppDataStore = defineStore("globalAppData", () => {
  const colorMode = ref<ColorMode>("light");

  const isDark = computed(() => colorMode.value === "dark");
  const color = computed<ColorMode>(() => colorMode.value);

  function toggleTheme() {
    colorMode.value = colorMode.value === "dark" ? "light" : "dark";
  }

  function manuallySwitchThemeColor(mode: ColorMode) {
    colorMode.value = mode;
  }

  return {
    colorMode,
    isDark,
    color,
    toggleTheme,
    manuallySwitchThemeColor,
  };
});
