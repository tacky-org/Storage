import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { WriteStepError, UnmapStepError } from "./ErrorWrite";

const meta: Meta = { title: "Writing/Write Errors" };
export default meta;

export const WriteError: StoryObj = {
  name: "write step error — quota exceeded",
  render: () => <WriteStepError />,
};

export const UnmapError: StoryObj = {
  name: "unmap step error — unmap throws",
  render: () => <UnmapStepError />,
};
