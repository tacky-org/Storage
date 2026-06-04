import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { WithDefaultValue, WithoutDefaultValue, InlineStates } from "./Reading";

const meta: Meta = { title: "Reading" };
export default meta;

export const Suspense_WithDefault: StoryObj = {
  name: "useStorageSuspenseQuery — with defaultValue",
  render: () => <WithDefaultValue />,
};

export const Suspense_WithoutDefault: StoryObj = {
  name: "useStorageSuspenseQuery — without defaultValue (undefined)",
  render: () => <WithoutDefaultValue />,
};

export const Inline: StoryObj = {
  name: "useStorageQuery — inline loading states",
  render: () => <InlineStates />,
};
