import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Mutation, Patch } from "./Writing";

const meta: Meta = { title: "Writing" };
export default meta;

export const MutationStory: StoryObj = {
  name: "useStorageMutation — full replace",
  render: () => <Mutation />,
};

export const PatchStory: StoryObj = {
  name: "patch — partial update",
  render: () => <Patch />,
};
