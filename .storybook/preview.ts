import type { Preview } from "@storybook/react-vite";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    options: {
      storySort: {
        order: [
          "Store",   ["Web Storage", "Memory"],
          "Reading",
          "Writing", ["useStorageMutation — full replace", "patch — partial update", "Write Errors"],
          "Transforms",
          "Sync", ["Cross-tab sync — localStorage"],
          "Errors",
          "Pattern", ["App Structure"],
        ],
      },
    },
  },
};

export default preview;
