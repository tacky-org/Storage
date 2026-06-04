import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { ValidateError, ReadError } from "./Errors";

const meta: Meta = { title: "Errors" };
export default meta;

export const Validate: StoryObj = {
  name: "validate step — corrupt data",
  render: () => <ValidateError />,
};

export const Read: StoryObj = {
  name: "read step — invalid JSON",
  render: () => <ReadError />,
};
