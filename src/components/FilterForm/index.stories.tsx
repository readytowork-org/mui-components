import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { Box, TextField } from "@mui/material";
import FilterForm from "./index";
import FormInput from "../FormInput"; // Assuming FormInput is in ../FormInput

// Define a simple interface for form values for type safety
interface MyFilterFormValues {
  searchTerm: string;
  category: string;
  isActive: boolean;
}

const meta = {
  title: "Components/Forms/FilterForm",
  component: FilterForm,
  parameters: {
    layout: "padded", // 'padded' is often better for forms than 'centered'
  },
  tags: ["autodocs"],
  argTypes: {
    onSearch: { action: "searched" },
    onFilterReset: { action: "reset" },
    verticalForm: { control: "boolean" },
    initialValues: { control: "object" },
    // children prop is a render function, best demonstrated via default args or specific stories
    extraActions: { control: "object" }, // For simple text or JSX nodes
  },
  args: {
    initialValues: {
      searchTerm: "",
      category: "all",
      isActive: true,
    } as MyFilterFormValues,
    onSearch: fn(),
    onFilterReset: fn(),
    verticalForm: true,
    children: (formik) => (
      <>
        <FormInput
          label={"Search Term"}
          error={
            formik.touched.searchTerm && formik.errors.searchTerm
              ? String(formik.errors.searchTerm)
              : undefined
          }
        >
          <TextField
            name={"searchTerm"}
            value={formik.values.searchTerm}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder={"Enter search term"}
            fullWidth
            size={"small"}
          />
        </FormInput>
        <FormInput
          label={"Category"}
          error={
            formik.touched.category && formik.errors.category
              ? String(formik.errors.category)
              : undefined
          }
        >
          <TextField
            name={"category"}
            value={formik.values.category}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder={"Enter category"}
            fullWidth
            size={"small"}
          />
        </FormInput>
      </>
    ),
  },
  // Ensures the generic type is correctly inferred for the component
} satisfies Meta<typeof FilterForm<MyFilterFormValues>>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  // Uses default args from meta
};

export const HorizontalForm: Story = {
  args: {
    verticalForm: false,
    children: (
      formik, // Provide a slightly adjusted children layout for horizontal
    ) => (
      <Box sx={{ display: "flex", gap: 2, alignItems: "flex-start" }}>
        <FormInput
          label={"Search Term"}
          verticalLabelDirection={false}
          error={
            formik.touched.searchTerm && formik.errors.searchTerm
              ? String(formik.errors.searchTerm)
              : undefined
          }
        >
          <TextField
            name={"searchTerm"}
            value={formik.values.searchTerm}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            size={"small"}
          />
        </FormInput>
        <FormInput
          label={"Category"}
          verticalLabelDirection={false}
          error={
            formik.touched.category && formik.errors.category
              ? String(formik.errors.category)
              : undefined
          }
        >
          <TextField
            name={"category"}
            value={formik.values.category}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            size={"small"}
          />
        </FormInput>
      </Box>
    ),
  },
};

export const WithExtraActions: Story = {
  args: {
    extraActions: (
      <Box sx={{ ml: 1, fontStyle: "italic", color: "gray" }}>
        {"Custom Action Slot"}
      </Box>
    ),
  },
};

export const NoResetButton: Story = {
  args: {
    onFilterReset: undefined, // Omitting the prop hides the reset button
  },
};

export const CustomButtonLabelsAndIcons: Story = {
  args: {
    slotProps: {
      submitButton: {
        children: "Find Now",
        // Example: Using a string as an icon, replace with actual icon component if needed
        icon: (
          <span role={"img"} aria-label={"rocket"}>
            {"🚀"}
          </span>
        ),
      },
      resetButton: {
        children: "Clear All",
      },
    },
  },
};
