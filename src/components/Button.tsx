import { ComponentPropsWithoutRef } from "react";
import { twMerge } from "tailwind-merge";


interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  variant?: "primary" | "outlined" | "danger" | "dangerFilled" | "neutral"
}


function Button({ className, variant = 'primary', ...props }: ButtonProps) {

  const variantClasses = {
    primary: "bg-primary text-white hover:bg-primaryDarker",
    outlined: "bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-white",
    danger: "text-red-500 border-red-500 border hover:bg-red-600 hover:text-white bg-transparent",
    dangerFilled: "border-red-500 border bg-red-500 text-white hover:bg-red-600 bg:border-red-600",
    neutral: "bg-transparent border-2 border-gray-500 text-gray-500 hover:bg-gray-500 hover:text-white",

  }

  const _className = twMerge(
    "appearance-none rounded-lg bg-primary p-2 text-sm font-medium text-white shadow transition-all hover:bg-primaryDarker",
    className,
    variantClasses[variant],
  );

  return (
    <button className={_className} {...props}>
      {props.children}
    </button>
  );
}

export default Button;