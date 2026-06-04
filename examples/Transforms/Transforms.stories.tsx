import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Transforms } from "./Transforms";

const meta: Meta<typeof Transforms> = {
  title: "Transforms",
  component: Transforms,
};
export default meta;

export const MapUnmap: StoryObj<typeof Transforms> = {
  name: "map + unmap — timestamps as Date objects",
};
