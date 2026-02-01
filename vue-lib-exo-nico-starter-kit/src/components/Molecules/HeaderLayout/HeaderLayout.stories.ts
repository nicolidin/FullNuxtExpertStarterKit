import HeaderLayout from "./HeaderLayout.vue";

export default {
  title: "Molecules/HeaderLayout",
  component: HeaderLayout,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Boîte commune réutilisable pour la structure du header (v-app-bar + slot gauche + spacer + slot droit). Utilisée par le Header Organism (lib) et le Header de l'app (ex. Nuxt).",
      },
    },
  },
};

export const Default: any = {
  render: () => ({
    components: { HeaderLayout },
    template: `
      <v-app>
        <HeaderLayout>
          <v-btn size="small" variant="text">Droit uniquement</v-btn>
        </HeaderLayout>
        <v-main><div style="padding: 2rem;">Contenu sous le header</div></v-main>
      </v-app>
    `,
  }),
};

export const WithLeftSlot: any = {
  render: () => ({
    components: { HeaderLayout },
    template: `
      <v-app>
        <HeaderLayout>
          <template #left>
            <v-btn size="small" variant="text" class="mr-2">Logo / Nav</v-btn>
          </template>
          <v-btn size="small" variant="text">Zone droite</v-btn>
        </HeaderLayout>
        <v-main><div style="padding: 2rem;">Contenu</div></v-main>
      </v-app>
    `,
  }),
};
