import Input from "@/components/atoms/input";
import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Example/Input",
  component: Input,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    error: {
      control: "boolean",
    },
    disabled: {
      control: "boolean",
    },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: { onChange: fn() },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Inputs: Story = {
  args: {},
  render() {
    return (
      <div className="grid grid-cols-4 gap-[12px]">
        <div className="flex flex-col items-center gap-3 pt-3">
          <Input placeholder="placeholder" />
          <Input error={true} />
          <Input disabled={true} placeholder="Disabled" />
        </div>
      </div>
    );
  },
};

export const DefaultInputs: Story = {
  args: {
    placeholder: "placeholder",
    value: "Input text",
  },
};
