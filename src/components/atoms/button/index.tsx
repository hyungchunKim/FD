import { cva, VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

const ButtonVariants = cva(
  `
  relative flex justify-center items-center hover:shadow-[0_2px_12px_#00000040]
  before:absolute before:w-full before:h-full overflow-hidden before:content-none
  text-white active:shadow-none
  `,
  {
    variants: {
      size: {
        small: "py-[10px] px-[20px] font-4",
        medium: "py-[16px] px-[20px] font-5",
        large: "py-[16px] px-[60px] font-5 font-inter_0",
      },
      rounded: {
        xs: "rounded-[8px]",
        md: "rounded-[50px]",
      },
      color: {
        primary: [
          "bg-primary-500 border-primary-200 text-white",
          "before:bg-primary-500 before:opacity-[0.08] ",
          "active:shadow-0 focus:border-primary-500",
        ],
        warning: [
          "bg-accent-red border-accent-red/50 text-white",
          "before:bg-accent-red before:opacity-[0.08] ",
          "active:shadow-0 focus:border-accent-red",
        ],
        assist: [
          "bg-accent-blue border-accent-blue/50 text-white",
          "before:bg-accent-blue before:opacity-[0.08] ",
          "active:shadow-0 focus:border-accent-blue",
        ],
        suggest: [
          "bg-accent-orange border-accent-orange/50 text-white",
          "before:bg-accent-orange before:opacity-[0.08] ",
          "active:shadow-0 focus:border-accent-orange",
        ],
        success: [
          "bg-accent-green border-accent-green/50 text-white",
          "before:bg-accent-green before:opacity-[0.08] ",
          "active:shadow-0 focus:border-accent-green",
        ],
        tonal: [
          "bg-primary-50 text-primary-500 before:absolute before:w-full before:h-full",
          "hover:before:bg-black/8 hover:before:content-[''] hover:before:bg-[#00000008]",
          "active:before:bg-[#00000012] ",
        ],
      },
      disabled: {
        true: "!bg-transparent text-text-default !shadow-none before:!content-none",
      },
      variant: {
        outline:
          "border hover:before:content-[''] bg-transparent text-black active:before:opacity-[0.12]",
        filled: "border-0 before:content-none",
      },
    },
    defaultVariants: {
      variant: "filled",
      size: "medium",
      color: "primary",
      rounded: "xs",
      disabled: false,
    },
    compoundVariants: [
      {
        variant: "outline",
        class: "text-black",
      },
      {
        color: "primary",
        variant: "outline",
        class: "text-primary-500",
      },
      {
        disabled: true,
        variant: "outline",
        class: "border border-border-default text-text-default",
      },
    ],
  },
);
type TButtonProps = React.ComponentPropsWithoutRef<"button">;
type ButtonProps = VariantProps<typeof ButtonVariants>;

export type PropTypes = TButtonProps & ButtonProps;

export default function Button({
  variant,
  rounded,
  size,
  color,
  disabled,
  children,
  className,
  ...props
}: PropTypes) {
  return (
    <button
      className={twMerge(
        ButtonVariants({ variant, rounded, size, color, disabled }),
        className,
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
