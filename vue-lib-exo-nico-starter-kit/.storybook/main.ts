import path from "path";
import { StorybookConfig } from "@storybook/vue3-vite";

const config: StorybookConfig = {
  stories: [
    "../storybook/stories/**/*.stories.ts",
    "../storybook/stories/**/*.stories.mdx",
    "../src/**/*.stories.ts",
  ],
  addons: [
    "@storybook/addon-essentials",
    "@storybook/addon-links",
    "@storybook/addon-actions",
    "@storybook/addon-interactions",
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
  ],
  framework: {
    name: "@storybook/vue3-vite",
    options: {},
  },
  async viteFinal(config) {
    console.log("🚀 Applying Vite Fixes for ...");

    config.optimizeDeps = {
      exclude: [],
      include: [],
    };

    console.log("✅ Vite Fix Applied.");
    return config;
  },
};

export default config;
