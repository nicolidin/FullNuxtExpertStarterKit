// composables/useLanguageToggle.ts
import { computed } from "vue";
import { useI18n } from "vue-i18n";

export function useLanguage() {
  const { locale } = useI18n();

  const languageRef = computed({
    get: () => locale.value,
    set: (value) => {
      locale.value = value;
    },
  });
  //
  const isEnglishRef = computed({
    get: () => locale.value === "en",
    set: (value) => {
      locale.value = value ? "en" : "fr";
    },
  });

  return { languageRef, isEnglishRef };
}
