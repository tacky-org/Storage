import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { CrossTab } from "./Sync";

const meta: Meta = { title: "Sync" };
export default meta;

export const CrossTabStory: StoryObj = {
  name: "Cross-tab sync — localStorage",
  render: () => <CrossTab />,
};
