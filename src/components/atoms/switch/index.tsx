"use client";
import { cva, VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";
const SwitchVariants = cva(
  `
 relative w-[52px] h-[32px] bg-primary-50 peer-focus:outline-none rounded-full peer 
  `,
  {
    variants: {
      color: {
        primary: [
          "after:inline-block after:align-middle after:mx-[2px] after:start-[2px] after:rounded-full after:w-[16px] after:h-[16px] rounded-full peer after:bg-[#79747E] after:transition-all ",
          "after:hover:ring-[#1D1B20] after:hover:bg-[#79747E] after:hover:ring-[8px] after:hover:ring-opacity-[0.08] after:content-[''] ",
          "after:peer-focus:ring-[#c9a8ff] after:peer-focus:bg-text-dark after:peer-focus:ring-[8px] after:peer-focus:ring-opacity-50  ",
          "peer-checked:after:hover:ring-[8px]   peer-checked:after:hover:border-[#6750A4] peer-checked:after:hover:border-opacity-[0.08]",
          "peer-checked:after:peer-focus:ring-primary-300 peer-checked:after:peer-focus:bg-primary-50 peer-checked:after:peer-focus:ring-opacity-[0.12]",
          "peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:mt-[3px] peer-checked:after:w-[24px] peer-checked:after:h-[24px] peer-checked:after:bg-white peer-checked:bg-primary-500 peer-checked:border-0",
        ],
      },
      disabled: {
        true: [
          "border-primary-200 after:bg-[#1D1B20] after:hover:ring-[0px]",
          "peer-checked:after:hover:ring-[0px] peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:mt-[3px] peer-checked:after:w-[24px] peer-checked:after:h-[24px] peer-checked:after:bg-white peer-checked:bg-primary-200 peer-checked:bg-opacity-50 peer-checked:borderr-[2px]",
        ],
      },
      icon: {
        true: [
          "after:w-[24px] after:h-[24px] after:z-0 after:relative ",
          "after:hover:ring-[#1D1B20] after:hover:bg-[#79747E] ",
        ],
      },
      variant: {
        outline: "border-[2px] border-line-dark bg-primary-50 ",
        filled: "border-[2px] border-primary-500 before:content-none",
      },
    },
    defaultVariants: {
      variant: "outline",
      color: "primary",
      disabled: false,
    },
    compoundVariants: [
      {
        disabled: true,
        variant: "outline",
        class: "border-primary-200 bg-bg-primary_light",
      },
    ],
  },
);
type TSwitchIcon = {
  icon: boolean;
};
type TInputProps = React.ComponentPropsWithoutRef<"input">;
type SwitchProps = VariantProps<typeof SwitchVariants>;

export type PropTypes = TInputProps & SwitchProps; //& TSwitchIcon;

export default function Switch({
  variant,
  color,
  disabled,
  children,
  className,
  icon,
  ...props
}: PropTypes) {
  return (
    <label className="inline-flex cursor-pointer items-center">
      <input
        type="checkbox"
        className="peer sr-only"
        disabled={disabled}
        {...props}
      />
      <div
        className={twMerge(
          SwitchVariants({ color, disabled, icon }),
          className,
        )}
      ></div>
    </label>
  );
}
