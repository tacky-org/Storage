import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { WebStorage } from "./WebStorage";

const meta: Meta<typeof WebStorage> = {
  title: "Store/Web Storage",
  component: WebStorage,
};
export default meta;

export const Standard: StoryObj<typeof WebStorage> = {
  name: "localStorage + sessionStorage",
};
