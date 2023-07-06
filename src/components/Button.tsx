import { ComponentPropsWithoutRef } from "react";
import { twMerge } from "tailwind-merge";


interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  variant?: "primary" | "outlined"
}


function Button({ className, variant = 'primary', ...props }: ButtonProps) {

  const variantClasses = {
    primary: "bg-primary text-white hover:bg-primaryDarker",
    outlined: "bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-white" 
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