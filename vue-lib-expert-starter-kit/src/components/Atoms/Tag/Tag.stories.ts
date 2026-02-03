import Tag from "./Tag.vue";

export default {
  title: "Atoms/Tag",
  component: Tag,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Composant tag simple et pur. Affiche une couleur à gauche et le nom du tag à droite.",
      },
    },
  },
};

const Template = (args: any) => ({
  components: { Tag },
  setup() {
    return { args };
  },
  template: `
    <v-app>
      <v-main>
        <div style="padding: 2rem;">
          <Tag v-bind="args" />
        </div>
      </v-main>
    </v-app>
  `,
});

export const Default: any = Template.bind({});
Default.args = {
  name: "Important",
  color: "#FF6B6B",
};

export const Work: any = Template.bind({});
Work.args = {
  name: "Work",
  color: "#4ECDC4",
};

export const Personal: any = Template.bind({});
Personal.args = {
  name: "Personal",
  color: "#45B7D1",
};

export const MultipleTags: any = () => ({
  components: { Tag },
  template: `
    <v-app>
      <v-main>
        <div style="padding: 2rem; display: flex; flex-direction: column; gap: 1rem;">
          <Tag name="Important" color="#FF6B6B" />
          <Tag name="Work" color="#4ECDC4" />
          <Tag name="Personal" color="#45B7D1" />
          <Tag name="Shopping" color="#FFA07A" />
          <Tag name="Ideas" color="#98D8C8" />
        </div>
      </v-main>
    </v-app>
  `,
});

export const ChipStyle: any = Template.bind({});
ChipStyle.args = {
  name: "Important",
  color: "#FF6B6B",
  chipStyle: true,
};

export const MultipleChipTags: any = () => ({
  components: { Tag },
  template: `
    <v-app>
      <v-main>
        <div style="padding: 2rem; display: flex; flex-wrap: wrap; gap: 0.5rem;">
          <Tag name="Important" color="#FF6B6B" :chip-style="true" />
          <Tag name="Work" color="#4ECDC4" :chip-style="true" />
          <Tag name="Personal" color="#45B7D1" :chip-style="true" />
          <Tag name="Shopping" color="#FFA07A" :chip-style="true" />
          <Tag name="Ideas" color="#98D8C8" :chip-style="true" />
        </div>
      </v-main>
    </v-app>
  `,
});

