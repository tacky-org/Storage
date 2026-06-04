import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { MemoryStore } from "./Memory";

const meta: Meta<typeof MemoryStore> = {
  title: "Store/Memory",
  component: MemoryStore,
};
export default meta;

export const Standard: StoryObj<typeof MemoryStore> = {
  name: "In-memory store",
};
