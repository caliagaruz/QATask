import React from "react";

const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className = "", ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={`
          w-full rounded-md bg-[#4D76A714] px-3 py-2 text-[0.8125rem] text-[#152351]
          placeholder:text-[#8E95AF]
          border border-transparent focus:border-[#1D60F0]
          focus:ring-3 focus:ring-[#1D60F01A] focus:outline-none focus:bg-white
          disabled:opacity-50 disabled:cursor-not-allowed
          ${className}
        `}
        {...props}
      />
    )
  }
)

Input.displayName = "Input"

export default Input
