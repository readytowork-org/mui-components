import type { Meta, StoryObj } from "@storybook/react/dist";
import { fn } from "@storybook/test";
import { AppPagination, type AppPaginationProps } from "./index";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Components/Paginations/AppPagination",
  component: AppPagination,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    pageSizeOptions: {
      control: "object",
    },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: {
    page: 1,
    count: 100,
    pageSize: 10,
    onPageSizeChange: fn(),
    pageSizeOptions: [10, 25, 50],
  },
} satisfies Meta<typeof AppPagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: AppPaginationProps = {
  count: 100,
  pageSize: 10,
  page: 1,
};

// Story with more items and a different starting page
export const LargeDataset: Story = {
  args: {
    count: 578,
    pageSize: 25,
    page: 5,
    pageSizeOptions: [10, 25, 50, 100],
  },
};

// Story with fewer items, demonstrating boundary conditions
export const SmallDataset: Story = {
  args: {
    count: 18,
    pageSize: 10,
    page: 2,
    pageSizeOptions: [5, 10],
  },
};

// Story demonstrating only one page
export const SinglePage: Story = {
  args: {
    count: 8,
    pageSize: 10,
    page: 1,
    pageSizeOptions: [10, 25],
  },
};
