<template>
  <div class="home">
    <h1 class="home__title">Bienvenue</h1>
    <nav class="home__nav">
      <NuxtLink to="/notes" class="home__link">Mes notes</NuxtLink>
      <NuxtLink to="/ils-ont-ecrit" class="home__link">Ils ont écrit</NuxtLink>
    </nav>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped lang="scss">
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  padding: 2rem;

  &__title {
    font-size: 2rem;
  }

  &__nav {
    display: flex;
    gap: 1rem;
  }

  &__link {
    padding: 0.75rem 1.5rem;
    border-radius: 8px;
    background: rgb(var(--v-theme-primary));
    color: white;
    text-decoration: none;
    transition: opacity 0.2s;

    &:hover {
      opacity: 0.9;
    }
  }
}
</style>
