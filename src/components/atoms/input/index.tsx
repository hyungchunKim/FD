import { cva } from "class-variance-authority";
import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

const InputVariants = cva(
  `
    px-[12px] py-[10px] rounded-[8px] placeholder:text-text-light border border-line-light
    focus:border-primary-500 bg-transparent outline-none
    disabled:text-text-light disabled:border-line-light disabled:bg-bg-gray_light
  `,
  {
    variants: {
      filled: {
        true: "bg-bg-primary_light text-text-dark",
      },
      error: {
        true: "!border-accent-red !bg-bg-red_light",
      },
    },
  },
);

type TInputProps = React.ComponentPropsWithRef<"input">;

type PropTypes = {
  error?: boolean;
} & TInputProps;

const Input = forwardRef<HTMLInputElement, PropTypes>(
  ({ className, value, error = false, disabled, ...rest }, ref) => {
    return (
      <>
        <input
          ref={ref}
          value={value}
          className={twMerge(
            InputVariants({ error, filled: !!value }),
            className,
          )}
          {...rest}
        />
      </>
    );
  },
);
export default Input;
