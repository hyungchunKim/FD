import Button, { PropTypes } from "@/components/atoms/button";
import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Example/Button",
  component: Button,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    color: {
      control: "select",
      options: ["primary", "warning", "assist", "suggest", "success", "tonal"],
      default: "primary",
    },
    variant: {
      control: "select",
      options: ["filled", "outline"],
      default: "filled",
    },
    size: {
      control: "select",
      options: ["small", "medium", "large"],
      default: "medium",
    },
    rounded: {
      control: "select",
      options: ["xs", "md"],
      default: "xs",
    },
    disabled: {
      control: "boolean",
    },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: { onClick: fn() },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Buttons: Story = {
  args: {},
  render() {
    return (
      <div className="grid grid-cols-4 gap-[12px]">
        <div className="flex flex-col items-center gap-3 pt-3">
          <h3 className="my-5">Primary (default)</h3>
          <Button size="large" disabled={true}>
            Disabled
          </Button>
          <Button size="large">Button</Button>
          <Button size="large" rounded="md">
            Button
          </Button>
          <Button size="medium">Button</Button>
          <Button size="medium" rounded="md">
            Button
          </Button>
          <Button size="small">Button</Button>
          <Button size="small" rounded="md">
            Button
          </Button>
        </div>
        <div className="flex flex-col items-center gap-3 pt-3">
          <h3 className="my-5">Primary outline (default)</h3>
          <Button variant="outline" size="large" disabled={true}>
            Disabled
          </Button>
          <Button variant="outline" size="large">
            Button
          </Button>
          <Button variant="outline" size="large" rounded="md">
            Button
          </Button>
          <Button variant="outline" size="medium">
            Button
          </Button>
          <Button variant="outline" size="medium" rounded="md">
            Button
          </Button>
          <Button variant="outline" size="small">
            Button
          </Button>
          <Button variant="outline" size="small" rounded="md">
            Button
          </Button>
        </div>

        <div className="flex flex-col items-center gap-3 pt-3">
          <h3 className="my-5">tonal</h3>
          <Button size="large" color="tonal" disabled={true}>
            Disabled
          </Button>
          <Button size="large" color="tonal">
            Button
          </Button>
          <Button size="large" color="tonal" rounded="md">
            Button
          </Button>
          <Button size="medium" color="tonal">
            Button
          </Button>
          <Button size="medium" color="tonal" rounded="md">
            Button
          </Button>
          <Button size="small" color="tonal">
            Button
          </Button>
          <Button size="small" color="tonal" rounded="md">
            Button
          </Button>
        </div>
        <div className="flex flex-col items-center gap-3 pt-3">
          <h3 className="my-5">tonal outline</h3>
          <Button variant="outline" size="large" color="tonal" disabled={true}>
            Disabled
          </Button>
          <Button variant="outline" size="large" color="tonal">
            Button
          </Button>
          <Button variant="outline" size="large" color="tonal" rounded="md">
            Button
          </Button>
          <Button variant="outline" size="medium" color="tonal">
            Button
          </Button>
          <Button variant="outline" size="medium" color="tonal" rounded="md">
            Button
          </Button>
          <Button variant="outline" size="small" color="tonal">
            Button
          </Button>
          <Button variant="outline" size="small" color="tonal" rounded="md">
            Button
          </Button>
        </div>
        <div className="flex flex-col items-center gap-3 pt-3">
          <h3 className="my-5">assist</h3>
          <Button color="assist" size="large" disabled={true}>
            Disabled
          </Button>
          <Button color="assist" size="large">
            Button
          </Button>
          <Button color="assist" size="large" rounded="md">
            Button
          </Button>
          <Button color="assist" size="medium">
            Button
          </Button>
          <Button color="assist" size="medium" rounded="md">
            Button
          </Button>
          <Button color="assist" size="small">
            Button
          </Button>
          <Button color="assist" size="small" rounded="md">
            Button
          </Button>
        </div>
        <div className="flex flex-col items-center gap-3 pt-3">
          <h3 className="my-5">assist outline</h3>
          <Button color="assist" variant="outline" size="large" disabled={true}>
            Disabled
          </Button>
          <Button color="assist" variant="outline" size="large">
            Button
          </Button>
          <Button color="assist" variant="outline" size="large" rounded="md">
            Button
          </Button>
          <Button color="assist" variant="outline" size="medium">
            Button
          </Button>
          <Button color="assist" variant="outline" size="medium" rounded="md">
            Button
          </Button>
          <Button color="assist" variant="outline" size="small">
            Button
          </Button>
          <Button color="assist" variant="outline" size="small" rounded="md">
            Button
          </Button>
        </div>
        <div className="flex flex-col items-center gap-3 pt-3">
          <h3 className="my-5">warning</h3>
          <Button size="large" color="warning" disabled={true}>
            Disabled
          </Button>
          <Button size="large" color="warning">
            Button
          </Button>
          <Button size="large" color="warning" rounded="md">
            Button
          </Button>
          <Button size="medium" color="warning">
            Button
          </Button>
          <Button size="medium" color="warning" rounded="md">
            Button
          </Button>
          <Button size="small" color="warning">
            Button
          </Button>
          <Button size="small" color="warning" rounded="md">
            Button
          </Button>
        </div>
        <div className="flex flex-col items-center gap-3 pt-3">
          <h3 className="my-5">warning outline</h3>
          <Button
            variant="outline"
            size="large"
            color="warning"
            disabled={true}
          >
            Disabled
          </Button>
          <Button variant="outline" size="large" color="warning">
            Button
          </Button>
          <Button variant="outline" size="large" color="warning" rounded="md">
            Button
          </Button>
          <Button variant="outline" size="medium" color="warning">
            Button
          </Button>
          <Button variant="outline" size="medium" color="warning" rounded="md">
            Button
          </Button>
          <Button variant="outline" size="small" color="warning">
            Button
          </Button>
          <Button variant="outline" size="small" color="warning" rounded="md">
            Button
          </Button>
        </div>
        <div className="flex flex-col items-center gap-3 pt-3">
          <h3 className="my-5">suggest</h3>
          <Button size="large" color="suggest" disabled={true}>
            Disabled
          </Button>
          <Button size="large" color="suggest">
            Button
          </Button>
          <Button size="large" color="suggest" rounded="md">
            Button
          </Button>
          <Button size="medium" color="suggest">
            Button
          </Button>
          <Button size="medium" color="suggest" rounded="md">
            Button
          </Button>
          <Button size="small" color="suggest">
            Button
          </Button>
          <Button size="small" color="suggest" rounded="md">
            Button
          </Button>
        </div>
        <div className="flex flex-col items-center gap-3 pt-3">
          <h3 className="my-5">suggest outline</h3>
          <Button
            variant="outline"
            size="large"
            color="suggest"
            disabled={true}
          >
            Disabled
          </Button>
          <Button variant="outline" size="large" color="suggest">
            Button
          </Button>
          <Button variant="outline" size="large" color="suggest" rounded="md">
            Button
          </Button>
          <Button variant="outline" size="medium" color="suggest">
            Button
          </Button>
          <Button variant="outline" size="medium" color="suggest" rounded="md">
            Button
          </Button>
          <Button variant="outline" size="small" color="suggest">
            Button
          </Button>
          <Button variant="outline" size="small" color="suggest" rounded="md">
            Button
          </Button>
        </div>
        <div className="flex flex-col items-center gap-3 pt-3">
          <h3 className="my-5">success</h3>
          <Button size="large" color="success" disabled={true}>
            Disabled
          </Button>
          <Button size="large" color="success">
            Button
          </Button>
          <Button size="large" color="success" rounded="md">
            Button
          </Button>
          <Button size="medium" color="success">
            Button
          </Button>
          <Button size="medium" color="success" rounded="md">
            Button
          </Button>
          <Button size="small" color="success">
            Button
          </Button>
          <Button size="small" color="success" rounded="md">
            Button
          </Button>
        </div>
        <div className="flex flex-col items-center gap-3 pt-3">
          <h3 className="my-5">success outline</h3>
          <Button
            variant="outline"
            size="large"
            color="success"
            disabled={true}
          >
            Disabled
          </Button>
          <Button variant="outline" size="large" color="success">
            Button
          </Button>
          <Button variant="outline" size="large" color="success" rounded="md">
            Button
          </Button>
          <Button variant="outline" size="medium" color="success">
            Button
          </Button>
          <Button variant="outline" size="medium" color="success" rounded="md">
            Button
          </Button>
          <Button variant="outline" size="small" color="success">
            Button
          </Button>
          <Button variant="outline" size="small" color="success" rounded="md">
            Button
          </Button>
        </div>
      </div>
    );
  },
};

export const DefaultButton: Story = {
  args: {
    color: "primary",
    variant: "filled",
    children: "Button",
    rounded: "xs",
    size: "",
  },
};
