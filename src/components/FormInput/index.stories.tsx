import type { Meta, StoryObj } from "@storybook/react";
import { TextField, Checkbox, FormControlLabel } from "@mui/material";
import FormInput from "./index";

const meta = {
  title: "Components/Forms/FormInput",
  component: FormInput,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text" },
    verticalLabelDirection: { control: "boolean" },
    required: { control: "boolean" },
    error: { control: "text" },
    // children is ReactNode, will be provided in args for each story
  },
  args: {
    label: "Your Name",
    verticalLabelDirection: true,
    required: false,
    error: "",
    children: (
      <TextField placeholder={"Enter your name"} fullWidth size={"small"} />
    ),
  },
} satisfies Meta<typeof FormInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  // Uses default args from meta
};

export const HorizontalLabel: Story = {
  args: {
    label: "Email Address",
    verticalLabelDirection: false,
    children: (
      <TextField
        type={"email"}
        placeholder={"your.email@example.com"}
        fullWidth
        size={"small"}
      />
    ),
  },
};

export const WithError: Story = {
  args: {
    label: "Password",
    error: "Password must be at least 8 characters.",
    children: (
      <TextField
        type={"password"}
        placeholder={"Enter password"}
        fullWidth
        size={"small"}
        error // Also set error on the input itself for visual consistency
      />
    ),
  },
};

export const RequiredInput: Story = {
  args: {
    label: "Required Field",
    required: true,
    children: (
      <TextField
        placeholder={"This field is required"}
        fullWidth
        size={"small"}
      />
    ),
  },
};

export const WithCustomLabelNode: Story = {
  args: {
    label: (
      <span>
        {"Accept "}
        <strong style={{ color: "blue" }}>{"Terms & Conditions"}</strong>
      </span>
    ),
    children: (
      <FormControlLabel
        control={<Checkbox />}
        label={"I agree"}
        sx={{ width: "100%" }}
      />
    ),
  },
};

export const HorizontalWithCheckbox: Story = {
  args: {
    label: "Subscribe",
    verticalLabelDirection: false,
    children: <Checkbox />,
    // Adjust alignment for checkbox in horizontal layout if needed via sx prop on FormInput
    sx: { alignItems: "center" },
  },
};
