<template>
  <v-app-bar app class="header-layout">
    <slot name="left" />
    <v-spacer />
    <slot />
  </v-app-bar>
</template>

<script setup lang="ts">
// Boîte commune réutilisable : structure header (barre + slots).
// Pas de logique métier ; le contenu est fourni par le parent (Header Organism ou Header app).
</script>

<style scoped lang="scss">
.header-layout {
  // Structure commune ; styles spécifiques restent dans le Header consommateur
}
</style>
