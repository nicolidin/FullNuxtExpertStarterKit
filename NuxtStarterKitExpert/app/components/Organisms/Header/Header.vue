<template>
  <HeaderLayout>
    <!-- Auth (nuxt-auth-utils, BFF) - useUserSession() direct pour éviter erreur Codegen avec AuthState -->
    <div class="header-auth">
      <v-skeleton-loader
        v-if="!authReady"
        type="button"
        width="100"
        class="mr-2"
      />
      <div v-else>
        <div v-if="authLoggedIn" class="auth-section">
          <v-avatar size="32" class="mr-2">
            <v-img
              v-if="authUser?.picture"
              :src="authUser.picture"
              :alt="authUser?.name"
            />
            <v-icon v-else>mdi-account</v-icon>
          </v-avatar>
          <span class="user-name mr-2">{{ authUser?.name || authUser?.email }}</span>
          <v-btn size="small" variant="text" @click="authClear">Déconnexion</v-btn>
        </div>
        <div v-else>
          <a href="/auth/auth0">
            <v-btn size="small" variant="outlined">Se connecter</v-btn>
          </a>
        </div>
      </div>
    </div>

    <v-btn-toggle
      v-model="languageRef"
      mandatory
      size="small"
      class="toggle langToggle"
    >
      <v-btn value="en" size="small"> en </v-btn>
      <v-btn value="fr" size="small"> fr </v-btn>
    </v-btn-toggle>

    <v-btn-toggle
      v-model="colorRef"
      mandatory
      size="small"
      class="toggle themeToggle"
    >
      <v-btn value="dark" size="small"> dark </v-btn>
      <v-btn value="light" size="small"> light </v-btn>
    </v-btn-toggle>
  </HeaderLayout>
</template>

<script setup>
import { HeaderLayout } from "vue-lib-exo-corrected";
import { useLanguage, useTheme } from "vue-lib-exo-corrected";

const { colorRef } = useTheme();
const { languageRef } = useLanguage();

// nuxt-auth-utils (BFF) - sans AuthState pour éviter erreur Codegen
const { loggedIn: authLoggedIn, user: authUser, clear: authClear, ready: authReady } = useUserSession();
</script>
<style lang="scss" scoped>
.header-auth {
  margin-right: 12px;
}

.toggle {
  height: 30px;
  margin-right: 12px;
}

.auth-section {
  display: flex;
  align-items: center;
  margin-right: 12px;

  .user-name {
    font-size: 0.875rem;
    max-width: 150px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>
