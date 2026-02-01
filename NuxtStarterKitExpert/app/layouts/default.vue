<template>
  <v-app class="app">
    <Header />
    <slot name="sidebar" />
    <v-main :style="mainStyle">
      <v-container>
        <slot />
      </v-container>
    </v-main>
    <!-- Footer -->
    <v-footer app>
      <span>&copy; 2024 My Nuxt App</span>
    </v-footer>
  </v-app>
</template>

<script setup>
import Header from "~/components/Organisms/Header/Header.vue";

const slots = useSlots();
const hasSidebar = computed(() => !!slots.sidebar);

const mainStyle = computed(() => ({
  "--v-layout-left": hasSidebar.value ? "256px" : "0px",
  "--v-layout-right": "0px",
  "--v-layout-top": "64px",
  "--v-layout-bottom": "44px",
}));
</script>

<style lang="scss" scoped></style>
