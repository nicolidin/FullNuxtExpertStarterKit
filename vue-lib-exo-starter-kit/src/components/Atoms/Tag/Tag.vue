<template>
  <div 
    class="tag" 
    :class="{ 'tag--chip': chipStyle }"
    :style="{ '--tag-color': color }"
  >
    <div class="tag__color"></div>
    <span class="tag__name">{{ name }}</span>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    // Nom du tag à afficher
    name: string;
    // Couleur du tag (format hex, rgb, etc.)
    color: string;
    // Si true, applique un style chip avec bordure ovale
    chipStyle?: boolean;
  }>(),
  {
    chipStyle: false,
  }
);
</script>

<style scoped lang="scss">
.tag {
  display: inline-flex;
  align-items: center;
  gap: $spacing-8;

  &--chip {
    padding: 4px 12px;
    border: 1px solid rgba(var(--v-theme-on-surface), 0.12);
    border-radius: 16px;
    background-color: rgba(var(--v-theme-on-surface), 0.04);
  }

  &__color {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: var(--tag-color);
    flex-shrink: 0;
  }

  &__name {
    @include typo-body;
    color: rgba(var(--v-theme-on-surface), 0.87);
    white-space: nowrap;
  }
}
</style>

